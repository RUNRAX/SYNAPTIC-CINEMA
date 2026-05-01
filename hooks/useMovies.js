'use client'

import { useState, useMemo, useEffect } from 'react'

export function useMovies() {
  const [activeGenres, setActiveGenres] = useState([])
  const [apiMovies, setApiMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/collection_content')
        const data = await response.json()
        
        if (data) {
          const allContent = [
            ...(data.movies || []),
            ...(data.series || [])
          ]
          
          // Remove duplicates by ID
          const uniqueMovies = Array.from(new Map(allContent.map(item => [item.id, item])).values())
          
          setApiMovies(uniqueMovies)
        }
      } catch (err) {
        console.error('Error fetching home content:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchApiData()
  }, [])

  const filteredMovies = useMemo(() => {
    return apiMovies.filter((movie) => {
      // Filter by selected genres
      if (activeGenres.length === 0) return true
      const movieGenre = (movie.genre || '').toUpperCase()
      return activeGenres.includes(movieGenre)
    })
  }, [activeGenres, apiMovies])

  const toggleGenre = (genre) => {
    setActiveGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  return {
    movies: filteredMovies,
    loading,
    activeGenres,
    toggleGenre
  }
}
