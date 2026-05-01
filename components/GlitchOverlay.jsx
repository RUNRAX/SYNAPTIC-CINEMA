'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlitchOverlay() {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleGlitch = (e) => {
      const { callback } = e.detail
      const overlay = overlayRef.current
      if (!overlay) {
        if (callback) callback()
        return
      }

      // Slices for the glitch
      const slices = overlay.querySelectorAll('.transition-slice')
      const rgbCyan = overlay.querySelector('.rgb-cyan')
      const rgbRed = overlay.querySelector('.rgb-red')
      const scanlineBurst = overlay.querySelector('.scanline-burst')
      const noise = overlay.querySelector('.noise-burst')

      // Main Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { opacity: 0 })
          // Reset styles
          gsap.set(slices, { clearProps: 'all' })
          gsap.set([rgbCyan, rgbRed, scanlineBurst, noise], { clearProps: 'all' })
        }
      })

      // Phase 1: Break
      gsap.set(overlay, { opacity: 1 })
      
      tl.to(slices, {
        x: () => gsap.utils.random(-80, 80),
        scaleX: () => gsap.utils.random(0.9, 1.1),
        skewX: () => gsap.utils.random(-10, 10),
        duration: 0.15,
        stagger: 0.01,
        ease: 'steps(3)'
      }, 0)

      tl.to([rgbCyan, rgbRed], {
        x: (i) => i === 0 ? -6 : 6,
        opacity: 0.8,
        duration: 0.1,
        ease: 'none'
      }, 0)

      tl.to(scanlineBurst, {
        opacity: 0.5,
        scaleY: 1.2,
        duration: 0.2
      }, 0)

      // Phase 2: Hold & Flash
      tl.to(overlay, {
        backgroundColor: 'var(--cream)',
        duration: 0.05,
        yoyo: true,
        repeat: 3
      }, 0.2)

      tl.to(noise, {
        opacity: 0.4,
        duration: 0.1,
        yoyo: true,
        repeat: 2
      }, 0.2)

      // Phase 3: Execute Callback (Black Screen)
      tl.to(overlay, {
        backgroundColor: 'var(--black)',
        duration: 0.1,
        onComplete: () => {
          if (callback) callback()
        }
      }, 0.4)

      // Phase 4: Resolve (Fade out)
      tl.to(slices, {
        x: 0,
        scaleX: 1,
        skewX: 0,
        duration: 0.15,
        ease: 'power2.out'
      }, 0.55)

      tl.to([rgbCyan, rgbRed, scanlineBurst, noise], {
        opacity: 0,
        duration: 0.1
      }, 0.55)

      tl.to(overlay, {
        opacity: 0,
        duration: 0.15
      }, 0.6)
    }

    window.addEventListener('trigger-glitch', handleGlitch)
    return () => window.removeEventListener('trigger-glitch', handleGlitch)
  }, [])

  return (
    <div 
      id="glitch-overlay" 
      ref={overlayRef}
      className="fixed inset-0 z-[8888] pointer-events-none flex flex-col opacity-0"
    >
      {/* 10 Horizontal Slices */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div 
          key={i} 
          className="transition-slice flex-1 bg-black will-change-transform"
        ></div>
      ))}

      {/* RGB Layers */}
      <div className="rgb-cyan absolute inset-0 bg-[rgba(0,255,255,0.3)] mix-blend-screen opacity-0 will-change-transform"></div>
      <div className="rgb-red absolute inset-0 bg-[rgba(255,0,0,0.3)] mix-blend-screen opacity-0 will-change-transform"></div>

      {/* Scanline Burst */}
      <div className="scanline-burst absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.8)_2px,rgba(0,0,0,0.8)_4px)] opacity-0 mix-blend-overlay will-change-transform"></div>

      {/* Noise Burst */}
      <div className="noise-burst absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 256 256\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\'/%3E%3C/svg%3E')] opacity-0 mix-blend-difference will-change-opacity"></div>
    </div>
  )
}
