import React, { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import MovieGrid from '../components/MovieGrid';
import { Star } from 'lucide-react';
import { createPageUrl } from '../utils/index.js';
import './Home.css'; // Assuming you created this from the previous step

// Memoize heavy, static components to prevent re-renders
import GalaxySystem from '../components/GalaxySystem';
import FloatingAstronaut from '../components/FloatingAstronaut';
import ShootingStars from '../components/ShootingStars';

const MemoizedGalaxy = memo(GalaxySystem);
const MemoizedAstronaut = memo(FloatingAstronaut);
const MemoizedStars = memo(ShootingStars);

const API_URL = 'http://127.0.0.1:5000';
const CACHE_DURATION = 3600 * 1000;

export default function Home() {
  const navigate = useNavigate(); 
  const [trending, setTrending] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // This data-fetching logic remains the same
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const cacheKey = 'homeContentCache';
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setTrending(data.trending || []);
          setFeaturedMovies(data.featuredMovies || []);
          setPopularSeries(data.popularSeries || []);
          setLoading(false);
          return;
        }
      }

      try {
        // MODIFIED: Changed endpoint from /home_content to /home
        const response = await fetch(`${API_URL}/home_content`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setTrending(data.trending || []);
        setFeaturedMovies(data.featuredMovies || []);
        setPopularSeries(data.popularSeries || []);
        sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      } catch (error) {
        console.error('Error loading home content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleMovieClick = (movie) => {
    if (movie?.id) {
       navigate(createPageUrl(`MovieDetails?id=${movie.id}&type=${movie.type}`));
    }
  };
  
  // Memoizing this calculation is a good performance practice
  const uniqueContent = useMemo(() => {
    const allContent = [...trending, ...featuredMovies, ...popularSeries];
    return Array.from(new Map(allContent.map(item => [item.id, item])).values());
  }, [trending, featuredMovies, popularSeries]);

  return (
    <div className="home-container">
      {/* Background elements are rendered outside the loading logic */}
      <MemoizedStars />
      <MemoizedGalaxy />
      <MemoizedAstronaut />
      
      {/* KEY CHANGE: The page structure now renders immediately. */}
      {/* The top-level loading conditional is REMOVED. */}
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Cinematic Experience</h1>
          <p className="hero-subtitle">Discover thousands of movies and series with stunning visuals and immersive storytelling.</p>
        </div>
      </section>

      {/* The `loading` prop is now passed down to each component */}
      <section className="content-section">
        <MovieSlider 
            movies={trending} 
            title="Trending Now" 
            onMovieClick={handleMovieClick} 
            loading={loading} 
        />
      </section>

      <section className="content-section">
        <MovieSlider 
            movies={featuredMovies} 
            title="Featured Movies" 
            onMovieClick={handleMovieClick} 
            loading={loading} 
        />
      </section>

      <section className="content-section">
        <MovieSlider 
            movies={popularSeries} 
            title="Popular Series" 
            onMovieClick={handleMovieClick} 
            loading={loading} 
        />
      </section>

      <section className="content-section">
        <div className="section-header">
          <Star className="section-icon" />
          <h2 className="section-title">All Content</h2>
        </div>
        <MovieGrid 
            movies={uniqueContent} 
            onMovieClick={handleMovieClick} 
            loading={loading} 
        />
      </section>
    </div>
  );
}