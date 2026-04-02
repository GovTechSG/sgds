import type { ResolvedComponentDoc } from "./component-docs";

type ResourceDocInput = {
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

const resourceDocs: Record<string, ResourceDocInput> = {
  overview: {
    title: "Resources",
    summary:
      "Resources provide supporting materials, references, and downloadable assets to help teams design and build with SGDS effectively.",
    purposeCards: [
      {
        title: "Support delivery",
        description:
          "Use resources to give teams quick access to reference materials, assets, and implementation support around SGDS.",
      },
      {
        title: "Reduce setup time",
        description:
          "Centralised resources help teams find the right starting points, downloads, and references faster.",
      },
      {
        title: "Keep teams aligned",
        description:
          "Shared resources reduce duplicated work and help contributors use the same SGDS references across products.",
      },
    ],
    anatomyParts: [
      { number: 1, title: "Reference material", note: "(guides and docs)" },
      { number: 2, title: "Assets", note: "(downloads and files)" },
      { number: 3, title: "Examples", note: "(implementation support)" },
      { number: 4, title: "Links", note: "(entry points to tools)" },
    ],
    demos: [
      {
        title: "Resource structure",
        description:
          "A resource page should help teams find supporting materials, asset links, and references quickly.",
        markup: `<div class="portal-demo-stack">
  <div class="portal-demo-row" style="justify-content: center;">
    <sgds-badge variant="neutral" outlined>References</sgds-badge>
    <sgds-icon name="arrow-right"></sgds-icon>
    <sgds-badge variant="neutral" outlined>Assets</sgds-badge>
    <sgds-icon name="arrow-right"></sgds-icon>
    <sgds-badge variant="neutral" outlined>Examples</sgds-badge>
  </div>
  <div style="padding: 24px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
    <h3 style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-size: var(--sgds-font-size-4); font-weight: var(--sgds-font-weight-semibold);">One place to find what you need</h3>
    <p style="margin: 0; color: var(--sgds-body-color-subtle);">Bring together the files, references, and examples that help teams move from guidance to implementation.</p>
  </div>
</div>`,
      },
    ],
    guidance: [
      {
        title: "When to use",
        tone: "do",
        items: [
          "Use resources when teams need direct access to assets, links, and supporting references beyond the main documentation pages.",
          "Group related materials so users can move from overview to download or implementation quickly.",
        ],
      },
      {
        title: "When not to use",
        tone: "dont",
        items: [
          "Do not duplicate full guidance content if a dedicated foundation, component, or pattern page already covers it.",
          "Avoid turning resource pages into long narrative documentation when users really need direct access to materials.",
        ],
      },
    ],
    content: [
      {
        title: "References",
        items: [
          "Surface the most relevant links and documents first.",
          "Keep labels clear so users can tell whether something is a guide, file, or example.",
        ],
      },
      {
        title: "Assets",
        items: [
          "Make downloads easy to scan and easy to differentiate.",
          "Keep the resource page focused on helping teams retrieve what they need quickly.",
        ],
      },
    ],
    bestPractices: [
      {
        title: "Group resources by task",
        tone: "do",
        description:
          "Organise supporting materials so teams can find the right file, guide, or example with minimal effort.",
        markup: `<div class="portal-demo-stack">
  <div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
    <h3 style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-size: var(--sgds-font-size-3); font-weight: var(--sgds-font-weight-semibold);">Resources for design, build, and handoff</h3>
    <p style="margin: 0; color: var(--sgds-body-color-subtle);">Group downloads and references under clear categories so each team can go straight to what they need.</p>
  </div>
</div>`,
      },
      {
        title: "Do not bury key assets",
        tone: "dont",
        description:
          "Avoid forcing users to read through long pages before they can find a file or link they need immediately.",
        markup: `<div class="portal-demo-stack">
  <div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
    <h3 style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-size: var(--sgds-font-size-3); font-weight: var(--sgds-font-weight-semibold);">Long wall of text</h3>
    <p style="margin: 0; color: var(--sgds-body-color-subtle);">Download links and examples are hidden deep inside explanatory content.</p>
  </div>
</div>`,
      },
    ],
  },
};

const buildUpdates = (doc: ResourceDocInput) => ({
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
    linkLabel: "Issues → sgds/resources",
    href: "#",
  },
});

export function getResourceDoc(key: string): ResolvedComponentDoc | null {
  const doc = resourceDocs[key];
  if (!doc) return null;

  return {
    key: `resource-${key}`,
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
            "Resource pages should keep links, downloads, and related references keyboard reachable and predictable.",
            "Navigation between supporting materials should stay consistent with the SGDS patterns used across the site.",
          ],
          items: [],
          markup: doc.demos[0]?.markup || "<div></div>",
        },
        {
          title: "Tab order",
          description: [],
          items: [
            "Move focus through links and resource actions in a clear reading order.",
            "Ensure downloads and supporting references remain discoverable by keyboard.",
            "Keep grouped resource actions predictable and easy to scan.",
            "Continue to the next interactive element on the page.",
          ],
          markup: doc.demos[0]?.markup || "<div></div>",
        },
      ],
      keyboardInteractions: [
        {
          key: "Tab",
          description: "Moves focus to the next link, download, or interactive resource element.",
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
