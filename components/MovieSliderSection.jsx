'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import MovieCard from './MovieCard'
import { triggerGlitch } from '@/hooks/useGlitch'

export default function MovieSliderSection({ title, movies, loading = false }) {
  const sliderRef = useRef(null)
  const router = useRouter()

  if (!loading && (!movies || movies.length === 0)) return null

  return (
    <div className="w-full py-12 border-t border-[rgba(0,0,0,0.1)] overflow-hidden">
      <div className="px-6 lg:px-12 mb-6 flex justify-between items-end">
        <h2 className="font-display text-4xl text-black uppercase">{title}</h2>
      </div>

      <div className="w-full relative">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-[1px] px-6 lg:px-12 pb-8 pt-2 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] max-w-[160px] md:max-w-[200px] lg:max-w-[240px] aspect-[0.70] bg-[rgba(0,0,0,0.05)] animate-pulse border border-[rgba(0,0,0,0.1)] snap-start shrink-0"></div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] max-w-[160px] md:max-w-[200px] lg:max-w-[240px] aspect-[0.70] snap-start shrink-0">
                <MovieCard 
                  movie={movie} 
                  onClick={(m) => {
                    triggerGlitch(() => {
                      router.push(`/details?id=${m.id}&type=${m.type}`)
                    })
                  }} 
                />
              </div>
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
