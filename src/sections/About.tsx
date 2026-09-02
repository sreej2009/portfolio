import { useRef } from "react";
import { useSectionScene } from "@/hooks/useSectionScene";
import { RevealText } from "@/components/common/RevealText";
import { SectionLabel } from "@/components/common/SectionLabel";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "about");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 flex min-h-screen flex-col justify-center gap-14 px-6 py-32 sm:px-10 lg:flex-row lg:items-end lg:gap-16"
    >
      <div className="lg:w-1/2">
        <SectionLabel index="02" className="mb-8">
          About Me
        </SectionLabel>

        <h2 className="font-display text-[15vw] font-medium uppercase leading-[0.92] tracking-tight text-(--color-fg) sm:text-[8vw] lg:text-[6vw]">
          <RevealText>I design.</RevealText>
          <RevealText delay={0.08}>I build.</RevealText>
          <RevealText delay={0.16}>I ship.</RevealText>
        </h2>
      </div>

      <div className="flex flex-col gap-8 lg:w-[30%]">
        <p className="font-sans text-lg text-(--color-fg-muted) sm:text-xl">
          I create digital products and experiences across websites, applications, business systems
          and e-commerce — combining considered engineering with motion and 3D that makes a product
          feel like it has a pulse.
        </p>
        <p className="font-sans text-base text-(--color-fg-faint)">
          Every project starts the same way: understand the problem, design the smallest solution
          that solves it well, then build it properly — typed, tested, and fast.
        </p>

        <svg width="72" height="28" viewBox="0 0 72 28" fill="none" aria-hidden className="text-(--color-accent)">
          <path
            d="M2 22C6 10 10 4 13 4C16 4 15 18 18 18C21 18 24 6 28 6C32 6 31 24 35 24C39 24 40 2 45 2C50 2 48 20 53 20C57 20 58 10 62 10C65 10 67 14 70 14"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </svg>

        <div className="flex gap-8 border-t border-(--color-line) pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-fg-faint)">
          <span>Based in India</span>
          <span>Remote — Worldwide</span>
        </div>
      </div>
    </section>
  );
}
