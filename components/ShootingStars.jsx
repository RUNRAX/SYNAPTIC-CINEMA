import React, { useEffect, useRef } from 'react';

export default function ShootingStars() {
  const containerRef = useRef(null);

  useEffect(() => {
    const createShootingStar = () => {
      if (!containerRef.current) return;

      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Random starting position, direction, and duration
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight / 2;
      const duration = Math.random() * 2 + 2; // Duration between 2s and 4s
      
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      star.style.setProperty('--duration', `${duration}s`);
      star.style.setProperty('--endX', `${Math.random() * 200 - 100}vw`); // Move across the screen
      star.style.setProperty('--endY', `${Math.random() * 100}vh`);

      containerRef.current.appendChild(star);

      // Remove star after animation to keep the DOM clean
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, duration * 1000);
    };

    // Create stars more frequently for a denser starfield
    const interval = setInterval(createShootingStar, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .shooting-stars-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          /* MODIFIED: Set z-index to -1 to render behind all other content */
          z-index: -1;
          overflow: hidden;
        }

        .shooting-star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
          /* MODIFIED: Added a more prominent, multi-layered box-shadow for a flare effect */
          box-shadow: 
            0 0 8px 2px rgba(255, 255, 255, 0.8),
            0 0 16px 4px rgba(255, 255, 255, 0.6),
            0 0 24px 6px rgba(255, 192, 203, 0.4); /* Pinkish outer glow */
          animation: 
            shoot var(--duration, 4s) linear forwards,
            flare var(--duration, 4s) ease-in-out infinite alternate;
        }

        /* MODIFIED: Added a new animation for the shiny flare effect */
        @keyframes flare {
          0% {
            transform: scale(1);
            box-shadow: 
              0 0 8px 2px rgba(255, 255, 255, 0.8),
              0 0 16px 4px rgba(255, 255, 255, 0.6),
              0 0 24px 6px rgba(255, 192, 203, 0.4);
          }
          100% {
            transform: scale(1.5);
            box-shadow: 
              0 0 12px 3px rgba(255, 255, 255, 1),
              0 0 24px 6px rgba(255, 255, 255, 0.8),
              0 0 36px 9px rgba(255, 192, 203, 0.6);
          }
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 3px; /* Start the tail from the edge of the star */
          width: 150px;
          height: 1px;
          /* MODIFIED: Made the tail brighter and more defined */
          background: linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);
        }

        @keyframes shoot {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--endX), var(--endY));
            opacity: 0;
          }
        }
      `}</style>

      <div className="shooting-stars-container" ref={containerRef}>
      </div>
    </>
  );
}
