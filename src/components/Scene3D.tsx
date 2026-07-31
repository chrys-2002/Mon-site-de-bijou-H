"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   Géométrie réaliste d'un anneau (profil "D" / confort fit)
   — révolution d'un vrai profil de bague, pas un simple tore
   ============================================================ */
function createBandGeometry(radius = 1, width = 0.42, thickness = 0.16) {
  const points: THREE.Vector2[] = [];
  const N = 24;

  // Paroi intérieure : légèrement bombée vers l'intérieur (confort fit)
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const y = (t - 0.5) * width;
    const comfort = Math.sin(t * Math.PI) * 0.018;
    points.push(new THREE.Vector2(radius - comfort, y));
  }
  // Paroi extérieure : profil en "D" bombé (comme une vraie alliance polie)
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const y = (0.5 - t) * width;
    const d = Math.cos((t - 0.5) * Math.PI); // 1 au centre, 0 aux bords
    points.push(new THREE.Vector2(radius + thickness * (0.35 + 0.65 * d), y));
  }
  points.push(points[0].clone()); // fermeture du profil

  const geometry = new THREE.LatheGeometry(points, 128);
  geometry.computeVertexNormals();
  return geometry;
}

/* Matériaux physiques : le métal réfléchit l'environnement, zéro émissif */
const goldMaterialProps = {
  color: "#e8b872",
  metalness: 1,
  roughness: 0.08,
  envMapIntensity: 1.6,
  clearcoat: 0.4,
  clearcoatRoughness: 0.15,
} as const;

const platinumMaterialProps = {
  color: "#e6e9ef",
  metalness: 1,
  roughness: 0.06,
  envMapIntensity: 1.8,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
} as const;

/* ============================================================
   Alliance simple (or ou platine)
   ============================================================ */
function Band({
  position,
  rotation,
  scale = 1,
  platinum = false,
  spinSpeed = 0.15,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  platinum?: boolean;
  spinSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createBandGeometry(1, 0.4, 0.15), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * spinSpeed;
    groupRef.current.rotation.x =
      rotation[0] + Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial {...(platinum ? platinumMaterialProps : goldMaterialProps)} />
        </mesh>
      </Float>
    </group>
  );
}

/* ============================================================
   Diamant taillé (couronne + pavillon à 8 facettes, flat shading)
   ============================================================ */
function Diamond({ size = 0.2 }: { size?: number }) {
  return (
    <group>
      {/* Couronne avec table */}
      <mesh position={[0, size * 0.28, 0]}>
        <cylinderGeometry args={[size * 0.55, size, size * 0.5, 8, 1]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.02}
          transmission={0.92}
          thickness={size * 2}
          ior={2.42}
          envMapIntensity={3}
          clearcoat={1}
          flatShading
        />
      </mesh>
      {/* Pavillon (pointe) */}
      <mesh position={[0, -size * 0.42, 0]}>
        <cylinderGeometry args={[size, size * 0.01, size * 0.9, 8, 1]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.02}
          transmission={0.92}
          thickness={size * 2}
          ior={2.42}
          envMapIntensity={3}
          clearcoat={1}
          flatShading
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   Bague solitaire : alliance + tête à 4 griffes + diamant
   ============================================================ */
function SolitaireRing({
  position,
  rotation,
  scale = 1,
  spinSpeed = -0.12,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  spinSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createBandGeometry(1, 0.3, 0.13), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * spinSpeed;
    groupRef.current.rotation.z =
      rotation[2] + Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  // 4 griffes inclinées vers le diamant
  const prongs = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return { x: Math.cos(a) * 0.16, z: Math.sin(a) * 0.16, tiltX: -Math.sin(a) * 0.35, tiltZ: Math.cos(a) * 0.35 };
      }),
    []
  );

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Le corps de bague — lathe tourné pour que le diamant soit en haut */}
        <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial {...goldMaterialProps} />
        </mesh>

        {/* Tête du solitaire */}
        <group position={[0, 1.12, 0]}>
          {/* Panier */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.13, 0.09, 0.14, 16]} />
            <meshPhysicalMaterial {...goldMaterialProps} />
          </mesh>
          {/* Griffes */}
          {prongs.map((p, i) => (
            <mesh key={i} position={[p.x, 0.1, p.z]} rotation={[p.tiltZ, 0, -p.tiltX]}>
              <cylinderGeometry args={[0.022, 0.03, 0.24, 8]} />
              <meshPhysicalMaterial {...goldMaterialProps} />
            </mesh>
          ))}
          {/* Le diamant */}
          <group position={[0, 0.16, 0]}>
            <Diamond size={0.2} />
          </group>
        </group>
      </Float>
    </group>
  );
}

/* ============================================================
   Parallaxe souris (écoute window : le canvas est pointer-events-none)
   + entrée en douceur de toute la scène
   ============================================================ */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Entrée : léger zoom + fondu de position
    intro.current = THREE.MathUtils.damp(intro.current, 1, 1.2, delta);
    const s = 0.75 + 0.25 * intro.current;
    ref.current.scale.setScalar(s);

    // Parallaxe douce
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.current.x * 0.12, 2.5, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.current.y * 0.08, 2.5, delta);
  });

  return <group ref={ref}>{children}</group>;
}

/* ============================================================
   Scène : éclairage studio procédural (Lightformers) —
   c'est lui qui donne les reflets "métal poli" réalistes
   ============================================================ */
export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Studio virtuel : softbox au-dessus, panneaux latéraux chaud/froid */}
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={4} position={[0, 5, -6]} scale={[12, 6, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={2} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#ffe3b8" />
            <Lightformer form="rect" intensity={2.2} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#dbe6ff" />
            <Lightformer form="ring" intensity={1.5} position={[0, 0, 7]} scale={5} color="#ffffff" />
          </Environment>

          <ambientLight intensity={0.15} />
          <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={1.5} color="#fff4e0" />

          <Rig>
            <Band position={[-3, 1.1, -1]} rotation={[0.9, 0.3, 0.2]} scale={1.15} spinSpeed={0.18} />
            <Band position={[3.2, -0.9, -2]} rotation={[1.2, -0.2, 0.4]} scale={0.95} platinum spinSpeed={-0.14} />
            <SolitaireRing position={[0.2, 0.3, -3.2]} rotation={[0.25, 0.2, -0.15]} scale={1.05} />
            <Band position={[-1.6, -1.5, -2.2]} rotation={[0.7, 0.5, -0.2]} scale={0.75} spinSpeed={0.22} />
            <SolitaireRing position={[3.4, 1.6, -4.5]} rotation={[0.3, -0.4, 0.2]} scale={0.8} spinSpeed={0.1} />

            {/* Poussière d'or en suspension, discrète */}
            <Sparkles count={50} scale={[14, 8, 6]} size={1.6} speed={0.25} opacity={0.45} color="#ffd27a" />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}
