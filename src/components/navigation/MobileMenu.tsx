import { useLayoutEffect, useRef } from "react";
import { navLinks, socialLinks } from "@/data/nav";
import { scrollToSection, stopScroll, startScroll } from "@/lib/lenisSingleton";
import { gsap } from "@/lib/gsap";
import { useUIStore } from "@/store/useUIStore";

export function MobileMenu() {
  const menuOpen = useUIStore((s) => s.menuOpen);
  const setMenuOpen = useUIStore((s) => s.setMenuOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    if (menuOpen) {
      stopScroll();
      const tl = gsap.timeline();
      tl.set(rootRef.current, { display: "flex" })
        .fromTo(rootRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power4.inOut" })
        .fromTo(
          linksRef.current,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.06 },
          "-=0.3",
        );
    } else {
      startScroll();
      gsap.to(rootRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => gsap.set(rootRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  function handleNav(href: string) {
    setMenuOpen(false);
    window.setTimeout(() => scrollToSection(href.replace("#", "")), 400);
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-40 hidden flex-col justify-between bg-(--color-bg) px-6 pb-10 pt-28"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <nav className="flex flex-col gap-1" aria-label="Mobile primary">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleNav(link.href);
            }}
            className="border-b border-(--color-line) py-5 font-display text-4xl font-medium tracking-tight text-(--color-fg) xs:text-5xl"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-fg-muted)"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
