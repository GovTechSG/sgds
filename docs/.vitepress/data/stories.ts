export type StorySection = {
  title: string;
  headingLevel?: "h2" | "h3";
  subheading?: string;
  paragraphs: string[];
  paragraphsHtml?: string[];
  emphasis?: string[];
  list?: string[];
  listType?: "bullet" | "ordered";
  labelledList?: StoryLabelledListItem[];
  postVisualParagraphs?: string[];
  postVisualList?: string[];
  subsections?: StorySubsection[];
  comparisonTable?: StoryComparisonTable;
  boxedContent?: StoryBoxedContent;
  diagram?: "figmaMcpFlow";
  titleVisual?: StoryVisual;
  bodyVisual?: StoryVisual;
  visual?: StoryVisual;
  visualAfterParagraph?: number;
  postVisualSubsections?: StorySubsection[];
  postVisualConclusion?: string;
};

export type StorySubsection = {
  title?: string;
  paragraphs: string[];
  paragraphsHtml?: string[];
  list?: string[];
  listType?: "bullet" | "ordered";
  labelledList?: StoryLabelledListItem[];
  visual?: StoryVisual;
  visualAfterParagraph?: number;
  postVisual?: StoryVisual;
  postVisualParagraphs?: string[];
  postVisualList?: string[];
};

export type StoryLabelledListItem = {
  label?: string;
  text: string;
};

export type StoryComparisonTable = {
  columns: string[];
  rows: string[][];
  callout?: string;
  tableBorder?: boolean;
  headerBackground?: boolean;
  responsive?: "sm" | "md" | "lg" | "xl" | "always";
};

export type StoryBoxedContent = {
  title: string;
  paragraphs: string[];
  labelledList?: StoryLabelledListItem[];
};

export type StoryVisual = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  videoSrc?: string;
  posterSrc?: string;
  videoControls?: boolean;
  videoAutoplay?: boolean;
  fullWidth?: boolean;
  verticalPadding?: boolean;
  framed?: boolean;
  compactFrame?: boolean;
  inlineSvg?: boolean;
};

export type StoryMetric = {
  value: string;
  title: string;
  description: string;
};

export type StoryMatrixCell = {
  row: string;
  column: string;
  title: string;
  description?: string;
  outcomes?: {
    status: "positive" | "negative";
    text: string;
  }[];
  highlight?: boolean;
};

export type StoryMatrix = {
  title: string;
  description: string;
  columns: string[];
  rows: string[];
  cells: StoryMatrixCell[];
};

export type StoryPost = {
  key: string;
  category: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
  posterSrc?: string;
  published: string;
  author: string;
  intro: string[];
  sections: StorySection[];
  matrix?: StoryMatrix;
  metrics: StoryMetric[];
  closing: string[];
  closingEmphasis?: boolean;
  disclaimer?: StoryDisclaimer;
  ctaLabel?: string;
  ctaHref?: string;
  relatedHeading?: string;
  relatedArticle?: StoryRelatedArticle;
  relatedArticles?: StoryRelatedArticle[];
};

export type StoryDisclaimer = {
  title: string;
  paragraphs: string[];
};

export type StoryRelatedArticle = {
  title: string;
  href: string;
};

export const storyPosts: StoryPost[] = [
  {
    key: "introducing-sgds-agent-skills",
    category: "AI",
    title: "Introducing SGDS agent skills",
    description:
      "SGDS agent skills encode our design, development, and UX writing guidance so AI can produce SGDS-aligned, accessible UI from the start.",
    href: "/stories/introducing-sgds-agent-skills",
    imageSrc: "/stories/introducing-sgds-agent-skills-thumbnail.png",
    imageAlt: "SGDS skill cards connected by dotted lines to a central AI design work card",
    videoSrc: "/stories/sgds-agent-skills-knowledge-flow.mp4",
    posterSrc: "/stories/introducing-sgds-agent-skills-thumbnail.png",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "From human memory to AI memory",
        paragraphs: [
          "Before AI, teams had to learn the design system themselves. They read the guidelines, checked the components, learned the code, and applied the writing rules. Although that learning curve is worth it as it helps teams build services that feel consistent, accessible, and trusted, it also takes time and effort.",
          "We have encoded SGDS design, code, and writing guidance into skills that compatible AI tools can read. Now, the assistant can remember the SGDS basics with you: design guidelines, component APIs, layouts, accessibility rules, and writing standards.",
        ],
        emphasis: ["SGDS agent skills change where some of that effort goes."],
      },
      {
        title: "A design system, packed into skills",
        titleVisual: {
          src: "/stories/introducing-sgds-agent-skills-thumbnail.png",
          videoSrc: "/stories/sgds-agent-skills-knowledge-flow.mp4",
          posterSrc: "/stories/introducing-sgds-agent-skills-thumbnail.png",
          alt: "Prompt card reading Build a trusted and accessible government experience using SGDS V3",
          caption:
            "SGDS skills turn design, development, and writing guidance into AI-readable context.",
        },
        paragraphs: [
          "Each skill teaches AI a part of SGDS. Together, they work like a practical playbook. The assistant can check the right skill before it drafts, reviews, or fixes an interface.",
          "Some of the skills we have include:",
        ],
        labelledList: [
          {
            label: "Workflow",
            text: "Know where to start.",
          },
          {
            label: "Getting started",
            text: "Set up a new SGDS app the right way.",
          },
          {
            label: "Components",
            text: "Pick the right building blocks.",
          },
          {
            label: "Utilities",
            text: "Keep spacing, colours, and layout consistent.",
          },
          {
            label: "Theming",
            text: "Apply brand colours and day or night mode.",
          },
          {
            label: "Forms",
            text: "Build forms that behave properly.",
          },
          {
            label: "Patterns",
            text: "Structure headings, lists, and page text.",
          },
          {
            label: "Layouts",
            text: "Arrange content clearly on the page.",
          },
          {
            label: "Blocks",
            text: "Build reusable sections like cards, filters, and calls to action.",
          },
          {
            label: "Templates",
            text: "Start from common page types like dashboards, forms, and settings.",
          },
          {
            label: "Data visualisation",
            text: "Turn data into SGDS-aligned charts.",
          },
          {
            label: "Writing",
            text: "Write clear, direct, government-friendly content.",
          },
        ],
        postVisualParagraphs: [
          "With skills, AI starts with SGDS in mind.",
          "It can scaffold interfaces that are closer to government standards, accessibility expectations, and SGDS patterns from the start.",
        ],
      },
      {
        title: "Putting it into practice",
        paragraphs: [
          "We tested the skills by asking Claude Code to build a small SGDS site from a prompt.",
          "Claude Code used the skills to set up the foundations, application shell, navigation, pages, forms, and production build. It completed the first round of implementation in 10 minutes and 9 seconds.",
          "The result still needed human review. We used the review to refine the pages, check that the layouts were appropriate, and make sure the site worked across mobile screen sizes.",
          "From start to finish, the basic generation took 38 minutes and 54 seconds. This included planning, execution, and refinement into a basic, compliant site.",
          "There is still more work to do before a site like this is production-ready. The useful shift is that the basics are handled earlier: system colours, readable layouts, accessible foundations, and SGDS patterns.",
        ],
        bodyVisual: {
          src: "/stories/sgds-agent-skills-practice-claude-code.png",
          alt: "A browser preview of an SGDS helpdesk form beside Claude Code implementation output",
          caption:
            "Building a helpdesk site with the SGDS agent skills",
          width: 1384,
          height: 718,
        },
        visual: {
          src: "/stories/sgds-agent-skills-practice-demo-poster.jpg",
          videoSrc: "/stories/sgds-agent-skills-practice-demo.mp4",
          posterSrc: "/stories/sgds-agent-skills-practice-demo-poster.jpg",
          alt: "Screen recording of an SGDS helpdesk site created with SGDS agent skills",
          caption:
            "Reviewing the generated helpdesk site for responsive layouts and SGDS compliance.",
          width: 1248,
          height: 688,
          videoControls: true,
          videoAutoplay: true,
        },
        visualAfterParagraph: 3,
        subsections: [
          {
            title: "The same task, without SGDS",
            paragraphs: [
              "We also tested the same prototype direction without asking the assistant to use SGDS or the SGDS skills. That version took 27 minutes and 47 seconds to generate.",
              "The timing is useful context, but it is not the most important finding. The two runs started from the same product direction. The difference was whether the assistant had a shared design system to work from.",
              "The bigger issue appeared during refinement. Without a shared system, the interface became harder to guide over time. Buttons, layouts, and interaction patterns started to drift. Each change needed more explanation because there was no common set of components, tokens, and patterns for the assistant to return to.",
              "This may be manageable for a small product or project with only a few pages. Some differences may only be visible to designers at first, or to people reviewing the interface closely. As more pages and flows are added, those inconsistencies become easier to notice and harder to manage. They can make the service harder to use and maintain, and leave teams with more design debt to clean up later.",
              "This matches our first-hand experience. After the first generation, we spent a significant amount of time trying to standardise the layout, colours, and patterns. Even after hours of refinement, the result was still not entirely consistent.",
              "A quick prototype can still be useful without a design system, but the work can become harder to refine as the product grows.",
            ],
            visual: {
              src: "/stories/sgds-agent-skills-without-system.png",
              alt: "A browser preview and Claude Code output for a helpdesk prototype generated without SGDS",
              caption:
                "The same prototype direction, generated without asking the assistant to use SGDS or the SGDS skills",
              width: 1387,
              height: 752,
            },
            visualAfterParagraph: 1,
          },
        ],
      },
    ],
    matrix: {
      title: "Speed changes the risk",
      description:
        "When AI works with SGDS guidance, teams can spend less time correcting basic inconsistencies and more time reviewing the service experience.",
      columns: ["With SGDS", "Without SGDS"],
      rows: ["With AI", "Without AI"],
      cells: [
        {
          row: "With AI",
          column: "With SGDS",
          title: "Force multiplier",
          outcomes: [
            { status: "positive", text: "Less time" },
            { status: "positive", text: "Compliant" },
          ],
          highlight: true,
        },
        {
          row: "With AI",
          column: "Without SGDS",
          title: "Speed without standards",
          outcomes: [
            { status: "positive", text: "Less time" },
            { status: "negative", text: "Less compliant" },
          ],
        },
        {
          column: "With SGDS",
          row: "Without AI",
          title: "Safe but slow",
          outcomes: [
            { status: "negative", text: "More time" },
            { status: "positive", text: "Compliant" },
          ],
        },
        {
          row: "Without AI",
          column: "Without SGDS",
          title: "Reinventing the wheel",
          outcomes: [
            { status: "negative", text: "More time" },
            { status: "negative", text: "Less compliant" },
          ],
        },
      ],
    },
    metrics: [
      {
        value: "1",
        title: "Workflow skill",
        description: "sgds-workflow helps AI choose the right SGDS guidance.",
      },
      {
        value: "12",
        title: "Specialist skills",
        description: "Guidance covers components, layouts, forms, charts, themes, and writing.",
      },
      {
        value: "0",
        title: "Code added",
        description: "The skills guide AI. They do not add code to your product.",
      },
    ],
    closing: [],
    ctaLabel: "View implementation guide",
    ctaHref: "/ai/skills",
    relatedArticle: {
      title: "AI can scale delivery. It can also scale inconsistency.",
      href: "/stories/ai-can-scale-delivery-and-inconsistency",
    },
  },
  {
    key: "what-sgds-is-often-mistaken-for",
    category: "Foundations",
    title: "What SGDS is often mistaken for",
    description:
      "Why SGDS is more than a component library, and how shared foundations support coherent government services at scale.",
    href: "/stories/what-sgds-is-often-mistaken-for",
    imageSrc: "/stories/sgds-mistaken-for-thumbnail.png",
    imageAlt: "Layered translucent planes representing SGDS foundations",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "More than just a component library",
        paragraphs: [
          "When people hear \"design system\", the first thing that often comes to mind is a collection of UI components:",
          "With the rise of AI-assisted development and modern UI libraries, it is understandable why some teams ask: \"Why not just build it ourselves?\" Today, tools make it possible to scaffold polished interfaces in minutes. Teams can move quickly, customise freely, and experiment much faster than before.",
          "In many situations, that is a completely reasonable approach. Government digital services, however, operate within a different kind of complexity.",
          "Services are expected to remain accessible, coherent, maintainable, trustworthy, and recognisably government across agencies, vendors, delivery teams, and evolving product lifecycles. This is where the role of SGDS becomes broader than a component library.",
        ],
        emphasis: [
          "Buttons, colours, typography, cards, and templates.",
        ],
      },
      {
        title: "Fragmentation often starts with reasonable local decisions",
        paragraphs: [
          "In practice, fragmentation happens with teams making reasonable decisions based on their immediate delivery needs.",
          "A team may choose the fastest implementation approach, the most familiar UI framework, a custom interaction pattern, or a locally optimised workflow that may make sense within the context of a single project. Over time, however, these small differences can accumulate across the ecosystem.",
          "This creates a tension between local delivery optimisation and long-term ecosystem consistency. This is often where shared systems become important.",
        ],
        comparisonTable: {
          columns: ["What teams naturally optimise for", "What shared government experiences require"],
          rows: [
            ["Local speed", "Whole-of-government consistency"],
            ["Fast scaffolding", "Accessibility assurance"],
            ["Team autonomy", "Trusted citizen experiences"],
            ["Shipping features", "Long-term maintainability"],
            ["Flexible UI patterns", "Standardised interactions"],
          ],
          callout: "Without shared foundations, speed scales inconsistency.",
          tableBorder: true,
          headerBackground: true,
        },
      },
      {
        title: "SGDS v3 was designed as a layered system",
        paragraphs: [],
        subsections: [
          {
            title: "Beyond visual consistency",
            paragraphs: [
              "One common misconception about design systems is that they only exist at the component level.",
              "In reality, teams make decisions across many layers throughout delivery. Some decisions are small and implementation-focused. Things like spacing, typography, motion, or button behaviour. Other decisions are larger and workflow-oriented. Things like page structure, task flow, navigation models, layout patterns, and reusable templates.",
              "A designer working on a dashboard may think about information hierarchy and layout structure. A developer implementing the same experience may focus on responsive behaviour, component logic, accessibility handling, and frontend architecture. Both are contributing to the same user experience from different parts of the workflow.",
              "This is one of the reasons SGDS v3 was designed as a layered system rather than only a component library.",
            ],
          },
          {
            title: "Connecting decisions across the delivery workflow",
            paragraphs: [],
            visual: {
              src: "/stories/sgds-v3-layered-decisions.svg",
              alt: "Layered SGDS v3 model showing foundation, component, block, pattern, layout, template, and product page from universal to unique decisions",
              caption:
                "SGDS v3 connects these decisions across the delivery workflow through a layered architecture.",
              width: 1000,
              height: 700,
              inlineSvg: true,
            },
          },
          {
            paragraphs: [
              "Each layer exists because teams solve different types of problems throughout delivery.",
            ],
            labelledList: [
              {
                label: "Foundation layer",
                text: "Helps maintain shared visual and behavioural foundations across products.",
              },
              {
                label: "Component layer",
                text: "Provides reusable and accessible building blocks that teams repeatedly implement across services.",
              },
              {
                label: "Blocks and patterns",
                text: "Help teams solve common workflow and interaction needs more consistently.",
              },
              {
                label: "Layouts and templates",
                text: "Help teams move faster using reusable product structures aligned with shared system conventions.",
              },
              {
                label: "Page and product screens",
                text: "Bring these layers together into complete user experiences that teams can adapt to their service needs.",
              },
            ],
          },
          {
            paragraphs: [
              "The layers work together to connect design intent, implementation behaviour, accessibility expectations, reusable workflows, and product delivery. As services scale across multiple teams, vendors, and delivery environments, shared systems help maintain more coherent experiences across the broader ecosystem.",
            ],
          },
        ],
      },
      {
        title: "Shared foundations help teams scale coherently",
        subheading: "The value of SGDS is not about making every product look identical.",
        paragraphs: [
          "Different services naturally have different users, operational needs, and delivery contexts. Shared foundations help teams move faster while still maintaining more coherent experiences across the broader ecosystem. Citizens experience government as one connected ecosystem, and having a shared design system helps services feel more familiar, predictable, and consistent across the different touchpoints people use every day.",
          "This becomes increasingly important as AI dramatically accelerates digital delivery. Without those shared foundations, small implementation differences can gradually multiply at a scale and speed that becomes increasingly difficult to manage over time.",
        ],
      },
    ],
    metrics: [
      {
        value: "Scale",
        title: "System architecture",
        description: "SGDS v3 connects decisions from design tokens to product screens.",
      },
      {
        value: "Memory",
        title: "Institutional guidance",
        description: "The system stores decisions that teams and AI tools can reuse.",
      },
      {
        value: "Guardrails",
        title: "Consistency at scale",
        description: "Shared constraints keep services coherent without removing product identity.",
      },
    ],
    closing: [],
    ctaLabel: "Read the SGDS overview",
    ctaHref: "/",
    relatedArticle: {
      title: "AI can scale delivery. It can also scale inconsistency.",
      href: "/stories/ai-can-scale-delivery-and-inconsistency",
    },
  },
  {
    key: "ai-can-scale-delivery-and-inconsistency",
    category: "AI",
    title: "AI can scale delivery. It can also scale inconsistency.",
    description:
      "How teams can use shared foundations to scale speed without scaling fragmented government services.",
    href: "/stories/ai-can-scale-delivery-and-inconsistency",
    imageSrc: "/stories/ai-scale-delivery-thumbnail.svg",
    imageAlt: "AI can scale delivery title on a soft gradient background",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "The challenge of consistency at scale",
        paragraphs: [
          "The barrier to building digital products is decreasing with AI-assisted workflows, creating new opportunities for teams to experiment more quickly, iterate more freely, and reduce repetitive implementation work.",
          "Consistency was already a challenge before AI. Different teams often make different decisions about layout, components, content, validation, and service behaviour because they are working with different constraints.",
          "AI changes the pace and volume of those decisions. As interfaces become easier and faster to generate, existing inconsistencies can multiply and spread more quickly across products and teams. In this post, we will look at how faster generation affects consistency across government services, and why shared foundations become increasingly important as delivery continues to scale.",
        ],
      },
      {
        title: "When small differences multiply",
        paragraphs: [
          "AI-assisted workflows produce more than screens. They also make decisions about layout, spacing, forms, validation, accessibility handling, content hierarchy, responsive behaviour, and interaction patterns. Those decisions may be reasonable in isolation. Without shared guidance, similar service problems can still produce different answers.",
          "At a smaller scale, teams can review and align those differences manually. At AI-assisted delivery speed, the same differences can appear across more screens, prototypes, and code changes in a shorter time.",
          "This often shows up in everyday interface details.",
        ],
        subsections: [
          {
            title: "Interaction behaviour",
            paragraphs: [
              "One place this appears is the form error experience. Teams decide validation rules, when errors appear, and how users recover from mistakes. SGDS provides components and patterns for what users see, including error placement, labels, helper text, and visual treatment.",
              "When these visible patterns differ across services, similar tasks can feel less predictable across touchpoints.",
            ],
            visual: {
              src: "/stories/ai-scale-interaction-behaviour-many.svg",
              alt: "Diagram showing different generated interaction behaviours for similar form tasks",
              caption:
                "Examples of form error states with different placements, labels, and visual treatments.",
              width: 1070,
              height: 626,
              framed: true,
              compactFrame: true,
              inlineSvg: true,
            },
            postVisualParagraphs: [
              "These differences may look minute on one screen, but across many services, they affect how easily users recognise an error state and understand what to do next.",
            ],
          },
          {
            title: "Action patterns",
            paragraphs: [
              "Even simple actions carry design decisions. A form may have the same goal, but teams still decide where to place submit and cancel actions, which action appears first, and how the primary action is styled.",
              "Without a shared pattern, AI-generated screens can produce many versions of the same task. Users may need to re-learn the order, placement, and hierarchy of actions across services.",
              "With a common foundation, teams can create experiences that feel familiar to users while still adapting the visual style to their product identity. SGDS keeps common patterns consistent without requiring every product to look the same.",
            ],
            visual: {
              src: "/stories/ai-scale-action-patterns-many.svg",
              alt: "Diagram showing an SGDS action pattern branching into many generated variations",
              caption:
                "Examples of submit and cancel actions with different order and placement.",
              width: 1030,
              height: 780,
              framed: true,
              inlineSvg: true,
            },
            visualAfterParagraph: 1,
            postVisual: {
              src: "/stories/ai-scale-action-patterns-one.svg",
              alt: "Diagram showing products retaining their own style while following the same SGDS action pattern",
              caption:
                "Product examples using the same action placement and hierarchy with different visual styles.",
              width: 1030,
              height: 700,
              framed: true,
              inlineSvg: true,
            },
            postVisualParagraphs: [
              "The visual identity can change from product to product, while the underlying action pattern remains recognisable. This helps users understand the task without needing every service to look identical.",
            ],
          },
          {
            title: "Variation becomes harder to manage",
            paragraphs: [
              "Before AI, these differences already needed review and alignment. AI increases the pace at which they appear, and more generated interfaces can also mean more generated decisions about patterns, tokens, content, and behaviour.",
              "If teams only review after those decisions have spread, correction effort grows. The work shifts from designing one interface to keeping many variations aligned.",
            ],
          },
        ],
      },
      {
        title: "Consistency in the workflow, but how?",
        paragraphs: [],
        paragraphsHtml: [
          "By the time a generated interface reaches review, many design and implementation decisions may already be in place. Teams can still correct them, but the work becomes harder when the same differences have already spread across screens, prototypes, and code.",
          "Ideally, teams bring guidance in before generation starts. For teams on other design systems, or teams without a design system, the SGDS team is exploring migration skills as part of <a href=\"/ai/skills\">SGDS agent skills</a>. The aim is to lower the barrier to adopting SGDS later. This needs careful consideration, because migration is more than a component swap. It should protect the product experience and avoid introducing changes that disrupt the codebase.",
          "When guidance is available earlier, review can focus less on basic alignment and more on whether the service works well for its users.",
        ],
      },
      {
        title: "Keep product identity, align repeated tasks",
        paragraphs: [
          "Government products can maintain their own service identity while aligning on common patterns across repeated service tasks. Many parts of digital services are inherently reusable and help support more consistent implementation across teams.",
          "Services do not need to look identical. Teams should still make decisions based on their users, policies, operational requirements, and service context.",
          "The goal is to provide clearer foundations and implementation guidance so teams and AI-assisted workflows can make better first decisions before inconsistencies scale across products and services.",
          "As interface generation becomes faster, consistency increasingly depends on the quality of the shared systems, guidance, and reusable patterns embedded within delivery workflows.",
        ],
      },
    ],
    metrics: [
      {
        value: "Speed",
        title: "Delivery accelerates",
        description: "AI can move from prompt to first interface in minutes.",
      },
      {
        value: "Risk",
        title: "Variation multiplies",
        description: "Unguided AI can spread different decisions across similar services.",
      },
      {
        value: "System",
        title: "Foundations coordinate",
        description: "Shared guidance helps teams scale speed with consistency.",
      },
    ],
    closing: [],
    ctaLabel: "Explore SGDS and AI",
    ctaHref: "/ai/overview",
  },
  {
    key: "the-learning-curve-before-ai",
    category: "Research",
    title: "The learning curve before AI",
    description:
      "What our research showed about how teams adopted SGDS before AI-assisted delivery became part of the workflow.",
    href: "/stories/the-learning-curve-before-ai",
    imageSrc: "/stories/learning-curve-before-ai-thumbnail.svg",
    imageAlt: "The learning curve before AI title on a soft gradient background",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "What we wanted to learn",
        paragraphs: [
          "Before AI-assisted workflows became part of product delivery conversations, we wanted to understand how teams adopted and used SGDS during real project work.",
          "Most teams already recognised the value of accessibility, consistency, and compliance. They were also trying to build services aligned with those principles.",
          "From there, we focused on the delivery experience:",
        ],
        list: [
          "Which parts of SGDS felt intuitive?",
          "Which parts took more effort to apply?",
          "How well did design and development workflows connect?",
          "Where did teams spend the most coordination effort during delivery?",
        ],
        postVisualParagraphs: [
          "The larger effort came from applying guidance consistently within active delivery environments.",
        ],
      },
      {
        title: "The findings",
        paragraphs: [
          "The main finding was that adoption depended on how SGDS worked within everyday delivery.",
          "Design intent, implementation behaviour, team capability, documentation, and local workflows all had to align before a service could feel coherent.",
        ],
      },
      {
        title: "Designers and developers were often operating in separate systems",
        headingLevel: "h3",
        paragraphs: [
          "Designers and developers often worked in different tools, workflows, and implementation contexts.",
          "The clearest gap was between design intent and implementation. Designers expected SGDS components to behave in one context. Developers had to rebuild that behaviour in another.",
          "The SGDS component sat between visual design context and development context. Teams still had to translate intent into working code.",
        ],
        comparisonTable: {
          columns: ["Topic", "Designers expected", "Developers executed"],
          rows: [
            [
              "Learning curve",
              "Use visual templates and compose screens quickly.",
              "Find working code examples and implementation patterns.",
            ],
            [
              "Customisation",
              "Adjust layouts visually, sometimes detaching components to fit the scenario.",
              "Map those changes to tokens, component APIs, and SGDS utilities.",
            ],
            [
              "Responsive UX",
              "Expect designs to reflect responsive behaviour clearly.",
              "Implement dynamic resizing and states that static designs do not show.",
            ],
          ],
          responsive: "always",
          headerBackground: true,
          callout:
            "Documentation helped teams understand the system. Teams still needed a better bridge between design intent and implementation.",
        },
        postVisualParagraphs: [
          "Even though teams used documentation regularly, guidance often sat outside the moment of delivery. Teams had to move between design files, documentation, code examples, accessibility references, and project requirements.",
          "Each switch added interpretation work. Across larger projects, that coordination effort became part of the learning curve.",
        ],
      },
      {
        title: "Standards still had to fit delivery",
        headingLevel: "h3",
        paragraphs: [
          "Teams understood the value of SGDS. The challenge was applying shared standards while working within timelines, frontend capacity, inherited patterns, and product constraints.",
          "This meant adoption depended on how well SGDS fit into day-to-day delivery work.",
        ],
      },
      {
        title: "Skill gaps increased delivery effort",
        headingLevel: "h3",
        paragraphs: [
          "The research also showed how much delivery depended on available frontend and design expertise.",
          "Some teams had limited in-house support to interpret standards across design and code. Others relied heavily on engineers for small UI changes.",
          "Guidelines still had to be translated manually into working interfaces. Teams also had limited low-code or no-code tools that understood government compliance needs.",
          "This increased the effort needed to build consistent, user-friendly digital services efficiently.",
        ],
      },
      {
        title: "Local workflows solved immediate problems",
        headingLevel: "h3",
        paragraphs: [
          "Under delivery pressure, teams sometimes used local workarounds.",
          "Some adapted SGDS components. Some detached design components. Others built custom patterns or used familiar implementation approaches.",
          "These decisions often made sense within a single project. Over time, they could make services less aligned across the wider ecosystem.",
        ],
      },
      {
        title: "What the research taught us",
        paragraphs: [
          "The learning curve was about more than learning components. It was about applying shared decisions under real delivery conditions.",
          "Teams needed SGDS guidance to be available in the tools they used and consistent across design and code.",
          "Today, we are in a better position to narrow that gap. SGDS agent skills help bring system context into the tools teams already use to design, build, and review services. With the current technology, design and code can finally work from a more shared language.",
        ],
      },
    ],
    metrics: [
      {
        value: "Standards",
        title: "Shared expectations",
        description: "Teams understood the value of accessibility, consistency, and DSS compliance.",
      },
      {
        value: "Translation",
        title: "Execution gap",
        description: "Design intent still had to be translated into compliant implementation.",
      },
      {
        value: "Workflow",
        title: "Adoption depended on fit",
        description: "SGDS worked best when guidance fit naturally into delivery work.",
      },
    ],
    closing: [],
    ctaLabel: "Explore SGDS and AI",
    ctaHref: "/ai/overview",
    relatedArticles: [
      {
        title: "Introducing SGDS agent skills",
        href: "/stories/introducing-sgds-agent-skills",
      },
      {
        title: "Design and code, finally speaking the same language",
        href: "/stories/design-and-code-finally-speaking-the-same-language",
      },
    ],
  },
  {
    key: "design-and-code-finally-speaking-the-same-language",
    category: "AI",
    title: "Design and code, finally speaking the same language",
    description:
      "How AI-assisted workflows can narrow the translation gap between design intent and implementation.",
    href: "/stories/design-and-code-finally-speaking-the-same-language",
    imageSrc: "/stories/introducing-sgds-agent-skills-thumbnail.svg",
    imageAlt: "AI prompt box connected to SGDS agent skill cards",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "From handoff to shared systems",
        paragraphs: [],
        paragraphsHtml: [
          "Traditionally, design handoff relied heavily on screenshots, annotations, walkthroughs, and manual interpretation, as discussed in <a href=\"/stories/the-learning-curve-before-ai\">The learning curve before AI</a>.",
          "Designers created screens in Figma while thinking about hierarchy, interaction behaviour, accessibility, and user flows. Developers then translated those screens into implementation by interpreting spacing, responsive behaviour, component usage, and frontend logic.",
          "Over time, small differences naturally appeared across the workflow. Interaction patterns drifted, accessibility handling varied, and responsive behaviour changed between implementations.",
        ],
      },
      {
        title: "AI is changing how design and development connect",
        paragraphs: [
          "One major shift in AI-assisted delivery is the move from static handoff to connected system context.",
          "Instead of relying only on screenshots and annotations, teams can give AI tools access to structured design information.",
          "Figma MCP is one example. It allows coding agents to read information directly from the design file. When the design file uses SGDS v3 components, tokens, and patterns, the agent can read that system context as part of the design.",
        ],
        diagram: "figmaMcpFlow",
      },
      {
        title: "Connecting design directly to implementation",
        headingLevel: "h3",
        bodyVisual: {
          src: "/ai/figma-to-code.svg",
          alt: "Diagram showing design context flowing from Figma into SGDS implementation code",
          caption: "Figma MCP carries structured design context into implementation.",
          width: 976,
          height: 109,
          verticalPadding: true,
        },
        paragraphs: [],
        paragraphsHtml: [
          "A designer working with SGDS can hand over screens through Figma MCP. This means that components inside Figma are no longer isolated from implementation.",
          "With <a href=\"https://developers.figma.com/docs/code-connect/\" target=\"_blank\" rel=\"noreferrer\">Figma Code Connect</a>, those components can carry structured system context that is linked to implementation behaviour.",
        ],
        visual: {
          src: "/stories/figma-code-connect-sgds-alert.png",
          alt: "Figma Code Connect view showing an SGDS alert design component beside its linked code component",
          caption:
            "The design system can be connected across design and development environments.",
          width: 976,
          height: 656,
          fullWidth: true,
        },
        postVisualParagraphs: [
          "This connection gives AI agents access to shared foundations:",
        ],
        postVisualList: [
          "Design tokens for colours, spacing, and other foundations",
          "SGDS component structures that align with the codebase",
          "Repository context from GitHub",
        ],
      },
      {
        title: "SGDS skills give coding agents system context",
        headingLevel: "h3",
        paragraphs: [],
        paragraphsHtml: [
          "Implementation is the next part of the workflow. When <a href=\"/ai/skills\">SGDS agent skills</a> are installed, these skills give coding agents guidance on component usage, token foundations, layout patterns, content, and implementation structure.",
          "Agents can then reference SGDS guidance while working. They can map components to patterns, reference tokens and utilities, and generate code based on the intended behaviour.",
          "This assumes that designers and developers are both using SGDS in the workflow.",
        ],
      },
      {
        title: "Sending code back to Figma",
        headingLevel: "h3",
        paragraphs: [
          "Implementation often evolves faster than design files. A developer may ship a feature, adjust a layout based on user feedback, or introduce new sections during development. Over time, the Figma file can drift away from what is running in production.",
          "This is one reason product development is gradually moving away from handoff as a one-way process.",
          "With Figma MCP, designers can bring implementation back into Figma when needed. A team can ask a coding agent to send the interface back to Figma and map it to SGDS components. The result can be reviewed as editable layers in Figma.",
        ],
        visual: {
          src: "/ai/code-to-figma.svg",
          alt: "Diagram showing SGDS implementation code flowing back into Figma for review",
          caption:
            "The same shared system context can move from code back into editable design layers.",
          width: 891,
          height: 50,
          verticalPadding: true,
        },
        postVisualParagraphs: [
          "Designers can then edit the parts needed for the task. When the design is ready, the updated direction can also be sent back to code.",
        ],
      },
      {
        title: "A shared language for design, code, and AI",
        paragraphs: [
          "This workflow is about keeping design and implementation context connected.",
          "SGDS components, tokens, Figma MCP, Code Connect, and agent skills allow design and implementation to refer to the same system context. Designers can create with components that correspond to the codebase. Developers can refer to structured design intent. Agents can use the same component, token, and pattern references.",
          "Teams still need to review accessibility, interaction quality, content, and production behaviour. The translation work between design and code still exists, but more of the context can be carried through the workflow.",
          "In this model, SGDS acts as a shared reference across design, code, and AI-assisted work.",
        ],
      },
    ],
    metrics: [
      {
        value: "Design",
        title: "Intent",
        description: "Teams can describe the experience users should see.",
      },
      {
        value: "Code",
        title: "Implementation",
        description: "Teams can connect intent to components, tokens, and APIs.",
      },
      {
        value: "SGDS v3",
        title: "Shared language",
        description: "The system gives both sides a shared set of decisions.",
      },
    ],
    closing: [],
    disclaimer: {
      title: "Note",
      paragraphs: [
        "This post describes the general direction for how design and development collaboration can work with shared system context. MCP is still blocked for GovTech's Claude Code at the time of writing.",
      ],
    },
    ctaLabel: "View agent skills",
    ctaHref: "/ai/skills",
    relatedHeading: "Understand how it works:",
    relatedArticles: [
      {
        title: "Claude Code + Figma, no MCP",
        href: "https://www.intodesignsystems.com/blog/claude-code-figma-no-mcp",
      },
      {
        title: "The Figma canvas is now open to agents",
        href: "https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/",
      },
      {
        title: "SGDS agent skills",
        href: "/ai/skills",
      },
    ],
  },
  {
    key: "strengthening-the-system-from-within",
    category: "Foundations",
    title: "Strengthening the system from within",
    description:
      "How SGDS is strengthening its foundations, flexibility, contribution model, and accessibility guidance so the system fits real product delivery.",
    href: "/stories/strengthening-the-system-from-within",
    imageSrc: "/stories/strengthening-system-thumbnail.svg",
    imageAlt: "Layered SGDS foundations and system priorities",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "Grounded in the same purpose",
        paragraphs: [
          "Even as SGDS continues to evolve, the philosophy and purpose remain the same: shared foundations that help teams build government services that feel connected, familiar, accessible, and trustworthy.",
          "The areas below are about making the system more useful in real delivery: improving core quality, supporting responsible flexibility, opening clearer contribution pathways, and extending accessibility guidance as interaction models change.",
        ],
      },
      {
        title: "Strengthening the foundations",
        headingLevel: "h3",
        paragraphs: [
          "Before SGDS supports more delivery workflows, its foundation layer needs to stay dependable in everyday product work.",
          "This means:",
        ],
        list: [
          "improving component quality",
          "aligning design assets and web components more tightly",
          "clarifying implementation guidance",
          "reducing avoidable drift in repeated patterns",
          "supporting teams with existing constraints",
        ],
        subsections: [
          {
            paragraphs: [
              "This foundation work makes SGDS easier to rely on. It also sets up the next question: how the system can give teams more flexibility without making familiar service patterns harder to maintain.",
            ],
          },
        ],
      },
      {
        title: "Making flexibility easier to adopt",
        headingLevel: "h3",
        paragraphs: [
          "A recurring challenge is flexibility. Many product teams have asked for more room to express product identity while keeping common service patterns recognisable.",
          "Some have found SGDS difficult to customise. Branding, migration, and existing workflows can also be hard to reconcile with a shared system. These are valid concerns within real delivery timelines and operational constraints.",
          "We hear you. Our intention is to help SGDS fit more naturally into product workflows. Therefore, we are exploring:",
        ],
        labelledList: [
          {
            label: "Broader colour flexibility",
            text: "Allow teams to use colours beyond the default GovTech palette, while keeping accessibility as the priority.",
          },
          {
            label: "Multiple neutral palettes",
            text: "Provide more neutral options, such as cool, warm, and default greys, so products can choose a better fit.",
          },
          {
            label: "System typography expansion",
            text: "Provide clearer typography options, including serif, sans serif, and monospace choices where they support the product experience.",
          },
          {
            label: "Support for custom brand fonts",
            text: "Make it easier for teams to use preferred brand fonts while staying aligned with SGDS guidance.",
          },
          {
            label: "Controlled gradient generation",
            text: "Define safer ways to generate gradients with clearer constraints around contrast, accessibility, and usage.",
          },
          {
            label: "Clearer guidance",
            text: "Make style decisions easier to apply, including where and how visual flexibility should be used. Where possible, this should feel like a guided setup flow that lowers the barrier to adoption.",
          },
          {
            label: "Migration skills",
            text: "Explore migration support as part of SGDS agent skills. These skills could help teams understand what can move towards SGDS and what needs product judgement. This needs careful design because migration affects product experience and code structure, not only component names.",
          },
        ],
        subsections: [
          {
            paragraphs: [
              "The goal is responsible flexibility: product identity without losing familiar service patterns.",
              "This should not create another learning curve. If these choices are easier to configure and understand, adoption becomes less heavy. That matters because SGDS should stay accessible by default, even as it becomes more adaptable.",
            ],
          },
        ],
      },
      {
        title: "Making contribution easier",
        headingLevel: "h3",
        paragraphs: [
          "Long-term adoption also depends on clearer contribution pathways.",
          "The model we are exploring has three layers:",
        ],
        list: [
          "Core",
          "Shared",
          "Product",
        ],
        listType: "ordered",
        visual: {
          src: "/stories/sgds-contribution-layers.svg",
          alt: "A three-layer contribution model labelled Core, Shared, and Product.",
          caption: "A three-layer contribution model for core foundations, shared patterns, and product-specific work.",
          width: 1920,
          height: 1080,
        },
        postVisualSubsections: [
          {
            title: "1. Core",
            paragraphs: [
              "The SGDS team maintains the core system. This covers:",
            ],
            list: [
              "foundations",
              "components",
              "accessibility standards",
              "implementation guidance",
              "reusable patterns",
            ],
            postVisualParagraphs: [
              "This layer gives product teams a stable base to build on.",
            ],
          },
          {
            title: "2. Shared",
            paragraphs: [
              "Teams across government may build patterns, workflows, or components on top of the core system. Some of these could also benefit other products. When a pattern proves useful beyond one context, it can move into a shared layer for broader reuse.",
              "This creates a feedback loop between product delivery and real implementation needs. It also reduces the need to solve similar problems separately.",
            ],
          },
          {
            title: "3. Product",
            paragraphs: [
              "Individual products still need flexibility for service-specific needs.",
              "Some workflows or interaction patterns are intentionally product-specific. They may be tied to operational context, requirements, user needs, or service workflows. This layer gives teams room to adapt experiences without needing to fork or replace the system underneath.",
            ],
          },
        ],
        postVisualConclusion: "Together, these layers keep the core stable, create space for shared reuse, and leave room for product-specific work.",
      },
      {
        title: "Accessibility beyond graphical interfaces",
        headingLevel: "h3",
        paragraphs: [
          "Accessibility remains one of the foundations SGDS cannot compromise on.",
          "Today, much of our accessibility guidance focuses on graphical interfaces and keyboard use. As services include new ways of interacting, SGDS may also need to consider natural language, AI-assisted interactions, voice, multimodal interactions, and automated or assisted service flows.",
          "These areas require careful research, testing, and iteration. The goal is to keep accessibility close to how people actually use services, so SGDS can remain accessible by default.",
        ],
      },
      {
        title: "What this supports",
        paragraphs: [
          "The aim is to make SGDS easier to maintain with the people who use it.",
          "This helps the system stay practical as products, workflows, and interaction models change.",
          "These improvements may be quieter than launching a new component, but they affect how well the system fits real product delivery.",
        ],
      },
    ],
    metrics: [],
    closing: [],
    ctaLabel: "Explore SGDS and AI",
    ctaHref: "/ai/overview",
  },
  {
    key: "role-of-a-design-system-in-the-agentic-ai-era",
    category: "AI",
    title: "The role of a design system in the agentic AI era",
    description:
      "A longer-term view of how design systems may support more coherent behaviour as AI becomes part of delivery.",
    href: "/stories/role-of-a-design-system-in-the-agentic-ai-era",
    imageSrc: "/stories/design-code-speaking-thumbnail.svg",
    imageAlt: "SGDS mark on a soft gradient background",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "What happens when design systems move beyond interfaces?",
        paragraphs: [],
        paragraphsHtml: [
          "For decades, digital products were built around screens. UI sat at the centre of how people interacted with digital products and services. Open an app. Navigate a menu. Click a button. Complete a form. Submit a workflow.",
          "Today, agentic workflows are becoming more capable of handling transactional services, with execution happening quietly behind the scenes. Instead of navigating software manually, users increasingly express intent: \"Book this.\" \"Help me renew this.\"",
          "This does not mean interfaces disappear or become less important. When people interact with fewer screens directly, the experience surrounding those moments becomes even more important. The question gradually shifts from:",
          "<span class=\"sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default\">\"What should the interface look like?\"</span>",
          "towards",
          "<span class=\"sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default\">\"What should the interaction feel like when systems are acting on behalf of users?\"</span>",
        ],
      },
      {
        title: "Less UI, more intentional",
        headingLevel: "h3",
        paragraphs: [],
        paragraphsHtml: [
          "Agentic workflows may separate digital products into different kinds of experiences.",
          "Some screens exist because people need to complete a task. If an agent can handle those steps reliably, the better experience may be one where people spend less time in the interface.",
          "Other products are opened by choice. Creative tools, learning experiences, entertainment, reading, music, and social spaces are valuable because people want to spend time with them. For these products, the interface is not just a surface. It is where the experience happens.",
          "This makes the design question more direct:",
          "<span class=\"sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default\">\"Is the product trying to reduce effort, or create an experience worth spending time with?\"</span>",
          "For services where agents act on a user's behalf, the visible moments become the point of contact between system action and human judgement. The interface matters most when people need to make a decision, check an action, or change a setting.",
          "For products people choose to spend time with, the challenge moves in the other direction. The interface has to justify the time people spend with it. It needs to offer an experience that feels useful, engaging, and worth returning to.",
        ],
      },
      {
        title: "New workflows create new design questions",
        headingLevel: "h3",
        paragraphs: [
          "Traditional digital systems are often deterministic. Users click a button and expect a predictable result.",
          "Agentic systems behave differently because they are probabilistic by nature. This introduces a different category of design problem. Users are no longer only evaluating screens. Teams also need to decide:",
        ],
        list: [
          "When should people intervene?",
          "What information should remain visible to users?",
          "What actions need explicit approval?",
          "How should users review or undo an action?",
          "What decisions should never be fully automated?",
        ],
        postVisualParagraphs: ["etc..."],
      },
      {
        title: "The future role is still unfolding",
        paragraphs: [],
        paragraphsHtml: [
          "Interfaces may change significantly over time as natural language becomes a primary interaction layer for some workflows. Some systems may become almost invisible to users altogether.",
          "The role of design systems may have to expand beyond visual consistency.",
          "For years, design systems helped answer questions like:",
          "<span class=\"sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default\">\"How should interfaces look so experiences remain consistent across the ecosystem?\"</span>",
          "Over time, the question may become:",
          "<span class=\"sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default\">\"How should services behave when fewer screens are visible?\"</span>",
          "This shift is still uncertain. That is what makes this moment interesting for design systems.",
        ],
      },
    ],
    metrics: [
      {
        value: "UI",
        title: "Appears with intent",
        description: "Interfaces can focus on decisions, review, approval, and recovery.",
      },
      {
        value: "Behaviour",
        title: "Needs guidance",
        description: "Teams need patterns for uncertainty, escalation, and review.",
      },
      {
        value: "Systems",
        title: "Stay coherent",
        description: "Shared foundations can help AI-assisted workflows remain understandable.",
      },
    ],
    closing: [],
    ctaLabel: "Explore AI guidance",
    ctaHref: "/ai/overview",
  },
  {
    key: "accessibility-from-an-engineering-perspective",
    category: "Accessibility",
    title: "Accessibility from an engineering perspective",
    description:
      "How SGDS builds accessibility into its engineering systems, from automated testing with Oobee to documentation and shared responsibility.",
    href: "/stories/accessibility-from-an-engineering-perspective",
    imageSrc: "/stories/accessibility-engineering-thumbnail.svg",
    imageAlt: "Universal accessibility symbol",
    published: "July 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "Built into our systems, not an afterthought",
        paragraphs: [
          "SGDS has a strong commitment to accessibility to ensure that all users, regardless of ability and device, have undeterred access to the websites and applications that are built with it.",
          "Accessibility is built into our systems, not an afterthought. Starting from development phase, we take every possible permutation of usage in a component and run them through Oobee, a software tester that runs accessibility tests, optimised for screen readers.",
        ],
        visual: {
          src: "/stories/web-component-oobee-pipeline.webp",
          alt: "Oobee A11y Scan CI pipeline results showing 47 pages scanned, 47 passing, 0 failing, with 634 total checks passed",
          caption: "Our CI pipeline runs Oobee accessibility scans across all component pages before every release.",
          width: 1701,
          height: 1381,
        },
        visualAfterParagraph: 2,
        subsections: [
          {
            paragraphs: [
              "Based on the test results of Oobee, we modify and recommend the accessible way of using the components. For example, certain components require the ariaLabel property to be forwarded down to the web component's shadow DOM element in order to pass accessibility testing. Every component we build passes the accessibility testing pipeline before it is published.",
            ],
            visual: {
              src: "/stories/ariaLabel-prop-button.webp",
              alt: "SGDS button component with ariaLabel prop declaratively defined, forwarded into the shadow DOM button element",
              caption: "The ariaLabel prop is declaratively defined on sgds-button and forwarded into its shadow DOM button element.",
              width: 888,
              height: 415,
            },
            visualAfterParagraph: 1,
            postVisual: {
              src: "/stories/button-shadow-dom-aria-label.webp",
              alt: "Browser DevTools showing the aria-label attribute on the HTML button element inside the shadow DOM, forwarded from the ariaLabel prop",
              caption: "The aria-label attribute is forwarded down to the native button element inside the shadow DOM.",
              width: 1722,
              height: 462,
            },
            postVisualParagraphs: [
              "We then ensure our code documentation in Storybook and agent skills are compliant with the best recommendation by default.",
            ],
          },
          {
            paragraphs: [
              "Our components are rendered on this site, where we also run Oobee accessibility testing to verify that it works for end users.",
            ],
            visual: {
              src: "/stories/oobee-wcag-score.webp",
              alt: "Oobee accessibility report for designsystem.tech.gov.sg showing a perfect WCAG score of 20 out of 20 based on automated checks",
              caption: "Oobee accessibility report showing a perfect WCAG score for the SGDS documentation site.",
              width: 1350,
              height: 896,
            },
            visualAfterParagraph: 1,
          },
        ],
      },
      {
        title: "How our architecture enforces it",
        paragraphs: [
          "The advantage of web components is the strictness of the shadow DOM. While users of other light DOM libraries like ShadCN or Mantine can freely modify a component's HTML semantics and ARIA attributes, the shadow DOM keeps these internals secure. This makes it straightforward for us to control accessibility within the shadow DOM.",
          "However, we acknowledge that patterns in the light DOM are subjected to user modifications. While we cannot gate how developers use the component externally, we are dedicated to extend the accessibility testing to patterns, templates, and blocks. This includes covering various forms of component usage patterns as part of our roadmap.",
        ],
      },
      {
        title: "It takes two hands to clap",
        paragraphs: [
          "Using SGDS's building blocks does not magically make your entire application accessible. A website is made up of more than just components. For example, using the correct semantic HTML is crucial for accessibility but outside the control of the design system — such as when a developer places a div inside a list instead of using proper li elements.",
          "It takes the joint responsibility and commitment of the design system and its users to ensure web pages are accessible.",
        ],
      },
      {
        title: "An open invitation",
        paragraphs: [],
        paragraphsHtml: [
          "We are aware that we may not get it right every time for every user, so we invite everyone to participate in this ongoing effort by submitting accessibility improvements via <a href=\"https://github.com/GovTechSG/sgds-web-component/issues\" target=\"_blank\" rel=\"noopener\">GitHub issues</a> if you encounter them with SGDS.",
        ],
      },
    ],
    metrics: [
      {
        value: "100%",
        title: "Components tested",
        description:
          "Every component passes through the accessibility testing pipeline before release.",
      },
      {
        value: "Oobee",
        title: "Automated testing",
        description:
          "Screen reader optimised accessibility testing across all usage permutations.",
      },
      {
        value: "Shared",
        title: "Responsibility",
        description:
          "Accessible services require commitment from both the design system and its users.",
      },
    ],
    closing: [],
    ctaLabel: "Report an accessibility issue",
    ctaHref: "https://github.com/GovTechSG/sgds-web-component/issues",
  },
];

export const featuredStory = storyPosts[0];

const storyOverviewOrder = [
  "accessibility-from-an-engineering-perspective",
  "what-sgds-is-often-mistaken-for",
  "the-learning-curve-before-ai",
  "ai-can-scale-delivery-and-inconsistency",
  "design-and-code-finally-speaking-the-same-language",
  "strengthening-the-system-from-within",
  "role-of-a-design-system-in-the-agentic-ai-era",
];

export const storyOverviewCards = storyOverviewOrder
  .map((key) => storyPosts.find((post) => post.key === key))
  .filter((post): post is StoryPost => Boolean(post));

export const getStoryPost = (key: string) =>
  storyPosts.find((post) => post.key === key);
