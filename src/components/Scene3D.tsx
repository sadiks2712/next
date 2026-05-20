"use client";
import { useMemo, Suspense } from "react";
import { useTheme } from "next-themes";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Sphere, Torus, Octahedron, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function FloatingObjects({ resolvedTheme }: { resolvedTheme?: string }) {
  const color = resolvedTheme === "dark" ? "#2563eb" : "#3b82f6";
  const opacity = resolvedTheme === "dark" ? 0.7 : 0.4;

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity,
      }),
    [color, opacity]
  );

  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[1, 0]} position={[-5.5, 3, -2]} material={material} scale={1.0} />
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Torus args={[1, 0.3, 16, 32]} position={[5.5, -3, -2]} material={material} scale={1.1} />
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
        <Octahedron args={[1, 0]} position={[5, 2.8, -2]} material={material} scale={0.7} />
      </Float>
      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[-4.5, -3, -3]} material={material} scale={0.9} />
      </Float>
    </>
  );
}

export default function Scene3D() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="scene3d-container" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <FloatingObjects resolvedTheme={resolvedTheme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
