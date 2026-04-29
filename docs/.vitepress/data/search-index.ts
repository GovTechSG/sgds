export const categoryColorClass: Record<string, string> = {
  Component: "sgds:text-primary-default",
  Foundation: "sgds:text-success-default",
  Template: "sgds:text-warning-default",
  Guideline: "sgds:text-purple-default",
  AI: "sgds:text-cyan-default",
};

export interface SearchItem {
  title: string;
  category: string;
  url: string;
  keywords?: string[];
}

export interface SearchResult extends SearchItem {
  excerpt?: string;
}

export const searchIndex: SearchItem[] = [
  // Foundations
  { title: "Colour", category: "Foundation", url: "/foundations/colour" },
  { title: "Iconography", category: "Foundation", url: "/foundations/iconography" },
  { title: "Typography", category: "Foundation", url: "/foundations/typography" },
  { title: "Layout", category: "Foundation", url: "/foundations/layout" },
  { title: "Border", category: "Foundation", url: "/foundations/border" },
  { title: "Spacing", category: "Foundation", url: "/foundations/spacing" },
  { title: "Motion", category: "Foundation", url: "/foundations/motion" },
  { title: "Interaction", category: "Foundation", url: "/foundations/interaction" },
  { title: "Accessibility", category: "Foundation", url: "/foundations/accessibility" },
  { title: "Logo", category: "Foundation", url: "/foundations/logo" },
  { title: "Voice of tone", category: "Foundation", url: "/foundations/voice-of-tone" },
  { title: "Photography", category: "Foundation", url: "/foundations/photography" },
  { title: "Illustration", category: "Foundation", url: "/foundations/illustration" },
  { title: "Data format", category: "Foundation", url: "/foundations/data-format" },
  { title: "Data visualisation", category: "Foundation", url: "/foundations/data-visualisation" },

  // Components — Data display
  { title: "Accordion", category: "Component", url: "/components/accordion", keywords: ["collapse", "expand", "toggle", "panel"] },
  { title: "Card", category: "Component", url: "/components/card", keywords: ["container", "box"] },
  { title: "Icon card", category: "Component", url: "/components/icon-card" },
  { title: "Image card", category: "Component", url: "/components/image-card" },
  { title: "Thumbnail card", category: "Component", url: "/components/thumbnail-card" },

  // Components — List
  { title: "Description list", category: "Component", url: "/components/description-list", keywords: ["dl", "term", "detail"] },
  { title: "Icon list", category: "Component", url: "/components/icon-list" },

  // Components — Layout
  { title: "Divider", category: "Component", url: "/components/divider", keywords: ["separator", "line", "hr"] },

  // Components — Table
  { title: "Table", category: "Component", url: "/components/table", keywords: ["data", "rows", "columns", "grid"] },
  { title: "Table of contents", category: "Component", url: "/components/table-of-contents", keywords: ["toc", "anchor", "navigation"] },
  { title: "Pagination", category: "Component", url: "/components/pagination", keywords: ["pages", "next", "prev"] },

  // Components — Feedback
  { title: "Alert", category: "Component", url: "/components/alert", keywords: ["notification", "warning", "error", "success", "info"] },
  { title: "Badge", category: "Component", url: "/components/badge", keywords: ["tag", "label", "chip", "count"] },
  { title: "Drawer", category: "Component", url: "/components/drawer", keywords: ["sidebar", "panel", "slide"] },
  { title: "Modal", category: "Component", url: "/components/modal", keywords: ["dialog", "popup", "overlay"] },
  { title: "Progress bar", category: "Component", url: "/components/progress-bar", keywords: ["loading", "progress", "bar"] },
  { title: "Skeleton", category: "Component", url: "/components/skeleton", keywords: ["loading", "placeholder", "shimmer"] },
  { title: "Spinner", category: "Component", url: "/components/spinner", keywords: ["loading", "loader"] },
  { title: "System banner", category: "Component", url: "/components/system-banner", keywords: ["announcement", "notification", "banner"] },
  { title: "Toast", category: "Component", url: "/components/toast", keywords: ["notification", "snackbar", "message"] },
  { title: "Tooltip", category: "Component", url: "/components/tooltip", keywords: ["hint", "popover", "info"] },

  // Components — Form
  { title: "Button", category: "Component", url: "/components/button", keywords: ["cta", "action", "click", "submit"] },
  { title: "Checkbox", category: "Component", url: "/components/checkbox", keywords: ["check", "tick", "input", "form"] },
  { title: "Combo box", category: "Component", url: "/components/combo-box", keywords: ["combobox", "autocomplete", "select", "dropdown"] },
  { title: "Datepicker", category: "Component", url: "/components/datepicker", keywords: ["date", "calendar", "picker", "input"] },
  { title: "File upload", category: "Component", url: "/components/file-upload", keywords: ["upload", "attachment", "file"] },
  { title: "Input", category: "Component", url: "/components/input", keywords: ["text field", "form", "textbox"] },
  { title: "Quantity toggle", category: "Component", url: "/components/quantity-toggle", keywords: ["number", "counter", "increment", "decrement"] },
  { title: "Radio", category: "Component", url: "/components/radio", keywords: ["radio button", "option", "select"] },
  { title: "Select", category: "Component", url: "/components/select", keywords: ["dropdown", "option", "choose"] },
  { title: "Switch", category: "Component", url: "/components/switch", keywords: ["toggle", "on off"] },
  { title: "Textarea", category: "Component", url: "/components/textarea", keywords: ["multiline", "text", "input", "form"] },

  // Components — Labels
  { title: "Close button", category: "Component", url: "/components/close-button", keywords: ["dismiss", "x"] },
  { title: "Icon", category: "Component", url: "/components/icon", keywords: ["glyph", "symbol"] },
  { title: "Link", category: "Component", url: "/components/link", keywords: ["anchor", "href", "url"] },

  // Components — Navigation
  { title: "Breadcrumb", category: "Component", url: "/components/breadcrumb", keywords: ["navigation", "path", "trail"] },
  { title: "Dropdown", category: "Component", url: "/components/dropdown", keywords: ["menu", "select", "popover"] },
  { title: "Footer", category: "Component", url: "/components/footer", keywords: ["bottom", "navigation"] },
  { title: "Icon button", category: "Component", url: "/components/icon-button", keywords: ["button", "icon", "action"] },
  { title: "Mainnav", category: "Component", url: "/components/mainnav", keywords: ["navbar", "navigation", "header"] },
  { title: "Masthead", category: "Component", url: "/components/masthead", keywords: ["header", "top bar"] },
  { title: "Overflow menu", category: "Component", url: "/components/overflow-menu", keywords: ["kebab", "more", "menu", "actions"] },
  { title: "Sidenav", category: "Component", url: "/components/sidenav", keywords: ["sidebar", "navigation"] },
  { title: "Stepper", category: "Component", url: "/components/stepper", keywords: ["steps", "progress", "wizard"] },
  { title: "Subnav", category: "Component", url: "/components/subnav", keywords: ["sub navigation", "secondary nav", "tabs"] },
  { title: "Tab", category: "Component", url: "/components/tab", keywords: ["tabs", "navigation", "panel"] },

  // Templates — Page templates
  { title: "About us", category: "Template", url: "/templates/page-templates/preview/about-us", keywords: ["agency", "team", "company", "mission"] },
  { title: "Application management", category: "Template", url: "/templates/page-templates/preview/application-management", keywords: ["admin", "portal", "table", "filter", "dashboard"] },
  { title: "Blog", category: "Template", url: "/templates/page-templates/preview/blog", keywords: ["article", "news", "story", "case study", "post"] },
  { title: "Catalogue", category: "Template", url: "/templates/page-templates/preview/catalogue", keywords: ["search", "filter", "browse", "listing", "grid"] },
  { title: "Form page", category: "Template", url: "/templates/page-templates/preview/form-page", keywords: ["template", "form", "page"] },
  { title: "Landing page", category: "Template", url: "/templates/page-templates/preview/landing", keywords: ["hero", "marketing", "campaign", "launch"] },
  { title: "Multi-step form", category: "Template", url: "/templates/page-templates/preview/multi-step-form", keywords: ["wizard", "steps", "form"] },
  { title: "Report an issue", category: "Template", url: "/templates/page-templates/preview/report-issue", keywords: ["form", "feedback", "complaint", "incident"] },

  // Templates — Block templates
  { title: "Cards", category: "Block", url: "/blocks/preview/cards", keywords: ["grid", "cards", "layout", "tiles"] },
  { title: "Call to action", category: "Block", url: "/blocks/preview/cta", keywords: ["cta", "conversion", "banner", "promo"] },
  { title: "Feature", category: "Block", url: "/blocks/preview/feature", keywords: ["feature", "showcase", "marketing", "image"] },
  { title: "Filter", category: "Block", url: "/blocks/preview/filter", keywords: ["filter", "facet", "sidebar", "search"] },
  { title: "All Types", category: "Block", url: "/blocks/preview/form-all-types", keywords: ["form", "fields", "input", "all types"] },
  { title: "Basic Center", category: "Block", url: "/blocks/preview/form-basic-center", keywords: ["form", "basic", "center"] },
  { title: "Basic Left", category: "Block", url: "/blocks/preview/form-basic-left", keywords: ["form", "basic", "left"] },
  { title: "Basic Right", category: "Block", url: "/blocks/preview/form-basic-right", keywords: ["form", "basic", "right"] },
  { title: "Form Fields Checkbox", category: "Block", url: "/blocks/preview/form-fields-checkbox", keywords: ["form", "fields", "checkbox"] },
  { title: "Form Fields Dates Quantities", category: "Block", url: "/blocks/preview/form-fields-dates-quantities", keywords: ["form", "fields", "datepicker", "quantity"] },
  { title: "Form Fields File Upload", category: "Block", url: "/blocks/preview/form-fields-file-upload", keywords: ["form", "fields", "file upload"] },
  { title: "Form Fields Radio", category: "Block", url: "/blocks/preview/form-fields-radio", keywords: ["form", "fields", "radio"] },
  { title: "Form Fields Selects", category: "Block", url: "/blocks/preview/form-fields-selects", keywords: ["form", "fields", "select"] },
  { title: "Form Fields Textarea", category: "Block", url: "/blocks/preview/form-fields-textarea", keywords: ["form", "fields", "textarea"] },
  { title: "Form Multi-step", category: "Block", url: "/blocks/preview/form-multi-step", keywords: ["form", "multi-step", "stepper"] },
  { title: "Full-width only", category: "Block", url: "/blocks/preview/form-full-width-only", keywords: ["form", "full width", "fields"] },
  { title: "Paired Only", category: "Block", url: "/blocks/preview/form-paired-only", keywords: ["form", "paired", "fields"] },
  { title: "Sections Single", category: "Block", url: "/blocks/preview/form-sections-single", keywords: ["form", "sections", "single"] },
  { title: "Sections Three", category: "Block", url: "/blocks/preview/form-sections-three", keywords: ["form", "sections", "three"] },
  { title: "Sections Two", category: "Block", url: "/blocks/preview/form-sections-two", keywords: ["form", "sections", "two"] },
  { title: "Hero", category: "Block", url: "/blocks/preview/hero", keywords: ["banner", "header", "hero section", "landing"] },
  { title: "Page header", category: "Block", url: "/blocks/preview/header", keywords: ["title", "header", "breadcrumb", "page"] },
  { title: "Stats", category: "Block", url: "/blocks/preview/stats", keywords: ["stats", "metrics", "kpi", "numbers"] },

  // Guidelines
  { title: "Overview", category: "Guideline", url: "/guidelines/overview" },
  { title: "Content guidance", category: "Guideline", url: "/guidelines/content-guidance", keywords: ["writing", "copy", "tone"] },
  { title: "Interaction guidance", category: "Guideline", url: "/guidelines/interaction-guidance", keywords: ["interaction", "ux", "behaviour"] },

  // AI
  { title: "Introduction", category: "AI", url: "/ai/introduction", keywords: ["ai", "overview"] },
  { title: "What AI can do", category: "AI", url: "/ai/what-ai-can-do", keywords: ["capabilities", "features"] },
  { title: "Setup instructions", category: "AI", url: "/ai/setup-instructions", keywords: ["install", "setup", "configure"] },
  { title: "Prompt tips", category: "AI", url: "/ai/prompt-tips", keywords: ["prompts", "tips", "guide"] },
  { title: "What is MCP?", category: "AI", url: "/ai/what-is-mcp", keywords: ["mcp", "model context protocol"] },
  { title: "MCP server setup", category: "AI", url: "/ai/mcp-server-setup", keywords: ["mcp", "server", "setup"] },
  { title: "Figma to code", category: "AI", url: "/ai/figma-to-code", keywords: ["figma", "design", "code"] },
  { title: "Designers", category: "AI", url: "/ai/designers", keywords: ["design", "role"] },
  { title: "Developers", category: "AI", url: "/ai/developers", keywords: ["dev", "code", "role"] },
  { title: "Others", category: "AI", url: "/ai/others", keywords: ["role"] },
];

const categoryOrder: Record<string, number> = {
  Component: 0,
  Foundation: 1,
  Template: 2,
  Guideline: 3,
  AI: 4,
};

function getExcerpt(text: string, query: string, maxLen = 110): string {
  const lq = query.toLowerCase();
  const lt = text.toLowerCase();
  const idx = lt.indexOf(lq);
  if (idx === -1) return text.slice(0, maxLen).trim() + (text.length > maxLen ? "…" : "");
  const start = Math.max(0, idx - 35);
  const end = Math.min(text.length, idx + query.length + 70);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

export interface ContentPage {
  url: string;
  description: string;
  text: string;
}

export function searchItems(query: string, contentPages?: ContentPage[]): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const contentMap = new Map((contentPages ?? []).map((p) => [p.url, p]));

  const scored = searchIndex
    .map((item) => {
      const title = item.title.toLowerCase();
      const keywords = (item.keywords || []).join(" ").toLowerCase();
      const content = contentMap.get(item.url);
      const description = (content?.description ?? "").toLowerCase();
      const text = content?.text ?? "";
      const textLower = text.toLowerCase();

      let score = 0;
      let excerpt: string | undefined;

      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 85;
      else if (title.includes(q)) score = 65;
      else if (keywords.includes(q)) score = 45;
      else if (description.includes(q)) {
        score = 35;
        excerpt = getExcerpt(content!.description, query);
      } else if (textLower.includes(q)) {
        score = 25;
        excerpt = getExcerpt(text, query);
      }

      return { item: { ...item, excerpt }, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (categoryOrder[a.item.category] ?? 99) - (categoryOrder[b.item.category] ?? 99);
    })
    .map(({ item }) => item);

  return scored.slice(0, 12);
}
