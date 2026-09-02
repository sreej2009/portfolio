import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSectionScene } from "@/hooks/useSectionScene";
import { projects } from "@/data/projects";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useUIStore } from "@/store/useUIStore";
import { useIsTouchDevice } from "@/lib/useMedia";
import { sceneState } from "@/three/sceneState";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "work");
  const setCursor = useUIStore((s) => s.setCursor);
  const [hovered, setHovered] = useState<number | null>(null);
  const isTouch = useIsTouchDevice();

  return (
    <section ref={sectionRef} id="work" className="relative z-10 px-6 py-32 sm:px-10">
      <SectionLabel index="05" className="mb-16">
        Selected Work
      </SectionLabel>

      <ul
        onMouseLeave={() => {
          setHovered(null);
          sceneState.hoveredFragmentIndex = -1;
        }}
      >
        {projects.map((project, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <li key={project.slug} className="border-b border-(--color-line)">
              <Link
                to={`/work/${project.slug}`}
                onMouseEnter={() => {
                  setHovered(i);
                  setCursor(isTouch ? "default" : "view");
                  sceneState.hoveredFragmentIndex = i;
                }}
                onMouseLeave={() => setCursor("default")}
                className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:gap-10 lg:gap-14"
                style={{ opacity: isDimmed ? 0.4 : 1, transition: "opacity 0.5s" }}
              >
                <span
                  className="font-display text-3xl font-medium transition-colors duration-500 sm:w-14 sm:text-4xl"
                  style={{ color: isHovered ? "var(--color-accent)" : "var(--color-fg-faint)" }}
                >
                  {project.number}
                </span>

                <div
                  className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border sm:w-64 lg:w-80"
                  style={{
                    borderColor: isHovered ? "var(--color-accent)" : "var(--color-line-strong)",
                    transform: isHovered
                      ? "perspective(900px) rotateY(-3deg) rotateX(1.5deg) scale(1.03)"
                      : "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)",
                    boxShadow: isHovered ? `0 20px 60px -20px ${project.tone}55` : "none",
                    transition: "transform 0.6s var(--ease-out-quart), border-color 0.5s, box-shadow 0.6s",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(155deg, ${project.tone}2e, #0a0a0a 72%)` }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-(--color-fg)/15" />
                      <span className="h-2 w-2 rounded-full bg-(--color-fg)/15" />
                      <span className="h-2 w-2 rounded-full bg-(--color-fg)/15" />
                    </div>
                    <span
                      className="font-display text-2xl leading-none font-medium uppercase tracking-tight text-(--color-fg)/25"
                      style={{ transition: "color 0.5s" }}
                    >
                      {project.title}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <h3 className="font-display text-3xl font-medium uppercase tracking-tight text-(--color-fg) sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-fg-faint)">
                    {project.category} — {project.year}
                  </span>
                  <p className="max-w-md font-sans text-sm text-(--color-fg-muted) sm:text-base">
                    {project.description}
                  </p>
                  <span
                    className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500"
                    style={{ color: isHovered ? "var(--color-accent)" : "var(--color-fg-faint)" }}
                  >
                    View Project
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
