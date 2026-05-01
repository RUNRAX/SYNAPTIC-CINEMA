'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BottomTicker({ items = [] }) {
  const tickerRef = useRef(null)

  useEffect(() => {
    if (!tickerRef.current) return

    const animation = gsap.to(tickerRef.current, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    const handleMouseEnter = () => animation.pause()
    const handleMouseLeave = () => animation.play()

    const el = tickerRef.current
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      animation.kill()
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [items])

  if (!items || items.length === 0) return null

  // We duplicate the items array so it seamlessly loops
  const content = items.join(' ✕ ') + ' ✕ '
  
  return (
    <div className="fixed bottom-0 left-0 lg:left-[200px] right-0 h-[56px] glass-frost-dark rounded-t-2xl border-t border-[rgba(255,255,255,0.1)] overflow-hidden flex items-center z-40">
      <div 
        ref={tickerRef} 
        className="flex whitespace-nowrap text-[11px] tracking-[0.12em] font-body text-cream uppercase"
        style={{ willChange: 'transform' }}
      >
        {/* Render 4 sets of the content to ensure it fills the screen and loops */}
        <span className="pr-1">
          {content}
        </span>
        <span className="pr-1">
          {content}
        </span>
        <span className="pr-1">
          {content}
        </span>
        <span className="pr-1">
          {content}
        </span>
      </div>
      
      {/* Accent colored diamonds override */}
      <style jsx global>{`
        .ticker-diamond {
          color: var(--accent);
          padding: 0 0.5rem;
        }
      `}</style>
    </div>
  )
}
