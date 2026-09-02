export type LayoutMode = "cluster" | "depthList" | "constellation" | "gallery" | "path" | "timeline";

export const FRAGMENT_COUNT = 8;
export const TUCK_RADIUS = 0.85;

export function tuckPosition(target: readonly [number, number, number]): [number, number, number] {
  const len = Math.hypot(target[0], target[1], target[2]) || 1;
  return [
    (target[0] / len) * TUCK_RADIUS,
    (target[1] / len) * TUCK_RADIUS,
    (target[2] / len) * TUCK_RADIUS,
  ];
}

export function fibonacciSphere(i: number, n: number, radius: number): [number, number, number] {
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = i * offset - 1 + offset / 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = i * increment;
  return [Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius];
}

/** Loose orbiting cluster around the core — the "resting" formation. */
export function clusterLayout(i: number, n: number): [number, number, number] {
  return fibonacciSphere(i, n, 2.1);
}

/** A straight receding line — each item its own depth, echoing a spatial list. */
export function depthListLayout(i: number, n: number): [number, number, number] {
  const t = n <= 1 ? 0 : i / (n - 1);
  return [0.3, (t - 0.5) * 1.4, -1 - t * 5.5];
}

/** Grouped into three sub-clusters, echoing the skill-category groupings in the DOM. */
export function constellationLayout(i: number, n: number): [number, number, number] {
  const groupCount = 3;
  const group = i % groupCount;
  const withinGroup = Math.floor(i / groupCount);
  const groupAngle = (group / groupCount) * Math.PI * 2;
  const groupRadius = 2.2;
  const cx = Math.cos(groupAngle) * groupRadius;
  const cy = Math.sin(groupAngle * 0.7) * 1.1;
  const cz = Math.sin(groupAngle) * groupRadius * 0.7;
  const [lx, ly, lz] = fibonacciSphere(withinGroup, Math.ceil(n / groupCount) + 1, 0.5);
  return [cx + lx, cy + ly, cz + lz];
}

/** Two facing rows receding into depth — a corridor the camera dollies through. */
export function galleryLayout(i: number): [number, number, number] {
  const side = i % 2 === 0 ? -1 : 1;
  const row = Math.floor(i / 2);
  return [side * 2.3, row % 2 === 0 ? 0.25 : -0.25, -0.6 - row * 1.7];
}

/** Winding tunnel path — used for the process journey. */
export function pathLayout(i: number, n: number): [number, number, number] {
  const t = n <= 1 ? 0 : i / (n - 1);
  return [Math.sin(t * Math.PI * 1.5) * 1.4, (t - 0.5) * 2, -t * 3.4];
}

/** Straighter vertical line — used for the experience timeline. */
export function timelineLayout(i: number, n: number): [number, number, number] {
  const t = n <= 1 ? 0 : i / (n - 1);
  return [Math.sin(t * Math.PI) * 0.4, (t - 0.5) * 3.8, -0.8 - t * 1.6];
}

export function layoutPosition(mode: LayoutMode, i: number, n: number): [number, number, number] {
  switch (mode) {
    case "depthList":
      return depthListLayout(i, n);
    case "constellation":
      return constellationLayout(i, n);
    case "gallery":
      return galleryLayout(i);
    case "path":
      return pathLayout(i, n);
    case "timeline":
      return timelineLayout(i, n);
    case "cluster":
    default:
      return clusterLayout(i, n);
  }
}
