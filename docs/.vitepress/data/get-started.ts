export type GetStartedLink = {
  label: string;
  href: string;
};

export type GetStartedListItem = {
  title: string;
  description: string;
};

export type GetStartedSection = {
  title: string;
  eyebrow?: string;
  description?: string;
  paragraphs?: string[];
  orderedItems?: GetStartedListItem[];
  subsections?: GetStartedListItem[];
  links?: GetStartedLink[];
  video?: boolean;
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

export type GetStartedPageData = {
  key: string;
  title: string;
  description?: string;
  intro?: string[];
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
  { label: "About SGDS", href: "/get-started/about-sgds" },
  { label: "Design", href: "/get-started/design" },
  { label: "Develop", href: "/get-started/develop" },
  { label: "Content", href: "", badge: "Coming soon" },
];

export const getStartedOverview: GetStartedPageData = {
  key: "overview",
  title: "Get Started",
  intro: [
    "SGDS v3 is the next evolution of the Singapore Government Design System. It is a shared foundation of principles, reusable components, and design tokens built to help teams deliver digital services with greater clarity, flexibility, and confidence.",
    "Rather than solving the same UI problems repeatedly, SGDS v3 allows your team to focus on what matters most: user needs and service experiences.",
  ],
  reasons: [
    {
      title: "Move faster",
      description: "Access a library of pre-built, production-ready components.",
    },
    {
      title: "Stay consistent",
      description: "Align with the unified visual language of the Singapore Government.",
    },
    {
      title: "Accessibility first",
      description: "Build inclusive experiences using components designed to meet government accessibility standards by default.",
    },
    {
      title: "Bridge the gap",
      description: "Shared design tokens ensure a smoother handoff between designers and engineers.",
    },
  ],
  table: {
    title: "What’s new in version 3?",
    description: "We’ve rebuilt the system from the ground up to support modern product development.",
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
    { label: "Next", title: "About SGDS", href: "/get-started/about-sgds", direction: "next" },
  ],
};

export const aboutSgdsPage: GetStartedPageData = {
  key: "about-sgds",
  title: "About the Singapore Government Design System",
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
        "At SGDS, we build trust by making government feel like one entity. We design for connectivity so journeys across agencies are seamless, and we prioritise familiarity to remove friction for every citizen. By championing consistency and accessibility, we ensure our services are not just predictable, but inclusive by default.",
        "Our shared foundations are not just about pixels. They provide a coherent, dependable experience that allows us to stop reinventing the wheel and focus on what matters most: the citizen.",
      ],
    },
    {
      title: "Our principles",
      subsections: [
        { title: "Consistency builds trust", description: "Familiar patterns create reliable experiences across government services." },
        { title: "Accessibility by default", description: "Accessibility is a shared responsibility, not a team-specific effort or afterthought." },
        { title: "Solve once, benefit all", description: "Shared foundations reduce duplication and help teams focus on unique citizen needs." },
        { title: "Flexibility within standards", description: "Teams can adapt experiences to their service and operational context without breaking the ecosystem." },
        { title: "Governed for scale", description: "Design systems are living infrastructure that must evolve with changing needs." },
      ],
    },
    {
      title: "Our values",
      description: "Our values guide how we build SGDS: creating a design system that is foundational, cohesive, and empowering for teams across government.",
      subsections: [
        { title: "Foundational", description: "We solve common problems and provide strong foundations for teams to build on." },
        { title: "Cohesive", description: "Our foundations, patterns, and components work together to create recognisably government experiences." },
        { title: "Empowering, for everyone", description: "We design SGDS to support everyone who relies on it, regardless of discipline, experience, or skill level." },
      ],
    },
  ],
  pager: [
    { label: "Previous", title: "Get Started", href: "/get-started/", direction: "previous" },
    { label: "Next", title: "Design", href: "/get-started/design", direction: "next" },
  ],
};

export const developPage: GetStartedPageData = {
  key: "develop",
  title: "Develop",
  description: "Install SGDS, use the component library, and build interfaces with shared foundations.",
  sections: [
    {
      title: "Install SGDS web components",
      description: "Add the SGDS web component package to your project before building interfaces.",
      links: [{ label: "Read the component setup guide", href: "/components/accordion" }],
    },
    {
      title: "Start from shared building blocks",
      description: "Use templates, blocks, and components when you need to move from product intent to working UI quickly.",
      orderedItems: [
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
      title: "Use SGDS utilities",
      description: "Apply SGDS utility classes for spacing, layout, typography, colour, and responsive behaviour instead of custom CSS.",
      links: [{ label: "Explore foundations", href: "/foundations/" }],
    },
  ],
  pager: [
    { label: "Previous", title: "Design", href: "/get-started/design", direction: "previous" },
  ],
};

const sharedDesignSections: GetStartedSection[] = [
  {
    title: "Explore design foundations & components",
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
    orderedItems: [
      {
        title: "Use tokens in design",
        description: "Learn how to apply tokens within Figma and preview how colour and spacing changes impact your apps.",
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
      description: "Explore design guidelines, access Figma libraries, and leverage plugins to build GovTech products.",
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
          description: "GovTech employees require a corporate email address to access private libraries.",
          links: [{ label: "Request a Figma licence on GovTech", href: "#" }],
        },
        ...sharedDesignSections,
      ],
      pager: [
        { label: "Previous", title: "About SGDS", href: "/get-started/about-sgds", direction: "previous" },
        { label: "Next", title: "Develop", href: "/get-started/develop", direction: "next" },
      ],
    },
  },
  {
    key: "agencies",
    label: "For Agencies & Partners",
    page: {
      key: "design-agencies",
      title: "Design",
      description: "Explore design guidelines, and access Figma libraries and plugins.",
      sections: [
        {
          title: "Get started with SGDS v3",
          description: "Agencies and vendors can jumpstart their design process by using our public UI kits.",
          orderedItems: [
            { title: "Access the UI kit", description: "Visit the SGDS Figma Community Page." },
            { title: "Duplicate to Drafts", description: "Copy the latest SGDS v3 Web UI Kit to your own workspace." },
            { title: "Stay updated", description: "Follow the community page to receive notifications on version updates and bug fixes." },
          ],
        },
        {
          title: "Compliance requirement",
          description: "All .gov.sg digital services must adopt the Official Government Banner and Global Footer.",
        },
        ...sharedDesignSections,
      ],
      pager: [
        { label: "Previous", title: "About SGDS", href: "/get-started/about-sgds", direction: "previous" },
        { label: "Next", title: "Develop", href: "/get-started/develop", direction: "next" },
      ],
    },
  },
];

export const getStartedPages = {
  overview: getStartedOverview,
  "about-sgds": aboutSgdsPage,
  develop: developPage,
};
