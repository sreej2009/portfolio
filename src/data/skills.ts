export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "3D & Motion",
    items: ["Three.js", "React Three Fiber", "GSAP", "ScrollTrigger", "Lenis", "WebGL"],
  },
  {
    category: "Backend",
    items: ["Node.js", "REST APIs", "Databases", "Authentication"],
  },
  {
    category: "Business Systems",
    items: ["ERP", "CRM", "Admin Dashboards", "Workflow Automation"],
  },
  {
    category: "E-Commerce",
    items: ["Shopify", "Custom Storefronts", "Product Experiences"],
  },
  {
    category: "Design",
    items: ["UI/UX", "Responsive Design", "Design Systems", "Motion Design"],
  },
];
