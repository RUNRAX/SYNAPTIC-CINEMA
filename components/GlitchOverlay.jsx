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

      // Shapes for the glitch
      const shapes = overlay.querySelectorAll('.geo-shape')
      const rgbCyan = overlay.querySelector('.rgb-cyan')
      const rgbRed = overlay.querySelector('.rgb-red')
      const scanlineBurst = overlay.querySelector('.scanline-burst')
      const noise = overlay.querySelector('.noise-burst')

      // Main Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { opacity: 0 })
          // Reset styles
          gsap.set(shapes, { clearProps: 'all' })
          gsap.set([rgbCyan, rgbRed, scanlineBurst, noise], { clearProps: 'all' })
        }
      })

      // Phase 1: Break
      gsap.set(overlay, { opacity: 1, backgroundColor: 'rgba(0,0,0,0)' })
      
      tl.to(shapes, {
        x: () => gsap.utils.random(-150, 150),
        y: () => gsap.utils.random(-150, 150),
        scale: () => gsap.utils.random(0.5, 2.5),
        skewX: () => gsap.utils.random(-30, 30),
        rotation: () => gsap.utils.random(-45, 45),
        opacity: () => gsap.utils.random(0.5, 1),
        duration: 0.15,
        stagger: 0.01,
        ease: 'steps(3)'
      }, 0)

      tl.to([rgbCyan, rgbRed], {
        x: (i) => i === 0 ? -6 : 6,
        opacity: 0.6,
        duration: 0.1,
        ease: 'none'
      }, 0)

      tl.to(scanlineBurst, {
        opacity: 0.3,
        scaleY: 1.2,
        duration: 0.2
      }, 0)

      // Phase 2: Hold & Flash
      tl.to(overlay, {
        backgroundColor: 'rgba(255,255,255,0.1)',
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

      // Phase 3: Execute Callback (Semi-transparent Screen)
      tl.to(overlay, {
        backgroundColor: 'rgba(0,0,0,0.5)',
        duration: 0.1,
        onComplete: () => {
          if (callback) callback()
        }
      }, 0.4)

      // Phase 4: Resolve (Fade out)
      tl.to(shapes, {
        x: 0,
        y: 0,
        scale: 1,
        skewX: 0,
        rotation: 0,
        opacity: 0,
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
      className="fixed inset-0 z-[8888] pointer-events-none flex items-center justify-center opacity-0 bg-black/50 backdrop-blur-sm"
    >
      {/* Geometric Center Shapes */}
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => {
          const types = ['rounded-full', 'rounded-none', 'rounded-none w-32 h-4', 'rounded-none w-4 h-32'];
          const shapeClass = types[i % types.length];
          // Use pseudo-random static sizing to avoid hydration mismatch if not handled,
          // but since this is client side overlay rendering it's fine.
          const size = 40 + (i * 15) % 80;
          return (
            <div 
              key={i} 
              className={`geo-shape absolute bg-black border border-white will-change-transform opacity-0 ${shapeClass}`}
              style={{ 
                width: shapeClass.includes('w-') ? undefined : size, 
                height: shapeClass.includes('h-') ? undefined : size 
              }}
            ></div>
          )
        })}
      </div>

      {/* RGB Layers */}
      <div className="rgb-cyan absolute inset-0 bg-[rgba(0,255,255,0.2)] mix-blend-screen opacity-0 will-change-transform"></div>
      <div className="rgb-red absolute inset-0 bg-[rgba(255,0,0,0.2)] mix-blend-screen opacity-0 will-change-transform"></div>

      {/* Scanline Burst */}
      <div className="scanline-burst absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)] opacity-0 mix-blend-overlay will-change-transform"></div>

      {/* Noise Burst */}
      <div className="noise-burst absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 256 256\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noise)\\'/%3E%3C/svg%3E')] opacity-0 mix-blend-difference will-change-opacity"></div>
    </div>
  )
}
