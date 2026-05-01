'use client'

import { useRef } from 'react'

export default function MagneticButton({ children, className = '', onClick, ...props }) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 80
    
    if (dist < maxDist) {
      const pull = (1 - dist / maxDist) * 0.4
      btnRef.current.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
      btnRef.current.style.transition = 'none'
    }
  }

  const handleMouseLeave = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = ''
    btnRef.current.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
    setTimeout(() => {
      if (btnRef.current) btnRef.current.style.transition = ''
    }, 400)
  }

  return (
    <button
      ref={btnRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
