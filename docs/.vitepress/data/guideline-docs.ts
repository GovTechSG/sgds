import type { ResolvedComponentDoc } from "./component-docs";

type GuidelineAccessibility = {
  sections: Array<{
    title: string;
    description: string[];
    items: string[];
    markup: string;
  }>;
  keyboardInteractions: Array<{
    key: string;
    description: string;
  }>;
};

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
  accessibility?: GuidelineAccessibility;
  anatomyMarkup?: string;
  anatomyCallouts?: Array<{
    number: number;
    direction: "left" | "right" | "top" | "bottom";
    targetSelector: string;
    targetX?: "left" | "center" | "right";
    targetY?: "top" | "center" | "bottom";
    stemLengthToken?: string;
  }>;
};

const guidelineDocs: Record<string, GuidelineDocInput> = {
  "content-guidance": {
    title: "Content guidance",
    summary:
      "Standards for writing clear, consistent copy across government digital services built with SGDS.",
    purposeCards: [
      {
        title: "Build trust through language",
        description:
          "Consistent, clear copy helps citizens trust that they are interacting with a reliable government service.",
      },
      {
        title: "Reduce ambiguity",
        description:
          "Shared writing rules eliminate guesswork for writers, designers, and developers working on the same product.",
      },
      {
        title: "Speed up delivery",
        description:
          "Teams spend less time debating copy decisions when a shared standard already covers spelling, tone, and formatting.",
      },
    ],
    anatomyParts: [
      { number: 1, title: "Heading", note: "(sentence case, clear action)" },
      { number: 2, title: "Helper text", note: "(plain language, no contractions)" },
      { number: 3, title: "Button label", note: "(verb phrase)" },
      { number: 4, title: "Error message", note: "(what happened + what to do)" },
    ],
    anatomyMarkup: `<div style="display: flex; flex-direction: column; gap: 0; max-width: 360px; margin: 0 auto; border: 1px solid var(--sgds-border-color-muted); border-radius: var(--sgds-border-radius-lg); overflow: hidden; background: var(--sgds-surface-default);">
  <div class="portal-content-heading" style="padding: 20px 24px 12px;">
    <p style="margin: 0; font-size: var(--sgds-font-size-4); font-weight: var(--sgds-font-weight-semibold); color: var(--sgds-heading-color-default);">Upload your document</p>
  </div>
  <div class="portal-content-helper" style="padding: 0 24px 12px;">
    <p style="margin: 0; font-size: var(--sgds-font-size-2); color: var(--sgds-body-color-subtle);">Select a PDF or image file under 5 MB. You do not need to compress the file.</p>
  </div>
  <div class="portal-content-button" style="padding: 0 24px 8px;">
    <sgds-button variant="primary" size="sm">Upload file</sgds-button>
  </div>
  <div class="portal-content-error" style="padding: 8px 24px 20px;">
    <p style="margin: 0; font-size: var(--sgds-font-size-1); color: var(--sgds-danger-default);">The file is too large. Upload a file under 5 MB.</p>
  </div>
</div>`,
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-content-heading", targetX: "right", targetY: "center", stemLengthToken: "--sgds-dimension-56" },
      { number: 2, direction: "right", targetSelector: ".portal-content-helper", targetX: "right", targetY: "center", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "right", targetSelector: ".portal-content-button", targetX: "right", targetY: "center", stemLengthToken: "--sgds-dimension-56" },
      { number: 4, direction: "right", targetSelector: ".portal-content-error", targetX: "right", targetY: "center", stemLengthToken: "--sgds-dimension-56" },
    ],
    demos: [
      {
        title: "Success message",
        description:
          "Confirm the action with past tense. Keep it short.",
        markup: `<div style="max-width: 400px; margin: 0 auto;">
  <sgds-alert show variant="success" title="Application submitted">
    <div>You will receive a confirmation email within 24 hours.</div>
  </sgds-alert>
</div>`,
      },
      {
        title: "Error message",
        description:
          "State what happened and what the user should do next. Do not blame the user.",
        markup: `<div style="max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
  <sgds-alert show variant="danger" title="File upload failed">
    <div>The file is too large. Upload a file under 5 MB.</div>
  </sgds-alert>
</div>`,
      },
      {
        title: "Empty state",
        description:
          "Explain why the space is empty and offer a next step.",
        markup: `<div style="max-width: 400px; margin: 0 auto; padding: 32px; text-align: center; border: 1px solid var(--sgds-border-color-muted); border-radius: var(--sgds-border-radius-lg); background: var(--sgds-surface-default);">
  <p style="margin: 0 0 4px; font-weight: var(--sgds-font-weight-semibold); color: var(--sgds-heading-color-default);">No applications yet</p>
  <p style="margin: 0 0 16px; font-size: var(--sgds-font-size-2); color: var(--sgds-body-color-subtle);">Start your first application to see it here.</p>
  <sgds-button variant="primary" size="sm">Start application</sgds-button>
</div>`,
      },
    ],
    guidance: [
      {
        title: "Voice and tone",
        tone: "do",
        items: [
          "Write as a trusted, competent partner. GovTech's voice is clear, direct, respectful, and purposeful.",
          "Address the reader as \"you\" and use active voice. Put the most relevant information in the first sentence.",
          "Keep sentences under 20 words. If a sentence needs a clause to clarify another clause, split it into two.",
        ],
      },
      {
        title: "Language to avoid",
        tone: "dont",
        items: [
          "Do not use corporate jargon: \"leverage\", \"synergise\", \"holistic approach\", \"innovative\", \"cutting-edge\".",
          "Do not use subjective adjectives: \"important\", \"easy\", \"simple\", \"quick\". If it is simple, let the design demonstrate that.",
          "Do not use filler phrases: \"please note that\", \"it should be noted\", \"in order to\", \"at this point in time\".",
          "Do not use \"please\" in instructions. Write \"Submit the form\", not \"Please submit the form\".",
        ],
      },
    ],
    content: [
      {
        title: "Spelling and capitalisation",
        items: [
          "Use UK English spelling throughout: \"colour\", \"organisation\", \"recognise\", \"analyse\", \"catalogue\".",
          "Use sentence case for all headings, labels, buttons, and error messages. Capitalise the first word and proper nouns only.",
          "Do not capitalise job titles used descriptively. Capitalise only when used as a title directly before a name.",
        ],
      },
      {
        title: "Grammar rules",
        items: [
          "Do not use contractions. Write \"do not\" instead of \"don't\", \"you will\" instead of \"you'll\", \"we have\" instead of \"we've\".",
          "Use active voice. The subject performs the action: \"The system sends a confirmation\", not \"A confirmation is sent by the system\".",
          "Do not use contrastive negation (the pattern \"not X, but Y\"). Write \"A full project management tool\" instead of \"Not a bug tracker, but a full project management tool\".",
          "Use the Oxford comma in lists of three or more items: \"NRIC, passport, and proof of address\".",
        ],
      },
      {
        title: "Punctuation",
        items: [
          "Do not use the em dash under any circumstances. Use a colon, comma pair, or a new sentence instead.",
          "Use a hyphen for compound modifiers before a noun: \"user-friendly interface\", \"end-to-end encryption\".",
          "Use an en dash only for number ranges: \"pages 10–15\", \"2020–2024\".",
          "Do not use apostrophes for plurals: \"APIs\" not \"API's\", \"PDFs\" not \"PDF's\".",
        ],
      },
      {
        title: "Numbers, dates, and times",
        items: [
          "Spell out numbers one to nine. Use numerals for 10 and above.",
          "Always use numerals for percentages (5%), currency ($10), measurements (3 MB), and version numbers (version 2).",
          "Write dates as: 1 January 2025. No ordinal suffixes.",
          "Write times as: 9am, 3:30pm. No space between number and am/pm.",
        ],
      },
      {
        title: "Modal verbs",
        items: [
          "Use \"must\" for legal obligations: \"You must submit the form by 31 January.\"",
          "Use \"need to\" for administrative steps: \"You need to verify your email before signing in.\"",
          "Use \"should\" for recommendations: \"You should save your progress regularly.\"",
          "Use \"may\" for optional actions: \"You may attach supporting documents.\"",
        ],
      },
    ],
    bestPractices: [
      {
        title: "Lead with the action",
        tone: "do",
        description:
          "Put the key point in the first sentence. Tell users what to do before explaining why.",
        markup: `<div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
  <p style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-weight: var(--sgds-font-weight-semibold);">Button label</p>
  <p style="margin: 0; color: var(--sgds-body-color-subtle);">Submit application</p>
</div>`,
      },
      {
        title: "Do not use vague labels",
        tone: "dont",
        description:
          "Avoid generic labels that do not tell the user what will happen.",
        markup: `<div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
  <p style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-weight: var(--sgds-font-weight-semibold);">Button label</p>
  <p style="margin: 0; color: var(--sgds-body-color-subtle);">Click here</p>
</div>`,
      },
      {
        title: "State what happened and what to do next",
        tone: "do",
        description:
          "Error messages should explain the problem and give a clear next step.",
        markup: `<div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
  <p style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-weight: var(--sgds-font-weight-semibold);">Error message</p>
  <p style="margin: 0; color: var(--sgds-body-color-subtle);">The file is too large. Upload a file under 5 MB.</p>
</div>`,
      },
      {
        title: "Do not blame the user",
        tone: "dont",
        description:
          "Avoid language that makes the user feel they did something wrong.",
        markup: `<div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
  <p style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-weight: var(--sgds-font-weight-semibold);">Error message</p>
  <p style="margin: 0; color: var(--sgds-body-color-subtle);">You uploaded a file that is too large. Please upload a smaller file.</p>
</div>`,
      },
    ],
    accessibility: {
      sections: [
        {
          title: "Writing for screen readers",
          description: [
            "Content decisions directly affect how screen-reader users experience a service. Clear, structured copy benefits all users.",
          ],
          items: [
            "Do not rely on colour alone to convey meaning. Always pair colour with text.",
            "Write link text that makes sense out of context: \"Download the annual report (PDF, 2 MB)\", not \"click here\".",
            "Write alt text that describes function, not appearance: \"GovTech logo\", not \"blue rectangular image with text\".",
            "Avoid directional instructions that rely on visual layout: \"see the section on the right\" does not work for screen-reader users.",
          ],
          markup: `<div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
  <p style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-weight: var(--sgds-font-weight-semibold);">Accessible link text</p>
  <p style="margin: 0; color: var(--sgds-body-color-subtle);">Download the annual report (PDF, 2 MB)</p>
</div>`,
        },
        {
          title: "Content structure",
          description: [
            "Well-structured content helps assistive technology users navigate and understand pages.",
          ],
          items: [
            "Use heading levels in order (H1, H2, H3). Do not skip levels for visual styling.",
            "Keep paragraphs short. One idea per paragraph helps screen-reader users scan content.",
            "Use lists for three or more related items. Lists are easier to navigate than inline comma-separated values.",
            "Write descriptive table headers. Screen readers announce headers to help users understand each cell.",
          ],
          markup: `<div style="padding: 20px; border: 1px solid var(--sgds-border-color-muted); background: var(--sgds-surface-default); border-radius: var(--sgds-border-radius-lg);">
  <p style="margin: 0 0 8px; color: var(--sgds-heading-color-default); font-weight: var(--sgds-font-weight-semibold);">Heading structure</p>
  <p style="margin: 0; color: var(--sgds-body-color-subtle);">H1 → H2 → H3 (in order, no skipping)</p>
</div>`,
        },
      ],
      keyboardInteractions: [
        {
          key: "Heading navigation",
          description: "Screen-reader users navigate by headings. Use a clear, sequential heading hierarchy so users can jump between sections.",
        },
        {
          key: "Link context",
          description: "Links are often listed out of context. Each link text should describe its destination without relying on surrounding text.",
        },
      ],
    },
  },
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
    anatomyMarkup: doc.anatomyMarkup ?? doc.demos[0]?.markup,
    anatomyCallouts: doc.anatomyCallouts,
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
    accessibility: doc.accessibility ?? {
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
