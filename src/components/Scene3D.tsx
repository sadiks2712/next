"use client";
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Sphere, Torus, Octahedron, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function FloatingObjects({ resolvedTheme }: { resolvedTheme?: string }) {
  const color = resolvedTheme === "dark" ? "#2563eb" : "#3b82f6";
  const opacity = resolvedTheme === "dark" ? 0.7 : 0.4;

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: opacity,
  }), [color, opacity]);

  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[1, 0]} position={[-4, 2, -2]} material={material} scale={1.2} />
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Torus args={[1, 0.3, 16, 32]} position={[5, -1, -3]} material={material} scale={1.5} />
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
        <Octahedron args={[1, 0]} position={[3, 3, -1]} material={material} scale={0.8} />
      </Float>

      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[-3, -2, -4]} material={material} scale={1.1} />
      </Float>
    </>
  );
}

export default function Scene3D() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <FloatingObjects resolvedTheme={resolvedTheme} />
      </Canvas>
    </div>
  );
}
