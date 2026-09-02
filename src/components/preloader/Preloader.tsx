import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useUIStore } from "@/store/useUIStore";
import { useReducedMotion } from "@/lib/useMedia";

export function Preloader() {
  const finishLoading = useUIStore((s) => s.finishLoading);
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const counter = { value: 0 };

    function exit() {
      const tl = gsap.timeline({ delay: 0.2, onComplete: finishLoading });
      tl.to([numRef.current, labelRef.current, barRef.current?.parentElement], {
        autoAlpha: 0,
        y: -16,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.04,
      })
        .to(bgRef.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "<")
        .to(
          rootRef.current,
          { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" },
          "-=0.35",
        );
    }

    const tween = gsap.to(counter, {
      value: 100,
      duration: reducedMotion ? 0.35 : 1.5,
      ease: "power2.out",
      onUpdate: () => {
        const shown = Math.floor(counter.value);
        if (numRef.current) numRef.current.textContent = String(shown).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${counter.value / 100})`;
      },
      onComplete: exit,
    });

    return () => {
      tween.kill();
    };
  }, [finishLoading, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      role="status"
      aria-label="Loading site"
    >
      <div ref={bgRef} className="absolute inset-0 bg-(--color-bg)" />

      <div className="relative flex flex-col items-center gap-8">
        <span
          ref={numRef}
          className="font-display text-[16vw] font-medium leading-none tracking-tight text-(--color-fg) sm:text-[9vw]"
        >
          000
        </span>

        <div className="h-px w-32 overflow-hidden bg-(--color-line)">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-(--color-accent)"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div
          ref={labelRef}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-fg-muted)"
        >
          Loading experience
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-fg-faint) sm:bottom-10">
        Sree — Creative Developer
      </div>
    </div>
  );
}
