import { useLayoutEffect, useRef } from "react";
import { useSectionScene } from "@/hooks/useSectionScene";
import { ScrollTrigger } from "@/lib/gsap";
import { experience } from "@/data/experience";
import { SectionLabel } from "@/components/common/SectionLabel";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "experience");
  const listRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const triggers = Array.from(listRef.current.children).map((row) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top 70%",
        end: "bottom 50%",
        toggleClass: "is-active",
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative z-10 px-6 py-32 sm:px-10">
      <SectionLabel index="07" className="mb-12">
        Experience
      </SectionLabel>

      <ol ref={listRef} className="mx-auto max-w-3xl">
        {experience.map((entry) => (
          <li
            key={entry.period}
            className="experience-row relative border-l border-(--color-line) py-8 pl-8 opacity-45 transition-opacity duration-500 sm:py-10 sm:pl-10"
          >
            <span className="experience-dot absolute top-9 -left-[5px] h-2.5 w-2.5 rounded-full bg-(--color-fg-faint) transition-colors duration-500 sm:top-11" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-faint)">
              {entry.period}
            </span>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-(--color-fg) sm:text-3xl">
              {entry.role} <span className="text-(--color-fg-muted)">— {entry.org}</span>
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {entry.points.map((point) => (
                <li key={point} className="max-w-xl font-sans text-sm text-(--color-fg-muted) sm:text-base">
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
