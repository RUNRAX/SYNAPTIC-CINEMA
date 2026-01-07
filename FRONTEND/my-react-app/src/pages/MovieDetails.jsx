import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/index.js';
import { Movie } from '../entities/Movie.js';
import { Review } from '../entities/Review.js';
import { CastMember } from '../entities/CastMember.js';
import { User } from '../entities/User.js';
import MovieGrid from '../components/MovieGrid';
import { Star, Send, Film, Tv, Calendar, Clock, ThumbsUp, Play } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// A simple Star Rating component for reuse
const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={28}
          color={star <= rating ? '#FFD700' : 'var(--grey-400)'}
          fill={star <= rating ? '#FFD700' : 'none'}
          onClick={() => setRating(star)}
          style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      ))}
    </div>
  );
};

export default function MovieDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const movieId = searchParams.get('id'); // Get id from hook
    const movieType = searchParams.get('type'); // Get type from hook

    if (movieId && movieType) {
      loadData(movieId, movieType); // Pass both to loadData
    }
  }, [searchParams]); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (movieId) {
      loadData(movieId);
    }
  }, [window.location.search]);

  const loadData = async (movieId, movieType) => {
    setLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      const movieData = await Movie.get(movieId, movieType);

      // --- NEW: Check if movieData exists before continuing ---
      if (!movieData) {
        // If the fetch failed, stop here to prevent errors.
        setMovie(null);
        setLoading(false);
        return; 
      }

      setMovie(movieData);

      // This code will now only run if the initial fetch was successful
      const [castData, reviewData, similarData] = await Promise.all([
        CastMember.filter({ movieId: movieId }),
        Review.filter({ movieId: movieId }, '-created_date'),
        Movie.filter({ genre: movieData.genre, id: { '$ne': movieId } }, '-rating', 8)
      ]);
      
      setCast(castData);
      setReviews(reviewData);
      setSimilarMovies(similarData);
      
    } catch (error) {
      console.error("Error loading movie details:", error);
      setMovie(null); // Ensure movie is null on error
    } finally {
      setLoading(false);
    }
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewContent.trim() && reviewRating > 0 && movie && user) {
      try {
        await Review.create({
          movieId: movie.id,
          content: reviewContent,
          rating: reviewRating,
          authorName: user.full_name || 'Anonymous User',
        });
        setReviewContent('');
        setReviewRating(0);
        // Reload reviews for the movie
        const updatedReviews = await Review.filter({ movieId: movie.id }, '-created_date');
        setReviews(updatedReviews);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleMovieClick = (movie) => {
    if (movie && movie.id && movie.type) {
      navigate(createPageUrl(`MovieDetails?id=${movie.id}&type=${movie.type}`));
    }
  };

  if (loading) {
    return <div className="loading-container"></div>;
  }

  if (!movie) {
    return <div className="error-container"></div>;
  }

  return (
    <>
      <style>{`
        .details-container {
          animation: page-fade-in 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes page-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Find and modify the .hero-section rule */
        .hero-section {
          position: relative;
          min-height: 70vh;
          border-radius: 24px;
          overflow: hidden;
          padding: 4rem;
          display: flex;
          align-items: flex-end;
          color: white;
          margin-bottom: 4rem;
          transition: transform 0.5s ease-in-out; /* Add smooth transition */
        }

        /* Add this new hover rule for the hero section */
        .hero-section:hover {
            transform: scale(1.02); /* Slightly scale up the whole banner */
        }
        
        /* Find and modify the .hero-backdrop rule */
        .hero-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -2;
          filter: brightness(0.6);
          transition: transform 0.8s ease-in-out; /* Add smooth transition */
        }

        /* Add this new hover rule for the backdrop */
        .hero-section:hover .hero-backdrop {
            transform: scale(1.1); /* Zoom the background image */
        }

        /* Add these new rules for the play icon that appears on hover */
        .hero-play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.5s ease-in-out;
            cursor: pointer;
            z-index: 5;
        }

        .hero-section:hover .hero-play-icon {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        /* Add these new rules for the trailer section */
        .trailer-section {
            padding: 2rem;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 16px;
        }

        .trailer-iframe-container {
            position: relative;
            width: 100%;
            padding-top: 56.25%; /* 16:9 Aspect Ratio */
            overflow: hidden;
            border-radius: 12px;
        }

        .trailer-iframe-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .hero-backdrop-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 60%);
          z-index: -1;
        }

        .hero-content {
          display: flex;
          gap: 3rem;
          width: 100%;
        }

        .hero-poster {
          width: 250px;
          height: 375px;
          object-fit: cover;
          border-radius: 16px;
          border: 3px solid rgba(255,255,255,0.3);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
          flex-shrink: 0;
        }

        .hero-info {
          max-width: 60%;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 4px 15px rgba(0,0,0,0.7);
        }
        
        .hero-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--grey-300);
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .ratings-bar {
          display: flex;
          gap: 2rem;
        }

        .rating-box {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }

        .rating-source {
          font-size: 0.9rem;
          font-weight: bold;
          opacity: 0.8;
        }

        .rating-score {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .details-section {
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--grey-800);
          margin-bottom: 2rem;
          border-left: 4px solid var(--silver);
          padding-left: 1rem;
        }

        /* Cast Carousel */
        .cast-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding-bottom: 1.5rem;
          scrollbar-width: none; /* Firefox */
        }
        .cast-carousel::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        .cast-card {
          text-align: center;
          flex-shrink: 0;
          width: 140px;
        }

        .cast-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1rem;
          border: 3px solid var(--silver-light);
          transition: transform 0.3s;
        }
        
        .cast-card:hover .cast-image {
          transform: scale(1.05);
        }

        .cast-name {
          font-weight: 600;
          color: var(--grey-700);
        }
        
        .cast-character {
          font-size: 0.9rem;
          color: var(--grey-500);
        }

        /* Review Section */
        .review-section {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
        }

        .review-form {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 2rem;
        }

        .review-form textarea {
          width: 100%;
          min-height: 120px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          padding: 1rem;
          font-size: 1rem;
          color: var(--grey-800);
          margin-bottom: 1rem;
          resize: vertical;
        }

        .review-form button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border: none;
          background: var(--silver);
          color: var(--grey-800);
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .review-form button:hover {
          background: var(--silver-dark);
          transform: translateY(-2px);
        }

        .review-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .review-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
        }
        
        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .review-author {
          font-weight: 600;
          color: var(--grey-700);
        }
        
        .review-rating {
          display: flex;
          gap: 0.2rem;
        }
        
        .review-content {
          color: var(--grey-600);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .hero-content { flex-direction: column; }
          .hero-info { max-width: 100%; }
          .review-section { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="details-container">
        <section className="hero-section">
            <div className="hero-play-icon">
            <Play size={40} fill="white" />
          </div>
          <img src={movie.backdrop_url || movie.poster} alt={`${movie.title} backdrop`} className="hero-backdrop" />
          <div className="hero-backdrop-overlay"></div>
          <div className="hero-content">
            <img src={movie.poster} alt={movie.title} className="hero-poster" />
            <div className="hero-info">
              <h1 className="hero-title">{movie.title}</h1>
              <div className="hero-meta">
                <span className="meta-item">{movie.type === 'movie' ? <Film /> : <Tv />}{movie.type}</span>
                <span className="meta-item"><Calendar />{movie.year}</span>
                <span className="meta-item"><Clock />{movie.duration}</span>
                <span className="meta-item"><ThumbsUp />{movie.genre}</span>
              </div>
              <p className="hero-description">{movie.description}</p>
             <div className="ratings-bar">
                {movie.vote_average && (
                  <div className="rating-box">
                    <div className="rating-source">IMDB Rating</div>
                    <div className="rating-score">{movie.vote_average.toFixed(1)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {cast.length > 0 && (
          <section className="details-section">
            <h2 className="section-title">Cast & Crew</h2>
            <div className="cast-carousel">
              {cast.map(member => (
                <div key={member.id} className="cast-card">
                  <img src={member.imageUrl || 'https://via.placeholder.com/120'} alt={member.name} className="cast-image" />
                  <div className="cast-name">{member.name}</div>
                  <div className="cast-character">{member.characterName}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="details-section">
          <h2 className="section-title">Reviews</h2>
          <div className="review-section">
            <div className="review-form">
              <h3>Write your review</h3>
              <form onSubmit={handleReviewSubmit}>
                <StarRatingInput rating={reviewRating} setRating={setReviewRating} />
                <textarea 
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  required
                />
                <button type="submit"><Send size={16} /> Submit Review</button>
              </form>
            </div>
            <div className="review-list">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-author">{review.authorName}</div>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
                      {[...Array(5 - review.rating)].map((_, i) => <Star key={i} size={16} color="var(--grey-400)" />)}
                    </div>
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              )) : (
                <p>Be the first to write a review!</p>
              )}
            </div>
          </div>
        </section>
        
    {/* ... after the closing </section> tag for Reviews ... */}

        {movie.trailerKey && (
          <section className="details-section trailer-section">
            <h2 className="section-title">Trailer</h2>
            <div className="trailer-iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {similarMovies.length > 0 && (
          <section className="details-section">
            <h2 className="section-title">Similar Content</h2>
            <MovieGrid movies={similarMovies} onMovieClick={handleMovieClick} />
          </section>
        )}
      </div>
    </>
  );
}