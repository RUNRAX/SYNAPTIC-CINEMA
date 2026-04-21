'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react'
import MovieGrid from '@/components/MovieGrid'
import { useRouter } from 'next/navigation'

// Define the base URL for your backend API
import { API_URL } from '@/lib/config'

export default function Search() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    genre: 'all',
    year: 'all',
    rating: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Unique genres and years are now derived from search results for relevance
  const uniqueGenres = useMemo(() => {
    const genres = searchResults.map(movie => movie.genre).filter(Boolean);
    return [...new Set(genres)];
  }, [searchResults]);

  const uniqueYears = useMemo(() => {
    const years = searchResults.map(movie => movie.year).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [searchResults]);

  // This useEffect triggers a new search when the query or filters change.
  // A debounce is used to prevent API calls on every keystroke.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        performQuerySearch();
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleMovieClick = (movie) => {
    if (movie && movie.id) {
      router.push(`/MovieDetails?id=${movie.id}&type=${movie.type}`)
    }
  };
  // This function searches using ONLY the text in the search bar.
  const performQuerySearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]); // Clear results if search bar is empty
      return;
    }
    setLoading(true);
    const params = new URLSearchParams({ query: searchQuery });
    try {
      const response = await fetch(`${API_URL}/search?${params.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSearchResults([...(data.movies || []), ...(data.series || [])]);
    } catch (error) {
      console.error('Error performing query search:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // This function searches using ONLY the selected filters.
  const performFilterSearch = async () => {
    setSearchQuery(''); // Clear the search bar to show we are in "filter mode"
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== 'all') {
        params.append(key, value);
      }
    });

    if (Array.from(params.keys()).length === 0) {
      setSearchResults([]);
      setLoading(false);
      return; // Do nothing if no filters are selected
    }

    try {
      const response = await fetch(`${API_URL}/search?${params.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSearchResults([...(data.movies || []), ...(data.series || [])]);
    } catch (error) {
      console.error('Error performing filter search:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const resetFilters = () => {
    setFilters({ type: 'all', genre: 'all', year: 'all', rating: 'all' });
    setSortBy('relevance');
    // The useEffect will trigger a re-search automatically
  };

  // Memoized sorting so it only runs when results or sort order change
  const sortedResults = useMemo(() => {
    let results = [...searchResults];
    results.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'rating':
          return (b.vote_average || 0) - (a.vote_average || 0);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        case 'relevance':
        default:
          return 0; // Backend already sorts by relevance
      }
    });
    return results;
  }, [searchResults, sortBy]);

  return (
    <>
      <style>{`
        /* Styles remain unchanged */
        .search-container {
          min-height: 100vh;
          background: transparent;
          padding: 0 0 2rem;
        }
        .search-header {
          text-align: center;
          margin-bottom: 2rem;
          padding: 2rem 1.5rem;
          border-radius: 32px;
          background: var(--surface-elevated);
          border: 1px solid var(--glass-border-strong);
          backdrop-filter: blur(28px) saturate(170%);
          box-shadow: var(--panel-shadow);
          animation: header-appear 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes header-appear {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--grey-800) 0%, var(--silver) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .search-subtitle {
          font-size: 1.1rem;
          color: var(--grey-600);
          line-height: 1.6;
        }
        .search-controls {
          max-width: 900px;
          margin: 0 auto 3rem;
          animation: controls-appear 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }
        @keyframes controls-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-input-container {
          position: relative;
          margin-bottom: 2rem;
        }
        .search-input {
          width: 100%;
          padding: 1.5rem 4.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 25px;
          font-size: 1.1rem;
          color: var(--grey-800);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .search-input:focus {
          border-color: var(--silver);
          box-shadow: 0 20px 40px var(--shadow-light);
          transform: translateY(-4px);
        }
        .search-input::placeholder { color: var(--grey-500); }
        .search-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--grey-500);
          transition: all 0.3s ease;
        }
        .search-input:focus + .search-icon {
          color: var(--silver);
          transform: translateY(-50%) scale(1.1);
        }
        .clear-button {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--grey-500);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .clear-button:hover {
          background: var(--glass-bg);
          color: var(--grey-700);
          transform: translateY(-50%) scale(1.1);
        }
        .filter-section {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-section.collapsed { padding: 1rem 2rem; }
        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .filter-section.collapsed .filter-header { margin-bottom: 0; }
        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-toggle:hover, .filter-toggle.active {
          background: var(--silver-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--shadow-light);
        }
        .filter-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          animation: filter-expand 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .filter-section.collapsed .filter-controls { display: none; }
        @keyframes filter-expand {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .filter-label {
          font-weight: 600;
          color: var(--grey-700);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-select {
          padding: 0.75rem 1rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-800);
          font-weight: 500;
          cursor: pointer;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .filter-select:hover, .filter-select:focus {
          background: var(--silver-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
          border-color: var(--silver);
        }
        .filter-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        .filter-section.collapsed .filter-actions { display: none; }
        .reset-button {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--grey-700);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reset-button:hover {
          background: var(--glass-bg);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }
        .results-info {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          color: var(--grey-600);
          animation: results-appear 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes results-appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--grey-500);
          animation: no-results-appear 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes no-results-appear {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .no-results-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: var(--grey-400);
        }
        @media (max-width: 768px) {
          .search-title { font-size: 2rem; }
          .filter-controls { grid-template-columns: 1fr; gap: 1rem; }
          .search-input { padding: 1.25rem 4rem; font-size: 1rem; }
          .filter-actions { flex-direction: column; }
        }
          /* Add these styles for the new button */
        .apply-button {
          padding: 0.75rem 1.5rem;
          background: var(--silver);
          border: none;
          border-radius: 12px;
          color: var(--primary-white);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .apply-button:hover {
          background: var(--silver-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }
      `}</style>

      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">Manual Search</h1>
          <p className="search-subtitle">Find exactly what you're looking for with our advanced search and filtering system</p>
        </div>

        <div className="search-controls">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies, series, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="search-icon" size={24} />
            {searchQuery && (
              <button className="clear-button" onClick={clearSearch}><X size={20} /></button>
            )}
          </div>

          <div className={`filter-section ${showFilters ? '' : 'collapsed'}`}>
            <div className="filter-header">
              <button className={`filter-toggle ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal size={16} /> Advanced Filters
              </button>
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <label className="filter-label">Content Type</label>
                <select className="filter-select" value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
                  <option value="all">All Types</option>
                  <option value="movie">Movies Only</option>
                  <option value="tv">Series Only</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Genre</label>
                <select className="filter-select" value={filters.genre} onChange={(e) => setFilters({...filters, genre: e.target.value})}>
                  <option value="all">All Genres</option>
                  {/* These genres are now populated dynamically */}
                  {['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'].map(genre => (<option key={genre} value={genre}>{genre}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Release Year</label>
                <select className="filter-select" value={filters.year} onChange={(e) => setFilters({...filters, year: e.target.value})}>
                  <option value="all">All Years</option>
                  {/* You can populate this dynamically if needed */}
                  {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (<option key={year} value={year}>{year}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Min Rating</label>
                <select className="filter-select" value={filters.rating} onChange={(e) => setFilters({...filters, rating: e.target.value})}>
                  <option value="all">Any Rating</option>
                  <option value="8">8.0+ Excellent</option>
                  <option value="7">7.0+ Good</option>
                  <option value="6">6.0+ Decent</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevance">Relevance</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="year">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
              <button className="apply-button" onClick={performFilterSearch}>Apply Filters</button>
            </div>
          </div>
        </div>

        {searchQuery && !loading && (<div className="results-info">Found {sortedResults.length} results for "{searchQuery}"</div>)}

        {searchQuery && !loading && sortedResults.length === 0 ? (
          <div className="no-results">
            <SearchIcon className="no-results-icon" />
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>No results found</h3>
            <p>Try adjusting your search terms or filters to find what you're looking for</p>
          </div>
        ) : (
          <MovieGrid movies={sortedResults} 
          loading={loading} onMovieClick={handleMovieClick} />
        )}
      </div>
    </>
  );
}
