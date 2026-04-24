<script setup lang="ts">
import { ref, computed } from "vue";
import "@govtechsg/sgds-web-component/components/Badge/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/CloseButton/index.js";

// ─── Types ────────────────────────────────────────────────────────────────────

type PersonaFilter  = "all" | "designer" | "developer" | "pm";
type ScenarioFilter = "all" | "new-project" | "migration" | "figma-conversion";
type ApproachFilter = "all" | "figma-first" | "mcp" | "code-first" | "process-first";
type StepType = "user" | "figma" | "ai" | "code";

interface StepDetail {
  heading: string;
  body: string;
  setup?: Array<{ text: string; code?: boolean; label?: string }>;
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
  approaches: Exclude<ApproachFilter, "all">[];
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
      { text: "Open your terminal in your project root and run:" },
      { text: "npx skills add govtechsg/sgds-web-component", code: true, label: "Copy and paste this into your terminal:" },
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
      { label: "Set up agent skills", href: "/ai/agent-skills" },
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
      { label: "Set up Figma MCP server", href: "/ai/mcp-server" },
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
    ],
  },

  "ai-scans-codebase": {
    heading: "AI agent — scans and migrates your codebase",
    body: "Claude reads your project files to map existing components to their SGDS v3 equivalents, then rewrites them component by component, preserving functionality while updating to SGDS markup and tokens.",
    setup: [
      { text: "Open your terminal in your project root and run:" },
      { text: "npx skills add govtechsg/sgds-web-component", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Open your project in Claude Code or your AI-enabled IDE" },
      { text: "Point Claude at your components directory to start the migration" },
    ],
    examples: [
      '"Look at my existing codebase and migrate all components to SGDS v3"',
      '"Which files in src/components need to be updated for SGDS v3?"',
      '"Rewrite this component using sgds-web-component tags and sgds: utility classes"',
    ],
    links: [
      { label: "Agent skills setup", href: "/ai/agent-skills" },
      { label: "Prompt tips", href: "/ai/prompt-tips" },
    ],
  },

  "ai-reads-design": {
    heading: "AI agent — reads your Figma screenshot",
    body: "Paste a screenshot of your Figma frame into Claude. With SGDS agent skills installed, Claude recognises the SGDS components in the design and generates matching code using correct sgds-web-component tags.",
    setup: [
      { text: "Open your terminal and install SGDS agent skills:" },
      { text: "npx skills add govtechsg/sgds-web-component", code: true, label: "Copy and paste this into your terminal:" },
      { text: "In Figma, select the frame you want to implement" },
      { text: "Screenshot it (Cmd+Shift+4 on Mac) or export as PNG" },
      { text: "Paste directly into Claude alongside your prompt" },
    ],
    examples: [
      '"Convert this design to HTML using SGDS v3 — use sgds-web-component tags throughout"',
      '"Implement this screen with SGDS components and sgds: spacing utilities"',
    ],
    links: [
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
      { label: "Prompt tips", href: "/ai/prompt-tips" },
    ],
  },

  "ai-code-migration": {
    heading: "AI agent — runs the code migration in parallel",
    body: "Claude systematically migrates your codebase to SGDS v3, working in parallel with the designer updating Figma. It reads the agent skills to ensure every replacement uses the correct component name and token.",
    setup: [
      { text: "Open your terminal in your project root and run:" },
      { text: "npx skills add govtechsg/sgds-web-component", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Start with the most-used or most-visible components" },
      { text: "Review each migrated component before continuing" },
    ],
    examples: [
      '"Migrate this file to SGDS v3 — replace custom components with sgds-web-component equivalents"',
      '"What SGDS v3 component should replace this custom dropdown?"',
    ],
    links: [
      { label: "Agent skills setup", href: "/ai/agent-skills" },
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
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
    ],
  },

  "figma-code-connect": {
    heading: "Figma canvas — Code Connect",
    body: "Code Connect maps Figma components to their code implementations. Once set up, Figma Dev Mode shows the real SGDS component code for any selected element — no manual translation needed.",
    setup: [
      { text: "Open your terminal in your project root and install Code Connect:" },
      { text: "npm install --save-dev @figma/code-connect", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Scaffold config files for each component:" },
      { text: "figma connect create", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Map each Figma component node ID to its sgds-web-component tag" },
      { text: "Publish your mappings to Figma Dev Mode:" },
      { text: "figma connect publish", code: true, label: "Copy and paste this into your terminal:" },
    ],
    links: [
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
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
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
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
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
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
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
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
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
    ],
  },

  // ── Code steps ──────────────────────────────────────────────────────────────
  "code-sgds-v3": {
    heading: "Code in IDE — SGDS v3 implementation",
    body: "Your project uses @govtechsg/sgds-web-component. Components are custom HTML elements like <sgds-button> and <sgds-input> that work with any framework. Layout and styling use sgds: Tailwind utility classes.",
    setup: [
      { text: "Open your terminal and install the package:" },
      { text: "npm install @govtechsg/sgds-web-component", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Add the theme import to your entry file:" },
      { text: "import '@govtechsg/sgds-web-component/themes/day.css'", code: true, label: "Copy and paste this into your entry file:" },
      { text: "Use SGDS components directly in your HTML:" },
      { text: '<sgds-button variant="primary">Label</sgds-button>', code: true, label: "Copy this into your HTML:" },
      { text: "Use sgds: utility classes for layout: sgds:flex sgds:gap-md" },
    ],
    links: [
      { label: "Agent skills setup", href: "/ai/agent-skills" },
    ],
  },

  "code-connect-setup": {
    heading: "Code in IDE — SGDS code with Code Connect",
    body: "The implementation is complete and Code Connect config files link each SGDS component back to its Figma counterpart. Developers selecting any element in Figma Dev Mode see the exact code to use.",
    setup: [
      { text: "Open your terminal in your project root and install Code Connect:" },
      { text: "npm install --save-dev @figma/code-connect", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Scaffold config files for each SGDS component:" },
      { text: "figma connect create", code: true, label: "Copy and paste this into your terminal:" },
      { text: "Map Figma component node IDs to sgds-web-component tags in config files" },
      { text: "Publish snippets to Figma Dev Mode:" },
      { text: "figma connect publish", code: true, label: "Copy and paste this into your terminal:" },
    ],
    links: [
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
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
      { label: "Figma to code workflow", href: "/ai/figma-to-code" },
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
    personas: ["designer", "developer", "pm"],
    scenarios: ["new-project"],
    approaches: [],
    tags: ["Designer", "Developer", "Product Manager", "New project"],
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
    link: { label: "Set up agent skills", href: "/ai/agent-skills" },
  },

  // ── 2. Figma design → SGDS code ────────────────────────────────────────────
  {
    id: "figma-to-code",
    icon: "edit",
    title: "Design in Figma, then build — new project",
    description: "Design screens in Figma using the SGDS library, then hand them to Claude. It reads the design and generates SGDS-aligned code without guessing component names.",
    personas: ["designer"],
    scenarios: ["new-project", "figma-conversion"],
    approaches: ["figma-first"],
    tags: ["Designer", "New project", "Figma conversion"],
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
    link: { label: "Figma to code workflow", href: "/ai/figma-to-code" },
  },

  // ── 3. Figma MCP — live design to code ─────────────────────────────────────
  {
    id: "figma-mcp",
    icon: "dataflow",
    title: "Figma MCP — live design to code",
    description: "Connect the Figma MCP server so Claude reads your live Figma canvas directly. No screenshots needed — Claude sees component names, tokens, and layout structure in real time.",
    personas: ["designer", "developer"],
    scenarios: ["new-project"],
    approaches: ["mcp"],
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
    link: { label: "Set up Figma MCP server", href: "/ai/mcp-server" },
  },

  // ── 4. Migrate existing codebase ────────────────────────────────────────────
  {
    id: "codebase-migration",
    icon: "code-square",
    title: "Start from existing codebase — migration",
    description: "Let Claude analyse your existing code and migrate to SGDS v3.",
    personas: ["developer"],
    scenarios: ["migration"],
    approaches: ["code-first"],
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
    link: { label: "Agent skills reference", href: "/ai/agent-skills" },
  },

  // ── 5. Migrate existing Figma file ──────────────────────────────────────────
  {
    id: "figma-file-migration",
    icon: "file-text",
    title: "Start from existing Figma file — migration",
    description: "Convert old Figma designs to SGDS, implement to code, use Code Connect to map components.",
    personas: ["designer", "developer"],
    scenarios: ["migration", "figma-conversion"],
    approaches: ["figma-first"],
    tags: ["Designer", "Developer", "Migration", "Figma conversion"],
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
    link: { label: "Figma to code workflow", href: "/ai/figma-to-code" },
  },

  // ── 6. PM — coordinate new build ────────────────────────────────────────────
  {
    id: "pm-new-build",
    icon: "users",
    title: "Coordinate a new product build — PM",
    description: "Brief the team, review at key stages, and sign off. You don't need to touch Figma or write code — SGDS and Claude handle implementation consistency.",
    personas: ["pm"],
    scenarios: ["new-project"],
    approaches: ["process-first"],
    tags: ["Product Manager", "New project", "Process-first"],
    flow: [
      { kind: "step",      label: "You",          sublabel: "write brief",  type: "user",  detailKey: "you-brief" },
      { kind: "connector", label: "share" },
      { kind: "step",      label: "Figma canvas", sublabel: "SGDS designs", type: "figma", detailKey: "figma-sgds-designs" },
      { kind: "connector", label: "review" },
      { kind: "step",      label: "You",          sublabel: "approve",      type: "user",  detailKey: "you-approve" },
      { kind: "connector", label: "implement" },
      { kind: "step",      label: "AI agent",     sublabel: "reads skills", type: "ai",    detailKey: "ai-reads-skills" },
      { kind: "connector", label: "builds" },
      { kind: "step",      label: "Code in IDE",  sublabel: "SGDS v3",      type: "code",  detailKey: "code-sgds-v3" },
      { kind: "connector", label: "sign off" },
      { kind: "step",      label: "You",          sublabel: "done",         type: "user",  detailKey: "you-done" },
    ],
    tip: "Your job is requirements and review — not tools. The designer uses the SGDS Figma library; the developer uses Claude with agent skills. Both work from the same standard, reducing inconsistencies between them.",
    link: { label: "What AI can do", href: "/ai/what-ai-can-do" },
  },

  // ── 7. PM — coordinate migration ────────────────────────────────────────────
  {
    id: "pm-migration",
    icon: "folder-check",
    title: "Coordinate a migration to SGDS v3 — PM",
    description: "Scope the work, track milestones, and review before sign-off. The technical migration runs in parallel between your designer and developer.",
    personas: ["pm"],
    scenarios: ["migration"],
    approaches: ["process-first"],
    tags: ["Product Manager", "Migration", "Process-first"],
    flow: [
      { kind: "step",      label: "You",          sublabel: "scope & plan",   type: "user",  detailKey: "you-scope" },
      { kind: "connector", label: "assign" },
      { kind: "step",      label: "Figma canvas", sublabel: "design update",  type: "figma", detailKey: "figma-design-update" },
      { kind: "connector", label: "in parallel" },
      { kind: "step",      label: "AI agent",     sublabel: "code migration", type: "ai",    detailKey: "ai-code-migration" },
      { kind: "connector", label: "review" },
      { kind: "step",      label: "You",          sublabel: "check flows",    type: "user",  detailKey: "you-check-flows" },
      { kind: "connector", label: "sign off" },
      { kind: "step",      label: "Code in IDE",  sublabel: "shipped",        type: "code",  detailKey: "code-shipped" },
    ],
    tip: "Ask your team at kickoff: which screens are most visible to users? Migrate those first. Claude with agent skills handles most of the code rewriting — your developer reviews rather than rewrites from scratch.",
    link: { label: "What AI can do", href: "/ai/what-ai-can-do" },
  },
];

// ─── Filter state ─────────────────────────────────────────────────────────────

const activePersona  = ref<PersonaFilter>("all");
const activeScenario = ref<ScenarioFilter>("all");
const activeApproach = ref<ApproachFilter>("all");

// Which step is expanded: { cardId, flowIndex } — flowIndex is index in card.flow array
const expandedStep = ref<{ cardId: string; flowIdx: number } | null>(null);

const personaFilters: { id: PersonaFilter; label: string }[] = [
  { id: "all",       label: "All roles" },
  { id: "designer",  label: "Designer" },
  { id: "developer", label: "Developer" },
  { id: "pm",        label: "Product Manager" },
];

const scenarioFilters: { id: ScenarioFilter; label: string }[] = [
  { id: "all",              label: "All scenarios" },
  { id: "new-project",      label: "New project" },
  { id: "migration",        label: "Migration" },
  { id: "figma-conversion", label: "Figma conversion" },
];

const approachFilters: { id: ApproachFilter; label: string }[] = [
  { id: "all",           label: "All approaches" },
  { id: "figma-first",   label: "Figma-first" },
  { id: "mcp",           label: "MCP" },
  { id: "code-first",    label: "Code-first" },
  { id: "process-first", label: "Process-first" },
];

// ─── Derived data ─────────────────────────────────────────────────────────────

const visibleCards = computed(() =>
  cards.filter((card) => {
    const pMatch =
      activePersona.value === "all" ||
      card.personas.includes(activePersona.value as Exclude<PersonaFilter, "all">);
    const sMatch =
      activeScenario.value === "all" ||
      card.scenarios.includes(activeScenario.value as Exclude<ScenarioFilter, "all">);
    const aMatch =
      activeApproach.value === "all" ||
      card.approaches.includes(activeApproach.value as Exclude<ApproachFilter, "all">);
    return pMatch && sMatch && aMatch;
  })
);

// Returns the detail data for the currently expanded step, or null
const expandedDetail = computed((): (FlowStep & { detail: StepDetail }) | null => {
  if (!expandedStep.value) return null;
  const card = cards.find((c) => c.id === expandedStep.value!.cardId);
  if (!card) return null;
  const item = card.flow[expandedStep.value.flowIdx];
  if (!item || item.kind !== "step") return null;
  const detail = item.detailKey ? stepDetails[item.detailKey] : null;
  if (!detail) return null;
  return { ...item, detail };
});

// ─── Interaction helpers ──────────────────────────────────────────────────────

function toggleStep(cardId: string, flowIdx: number) {
  const item = cards.find((c) => c.id === cardId)?.flow[flowIdx];
  if (!item || item.kind !== "step" || !item.detailKey) return;

  if (expandedStep.value?.cardId === cardId && expandedStep.value?.flowIdx === flowIdx) {
    expandedStep.value = null;
  } else {
    expandedStep.value = { cardId, flowIdx };
  }
}

function isStepExpanded(cardId: string, flowIdx: number): boolean {
  return expandedStep.value?.cardId === cardId && expandedStep.value?.flowIdx === flowIdx;
}

function isStepClickable(item: FlowItem): item is FlowStep {
  return item.kind === "step" && !!item.detailKey;
}

function tagVariant(tag: string): string {
  if (tag === "Designer")        return "info";
  if (tag === "Developer")       return "success";
  if (tag === "Product Manager") return "warning";
  if (tag === "Migration")       return "danger";
  return "neutral";
}

// Close detail when filter changes so stale state doesn't persist
function setPersona(id: PersonaFilter) {
  activePersona.value = id;
  expandedStep.value = null;
}

function setScenario(id: ScenarioFilter) {
  activeScenario.value = id;
  expandedStep.value = null;
}

function setApproach(id: ApproachFilter) {
  activeApproach.value = id;
  expandedStep.value = null;
}
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-layout-gap-md)] sgds:w-full">

    <!-- ── Filter bar ─────────────────────────────────────────────────────── -->
    <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)]">
      <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:flex-wrap" role="group" aria-label="Filter by role">
        <span class="sgds:text-1 sgds:text-subtle sgds:font-medium uj-filter-label">Role</span>
        <button
          v-for="f in personaFilters" :key="f.id"
          class="uj-chip" :class="{ 'uj-chip--on': activePersona === f.id }"
          :aria-pressed="activePersona === f.id"
          @click="setPersona(f.id)"
        >{{ f.label }}</button>
      </div>
      <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:flex-wrap" role="group" aria-label="Filter by scenario">
        <span class="sgds:text-1 sgds:text-subtle sgds:font-medium uj-filter-label">Scenario</span>
        <button
          v-for="f in scenarioFilters" :key="f.id"
          class="uj-chip" :class="{ 'uj-chip--on': activeScenario === f.id }"
          :aria-pressed="activeScenario === f.id"
          @click="setScenario(f.id)"
        >{{ f.label }}</button>
      </div>
      <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:flex-wrap" role="group" aria-label="Filter by approach">
        <span class="sgds:text-1 sgds:text-subtle sgds:font-medium uj-filter-label">Approach</span>
        <button
          v-for="f in approachFilters" :key="f.id"
          class="uj-chip" :class="{ 'uj-chip--on': activeApproach === f.id }"
          :aria-pressed="activeApproach === f.id"
          @click="setApproach(f.id)"
        >{{ f.label }}</button>
      </div>
    </div>

    <!-- ── Cards ─────────────────────────────────────────────────────────── -->
    <TransitionGroup name="uj-cards" tag="div" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)] sgds:relative">

      <p v-if="visibleCards.length === 0" key="__empty" class="sgds:text-center sgds:text-subtle sgds:text-body-md sgds:py-layout-lg sgds:m-0">
        No journeys match the selected filters.
      </p>

      <div v-for="card in visibleCards" :key="card.id" class="uj-card">

        <!-- Card header -->
        <div class="uj-card-head">
          <div class="sgds:flex sgds:items-start sgds:gap-[var(--sgds-component-gap-sm)] sgds:min-w-0 sgds:flex-1">
            <sgds-icon :name="card.icon" size="md" class="sgds:text-subtle sgds:flex-shrink-0 sgds:mt-[2px]" aria-hidden="true" />
            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
              <p class="sgds:text-3 sgds:font-semibold sgds:text-heading-default sgds:m-0 sgds:leading-sm">{{ card.title }}</p>
              <p class="sgds:text-1 sgds:text-subtle sgds:m-0 sgds:leading-[1.55]">{{ card.description }}</p>
            </div>
          </div>
          <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-2-xs)] sgds:flex-wrap sgds:flex-shrink-0">
            <sgds-badge v-for="tag in card.tags" :key="tag" :variant="tagVariant(tag)" size="sm" outlined>{{ tag }}</sgds-badge>
          </div>
        </div>

        <!-- Flow diagram -->
        <div class="uj-flow-scroll">
          <div class="uj-flow" role="list" :aria-label="`Workflow: ${card.title}`">
            <template v-for="(item, idx) in card.flow" :key="idx">

              <!-- Step box -->
              <button
                v-if="item.kind === 'step'"
                class="uj-step"
                :class="[
                  `uj-step--${item.type}`,
                  isStepClickable(item) ? 'uj-step--clickable' : '',
                  isStepExpanded(card.id, idx) ? `uj-step--active uj-step--active-${item.type}` : '',
                ]"
                role="listitem"
                :aria-expanded="isStepClickable(item) ? isStepExpanded(card.id, idx) : undefined"
                :aria-label="isStepClickable(item) ? `${item.label} — ${item.sublabel}. Click to see details.` : `${item.label} — ${item.sublabel}`"
                :disabled="!isStepClickable(item)"
                @click="toggleStep(card.id, idx)"
              >
                <span class="uj-step-top">{{ item.label }}</span>
                <span class="uj-step-sub">{{ item.sublabel }}</span>
                <!-- Small indicator that this step has details -->
                <span v-if="isStepClickable(item)" class="uj-step-dot" aria-hidden="true" />
              </button>

              <!-- Arrow connector -->
              <div v-else class="uj-conn" aria-hidden="true">
                <span class="uj-conn-label">{{ item.label }}</span>
                <div class="uj-conn-arrow">
                  <div class="uj-conn-line" />
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" class="uj-conn-head">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

            </template>
          </div>
        </div>

        <!-- Step detail panel — shown below the flow when a step is selected -->
        <Transition name="uj-detail">
          <div
            v-if="expandedStep?.cardId === card.id && expandedDetail"
            class="uj-detail"
            :class="`uj-detail--${expandedDetail.type}`"
            role="region"
            :aria-label="`Details: ${expandedDetail.detail.heading}`"
          >
            <!-- Detail header -->
            <div class="sgds:flex sgds:items-start sgds:justify-between sgds:gap-[var(--sgds-gap-sm)]">
              <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
                <p class="sgds:text-2 sgds:font-semibold sgds:text-heading-default sgds:m-0 sgds:leading-sm">{{ expandedDetail.detail.heading }}</p>
                <p class="sgds:text-1 sgds:text-default sgds:m-0 sgds:leading-[1.6]">{{ expandedDetail.detail.body }}</p>
              </div>
              <sgds-close-button @click="expandedStep = null" aria-label="Close details" />
            </div>

            <!-- Setup steps -->
            <div v-if="expandedDetail.detail.setup?.length" class="sgds:mt-[var(--sgds-text-gap-sm)]">
              <p class="sgds:text-1 sgds:font-semibold sgds:text-subtle sgds:m-0 sgds:mb-[var(--sgds-text-gap-2-xs)] sgds:uppercase sgds:tracking-[0.07em]" style="font-size:10px">How to set this up</p>
              <ol class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)] sgds:m-0 sgds:pl-0 uj-setup-list">
                <li v-for="(step, si) in expandedDetail.detail.setup" :key="si" :class="['sgds:flex sgds:gap-[var(--sgds-gap-sm)]', step.code ? 'sgds:items-center' : 'sgds:items-start']">
                  <span class="uj-setup-num" :class="`uj-setup-num--${expandedDetail.type}`" aria-hidden="true">{{ si + 1 }}</span>
                  <div v-if="step.code" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)] sgds:flex-1">
                    <span v-if="step.label" class="sgds:text-1 sgds:text-subtle sgds:leading-[1.6]">{{ step.label }}</span>
                    <CopyCommand :command="step.text" />
                  </div>
                  <span v-else class="sgds:text-1 sgds:text-default sgds:leading-[1.6]">{{ step.text }}</span>
                </li>
              </ol>
            </div>

            <!-- Example prompts -->
            <div v-if="expandedDetail.detail.examples?.length" class="sgds:mt-[var(--sgds-text-gap-sm)]">
              <p class="sgds:text-1 sgds:font-semibold sgds:text-subtle sgds:m-0 sgds:mb-[var(--sgds-text-gap-2-xs)] sgds:uppercase sgds:tracking-[0.07em]" style="font-size:10px">Example prompts</p>
              <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
                <div
                  v-for="(ex, ei) in expandedDetail.detail.examples" :key="ei"
                  class="sgds:flex sgds:items-start sgds:gap-[6px] sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-md sgds:px-[var(--sgds-component-padding-sm)] sgds:py-[var(--sgds-component-padding-xs)]"
                >
                  <sgds-icon name="chat-left-quote" size="sm" class="sgds:text-subtle sgds:flex-shrink-0 sgds:mt-[2px]" aria-hidden="true" />
                  <span class="sgds:text-1 sgds:text-default sgds:leading-[1.6] sgds:italic">{{ ex }}</span>
                </div>
              </div>
            </div>

            <!-- Links -->
            <div v-if="expandedDetail.detail.links?.length" class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-sm)] sgds:flex-wrap sgds:mt-[var(--sgds-text-gap-sm)]">
              <a
                v-for="link in expandedDetail.detail.links" :key="link.href"
                :href="link.href"
                class="sgds:inline-flex sgds:items-center sgds:gap-[4px] sgds:text-1 sgds:font-medium sgds:text-primary-default sgds:no-underline uj-detail-link"
              >
                {{ link.label }}
                <sgds-icon name="arrow-right" size="sm" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Transition>

        <!-- Tip strip -->
        <div class="uj-tip">
          <p class="sgds:text-1 sgds:text-default sgds:m-0 sgds:leading-[1.6]">{{ card.tip }}</p>
          <a
            v-if="card.link" :href="card.link.href"
            class="sgds:inline-flex sgds:items-center sgds:gap-[4px] sgds:mt-[var(--sgds-text-gap-2-xs)] sgds:text-1 sgds:font-medium sgds:text-primary-default sgds:no-underline uj-tip-link"
          >
            {{ card.link.label }}
            <sgds-icon name="arrow-right" size="sm" aria-hidden="true" />
          </a>
        </div>

      </div>
    </TransitionGroup>

    <!-- ── Legend ─────────────────────────────────────────────────────────── -->
    <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-md)] sgds:flex-wrap" aria-label="Colour legend">
      <div v-for="l in [
        { cls: 'uj-step--user',  label: 'You / your action' },
        { cls: 'uj-step--figma', label: 'Figma canvas' },
        { cls: 'uj-step--ai',    label: 'AI agent' },
        { cls: 'uj-step--code',  label: 'Code / IDE' },
      ]" :key="l.cls" class="sgds:flex sgds:items-center sgds:gap-[6px]">
        <span class="uj-legend-dot" :class="l.cls" aria-hidden="true" />
        <span class="sgds:text-1 sgds:text-subtle">{{ l.label }}</span>
      </div>
      <span class="sgds:text-1 sgds:text-subtle sgds:flex sgds:items-center sgds:gap-[4px]">
        <span class="uj-hint-dot" aria-hidden="true" />
        Click any step for details
      </span>
    </div>

  </div>
</template>

<style>
/* ── Filter label ──────────────────────────────────────────────────────────── */
.uj-filter-label { width: 58px; flex-shrink: 0; }

/* ── Filter chips ──────────────────────────────────────────────────────────── */
.uj-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--sgds-border-color-muted);
  background: var(--sgds-surface-default);
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-1);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}
.uj-chip:hover { background: var(--sgds-surface-raised); border-color: var(--sgds-border-color-strong); color: var(--sgds-body-color-default); }
/* High-contrast selected state — explicit values, not tokens, to guarantee WCAG AA */
.uj-chip--on            { background: #111827; border-color: #111827; color: #ffffff; }
.uj-chip--on:hover      { background: #1f2937; border-color: #1f2937; color: #ffffff; }
.uj-chip:focus-visible  { outline: 2px solid var(--sgds-color-primary-default); outline-offset: 2px; }

/* Dark theme */
.sgds-night-theme .uj-chip--on       { background: #f9fafb; border-color: #f9fafb; color: #111827; }
.sgds-night-theme .uj-chip--on:hover { background: #f3f4f6; border-color: #f3f4f6; color: #111827; }

/* ── Card shell ────────────────────────────────────────────────────────────── */
.uj-card { border: 1px solid var(--sgds-border-color-muted); border-radius: var(--sgds-border-radius-lg); background: var(--sgds-surface-default); overflow: hidden; }

.uj-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sgds-component-gap-md);
  padding: var(--sgds-component-padding-md) var(--sgds-component-padding-lg);
  border-bottom: 1px solid var(--sgds-border-color-muted);
  flex-wrap: wrap;
}

/* ── Flow scroll ───────────────────────────────────────────────────────────── */
.uj-flow-scroll {
  padding: var(--sgds-component-padding-md) var(--sgds-component-padding-lg);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--sgds-border-color-muted) transparent;
}
.uj-flow-scroll::-webkit-scrollbar       { height: 4px; }
.uj-flow-scroll::-webkit-scrollbar-track { background: transparent; }
.uj-flow-scroll::-webkit-scrollbar-thumb { background: var(--sgds-border-color-muted); border-radius: 2px; }

.uj-flow { display: flex; align-items: center; min-width: max-content; }

/* ── Step box ──────────────────────────────────────────────────────────────── */
.uj-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1.5px solid transparent;
  min-width: 88px;
  text-align: center;
  /* Reset button styles */
  background: none;
  cursor: default;
  font-family: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.uj-step-top  { font-size: var(--sgds-font-size-2); font-weight: 600; line-height: 1.3; color: inherit; }
.uj-step-sub  { font-size: var(--sgds-font-size-0); font-weight: 400; line-height: 1.3; opacity: 0.78; color: inherit; }

/* Clickable indicator dot */
.uj-step-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
}

/* Step type colours */
.uj-step--user  { background: #dbeafe; border-color: #93c5fd; color: #1e40af; }
.uj-step--figma { background: #ede9fe; border-color: #c4b5fd; color: #5b21b6; }
.uj-step--ai    { background: #dcfce7; border-color: #86efac; color: #166534; }
.uj-step--code  { background: #ccfbf1; border-color: #5eead4; color: #134e4a; }

/* Dark-theme overrides */
.sgds-night-theme .uj-step--user  { background: #1e3a5f; border-color: #3b82f6; color: #93c5fd; }
.sgds-night-theme .uj-step--figma { background: #2e1065; border-color: #7c3aed; color: #c4b5fd; }
.sgds-night-theme .uj-step--ai    { background: #14532d; border-color: #22c55e; color: #86efac; }
.sgds-night-theme .uj-step--code  { background: #134e4a; border-color: #14b8a6; color: #5eead4; }

/* Clickable state */
.uj-step--clickable { cursor: pointer; }
.uj-step--clickable:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.10); }
.uj-step--clickable:focus-visible { outline: 2px solid var(--sgds-color-primary-default); outline-offset: 3px; }
.uj-step--clickable:active { transform: translateY(0); }

/* Active / selected state — coloured ring per type */
.uj-step--active-user  { box-shadow: 0 0 0 3px #3b82f6, 0 4px 12px rgba(59,130,246,0.25); transform: translateY(-1px); border-color: #3b82f6; }
.uj-step--active-figma { box-shadow: 0 0 0 3px #7c3aed, 0 4px 12px rgba(124,58,237,0.25); transform: translateY(-1px); border-color: #7c3aed; }
.uj-step--active-ai    { box-shadow: 0 0 0 3px #22c55e, 0 4px 12px rgba(34,197,94,0.25);  transform: translateY(-1px); border-color: #22c55e; }
.uj-step--active-code  { box-shadow: 0 0 0 3px #14b8a6, 0 4px 12px rgba(20,184,166,0.25); transform: translateY(-1px); border-color: #14b8a6; }

/* ── Connector arrow ───────────────────────────────────────────────────────── */
.uj-conn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0 6px; flex-shrink: 0; }
.uj-conn-label { font-size: 10px; font-weight: 500; color: var(--sgds-body-color-subtle); white-space: nowrap; letter-spacing: 0.02em; }
.uj-conn-arrow { display: flex; align-items: center; color: var(--sgds-border-color-strong); }
.uj-conn-line  { width: 24px; height: 1.5px; background: currentColor; }
.uj-conn-head  { margin-left: -1px; }

/* ── Step detail panel ─────────────────────────────────────────────────────── */
.uj-detail {
  margin: 0 var(--sgds-component-padding-lg) var(--sgds-component-padding-sm);
  padding: var(--sgds-component-padding-md);
  border-radius: var(--sgds-border-radius-md);
  border: 1px solid var(--sgds-border-color-muted);
  border-left-width: 3px;
  background: var(--sgds-surface-raised);
}
.uj-detail--user  { border-left-color: #3b82f6; }
.uj-detail--figma { border-left-color: #7c3aed; }
.uj-detail--ai    { border-left-color: #22c55e; }
.uj-detail--code  { border-left-color: #14b8a6; }

/* Setup list */
.uj-setup-list { list-style: none; }
.uj-setup-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
}
.uj-setup-num--user  { background: #dbeafe; color: #1e40af; }
.uj-setup-num--figma { background: #ede9fe; color: #5b21b6; }
.uj-setup-num--ai    { background: #dcfce7; color: #166534; }
.uj-setup-num--code  { background: #ccfbf1; color: #134e4a; }

/* Links */
.uj-detail-link:hover { text-decoration: underline; }

/* Detail panel transition */
.uj-detail-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.uj-detail-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.uj-detail-enter-from, .uj-detail-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Tip strip ─────────────────────────────────────────────────────────────── */
.uj-tip { padding: var(--sgds-component-padding-sm) var(--sgds-component-padding-lg); background: var(--sgds-surface-raised); border-top: 1px solid var(--sgds-border-color-muted); }
.uj-tip-link:hover { text-decoration: underline; }

/* ── Legend ────────────────────────────────────────────────────────────────── */
.uj-legend-dot { display: inline-block; width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid transparent; flex-shrink: 0; }
.uj-hint-dot   { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: var(--sgds-body-color-subtle); opacity: 0.5; }

/* ── Card list transition ──────────────────────────────────────────────────── */
.uj-cards-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.uj-cards-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; position: absolute; width: 100%; pointer-events: none; }
.uj-cards-enter-from, .uj-cards-leave-to { opacity: 0; transform: translateY(6px); }
</style>
