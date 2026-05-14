import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import tailwindcss from "@tailwindcss/vite";
import { fileSort } from "./data/file-management";
import { foundationsSidebar } from "./data/foundations-sidebar";
import { blocksSidebar } from "./data/blocks-sidebar";

const vitePressConfig = {
  title: "Singapore Government Design System",
  description: "Unifying Government through Design and Code.",
  cleanUrls: true,
  markdown: {
    anchor: {
      permalink: (slug, _, state, idx) => {
        if (state.tokens[idx]?.tag !== "h2") return;

        const title =
          state.tokens[idx + 1]?.children
            ?.filter((token) => ["text", "code_inline"].includes(token.type))
            .reduce((acc, token) => acc + token.content, "")
            .trim() || "";
        const linkTokens = [
          Object.assign(new state.Token("text", "", 0), { content: " " }),
          Object.assign(new state.Token("link_open", "a", 1), {
            attrs: [
              ["class", "header-anchor"],
              ["href", `#${slug}`],
              ["aria-label", `Permalink to “${title}”`],
            ],
          }),
          Object.assign(new state.Token("html_inline", "", 0), {
            content: "&#8203;",
            meta: { isPermalinkSymbol: true },
          }),
          new state.Token("link_close", "a", -1),
        ];

        state.tokens[idx + 1].children?.push(...linkTokens);
      },
    },
  },
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=swap",
      },
    ],
    ...(process.env.NODE_ENV !== "production"
      ? [
          [
            "script",
            {
              src: "https://mcp.figma.com/mcp/html-to-design/capture.js",
              async: "",
              "data-figma-capture": "true",
            },
          ] as const,
        ]
      : []),
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
  getMenu("templates"),
  getMenu("blocks"),
  getMenu("guidelines"),
  getMenu("resources"),
  getMenu("ai"),
]);

config.themeConfig ??= {};
config.themeConfig.sidebar ??= {};
config.themeConfig.sidebar["/components/"] = {
  base: "/components/",
  items: [
    { text: "Accordion", link: "/components/accordion" },
    { text: "Alert", link: "/components/alert" },
    { text: "Badge", link: "/components/badge" },
    { text: "Breadcrumb", link: "/components/breadcrumb" },
    { text: "Button", link: "/components/button" },
    {
      text: "Card group",
      items: [
        { text: "Card", link: "/components/card" },
        { text: "Icon card", link: "/components/icon-card" },
        { text: "Image card", link: "/components/image-card" },
        { text: "Thumbnail card", link: "/components/thumbnail-card" },
      ],
    },
    { text: "Checkbox", link: "/components/checkbox" },
    { text: "Close button", link: "/components/close-button" },
    { text: "Combo box", link: "/components/combo-box" },
    { text: "Datepicker", link: "/components/datepicker" },
    { text: "Description list", link: "/components/description-list" },
    { text: "Divider", link: "/components/divider" },
    { text: "Drawer", link: "/components/drawer" },
    { text: "Dropdown", link: "/components/dropdown" },
    { text: "File upload", link: "/components/file-upload" },
    { text: "Footer", link: "/components/footer" },
    { text: "Icon button", link: "/components/icon-button" },
    { text: "Icon list", link: "/components/icon-list" },
    { text: "Input", link: "/components/input" },
    { text: "Link", link: "/components/link" },
    { text: "Mainnav", link: "/components/mainnav" },
    { text: "Masthead", link: "/components/masthead" },
    { text: "Modal", link: "/components/modal" },
    { text: "Overflow menu", link: "/components/overflow-menu" },
    { text: "Pagination", link: "/components/pagination" },
    { text: "Progress bar", link: "/components/progress-bar" },
    { text: "Quantity toggle", link: "/components/quantity-toggle" },
    { text: "Radio", link: "/components/radio" },
    { text: "Select", link: "/components/select" },
    { text: "Sidebar", link: "/components/sidebar" },
    { text: "Sidenav", link: "/components/sidenav" },
    { text: "Skeleton", link: "/components/skeleton" },
    { text: "Spinner", link: "/components/spinner" },
    { text: "Stepper", link: "/components/stepper" },
    { text: "Subnav", link: "/components/subnav" },
    { text: "Switch", link: "/components/switch" },
    { text: "System banner", link: "/components/system-banner" },
    { text: "Tab", link: "/components/tab" },
    { text: "Table", link: "/components/table" },
    { text: "Table of contents", link: "/components/table-of-contents" },
    { text: "Textarea", link: "/components/textarea" },
    { text: "Toast", link: "/components/toast" },
    { text: "Tooltip", link: "/components/tooltip" },
  ],
};
config.themeConfig.sidebar["/foundations/"] = foundationsSidebar;
config.themeConfig.sidebar["/templates/"] = {
  base: "/templates/",
  items: [{ text: "Overview", link: "/templates/" }],
};
config.themeConfig.sidebar["/blocks/"] = {
  ...blocksSidebar,
};
config.themeConfig.sidebar["/guidelines/"] = {
  base: "/guidelines/",
  items: [
    {
      text: "Guidelines",
      items: [{ text: "Overview", link: "/guidelines/overview" }],
    },
  ],
};
config.themeConfig.sidebar["/resources/"] = {
  base: "/resources/",
  items: [
    {
      text: "Resources",
      items: [{ text: "Overview", link: "/resources/overview" }],
    },
  ],
};
config.themeConfig.sidebar["/ai/"] = {
  base: "/ai/",
  items: [
    { text: "Introduction", link: "/ai/introduction" },
    { text: "Agent skills", link: "/ai/skills" },
    {
      text: "Use AI with SGDS",
      collapsed: false,
      items: [
        { text: "Figma workflows", link: "/ai/figma-and-code-workflows" },
        { text: "Development workflows", link: "/ai/development-workflows" },
      ],
    },
    { text: "Prompt tips", link: "/ai/prompt-tips" },
  ],
};

export default defineConfig(config);
