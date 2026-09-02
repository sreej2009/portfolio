import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 1 });
// Must be unconditional (not gated behind the Lenis effect) — otherwise, whenever Lenis
// is skipped (prefers-reduced-motion), GSAP's default lag-smoothing can badly stretch
// tween durations on any environment with irregular frame delivery.
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger };
