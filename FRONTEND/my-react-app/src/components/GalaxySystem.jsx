import React, { useEffect, useRef } from 'react';

export default function GalaxySystem() {
  const galaxyRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (galaxyRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        galaxyRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    // Create floating particles
    const createParticles = () => {
      const container = galaxyRef.current?.querySelector('.particle-field');
      if (!container) return;

      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'space-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        container.appendChild(particle);
      }
    };

    const timer = setTimeout(createParticles, 100);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <style>{`
        .galaxy-system {
          position: fixed;
          top: 8%;
          right: 8%;
          width: 450px;
          height: 450px;
          z-index: 0;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .galaxy-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .particle-field {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          pointer-events: none;
        }

        .space-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, #ffffff 0%, #e8e8e8 40%, transparent 70%);
          border-radius: 50%;
          animation: float-particle linear infinite;
          box-shadow: 0 0 6px rgba(255,255,255,0.6);
        }

        .dark .space-particle {
          background: radial-gradient(circle, #2a2a2a 0%, #1a1a1a 40%, transparent 70%);
          box-shadow: 0 0 6px rgba(0,0,0,0.6);
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120px) translateX(30px) scale(1.2);
            opacity: 0;
          }
        }

        .galaxy-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            #ffffff 0%,
            #f0f0f0 15%,
            #e8e8e8 25%,
            #c0c0c0 40%,
            rgba(192, 192, 192, 0.8) 60%,
            rgba(192, 192, 192, 0.4) 80%,
            transparent 100%
          );
          border-radius: 50%;
          animation: galaxy-pulse 8s ease-in-out infinite;
          box-shadow: 
            0 0 60px rgba(255, 255, 255, 0.9),
            0 0 120px rgba(255, 255, 255, 0.5),
            inset 0 0 40px rgba(255, 255, 255, 0.4);
        }

        .dark .galaxy-core {
          background: radial-gradient(
            circle,
            #2a2a2a 0%,
            #1f1f1f 15%,
            #1a1a1a 25%,
            #404040 40%,
            rgba(64, 64, 64, 0.8) 60%,
            rgba(64, 64, 64, 0.4) 80%,
            transparent 100%
          );
          box-shadow: 
            0 0 60px rgba(0, 0, 0, 0.9),
            0 0 120px rgba(0, 0, 0, 0.5),
            inset 0 0 40px rgba(0, 0, 0, 0.4);
        }

        @keyframes galaxy-pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .galaxy-arms {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          animation: rotate-galaxy 60s linear infinite;
        }

        .galaxy-arm {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 220px;
          background: linear-gradient(
            to top,
            transparent 0%,
            rgba(220, 220, 220, 0.2) 15%,
            rgba(200, 200, 200, 0.6) 25%,
            rgba(192, 192, 192, 0.9) 40%,
            rgba(180, 180, 180, 0.7) 60%,
            rgba(160, 160, 160, 0.4) 80%,
            transparent 100%
          );
          transform-origin: bottom center;
          border-radius: 3px;
          filter: blur(2px);
        }

        .dark .galaxy-arm {
          background: linear-gradient(
            to top,
            transparent 0%,
            rgba(40, 40, 40, 0.2) 15%,
            rgba(30, 30, 30, 0.6) 25%,
            rgba(20, 20, 20, 0.9) 40%,
            rgba(35, 35, 35, 0.7) 60%,
            rgba(50, 50, 50, 0.4) 80%,
            transparent 100%
          );
        }

        .galaxy-arm:nth-child(1) { 
          transform: translate(-50%, 0) rotate(0deg);
          animation: arm-shimmer 12s ease-in-out infinite;
        }
        .galaxy-arm:nth-child(2) { 
          transform: translate(-50%, 0) rotate(60deg);
          animation: arm-shimmer 12s ease-in-out infinite 1s;
        }
        .galaxy-arm:nth-child(3) { 
          transform: translate(-50%, 0) rotate(120deg);
          animation: arm-shimmer 12s ease-in-out infinite 2s;
        }
        .galaxy-arm:nth-child(4) { 
          transform: translate(-50%, 0) rotate(180deg);
          animation: arm-shimmer 12s ease-in-out infinite 3s;
        }
        .galaxy-arm:nth-child(5) { 
          transform: translate(-50%, 0) rotate(240deg);
          animation: arm-shimmer 12s ease-in-out infinite 4s;
        }
        .galaxy-arm:nth-child(6) { 
          transform: translate(-50%, 0) rotate(300deg);
          animation: arm-shimmer 12s ease-in-out infinite 5s;
        }

        @keynames arm-shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .rock-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 3px solid rgba(180, 180, 180, 0.3);
          transform: translate(-50%, -50%);
          animation: rotate-ring linear infinite;
        }

        .dark .rock-ring {
          border-color: rgba(40, 40, 40, 0.3);
        }

        .rock-ring-1 {
          width: 280px;
          height: 280px;
          animation-duration: 40s;
          border-style: dashed;
          border-width: 2px;
        }

        .rock-ring-2 {
          width: 350px;
          height: 350px;
          animation-duration: 60s;
          animation-direction: reverse;
          border-style: dotted;
          border-width: 1px;
        }

        .rock-ring-3 {
          width: 200px;
          height: 200px;
          animation-duration: 25s;
          border-style: solid;
          border-width: 1px;
        }

        @keyframes rotate-ring {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .planet {
          position: absolute;
          border-radius: 50%;
          box-shadow: inset -6px -6px 12px rgba(0,0,0,0.3);
          animation: orbit-planet linear infinite;
        }

        .planet-1 {
          width: 18px;
          height: 18px;
          background: radial-gradient(circle at 30% 30%, #f8f8f8, #e0e0e0, #c0c0c0);
          top: 22%;
          left: 78%;
          animation-duration: 30s;
          box-shadow: 
            inset -4px -4px 8px rgba(0,0,0,0.3),
            0 0 20px rgba(248, 248, 248, 0.6);
        }

        .dark .planet-1 {
          background: radial-gradient(circle at 30% 30%, #2a2a2a, #1a1a1a, #0a0a0a);
          box-shadow: 
            inset -4px -4px 8px rgba(255,255,255,0.3),
            0 0 20px rgba(40, 40, 40, 0.6);
        }

        .planet-2 {
          width: 14px;
          height: 14px;
          background: radial-gradient(circle at 40% 30%, #f0f0f0, #d0d0d0, #a0a0a0);
          top: 68%;
          left: 12%;
          animation-duration: 45s;
          animation-direction: reverse;
          box-shadow: 
            inset -3px -3px 6px rgba(0,0,0,0.3),
            0 0 15px rgba(240, 240, 240, 0.5);
        }

        .dark .planet-2 {
          background: radial-gradient(circle at 40% 30%, #1f1f1f, #0f0f0f, #050505);
          box-shadow: 
            inset -3px -3px 6px rgba(255,255,255,0.3),
            0 0 15px rgba(30, 30, 30, 0.5);
        }

        .planet-3 {
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at 35% 25%, #e8e8e8, #c8c8c8, #888888);
          top: 88%;
          left: 88%;
          animation-duration: 65s;
          box-shadow: 
            inset -2px -2px 4px rgba(0,0,0,0.3),
            0 0 12px rgba(232, 232, 232, 0.4);
        }

        .dark .planet-3 {
          background: radial-gradient(circle at 35% 25%, #1a1a1a, #101010, #050505);
          box-shadow: 
            inset -2px -2px 4px rgba(255,255,255,0.3),
            0 0 12px rgba(25, 25, 25, 0.4);
        }

        @keyframes orbit-planet {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        .spaceship {
          position: absolute;
          animation: spaceship-orbit linear infinite;
        }

        .spaceship-body {
          position: relative;
          width: 28px;
          height: 12px;
          background: linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 50%, #a0a0a0 100%);
          border-radius: 14px 4px 4px 14px;
          border: 1px solid #808080;
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.3),
            inset -2px -2px 4px rgba(0,0,0,0.2);
        }

        .dark .spaceship-body {
          background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
          border-color: #404040;
        }

        .spaceship-nose {
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid #c0c0c0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        .dark .spaceship-nose {
          border-left-color: #1a1a1a;
        }

        .spaceship-window {
          position: absolute;
          left: 6px;
          top: 2px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #87CEEB 0%, #4682B4 70%, #2F4F4F 100%);
          border-radius: 50%;
          border: 1px solid #606060;
        }

        .spaceship-engine {
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00ffff, #0080ff);
          border-radius: 2px;
          animation: engine-glow 1.2s ease-in-out infinite alternate;
          filter: blur(1px);
        }

        @keyframes engine-glow {
          0% { 
            opacity: 0.6; 
            transform: translateY(-50%) scaleX(0.8);
            box-shadow: 0 0 4px #00ffff;
          }
          100% { 
            opacity: 1; 
            transform: translateY(-50%) scaleX(1.3);
            box-shadow: 0 0 8px #00ffff;
          }
        }

        .spaceship-1 {
          top: 35%;
          left: 65%;
          animation-duration: 35s;
        }

        .spaceship-2 {
          top: 75%;
          left: 25%;
          animation-duration: 50s;
          animation-direction: reverse;
        }

        .spaceship-3 {
          top: 15%;
          left: 15%;
          animation-duration: 42s;
        }

        @keyframes spaceship-orbit {
          from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }

        .stars {
          position: absolute;
          width: 250%;
          height: 250%;
          top: -75%;
          left: -75%;
        }

        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 50%;
          animation: twinkle 4s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(255,255,255,0.8);
        }

        .dark .star {
          background: #2a2a2a;
          box-shadow: 0 0 6px rgba(0,0,0,0.8);
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .galaxy-system {
            width: 300px;
            height: 300px;
            top: 5%;
            right: 5%;
          }
          
          .galaxy-core {
            width: 100px;
            height: 100px;
          }
          
          .galaxy-arm {
            height: 150px;
          }
          
          .rock-ring-1 {
            width: 180px;
            height: 180px;
          }
          
          .rock-ring-2 {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>

      <div className="galaxy-system" ref={galaxyRef}>
        <div className="galaxy-container">
          <div className="particle-field"></div>
          
          <div className="stars">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          <div className="rock-ring rock-ring-1"></div>
          <div className="rock-ring rock-ring-2"></div>
          <div className="rock-ring rock-ring-3"></div>

          <div className="galaxy-core"></div>
          <div className="galaxy-arms">
            <div className="galaxy-arm"></div>
            <div className="galaxy-arm"></div>
            <div className="galaxy-arm"></div>
            <div className="galaxy-arm"></div>
            <div className="galaxy-arm"></div>
            <div className="galaxy-arm"></div>
          </div>

          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="planet planet-3"></div>

          <div className="spaceship spaceship-1">
            <div className="spaceship-body">
              <div className="spaceship-nose"></div>
              <div className="spaceship-window"></div>
              <div className="spaceship-engine"></div>
            </div>
          </div>
          <div className="spaceship spaceship-2">
            <div className="spaceship-body">
              <div className="spaceship-nose"></div>
              <div className="spaceship-window"></div>
              <div className="spaceship-engine"></div>
            </div>
          </div>
          <div className="spaceship spaceship-3">
            <div className="spaceship-body">
              <div className="spaceship-nose"></div>
              <div className="spaceship-window"></div>
              <div className="spaceship-engine"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}