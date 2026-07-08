import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import tailwindcss from "@tailwindcss/vite";
import { fileSort } from "./data/file-management";
import { foundationsSidebar } from "./data/foundations-sidebar";
import { blocksSidebar } from "./data/blocks-sidebar";
import { storyPosts } from "./data/stories";

const vitePressConfig = {
  sitemap: {
    hostname: "https://www.designsystem.tech.gov.sg",
  },
  lang: "en",
  title: "Singapore Government Design System",
  titleTemplate: ":title – Singapore Government Design System",
  description: "Unifying Government through Design and Code.",
  transformPageData(pageData) {
    const story = storyPosts.find((post) => pageData.relativePath === `stories/${post.key}.md`);
    if (!story) return;

    pageData.title = story.title;
    pageData.description = story.description;
  },
  cleanUrls: true,
  transformHtml(code) {
    code = code.replace(
      /(<body[^>]*>)/,
      `$1\n<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T6NDG85M" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>\n<!-- End Google Tag Manager (noscript) -->`
    );
    // Add accessible label to the VitePress app root so click-outside listeners
    // from web components don't trigger oobee-accessible-label violations.
    code = code.replace(
      '<div id="app">',
      '<div id="app" role="document" aria-label="Page content">'
    );
    return code;
  },
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
    [
      "script",
      {},
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T6NDG85M');`,
    ],
    [
      "script",
      {},
      `(function(){var t=localStorage.getItem('sgds-docs-theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('sgds-night-theme');})();`,
    ],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=optional",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=optional",
        media: "print",
        onload: "this.media='all'",
      },
    ],
    ["link", { rel: "preload", as: "image", type: "image/webp", href: "/landing/placeholder1.webp" }],
    ["link", { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    [
      "script",
      {
        defer: "",
        src:
          process.env.NODE_ENV === "production"
            ? "https://assets.wogaa.sg/scripts/wogaa.js"
            : "https://assets.dcube.cloud/scripts/wogaa.js",
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
    plugins: [
      tailwindcss(),
      {
        name: "storybook-proxy",
        configureServer(server) {
          // Main proxy for Storybook pages and assets loaded via /__storybook prefix.
          server.middlewares.use("/__storybook", async (req, res) => {
            const target = `https://www.webcomponent.designsystem.tech.gov.sg${req.url}`;
            try {
              const response = await fetch(target);
              res.statusCode = response.status;
              response.headers.forEach((value, key) => {
                const lower = key.toLowerCase();
                if (lower === "content-security-policy" || lower === "x-frame-options") return;
                if (lower === "transfer-encoding" || lower === "content-encoding") return;
                res.setHeader(key, value);
              });
              const body = Buffer.from(await response.arrayBuffer());
              res.end(body);
            } catch {
              res.statusCode = 502;
              res.end("Storybook proxy error");
            }
          });

          // Fallback proxy for root-relative assets (images, fonts) referenced
          // inside Storybook stories. These resolve against localhost:5173/ when
          // the iframe is loaded via /__storybook, so we intercept known patterns
          // and forward them to the Storybook CDN.
          const storybookAssetPatterns = /^\/(placeholder-sgds\.png|sb-common-assets\/|sb-addons\/|sb-manager\/|assets\/)/;
          server.middlewares.use(async (req, res, next) => {
            if (!req.url || !storybookAssetPatterns.test(req.url)) return next();
            const target = `https://www.webcomponent.designsystem.tech.gov.sg${req.url}`;
            try {
              const response = await fetch(target);
              if (!response.ok) return next();
              res.statusCode = response.status;
              response.headers.forEach((value, key) => {
                const lower = key.toLowerCase();
                if (lower === "transfer-encoding" || lower === "content-encoding") return;
                res.setHeader(key, value);
              });
              const body = Buffer.from(await response.arrayBuffer());
              res.end(body);
            } catch {
              next();
            }
          });
        },
      },
    ],
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
