"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Ring({ position, color, speed, size, metalness }: { position: [number, number, number]; color: string; speed: number; size: number; metalness: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <torusGeometry args={[size, 0.1, 24, 48]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={metalness} />
        </mesh>
      </Float>
    </group>
  );
}

function Sparkles() {
  const count = 25;
  const particlesRef = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  useFrame((state) => {
    if (particlesRef.current) particlesRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.2]} performance={{ min: 0.5 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <Ring position={[-3, 1, -2]} color="#d4af37" speed={0.3} size={1.4} metalness={1} />
          <Ring position={[3, -1, -3]} color="#e8e8e8" speed={0.4} size={1.1} metalness={0.9} />
          <Ring position={[0, 0.5, -4]} color="#ffd700" speed={0.35} size={1.7} metalness={1} />
          <Ring position={[-1.5, -1.5, -1]} color="#c0c0c0" speed={0.45} size={0.8} metalness={0.8} />
          <Sparkles />
        </Suspense>
      </Canvas>
    </div>
  );
}