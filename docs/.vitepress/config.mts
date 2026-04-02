import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import tailwindcss from "@tailwindcss/vite";
import { fileSort } from "./data/file-management";

const vitePressConfig = {
  title: "Singapore Government Design System",
  description: "Unifying Government through Design and Code.",
  cleanUrls: true,
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=swap",
      },
    ],
    [
      "script",
      {
        src: "https://mcp.figma.com/mcp/html-to-design/capture.js",
        async: "",
        "data-figma-capture": "true",
      },
    ],
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith("sgds-"),
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
};

function getMenu(folder: string) {
  return {
    documentRootPath: "docs",
    scanStartPath: folder,
    resolvePath: `/${folder}/`,
    hyphenToSpace: true,
    capitalizeEachWords: false,
    useTitleFromFrontmatter: true,
    manualSortFileNameByPriority: fileSort[folder],
  };
}

// https://vitepress.dev/reference/site-config
const config = withSidebar(vitePressConfig, [
    getMenu("foundations"),
    getMenu("components"),
    getMenu("patterns"),
    getMenu("guidelines"),
    getMenu("resources"),
    getMenu("ai"),
  ]);

config.themeConfig ??= {};
config.themeConfig.sidebar ??= {};
config.themeConfig.sidebar["/components/"] = {
  base: "/components/",
  items: [
    {
      text: "Data display",
      items: [
        { text: "Accordion", link: "/components/accordion" },
        { text: "Card", link: "/components/card" },
        { text: "Icon card", link: "/components/icon-card" },
        { text: "Image card", link: "/components/image-card" },
        { text: "Thumbnail card", link: "/components/thumbnail-card" },
      ],
    },
    {
      text: "List",
      items: [
        { text: "Description list", link: "/components/description-list" },
        { text: "Icon list", link: "/components/icon-list" },
      ],
    },
    {
      text: "Layout",
      items: [
        { text: "Divider", link: "/components/divider" },
      ],
    },
    {
      text: "Table",
      items: [
        { text: "Table", link: "/components/table" },
        { text: "Table of contents", link: "/components/table-of-contents" },
        { text: "Pagination", link: "/components/pagination" },
      ],
    },
    {
      text: "Feedback",
      items: [
        { text: "Alert", link: "/components/alert" },
        { text: "Badge", link: "/components/badge" },
        { text: "Drawer", link: "/components/drawer" },
        { text: "Modal", link: "/components/modal" },
        { text: "Progress bar", link: "/components/progress-bar" },
        { text: "Skeleton", link: "/components/skeleton" },
        { text: "Spinner", link: "/components/spinner" },
        { text: "System banner", link: "/components/system-banner" },
        { text: "Toast", link: "/components/toast" },
        { text: "Tooltip", link: "/components/tooltip" },
      ],
    },
    {
      text: "Form",
      items: [
        { text: "Button", link: "/components/button" },
        { text: "Checkbox", link: "/components/checkbox" },
        { text: "Combo box", link: "/components/combo-box" },
        { text: "Datepicker", link: "/components/datepicker" },
        { text: "File upload", link: "/components/file-upload" },
        { text: "Input", link: "/components/input" },
        { text: "Quantity toggle", link: "/components/quantity-toggle" },
        { text: "Radio", link: "/components/radio" },
        { text: "Select", link: "/components/select" },
        { text: "Switch", link: "/components/switch" },
        { text: "Textarea", link: "/components/textarea" },
      ],
    },
    {
      text: "Labels",
      items: [
        { text: "Close button", link: "/components/close-button" },
        { text: "Icon", link: "/components/icon" },
        { text: "Link", link: "/components/link" },
      ],
    },
    {
      text: "Navigation",
      items: [
        { text: "Breadcrumb", link: "/components/breadcrumb" },
        { text: "Dropdown", link: "/components/dropdown" },
        { text: "Footer", link: "/components/footer" },
        { text: "Icon button", link: "/components/icon-button" },
        { text: "Mainnav", link: "/components/mainnav" },
        { text: "Masthead", link: "/components/masthead" },
        { text: "Overflow menu", link: "/components/overflow-menu" },
        { text: "Sidenav", link: "/components/sidenav" },
        { text: "Stepper", link: "/components/stepper" },
        { text: "Subnav", link: "/components/subnav" },
        { text: "Tab", link: "/components/tab" },
      ],
    },
  ],
};
config.themeConfig.sidebar["/patterns/"] = {
  base: "/patterns/",
  items: [
    {
      text: "Page templates",
      items: [
        { text: "Form page", link: "/patterns/page-templates/form-page" },
        { text: "Multi-step form", link: "/patterns/page-templates/multi-step-form" },
      ],
    },
    {
      text: "Block templates",
      items: [
        { text: "Hero", link: "/patterns/block-templates/hero" },
        { text: "Card grid", link: "/patterns/block-templates/card-grid" },
      ],
    },
  ],
};
config.themeConfig.sidebar["/guidelines/"] = {
  base: "/guidelines/",
  items: [
    {
      text: "Guidelines",
      items: [
        { text: "Overview", link: "/guidelines/overview" },
      ],
    },
  ],
};
config.themeConfig.sidebar["/resources/"] = {
  base: "/resources/",
  items: [
    {
      text: "Resources",
      items: [
        { text: "Overview", link: "/resources/overview" },
      ],
    },
  ],
};
config.themeConfig.sidebar["/ai/"] = {
  base: "/ai/",
  items: [
    {
      text: "Overview",
      items: [
        { text: "Introduction", link: "/ai/introduction" },
        { text: "What AI can do", link: "/ai/what-ai-can-do" },
      ],
    },
    {
      text: "Getting started",
      items: [
        { text: "Setup instructions", link: "/ai/setup-instructions" },
        { text: "Prompt tips", link: "/ai/prompt-tips" },
      ],
    },
    {
      text: "MCP & integrations",
      items: [
        { text: "What is MCP?", link: "/ai/what-is-mcp" },
        { text: "MCP server setup", link: "/ai/mcp-server-setup" },
        { text: "Figma to code", link: "/ai/figma-to-code" },
      ],
    },
    {
      text: "By role",
      items: [
        { text: "Designers", link: "/ai/designers" },
        { text: "Developers", link: "/ai/developers" },
        { text: "Others", link: "/ai/others" },
      ],
    },
  ],
};

export default defineConfig(config);
