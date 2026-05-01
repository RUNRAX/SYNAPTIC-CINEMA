'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import MovieCard from '@/components/MovieCard'
import { useMovies } from '@/hooks/useMovies'
import { useEffect, useState } from 'react'
import { triggerGlitch } from '@/hooks/useGlitch'
import { useFlickerIn } from '@/hooks/useFlickerIn'

export default function Collection() {
  useFlickerIn()
  const searchParams = useSearchParams()
  const router = useRouter()
  const genreParam = searchParams.get('genre')
  const { movies: tmdbMovies, loading: tmdbLoading, toggleGenre, activeGenres } = useMovies()
  
  const [savedMovies, setSavedMovies] = useState([])
  const [loadingSaved, setLoadingSaved] = useState(true)
  const [showSaved, setShowSaved] = useState(false)

  // Apply genre filter from URL if present on mount
  useEffect(() => {
    if (genreParam && !activeGenres.includes(genreParam.toUpperCase())) {
      toggleGenre(genreParam.toUpperCase())
    }
    // Also if there's no genreParam, we could default to showing saved movies if we wanted to
  }, [genreParam])

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const savedStr = localStorage.getItem('myCollection')
        if (!savedStr) {
          setLoadingSaved(false)
          return
        }
        
        const savedIds = JSON.parse(savedStr) // Array of objects: {id, type}
        if (savedIds.length === 0) {
          setLoadingSaved(false)
          return
        }

        // We will fetch each detail
        const results = await Promise.all(savedIds.map(async (item) => {
          try {
            const res = await fetch(`/api/details?id=${item.id}&type=${item.type}`)
            if (res.ok) return await res.json()
          } catch (e) {}
          return null
        }))

        setSavedMovies(results.filter(Boolean))
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingSaved(false)
      }
    }

    fetchSaved()
  }, [])

  const currentMovies = showSaved ? savedMovies : tmdbMovies
  const currentLoading = showSaved ? loadingSaved : tmdbLoading

  return (
    <div className="w-full min-h-full flex flex-col relative pb-8">
      {/* Header */}
      <div className="px-6 lg:px-12 py-12 relative z-10 border-b border-[rgba(0,0,0,0.1)] flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass-frost animate-enter">
        <div>
          <h1 className="font-display text-7xl text-black leading-none mb-4">Collection</h1>
          <p className="font-body text-[12px] text-mid tracking-[0.08em] uppercase max-w-md">
            Browse curated films by genre, mood, and era
          </p>
        </div>
        
        <div className="flex glass-frost-light p-1 border border-[rgba(0,0,0,0.1)] animate-enter">
          <button 
            onClick={() => setShowSaved(false)}
            className={`px-6 py-2 font-body text-[10px] tracking-widest uppercase transition-colors rounded-lg ${!showSaved ? 'bg-black text-cream glass-frost-dark' : 'text-black hover:bg-[rgba(0,0,0,0.05)]'}`}
          >
            DISCOVER
          </button>
          <button 
            onClick={() => setShowSaved(true)}
            className={`px-6 py-2 font-body text-[10px] tracking-widest uppercase transition-colors rounded-lg ${showSaved ? 'bg-black text-cream glass-frost-dark' : 'text-black hover:bg-[rgba(0,0,0,0.05)]'}`}
          >
            MY SAVED
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 w-full relative z-10 bg-[rgba(0,0,0,0.1)] p-[1px]">
        {currentLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-full aspect-[0.70] bg-cream animate-pulse border border-[rgba(0,0,0,0.1)]"></div>
            ))}
          </div>
        ) : currentMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1px]">
            {currentMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={(m) => {
                  triggerGlitch(() => {
                    router.push(`/details?id=${m.id}&type=${m.type}`)
                  })
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-cream h-full min-h-[40vh] flex items-center justify-center">
            <p className="font-body text-[11px] tracking-widest text-mid uppercase">
              {showSaved ? "You haven't saved any films yet" : "No films found"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
