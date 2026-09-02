import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouchDevice } from "@/lib/useMedia";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wraps interactive children with a subtle magnetic pull toward the pointer. Desktop only. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!ref.current || isTouch) return;
    quickX.current = gsap.quickTo(ref.current, "x", { duration: 0.7, ease: "power3" });
    quickY.current = gsap.quickTo(ref.current, "y", { duration: 0.7, ease: "power3" });
  }, [isTouch]);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    quickX.current?.((e.clientX - rect.left - rect.width / 2) * strength);
    quickY.current?.((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onMouseLeave() {
    quickX.current?.(0);
    quickY.current?.(0);
  }

  return (
    <div ref={ref} className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
}
