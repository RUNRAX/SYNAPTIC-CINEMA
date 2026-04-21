import React, { useRef, useState, useMemo, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";


function ShootingStars({ count = 20 }) {
  const groupRef = useRef();
  const [positions, setPositions] = useState(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 50,
      z: Math.random() * 100 - 50,
      speed: Math.random() * 0.2 + 0.05,
    }))
  );

  useFrame(() => {
    setPositions((prev) =>
      prev.map((star) => {
        let y = star.y - star.speed;
        if (y < -10) {
          // Reset to top
          return {
            ...star,
            x: Math.random() * 100 - 50,
            y: Math.random() * 50 + 20,
            z: Math.random() * 100 - 50,
          };
        }
        return { ...star, y };
      })
    );
  });

  return (
    <group ref={groupRef}>
      {positions.map((star, i) => (
        <mesh position={[star.x, star.y, star.z]} key={i}>
          <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
}

const fallbackPosterUrl = "https://placehold.co/185x277/000000/FFFFFF?text=No+Poster";

function ThunderStrikeEffect({ position }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.08;
      ref.current.rotation.x += 0.05;
    }
  });

  return (
    <points ref={ref} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <pointsMaterial size={0.03} color="#00ffff" transparent opacity={0.7} />
    </points>
  );
}

function MovieCard({ movie, isHovered, ...props }) {
  const meshRef = useRef();
  
  const posterUrl = movie.poster || fallbackPosterUrl;

  const texture = useLoader(THREE.TextureLoader, posterUrl);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const cardWidth = 1.2;
  const cardHeight = 1.8;
  const cardDepth = 0.15;

  const materials = useMemo(() => {
    const frontMaterial = new THREE.MeshBasicMaterial({ map: texture });

    // THIS IS THE CHANGE: The emissive color is now brighter to create the glow.
    // The hover effect will make it even brighter.
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 'silver',
      metalness: 0.7,
      roughness: 0.3,
      emissive: isHovered ? '#00ffff' : '#888888', // Was #222222, now brighter
      toneMapped: false,
    });
    
    return [
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      frontMaterial,
      frontMaterial,
    ];
  }, [texture, isHovered]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <mesh ref={meshRef} {...props} material={materials}>
      <boxGeometry args={[cardWidth, cardHeight, cardDepth]} />
    </mesh>
  );
}

function MovieRing({ trendingMovies = [], setCurrentIndex, hoverRef }) {
  const group = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const radius = 6;
  const angleStep = trendingMovies.length > 0 ? (2 * Math.PI) / trendingMovies.length : 0;

  useFrame(() => {
    if (group.current) {
      const speed = hoverRef.current ? 0.001 : 0.005;
      group.current.rotation.y += speed;

      if (trendingMovies.length > 0) {
        const currentAngle = group.current.rotation.y % (2 * Math.PI);
        let calculatedIndex = Math.round(currentAngle / angleStep);
        calculatedIndex = (calculatedIndex + trendingMovies.length) % trendingMovies.length;
        setCurrentIndex(calculatedIndex);
      }
    }
  });

  if (trendingMovies.length === 0) {
    return (
      <Html position={[0, 0, 0]} transform>
      </Html>
    );
  }

  return (
    <group ref={group}>
      {trendingMovies.map((movie, i) => {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = 0;

        return (
          <React.Fragment key={movie.id}>
            <Suspense fallback={null}>
              <MovieCard
                movie={movie}
                position={[x, y, z]}
                isHovered={hoveredIndex === i}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  hoverRef.current = true;
                  setHoveredIndex(i);
                }}
                onPointerOut={() => {
                  hoverRef.current = false;
                  setHoveredIndex(null);
                }}
              />
            </Suspense>
            {hoveredIndex === i && (
              <ThunderStrikeEffect position={[x, y, z]} />
            )}
          </React.Fragment>
        );
      })}
    </group>
  );
}

function ParticleSphere() {
  const points = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 2000; i++) {
      const phi = Math.random() * 2 * Math.PI;
      const costheta = Math.random() * 2 - 1;
      const u = Math.random();
      const theta = Math.acos(costheta);
      const r = 3 + 0.5 * Math.cbrt(u);
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      vertices.push(x, y, z);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function SphereRings() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0015;
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[4.5, 0.05, 2, 100]} />
        <meshStandardMaterial
          color="silver"
          metalness={1}
          roughness={0.2}
          emissive="white"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.8, 0, Math.PI / 4]}>
        <torusGeometry args={[5, 0.03, 2, 120]} />
        <meshStandardMaterial
          color="white"
          metalness={0.8}
          roughness={0.1}
          emissive="#cccccc"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function SphereScene({ trendingMovies, setCurrentIndex }) {
  const hoverRef = useRef(false);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 10, 5]} color="cyan" />
      <pointLight position={[-5, -5, -5]} color="white" intensity={1.5} />
      <Stars radius={100} depth={50} count={2000} factor={4} fade />
      <ShootingStars />
      <SphereRings />
      <ParticleSphere />
      <MovieRing
        trendingMovies={trendingMovies}
        setCurrentIndex={setCurrentIndex}
        hoverRef={hoverRef}
      />
      <OrbitControls enableZoom={false} />
    </>
  );
}
