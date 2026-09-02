import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/three/sceneState";

interface LayerProps {
  count: number;
  spread: [number, number, number];
  zOffset: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

function ParticleLayer({ count, spread, zOffset, size, opacity, speed, color }: LayerProps) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread[2] + zOffset;
    }
    return arr;
  }, [count, spread, zOffset]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!points.current || sceneState.reducedMotion) return;
    points.current.rotation.y += delta * speed * (1 + sceneState.velocity * 0.008);
    points.current.rotation.x += delta * speed * 0.4;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}

const OFF_WHITE = "#f2f0ea";
const CHAMPAGNE = "#c8a96b";

/**
 * Three dim off-white depth layers (near/mid/far — a near layer that drifts fastest,
 * close to the camera path, a mid layer, and a distant slow backdrop) plus one small,
 * sparse champagne layer for a touch of warmth. Predominantly neutral, never a
 * sparkling accent-colored field.
 */
export function Particles({ count }: { count: number }) {
  const near = Math.round(count * 0.12);
  const mid = Math.round(count * 0.33);
  const champagne = Math.round(count * 0.05);
  const far = count - near - mid - champagne;

  return (
    <>
      <ParticleLayer
        count={far}
        spread={[24, 16, 30]}
        zOffset={-14}
        size={0.014}
        opacity={0.16}
        speed={0.006}
        color={OFF_WHITE}
      />
      <ParticleLayer
        count={mid}
        spread={[16, 11, 20]}
        zOffset={-6}
        size={0.02}
        opacity={0.22}
        speed={0.012}
        color={OFF_WHITE}
      />
      <ParticleLayer
        count={near}
        spread={[10, 7, 14]}
        zOffset={2}
        size={0.028}
        opacity={0.28}
        speed={0.02}
        color={OFF_WHITE}
      />
      <ParticleLayer
        count={champagne}
        spread={[14, 9, 18]}
        zOffset={-4}
        size={0.026}
        opacity={0.4}
        speed={0.014}
        color={CHAMPAGNE}
      />
    </>
  );
}
