import React from 'react';

// Add this CSS to a global file like index.css
/*
.movie-card-skeleton {
  background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px;
  overflow: hidden; position: relative; -webkit-mask-image: -webkit-radial-gradient(white, black);
}
.skeleton-image { width: 100%; aspect-ratio: 2 / 3; background-color: var(--silver-light); }
.skeleton-text-container { padding: 1.5rem; }
.skeleton-text { height: 1.2em; background-color: var(--silver-light); border-radius: 4px; margin-bottom: 0.75rem; }
.skeleton-text.short { width: 60%; }
.shimmer-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  animation: shimmer 2s infinite;
  background: linear-gradient(to right, transparent 0%, #ffffff33 50%, transparent 100%);
  background-size: 1000px 100%;
}
@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
*/

export default function MovieCardSkeleton() {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton-image" />
      <div className="skeleton-text-container">
        <div className="skeleton-text" />
        <div className="skeleton-text short" />
      </div>
      <div className="shimmer-wrapper" />
    </div>
  );
}