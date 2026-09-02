import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { sceneState } from "@/three/sceneState";
import { CameraRig } from "@/three/CameraRig";
import { SceneContent } from "@/three/SceneContent";
import { Particles } from "@/three/Particles";
import { ForegroundLayer } from "@/three/ForegroundLayer";
import { useIsMobile, useIsTouchDevice, useReducedMotion } from "@/lib/useMedia";

export function Scene() {
  const isMobile = useIsMobile();
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    sceneState.reducedMotion = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    sceneState.isMobile = isMobile;
  }, [isMobile]);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: PointerEvent) => {
      sceneState.targetPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.targetPointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [isTouch]);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const particleCount = isMobile ? 220 : 700;
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];
  const usePostFx = !reducedMotion;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <Canvas
          dpr={dpr}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 7], fov: 40, near: 0.1, far: 40 }}
        >
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 6, 17]} />

          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 5, 3]} intensity={0.9} color="#f2f0ea" />
          <directionalLight position={[-4, -2, -3]} intensity={0.24} color="#c8a96b" />

          <Suspense fallback={null}>
            <CameraRig />
            <SceneContent />
            <Particles count={particleCount} />
          </Suspense>

          {usePostFx && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={isMobile ? 0.7 : 0.55}
                luminanceThreshold={0.18}
                luminanceSmoothing={0.3}
                mipmapBlur={!isMobile}
                resolutionScale={isMobile ? 0.5 : 1}
              />
              <Vignette eskil={false} offset={0.2} darkness={0.6} />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {!isMobile && !reducedMotion && <ForegroundLayer />}
    </>
  );
}
