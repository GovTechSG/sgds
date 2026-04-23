type ComponentGroup =
  | "data display"
  | "list"
  | "layout"
  | "table"
  | "feedback"
  | "form"
  | "labels"
  | "navigation";

export type ComponentDemo = {
  title: string;
  description: string;
  markup: string;
};

type PurposeCardInput = {
  title: string;
  description: string;
};

export type AnatomyInput = {
  title: string;
  note?: string;
};

export type AnatomyCallout = {
  number: number;
  direction: "left" | "right" | "top" | "bottom";
  targetSelector: string;
  targetShadowSelector?: string;
  targetX?: "left" | "center" | "right";
  targetY?: "top" | "center" | "bottom";
  /**
   * Pixel offset applied to the anchor point after targetX is resolved.
   * Positive values shift the anchor (and its callout stem + badge) to the right.
   */
  targetXOffset?: number;
  /**
   * Pixel offset applied to the anchor point after targetY is resolved.
   * Positive values shift the anchor (and its callout stem + badge) downward.
   */
  targetYOffset?: number;
  stemLengthToken?: string;
  alignBadgeWithCallout?: number;
};

export type ThemedImageAsset = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
};

export type MeasurementAsset = ThemedImageAsset & {
  title: string;
  description: string;
};

export type MeasurementTokenRow = {
  mapKey?: string;
  element: string;
  property: string;
  designToken: string;
  rawValue?: string;
};

export type MeasurementTokenGroup = {
  title: string;
  tokens: MeasurementTokenRow[];
};

export type UsageGuidance = {
  title: string;
  tone: "do" | "dont";
  items: string[];
};

export type UsageBehaviour = ComponentDemo & {
  surface?: "default" | "flush";
};

export type UsageContentSection = {
  title: string;
  items: string[];
};

export type MotionSpec = {
  element: string;
  value: string;
  duration: string;
  easing: string;
};

export type BestPractice = {
  title: string;
  description: string;
  tone: "do" | "dont";
  markup: string;
};

export type ComponentProp = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type ConfigurationDemoOption = {
  label: string;
  value: string;
  markup: string;
  description?: string;
  note?: string;
  stateEffect?: "hover" | "focus";
  selectedByDefault?: boolean;
};

export type ConfigurationDemo = {
  title: string;
  description: string;
  titleTag?: "h3" | "h4" | "h5" | "h6";
  controlLabel?: string;
  defaultValue: string;
  options: ConfigurationDemoOption[];
  interactionMode?: "tabs" | "content-slots";
};

export type AccessibilitySection = {
  title: string;
  description?: string[];
  items: string[];
  markup: string;
  highlights?: Array<{
    key: string;
    selector: string;
    targetShadowSelector?: string;
  }>;
};

export type AccessibilityKeyboardRow = {
  key: string;
  description: string;
};

export type AccessibilityContent = {
  sections?: AccessibilitySection[];
  keyboardInteractions?: AccessibilityKeyboardRow[];
};

type UpdatesRow = Record<string, string>;

export type AvailabilityStatus = "available" | "unavailable";

export type ComponentMetadataStatus = {
  figma: AvailabilityStatus;
  responsive: AvailabilityStatus;
  storybook: AvailabilityStatus;
};

export type UpdatesSectionTable = {
  title: string;
  columns: string[];
  rows: UpdatesRow[];
};

export type UpdatesLinkBlock = {
  title: string;
  heading: string;
  prefix: string;
  linkLabel: string;
  href: string;
};

export type UpdatesContent = {
  updates: UpdatesSectionTable;
  roadmap: UpdatesSectionTable;
  feedback: UpdatesLinkBlock;
  bugReports: UpdatesLinkBlock;
};

type UsageContent = {
  guidance?: UsageGuidance[];
  content?: UsageContentSection[];
  contentGuidelines?: BestPractice[];
  behaviours?: UsageBehaviour[];
  motion?: {
    previewMarkup: string;
    specs: MotionSpec[];
  };
  bestPractices?: BestPractice[];
};

export type ComponentDoc = {
  key: string;
  title: string;
  summary: string;
  tag: string;
  group: ComponentGroup;
  demos: UsageBehaviour[];
  purposeCards?: PurposeCardInput[];
  anatomyMarkup?: string;
  anatomyAsset?: ThemedImageAsset;
  anatomyParts?: AnatomyInput[];
  anatomyCallouts?: AnatomyCallout[];
  measurements?: (MeasurementAsset | ComponentDemo)[];
  measurementTokens?: MeasurementTokenRow[];
  measurementTokenGroups?: MeasurementTokenGroup[];
  globalTokens?: MeasurementTokenRow[];
  configurationDemos?: ConfigurationDemo[];
  usage?: UsageContent;
  accessibility?: AccessibilityContent;
  updates?: UpdatesContent;
  props?: ComponentProp[];
  codeExample?: string;
  accessibilityNotes?: string[];
  updatesText?: string;
};

const defaultPartTitleMap: Record<string, AnatomyInput> = {
  default: { title: "Content" },
  leftIcon: { title: "Left icon", note: "(optional)" },
  rightIcon: { title: "Right icon", note: "(optional)" },
  icon: { title: "Icon", note: "(optional)" },
  "trailing-icon": { title: "Trailing icon", note: "(optional)" },
  action: { title: "Action", note: "(optional)" },
  title: { title: "Title", note: "(slot)" },
  description: { title: "Description", note: "(slot)" },
  footer: { title: "Footer", note: "(optional)" },
  upper: { title: "Upper content", note: "(optional)" },
  lower: { title: "Lower content", note: "(optional)" },
  image: { title: "Image", note: "(optional)" },
  "image-badge": { title: "Image badge", note: "(optional)" },
  "image-action": { title: "Image action", note: "(optional)" },
  thumbnail: { title: "Thumbnail", note: "(optional)" },
  subtitle: { title: "Subtitle", note: "(optional)" },
  menu: { title: "Menu", note: "(optional)" },
  data: { title: "Data", note: "(slot)" },
  contents: { title: "Contents", note: "(slot)" },
  toggler: { title: "Toggler", note: "(slot)" },
  items: { title: "Items", note: "(slot)" },
  brand: { title: "Brand", note: "(slot)" },
  end: { title: "End content", note: "(optional)" },
  "non-collapsible": { title: "Persistent actions", note: "(optional)" },
  header: { title: "Header", note: "(optional)" },
  leftLabel: { title: "Left label", note: "(optional)" },
  invalidIcon: { title: "Invalid icon", note: "(optional)" },
  badge: { title: "Badge", note: "(optional)" },
  nav: { title: "Tab navigation", note: "(slot)" },
};

const purposeThemeByGroup: Record<
  ComponentGroup,
  { secondTitle: string; secondDescription: string; thirdTitle: string; thirdDescription: string }
> = {
  "data display": {
    secondTitle: "Support scanning",
    secondDescription:
      "Use this component when people need to compare content quickly without losing context.",
    thirdTitle: "Keep content structured",
    thirdDescription:
      "Let the component's built-in visual hierarchy organise dense information before adding custom styling.",
  },
  list: {
    secondTitle: "Improve readability",
    secondDescription:
      "Use list patterns to break content into consistent, easy-to-scan units.",
    thirdTitle: "Maintain hierarchy",
    thirdDescription:
      "Keep labels, values, and supporting details in the structure the component is designed to support.",
  },
  layout: {
    secondTitle: "Separate related content",
    secondDescription:
      "Use layout components to clarify boundaries and rhythm without inventing new visual treatments.",
    thirdTitle: "Rely on built-in structure",
    thirdDescription:
      "Let SGDS spacing, borders, and orientation options do the work before layering on extra decoration.",
  },
  table: {
    secondTitle: "Support comparison",
    secondDescription:
      "Use table-based components when people need to read repeated information across rows, columns, or sections.",
    thirdTitle: "Keep relationships explicit",
    thirdDescription:
      "Use the component's header, pagination, and navigational structure to keep data relationships clear.",
  },
  feedback: {
    secondTitle: "Communicate status clearly",
    secondDescription:
      "Use feedback components to make system responses, progress, and next steps immediately legible.",
    thirdTitle: "Match the urgency",
    thirdDescription:
      "Choose the built-in visual style that reflects the severity, confidence, or transient nature of the message.",
  },
  form: {
    secondTitle: "Guide completion",
    secondDescription:
      "Use form controls that match the task so users can enter, review, and change values with less effort.",
    thirdTitle: "Stay predictable",
    thirdDescription:
      "Keep labels, helper content, and states inside the component pattern instead of recreating them around it.",
  },
  labels: {
    secondTitle: "Add compact meaning",
    secondDescription:
      "Use label-oriented components to convey meaning quickly in tight spaces without overwhelming the layout.",
    thirdTitle: "Preserve clarity",
    thirdDescription:
      "Keep the visual treatment light and purposeful so the component supports content instead of competing with it.",
  },
  navigation: {
    secondTitle: "Support wayfinding",
    secondDescription:
      "Use navigation patterns to help users understand where they are and where they can go next.",
    thirdTitle: "Keep movement consistent",
    thirdDescription:
      "Rely on SGDS interaction states and structure so directional cues stay familiar across the product.",
  },
};

const buildPurposeCards = (summary: string, group: ComponentGroup) => {
  const theme = purposeThemeByGroup[group];
  return [
    {
      title: "Clarify the interaction",
      description: summary,
    },
    {
      title: theme.secondTitle,
      description: theme.secondDescription,
    },
    {
      title: theme.thirdTitle,
      description: theme.thirdDescription,
    },
  ];
};

const buildAnatomyParts = (parts?: AnatomyInput[]) =>
  (parts && parts.length ? parts : [{ title: "Container" }, { title: "Core content" }]).map(
    (part, index) => ({
      number: index + 1,
      ...part,
    }),
  );

const demo = (title: string, description: string, markup: string): ComponentDemo => ({
  title,
  description,
  markup,
});

const componentDocs: Record<string, ComponentDoc> = {
  accordion: {
    key: "accordion",
    title: "Accordion",
    tag: "sgds-accordion",
    group: "data display",
    summary:
      "The accordion is a UI component that lets users expand and collapse sections of content. It helps organise information into manageable chunks, keeping pages clean and reducing cognitive load.",
    purposeCards: [
      {
        title: "Progressive disclosure",
        description:
          "Accordion sections show only essential information upfront and reveal supporting details on demand.",
      },
      {
        title: "Scan and prioritise",
        description:
          "Accordion headings help users compare sections quickly before deciding what to expand.",
      },
      {
        title: "Maintain context",
        description:
          "Expanded content stays grouped beneath its trigger so users can stay oriented while reading.",
      },
    ],
    anatomyMarkup: `<sgds-accordion variant="border" class="portal-anatomy-accordion">
      <sgds-accordion-item class="portal-anatomy-accordion-item" open>
        <sgds-icon slot="icon" class="portal-anatomy-accordion-icon" name="info-circle-fill"></sgds-icon>
        <span slot="header" class="portal-anatomy-accordion-title">Accordion title</span>
        <sgds-badge slot="badge" class="portal-anatomy-accordion-badge" variant="neutral" outlined>Badge</sgds-badge>
        <div slot="content" class="portal-anatomy-accordion-content">Accordion content</div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
        <span slot="header">Second section</span>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
    anatomyParts: [
      { title: "Title" },
      { title: "Indicator", note: "(chevron)" },
      { title: "Content panel", note: "(slot)" },
      { title: "Divider" },
      { title: "Leading icon", note: "(optional)" },
      { title: "Badge", note: "(optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-anatomy-accordion-title", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-accordion-item", targetShadowSelector: ".accordion-header__trailing", targetX: "right", targetY: "center" },
      { number: 3, direction: "left", targetSelector: ".portal-anatomy-accordion-content", targetX: "left", targetY: "center", stemLengthToken: "--sgds-dimension-64", alignBadgeWithCallout: 4 },
      { number: 4, direction: "left", targetSelector: ".portal-anatomy-accordion-item", targetShadowSelector: ".accordion-item", targetX: "left", targetY: "bottom" },
      { number: 5, direction: "top", targetSelector: ".portal-anatomy-accordion-icon", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 6, direction: "top", targetSelector: ".portal-anatomy-accordion-badge", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
    ],
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-accordion variant="border">
          <sgds-accordion-item open>
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
        </sgds-accordion>`,
      },
    ],
    measurementTokens: [
      {
        mapKey: "hover-bg",
        element: "Colour",
        property: "hover-bg",
        designToken: "sgds/bg-translucent-subtle",
        rawValue: "Translucent",
      },
      {
        mapKey: "title-color",
        element: "",
        property: "title-color",
        designToken: "sgds/color-default",
        rawValue: "#0E0E0E",
      },
      {
        mapKey: "icon-color",
        element: "",
        property: "icon-color",
        designToken: "sgds/color-subtle",
        rawValue: "#525252",
      },
      {
        mapKey: "gap",
        element: "Gap",
        property: "gap",
        designToken: "sgds/gap/md",
        rawValue: "16px",
      },
      {
        mapKey: "border-color",
        element: "Border",
        property: "border-color",
        designToken: "sgds/border-color-muted",
        rawValue: "#DFDFDF",
      },
      {
        mapKey: "border-width",
        element: "",
        property: "border-width",
        designToken: "sgds/border-width/1",
        rawValue: "1px",
      },
      {
        mapKey: "border-radius",
        element: "",
        property: "border-radius",
        designToken: "sgds/border-radius/md",
        rawValue: "8px",
      },
    ],
    measurementTokenGroups: [
      {
        title: "sgds/accordion/default",
        tokens: [
          {
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
          },
          {
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
          },
          {
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
          },
          {
            element: "",
            property: "padding-bottom",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
          },
        ],
      },
      {
        title: "sgds/accordion/compact",
        tokens: [
          {
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/md",
            rawValue: "16px",
          },
          {
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/md",
            rawValue: "16px",
          },
          {
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
          },
          {
            element: "",
            property: "padding-bottom",
            designToken: "sgds/padding/md",
            rawValue: "16px",
          },
        ],
      },
      {
        title: "sgds/accordion/spacious",
        tokens: [
          {
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
          },
          {
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
          },
          {
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
          },
          {
            element: "",
            property: "padding-bottom",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
          },
        ],
      },
    ],
    globalTokens: [
      {
        element: "Colour",
        property: "",
        designToken: "sgds/bg-transparent",
        rawValue: "Transparent",
      },
      {
        mapKey: "leading-icon-color",
        element: "",
        property: "",
        designToken: "sgds/color-default",
        rawValue: "#0E0E0E",
      },
    ],
    demos: [
      {
        ...demo(
          "Density",
          "The accordion offers two density options—default and compact—to adapt to different contexts.",
          `<div class="portal-demo-stack">
          <sgds-accordion density="compact">
            <sgds-accordion-item>
              <span slot="header">Compact</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>
          <sgds-accordion>
            <sgds-accordion-item>
              <span slot="header">Default</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>
        </div>`,
        ),
        surface: "flush" as const,
      },
      demo(
        "Border",
        "Provides separation from the background or surrounding content.",
        `<sgds-accordion variant="border">
          <sgds-accordion-item>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
        </sgds-accordion>`,
      ),
      demo(
        "Start slot",
        "The start slot is an optional area placed before the accordion title. It is intended for identifiers or visual anchors that help users quickly recognize the type or context of the content.\n\nThis slot should remain visually balanced and not contain interactive elements.",
        `<sgds-accordion>
          <sgds-accordion-item>
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item>
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item>
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
        </sgds-accordion>`,
      ),
      demo(
        "End slot",
        "The end slot is an optional area placed after the accordion title and before the indicator (chevron). It is used for status, metadata, or supporting information that complements the main label.\n\nThe end slot should remain concise to avoid disrupting header alignment. If no title text is provided, the end slot will not be displayed.",
        `<sgds-accordion>
          <sgds-accordion-item>
            <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
              <span>Accordion title</span>
              <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
            </div>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item>
            <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
              <span>Accordion title</span>
              <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
            </div>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item>
            <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
              <span>Accordion title</span>
              <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
            </div>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
        </sgds-accordion>`,
      ),
    ],
    usage: {
      guidance: [
        {
          title: "When to use",
          tone: "do",
          items: [
            "To organise related information.",
            "To shorten pages and reduce scrolling when content is not crucial to read in full.",
            "When space is at a premium and long content cannot be displayed all at once, like on a mobile interface or in a side panel.",
          ],
        },
        {
          title: "When not to use",
          tone: "dont",
          items: [
            "When each section only contains a small amount of text or a few elements, a simple list or heading may work better.",
            "Do not use accordions for content that is essential or required for users to see immediately.",
          ],
        },
      ],
      behaviours: [
        demo(
          "Expand / Collapse",
          "Clicking the header toggles visibility of the content.",
          `<sgds-accordion>
            <sgds-accordion-item open>
              <span slot="header">What is design system?</span>
              <div slot="content">It is a shared set of principles, tokens, and components used to build consistent interfaces.</div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <span slot="header">How does the accordion behave?</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <span slot="header">Can multiple items open?</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        ),
        {
          ...demo(
            "Density",
            "Use compact or default density depending on the surrounding layout and information density.",
            `<div class="portal-demo-stack">
              <sgds-accordion density="compact">
                <sgds-accordion-item>
                  <span slot="header">Compact</span>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
              <sgds-accordion>
                <sgds-accordion-item>
                  <span slot="header">Default</span>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
            </div>`,
          ),
          surface: "flush",
        },
        {
          ...demo(
            "Slots",
            "Start and end slots support identifiers, metadata, and supporting context while keeping the title readable.",
            `<div class="portal-demo-stack">
              <sgds-accordion>
                <sgds-accordion-item>
                  <div slot="header" class="portal-demo-list-item">
                    <sgds-icon name="grid"></sgds-icon>
                    <span>With start slot</span>
                  </div>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
              <sgds-accordion>
                <sgds-accordion-item>
                  <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
                    <span>With end slot</span>
                    <sgds-badge variant="neutral">Badge</sgds-badge>
                  </div>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
            </div>`,
          ),
          surface: "flush",
        },
        demo(
          "Initial state",
          "Keep items collapsed by default unless one section needs to be surfaced immediately.",
          `<sgds-accordion>
            <sgds-accordion-item>
              <span slot="header">First item</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <span slot="header">Second item</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <span slot="header">Third item</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        ),
      ],
      contentGuidelines: [
        {
          title: "Use sentence case",
          description: "This keeps titles easy to scan.",
          tone: "do",
          markup: `<sgds-accordion>
            <sgds-accordion-item>
              <span slot="header">What is your return policy?</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Avoid all caps or mixed case",
          description: "Inconsistent casing slows scanning.",
          tone: "dont",
          markup: `<sgds-accordion>
            <sgds-accordion-item>
              <span slot="header">WHAT IS YOUR RETURN POLICY?</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Keep titles to one sentence",
          description: "Short titles are easier to read at a glance.",
          tone: "do",
          markup: `<sgds-accordion>
            <sgds-accordion-item><span slot="header">Application eligibility</span><div slot="content">Accordion content</div></sgds-accordion-item>
            <sgds-accordion-item><span slot="header">Required documents</span><div slot="content">Accordion content</div></sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Do not use long titles",
          description: "Move supporting detail into the panel content.",
          tone: "dont",
          markup: `<sgds-accordion>
            <sgds-accordion-item><span slot="header">This is a very long accordion title that makes the list harder to scan and understand quickly</span><div slot="content">Accordion content</div></sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Match content to the title",
          description: "Users should get what the heading promises.",
          tone: "do",
          markup: `<sgds-accordion>
            <sgds-accordion-item open>
              <span slot="header">What is your return policy?</span>
              <div slot="content">Our return policy allows you to return items within 30 days of purchase for a full refund, provided they are unused and in their original packaging.</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Avoid unrelated content",
          description: "Off-topic panel content creates confusion.",
          tone: "dont",
          markup: `<sgds-accordion>
            <sgds-accordion-item open>
              <span slot="header">What is your return policy?</span>
              <div slot="content">Our store accepts a variety of payment methods, including major credit cards like Visa and MasterCard, as well as digital wallets such as PayPal and Apple Pay.</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        },
      ],
      bestPractices: [
        {
          title: "Group related items",
          description: "Use accordions for content that belongs together.",
          tone: "do",
          markup: `<sgds-accordion>
            <sgds-accordion-item><span slot="header">Payment details</span><div slot="content">Accordion content</div></sgds-accordion-item>
            <sgds-accordion-item><span slot="header">Supporting information</span><div slot="content">Accordion content</div></sgds-accordion-item>
            <sgds-accordion-item><span slot="header">Declarations</span><div slot="content">Accordion content</div></sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Do not nest accordions",
          description: "Multiple layers make navigation harder.",
          tone: "dont",
          markup: `<sgds-accordion>
            <sgds-accordion-item open>
              <span slot="header">Parent accordion</span>
              <div slot="content">
                <sgds-accordion>
                  <sgds-accordion-item>
                    <span slot="header">Nested accordion</span>
                    <div slot="content">Nested content</div>
                  </sgds-accordion-item>
                </sgds-accordion>
              </div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        },
      ],
    },
    codeExample: `<sgds-accordion variant="border">
  <sgds-accordion-item open>
    <span slot="header">Accordion title</span>
    <div slot="content">Accordion content</div>
  </sgds-accordion-item>
  <sgds-accordion-item>
    <span slot="header">Accordion title</span>
    <div slot="content">Accordion content</div>
  </sgds-accordion-item>
</sgds-accordion>`,
    accessibility: {
      sections: [],
      keyboardInteractions: [
        {
          key: "Tab",
          description: "Moves focus to the next accordion header or interactive element in the expanded content.",
        },
        {
          key: "Shift + Tab",
          description: "Moves focus to the previous interactive element.",
        },
        {
          key: "Enter",
          description: "Expands or collapses the focused accordion header.",
        },
        {
          key: "Space",
          description: "Expands or collapses the focused accordion header.",
        },
      ],
    },
    accessibilityNotes: [
      "Write headings that describe the hidden content clearly and uniquely.",
      "Keep interactive content inside expanded panels keyboard accessible.",
      "Use the built-in SGDS tab and accordion semantics so focus, ARIA, and keyboard handling stay consistent.",
    ],
    updates: {
      updates: {
        title: "Updates",
        columns: ["Date", "Version", "Description"],
        rows: [
          {
            Date: "01 Jan 2025",
            Version: "1.0.0",
            Description:
              "This component is now individually versioned (individual versions of existing components start at 1.0.0)",
          },
          {
            Date: "28 Aug 2025",
            Version: "1.1.0",
            Description:
              "This update introduces new visual and spacing options to improve flexibility and clarity in content presentation.",
          },
        ],
      },
      roadmap: {
        title: "Roadmap",
        columns: ["Planned item", "Status", "Target"],
        rows: [
          {
            "Planned item": "Migrate component to new motion tokens",
            Status: "In progress",
            Target: "Nov 2025",
          },
          {
            "Planned item": "Add start/end slot flexibility",
            Status: "Under review",
            Target: "TBD",
          },
          {
            "Planned item": "Improve keyboard navigation",
            Status: "Planned",
            Target: "Q1 2026",
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
        linkLabel: "Issues → sgds/components/accordion",
        href: "#",
      },
    },
    updatesText:
      "This page uses the current SGDS accordion and tab components, with examples aligned to the portal design reference.",
  },
  alert: {
    key: "alert",
    title: "Alert",
    tag: "sgds-alert",
    group: "feedback",
    summary:
      "Alerts provide short, timely, and relevant information for your users. It can be a simple text message or customised HTML content with paragraphs, headings and links.",
    purposeCards: [
      {
        title: "Timely information",
        description: "Alerts surface messages that are relevant to what a user is currently doing — not after they've moved on.",
      },
      {
        title: "Communicate severity",
        description: "Contextual tones — info, success, warning, danger — tell users at a glance how urgently they need to act.",
      },
      {
        title: "Stay in the flow",
        description: "Inline alerts don't interrupt or redirect — they sit within the page so users stay oriented while being informed.",
      },
    ],
    anatomyMarkup: `<sgds-alert class="portal-alert-anatomy-demo" show dismissible variant="info" title="Scheduled maintenance">
      <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
      <span class="portal-alert-description">Maintenance starts at 10pm tonight.</span>
    </sgds-alert>`,
    anatomyParts: [
      { title: "Container" },
      { title: "Leading icon", note: "(optional)" },
      { title: "Title", note: "(optional)" },
      { title: "Description" },
      { title: "Dismissible - close button", note: "(optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-alert-anatomy-demo", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "top", targetSelector: ".portal-alert-anatomy-demo", targetShadowSelector: ".alert-title", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 4, direction: "bottom", targetSelector: ".portal-alert-description", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-64" },
      { number: 5, direction: "top", targetSelector: ".portal-alert-anatomy-demo", targetShadowSelector: "sgds-close-button", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description: "The alert offers variants to convey a different level of importance.",
        controlLabel: "Alert variant options",
        defaultValue: "info",
        options: [
          {
            label: "Info",
            value: "info",
            markup: `<sgds-alert show variant="info" title="Info alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to provide general context or neutral information, such as announcements or guidance that don't indicate a status outcome.",
          },
          {
            label: "Success",
            value: "success",
            markup: `<sgds-alert show variant="success" title="Success alert">
              <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to confirm that an action or process has completed successfully. Reassures users that their input was accepted.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<sgds-alert show variant="danger" title="Danger alert">
              <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to communicate errors or critical failures that require immediate attention. Reserve for situations that could block the user.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<sgds-alert show variant="warning" title="Warning alert">
              <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to flag potential issues that may need attention. Cautions the user without blocking them from proceeding.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<sgds-alert show variant="neutral" title="Neutral alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use when the message carries no particular status or urgency, such as simple notices or reminders.",
          },
        ],
      },
      {
        title: "Style",
        description: `The alert supports two styles—filled and outlined.\n\nFilled alerts are best for getting a user's attention. When in doubt, use the outlined alert.\n\nEvery variant has an outlined version. Outlined alerts are visually less disruptive for users.`,
        controlLabel: "Alert style options",
        defaultValue: "filled",
        options: [
          {
            label: "Filled",
            value: "filled",
            markup: `<sgds-alert show variant="info" title="Filled alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use when the alert needs to stand out and immediately capture the user's attention, such as for critical or high-priority messages.",
          },
          {
            label: "Outlined",
            value: "outlined",
            markup: `<sgds-alert show variant="info" outlined title="Outlined alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use for lower-priority messages that should remain visible without being visually disruptive. Recommended as the default when in doubt.",
          },
        ],
      },
      {
        title: "Dismissible",
        description: `The alert can be manually dismissed by the user.\n\nIt should only be used for non-critical messages.`,
        controlLabel: "Alert dismissible options",
        defaultValue: "non-dismissible",
        options: [
          {
            label: "Non-dismissible",
            value: "non-dismissible",
            markup: `<sgds-alert show variant="info" title="A non-dismissible alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use for persistent messages that must remain visible, such as system statuses or warnings the user needs to act on.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<sgds-alert show dismissible variant="info" title="A dismissible alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use for non-critical messages the user can close after reading, such as informational banners or one-time notices.",
          },
        ],
      },
      {
        title: "With icon",
        description: `Alerts may include an icon to reinforce meaning. The icon should support, not replace, the message text.\n\nAdding of icon is optional.`,
        controlLabel: "Alert icon options",
        defaultValue: "no-icon",
        options: [
          {
            label: "No icon",
            value: "no-icon",
            markup: `<sgds-alert show variant="info" title="Title">
              <div>Alert with no icon</div>
            </sgds-alert>`,
            description: "Use when the message is self-explanatory or when a minimal, text-only appearance is preferred.",
          },
          {
            label: "With icon",
            value: "with-icon",
            markup: `<sgds-alert show variant="info" title="Title">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Alert with icon</div>
            </sgds-alert>`,
            description: "Use to reinforce the alert's meaning with a recognisable visual cue. The icon should support, not replace, the message text.",
          },
        ],
      },
      {
        title: "Title",
        description: `Alerts can include a title to summarise the message and provide hierarchy, especially for longer or more complex content.\n\nAdding of title is optional.`,
        controlLabel: "Alert title options",
        defaultValue: "no-title",
        options: [
          {
            label: "No title",
            value: "no-title",
            markup: `<sgds-alert show variant="info">
              <div>Alert with no title</div>
            </sgds-alert>`,
            description: "Use for short, single-line messages that are easy to scan without an additional heading.",
          },
          {
            label: "With title",
            value: "with-title",
            markup: `<sgds-alert show variant="info" title="Title">
              <div>Alert with title</div>
            </sgds-alert>`,
            description: "Use when the alert contains longer or more detailed content that benefits from a clear summary heading.",
          },
        ],
      },
      {
        title: "Slot",
        description: "The default slot can contain supplementary content such as links or supporting actions, as long as the message remains clear and easy to scan.",
        controlLabel: "Alert slot options",
        defaultValue: "slot",
        options: [
          {
            label: "Slot",
            value: "slot",
            markup: `<sgds-alert show dismissible variant="info" outlined title="Title">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Alert with title</div>
              <div class="portal-slot-example">
                <sgds-icon name="arrow-repeat" size="sm"></sgds-icon>
                <span>Slot</span>
              </div>
            </sgds-alert>`,
            description: "Use the default slot to include supplementary content such as links, descriptions, or supporting actions below the main message.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Style",
        `The alert supports two styles—filled and outlined.\n\nFilled alerts are best for getting a user's attention. When in doubt, use the outlined alert.\n\nEvery variant has an outlined version. Outlined alerts are visually less disruptive for users.`,
        `<div class="portal-demo-stack">
          <sgds-alert show variant="info" title="Filled alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="info" outlined title="Outlined alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "Dismissible",
        `The alert can be manually dismissed by the user.\n\nIt should only be used for non-critical messages.`,
        `<div class="portal-demo-stack">
          <sgds-alert show dismissible variant="info" title="A dismissible alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="info" title="A non-dismissible alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "With icon",
        `Alerts may include an icon to reinforce meaning. The icon should support, not replace, the message text.\n\nAdding of icon is optional.`,
        `<div class="portal-demo-stack">
          <sgds-alert show variant="info" title="Title">
            <div>Alert with no icon</div>
          </sgds-alert>
          <sgds-alert show variant="info" title="Title">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Alert with icon</div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "Title",
        `Alerts can include a title to summarise the message and provide hierarchy, especially for longer or more complex content.\n\nAdding of title is optional.`,
        `<div class="portal-demo-stack">
          <sgds-alert show variant="info">
            <div>Alert with no title</div>
          </sgds-alert>
          <sgds-alert show variant="info" title="Title">
            <div>Alert with title</div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "Slot",
        "The default slot can contain supplementary content such as links or supporting actions, as long as the message remains clear and easy to scan.",
        `<sgds-alert show dismissible variant="info" outlined title="Title">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          <div>Alert with title</div>
          <div class="portal-slot-example">
            <sgds-icon name="arrow-repeat" size="sm"></sgds-icon>
            <span>Slot</span>
          </div>
        </sgds-alert>`,
      ),
    ],
    props: [
      {
        name: "show",
        type: "boolean",
        defaultValue: "false",
        description: "Controls the appearance of the alert.",
      },
      {
        name: "dismissible",
        type: "boolean",
        defaultValue: "false",
        description: "Enables a close button that allows the user to dismiss the alert.",
      },
      {
        name: "variant",
        type: '"info" | "success" | "danger" | "warning" | "neutral"',
        defaultValue: '"info"',
        description: "The alert's theme variant.",
      },
      {
        name: "outlined",
        type: "boolean",
        defaultValue: "false",
        description: "Controls the alert visual between a lighter outline and a solid darker variant.",
      },
      {
        name: "title",
        type: "string",
        defaultValue: '""',
        description: "The title of the alert. Only text is allowed.",
      },
    ],
    usage: {
      content: [
        {
          title: "Title",
          items: [
            "Keep titles short and scannable (1–2 lines).",
            "Use sentence case for readability.",
          ],
        },
        {
          title: "Body",
          items: [
            "Content inside of a section may be split into paragraphs and include sub-headers if needed.",
          ],
        },
        {
          title: "Icon",
          items: [
            "Icons should reinforce meaning, not duplicate it.",
          ],
        },
        {
          title: "Action",
          items: [
            "Avoid placing critical actions only inside accordion content—ensure visibility.",
          ],
        },
      ],
    },
  },
  badge: {
    key: "badge",
    title: "Badge",
    tag: "sgds-badge",
    group: "feedback",
    summary:
      "Badges can be used to highlight important bits of information such as labels, notifications & status.",
    purposeCards: [
      {
        title: "Label at a glance",
        description: "Badges attach short labels to content — a status, a count, a category — without breaking the reading flow.",
      },
      {
        title: "Signal without words",
        description: "Colour-coded tones communicate meaning quickly, so users can scan a list and immediately understand state.",
      },
      {
        title: "Complement, don't crowd",
        description: "Badges are deliberately small and quiet — they annotate content rather than compete with it.",
      },
    ],
    anatomyMarkup: `<div class="portal-demo-row"><sgds-badge class="portal-anatomy-badge"><sgds-icon slot="icon" name="star-fill"></sgds-icon>Badge label</sgds-badge></div>`,
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.default,
      defaultPartTitleMap.icon,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-anatomy-badge", targetX: "right", targetY: "center" },
      { number: 2, direction: "bottom", targetSelector: ".portal-anatomy-badge", targetX: "center", targetY: "bottom" },
      { number: 3, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Variants",
        description: "Badge variants use colour to convey meaning at a glance. Each variant signals a different status or category.",
        controlLabel: "Badge variant options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-badge>Default</sgds-badge></div>`,
            description: "The default badge uses the neutral colour tone. Use to apply a label with no particular status weight.",
          },
          {
            label: "Success",
            value: "success",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success">Success</sgds-badge></div>`,
            description: "Use to signal a positive state such as completed, approved, or active.",
          },
          {
            label: "Outlined",
            value: "outlined",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent" outlined>Outlined</sgds-badge></div>`,
            description: "The outlined style uses a border instead of a fill, giving the badge a lighter visual presence.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Variants",
        "Use badges for compact status and labelling patterns.",
        `<div class="portal-demo-row">
          <sgds-badge>Default</sgds-badge>
          <sgds-badge variant="success">Success</sgds-badge>
          <sgds-badge variant="accent" outlined>Outlined</sgds-badge>
        </div>`,
      ),
    ],
  },
  breadcrumb: {
    key: "breadcrumb",
    title: "Breadcrumb",
    tag: "sgds-breadcrumb",
    group: "navigation",
    summary:
      "Breadcrumbs help users to navigate and understand where they are on the current website or service.",
    purposeCards: [
      {
        title: "Show where you are",
        description: "Breadcrumbs give users a clear read of their current position in a multi-level structure without hunting through the navigation.",
      },
      {
        title: "Step back easily",
        description: "Each crumb is a direct link, so users can jump back to any ancestor level with a single click.",
      },
      {
        title: "Reduce disorientation",
        description: "On deep or complex sites, breadcrumbs prevent users from losing track of where they came from and how to get back.",
      },
    ],
    anatomyMarkup: `<sgds-breadcrumb><sgds-breadcrumb-item class="portal-anatomy-breadcrumb-item"><a href="#">Home</a></sgds-breadcrumb-item><sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item><sgds-breadcrumb-item class="portal-anatomy-breadcrumb-current"><a href="#">Payments</a></sgds-breadcrumb-item></sgds-breadcrumb>`,
    anatomyParts: [
      { title: "Container" },
      { title: "Breadcrumb item" },
      { title: "Current page" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-breadcrumb", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-breadcrumb-item", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: ".portal-anatomy-breadcrumb-current", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Breadcrumbs show the navigation path from the root to the current page as a trail of links.",
        controlLabel: "Breadcrumb demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description: "Displays the full navigation trail from home to the current page. Use on pages that are two or more levels deep so users can retrace their steps.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use breadcrumbs to expose the path back through a nested structure.",
        `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
      ),
    ],
  },
  button: {
    key: "button",
    title: "Button",
    tag: "sgds-button",
    group: "form",
    summary:
      "Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
    purposeCards: [
      {
        title: "Trigger actions clearly",
        description: "Buttons signal to users that something will happen when they click — whether that's submitting a form, opening a modal, or confirming a choice.",
      },
      {
        title: "Communicate intent with variants",
        description: "Primary, secondary, outline, and ghost variants let you express hierarchy — guiding users toward the most important action without overloading the page.",
      },
      {
        title: "Support every state",
        description: "Built-in loading, disabled, and focus states keep interactions predictable and accessible across all devices and input methods.",
      },
    ],
    anatomyMarkup: `<div class="portal-demo-row"><sgds-button class="portal-anatomy-button"><sgds-icon slot="leftIcon" name="house"></sgds-icon>Button label<sgds-icon slot="rightIcon" name="chevron-right"></sgds-icon></sgds-button></div>`,
    anatomyParts: [
      { title: "Container" },
      { title: "Label" },
      defaultPartTitleMap.leftIcon,
      defaultPartTitleMap.rightIcon,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-anatomy-button", targetX: "right", targetY: "center" },
      { number: 2, direction: "bottom", targetSelector: ".portal-anatomy-button", targetX: "center", targetY: "bottom" },
      { number: 3, direction: "top", targetSelector: "sgds-icon[slot='leftIcon']", targetX: "center", targetY: "top" },
      { number: 4, direction: "top", targetSelector: "sgds-icon[slot='rightIcon']", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Variants",
        description: "Button variants communicate hierarchy and help users identify the most important action on a screen.",
        controlLabel: "Button variant options",
        defaultValue: "primary",
        options: [
          {
            label: "Primary",
            value: "primary",
            markup: `<div class="portal-demo-row"><sgds-button>Primary action</sgds-button></div>`,
            description: "Use for the main action on a screen. Each view should have only one primary button to clearly communicate the most important next step.",
          },
          {
            label: "Outline",
            value: "outline",
            markup: `<div class="portal-demo-row"><sgds-button variant="outline">Secondary action</sgds-button></div>`,
            description: "Use for secondary actions that support the primary action — such as cancelling, going back, or choosing an alternative.",
          },
          {
            label: "Ghost",
            value: "ghost",
            markup: `<div class="portal-demo-row"><sgds-button variant="ghost">Tertiary action</sgds-button></div>`,
            description: "Use for tertiary or low-priority actions that should not compete visually with the primary or secondary button.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Variants",
        "Use the default and alternate variants to express priority and supporting actions.",
        `<div class="portal-demo-row">
          <sgds-button>Primary action</sgds-button>
          <sgds-button variant="outline">Secondary action</sgds-button>
          <sgds-button variant="ghost">Tertiary action</sgds-button>
        </div>`,
      ),
    ],
  },
  card: {
    key: "card",
    title: "Card",
    tag: "sgds-card",
    group: "data display",
    summary:
      "Cards can include headers, footers, rich content, and contextual background colours or images.",
    purposeCards: [
      {
        title: "Group related content",
        description: "Cards visually bundle a piece of information, such as a title, description, media, and action, into a single scannable unit.",
      },
      {
        title: "Enable comparison",
        description: "When cards share a consistent layout, users can quickly read across a grid and weigh options without extra effort.",
      },
      {
        title: "Flexible by design",
        description: "Cards work across many contexts, including content listings, dashboards, and product summaries, because the structure adapts to what you put inside.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      { title: "Icon or thumbnail", note: "(optional)" },
      { title: "Subtitle", note: "(optional)" },
      { title: "Title" },
      { title: "Content slot", note: "(optional)" },
      { title: "Description", note: "(optional)" },
      { title: "Secondary text", note: "(optional)" },
      { title: "Footer", note: "(optional)" },
      { title: "Badge", note: "(optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-card", targetX: "right", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "[slot='icon']", targetX: "left", targetY: "center" },
      { number: 3, direction: "left", targetSelector: "[slot='subtitle']", targetX: "left", targetY: "center" },
      { number: 4, direction: "left", targetSelector: "[slot='title']", targetX: "left", targetY: "center" },
      { number: 5, direction: "left", targetSelector: ".portal-anatomy-card-default-slot", targetX: "left", targetY: "center" },
      { number: 6, direction: "left", targetSelector: "[slot='description']", targetX: "left", targetY: "center" },
      { number: 7, direction: "left", targetSelector: "[slot='lower']", targetX: "left", targetY: "center" },
      { number: 8, direction: "left", targetSelector: "[slot='footer']", targetX: "left", targetY: "center" },
      { number: 9, direction: "right", targetSelector: "[slot='menu']", targetX: "right", targetY: "center" },
    ],
    anatomyMarkup: `<sgds-card class="portal-demo-card portal-anatomy-card">
      <sgds-badge slot="menu" variant="neutral" outlined>Badge</sgds-badge>
      <sgds-icon slot="icon" name="box-seam" size="2xl"></sgds-icon>
      <span slot="subtitle">Category</span>
      <span slot="title">Card title</span>
      <div class="portal-slot-example portal-anatomy-card-default-slot"><span>Default slot content</span></div>
      <span slot="description">Supporting description for the card content.</span>
      <span slot="lower">Secondary text</span>
      <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
    </sgds-card>`,
    demos: [
      demo(
        "Default",
        "Use cards to group related information and actions into a self-contained block.",
        `<sgds-card class="portal-demo-card">
          <span slot="title">Card title</span>
          <span slot="description">Supporting description for the card content.</span>
          <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
        </sgds-card>`,
      ),
    ],
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-card class="portal-demo-card">
          <span slot="subtitle">Category</span>
          <span slot="title">Card title</span>
          <div class="portal-slot-example portal-structure-card-default-slot"><span>Default slot content</span></div>
          <span slot="description">Supporting description for the card content.</span>
          <span slot="lower">Secondary text</span>
          <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
        </sgds-card>`,
      },
    ],
    measurementTokens: [
      { mapKey: "background", element: "Colour", property: "background", designToken: "sgds/surface-default", rawValue: "#FFFFFF" },
      { mapKey: "title-color", element: "", property: "title-color", designToken: "sgds/body-color-default", rawValue: "#1A1A1A" },
      { mapKey: "description-color", element: "", property: "description-color", designToken: "sgds/color-subtle", rawValue: "#525252" },
      { mapKey: "border-color", element: "Border", property: "border-color", designToken: "sgds/border-color-muted", rawValue: "#DFDFDF" },
      { mapKey: "border-width", element: "", property: "border-width", designToken: "sgds/border-width/1", rawValue: "1px" },
      { mapKey: "border-radius", element: "", property: "border-radius", designToken: "sgds/border-radius/md", rawValue: "8px" },
      { mapKey: "padding-x", element: "Spacing", property: "padding-x", designToken: "sgds/padding/xl", rawValue: "24px" },
      { mapKey: "padding-y", element: "", property: "padding-y", designToken: "sgds/padding/xl", rawValue: "24px" },
      { mapKey: "gap", element: "", property: "gap", designToken: "sgds/gap/lg", rawValue: "20px" },
      { mapKey: "title-gap", element: "", property: "title-gap", designToken: "sgds/gap/xs", rawValue: "8px" },
      { mapKey: "subtitle-gap", element: "", property: "subtitle-gap", designToken: "sgds/gap/2-xs", rawValue: "4px" },
      { mapKey: "slot-gap", element: "", property: "slot-gap", designToken: "sgds/gap/sm", rawValue: "12px" },
    ],
    configurationDemos: [
      {
        title: "Border",
        description: "Controls whether the card uses its default border.",
        controlLabel: "Card border options",
        defaultValue: "border",
        options: [
          {
            label: "Border",
            value: "border",
            description: "Shows the default card border. Use when the card needs a clear container that stands apart from the surrounding layout.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use the default border when the card needs its own visual container.</span>
            </sgds-card>`,
          },
          {
            label: "Borderless",
            value: "borderless",
            description: "Removes the default card border. Use when the page layout already provides enough separation and the border feels too heavy.",
            markup: `<sgds-card class="portal-demo-card" hideBorder>
              <span slot="title">Card title</span>
              <span slot="description">Hide the border when the surrounding layout already gives enough separation.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Tinted",
        description: "Background treatment that changes visual emphasis without changing structure.",
        controlLabel: "Card tinted options",
        defaultValue: "false",
        options: [
          {
            label: "Default",
            value: "false",
            description: "Uses the standard card background. Use for neutral card layouts that should not draw extra attention.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">The default treatment works for most neutral card layouts.</span>
            </sgds-card>`,
          },
          {
            label: "Tinted",
            value: "true",
            description: "Adds a subtle tinted background. Use to add gentle emphasis while keeping the same structure and content hierarchy.",
            markup: `<sgds-card class="portal-demo-card" tinted>
              <span slot="title">Card title</span>
              <span slot="description">Use tinted cards to add gentle emphasis without changing the structure.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Variant",
        description: "Available SGDS card variants and the kind of content each one supports.",
        controlLabel: "Card variant options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            description: "The base card variant is text-first and flexible. Use it when content matters more than supporting media.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use the default variant for text-first card layouts.</span>
            </sgds-card>`,
          },
          {
            label: "Icon card",
            value: "icon",
            description: "The icon card variant pairs content with a simple symbol. Use it when a small visual cue helps users recognise the card’s purpose quickly.",
            markup: `<sgds-icon-card class="portal-demo-card">
              <sgds-icon slot="icon" name="box-seam"></sgds-icon>
              <span slot="title">Service update</span>
              <span slot="description">A concise summary of the content inside the card.</span>
            </sgds-icon-card>`,
          },
          {
            label: "Thumbnail card",
            value: "thumbnail",
            description: "The thumbnail card variant uses a compact image beside the content. Use it when a small visual preview needs to sit alongside concise supporting copy.",
            markup: `<sgds-thumbnail-card class="portal-demo-card">
              <img
                slot="thumbnail"
                alt="Thumbnail"
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80"
                style="width: var(--sgds-dimension-64); height: var(--sgds-dimension-64); object-fit: cover; border-radius: var(--sgds-border-radius-md);"
              />
              <span slot="title">Thumbnail card title</span>
              <span slot="description">Supporting description for the thumbnail card.</span>
            </sgds-thumbnail-card>`,
          },
          {
            label: "Image card",
            value: "image-card",
            description: "The image card variant uses a larger visual preview above the content. Use it when the image needs to carry part of the story alongside short supporting copy.",
            markup: `<sgds-image-card class="portal-demo-card">
              <img
                slot="image"
                alt="Service preview"
                src="/landing/placeholder1.png"
              />
              <span slot="title">Image card title</span>
              <span slot="description">Supporting description for the image card content.</span>
            </sgds-image-card>`,
          },
        ],
      },
      {
        title: "Orientation",
        description: "Layout direction for arranging content and media vertically or horizontally.",
        controlLabel: "Card orientation options",
        defaultValue: "false",
        options: [
          {
            label: "Vertical",
            value: "false",
            description: "Stacks the media above the content. Use when the card should follow a more traditional vertical layout.",
            markup: `<sgds-card class="portal-demo-card">
              <img slot="image" src="/landing/placeholder1.png" alt="Service preview" width="760" height="480" />
              <span slot="title">Card title</span>
              <span slot="description">Media sits above the content in the default vertical layout.</span>
            </sgds-card>`,
          },
          {
            label: "Horizontal",
            value: "true",
            description: "Places the media beside the content. Use when you need a denser layout with media next to the body instead of above it.",
            markup: `<sgds-card class="portal-demo-card" orientation="horizontal" imagePosition="before">
              <img slot="image" src="/landing/placeholder1.png" alt="Service preview" width="760" height="480" />
              <span slot="title">Card title</span>
              <span slot="description">Media moves to the left when the card uses a horizontal layout.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Image position",
        description: "Image placement before or after the content across vertical and horizontal layouts.",
        controlLabel: "Card image position options",
        defaultValue: "before",
        options: [
          {
            label: "Before",
            value: "before",
            description: "Places the image before the content. Use when the image should appear above in vertical cards or to the left in horizontal cards.",
            markup: `<div class="sgds:grid sgds:grid-cols-2 sgds:gap-layout-md sgds:max-sm:grid-cols-1">
              <sgds-card class="portal-demo-card">
                <img slot="image" src="/landing/placeholder1.png" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears above the content in a vertical card.</span>
              </sgds-card>
              <sgds-card class="portal-demo-card" orientation="horizontal" imagePosition="before">
                <img slot="image" src="/landing/placeholder1.png" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears to the left of the content in a horizontal card.</span>
              </sgds-card>
            </div>`,
          },
          {
            label: "After",
            value: "after",
            description: "Places the image after the content. Use when the image should appear below in vertical cards or to the right in horizontal cards.",
            markup: `<div class="sgds:grid sgds:grid-cols-2 sgds:gap-layout-md sgds:max-sm:grid-cols-1">
              <sgds-card class="portal-demo-card" imagePosition="after">
                <img slot="image" src="/landing/placeholder1.png" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears below the content in a vertical card.</span>
              </sgds-card>
              <sgds-card class="portal-demo-card" orientation="horizontal" imagePosition="after">
                <img slot="image" src="/landing/placeholder1.png" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears to the right of the content in a horizontal card.</span>
              </sgds-card>
            </div>`,
          },
        ],
      },
      {
        title: "Badge",
        description: "Top-right badge content for lightweight status or metadata.",
        controlLabel: "Card badge options",
        defaultValue: "true",
        options: [
          {
            label: "Badge",
            value: "true",
            description: "A badge sits in the top-right area of the card. Use it to surface status, count, or lightweight metadata without taking over the card body.",
            markup: `<sgds-card class="portal-demo-card">
              <sgds-badge slot="menu" variant="neutral" outlined>Badge</sgds-badge>
              <span slot="title">Card title</span>
              <span slot="description">Add a badge when the card needs visible status at the top-right.</span>
            </sgds-card>`,
          },
          {
            label: "No badge",
            value: "false",
            description: "Removes the top-right badge area. Use when the card does not need extra status or metadata there.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use this when the card does not need a badge.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Secondary text",
        description: "An extra supporting text row below the description for added context.",
        controlLabel: "Card secondary text options",
        defaultValue: "true",
        options: [
          {
            label: "Secondary text",
            value: "true",
            description: "Secondary text sits below the description as a supporting row. Use it when the card needs an extra line for metadata, status, or supporting details.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Supporting description for the card content.</span>
              <span slot="lower">Secondary text</span>
            </sgds-card>`,
          },
          {
            label: "No secondary text",
            value: "false",
            description: "Removes the secondary text row. Use when the title and description already provide enough context on their own.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Supporting description for the card content.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Footer",
        description: "Footer content patterns, from lightweight links to stronger calls to action.",
        controlLabel: "Card footer options",
        defaultValue: "none",
        options: [
          {
            label: "No footer",
            value: "none",
            description: "Removes the footer action area. Use when the card is purely informational and does not need a follow-up action.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use this layout when no footer action is needed.</span>
            </sgds-card>`,
          },
          {
            label: "Link",
            value: "link",
            description: "A footer link provides a lightweight next step. Use it when the action does not need strong visual emphasis.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a footer link for a lighter follow-up action.</span>
              <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
            </sgds-card>`,
          },
          {
            label: "Button",
            value: "button",
            description: "A footer button gives the action more emphasis than a text link. Use it when the card needs a clearer call to action.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a footer button when the action needs stronger emphasis.</span>
              <sgds-button slot="footer" variant="secondary">Take action</sgds-button>
            </sgds-card>`,
          },
          {
            label: "Full width button",
            value: "full-width-button",
            description: "A full width button spans the footer and carries the strongest emphasis. Use it when the primary action should stand out clearly.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a full-width footer button when the primary action needs strong emphasis.</span>
              <div slot="footer" class="portal-card-footer-full-width">
                <sgds-button variant="primary" fullWidth>Take action</sgds-button>
              </div>
            </sgds-card>`,
          },
          {
            label: "Badge",
            value: "badge",
            description: "A footer badge carries compact status or label content. Use it when the footer needs a short classification instead of an action.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a footer badge for compact status or label content.</span>
              <sgds-badge slot="footer" variant="neutral" outlined>In progress</sgds-badge>
            </sgds-card>`,
          },
          {
            label: "Text",
            value: "text",
            description: "Footer text provides supporting metadata instead of an action. Use it for dates, status, or other small supporting details.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use footer text for supporting details such as dates or status.</span>
              <span slot="footer" class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Updated 2 hours ago</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Hierarchy",
        description: "Title emphasis across heading levels within the same card structure.",
        controlLabel: "Card hierarchy options",
        defaultValue: "h4",
        options: [
          {
            label: "H4",
            value: "h4",
            description: "Uses a larger heading level for the title. Use when the card title needs stronger emphasis in the layout.",
            markup: `<sgds-card class="portal-demo-card portal-card-title-h4-demo">
              <h4 slot="title" class="portal-card-title-h4 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Card title</h4>
              <span slot="description">Use a higher emphasis when the title needs more prominence.</span>
            </sgds-card>`,
          },
          {
            label: "H5",
            value: "h5",
            description: "Uses a lighter heading level for the title. Use when the card sits in a denser layout and the title should feel slightly lighter.",
            markup: `<sgds-card class="portal-demo-card portal-card-title-h5-demo">
              <h5 slot="title" class="portal-card-title-h5 sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Card title</h5>
              <span slot="description">Use a slightly lighter heading level for denser layouts.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Subtitle",
        description: "A short label above the title for category or supporting context.",
        controlLabel: "Card subtitle options",
        defaultValue: "true",
        options: [
          {
            label: "Subtitle",
            value: "true",
            description: "Adds a short label above the title. Use to show a category or supporting context before the title.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="subtitle">Category</span>
              <span slot="title">Card title</span>
              <span slot="description">The subtitle helps users scan the card context quickly.</span>
            </sgds-card>`,
          },
          {
            label: "No subtitle",
            value: "false",
            description: "Removes the label above the title. Use when the title already provides enough context without extra support.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Remove the subtitle when the title already carries enough context.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Description",
        description: "Supporting text beneath the title for added explanation or context.",
        controlLabel: "Card description options",
        defaultValue: "true",
        options: [
          {
            label: "Description",
            value: "true",
            description: "Description text sits below the title as supporting copy. Use it when the card needs extra explanation or context.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use the description slot for longer supporting text.</span>
              <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
            </sgds-card>`,
          },
          {
            label: "No description",
            value: "false",
            description: "Removes the supporting text area. Use when the card can stay compact and the title or action is enough on its own.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Content slot",
        description: "Custom content areas within the card body using the available content slots.",
        controlLabel: "Card content slot options",
        defaultValue: "default",
        interactionMode: "content-slots",
        options: [
          {
            label: "Default",
            value: "default",
            markup: "",
            description: "The default slot sits directly below the title. Use it for the card's main custom content, such as text, metadata, or small supporting elements.",
            selectedByDefault: true,
          },
          {
            label: "Upper",
            value: "upper",
            markup: "",
            description: "The upper slot sits above the title and main body content. Use it for banners, status markers, or supporting content that should appear first.",
          },
          {
            label: "Lower",
            value: "lower",
            markup: "",
            description: "The lower slot sits below the description. Use it for badges, metadata, or other supporting information.",
          },
        ],
      },
    ],
    props: [
      {
        name: "imagePosition",
        type: '"before" | "after"',
        defaultValue: '"before"',
        description: "Sets where the image slot appears in relation to the card content.",
      },
      {
        name: "imageAdjustment",
        type: '"default" | "padding around" | "aspect ratio"',
        defaultValue: '"default"',
        description: "Controls how the image is sized and fitted inside the card media area.",
      },
      {
        name: "hasImageSlot",
        type: "boolean",
        defaultValue: "false",
        description: "Used only for SSR to indicate the presence of the image slot.",
      },
      {
        name: "hasIconSlot",
        type: "boolean",
        defaultValue: "false",
        description: "Used only for SSR to indicate the presence of the icon slot.",
      },
      {
        name: "hasUpperSlot",
        type: "boolean",
        defaultValue: "false",
        description: "Used only for SSR to indicate the presence of the upper slot.",
      },
      {
        name: "stretchedLink",
        type: "boolean",
        defaultValue: "false",
        description: "Extends the footer or legacy link slot anchor so the card behaves like one larger click target.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables the card interaction.",
      },
      {
        name: "hideBorder",
        type: "boolean",
        defaultValue: "false",
        description: "Hides the default card border.",
      },
      {
        name: "tinted",
        type: "boolean",
        defaultValue: "false",
        description: "Applies a tinted background treatment to the card.",
      },
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        defaultValue: '"vertical"',
        description: "Controls whether the card content is laid out vertically or horizontally.",
      },
    ],
  },
  checkbox: {
    key: "checkbox",
    title: "Checkbox",
    tag: "sgds-checkbox",
    group: "form",
    summary:
      "Checkbox component is used when you require users to select multiple items from a list.",
    purposeCards: [
      {
        title: "Allow multiple selections",
        description: "Checkboxes let users select any combination of options from a list — ideal when more than one answer is valid.",
      },
      {
        title: "Make selections visible",
        description: "Checked and unchecked states are immediately visible, so users can review their choices at a glance before submitting.",
      },
      {
        title: "Support grouped choices",
        description: "Group related checkboxes under a shared label to help users understand what they're selecting within a broader category.",
      },
    ],
    anatomyParts: [
      { title: "Group container" },
      { title: "Checkbox control" },
      { title: "Label" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-checkbox-group", targetX: "right", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "sgds-checkbox", targetX: "left", targetY: "center" },
      { number: 3, direction: "right", targetSelector: "sgds-checkbox", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Group",
        description: "Checkboxes are grouped under a shared label so users can select multiple options from the same category.",
        controlLabel: "Checkbox demo",
        defaultValue: "group",
        options: [
          {
            label: "Group",
            value: "group",
            markup: `<sgds-checkbox-group label="Delivery options">
          <sgds-checkbox checked>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
            description: "Displays a group of related checkboxes under a shared label. Use when users may select more than one option from the same category.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Group",
        "Use checkbox groups when users can choose more than one option at a time.",
        `<sgds-checkbox-group label="Delivery options">
          <sgds-checkbox checked>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
      ),
    ],
  },
  "close-button": {
    key: "close-button",
    title: "Close button",
    tag: "sgds-close-button",
    group: "labels",
    summary: "A close button dismisses surfaces such as modals, drawers, alerts, and toasts.",
    purposeCards: [
      {
        title: "Dismiss with confidence",
        description: "A visible, accessible close affordance tells users they can exit a surface — modal, drawer, or alert — without uncertainty.",
      },
      {
        title: "Universal recognition",
        description: "The × pattern is immediately understood across contexts, reducing the need for text labels in tight spaces.",
      },
      {
        title: "Keyboard and pointer ready",
        description: "Built-in focus and hover states ensure the button is reachable and operable for all users, regardless of input method.",
      },
    ],
    anatomyParts: [{ title: "Button container" }, { title: "Close icon" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-close-button", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-close-button", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The close button is a compact dismiss control for surfaces like modals, drawers, alerts, and toasts.",
        controlLabel: "Close button demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-close-button></sgds-close-button></div>`,
            description: "Renders a compact dismiss control. Use wherever users need a clear way to close a surface such as a modal, drawer, alert, or toast.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use the close button where users need a compact dismiss action.",
        `<div class="portal-demo-row"><sgds-close-button></sgds-close-button></div>`,
      ),
    ],
  },
  "combo-box": {
    key: "combo-box",
    title: "Combo box",
    tag: "sgds-combo-box",
    group: "form",
    summary:
      "A combo box lets users make one or more selections from a list using text input, the keyboard, or the mouse.",
    purposeCards: [
      {
        title: "Search within a list",
        description: "When a dropdown has many options, a combo box lets users type to filter — saving them from scrolling through long lists.",
      },
      {
        title: "Balance flexibility and constraint",
        description: "Users can narrow down options by typing, but selections are still constrained to valid values — reducing input errors.",
      },
      {
        title: "Useful for large datasets",
        description: "Combo boxes are best when the full list is too long to browse comfortably but the user knows roughly what they're looking for.",
      },
    ],
    anatomyMarkup: `<sgds-combo-box class="portal-anatomy-combobox" placeholder="Select a category" open><sgds-combo-box-option class="portal-anatomy-combobox-option" value="housing">Housing</sgds-combo-box-option><sgds-combo-box-option value="transport">Transport</sgds-combo-box-option><sgds-combo-box-option value="health">Health</sgds-combo-box-option></sgds-combo-box>`,
    anatomyParts: [
      { title: "Input field" },
      { title: "Listbox" },
      { title: "Option" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-anatomy-combobox", targetX: "right", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-combobox", targetX: "right", targetY: "bottom", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "left", targetSelector: ".portal-anatomy-combobox-option", targetX: "left", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The combo box combines a text input with a filterable dropdown list.",
        controlLabel: "Combo box demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-combo-box placeholder="Select a category">
          <sgds-combo-box-option value="housing">Housing</sgds-combo-box-option>
          <sgds-combo-box-option value="transport">Transport</sgds-combo-box-option>
          <sgds-combo-box-option value="health">Health</sgds-combo-box-option>
        </sgds-combo-box>`,
            description: "Renders an input that filters a list of options as the user types. Use when the list is too long to browse but users know roughly what they're looking for.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use the combo box when users need to search or filter before selecting from a list.",
        `<sgds-combo-box placeholder="Select a category">
          <sgds-combo-box-option value="housing">Housing</sgds-combo-box-option>
          <sgds-combo-box-option value="transport">Transport</sgds-combo-box-option>
          <sgds-combo-box-option value="health">Health</sgds-combo-box-option>
        </sgds-combo-box>`,
      ),
    ],
  },
  datepicker: {
    key: "datepicker",
    title: "Datepicker",
    tag: "sgds-datepicker",
    group: "form",
    summary:
      "The `DatePicker` Component is built using `Dropdown`, `Input` and `Button` components. By default, the Calendar points to today's date and input has no value. Users can either pick dates from the calendar or type dates through the input",
    purposeCards: [
      {
        title: "Pick dates with precision",
        description: "The calendar view helps users select dates in context — seeing the day of the week and surrounding dates reduces scheduling mistakes.",
      },
      {
        title: "Type or click",
        description: "Users can either type a date directly into the input or use the calendar interface, accommodating both keyboard-first and pointer users.",
      },
      {
        title: "Consistent date format",
        description: "A shared date picker ensures all products in your service collect and display dates in the same format, reducing ambiguity.",
      },
    ],
    anatomyMarkup: `<sgds-datepicker class="portal-anatomy-datepicker" open placeholder="Select a date"></sgds-datepicker>`,
    anatomyParts: [{ title: "Input field" }, { title: "Calendar trigger" }, { title: "Calendar panel" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-anatomy-datepicker", targetX: "left", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-datepicker", targetX: "right", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "right", targetSelector: ".portal-anatomy-datepicker", targetX: "right", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The datepicker combines a text input with a calendar panel for structured date selection.",
        controlLabel: "Datepicker demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-datepicker placeholder="Select a date"></sgds-datepicker>`,
            description: "Renders a date input with a calendar picker. Use when users need to select a specific date and a calendar view helps them pick the right one in context.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use datepicker when users need a guided way to enter a calendar date.",
        `<sgds-datepicker placeholder="Select a date"></sgds-datepicker>`,
      ),
    ],
  },
  "description-list": {
    key: "description-list",
    title: "Description list",
    tag: "sgds-description-list",
    group: "list",
    summary:
      "Description lists pair terms with their corresponding descriptions or values. Use them to display structured content like key-value data, summaries, and definitions.",
    purposeCards: [
      {
        title: "Pair labels with values",
        description: "Description lists present key-value information clearly — names paired with values, terms paired with definitions, attributes paired with data.",
      },
      {
        title: "Review before submission",
        description: "Use description lists on confirmation or summary pages to show users exactly what they've entered before they commit.",
      },
      {
        title: "Detail without clutter",
        description: "The structured layout keeps dense information readable — labels and values are visually distinct without needing a full table.",
      },
    ],
    anatomyParts: [{ title: "Container" }, { title: "Label" }, { title: "Value" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-description-list", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-description-list > span:not([slot])", targetX: "center", targetY: "top" },
      { number: 3, direction: "right", targetSelector: "sgds-description-list > span[slot='data']", targetX: "right", targetY: "center" },
    ],
    anatomyMarkup: `<sgds-description-list-group>
      <sgds-description-list>
        <span>Label</span>
        <span slot="data">Value</span>
      </sgds-description-list>
    </sgds-description-list-group>`,
    configurationDemos: [
      {
        title: "Default",
        description: "Description lists pair terms with their corresponding values in a structured layout.",
        controlLabel: "Description list demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-description-list-group>
          <sgds-description-list>
            <span>Status</span>
            <span slot="data">Active</span>
          </sgds-description-list>
          <sgds-description-list>
            <span>Updated</span>
            <span slot="data">31 Mar 2026</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
            description: "Renders key-value pairs in a structured, readable layout. Use on confirmation or summary screens to show users what they have entered before they submit.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use description lists to pair labels with values in a compact, readable layout.",
        `<sgds-description-list-group>
          <sgds-description-list>
            <span>Status</span>
            <span slot="data">Active</span>
          </sgds-description-list>
          <sgds-description-list>
            <span>Updated</span>
            <span slot="data">31 Mar 2026</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
      ),
    ],
  },
  divider: {
    key: "divider",
    title: "Divider",
    tag: "sgds-divider",
    group: "layout",
    summary:
      "A divider is a thin line that groups content in lists and layouts. They bring clarity to a layout by grouping and dividing content in close proximity.",
    purposeCards: [
      {
        title: "Create visual breathing room",
        description: "Dividers introduce a pause between content sections, helping users mentally separate one topic from the next.",
      },
      {
        title: "Group without boxing",
        description: "A line is lighter than a card border — use dividers when you want to separate content without enclosing it.",
      },
      {
        title: "Works horizontally and vertically",
        description: "Orientation options let dividers separate both stacked sections and side-by-side elements consistently across layouts.",
      },
    ],
    anatomyParts: [{ title: "Rule" }, { title: "Orientation" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-divider", targetX: "right", targetY: "center" },
      { number: 2, direction: "right", targetSelector: "sgds-divider[orientation='vertical']", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Orientation",
        description: "Dividers can run horizontally or vertically depending on the layout direction of the content they separate.",
        controlLabel: "Divider orientation options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<div class="sgds:w-full"><sgds-divider></sgds-divider></div>`,
            description: "Use to separate content stacked vertically — such as between sections, list rows, or form groups.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<div class="portal-demo-row sgds:h-12"><span>Left</span><sgds-divider orientation="vertical"></sgds-divider><span>Right</span></div>`,
            description: "Use to separate content placed side by side — such as between columns, inline labels, or adjacent actions.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Orientation",
        "Use dividers to separate related content without adding a new surface.",
        `<div class="portal-demo-stack">
          <sgds-divider></sgds-divider>
          <div class="portal-demo-row" style="height: var(--sgds-dimension-48);">
            <span>Left</span>
            <sgds-divider orientation="vertical"></sgds-divider>
            <span>Right</span>
          </div>
        </div>`,
      ),
    ],
  },
  drawer: {
    key: "drawer",
    title: "Drawer",
    tag: "sgds-drawer",
    group: "feedback",
    summary:
      "Drawers slide in from a container to expose additional options and information.",
    purposeCards: [
      {
        title: "Expand context on demand",
        description: "Drawers reveal additional information or actions in a panel anchored to the edge of the screen, without replacing the current view.",
      },
      {
        title: "Keep the page visible",
        description: "Unlike a modal, a drawer sits alongside the main content — users can reference what's behind it while working in the panel.",
      },
      {
        title: "Useful for secondary tasks",
        description: "Use drawers for settings, filters, or detail panels where the content supports — but doesn't replace — what's already on screen.",
      },
    ],
    anatomyParts: [
      { title: "Panel" },
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
      defaultPartTitleMap.default,
      defaultPartTitleMap.footer,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-drawer", targetX: "right", targetY: "bottom" },
      { number: 2, direction: "top", targetSelector: "[slot='title']", targetX: "center", targetY: "top" },
      { number: 3, direction: "right", targetSelector: "[slot='description']", targetX: "right", targetY: "center" },
      { number: 4, direction: "left", targetSelector: "sgds-drawer p", targetX: "left", targetY: "center" },
      { number: 5, direction: "bottom", targetSelector: "[slot='footer']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Contained",
        description: "Drawers slide in from the edge of their container to reveal secondary content without replacing the main view.",
        controlLabel: "Drawer demo",
        defaultValue: "contained",
        options: [
          {
            label: "Contained",
            value: "contained",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained size="sm">
            <span slot="title">Edit details</span>
            <span slot="description">Review the information before saving.</span>
            <p>Drawers are useful for secondary tasks that need more space than a popover.</p>
            <div slot="footer" class="portal-demo-row">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Save</sgds-button>
            </div>
          </sgds-drawer>
        </div>`,
            description: "Renders a panel anchored to the container edge. Use for secondary tasks — such as reviewing details, editing settings, or applying filters — that support the main page without replacing it.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Contained",
        "Use drawers to reveal supporting tasks while keeping the main page in view.",
        `<div class="portal-demo-overlay">
          <sgds-drawer open contained size="sm">
            <span slot="title">Edit details</span>
            <span slot="description">Review the information before saving.</span>
            <p>Drawers are useful for secondary tasks that need more space than a popover.</p>
            <div slot="footer" class="portal-demo-row">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Save</sgds-button>
            </div>
          </sgds-drawer>
        </div>`,
      ),
    ],
  },
  dropdown: {
    key: "dropdown",
    title: "Dropdown",
    tag: "sgds-dropdown",
    group: "navigation",
    summary:
      "Dropdowns reveal a list of contextual actions or links from a single trigger.",
    purposeCards: [
      {
        title: "Reveal actions on demand",
        description: "Dropdowns keep secondary actions hidden until needed, reducing visual clutter without making options hard to reach.",
      },
      {
        title: "Anchor to a trigger",
        description: "The dropdown always opens relative to its trigger — users know exactly where it came from and where to dismiss it.",
      },
      {
        title: "Flexible content inside",
        description: "Dropdown menus can contain plain links, actions, icons, or dividers — composing a list that fits the context.",
      },
    ],
    anatomyMarkup: `<div style="min-height: 160px;"><sgds-dropdown open><sgds-button slot="toggler" variant="outline">Actions</sgds-button><sgds-dropdown-item class="portal-anatomy-dropdown-item"><a href="#">Edit</a></sgds-dropdown-item><sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item><sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item></sgds-dropdown></div>`,
    anatomyParts: [
      { title: "Toggler" },
      { title: "Menu" },
      { title: "Menu item" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "[slot='toggler']", targetX: "center", targetY: "top" },
      { number: 2, direction: "right", targetSelector: "sgds-dropdown", targetX: "right", targetY: "bottom", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "left", targetSelector: ".portal-anatomy-dropdown-item", targetX: "left", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Dropdowns reveal a list of contextual actions or links anchored to a trigger element.",
        controlLabel: "Dropdown demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-dropdown>
          <sgds-button slot="toggler" variant="outline">Actions</sgds-button>
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description: "Renders a menu of contextual options anchored to a trigger. Use when a set of related actions or links should be hidden until the user explicitly opens them.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use dropdowns to collect related actions under a single trigger.",
        `<sgds-dropdown>
          <sgds-button slot="toggler" variant="outline">Actions</sgds-button>
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
        </sgds-dropdown>`,
      ),
    ],
  },
  "file-upload": {
    key: "file-upload",
    title: "File upload",
    tag: "sgds-file-upload",
    group: "form",
    summary: "Allows users to upload files of various sizes and formats",
    purposeCards: [
      {
        title: "Attach files to a task",
        description: "File upload gives users a clear, accessible way to attach documents, images, or other files as part of completing a form or workflow.",
      },
      {
        title: "Show what's been added",
        description: "Once a file is selected, the component confirms the filename and size so users know their upload was received before submitting.",
      },
      {
        title: "Constrain accepted types",
        description: "File type and size restrictions can be communicated upfront, reducing failed uploads and back-and-forth with users.",
      },
    ],
    anatomyParts: [{ title: "Upload button" }, { title: "Selected file list" }, { title: "Feedback area" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-file-upload", targetX: "center", targetY: "top" },
      { number: 2, direction: "right", targetSelector: "sgds-file-upload", targetX: "right", targetY: "center" },
      { number: 3, direction: "bottom", targetSelector: "sgds-file-upload", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The file upload component provides a button for attaching files and displays selected file names.",
        controlLabel: "File upload demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-file-upload accept=".pdf,.doc,.docx">Upload document</sgds-file-upload>`,
            description: "Renders an upload control with a file selection button and attachment feedback. Use when users need to submit supporting documents or media as part of a form.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use file upload when users need to submit supporting documents or media.",
        `<sgds-file-upload accept=".pdf,.doc,.docx">Upload document</sgds-file-upload>`,
      ),
    ],
  },
  footer: {
    key: "footer",
    title: "Footer",
    tag: "sgds-footer",
    group: "navigation",
    summary:
      "The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.",
    purposeCards: [
      {
        title: "Required for .gov.sg services",
        description: "All government digital services are required to include a footer with service name, contact information, privacy statement, and terms of use.",
      },
      {
        title: "Persistent across pages",
        description: "The footer provides a consistent anchor at the bottom of every page — users know where to find legal and contact information regardless of where they are.",
      },
      {
        title: "Supports trust and compliance",
        description: "A standardised footer reinforces the official identity of a government service and helps users verify they're on an authentic .gov.sg site.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
      defaultPartTitleMap.items,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-footer", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "[slot='title']", targetX: "center", targetY: "top" },
      { number: 3, direction: "left", targetSelector: "[slot='description']", targetX: "left", targetY: "center" },
      { number: 4, direction: "bottom", targetSelector: "sgds-footer", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The footer contains mandatory service information — name, contact links, and legal information — required on all .gov.sg pages.",
        controlLabel: "Footer demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-footer
          copyrightLiner="© 2026 Example service"
          contactHref="#"
          feedbackHref="#"
          privacyHref="#"
          termsOfUseHref="#"
        >
          <span slot="title">Example service</span>
          <span slot="description">Supporting information for the service.</span>
        </sgds-footer>`,
            description: "Renders the required government footer with service name, contact links, and legal information. Use on every page of a .gov.sg service to meet mandatory disclosure requirements.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use the footer to present the supporting service information users expect at the bottom of a page.",
        `<sgds-footer
          copyrightLiner="© 2026 Example service"
          contactHref="#"
          feedbackHref="#"
          privacyHref="#"
          termsOfUseHref="#"
        >
          <span slot="title">Example service</span>
          <span slot="description">Supporting information for the service.</span>
        </sgds-footer>`,
      ),
    ],
  },
  icon: {
    key: "icon",
    title: "Icon",
    tag: "sgds-icon",
    group: "labels",
    summary:
      "Icons offer a form of visual shorthand that we are all familiar with. They can label, inform and aid navigation quickly and effectively in minimal space. Icons must first and foremost communicate meaning. By default, the icon component renders icons from `SgdsIcon` library set",
    purposeCards: [
      {
        title: "Communicate at a glance",
        description: "Icons convey meaning quickly in spaces where text would be too long — labels, buttons, status indicators, and navigation all benefit from visual shorthand.",
      },
      {
        title: "Support text, not replace it",
        description: "Icons work best alongside text, not instead of it. When used alone, always pair them with an accessible label so meaning is never ambiguous.",
      },
      {
        title: "Consistent library",
        description: "All icons are drawn from the SgdsIcon set, ensuring visual consistency across every product built on SGDS.",
      },
    ],
    anatomyParts: [{ title: "Icon glyph" }, { title: "Size variant" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-icon", targetX: "center", targetY: "top" },
      { number: 2, direction: "right", targetSelector: "sgds-icon[size='lg']", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Scale",
        description: "Icon size should match the surrounding context — smaller for inline use, larger for prominent visual anchors.",
        controlLabel: "Icon scale options",
        defaultValue: "md",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-row"><sgds-icon name="house" size="sm"></sgds-icon></div>`,
            description: "Use small icons in tight spaces such as inline with text, within form controls, or in dense list rows.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-row"><sgds-icon name="search" size="md"></sgds-icon></div>`,
            description: "Use medium icons as the standard size for most product contexts — buttons, navigation items, and standalone indicators.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-demo-row"><sgds-icon name="three-dots" size="lg"></sgds-icon></div>`,
            description: "Use large icons in prominent positions — hero sections, empty states, or feature highlights — where the icon carries visual weight.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Scale",
        "Use icons to support nearby text and actions, not to replace meaning that users need in plain language.",
        `<div class="portal-demo-row">
          <sgds-icon name="house" size="sm"></sgds-icon>
          <sgds-icon name="search" size="md"></sgds-icon>
          <sgds-icon name="three-dots" size="lg"></sgds-icon>
        </div>`,
      ),
    ],
  },
  "icon-button": {
    key: "icon-button",
    title: "Icon button",
    tag: "sgds-icon-button",
    group: "navigation",
    summary:
      "An icon button is a user interface element that combines an icon and a button, serving as a clickable or tabbable component.",
    purposeCards: [
      {
        title: "Action in minimal space",
        description: "Icon buttons let you place interactive controls in tight areas — toolbars, table rows, compact headers — without needing a text label.",
      },
      {
        title: "Always label for accessibility",
        description: "Because there's no visible text, icon buttons require an accessible aria-label so screen reader users understand the action.",
      },
      {
        title: "Consistent visual weight",
        description: "Using the icon button component keeps icon-only actions styled and sized consistently across your product.",
      },
    ],
    anatomyParts: [{ title: "Button container" }, { title: "Icon" }, { title: "Interactive state" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-icon-button", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-icon-button", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: "sgds-icon-button[variant='outline']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Variants",
        description: "Icon button variants control the visual weight of the control to suit different interface contexts.",
        controlLabel: "Icon button variant options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search"></sgds-icon-button></div>`,
            description: "The default filled variant is visually heavier. Use in toolbars or alongside other solid controls where the button needs to stand out.",
          },
          {
            label: "Outline",
            value: "outline",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="three-dots" variant="outline"></sgds-icon-button></div>`,
            description: "The outlined variant has a lighter presence. Use when the icon button should not compete visually with nearby elements.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Variants",
        "Use icon buttons for compact actions where the icon remains clear and familiar in context.",
        `<div class="portal-demo-row">
          <sgds-icon-button name="search"></sgds-icon-button>
          <sgds-icon-button name="three-dots" variant="outline"></sgds-icon-button>
        </div>`,
      ),
    ],
  },
  "icon-card": {
    key: "icon-card",
    title: "Icon card",
    tag: "sgds-icon-card",
    group: "data display",
    summary:
      "Icon cards can include headers, footers, rich content, and contextual background colours or images.",
    purposeCards: [
      {
        title: "Lead with a visual cue",
        description: "The icon draws attention to the card's topic before users read the text, helping them navigate a grid of options more quickly.",
      },
      {
        title: "Describe features or categories",
        description: "Icon cards work well for presenting a set of features, services, or categories where a small visual anchors each item.",
      },
      {
        title: "Uniform across a grid",
        description: "The consistent structure — icon, title, description — means a row of icon cards stays balanced and easy to scan.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.icon,
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-icon-card", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "[slot='icon']", targetX: "center", targetY: "top" },
      { number: 3, direction: "left", targetSelector: "[slot='title']", targetX: "left", targetY: "center" },
      { number: 4, direction: "bottom", targetSelector: "[slot='description']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Icon cards pair a leading icon with a title and description to help users identify the category or topic at a glance.",
        controlLabel: "Icon card demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="box-seam"></sgds-icon>
          <span slot="title">Service update</span>
          <span slot="description">A concise summary of the content inside the card.</span>
        </sgds-icon-card>`,
            description: "Renders a card with a leading icon, title, and description. Use when a simple visual anchor helps users recognise the category or topic of each card in a grid.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use icon cards when the supporting symbol helps users recognise the category of content quickly.",
        `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="box-seam"></sgds-icon>
          <span slot="title">Service update</span>
          <span slot="description">A concise summary of the content inside the card.</span>
        </sgds-icon-card>`,
      ),
    ],
  },
  "icon-list": {
    key: "icon-list",
    title: "Icon list",
    tag: "sgds-icon-list",
    group: "list",
    summary:
      "An icon list displays content related to the same topic, with each list item beginning with an icon.",
    purposeCards: [
      {
        title: "Pair icons with text rows",
        description: "Icon lists give each list item a visual marker, making it easier to scan and find specific entries in longer sets.",
      },
      {
        title: "Communicate type or status",
        description: "Icons can signal category, priority, or state at a glance — users don't need to read every label to understand the list.",
      },
      {
        title: "More expressive than plain lists",
        description: "When plain bullet points feel flat, icon lists add visual structure without adding layout complexity.",
      },
    ],
    anatomyParts: [{ title: "List container" }, { title: "List item" }, { title: "Leading icon" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-icon-list", targetX: "right", targetY: "center" },
      { number: 2, direction: "bottom", targetSelector: ".portal-demo-list-item", targetX: "center", targetY: "bottom" },
      { number: 3, direction: "left", targetSelector: "sgds-icon", targetX: "left", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Icon lists display content rows where each item begins with a leading icon to aid scanning and visual grouping.",
        controlLabel: "Icon list demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-icon-list>
          <div role="listitem" class="portal-demo-list-item">
            <sgds-icon name="check-circle"></sgds-icon>
            <span>Respond within 3 working days</span>
          </div>
          <div role="listitem" class="portal-demo-list-item">
            <sgds-icon name="check-circle"></sgds-icon>
            <span>Bring your supporting documents</span>
          </div>
        </sgds-icon-list>`,
            description: "Renders a list where each item is preceded by an icon. Use when a repeated visual marker helps users scan a set of similar items or understand their type at a glance.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use icon lists when a repeated icon helps reinforce the same type of point across each item.",
        `<sgds-icon-list>
          <div role="listitem" class="portal-demo-list-item">
            <sgds-icon name="check-circle"></sgds-icon>
            <span>Respond within 3 working days</span>
          </div>
          <div role="listitem" class="portal-demo-list-item">
            <sgds-icon name="check-circle"></sgds-icon>
            <span>Bring your supporting documents</span>
          </div>
        </sgds-icon-list>`,
      ),
    ],
  },
  "image-card": {
    key: "image-card",
    title: "Image card",
    tag: "sgds-image-card",
    group: "data display",
    summary:
      "Image cards can include headers, footers, rich content, and contextual background colours or images.",
    purposeCards: [
      {
        title: "Lead with a visual",
        description: "The image sets immediate context — users understand the content of the card before reading a single word.",
      },
      {
        title: "Present editorial or catalogue content",
        description: "Image cards work well for articles, projects, products, or resources where a thumbnail helps users decide what to open.",
      },
      {
        title: "Consistent layout at scale",
        description: "A grid of image cards maintains visual rhythm because every card shares the same proportions and content structure.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.image,
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-image-card", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "[slot='image']", targetX: "center", targetY: "top" },
      { number: 3, direction: "left", targetSelector: "[slot='title']", targetX: "left", targetY: "center" },
      { number: 4, direction: "bottom", targetSelector: "[slot='description']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Image cards display a full-width image above the card content, letting the visual set context before users read the text.",
        controlLabel: "Image card demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-image-card class="portal-demo-card">
          <img
            slot="image"
            alt="Scenic placeholder"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
          />
          <span slot="title">Image card title</span>
          <span slot="description">Supporting description for the image card content.</span>
        </sgds-image-card>`,
            description: "Renders a card with a full-width image above the title and description. Use when the image needs to carry part of the story — such as for articles, projects, or catalogue items.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use image cards when the visual needs to carry part of the story alongside short supporting copy.",
        `<sgds-image-card class="portal-demo-card">
          <img
            slot="image"
            alt="Scenic placeholder"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
          />
          <span slot="title">Image card title</span>
          <span slot="description">Supporting description for the image card content.</span>
        </sgds-image-card>`,
      ),
    ],
  },
  input: {
    key: "input",
    title: "Input",
    tag: "sgds-input",
    group: "form",
    summary:
      "Text inputs allow your users to enter letters, numbers and symbols on a single line.",
    purposeCards: [
      {
        title: "Collect free-form text",
        description: "Text inputs are the default choice for any information that users need to type out — names, references, search terms, addresses.",
      },
      {
        title: "Built-in validation states",
        description: "Error, warning, and success states are part of the component — validation feedback integrates naturally without custom styling.",
      },
      {
        title: "Label and helper text included",
        description: "The label and helper text slots keep form questions and guidance close to their field, reducing the cognitive load on users.",
      },
    ],
    anatomyMarkup: `<sgds-input class="portal-anatomy-input" placeholder="Search services"><sgds-icon slot="icon" name="search"></sgds-icon><sgds-icon slot="trailing-icon" name="x-circle"></sgds-icon></sgds-input>`,
    anatomyParts: [
      { title: "Input field" },
      defaultPartTitleMap.icon,
      defaultPartTitleMap["trailing-icon"],
      defaultPartTitleMap.action,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-anatomy-input", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top" },
      { number: 3, direction: "top", targetSelector: "sgds-icon[slot='trailing-icon']", targetX: "center", targetY: "top" },
      { number: 4, direction: "bottom", targetSelector: ".portal-anatomy-input", targetX: "right", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Leading icon",
        description: "The text input supports optional leading and trailing icons for visual context or inline actions.",
        controlLabel: "Input demo",
        defaultValue: "leading-icon",
        options: [
          {
            label: "Leading icon",
            value: "leading-icon",
            markup: `<sgds-input placeholder="Search services">
          <sgds-icon slot="icon" name="search"></sgds-icon>
        </sgds-input>`,
            description: "Renders a text input with a leading icon. Use a recognisable icon to hint at the expected input type — such as a search icon for a search field.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Leading icon",
        "Use text input for concise freeform values and optional inline affordances.",
        `<sgds-input placeholder="Search services">
          <sgds-icon slot="icon" name="search"></sgds-icon>
        </sgds-input>`,
      ),
    ],
  },
  link: {
    key: "link",
    title: "Link",
    tag: "sgds-link",
    group: "labels",
    summary: "Link allows users to click and navigate their way from page to page",
    purposeCards: [
      {
        title: "Navigate within content",
        description: "Inline links let users move to related pages or resources without leaving the natural reading flow of a paragraph or list.",
      },
      {
        title: "Visually distinct from text",
        description: "The link style is consistently underlined and coloured so users can immediately tell what's interactive and what isn't.",
      },
      {
        title: "Multiple size options",
        description: "Link sizes let you match the surrounding text — whether it's body copy, a caption, or a heading — without breaking the typographic hierarchy.",
      },
    ],
    anatomyParts: [{ title: "Link wrapper" }, { title: "Anchor content" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-link", targetX: "center", targetY: "top" },
      { number: 2, direction: "bottom", targetSelector: "sgds-link a", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The link component provides a consistently styled inline anchor for navigating between pages or sections.",
        controlLabel: "Link demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-link><a href="#">Visit related guidance</a></sgds-link>`,
            description: "Renders an inline anchor styled as a link. Use within body copy, lists, or descriptions to navigate users to related pages or resources.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use links for navigation between pages, sections, or related references.",
        `<sgds-link><a href="#">Visit related guidance</a></sgds-link>`,
      ),
    ],
  },
  mainnav: {
    key: "mainnav",
    title: "Mainnav",
    tag: "sgds-mainnav",
    group: "navigation",
    summary:
      "This component is the primary means that your users will use to navigate through your portal. It includes horizontal navigation and branding to identify your site.",
    purposeCards: [
      {
        title: "Primary site navigation",
        description: "The mainnav is the top-level wayfinding component — it gives users a clear view of the site's main sections from any page.",
      },
      {
        title: "Includes brand identity",
        description: "The logo slot ties navigation to the service brand, so users always know which product they're in, even when they navigate deep into the site.",
      },
      {
        title: "Responsive and accessible",
        description: "The navigation collapses into a mobile-friendly menu at smaller breakpoints, and keyboard navigation is fully supported out of the box.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.brand,
      { title: "Navigation item" },
      defaultPartTitleMap.end,
    ],
    anatomyCallouts: [
      { number: 1, direction: "bottom", targetSelector: "sgds-mainnav", targetX: "center", targetY: "bottom" },
      { number: 2, direction: "top", targetSelector: "[slot='brand']", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: "sgds-mainnav-item[active]", targetX: "center", targetY: "bottom" },
      { number: 4, direction: "top", targetSelector: "sgds-mainnav-dropdown[slot='end']", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The main navigation provides top-level wayfinding with a brand logo, nav items, and an end slot for utility controls.",
        controlLabel: "Mainnav demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav fluid>
            <img
              slot="brand"
              alt="SGDS"
              src="/logo.svg"
              style="height: var(--sgds-dimension-32); width: auto;"
            />
            <sgds-mainnav-item href="#">Overview</sgds-mainnav-item>
            <sgds-mainnav-item href="#" active>Services</sgds-mainnav-item>
            <sgds-mainnav-dropdown slot="end">
              <span slot="toggler">Account</span>
              <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
              <sgds-dropdown-item><a href="#">Sign out</a></sgds-dropdown-item>
            </sgds-mainnav-dropdown>
          </sgds-mainnav>
        </div>`,
            description: "Renders the top-level navigation bar with brand, nav items, and an end slot for utility controls. Use on every page of a service to give users consistent wayfinding.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use mainnav for top-level wayfinding across a service or portal.",
        `<div class="portal-demo-nav">
          <sgds-mainnav fluid>
            <img
              slot="brand"
              alt="SGDS"
              src="/logo.svg"
              style="height: var(--sgds-dimension-32); width: auto;"
            />
            <sgds-mainnav-item href="#">Overview</sgds-mainnav-item>
            <sgds-mainnav-item href="#" active>Services</sgds-mainnav-item>
            <sgds-mainnav-dropdown slot="end">
              <span slot="toggler">Account</span>
              <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
              <sgds-dropdown-item><a href="#">Sign out</a></sgds-dropdown-item>
            </sgds-mainnav-dropdown>
          </sgds-mainnav>
        </div>`,
      ),
    ],
  },
  masthead: {
    key: "masthead",
    title: "Masthead",
    tag: "sgds-masthead",
    group: "navigation",
    summary:
      "All .gov.sg digital services shall adopt The Official Government Banner for every page in the digital service and be placed at the top of the page.",
    purposeCards: [
      {
        title: "Mandatory for .gov.sg services",
        description: "Every .gov.sg digital service is required to display the official government banner so users can verify they're on an authentic government website.",
      },
      {
        title: "Establishes trust immediately",
        description: "The masthead is the first thing users see — its standardised design signals official authenticity before users interact with any content.",
      },
      {
        title: "Consistent across government",
        description: "Using the same masthead across all .gov.sg services creates a unified experience that reinforces trust in the broader Singapore government digital ecosystem.",
      },
    ],
    anatomyParts: [{ title: "Government banner" }, { title: "Expandable details" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-masthead", targetX: "right", targetY: "center" },
      { number: 2, direction: "bottom", targetSelector: "sgds-masthead", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The masthead is the mandatory Singapore Government banner that confirms authenticity for .gov.sg services.",
        controlLabel: "Masthead demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav"><sgds-masthead fluid></sgds-masthead></div>`,
            description: "Renders the mandatory Singapore Government banner. Place this at the very top of every .gov.sg service page so users can verify they are on an official government website.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use the official government banner at the top of every service page.",
        `<div class="portal-demo-nav"><sgds-masthead fluid></sgds-masthead></div>`,
      ),
    ],
  },
  modal: {
    key: "modal",
    title: "Modal",
    tag: "sgds-modal",
    group: "feedback",
    summary:
      "The modal component inform users about a specific task and may contain critical information which users then have to make a decision.",
    purposeCards: [
      {
        title: "Demand focused attention",
        description: "Modals block the background to ensure users engage with critical information or complete a required action before continuing.",
      },
      {
        title: "Confirm before consequences",
        description: "Use modals to confirm destructive or irreversible actions — deleting a record, submitting a form — so users don't act by accident.",
      },
      {
        title: "Self-contained interactions",
        description: "A modal should contain everything needed to complete its task — title, body, and clear actions — so users don't need to leave it to find context.",
      },
    ],
    anatomyMarkup: `<div class="portal-modal-preview">
      <div class="portal-modal-panel">
        <div class="portal-modal-header">
          <div class="portal-modal-header-copy">
            <div class="portal-modal-title">Confirm submission</div>
            <div class="portal-modal-description">Review the information before you continue.</div>
          </div>
          <sgds-close-button aria-label="Close modal"></sgds-close-button>
        </div>
        <div class="portal-modal-body">
          <p>The modal can contain short supporting content and clear actions.</p>
        </div>
        <div class="portal-modal-footer">
          <sgds-button variant="outline">Cancel</sgds-button>
          <sgds-button>Confirm</sgds-button>
        </div>
      </div>
    </div>`,
    anatomyParts: [
      { title: "Dialog surface" },
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
      defaultPartTitleMap.default,
      defaultPartTitleMap.footer,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-modal-panel", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-modal-title", targetX: "center", targetY: "top" },
      { number: 3, direction: "right", targetSelector: ".portal-modal-description", targetX: "right", targetY: "center" },
      { number: 4, direction: "left", targetSelector: ".portal-modal-body", targetX: "left", targetY: "center" },
      { number: 5, direction: "bottom", targetSelector: ".portal-modal-footer", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Modals are blocking dialogs that focus users on a single critical task or decision.",
        controlLabel: "Modal demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-modal-preview">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Confirm submission</div>
                <div class="portal-modal-description">Review the information before you continue.</div>
              </div>
              <sgds-close-button aria-label="Close modal"></sgds-close-button>
            </div>
            <div class="portal-modal-body">
              <p>The modal can contain short supporting content and clear actions.</p>
            </div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description: "Renders a blocking dialog that focuses users on a single task. Use for confirmations, destructive actions, or short flows that require a decision before the main page can continue.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use modals for focused decisions that should interrupt the main flow until users respond.",
        `<div class="portal-modal-preview">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Confirm submission</div>
                <div class="portal-modal-description">Review the information before you continue.</div>
              </div>
              <sgds-close-button aria-label="Close modal"></sgds-close-button>
            </div>
            <div class="portal-modal-body">
              <p>The modal can contain short supporting content and clear actions.</p>
            </div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
      ),
    ],
  },
  "overflow-menu": {
    key: "overflow-menu",
    title: "Overflow menu",
    tag: "sgds-overflow-menu",
    group: "navigation",
    summary:
      "An overflow menu is a UI element, often represented by three dots (⋮ or …), that opens a menu with additional actions or options.",
    purposeCards: [
      {
        title: "Tuck away secondary actions",
        description: "Overflow menus keep infrequently used or contextual actions out of the main UI, surfacing them only when the user asks.",
      },
      {
        title: "Avoid crowding the interface",
        description: "When a row, card, or list item has many possible actions, the overflow menu keeps the layout clean without hiding important primary actions.",
      },
      {
        title: "Consistent trigger pattern",
        description: "The three-dot icon is a well-established pattern — users know tapping it reveals more options without needing any instruction.",
      },
    ],
    anatomyMarkup: `<div style="min-height: 140px;"><sgds-overflow-menu open><sgds-dropdown-item class="portal-anatomy-overflow-item"><a href="#">Edit</a></sgds-dropdown-item><sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item><sgds-dropdown-item><a href="#">Delete</a></sgds-dropdown-item></sgds-overflow-menu></div>`,
    anatomyParts: [{ title: "Trigger button" }, { title: "Menu" }, { title: "Menu item" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-overflow-menu", targetX: "center", targetY: "top" },
      { number: 2, direction: "right", targetSelector: "sgds-overflow-menu", targetX: "right", targetY: "bottom", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "left", targetSelector: ".portal-anatomy-overflow-item", targetX: "left", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The overflow menu collects secondary actions behind a three-dot trigger to keep the interface clean.",
        controlLabel: "Overflow menu demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-overflow-menu>
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Delete</a></sgds-dropdown-item>
        </sgds-overflow-menu>`,
            description: "Renders a three-dot trigger that opens a contextual action list. Use in rows, cards, or compact layouts where displaying all actions inline would clutter the interface.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use overflow menus to collect less-prominent actions behind a compact trigger.",
        `<sgds-overflow-menu>
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Delete</a></sgds-dropdown-item>
        </sgds-overflow-menu>`,
      ),
    ],
  },
  pagination: {
    key: "pagination",
    title: "Pagination",
    tag: "sgds-pagination",
    group: "table",
    summary:
      "The Pagination component enables the user to select a specific page from a range of pages",
    purposeCards: [
      {
        title: "Navigate large datasets",
        description: "Pagination breaks a long list of results into discrete pages, so users don't have to load or scroll through everything at once.",
      },
      {
        title: "Show position in the set",
        description: "The current page is always highlighted and the total page count is visible — users know exactly where they are in a long result set.",
      },
      {
        title: "Control how much you see",
        description: "When paired with a page-size selector, pagination lets users decide how densely they want to browse — fewer items for focus, more for efficiency.",
      },
    ],
    anatomyParts: [{ title: "Page controls" }, { title: "Current page" }, { title: "Next and previous actions" }],
    anatomyCallouts: [
      { number: 1, direction: "bottom", targetSelector: "sgds-pagination", targetX: "center", targetY: "bottom" },
      { number: 2, direction: "top", targetSelector: "sgds-pagination", targetX: "center", targetY: "top" },
      { number: 3, direction: "right", targetSelector: "sgds-pagination", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Number",
        description: "Pagination breaks large datasets into discrete pages and gives users clear controls for navigating between them.",
        controlLabel: "Pagination demo",
        defaultValue: "number",
        options: [
          {
            label: "Number",
            value: "number",
            markup: `<sgds-pagination currentPage="2" dataLength="120" itemsPerPage="10" variant="number"></sgds-pagination>`,
            description: "Renders numbered page controls with previous and next buttons. Use at the bottom of a results list to let users navigate a large dataset without loading everything at once.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Number",
        "Use pagination when a collection spans multiple pages and users need clear page controls.",
        `<sgds-pagination currentPage="2" dataLength="120" itemsPerPage="10" variant="number"></sgds-pagination>`,
      ),
    ],
  },
  "progress-bar": {
    key: "progress-bar",
    title: "Progress bar",
    tag: "sgds-progress-bar",
    group: "feedback",
    summary:
      "Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.",
    purposeCards: [
      {
        title: "Show ongoing progress",
        description: "A progress bar communicates that work is happening and gives users a sense of how far along it is — reducing anxiety during longer operations.",
      },
      {
        title: "Make completeness visible",
        description: "When a process has a known endpoint — uploading a file, completing a profile — a progress bar shows how much is done versus how much remains.",
      },
      {
        title: "Prevent unnecessary interruptions",
        description: "When users can see progress, they're less likely to abort a task or re-trigger it by clicking again.",
      },
    ],
    anatomyParts: [{ title: "Track" }, { title: "Progress indicator" }, { title: "Label" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-progress-bar", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-progress-bar", targetX: "left", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: "sgds-progress-bar", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Label",
        description: "The progress bar shows how far a process has advanced with an optional descriptive label.",
        controlLabel: "Progress bar demo",
        defaultValue: "label",
        options: [
          {
            label: "Label",
            value: "label",
            markup: `<sgds-progress-bar value="64" label="Submission progress"></sgds-progress-bar>`,
            description: "Renders a horizontal progress bar with a labelled percentage. Use when a process has a known endpoint — such as a file upload or multi-step form — and users need to see how far along it is.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Label",
        "Use progress bars to indicate how far a task or workflow has progressed.",
        `<sgds-progress-bar value="64" label="Submission progress"></sgds-progress-bar>`,
      ),
    ],
  },
  "quantity-toggle": {
    key: "quantity-toggle",
    title: "Quantity toggle",
    tag: "sgds-quantity-toggle",
    group: "form",
    summary:
      "The quantity toggle component is used to increase or decrease an incremental venue,  best used when the user needs to enter or adjust the quantity of a selected item.",
    purposeCards: [
      {
        title: "Adjust counts without a keyboard",
        description: "The increment and decrement buttons let users change a quantity directly — no need to clear and retype a number.",
      },
      {
        title: "Prevent invalid values",
        description: "Min and max constraints are built in, so users can't accidentally enter a quantity outside the allowed range.",
      },
      {
        title: "Fits naturally in transactional flows",
        description: "Use quantity toggles in booking or order screens where users need to set a number as part of completing a task.",
      },
    ],
    anatomyParts: [{ title: "Decrement action" }, { title: "Input value" }, { title: "Increment action" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-quantity-toggle", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-quantity-toggle", targetX: "center", targetY: "top" },
      { number: 3, direction: "right", targetSelector: "sgds-quantity-toggle", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The quantity toggle provides increment and decrement controls for adjusting a numeric value within a defined range.",
        controlLabel: "Quantity toggle demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description: "Renders increment and decrement buttons around a numeric input. Use when users need to adjust a count in clear, bounded steps — such as a booking quantity or item count.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use quantity toggles when values should move in clear, bounded increments.",
        `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
      ),
    ],
  },
  radio: {
    key: "radio",
    title: "Radio",
    tag: "sgds-radio",
    group: "form",
    summary:
      "Radio allows the user to select one option from a set while seeing all available options.",
    purposeCards: [
      {
        title: "Mutually exclusive choices",
        description: "Radio buttons enforce a single selection — users pick one option from a defined set, and changing their selection automatically deselects the previous one.",
      },
      {
        title: "All options visible upfront",
        description: "Unlike a select, all radio options are shown at once — better when the number of choices is small and comparison matters.",
      },
      {
        title: "Clear confirmation of selection",
        description: "The selected state is visually distinct and persistent, so users always know what they've chosen before submitting.",
      },
    ],
    anatomyParts: [{ title: "Group" }, { title: "Radio control" }, { title: "Label" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-radio-group", targetX: "right", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "sgds-radio", targetX: "left", targetY: "center" },
      { number: 3, direction: "right", targetSelector: "sgds-radio", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Group",
        description: "Radio buttons are presented as a group where users can select exactly one option from a visible set.",
        controlLabel: "Radio demo",
        defaultValue: "group",
        options: [
          {
            label: "Group",
            value: "group",
            markup: `<sgds-radio-group label="Preferred contact method" value="email">
          <sgds-radio value="email">Email</sgds-radio>
          <sgds-radio value="sms">SMS</sgds-radio>
          <sgds-radio value="phone">Phone call</sgds-radio>
        </sgds-radio-group>`,
            description: "Renders a group of radio controls under a shared label. Use when users must choose exactly one option from a set of mutually exclusive choices that are all visible at once.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Group",
        "Use radio inputs when users must choose one option from a visible set.",
        `<sgds-radio-group label="Preferred contact method" value="email">
          <sgds-radio value="email">Email</sgds-radio>
          <sgds-radio value="sms">SMS</sgds-radio>
          <sgds-radio value="phone">Phone call</sgds-radio>
        </sgds-radio-group>`,
      ),
    ],
  },
  select: {
    key: "select",
    title: "Select",
    tag: "sgds-select",
    group: "form",
    summary:
      "Select is used to make one selection from a list through keyboard or mouse actions",
    purposeCards: [
      {
        title: "Choose from a defined list",
        description: "Select is the right choice when users must pick one option from a known set — especially when the list is too long to show as radio buttons.",
      },
      {
        title: "Compact for long lists",
        description: "A select dropdown collapses a list of options into a single row, keeping the form layout tight when there are many choices.",
      },
      {
        title: "Familiar and accessible",
        description: "Select uses the native browser control as a fallback, ensuring it works reliably across platforms and is fully operable by keyboard and assistive technologies.",
      },
    ],
    anatomyMarkup: `<div style="min-height: 180px;"><sgds-select class="portal-anatomy-select" placeholder="Choose a service" open><sgds-select-option class="portal-anatomy-select-option" value="passport">Passport</sgds-select-option><sgds-select-option value="licence">Licence</sgds-select-option><sgds-select-option value="benefits">Benefits</sgds-select-option></sgds-select></div>`,
    anatomyParts: [{ title: "Trigger field" }, { title: "Listbox" }, { title: "Option" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-anatomy-select", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-select", targetX: "right", targetY: "bottom", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "left", targetSelector: ".portal-anatomy-select-option", targetX: "left", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The select component presents a collapsed dropdown for choosing one value from a predefined list.",
        controlLabel: "Select demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-select placeholder="Choose a service">
          <sgds-select-option value="passport">Passport</sgds-select-option>
          <sgds-select-option value="licence">Licence</sgds-select-option>
          <sgds-select-option value="benefits">Benefits</sgds-select-option>
        </sgds-select>`,
            description: "Renders a dropdown field for choosing one option from a known list. Use when the list is too long for radio buttons but the user must pick from a constrained set.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use select when users need to choose one value from a known set of options.",
        `<sgds-select placeholder="Choose a service">
          <sgds-select-option value="passport">Passport</sgds-select-option>
          <sgds-select-option value="licence">Licence</sgds-select-option>
          <sgds-select-option value="benefits">Benefits</sgds-select-option>
        </sgds-select>`,
      ),
    ],
  },
  sidenav: {
    key: "sidenav",
    title: "Sidenav",
    tag: "sgds-sidenav",
    group: "navigation",
    summary:
      "The side navigation is used to display a list of links to move between pages within a related category.",
    purposeCards: [
      {
        title: "Navigate a section in depth",
        description: "Side navigation is designed for pages with many sub-sections — it keeps all the links in view so users can jump between them without hunting.",
      },
      {
        title: "Always visible while reading",
        description: "Unlike a header nav, a sidenav stays on screen as users scroll, so the navigation is always reachable without scrolling back to the top.",
      },
      {
        title: "Highlights current location",
        description: "The active state on the current page gives users a constant read of where they are within a section — useful on content-heavy sites.",
      },
    ],
    anatomyParts: [{ title: "Navigation container" }, { title: "Section item" }, { title: "Link" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-sidenav", targetX: "right", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "sgds-sidenav-item[active]", targetX: "left", targetY: "center" },
      { number: 3, direction: "bottom", targetSelector: "sgds-sidenav-link[active]", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The side navigation displays a vertical list of section links that stays visible as users scroll through content.",
        controlLabel: "Sidenav demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active>
              <span slot="title">Getting started</span>
              <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Installation</a></sgds-sidenav-link>
            </sgds-sidenav-item>
            <sgds-sidenav-item>
              <span slot="title">Components</span>
              <sgds-sidenav-link><a href="#">Accordion</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Button</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description: "Renders a vertical navigation panel with expandable sections and page links. Use for section-level navigation within documentation or multi-page services.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use sidenav to help users move between related pages within the same section.",
        `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active>
              <span slot="title">Getting started</span>
              <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Installation</a></sgds-sidenav-link>
            </sgds-sidenav-item>
            <sgds-sidenav-item>
              <span slot="title">Components</span>
              <sgds-sidenav-link><a href="#">Accordion</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Button</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
      ),
    ],
  },
  skeleton: {
    key: "skeleton",
    title: "Skeleton",
    tag: "sgds-skeleton",
    group: "feedback",
    summary:
      "A skeleton is a low-fidelity visual placeholder that represents the loading of interface elements",
    purposeCards: [
      {
        title: "Signal content is coming",
        description: "Skeleton screens replace blank states with a low-fidelity layout preview, so users see the page structure before the data arrives.",
      },
      {
        title: "Reduce perceived load time",
        description: "When users see a skeleton that matches the shape of the incoming content, the wait feels shorter and the transition feels smoother.",
      },
      {
        title: "Avoid layout shift",
        description: "Placeholders sized to the actual content prevent the page from jumping around when data loads in, keeping the experience stable.",
      },
    ],
    anatomyParts: [{ title: "Placeholder surface" }, { title: "Loading animation" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-skeleton", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-skeleton", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Rows",
        description: "Skeleton screens use animated placeholder blocks that match the shape of the incoming content.",
        controlLabel: "Skeleton demo",
        defaultValue: "rows",
        options: [
          {
            label: "Rows",
            value: "rows",
            markup: `<div class="portal-demo-stack">
          <sgds-skeleton width="100%" height="var(--sgds-dimension-80)" rows="3" sheen></sgds-skeleton>
        </div>`,
            description: "Renders animated placeholder rows. Use to preserve the page layout and reduce perceived loading time while data is being fetched.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Rows",
        "Use skeletons to preserve layout while real content is loading.",
        `<div class="portal-demo-stack">
          <sgds-skeleton width="100%" height="var(--sgds-dimension-80)" rows="3" sheen></sgds-skeleton>
        </div>`,
      ),
    ],
  },
  spinner: {
    key: "spinner",
    title: "Spinner",
    tag: "sgds-spinner",
    group: "feedback",
    summary: "Spinners notify the users that their request is being processed.",
    purposeCards: [
      {
        title: "Acknowledge the request",
        description: "A spinner immediately confirms to the user that their action was received and something is being processed — preventing repeat clicks.",
      },
      {
        title: "Use for indeterminate waits",
        description: "Spinners are best when you can't predict how long an operation will take — they signal ongoing activity without implying a specific duration.",
      },
      {
        title: "Keep it in context",
        description: "Position the spinner near the element that triggered the action so users can see that the specific thing they asked for is being handled.",
      },
    ],
    anatomyParts: [{ title: "Spinner glyph" }, { title: "Motion state" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-spinner", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-spinner", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The spinner is an animated circular indicator that signals an in-progress operation with an indeterminate duration.",
        controlLabel: "Spinner demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-spinner></sgds-spinner></div>`,
            description: "Renders an animated circular indicator. Use for indeterminate waits where the duration cannot be predicted — such as API calls, form submissions, or page transitions.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use spinners to indicate an in-progress action when the wait is brief and open-ended.",
        `<div class="portal-demo-row"><sgds-spinner></sgds-spinner></div>`,
      ),
    ],
  },
  stepper: {
    key: "stepper",
    title: "Stepper",
    tag: "sgds-stepper",
    group: "navigation",
    summary:
      "Steppers are used to inform users which step they are at in a form or a process",
    purposeCards: [
      {
        title: "Track multi-step progress",
        description: "Steppers show users how many stages a process has and which one they're currently on — reducing uncertainty in long workflows.",
      },
      {
        title: "Allow review and return",
        description: "Completed steps remain accessible, so users can navigate back to correct earlier inputs without losing later progress.",
      },
      {
        title: "Set expectations upfront",
        description: "Seeing all steps at the start lets users understand the scope of a form or process before they begin — reducing drop-off from unexpected length.",
      },
    ],
    anatomyParts: [{ title: "Step marker" }, { title: "Step label" }, { title: "Step content" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-stepper", targetX: "left", targetY: "top" },
      { number: 2, direction: "bottom", targetSelector: "sgds-stepper", targetX: "left", targetY: "bottom" },
      { number: 3, direction: "right", targetSelector: "sgds-stepper", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Horizontal",
        description: "The stepper shows users how many stages a process has and which one they are currently on.",
        controlLabel: "Stepper demo",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default"></sgds-stepper>
        </div>`,
            description: "Renders a horizontal sequence of step markers and labels. Use in multi-step forms or processes to show users how many stages there are and which one they are currently on.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Horizontal",
        "Use steppers to orient users in a multi-step process and show what comes next.",
        `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default"></sgds-stepper>
        </div>`,
      ),
    ],
  },
  subnav: {
    key: "subnav",
    title: "Subnav",
    tag: "sgds-subnav",
    group: "navigation",
    summary:
      "This component provides secondary navigation within a specific section or page. It typically appears below the main navigation and offers context-specific links or actions to help users explore related content.",
    purposeCards: [
      {
        title: "Navigate within a section",
        description: "Subnavigation provides a secondary layer of navigation for a specific section — letting users move between closely related pages without using the main nav.",
      },
      {
        title: "Shows what's available",
        description: "All sub-sections are visible at once, so users know what's in the current section and can move freely between them.",
      },
      {
        title: "Indicates the active page",
        description: "The active indicator keeps users oriented within the sub-section — they know where they are without having to check the URL.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.header,
      { title: "Navigation item" },
      defaultPartTitleMap.action,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-subnav", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "[slot='header']", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: "sgds-subnav-item[active]", targetX: "center", targetY: "bottom" },
      { number: 4, direction: "top", targetSelector: "[slot='actions']", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The subnav provides secondary navigation within a specific section, with a header label, page links, and an optional action slot.",
        controlLabel: "Subnav demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Applications</span>
            <sgds-button slot="actions" variant="ghost">Manage</sgds-button>
            <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">History</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">Settings</a></sgds-subnav-item>
          </sgds-subnav>
        </div>`,
            description: "Renders a secondary navigation bar within a section. Use below the main navigation when a section has multiple sub-pages that users need to move between.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use subnav for local, section-level navigation that complements the primary navigation.",
        `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Applications</span>
            <sgds-button slot="actions" variant="ghost">Manage</sgds-button>
            <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">History</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">Settings</a></sgds-subnav-item>
          </sgds-subnav>
        </div>`,
      ),
    ],
  },
  switch: {
    key: "switch",
    title: "Switch",
    tag: "sgds-switch",
    group: "form",
    summary:
      "Switch component is used to toggle on and off or yes or no action.",
    purposeCards: [
      {
        title: "Toggle a setting on or off",
        description: "Switches represent a binary state — enabled or disabled, on or off — and apply the change immediately without requiring a submit action.",
      },
      {
        title: "Immediate effect",
        description: "Unlike a checkbox in a form, a switch takes effect the moment it's toggled — use it when the action should happen right away.",
      },
      {
        title: "Visible state at all times",
        description: "The switch's visual position and colour make the current state obvious without needing to read a label.",
      },
    ],
    anatomyParts: [{ title: "Switch track" }, { title: "Thumb" }, { title: "Label" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-switch", targetX: "left", targetY: "top" },
      { number: 2, direction: "bottom", targetSelector: "sgds-switch", targetX: "left", targetY: "bottom" },
      { number: 3, direction: "right", targetSelector: "sgds-switch", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Checked state",
        description: "The switch is a toggle control that visually reflects its on or off state and applies the change immediately.",
        controlLabel: "Switch demo",
        defaultValue: "checked",
        options: [
          {
            label: "Checked state",
            value: "checked",
            markup: `<sgds-switch checked>Enable notifications</sgds-switch>`,
            description: "Renders a switch in its active state. Use when a setting should take effect immediately without a separate save action — such as enabling notifications or toggling a feature.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Checked state",
        "Use switches for immediate on-off settings that take effect in place.",
        `<sgds-switch checked>Enable notifications</sgds-switch>`,
      ),
    ],
  },
  "system-banner": {
    key: "system-banner",
    title: "System banner",
    tag: "sgds-system-banner",
    group: "feedback",
    summary:
      "The system banner component for displaying important messages to users at the application level.",
    purposeCards: [
      {
        title: "Broadcast site-wide messages",
        description: "System banners are designed for announcements that affect the entire service — planned maintenance, urgent alerts, or important policy updates.",
      },
      {
        title: "Persistent and hard to miss",
        description: "Unlike a toast, the system banner stays on screen until dismissed, ensuring important messages aren't lost when users navigate between pages.",
      },
      {
        title: "Supports multiple announcements",
        description: "When there's more than one message to convey, items cycle automatically — users can page through all announcements without the interface becoming crowded.",
      },
    ],
    anatomyMarkup: `<sgds-system-banner show dismissible fluid noClampAction>
      <sgds-system-banner-item>
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        Scheduled maintenance will take place tonight from 10pm to 11pm.
        <sgds-link slot="action" href="#">View details</sgds-link>
      </sgds-system-banner-item>
      <sgds-system-banner-item>
        <sgds-badge slot="badge" variant="accent">Update</sgds-badge>
        New SGDS guidance is now available for internal tools teams.
        <sgds-link slot="action" href="#">Read more</sgds-link>
      </sgds-system-banner-item>
    </sgds-system-banner>`,
    anatomyParts: [
      { title: "Banner container" },
      defaultPartTitleMap.default,
      defaultPartTitleMap.icon,
      defaultPartTitleMap.badge,
      defaultPartTitleMap.action,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-system-banner", targetX: "right", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "sgds-system-banner-item", targetX: "left", targetY: "center" },
      { number: 3, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top" },
      { number: 4, direction: "bottom", targetSelector: "sgds-badge[slot='badge']", targetX: "center", targetY: "bottom" },
      { number: 5, direction: "bottom", targetSelector: "sgds-system-banner", targetX: "right", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The system banner displays important site-wide messages that should remain visible until the user dismisses them.",
        controlLabel: "System banner demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
            Scheduled maintenance will take place tonight from 10pm to 11pm.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description: "Renders a persistent banner at the top of the page. Use for important messages that affect all users — such as maintenance notices, urgent alerts, or policy changes.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use system banners for important application-level messages that should remain prominent.",
        `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
            Scheduled maintenance will take place tonight from 10pm to 11pm.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
      ),
    ],
  },
  tab: {
    key: "tab",
    title: "Tab",
    tag: "sgds-tab-group",
    group: "navigation",
    summary: "Tabs are used within tab group to activate the tab panels",
    purposeCards: [
      {
        title: "Switch between related views",
        description: "Tabs let users navigate between content sections that share a context — different aspects of the same object, or different states of the same data.",
      },
      {
        title: "Keep all options reachable",
        description: "All tab labels are visible at once, so users can see what sections exist and switch between them without a back button.",
      },
      {
        title: "Preserve state between switches",
        description: "Switching tabs doesn't reload the page — users can move back and forth between panels without losing scroll position or entered data.",
      },
    ],
    anatomyParts: [{ title: "Tab list" }, { title: "Tab" }, { title: "Tab panel" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-tab-group", targetX: "center", targetY: "top" },
      { number: 2, direction: "top", targetSelector: "sgds-tab[active]", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "bottom", targetSelector: "sgds-tab-panel[name='overview']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description: "Tab variants control the visual style of the active tab indicator to suit different surface contexts.",
        controlLabel: "Tab variant options",
        defaultValue: "underlined",
        options: [
          {
            label: "Underlined",
            value: "underlined",
            markup: `<sgds-tab-group variant="underlined">
          <sgds-tab slot="nav" panel="overview" active>Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history">History</sgds-tab>
          <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="details">Details content</sgds-tab-panel>
          <sgds-tab-panel name="history">History content</sgds-tab-panel>
        </sgds-tab-group>`,
            description: "The underlined variant marks the active tab with a bottom border. Use as the default tab style in most page and panel contexts.",
          },
          {
            label: "Solid",
            value: "solid",
            markup: `<sgds-tab-group variant="solid">
          <sgds-tab slot="nav" panel="overview2" active>Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details2">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history2">History</sgds-tab>
          <sgds-tab-panel name="overview2">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="details2">Details content</sgds-tab-panel>
          <sgds-tab-panel name="history2">History content</sgds-tab-panel>
        </sgds-tab-group>`,
            description: "The solid variant marks the active tab with a filled pill. Use in dense or compact surfaces where a stronger indicator improves visual clarity.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Underlined",
        "Use tabs to switch between related views while keeping users in the same context.",
        `<sgds-tab-group variant="underlined">
          <sgds-tab slot="nav" panel="overview" active>Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history">History</sgds-tab>
          <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="details">Details content</sgds-tab-panel>
          <sgds-tab-panel name="history">History content</sgds-tab-panel>
        </sgds-tab-group>`,
      ),
    ],
  },
  table: {
    key: "table",
    title: "Table",
    tag: "sgds-table",
    group: "table",
    summary:
      "Tables are used to display collections of data in organised rows and columns.",
    purposeCards: [
      {
        title: "Compare data across rows",
        description: "Tables are built for information that has a consistent structure across many entries — users can scan columns to compare values at a glance.",
      },
      {
        title: "Handles dense information well",
        description: "When there are many attributes and many records, a table gives each one a fixed position — making even complex datasets navigable.",
      },
      {
        title: "Supports further interaction",
        description: "Tables can incorporate sorting, filtering, selection, and actions per row, turning a static display into an operational interface.",
      },
    ],
    anatomyParts: [{ title: "Table container" }, { title: "Header cells" }, { title: "Data cells" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-table", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-table", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: "sgds-table", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Structured data",
        description: "Tables present repeated values across rows and columns in a layout optimised for comparison and scanning.",
        controlLabel: "Table demo",
        defaultValue: "structured",
        options: [
          {
            label: "Structured data",
            value: "structured",
            markup: `<sgds-table
          rowHeader='["Name","Status","Owner"]'
          tableData='[["Alpha","Active","Team A"],["Beta","Pending","Team B"],["Gamma","Closed","Team C"]]'
          headerBackground
          tableBorder
        ></sgds-table>`,
            description: "Renders a bordered data table with column headers and data rows. Use when users need to compare multiple values across many records in a structured layout.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Structured data",
        "Use tables when users need to compare repeated values across rows and columns.",
        `<sgds-table
          rowHeader='["Name","Status","Owner"]'
          tableData='[["Alpha","Active","Team A"],["Beta","Pending","Team B"],["Gamma","Closed","Team C"]]'
          headerBackground
          tableBorder
        ></sgds-table>`,
      ),
    ],
  },
  "table-of-contents": {
    key: "table-of-contents",
    title: "Table of contents",
    tag: "sgds-table-of-contents",
    group: "table",
    summary:
      "Tables of contents provide a page overview and direct access to specific sections.",
    purposeCards: [
      {
        title: "Navigate long pages without scrolling",
        description: "A table of contents gives users direct links to every section on the page, so they can jump to what's relevant without reading from the top.",
      },
      {
        title: "Understand the page at a glance",
        description: "Seeing all the headings together helps users assess whether a page is relevant to them before they commit to reading it.",
      },
      {
        title: "Stays anchored while scrolling",
        description: "A sticky table of contents keeps navigation within reach as users move through content — especially useful on documentation or policy pages.",
      },
    ],
    anatomyParts: [{ title: "Container" }, { title: "Header" }, { title: "Contents list" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-table-of-contents", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "[slot='default']", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: "[slot='contents']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The table of contents renders a list of named anchor links for jumping to sections on the same page.",
        controlLabel: "Table of contents demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-table-of-contents>
            <span slot="default">On this page</span>
            <div slot="contents" class="portal-demo-stack-sm">
              <a href="#">Overview</a>
              <a href="#">Requirements</a>
              <a href="#">Examples</a>
            </div>
          </sgds-table-of-contents>
        </div>`,
            description: "Renders anchor links to all sections on the page. Use on long documentation or content pages where users need quick access to specific sections without scrolling.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use table of contents patterns to help users jump across longer pages.",
        `<div class="portal-demo-nav-sm">
          <sgds-table-of-contents>
            <span slot="default">On this page</span>
            <div slot="contents" class="portal-demo-stack-sm">
              <a href="#">Overview</a>
              <a href="#">Requirements</a>
              <a href="#">Examples</a>
            </div>
          </sgds-table-of-contents>
        </div>`,
      ),
    ],
  },
  textarea: {
    key: "textarea",
    title: "Textarea",
    tag: "sgds-textarea",
    group: "form",
    summary:
      "Text areas allow for the collection of input longer than a single line.",
    purposeCards: [
      {
        title: "Capture longer text input",
        description: "Textareas are designed for open-ended responses — feedback, notes, descriptions — where a single line isn't enough room.",
      },
      {
        title: "Resize to fit the content",
        description: "The textarea grows to accommodate longer entries, so users aren't constrained to a tiny box when they have more to say.",
      },
      {
        title: "Same validation patterns as input",
        description: "Error, warning, and success states follow the same conventions as the standard input, so validation feedback is consistent across the form.",
      },
    ],
    anatomyParts: [{ title: "Textarea field" }, { title: "Hint and feedback" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-textarea", targetX: "right", targetY: "center" },
      { number: 2, direction: "bottom", targetSelector: "sgds-textarea", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "The textarea is a multi-line text input for collecting longer freeform responses.",
        controlLabel: "Textarea demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-textarea rows="4" placeholder="Add supporting details"></sgds-textarea>`,
            description: "Renders a multi-line text input. Use when users need to enter more than a single line of text — such as feedback, notes, or detailed descriptions.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use textarea when users need more space than a single-line input provides.",
        `<sgds-textarea rows="4" placeholder="Add supporting details"></sgds-textarea>`,
      ),
    ],
  },
  "thumbnail-card": {
    key: "thumbnail-card",
    title: "Thumbnail card",
    tag: "sgds-thumbnail-card",
    group: "data display",
    summary:
      "Thumbnail cards can include headers, footers, rich content, and contextual background colours or images.",
    purposeCards: [
      {
        title: "Preview before clicking",
        description: "A thumbnail gives users a visual cue about the content behind the card — reducing the chance they click through to something irrelevant.",
      },
      {
        title: "Compact content listing",
        description: "Thumbnail cards pack image, title, and description into a tight format — useful in sidebars, grids, or anywhere dense content needs to be browseable.",
      },
      {
        title: "Consistent proportions across a grid",
        description: "Shared aspect ratios across thumbnail cards keep a grid visually stable, even when the underlying images vary in composition.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.thumbnail,
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-thumbnail-card", targetX: "right", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "[slot='thumbnail']", targetX: "left", targetY: "center" },
      { number: 3, direction: "top", targetSelector: "[slot='title']", targetX: "center", targetY: "top" },
      { number: 4, direction: "bottom", targetSelector: "[slot='description']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Default",
        description: "Thumbnail cards display a compact image beside the title and description for a dense, browseable layout.",
        controlLabel: "Thumbnail card demo",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-thumbnail-card class="portal-demo-card">
          <img
            slot="thumbnail"
            alt="Thumbnail"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80"
            style="width: var(--sgds-dimension-64); height: var(--sgds-dimension-64); object-fit: cover; border-radius: var(--sgds-border-radius-md);"
          />
          <span slot="title">Thumbnail card title</span>
          <span slot="description">Supporting description for the thumbnail card.</span>
        </sgds-thumbnail-card>`,
            description: "Renders a card with a compact thumbnail image beside the title and description. Use when a small visual preview needs to sit alongside brief copy in a dense grid or listing.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use thumbnail cards when compact visuals need to sit alongside concise supporting copy.",
        `<sgds-thumbnail-card class="portal-demo-card">
          <img
            slot="thumbnail"
            alt="Thumbnail"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80"
            style="width: var(--sgds-dimension-64); height: var(--sgds-dimension-64); object-fit: cover; border-radius: var(--sgds-border-radius-md);"
          />
          <span slot="title">Thumbnail card title</span>
          <span slot="description">Supporting description for the thumbnail card.</span>
        </sgds-thumbnail-card>`,
      ),
    ],
  },
  toast: {
    key: "toast",
    title: "Toast",
    tag: "sgds-toast",
    group: "feedback",
    summary: "Toast allows you to convey quick messaging notifications to the user.",
    purposeCards: [
      {
        title: "Confirm actions without interrupting",
        description: "Toasts appear briefly to acknowledge that something worked — a save, a deletion, a form submission — without stopping the user mid-task.",
      },
      {
        title: "Disappear automatically",
        description: "Toasts dismiss themselves after a few seconds, so users don't have to manually close them to continue working.",
      },
      {
        title: "Non-blocking by design",
        description: "Unlike a modal, a toast doesn't prevent interaction with the page — users can keep working while the notification is visible.",
      },
    ],
    anatomyParts: [{ title: "Toast surface" }, { title: "Title" }, { title: "Body content" }, { title: "Action" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-toast", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-toast", targetX: "center", targetY: "top" },
      { number: 3, direction: "left", targetSelector: "sgds-toast", targetX: "left", targetY: "center" },
      { number: 4, direction: "bottom", targetSelector: "[slot='action']", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description: "Toast variants use colour and context to communicate the nature of the notification.",
        controlLabel: "Toast variant options",
        defaultValue: "success",
        options: [
          {
            label: "Success",
            value: "success",
            markup: `<sgds-toast show title="Saved" variant="success">
          Changes have been saved successfully.
          <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
        </sgds-toast>`,
            description: "Use to confirm that an action completed successfully — such as saving, submitting, or deleting an item.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<sgds-toast show title="Check your input" variant="warning">
          Some fields may need your attention before proceeding.
        </sgds-toast>`,
            description: "Use to alert users to something that needs attention without blocking their current task.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<sgds-toast show title="Action failed" variant="danger">
          The request could not be completed. Please try again.
        </sgds-toast>`,
            description: "Use to communicate that an action has failed or that something requires immediate attention.",
          },
          {
            label: "Info",
            value: "info",
            markup: `<sgds-toast show title="Update available" variant="info">
          A new version of this service is available.
        </sgds-toast>`,
            description: "Use for neutral, informational updates that are not directly tied to a user action or status outcome.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use toast for lightweight, non-blocking confirmations and status updates.",
        `<sgds-toast show title="Saved" variant="success">
          Changes have been saved successfully.
          <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
        </sgds-toast>`,
      ),
    ],
  },
  tooltip: {
    key: "tooltip",
    title: "Tooltip",
    tag: "sgds-tooltip",
    group: "feedback",
    summary:
      "Tooltips display more information when users hover over, focus on, or interact with an element.",
    purposeCards: [
      {
        title: "Surface context without cluttering the UI",
        description: "Tooltips reveal supporting information — descriptions, keyboard shortcuts, clarifications — on demand, keeping the interface clean until users ask for more.",
      },
      {
        title: "Supplement, not replace, labels",
        description: "Tooltips are supplementary — they add detail to elements that already have a visible label or icon, not a substitute for accessible labelling.",
      },
      {
        title: "Triggered by attention, not action",
        description: "Because tooltips appear on hover or focus rather than a click, they feel ambient — users encounter them naturally as they explore the interface.",
      },
    ],
    anatomyMarkup: `<div style="padding: 80px 40px 20px;"><sgds-tooltip class="portal-anatomy-tooltip" content="More details about this action" open><sgds-button class="portal-anatomy-tooltip-target" variant="outline">Hover to view</sgds-button></sgds-tooltip></div>`,
    anatomyParts: [{ title: "Target element" }, { title: "Tooltip bubble" }, { title: "Supporting text" }],
    anatomyCallouts: [
      { number: 1, direction: "bottom", targetSelector: ".portal-anatomy-tooltip-target", targetX: "center", targetY: "bottom" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-tooltip", targetX: "center", targetY: "top" },
      { number: 3, direction: "right", targetSelector: ".portal-anatomy-tooltip", targetX: "right", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
    ],
    configurationDemos: [
      {
        title: "Hover and focus",
        description: "Tooltips appear on hover or keyboard focus to provide short supplementary context for interface elements.",
        controlLabel: "Tooltip demo",
        defaultValue: "hover-focus",
        options: [
          {
            label: "Hover and focus",
            value: "hover-focus",
            markup: `<sgds-tooltip content="More details about this action" trigger="hover focus">
          <sgds-button variant="outline">Hover to view</sgds-button>
        </sgds-tooltip>`,
            description: "Renders a tooltip that appears on hover or keyboard focus. Use to provide short supplementary explanations for elements that already have a visible label or icon.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Hover and focus",
        "Use tooltips for short supplementary explanations, not essential instructions.",
        `<sgds-tooltip content="More details about this action" trigger="hover focus">
          <sgds-button variant="outline">Hover to view</sgds-button>
        </sgds-tooltip>`,
      ),
    ],
  },
};

const buildUsageGuidance = (doc: ComponentDoc): UsageGuidance[] => [
  {
    title: "When to use",
    tone: "do",
    items: [
      doc.summary,
      `Use ${doc.title.toLowerCase()} when the built-in SGDS pattern fits the task and you want consistent states, spacing, and accessibility behaviour.`,
    ],
  },
  {
    title: "When not to use",
    tone: "dont",
    items: [
      "Do not use this component when a simpler SGDS pattern communicates the same information or action more clearly.",
      "Avoid recreating the same interaction with custom markup when the SGDS component already matches the need.",
    ],
  },
];

const hasAnatomyPart = (doc: ComponentDoc, matcher: RegExp) =>
  buildAnatomyParts(doc.anatomyParts).some((part) => matcher.test(part.title));

const buildUsageContentSections = (doc: ComponentDoc): UsageContentSection[] => {
  const sections: UsageContentSection[] = [];

  if (hasAnatomyPart(doc, /title|header/i)) {
    sections.push({
      title: "Title",
      items: [
        "Keep titles short and scannable so users can understand the component quickly.",
        "Use sentence case for readability and consistent hierarchy.",
      ],
    });
  } else if (hasAnatomyPart(doc, /label|tab|item|option|current page/i)) {
    sections.push({
      title: "Label",
      items: [
        "Use short, descriptive labels so users can scan and act confidently.",
        "Write labels in sentence case for readability and consistency.",
      ],
    });
  }

  if (hasAnatomyPart(doc, /description|content|body|panel|value|data|details|contents/i)) {
    sections.push({
      title: "Body",
      items: [
        "Keep supporting content concise and grouped by topic.",
        "Break longer content into paragraphs, lists, or sub-headings only when it improves readability.",
      ],
    });
  }

  if (hasAnatomyPart(doc, /icon|thumbnail|image/i)) {
    sections.push({
      title: "Icon",
      items: [
        "Icons and visuals should reinforce meaning, not duplicate text that is already clear.",
      ],
    });
  }

  if (hasAnatomyPart(doc, /action|button|trigger|toggler|footer|menu|close/i)) {
    sections.push({
      title: "Action",
      items: [
        "Keep actions concise and easy to recognise so they do not compete with the component’s primary content.",
      ],
    });
  }

  return sections;
};

const buildUsageBehaviours = (doc: ComponentDoc): UsageBehaviour[] =>
  doc.demos.length
    ? [
        {
          ...doc.demos[0],
          description: `Use the component’s built-in SGDS states and interaction pattern. ${doc.demos[0].description}`,
        },
      ]
    : [];

const buildResolvedUsage = (doc: ComponentDoc): UsageContent => {
  const usage = doc.usage ?? {};

  return {
    guidance: usage.guidance?.length ? usage.guidance : buildUsageGuidance(doc),
    content: usage.content?.length ? usage.content : buildUsageContentSections(doc),
    contentGuidelines: usage.contentGuidelines,
    behaviours: usage.behaviours?.length ? usage.behaviours : buildUsageBehaviours(doc),
    motion: usage.motion,
    bestPractices: usage.bestPractices,
  };
};

const buildAccessibilitySections = (doc: ComponentDoc): AccessibilitySection[] => {
  if (doc.accessibility && "sections" in doc.accessibility) {
    return doc.accessibility.sections ?? [];
  }

  const firstDemoMarkup = doc.demos[0]?.markup || `<${doc.tag}></${doc.tag}>`;

  return [
    {
      title: "Keyboard support",
      description: [
        `Use the built-in SGDS keyboard behaviour for ${doc.title.toLowerCase()} so focus order, activation, and screen-reader expectations stay consistent.`,
        "Ensure the surrounding page does not interrupt the default interaction pattern with custom key handling unless it is required.",
      ],
      items: [],
      markup: firstDemoMarkup,
    },
    {
      title: "Tab order",
      description: [],
      items: [
        "Move focus to the component.",
        "Navigate through the component’s interactive elements in order.",
        "Access any revealed or supporting content.",
        "Continue to the next interactive element on the page.",
      ],
      markup: firstDemoMarkup,
    },
  ];
};

const buildAccessibilityKeyboardRows = (doc: ComponentDoc): AccessibilityKeyboardRow[] => {
  if (doc.accessibility?.keyboardInteractions?.length) return doc.accessibility.keyboardInteractions;

  return [
    {
      key: "Tab",
      description: `Moves focus to the next ${doc.title.toLowerCase()} control or interactive element.`,
    },
    {
      key: "Shift + Tab",
      description: "Moves focus to the previous interactive element.",
    },
    {
      key: "Enter",
      description: "Activates the focused control or confirms the current action when supported.",
    },
    {
      key: "Space",
      description: "Activates the focused control when the component supports selection or toggling.",
    },
  ];
};

const buildResolvedAccessibility = (doc: ComponentDoc): AccessibilityContent => ({
  sections: buildAccessibilitySections(doc),
  keyboardInteractions: buildAccessibilityKeyboardRows(doc),
});

const buildResolvedUpdates = (doc: ComponentDoc): UpdatesContent => {
  if (doc.updates) return doc.updates;

  return {
    updates: {
      title: "Updates",
      columns: ["Date", "Version", "Description"],
      // Rows are populated at runtime by useComponentUpdates (GitHub Releases API)
      rows: [],
    },
    roadmap: {
      title: "Roadmap",
      columns: ["Planned item", "Status", "Target"],
      rows: [
        {
          "Planned item": `Future enhancements for ${doc.title.toLowerCase()}`,
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
      linkLabel: `Issues → sgds/components/${doc.key}`,
      href: "#",
    },
  };
};

export type ResolvedComponentDoc = ComponentDoc & {
  purposeCards: PurposeCardInput[];
  resolvedAnatomyParts: ReturnType<typeof buildAnatomyParts>;
  usage: UsageContent;
  accessibility: AccessibilityContent;
  updates: UpdatesContent;
  metadataStatus: ComponentMetadataStatus;
};

const figmaAvailableKeys = new Set([
  "accordion",
  "alert",
  "badge",
  "breadcrumb",
  "button",
  "card",
  "checkbox",
  "close-button",
  "combo-box",
  "datepicker",
  "description-list",
  "divider",
  "drawer",
  "dropdown",
  "file-upload",
  "footer",
  "input",
  "link",
  "mainnav",
  "modal",
  "select",
  "sidenav",
  "system-banner",
  "tab",
  "table",
  "table-of-contents",
  "textarea",
  "toast",
  "tooltip",
]);

const responsiveAvailableKeys = new Set<string>([]);

const storybookAvailableKeys = new Set(Object.keys(componentDocs));

const buildMetadataStatus = (key: string): ComponentMetadataStatus => ({
  figma: figmaAvailableKeys.has(key) ? "available" : "unavailable",
  responsive: responsiveAvailableKeys.has(key) ? "available" : "unavailable",
  storybook: storybookAvailableKeys.has(key) ? "available" : "unavailable",
});

export const getComponentDoc = (key: string): ResolvedComponentDoc | null => {
  const doc = componentDocs[key];
  if (!doc) return null;

  return {
    ...doc,
    purposeCards: doc.purposeCards || buildPurposeCards(doc.summary, doc.group),
    resolvedAnatomyParts: buildAnatomyParts(doc.anatomyParts),
    usage: buildResolvedUsage(doc),
    accessibility: buildResolvedAccessibility(doc),
    updates: buildResolvedUpdates(doc),
    metadataStatus: buildMetadataStatus(doc.key),
  };
};

export const componentDocSummaries = Object.fromEntries(
  Object.values(componentDocs).map((doc) => [doc.key, doc.summary]),
);

// ---------------------------------------------------------------------------
// Source-reference links (GitHub repo + Storybook)
// ---------------------------------------------------------------------------
//
// Every component page surfaces two canonical outbound links in the page
// header: the web component implementation on GitHub and the live Storybook
// example. URLs are derived from the doc key so individual components never
// need to hardcode them.
//
// Kebab-case doc keys map to PascalCase folder names in the web component
// repository (e.g. `combo-box` → `ComboBox`, `table-of-contents` →
// `TableOfContents`). Folder names verified against
// node_modules/@govtechsg/sgds-web-component/components/ on 2026-04-22.

const kebabToPascalCase = (key: string): string =>
  key
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");

export const getComponentGithubHref = (key: string): string =>
  `https://github.com/GovTechSG/sgds-web-component/tree/master/src/components/${kebabToPascalCase(key)}`;

export const getComponentStorybookHref = (key: string): string =>
  `https://webcomponent.designsystem.tech.gov.sg/?path=/docs/components-${key}--docs`;

export type ComponentHeaderLink = {
  label: string;
  href: string;
  path: string;
  iconSrc: string;
};

export const getComponentHeaderLinks = (key: string): ComponentHeaderLink[] => [
  {
    label: "GitHub",
    iconSrc: "/brands/github.svg",
    path: `components/${key}`,
    href: getComponentGithubHref(key),
  },
  {
    label: "Storybook",
    iconSrc: "/brands/storybook.svg",
    path: `components/${key}`,
    href: getComponentStorybookHref(key),
  },
];
