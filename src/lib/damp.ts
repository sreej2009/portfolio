/** Frame-rate independent exponential smoothing toward `target`. */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

export function damp3(
  current: [number, number, number],
  target: readonly [number, number, number],
  lambda: number,
  delta: number,
): void {
  current[0] = damp(current[0], target[0], lambda, delta);
  current[1] = damp(current[1], target[1], lambda, delta);
  current[2] = damp(current[2], target[2], lambda, delta);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
