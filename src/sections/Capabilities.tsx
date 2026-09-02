import { useRef, useState } from "react";
import { useSectionScene } from "@/hooks/useSectionScene";
import { capabilities } from "@/data/capabilities";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useUIStore } from "@/store/useUIStore";
import { sceneState } from "@/three/sceneState";

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "capabilities");
  const [hovered, setHovered] = useState<number | null>(null);
  const setCursor = useUIStore((s) => s.setCursor);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-10 px-6 py-32 sm:px-10"
    >
      <SectionLabel index="03" className="mb-12">
        What I Build
      </SectionLabel>

      <ul
        className="max-w-3xl"
        onMouseLeave={() => {
          setHovered(null);
          sceneState.hoveredFragmentIndex = -1;
        }}
      >
        {capabilities.map((cap, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;
          return (
            <li
              key={cap.index}
              onMouseEnter={() => {
                setHovered(i);
                setCursor("hover");
                sceneState.hoveredFragmentIndex = i;
              }}
              onMouseLeave={() => setCursor("default")}
              className="group relative flex cursor-default flex-col gap-2 border-b border-(--color-line) py-6 transition-opacity duration-500 sm:flex-row sm:items-center sm:gap-8 sm:py-8"
              style={{ opacity: isDimmed ? 0.35 : 1 }}
            >
              <span className="font-mono text-sm text-(--color-fg-faint) sm:w-16">{cap.index}</span>

              <h3
                className="font-display text-3xl font-medium uppercase tracking-tight text-(--color-fg) transition-transform duration-500 ease-out sm:w-1/3 sm:text-4xl lg:text-5xl"
                style={{ transform: isHovered ? "translateX(12px)" : "translateX(0)" }}
              >
                {cap.title}
              </h3>

              <p
                className="max-w-md font-sans text-sm text-(--color-fg-muted) transition-all duration-500 sm:text-base"
                style={{
                  opacity: isHovered ? 1 : 0.7,
                  transform: isHovered ? "translateX(12px)" : "translateX(0)",
                }}
              >
                {cap.description}
              </p>

              <span
                className="ml-auto hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 sm:flex"
                style={{
                  borderColor: isHovered ? "var(--color-accent)" : "var(--color-line-strong)",
                  color: isHovered ? "var(--color-accent)" : "var(--color-fg-faint)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-500 ease-out"
                  style={{ transform: isHovered ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
