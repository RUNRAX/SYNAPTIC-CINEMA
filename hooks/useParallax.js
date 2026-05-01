'use client'

import { useState, useEffect, useRef } from 'react'

export function useParallax(ref, smoothing = 0.08) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const reqRef = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      // Normalized between -0.5 and 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetRef.current = { x, y }
    }

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothing
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothing
      
      setOffset({ x: currentRef.current.x, y: currentRef.current.y })
      
      reqRef.current = requestAnimationFrame(animate)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    reqRef.current = requestAnimationFrame(animate)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(reqRef.current)
    }
  }, [ref, smoothing])

  return offset
}
