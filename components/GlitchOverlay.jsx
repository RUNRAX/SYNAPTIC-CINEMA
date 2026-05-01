'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlitchOverlay() {
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleGlitch = (e) => {
      const { callback } = e.detail
      const overlay = overlayRef.current
      if (!overlay) {
        if (callback) callback()
        return
      }

      const textCyan = overlay.querySelector('.synaptic-text-cyan')
      const textRed = overlay.querySelector('.synaptic-text-red')
      const slashes = overlay.querySelectorAll('.slash')
      const content = overlay.querySelector('.content-container')

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { opacity: 0 })
          gsap.set([textCyan, textRed, slashes, content], { clearProps: 'all' })
        }
      })

      // Phase 1: Break & Show Overlay
      gsap.set(overlay, { opacity: 1, backgroundColor: 'rgba(0,0,0,0.8)' })
      gsap.set(content, { opacity: 1 })
      
      // Flash text offset layers
      tl.to([textCyan, textRed], {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-10, 10),
        opacity: 1,
        duration: 0.1,
        ease: 'steps(2)',
        repeat: 3,
        yoyo: true
      }, 0)

      // Flash slashes
      tl.to(slashes, {
        opacity: () => gsap.utils.random(0.4, 0.9),
        scaleY: () => gsap.utils.random(1, 1.5),
        duration: 0.1,
        stagger: 0.02,
        ease: 'none',
        repeat: 3,
        yoyo: true
      }, 0)

      // Main text rapid slight scale to simulate impact
      tl.to(content, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      }, 0)

      // Phase 2: Callback execution (while opaque and blurred)
      tl.call(() => {
        if (callback) callback()
      }, [], 0.3)

      // Phase 3: Hold overlay while new page is loading
      // Add a slight flicker to keep it alive
      tl.to(content, {
        opacity: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 3
      }, 0.3)

      tl.to([textCyan, textRed], {
        x: () => gsap.utils.random(-30, 30),
        opacity: 0.5,
        duration: 0.1,
        ease: 'none',
        repeat: 3,
        yoyo: true
      }, 0.3)

      // Phase 4: Fade Out cleanly
      tl.to([content, slashes], {
        opacity: 0,
        duration: 0.15
      }, 0.7)

      tl.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, 0.85)
    }

    window.addEventListener('trigger-glitch', handleGlitch)
    return () => window.removeEventListener('trigger-glitch', handleGlitch)
  }, [])

  return (
    <div 
      id="glitch-overlay" 
      ref={overlayRef}
      className="fixed inset-0 z-[8888] pointer-events-none flex items-center justify-center opacity-0 bg-black/80 backdrop-blur-xl"
    >
      <div className="content-container relative flex items-center justify-center opacity-0">
         <h1 className="font-display text-[60px] md:text-[100px] lg:text-[140px] text-white tracking-tighter uppercase relative z-10 leading-none drop-shadow-xl">SYNAPTIC</h1>
         <h1 className="synaptic-text-cyan font-display text-[60px] md:text-[100px] lg:text-[140px] text-cyan-400 tracking-tighter uppercase absolute top-0 left-0 mix-blend-screen opacity-0 leading-none">SYNAPTIC</h1>
         <h1 className="synaptic-text-red font-display text-[60px] md:text-[100px] lg:text-[140px] text-red-600 tracking-tighter uppercase absolute top-0 left-0 mix-blend-screen opacity-0 leading-none">SYNAPTIC</h1>
      </div>
      
      {/* Scratches/Slashes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay">
        {Array.from({length: 8}).map((_, i) => (
          <div 
            key={i} 
            className={`slash absolute bg-white/50 w-[2px] h-[150%] origin-center opacity-0`} 
            style={{
               left: `${10 + i * 12}%`,
               top: '-25%',
               transform: `rotate(${i % 2 === 0 ? 45 : -45}deg) scaleY(1)`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
