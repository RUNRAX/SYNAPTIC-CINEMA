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

      const letters = overlay.querySelectorAll('.glitch-letter')
      const textRed = overlay.querySelector('.synaptic-text-red')
      const slashes = overlay.querySelectorAll('.slash')
      const content = overlay.querySelector('.content-container')
      const randomElements = overlay.querySelectorAll('.random-element')

      const textContainer = overlay.querySelector('.glitch-text-container')

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { opacity: 0 })
          gsap.set([letters, textRed, slashes, content, randomElements, textContainer], { clearProps: 'all' })
        }
      })

      // Phase 1: Break & Show Overlay (15% background)
      gsap.set(overlay, { opacity: 1, backgroundColor: 'rgba(0,0,0,0.15)' })
      gsap.set(content, { opacity: 1 })
      
      // Intense strobe flicker mixed with glitch
      tl.to(textContainer, {
        opacity: () => gsap.utils.random(0, 1) > 0.4 ? 1 : 0,
        duration: 0.02,
        ease: 'none',
        repeat: 10,
        yoyo: true
      }, 0)

      // Flash text offset layers (only minute red now)
      tl.to(textRed, {
        x: () => gsap.utils.random(-10, 10),
        y: () => gsap.utils.random(-5, 5),
        opacity: () => gsap.utils.random(0.3, 0.8),
        duration: 0.05,
        ease: 'steps(2)',
        repeat: 3,
        yoyo: true
      }, 0)

      // Letters vanish in cut parts individually and with random
      tl.to(letters, {
        opacity: () => gsap.utils.random(0, 1) > 0.5 ? 0 : 1,
        y: () => gsap.utils.random(-15, 15),
        clipPath: () => {
           const p1 = gsap.utils.random(0, 40)
           const p2 = gsap.utils.random(60, 100)
           return `polygon(0 ${p1}%, 100% ${p1}%, 100% ${p2}%, 0 ${p2}%)`
        },
        duration: 0.05,
        stagger: {
          each: 0.01,
          from: "random"
        },
        ease: 'none',
        repeat: 3,
        yoyo: true
      }, 0)

      // Random elements flash
      tl.to(randomElements, {
        opacity: () => gsap.utils.random(0.3, 1),
        duration: 0.05,
        stagger: 0.01,
        ease: 'none',
        repeat: 3,
        yoyo: true
      }, 0)

      // Flash slashes
      tl.to(slashes, {
        opacity: () => gsap.utils.random(0.4, 0.9),
        scaleY: () => gsap.utils.random(1, 1.5),
        duration: 0.05,
        stagger: 0.01,
        ease: 'none',
        repeat: 2,
        yoyo: true
      }, 0)

      // Main text rapid slight scale to simulate impact
      tl.to(content, {
        scale: 1.05,
        duration: 0.05,
        yoyo: true,
        repeat: 1
      }, 0)

      // Phase 2: Callback execution (Load Next Quicker)
      tl.call(() => {
        if (callback) callback()
      }, [], 0.15)

      // Phase 3: Hold overlay briefly
      tl.to(content, {
        opacity: 0.8,
        duration: 0.05,
        yoyo: true,
        repeat: 2
      }, 0.15)

      // Phase 4: Fade Out cleanly
      tl.to([content, slashes, randomElements], {
        opacity: 0,
        duration: 0.1
      }, 0.25)

      tl.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, 0.3)
    }

    window.addEventListener('trigger-glitch', handleGlitch)
    return () => window.removeEventListener('trigger-glitch', handleGlitch)
  }, [])

  const synapticWord = "SYNAPTIC".split("")

  return (
    <div 
      id="glitch-overlay" 
      ref={overlayRef}
      className="fixed inset-0 z-[8888] pointer-events-none flex items-center justify-center opacity-0 bg-black/15 backdrop-blur-sm"
    >
      <div className="content-container relative flex items-center justify-center opacity-0 w-full h-full max-w-7xl mx-auto">
        
        {/* Background Code Snippets - Black & White */}
        <div className="random-element absolute left-10 top-20 text-white font-mono text-[10px] md:text-sm whitespace-pre mix-blend-difference hidden md:block">
          {`if (interface_state) {
  const sys = require('sys_module');
  sys.init();
  return status;
}`}
        </div>
        <div className="random-element absolute right-10 bottom-32 text-white font-mono text-[10px] md:text-sm whitespace-pre text-right mix-blend-difference hidden md:block">
          {`b--sit (! 1001701)
[code] 00118123 : {T}
...
static init: logs.res`}
        </div>

        {/* Top Left SYNAPSE Label */}
        <div className="random-element absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-white text-black px-4 py-1 border-2 border-black shadow-xl z-20 hidden sm:block">
          <span className="font-mono font-bold text-xl md:text-4xl tracking-widest uppercase">SYNAPSE</span>
        </div>

        {/* Main SYNAPTIC Text */}
        <div className="relative flex items-center justify-center">
           {/* Base text split into letters for individual glitching */}
           <div className="glitch-text-container relative z-10 flex drop-shadow-xl" style={{ textShadow: '4px 4px 0px #000' }}>
             {synapticWord.map((letter, i) => (
               <span key={i} className="glitch-letter font-display text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] text-white tracking-tighter uppercase leading-none">
                 {letter}
               </span>
             ))}
           </div>
           
           {/* Minute Red Glitch Layer */}
           <h1 className="synaptic-text-red font-display text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] text-red-600 tracking-tighter uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-0 leading-none z-20 pointer-events-none" style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)' }}>SYNAPTIC</h1>

           {/* Inner random glitch boxes (Sharp) */}
           <div className="random-element absolute top-[20%] left-[30%] w-16 h-8 bg-black mix-blend-overlay border border-white z-30"></div>
           <div className="random-element absolute bottom-[30%] right-[20%] w-24 h-4 bg-white mix-blend-difference z-30"></div>
           <div className="random-element absolute top-[60%] left-[50%] w-8 h-12 bg-white mix-blend-difference z-30"></div>
           <div className="random-element absolute bottom-[10%] left-[10%] w-32 h-2 bg-black border border-white z-30"></div>
        </div>

        {/* Bottom Right ERROR Label */}
        <div className="random-element absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 rotate-6 bg-white text-black px-4 py-1 border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] z-20 hidden sm:block">
          <span className="font-sans font-black text-xl md:text-4xl tracking-wider uppercase">ERROR</span>
        </div>

        {/* Sharp Rectangles instead of Chaotic Circles */}
        <div className="random-element absolute top-1/2 right-[10%] -translate-y-1/2 opacity-80 mix-blend-difference pointer-events-none z-0 hidden md:block">
          <svg width="250" height="250" viewBox="0 0 200 200">
            <rect x="20" y="20" width="160" height="160" fill="none" stroke="white" strokeWidth="2" transform="rotate(15 100 100)" />
            <rect x="40" y="40" width="120" height="120" fill="none" stroke="#fff" strokeWidth="1" transform="rotate(-10 100 100)" />
            <polygon points="100,10 190,100 100,190 10,100" fill="none" stroke="white" strokeWidth="0.5" />
            <rect x="90" y="90" width="20" height="20" fill="white" />
          </svg>
        </div>

        {/* Sharp Neural Net / Grid Nodes */}
        <div className="random-element absolute top-1/3 right-1/4 opacity-60 mix-blend-difference pointer-events-none z-0 hidden lg:block">
          <svg width="200" height="200" viewBox="0 0 150 150">
            <line x1="20" y1="20" x2="80" y2="20" stroke="white" strokeWidth="1" />
            <line x1="80" y1="20" x2="80" y2="80" stroke="white" strokeWidth="1" />
            <line x1="80" y1="80" x2="130" y2="80" stroke="white" strokeWidth="1" />
            <line x1="20" y1="20" x2="20" y2="90" stroke="white" strokeWidth="1" />
            <line x1="20" y1="90" x2="100" y2="90" stroke="white" strokeWidth="1" />
            <rect x="18" y="18" width="4" height="4" fill="white" />
            <rect x="78" y="18" width="4" height="4" fill="white" />
            <rect x="128" y="78" width="4" height="4" fill="white" />
            <rect x="18" y="88" width="4" height="4" fill="white" />
            <rect x="98" y="88" width="4" height="4" fill="white" />
            <rect x="75" y="75" width="10" height="10" fill="none" stroke="white" />
          </svg>
        </div>
      </div>
      
      {/* Scratches/Slashes (Sharp edges) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay z-10">
        {Array.from({length: 12}).map((_, i) => (
          <div 
            key={i} 
            className={`slash absolute bg-white w-[3px] h-[150%] origin-center opacity-0`} 
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

