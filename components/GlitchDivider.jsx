'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlitchDivider() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const slices = container.querySelectorAll('.glitch-slice')
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    slices.forEach((slice, i) => {
      tl.to(slice, {
        x: () => gsap.utils.random(-30, 30),
        scaleX: () => gsap.utils.random(0.9, 1.1),
        opacity: () => gsap.utils.random(0.5, 1),
        backgroundColor: () => {
          const colors = ['var(--cream)', 'var(--accent)', 'var(--black)']
          return colors[Math.floor(Math.random() * colors.length)]
        },
        duration: () => gsap.utils.random(0.1, 0.4),
        ease: 'steps(3)'
      }, i * 0.05)
    })

    // Text glitch effect
    gsap.to(text, {
      skewX: () => gsap.utils.random(-10, 10),
      opacity: () => gsap.utils.random(0.6, 1),
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'steps(2)'
    })

    // Occasional flash
    const flashTween = gsap.delayedCall(gsap.utils.random(3, 6), function flash() {
      gsap.to(container, {
        backgroundColor: 'var(--cream)',
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        onComplete: () => flashTween.restart(true, gsap.utils.random(3, 6))
      })
    })

    return () => {
      tl.kill()
      gsap.killTweensOf(text)
      flashTween.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="glitch-divider">
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i} 
          className="glitch-slice" 
          style={{ 
            top: `${(i / 8) * 100}%`, 
            height: `${gsap.utils.random(2, 10)}px` 
          }} 
        />
      ))}
      <div className="glitch-rgb-layer" style={{ background: 'rgba(0, 255, 255, 0.2)', transform: 'translateX(-3px)', mixBlendMode: 'screen' }} />
      <div className="glitch-rgb-layer" style={{ background: 'rgba(255, 0, 0, 0.2)', transform: 'translateX(3px)', mixBlendMode: 'screen' }} />
      
      <div ref={textRef} className="glitch-divider-text font-mono">
        ◈ SIGNAL INTERFERENCE ◈
      </div>
    </div>
  )
}
