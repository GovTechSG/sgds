export interface FigmaStep {
  number: number;
  title: string;
  slotName?: string;
}

export interface WorkflowStep {
  stepHeader: string;
  component: string;
  skill?: string;
  skills?: string[];
  desc: string;
}

export interface ExistingSkill {
  name: string;
  desc: string;
}

export interface AiWorkflowCard {
  icon: "figma-mcp" | "figma-make";
  title: string;
  description: string;
  href: string;
}

export const figmaWorkflowCards: AiWorkflowCard[] = [
  {
    icon: "figma-mcp",
    title: "Figma MCP",
    description: "You have an existing Figma screen and want AI to help turn it into SGDS-aligned code, or capture a running UI in Figma.",
    href: "#figma-mcp",
  },
  {
    icon: "figma-make",
    title: "Figma Make",
    description: "You want to explore interface ideas from prompts or Figma context before refining them with SGDS components, tokens, and review practices.",
    href: "#figma-make",
  },
];

export const figmaToCodeSteps: FigmaStep[] = [
  { number: 1, title: "Go to your Figma screen" },
  { number: 2, title: "Give your AI the Figma context" },
  { number: 3, title: "Ask for SGDS-aligned output" },
  { number: 4, title: "Review before handoff" },
];

export const codeToFigmaSteps: FigmaStep[] = [
  { number: 1, title: "Start from the real coded page" },
  { number: 2, title: "Ask the AI to move it into Figma" },
  { number: 3, title: "Rebuild with SGDS logic" },
  { number: 4, title: "Tidy the Figma file for reuse" },
];

export const setupSteps: FigmaStep[] = [
  { number: 0, title: "Install Node.js" },
  { number: 0, title: "Install SGDS web component package", slotName: "step-sgds-package" },
  { number: 1, title: "Install the SGDS agent skills" },
  { number: 2, title: "Select the full skill set" },
  { number: 3, title: "Keep the agent skills updated" },
];

export const setupStepsGtCli: FigmaStep[] = [
  { number: 0, title: "Setup GT CLI" },
  { number: 0, title: "Install SGDS web component package", slotName: "step-sgds-package" },
  { number: 1, title: "Install the SGDS agent skills" },
  { number: 2, title: "Select the full skill set" },
  { number: 3, title: "Keep the agent skills updated" },
];

export const newProjectSteps: WorkflowStep[] = [
  {
    stepHeader: " ",
    component: "step1",
    skill: "sgds-getting-started",
    desc: "Fonts, CSS, and component setup",
  },
  {
    stepHeader: " ",
    component: "step2",
    skill: "sgds-components  +  sgds-utilities",
    desc: "Your day-to-day building references",
  },
  {
    stepHeader: " ",
    component: "step3",
    skills: ["sgds-pattern-page-templates", "sgds-pattern-block-templates"],
    desc: "Assembling full pages and layout blocks",
  },
  {
    stepHeader: " ",
    component: "step4",
    skill: "sgds-forms",
    desc: "Whenever a form is involved",
  },
  {
    stepHeader: " ",
    component: "step5",
    skill: "sgds-data-visualisation",
    desc: "Only for charts or dashboards",
  },
];

export const existingSkills: ExistingSkill[] = [
  { name: "sgds-components", desc: "Building or modifying UI components" },
  { name: "sgds-utilities", desc: "Spacing, layout, and helper classes" },
  { name: "sgds-pattern-page-templates", desc: "Full-page layout work" },
  { name: "sgds-pattern-block-templates", desc: "Self-contained UI blocks" },
  { name: "sgds-forms", desc: "Any form-related work" },
  { name: "sgds-data-visualisation", desc: "Charts or dashboards only" },
];
