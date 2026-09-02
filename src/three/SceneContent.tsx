import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/three/sceneState";
import { sectionConfig } from "@/three/sectionConfig";
import { layoutPosition, FRAGMENT_COUNT, tuckPosition } from "@/three/fragmentLayouts";
import { damp, damp3, lerp } from "@/lib/damp";
import { projects } from "@/data/projects";

const FRAGMENT_OPACITY = 0.95;
const ACCENT = new THREE.Color("#c8a96b");

/** These two fragments hand off to the foreground overlay canvas during Hero, so they
 *  read as sitting in front of the headline instead of behind the whole page. */
export const FOREGROUND_STOLEN_INDICES = [6, 7];

interface RingSpec {
  radius: number;
  tube: number;
  rotation: [number, number, number];
  speed: number;
}

const RINGS: RingSpec[] = [
  { radius: 1.3, tube: 0.05, rotation: [0.15, 0, 0], speed: 0.05 },
  { radius: 1.08, tube: 0.042, rotation: [Math.PI / 2.3, Math.PI / 5, 0], speed: -0.07 },
  { radius: 0.88, tube: 0.034, rotation: [-Math.PI / 3, 0, Math.PI / 4.5], speed: 0.09 },
];

export function SceneContent() {
  const coreGroup = useRef<THREE.Group>(null);
  const ringMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const ringMats = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const accentRingMesh = useRef<THREE.Mesh>(null);
  const accentRingMat = useRef<THREE.MeshBasicMaterial>(null);
  const glassMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const fragmentsGroup = useRef<THREE.Group>(null);
  const fragmentRefs = useRef<(THREE.Mesh | null)[]>([]);
  const fragmentMats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const keyLight = useRef<THREE.PointLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);

  const projectTones = useMemo(
    () => Array.from({ length: FRAGMENT_COUNT }, (_, i) => new THREE.Color(projects[i]?.tone ?? "#c8a96b")),
    [],
  );

  const linePositions = useMemo(() => new Float32Array(FRAGMENT_COUNT * 2 * 3), []);
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  const local = useRef({ scale: 1, split: 0, opacity: 1, colorMix: 0 });
  const scratchColor = useRef(new THREE.Color());

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const cfg = sectionConfig[sceneState.activeSection];
    const l = local.current;
    // Camera distance already compensates for narrow/portrait aspect (see CameraRig),
    // so mobile only needs a mild extra trim here, not a second full-strength shrink.
    const mobileScale = sceneState.isMobile ? 0.85 : 1;
    // Small/ambient formations otherwise read as almost invisible on a phone screen —
    // boost them back up so the 3D presence stays legible without touching desktop.
    const mobileOpacityBoost = sceneState.isMobile ? 1.6 : 1;
    const spin = sceneState.reducedMotion ? 0 : 1;
    const isWork = sceneState.activeSection === "work";

    damp3(sceneState.corePosition, cfg.corePosition, 3.2, delta);
    l.scale = damp(l.scale, cfg.coreScale * mobileScale, 3.5, delta);
    l.split = damp(l.split, cfg.splitFactor, 3, delta);
    l.opacity = damp(l.opacity, Math.min(1, cfg.opacity * mobileOpacityBoost), 3.5, delta);
    l.colorMix = damp(l.colorMix, isWork ? 1 : 0, 3, delta);

    sceneState.pointer.x = damp(sceneState.pointer.x, sceneState.targetPointer.x, 4, delta);
    sceneState.pointer.y = damp(sceneState.pointer.y, sceneState.targetPointer.y, 4, delta);

    if (coreGroup.current) {
      coreGroup.current.position.set(...sceneState.corePosition);
      coreGroup.current.scale.setScalar(l.scale);
      coreGroup.current.rotation.y += delta * 0.12 * cfg.rotationSpeedMul * spin;
      coreGroup.current.rotation.x = THREE.MathUtils.damp(
        coreGroup.current.rotation.x,
        sceneState.pointer.y * 0.18,
        4,
        delta,
      );
      coreGroup.current.rotation.z = THREE.MathUtils.damp(
        coreGroup.current.rotation.z,
        sceneState.pointer.x * -0.09,
        4,
        delta,
      );
    }

    // Each orbital ring precesses at its own rate, like a gyroscope — this is what
    // sells the "orbital rings" read rather than a single static ornament.
    ringMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.z += delta * RINGS[i].speed * cfg.rotationSpeedMul * spin;
    });
    if (accentRingMesh.current) {
      accentRingMesh.current.rotation.z -= delta * 0.04 * spin;
      accentRingMesh.current.rotation.y += delta * 0.03 * spin;
    }

    if (fragmentsGroup.current) {
      fragmentsGroup.current.position.set(...sceneState.corePosition);
      fragmentsGroup.current.rotation.y += delta * 0.05 * spin * (cfg.layout === "cluster" ? 1 : 0.25);
    }

    fragmentRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const target = layoutPosition(cfg.layout, i, FRAGMENT_COUNT);
      const tuck = tuckPosition(target);
      mesh.position.x = lerp(tuck[0], target[0], l.split);
      mesh.position.y = lerp(tuck[1], target[1], l.split);
      mesh.position.z = lerp(tuck[2], target[2], l.split);
      mesh.rotation.x += delta * (0.3 + i * 0.05) * spin;
      mesh.rotation.y += delta * (0.22 + i * 0.03) * spin;

      const isHovered = i === sceneState.hoveredFragmentIndex;
      const targetScale = isHovered ? 2.2 : 1;
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, targetScale, 6, delta));
    });

    // Connecting lines: radial-from-core for constellation, chained for path/timeline.
    if (linesRef.current) {
      const showLines = cfg.showLines;
      const isRadial = cfg.layout === "constellation";
      for (let i = 0; i < FRAGMENT_COUNT; i++) {
        const mesh = fragmentRefs.current[i];
        const base = i * 6;
        if (!mesh || !showLines) {
          linePositions[base] = 0;
          linePositions[base + 1] = 0;
          linePositions[base + 2] = 0;
          linePositions[base + 3] = 0;
          linePositions[base + 4] = 0;
          linePositions[base + 5] = 0;
          continue;
        }
        if (isRadial) {
          linePositions[base] = 0;
          linePositions[base + 1] = 0;
          linePositions[base + 2] = 0;
        } else {
          const from = fragmentRefs.current[Math.max(0, i - 1)] ?? mesh;
          linePositions[base] = i === 0 ? mesh.position.x : from.position.x;
          linePositions[base + 1] = i === 0 ? mesh.position.y : from.position.y;
          linePositions[base + 2] = i === 0 ? mesh.position.z : from.position.z;
        }
        linePositions[base + 3] = mesh.position.x;
        linePositions[base + 4] = mesh.position.y;
        linePositions[base + 5] = mesh.position.z;
      }
      const attr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
      if (lineMat.current) {
        lineMat.current.opacity = showLines ? 0.35 * l.opacity : 0;
      }
    }

    if (keyLight.current) {
      keyLight.current.intensity = (5.5 + sceneState.velocity * 0.06) * l.opacity;
    }
    if (rimLight.current) {
      rimLight.current.intensity = 3.2 * l.opacity;
    }
    ringMats.current.forEach((mat) => {
      if (!mat) return;
      mat.opacity = l.opacity;
    });
    if (accentRingMat.current) {
      accentRingMat.current.opacity = 0.55 * l.opacity;
    }
    if (glassMat.current) {
      glassMat.current.opacity = Math.min(1, l.opacity * 1.6);
      glassMat.current.transmission = sceneState.isMobile ? 0 : 0.9;
    }

    const stealForeground = sceneState.activeSection === "hero" && !sceneState.isMobile;

    fragmentMats.current.forEach((mat, i) => {
      if (!mat) return;
      const hoverBoost = i === sceneState.hoveredFragmentIndex ? 2 : 1;
      const stolen = stealForeground && FOREGROUND_STOLEN_INDICES.includes(i);
      mat.opacity = stolen ? 0 : Math.min(1, FRAGMENT_OPACITY * l.opacity * hoverBoost);
      mat.emissiveIntensity = 0.6 * l.opacity * hoverBoost;
      scratchColor.current.copy(ACCENT).lerp(projectTones[i], l.colorMix);
      mat.color.copy(scratchColor.current);
      mat.emissive.copy(scratchColor.current);
    });
  });

  return (
    <>
      <group ref={coreGroup}>
        {RINGS.map((ring, i) => (
          <mesh
            key={i}
            ref={(el) => {
              ringMeshes.current[i] = el;
            }}
            rotation={ring.rotation}
          >
            <torusGeometry args={[ring.radius, ring.tube, 16, 120]} />
            <meshPhysicalMaterial
              ref={(el) => {
                ringMats.current[i] = el;
              }}
              color="#0d0d0e"
              roughness={0.16}
              metalness={0.92}
              clearcoat={0.9}
              clearcoatRoughness={0.12}
              transparent
              opacity={1}
            />
          </mesh>
        ))}

        <mesh ref={accentRingMesh} rotation={[Math.PI / 5, Math.PI / 3.4, 0]}>
          <torusGeometry args={[1.42, 0.005, 8, 120]} />
          <meshBasicMaterial ref={accentRingMat} color="#c8a96b" transparent opacity={0.55} />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.36, 48, 48]} />
          <meshPhysicalMaterial
            ref={glassMat}
            color="#463f31"
            roughness={0.04}
            metalness={0}
            transmission={0.9}
            thickness={0.55}
            ior={1.4}
            transparent
            opacity={1}
          />
        </mesh>

        <pointLight ref={keyLight} color="#c8a96b" intensity={5.5} distance={7} decay={2} position={[1.4, 0.8, 1.2]} />
        <pointLight ref={rimLight} color="#f1efe8" intensity={3.2} distance={8} decay={2} position={[-1.6, -0.6, -1]} />
      </group>

      <group ref={fragmentsGroup}>
        <lineSegments ref={linesRef} geometry={lineGeometry}>
          <lineBasicMaterial ref={lineMat} color="#c8a96b" transparent opacity={0} />
        </lineSegments>

        {Array.from({ length: FRAGMENT_COUNT }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              fragmentRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial
              ref={(el) => {
                fragmentMats.current[i] = el;
              }}
              color="#c8a96b"
              roughness={0.3}
              metalness={0.4}
              emissive="#c8a96b"
              emissiveIntensity={0.6}
              transparent
              opacity={FRAGMENT_OPACITY}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
