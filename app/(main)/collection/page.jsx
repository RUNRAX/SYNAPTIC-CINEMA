'use client'

import { useSearchParams } from 'next/navigation'
import MovieCard from '@/components/MovieCard'
import { useMovies } from '@/hooks/useMovies'
import { useEffect } from 'react'

export default function Collection() {
  const searchParams = useSearchParams()
  const genreParam = searchParams.get('genre')
  const { movies, toggleGenre, activeGenres } = useMovies()

  // Apply genre filter from URL if present on mount
  useEffect(() => {
    if (genreParam && !activeGenres.includes(genreParam.toUpperCase())) {
      toggleGenre(genreParam.toUpperCase())
    }
  }, [genreParam])

  return (
    <div className="w-full min-h-full flex flex-col relative pb-8">
      {/* Header */}
      <div className="px-6 lg:px-12 py-12 relative z-10 border-b border-[rgba(0,0,0,0.1)]">
        <h1 className="font-display text-7xl text-black leading-none mb-4">Collection</h1>
        <p className="font-body text-[12px] text-mid tracking-[0.08em] uppercase max-w-md">
          Browse curated films by genre, mood, and era
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 w-full relative z-10 bg-[rgba(0,0,0,0.1)] p-[1px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1px]">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={(m) => console.log('Movie clicked', m)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
