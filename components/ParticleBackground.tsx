"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function RotatingStars() {
  const ref = useRef<any>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} ref={ref}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={3} 
        saturation={0} 
        fade 
        speed={1} 
      />
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
      </Canvas>
    </div>
  );
}
