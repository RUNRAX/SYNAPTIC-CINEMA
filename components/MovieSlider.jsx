import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import './MovieSlider.css';

export default function MovieSlider({ movies, title, onMovieClick, loading = false }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth -1);
    }
  };

  useEffect(() => {
    // A small delay ensures the layout is stable before checking scrollability
    const timer = setTimeout(checkScrollButtons, 100);
    return () => clearTimeout(timer);
  }, [movies, loading]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="slider-container">
      <div className="slider-header">
        <h2 className="slider-title">{title}</h2>
        <div className="slider-controls">
          <button
            className="slider-button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="slider-button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="slider-wrapper">
        <div ref={sliderRef} className="slider-track" onScroll={checkScrollButtons}>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div className="slider-item" key={index}>
                <MovieCardSkeleton />
              </div>
            ))
          ) : (
            movies.map((movie, index) => ( // <-- We need the index here
      <div 
        key={movie.id} 
        className="slider-item"
        // ADD THIS: Stagger the animation delay for each card
        style={{ animationDelay: `${index * 0.07}s` }}
      >
        <MovieCard movie={movie} onClick={onMovieClick} />
      </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}