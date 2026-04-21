import React from 'react'

export default function PersistentBackground() {
  return (
    <>
      <style>{`
        .persistent-background {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          background: #0a0e1a;
        }

        /* ── Northern Lights Aurora Layers ── */
        .aurora-layer {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          mix-blend-mode: screen;
          will-change: transform;
          opacity: 0.7;
        }

        /* Deep purple sweep — slowest, largest */
        .aurora-layer.a1 {
          width: 120vw;
          height: 50vh;
          top: -10%;
          left: -20%;
          background: radial-gradient(
            ellipse at center,
            rgba(120, 40, 200, 0.50) 0%,
            rgba(80, 20, 160, 0.25) 40%,
            transparent 70%
          );
          animation: aurora-drift-1 20s ease-in-out infinite alternate;
        }

        /* Teal-green ribbon — medium speed */
        .aurora-layer.a2 {
          width: 100vw;
          height: 40vh;
          top: 5%;
          right: -15%;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 200, 170, 0.40) 0%,
            rgba(0, 150, 130, 0.18) 45%,
            transparent 70%
          );
          animation: aurora-drift-2 16s ease-in-out infinite alternate;
        }

        /* Magenta-pink pulse — fastest, most visible */
        .aurora-layer.a3 {
          width: 90vw;
          height: 45vh;
          bottom: 5%;
          left: -10%;
          background: radial-gradient(
            ellipse at center,
            rgba(200, 50, 180, 0.45) 0%,
            rgba(160, 30, 140, 0.20) 40%,
            transparent 70%
          );
          animation: aurora-drift-3 14s ease-in-out infinite alternate;
        }

        /* Cool blue accent — subtle, wide */
        .aurora-layer.a4 {
          width: 110vw;
          height: 35vh;
          top: 30%;
          left: 10%;
          background: radial-gradient(
            ellipse at center,
            rgba(80, 180, 255, 0.30) 0%,
            rgba(60, 130, 220, 0.12) 45%,
            transparent 70%
          );
          animation: aurora-drift-4 22s ease-in-out infinite alternate;
        }

        /* ── Keyframes: Each layer drifts on a unique path ── */
        @keyframes aurora-drift-1 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(12vw, 8vh, 0) rotate(8deg) scale(1.15); }
        }

        @keyframes aurora-drift-2 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(-15vw, 5vh, 0) rotate(-6deg) scale(1.10); }
        }

        @keyframes aurora-drift-3 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(10vw, -10vh, 0) rotate(10deg) scale(1.12); }
        }

        @keyframes aurora-drift-4 {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(-8vw, 6vh, 0) rotate(-5deg) scale(1.08); }
        }

        /* Subtle noise texture over the aurora for depth */
        .aurora-noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.35) 1px, transparent 0);
          background-size: 20px 20px;
          mix-blend-mode: overlay;
        }

        /* Soft vignette around edges */
        .aurora-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(8, 10, 22, 0.55) 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-layer {
            animation: none !important;
          }
        }
      `}</style>

      <div className="persistent-background" aria-hidden="true">
        <div className="aurora-layer a1" />
        <div className="aurora-layer a2" />
        <div className="aurora-layer a3" />
        <div className="aurora-layer a4" />
        <div className="aurora-noise" />
        <div className="aurora-vignette" />
      </div>
    </>
  )
}
