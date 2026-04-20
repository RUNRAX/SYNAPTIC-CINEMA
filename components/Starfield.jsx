'use client'

import { useRef, useEffect, useState } from 'react'

export default function Starfield() {
  const videoRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState('/videos/galaxy.mp4')

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.playbackRate = 0.5

    const handleMouseEnter = () => { videoElement.playbackRate = 1.5 }
    const handleMouseLeave = () => { videoElement.playbackRate = 0.5 }

    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      src={videoSrc}
      className="force-contain"
      style={{
        position: 'fixed',
        transform: 'translate(-30%, -30%)',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        zIndex: -2,
        filter: 'grayscale(100%)',
        opacity: 0.7
      }}
    />
  )
}
