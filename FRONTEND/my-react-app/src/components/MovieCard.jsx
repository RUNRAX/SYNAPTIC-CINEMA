import React, { useState, memo } from 'react';
import { Star, Play } from 'lucide-react';
import './MovieCard.css'; // Import the external CSS

function MovieCard({ movie, onClick, onHover }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover(movie);
  };

  return (
    <div 
      className={`movie-card ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
    >
      <div className="movie-card-shimmer"></div>
      
      {movie.poster ? (
        <img 
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
          loading="lazy" // <-- PERFORMANCE WIN
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      ) : (
        <div className="poster-placeholder">No Image</div>
      )}
      
      <div className="play-overlay">
        <Play size={28} color="var(--grey-700)" fill="var(--grey-700)" />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          {movie.rating && (
            <div className="movie-rating">
              <Star size={14} fill="var(--silver)" color="var(--silver)" />
              {movie.rating}
            </div>
          )}
        </div>
        {movie.genre && (
          <div className="movie-genre">{movie.genre}</div>
        )}
      </div>
    </div>
  );
}

export default memo(MovieCard); // <-- PREVENTS UNNECESSARY RE-RENDERS