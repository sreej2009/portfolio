import { useEffect, useState } from "react";
import { sectionOrder } from "@/three/cameraPath";
import { sceneState } from "@/three/sceneState";
import { scrollToSection } from "@/lib/lenisSingleton";

const railIds: Record<(typeof sectionOrder)[number], string> = {
  hero: "top",
  about: "about",
  capabilities: "services",
  skills: "skills",
  work: "work",
  process: "process",
  experience: "experience",
  contact: "contact",
};

export function SectionRail() {
  const [active, setActive] = useState(sceneState.activeSection);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev === sceneState.activeSection ? prev : sceneState.activeSection));
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  const activeIndex = sectionOrder.indexOf(active);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:right-10 lg:flex"
    >
      <ol className="flex flex-col items-center gap-3">
        {sectionOrder.map((id, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={id}>
              <button
                onClick={() => scrollToSection(railIds[id])}
                className="pointer-events-auto flex items-center gap-2 font-mono text-[10px] transition-colors duration-500"
                style={{ color: isActive ? "var(--color-accent)" : "var(--color-fg-faint)" }}
                aria-label={`Go to ${id} section`}
              >
                <span
                  className="h-1 w-1 rounded-full transition-all duration-500"
                  style={{
                    background: isActive ? "var(--color-accent)" : "var(--color-fg-faint)",
                    transform: isActive ? "scale(1.6)" : "scale(1)",
                  }}
                />
                {String(i + 1).padStart(2, "0")}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="h-10 w-px bg-(--color-line-strong)" />

      <span
        className="font-mono text-[10px] tracking-[0.3em] text-(--color-fg-faint)"
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL
      </span>
    </div>
  );
}
