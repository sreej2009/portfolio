import { gsap } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface RevealOptions {
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  type?: "lines" | "words" | "lines,words";
}

/** Masked line/word reveal, triggered when `el` scrolls into view. Returns a cleanup fn. */
export function revealText(el: HTMLElement, opts: RevealOptions = {}) {
  const type = opts.type ?? "lines";
  const split = SplitText.create(el, {
    type,
    mask: type.includes("lines") ? "lines" : "words",
    linesClass: "reveal-line",
    wordsClass: "reveal-word",
  });

  const targets = type.includes("lines") ? split.lines : split.words;

  const tween = gsap.fromTo(
    targets,
    { yPercent: 112, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: opts.stagger ?? 0.07,
      delay: opts.delay ?? 0,
      scrollTrigger: {
        trigger: el,
        start: opts.start ?? "top 88%",
        once: opts.once ?? true,
      },
    },
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    split.revert();
  };
}
