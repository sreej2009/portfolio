export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description: "Understand the goal, the users and the constraints before touching a design tool.",
  },
  {
    index: "02",
    title: "Plan",
    description: "Map the architecture, content and technical approach into a build that can scale.",
  },
  {
    index: "03",
    title: "Design",
    description: "Design in-browser where possible — motion and layout decided together, not after.",
  },
  {
    index: "04",
    title: "Build",
    description: "Clean, typed, componentized code — built to be maintained, not just shipped.",
  },
  {
    index: "05",
    title: "Test",
    description: "Cross-device, cross-browser, performance and accessibility checked before launch.",
  },
  {
    index: "06",
    title: "Launch",
    description: "Deployed, monitored, and handed off with documentation that a team can actually use.",
  },
];
