import type { SectionId } from "@/three/sceneState";
import type { LayoutMode } from "@/three/fragmentLayouts";

export interface SectionSceneConfig {
  corePosition: readonly [number, number, number];
  coreScale: number;
  splitFactor: number;
  rotationSpeedMul: number;
  cameraFov: number;
  /** 1 = fully present, lower = ambient backdrop that yields to copy legibility. */
  opacity: number;
  /** Which spatial formation the fragment pool resolves into as splitFactor rises. */
  layout: LayoutMode;
  /** Whether connecting lines between fragments render for this layout. */
  showLines: boolean;
}

export const sectionConfig: Record<SectionId, SectionSceneConfig> = {
  hero: {
    corePosition: [1.6, -0.1, -0.6],
    coreScale: 1.35,
    splitFactor: 0,
    rotationSpeedMul: 1,
    cameraFov: 38,
    opacity: 1,
    layout: "cluster",
    showLines: false,
  },
  about: {
    corePosition: [4.4, -0.6, -1.6],
    coreScale: 0.55,
    splitFactor: 0.2,
    rotationSpeedMul: 1.2,
    cameraFov: 36,
    opacity: 0.16,
    layout: "cluster",
    showLines: false,
  },
  capabilities: {
    corePosition: [3.2, -0.3, 0.4],
    coreScale: 0.42,
    splitFactor: 0.8,
    rotationSpeedMul: 1.4,
    cameraFov: 36,
    opacity: 0.24,
    layout: "depthList",
    showLines: false,
  },
  skills: {
    corePosition: [0, 0.3, -2.2],
    coreScale: 0.4,
    splitFactor: 1,
    rotationSpeedMul: 0.7,
    cameraFov: 42,
    opacity: 0.35,
    layout: "constellation",
    showLines: true,
  },
  work: {
    corePosition: [2.4, -0.1, -1.6],
    coreScale: 0.28,
    splitFactor: 1,
    rotationSpeedMul: 1.6,
    cameraFov: 44,
    opacity: 0.85,
    layout: "gallery",
    showLines: false,
  },
  process: {
    corePosition: [3, 0.2, 0.2],
    coreScale: 0.24,
    splitFactor: 1,
    rotationSpeedMul: 1,
    cameraFov: 40,
    opacity: 0.26,
    layout: "path",
    showLines: true,
  },
  experience: {
    corePosition: [-3, 0.2, 0.2],
    coreScale: 0.24,
    splitFactor: 1,
    rotationSpeedMul: 1.1,
    cameraFov: 40,
    opacity: 0.26,
    layout: "timeline",
    showLines: true,
  },
  contact: {
    corePosition: [2.2, -0.3, -0.8],
    coreScale: 0.85,
    splitFactor: 0,
    rotationSpeedMul: 0.8,
    cameraFov: 38,
    opacity: 1,
    layout: "cluster",
    showLines: false,
  },
};
