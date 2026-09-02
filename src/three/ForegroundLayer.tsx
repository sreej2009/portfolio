import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/three/sceneState";
import { sectionConfig } from "@/three/sectionConfig";
import { layoutPosition, tuckPosition } from "@/three/fragmentLayouts";
import { damp, lerp } from "@/lib/damp";
import { FOREGROUND_STOLEN_INDICES } from "@/three/SceneContent";

/**
 * A second, lightweight canvas rendered ABOVE the page content. It mirrors the main
 * canvas's camera exactly and renders only the two fragments the background scene
 * hands off during Hero — giving genuine WebGL depth-layering with the headline
 * (some geometry behind the text, some physically in front of it) rather than a
 * CSS trick.
 */
export function ForegroundLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 40 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 3]} intensity={0.8} color="#f2f0ea" />
        <ForegroundContent />
      </Canvas>
    </div>
  );
}

function ForegroundContent() {
  const { camera } = useThree();
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const matRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const local = useRef({ split: 0, opacity: 0 });

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const cam = camera as THREE.PerspectiveCamera;
    const cfg = sectionConfig.hero;
    const active = sceneState.activeSection === "hero" && !sceneState.isMobile;
    const l = local.current;

    cam.position.set(...sceneState.cameraPosition);
    cam.fov = sceneState.cameraFov;
    cam.updateProjectionMatrix();
    cam.lookAt(new THREE.Vector3(...sceneState.cameraLookAt));

    l.split = damp(l.split, cfg.splitFactor, 3, delta);
    l.opacity = damp(l.opacity, active ? 1 : 0, 3.5, delta);

    const spin = sceneState.reducedMotion ? 0 : 1;

    FOREGROUND_STOLEN_INDICES.forEach((fragIndex, slot) => {
      const mesh = meshRefs.current[slot];
      const mat = matRefs.current[slot];
      if (!mesh || !mat) return;

      const target = layoutPosition(cfg.layout, fragIndex, 8);
      const tuck = tuckPosition(target);
      mesh.position.set(
        sceneState.corePosition[0] + lerp(tuck[0], target[0], l.split),
        sceneState.corePosition[1] + lerp(tuck[1], target[1], l.split),
        sceneState.corePosition[2] + lerp(tuck[2], target[2], l.split),
      );
      mesh.rotation.x += delta * (0.3 + fragIndex * 0.05) * spin;
      mesh.rotation.y += delta * (0.22 + fragIndex * 0.03) * spin;

      mat.opacity = l.opacity * 0.95;
      mat.emissiveIntensity = 0.6 * l.opacity;
    });
  });

  return (
    <>
      {FOREGROUND_STOLEN_INDICES.map((fragIndex, slot) => (
        <mesh
          key={fragIndex}
          ref={(el) => {
            meshRefs.current[slot] = el;
          }}
        >
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            ref={(el) => {
              matRefs.current[slot] = el;
            }}
            color="#c8a96b"
            roughness={0.3}
            metalness={0.4}
            emissive="#c8a96b"
            emissiveIntensity={0}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </>
  );
}
