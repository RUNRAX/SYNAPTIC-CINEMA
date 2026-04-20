from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import asyncio
import aiohttp
import os
from aiohttp import ClientTimeout, ClientError
from requests.exceptions import RequestException
from requests.adapters import HTTPAdapter, Retry
from datetime import datetime, timedelta
import os
import cv2
import numpy as np
import base64
import tensorflow as tf
import pandas as pd
import random


# --- Configuration ---
# Defines the filenames for the models we need to load.
EMOTION_MODEL_FILE = 'FaceEmotionRecognizer.keras'
FACE_PROTO_FILE = 'deploy.prototxt'
FACE_MODEL_FILE = 'res10_300x300_ssd_iter_140000_fp16.caffemodel'

# --- Global Variables ---
face_detector = None
emotion_model = None
# This order must match how the model was trained from the RAF-DB folders.
emotion_labels = ['surprise', 'fear', 'disgust', 'happy', 'sad', 'angry', 'neutral']

# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- NEW IMPORTS for Real Emotion Detection ---
# You will need to install these libraries: pip install deepface opencv-python
import cv2
import numpy as np
import base64
from deepface import DeepFace

# --- Configuration ---
TMDB_API_KEY = os.getenv("TMDB_API_KEY", "e16728764eeafcf3bc42279f1d444aff")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

# --- Session for synchronous requests ---
session = requests.Session()
retry_strategy = Retry(total=3, backoff_factor=0.3, status_forcelist=[429, 500, 502, 503, 504])
session.mount("https://", HTTPAdapter(max_retries=retry_strategy))

# --- Caching Mechanism ---
# This dictionary will store fetched data to reduce API calls.
api_cache = {}
CACHE_DURATION = timedelta(hours=1) # Cache data for 1 hour

def is_cache_valid(key):
    """Checks if a cache entry exists and is not expired."""
    if key not in api_cache:
        return False
    entry_time = api_cache[key].get('timestamp', datetime.min)
    return (datetime.now() - entry_time) < CACHE_DURATION

# --- Static Content IDs ---


GENRE_MAP = {
    'movie': {
        'Action': 28, 'Adventure': 12, 'Animation': 16, 'Comedy': 35, 'Crime': 80,
        'Documentary': 99, 'Drama': 18, 'Family': 10751, 'Fantasy': 14, 'History': 36,
        'Horror': 27, 'Music': 10402, 'Mystery': 9648, 'Romance': 10749,
        'Sci-Fi': 878, 'TV Movie': 10770, 'Thriller': 53, 'War': 10752, 'Western': 37
    },
    'tv': {
        'Action & Adventure': 10759, 'Animation': 16, 'Comedy': 35, 'Crime': 80,
        'Documentary': 99, 'Drama': 18, 'Family': 10751, 'Kids': 10762, 'Mystery': 9648,
        'News': 10763, 'Reality': 10764, 'Sci-Fi & Fantasy': 10765, 'Soap': 10766,
        'Talk': 10767, 'War & Politics': 10768, 'Western': 37
    }
}

# --- Helper Functions ---
def format_content(item, content_type):
    if not item or not item.get('poster_path'):
        return None
    return {
        'id': item.get('id'),
        'title': item.get('title') if content_type == 'movie' else item.get('name'),
        'poster': f"https://image.tmdb.org/t/p/w500{item.get('poster_path')}",
        'vote_average': item.get('vote_average'),
        'overview': item.get('overview'),
        'year': (item.get('release_date', '') if content_type == 'movie' else item.get('first_air_date', '') or '')[:4],
        'type': content_type
    }

async def fetch_tmdb_details_async(session, content_id, content_type):
    """Asynchronously fetches details, now with caching."""
    cache_key = f"{content_type}_{content_id}"
    if is_cache_valid(cache_key):
        return api_cache[cache_key]['data']

    url = f"{TMDB_BASE_URL}/{content_type}/{content_id}?api_key={TMDB_API_KEY}&language=en-US"
    try:
        async with session.get(url) as response:
            response.raise_for_status()
            data = await response.json()
            formatted_data = format_content(data, content_type)
            if formatted_data:
                api_cache[cache_key] = {'data': formatted_data, 'timestamp': datetime.now()}
            return formatted_data
    except ClientError as e:
        print(f"Async fetch error for {content_type} ID {content_id}: {e}")
        return None

# --- API Routes ---
@app.route('/home_content', methods=['GET'])
def get_home_content():
    cache_key = 'home_content'
    if is_cache_valid(cache_key):
        return jsonify(api_cache[cache_key]['data'])

    async def fetch_all():
        async with aiohttp.ClientSession(timeout=ClientTimeout(total=60)) as async_session:
            # ... (rest of the fetching logic remains the same)
            trending_params = {'sort_by': 'popularity.desc', 'vote_count.gte': 500}
            featured_params = {'sort_by': 'vote_average.desc', 'vote_count.gte': 1500}
            popular_series_params = {'sort_by': 'popularity.desc', 'vote_count.gte': 500}

            trending_movies_task = fetch_from_discover(async_session, 'movie', trending_params)
            trending_series_task = fetch_from_discover(async_session, 'tv', trending_params)
            featured_movies_task = fetch_from_discover(async_session, 'movie', featured_params, 2)
            popular_series_task = fetch_from_discover(async_session, 'tv', popular_series_params, 2)

            results = await asyncio.gather(
                trending_movies_task,
                trending_series_task,
                featured_movies_task,
                popular_series_task
            )

            trending = [m for m in [format_content(item, 'movie') for item in results[0]] if m] + \
                       [s for s in [format_content(item, 'tv') for item in results[1]] if s]

            featuredMovies = [m for m in [format_content(item, 'movie') for item in results[2]] if m]
            popularSeries = [s for s in [format_content(item, 'tv') for item in results[3]] if s]

            home_data = {
                "trending": trending,
                "featuredMovies": featuredMovies,
                "popularSeries": popularSeries
            }
            api_cache[cache_key] = {'data': home_data, 'timestamp': datetime.now()}
            return home_data
    try:
        data = asyncio.run(fetch_all())
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

async def fetch_from_discover(session, content_type, params, num_pages=1):
    all_results = []
    base_params = {'api_key': TMDB_API_KEY, 'include_adult': 'false', 'language': 'en-US'}
    base_params.update(params)
    for page in range(1, num_pages + 1):
        base_params['page'] = page
        try:
            async with session.get(f"{TMDB_BASE_URL}/discover/{content_type}", params=base_params) as response:
                response.raise_for_status()
                data = await response.json()
                results = data.get('results', [])
                if not results: break
                all_results.extend(results)
        except ClientError as e:
            print(f"Error fetching from discover/{content_type}: {e}")
            break
    return all_results

# --- Replace your existing /search route with this corrected and final version ---
@app.route('/search', methods=['GET'])
def search_tmdb():
    args = request.args
    query = args.get('query', '').lower()

    try:
        # --- IF a text query exists, use the SEARCH endpoint ---
        if query:
            params = {'api_key': TMDB_API_KEY, 'query': query, 'include_adult': 'false'}
            response = session.get(f"{TMDB_BASE_URL}/search/multi", params=params)
            response.raise_for_status()
            data = response.json()
            movies = [m for m in [format_content(item, 'movie') for item in data.get('results', []) if item.get('media_type') == 'movie'] if m]
            series = [s for s in [format_content(item, 'tv') for item in data.get('results', []) if item.get('media_type') == 'tv'] if s]
            return jsonify({"movies": movies, "series": series})

        # --- ELSE (no text query), use the DISCOVER endpoint for filtering ---
        else:
            content_type_filter = args.get('type', 'all')
            genre_filter = args.get('genre', 'all')
            year_filter = args.get('year', 'all')
            rating_filter = args.get('rating', 'all')

            min_rating = 6.0
            # Use the user's selected rating if it's higher than the base
            if rating_filter != 'all':
                min_rating = max(min_rating, float(rating_filter))

            excluded_keyword_ids = '9711,236775,1304,210024,14916,1828'

            base_params = {
                'api_key': TMDB_API_KEY,
                'include_adult': 'false',
                'language': 'en-US',
                'sort_by': 'popularity.desc',
                'without_keywords': excluded_keyword_ids,
                'vote_average.gte': min_rating
            }

            if rating_filter != 'all':
                base_params['vote_average.gte'] = rating_filter

            movies, series = [], []

            if content_type_filter in ['all', 'movie']:
                movie_params = base_params.copy()
                if genre_filter != 'all' and genre_filter in GENRE_MAP['movie']:
                    movie_params['with_genres'] = GENRE_MAP['movie'][genre_filter]
                if year_filter != 'all':
                    movie_params['primary_release_year'] = year_filter

                # --- NEW: Add stricter rating filter specifically for Romance movies ---
                if genre_filter == 'Romance':
                    movie_params['certification_country'] = 'US'
                    movie_params['certification.lte'] = 'PG-13'

                response = session.get(f"{TMDB_BASE_URL}/discover/movie", params=movie_params)
                response.raise_for_status()
                movie_results = response.json().get('results', [])
                movies = [m for m in [format_content(item, 'movie') for item in movie_results] if m]

            if content_type_filter in ['all', 'tv']:
                tv_params = base_params.copy()
                if genre_filter != 'all' and genre_filter in GENRE_MAP['tv']:
                    tv_params['with_genres'] = GENRE_MAP['tv'][genre_filter]
                if year_filter != 'all':
                    tv_params['first_air_date_year'] = year_filter

                 # --- NEW: Add stricter rating filter specifically for Romance series ---
                if genre_filter == 'Romance':
                    tv_params['certification_country'] = 'US'
                    tv_params['certification.lte'] = 'TV-14'

                response = session.get(f"{TMDB_BASE_URL}/discover/tv", params=tv_params)
                response.raise_for_status()
                series_results = response.json().get('results', [])
                series = [s for s in [format_content(item, 'tv') for item in series_results] if s]

            return jsonify({"movies": movies, "series": series})

    except RequestException as e:
        return jsonify({"error": str(e), "movies": [], "series": []}), 500

# --- /recommendations route with DEBUG print statements ---
# --- REPLACE your old /recommendations route with this new version ---
# --- REPLACE your /recommendations route with this FINAL CORRECTED version ---
@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    async def run_async_fetch():
        emotion = request.args.get("emotion", "neutral").lower()
        min_rating_override = request.args.get("minImdbRating")
        genre_override_ids_str = request.args.get("genreOverrideIds")

        genre_map = {
            'happy': {'movie': [35, 16, 12, 10751], 'tv': [35, 16, 10751]},
            'sad': {'movie': [18, 99, 10402], 'tv': [18, 99]},
            'angry': {'movie': [28, 53, 80], 'tv': [10759, 80, 10768]},
            'fear': {'movie': [27, 9648, 53], 'tv': [9648, 10765]},
            'surprise': {'movie': [12, 14, 878, 9648], 'tv': [10765, 12, 9648]},
            'neutral': {'movie': [18, 99, 36, 10752], 'tv': [99, 10763, 10767]}
        }
        
        movie_to_tv_genre_map = { 27: [9648], 53: [80], 878: [10765], 10749: [18], 36: [10768], 10752: [10768] }

        override_ids = []
        if genre_override_ids_str:
            try:
                override_ids = [int(id) for id in genre_override_ids_str.split(',') if id.strip()]
            except (ValueError, TypeError):
                override_ids = []

        if override_ids:
            movie_genres = override_ids
            series_genres = list(set(genre for id in override_ids for genre in movie_to_tv_genre_map.get(id, [id])))
        else:
            movie_genres = genre_map.get(emotion, genre_map['neutral'])['movie']
            series_genres = genre_map.get(emotion, genre_map['neutral'])['tv']

        async def fetch_balanced_content(session, content_type, genre_ids, total_items_target=200):
            if not genre_ids:
                return []
            
            items_per_region = total_items_target // 2
            items_per_genre_en = items_per_region // len(genre_ids)
            items_per_genre_in = items_per_region // len(genre_ids)
            
            min_vote_avg = 7.0
            if min_rating_override:
                try: min_vote_avg = float(min_rating_override)
                except (ValueError, TypeError): pass
            
            vote_count_en = 500 if min_vote_avg < 8.0 else 150
            vote_count_in = 50

            async def fetch_single_genre(genre_id, languages, vote_count, item_limit):
                genre_results = []
                for page in range(1, 4):
                    if len(genre_results) >= item_limit:
                        break
                    
                    params = {
                        'api_key': TMDB_API_KEY,
                        'with_genres': str(genre_id),
                        'sort_by': 'popularity.desc',
                        'vote_count.gte': vote_count,
                        'vote_average.gte': min_vote_avg,
                        'include_adult': 'false',
                        'page': page,
                        'with_original_language': languages
                    }
                    # SOLUTION: The 'language' parameter is REMOVED.
                    # This was the parameter that was incorrectly filtering out Indian films.

                    try:
                        async with session.get(f"{TMDB_BASE_URL}/discover/{content_type}", params=params) as response:
                            response.raise_for_status()
                            data = await response.json()
                            results = data.get('results', [])
                            if not results: break
                            genre_results.extend(results)
                    except Exception as e:
                        print(f"Error fetching {content_type} for genre {genre_id} with langs {languages}: {e}")
                        break
                return genre_results[:item_limit]

            tasks_en = [fetch_single_genre(gid, 'en', vote_count_en, items_per_genre_en) for gid in genre_ids]
            results_en = await asyncio.gather(*tasks_en)
            
            indian_languages = 'hi|kn|te|ta|ml'
            tasks_in = [fetch_single_genre(gid, indian_languages, vote_count_in, items_per_genre_in) for gid in genre_ids]
            results_in = await asyncio.gather(*tasks_in)
            
            all_results = [item for sublist in results_en for item in sublist] + \
                          [item for sublist in results_in for item in sublist]
            
            all_content, seen_ids = [], set()
            for item in all_results:
                if item['id'] not in seen_ids:
                    formatted_item = format_content(item, content_type)
                    if formatted_item:
                        all_content.append(formatted_item)
                        seen_ids.add(item['id'])
            
            random.shuffle(all_content)
            return all_content

        async with aiohttp.ClientSession() as async_session:
            movies_task = fetch_balanced_content(async_session, 'movie', movie_genres)
            series_task = fetch_balanced_content(async_session, 'tv', series_genres)

            recommended_movies, recommended_series = await asyncio.gather(movies_task, series_task)
            return jsonify({"movies": recommended_movies, "series": recommended_series})

    return asyncio.run(run_async_fetch())

# --- Model Loading Function ---
def load_all_models():
    """Loads the face detector and emotion recognizer into memory."""
    global face_detector, emotion_model
    print("\n--- Loading all models ---")
    try:
        # Load the OpenCV DNN Face Detector
        if os.path.exists(FACE_PROTO_FILE) and os.path.exists(FACE_MODEL_FILE):
            face_detector = cv2.dnn.readNetFromCaffe(FACE_PROTO_FILE, FACE_MODEL_FILE)
            print("✅ OpenCV DNN Face Detector loaded successfully.")
        else:
            print(f"❌ ERROR: Face detector model files not found.")

        # Load your custom-trained Keras Emotion Recognizer
        if os.path.exists(EMOTION_MODEL_FILE):
            emotion_model = tf.keras.models.load_model(EMOTION_MODEL_FILE)
            print("✅ Custom Emotion Recognizer loaded successfully.")
        else:
            print(f"❌ ERROR: Emotion model file not found at '{EMOTION_MODEL_FILE}'")

        print("--- Finished loading ---\n")

    except Exception as e:
        print(f"❌❌❌ An unexpected error occurred during model loading: {e} ❌❌❌")

# --- API Route for Emotion Detection ---
@app.route('/detect_emotion', methods=['POST'])
def detect_emotion_route():
    if not face_detector or not emotion_model:
        return jsonify({'error': 'Models are not loaded on the server. Please check server logs.'}), 503

    data = request.json
    if not data or 'image' not in data:
        return jsonify({'error': 'No image data provided in the request.'}), 400

    try:
        # Decode the Base64 image sent from the frontend
        image_data = base64.b64decode(data['image'].split(',')[1])
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        (h, w) = img.shape[:2]

        # Prepare the image for the face detector
        blob = cv2.dnn.blobFromImage(cv2.resize(img, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))
        face_detector.setInput(blob)
        detections = face_detector.forward()

        largest_face_box = None
        max_area = 0
        for i in range(0, detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > 0.5:
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
                area = (endX - startX) * (endY - startY)
                if area > max_area:
                    max_area = area
                    largest_face_box = (startX, startY, endX, endY)

        if largest_face_box:
            (startX, startY, endX, endY) = largest_face_box
            face_roi = img[startY:endY, startX:endX]

            if face_roi.size > 0:
                # Preprocess the face exactly as you did for training
                resized_face = cv2.resize(face_roi, (96, 96))
                normalized_face = resized_face / 255.0
                input_face = np.expand_dims(normalized_face, axis=0)

                # Predict using your custom model
                prediction = emotion_model.predict(input_face)
                dominant_emotion = emotion_labels[np.argmax(prediction[0])]

                print(f"✅ Emotion detected: {dominant_emotion}")
                return jsonify({'emotion': dominant_emotion})

        print("INFO: No face detected, returning 'neutral'.")
        return jsonify({'emotion': 'neutral'})

    except Exception as e:
        print(f"❌ An error occurred during emotion analysis: {e}")
        return jsonify({'emotion': 'neutral'})

# --- Main execution block ---


@app.route('/details', methods=['GET'])
def get_details():
    content_type = request.args.get('type')
    content_id = request.args.get('id')

    if not content_type or not content_id:
        return jsonify({"error": "Missing type or id parameter"}), 400

    cache_key = f"{content_type}_{content_id}_details"
    if is_cache_valid(cache_key):
        return jsonify(api_cache[cache_key]['data'])

    try:
        # Step 1: Fetch main content details
        details_url = f"{TMDB_BASE_URL}/{content_type}/{content_id}?api_key={TMDB_API_KEY}&language=en-US"
        details_response = session.get(details_url)
        details_response.raise_for_status()
        details_data = details_response.json()

        # --- NEW: Step 2: Fetch video data ---
        videos_url = f"{TMDB_BASE_URL}/{content_type}/{content_id}/videos?api_key={TMDB_API_KEY}&language=en-US"
        videos_response = session.get(videos_url)
        videos_response.raise_for_status()
        videos_data = videos_response.json()

        trailer_key = None
        for video in videos_data.get('results', []):
            if video['site'] == 'YouTube' and video['type'] == 'Trailer':
                trailer_key = video['key']
                break # Found the first official trailer

        # Step 3: Format all the data together
        formatted_data = format_details(details_data, content_type, trailer_key)

        if formatted_data:
            api_cache[cache_key] = {'data': formatted_data, 'timestamp': datetime.now()}

        return jsonify(formatted_data)
    except RequestException as e:
        return jsonify({"error": str(e)}), 500

def format_details(item, content_type, trailer_key=None): # <-- Add trailer_key parameter
    """A more detailed formatter for the MovieDetails page."""
    base_info = format_content(item, content_type)

    if not base_info:
        return None

    base_info['backdrop_url'] = f"https://image.tmdb.org/t/p/w1280{item.get('backdrop_path')}" if item.get('backdrop_path') else base_info.get('poster')

    if item.get('genres') and len(item['genres']) > 0:
        base_info['genre'] = item['genres'][0].get('name')
    else:
        base_info['genre'] = 'N/A'

    if content_type == 'movie':
        runtime = item.get('runtime')
        base_info['duration'] = f"{runtime} min" if runtime else 'N/A'
    else:
        runtime_list = item.get('episode_run_time', [])
        if runtime_list and len(runtime_list) > 0:
            base_info['duration'] = f"{runtime_list[0]} min"
        else:
            base_info['duration'] = 'N/A'

    base_info['trailerKey'] = trailer_key # <-- Add the trailer key to the response

    return base_info

if __name__ == '__main__':
    print("🚀 Starting Flask server...")
    load_all_models()
    # Suppress Flask/Werkzeug development server warnings
    import logging
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)
    app.run(host='0.0.0.0', port=5000, debug=False)