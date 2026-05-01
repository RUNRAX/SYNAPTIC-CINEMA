'use client'

import { useRef } from 'react'
import { ripple } from '@/lib/utils'

export default function MovieCard({ movie, onClick }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    
    // We disable the 3D tilt if we want to focus on the ::before wipe,
    // but the spec says "Optional 3D tilt". We'll include a subtle one.
    cardRef.current.style.transform = `perspective(400px) rotateX(${cy * -4}deg) rotateY(${cx * 4}deg) scale(0.98)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = ''
  }

  const handleClick = (e) => {
    if (cardRef.current) {
      ripple(cardRef.current, e)
    }
    if (onClick) onClick(movie)
  }

  // Generate deterministic but random-looking halftone SVG for background
  const generateHalftone = () => {
    let circles = ''
    for (let i = 0; i < 40; i++) {
      const cx = (i * 13) % 100
      const cy = (i * 17) % 100
      const r = (i % 3) + 0.5
      const opacity = (i % 5) * 0.05 + 0.05
      circles += `<circle cx="${cx}%" cy="${cy}%" r="${r}%" fill="white" opacity="${opacity}" />`
    }
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">${circles}</svg>`
  }

  return (
    <div 
      ref={cardRef}
      className="movie-card relative w-full aspect-[0.70] overflow-hidden cursor-pointer bg-black transition-transform duration-300 ease-out"
      style={{ backgroundColor: movie.color || '#1A1A1A' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Halftone Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url('${generateHalftone()}')`, backgroundSize: 'cover' }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

      {/* Ghost Genre Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <span className="font-display text-white/5 text-6xl leading-none rotate-[-90deg] origin-center whitespace-nowrap pointer-events-none uppercase">
          {movie.genre}
        </span>
      </div>

      {/* Wipe effect pseudo-element replacement */}
      <div className="card-wipe absolute inset-0 bg-black translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] z-20"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-30 flex flex-col gap-1 transition-colors duration-300 card-content">
        <h3 className="font-body font-bold text-[12px] text-cream truncate">{movie.title}</h3>
        <p className="font-body text-[10px] text-gray uppercase tracking-wider">
          {movie.year} · {movie.mood}
        </p>
        <span className="inline-block self-start mt-2 px-2 py-1 border border-current font-body text-[9px] tracking-widest uppercase">
          {movie.genre}
        </span>
      </div>

      <style jsx>{`
        .movie-card:hover .card-wipe {
          transform: translateY(0);
        }
        .movie-card:hover .card-content h3 {
          color: var(--cream);
        }
        .movie-card:hover .card-content p,
        .movie-card:hover .card-content span {
          color: var(--gray);
        }
        /* Active scale handled via global or specific classes if needed */
        .movie-card:active {
          transform: scale(0.96) !important;
        }
      `}</style>
    </div>
  )
}
