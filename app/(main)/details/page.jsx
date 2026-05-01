'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { triggerGlitch } from '@/hooks/useGlitch'
import MovieSliderSection from '@/components/MovieSliderSection'
import RippleButton from '@/components/RippleButton'

export default function Details() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')
  const type = searchParams.get('type')

  const [details, setDetails] = useState(null)
  const [similar, setSimilar] = useState([])
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!id || !type) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const [detRes, simRes, credRes] = await Promise.all([
          fetch(`/api/details?id=${id}&type=${type}`),
          fetch(`/api/similar?id=${id}&type=${type}`),
          fetch(`/api/credits?id=${id}&type=${type}`)
        ])

        if (detRes.ok) setDetails(await detRes.json())
        if (simRes.ok) setSimilar((await simRes.json()).results || [])
        if (credRes.ok) setCredits((await credRes.json()).cast || [])

        // Check if saved
        const savedStr = localStorage.getItem('myCollection')
        if (savedStr) {
          const savedIds = JSON.parse(savedStr)
          setIsSaved(savedIds.some(item => String(item.id) === String(id)))
        }

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, type])

  const toggleSave = () => {
    try {
      const savedStr = localStorage.getItem('myCollection')
      let savedItems = savedStr ? JSON.parse(savedStr) : []
      
      if (isSaved) {
        savedItems = savedItems.filter(item => String(item.id) !== String(id))
      } else {
        savedItems.push({ id, type })
      }
      
      localStorage.setItem('myCollection', JSON.stringify(savedItems))
      setIsSaved(!isSaved)
    } catch (e) {
      console.error('Error saving to collection', e)
    }
  }

  const handleBack = () => {
    triggerGlitch(() => {
      router.back()
    })
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-cream">
        <div className="font-body text-[11px] tracking-widest uppercase animate-pulse">Initializing Interface...</div>
      </div>
    )
  }

  if (!details) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-cream">
        <div className="font-body text-[11px] tracking-widest uppercase text-mid">Signal Lost. File not found.</div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-full flex flex-col relative pb-16 bg-cream">
      
      {/* Back Button */}
      <div className="fixed top-20 left-6 lg:left-[224px] z-30">
        <button 
          onClick={handleBack}
          className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-4 py-2 font-body text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
        >
          ← BACK TO SECTOR
        </button>
      </div>

      {/* Hero Backdrop */}
      <div className="relative w-full h-[60vh] lg:h-[75vh] bg-black overflow-hidden flex items-end border-b border-[rgba(0,0,0,0.1)]">
        {details.backdrop_url && (
          <Image 
            src={details.backdrop_url} 
            alt={details.title}
            fill
            className="object-cover opacity-80"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 256 256\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\'/%3E%3C/svg%3E')] opacity-[0.035] pointer-events-none mix-blend-overlay"></div>
        
        {/* Title Block */}
        <div className="relative z-10 w-full px-6 lg:px-12 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-4xl">
            <h1 className="font-display text-[clamp(40px,6vw,120px)] leading-[0.9] text-black uppercase mb-4 drop-shadow-sm">
              {details.title}
            </h1>
            <div className="flex flex-wrap gap-4 font-body text-[11px] tracking-widest uppercase text-black font-bold">
              <span>{details.year}</span>
              <span>•</span>
              <span>{details.genre}</span>
              <span>•</span>
              <span>{details.duration}</span>
              <span>•</span>
              <span className="bg-black text-accent px-2">IMDB {details.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <RippleButton 
            onClick={toggleSave}
            className={`shrink-0 px-8 py-4 font-body text-[11px] tracking-widest uppercase transition-colors border ${isSaved ? 'bg-black text-cream border-black' : 'bg-transparent text-black border-black hover:bg-black hover:text-cream'}`}
          >
            {isSaved ? '- REMOVE FROM COLLECTION' : '+ ADD TO COLLECTION'}
          </RippleButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row border-b border-[rgba(0,0,0,0.1)]">
        
        {/* Left Col: Synopsis & Credits */}
        <div className="flex-1 p-6 lg:p-12 lg:border-r border-[rgba(0,0,0,0.1)] overflow-hidden min-w-0">
          <h2 className="font-body text-[11px] tracking-[0.2em] uppercase text-mid mb-6">SYNOPSIS</h2>
          <p className="font-body text-[16px] lg:text-[20px] leading-[1.6] text-black max-w-3xl mb-16">
            {details.overview}
          </p>

          <h2 className="font-body text-[11px] tracking-[0.2em] uppercase text-mid mb-6">TOP CAST</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {credits.map((person) => (
              <div key={person.id} className="min-w-[120px] w-[120px] snap-start shrink-0">
                <div className="w-full aspect-[0.8] bg-cream-2 overflow-hidden mb-3 border border-[rgba(0,0,0,0.1)] relative">
                  {person.profile_path ? (
                    <Image 
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} 
                      alt={person.name}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  )}
                </div>
                <h3 className="font-body font-bold text-[10px] uppercase truncate tracking-wider">{person.name}</h3>
                <p className="font-body text-[9px] text-mid uppercase truncate mt-1 tracking-widest">{person.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Trailer */}
        <div className="w-full lg:w-[450px] shrink-0 bg-cream-2 p-6 lg:p-12 flex flex-col">
          <h2 className="font-body text-[11px] tracking-[0.2em] uppercase text-mid mb-6">TRAILER ARCHIVE</h2>
          
          {details.trailerKey ? (
            <div className="w-full aspect-video bg-black border border-black relative group">
              <iframe 
                src={`https://www.youtube.com/embed/${details.trailerKey}?controls=1&modestbranding=1`} 
                title="Trailer" 
                className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-[600ms]"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="w-full aspect-video bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.1)] flex items-center justify-center">
              <span className="font-body text-[10px] tracking-widest text-mid uppercase">NO TRAILER SIGNAL FOUND</span>
            </div>
          )}
        </div>
      </div>

      {/* Similar Content */}
      {similar.length > 0 && (
        <div className="pt-8 bg-cream">
          <MovieSliderSection title="RELATED SIGNALS" movies={similar} />
        </div>
      )}
    </div>
  )
}
