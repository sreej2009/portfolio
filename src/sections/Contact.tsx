import { useRef } from "react";
import { useSectionScene } from "@/hooks/useSectionScene";
import { RevealText } from "@/components/common/RevealText";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Magnetic } from "@/components/common/Magnetic";
import { useCursorTarget } from "@/lib/useCursorTarget";
import { socialLinks } from "@/data/nav";
import { scrollToSection } from "@/lib/lenisSingleton";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionScene(sectionRef, "contact");
  const viewCursor = useCursorTarget("hover");

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 flex min-h-svh flex-col justify-between px-6 py-32 sm:px-10"
    >
      <SectionLabel index="08" className="mb-12">
        Let's Connect
      </SectionLabel>

      <div className="flex flex-1 flex-col justify-center lg:max-w-2xl">
        <h2 className="font-display text-[16vw] font-medium uppercase leading-[0.88] tracking-tight text-(--color-fg) sm:text-[10vw] lg:text-[7vw]">
          <RevealText>Let's</RevealText>
          <RevealText delay={0.06}>build</RevealText>
          <RevealText delay={0.12}>something</RevealText>
          <RevealText delay={0.18}>
            <span className="text-(--color-accent)">great.</span>
          </RevealText>
        </h2>

        <Magnetic strength={0.25} className="mt-14 inline-block w-fit">
          <a
            href="mailto:hello@sree.dev"
            {...viewCursor}
            className="inline-block border-b border-(--color-fg) font-display text-2xl tracking-tight text-(--color-fg) transition-colors duration-300 hover:border-(--color-accent) hover:text-(--color-accent) sm:text-3xl"
          >
            hello@sree.dev
          </a>
        </Magnetic>
      </div>

      <div className="flex flex-col gap-8 border-t border-(--color-line) pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {socialLinks
            .filter((s) => s.label !== "Email")
            .map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-muted) transition-colors duration-300 hover:text-(--color-accent)"
              >
                {link.label}
              </a>
            ))}
        </div>

        <div className="flex items-center gap-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-faint)">
            © {new Date().getFullYear()} Sree
          </span>
          <button
            onClick={() => scrollToSection("top")}
            className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-muted) transition-colors duration-300 hover:text-(--color-accent)"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}
