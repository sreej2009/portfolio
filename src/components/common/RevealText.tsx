import { useLayoutEffect, useRef, type ReactNode } from "react";
import { revealText } from "@/lib/textReveal";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  type?: "lines" | "words" | "lines,words";
}

export function RevealText({ children, className, delay, stagger, start, type }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    return revealText(ref.current, { delay, stagger, start, type });
  }, [delay, stagger, start, type]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
