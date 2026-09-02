export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  points: string[];
}

/** Replace with real history — structure supports any number of entries. */
export const experience: ExperienceEntry[] = [
  {
    period: "2024 — Present",
    role: "Freelance Creative Developer",
    org: "Independent",
    points: [
      "Design and build websites, apps and interactive experiences for founders and small teams.",
      "Own projects end-to-end — architecture, interface, motion and deployment.",
    ],
  },
  {
    period: "2022 — 2024",
    role: "Frontend Engineer",
    org: "Studio Company",
    points: [
      "Built and maintained business-critical dashboards used by internal operations teams.",
      "Introduced a shared component system that cut new-feature build time significantly.",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Junior Developer",
    org: "Agency Company",
    points: [
      "Shipped marketing sites and landing pages for a range of client verticals.",
      "Worked directly with designers to translate static comps into responsive, animated builds.",
    ],
  },
];
