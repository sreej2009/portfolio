import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/three/sceneState";
import { setLenisInstance } from "@/lib/lenisSingleton";

/**
 * Drives smooth scroll via Lenis, synced to GSAP's ticker so
 * ScrollTrigger, RAF-based animations and Lenis all share one clock.
 * Disabled under prefers-reduced-motion — native scroll takes over
 * and ScrollTrigger still works against it unmodified.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });

    lenis.on("scroll", (e: { velocity: number }) => {
      ScrollTrigger.update();
      sceneState.velocity = e.velocity;
    });

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    const onVisibility = () => {
      if (document.hidden) lenis.stop();
      else lenis.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    document.documentElement.classList.add("lenis");
    setLenisInstance(lenis);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenisInstance(null);
      document.documentElement.classList.remove("lenis");
    };
  }, [enabled]);
}
