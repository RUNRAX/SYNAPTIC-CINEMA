import React, { useRef, useEffect, useState } from 'react';
import galaxyVideo from '../assets/videos/galaxy.mp4';

export default function Starfield() {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoSrc(galaxyVideo);
    }, 1000);

    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.playbackRate = 0.5;

    const handleMouseEnter = () => { videoElement.playbackRate = 1.5; };
    const handleMouseLeave = () => { videoElement.playbackRate = 0.5; };

    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        .force-contain {
          object-fit: contain !important;
        }
      `}</style>

      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src={videoSrc}
        className="force-contain"
        style={{
          // --- CORRECTED PROPERTIES ---
          position: 'fixed',             // Changed from 'float'
          transform: 'translate(-30%, -30%)', // Changed from '-30%, -30%'
          // --- END CORRECTIONS ---
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: -2,
          filter: 'grayscale(50%)', // Changed to 100% for a full black & white effect
          opacity: 0.7
        }}
      />
    </>
  );
}