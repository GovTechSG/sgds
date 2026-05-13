export type Skill = {
  name: string;
  /** Plain text or safe HTML string with SGDS utility classes. */
  descriptionHtml: string;
};

const inlineCodeClass = "sgds:inline-block sgds:whitespace-nowrap sgds:bg-surface-raised sgds:text-default sgds:rounded-sm sgds:px-1 sgds:py-0 sgds:font-mono sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal";

export const skills: Skill[] = [
  {
    name: "sgds-workflow",
    descriptionHtml: "Mandatory starting point for SGDS work. Maps the skill set and points the assistant to the right setup, component, utility, layout, template, form, theming, data visualisation, or writing guidance.",
  },
  {
    name: "sgds-getting-started",
    descriptionHtml: "Starting point for new SGDS apps. Covers Inter font setup, foundation CSS import order, utility CSS, component registration, and base app layout.",
  },
  {
    name: "sgds-components",
    descriptionHtml: `Reference for all <code class="${inlineCodeClass}">&lt;sgds-*&gt;</code> web components, including installation, attributes, slots, events, and framework integration for React, Vue, Angular, and Next.js.`,
  },
  {
    name: "sgds-utilities",
    descriptionHtml: `Reference for <code class="${inlineCodeClass}">sgds:</code> Tailwind utility classes, including setup, spacing, grid, typography, colours, borders, dimensions, opacity, and theme switching.`,
  },
  {
    name: "sgds-layouts",
    descriptionHtml: "Page layout patterns for SGDS applications, including full-width pages, sidebar layouts, split views, aside panels, breadcrumbs, and viewport-height layouts.",
  },
  {
    name: "sgds-theming",
    descriptionHtml: "Theme customisation for product brand colours, GovTech colour themes, day and night modes, font changes, and CSS token overrides.",
  },
  {
    name: "sgds-forms",
    descriptionHtml: `Form validation guidance for SGDS form components, including <code class="${inlineCodeClass}">hasFeedback</code>, constraint validation, custom validation, <code class="${inlineCodeClass}">FormData</code>, <code class="${inlineCodeClass}">noValidate</code>, and <code class="${inlineCodeClass}">setInvalid</code>.`,
  },
  {
    name: "sgds-patterns",
    descriptionHtml: "Reusable typography and text patterns for headings, display text, content headers, lists, paragraphs, and consistent page text hierarchy.",
  },
  {
    name: "sgds-blocks",
    descriptionHtml: "Reusable page sections and shell structures such as application shell, hero sections, cards, feature blocks, statistics, filters, forms, and calls to action. Compose with sgds-templates.",
  },
  {
    name: "sgds-templates",
    descriptionHtml: "Ready-made full-page templates for common product flows such as dashboards, login pages, list pages, forms, settings pages, catalogue pages, landing pages, and content pages.",
  },
  {
    name: "sgds-pattern-block-templates",
    descriptionHtml: "Pattern block templates for self-contained UI sections, including application shell, page headers, sticky headers, filter panels, sidebar filters, and other blocks that slot into page templates.",
  },
  {
    name: "sgds-pattern-page-templates",
    descriptionHtml: "Pattern page templates for full-page SGDS screens such as dashboards, login pages, list pages, form pages, settings pages, admin portals, authentication flows, and data table views.",
  },
  {
    name: "sgds-data-visualisation",
    descriptionHtml: "Data visualisation guidance for SGDS apps. Covers installing ECharts separately and applying the SGDS colour palette to charts and dashboards.",
  },
  {
    name: "sgds-writing",
    descriptionHtml: "SGDS writing guidance for documentation, UI copy, labels, error messages, tooltips, prompts, tone, grammar, spelling, casing, punctuation, and plain language.",
  },
];
