'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LensGraphic from '@/components/LensGraphic'
import MagneticButton from '@/components/MagneticButton'
import RippleButton from '@/components/RippleButton'
import MovieSliderSection from '@/components/MovieSliderSection'
import GlitchCube from '@/components/GlitchCube'
import { useParallax } from '@/hooks/useParallax'

export default function Home() {
  const router = useRouter()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const { x, y } = useParallax(heroRef)
  
  const [data, setData] = useState({ trending: [], featuredMovies: [], popularSeries: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/home_content')
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-enter')
    elements.forEach((el, i) => {
      el.style.opacity = '0'
      setTimeout(() => {
        const flicker = [0, 1, 0, 1, 0.5, 1, 0, 1]
        flicker.forEach((val, fi) => {
          setTimeout(() => { el.style.opacity = String(val) }, fi * 40)
        })
      }, i * 100 + 200)
    })
  }, [])

  return (
    <div className="w-full flex flex-col relative pb-16">
      <div 
        ref={heroRef}
        className="relative w-full min-h-[calc(100vh-104px)] flex flex-col lg:flex-row"
      >
        <div className="ghost-text bottom-0 left-4 lg:left-12">CINEMA</div>
        
        <GlitchCube />

        {/* Left Zone - Text */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-0 relative z-10">
          <h1 
            ref={titleRef}
            className="font-display text-[clamp(60px,8vw,100px)] leading-[0.92] text-black uppercase mb-12 animate-enter"
            style={{ transform: `translate(${x * 24}px, ${y * 12}px)` }}
          >
            <span className="block">A faster,</span>
            <span className="block">mood-shaped</span>
            <span className="block">cinema surface</span>
            <span className="block">for movies</span>
            <span className="block">and series.</span>
          </h1>

          <div className="animate-enter">
            <MagneticButton 
              onClick={() => router.push('/collection')}
              className="w-[100px] h-[100px] rounded-full border border-black text-black hover:bg-black hover:text-cream font-body text-[11px] tracking-widest uppercase transition-colors"
            >
              View Details
            </MagneticButton>
          </div>
        </div>

        {/* Right Zone - Visual + Stats */}
        <div className="w-full lg:w-[320px] shrink-0 border-t lg:border-t-0 lg:border-l border-[rgba(0,0,0,0.1)] flex flex-col relative z-10 glass-frost">
          <div 
            className="flex-1 flex items-center justify-center p-8 animate-enter relative"
            style={{ transform: `translate(${x * -16}px, ${y * -8}px)` }}
          >
            <LensGraphic />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-[1px] glass-frost border-t border-[rgba(0,0,0,0.1)]">
            <StatBox title="Trending Now" value={loading ? "..." : data.trending?.length || 0} />
            <StatBox title="Featured Films" value={loading ? "..." : data.featuredMovies?.length || 0} />
            <StatBox title="Popular Series" value={loading ? "..." : data.popularSeries?.length || 0} className="col-span-2" />
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col relative z-10 animate-[fade-in_0.8s_ease-out]">
        <MovieSliderSection title="Trending Now" movies={data.trending} loading={loading} />
        <MovieSliderSection title="Featured Films" movies={data.featuredMovies} loading={loading} />
        <MovieSliderSection title="Popular Series" movies={data.popularSeries} loading={loading} />
      </div>
    </div>
  )
}

function StatBox({ title, value, className = '' }) {
  return (
    <RippleButton className={`group glass-frost-light p-6 flex flex-col items-start transition-colors duration-300 hover:bg-black hover:text-cream animate-enter ${className}`}>
      <span className="font-display text-4xl lg:text-5xl text-black group-hover:text-cream mb-2 transition-colors duration-300">{value}</span>
      <span className="font-body text-[10px] text-mid group-hover:text-gray tracking-widest uppercase transition-colors duration-300 w-1/2 leading-relaxed">
        {title}
      </span>
    </RippleButton>
  )
}
