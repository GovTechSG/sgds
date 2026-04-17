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
        { text: "Accordion v2", link: "/components/accordion-v2" },
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
config.themeConfig.sidebar["/foundations/"] = {
  base: "/foundations/",
  items: [
    {
      text: "Accessibility",
      items: [
        { text: "Accessibility", link: "/foundations/accessibility/accessibility" },
      ],
    },
    {
      text: "Border",
      items: [
        {
          text: "Border principles",
          items: [
            { text: "Border", link: "/foundations/border" },
          ],
        },
        {
          text: "Border tokens",
          items: [
            { text: "Border width", link: "/foundations/border/border-width-tokens" },
            { text: "Border radius", link: "/foundations/border/border-radius-tokens" },
          ],
        },
        {
          text: "Border utilities",
          items: [
            { text: "Border radius", link: "/foundations/border/border-radius" },
            { text: "Border width", link: "/foundations/border/border-width" },
          ],
        },
      ],
    },
    {
      text: "Colour",
      items: [
        {
          text: "Colour principles",
          items: [
            { text: "Our colours", link: "/foundations/colour/our-colours" },
            { text: "Colour system", link: "/foundations/colour/colour-system" },
            { text: "Using colour", link: "/foundations/colour/using-colour" },
            { text: "Best practices", link: "/foundations/colour/best-practices" },
          ],
        },
        {
          text: "Colour tokens",
          items: [
            { text: "Product colour", link: "/foundations/colour/product-colour" },
            { text: "Semantic colour", link: "/foundations/colour/semantic-colour" },
            { text: "Primitive colour", link: "/foundations/colour/primitive-colour" },
          ],
        },
        {
          text: "Colour utilities",
          items: [
            { text: "Background colour", link: "/foundations/colour/background-colour" },
            { text: "Border colour", link: "/foundations/colour/border-colour" },
            { text: "Text colour", link: "/foundations/colour/text-colour" },
          ],
        },
      ],
    },
    {
      text: "Elevation",
      items: [
        {
          text: "Elevation principles",
          items: [
            { text: "Elevation principle", link: "/foundations/elevation/elevation-principle" },
          ],
        },
        {
          text: "Elevation tokens",
          items: [
            { text: "Surface elevation", link: "/foundations/elevation/surface-elevation" },
            { text: "Edge elevation", link: "/foundations/elevation/edge-elevation" },
          ],
        },
        {
          text: "Elevation utilities",
          items: [
            { text: "Surface elevation", link: "/foundations/elevation/surface-elevation-utilities" },
            { text: "Edge elevation", link: "/foundations/elevation/edge-elevation-utilities" },
          ],
        },
      ],
    },
    {
      text: "Iconography",
      items: [
        {
          text: "Iconography principles",
          items: [
            { text: "Iconography principles", link: "/foundations/iconography/iconography-principles" },
            { text: "Iconography characteristics", link: "/foundations/iconography/iconography-characteristics" },
          ],
        },
        {
          text: "Iconography assets",
          items: [
            { text: "Icon library", link: "/foundations/iconography/icon-library" },
          ],
        },
        {
          text: "Icon size",
          items: [
            { text: "Icon size", link: "/foundations/iconography/icon-tokens" },
          ],
        },
      ],
    },
    {
      text: "Typography",
      items: [
        {
          text: "Typography principles",
          items: [
            { text: "Our typography", link: "/foundations/typography/our-typography" },
            { text: "Typeface", link: "/foundations/typography/typeface" },
            { text: "Type system", link: "/foundations/typography/type-system" },
            { text: "Type pairing", link: "/foundations/typography/type-pairing" },
          ],
        },
        {
          text: "Typography styles",
          items: [
            { text: "Introduction", link: "/foundations/typography/typography-style" },
            { text: "Display", link: "/foundations/typography/display" },
            { text: "Heading", link: "/foundations/typography/heading" },
            { text: "Subtitle", link: "/foundations/typography/subtitle" },
            { text: "Paragraph body", link: "/foundations/typography/paragraph-body" },
            { text: "Caption", link: "/foundations/typography/caption" },
            { text: "Label", link: "/foundations/typography/label" },
            { text: "Link", link: "/foundations/typography/link" },
            { text: "List", link: "/foundations/typography/list" },
            { text: "Overline", link: "/foundations/typography/overline" },
          ],
        },
        {
          text: "Typography tokens",
          items: [
            { text: "Font family", link: "/foundations/typography/font-family" },
            { text: "Font size", link: "/foundations/typography/typography-tokens" },
            { text: "Font weight", link: "/foundations/typography/font-weight-tokens" },
            { text: "Letter spacing", link: "/foundations/typography/letter-spacing-tokens" },
            { text: "Line height", link: "/foundations/typography/line-height-tokens" },
            { text: "Paragraph spacing", link: "/foundations/typography/paragraph-spacing" },
            { text: "Text decoration", link: "/foundations/typography/text-decoration" },
            { text: "Text transform", link: "/foundations/typography/text-transform" },
            { text: "Responsive", link: "/foundations/typography/responsive" },
          ],
        },
        {
          text: "Typography utilities",
          items: [
            { text: "Font size", link: "/foundations/typography/font-size" },
            { text: "Font weight", link: "/foundations/typography/font-weight" },
            { text: "Letter spacing", link: "/foundations/typography/letter-spacing" },
            { text: "Line height", link: "/foundations/typography/line-height" },
          ],
        },
      ],
    },
    {
      text: "Layout",
      items: [
        {
          text: "Layout principles",
          items: [
            { text: "Layout principle", link: "/foundations/layout/layout-principle" },
          ],
        },
        {
          text: "Layout system",
          items: [
            { text: "Breakpoint", link: "/foundations/layout/breakpoint" },
            { text: "Responsive grid", link: "/foundations/layout/responsive-grid" },
          ],
        },
      ],
    },
    {
      text: "Spacing",
      items: [
        {
          text: "Spacing principles",
          items: [
            { text: "Spacing principle", link: "/foundations/spacing" },
          ],
        },
        {
          text: "Spacing tokens and utilities",
          items: [
            { text: "Spacing token", link: "/foundations/spacing/spacing-tokens" },
          ],
        },
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
      text: "Setup & workflows",
      items: [
        { text: "LLMs.txt", link: "/ai/llm-txt" },
        { text: "Agent skills", link: "/ai/agent-skills" },
        { text: "MCP server", link: "/ai/mcp-server" },
        { text: "Prompt tips", link: "/ai/prompt-tips" },
        { text: "User journey map", link: "/ai/user-journey" },
      ],
    },
  ],
};

export default defineConfig(config);
