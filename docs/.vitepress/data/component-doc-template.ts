/**
 * ============================================================================
 * COMPONENT DOC TEMPLATE — the canonical "accordion v1" pattern, universalised
 * ============================================================================
 *
 * This file is the single source-of-truth template for every component doc
 * entry in `component-docs.ts`. Every SGDS component page — Accordion,
 * Button, Alert, Input, etc. — is rendered from the same
 * `ComponentDesignPage.vue` engine using the shape documented here.
 *
 * This file is NOT imported by the renderer. It exists only as a copy-paste
 * starting point and a human/agent reference.
 *
 * HOW TO APPLY TO A NEW COMPONENT
 * ------------------------------------------------------------------------
 * 1. Duplicate `componentDocTemplate` below and rename it to your component key.
 * 2. Fill in every `TODO:` placeholder; delete any optional section you do
 *    not need. Sections without data hide themselves automatically.
 * 3. Paste the resulting entry into the `componentDocs` map in
 *    `component-docs.ts` using your component key.
 * 4. Create `docs/components/<your-component>.md` with:
 *      <ComponentDesignPage component-key="<your-component>" />
 *
 * PAGE LAYOUT — 4 TABS (no Code tab)
 * ------------------------------------------------------------------------
 * The page is laid out as an `<sgds-tab-group variant="underlined">` with
 * exactly four panels, always in this order:
 *
 *   Design  →  Usage  →  Accessibility  →  Updates
 *
 * The Code tab was removed from the universal template. Code snippets live
 * in the Storybook/repo reference — the docs site is design-oriented.
 *
 * DESIGN TAB — rendering order (top → bottom)
 * ------------------------------------------------------------------------
 *   1. Header           → `title` + `summary` (rendered by the page wrapper)
 *                       → The page header also auto-injects two outbound
 *                         links — GitHub (source on the web component repo)
 *                         and Storybook (live example). URLs are DERIVED from
 *                         the doc key via `getComponentHeaderLinks()` in
 *                         `component-docs.ts`, so no per-page frontmatter is
 *                         needed. A page can still override by supplying its
 *                         own `headerLinks:` frontmatter list.
 *   2. Purpose          → `purposeCards` (3 cards)
 *   3. Anatomy          → `anatomyAsset` OR `anatomyMarkup` + `anatomyParts`
 *                         (+ optional `anatomyCallouts`)
 *                       → The anatomy canvas is INFORMATIONAL. The component
 *                         inside receives `pointer-events: none` universally
 *                         so it cannot be toggled / clicked / hovered.
 *                         Callout overlays still work via `anatomyCallouts`.
 *   4. Configuration    → `configurationDemos` — one box per property, each
 *                         box contains an `<sgds-tab-group variant="solid"
 *                         density="compact">` to switch between the variant
 *                         options of that property. Falls back to a
 *                         `BehaviourSection` rendering of `demos` if no
 *                         `configurationDemos` is provided.
 *   5. Structure        → `measurements` (optional preview) +
 *                         `measurementTokens` (main table) +
 *                         `measurementTokenGroups` (variant sub-tables, e.g.
 *                         default / compact / spacious)
 *                       → Each measurement preview is wrapped in a grey
 *                         bordered "demo box" (alternate surface background,
 *                         muted border, rounded corners) for visual parity
 *                         with the accordion v1 Structure section. The
 *                         wrapper is applied universally by
 *                         `MeasurementsSection.vue` — no per-doc config.
 *                       → The table columns are always:
 *                         Element | Property | Design token | Value
 *
 * USAGE TAB — rendering order
 * ------------------------------------------------------------------------
 *   1. Usage            → `usage.guidance` (When to use / When not to use)
 *   2. Behaviours       → `usage.behaviours` (state / interaction demos)
 *   3. Best practices   → MERGED `usage.contentGuidelines` +
 *                         `usage.bestPractices` (both arrays combined into a
 *                         single "Best practices" section of do / don't pairs)
 *   4. Motion           → `usage.motion` (optional)
 *
 * ACCESSIBILITY TAB
 * ------------------------------------------------------------------------
 *   → `accessibility.sections` (highlight overlays on live markup)
 *   → `accessibility.keyboardInteractions` (keyboard key table)
 *   → `accessibilityNotes` (fallback bullet list if no `sections`)
 *
 * UPDATES TAB
 * ------------------------------------------------------------------------
 *   → `updates.updates` (changelog, auto-populated from GitHub if absent)
 *   → `updates.roadmap`
 *   → `updates.feedback` (Slack link block)
 *   → `updates.bugReports` (GitHub link block)
 *   → `updatesText` (supporting blurb)
 *
 * CROSS-SECTION CONVENTIONS
 * ------------------------------------------------------------------------
 * • `configurationDemos`
 *     - ONE entry per configurable property (variant, density, size, tone…).
 *     - Each entry renders as a titled box containing a tab group with one
 *       tab per option value.
 *     - `defaultValue` sets which tab is pre-selected.
 *     - `option.markup` must be self-contained, renderable HTML for that
 *       variant. Keep the markup minimal — one instance of the component,
 *       configured only for the value being demonstrated.
 *     - Use `option.note` for one-liner caveats rendered below the preview
 *       (e.g. "Only available from v3.4.0").
 *     - Use `option.stateEffect` ("hover" | "focus") to force-paint a
 *       hover/focus state on a shadow-DOM button for state-gallery demos.
 *
 * • `measurementTokens` + `measurementTokenGroups`
 *     - The main `measurementTokens` table captures non-variant tokens
 *       (colours, borders, icon size, gap, etc.).
 *     - Variant-specific tokens (e.g. density paddings) go in
 *       `measurementTokenGroups`, with one table per variant title.
 *     - Convention: repeat the `element` label on the first row of a group;
 *       leave it blank ("") on continuation rows so the table reads as a
 *       visual grouping.
 *     - `designToken` uses slash notation: "sgds/color-default",
 *       "sgds/padding/lg", "sgds/border-radius/md".
 *     - `rawValue` is rendered in the "Value" column.
 *
 * • do / don't pairs (`contentGuidelines`, `bestPractices`)
 *     - Must come in paired rows (one `tone: "do"` + one `tone: "dont"`).
 *     - Each item needs `markup` for the preview card.
 *     - These two arrays are MERGED into the single "Best practices"
 *       section on the Usage tab.
 *
 * • `usage.guidance` is always two entries: one `do` titled "When to use"
 *   and one `dont` titled "When not to use".
 *
 * • `codeExample` is optional and unused by the rendered page (there is no
 *   Code tab). Kept on the type only for historical reference — you can
 *   omit it safely.
 */

import type { ComponentDoc } from "./component-docs";

/**
 * Blank template for a component doc entry.
 *
 * Replace every `TODO:` value and remove any section you don't need. The
 * rendered page automatically hides sections whose data is absent.
 */
export const componentDocTemplate: ComponentDoc = {
  // ── 1. HEADER ────────────────────────────────────────────────────────────
  key: "TODO-component-key", //     unique key used by ComponentDesignPage
  title: "TODO Component Title", // H1 on the page
  tag: "sgds-TODO", //              web component tag
  group: "feedback", //             TODO: data display | list | layout | table | feedback | form | labels | navigation
  summary:
    "TODO: one-to-two sentence description that appears below the title. Explain what the component is and the problem it solves.",

  // ── 2. PURPOSE CARDS (3 cards) ───────────────────────────────────────────
  purposeCards: [
    {
      title: "TODO: first value prop",
      description:
        "TODO: 1–2 sentence description of the first reason to use this component.",
    },
    {
      title: "TODO: second value prop",
      description: "TODO: 1–2 sentence description of the second reason.",
    },
    {
      title: "TODO: third value prop",
      description: "TODO: 1–2 sentence description of the third reason.",
    },
  ],

  // ── 3. ANATOMY ───────────────────────────────────────────────────────────
  // Choose ONE approach below. Either way, `anatomyParts` populates the
  // numbered list beneath the diagram. The anatomy canvas is informational —
  // `pointer-events: none` is applied globally so the component inside
  // cannot be toggled / hovered / focused.
  //
  //   (A) `anatomyAsset` — pre-rendered SVGs with light/dark variants.
  //       Best when the diagram has designer-authored callouts baked in.
  //
  //   (B) `anatomyMarkup` + `anatomyCallouts` — generate callouts at runtime
  //       against the live component. Best for simple components that can
  //       render their own anatomy.

  // (A) Asset-based anatomy
  anatomyAsset: {
    lightSrc: "/components/TODO-anatomy-light.svg",
    darkSrc: "/components/TODO-anatomy-dark.svg",
    alt: "TODO: accessible description of the anatomy diagram",
  },
  // (B) Markup-based anatomy — uncomment and delete (A) if preferred
  // anatomyMarkup: `<sgds-TODO>...</sgds-TODO>`,
  // anatomyCallouts: [
  //   { number: 1, direction: "right", targetSelector: ".something", targetX: "right", targetY: "center" },
  // ],

  anatomyParts: [
    { title: "TODO: Part 1" },
    { title: "TODO: Part 2", note: "(optional)" },
    { title: "TODO: Part 3", note: "(slot)" },
  ],

  // ── 4. CONFIGURATION ─────────────────────────────────────────────────────
  // One entry per configurable property. Each entry renders as a titled box
  // with a tab group inside; tapping a tab swaps the preview to the chosen
  // option's markup. This replaces the flat "demos" list for properties
  // that have multiple named options (variant, density, size, tone, etc.).
  //
  // Use `demos` instead (see below) only if the component has a single
  // static representation with no configurable variants.
  configurationDemos: [
    {
      title: "TODO: Property name (e.g. Variant, Density, Size)",
      description:
        "TODO: 1–2 sentence explanation of what this property controls and when each option applies.",
      defaultValue: "TODO-default-option-value",
      options: [
        {
          label: "TODO: Option 1 label",
          value: "TODO-option-1-value",
          markup: `<sgds-TODO variant="TODO-option-1-value">TODO option 1 preview</sgds-TODO>`,
          // note: "Optional caveat rendered below the preview.",
          // stateEffect: "hover", // force-paint hover/focus on a shadow-DOM button
        },
        {
          label: "TODO: Option 2 label",
          value: "TODO-option-2-value",
          markup: `<sgds-TODO variant="TODO-option-2-value">TODO option 2 preview</sgds-TODO>`,
        },
      ],
    },
  ],

  // ── 5. DEMOS (fallback, only used when `configurationDemos` is empty) ────
  // `demos` is required by the type and acts as the fallback renderer for
  // the Configuration section when `configurationDemos` is absent.
  // For most components you should populate `configurationDemos` above and
  // keep `demos` as a single representative default preview.
  demos: [
    {
      title: "TODO: Default",
      description: "TODO: short description of the default usage.",
      markup: `<sgds-TODO>TODO minimal representative markup</sgds-TODO>`,
    },
  ],

  // ── 6. STRUCTURE (preview + token tables) ────────────────────────────────
  // `measurements[0].markup` renders as the live preview above the token
  // tables (optional). Set `title` and `description` to empty strings — the
  // Structure section does not render them.
  measurements: [
    {
      title: "",
      description: "",
      markup: `<sgds-TODO>TODO minimal representative markup</sgds-TODO>`,
    },
  ],

  // Main token table — one row per token. Columns are:
  //   Element | Property | Design token | Value
  // Convention: repeat the `element` label on the first row of a visual
  // grouping; leave it blank ("") on continuation rows.
  measurementTokens: [
    {
      mapKey: "TODO-map-key", //         unique per row, used internally
      element: "TODO Element name", //   first row of a group gets the name
      property: "TODO-property", //      CSS-custom-property name (without --)
      designToken: "sgds/TODO-token", // slash-notation design token
      rawValue: "TODO value", //         actual value rendered
    },
    // Continuation row in the same visual group — blank `element`.
    // {
    //   mapKey: "TODO-map-key-2",
    //   element: "",
    //   property: "TODO-property-2",
    //   designToken: "sgds/TODO-token-2",
    //   rawValue: "TODO value",
    // },
  ],

  // Variant-specific sub-tables. Each group renders below the main table
  // with its `title` as an h5 heading and its own Element/Property/Design
  // token/Value table. Delete this field if the component has no
  // variant-specific tokens.
  measurementTokenGroups: [
    {
      title: "sgds/TODO-component/default",
      tokens: [
        { category: "Padding", element: "Header padding", property: "padding-x", designToken: "sgds/padding/lg", rawValue: "20px" },
        { category: "Padding", element: "",               property: "padding-y", designToken: "sgds/padding/lg", rawValue: "20px" },
        { category: "Padding", element: "Content padding", property: "padding-top",    designToken: "sgds/padding/xs", rawValue: "4px" },
        { category: "Padding", element: "",                property: "padding-bottom", designToken: "sgds/padding/lg", rawValue: "20px" },
      ],
    },
    {
      title: "sgds/TODO-component/compact",
      tokens: [
        { category: "Padding", element: "Header padding", property: "padding-x", designToken: "sgds/padding/md", rawValue: "16px" },
        { category: "Padding", element: "",               property: "padding-y", designToken: "sgds/padding/md", rawValue: "16px" },
        { category: "Padding", element: "Content padding", property: "padding-top",    designToken: "sgds/padding/xs", rawValue: "4px" },
        { category: "Padding", element: "",                property: "padding-bottom", designToken: "sgds/padding/md", rawValue: "16px" },
      ],
    },
    {
      title: "sgds/TODO-component/spacious",
      tokens: [
        { category: "Padding", element: "Header padding", property: "padding-x", designToken: "sgds/padding/xl", rawValue: "24px" },
        { category: "Padding", element: "",               property: "padding-y", designToken: "sgds/padding/xl", rawValue: "24px" },
        { category: "Padding", element: "Content padding", property: "padding-top",    designToken: "sgds/padding/xs", rawValue: "4px" },
        { category: "Padding", element: "",                property: "padding-bottom", designToken: "sgds/padding/xl", rawValue: "24px" },
      ],
    },
  ],

  // ── 7. USAGE ─────────────────────────────────────────────────────────────
  usage: {
    // 7a. When to use / When not to use — always two entries.
    guidance: [
      {
        title: "When to use",
        tone: "do",
        items: ["TODO: scenario 1", "TODO: scenario 2", "TODO: scenario 3"],
      },
      {
        title: "When not to use",
        tone: "dont",
        items: ["TODO: anti-scenario 1", "TODO: anti-scenario 2"],
      },
    ],

    // 7b. Behaviours — state / interaction demos.
    behaviours: [
      {
        title: "TODO: Behaviour name",
        description: "TODO: explanation of the interaction or state.",
        markup: `<sgds-TODO>TODO markup</sgds-TODO>`,
      },
    ],

    // 7c. Content guidelines — do / don't markup pairs (typography, copy, casing).
    //     MERGED with `bestPractices` into the single "Best practices" section.
    contentGuidelines: [
      {
        title: "TODO: Do title",
        description: "TODO: why this is the right approach.",
        tone: "do",
        markup: `<sgds-TODO>TODO good example</sgds-TODO>`,
      },
      {
        title: "TODO: Don't title",
        description: "TODO: why this is wrong.",
        tone: "dont",
        markup: `<sgds-TODO>TODO bad example</sgds-TODO>`,
      },
    ],

    // 7d. Best practices — do / don't markup pairs (structural, compositional).
    //     MERGED with `contentGuidelines` into the single "Best practices" section.
    bestPractices: [
      {
        title: "TODO: Do title",
        description: "TODO: description.",
        tone: "do",
        markup: `<sgds-TODO>TODO good example</sgds-TODO>`,
      },
      {
        title: "TODO: Don't title",
        description: "TODO: description.",
        tone: "dont",
        markup: `<sgds-TODO>TODO bad example</sgds-TODO>`,
      },
    ],

    // 7e. Motion (optional) — animation preview + spec table.
    // motion: {
    //   previewMarkup: `<sgds-TODO></sgds-TODO>`,
    //   specs: [
    //     { property: "duration", value: "200ms", token: "sgds/duration/base" },
    //   ],
    // },
  },

  // ── 8. ACCESSIBILITY ─────────────────────────────────────────────────────
  accessibility: {
    // Structured sections with live markup + highlight overlays.
    // Leave as an empty array when the keyboard table is enough.
    sections: [],

    keyboardInteractions: [
      { key: "Tab", description: "TODO: what Tab does." },
      { key: "Shift + Tab", description: "TODO: what Shift+Tab does." },
      { key: "Enter", description: "TODO: what Enter does." },
      { key: "Space", description: "TODO: what Space does." },
    ],
  },
  accessibilityNotes: [
    "TODO: short accessibility note 1.",
    "TODO: short accessibility note 2.",
    "TODO: short accessibility note 3.",
  ],

  // ── 9. UPDATES ───────────────────────────────────────────────────────────
  updates: {
    updates: {
      title: "Updates",
      columns: ["Date", "Version", "Description"],
      rows: [
        {
          Date: "TODO: DD MMM YYYY",
          Version: "1.0.0",
          Description: "TODO: changelog entry.",
        },
      ],
    },
    roadmap: {
      title: "Roadmap",
      columns: ["Planned item", "Status", "Target"],
      rows: [
        {
          "Planned item": "TODO: planned work",
          Status: "Planned",
          Target: "TODO: quarter or month",
        },
      ],
    },
    feedback: {
      title: "Feedback",
      heading: "Have suggestions or feedback?",
      prefix: "Share them with us on ",
      linkLabel: "Slack → #ask-sgds-v3",
      href: "https://govtech.slack.com/archives/C07VD8Z5QKS",
    },
    bugReports: {
      title: "Bug Reports",
      heading: "Found a bug or issue?",
      prefix: "Report it on GitHub ",
      linkLabel: "Issues → sgds/components/TODO",
      href: "#",
    },
  },

  // Supporting blurb shown in the Updates section header (optional).
  updatesText: "TODO: optional supporting blurb for the Updates section.",
};

/**
 * MINIMUM VIABLE ENTRY
 * ------------------------------------------------------------------------
 * To stand up a component page quickly with only the essentials, these are
 * the REQUIRED fields — every other section hides itself when its data is
 * absent:
 *
 *   key, title, tag, group, summary, demos
 *
 * Recommended as the next layer for a usable page:
 *
 *   purposeCards, anatomyAsset (or anatomyMarkup) + anatomyParts,
 *   configurationDemos, measurementTokens, usage.guidance
 *
 * Everything else (motion, accessibility sections, updates tables, etc.)
 * can be filled in iteratively.
 */
