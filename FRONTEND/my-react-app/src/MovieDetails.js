// MovieDetails.js
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// It includes its own animation style to guarantee the movement.
const AnimatedHorizontalLoader = () => {
  useEffect(() => {
    // Create the animation styles dynamically and add them to the document head
    const styleId = 'shimmer-style';
    if (document.getElementById(styleId)) return; // Don't add if it already exists

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .shimmer-effect {
        background: linear-gradient(to right, #ef4444 20%, #dc2626 40%, #ef4444 60%, #dc2626 80%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when the component unmounts
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden shadow-lg">
          <div className="h-full w-full rounded-full shimmer-effect"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading content details...</p>
      </div>
    </div>
  );
};

const MovieDetails = () => {
  // Extract both 'type' and 'id' from the URL parameters
  const { type, id } = useParams();
  const [content, setContent] = useState(null); // Renamed from movie to content for generality
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContentDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Dynamically construct the API URL based on 'type' (movie or tv)
        const apiUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=e16728764eeafcf3bc42279f1d444aff&append_to_response=credits,videos,external_ids`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Extract trailer (works for both movies and TV series)
        const trailer = data.videos?.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        setContent({
          title: data.title || data.name, // Use 'name' for TV series
          poster: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : `https://via.placeholder.com/500x750?text=${encodeURIComponent(data.title || data.name || 'Content')}`,
          backdrop: data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : null,
          synopsis: data.overview || 'No synopsis available.',
          cast: data.credits?.cast?.slice(0, 10).map((actor) => actor.name) || [],
          genres: data.genres?.map((genre) => genre.name) || [],
          tmdbRating: data.vote_average?.toFixed(1) || 'N/A',
          imdbId: data.external_ids?.imdb_id || null,
          trailerKey: trailer ? trailer.key : null,
          releaseDate: data.release_date || data.first_air_date || 'N/A', // Use first_air_date for TV
          runtime: data.runtime || data.episode_run_time?.[0] || 'N/A', // Use episode_run_time for TV
          type: type // Store the type for consistent display
        });
      } catch (e) {
        console.error('Failed to fetch content details:', e);
        setError('Failed to load content details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [type, id]); // Depend on both type and id

    if (loading) {
    return <AnimatedHorizontalLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Content not found.</div>
      </div>
    );
  }

  // Helper for Rotten Tomatoes placeholder
  const getRottenTomatoesRating = () => {
    // TMDB does not provide Rotten Tomatoes directly.
    // You would typically need another API (like OMDb with an API key) or a scraping solution.
    // For now, we'll return a placeholder or an indication it's not available.
    return 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans transition-all duration-500 ease-in-out">
      {content.backdrop && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${content.backdrop})` }}
        ></div>
      )}

      <div className="relative max-w-6xl mx-auto z-10 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')} // Navigate to the root path (home page)
          className="mb-8 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          Back to Home
        </button>

        {/* Poster + Title + Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-gray-800 bg-opacity-70 backdrop-blur-sm p-6 rounded-lg shadow-xl mb-10">
          <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
            <img
              src={content.poster}
              alt={content.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-extrabold text-red-400 mb-4 leading-tight">
              {content.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-gray-300 mb-6">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
                TMDB: <span className="font-bold ml-1">{content.tmdbRating}</span>
              </span>

              {content.imdbId && (
                <a
                  href={`https://www.imdb.com/title/${content.imdbId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                >
                  <img src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509386345_SY230_SX307_UX1000_FMjpg_.png" alt="IMDb Logo" className="h-5 mr-1" />
                  IMDb
                </a>
              )}

              <span className="flex items-center">
                Rotten Tomatoes: <span className="font-bold ml-1">{getRottenTomatoesRating()}</span>
              </span>

              {content.releaseDate !== 'N/A' && (
                <span className="flex items-center">
                  Release Date: <span className="font-bold ml-1">{content.releaseDate}</span>
                </span>
              )}
              {content.runtime !== 'N/A' && (
                <span className="flex items-center">
                  Runtime: <span className="font-bold ml-1">{content.runtime} mins</span>
                </span>
              )}
            </div>

            {content.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {content.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-red-700 text-white text-sm px-3 py-1 rounded-full font-semibold"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              {content.synopsis}
            </p>

            {content.trailerKey && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-red-300 mb-4">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${content.trailerKey}`}
                    title="Content Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            <div className="mt-6">
              <a href={content.trailerKey ? `https://www.youtube.com/watch?v=${content.trailerKey}` : '#'} target="_blank" rel="noopener noreferrer">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                  Watch Trailer
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {content.cast.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-red-300 mb-6">Cast</h2>
            <div className="flex flex-wrap gap-4 mb-10">
              {content.cast.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-800 px-4 py-2 rounded-full shadow text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                >
                  {member}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reviews - Keeping the static reviews as per original for now,
            but in a real app, you'd fetch these. */}
        <h2 className="text-3xl font-bold text-red-300 mb-6">User Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Jane Doe', comment: 'An exhilarating experience with stunning visuals...', rating: '4.5' },
            { name: 'John Smith', comment: 'Mind-bending thriller. Highly recommended!', rating: '5.0' },
          ].map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <p className="text-lg font-semibold text-red-200 mb-2">{review.name}</p>
              <p className="text-gray-300 italic mb-3">"{review.comment}"</p>
              <div className="flex items-center text-sm text-yellow-400">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
                {review.rating} / 5
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;