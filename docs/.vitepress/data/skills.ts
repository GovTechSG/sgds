export type Skill = {
  name: string;
  /** Plain text or safe HTML string (uses <code class="portal-code-token">) */
  descriptionHtml: string;
};

export const skills: Skill[] = [
  {
    name: "sgds-workflow",
    descriptionHtml: "Start here when unsure. Maps all SGDS skills, when to use them, and the order to read them in.",
  },
  {
    name: "sgds-getting-started",
    descriptionHtml: "Mandatory first step for new apps: font setup, CSS import order, component registration, and app layout.",
  },
  {
    name: "sgds-components",
    descriptionHtml: "All 47 <code class=\"portal-code-token\">&lt;sgds-*&gt;</code> web components — attributes, slots, events, and framework integration (React 19+, React ≤18, Vue, Angular, Next.js).",
  },
  {
    name: "sgds-utilities",
    descriptionHtml: "All <code class=\"portal-code-token\">sgds:</code> Tailwind utility classes: grid, spacing, typography, colours, borders, and more.",
  },
  {
    name: "sgds-theming",
    descriptionHtml: "Brand colour overrides, dark mode setup, and font customisation. Read alongside components and utilities when needed.",
  },
  {
    name: "sgds-forms",
    descriptionHtml: "Form validation, constraint validation, <code class=\"portal-code-token\">FormData</code>, and <code class=\"portal-code-token\">setInvalid</code>.",
  },
  {
    name: "sgds-pattern-block-templates",
    descriptionHtml: "Application shell, page header, basic details card, filter sidebar, session detail, and table filter — self-contained UI blocks that slot into any page.",
  },
  {
    name: "sgds-pattern-page-templates",
    descriptionHtml: "Full-page layouts: dashboard, login, list page, form page, and about us.",
  },
  {
    name: "sgds-data-visualisation",
    descriptionHtml: "Charts and dashboards using ECharts with the SGDS colour palette.",
  },
];
