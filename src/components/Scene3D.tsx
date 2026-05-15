"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Anneau en or
function GoldRing({ position, rotation, scale }: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  scale: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <torusGeometry args={[1, 0.12, 32, 64]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={1}
          />
        </mesh>
        {/* Petit diamant sur l'anneau */}
        <mesh position={[1, 0, 0]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0}
            metalness={0.1}
            transparent
            opacity={0.9}
            transmission={0.4}
            ior={2.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Anneau en argent
function SilverRing({ position, rotation, scale }: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  scale: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.006;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.35) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh>
          <torusGeometry args={[1, 0.1, 32, 64]} />
          <meshStandardMaterial
            color="#e8e8e8"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>
        {/* Diamant sur l'anneau */}
        <mesh position={[0, 1, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0}
            metalness={0}
            transparent
            opacity={0.95}
            transmission={0.5}
            ior={2.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Anneau or rose avec diamant
function RoseGoldRing({ position, rotation, scale }: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  scale: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh>
          <torusGeometry args={[1, 0.11, 32, 64]} />
          <meshStandardMaterial
            color="#e0a899"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[-1, 0, 0]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0}
            metalness={0.1}
            transparent
            opacity={0.9}
            transmission={0.35}
            ior={2.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Diamant flottant
function FloatingDiamond({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0}
        metalness={0}
        transparent
        opacity={0.8}
        transmission={0.6}
        ior={2.4}
      />
    </mesh>
  );
}

// Particules brillantes
function Sparkles() {
  const count = 40;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
      particlesRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.7} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* Lumières */}
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={0.5} intensity={1.5} color="#ffffff" />
      <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={0.5} intensity={1} color="#fff5e6" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3, -3, -2]} intensity={0.3} color="#d4af37" />
      
      {/* Anneaux */}
      <GoldRing position={[-2.5, 1, -1]} rotation={[0.3, 0.5, 0.2]} scale={1.3} />
      <SilverRing position={[2.8, -0.5, -2]} rotation={[0.5, -0.3, 0.1]} scale={1.1} />
      <RoseGoldRing position={[0, 0.8, -3]} rotation={[0.1, 0.2, 0.3]} scale={1.5} />
      <SilverRing position={[-1.5, -1.5, -1.5]} rotation={[0.6, 0.1, -0.2]} scale={0.9} />
      <GoldRing position={[3, 1.5, -4]} rotation={[0.4, -0.5, 0]} scale={1} />
      
      {/* Diamants flottants */}
      <FloatingDiamond position={[3.5, 2, -1]} />
      <FloatingDiamond position={[-3.5, -1, -2]} />
      <FloatingDiamond position={[1, 2.5, -3]} />
      <FloatingDiamond position={[-2, -2.5, -1]} />
      <FloatingDiamond position={[4, 0, -3]} />
      <FloatingDiamond position={[-4, 0.5, -4]} />
      <FloatingDiamond position={[0, -1.5, -5]} />
      
      {/* Particules */}
      <Sparkles />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}