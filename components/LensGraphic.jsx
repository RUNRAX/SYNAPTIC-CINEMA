'use client'

import { useEffect, useRef, useState } from 'react'

export default function LensGraphic() {
  const containerRef = useRef(null)
  const rotationRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)
  const reqRef = useRef()

  useEffect(() => {
    const rotate = () => {
      if (!isHovered && containerRef.current) {
        rotationRef.current += 0.3
        containerRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      }
      reqRef.current = requestAnimationFrame(rotate)
    }

    reqRef.current = requestAnimationFrame(rotate)
    return () => cancelAnimationFrame(reqRef.current)
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (containerRef.current) {
      containerRef.current.style.transform = `rotate(${rotationRef.current + 3}deg) scale(1.06)`
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (containerRef.current) {
      containerRef.current.style.transform = `rotate(${rotationRef.current}deg) scale(1)`
    }
  }

  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
      rotationRef.current += 360
      containerRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      setTimeout(() => {
        if (containerRef.current) containerRef.current.style.transition = ''
      }, 500)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={containerRef}
        className="w-[160px] h-[160px] rounded-full bg-black flex items-center justify-center cursor-pointer film-circle transition-transform duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <svg viewBox="0 0 100 100" className="w-[120px] h-[120px]">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#F2EDE3" strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#F2EDE3" strokeWidth="0.5" strokeOpacity="0.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="#F2EDE3" strokeWidth="1" />
          
          {/* Aperture blades */}
          <g stroke="#F2EDE3" strokeWidth="1" fill="none" strokeOpacity="0.6">
            <line x1="50" y1="20" x2="65" y2="50" />
            <line x1="80" y1="50" x2="50" y2="65" />
            <line x1="50" y1="80" x2="35" y2="50" />
            <line x1="20" y1="50" x2="50" y2="35" />
            
            <line x1="71" y1="29" x2="65" y2="50" />
            <line x1="71" y1="71" x2="50" y2="65" />
            <line x1="29" y1="71" x2="35" y2="50" />
            <line x1="29" y1="29" x2="50" y2="35" />
          </g>
        </svg>
      </div>
      
      <div className="flex gap-4">
        <button className="text-gray hover:text-black hover:scale-125 transition-transform">←</button>
        <button className="text-gray hover:text-black hover:scale-125 transition-transform">→</button>
      </div>
      
      <p className="text-center font-body text-[10px] text-mid tracking-widest uppercase mt-2">
        Discover More Film<br/>Texture & Detail
      </p>
    </div>
  )
}
