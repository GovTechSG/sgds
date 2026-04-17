import type { ResolvedComponentDoc } from "./component-docs";

type PatternGroup = "page templates" | "block templates";

export type PatternDemo = {
  title: string;
  description: string;
  markup: string;
};

type UsageGuidance = {
  title: string;
  tone: "do" | "dont";
  items: string[];
};

type PatternDoc = {
  title: string;
  group: PatternGroup;
  usedComponents: string[];
  whenToUse: string[];
  whenNotToUse?: string[];
  demos: PatternDemo[];
  bestPractices?: UsageGuidance[];
};

const patternDocs: Record<string, PatternDoc> = {
  hero: {
    title: "Hero",
    group: "block templates",
    usedComponents: ["sgds-button"],
    whenToUse: [
      "At the top of a landing page to communicate the primary value proposition",
      "When you need a strong visual anchor before the main page content",
    ],
    whenNotToUse: [
      "On detail or utility pages where users already know the context",
      "Inside dashboards or data-heavy interfaces",
    ],
    demos: [
      {
        title: "Default",
        description: "A full-width hero with a headline, description, and primary call-to-action button.",
        markup: `<div style="padding: 64px 40px; background: var(--sgds-surface-raised); text-align: center;">
  <h1 style="font-size: var(--sgds-font-size-8); font-weight: var(--sgds-font-weight-bold); color: var(--sgds-heading-color-default); margin-bottom: 16px;">Build with SGDS</h1>
  <p style="font-size: var(--sgds-font-size-3); color: var(--sgds-body-color-subtle); max-width: 480px; margin: 0 auto 32px;">Design and build government digital services with consistency, speed, and confidence.</p>
  <sgds-button variant="primary" size="lg">Get started</sgds-button>
</div>`,
      },
    ],
    bestPractices: [
      {
        title: "Headline copy",
        tone: "do",
        items: [
          "Keep the headline short — one clear benefit or action",
          "Lead with what the user gets, not what your service is",
        ],
      },
      {
        title: "Overloading the hero",
        tone: "dont",
        items: [
          "Don't put more than two calls to action in the hero",
          "Don't use the hero for secondary navigation or filters",
        ],
      },
    ],
  },
  "card-grid": {
    title: "Card grid",
    group: "block templates",
    usedComponents: ["sgds-card"],
    whenToUse: [
      "To display a collection of items of equal importance",
      "When users need to scan and compare multiple options",
      "For service listings, feature highlights, or resource collections",
    ],
    whenNotToUse: [
      "When items have a clear hierarchy — use a list instead",
      "When there are fewer than three items",
    ],
    demos: [
      {
        title: "3-column grid",
        description: "Equal-width cards in a responsive three-column layout.",
        markup: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
  <sgds-card>
    <div slot="card-body">
      <h5>Service one</h5>
      <p>Brief description of what this service does and who it is for.</p>
    </div>
  </sgds-card>
  <sgds-card>
    <div slot="card-body">
      <h5>Service two</h5>
      <p>Brief description of what this service does and who it is for.</p>
    </div>
  </sgds-card>
  <sgds-card>
    <div slot="card-body">
      <h5>Service three</h5>
      <p>Brief description of what this service does and who it is for.</p>
    </div>
  </sgds-card>
</div>`,
      },
    ],
  },
  "form-page": {
    title: "Form page",
    group: "page templates",
    usedComponents: ["sgds-input", "sgds-select", "sgds-button", "sgds-breadcrumb"],
    whenToUse: [
      "For single-topic forms where all fields can be shown on one screen",
      "When the form is short enough not to need a stepper (under 8 fields)",
    ],
    whenNotToUse: [
      "For multi-step forms — use the stepper page template instead",
      "When the form requires conditional branching based on user answers",
    ],
    demos: [
      {
        title: "Default",
        description: "A simple form page with a heading, description, fields, and submission actions.",
        markup: `<div style="max-width: 600px; padding: 32px;">
  <h2 style="font-size: var(--sgds-font-size-6); font-weight: var(--sgds-font-weight-semibold); color: var(--sgds-heading-color-default); margin-bottom: 8px;">Contact details</h2>
  <p style="color: var(--sgds-body-color-subtle); margin-bottom: 32px;">All fields are required unless marked optional.</p>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <sgds-input label="Full name" placeholder="Enter your full name"></sgds-input>
    <sgds-input label="Email address" type="email" placeholder="email@example.gov.sg"></sgds-input>
    <sgds-input label="Phone number (optional)" type="tel" placeholder="+65"></sgds-input>
    <sgds-select label="Agency">
      <sgds-option value="">Select agency</sgds-option>
      <sgds-option value="gds">GovTech</sgds-option>
    </sgds-select>
  </div>
  <div style="display: flex; gap: 12px; margin-top: 32px;">
    <sgds-button variant="primary">Submit</sgds-button>
    <sgds-button variant="outline">Cancel</sgds-button>
  </div>
</div>`,
      },
    ],
  },
  "multi-step-form": {
    title: "Multi-step form",
    group: "page templates",
    usedComponents: ["sgds-stepper", "sgds-input", "sgds-button", "sgds-breadcrumb"],
    whenToUse: [
      "When a form has more than 8 fields and benefits from being broken into logical steps",
      "When different sections of the form require different levels of user attention",
      "For complex transactional flows like applications or registrations",
    ],
    whenNotToUse: [
      "For simple forms that fit on one page — use the form page template instead",
    ],
    demos: [
      {
        title: "Default",
        description: "A multi-step form with a stepper indicator, step content, and navigation buttons.",
        markup: `<div style="max-width: 680px; padding: 32px;">
  <sgds-stepper data-portal-stepper="default"></sgds-stepper>
  <div style="margin: 32px 0; padding: 24px; background: var(--sgds-surface-raised); border: 1px solid var(--sgds-border-color-muted); border-radius: 8px;">
    <h3 style="font-size: var(--sgds-font-size-4); font-weight: var(--sgds-font-weight-semibold); color: var(--sgds-heading-color-default); margin-bottom: 20px;">Personal details</h3>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <sgds-input label="Full name"></sgds-input>
      <sgds-input label="NRIC / FIN" placeholder="S0000000A"></sgds-input>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <sgds-button variant="outline" disabled>Back</sgds-button>
    <sgds-button variant="primary">Next</sgds-button>
  </div>
</div>`,
      },
    ],
  },
};

const buildPatternPurposeCards = (doc: PatternDoc) => [
  {
    title: "Support the page structure",
    description:
      doc.whenToUse[0] ||
      `${doc.title} helps organise content with a reusable SGDS pattern.`,
  },
  {
    title: "Keep the layout consistent",
    description:
      doc.whenToUse[1] ||
      "Use the same SGDS building blocks to keep spacing, hierarchy, and interaction patterns predictable.",
  },
  {
    title: "Use it intentionally",
    description:
      doc.whenNotToUse?.[0] ||
      "Choose this pattern only when its structure fits the task better than a simpler page section.",
  },
];

const buildPatternAnatomyParts = (doc: PatternDoc) =>
  (doc.usedComponents.length ? doc.usedComponents : ["sgds-container"]).map((component, index) => ({
    number: index + 1,
    title: component,
    note: "(used)",
  }));

const buildPatternGuidance = (doc: PatternDoc) => {
  const guidance = [
    {
      title: "When to use",
      tone: "do" as const,
      items: doc.whenToUse,
    },
  ];

  if (doc.whenNotToUse?.length) {
    guidance.push({
      title: "When not to use",
      tone: "dont" as const,
      items: doc.whenNotToUse,
    });
  }

  return guidance;
};

const buildPatternBestPractices = (doc: PatternDoc) =>
  (doc.bestPractices ?? []).map((practice) => ({
    title: practice.title,
    tone: practice.tone,
    description: practice.items.join(" "),
    markup: doc.demos[0]?.markup || `<div></div>`,
  }));

const buildPatternAccessibilitySections = (doc: PatternDoc) => {
  const previewMarkup = doc.demos[0]?.markup || `<div></div>`;

  return [
    {
      title: "Keyboard support",
      description: [
        `Use the SGDS components inside the ${doc.title.toLowerCase()} pattern so keyboard behaviour stays predictable.`,
        "Check focus order and action placement in the surrounding page context, especially when the pattern groups multiple interactive elements together.",
      ],
      items: [],
      markup: previewMarkup,
    },
    {
      title: "Tab order",
      description: [],
      items: [
        "Move focus into the pattern.",
        "Navigate through interactive elements in visual order.",
        "Confirm any revealed or supporting content remains reachable.",
        "Continue to the next interactive element on the page.",
      ],
      markup: previewMarkup,
    },
  ];
};

const buildPatternUpdates = (doc: PatternDoc) => ({
  updates: {
    title: "Updates",
    columns: ["Date", "Version", "Description"],
    rows: [
      {
        Date: "TBD",
        Version: "TBD",
        Description: `${doc.title} pattern updates will be documented here.`,
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    columns: ["Planned item", "Status", "Target"],
    rows: [
      {
        "Planned item": `Future improvements for ${doc.title.toLowerCase()}`,
        Status: "Planned",
        Target: "TBD",
      },
    ],
  },
  feedback: {
    title: "Feedback",
    heading: "Have suggestions or feedback?",
    prefix: "Share them with us on ",
    linkLabel: "Slack → #design-system-feedback",
    href: "#",
  },
  bugReports: {
    title: "Bug Reports",
    heading: "Found a bug or issue?",
    prefix: "Report it on GitHub ",
    linkLabel: `Issues → sgds/patterns/${doc.title.toLowerCase().replace(/\s+/g, "-")}`,
    href: "#",
  },
});

export function getPatternDoc(key: string): ResolvedComponentDoc | null {
  const doc = patternDocs[key];
  if (!doc) return null;

  return {
    key,
    title: doc.title,
    summary:
      doc.whenToUse[0] ||
      doc.demos[0]?.description ||
      `${doc.title} is an SGDS pattern for building structured interfaces.`,
    tag: "div",
    group: "layout",
    demos: doc.demos,
    purposeCards: buildPatternPurposeCards(doc),
    anatomyMarkup: doc.demos[0]?.markup,
    resolvedAnatomyParts: buildPatternAnatomyParts(doc),
    usage: {
      guidance: buildPatternGuidance(doc),
      behaviours: doc.demos.map((demo) => ({
        ...demo,
        surface: "default",
      })),
      bestPractices: buildPatternBestPractices(doc),
    },
    accessibility: {
      sections: buildPatternAccessibilitySections(doc),
      keyboardInteractions: [
        {
          key: "Tab",
          description: `Moves focus through the interactive elements inside the ${doc.title.toLowerCase()} pattern.`,
        },
        {
          key: "Shift + Tab",
          description: "Moves focus to the previous interactive element.",
        },
        {
          key: "Enter",
          description: "Activates the focused action or confirms the current selection when supported.",
        },
        {
          key: "Space",
          description: "Activates focused controls when the contained SGDS component supports toggling or selection.",
        },
      ],
    },
    updates: buildPatternUpdates(doc),
    props: [],
    measurements: [],
    metadataStatus: {
      figma: "available",
      responsive: "unavailable",
      storybook: "unavailable",
    },
  };
}
