import { getComponentDoc, type AccessibilityContent, type BestPractice, type MeasurementAsset, type ResolvedComponentDoc, type UsageBehaviour } from "./component-docs";

export type AccordionV2BulletSection = {
  title: string;
  items: string[];
};

export type AccordionV2TokenRow = {
  token: string;
  value: string;
  usage: string;
};

export type AccordionV2ApiRow = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type AccordionV2CodeExample = {
  title: string;
  description: string;
  code: string;
  lang?: string;
};

export type AccordionV2ApiSection = {
  title: string;
  rows: AccordionV2ApiRow[];
};

export type AccordionV2Data = {
  doc: ResolvedComponentDoc;
  usageGuidance: AccordionV2BulletSection[];
  usageVariants: UsageBehaviour[];
  usagePatterns: AccordionV2BulletSection[];
  designBehaviour: UsageBehaviour[];
  visualConsistency: AccordionV2BulletSection[];
  states: AccordionV2BulletSection[];
  stateDemos: UsageBehaviour[];
  accessibilityPrinciples: string[];
  developmentBehaviour: AccordionV2BulletSection[];
  measurementTokens: AccordionV2TokenRow[];
  accessibilityImplementation: AccordionV2BulletSection[];
  accessibilityContent: AccessibilityContent;
  apiSections: AccordionV2ApiSection[];
  codeExamples: AccordionV2CodeExample[];
  missingContent: string[];
};

const accordionDoc = getComponentDoc("accordion");

if (!accordionDoc) {
  throw new Error("Accordion component documentation is missing.");
}

const usageVariants: UsageBehaviour[] = accordionDoc.demos.filter((demo) =>
  ["Density", "Border", "Start slot", "End slot"].includes(demo.title),
);

const designBehaviour: UsageBehaviour[] = [
  ...(accordionDoc.usage.behaviours?.filter((demo) =>
    ["Expand / Collapse", "Initial state"].includes(demo.title),
  ) ?? []),
  {
    title: "Single-open default",
    description:
      "Use the default behaviour when users should compare one section at a time. Opening a new item closes the previously expanded one to keep the page compact and easier to scan.",
    markup: `<sgds-accordion>
      <sgds-accordion-item open>
        <span slot="header">Application details</span>
        <div slot="content">Only one section stays open by default.</div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <span slot="header">Supporting documents</span>
        <div slot="content">Opening this item closes the previous one.</div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <span slot="header">Declaration</span>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
  },
  {
    title: "Multi-open option",
    description:
      "Allow multiple items to stay open when users need to compare sections side by side or keep several references visible while completing a task.",
    markup: `<sgds-accordion allowMultiple>
      <sgds-accordion-item open>
        <span slot="header">Eligibility</span>
        <div slot="content">This item stays open.</div>
      </sgds-accordion-item>
      <sgds-accordion-item open>
        <span slot="header">Fees and timelines</span>
        <div slot="content">This item can stay open too.</div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <span slot="header">Required documents</span>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
  },
];

const usagePatterns: AccordionV2BulletSection[] = [
  {
    title: "Good fit",
    items: [
      "FAQs, settings groups, supporting details, and other content that benefits from progressive disclosure.",
      "Grouped information where users compare headings first, then open the section they need.",
      "Side panels or mobile layouts where vertical space is limited.",
    ],
  },
  {
    title: "Avoid",
    items: [
      "Critical information that users must see immediately without interaction.",
      "Very short content that would be clearer as plain text or a simple list.",
      "Deeply nested disclosure patterns that make scanning and orientation harder.",
    ],
  },
];

const visualConsistency: AccordionV2BulletSection[] = [
  {
    title: "Spacing and padding",
    items: [
      "Default headers use the larger padding scale so each item feels comfortably tappable in content-heavy layouts.",
      "Compact density reduces header and content padding for denser layouts, but should still preserve readable separation between items.",
      "Expanded content should align with the header text rather than the outer border so the transition feels intentional.",
    ],
  },
  {
    title: "Typography and hit area",
    items: [
      "Default headers use a larger title size than compact density to preserve hierarchy in page-level use cases.",
      "The full header row acts as the tap target; avoid adding competing interactive controls inside it.",
      "Keep header labels short enough that the chevron and any metadata remain easy to parse at a glance.",
    ],
  },
];

const states: AccordionV2BulletSection[] = [
  {
    title: "Core states",
    items: [
      "Collapsed: content is hidden and the chevron points down.",
      "Expanded: content is visible and the chevron rotates to indicate the open state.",
      "Hover and focus-visible: the header surface becomes more prominent to reinforce interactivity.",
      "Disabled: the item remains non-interactive and should be used sparingly.",
    ],
  },
];

const stateDemos: UsageBehaviour[] = [
  {
    title: "Collapsed",
    description: "Default resting state. The content stays hidden and the header remains available as the primary trigger.",
    markup: `<div class="accordion-v2-static-demo">
      <sgds-accordion>
        <sgds-accordion-item>
          <span slot="header">Collapsed item</span>
          <div slot="content">This content stays hidden.</div>
        </sgds-accordion-item>
      </sgds-accordion>
    </div>`,
  },
  {
    title: "Expanded",
    description: "Open state surfaces the content directly beneath the header so users keep their place while reading.",
    markup: `<div class="accordion-v2-static-demo">
      <sgds-accordion>
        <sgds-accordion-item open>
          <span slot="header">Expanded item</span>
          <div slot="content">Expanded content is visible and remains grouped with its trigger.</div>
        </sgds-accordion-item>
      </sgds-accordion>
    </div>`,
  },
  {
    title: "Disabled",
    description: "Use sparingly when a section is temporarily unavailable. The label remains visible, but the item cannot be expanded.",
    markup: `<div class="accordion-v2-static-demo">
      <sgds-accordion>
        <sgds-accordion-item disabled>
          <span slot="header">Disabled item</span>
          <div slot="content">Disabled content</div>
        </sgds-accordion-item>
      </sgds-accordion>
    </div>`,
  },
];

const developmentBehaviour: AccordionV2BulletSection[] = [
  {
    title: "State model",
    items: [
      "The wrapper element manages sibling behaviour. By default it closes other items when a new one toggles open.",
      "Each `sgds-accordion-item` owns its own `open` state and can also be opened or closed imperatively with `show()` and `hide()`.",
      "Use the item `open` attribute for default state in static markup.",
    ],
  },
  {
    title: "Controlled vs uncontrolled",
    items: [
      "Uncontrolled usage is the simplest pattern: render the accordion and let each item manage itself after initial `open` attributes are set.",
      "For controlled behaviour, update each item’s `open` property in response to application state, or call `show()` / `hide()` from JavaScript when a workflow needs it.",
      "Use `allowMultiple` on the wrapper when product requirements call for more than one expanded section at a time.",
    ],
  },
  {
    title: "Animation and events",
    items: [
      "Accordion items emit `sgds-show`, `sgds-after-show`, `sgds-hide`, and `sgds-after-hide` so application code can coordinate with transitions.",
      "The built-in height animation runs for 350ms with `ease-in-out`; use the supplied events rather than duplicating custom timing logic.",
      "Avoid replacing the built-in motion unless there is a strong product need, because the current implementation already handles reduced-motion preferences and internal height calculations.",
    ],
  },
];

const measurementTokens: AccordionV2TokenRow[] = [
  {
    token: "--sgds-padding-lg",
    value: "Default header padding",
    usage: "Used on the default accordion header button for comfortable touch targets and stronger hierarchy.",
  },
  {
    token: "--sgds-padding-sm",
    value: "Compact header padding",
    usage: "Applied to compact density headers when a tighter vertical rhythm is needed.",
  },
  {
    token: "--sgds-padding-xs",
    value: "Panel top padding",
    usage: "Creates the breathing room between the header divider and expanded content.",
  },
  {
    token: "--sgds-font-size-20 / --sgds-line-height-24",
    value: "Default header typography",
    usage: "Supports the standard density header label.",
  },
  {
    token: "--sgds-font-size-16 / --sgds-line-height-20",
    value: "Compact header typography",
    usage: "Supports compact density without losing legibility.",
  },
  {
    token: "--sgds-border-width-1 / --sgds-border-color-muted / --sgds-border-radius-md",
    value: "Border variant shell",
    usage: "Adds a framed container around the accordion when stronger separation from the page background is needed.",
  },
];

const accessibilityImplementation: AccordionV2BulletSection[] = [
  {
    title: "Roles and attributes",
    items: [
      "Each header is rendered as a real `button` with `aria-expanded`, `aria-disabled`, and `aria-controls`.",
      "Expanded content is exposed through the slotted content region and linked to the button via `aria-labelledby` in the current implementation.",
      "Rely on the built-in SGDS markup instead of recreating the button or region semantics by hand.",
    ],
  },
  {
    title: "Keyboard interactions",
    items: [
      "Enter and Space toggle the focused header.",
      "Arrow Down and Arrow Right open the focused item.",
      "Arrow Up and Arrow Left collapse the focused item.",
      "Tab and Shift + Tab move users between headers and any interactive content inside expanded panels.",
    ],
  },
  {
    title: "Implementation notes",
    items: [
      "Keep header text unique so screen-reader users can distinguish items quickly.",
      "Do not put unrelated interactive controls directly in the header slot unless the entire interaction pattern has been carefully tested.",
      "If content contains links or form fields, verify the tab order when an item opens and closes.",
    ],
  },
];

const apiSections: AccordionV2ApiSection[] = [
  {
    title: "<sgds-accordion>",
    rows: [
      {
        name: "allowMultiple",
        type: "boolean",
        defaultValue: "false",
        description: "Keeps more than one accordion item open at the same time.",
      },
      {
        name: "variant",
        type: '"default" | "border"',
        defaultValue: '"default"',
        description: "Adds a bordered shell when stronger separation from the surrounding layout is needed.",
      },
      {
        name: "density",
        type: '"default" | "compact"',
        defaultValue: '"default"',
        description: "Controls header and content spacing across all child accordion items.",
      },
    ],
  },
  {
    title: "<sgds-accordion-item>",
    rows: [
      {
        name: "open",
        type: "boolean",
        defaultValue: "false",
        description: "Sets whether the item is expanded on render and during runtime updates.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents the item from toggling and removes it from the interactive flow.",
      },
      {
        name: "density",
        type: '"default" | "compact"',
        defaultValue: '"default"',
        description: "Inherited from the parent accordion and should usually be set on the wrapper instead.",
      },
      {
        name: "slots",
        type: '"header" | "content" | "caret"',
        defaultValue: "-",
        description: "Header and content are required for practical usage; the caret slot is optional when the default chevron needs replacing.",
      },
      {
        name: "methods",
        type: "`show()` / `hide()`",
        defaultValue: "-",
        description: "Imperative helpers for synchronising the accordion with application state or external controls.",
      },
      {
        name: "events",
        type: "`sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide`",
        defaultValue: "-",
        description: "Lifecycle hooks emitted before and after the built-in expand/collapse animation.",
      },
    ],
  },
];

const codeExamples: AccordionV2CodeExample[] = [
  {
    title: "Basic accordion",
    description: "Use the default single-open behaviour when one section should stay in focus at a time.",
    lang: "html",
    code: `<sgds-accordion>
  <sgds-accordion-item open>
    <span slot="header">What is SGDS?</span>
    <div slot="content">SGDS provides reusable foundations, components, and patterns.</div>
  </sgds-accordion-item>
  <sgds-accordion-item>
    <span slot="header">Who is it for?</span>
    <div slot="content">It is built for public-sector teams designing and shipping services.</div>
  </sgds-accordion-item>
</sgds-accordion>`,
  },
  {
    title: "Border variant with multiple open items",
    description: "Use the border shell and `allowMultiple` when users need stronger grouping and side-by-side comparison.",
    lang: "html",
    code: `<sgds-accordion variant="border" allowMultiple>
  <sgds-accordion-item open>
    <span slot="header">Eligibility</span>
    <div slot="content">Applicants must be at least 18 years old.</div>
  </sgds-accordion-item>
  <sgds-accordion-item open>
    <span slot="header">Required documents</span>
    <div slot="content">Bring your NRIC, proof of address, and supporting records.</div>
  </sgds-accordion-item>
</sgds-accordion>`,
  },
  {
    title: "Imperative control",
    description: "Use item methods when the accordion needs to respond to external application state.",
    lang: "js",
    code: `const item = document.querySelector("sgds-accordion-item");

if (item) {
  await item.show();
  // ...later
  await item.hide();
}`,
  },
];

export const accordionV2Data: AccordionV2Data = {
  doc: accordionDoc,
  usageGuidance: accordionDoc.usage.guidance ?? [],
  usageVariants,
  usagePatterns,
  designBehaviour,
  visualConsistency,
  states,
  stateDemos,
  accessibilityPrinciples: accordionDoc.accessibilityNotes ?? [],
  developmentBehaviour,
  measurementTokens,
  accessibilityImplementation,
  accessibilityContent: accordionDoc.accessibility,
  apiSections,
  codeExamples,
  missingContent: [
    "Controlled vs uncontrolled guidance was generated from the installed SGDS accordion implementation because the current docs do not describe that split explicitly.",
    "Token-level measurements for density, padding, and animation were generated from the accordion source in `@govtechsg/sgds-web-component` because the current accordion page does not list them as development notes.",
    "No accordion-specific breakpoint rules were found in the current repo or package; the component relies on the surrounding layout and page grid.",
  ],
};
