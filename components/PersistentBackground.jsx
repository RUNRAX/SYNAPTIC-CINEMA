import React from 'react';
import GalaxySystem from './GalaxySystem';
import FloatingAstronaut from './FloatingAstronaut';
import ShootingStars from './ShootingStars';

export default function PersistentBackground() {
  return (
    <>
      <style>{`
        .persistent-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1; /* Place it behind all other content */
        }
      `}</style>
      <div className="persistent-background">
        <ShootingStars />
        <GalaxySystem />
        <FloatingAstronaut />
      </div>
    </>
  );
}