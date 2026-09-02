import * as THREE from "three";
import type { SectionId } from "@/three/sceneState";

/** Order the camera curve travels through — index doubles as the curve's knot parameter. */
export const sectionOrder: SectionId[] = [
  "hero",
  "about",
  "capabilities",
  "skills",
  "work",
  "process",
  "experience",
  "contact",
];

// One waypoint per section. The camera doesn't jump between these — it travels the
// spline that passes through all of them, so motion between sections is a real
// curved path in x/y/z, not a straight interpolation.
const waypoints: Array<[number, number, number]> = [
  [0.5, 0.3, 7.4], // hero — head-on, slightly elevated
  [3.8, 0.9, 5.2], // about — orbits right around the sculpture
  [-3.6, -0.5, 4.4], // capabilities — swings left and dives closer
  [0.4, 1.8, 3.2], // skills — rises above, drifts into the constellation
  [-2.2, -0.3, 0.6], // work — drops down, enters the gallery corridor
  [2.4, 0.5, -1.6], // process — weaves right, presses further into the tunnel
  [-1.8, 1, -3.6], // experience — weaves left along the timeline, deepest point
  [0, 0.2, 5.8], // contact — pulls back out to a calm final frame
];

export const cameraPositionCurve = new THREE.CatmullRomCurve3(
  waypoints.map((p) => new THREE.Vector3(...p)),
  false,
  "catmullrom",
  0.55,
);

export function sectionIndex(id: SectionId): number {
  return sectionOrder.indexOf(id);
}

export const CURVE_MAX_T = sectionOrder.length - 1;
