import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '../utils/index.js';
import { ArrowLeft, Heart, Brain } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import './EmotionResults.css';

const API_URL = 'http://127.0.0.1:5000';
const CACHE_DURATION = 3600 * 1000; 

export default function EmotionResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [emotion, setEmotion] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const detectedEmotion = urlParams.get('emotion') || 'neutral';
    setEmotion(detectedEmotion);
    
    const loadEmotionBasedContent = async (emotionToLoad) => {
      setLoading(true);
      const savedDevSettings = JSON.parse(localStorage.getItem('devSettings') || '{}');
      const minImdbRating = savedDevSettings.minImdbRating || 7.5;
      const genreOverrideIds = (savedDevSettings.genreOverrides?.[emotionToLoad] || []).join(',');

      const apiUrl = `${API_URL}/recommendations?emotion=${emotionToLoad}&minImdbRating=${minImdbRating}&genreOverrideIds=${genreOverrideIds}`;
      const cacheKey = `emotionContentCache_${emotionToLoad}_${minImdbRating}_${genreOverrideIds}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setContent([...(data.movies || []), ...(data.series || [])]);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setContent([...(data.movies || []), ...(data.series || [])]);
        sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      } catch (error) {
        console.error('Error loading emotion-based content:', error);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    loadEmotionBasedContent(detectedEmotion);
  }, [location.search]);

  const handleMovieClick = (movie) => {
    if (movie?.id) {
       navigate(createPageUrl(`MovieDetails?id=${movie.id}&type=${movie.type}`));
    }
  };

  const getEmotionDescription = (emo) => {
    const descriptions = { /* ... your descriptions ... */ };
    return descriptions[emo] || "Curated content based on your current mood";
  };

  return (
    <div className="page-container emotion-results-container">
      <div className="results-header">
        <button className="back-button" onClick={() => navigate(createPageUrl('Synaptic'))}>
          <ArrowLeft size={20} /> Back to Synaptic
        </button>
        <div className="emotion-info">
          <h1 className="emotion-title">{emotion} Mood Detected</h1>
          <p className="emotion-description">{getEmotionDescription(emotion)}</p>
        </div>
      </div>
      <div className="emotion-stats">
        <div className="stat-item">
          <Brain className="emotion-icon" style={{ margin: '0 auto 1rem' }} />
          <div className="stat-number">95%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-item">
          <Heart className="emotion-icon" style={{ margin: '0 auto 1rem' }} />
          <div className="stat-number">{loading ? '...' : content.length}</div>
          <div className="stat-label">Matches Found</div>
        </div>
      </div>
      <MovieGrid movies={content} loading={loading} onMovieClick={handleMovieClick} />
    </div>
  );
}