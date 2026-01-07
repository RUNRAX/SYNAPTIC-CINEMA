import React from 'react';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import './MovieGrid.css';

export default function MovieGrid({ movies, onMovieClick, loading = false }) {
  const skeletonCount = 12;

  return (
    <div className="movie-grid">
      {loading ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))
      ) : (
        movies.map((movie, index) => (
          <div 
            key={movie.id}
            className="movie-grid-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))
      )}
    </div>
  );
}