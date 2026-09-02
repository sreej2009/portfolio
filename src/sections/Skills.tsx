import { useRef } from "react";
import { useSectionScene } from "@/hooks/useSectionScene";
import { skillGroups } from "@/data/skills";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useUIStore } from "@/store/useUIStore";
import { Magnetic } from "@/components/common/Magnetic";
import { scrollToSection } from "@/lib/lenisSingleton";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "skills");
  const setCursor = useUIStore((s) => s.setCursor);

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 px-6 py-32 sm:px-10">
      <div className="mb-16 flex justify-center">
        <SectionLabel index="04">Skills &amp; Expertise</SectionLabel>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-16 gap-y-16 py-24 text-center sm:grid-cols-3 sm:py-40">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-4 font-display text-lg font-medium uppercase tracking-tight text-(--color-fg)">
              {group.category}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  onMouseEnter={() => setCursor("hover")}
                  onMouseLeave={() => setCursor("default")}
                  className="cursor-default font-sans text-sm text-(--color-fg-muted) transition-colors duration-300 hover:text-(--color-accent)"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Magnetic>
          <button
            onClick={() => scrollToSection("work")}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
            className="flex items-center gap-3 rounded-full border border-(--color-line-strong) px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-fg) transition-colors duration-300 hover:border-(--color-accent) hover:text-(--color-accent)"
          >
            View All Skills
            <span aria-hidden>→</span>
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
