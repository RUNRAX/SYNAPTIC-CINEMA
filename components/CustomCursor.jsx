'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return
    }

    document.body.classList.add('custom-cursor-active')

    let mouseX = 0
    let mouseY = 0
    let circleX = 0
    let circleY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end

    const animate = () => {
      circleX = lerp(circleX, mouseX, 0.12)
      circleY = lerp(circleY, mouseY, 0.12)

      if (circleRef.current) {
        circleRef.current.style.left = `${circleX}px`
        circleRef.current.style.top = `${circleY}px`
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    requestAnimationFrame(animate)

    // Setup interactive elements
    const setupInteractiveElements = () => {
      const interactives = document.querySelectorAll(
        'button, a, [onclick], .movie-card, .stat-card, .stat-box, .exhibition-panel, .film-circle, .chip, .pill-btn, .sidebar-nav-item, .sidebar-explore, input'
      )

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => circleRef.current?.classList.add('hovering'))
        el.addEventListener('mouseleave', () => circleRef.current?.classList.remove('hovering'))
        el.addEventListener('mousedown', () => circleRef.current?.classList.add('clicking'))
        el.addEventListener('mouseup', () => circleRef.current?.classList.remove('clicking'))
      })
    }

    // Run initially and set up a mutation observer for dynamically added elements
    setupInteractiveElements()
    
    const observer = new MutationObserver((mutations) => {
      if (mutations.some(m => m.addedNodes.length > 0)) {
        setupInteractiveElements()
      }
    })
    
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.classList.remove('custom-cursor-active')
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="custom-cursor-dot" ref={dotRef}></div>
      <div id="custom-cursor-circle" ref={circleRef}></div>
    </>
  )
}
