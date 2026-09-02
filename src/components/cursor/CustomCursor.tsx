import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouchDevice } from "@/lib/useMedia";
import { useUIStore } from "@/store/useUIStore";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const variant = useUIStore((s) => s.cursorVariant);
  const label = useUIStore((s) => s.cursorLabel);

  useEffect(() => {
    if (isTouch || !dotRef.current || !ringRef.current) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isTouch]);

  if (isTouch) return null;

  const isView = variant === "view";
  const isHover = variant === "hover" || isView;
  const isHidden = variant === "hidden";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] transition-[width,height,opacity] duration-200"
        style={{ width: isHover ? 0 : 6, height: isHover ? 0 : 6, opacity: isHidden ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-fg)]/40 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg)] transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: isView ? 84 : isHover ? 48 : 32,
          height: isView ? 84 : isHover ? 48 : 32,
          borderColor: isHover ? "var(--color-accent)" : "rgba(242,240,234,0.4)",
          backgroundColor: isView ? "rgba(200,169,107,0.1)" : "transparent",
          opacity: isHidden ? 0 : 1,
        }}
      >
        {isView ? label || "VIEW" : null}
      </div>
    </>
  );
}
