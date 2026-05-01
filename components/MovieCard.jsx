'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ripple } from '@/lib/utils'

export default function MovieCard({ movie, onClick }) {
  const cardRef = useRef(null)
  const [imageError, setImageError] = useState(false)

  const handleClick = (e) => {
    if (cardRef.current) {
      ripple(cardRef.current, e)
    }
    if (onClick) onClick(movie)
  }

  // Generate deterministic but random-looking halftone SVG for fallback
  const generateHalftone = () => {
    let circles = ''
    for (let i = 0; i < 40; i++) {
      const cx = (i * 13) % 100
      const cy = (i * 17) % 100
      const r = (i % 3) + 0.5
      const opacity = (i % 5) * 0.05 + 0.05
      circles += `<circle cx="${cx}%" cy="${cy}%" r="${r}%" fill="black" opacity="${opacity}" />`
    }
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">${circles}</svg>`
  }

  return (
    <div 
      ref={cardRef}
      className="group relative w-full h-full aspect-[0.70] overflow-hidden cursor-pointer bg-cream-2 flex flex-col rounded-xl"
      onClick={handleClick}
    >
      {/* Poster Image or Fallback */}
      <div className="relative flex-1 w-full bg-cream overflow-hidden rounded-t-xl">
        {movie.poster && !imageError && movie.poster !== '/placeholder.jpg' ? (
          <Image
            src={movie.poster}
            alt={movie.title || 'Movie Poster'}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url('${generateHalftone()}')`, backgroundSize: 'cover' }}
          ></div>
        )}
        
        {/* Rating Badge (if available) */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black text-cream px-2 py-1 font-body text-[9px] tracking-widest z-10 transition-colors group-hover:bg-accent group-hover:text-black">
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-cream/70 backdrop-blur-md border-t border-[rgba(0,0,0,0.1)] transition-colors duration-300 group-hover:bg-black/70 group-hover:text-cream flex flex-col gap-[2px] z-20 rounded-b-xl">
        <h3 className="font-body font-bold text-[11px] truncate uppercase tracking-wide">{movie.title}</h3>
        <p className="font-body text-[9px] text-mid group-hover:text-gray uppercase tracking-wider">
          {movie.year} · {movie.genre}
        </p>
      </div>
    </div>
  )
}
