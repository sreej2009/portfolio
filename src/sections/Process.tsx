import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useSectionScene } from "@/hooks/useSectionScene";
import { gsap } from "@/lib/gsap";
import { processSteps } from "@/data/process";
import { SectionLabel } from "@/components/common/SectionLabel";

const icons: Record<string, ReactNode> = {
  "01": (
    <>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  "02": (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12.5 7.5L9 9L7.5 12.5L11 11L12.5 7.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </>
  ),
  "03": (
    <>
      <path d="M6 14L13 7L15 9L8 16L5 16.5L6 14Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 8L14 10" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  "04": (
    <>
      <path
        d="M8 12L4.5 15.5M9.5 6.5C9.5 8.2 8.2 9.5 6.5 9.5C5.9 9.5 5.4 9.35 4.95 9.08L4 10L6 12L6.92 11.05C6.65 10.6 6.5 10.1 6.5 9.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  "05": (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 10L9 12.3L13.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "06": (
    <>
      <path d="M10 15V5M10 5L6 9M10 5L14 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "process");
  const rowRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeCount = processSteps.length;

  useLayoutEffect(() => {
    if (!rowRef.current) return;
    const nodes = Array.from(rowRef.current.querySelectorAll<HTMLElement>(".process-node"));

    const tween = gsap.fromTo(
      fillRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.4,
          onUpdate: (self) => {
            const activeCount = Math.round(self.progress * nodeCount);
            nodes.forEach((node, i) => node.classList.toggle("is-active", i < activeCount));
          },
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [nodeCount]);

  return (
    <section ref={sectionRef} id="process" className="relative z-10 px-6 py-32 sm:px-10">
      <SectionLabel index="06" className="mb-20">
        My Process
      </SectionLabel>

      <div ref={rowRef} className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4">
        <div className="absolute inset-x-8 top-[2.35rem] hidden h-px bg-(--color-line) lg:block">
          <div ref={fillRef} className="h-full w-full origin-left bg-(--color-accent)" style={{ transform: "scaleX(0)" }} />
        </div>

        {processSteps.map((step) => (
          <div key={step.index} className="process-node relative flex flex-col items-center text-center">
            <span className="mb-3 font-mono text-[11px] text-(--color-fg-faint)">{step.index}</span>
            <span className="process-icon relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-(--color-line-strong) bg-(--color-bg) text-(--color-fg-faint) transition-colors duration-500">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {icons[step.index]}
              </svg>
            </span>
            <h3 className="mb-2 font-display text-base font-medium uppercase tracking-tight text-(--color-fg)">
              {step.title}
            </h3>
            <p className="font-sans text-xs text-(--color-fg-muted)">{step.description}</p>
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 800 60"
        preserveAspectRatio="none"
        aria-hidden
        className="mx-auto mt-28 h-10 w-full max-w-4xl text-(--color-fg-faint) opacity-40"
      >
        <path
          d="M0 30 Q 40 5, 80 30 T 160 30 T 240 30 T 320 30 T 400 30 T 480 30 T 560 30 T 640 30 T 720 30 T 800 30"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </section>
  );
}
