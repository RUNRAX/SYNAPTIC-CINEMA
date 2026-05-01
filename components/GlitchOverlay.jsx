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
      const randomElements = overlay.querySelectorAll('.random-element')

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { opacity: 0 })
          gsap.set([textCyan, textRed, slashes, content, randomElements], { clearProps: 'all' })
        }
      })

      // Phase 1: Break & Show Overlay (15% background)
      gsap.set(overlay, { opacity: 1, backgroundColor: 'rgba(0,0,0,0.15)' })
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

      // Random elements flash
      tl.to(randomElements, {
        opacity: () => gsap.utils.random(0.3, 1),
        duration: 0.05,
        stagger: 0.02,
        ease: 'none',
        repeat: 5,
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

      // Phase 2: Callback execution
      tl.call(() => {
        if (callback) callback()
      }, [], 0.3)

      // Phase 3: Hold overlay while new page is loading
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
      tl.to([content, slashes, randomElements], {
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
      className="fixed inset-0 z-[8888] pointer-events-none flex items-center justify-center opacity-0 bg-black/15 backdrop-blur-sm"
    >
      <div className="content-container relative flex items-center justify-center opacity-0 w-full h-full max-w-7xl mx-auto">
        
        {/* Background Code Snippets */}
        <div className="random-element absolute left-10 top-20 text-white/40 font-mono text-[10px] md:text-sm whitespace-pre mix-blend-difference hidden md:block">
          {`if (interface_state) {
  const sys = require('sys_module');
  sys.init();
  return status;
}`}
        </div>
        <div className="random-element absolute right-10 bottom-32 text-white/40 font-mono text-[10px] md:text-sm whitespace-pre text-right mix-blend-difference hidden md:block">
          {`b--sit (! 1001701)
[code] 00118123 : {T}
...
static init: logs.res`}
        </div>

        {/* Top Left SYNAPSE Label */}
        <div className="random-element absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-white/90 text-black px-4 py-1 border-2 border-black/50 shadow-xl z-20 hidden sm:block">
          <span className="font-mono font-bold text-xl md:text-4xl tracking-widest uppercase">SYNAPSE</span>
        </div>

        {/* Main SYNAPTIC Text */}
        <div className="relative">
           {/* Base text */}
           <h1 className="font-display text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] text-white tracking-tighter uppercase relative z-10 leading-none drop-shadow-xl" style={{ textShadow: '4px 4px 0px #000' }}>SYNAPTIC</h1>
           
           {/* Sliced layers for glitch */}
           <h1 className="synaptic-text-cyan font-display text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] text-cyan-400 tracking-tighter uppercase absolute top-0 left-0 mix-blend-screen opacity-0 leading-none z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>SYNAPTIC</h1>
           <h1 className="synaptic-text-red font-display text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] text-red-600 tracking-tighter uppercase absolute top-0 left-0 mix-blend-screen opacity-0 leading-none z-20" style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}>SYNAPTIC</h1>

           {/* Inner random glitch boxes */}
           <div className="random-element absolute top-[20%] left-[30%] w-16 h-8 bg-black mix-blend-overlay border border-white/20 z-30"></div>
           <div className="random-element absolute bottom-[30%] right-[20%] w-24 h-4 bg-white mix-blend-difference z-30"></div>
        </div>

        {/* Bottom Right ERROR Label */}
        <div className="random-element absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 rotate-6 bg-white/90 text-black px-4 py-1 border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] z-20 hidden sm:block">
          <span className="font-sans font-black text-xl md:text-4xl tracking-wider uppercase">ERROR</span>
        </div>

        {/* Chaotic Circles (SVG) */}
        <div className="random-element absolute top-1/2 right-[10%] -translate-y-1/2 opacity-80 mix-blend-difference pointer-events-none z-0 hidden md:block">
          <svg width="250" height="250" viewBox="0 0 200 200" className="animate-[spin_10s_linear_infinite]">
            <path d="M100 10 C 120 20, 180 50, 160 100 C 140 150, 80 180, 50 140 C 20 100, 40 40, 100 10" fill="none" stroke="white" strokeWidth="2" />
            <path d="M100 20 C 140 30, 170 80, 150 120 C 130 160, 60 170, 40 130 C 20 90, 50 40, 100 20" fill="none" stroke="#ccc" strokeWidth="1" />
            <path d="M100 30 C 150 40, 160 90, 140 130 C 120 170, 50 160, 30 120 C 10 80, 60 50, 100 30" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="10" fill="white" />
          </svg>
        </div>

        {/* Neural Net Nodes */}
        <div className="random-element absolute top-1/3 right-1/4 opacity-60 mix-blend-difference pointer-events-none z-0 hidden lg:block">
          <svg width="200" height="200" viewBox="0 0 150 150">
            <line x1="20" y1="20" x2="80" y2="50" stroke="white" strokeWidth="1" />
            <line x1="80" y1="50" x2="130" y2="30" stroke="white" strokeWidth="1" />
            <line x1="80" y1="50" x2="100" y2="100" stroke="white" strokeWidth="1" />
            <line x1="20" y1="20" x2="40" y2="90" stroke="white" strokeWidth="1" />
            <line x1="40" y1="90" x2="100" y2="100" stroke="white" strokeWidth="1" />
            <circle cx="20" cy="20" r="4" fill="white" />
            <circle cx="80" cy="50" r="4" fill="white" />
            <circle cx="130" cy="30" r="4" fill="white" />
            <circle cx="40" cy="90" r="4" fill="white" />
            <circle cx="100" cy="100" r="4" fill="white" />
            <rect x="75" y="45" width="10" height="10" fill="none" stroke="white" />
          </svg>
        </div>
      </div>
      
      {/* Scratches/Slashes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay z-10">
        {Array.from({length: 12}).map((_, i) => (
          <div 
            key={i} 
            className={`slash absolute bg-white/60 w-[2px] h-[150%] origin-center opacity-0`} 
            style={{
               left: `${5 + i * 8}%`,
               top: '-25%',
               transform: `rotate(${i % 2 === 0 ? 45 : -45}deg) scaleY(1)`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

