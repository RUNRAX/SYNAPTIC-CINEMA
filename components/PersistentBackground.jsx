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
          background:
            radial-gradient(circle at 12% 18%, rgba(110, 180, 255, 0.24), transparent 28%),
            radial-gradient(circle at 86% 22%, rgba(255, 132, 189, 0.18), transparent 24%),
            radial-gradient(circle at 78% 76%, rgba(255, 189, 95, 0.16), transparent 24%),
            radial-gradient(circle at 30% 82%, rgba(110, 255, 220, 0.16), transparent 22%),
            linear-gradient(180deg, rgba(252, 246, 255, 0.98) 0%, rgba(239, 244, 255, 0.96) 46%, rgba(244, 248, 255, 0.98) 100%);
        }

        .backdrop-blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          opacity: 0.8;
          animation: drift-blob 18s ease-in-out infinite;
          will-change: transform;
        }

        .backdrop-blob.one {
          width: 34rem;
          height: 34rem;
          top: -8rem;
          right: -10rem;
          background: linear-gradient(135deg, rgba(118, 184, 255, 0.42), rgba(198, 167, 255, 0.2));
        }

        .backdrop-blob.two {
          width: 26rem;
          height: 26rem;
          left: -6rem;
          bottom: 5rem;
          background: linear-gradient(135deg, rgba(255, 160, 205, 0.32), rgba(255, 211, 120, 0.18));
          animation-delay: -6s;
        }

        .backdrop-blob.three {
          width: 20rem;
          height: 20rem;
          top: 28%;
          left: 42%;
          background: linear-gradient(135deg, rgba(121, 255, 213, 0.22), rgba(109, 164, 255, 0.18));
          animation-delay: -11s;
        }

        .backdrop-grid {
          position: absolute;
          inset: 0;
          opacity: 0.26;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 92%);
        }

        .backdrop-noise {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(18, 25, 38, 0.3) 1px, transparent 0);
          background-size: 18px 18px;
          mix-blend-mode: multiply;
        }

        @keyframes drift-blob {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(2rem, -1.5rem, 0) scale(1.06);
          }
        }

        @media (max-width: 768px) {
          .persistent-background {
            background:
              radial-gradient(circle at 18% 10%, rgba(110, 180, 255, 0.22), transparent 30%),
              radial-gradient(circle at 82% 18%, rgba(255, 132, 189, 0.16), transparent 28%),
              linear-gradient(180deg, rgba(250, 244, 255, 0.98) 0%, rgba(239, 244, 255, 0.98) 100%);
          }

          .backdrop-grid {
            background-size: 54px 54px;
          }
        }
      `}</style>

      <div className="persistent-background" aria-hidden="true">
        <div className="backdrop-blob one" />
        <div className="backdrop-blob two" />
        <div className="backdrop-blob three" />
        <div className="backdrop-grid" />
        <div className="backdrop-noise" />
      </div>
    </>
  )
}
