import { useEffect, useState } from "react";
import { navLinks } from "@/data/nav";
import { scrollToSection } from "@/lib/lenisSingleton";
import { useUIStore } from "@/store/useUIStore";
import { useCursorTarget } from "@/lib/useCursorTarget";
import { Magnetic } from "@/components/common/Magnetic";
import { sceneState } from "@/three/sceneState";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuOpen = useUIStore((s) => s.menuOpen);
  const setMenuOpen = useUIStore((s) => s.setMenuOpen);
  const setCursor = useUIStore((s) => s.setCursor);
  const hoverCursor = useCursorTarget("hover");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev === sceneState.activeSection ? prev : sceneState.activeSection));
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  function handleNav(href: string) {
    scrollToSection(href.replace("#", ""));
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-(--color-bg)/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[110rem] items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
          className="font-display text-lg font-semibold tracking-tight text-(--color-fg)"
          {...hoverCursor}
        >
          SREE<span className="text-(--color-accent)">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-fg-muted) transition-colors duration-300 hover:text-(--color-fg)"
              >
                <span className={isActive ? "text-(--color-fg)" : ""}>{link.label}</span>
                <span
                  className={`absolute -bottom-2 left-0 h-[3px] w-[3px] rounded-full bg-(--color-accent) transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Magnetic>
            <button
              onClick={() => handleNav("#contact")}
              className="flex items-center gap-2 rounded-full border border-(--color-line-strong) px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-fg) transition-colors duration-300 hover:border-(--color-accent) hover:text-(--color-accent)"
              {...hoverCursor}
            >
              Let's Talk
              <span aria-hidden>→</span>
            </button>
          </Magnetic>
        </div>

        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`h-px w-6 bg-(--color-fg) transition-transform duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-(--color-fg) transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}
