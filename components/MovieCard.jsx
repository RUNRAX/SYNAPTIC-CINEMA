import React, { useState, memo } from 'react'
import { Star, Play } from 'lucide-react'
import './MovieCard.css'

function MovieCard({ movie, onClick, onHover }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : movie.rating

  return (
    <div
      className="movie-card"
      onMouseEnter={() => onHover?.(movie)}
      onClick={() => onClick?.(movie)}
    >
      <div className="movie-card-shimmer" />
      <div className="movie-card-gradient" />

      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
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
          {rating && (
            <div className="movie-rating">
              <Star size={14} fill="var(--silver)" color="var(--silver)" />
              {rating}
            </div>
          )}
        </div>
        {movie.genre && <div className="movie-genre">{movie.genre}</div>}
      </div>
    </div>
  )
}

export default memo(MovieCard)
