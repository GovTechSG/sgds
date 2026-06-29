<script setup lang="ts">
import { ref, computed } from "vue";
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "../ui/CodeToken.vue";
import CopyCommand from "../ui/CopyCommand.vue";
import CodeBlock from "../ui/CodeBlock.vue";
import "@govtechsg/sgds-web-component/components/Badge/index.js";
import "@govtechsg/sgds-web-component/components/Button/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/IconCard/index.js";

// ─── Types ────────────────────────────────────────────────────────────────────

type PersonaFilter = "all" | "designer" | "developer" | "pm";
type ScenarioFilter = "all" | "new-project" | "migration" | "figma-conversion";
type StepType = "user" | "figma" | "ai" | "code";

interface StepDetail {
  heading: string;
  body: string;
  setup?: Array<{ text: string; code?: boolean }>;
  examples?: string[];
  links?: Array<{ label: string; href: string }>;
}

interface FlowStep {
  kind: "step";
  label: string;
  sublabel: string;
  type: StepType;
  detailKey?: string; // key into stepDetails lookup
}

interface FlowConnector {
  kind: "connector";
  label: string;
}

type FlowItem = FlowStep | FlowConnector;

interface JourneyCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  personas: Exclude<PersonaFilter, "all">[];
  scenarios: Exclude<ScenarioFilter, "all">[];
  tags: string[];
  flow: FlowItem[];
  tip: string;
  link?: { label: string; href: string };
}

// ─── Step detail content ──────────────────────────────────────────────────────
// Keyed by detailKey — reused across cards so content isn't duplicated.

const stepDetails: Record<string, StepDetail> = {

  // ── AI steps ────────────────────────────────────────────────────────────────
  "ai-reads-skills": {
    heading: "AI agent — reads SGDS agent skills",
    body: "Claude uses your installed SGDS agent skills to understand every component, token, and pattern. With skills in place it produces correct code instead of generic code that needs manual fixing.",
    setup: [
      { text: "npx skills add govtechsg/sgds-web-component", code: true },
      { text: "Select all skills when prompted" },
      { text: "A .agents/ folder is created — your AI reads it automatically at query time" },
      { text: "Re-run after upgrading @govtechsg/sgds-web-component to stay current" },
    ],
    examples: [
      '"Build a sidebar dashboard layout using SGDS"',
      '"What spacing utility class should I use between these cards?"',
      '"Create a multi-step form using SGDS components"',
    ],
    links: [
      { label: "Set up agent skills", href: "/ai/skills" },
      { label: "Prompt tips", href: "/ai/prompt-tips" },
    ],
  },

  "ai-reads-canvas": {
    heading: "AI agent — reads live Figma canvas via MCP",
    body: "The Figma MCP server gives Claude direct access to your Figma file — component structure, auto-layout, spacing tokens, and SGDS component names. No screenshots needed.",
    setup: [
      { text: "Install the Figma MCP server in your AI tool (Claude Code, Cursor, Windsurf)" },
      { text: "Open your Figma file in the browser" },
      { text: "Claude will automatically read the open Figma file when prompted" },
      { text: "Pair with SGDS agent skills for fully accurate component output" },
    ],
    examples: [
      '"Implement the selected Figma frame using SGDS v3 components"',
      '"Convert this layout to SGDS code, keeping the spacing values from Figma"',
    ],
    links: [
      { label: "Figma MCP setup", href: "/ai/figma-and-code-workflows" },
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "ai-scans-codebase": {
    heading: "AI agent — scans and migrates your codebase",
    body: "Claude reads your project files to map existing components to their SGDS v3 equivalents, then rewrites them component by component, preserving functionality while updating to SGDS markup and tokens.",
    setup: [
      { text: "npx skills add govtechsg/sgds-web-component", code: true },
      { text: "Open your project in Claude Code or your AI-enabled IDE" },
      { text: "Point Claude at your components directory to start the migration" },
    ],
    examples: [
      '"Look at my existing codebase and migrate all components to SGDS v3"',
      '"Which files in src/components need to be updated for SGDS v3?"',
      '"Rewrite this component using sgds-web-component tags and sgds: utility classes"',
    ],
    links: [
      { label: "Agent skills setup", href: "/ai/skills" },
      { label: "Prompt tips", href: "/ai/prompt-tips" },
    ],
  },

  "ai-reads-design": {
    heading: "AI agent — reads your Figma screenshot",
    body: "Paste a screenshot of your Figma frame into Claude. With SGDS agent skills installed, Claude recognises the SGDS components in the design and generates matching code using correct sgds-web-component tags.",
    setup: [
      { text: "Install SGDS agent skills first: npx skills add govtechsg/sgds-web-component", code: true },
      { text: "In Figma, select the frame you want to implement" },
      { text: "Screenshot it (Cmd+Shift+4 on Mac) or export as PNG" },
      { text: "Paste directly into Claude alongside your prompt" },
    ],
    examples: [
      '"Convert this design to HTML using SGDS v3 — use sgds-web-component tags throughout"',
      '"Implement this screen with SGDS components and sgds: spacing utilities"',
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
      { label: "Prompt tips", href: "/ai/prompt-tips" },
    ],
  },

  "ai-code-migration": {
    heading: "AI agent — runs the code migration in parallel",
    body: "Claude systematically migrates your codebase to SGDS v3, working in parallel with the designer updating Figma. It reads the agent skills to ensure every replacement uses the correct component name and token.",
    setup: [
      { text: "npx skills add govtechsg/sgds-web-component", code: true },
      { text: "Start with the most-used or most-visible components" },
      { text: "Review each migrated component before continuing" },
    ],
    examples: [
      '"Migrate this file to SGDS v3 — replace custom components with sgds-web-component equivalents"',
      '"What SGDS v3 component should replace this custom dropdown?"',
    ],
    links: [
      { label: "Agent skills setup", href: "/ai/skills" },
    ],
  },

  // ── Figma steps ─────────────────────────────────────────────────────────────
  "figma-sgds-library": {
    heading: "Figma canvas — SGDS v3 component library",
    body: "The official SGDS v3 Figma library contains all components, colour tokens, spacing tokens, and patterns. Using it ensures your designs map directly to real <sgds-*> elements with no translation gap when handing off to code.",
    setup: [
      { text: "In Figma, open the Assets panel (press I)" },
      { text: 'Click the book icon → search "Singapore Government Design System"' },
      { text: "Enable the library — components appear in your Assets panel" },
      { text: "Drag components onto your canvas; don't detach instances" },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "figma-code-connect": {
    heading: "Figma canvas — Code Connect",
    body: "Code Connect maps Figma components to their code implementations. Once set up, Figma Dev Mode shows the real SGDS component code for any selected element — no manual translation needed.",
    setup: [
      { text: "npm install --save-dev @figma/code-connect", code: true },
      { text: "figma connect create — scaffolds config files per component", code: true },
      { text: "Map each Figma component node ID to its sgds-web-component tag" },
      { text: "figma connect publish — pushes mappings live into Figma", code: true },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "figma-sgds-components": {
    heading: "Figma canvas — converted to SGDS v3 components",
    body: "Your existing Figma file updated to use official SGDS v3 components and tokens. Swapping old components for SGDS library equivalents ensures designs accurately reflect what developers will build.",
    setup: [
      { text: "Duplicate your Figma file before starting" },
      { text: "Enable the SGDS v3 Figma library in Assets" },
      { text: "Select old components → right-click → Swap component → pick SGDS equivalent" },
      { text: "Update colour styles to SGDS semantic colour tokens" },
      { text: "Replace custom spacing with SGDS spacing tokens" },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "figma-visual-review": {
    heading: "Figma canvas — visual review after code migration",
    body: "Open Figma to visually compare the running product against the original design. This step is optional — use it only when a visual check is faster than reading a code diff.",
    setup: [
      { text: "Open the running app in a browser" },
      { text: "Open the corresponding Figma frame side by side" },
      { text: "Note discrepancies: spacing, colour, component variants" },
      { text: "Ask Claude to correct anything that looks off" },
    ],
  },

  "figma-templates": {
    heading: "Figma canvas — templates flowing back from Code Connect",
    body: "Once Code Connect is configured, component usage examples flow back into Figma as templates. Designers use these to populate new screens knowing each component maps exactly to production code.",
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "figma-sgds-designs": {
    heading: "Figma canvas — designer creates SGDS screens",
    body: "The designer builds product screens using the SGDS v3 Figma library. Every component placed in the design is a real buildable SGDS element — no custom components that won't map to code.",
    setup: [
      { text: "Share your product requirements brief with the designer" },
      { text: "Designer enables the SGDS Figma library and designs screens" },
      { text: "Arrange a design review before development begins" },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "figma-design-update": {
    heading: "Figma canvas — designer migrates to SGDS v3",
    body: "The designer migrates your Figma file to use SGDS v3 components and tokens, working in parallel with the developer's code migration.",
    setup: [
      { text: "Designer enables the SGDS v3 Figma library" },
      { text: "Old components are swapped for SGDS equivalents" },
      { text: "Colour and spacing styles are updated to SGDS semantic tokens" },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  // ── Code steps ──────────────────────────────────────────────────────────────
  "code-sgds-v3": {
    heading: "Code in IDE — SGDS v3 implementation",
    body: "Your project uses @govtechsg/sgds-web-component. Components are custom HTML elements like <sgds-button> and <sgds-input> that work with any framework. Layout and styling use sgds: Tailwind utility classes.",
    setup: [
      { text: "npm install @govtechsg/sgds-web-component", code: true },
      { text: "import '@govtechsg/sgds-web-component/themes/day.css'", code: true },
      { text: '<sgds-button variant="primary">Label</sgds-button>', code: true },
      { text: "Use sgds: utility classes for layout: sgds:flex sgds:gap-md" },
    ],
    links: [
      { label: "Agent skills setup", href: "/ai/skills" },
    ],
  },

  "code-connect-setup": {
    heading: "Code in IDE — SGDS code with Code Connect",
    body: "The implementation is complete and Code Connect config files link each SGDS component back to its Figma counterpart. Developers selecting any element in Figma Dev Mode see the exact code to use.",
    setup: [
      { text: "npm install --save-dev @figma/code-connect", code: true },
      { text: "figma connect create — generates .figma/ config files", code: true },
      { text: "Map Figma component node IDs to sgds-web-component tags in config files" },
      { text: "figma connect publish — snippets go live in Figma Dev Mode", code: true },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "code-final": {
    heading: "Code in IDE — finalised",
    body: "The migration or build is complete. All components use SGDS v3, layout uses sgds: utilities, and the implementation is tested and visually matches the design.",
    setup: [
      { text: "Run your test suite to check for regressions" },
      { text: "Do a visual pass in a browser on desktop and mobile" },
      { text: "Compare against the Figma designs for any remaining gaps" },
    ],
  },

  "code-shipped": {
    heading: "Code in IDE — shipped",
    body: "Migration complete and ready for deployment. The product is fully on SGDS v3 — consistent with other government products and aligned to the Digital Service Standards.",
  },

  // ── You steps ───────────────────────────────────────────────────────────────
  "you-idea": {
    heading: "You — starting with an idea",
    body: "You have a product or feature in mind. The clearer your description, the better Claude can generate what you need. You don't need to know SGDS component names — just describe the UI.",
    examples: [
      '"Build a login page with email and password fields and a submit button"',
      '"Create a dashboard with a sidebar navigation and a data table"',
      '"Make a multi-step form for an application submission with a progress stepper"',
    ],
    links: [
      { label: "Prompt tips", href: "/ai/prompt-tips" },
    ],
  },

  "you-in-figma": {
    heading: "You — working in Figma",
    body: "You're designing in Figma using the SGDS v3 component library. Your designs are the source of truth that developers and Claude will build from.",
    setup: [
      { text: "Enable the SGDS Figma library in your file's Assets panel" },
      { text: "Use SGDS components rather than custom shapes — they map directly to code" },
      { text: "Keep instances attached — detaching makes code generation less accurate" },
    ],
    links: [
      { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
    ],
  },

  "you-in-ide": {
    heading: "You — working in your IDE",
    body: "You're in your code editor with an existing project. Claude will read your files and migrate them to SGDS v3 component by component.",
    setup: [
      { text: "Make sure you're in your project root before running commands" },
      { text: "Install SGDS agent skills before starting the migration" },
      { text: "Begin with the most-used components or most-visible screens" },
    ],
  },

  "you-brief": {
    heading: "You — writing the product brief (PM)",
    body: "Your job as PM is a clear brief covering what the product should do and who will use it. The clearer this is, the better your designer and developer can work — and the better Claude can assist them.",
    setup: [
      { text: "List key user needs and business goals" },
      { text: "Describe the main flows users need to complete" },
      { text: "Note any constraints: accessibility requirements, integrations, deadlines" },
    ],
  },

  "you-approve": {
    heading: "You — reviewing and approving designs (PM)",
    body: "Check Figma designs against your requirements brief. Your role is to confirm the product does what it should — not to evaluate spacing or component choices.",
    setup: [
      { text: "Walk through each main user flow in the designs" },
      { text: 'Ask: "Does this help users do what they need to do?"' },
      { text: "Give specific written feedback — vague feedback creates rework" },
      { text: "Leave visual quality decisions to the designer" },
    ],
  },

  "you-done": {
    heading: "You — signing off (PM)",
    body: "The product meets requirements and is ready to ship. Your sign-off covers requirements and user flows. The designer signs off on visual quality; the developer signs off on code quality. All three are needed.",
  },

  "you-old-file": {
    heading: "You — starting from an old Figma file",
    body: "You have an existing Figma file to convert to SGDS v3. Duplicate it before starting so you always have the original to reference.",
    setup: [
      { text: "Duplicate the file in Figma before making any changes" },
      { text: "Note which screens are highest priority" },
      { text: "Decide whether to convert all screens or a subset first" },
    ],
  },

  "you-scope": {
    heading: "You — scoping and planning the migration (PM)",
    body: "Define scope, set milestones, and communicate timelines to stakeholders. You don't need to understand every technical step — focus on effort, risk, and how to track progress.",
    setup: [
      { text: "Meet with designer and developer to assess scope" },
      { text: "Identify highest-visibility screens to migrate first" },
      { text: "Set phase checkpoints — don't wait until the end to review" },
      { text: "Build in buffer: add ~30% to developer time estimates" },
    ],
  },

  "you-check-flows": {
    heading: "You — reviewing migrated flows (PM)",
    body: "Walk through the migrated product as a user would. You're checking that everything still works correctly, not evaluating code quality or visual precision.",
    setup: [
      { text: "Follow the same flows you reviewed in the original brief" },
      { text: "Note anything that regressed — used to work but doesn't now" },
      { text: 'Ask: "Does this still help users do what they need to do?"' },
      { text: "Leave visual quality review to the designer" },
    ],
  },
};

// ─── Journey card data ────────────────────────────────────────────────────────

const cards: JourneyCard[] = [

  // ── 1. Text prompt → SGDS code ──────────────────────────────────────────────
  {
    id: "prompt-to-code",
    icon: "chat-left-text",
    title: "Start from a text prompt — new build",
    description: "Describe what you want to build. Claude reads your SGDS agent skills and generates correct, standards-aligned code — no component names to memorise.",
    personas: ["designer", "developer"],
    scenarios: ["new-project"],
    tags: ["Designer", "Developer", "New project"],
    flow: [
      { kind: "step",      label: "You",         sublabel: "have an idea",  type: "user",  detailKey: "you-idea" },
      { kind: "connector", label: "describe" },
      { kind: "step",      label: "AI agent",    sublabel: "reads skills",  type: "ai",    detailKey: "ai-reads-skills" },
      { kind: "connector", label: "generates" },
      { kind: "step",      label: "Code in IDE", sublabel: "SGDS v3",       type: "code",  detailKey: "code-sgds-v3" },
      { kind: "connector", label: "refine" },
      { kind: "step",      label: "Code in IDE", sublabel: "final",         type: "code",  detailKey: "code-final" },
    ],
    tip: 'Install agent skills first — run `npx skills add govtechsg/sgds-web-component`. Claude then knows every SGDS component, token, and pattern. Ask naturally and it gets it right first time.',
    link: { label: "Set up agent skills", href: "/ai/skills" },
  },

  // ── 2. Figma design → SGDS code ────────────────────────────────────────────
  {
    id: "figma-to-code",
    icon: "brush",
    title: "Design in Figma, then build — new project",
    description: "Design screens in Figma using the SGDS library, then hand them to Claude. It reads the design and generates SGDS-aligned code without guessing component names.",
    personas: ["designer"],
    scenarios: ["new-project"],
    tags: ["Designer", "New project", "Figma-first"],
    flow: [
      { kind: "step",      label: "You",          sublabel: "in Figma",     type: "user",  detailKey: "you-in-figma" },
      { kind: "connector", label: "design" },
      { kind: "step",      label: "Figma canvas", sublabel: "SGDS library", type: "figma", detailKey: "figma-sgds-library" },
      { kind: "connector", label: "screenshot" },
      { kind: "step",      label: "AI agent",     sublabel: "reads design", type: "ai",    detailKey: "ai-reads-design" },
      { kind: "connector", label: "generates" },
      { kind: "step",      label: "Code in IDE",  sublabel: "SGDS v3",      type: "code",  detailKey: "code-sgds-v3" },
    ],
    tip: "Use the SGDS Figma library so every component you place already maps to a real <sgds-*> element. When you screenshot the frame and ask Claude to implement it, the component names are already correct.",
    link: { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
  },

  // ── 3. Figma MCP — live design to code ─────────────────────────────────────
  {
    id: "figma-mcp",
    icon: "plugin",
    title: "Figma MCP — live design to code",
    description: "Connect the Figma MCP server so Claude reads your live Figma canvas directly. No screenshots needed — Claude sees component names, tokens, and layout structure in real time.",
    personas: ["designer", "developer"],
    scenarios: ["new-project"],
    tags: ["Designer", "Developer", "New project", "MCP"],
    flow: [
      { kind: "step",      label: "You",          sublabel: "in Figma",     type: "user",  detailKey: "you-in-figma" },
      { kind: "connector", label: "connect MCP" },
      { kind: "step",      label: "AI agent",     sublabel: "reads canvas", type: "ai",    detailKey: "ai-reads-canvas" },
      { kind: "connector", label: "generates" },
      { kind: "step",      label: "Code in IDE",  sublabel: "SGDS v3",      type: "code",  detailKey: "code-sgds-v3" },
      { kind: "connector", label: "maps back" },
      { kind: "step",      label: "Figma canvas", sublabel: "Code Connect", type: "figma", detailKey: "figma-code-connect" },
    ],
    tip: "The Figma MCP server lets Claude see your live canvas — components, auto-layout, spacing tokens. Pair it with agent skills for fully accurate output. Code Connect closes the loop by linking code back to Figma.",
    link: { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
  },

  // ── 4. Migrate existing codebase ────────────────────────────────────────────
  {
    id: "codebase-migration",
    icon: "terminal",
    title: "Start from existing codebase — migration",
    description: "Let Claude analyse your existing code and migrate to SGDS v3.",
    personas: ["developer"],
    scenarios: ["migration"],
    tags: ["Developer", "Migration", "Code-first"],
    flow: [
      { kind: "step",      label: "You",          sublabel: "in IDE",          type: "user",  detailKey: "you-in-ide" },
      { kind: "connector", label: "prompt Claude" },
      { kind: "step",      label: "AI agent",     sublabel: "scans codebase",  type: "ai",    detailKey: "ai-scans-codebase" },
      { kind: "connector", label: "migrate" },
      { kind: "step",      label: "Code in IDE",  sublabel: "SGDS v3",         type: "code",  detailKey: "code-sgds-v3" },
      { kind: "connector", label: "if needed" },
      { kind: "step",      label: "Figma canvas", sublabel: "visual review",   type: "figma", detailKey: "figma-visual-review" },
      { kind: "connector", label: "back to code" },
      { kind: "step",      label: "Code in IDE",  sublabel: "finalise",        type: "code",  detailKey: "code-final" },
    ],
    tip: 'Tell Claude: "Look at my existing codebase and migrate components to SGDS v3." Jump into Figma only when a visual check is easier than reading code.',
    link: { label: "Agent skills reference", href: "/ai/skills" },
  },

  // ── 5. Migrate existing Figma file ──────────────────────────────────────────
  {
    id: "figma-file-migration",
    icon: "file-earmark-arrow-right",
    title: "Start from existing Figma file — migration",
    description: "Convert old Figma designs to SGDS, implement to code, use Code Connect to map components.",
    personas: ["designer", "developer"],
    scenarios: ["migration", "figma-conversion"],
    tags: ["Designer", "Developer", "Migration", "Figma-first"],
    flow: [
      { kind: "step",      label: "You",          sublabel: "old Figma file",  type: "user",  detailKey: "you-old-file" },
      { kind: "connector", label: "convert" },
      { kind: "step",      label: "Figma canvas", sublabel: "SGDS components", type: "figma", detailKey: "figma-sgds-components" },
      { kind: "connector", label: "implement" },
      { kind: "step",      label: "AI agent",     sublabel: "reads skills",    type: "ai",    detailKey: "ai-reads-skills" },
      { kind: "connector", label: "generate" },
      { kind: "step",      label: "Code in IDE",  sublabel: "Code Connect",    type: "code",  detailKey: "code-connect-setup" },
      { kind: "connector", label: "maps back" },
      { kind: "step",      label: "Figma canvas", sublabel: "templates",       type: "figma", detailKey: "figma-templates" },
    ],
    tip: "Once converted to code with Code Connect, ask Figma to populate other screens using templates sent back from code. Components stay mapped to your codebase throughout.",
    link: { label: "Figma workflows", href: "/ai/figma-and-code-workflows" },
  },
];

// ─── Filter state ─────────────────────────────────────────────────────────────

const activePersona  = ref<PersonaFilter>("all");
const activeScenario = ref<ScenarioFilter>("all");

const personaFilters: { id: PersonaFilter; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "designer",  label: "Designer" },
  { id: "developer", label: "Developer" },
];

const scenarioFilters: { id: ScenarioFilter; label: string }[] = [
  { id: "all",              label: "All scenarios" },
  { id: "new-project",      label: "New project" },
  { id: "migration",        label: "Migration" },
  { id: "figma-conversion", label: "Figma conversion" },
];

const legendItems: { type: StepType; label: string }[] = [
  { type: "user", label: "You / your action" },
  { type: "figma", label: "Figma canvas" },
  { type: "ai", label: "AI agent" },
  { type: "code", label: "Code / IDE" },
];

const projectPathCards = [
  {
    icon: "rocket",
    title: "New project",
    description: "You are starting a new product or service and want SGDS to be the design system from the start.",
  },
  {
    icon: "arrow-repeat",
    title: "Existing project",
    description: "You have an existing product, prototype, or codebase and want to migrate it to SGDS components, tokens, and utilities.",
  },
];

const beforeStartSteps = [
  { number: 1, title: "Install and configure your AI agent" },
  { number: 2, title: "Install SGDS web component package" },
  { number: 3, title: "Install SGDS agent skills" },
];

const figmaToCodeSteps = [
  { number: 1, title: "Go to your Figma screen" },
  { number: 2, title: "Give your AI the Figma context" },
  { number: 3, title: "Ask for SGDS-aligned help" },
  { number: 4, title: "AI generates the code" },
];

const codeToFigmaSteps = [
  { number: 1, title: "Decide which page or section you want to send to Figma" },
  { number: 2, title: "Tell your AI where you want the screen or objects to be sent to" },
  { number: 3, title: "Prompt your AI to send the page or section to Figma" },
  { number: 4, title: "Make changes on your Figma" },
];

const figmaToCodeTab = ref<HTMLElement | null>(null);

const openFigmaToCodeTab = (event: Event) => {
  event.preventDefault();
  figmaToCodeTab.value?.click();
};

// ─── Derived data ─────────────────────────────────────────────────────────────

const visibleCards = computed(() =>
  cards.filter((card) => {
    const pMatch =
      activePersona.value === "all" ||
      card.personas.includes(activePersona.value as Exclude<PersonaFilter, "all">);
    const sMatch =
      activeScenario.value === "all" ||
      card.scenarios.includes(activeScenario.value as Exclude<ScenarioFilter, "all">);
    return pMatch && sMatch;
  })
);

const journeyCountLabel = computed(() => {
  const count = visibleCards.value.length;
  return `${count} ${count === 1 ? "journey" : "journeys"} shown`;
});

// ─── Display helpers ──────────────────────────────────────────────────────────

function tagVariant(tag: string): string {
  if (tag === "Designer")        return "info";
  if (tag === "Developer")       return "success";
  if (tag === "Migration")       return "danger";
  return "neutral";
}

function stepToneClasses(type: StepType): string {
  const tones: Record<StepType, string> = {
    user: "sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-muted)] sgds:text-[var(--sgds-primary-color-emphasis)]",
    figma: "sgds:bg-[var(--sgds-purple-surface-muted)] sgds:border-[var(--sgds-purple-border-color-muted)] sgds:text-[var(--sgds-purple-color-emphasis)]",
    ai: "sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-muted)] sgds:text-[var(--sgds-success-color-emphasis)]",
    code: "sgds:bg-[var(--sgds-cyan-surface-muted)] sgds:border-[var(--sgds-cyan-border-color-muted)] sgds:text-[var(--sgds-cyan-color-emphasis)]",
  };

  return tones[type];
}

function diagramNodeClasses(type: StepType): string[] {
  return [
    "sgds:inline-flex sgds:min-w-[7.5rem] sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-[var(--sgds-gap-2-xs)] sgds:rounded-none sgds:border sgds:px-[var(--sgds-padding-xl)] sgds:py-[var(--sgds-padding-sm)] sgds:text-center",
    stepToneClasses(type),
  ];
}

function detailForStep(item: FlowStep): StepDetail | null {
  return item.detailKey ? stepDetails[item.detailKey] ?? null : null;
}

function stepNumber(card: JourneyCard, flowIdx: number): number {
  return card.flow.slice(0, flowIdx + 1).filter((item) => item.kind === "step").length;
}

function isLastStep(card: JourneyCard, flowIdx: number): boolean {
  return !card.flow.slice(flowIdx + 1).some((item) => item.kind === "step");
}

function nextConnectorLabel(card: JourneyCard, flowIdx: number): string | null {
  const nextItem = card.flow[flowIdx + 1];
  return nextItem?.kind === "connector" ? nextItem.label : null;
}

function promptText(example: string): string {
  return example.replace(/^"|"$/g, "");
}

function setPersona(id: PersonaFilter) {
  activePersona.value = id;
}

function setScenario(id: ScenarioFilter) {
  activeScenario.value = id;
}
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:w-full">

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)]">
      <h2 class="sgds:text-heading-default sgds:text-heading-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Use AI with SGDS by role</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0 sgds:max-w-[70ch]">
        Start from the role and task you have today. Each journey shows where SGDS skills, Figma, AI tools, and code fit together.
      </p>
    </section>

    <section class="sgds-grid sgds:gap-layout-md" aria-label="Project starting point">
      <sgds-icon-card v-for="card in projectPathCards" :key="card.title" class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-6 sgds:h-full">
        <sgds-icon slot="icon" :name="card.icon" size="xl" class="sgds:text-primary-default" aria-hidden="true" />
        <span slot="title">{{ card.title }}</span>
        <span slot="description">{{ card.description }}</span>
      </sgds-icon-card>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Before you start</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Set up your AI agent and SGDS dependencies before using these journeys.
      </p>

      <AiInstructionStepper :steps="beforeStartSteps">
        <template #step-1>
          <p>Choose your AI agent, such as Claude Code, Codex, Cursor, or another compatible AI tool. Follow the tool documentation for installation and setup.</p>
        </template>

        <template #step-2>
          <p>Run the following command if you have not installed SGDS components:</p>
          <CopyCommand command="npm i @govtechsg/sgds-web-component" />
        </template>

        <template #step-3>
          <p>Run the following command to install the skills:</p>
          <CopyCommand command="npx skills add govtechsg/sgds-web-component" />
          <p>Select all existing skills from the list. This pulls the latest skills from the <CodeToken label="skills/" /> folder of this repository into your local <CodeToken label=".agents/" /> directory, where compatible AI tools automatically pick them up.</p>
        </template>
      </AiInstructionStepper>

      <sgds-alert class="sgds:mt-layout-sm" show variant="success" outlined>
        <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
        <div>You only need to complete this setup once. Once everything is in place, your AI agent will have the context it needs to work with SGDS. Prompt it and it will know what to do.</div>
      </sgds-alert>
    </section>

    <!-- ── Filters ────────────────────────────────────────────────────────── -->
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)]">
      <h2 class="sgds:text-heading-default sgds:text-heading-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Choose the right journey</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0 sgds:max-w-[70ch]">
        Filter by role and type of work. The journeys below will show the steps to follow.
      </p>
      <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:flex-wrap" role="group" aria-label="Filter by role">
          <span class="sgds:w-[4.5rem] sgds:flex-none sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Role</span>
          <sgds-button
            v-for="f in personaFilters" :key="f.id"
            size="sm"
            :variant="activePersona === f.id ? 'primary' : 'outline'"
            :tone="activePersona === f.id ? undefined : 'neutral'"
            :ariaLabel.prop="f.label"
            :aria-pressed="activePersona === f.id"
            @click="setPersona(f.id)"
          >{{ f.label }}</sgds-button>
        </div>
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:flex-wrap" role="group" aria-label="Filter by scenario">
          <span class="sgds:w-[4.5rem] sgds:flex-none sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Scenario</span>
          <sgds-button
            v-for="f in scenarioFilters" :key="f.id"
            size="sm"
            :variant="activeScenario === f.id ? 'primary' : 'outline'"
            :tone="activeScenario === f.id ? undefined : 'neutral'"
            :ariaLabel.prop="f.label"
            :aria-pressed="activeScenario === f.id"
            @click="setScenario(f.id)"
          >{{ f.label }}</sgds-button>
        </div>
      </div>
    </section>

    <!-- ── Cards ─────────────────────────────────────────────────────────── -->
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
        <h2 class="sgds:text-heading-default sgds:text-heading-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Journeys</h2>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          {{ journeyCountLabel }}. Each journey starts with a workflow diagram, followed by the steps to take.
        </p>
        <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-md" aria-label="Step legend">
          <div v-for="l in legendItems" :key="l.type" class="sgds:flex sgds:items-center sgds:gap-component-xs">
            <span class="sgds:block sgds:h-4 sgds:w-4 sgds:flex-none sgds:rounded-sm sgds:border" :class="stepToneClasses(l.type)" aria-hidden="true" />
            <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">{{ l.label }}</span>
          </div>
        </div>
      </div>
      <TransitionGroup name="uj-cards" tag="div" class="sgds:flex sgds:flex-col sgds:gap-component-md sgds:relative">

      <p v-if="visibleCards.length === 0" key="__empty" class="sgds:text-center sgds:text-subtle sgds:text-body-md sgds:py-layout-lg sgds:m-0">
        No journeys match the selected filters.
      </p>

      <article v-for="card in visibleCards" :key="card.id" class="sgds:overflow-hidden sgds:bg-surface-default">

        <!-- Card header -->
        <div class="sgds:flex sgds:flex-wrap sgds:items-start sgds:justify-between sgds:gap-component-md">
          <div class="sgds:flex sgds:min-w-0 sgds:flex-1 sgds:items-start sgds:gap-component-sm">
            <sgds-icon :name="card.icon" size="md" class="sgds:text-subtle sgds:flex-none sgds:mt-[2px]" aria-hidden="true" />
            <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <p class="sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">{{ card.title }}</p>
              <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">{{ card.description }}</p>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-none sgds:flex-wrap sgds:items-center sgds:gap-component-xs">
            <sgds-badge v-for="tag in card.tags" :key="tag" :variant="tagVariant(tag)" size="sm" outlined>{{ tag }}</sgds-badge>
          </div>
        </div>

        <!-- Journey diagram and instructions -->
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:overflow-x-auto sgds:w-full">
            <div class="sgds:flex sgds:min-w-max sgds:items-center" :aria-label="`Workflow diagram: ${card.title}`">
              <template v-for="(item, idx) in card.flow" :key="idx">
                <div v-if="item.kind === 'step'" :class="diagramNodeClasses(item.type)">
                  <span class="sgds:text-label-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">{{ item.label }}</span>
                  <span class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:opacity-75">{{ item.sublabel }}</span>
                </div>

                <div v-else class="sgds:flex sgds:flex-none sgds:flex-col sgds:items-center sgds:gap-text-2-xs sgds:px-component-xs" aria-hidden="true">
                  <span class="sgds:whitespace-nowrap sgds:bg-surface-raised sgds:px-[var(--sgds-padding-xs)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">{{ item.label }}</span>
                  <div class="sgds:flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)]">
                    <span class="sgds:block sgds:h-[var(--sgds-border-width-1)] sgds:w-10 sgds:bg-[currentColor]" />
                    <sgds-icon name="chevron-right" size="sm" class="sgds:-ml-[var(--sgds-gap-2-xs)]" />
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xl)]" role="list" :aria-label="`Instructions: ${card.title}`">
            <template v-for="(item, idx) in card.flow" :key="`instruction-${idx}`">
              <div
                v-if="item.kind === 'step'"
                class="sgds:grid sgds:grid-cols-[var(--sgds-dimension-32)_minmax(0,1fr)] sgds:gap-[var(--sgds-gap-md)] sgds:items-stretch"
                role="listitem"
              >
                <div class="sgds:flex sgds:flex-col sgds:items-center sgds:h-full">
                  <span class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-surface-raised sgds:rounded-full sgds:text-subtle sgds:flex-none sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:h-8 sgds:w-8" aria-hidden="true">{{ stepNumber(card, idx) }}</span>
                  <span
                    v-if="!isLastStep(card, idx)"
                    class="sgds:bg-surface-raised sgds:block sgds:-mt-[var(--sgds-gap-xs)] sgds:flex-1 sgds:min-h-[var(--sgds-dimension-32)] sgds:w-[var(--sgds-border-width-1)]"
                    aria-hidden="true"
                  />
                </div>

                <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:min-w-0 sgds:w-full">
                  <h3 class="sgds:text-heading-default sgds:m-0 sgds:pt-[var(--sgds-padding-2-xs)] sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                    {{ item.label }}
                  </h3>
                  <p v-if="detailForStep(item)?.body" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                    {{ detailForStep(item)?.body }}
                  </p>

                  <ol v-if="detailForStep(item)?.setup?.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-2-xl)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    <li v-for="(step, si) in detailForStep(item)?.setup" :key="si" class="sgds:m-0">
                      <CodeToken v-if="step.code" :label="step.text" wrap />
                      <span v-else>{{ step.text }}</span>
                    </li>
                  </ol>

                  <div v-if="detailForStep(item)?.examples?.length" class="sgds:flex sgds:flex-col sgds:gap-component-xs">
                    <CodeBlock prompt
                      v-for="(ex, ei) in detailForStep(item)?.examples" :key="ei"
                      :code="promptText(ex)"
                    />
                  </div>

                  <div v-if="detailForStep(item)?.links?.length" class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-sm">
                    <a
                      v-for="link in detailForStep(item)?.links" :key="link.href"
                      :href="link.href"
                      class="sgds:inline-flex sgds:items-center sgds:gap-component-xs sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-primary-default sgds:no-underline sgds:hover:underline"
                    >
                      {{ link.label }}
                      <sgds-icon name="arrow-right" size="sm" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Tip strip -->
        <div class="sgds:bg-surface-raised">
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:m-0">{{ card.tip }}</p>
          <a
            v-if="card.link" :href="card.link.href"
            class="sgds:mt-text-2-xs sgds:inline-flex sgds:items-center sgds:gap-component-xs sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-primary-default sgds:no-underline sgds:hover:underline"
          >
            {{ card.link.label }}
            <sgds-icon name="arrow-right" size="sm" aria-hidden="true" />
          </a>
        </div>

      </article>
    </TransitionGroup>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Working between Figma and code</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Use the workflow that matches your starting point.
      </p>

      <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined">
        <sgds-tab ref="figmaToCodeTab" slot="nav" panel="figma-to-code" active :ariaLabel.prop="'Figma to code'">Figma to code</sgds-tab>
        <sgds-tab slot="nav" panel="code-to-figma" :ariaLabel.prop="'Code to Figma'">Code to Figma</sgds-tab>

        <sgds-tab-panel name="figma-to-code">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              Start here if you already have screens in Figma and want the AI to help turn them into SGDS-aligned code or implementation guidance.
            </p>

            <div class="sgds:mb-0 sgds:w-full">
              <img
                src="/ai/figma-to-code.svg"
                alt="Diagram showing the Figma workflows."
                class="sgds:block sgds:h-auto sgds:max-w-full"
              />
            </div>

            <AiInstructionStepper :steps="figmaToCodeSteps">
              <template #step-1>
                <p>Choose the frame or layer you want the AI to work from. Make sure the Figma Dev Mode MCP server plugin is running locally before proceeding.</p>
              </template>

              <template #step-2>
                <p>With the Figma MCP server enabled, give the AI the right Figma context. You can do this in different ways depending on how your MCP setup works:</p>
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-2-xl)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li class="sgds:m-0"><strong>Desktop MCP:</strong> select the frame or layer directly in Figma, or open <strong>Dev Mode</strong> and copy the relevant Figma link.</li>
                  <li class="sgds:m-0"><strong>Remote MCP:</strong> share the relevant Figma link with your AI client so it can pull the design context into the workflow.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit that you want the AI to implement the design using SGDS components and patterns where possible, not just produce generic front-end output.</p>
                <CodeBlock prompt code="Build this Figma frame using SGDS web components and utility classes. Refer to the SGDS skills for the correct component APIs, utility tokens, and layout pattern." />
              </template>

              <template #step-4>
                <p>The agent will read the selected Figma frame via the MCP server, reference the installed SGDS skills to identify the right components and utilities and generate code that replicates the design using <CodeToken label="<sgds-*>" /> components and SGDS CSS utility classes.</p>
              </template>
            </AiInstructionStepper>

            <sgds-alert show variant="info" outlined title="Tips for better output">
              <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
              <ul class="sgds:flex sgds:flex-col sgds:gap-0 sgds:m-0 sgds:pl-[var(--sgds-padding-lg)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li>Keep your Figma frames clean and well-structured for the best results.</li>
                <li>Name your Figma layers descriptively. The agent uses layer names to infer intent.</li>
                <li>If the output is not accurate, refine your prompt by specifying which section or component to focus on.</li>
                <li>See <a href="/ai/prompt-tips">Prompt tips</a> for more effective results.</li>
              </ul>
            </sgds-alert>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="code-to-figma">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              Start here if you send your code back to Figma for further design refinement.
            </p>

            <div class="sgds:mb-0 sgds:w-full">
              <img
                src="/ai/code-to-figma.svg"
                alt="Diagram showing the code to Figma workflow from you, to AI agent, to Figma MCP, to Figma output."
                class="sgds:block sgds:h-auto sgds:max-w-full"
              />
            </div>

            <AiInstructionStepper :steps="codeToFigmaSteps">
              <template #step-1>
                <p>Choose the live page, flow, or section you want to bring into Figma. Tell your AI exactly what should be captured, so it can turn that UI into editable Figma layers.</p>
              </template>

              <template #step-2>
                <p>Tell the AI where the captured screen or objects should go in Figma. If you already know the destination, include the relevant Figma link in your prompt. Here are a few ways you can get it:</p>
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-2-xl)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li class="sgds:m-0"><strong>To get the link of a Figma page:</strong> click the <strong>Share</strong> button at the top right hand corner and select <strong>Copy link</strong>.</li>
                  <li class="sgds:m-0"><strong>To get the link of a frame:</strong> right click on a frame and choose <strong>Copy/Paste as → Copy link to selection</strong>.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit about what you want sent and where it should go. Ask the AI to map the result to SGDS components, tokens, and layout rules where possible, and to flag anything that does not have a direct SGDS match.</p>
                <CodeBlock prompt code="Send my dashboard page to Figma at this place <insert link of figma's page or frame>. Map to SGDS as closely as possible and flag anything that does not have a direct SGDS match." />
              </template>

              <template #step-4>
                <p>Once the screen is in Figma, tidy the file for future design work. Use clear names, keep the hierarchy clean, and replace temporary UI with SGDS components where possible. When you are ready to turn it back into code, refer to the <a href="#figma-to-code" @click="openFigmaToCodeTab">Figma workflows</a>.</p>
              </template>
            </AiInstructionStepper>

            <sgds-alert show variant="info" outlined title="Tips for better output">
              <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
              <ul class="sgds:flex sgds:flex-col sgds:gap-0 sgds:m-0 sgds:pl-[var(--sgds-padding-lg)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li>Keep your Figma frames clean and well-structured for the best results.</li>
                <li>Name your Figma layers descriptively. The agent uses layer names to infer intent.</li>
                <li>If the output is not accurate, refine your prompt by specifying which section or component to focus on.</li>
                <li>See <a href="/ai/prompt-tips">Prompt tips</a> for more effective results.</li>
              </ul>
            </sgds-alert>

          </div>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>

  </div>
</template>

<style>
/* Vue transition hook classes are allowed here because utility classes cannot target transition lifecycle states. */
.uj-cards-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.uj-cards-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; position: absolute; width: 100%; pointer-events: none; }
.uj-cards-enter-from, .uj-cards-leave-to { opacity: 0; transform: translateY(6px); }
</style>
