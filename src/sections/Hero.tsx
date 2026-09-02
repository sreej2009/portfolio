import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";
import { useUIStore } from "@/store/useUIStore";
import { useSectionScene } from "@/hooks/useSectionScene";
import { Magnetic } from "@/components/common/Magnetic";
import { useCursorTarget } from "@/lib/useCursorTarget";
import { scrollToSection } from "@/lib/lenisSingleton";
import { SectionLabel } from "@/components/common/SectionLabel";

gsap.registerPlugin(SplitText);

const stack = ["Websites", "Apps", "ERP Systems", "CRM Systems", "Landing Pages", "Shopify", "Digital Products", "Interactive Experiences"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "hero");

  const isLoading = useUIStore((s) => s.isLoading);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hoverCursor = useCursorTarget("hover");

  useLayoutEffect(() => {
    if (isLoading || !headlineRef.current) return;

    const split = SplitText.create(headlineRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "reveal-line",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(tagRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7 })
      .fromTo(split.lines, { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, "-=0.35")
      .fromTo(subRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.65")
      .fromTo(stackRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(ctaRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6");

    return () => {
      tl.kill();
      split.revert();
    };
  }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative z-10 flex min-h-svh flex-col justify-center px-6 pt-28 pb-16 sm:px-10"
    >
      <div ref={tagRef} className="mb-8 opacity-0">
        <SectionLabel index="01">Creative Developer</SectionLabel>
      </div>

      <h1
        ref={headlineRef}
        className="max-w-4xl font-display text-[13vw] font-medium uppercase leading-[0.92] tracking-tight text-(--color-fg) sm:text-[9vw] lg:text-[5.6vw]"
      >
        Hello, I'm Sree.
        <br />
        I build digital
        <br />
        experiences that
        <br />
        <span className="text-(--color-fg-muted)">feel alive.</span>
      </h1>

      <p
        ref={subRef}
        className="mt-8 max-w-md font-sans text-base text-(--color-fg-muted) opacity-0 sm:text-lg"
      >
        Websites, apps, business systems and interactive experiences — designed and built end-to-end.
      </p>

      <div
        ref={stackRef}
        className="mt-6 flex max-w-lg flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-(--color-fg-faint) opacity-0"
      >
        {stack.map((t, i) => (
          <span key={t} className="flex items-center gap-2.5">
            {i > 0 && <span className="text-(--color-line-strong)">•</span>}
            {t}
          </span>
        ))}
      </div>

      <div ref={ctaRef} className="mt-10 opacity-0">
        <Magnetic className="inline-block w-fit">
          <button
            {...hoverCursor}
            onClick={() => scrollToSection("work")}
            className="group flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg)"
          >
            View My Work
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-line-strong) transition-colors duration-300 group-hover:border-(--color-accent) group-hover:text-(--color-accent)">
              →
            </span>
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
