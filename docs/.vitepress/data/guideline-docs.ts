import type { ResolvedComponentDoc } from "./component-docs";

type GuidelineDocInput = {
  title: string;
  summary: string;
  purposeCards: Array<{
    title: string;
    description: string;
  }>;
  anatomyParts: Array<{
    number: number;
    title: string;
    note?: string;
  }>;
  demos: Array<{
    title: string;
    description: string;
    markup: string;
  }>;
  guidance: Array<{
    title: string;
    tone: "do" | "dont";
    items: string[];
  }>;
  content: Array<{
    title: string;
    items: string[];
  }>;
  bestPractices: Array<{
    title: string;
    tone: "do" | "dont";
    description: string;
    markup: string;
  }>;
};

const guidelineDocs: Record<string, GuidelineDocInput> = {
  overview: {
    title: "Guidelines",
    summary:
      "Guidelines explain how to apply SGDS foundations, components, and patterns consistently across real product experiences.",
    purposeCards: [
      {
        title: "Guide decisions",
        description:
          "Use guidelines to decide how and when SGDS foundations, components, and patterns should be applied in real product flows.",
      },
      {
        title: "Keep products aligned",
        description:
          "They help teams make consistent design and implementation choices across different services and contributors.",
      },
      {
        title: "Reduce rework",
        description:
          "Shared guidance makes it easier to avoid inconsistent patterns and fix issues earlier in the process.",
      },
    ],
    anatomyParts: [
      { number: 1, title: "Foundations", note: "(visual rules)" },
      { number: 2, title: "Components", note: "(building blocks)" },
      { number: 3, title: "Patterns", note: "(composed solutions)" },
      { number: 4, title: "Decision guidance", note: "(how to apply them)" },
    ],
    demos: [
      {
        title: "Guideline structure",
        description:
          "A guideline brings together foundations, components, and patterns so teams can make consistent product decisions.",
        markup: `<div class="portal-demo-stack">
  <div class="portal-demo-row" style="justify-content: center;">
    <sgds-badge variant="neutral" outlined>Foundations</sgds-badge>
    <sgds-icon name="arrow-right"></sgds-icon>
    <sgds-badge variant="neutral" outlined>Components</sgds-badge>
    <sgds-icon name="arrow-right"></sgds-icon>
    <sgds-badge variant="neutral" outlined>Patterns</sgds-badge>
  </div>
  <div style="padding: 24px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
    <h3 style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-size: var(--sgds-font-size-4); font-weight: var(--sgds-font-weight-semibold);">Decision guidance</h3>
    <p style="margin: 0; color: var(--sgds-body-color-subtle);">Use SGDS building blocks consistently so layouts, interactions, and behaviours stay predictable across services.</p>
  </div>
</div>`,
      },
    ],
    guidance: [
      {
        title: "When to use",
        tone: "do",
        items: [
          "Use guidelines when teams need shared decision-making rules, not just UI building blocks.",
          "Apply them when translating SGDS foundations, components, and patterns into product-specific decisions.",
        ],
      },
      {
        title: "When not to use",
        tone: "dont",
        items: [
          "Do not use guidelines as a replacement for the component and pattern references themselves.",
          "Avoid turning guidelines into rigid rules when the context clearly calls for a different SGDS-supported solution.",
        ],
      },
    ],
    content: [
      {
        title: "Scope",
        items: [
          "Explain what kind of decisions the guideline supports and where it should be applied.",
          "Make the relationship between foundations, components, and patterns explicit.",
        ],
      },
      {
        title: "Recommendations",
        items: [
          "Write recommendations in plain language so teams can act on them quickly.",
          "Keep examples close to the guidance they support.",
        ],
      },
    ],
    bestPractices: [
      {
        title: "Use guidelines to support decisions",
        tone: "do",
        description:
          "Use guidance to explain why a pattern should be chosen and how it should be applied in context.",
        markup: `<div class="portal-demo-stack">
  <div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
    <h3 style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-size: var(--sgds-font-size-3); font-weight: var(--sgds-font-weight-semibold);">Choose the pattern that matches the user task</h3>
    <p style="margin: 0; color: var(--sgds-body-color-subtle);">Use a multi-step form only when the flow is complex enough to benefit from progressive disclosure.</p>
  </div>
</div>`,
      },
      {
        title: "Do not repeat the reference pages",
        tone: "dont",
        description:
          "Avoid copying component API details into guidelines when the real need is decision support and context.",
        markup: `<div class="portal-demo-stack">
  <div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
    <h3 style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-size: var(--sgds-font-size-3); font-weight: var(--sgds-font-weight-semibold);">Accordion</h3>
    <p style="margin: 0; color: var(--sgds-body-color-subtle);">Props: density, variant, start slot, end slot...</p>
  </div>
</div>`,
      },
    ],
  },
};

const buildUpdates = (doc: GuidelineDocInput) => ({
  updates: {
    title: "Updates",
    columns: ["Date", "Version", "Description"],
    rows: [
      {
        Date: "TBD",
        Version: "TBD",
        Description: `${doc.title} updates will be documented here.`,
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    columns: ["Planned item", "Status", "Target"],
    rows: [
      {
        "Planned item": `Future additions for ${doc.title.toLowerCase()}`,
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
    linkLabel: "Issues → sgds/guidelines",
    href: "#",
  },
});

export function getGuidelineDoc(key: string): ResolvedComponentDoc | null {
  const doc = guidelineDocs[key];
  if (!doc) return null;

  return {
    key: `guideline-${key}`,
    title: doc.title,
    summary: doc.summary,
    tag: "div",
    group: "layout",
    demos: doc.demos,
    purposeCards: doc.purposeCards,
    anatomyMarkup: doc.demos[0]?.markup,
    resolvedAnatomyParts: doc.anatomyParts,
    usage: {
      guidance: doc.guidance,
      content: doc.content,
      behaviours: doc.demos.map((demo) => ({
        ...demo,
        surface: "default",
      })),
      bestPractices: doc.bestPractices,
    },
    accessibility: {
      sections: [
        {
          title: "Keyboard support",
          description: [
            "Guidelines should support SGDS components and patterns without interrupting their built-in keyboard behaviour.",
            "Keep interaction guidance aligned with the actual SGDS references used in the product.",
          ],
          items: [],
          markup: doc.demos[0]?.markup || "<div></div>",
        },
        {
          title: "Tab order",
          description: [],
          items: [
            "Move focus through the related SGDS components in reading order.",
            "Ensure interactive elements stay discoverable and predictable.",
            "Keep supporting content reachable when sections expand or reveal more information.",
            "Continue to the next interactive element on the page.",
          ],
          markup: doc.demos[0]?.markup || "<div></div>",
        },
      ],
      keyboardInteractions: [
        {
          key: "Tab",
          description: "Moves focus to the next interactive element described by the guideline’s recommended pattern.",
        },
        {
          key: "Shift + Tab",
          description: "Moves focus to the previous interactive element.",
        },
      ],
    },
    updates: buildUpdates(doc),
    props: [],
    measurements: [],
    metadataStatus: {
      figma: "unavailable",
      responsive: "unavailable",
      storybook: "unavailable",
    },
  };
}
