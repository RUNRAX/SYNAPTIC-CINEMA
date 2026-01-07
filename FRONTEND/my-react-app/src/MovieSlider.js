import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { scale: 0.85, opacity: 0.7, z: 0 },
  visible: { scale: 1, opacity: 1, z: 0 },
};

const MovieSlider = ({ movies: initialMovies, loading: initialLoading }) => {
  const CARD_WIDTH = 230;
  const CARD_HEIGHT = 320;
  const GAP_WIDTH = 16;
  const MOVEMENT_STEP_WIDTH = CARD_WIDTH + GAP_WIDTH;
  const VISIBLE_WINDOW_ITEMS = 4;
  const CLONE_COUNT = VISIBLE_WINDOW_ITEMS * 2;
  const SLIDE_DURATION_S = 0.8;
  const SLIDE_DURATION_MS = SLIDE_DURATION_S * 1000;

  const [movies, setMovies] = useState(initialMovies || []);
  const [loading, setLoading] = useState(initialLoading);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(CLONE_COUNT);
  const totalOriginalMovies = movies.length;

  const extendedMovies = useMemo(() => {
    if (totalOriginalMovies === 0) return [];
    let baseMovies = movies;
    if (totalOriginalMovies < CLONE_COUNT) {
      const repeatFactor = Math.ceil((CLONE_COUNT * 2) / totalOriginalMovies) + 1;
      baseMovies = Array(repeatFactor).fill(movies).flat();
    }
    return [
      ...baseMovies.slice(baseMovies.length - CLONE_COUNT),
      ...movies,
      ...baseMovies.slice(0, CLONE_COUNT),
    ];
  }, [movies, totalOriginalMovies]);

  const xTranslation = useMemo(() => {
    return -(currentTrackIndex * MOVEMENT_STEP_WIDTH);
  }, [currentTrackIndex]);

  const isSnapping = currentTrackIndex >= (CLONE_COUNT + totalOriginalMovies) || currentTrackIndex < CLONE_COUNT;

  const nextSlide = useCallback(() => setCurrentTrackIndex((p) => p + 1), []);
  const prevSlide = useCallback(() => setCurrentTrackIndex((p) => p - 1), []);

  useEffect(() => {
    setMovies(initialMovies || []);
    setLoading(initialLoading);
  }, [initialMovies, initialLoading]);

  useEffect(() => {
    if (totalOriginalMovies === 0 || isSnapping) return;
    const interval = setInterval(nextSlide, SLIDE_DURATION_MS + 3000);
    return () => clearInterval(interval);
  }, [nextSlide, totalOriginalMovies, isSnapping]);

  useEffect(() => {
    if (isSnapping) {
      const snapTimeout = setTimeout(() => {
        if (currentTrackIndex >= CLONE_COUNT + totalOriginalMovies) {
          setCurrentTrackIndex(CLONE_COUNT);
        } else if (currentTrackIndex < CLONE_COUNT) {
          setCurrentTrackIndex(CLONE_COUNT + totalOriginalMovies - 1);
        }
      }, SLIDE_DURATION_MS);
      return () => clearTimeout(snapTimeout);
    }
  }, [currentTrackIndex, totalOriginalMovies, isSnapping]);

  const viewportWidth = (CARD_WIDTH + GAP_WIDTH) * VISIBLE_WINDOW_ITEMS - GAP_WIDTH;

  if (totalOriginalMovies === 0 && !loading) {
    return (
      <div className="flex justify-center items-center py-4" style={{ height: `${CARD_HEIGHT}px`}}>
        <p className="text-gray-400">No trending movies to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-4">
      <div className="relative" style={{ width: `${viewportWidth}px`, height: `${CARD_HEIGHT}px` }}>
        <motion.button
          onClick={prevSlide}
          whileTap={{ scale: 0.9 }}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 bg-black/60 p-2 rounded-full text-white hover:bg-black/80 backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </motion.button>
        
        <div 
          className="overflow-hidden w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            className="flex h-full items-center"
            animate={{ x: xTranslation }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: isSnapping ? 0 : SLIDE_DURATION_S,
            }}
          >
            {loading ? (
              Array.from({ length: VISIBLE_WINDOW_ITEMS }).map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-gray-700 animate-pulse rounded-xl" style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`, marginRight: `${GAP_WIDTH}px`, flexShrink: 0 }} />
              ))
            ) : (
              extendedMovies.map((movie, index) => {
                const relativeIndex = index - currentTrackIndex;
                
                // CORRECTED: The condition is changed from >= 0 to >= -1.
                // This keeps the poster at full scale as it moves off-screen to the left.
                const variant = (relativeIndex >= -1 && relativeIndex < VISIBLE_WINDOW_ITEMS) ? "visible" : "hidden";

                return (
                  <motion.div
                    key={`${movie.id}-${index}`}
                    className="rounded-xl shadow-lg flex-shrink-0"
                    style={{
                      width: `${CARD_WIDTH}px`,
                      height: `${CARD_HEIGHT}px`,
                      marginRight: `${GAP_WIDTH}px`,
                      pointerEvents: 'auto' // This makes the card and its link clickable
                    }}
                    variants={cardVariants}
                    animate={variant}
                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                  >
                    <Link to={`/details/${movie.type}/${movie.id}`} className="block w-full h-full">
                      <img
                        src={movie.poster && movie.poster !== 'N/A' ? movie.poster.replace('/w500', '/w300') : `https://placehold.co/${CARD_WIDTH}x${CARD_HEIGHT}/1A1A1A/FFFFFF?text=${encodeURIComponent(movie.title?.replace(/\s/g, '+') || 'Movie')}`}
                        alt={movie.title || 'Movie Poster'}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />
                    </Link>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </div>

        <motion.button
          onClick={nextSlide}
          whileTap={{ scale: 0.9 }}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 bg-black/60 p-2 rounded-full text-white hover:bg-black/80 backdrop-blur-sm"
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>
    </div>
    
  );
};

export default MovieSlider;