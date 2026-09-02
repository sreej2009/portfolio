export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  tone: string;
  role: string;
  challenge: string;
  solution: string;
  result: string;
  liveUrl?: string;
}

/**
 * Replace with real case studies. Structure is final — only content needs swapping.
 * `tone` drives each project's generated cover gradient (no stock imagery).
 */
export const projects: Project[] = [
  {
    slug: "north-orbital",
    number: "01",
    title: "North Orbital",
    category: "Web Experience",
    year: "2026",
    description: "A scroll-driven WebGL site for a spatial-computing startup's product launch.",
    tech: ["React", "Three.js", "GSAP", "WebGL"],
    tone: "#b7bdc6",
    role: "Creative Developer",
    challenge:
      "Launch a hardware product nobody could physically demo yet, to an audience that needed to feel its scale and material quality online.",
    solution:
      "Built a single continuous WebGL scene the product moves through as the page scrolls, replacing static renders with a controlled camera journey around a physically-lit 3D model.",
    result: "3.2x longer average session time versus the previous static landing page.",
    liveUrl: "https://example.com",
  },
  {
    slug: "ledger-os",
    number: "02",
    title: "Ledger OS",
    category: "ERP System",
    year: "2025",
    description: "An internal operations platform replacing four disconnected spreadsheets.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
    tone: "#8fb7ff",
    role: "Full-Stack Engineer",
    challenge:
      "Warehouse and finance teams tracked inventory, purchase orders and reconciliation across separate spreadsheets that fell out of sync weekly.",
    solution:
      "Designed a role-based dashboard with real-time inventory sync, audit trails and an approvals workflow, migrated from the legacy spreadsheet exports.",
    result: "Reconciliation time dropped from two days to under two hours per cycle.",
  },
  {
    slug: "fieldwire-crm",
    number: "03",
    title: "Fieldwire CRM",
    category: "CRM System",
    year: "2025",
    description: "A pipeline and client-communication tool built for a field-services agency.",
    tech: ["React", "Node.js", "Zustand", "REST API"],
    tone: "#ff9f6b",
    role: "Product Engineer",
    challenge:
      "Sales reps were logging leads in a shared document with no visibility into deal stage, follow-up timing, or team ownership.",
    solution:
      "Shipped a lightweight pipeline board with automated follow-up reminders and a client activity timeline, scoped tightly to how the team actually sells.",
    result: "Lead response time improved by 41% within the first month of use.",
  },
  {
    slug: "aureline",
    number: "04",
    title: "Aureline",
    category: "Shopify",
    year: "2024",
    description: "A custom storefront and product configurator for a jewelry studio.",
    tech: ["Shopify", "React", "GSAP", "Liquid"],
    tone: "#f2c94c",
    role: "Creative Developer",
    challenge:
      "Off-the-shelf Shopify themes couldn't support the studio's made-to-order configurator or the editorial tone of its brand photography.",
    solution:
      "Built a headless storefront on Shopify's Storefront API with a custom metal/stone configurator and motion-led product storytelling.",
    result: "Average order value increased 27% after the configurator shipped.",
  },
  {
    slug: "signal-lab",
    number: "05",
    title: "Signal Lab",
    category: "Interactive Experience",
    year: "2024",
    description: "A generative audio-visual toy built to promote a music software release.",
    tech: ["Three.js", "Web Audio API", "GLSL", "React"],
    tone: "#c17bff",
    role: "Creative Developer",
    challenge:
      "The client wanted a launch page that let visitors feel the product's sound-design engine before downloading anything.",
    solution:
      "Built a browser-based generative visualizer driven by the Web Audio API, with custom GLSL shaders reacting to frequency data in real time.",
    result: "Featured on three design showcases within the first two weeks of launch.",
  },
];
