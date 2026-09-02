import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneState, type SectionId } from "@/three/sceneState";
import { sectionIndex } from "@/three/cameraPath";

/**
 * Registers a section as a driver of the persistent 3D scene.
 *
 * Two independent ScrollTriggers are used:
 * - a "center" trigger that flips `activeSection` (and per-section local progress)
 *   once the section is roughly centered — this drives object/opacity targets.
 * - a "top top" → "bottom bottom" trigger that tiles perfectly with its neighbors,
 *   used only while genuinely active to advance the continuous camera-curve
 *   parameter `curveT` (sectionIndex + local 0..1) with no gaps or overlap.
 */
export function useSectionScene(ref: RefObject<HTMLElement | null>, id: SectionId) {
  useEffect(() => {
    if (!ref.current) return;
    const idx = sectionIndex(id);

    const activeTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) sceneState.activeSection = id;
      },
      onUpdate: (self) => {
        sceneState.sectionProgress[id] = self.progress;
      },
    });

    const pathTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (self.isActive) sceneState.curveT = idx + self.progress;
      },
    });

    return () => {
      activeTrigger.kill();
      pathTrigger.kill();
    };
  }, [ref, id]);
}
