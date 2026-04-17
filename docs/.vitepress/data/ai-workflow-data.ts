export interface FigmaStep {
  number: number;
  title: string;
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
  { number: 1, title: "Install the SGDS skills" },
  { number: 2, title: "Select the full skill set" },
  { number: 3, title: "Keep the skills updated" },
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
