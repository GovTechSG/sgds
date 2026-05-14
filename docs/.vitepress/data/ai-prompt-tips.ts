export interface PromptContextRow {
  agentCanExtract: string;
  userNeedsToDescribe: string;
}

export interface PromptTipRow {
  tip: string;
  detail: string;
  link?: {
    href: string;
    label: string;
  };
}

export interface PromptExample {
  label: string;
  prompt: string;
}

export interface PromptMigrationStep {
  number: number;
  title: string;
}

export const promptStructureRows: PromptTipRow[] = [
  {
    tip: "Goal",
    detail: "What you want to build, change, or review.",
  },
  {
    tip: "Context",
    detail: "Who the page is for and where it fits in the service.",
  },
  {
    tip: "Inputs",
    detail: "The files, Figma frame, screenshot, or route the agent should use.",
  },
  {
    tip: "Rules",
    detail: "What the agent must follow, avoid, or preserve.",
  },
  {
    tip: "Output",
    detail: "Whether you want a plan, code changes, review notes, or a prompt.",
  },
];

export const promptContextRows: PromptContextRow[] = [
  {
    agentCanExtract: "Which SGDS skill applies to the task.",
    userNeedsToDescribe: "What you want to build or change.",
  },
  {
    agentCanExtract: "SGDS component props, slots, and events.",
    userNeedsToDescribe: "How the component should behave.",
  },
  {
    agentCanExtract: "SGDS utility classes and design tokens.",
    userNeedsToDescribe: "Any custom spacing or layout intent.",
  },
  {
    agentCanExtract: "Figma layers, hierarchy, and visible spacing.",
    userNeedsToDescribe: "States not shown in the frame.",
  },
  {
    agentCanExtract: "Visible text, fields, and table columns.",
    userNeedsToDescribe: "Validation and business rules.",
  },
  {
    agentCanExtract: "Existing routes, imports, and components.",
    userNeedsToDescribe: "Which files are in scope.",
  },
  {
    agentCanExtract: "Nearby tests and code patterns.",
    userNeedsToDescribe: "What must not change.",
  },
  {
    agentCanExtract: "SGDS page and block templates.",
    userNeedsToDescribe: "Who the page is for.",
  },
  {
    agentCanExtract: "Whether the UI is a form, list, dashboard, or shell.",
    userNeedsToDescribe: "The main user workflow.",
  },
];

export const textPromptTips: PromptTipRow[] = [
  {
    tip: "Start with the user task",
    detail: "Say what the user needs to do before naming components.",
  },
  {
    tip: "Ask for a plan first",
    detail: "For large changes, ask the agent to explain the approach before editing files.",
  },
  {
    tip: "Name the framework and files",
    detail: "Tell the agent whether you use Vue, React, Angular, plain HTML, or a specific folder.",
  },
  {
    tip: "Set SGDS boundaries",
    detail: "Tell the agent to use SGDS components, skills, and utilities only.",
  },
  {
    tip: "Describe hidden states",
    detail: "Include errors, empty states, loading states, permissions, and edge cases.",
  },
  {
    tip: "Review in small steps",
    detail: "Ask the agent to finish one component, section, or page before moving on.",
  },
];

export const figmaPromptTips: PromptTipRow[] = [
  {
    tip: "Use the SGDS Figma library",
    detail: "Keep SGDS component instances attached so the agent can map them more reliably.",
  },
  {
    tip: "Select the exact frame",
    detail: "Ask the agent to work from one selected screen or section at a time.",
  },
  {
    tip: "Name layers clearly",
    detail: "Use names that describe the purpose, such as filters, results table, or empty state.",
  },
  {
    tip: "Show important states",
    detail: "Include hover, disabled, error, empty, loading, and success states when they matter.",
  },
  {
    tip: "Describe behaviour outside Figma",
    detail: "Explain focus order, validation, data rules, and what happens after each action.",
  },
  {
    tip: "Ask the agent to flag gaps",
    detail: "Tell it to identify anything that does not map cleanly to SGDS before coding.",
  },
  {
    tip: "Name the Figma skill",
    detail: "When the task depends on Figma MCP, tell the agent which Figma skill to use, such as figma-use for writing to the canvas or figma-implement-design for generating code from a frame.",
    link: {
      href: "https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP",
      label: "Figma skills for MCP",
    },
  },
];

export const textPromptExamples: PromptExample[] = [
  {
    label: "Example prompt",
    prompt: "I need to build a case management dashboard for agency officers. Use SGDS skills and inspect the existing docs app patterns before editing. First, propose a page structure and list the SGDS components you will use.",
  },
  {
    label: "Example prompt",
    prompt: "Build a form page for users to submit a grant application. Use SGDS components and sgds: utility classes only. Include required fields, validation messages, an empty attachment state, and a final review step.",
  },
  {
    label: "Example prompt",
    prompt: "Migrate this page to SGDS v3 one section at a time. Keep the current behaviour and routes unchanged. Replace custom UI with SGDS components where possible, and tell me when there is no direct SGDS match.",
  },
];

export const figmaPromptExamples: PromptExample[] = [
  {
    label: "Example prompt",
    prompt: "Use the selected Figma frame as the source. Implement it with SGDS components and sgds: utility classes. Preserve the visible layout, then flag any behaviour, state, or responsive rule that is not shown in Figma.",
  },
  {
    label: "Example prompt",
    prompt: "Review this Figma screen before generating code. Identify the likely SGDS components, missing states, unclear behaviours, and areas that may not map directly to SGDS.",
  },
];

export const migrationSteps: PromptMigrationStep[] = [
  { number: 1, title: "Always plan before you change" },
  { number: 2, title: "Swap components one at a time" },
  { number: 3, title: "Replace foundational styles" },
  { number: 4, title: "Suggest utility replacements" },
];
