export type Skill = {
  name: string;
  /** Plain text or safe HTML string with SGDS utility classes. */
  descriptionHtml: string;
};

const inlineCodeClass = "sgds:inline-block sgds:whitespace-nowrap sgds:bg-surface-raised sgds:text-default sgds:rounded-sm sgds:px-1 sgds:py-0 sgds:font-mono sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal";

export const skills: Skill[] = [
  {
    name: "sgds-workflow",
    descriptionHtml: "Start here when unsure. Maps all SGDS agent skills, when to use them, and the order to read them in.",
  },
  {
    name: "sgds-getting-started",
    descriptionHtml: "Mandatory first step for new apps: font setup, CSS import order, component registration, and app layout.",
  },
  {
    name: "sgds-components",
    descriptionHtml: `All 47 <code class="${inlineCodeClass}">&lt;sgds-*&gt;</code> web components, including attributes, slots, events, and framework integration (React 19+, React ≤18, Vue, Angular, Next.js).`,
  },
  {
    name: "sgds-utilities",
    descriptionHtml: `All <code class="${inlineCodeClass}">sgds:</code> Tailwind utility classes: grid, spacing, typography, colours, borders, and more.`,
  },
  {
    name: "sgds-theming",
    descriptionHtml: "Brand colour overrides, dark mode setup, and font customisation. Read alongside components and utilities when needed.",
  },
  {
    name: "sgds-forms",
    descriptionHtml: `Form validation, constraint validation, <code class="${inlineCodeClass}">FormData</code>, and <code class="${inlineCodeClass}">setInvalid</code>.`,
  },
  {
    name: "sgds-patterns",
    descriptionHtml: "Typography and content patterns for headings, display text, paragraphs, lists, and page text hierarchy.",
  },
  {
    name: "sgds-layouts",
    descriptionHtml: "Page layout patterns that define content arrangement for public-facing pages and internal tools and dashboards.",
  },
  {
    name: "sgds-blocks",
    descriptionHtml: "Reusable page sections such as hero sections, cards, feature blocks, statistics, filters, forms, and calls to action.",
  },
  {
    name: "sgds-templates",
    descriptionHtml: "Ready-made full-page layouts for common product flows such as dashboards, login pages, list pages, forms, and settings.",
  },
  {
    name: "sgds-data-visualisation",
    descriptionHtml: "Charts and dashboards using ECharts with the SGDS colour palette.",
  },
  {
    name: "sgds-writing",
    descriptionHtml: "SGDS writing guidance for clear, direct, and consistent documentation, UI copy, labels, and prompts.",
  },
];
