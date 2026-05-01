'use client'

import { useEffect, useRef } from 'react'

export default function GlitchOverlay() {
  const overlayRef = useRef(null)
  const g1Ref = useRef(null)
  const g2Ref = useRef(null)
  const g3Ref = useRef(null)

  useEffect(() => {
    const handleGlitch = (e) => {
      const { callback } = e.detail
      const overlay = overlayRef.current
      const g1 = g1Ref.current
      const g2 = g2Ref.current
      const g3 = g3Ref.current

      if (!overlay || !g1 || !g2 || !g3) {
        if (callback) callback()
        return
      }

      // 5-frame glitch sequence, 55ms per frame
      const frames = [
        // Frame 1: Black fill + cream clip strip top
        () => {
          overlay.style.opacity = '1'
          g1.style.cssText = 'background:var(--black); opacity:1;'
          g2.style.cssText = 'background:var(--cream); clip-path:inset(0 0 90% 0); transform:translateX(8px); opacity:0.9;'
        },
        // Frame 2: Cream mid-strip + accent slice
        () => {
          g2.style.cssText = 'background:var(--cream); clip-path:inset(20% 0 60% 0); transform:translateX(-12px); opacity:0.8;'
          g3.style.cssText = 'background:var(--accent); clip-path:inset(50% 0 30% 0); opacity:0.4; transform:translateX(4px);'
        },
        // Frame 3: Cream lower strip + red slice
        () => {
          g2.style.cssText = 'background:var(--cream); clip-path:inset(60% 0 10% 0); transform:translateX(6px);'
          g3.style.cssText = 'background:var(--red); clip-path:inset(10% 0 80% 0); opacity:0.3; transform:translateX(-8px);'
        },
        // Frame 4: Execute callback
        () => {
          if (callback) callback()
        },
        // Frame 5: Fade overlay
        () => {
          overlay.style.opacity = '0'
          // clear styles
          setTimeout(() => {
            g1.style.cssText = ''
            g2.style.cssText = ''
            g3.style.cssText = ''
          }, 300)
        }
      ]

      // Execute sequence
      let currentFrame = 0
      const runFrame = () => {
        if (currentFrame < frames.length) {
          frames[currentFrame]()
          currentFrame++
          
          if (currentFrame === 4) {
            // Run callback immediately after frame 3, then proceed to fade out
            runFrame()
          } else {
            setTimeout(runFrame, 55)
          }
        }
      }

      runFrame()
    }

    window.addEventListener('trigger-glitch', handleGlitch)
    return () => window.removeEventListener('trigger-glitch', handleGlitch)
  }, [])

  return (
    <div 
      id="glitch-overlay" 
      ref={overlayRef}
      style={{ position: 'fixed', inset: 0, zIndex: 8888, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s ease' }}
    >
      <div className="g1" ref={g1Ref} style={{ position: 'absolute', inset: 0 }}></div>
      <div className="g2" ref={g2Ref} style={{ position: 'absolute', inset: 0 }}></div>
      <div className="g3" ref={g3Ref} style={{ position: 'absolute', inset: 0 }}></div>
    </div>
  )
}
