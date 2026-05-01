'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CinematicBackgroundText() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const rows = containerRef.current.querySelectorAll('.cinema-bg-text-row')
    
    // Each row has a different scrolling speed and direction
    const configs = [
      { speed: 60, dir: -1 },
      { speed: 45, dir: 1 },
      { speed: 70, dir: -1 }
    ]

    const animations = []

    rows.forEach((row, index) => {
      const config = configs[index % configs.length]
      
      // Calculate travel distance based on total width
      // We assume the text content is long enough to span at least 2 viewport widths
      const anim = gsap.to(row, {
        xPercent: config.dir * -50,
        duration: config.speed,
        ease: 'none',
        repeat: -1
      })
      
      animations.push(anim)
    })

    return () => {
      animations.forEach(a => a.kill())
    }
  }, [])

  const textContent = Array(10).fill('CINEMA ✕ SYNAPTIC ✕ DISCOVER ✕ MOOD ✕ SIGNAL ✕ CURATE ✕ WORLDS ✕').join(' ')

  return (
    <div className="cinema-bg-text-container" ref={containerRef}>
      <div className="absolute inset-0 flex flex-col justify-between py-12">
        <div 
          className="cinema-bg-text-row text-black opacity-[0.025] font-display"
          style={{ fontSize: 'clamp(80px, 10vw, 180px)', transform: 'rotateX(-3deg)' }}
        >
          {textContent}
        </div>
        <div 
          className="cinema-bg-text-row text-black opacity-[0.035] font-display"
          style={{ fontSize: 'clamp(80px, 10vw, 180px)', transform: 'rotateX(-1deg)' }}
        >
          {textContent}
        </div>
        <div 
          className="cinema-bg-text-row text-black opacity-[0.02] font-display"
          style={{ fontSize: 'clamp(80px, 10vw, 180px)', transform: 'rotateX(2deg)' }}
        >
          {textContent}
        </div>
      </div>
    </div>
  )
}
