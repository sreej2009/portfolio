export type SectionId =
  | "hero"
  | "about"
  | "capabilities"
  | "skills"
  | "work"
  | "process"
  | "experience"
  | "contact";

interface SceneState {
  activeSection: SectionId;
  sectionProgress: Partial<Record<SectionId, number>>;
  /** Continuous scroll-driven parameter (sectionIndex + local 0..1) sampled by the camera curve. */
  curveT: number;
  pointer: { x: number; y: number };
  targetPointer: { x: number; y: number };
  velocity: number;
  hovered: boolean;
  activeProjectIndex: number;
  /** Index of the fragment (0..7) currently hovered via a DOM row (capabilities/work), -1 = none. */
  hoveredFragmentIndex: number;
  reducedMotion: boolean;
  corePosition: [number, number, number];
  isMobile: boolean;
  /** Published each frame by CameraRig so secondary render layers can mirror the same camera. */
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
  cameraFov: number;
}

export const sceneState: SceneState = {
  activeSection: "hero",
  sectionProgress: {},
  curveT: 0,
  pointer: { x: 0, y: 0 },
  targetPointer: { x: 0, y: 0 },
  velocity: 0,
  hovered: false,
  activeProjectIndex: 0,
  hoveredFragmentIndex: -1,
  reducedMotion: false,
  corePosition: [0, 0, 0],
  isMobile: false,
  cameraPosition: [0, 0, 8],
  cameraLookAt: [0, 0, 0],
  cameraFov: 40,
};
