'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/MovieCard'
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([])
      return
    }

    const fetchSearch = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`)
        const data = await res.json()
        
        // Flatten movies and series
        const allContent = [
          ...(data.movies || []),
          ...(data.series || [])
        ]

        // Remove duplicates by ID
        const uniqueMovies = Array.from(new Map(allContent.map(item => [item.id, item])).values())
        setMovies(uniqueMovies)
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSearch()
  }, [debouncedQuery])

  return (
    <div className="w-full min-h-full flex flex-col relative pb-8">
      {/* Header & Search Bar */}
      <div className="px-6 lg:px-12 py-12 relative z-10 border-b border-[rgba(0,0,0,0.1)] bg-cream flex flex-col gap-8 sticky top-0">
        <h1 className="font-display text-7xl text-black leading-none">Search</h1>
        
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-mid w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by title, genre, or mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-2 border border-[rgba(0,0,0,0.2)] pl-12 pr-4 py-4 font-body text-[13px] tracking-wide focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="flex-1 w-full relative z-10 bg-[rgba(0,0,0,0.1)] p-[1px]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-full aspect-[0.70] bg-cream animate-pulse border border-[rgba(0,0,0,0.1)]"></div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1px]">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={(m) => console.log('Movie clicked', m)}
              />
            ))}
          </div>
        ) : debouncedQuery ? (
          <div className="bg-cream h-full min-h-[40vh] flex items-center justify-center">
            <p className="font-body text-[11px] tracking-widest text-mid uppercase">
              No signals found for "{debouncedQuery}"
            </p>
          </div>
        ) : (
          <div className="bg-cream h-full min-h-[40vh] flex items-center justify-center">
            <p className="font-body text-[11px] tracking-widest text-mid uppercase">
              Enter a search term to begin
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
