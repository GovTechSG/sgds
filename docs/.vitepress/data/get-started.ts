export type GetStartedLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type GetStartedListItem = {
  title: string;
  description: string;
  descriptionHtml?: string;
};

export type GetStartedCodeStep = {
  description: string;
  code: string;
  lang?: string;
  filename?: string;
};

export type GetStartedCodeStepGroup = {
  title: string;
  steps: GetStartedCodeStep[];
};

export type GetStartedCodeTab = {
  label: string;
  code?: string;
  lang?: string;
  steps?: GetStartedCodeStep[];
  stepGroups?: GetStartedCodeStepGroup[];
  message?: string;
  messageLink?: { label: string; href: string };
};

export type GetStartedCodeBlock = {
  code: string;
  lang?: string;
  filename?: string;
};

export type GetStartedDemoExample = {
  title: string;
  description: string;
  tone?: "do" | "avoid";
  kind: "alert" | "button" | "empty-state" | "text";
  demoTitle: string;
  demoText: string;
  demoButtonLabel?: string;
  alertVariant?: "success" | "danger" | "info" | "warning";
};

export type GetStartedCopyPattern = {
  title: string;
  description: string;
  examples: GetStartedDemoExample[];
};

export type GetStartedSection = {
  title: string;
  headingLevel?: "h2" | "h3" | "h4";
  contentGap?: string;
  eyebrow?: string;
  description?: string;
  descriptionHtml?: string;
  footerHtml?: string;
  paragraphs?: string[];
  orderedItems?: GetStartedListItem[];
  unorderedItems?: GetStartedListItem[];
  subsections?: GetStartedListItem[];
  subsectionGap?: string;
  demoExamples?: GetStartedDemoExample[];
  copyPatterns?: GetStartedCopyPattern[];
  links?: GetStartedLink[];
  video?: boolean;
  codeTabs?: GetStartedCodeTab[];
  codeTabsShowLineNumbers?: boolean;
  codeBlock?: GetStartedCodeBlock;
};

export type GetStartedTableRow = {
  feature: string;
  change: string;
};

export type GetStartedPagerLink = {
  label: string;
  title: string;
  href: string;
  direction: "previous" | "next";
};

export type GetStartedHeaderLink = {
  label: string;
  href: string;
  path: string;
};

export type GetStartedPageData = {
  key: string;
  title: string;
  description?: string;
  intro?: string[];
  headerLinks?: GetStartedHeaderLink[];
  sectionGap?: string;
  sections?: GetStartedSection[];
  reasons?: GetStartedListItem[];
  table?: {
    title: string;
    description: string;
    rows: GetStartedTableRow[];
  };
  pager?: GetStartedPagerLink[];
};

export type GetStartedDesignTab = {
  key: string;
  label: string;
  page: GetStartedPageData;
};

export type GetStartedNavItem = {
  label: string;
  href: string;
  badge?: string;
};

export const getStartedNavItems: readonly GetStartedNavItem[] = [
  { label: "About us", href: "/get-started/about-sgds" },
  { label: "Design", href: "/get-started/design" },
  { label: "Develop", href: "/get-started/develop" },
  { label: "Content", href: "/get-started/content" },
];

export const getStartedOverview: GetStartedPageData = {
  key: "overview",
  title: "Get started",
  intro: [
    "SGDS v3 is the latest version of the Singapore Government Design System. It provides reusable components, design tokens, and shared foundations so government teams can build trusted digital services faster.",
    "Your team can spend less time on common UI problems and more time on what matters: the citizen experience.",
  ],
  reasons: [
    {
      title: "Move faster",
      description: "Use ready-made templates, blocks, and SGDS components instead of building common UI from scratch.",
    },
    {
      title: "Stay consistent",
      description: "Shared design tokens, typography, and colour scales keep all .gov.sg services recognisable as one government.",
    },
    {
      title: "Accessibility built in",
      description: "Every component ships with keyboard navigation, ARIA attributes, and screen-reader support. Your team does not need to add these manually.",
    },
    {
      title: "Design to code in sync",
      description: "The same token model supports both design and code, which reduces manual translation between Figma and implementation.",
    },
  ],
  table: {
    title: "What is new in version 3?",
    description: "We rebuilt the system from the ground up to support modern product development.",
    rows: [
      {
        feature: "Design tokens",
        change: "A scalable architecture for colour, spacing, and typography to ensure consistency across platforms.",
      },
      {
        feature: "Rebuilt components",
        change: "Enhanced flexibility and logic, making it easier to adapt components to specific service needs.",
      },
      {
        feature: "Advanced theming",
        change: "Improved support for sub-brands and agency-specific requirements while maintaining a One Government feel.",
      },
      {
        feature: "Modern workflows",
        change: "Tighter alignment between Figma libraries and code repositories for faster implementation.",
      },
    ],
  },
  pager: [
    { label: "Next", title: "About us", href: "/get-started/about-sgds", direction: "next" },
  ],
};

export const aboutSgdsPage: GetStartedPageData = {
  key: "about-sgds",
  title: "About us",
  sections: [
    {
      title: "Our vision",
      description: "To create a unified and accessible design foundation that enables government teams to build trusted digital services with clarity, consistency, and confidence.",
      video: true,
    },
    {
      title: "Our philosophy",
      eyebrow: "Designing government experiences people can trust",
      paragraphs: [
        "At SGDS, we build trust by making government feel like one entity. We design for connectivity so journeys across agencies are seamless, and we prioritise familiarity to remove friction for every citizen. By championing consistency and accessibility, we ensure our services are predictable and inclusive by default.",
        "Our shared foundations go beyond pixels. They provide a coherent, dependable experience that allows us to stop reinventing the wheel and focus on what matters most: the citizen.",
      ],
    },
    {
      title: "Our principles",
      contentGap: "sgds:gap-layout-sm",
      subsectionGap: "sgds:gap-layout-sm",
      subsections: [
        { title: "Consistency builds trust", description: "Familiar patterns create reliable experiences across government services." },
        { title: "Accessibility by default", description: "Accessibility is a shared responsibility built into every component and pattern from the start." },
        { title: "Solve once, benefit all", description: "Shared foundations reduce duplication and help teams focus on unique citizen needs." },
        { title: "Flexibility within standards", description: "Teams can adapt experiences to their service and operational context without breaking the ecosystem." },
        { title: "Governed for scale", description: "Design systems are living infrastructure that must evolve with changing needs." },
      ],
    },
    {
      title: "Our values",
      contentGap: "sgds:gap-layout-sm",
      description: "Our values guide how we build SGDS: creating a design system that is foundational, cohesive, and empowering for teams across government.",
      subsectionGap: "sgds:gap-layout-sm",
      subsections: [
        { title: "Foundational", description: "We solve common problems and provide strong foundations for teams to build on." },
        { title: "Cohesive", description: "Our foundations, patterns, and components work together to create recognisably government experiences." },
        { title: "Empowering, for everyone", description: "We design SGDS to support everyone who relies on it, regardless of discipline, experience, or skill level." },
      ],
    },
  ],
  pager: [
    { label: "Previous", title: "Get started", href: "/get-started/", direction: "previous" },
    { label: "Next", title: "Design", href: "/get-started/design", direction: "next" },
  ],
};

export const developPage: GetStartedPageData = {
  key: "develop",
  title: "Develop",
  description: "Install SGDS, use the component library, and build interfaces with shared foundations.",
  sectionGap: "sgds:gap-sm",
  headerLinks: [
    { label: "GitHub", href: "https://github.com/GovTechSG/sgds-web-component", path: "GovTechSG/sgds-web-component" },
    { label: "Storybook", href: "https://webcomponent.designsystem.tech.gov.sg/", path: "webcomponent.designsystem.tech.gov.sg" },
  ],
  sections: [
    {
      title: "Install SGDS",
      description: "Add the SGDS web component package to your project.",
      codeTabs: [
        { label: "npm", code: "npm install @govtechsg/sgds-web-component", lang: "bash" },
        { label: "pnpm", code: "pnpm add @govtechsg/sgds-web-component", lang: "bash" },
        { label: "yarn", code: "yarn add @govtechsg/sgds-web-component", lang: "bash" },
        { label: "bun", code: "bun add @govtechsg/sgds-web-component", lang: "bash" },
      ],
    },
    {
      title: "Set the font",
      description: "SGDS foundation styles use Inter by default. Add the font link in your HTML head before importing SGDS CSS.",
      codeBlock: {
        code: `<head>\n  <link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n  <link\n    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=swap"\n    rel="stylesheet"\n  />\n</head>`,
        lang: "html",
        filename: "index.html",
      },
    },
    {
      title: "Set up Tailwind CSS",
      description: "SGDS utility classes require Tailwind CSS v4. Follow the official Tailwind installation guide for your framework.",
      links: [{ label: "Tailwind CSS framework guides", href: "https://tailwindcss.com/docs/installation/framework-guides" }],
    },
    {
      title: "Import styles",
      description: "Import the theme tokens, foundation styles, and utility classes in the CSS file processed by your build tool. The order matters: theme tokens must come first.",
      codeBlock: {
        code: `/* 1. Theme tokens */\n@import "@govtechsg/sgds-web-component/themes/day.css";\n/* Optional: add only if your app supports night mode */\n@import "@govtechsg/sgds-web-component/themes/night.css";\n\n/* 2. Foundation styles */\n@import "@govtechsg/sgds-web-component/css/sgds.css";\n\n/* 3. SGDS utility classes. This file must be processed by Tailwind v4. */\n@import "@govtechsg/sgds-web-component/css/utility.css";`,
        lang: "css",
        filename: "globals.css",
      },
    },
    {
      title: "Import the component library",
      description: "Import the library once at your app entry point. This registers all <sgds-*> custom elements globally.",
      codeTabsShowLineNumbers: true,
      codeTabs: [
        {
          label: "React",
          stepGroups: [
            {
              title: "React 19 and above",
              steps: [
                { description: "Import the library once at your app entry point.", code: `import "@govtechsg/sgds-web-component";`, lang: "ts", filename: "src/main.tsx" },
                { description: "Use web component tags directly in any component.", code: `const App = () => {\n  return (\n    <form>\n      <sgds-input label="Full name" name="fullName"></sgds-input>\n      <sgds-button type="submit">Submit</sgds-button>\n    </form>\n  );\n};\nexport default App;`, lang: "tsx", filename: "src/App.tsx" },
              ],
            },
            {
              title: "React 18 and below",
              steps: [
                { description: "Use the React wrapper components for proper event handling.", code: `import { SgdsButton, SgdsInput } from "@govtechsg/sgds-web-component/react";`, lang: "ts", filename: "src/App.tsx" },
                { description: "Use the wrapper components in JSX.", code: `import { SgdsButton, SgdsInput } from "@govtechsg/sgds-web-component/react";\n\nconst App = () => {\n  return (\n    <form>\n      <SgdsInput label="Full name" name="fullName" />\n      <SgdsButton type="submit">Submit</SgdsButton>\n    </form>\n  );\n};\nexport default App;`, lang: "tsx", filename: "src/App.tsx" },
              ],
            },
            {
              title: "TypeScript support",
              steps: [
                { description: "Add a type declaration file at your project root to enable IntelliSense for all component props and typed event handlers.", code: `import "@govtechsg/sgds-web-component/types/react";`, lang: "ts", filename: "types.d.ts" },
                { description: "Ensure the file is included by your tsconfig.json.", code: `{\n  "include": ["types.d.ts", "**/*.ts", "**/*.tsx"]\n}`, lang: "json", filename: "tsconfig.json" },
              ],
            },
          ],
        },
        {
          label: "Vue",
          steps: [
            { description: "Tell Vue to treat sgds-* tags as custom elements.", code: `import { defineConfig } from "vite";\nimport vue from "@vitejs/plugin-vue";\n\nexport default defineConfig({\n  plugins: [\n    vue({\n      template: {\n        compilerOptions: {\n          isCustomElement: (tag) => tag.startsWith("sgds-"),\n        },\n      },\n    }),\n  ],\n});`, lang: "ts", filename: "vite.config.ts" },
            { description: "Import the library in your app entry.", code: `import "@govtechsg/sgds-web-component";`, lang: "ts", filename: "src/main.ts" },
          ],
        },
        {
          label: "Angular",
          steps: [
            { description: "Add CUSTOM_ELEMENTS_SCHEMA to your standalone component.", code: `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";\n\n@Component({\n  selector: "app-root",\n  templateUrl: "./app.component.html",\n  schemas: [CUSTOM_ELEMENTS_SCHEMA]\n})\nexport class AppComponent {}`, lang: "ts", filename: "app.component.ts" },
            { description: "Import the library in your root component to register all custom elements globally.", code: `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";\nimport "@govtechsg/sgds-web-component";\n\n@Component({\n  selector: "app-root",\n  templateUrl: "./app.component.html",\n  schemas: [CUSTOM_ELEMENTS_SCHEMA]\n})\nexport class AppComponent {}`, lang: "ts", filename: "app.component.ts" },
          ],
        },
        {
          label: "Next.js",
          stepGroups: [
            {
              title: "Setup",
              steps: [
                { description: "Create a client-side library loader.", code: `"use client";\nimport { useEffect } from "react";\n\nexport default function SgdsLoader() {\n  useEffect(() => {\n    import("@govtechsg/sgds-web-component");\n  }, []);\n  return null;\n}`, lang: "ts", filename: "src/app/sgds.tsx" },
                { description: "Import the loader in your root layout.", code: `import SgdsLoader from "./sgds";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <head>\n        <SgdsLoader />\n      </head>\n      <body>{children}</body>\n    </html>\n  );\n}`, lang: "tsx", filename: "src/app/layout.tsx" },
                { description: "Use SGDS components with suppressHydrationWarning where server rendering may differ from client registration.", code: `<sgds-masthead suppressHydrationWarning></sgds-masthead>`, lang: "tsx", filename: "src/app/page.tsx" },
                { description: "For SGDS custom events in Next.js, bind listeners in a client component after hydration.", code: `"use client";\nimport { useEffect, useRef } from "react";\n\nexport default function SgdsInputExample() {\n  const inputRef = useRef<HTMLElement | null>(null);\n\n  useEffect(() => {\n    const input = inputRef.current;\n    if (!input) return;\n\n    const handleInput = (event: Event) => console.log(event);\n    input.addEventListener("sgds-input", handleInput);\n    return () => input.removeEventListener("sgds-input", handleInput);\n  }, []);\n\n  return <sgds-input ref={inputRef} suppressHydrationWarning></sgds-input>;\n}`, lang: "tsx", filename: "src/app/SgdsInputExample.tsx" },
              ],
            },
            {
              title: "TypeScript support",
              steps: [
                { description: "Add a type declaration file at your project root to enable IntelliSense for all component props and typed event handlers.", code: `import "@govtechsg/sgds-web-component/types/react";`, lang: "ts", filename: "types.d.ts" },
                { description: "Ensure the file is included by your tsconfig.json.", code: `{\n  "include": ["types.d.ts", "**/*.ts", "**/*.tsx"]\n}`, lang: "json", filename: "tsconfig.json" },
              ],
            },
          ],
        },
        {
          label: "Others",
          message: "Cannot find your frontend framework integration?",
          messageLink: { label: "Raise an issue to propose for more integration guides", href: "https://github.com/GovTechSG/sgds-web-component/issues" },
        },
      ],
    },
    {
      title: "Use an SGDS app layout",
      description: "Every SGDS app needs the mandatory page chrome: masthead, main navigation, content container, and footer. Choose the container by app type.",
      codeTabs: [
        {
          label: "Simple app",
          code: `<div>\n  <sgds-masthead fluid></sgds-masthead>\n  <sgds-mainnav fluid>\n    <strong slot="brand">My app</strong>\n  </sgds-mainnav>\n</div>\n<div class="sgds:flex sgds:flex-col sgds:w-full">\n  <div class="sgds-container sgds:py-2-xl">\n    <!-- Page content -->\n  </div>\n  <sgds-footer></sgds-footer>\n</div>`,
          lang: "html",
        },
        {
          label: "Sidebar app",
          code: `<div class="sgds:sticky sgds:top-0">\n  <sgds-masthead fluid></sgds-masthead>\n  <sgds-mainnav fluid>\n    <strong slot="brand">My app</strong>\n  </sgds-mainnav>\n</div>\n<div class="sgds:flex sgds:flex-row">\n  <div class="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:border-r sgds:border-muted">\n    <!-- Sidebar navigation -->\n  </div>\n  <div class="sgds:flex sgds:flex-col sgds:w-full">\n    <div class="sgds-container-sidebar sgds:py-2-xl">\n      <!-- Page content -->\n    </div>\n    <sgds-footer></sgds-footer>\n  </div>\n</div>`,
          lang: "html",
        },
      ],
      links: [{ label: "Read layout foundations", href: "/foundations/layout" }],
    },
    {
      title: "Use SGDS utilities",
      description: "Apply SGDS utility classes for spacing, layout, typography, colour, and responsive behaviour instead of custom CSS.",
      links: [{ label: "Explore in Storybook", href: "https://webcomponent.designsystem.tech.gov.sg/?path=/docs/utilities-introduction--docs", external: true }],
    },
    {
      title: "Start from shared building blocks",
      description: "Use templates, blocks, and components when you need to move from product intent to working UI quickly.",
      contentGap: "sgds:gap-layout-lg",
      subsections: [
        { title: "Templates", description: "Use full-page layouts for common service journeys and admin workflows." },
        { title: "Blocks", description: "Compose reusable sections such as headers, forms, filters, and stats." },
        { title: "Components", description: "Use SGDS components for interaction patterns such as buttons, tabs, forms, cards, and tables." },
      ],
      links: [
        { label: "Explore templates", href: "/templates/" },
        { label: "Browse blocks", href: "/blocks/" },
        { label: "View components", href: "/components/accordion" },
      ],
    },
    {
      title: "Use SGDS AI",
      description:
        "Install the SGDS agent skills when using an AI coding assistant. Ask the assistant to read `sgds-workflow` first, then `sgds-getting-started` for new apps before moving into components, utilities, layouts, templates, theming, forms, data visualisation, or writing guidance.",
      links: [{ label: "Explore SGDS AI", href: "/ai/introduction" }],
    },
  ],
  pager: [
    { label: "Previous", title: "Design", href: "/get-started/design", direction: "previous" },
    { label: "Next", title: "Content", href: "/get-started/content", direction: "next" },
  ],
};

const sharedDesignSections: GetStartedSection[] = [
  {
    title: "Explore design foundations and components",
    description: "Build harmonious digital experiences using our standardised building blocks.",
    subsections: [
      {
        title: "Foundations",
        description: "The core building blocks of our system: colours, typography, spacing, and tokens to ensure consistency and scalability.",
      },
      {
        title: "Components",
        description: "Reusable UI elements designed to meet specific interaction needs and create consistent user experiences.",
      },
    ],
    links: [
      { label: "Explore foundations", href: "/foundations/" },
      { label: "View component gallery", href: "/components/accordion" },
    ],
  },
  {
    title: "Design tokens",
    description: "Understand how to use design tokens to bridge the gap between design and code.",
    subsections: [
      {
        title: "Use tokens in design",
        description: "Learn how to apply tokens within Figma and preview how color and spacing changes impact your apps.",
      },
    ],
    links: [
      { label: "Read token documentation", href: "/foundations/design-tokens" },
    ],
  },
];

export const designTabs: GetStartedDesignTab[] = [
  {
    key: "govtechies",
    label: "For GovTechies",
    page: {
      key: "design-govtechies",
      title: "Design",
      description: "Explore design guidelines, access Figma libraries, and use plugins to build GovTech products.",
      sections: [
        {
          title: "Set up your Figma workspace",
          description: "If you have a GovTech Figma Enterprise account, enable the SGDS v3 libraries to start designing immediately.",
          orderedItems: [
            { title: "Open", description: "Open any Figma file." },
            { title: "Navigate", description: "Go to the Assets tab and click the Library icon." },
            { title: "Search", description: "Search for SGDS v3." },
            { title: "Add", description: "Add the libraries required for your project." },
          ],
        },
        {
          title: "Need an account?",
          headingLevel: "h4",
          description: "GovTech employees require a corporate email address to access private libraries.",
          links: [{ label: "Request a Figma licence on GovTech", href: "#" }],
        },
        ...sharedDesignSections,
      ],
      pager: [
        { label: "Previous", title: "About us", href: "/get-started/about-sgds", direction: "previous" },
        { label: "Next", title: "Develop", href: "/get-started/develop", direction: "next" },
      ],
    },
  },
  {
    key: "agencies",
    label: "For agencies and partners",
    page: {
      key: "design-agencies",
      title: "Design",
      description: "Explore design guidelines, and access Figma libraries and plugins.",
      sections: [
        {
          title: "Get started with SGDS v3",
          description: "Agencies and vendors can start their design process using our public UI kits.",
          orderedItems: [
            {
              title: "Access the UI kit",
              description: "Visit the SGDS Figma Community Page.",
              descriptionHtml:
                'Visit the <a href="https://www.figma.com/community/search?resource_type=mixed&sort_by=relevancy&query=SGDS" target="_blank" rel="noopener noreferrer">SGDS Figma Community Page</a>.',
            },
            {
              title: "Duplicate to Drafts",
              description: "Copy the latest SGDS v3 Web UI Kit to your own workspace.",
              descriptionHtml: "Copy the latest <strong>SGDS v3 Web UI Kit</strong> to your own workspace.",
            },
            { title: "Stay updated", description: "Follow the community page to receive notifications on version updates and bug fixes." },
          ],
        },
        {
          title: "Compliance requirement",
          headingLevel: "h4",
          description: "All .gov.sg digital services must adopt the Official Government Banner and Global Footer.",
          descriptionHtml:
            'All .gov.sg digital services must adopt the <a href="/components/masthead">Official Government Banner</a> and <a href="/components/footer">Global Footer</a>.',
        },
        ...sharedDesignSections,
      ],
      pager: [
        { label: "Previous", title: "About us", href: "/get-started/about-sgds", direction: "previous" },
        { label: "Next", title: "Develop", href: "/get-started/develop", direction: "next" },
      ],
    },
  },
];

export const contentPage: GetStartedPageData = {
  key: "content",
  title: "Content",
  description:
    "Write clear, consistent copy for government digital services using SGDS content standards.",
  sectionGap: "sgds:gap-layout-sm",
  sections: [
    {
      title: "Why content standards matter",
      paragraphs: [
        "Every label, error message, and heading is part of the user experience. Inconsistent or unclear copy erodes trust and slows users down.",
        "SGDS content standards give writers, designers, and developers a shared set of rules. When everyone follows the same conventions, government services feel like one organisation.",
      ],
    },
    {
      title: "Writing principles",
      description:
        "Four principles guide all content across SGDS products.",
      subsectionGap: "sgds:gap-layout-sm",
      subsections: [
        {
          title: "Clear",
          description:
            "Say exactly what you mean in as few words as needed. Remove filler phrases and unnecessary qualifiers.",
        },
        {
          title: "Direct",
          description:
            "Address the reader as \"you\" and use active voice. Put the most relevant information first.",
        },
        {
          title: "Respectful",
          description:
            "Treat readers as capable adults. Do not over-explain or use patronising language.",
        },
        {
          title: "Purposeful",
          description:
            "Every sentence earns its place. If a word does not help the reader act, remove it.",
        },
      ],
    },
    {
      title: "Rules to apply first",
      description:
        "These six rules have the highest impact on readability and consistency across government services.",
      orderedItems: [
        {
          title: "Use UK English spelling",
          description:
            "Write \"colour\", \"organisation\", and \"recognise\". Set your spell checker to en-GB.",
        },
        {
          title: "Use sentence case for all headings",
          description:
            "Capitalise the first word and proper nouns only. Write \"Submit your application\", not \"Submit Your Application\".",
        },
        {
          title: "Do not use contractions",
          description:
            "Write \"do not\" instead of \"don't\" and \"you will\" instead of \"you'll\". This applies to all UI copy.",
        },
        {
          title: "Write in active voice",
          description:
            "The subject performs the action. Write \"The system sends a confirmation\" instead of \"A confirmation is sent\".",
        },
        {
          title: "Use plain language",
          description:
            "Choose short, common words. Write \"use\" instead of \"utilise\", \"help\" instead of \"facilitate\", and \"start\" instead of \"commence\".",
        },
        {
          title: "Do not use em dashes",
          description:
            "Use a colon, comma pair, or a new sentence instead. Em dashes add visual noise and can be missed by screen readers.",
        },
      ],
    },
    {
      title: "Voice and tone",
      description:
        "Write as a trusted, competent partner. SGDS content should be clear, direct, respectful, and purposeful.",
      unorderedItems: [
        {
          title: "Lead with the action",
          description:
            "Put the key point in the first sentence. Tell users what to do before explaining why.",
        },
        {
          title: "Address the reader as you",
          description:
            "Write directly to the person using the service. Use active voice so the subject performs the action.",
        },
        {
          title: "Keep sentences short",
          description:
            "Aim for sentences under 20 words. If a sentence needs a clarifying clause, split it into two.",
        },
        {
          title: "Keep one idea per paragraph",
          description:
            "Short paragraphs help users scan and help screen-reader users move through content.",
        },
      ],
    },
    {
      title: "Language to avoid",
      description:
        "Remove words that slow users down or make government services sound vague.",
      unorderedItems: [
        {
          title: "Corporate jargon",
          description:
            "Avoid words such as \"leverage\", \"synergise\", \"holistic approach\", \"innovative\", and \"cutting-edge\".",
        },
        {
          title: "Subjective adjectives",
          description:
            "Avoid words such as \"important\", \"easy\", \"simple\", and \"quick\". Let the service prove those qualities.",
        },
        {
          title: "Filler phrases",
          description:
            "Remove phrases such as \"please note that\", \"it should be noted\", \"in order to\", and \"at this point in time\".",
        },
        {
          title: "Please in instructions",
          description:
            "Write \"Submit the form\" instead of \"Please submit the form\". Instructions should be clear without softening.",
        },
        {
          title: "Contrastive negation",
          description:
            "Avoid the pattern \"not X, but Y\". Write the positive statement directly instead.",
        },
      ],
    },
    {
      title: "Spelling and capitalisation",
      description:
        "Use consistent spelling and casing across headings, labels, buttons, and body copy.",
      unorderedItems: [
        {
          title: "Use UK English",
          description:
            "Write \"colour\", \"centre\", \"programme\", \"organisation\", \"recognise\", \"analyse\", \"catalogue\", \"licence\", and \"fulfil\".",
        },
        {
          title: "Use sentence case",
          description:
            "Capitalise the first word and proper nouns only. This applies to headings, labels, buttons, navigation items, and error messages.",
        },
        {
          title: "Capitalise proper nouns and acronyms",
          description:
            "Use established casing for names such as GovTech, Singpass, CorpPass, MyInfo, API, ICT, UI, UX, PDF, and URL.",
        },
        {
          title: "Do not capitalise descriptive job titles",
          description:
            "Write \"the director approved the request\" unless the title appears directly before a name.",
        },
      ],
    },
    {
      title: "Grammar and punctuation",
      description:
        "Use grammar and punctuation rules that make copy easier to scan and read aloud.",
      unorderedItems: [
        {
          title: "Use active voice",
          description:
            "Write \"The system sends a confirmation email\" instead of \"A confirmation email is sent by the system\".",
        },
        {
          title: "Use the Oxford comma",
          description:
            "Use a comma before the final item in lists of three or more items: \"NRIC, passport, and proof of address\".",
        },
        {
          title: "Do not use em dashes",
          description:
            "Use a colon, comma pair, or a new sentence instead. Do not use an en dash as a substitute.",
        },
        {
          title: "Use hyphens and en dashes correctly",
          description:
            "Use hyphens for compound modifiers such as \"user-friendly\". Use en dashes only for ranges such as \"pages 10–15\".",
        },
        {
          title: "Do not use apostrophes for plurals",
          description:
            "Write \"APIs\" and \"PDFs\", not \"API's\" or \"PDF's\".",
        },
      ],
    },
    {
      title: "Numbers, dates, and modal verbs",
      description:
        "Write quantities, dates, times, and obligation words consistently.",
      unorderedItems: [
        {
          title: "Numbers",
          description:
            "Spell out numbers one to nine. Use numerals for 10 and above.",
        },
        {
          title: "Measurements and amounts",
          description:
            "Always use numerals for percentages, currency, measurements, and version numbers, such as 5%, $10, 3 MB, and version 2.",
        },
        {
          title: "Dates and times",
          description:
            "Write dates as \"1 January 2025\" and times as \"9am\" or \"3:30pm\". Do not use ordinal suffixes.",
        },
        {
          title: "Must",
          description:
            "Use \"must\" only for legal obligations. Example: \"You must submit the form by 31 January.\"",
        },
        {
          title: "Need to",
          description:
            "Use \"need to\" for administrative steps. Example: \"You need to verify your email before signing in.\"",
        },
        {
          title: "Should and may",
          description:
            "Use \"should\" for recommendations and \"may\" for optional actions.",
        },
      ],
    },
    {
      title: "UI copy patterns",
      description:
        "Apply these patterns when writing copy for SGDS components.",
      contentGap: "sgds:gap-layout-lg",
      copyPatterns: [
        {
          title: "Buttons",
          description:
            "Use verb phrases: \"Submit form\", \"Download report\". Do not use vague labels such as \"Click here\" or \"OK\".",
          examples: [
            {
              title: "Specific button label",
              description:
                "Use a verb phrase that tells users what happens next.",
              tone: "do",
              kind: "button",
              demoTitle: "Button label",
              demoText: "Submit application",
            },
            {
              title: "Vague button label",
              description:
                "Avoid generic labels that do not explain the result of the action.",
              tone: "avoid",
              kind: "button",
              demoTitle: "Button label",
              demoText: "Click here",
            },
          ],
        },
        {
          title: "Error messages",
          description:
            "State what happened and what the user should do next. Write \"The file is too large. Upload a file under 5 MB.\" Do not blame the user.",
          examples: [
            {
              title: "Helpful error text",
              description:
                "Give the user a clear next step instead of repeating that something failed.",
              tone: "do",
              kind: "alert",
              alertVariant: "danger",
              demoTitle: "File upload failed",
              demoText: "The file is too large. Upload a file under 5 MB.",
            },
            {
              title: "Blaming error text",
              description:
                "Avoid language that makes the user feel they did something wrong.",
              tone: "avoid",
              kind: "alert",
              alertVariant: "danger",
              demoTitle: "File upload failed",
              demoText: "You uploaded a file that is too large. Try again.",
            },
          ],
        },
        {
          title: "Empty states",
          description:
            "Explain why the space is empty and offer a next step. Write \"No applications yet. Start your first application.\"",
          examples: [
            {
              title: "Actionable empty state",
              description:
                "Explain the empty space and offer a useful next step.",
              tone: "do",
              kind: "empty-state",
              demoTitle: "No applications yet",
              demoText: "Start your first application to see it here.",
              demoButtonLabel: "Start application",
            },
            {
              title: "Dead-end empty state",
              description:
                "Avoid empty states that do not explain what happened or what users can do.",
              tone: "avoid",
              kind: "empty-state",
              demoTitle: "Nothing to show",
              demoText: "There is no data.",
            },
          ],
        },
        {
          title: "Tooltips and helper text",
          description:
            "Keep tooltips to one sentence. Helper text explains the format or constraint, not a restatement of the label.",
          examples: [
            {
              title: "Useful helper text",
              description:
                "Explain the required format or constraint.",
              tone: "do",
              kind: "text",
              demoTitle: "Helper text",
              demoText: "Use the email address linked to your Singpass account.",
            },
            {
              title: "Repeated helper text",
              description:
                "Avoid restating the label or adding filler.",
              tone: "avoid",
              kind: "text",
              demoTitle: "Helper text",
              demoText: "Enter your email address here.",
            },
          ],
        },
        {
          title: "Loading and status messages",
          description:
            "Use present progressive for loading: \"Saving changes…\". Confirm success with past tense: \"Changes saved.\"",
          examples: [
            {
              title: "Clear status message",
              description:
                "Use present progressive for loading and past tense for completed actions.",
              tone: "do",
              kind: "alert",
              alertVariant: "success",
              demoTitle: "Changes saved",
              demoText: "Your updates were saved successfully.",
            },
            {
              title: "Unclear status message",
              description:
                "Avoid vague messages that do not tell users what happened.",
              tone: "avoid",
              kind: "alert",
              alertVariant: "info",
              demoTitle: "Done",
              demoText: "Your request has been processed.",
            },
          ],
        },
      ],
    },
    {
      title: "Accessibility and structure",
      description:
        "Content decisions affect how screen-reader users navigate and understand a service.",
      unorderedItems: [
        {
          title: "Use descriptive link text",
          description:
            "Write link text that makes sense out of context, such as \"Download the annual report (PDF, 2 MB)\".",
        },
        {
          title: "Do not rely on colour alone",
          description:
            "Pair colour with text so users can understand status, errors, and warnings without relying on colour perception.",
        },
        {
          title: "Write functional alt text",
          description:
            "Describe the function of an image, such as \"GovTech logo\", instead of describing only its appearance.",
        },
        {
          title: "Use heading levels in order",
          description:
            "Use H1, H2, and H3 in sequence. Do not skip levels for visual styling.",
        },
        {
          title: "Use lists for related items",
          description:
            "Use lists for three or more related items. Lists are easier to scan than comma-separated text.",
        },
        {
          title: "Avoid directional instructions",
          description:
            "Do not write instructions that depend on visual position, such as \"see the section on the right\".",
        },
      ],
    },
    {
      title: "Use the SGDS writing skill",
      description:
        "When working with an AI assistant, ask it to read the SGDS writing skill before drafting or reviewing interface copy. The skill gives the assistant SGDS tone, UK spelling, sentence case, punctuation, plain language, UI copy patterns, and accessibility rules so generated content stays consistent.",
      links: [
        { label: "Set up SGDS agent skills", href: "/ai/skills" },
      ],
    },
  ],
  pager: [
    {
      label: "Previous",
      title: "Develop",
      href: "/get-started/develop",
      direction: "previous",
    },
  ],
};

export const getStartedPages = {
  overview: getStartedOverview,
  "about-sgds": aboutSgdsPage,
  develop: developPage,
  content: contentPage,
};
