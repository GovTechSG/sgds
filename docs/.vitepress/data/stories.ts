export type StorySection = {
  title: string;
  headingLevel?: "h2" | "h3";
  subheading?: string;
  paragraphs: string[];
  paragraphsHtml?: string[];
  emphasis?: string[];
  list?: string[];
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
};

export type StorySubsection = {
  title?: string;
  paragraphs: string[];
  paragraphsHtml?: string[];
  list?: string[];
  labelledList?: StoryLabelledListItem[];
  visual?: StoryVisual;
  visualAfterParagraph?: number;
  postVisualParagraphs?: string[];
  postVisualList?: string[];
};

export type StoryLabelledListItem = {
  label: string;
  text: string;
};

export type StoryComparisonTable = {
  columns: string[];
  rows: string[][];
  callout?: string;
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
  ctaLabel?: string;
  ctaHref?: string;
  relatedArticle?: StoryRelatedArticle;
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
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "SGDS knowledge files flowing into an AI agent",
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
          src: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
          videoSrc: "/stories/sgds-agent-skills-knowledge-flow.mp4",
          posterSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
          alt: "SGDS knowledge files flowing into an AI agent",
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
          width: 1600,
          height: 690,
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
              "That can become difficult to manage in a larger enterprise product. Inconsistent patterns can make the service harder to use and maintain. They also leave teams with more design debt to clean up later.",
              "This matches our first-hand experience. AI can produce a quick prototype without a design system, but the work can become harder to refine as the product grows.",
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
        "AI helps teams produce interfaces faster. That speed can reduce effort when a design system guides the work. Without a design system, the same speed can also multiply inconsistent and less compliant services.",
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
    closing: [
      "In simple terms, using SGDS leads to more compliant designs. That, in turn, helps build trust in government digital services.",
    ],
    closingEmphasis: true,
    ctaLabel: "View implementation guide",
    ctaHref: "/ai/skills",
  },
  {
    key: "what-sgds-is-often-mistaken-for",
    category: "Foundations",
    title: "What SGDS is often mistaken for",
    description:
      "Why SGDS is more than a component library, and how shared foundations support coherent government services at scale.",
    href: "/stories/what-sgds-is-often-mistaken-for",
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "SGDS guidance cards arranged around a central idea",
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
              src: "/stories/sgds-v3-layered-decisions.png",
              alt: "Layered SGDS v3 model showing foundation, component, block, pattern, layout, template, and product page from universal to unique decisions",
              caption:
                "SGDS v3 connects these decisions across the delivery workflow through a layered architecture.",
              width: 1535,
              height: 1024,
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
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "AI-generated interface drafts branching into different directions",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [
      "AI is changing how digital services are built.",
      "Interfaces that once took weeks to prototype can now be scaffolded in minutes. Teams can generate layouts, frontend structures, and workflows much faster than before.",
      "The barrier to building digital products is rapidly decreasing. This creates new opportunities for teams to experiment, iterate, and deliver services more quickly.",
      "As delivery accelerates, another challenge becomes more visible.",
      "AI scales implementation decisions alongside delivery speed.",
    ],
    sections: [
      {
        title: "Every generated interface contains many decisions",
        paragraphs: [
          "Every generated interface contains hundreds of small decisions, including layout structures, interaction patterns, accessibility handling, validation behaviour, content hierarchy, responsive behaviour, and error states.",
          "When teams build manually, these differences emerge gradually over time.",
          "With AI-assisted development, variation can multiply much more quickly.",
          "Two teams solving similar problems may now generate different implementations, even when the underlying user need is similar.",
          "Over time, this can lead to fragmentation across services.",
        ],
        list: [
          "Inconsistent interaction patterns",
          "Uneven accessibility quality",
          "Duplicated frontend decisions",
          "Fragmented experiences across services",
        ],
      },
      {
        title: "The challenge is speed with coherence",
        paragraphs: [
          "The challenge increasingly becomes how teams can scale delivery speed while maintaining coherent experiences across the ecosystem.",
        ],
      },
      {
        title: "AI is very good at generating patterns",
        paragraphs: [
          "Modern AI tools are trained across large collections of products, frameworks, and frontend conventions.",
          "As a result, AI is highly effective at producing plausible interfaces, polished UI patterns, reusable frontend structures, and modern interaction models.",
          "Government services operate within a more specific context.",
          "They require experiences that are accessible, coherent, trustworthy, maintainable, and recognisably government.",
          "These are behavioural and operational expectations. They shape how citizens experience digital services across agencies over time.",
          "Without shared foundations, AI naturally optimises towards locally generated outputs. This can gradually introduce variation across the broader ecosystem.",
        ],
      },
      {
        title: "Existing coordination challenges become more visible at scale",
        paragraphs: [
          "Even before AI-assisted workflows became common, teams were already navigating different implementation approaches, accessibility handling, frontend workflows, delivery timelines, and design system interpretation.",
          "As delivery becomes faster and more distributed, these differences can scale more quickly across teams and services.",
          "This increases the importance of shared systems and connected workflows.",
          "Traditionally, design systems helped teams standardise interfaces. Today, they also help teams coordinate implementation decisions across workflows.",
          "Shared foundations provide common interaction patterns, accessibility guidance, reusable implementation structures, and familiar experiences across services.",
          "These foundations become especially important when interfaces can be generated rapidly at scale.",
          "When every team can build quickly, consistency needs to be intentionally supported through connected systems, reusable patterns, and shared guidance.",
        ],
      },
      {
        title: "The future challenge is coordination at scale",
        paragraphs: [
          "The industry is entering a phase where generating interfaces and workflows is becoming significantly easier.",
          "As AI reduces the effort required to produce implementation outputs, the focus increasingly shifts towards maintaining coherence, accessibility, predictability, and trust across distributed delivery environments.",
          "This is particularly important in government services. Citizens experience services collectively as part of one broader ecosystem.",
          "Citizens experience the overall quality and consistency of government services as a whole, regardless of agency, implementation approach, frontend framework, or delivery team.",
        ],
      },
      {
        title: "Building faster together",
        paragraphs: [
          "AI creates opportunities for teams to move faster, experiment more, and reduce repetitive work.",
          "Shared operational foundations help teams maintain consistency, accessibility, and coherence as delivery scales.",
          "Strong systems reduce the need to repeatedly solve common implementation problems from scratch.",
          "This creates more space for teams to focus on service-specific needs and meaningful product improvements.",
        ],
      },
      {
        title: "Designing for the AI era",
        paragraphs: [
          "As AI becomes increasingly embedded into digital delivery workflows, the role of design systems continues evolving alongside it.",
          "Design systems are becoming shared coordination layers that help experiences remain coherent, accessible, trustworthy, and recognisably part of the same ecosystem, even as delivery speed continues increasing.",
          "AI can scale delivery.",
          "Shared foundations help experiences scale coherently alongside it.",
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
    closing: [
      "AI changes the speed of delivery. It also changes the speed at which decisions spread.",
      "Shared foundations help teams use that speed responsibly, so government services remain coherent, accessible, and trusted.",
    ],
    ctaLabel: "Explore SGDS and AI",
    ctaHref: "/ai/overview",
  },
  {
    key: "the-learning-curve-before-ai",
    category: "Research",
    title: "The learning curve before AI",
    description:
      "Research notes on how teams adopted SGDS before AI-assisted workflows became part of everyday product delivery.",
    href: "/stories/the-learning-curve-before-ai",
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "Research notes showing SGDS adoption questions",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [
      "Before AI-assisted workflows became part of product delivery conversations, we wanted to better understand how teams were using SGDS in real project environments.",
      "The research focused on practical questions.",
      "Which parts of SGDS felt intuitive? Which parts took more effort to apply? How well did design and development workflows connect during actual delivery work?",
      "Most teams already understood the importance of accessibility, consistency, responsiveness, and DSS compliance.",
      "Teams were actively trying to build services aligned with these principles while balancing delivery timelines, existing workflows, and project constraints.",
    ],
    sections: [
      {
        title: "The reality of government delivery",
        paragraphs: [
          "Many government product teams work within tight timelines and small team sizes.",
          "Frontend resources can also vary significantly across projects.",
          "At the same time, services are expected to meet high standards for accessibility, responsiveness, readability, consistency, and DSS compliance.",
          "For some teams, applying SGDS meant navigating multiple layers of information across design, frontend implementation, accessibility, responsive behaviour, and component usage while delivering active projects.",
        ],
      },
      {
        title: "What we observed",
        paragraphs: [
          "We ran multiple rounds of usability testing and workflow studies across design and development workflows.",
          "One pattern became increasingly visible over time.",
          "Teams were often figuring out how to apply guidance consistently within day-to-day delivery work.",
          "Designers and developers were frequently operating within different tools and workflows.",
          "Designers expected components in Figma to behave close to real implementation. They also needed components to remain visually editable and support quick iteration.",
        ],
        list: [
          "Components behave close to real implementation",
          "Components remain visually editable",
          "Workflows support quick iteration",
        ],
      },
      {
        title: "Developers were navigating different constraints",
        paragraphs: [
          "Developers were navigating a different set of constraints.",
        ],
        list: [
          "Framework constraints",
          "Responsive logic",
          "Accessibility requirements",
          "Component APIs",
          "Token systems",
        ],
      },
      {
        title: "Manual interpretation still sat between both sides",
        paragraphs: [
          "Both disciplines were working towards the same outcome.",
          "Connecting design intent to implementation still required significant manual interpretation across the workflow.",
        ],
      },
      {
        title: "Earlier tooling limitations also shaped the workflow",
        paragraphs: [
          "At the time, earlier Figma workflows also introduced some practical limitations.",
          "Using components directly from the library was not always flexible enough for every product scenario.",
          "Designers sometimes detached components to adapt layouts, customise interactions, or move faster within project constraints.",
          "This meant teams were not always working with components in the most reusable or intended way, even while trying to maintain consistency across products.",
          "Over time, this improved significantly.",
          "Newer Figma capabilities made it easier for teams to stay closer to shared system foundations while still adapting designs to their product needs.",
        ],
        list: [
          "Variables",
          "Improved component properties",
          "More flexible component workflows",
        ],
      },
      {
        title: "Documentation was one part of a much larger workflow",
        paragraphs: [
          "Another observation from the research was that teams were already using documentation regularly.",
          "Applying the guidance during active project work still required teams to move between several sources.",
        ],
        list: [
          "Design files",
          "Implementation examples",
          "Accessibility references",
          "Frontend frameworks",
          "Delivery requirements",
        ],
      },
      {
        title: "Context switching added coordination effort",
        paragraphs: [
          "Each transition required additional context switching and interpretation.",
          "Across larger projects and multiple teams, this coordination effort accumulated over time.",
        ],
      },
      {
        title: "Why local workflows sometimes felt easier",
        paragraphs: [
          "Under delivery pressure, some teams adopted local workflows.",
        ],
        list: [
          "Internal design systems",
          "Custom implementations",
          "Static component libraries",
          "Alternative UI frameworks",
        ],
      },
      {
        title: "Adoption depended on fit",
        paragraphs: [
          "In many cases, local workflows simply felt more familiar or easier to apply within existing project setups and timelines.",
          "The research showed that adoption was closely tied to how naturally SGDS fit into day-to-day workflows, tooling environments, and implementation practices.",
        ],
      },
      {
        title: "Much of the learning curve was coordination work",
        paragraphs: [
          "One of the strongest findings from the research was that many challenges were operational and cross-functional in nature.",
          "Teams frequently had to manually connect several parts of delivery work.",
        ],
        list: [
          "Design intent",
          "Implementation behaviour",
          "Accessibility expectations",
          "Compliance guidance",
        ],
      },
      {
        title: "The information was spread across the workflow",
        paragraphs: [
          "These pieces of information often existed across different tools, documents, and workflows.",
          "Looking back, much of the SGDS learning curve before AI came from the amount of coordination required between design and code, guidance and implementation, and standards and delivery timelines.",
        ],
      },
      {
        title: "AI changes the conversation",
        paragraphs: [
          "This is also why AI changes the conversation today.",
          "AI introduces opportunities for more connected workflows between designers, developers, documentation, and implementation systems.",
          "What previously required searching across multiple systems can increasingly become more direct support.",
        ],
        list: [
          "Contextual guidance",
          "Implementation assistance",
          "Connected workflows",
          "System-aware generation",
        ],
      },
      {
        title: "The path is becoming more connected",
        paragraphs: [
          "The learning curve does not disappear.",
          "It remains part of adopting any shared system.",
          "The workflow around it, however, is becoming significantly more connected.",
        ],
      },
    ],
    metrics: [
      {
        value: "Many",
        title: "Knowledge layers",
        description: "Teams had to connect design, code, accessibility, and compliance guidance.",
      },
      {
        value: "High",
        title: "Translation effort",
        description: "Design intent still needed to become compliant implementation.",
      },
      {
        value: "Lower",
        title: "Future friction",
        description: "AI can bring SGDS guidance closer to delivery work.",
      },
    ],
    closing: [
      "The pre-AI learning curve showed us where SGDS knowledge was hard to apply under real delivery constraints.",
      "AI-assisted workflows can bring that knowledge closer to the moment of delivery.",
    ],
    ctaLabel: "View agent skills",
    ctaHref: "/ai/skills",
  },
  {
    key: "design-and-code-speaking-the-same-language",
    category: "AI",
    title: "Design and code, finally speaking the same language",
    description:
      "How SGDS v3, Figma MCP, Code Connect, and SGDS agent skills help design and development work from shared system context.",
    href: "/stories/design-and-code-speaking-the-same-language",
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "Design and code connected through SGDS v3 foundations",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "From handoff to shared systems",
        paragraphs: [
          "Traditionally, design handoff relied heavily on screenshots, annotations, walkthroughs, and manual interpretation.",
          "Designers created screens in Figma while thinking about hierarchy, interaction behaviour, accessibility, and user flows. Developers then translated those screens into implementation by interpreting spacing, responsive behaviour, component usage, and frontend logic.",
          "Over time, small differences naturally appeared across the workflow. Interaction patterns drifted, accessibility handling varied, and responsive behaviour changed between implementations.",
        ],
      },
      {
        title: "AI is changing how design and development connect",
        paragraphs: [
          "One major shift in AI-assisted delivery is the move from static handoff to connected system context.",
          "Instead of relying only on screenshots and annotations, teams can give AI tools access to structured design information.",
          "Figma MCP is one example. It allows coding agents to read information directly from the design file. This becomes more useful when the design file is built with SGDS v3 components, tokens, and patterns.",
        ],
        diagram: "figmaMcpFlow",
      },
      {
        title: "Connecting design directly to implementation",
        headingLevel: "h3",
        bodyVisual: {
          src: "/ai/figma-to-code.svg",
          alt: "Diagram showing design context flowing from Figma into SGDS implementation code",
          caption: "Figma MCP helps carry structured design context into implementation.",
          width: 976,
          height: 109,
          verticalPadding: true,
        },
        paragraphs: [],
        paragraphsHtml: [
          "A designer working with SGDS can hand over screens through Figma MCP. This means that components inside Figma are no longer isolated from implementation.",
          "With <a href=\"https://developers.figma.com/docs/code-connect/\" target=\"_blank\" rel=\"noreferrer\">Figma Code Connect</a>, those components also carry structured system context linked much more closely to implementation behaviour.",
        ],
        visual: {
          src: "/stories/figma-code-connect-sgds-alert.png",
          alt: "Figma Code Connect view showing an SGDS alert design component beside its linked code component",
          caption:
            "The design system is already connected across both design and development environments.",
          width: 976,
          height: 656,
          fullWidth: true,
        },
        postVisualParagraphs: [
          "This connection gives AI agents access to the same foundations:",
        ],
        postVisualList: [
          "Design tokens for colours, spacing, and other foundations",
          "SGDS component structures that align with the codebase",
          "Repository context from GitHub",
        ],
      },
      {
        title: "SGDS skills help coding agents understand the system",
        headingLevel: "h3",
        paragraphs: [],
        paragraphsHtml: [
          "Implementation is the next part of the workflow. It becomes stronger when <a href=\"/ai/skills\">SGDS agent skills</a> are installed.",
          "These skills give coding agents guidance on component usage, token foundations, layout patterns, content, and implementation structure.",
          "Agents can then work with SGDS guidance instead of guessing. They can map components to patterns, reference tokens and utilities, and generate code that follows intended behaviour more closely.",
          "This works best when designers and developers are both using SGDS.",
        ],
      },
      {
        title: "Sending code back to Figma",
        headingLevel: "h3",
        paragraphs: [
          "Modern product development is gradually moving away from handoff as a one-way process.",
          "Implementation often evolves faster than design files. A developer may ship a feature, adjust a layout based on user feedback, or introduce new sections during development. Over time, the Figma file can drift away from what is running in production.",
          "With Figma MCP, designers can bring implementation back into Figma when needed. A team can ask a coding agent to send the interface back to Figma and map it to SGDS components. The result can become editable layers that designers can review and refine.",
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
      },
      {
        title: "A shared language for design, code, and AI",
        paragraphs: [
          "The value of this workflow is consistency as much as speed.",
          "SGDS components, tokens, Figma MCP, Code Connect, and agent skills help design and implementation use the same system context. Designers can create with components that reflect the codebase. Developers can build with clearer design intent. Agents can work from the same foundations instead of guessing.",
          "Teams still need to review accessibility, interaction quality, content, and production behaviour. The difference is that less effort is spent translating decisions by hand.",
          "That is where SGDS becomes more than a component library. It becomes a shared language for teams and the AI tools working with them.",
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
        description: "The system helps both sides work from the same decisions.",
      },
    ],
    closing: [],
    ctaLabel: "View agent skills",
    ctaHref: "/ai/skills",
    relatedArticle: {
      title: "AI can scale delivery. It can also scale inconsistency",
      href: "/stories/ai-can-scale-delivery-and-inconsistency",
    },
  },
  {
    key: "near-term-promise-of-sgds-v3",
    category: "AI",
    title: "The short to mid term vision for SGDS v3",
    description:
      "How SGDS v3 can reduce repeated effort and help teams spend more time on service quality.",
    href: "/stories/near-term-promise-of-sgds-v3",
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "SGDS v3 foundations reducing repeated product work",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "Less repeated effort",
        paragraphs: [
          "Many product teams solve similar interface problems.",
          "They need page layouts, forms, navigation, search, filters, tables, and clear content.",
          "SGDS v3 helps teams reuse proven decisions instead of rebuilding them for every service.",
        ],
      },
      {
        title: "More time for service quality",
        paragraphs: [
          "When common decisions are already handled, teams can spend more time on what makes the service work.",
          "That includes user needs, policy details, edge cases, accessibility, and operational fit.",
          "The goal is not only faster screens. The goal is better services.",
        ],
      },
      {
        title: "AI makes reuse easier",
        paragraphs: [
          "AI can help teams find and apply SGDS patterns faster.",
          "It can suggest a layout, review a form, or draft content using SGDS guidance.",
          "That gives teams a stronger starting point with less manual searching.",
        ],
      },
    ],
    metrics: [
      {
        value: "Less",
        title: "Repeated setup",
        description: "Teams can start from shared patterns and templates.",
      },
      {
        value: "More",
        title: "Product focus",
        description: "Teams can spend more effort on service-specific problems.",
      },
      {
        value: "Better",
        title: "First drafts",
        description: "AI can apply SGDS guidance earlier in the process.",
      },
    ],
    closing: [
      "The short-term promise of SGDS v3 is practical: reduce repeated work and improve the starting point.",
      "That gives teams more space to focus on the work that affects users most.",
    ],
    ctaLabel: "View templates",
    ctaHref: "/templates/",
  },
  {
    key: "role-of-a-design-system-in-the-agentic-ai-era",
    category: "AI",
    title: "The role of a design system in the agentic AI era",
    description:
      "A longer-term view of how SGDS can guide agents, tools, and teams as AI becomes part of delivery.",
    href: "/stories/role-of-a-design-system-in-the-agentic-ai-era",
    imageSrc: "/stories/sgds-agent-skills-knowledge-flow-poster.jpg",
    imageAlt: "SGDS guidance flowing into AI agents and product teams",
    published: "May 2026",
    author: "Singapore Government Design System team",
    intro: [],
    sections: [
      {
        title: "From documentation to decision support",
        paragraphs: [
          "Design systems have usually been written for people to read.",
          "In the agentic AI era, parts of the system also need to be readable by tools.",
          "The system has to guide decisions as work happens, not only sit in documentation.",
        ],
      },
      {
        title: "Agents need guardrails",
        paragraphs: [
          "AI agents can plan, draft, review, and change interfaces across many steps.",
          "That makes clear guardrails more valuable.",
          "SGDS can help agents understand what good looks like for public services in Singapore.",
        ],
      },
      {
        title: "The system becomes more active",
        paragraphs: [
          "The longer-term opportunity is a design system that is more active in delivery.",
          "It can guide prompts, check output, connect design and code, and help teams maintain consistency over time.",
          "As AI grows more capable, SGDS should help teams stay aligned around users, accessibility, and trust.",
        ],
      },
    ],
    metrics: [
      {
        value: "People",
        title: "Use the system",
        description: "Teams still make product decisions and review the output.",
      },
      {
        value: "Agents",
        title: "Read the system",
        description: "AI tools can use SGDS guidance while they work.",
      },
      {
        value: "Services",
        title: "Stay coherent",
        description: "Shared foundations help experiences scale consistently.",
      },
    ],
    closing: [
      "SGDS can become a stronger bridge between people, agents, and public services.",
      "That is the longer-term direction: a design system that guides work wherever delivery happens.",
    ],
    ctaLabel: "Explore AI guidance",
    ctaHref: "/ai/overview",
  },
];

export const featuredStory = storyPosts[0];

const storyOverviewOrder = [
  "what-sgds-is-often-mistaken-for",
  "the-learning-curve-before-ai",
  "ai-can-scale-delivery-and-inconsistency",
  "design-and-code-speaking-the-same-language",
  "near-term-promise-of-sgds-v3",
  "role-of-a-design-system-in-the-agentic-ai-era",
];

export const storyOverviewCards = storyOverviewOrder
  .map((key) => storyPosts.find((post) => post.key === key))
  .filter((post): post is StoryPost => Boolean(post));

export const getStoryPost = (key: string) =>
  storyPosts.find((post) => post.key === key);
