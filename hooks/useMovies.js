'use client'

import { useState, useMemo, useEffect } from 'react'
import { MOVIES } from '@/lib/movies'
import { getContent } from '@/services/api'

export function useMovies() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGenres, setActiveGenres] = useState([])
  const [apiMovies, setApiMovies] = useState([])

  useEffect(() => {
    const fetchApiData = async () => {
      const data = await getContent('trending')
      if (data && data.movies) {
        // Format API movies to match our structure
        const formatted = data.movies.map((m, i) => ({
          id: `api-${m.id || i}`,
          title: m.title || m.name,
          genre: m.genre || 'DRAMA',
          year: m.release_date ? m.release_date.split('-')[0] : '2023',
          mood: m.mood || 'trending',
          color: m.color || '#1A1A1A',
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '/placeholder.jpg'
        }))
        setApiMovies(formatted)
      }
    }
    fetchApiData()
  }, [])

  const combinedMovies = useMemo(() => {
    return [...MOVIES, ...apiMovies]
  }, [apiMovies])

  const filteredMovies = useMemo(() => {
    return combinedMovies.filter((movie) => {
      // Filter by search query
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.mood.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Filter by selected genres
      const matchesGenre = activeGenres.length === 0 || activeGenres.includes(movie.genre.toUpperCase())
      
      return matchesSearch && matchesGenre
    })
  }, [searchQuery, activeGenres, combinedMovies])

  const toggleGenre = (genre) => {
    setActiveGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  return {
    movies: filteredMovies,
    searchQuery,
    setSearchQuery,
    activeGenres,
    toggleGenre
  }
}
