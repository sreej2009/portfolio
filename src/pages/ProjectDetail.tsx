import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Magnetic } from "@/components/common/Magnetic";
import { useCursorTarget } from "@/lib/useCursorTarget";
import { sceneState } from "@/three/sceneState";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverCursor = useCursorTarget("hover");

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    sceneState.activeSection = "work";
    if (!rootRef.current) return;
    const tl = gsap.fromTo(
      rootRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" },
    );
    return () => {
      tl.kill();
    };
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div ref={rootRef} className="relative z-10 px-6 pt-32 pb-32 sm:px-10">
      <Link
        to="/"
        {...hoverCursor}
        className="mb-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-muted) transition-colors duration-300 hover:text-(--color-accent)"
      >
        ← Back to work
      </Link>

      <div className="flex flex-col gap-3 border-b border-(--color-line) pb-10 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-[13vw] font-medium uppercase leading-[0.9] tracking-tight text-(--color-fg) sm:text-[7vw] lg:text-[5.5vw]">
          {project.title}
        </h1>
        <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-muted)">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>

      <div
        className="my-16 flex h-[42vh] w-full items-end rounded-2xl border border-(--color-line-strong) p-8 sm:h-[56vh]"
        style={{ background: `linear-gradient(155deg, ${project.tone}2e, #0a0a0a 70%)` }}
      >
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-(--color-fg-muted)">
          {project.number} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-14">
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-(--color-accent)">
              Challenge
            </h2>
            <p className="max-w-2xl font-sans text-lg text-(--color-fg-muted)">{project.challenge}</p>
          </div>
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-(--color-accent)">
              Solution
            </h2>
            <p className="max-w-2xl font-sans text-lg text-(--color-fg-muted)">{project.solution}</p>
          </div>
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-(--color-accent)">
              Result
            </h2>
            <p className="max-w-2xl font-sans text-lg text-(--color-fg-muted)">{project.result}</p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-faint)">Role</h2>
            <p className="font-sans text-(--color-fg)">{project.role}</p>
          </div>
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-faint)">
              Technology
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-(--color-line-strong) px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-(--color-fg-muted)"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          {project.liveUrl && (
            <Magnetic className="w-fit">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                {...hoverCursor}
                className="inline-block rounded-full border border-(--color-line-strong) px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg) transition-colors duration-300 hover:border-(--color-accent) hover:text-(--color-accent)"
              >
                Visit Live Site ↗
              </a>
            </Magnetic>
          )}
        </div>
      </div>

      <div className="mt-32 border-t border-(--color-line) pt-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-faint)">Next project</span>
        <Link
          to={`/work/${next.slug}`}
          {...hoverCursor}
          className="mt-4 block font-display text-5xl font-medium uppercase tracking-tight text-(--color-fg) transition-colors duration-300 hover:text-(--color-accent) sm:text-7xl"
        >
          {next.title} →
        </Link>
      </div>
    </div>
  );
}
