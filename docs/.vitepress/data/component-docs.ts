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
  category?: string;
  element: string;
  property: string;
  designToken: string;
  rawValue?: string;
};

export type MeasurementTokenGroup = {
  title: string;
  tokens: MeasurementTokenRow[];
};

export type NamedTokenRow = {
  category?: string;
  name: string;
  value: string;
  rawValue?: string;
};

export type NamedTokenGroup = {
  title: string;
  rows: NamedTokenRow[];
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

export type AlertPlaygroundContent = {
  variantLabel: string;
  outlinedLabel: string;
  dismissibleLabel: string;
  withIconLabel: string;
  titleToggleLabel: string;
  editTextLabel: string;
  editTitleLabel: string;
  editDescriptionLabel: string;
  slotLabel: string;
  defaultVariant: "info" | "success" | "danger" | "warning" | "neutral";
  defaultOutlined: boolean;
  defaultDismissible: boolean;
  defaultWithIcon: boolean;
  defaultShowTitle: boolean;
  defaultShowSlot: boolean;
  defaultTitle: string;
  defaultDescription: string;
  defaultLinkLabel: string;
  defaultSlotText: string;
};

export type AccessibilitySection = {
  title: string;
  description?: string[];
  items: string[];
  markup?: string;
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
  keyboardNotes?: string[];
};

type GeneratedAccessibilityProfile = {
  builtInDescription: string[];
  builtInItems: string[];
  authorDescription: string[];
  authorItems: string[];
  focusDescription: string[];
  focusItems: string[];
  keyboardInteractions?: AccessibilityKeyboardRow[];
};

type AccessibilityDemoMarkups = Partial<Record<"builtIn" | "author" | "focus", string>>;

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
  componentTokenGroups?: NamedTokenGroup[];
  semanticTokenGroups?: NamedTokenGroup[];
  globalTokens?: MeasurementTokenRow[];
  globalTokenGroups?: MeasurementTokenGroup[];
  alertPlayground?: AlertPlaygroundContent;
  configurationDemos?: ConfigurationDemo[];
  /**
   * Minimum height of the Playground preview column.
   * Defaults to "default" (376px) if omitted.
   *  - extra-compact: 180px — for very small components (breadcrumb, badge)
   *  - compact:       240px — for small components (link, icon-button)
   *  - default:       376px — baseline
   *  - tall:          480px — for large components (datepicker, modal, stepper)
   */
  playgroundSize?: "extra-compact" | "compact" | "default" | "tall";
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
        category: "Colour",
        element: "Colour",
        property: "hover-bg",
        designToken: "sgds/bg-translucent-subtle",
        rawValue: "oklch(from #0E0E0E l c h / 0.05)",
      },
      {
        mapKey: "title-color",
        category: "Colour",
        element: "",
        property: "title-color",
        designToken: "sgds/color-default",
        rawValue: "#1A1A1A",
      },
      {
        mapKey: "icon-color",
        category: "Colour",
        element: "",
        property: "icon-color",
        designToken: "sgds/color-subtle",
        rawValue: "#525252",
      },
      {
        mapKey: "gap",
        category: "Spacing",
        element: "Gap",
        property: "gap",
        designToken: "sgds/gap/md",
        rawValue: "16px",
      },
      {
        mapKey: "border-color",
        category: "Border",
        element: "Border",
        property: "border-color",
        designToken: "sgds/border-color-muted",
        rawValue: "#DFDFDF",
      },
      {
        mapKey: "border-width",
        category: "Border",
        element: "",
        property: "border-width",
        designToken: "sgds/border-width/1",
        rawValue: "1px",
      },
      {
        mapKey: "border-radius",
        category: "Border",
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
            category: "Spacing",
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
          },
          {
            category: "Spacing",
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
          },
          {
            category: "Spacing",
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
          },
          {
            category: "Spacing",
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
            category: "Spacing",
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/md",
            rawValue: "16px",
          },
          {
            category: "Spacing",
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/md",
            rawValue: "16px",
          },
          {
            category: "Spacing",
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
          },
          {
            category: "Spacing",
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
            category: "Spacing",
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
          },
          {
            category: "Spacing",
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
          },
          {
            category: "Spacing",
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
          },
          {
            category: "Spacing",
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
        category: "Background",
        element: "Background colour",
        property: "",
        designToken: "sgds/bg-transparent",
        rawValue: "Transparent",
      },
      {
        mapKey: "leading-icon-color",
        category: "Colour",
        element: "Icon colour",
        property: "",
        designToken: "sgds/color-default",
        rawValue: "#1A1A1A",
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
            "Use to group related information.",
            "Use to reduce scrolling when content does not need to be shown at once.",
            "Use when space is limited, such as on mobile or in side panels.",
          ],
        },
        {
          title: "When not to use",
          tone: "dont",
          items: [
            "Do not use when each section is short enough to show directly.",
            "Do not hide essential information inside an accordion.",
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
      sections: [
        {
          title: "Built-in accessibility",
          description: [
            "Each accordion trigger is a real button with expanded or collapsed state.",
            "The component applies built-in ARIA attributes to connect the trigger with its content region.",
          ],
          items: [
            "Use the built-in accordion item instead of recreating the trigger and panel behaviour with custom markup.",
            "The trigger exposes its expanded state and references the content it controls.",
            "The panel content is exposed as a region, so use accordions for grouped sections rather than for every small detail on a page.",
          ],
        },
        {
          title: "Labels and content",
          description: [
            "The header slot content becomes the visible label for the accordion trigger.",
            "Write header text that is clear enough to stand on its own when announced as a button.",
          ],
          items: [
            "Use short, specific titles that describe the content inside each panel.",
            "If the accordion sits under a page heading structure, apply heading markup around it consistently in the surrounding page content.",
          ],
        },
        {
          title: "Focus and interaction",
          description: [
            "Interaction stays on a real button, with keyboard movement into interactive content inside an expanded panel.",
          ],
          items: [
            "After opening a panel, users should be able to continue tabbing into links, buttons, and form fields in a logical order.",
            "Do not place essential actions in collapsed content if users need to reach them immediately.",
          ],
        },
      ],
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
        {
          key: "↓ Down or → Right",
          description: "Opens the focused accordion header.",
        },
        {
          key: "↑ Up or ← Left",
          description: "Closes the focused accordion header.",
        },
      ],
    },
    accessibilityNotes: [
      "Use the built-in SGDS accordion item so the trigger remains a button with state and keyboard support.",
      "Write clear header labels and keep interactive content inside expanded panels reachable by keyboard.",
      "Enter, Space, and arrow keys open and close accordion items.",
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
              <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to provide general context or neutral information, such as announcements or guidance that don't indicate a status outcome.",
          },
          {
            label: "Success",
            value: "success",
            markup: `<sgds-alert show variant="success" title="Success alert">
              <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
              <div>Your application has been submitted successfully. <sgds-alert-link href="#">View confirmation</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to confirm that an action or process has completed successfully. Reassures users that their input was accepted.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<sgds-alert show variant="danger" title="Danger alert">
              <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
              <div>We could not save your changes because the session expired. <sgds-alert-link href="#">Sign in again</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to communicate errors or critical failures that require immediate attention. Reserve for situations that could block the user.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<sgds-alert show variant="warning" title="Warning alert">
              <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
              <div>Some required documents are missing from your application. <sgds-alert-link href="#">Check requirements</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use to flag potential issues that may need attention. Cautions the user without blocking them from proceeding.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<sgds-alert show variant="neutral" title="Neutral alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>This service will save your progress automatically while you complete the form. <sgds-alert-link href="#">Learn more</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use when the message carries no particular status or urgency, such as simple notices or reminders.",
          },
        ],
      },
      {
        title: "Style",
        description: "The alert supports two styles—filled and outlined.",
        controlLabel: "Alert style options",
        defaultValue: "filled",
        options: [
          {
            label: "Filled",
            value: "filled",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="info" title="Info alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="success" title="Success alert">
                <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
                <div>Your application has been submitted successfully. <sgds-alert-link href="#">View confirmation</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="danger" title="Danger alert">
                <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
                <div>We could not save your changes because the session expired. <sgds-alert-link href="#">Sign in again</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="warning" title="Warning alert">
                <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
                <div>Some required documents are missing from your application. <sgds-alert-link href="#">Check requirements</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="neutral" title="Neutral alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>This service will save your progress automatically while you complete the form. <sgds-alert-link href="#">Learn more</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description: "Use filled alerts when the message needs stronger visual emphasis, such as higher-priority updates or messages users should notice immediately.",
          },
          {
            label: "Outlined",
            value: "outlined",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="info" outlined title="Info alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="success" outlined title="Success alert">
                <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
                <div>Your application has been submitted successfully. <sgds-alert-link href="#">View confirmation</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="danger" outlined title="Danger alert">
                <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
                <div>We could not save your changes because the session expired. <sgds-alert-link href="#">Sign in again</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="warning" outlined title="Warning alert">
                <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
                <div>Some required documents are missing from your application. <sgds-alert-link href="#">Check requirements</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="neutral" outlined title="Neutral alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>This service will save your progress automatically while you complete the form. <sgds-alert-link href="#">Learn more</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description: "Use outlined alerts for messages that should stay visible with less visual weight. They work well as the default style when the message does not need to dominate the page.",
          },
        ],
      },
      {
        title: "Dismissible",
        description: "The alert can be manually dismissed by the user.",
        controlLabel: "Alert dismissible options",
        defaultValue: "non-dismissible",
        options: [
          {
            label: "Non-dismissible",
            value: "non-dismissible",
            markup: `<sgds-alert show variant="info" title="A non-dismissible alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>This notice remains visible because it affects how users complete the current task. <sgds-alert-link href="#">Read notice</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use for persistent messages that must remain visible, such as system statuses or warnings the user needs to act on.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<sgds-alert show dismissible variant="info" title="A dismissible alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>You can dismiss this message after reading the update. <sgds-alert-link href="#">View update</sgds-alert-link></div>
            </sgds-alert>`,
            description: "Use for non-critical messages the user can close after reading, such as informational banners or one-time notices.",
          },
        ],
      },
      {
        title: "With icon",
        description: "Alerts may include an icon to reinforce meaning. The icon should support, not replace, the message text.",
        controlLabel: "Alert icon options",
        defaultValue: "no-icon",
        options: [
          {
            label: "No icon",
            value: "no-icon",
            markup: `<sgds-alert show variant="info" title="Application received">
              <div>We have received your application and will send updates to your registered email address.</div>
            </sgds-alert>`,
            description: "Use when the message is self-explanatory or when a minimal, text-only appearance is preferred.",
          },
          {
            label: "With icon",
            value: "with-icon",
            markup: `<sgds-alert show variant="info" title="Application received">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>We have received your application and will send updates to your registered email address.</div>
            </sgds-alert>`,
            description: "Use to reinforce the alert's meaning with a recognisable visual cue. The icon should support, not replace, the message text.",
          },
        ],
      },
      {
        title: "Title",
        description: "Alerts can include a title to summarise the message and provide hierarchy, especially for longer or more complex content.",
        controlLabel: "Alert title options",
        defaultValue: "no-title",
        options: [
          {
            label: "No title",
            value: "no-title",
            markup: `<sgds-alert show variant="info">
              <div>Your draft has been saved and you can continue editing it before submission.</div>
            </sgds-alert>`,
            description: "Use for short, single-line messages that are easy to scan without an additional heading.",
          },
          {
            label: "With title",
            value: "with-title",
            markup: `<sgds-alert show variant="info" title="Draft saved">
              <div>Your draft has been saved and you can continue editing it before submission.</div>
            </sgds-alert>`,
            description: "Use when the alert contains longer or more detailed content that benefits from a clear summary heading.",
          },
        ],
      },
      {
        title: "Slot",
        description: "The default slot can contain supplementary content such as links or supporting actions, as long as the message remains clear and easy to scan.",
        controlLabel: "Alert slot options",
        defaultValue: "no-slot",
        options: [
          {
            label: "No slot",
            value: "no-slot",
            markup: `<sgds-alert show dismissible variant="info" outlined title="Application saved">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Your progress has been saved. You can return to this draft before the submission deadline.</div>
            </sgds-alert>`,
            description: "Use when the alert message is complete without extra supporting content.",
          },
          {
            label: "Slot",
            value: "slot",
            markup: `<sgds-alert show dismissible variant="info" outlined title="Application saved">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Your progress has been saved. You can return to this draft before the submission deadline.</div>
              <div class="portal-slot-example sgds:w-full">
                <sgds-icon name="arrow-repeat" size="sm"></sgds-icon>
                <span>Content slot</span>
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
        "The alert supports two styles—filled and outlined.",
        `<div class="portal-demo-stack">
          <sgds-alert show variant="info" title="Info alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="success" title="Success alert">
            <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
            <div>Your application has been submitted successfully. <sgds-alert-link href="#">View confirmation</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="danger" title="Danger alert">
            <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
            <div>We could not save your changes because the session expired. <sgds-alert-link href="#">Sign in again</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="warning" title="Warning alert">
            <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
            <div>Some required documents are missing from your application. <sgds-alert-link href="#">Check requirements</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="neutral" title="Neutral alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>This service will save your progress automatically while you complete the form. <sgds-alert-link href="#">Learn more</sgds-alert-link></div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "Dismissible",
        "The alert can be manually dismissed by the user.",
        `<div class="portal-demo-stack">
          <sgds-alert show dismissible variant="info" title="A dismissible alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>You can dismiss this message after reading the update. <sgds-alert-link href="#">View update</sgds-alert-link></div>
          </sgds-alert>
          <sgds-alert show variant="info" title="A non-dismissible alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>This notice remains visible because it affects how users complete the current task. <sgds-alert-link href="#">Read notice</sgds-alert-link></div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "With icon",
        "Alerts may include an icon to reinforce meaning. The icon should support, not replace, the message text.",
        `<div class="portal-demo-stack">
          <sgds-alert show variant="info" title="Application received">
            <div>We have received your application and will send updates to your registered email address.</div>
          </sgds-alert>
          <sgds-alert show variant="info" title="Application received">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>We have received your application and will send updates to your registered email address.</div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "Title",
        "Alerts can include a title to summarise the message and provide hierarchy, especially for longer or more complex content.",
        `<div class="portal-demo-stack">
          <sgds-alert show variant="info">
            <div>Your draft has been saved and you can continue editing it before submission.</div>
          </sgds-alert>
          <sgds-alert show variant="info" title="Draft saved">
            <div>Your draft has been saved and you can continue editing it before submission.</div>
          </sgds-alert>
        </div>`,
      ),
      demo(
        "Slot",
        "The default slot can contain supplementary content such as links or supporting actions, as long as the message remains clear and easy to scan.",
        `<sgds-alert show dismissible variant="info" outlined title="Application saved">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          <div>Your progress has been saved. You can return to this draft before the submission deadline.</div>
          <div class="portal-slot-example sgds:w-full">
            <sgds-icon name="arrow-repeat" size="sm"></sgds-icon>
            <span>Content slot</span>
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
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-alert show dismissible variant="success" outlined title="Application submitted">
          <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
          <div>Your application has been submitted successfully and a confirmation email has been sent to you.</div>
        </sgds-alert>`,
      },
    ],
    componentTokenGroups: [
      {
        title: "Components",
        rows: [
          { name: "padding-x", value: "sgds/padding/lg" },
          { name: "padding-y", value: "sgds/padding/lg" },
          { name: "content-padding-right", value: "sgds/padding/2-xl" },
          { name: "gap", value: "sgds/gap/sm" },
          { name: "title-gap", value: "sgds/gap/2-xs" },
          { name: "content-gap", value: "sgds/gap/md" },
          { name: "border-width", value: "sgds/border-width/1" },
          { name: "border-radius", value: "sgds/border-radius/md" },
        ],
      },
    ],
    semanticTokenGroups: [
      {
        title: "sgds / alert / info",
        rows: [
          { name: "bg-emphasis", value: "sgds/primary/surface-default" },
          { name: "bg-muted", value: "sgds/primary/surface-muted" },
          { name: "border-color", value: "sgds/primary/border-color-muted" },
        ],
      },
      {
        title: "sgds / alert / success",
        rows: [
          { name: "bg-emphasis", value: "sgds/success/surface-default" },
          { name: "bg-muted", value: "sgds/success/surface-muted" },
          { name: "border-color", value: "sgds/success/border-color-muted" },
        ],
      },
      {
        title: "sgds / alert / danger",
        rows: [
          { name: "bg-emphasis", value: "sgds/danger/surface-default" },
          { name: "bg-muted", value: "sgds/danger/surface-muted" },
          { name: "border-color", value: "sgds/danger/border-color-muted" },
        ],
      },
      {
        title: "sgds / alert / warning",
        rows: [
          { name: "bg-emphasis", value: "sgds/warning/surface-default" },
          { name: "bg-muted", value: "sgds/warning/surface-muted" },
          { name: "border-color", value: "sgds/warning/border-color-muted" },
        ],
      },
      {
        title: "sgds / alert / neutral",
        rows: [
          { name: "bg-emphasis", value: "sgds/neutral/surface-emphasis" },
          { name: "bg-muted", value: "sgds/neutral/surface-muted" },
          { name: "border-color", value: "sgds/neutral/border-color-muted" },
        ],
      },
    ],
    alertPlayground: {
      variantLabel: "Variant",
      outlinedLabel: "Outlined",
      dismissibleLabel: "Dismissible",
      withIconLabel: "With icon",
      titleToggleLabel: "Title",
      editTextLabel: "↳ Edit text",
      editTitleLabel: "Edit title",
      editDescriptionLabel: "Edit description",
      slotLabel: "◆ Slot",
      defaultVariant: "info",
      defaultOutlined: false,
      defaultDismissible: true,
      defaultWithIcon: true,
      defaultShowTitle: true,
      defaultShowSlot: true,
      defaultTitle: "Title",
      defaultDescription: "Description with inline link",
      defaultLinkLabel: "Read details",
      defaultSlotText: "Content slot",
    },
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
        defaultValue: "neutral",
        options: [
          {
            label: "Neutral",
            value: "neutral",
            markup: `<div class="portal-demo-row"><sgds-badge variant="neutral">Neutral</sgds-badge></div>`,
            description: "The default tone for generic labels with no particular status weight. Use when the badge is purely informational.",
          },
          {
            label: "Primary",
            value: "primary",
            markup: `<div class="portal-demo-row"><sgds-badge variant="primary">Primary</sgds-badge></div>`,
            description: "Uses the brand tone. Use for labels that should align with the primary identity of the interface.",
          },
          {
            label: "Accent",
            value: "accent",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent">Accent</sgds-badge></div>`,
            description: "An alternative emphasis tone. Use to distinguish a small group of labels without relying on a status colour.",
          },
          {
            label: "Success",
            value: "success",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success">Success</sgds-badge></div>`,
            description: "Use to signal a positive state such as completed, approved, or active.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<div class="portal-demo-row"><sgds-badge variant="warning">Warning</sgds-badge></div>`,
            description: "Use to flag items needing attention without blocking the user — for example, pending review or nearing a threshold.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<div class="portal-demo-row"><sgds-badge variant="danger">Danger</sgds-badge></div>`,
            description: "Use to communicate an error, failure, or critical state that should draw the user's attention immediately.",
          },
          {
            label: "Cyan",
            value: "cyan",
            markup: `<div class="portal-demo-row"><sgds-badge variant="cyan">Cyan</sgds-badge></div>`,
            description: "A supplementary category tone. Use to differentiate labels when a status colour is not appropriate.",
          },
          {
            label: "Purple",
            value: "purple",
            markup: `<div class="portal-demo-row"><sgds-badge variant="purple">Purple</sgds-badge></div>`,
            description: "Another supplementary category tone. Pair with cyan to separate two or more non-status categories.",
          },
          {
            label: "White",
            value: "white",
            markup: `<div class="portal-demo-row portal-demo-row-inverse"><sgds-badge variant="white">White</sgds-badge></div>`,
            description: "Use on dark or coloured backgrounds where the other variants would lack contrast.",
          },
        ],
      },
      {
        title: "Outlined",
        description: "Controls whether the badge uses a filled or outlined style. Outlined gives the badge a lighter visual presence.",
        controlLabel: "Badge outlined options",
        defaultValue: "filled",
        options: [
          {
            label: "Filled",
            value: "filled",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent">Filled</sgds-badge></div>`,
            description: "The default filled style uses a solid background. Use when the badge needs to read strongly at a glance.",
          },
          {
            label: "Outlined",
            value: "outlined",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent" outlined>Outlined</sgds-badge></div>`,
            description: "The outlined style uses a border with a subtle fill. Use when badges should feel quieter alongside dense content.",
          },
        ],
      },
      {
        title: "Dismissible",
        description: "Add a close button when the user should be able to remove the badge — for example, active filters or removable tags.",
        controlLabel: "Badge dismissible options",
        defaultValue: "static",
        options: [
          {
            label: "Static",
            value: "static",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent">Filter</sgds-badge></div>`,
            description: "Use when the badge is informational only and should not be removed by the user.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent" dismissible show>Filter</sgds-badge></div>`,
            description: "Renders a close button. Use for active filters, selected tags, or any context where the user should be able to remove the label.",
          },
        ],
      },
      {
        title: "Icon",
        description: "Pair the badge with an icon when a visual cue helps users recognise meaning faster than the text alone.",
        controlLabel: "Badge icon options",
        defaultValue: "without-icon",
        options: [
          {
            label: "Without icon",
            value: "without-icon",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success">Active</sgds-badge></div>`,
            description: "Use when the text label is enough to convey the badge's meaning.",
          },
          {
            label: "With icon",
            value: "with-icon",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success"><sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>Active</sgds-badge></div>`,
            description: "Add an icon through the icon slot. Use small, recognisable icons that reinforce the badge's meaning without competing with the label.",
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
    playgroundSize: "extra-compact",
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
        title: "Number of links",
        description: "Control how many breadcrumb items are shown. When 5 or more items are present, the middle items automatically collapse into an overflow menu placed as the second link.",
        controlLabel: "Breadcrumb number of links",
        defaultValue: "3",
        options: [
          {
            label: "1",
            value: "1",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description: "A single-item breadcrumb only marks the current page.",
          },
          {
            label: "2",
            value: "2",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description: "Use two items when the current page sits one level below the root.",
          },
          {
            label: "3",
            value: "3",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description: "Three items show a typical nested path from the root to the current page.",
          },
          {
            label: "4",
            value: "4",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Fees</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description: "Four items are the maximum shown in full before the overflow menu kicks in.",
          },
          {
            label: "5",
            value: "5",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Fees</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Refunds</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description: "At five items, the breadcrumb automatically collapses the middle items into an overflow menu placed in the second position.",
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
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-button class="portal-structure-button">
          <sgds-icon slot="leftIcon" name="house"></sgds-icon>
          Button label
          <sgds-icon slot="rightIcon" name="chevron-right"></sgds-icon>
        </sgds-button>`,
      },
    ],
    measurementTokens: [
      { mapKey: "background", category: "Colour", element: "Colour", property: "background", designToken: "sgds/primary/surface-default", rawValue: "#6B4FEB" },
      { mapKey: "hover-bg", category: "Colour", element: "", property: "hover-bg", designToken: "sgds/primary/surface-emphasis", rawValue: "#523ABC" },
      { mapKey: "text-color", category: "Colour", element: "", property: "text-color", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3" },
      { mapKey: "border-radius", category: "Border", element: "Border", property: "border-radius", designToken: "sgds/border-radius/md", rawValue: "8px" },
      { mapKey: "border-width", category: "Border", element: "", property: "border-width", designToken: "sgds/border-width/1", rawValue: "1px" },
      { mapKey: "padding-x", category: "Spacing", element: "Spacing", property: "padding-x", designToken: "sgds/padding/lg", rawValue: "20px" },
      { mapKey: "gap", category: "Spacing", element: "", property: "gap", designToken: "sgds/gap/2-xs", rawValue: "4px" },
      { mapKey: "height", category: "Size", element: "Size", property: "height", designToken: "sgds/dimension/48", rawValue: "48px" },
      { mapKey: "min-width", category: "Size", element: "", property: "min-width", designToken: "sgds/dimension/96", rawValue: "96px" },
      { mapKey: "font-size", category: "Typography", element: "Typography", property: "font-size", designToken: "sgds/font-size/16", rawValue: "16px" },
      { mapKey: "line-height", category: "Typography", element: "", property: "line-height", designToken: "sgds/line-height/24", rawValue: "24px" },
    ],
    globalTokens: [
      { mapKey: "leading-icon-color", category: "Colour", element: "Leading icon", property: "", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3" },
      { mapKey: "trailing-icon-color", category: "Colour", element: "Trailing icon", property: "", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3" },
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
      { mapKey: "background", category: "Colour", element: "Colour", property: "background", designToken: "sgds/surface-default", rawValue: "#FFFFFF" },
      { mapKey: "title-color", category: "Colour", element: "", property: "title-color", designToken: "sgds/body-color-default", rawValue: "#1A1A1A" },
      { mapKey: "description-color", category: "Colour", element: "", property: "description-color", designToken: "sgds/color-subtle", rawValue: "#525252" },
      { mapKey: "border-color", category: "Border", element: "Border", property: "border-color", designToken: "sgds/border-color-muted", rawValue: "#DFDFDF" },
      { mapKey: "border-width", category: "Border", element: "", property: "border-width", designToken: "sgds/border-width/1", rawValue: "1px" },
      { mapKey: "border-radius", category: "Border", element: "", property: "border-radius", designToken: "sgds/border-radius/md", rawValue: "8px" },
      { mapKey: "padding-x", category: "Spacing", element: "Spacing", property: "padding-x", designToken: "sgds/padding/xl", rawValue: "24px" },
      { mapKey: "padding-y", category: "Spacing", element: "", property: "padding-y", designToken: "sgds/padding/xl", rawValue: "24px" },
      { mapKey: "gap", category: "Spacing", element: "", property: "gap", designToken: "sgds/gap/lg", rawValue: "20px" },
      { mapKey: "title-gap", category: "Spacing", element: "", property: "title-gap", designToken: "sgds/gap/xs", rawValue: "8px" },
      { mapKey: "subtitle-gap", category: "Spacing", element: "", property: "subtitle-gap", designToken: "sgds/gap/2-xs", rawValue: "4px" },
      { mapKey: "slot-gap", category: "Spacing", element: "", property: "slot-gap", designToken: "sgds/gap/sm", rawValue: "12px" },
    ],
    globalTokens: [
      { mapKey: "title-color", category: "Colour", element: "Card title", property: "", designToken: "sgds/body-color-default", rawValue: "#1A1A1A" },
      { mapKey: "subtitle-color", category: "Colour", element: "Subtitle", property: "", designToken: "sgds/color-subtle", rawValue: "#525252" },
      { mapKey: "description-color", category: "Colour", element: "Description", property: "", designToken: "sgds/color-subtle", rawValue: "#525252" },
      { mapKey: "secondary-text-color", category: "Colour", element: "Secondary text", property: "", designToken: "sgds/body-color-default", rawValue: "#1A1A1A" },
      { mapKey: "link-color", category: "Colour", element: "Link", property: "", designToken: "sgds/link-color-default", rawValue: "#0269D0" },
      { mapKey: "link-color-emphasis", category: "Colour", element: "Link on hover", property: "", designToken: "sgds/link-color-emphasis", rawValue: "#0151A0" },
      { mapKey: "tinted-bg", category: "Background", element: "Tinted", property: "", designToken: "sgds/bg-translucent-subtle", rawValue: "oklch(from #0E0E0E l c h / 0.05)" },
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

type GeneratedUsagePattern = {
  use: string[];
  avoid: string[];
  doTitle: string;
  doDescription: string;
  dontTitle: string;
  dontDescription: string;
};

const defaultGeneratedUsagePatterns: Record<ComponentGroup, GeneratedUsagePattern> = {
  "data display": {
    use: [
      "Use this component to group related information so users can scan it in smaller chunks.",
      "Use it when the built-in SGDS structure helps you keep content consistent across the page.",
    ],
    avoid: [
      "Do not use this component when simpler page content or a plain heading would communicate the same information more clearly.",
      "Do not overload it with competing content, controls, or visual treatments that weaken hierarchy.",
    ],
    doTitle: "Keep the content focused",
    doDescription: "Use one clear content pattern so users can scan and understand the component quickly.",
    dontTitle: "Do not overload the component",
    dontDescription: "Too many repeated instances or competing content blocks make the page harder to scan.",
  },
  feedback: {
    use: [
      "Use this component to communicate a clear system state, status, or next step at the right moment.",
      "Use it when users need immediate feedback that is tied to a task, outcome, or page context.",
    ],
    avoid: [
      "Do not use this component for routine body content that should stay in the normal page flow.",
      "Do not stack multiple messages of the same priority when one clear message is enough.",
    ],
    doTitle: "Keep the message specific",
    doDescription: "Use a clear message with one purpose so users can act or move on quickly.",
    dontTitle: "Do not stack competing messages",
    dontDescription: "Multiple repeated messages compete for attention and make it harder to see what matters.",
  },
  form: {
    use: [
      "Use this component to collect or change a specific piece of information in a predictable way.",
      "Use it when the SGDS control matches the type of response users need to provide.",
    ],
    avoid: [
      "Do not use this component when another SGDS control would reduce effort or make the choice clearer.",
      "Do not ask for more information, options, or steps than users need at that point in the task.",
    ],
    doTitle: "Keep the input clear",
    doDescription: "Use clear labels, predictable values, and a single obvious action for the control.",
    dontTitle: "Do not increase input effort",
    dontDescription: "Too many repeated controls or unclear prompts make form completion slower and less confident.",
  },
  labels: {
    use: [
      "Use this component as supporting text or visual context that strengthens nearby content.",
      "Use it when a short label or reference helps users interpret the surrounding interface more quickly.",
    ],
    avoid: [
      "Do not rely on this component as the only explanation for an important action, state, or instruction.",
      "Do not use long or decorative content when a short, direct label is enough.",
    ],
    doTitle: "Keep the label concise",
    doDescription: "Short labels are easier to scan and support the main content without competing with it.",
    dontTitle: "Do not make the label carry everything",
    dontDescription: "When the label becomes too long or too vague, it stops helping users orient themselves.",
  },
  layout: {
    use: [
      "Use this component to support page structure, separation, or containment without distracting from the content.",
      "Use it when the SGDS layout treatment helps users understand how sections relate to one another.",
    ],
    avoid: [
      "Do not use this component when spacing alone would create the same structure more cleanly.",
      "Do not repeat the pattern so often that it starts to add visual noise instead of structure.",
    ],
    doTitle: "Use it to support structure",
    doDescription: "A light layout treatment should help users read the page, not compete with the content.",
    dontTitle: "Do not add visual noise",
    dontDescription: "Repeated layout elements weaken hierarchy when spacing or simpler structure would do the job.",
  },
  table: {
    use: [
      "Use this component when users need to compare structured results or move through a long list in a predictable way.",
      "Use it when the component reduces effort for scanning, comparison, or navigation across related records.",
    ],
    avoid: [
      "Do not use this component when the content is short enough to show directly without extra controls.",
      "Do not split simple information into more pages, rows, or controls than users need.",
    ],
    doTitle: "Match the structure to the task",
    doDescription: "Use structured navigation or comparison only when it helps users move through results with less effort.",
    dontTitle: "Do not add structure for its own sake",
    dontDescription: "Extra pagination or tabular structure slows users down when the content could stay simple.",
  },
  navigation: {
    use: [
      "Use this component to help users understand where they are and move confidently to the next place.",
      "Use it when the navigation pattern matches the scale of the journey and the relationship between destinations.",
    ],
    avoid: [
      "Do not use this component when the page does not need another layer of navigation.",
      "Do not add vague, repetitive, or competing labels that make the path harder to understand.",
    ],
    doTitle: "Keep destinations clear",
    doDescription: "Short, specific labels and a clear current state help users move through the interface with confidence.",
    dontTitle: "Do not compete with the page structure",
    dontDescription: "Repeated or unnecessary navigation patterns make it harder to understand where to go next.",
  },
};

const generatedUsagePatternOverrides: Partial<Record<string, GeneratedUsagePattern>> = {
  accordion: {
    use: [
      "Use accordion to group related information that users may read selectively.",
      "Use it when space is limited and users do not need to see every section at once.",
    ],
    avoid: [
      "Do not use accordion when most users need to read all of the content straight through.",
      "Do not hide essential information that users need to see immediately.",
    ],
    doTitle: "Keep sections easy to scan",
    doDescription: "Short titles and clearly grouped content help users decide what to open.",
    dontTitle: "Do not hide core information",
    dontDescription: "Accordion adds interaction cost, so it should not conceal information users must see at once.",
  },
  alert: {
    use: [
      "Use alert for important inline feedback that affects the task or page the user is on.",
      "Use the alert variant that matches the message severity and required response.",
    ],
    avoid: [
      "Do not use alert for routine supporting text or content that belongs in the page body.",
      "Do not show several alerts of equal priority when one clear message is enough.",
    ],
    doTitle: "Match the alert to the message",
    doDescription: "A clear title, short body, and suitable variant help users understand what needs attention.",
    dontTitle: "Do not flood the page with alerts",
    dontDescription: "Too many alerts compete for attention and make it harder to spot the message that matters.",
  },
  badge: {
    use: [
      "Use badge for short supporting labels such as status, count, or category.",
      "Use it when a small visual cue helps users interpret nearby content more quickly.",
    ],
    avoid: [
      "Do not use badge as the main message or action on the page.",
      "Do not put long sentences inside a badge.",
    ],
    doTitle: "Keep the badge short",
    doDescription: "A short status or category label works best because users can read it at a glance.",
    dontTitle: "Do not stretch the badge into body copy",
    dontDescription: "Long badge text is harder to scan and starts behaving like regular content.",
  },
  breadcrumb: {
    use: [
      "Use breadcrumb on deeper pages when users need to understand their place in the service hierarchy.",
      "Use it when the trail helps users move up a level without losing context.",
    ],
    avoid: [
      "Do not use breadcrumb on shallow journeys where the page title and main navigation already provide enough context.",
      "Do not use vague or repetitive labels in the trail.",
    ],
    doTitle: "Show a clear path",
    doDescription: "Specific labels help users understand where they are and what each level represents.",
    dontTitle: "Do not make the trail ambiguous",
    dontDescription: "Vague breadcrumb labels weaken orientation instead of improving it.",
  },
  button: {
    use: [
      "Use button for a clear action that changes the page, saves progress, or moves the task forward.",
      "Use the button variant that matches the importance of the action.",
    ],
    avoid: [
      "Do not use button for navigation when a link would be clearer.",
      "Do not use vague labels that force users to guess what happens next.",
    ],
    doTitle: "Use a clear action label",
    doDescription: "Specific button labels help users understand the outcome before they act.",
    dontTitle: "Do not use vague labels",
    dontDescription: "Generic labels such as 'Click here' or 'Submit' without context slow users down.",
  },
  card: {
    use: [
      "Use card to group a related set of content and actions into a single scannable block.",
      "Use it when users need to compare similar items quickly across a list or grid.",
    ],
    avoid: [
      "Do not fill a card with too many competing text blocks, actions, or metadata.",
      "Do not use a card when the content works better as a simple list or page section.",
    ],
    doTitle: "Keep the card focused",
    doDescription: "A clear title, short description, and one obvious hierarchy make cards easier to compare.",
    dontTitle: "Do not cram the card",
    dontDescription: "Too much competing content makes the card harder to scan and weakens the primary action.",
  },
  datepicker: {
    use: [
      "Use datepicker when users need to choose a calendar date and seeing nearby dates helps reduce errors.",
      "Use it for date selection, not for broad date instructions or timelines.",
    ],
    avoid: [
      "Do not use datepicker when users need to enter a different kind of value, such as freeform text or a date range explanation.",
      "Do not rely on placeholder text alone to explain the expected format.",
    ],
    doTitle: "Clarify the date input",
    doDescription: "A clear prompt and a single expected date help users complete the field confidently.",
    dontTitle: "Do not rely on the placeholder",
    dontDescription: "Users should not have to guess the expected input from placeholder text alone.",
  },
  divider: {
    use: [
      "Use divider to separate related sections when spacing alone does not make the relationship clear enough.",
      "Use it sparingly so it supports hierarchy instead of dominating it.",
    ],
    avoid: [
      "Do not add dividers between every small block of content.",
      "Do not use divider as the only signal that content has changed in meaning or priority.",
    ],
    doTitle: "Use the divider to support reading",
    doDescription: "A divider should quietly separate content without becoming the main thing users notice.",
    dontTitle: "Do not divide everything",
    dontDescription: "Too many dividers add noise and make the page feel heavier than it needs to.",
  },
  drawer: {
    use: [
      "Use drawer for secondary tasks that need more space but should not interrupt the main page context.",
      "Use it when users need to review or edit details without leaving the current screen.",
    ],
    avoid: [
      "Do not use drawer for the primary task on the page.",
      "Do not overload the drawer with multiple unrelated tasks.",
    ],
    doTitle: "Keep the drawer focused",
    doDescription: "A drawer works best when it supports one related task and a clear next step.",
    dontTitle: "Do not turn the drawer into a whole page",
    dontDescription: "Too many unrelated tasks or messages make the drawer harder to complete and dismiss.",
  },
  footer: {
    use: [
      "Use footer for persistent supporting links and organisational information at the end of the page.",
      "Use it for secondary actions and reference content, not primary task content.",
    ],
    avoid: [
      "Do not move important task actions or critical page guidance into the footer.",
      "Do not overload the footer with too many competing link groups.",
    ],
    doTitle: "Keep footer content secondary",
    doDescription: "Supporting links and organisational details belong in the footer because they do not interrupt the main task.",
    dontTitle: "Do not hide primary content in the footer",
    dontDescription: "If users need the content to finish the task, it should not be buried at the end of the page.",
  },
  icon: {
    use: [
      "Use icon when it reinforces an action, status, or content type that users can already recognise from context.",
      "Use it to support meaning, not to replace essential text.",
    ],
    avoid: [
      "Do not rely on icon alone when the meaning may be unclear.",
      "Do not mix too many icon styles or meanings in the same interface.",
    ],
    doTitle: "Pair the icon with clear context",
    doDescription: "Icons work best when nearby text or structure already explains what they mean.",
    dontTitle: "Do not rely on icon alone",
    dontDescription: "Without enough context, users may interpret the same icon in different ways.",
  },
  input: {
    use: [
      "Use input for short, direct responses such as search terms, names, or reference values.",
      "Use it when users know what they need to type and the expected value is brief.",
    ],
    avoid: [
      "Do not use input for longer responses that need multiple lines.",
      "Do not rely on placeholder text in place of a clear field label.",
    ],
    doTitle: "Keep the field purpose clear",
    doDescription: "Users should understand what to enter before they start typing.",
    dontTitle: "Do not make users guess",
    dontDescription: "Placeholder-only instructions disappear and make the field harder to complete accurately.",
  },
  link: {
    use: [
      "Use link for navigation or related actions that take users to another page, view, or resource.",
      "Use link text that tells users where they will go or what they will open.",
    ],
    avoid: [
      "Do not use link when the interaction performs an in-place action that should be a button instead.",
      "Do not use vague text such as 'Read more' or 'Click here' without context.",
    ],
    doTitle: "Make the destination clear",
    doDescription: "Specific link text helps users decide whether it is worth following.",
    dontTitle: "Do not hide the destination",
    dontDescription: "Generic link labels make it harder to scan the page and predict what happens next.",
  },
  modal: {
    use: [
      "Use modal for short, high-priority tasks that need the user's full attention before they continue.",
      "Use it when the interaction should block the page until users confirm, cancel, or complete one focused task.",
    ],
    avoid: [
      "Do not use modal for long forms, dense reference content, or multiple unrelated decisions.",
      "Do not trigger a modal when the same task can be completed in the page flow.",
    ],
    doTitle: "Keep the decision focused",
    doDescription: "A modal should present one clear task with one clear next step.",
    dontTitle: "Do not overload the modal",
    dontDescription: "When a modal becomes too dense, users lose context and the interaction becomes harder to finish.",
  },
  pagination: {
    use: [
      "Use pagination when showing everything on one page would hurt performance or make results difficult to scan.",
      "Use it when users need a predictable way to move through related pages of results.",
    ],
    avoid: [
      "Do not use pagination when there is only one page of content.",
      "Do not use it for step-by-step journeys where users should move forward with a button and back link instead.",
    ],
    doTitle: "Use pagination when the list is long enough",
    doDescription: "Pagination works best when it reduces load and helps users move through many related results.",
    dontTitle: "Do not paginate short content",
    dontDescription: "Extra page controls add work when the content could stay on a single page.",
  },
  skeleton: {
    use: [
      "Use skeleton while content is loading and the final layout is already known.",
      "Use it to preserve structure and reduce layout shift while data arrives.",
    ],
    avoid: [
      "Do not use skeleton when the wait is too short to notice.",
      "Do not leave skeleton visible after real content is ready.",
    ],
    doTitle: "Match the final layout",
    doDescription: "Skeleton works best when it closely reflects the content that will replace it.",
    dontTitle: "Do not let loading states linger",
    dontDescription: "A loading placeholder should disappear as soon as real content is ready to read.",
  },
  spinner: {
    use: [
      "Use spinner for short indeterminate waits where users need to know that work is in progress.",
      "Use it when you cannot accurately predict the remaining duration.",
    ],
    avoid: [
      "Do not use spinner for long waits without any supporting context.",
      "Do not leave users blocked without explaining what is happening next.",
    ],
    doTitle: "Use spinner for brief in-progress states",
    doDescription: "A spinner works best when the wait is short and users only need confirmation that work has started.",
    dontTitle: "Do not leave users waiting without context",
    dontDescription: "Long waits need clearer status information than a spinner alone can provide.",
  },
  stepper: {
    use: [
      "Use stepper when users need to understand the stages of a multi-step process.",
      "Use it when knowing the current step helps users judge progress and prepare for what comes next.",
    ],
    avoid: [
      "Do not use stepper for short tasks that do not need explicit progress.",
      "Do not add more steps than users need to understand the journey.",
    ],
    doTitle: "Show a clear journey",
    doDescription: "A good stepper helps users see where they are, what is next, and how much remains.",
    dontTitle: "Do not add steps for decoration",
    dontDescription: "Extra or vague steps make the journey feel longer and less clear than it is.",
  },
  subnav: {
    use: [
      "Use subnav for secondary navigation inside a section that already has a primary navigation layer.",
      "Use it when several related pages need a shared local navigation pattern.",
    ],
    avoid: [
      "Do not use subnav when the section only has one destination.",
      "Do not repeat the same links in multiple navigation components on the same page.",
    ],
    doTitle: "Keep section navigation focused",
    doDescription: "A small set of clear local links helps users move around a section without losing context.",
    dontTitle: "Do not duplicate navigation",
    dontDescription: "Repeated navigation patterns make it harder to tell which links matter for the current task.",
  },
  table: {
    use: [
      "Use table when users need to compare values across rows and columns.",
      "Use it for structured data where alignment helps users spot patterns or differences quickly.",
    ],
    avoid: [
      "Do not use table for simple content that reads better as a list or card.",
      "Do not crowd the table with columns that users do not need for the decision at hand.",
    ],
    doTitle: "Keep the table easy to compare",
    doDescription: "Relevant columns and clear row content help users scan and compare results quickly.",
    dontTitle: "Do not overload the table",
    dontDescription: "Too many columns or repeated details make comparison slower and more error-prone.",
  },
  textarea: {
    use: [
      "Use textarea when users need to enter a longer freeform response.",
      "Use it for content that may span several sentences or needs room to explain context.",
    ],
    avoid: [
      "Do not use textarea for short structured values that belong in a smaller field.",
      "Do not leave the prompt so vague that users do not know what level of detail to provide.",
    ],
    doTitle: "Set expectations for the response",
    doDescription: "Users write better answers when they know what kind of detail the field is asking for.",
    dontTitle: "Do not leave the prompt ambiguous",
    dontDescription: "An unclear prompt makes responses less useful and harder to review later.",
  },
  toast: {
    use: [
      "Use toast for brief status updates that confirm an action or surface a timely non-blocking message.",
      "Use it when users can continue their task without stopping to resolve the message immediately.",
    ],
    avoid: [
      "Do not use toast for important content that must stay visible until the user reads it.",
      "Do not show several toasts in quick succession for related updates.",
    ],
    doTitle: "Keep the toast brief",
    doDescription: "A short message with one clear outcome helps users recognise what just happened.",
    dontTitle: "Do not use toast for permanent guidance",
    dontDescription: "If users need the content to stay visible, it should not disappear on its own.",
  },
  tooltip: {
    use: [
      "Use tooltip for short supplementary explanations on hover or focus.",
      "Use it when the interface already works without the tooltip and the extra text simply adds context.",
    ],
    avoid: [
      "Do not put essential instructions or long content inside a tooltip.",
      "Do not rely on tooltip as the only way to explain a control.",
    ],
    doTitle: "Keep the tooltip brief",
    doDescription: "Short supporting text works best because users should be able to read it at a glance.",
    dontTitle: "Do not hide essential guidance",
    dontDescription: "Important instructions should stay visible in the interface, not appear only on hover or focus.",
  },
};

const getGeneratedUsagePattern = (doc: ComponentDoc): GeneratedUsagePattern =>
  generatedUsagePatternOverrides[doc.key]
  ?? defaultGeneratedUsagePatterns[doc.group]
  ?? {
    use: [
      `Use ${doc.title.toLowerCase()} when it gives users a clearer, more consistent SGDS interaction for the task at hand.`,
      "Use the built-in SGDS pattern when it helps users recognise the component quickly and act with confidence.",
    ],
    avoid: [
      "Do not use this component when a simpler SGDS pattern would communicate the same thing more clearly.",
      "Do not add repeated or decorative instances that compete with the main content.",
    ],
    doTitle: "Keep the pattern clear",
    doDescription: "Use one clear, purposeful instance so users can understand the component quickly.",
    dontTitle: "Do not add noise",
    dontDescription: "Repeated or decorative instances make the interface harder to scan.",
  };

const getPrimaryUsageDemoMarkup = (doc: ComponentDoc): string =>
  doc.configurationDemos?.find((demo) => demo.defaultValue)?.options.find((option) => option.value === doc.configurationDemos?.find((demo2) => demo2.defaultValue === demo.defaultValue)?.defaultValue)?.markup
  || doc.configurationDemos?.[0]?.options.find((option) => option.value === doc.configurationDemos?.[0]?.defaultValue)?.markup
  || doc.configurationDemos?.[0]?.options[0]?.markup
  || doc.demos[0]?.markup
  || doc.anatomyMarkup
  || doc.codeExample
  || `<${doc.tag}></${doc.tag}>`;

const buildRepeatedMarkup = (markup: string) =>
  `<div class="portal-demo-stack-sm">
    ${markup}
    ${markup}
  </div>`;

const buildAntiPatternMarkup = (doc: ComponentDoc): string => {
  const primaryMarkup = getPrimaryUsageDemoMarkup(doc);

  switch (doc.key) {
    case "badge":
      return `<div class="portal-demo-row"><sgds-badge variant="neutral">This is a very long badge label that should be plain text instead</sgds-badge></div>`;
    case "breadcrumb":
      return `<sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Page</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Page</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Page</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>`;
    case "button":
      return `<div class="portal-demo-row"><sgds-button>Click here</sgds-button></div>`;
    case "card":
      return `<sgds-card class="portal-demo-card">
        <span slot="subtitle">General</span>
        <span slot="title">This is a very long card title that makes the card harder to scan quickly</span>
        <div class="portal-slot-example"><span>First block of content</span></div>
        <span slot="description">Supporting description that repeats the title instead of adding useful context.</span>
        <span slot="lower">Secondary text</span>
        <sgds-button slot="footer" variant="outline">Action one</sgds-button>
      </sgds-card>`;
    case "checkbox":
      return `<sgds-checkbox-group label="Choose">
        <sgds-checkbox>Option 1</sgds-checkbox>
        <sgds-checkbox>Option 2</sgds-checkbox>
        <sgds-checkbox>Option 3</sgds-checkbox>
        <sgds-checkbox>Option 4</sgds-checkbox>
        <sgds-checkbox>Option 5</sgds-checkbox>
      </sgds-checkbox-group>`;
    case "datepicker":
      return `<sgds-datepicker placeholder="Date"></sgds-datepicker>`;
    case "divider":
      return `<div class="portal-demo-stack-sm">
        <sgds-divider></sgds-divider>
        <sgds-divider></sgds-divider>
        <sgds-divider></sgds-divider>
      </div>`;
    case "drawer":
      return `<div class="portal-demo-overlay">
        <sgds-drawer open contained size="sm">
          <span slot="title">Task one</span>
          <span slot="description">Task two and another decision in the same drawer.</span>
          <p>Long content and multiple unrelated tasks make the drawer harder to complete.</p>
          <div slot="footer" class="portal-demo-row">
            <sgds-button>Continue</sgds-button>
            <sgds-button variant="outline">Open something else</sgds-button>
          </div>
        </sgds-drawer>
      </div>`;
    case "dropdown":
      return `<sgds-dropdown>
        <sgds-button slot="toggler" variant="outline">More</sgds-button>
        <sgds-dropdown-item><a href="#">Item</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item</a></sgds-dropdown-item>
      </sgds-dropdown>`;
    case "footer":
      return buildRepeatedMarkup(primaryMarkup);
    case "icon":
      return `<div class="portal-demo-row sgds:gap-sm">
        <sgds-icon name="info-circle-fill" size="lg"></sgds-icon>
        <sgds-icon name="info-circle-fill" size="lg"></sgds-icon>
        <sgds-icon name="info-circle-fill" size="lg"></sgds-icon>
      </div>`;
    case "input":
      return `<sgds-input placeholder="Type here"></sgds-input>`;
    case "link":
      return `<sgds-link><a href="#">Click here</a></sgds-link>`;
    case "mainnav":
    case "masthead":
    case "modal":
      return buildRepeatedMarkup(primaryMarkup);
    case "pagination":
      return `<sgds-pagination currentPage="1" dataLength="10" itemsPerPage="10" variant="number"></sgds-pagination>`;
    case "radio":
      return `<sgds-radio-group label="Select one">
        <sgds-radio value="1">Option 1</sgds-radio>
        <sgds-radio value="2">Option 2</sgds-radio>
        <sgds-radio value="3">Option 3</sgds-radio>
      </sgds-radio-group>`;
    case "select":
      return `<sgds-select placeholder="Choose">
        <sgds-select-option value="1">Option 1</sgds-select-option>
        <sgds-select-option value="2">Option 2</sgds-select-option>
        <sgds-select-option value="3">Option 3</sgds-select-option>
      </sgds-select>`;
    case "sidenav":
      return `<div class="portal-demo-nav-sm">
        <sgds-sidenav>
          <sgds-sidenav-item active>
            <span slot="title">Section</span>
            <sgds-sidenav-link active><a href="#">Item</a></sgds-sidenav-link>
            <sgds-sidenav-link><a href="#">Item</a></sgds-sidenav-link>
          </sgds-sidenav-item>
        </sgds-sidenav>
      </div>`;
    case "skeleton":
    case "spinner":
    case "stepper":
    case "subnav":
    case "switch":
    case "tab":
      return buildRepeatedMarkup(primaryMarkup);
    case "table":
      return `<sgds-table
        rowHeader='["Name","Status","Owner","Notes","Updated"]'
        tableData='[["Alpha","Active","Team A","Long repeated detail","Today"],["Beta","Pending","Team B","Long repeated detail","Today"],["Gamma","Closed","Team C","Long repeated detail","Today"]]'
        headerBackground
        tableBorder
      ></sgds-table>`;
    case "textarea":
      return `<sgds-textarea rows="4" placeholder="Write here"></sgds-textarea>`;
    case "toast":
    case "tooltip":
      return buildRepeatedMarkup(primaryMarkup);
    default:
      return buildRepeatedMarkup(primaryMarkup);
  }
};

const buildUsageGuidance = (doc: ComponentDoc): UsageGuidance[] => {
  const pattern = getGeneratedUsagePattern(doc);

  return [
    {
      title: "When to use",
      tone: "do",
      items: pattern.use,
    },
    {
      title: "When not to use",
      tone: "dont",
      items: pattern.avoid,
    },
  ];
};

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

const buildGeneratedBestPractices = (doc: ComponentDoc): BestPractice[] => {
  const pattern = getGeneratedUsagePattern(doc);

  return [
    {
      title: pattern.doTitle,
      description: pattern.doDescription,
      tone: "do",
      markup: getPrimaryUsageDemoMarkup(doc),
    },
    {
      title: pattern.dontTitle,
      description: pattern.dontDescription,
      tone: "dont",
      markup: buildAntiPatternMarkup(doc),
    },
  ];
};

const buildResolvedUsage = (doc: ComponentDoc): UsageContent => {
  const usage = doc.usage ?? {};
  const generatedBestPractices = buildGeneratedBestPractices(doc);

  return {
    guidance: usage.guidance?.length ? usage.guidance : buildUsageGuidance(doc),
    content: usage.content?.length ? usage.content : buildUsageContentSections(doc),
    contentGuidelines: usage.contentGuidelines ?? [],
    behaviours: usage.behaviours?.length ? usage.behaviours : buildUsageBehaviours(doc),
    motion: usage.motion,
    bestPractices: usage.bestPractices?.length ? usage.bestPractices : generatedBestPractices,
  };
};

const keyboardRows = {
  tabNext: (target: string): AccessibilityKeyboardRow => ({
    key: "Tab",
    description: `Moves focus from the ${target} to the next focusable element.`,
  }),
  tabPrevious: (): AccessibilityKeyboardRow => ({
    key: "Shift + Tab",
    description: "Moves focus to the previous interactive element.",
  }),
  enterActivate: (target: string): AccessibilityKeyboardRow => ({
    key: "Enter",
    description: `Activates the focused ${target}.`,
  }),
  spaceActivate: (target: string): AccessibilityKeyboardRow => ({
    key: "Space",
    description: `Activates the focused ${target}.`,
  }),
  escapeClose: (target: string): AccessibilityKeyboardRow => ({
    key: "Esc",
    description: `Closes the open ${target} when supported by the component.`,
  }),
  arrowsOpenMove: (target: string): AccessibilityKeyboardRow => ({
    key: "↓ Down or ↑ Up",
    description: `Opens the ${target} menu or moves focus between available options.`,
  }),
  arrowsRadio: (): AccessibilityKeyboardRow => ({
    key: "↓ Down or → Right or ↑ Up or ← Left",
    description: "Moves between radio options and updates the selected option.",
  }),
};

const focusRows = (target: string): AccessibilityKeyboardRow[] => [
  keyboardRows.tabNext(target),
  keyboardRows.tabPrevious(),
];

const actionRows = (target: string): AccessibilityKeyboardRow[] => [
  ...focusRows(target),
  keyboardRows.enterActivate(target),
  keyboardRows.spaceActivate(target),
];

const linkRows = (target = "link"): AccessibilityKeyboardRow[] => [
  ...focusRows(target),
  keyboardRows.enterActivate(target),
];

const menuRows = (target: string): AccessibilityKeyboardRow[] => [
  ...focusRows(target),
  keyboardRows.arrowsOpenMove(target),
  keyboardRows.enterActivate("focused option"),
  keyboardRows.escapeClose(target),
];

const generatedAccessibilityProfileOverrides: Record<string, Partial<GeneratedAccessibilityProfile>> = {
  alert: {
    builtInDescription: [
      "Alerts expose their message as an alert region when they are shown.",
      "Dismissible alerts use the SGDS close button for the close action.",
    ],
    builtInItems: [
      "The alert container uses `role=\"alert\"` and updates `aria-hidden` based on its shown state.",
      "Alert links render as anchors, so they keep native link behaviour.",
    ],
    authorItems: [
      "Write the message so users can understand what happened and what to do next.",
      "Use links only when they help users act on the alert.",
    ],
    focusItems: [
      "Do not move focus to an alert automatically unless the alert interrupts the current task.",
      "If an alert includes a link or close button, keep it in a logical tab order.",
    ],
  },
  badge: {
    builtInItems: [
      "Badges work as visual labels for status, count, or category information.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Use clear badge text instead of relying on colour alone.",
      "Keep the badge close to the content it describes.",
    ],
    focusItems: [
      "Do not make badges focusable unless they are paired with an interactive control.",
      "If the badge changes status, make sure the surrounding content explains the change.",
    ],
  },
  breadcrumb: {
    builtInItems: [
      "Breadcrumb items render links through the SGDS link component.",
      "The last item can be marked as the current location.",
    ],
    authorItems: [
      "Use link text that matches the destination page.",
      "Keep the trail short enough for users to scan.",
    ],
    focusItems: [
      "Users should be able to tab through each breadcrumb link in page order.",
      "Do not remove the native link destination from breadcrumb items.",
    ],
    keyboardInteractions: linkRows("breadcrumb link"),
  },
  button: {
    builtInItems: [
      "Buttons render as native buttons by default and anchors when `href` is provided.",
      "The component exposes disabled and loading states to assistive technology.",
    ],
    authorItems: [
      "Use button text that describes the action.",
      "Add an accessible label when the visible text is replaced by an icon or loading state.",
    ],
    focusItems: [
      "Keep buttons in the same order as the task flow.",
      "Do not use a disabled button as the only way to explain what users need to do next.",
    ],
    keyboardInteractions: actionRows("button"),
  },
  card: {
    builtInItems: [
      "Cards provide structured slots for title, description, media, supporting content, and footer actions.",
      "Cards can become focusable when the stretched-link pattern is used.",
    ],
    authorItems: [
      "Use a clear title and place actions in the footer slot.",
      "Provide alt text for meaningful images placed inside card media slots.",
    ],
    focusItems: [
      "Keep interactive elements inside the card reachable in a logical order.",
      "Avoid making the whole card and an inner link point to different destinations.",
    ],
  },
  checkbox: {
    builtInItems: [
      "Checkboxes render native checkbox inputs and reflect checked, disabled, and invalid states.",
      "Checkbox groups provide shared label, hint, and feedback areas.",
    ],
    authorItems: [
      "Write labels that describe the choice clearly.",
      "Use checkbox groups when users may select more than one option.",
    ],
    focusItems: [
      "Users should be able to move through each checkbox and its feedback text in order.",
      "Keep related checkboxes inside the same group when they answer one question.",
    ],
    keyboardInteractions: actionRows("checkbox"),
  },
  "close-button": {
    builtInItems: [
      "Close buttons render native buttons with a close icon.",
      "The component includes a default accessible name for the close action.",
    ],
    authorItems: [
      "Use close button only for dismissing or closing nearby content.",
      "Override the accessible label in the parent context when users need more specific wording.",
    ],
    focusItems: [
      "Place the close button where users expect to find the dismiss action.",
      "Return focus to a sensible trigger or next step after closing temporary content.",
    ],
    keyboardInteractions: actionRows("close button"),
  },
  "combo-box": {
    builtInItems: [
      "Combo boxes combine an input with a selectable list of options.",
      "The component emits input, change, focus, blur, and select events for application state.",
    ],
    authorItems: [
      "Use clear placeholder or label text that tells users what to search for.",
      "Keep option labels short and unique enough to recognise when filtered.",
    ],
    focusItems: [
      "Users should be able to type in the field and move to filtered options.",
      "Return users to a predictable point in the flow after a selection is made.",
    ],
    keyboardInteractions: [
      ...menuRows("combo box"),
      {
        key: "Backspace",
        description: "Removes the last selected item when multi-select is enabled and the input is empty.",
      },
    ],
  },
  datepicker: {
    builtInItems: [
      "Datepickers combine an input, trigger button, and calendar dialog.",
      "The calendar dialog exposes its current view with an accessible dialog label.",
    ],
    authorItems: [
      "Use a visible label and hint text when the expected date format needs support.",
      "Keep validation feedback close to the datepicker.",
    ],
    focusItems: [
      "When the calendar opens, SGDS moves focus into the calendar.",
      "When the calendar closes, SGDS returns focus to the input.",
    ],
    keyboardInteractions: [
      ...focusRows("datepicker control"),
      keyboardRows.arrowsOpenMove("datepicker"),
      keyboardRows.enterActivate("focused date"),
      keyboardRows.escapeClose("datepicker"),
    ],
  },
  "description-list": {
    builtInItems: [
      "Description lists present terms and supporting details as paired content.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Use short terms and clear descriptions.",
      "Keep each term and description pair complete when read on its own.",
    ],
    focusItems: [
      "Do not place unrelated interactive controls inside description list values.",
      "If a value includes a link, the link should be reachable in normal tab order.",
    ],
  },
  divider: {
    builtInItems: [
      "Dividers separate sections visually.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Use dividers to separate related groups, not as decoration between every item.",
      "Do not rely on a divider as the only cue that the page structure changed.",
    ],
    focusItems: [
      "Dividers should not receive focus.",
      "Use headings or labels to describe the sections on each side of a divider.",
    ],
  },
  drawer: {
    builtInItems: [
      "Drawers expose their panel as a dialog with `aria-modal`.",
      "The component sets initial focus when it opens and restores focus to the trigger when it closes.",
    ],
    authorItems: [
      "Use a title that describes the drawer task.",
      "Keep drawer content focused on one task or supporting flow.",
    ],
    focusItems: [
      "Place the primary action after the content it acts on.",
      "Avoid opening a drawer from another temporary overlay unless the flow requires it.",
    ],
    keyboardInteractions: [
      ...focusRows("drawer content"),
      keyboardRows.escapeClose("drawer"),
    ],
  },
  dropdown: {
    builtInItems: [
      "Dropdowns expose their menu with menu semantics.",
      "Dropdown items are focusable menu items and support keyboard selection.",
    ],
    authorItems: [
      "Use dropdown items for related actions or navigation choices.",
      "Keep item labels short and action-oriented.",
    ],
    focusItems: [
      "Focus should move through the toggler and menu items in a predictable order.",
      "Return focus to the toggler when the menu closes.",
    ],
    keyboardInteractions: menuRows("dropdown"),
  },
  "file-upload": {
    builtInItems: [
      "File upload uses a native file input with SGDS button and close-button controls.",
      "Selected files are rendered as a list with remove actions.",
    ],
    authorItems: [
      "Explain accepted file types and size limits near the field.",
      "Use validation feedback when a file is missing or not accepted.",
    ],
    focusItems: [
      "Users should be able to reach the upload button and each remove-file button.",
      "Do not hide file requirements until after the upload fails.",
    ],
    keyboardInteractions: actionRows("upload or remove-file button"),
  },
  footer: {
    builtInItems: [
      "Footers provide structured areas for site links and supporting information.",
      "Footer links keep native link behaviour.",
    ],
    authorItems: [
      "Use link text that matches the destination.",
      "Group related footer links under clear headings.",
    ],
    focusItems: [
      "Users should be able to tab through footer links in a predictable order.",
      "Avoid adding non-link text that looks like a link.",
    ],
    keyboardInteractions: linkRows("footer link"),
  },
  icon: {
    builtInItems: [
      "Icons render visual symbols.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Use icons as supporting visuals, not as the only way to convey meaning.",
      "Hide decorative icons from assistive technology in the surrounding markup when needed.",
    ],
    focusItems: [
      "Icons should not receive focus on their own.",
      "If an icon is used inside a button or link, the parent control needs an accessible name.",
    ],
  },
  "icon-list": {
    builtInItems: [
      "Icon lists structure repeated items with supporting icons.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Use icons to support the text, not replace it.",
      "Keep each list item meaningful when read without the icon.",
    ],
    focusItems: [
      "Icon list items should not receive focus unless they contain links or controls.",
      "If an item includes a link, keep the link text clear and reachable.",
    ],
  },
  "icon-button": {
    builtInItems: [
      "Icon buttons render as native buttons by default and anchors when `href` is provided.",
      "The component supports an `ariaLabel` for the accessible name.",
    ],
    authorItems: [
      "Always provide an accessible label that describes the action.",
      "Use the icon only as a visual shortcut for the action.",
    ],
    focusItems: [
      "Keep icon buttons close to the content or item they affect.",
      "Avoid using several identical icon buttons without unique accessible labels.",
    ],
    keyboardInteractions: actionRows("icon button"),
  },
  "icon-card": {
    builtInItems: [
      "Icon cards use card structure with an icon slot and optional stretched-link behaviour.",
      "The card becomes focusable only when it is configured as a stretched link.",
    ],
    authorItems: [
      "Use the icon to support the title, not replace it.",
      "Keep the title and description meaningful without relying on the icon.",
    ],
    focusItems: [
      "If the card links somewhere, use one clear destination.",
      "Keep any nested interactive content reachable and understandable.",
    ],
  },
  "image-card": {
    builtInItems: [
      "Image cards use card structure with an image slot and optional stretched-link behaviour.",
      "The card becomes focusable only when it is configured as a stretched link.",
    ],
    authorItems: [
      "Provide alt text for meaningful images.",
      "Use empty alt text for decorative images in the surrounding image markup.",
    ],
    focusItems: [
      "If the card links somewhere, use one clear destination.",
      "Avoid placing multiple competing actions inside one image card.",
    ],
  },
  input: {
    builtInItems: [
      "Inputs render native input controls and connect labels, hint text, and feedback to the control.",
      "The component supports disabled, read-only, required, invalid, and feedback states.",
    ],
    authorItems: [
      "Use a visible label that tells users what to enter.",
      "Place format requirements in hint text before validation happens.",
    ],
    focusItems: [
      "Focus should move to the input before any suffix or supporting controls.",
      "Keep validation feedback close to the input it describes.",
    ],
    keyboardInteractions: [
      ...focusRows("input"),
      {
        key: "Text keys",
        description: "Enters or edits the input value.",
      },
    ],
  },
  link: {
    builtInItems: [
      "Links render anchors and keep native link behaviour.",
      "Disabled links are removed from the tab order by the component.",
    ],
    authorItems: [
      "Use link text that describes the destination or result.",
      "Avoid using generic text such as read more when the destination is unclear.",
    ],
    focusItems: [
      "Links should appear in the reading order where users need them.",
      "Do not use a link when the action changes state on the same page. Use a button instead.",
    ],
    keyboardInteractions: linkRows(),
  },
  mainnav: {
    builtInItems: [
      "Main navigation renders a navigation landmark and a responsive menu toggle.",
      "The mobile toggle exposes expanded state and the controlled menu.",
    ],
    authorItems: [
      "Use clear labels for top-level navigation items.",
      "Keep primary navigation stable across pages.",
    ],
    focusItems: [
      "Users should be able to reach the brand link, navigation items, and mobile toggle in order.",
      "Do not add hidden navigation items that remain focusable.",
    ],
    keyboardInteractions: actionRows("navigation toggle or item"),
  },
  masthead: {
    builtInItems: [
      "The masthead includes a disclosure control for the official government banner content.",
      "The disclosure control supports keyboard activation.",
    ],
    authorItems: [
      "Keep the masthead content unchanged unless product guidance says otherwise.",
      "Do not place page-specific actions inside the masthead.",
    ],
    focusItems: [
      "Users should be able to open the masthead information and continue through its links.",
      "Keep focus order consistent with the page header.",
    ],
    keyboardInteractions: actionRows("masthead disclosure"),
  },
  modal: {
    builtInItems: [
      "Modals expose their panel as a dialog with `aria-modal`.",
      "The component moves focus to the modal heading when it opens and restores focus to the trigger when it closes.",
    ],
    authorItems: [
      "Use a title that describes the decision or task.",
      "Keep modal content short enough for users to complete the task without losing context.",
    ],
    focusItems: [
      "Place actions after the message or form content they relate to.",
      "Avoid opening another modal from inside a modal.",
    ],
    keyboardInteractions: [
      ...focusRows("modal content"),
      keyboardRows.escapeClose("modal"),
    ],
  },
  "overflow-menu": {
    builtInItems: [
      "Overflow menus use the dropdown component internally.",
      "Menu items support the same keyboard selection behaviour as dropdown items.",
    ],
    authorItems: [
      "Use overflow menus for secondary actions.",
      "Keep destructive actions clearly labelled.",
    ],
    focusItems: [
      "The menu button should be reachable next to the item it affects.",
      "Return focus to the menu button after the menu closes.",
    ],
    keyboardInteractions: menuRows("overflow menu"),
  },
  pagination: {
    builtInItems: [
      "Pagination renders a navigation region and page controls with current-page state.",
      "Page controls expose labels for their destination pages.",
    ],
    authorItems: [
      "Use pagination when users need to move through a known set of pages.",
      "Keep the current page state accurate when data changes.",
    ],
    focusItems: [
      "Users should be able to tab through available page controls.",
      "Disabled previous or next controls should not block users from reaching page numbers.",
    ],
    keyboardInteractions: linkRows("page control"),
  },
  "progress-bar": {
    builtInItems: [
      "Progress bars expose progress semantics with `role=\"progressbar\"`.",
      "The component supports accessible value attributes and an accessible label.",
    ],
    authorItems: [
      "Use a clear label when the progress bar needs context.",
      "Keep the value, minimum, and maximum accurate as progress changes.",
    ],
    focusItems: [
      "Progress bars should not receive focus unless paired with an interactive control.",
      "Use status text nearby when users need to know what is happening.",
    ],
  },
  "quantity-toggle": {
    builtInItems: [
      "Quantity toggles combine an input with increase and decrease icon buttons.",
      "The input restricts unsupported keys and allows numeric editing keys.",
    ],
    authorItems: [
      "Use a label that describes what quantity is being changed.",
      "Set sensible minimum, maximum, and step values.",
    ],
    focusItems: [
      "Users should be able to reach the decrease button, input, and increase button in order.",
      "Validation feedback should explain any minimum or maximum constraint.",
    ],
    keyboardInteractions: [
      ...focusRows("quantity control"),
      {
        key: "Number keys",
        description: "Edits the quantity value in the input.",
      },
      {
        key: "Backspace",
        description: "Removes a digit from the quantity value.",
      },
      {
        key: "↓ Down or ↑ Up or ← Left or → Right",
        description: "Uses the native number input cursor or step behaviour when available.",
      },
    ],
  },
  radio: {
    builtInItems: [
      "Radio buttons render native radio inputs and reflect checked and disabled states.",
      "Radio groups manage selection across related radio options.",
    ],
    authorItems: [
      "Use radio buttons when users can choose one option from a set.",
      "Write labels that make each option distinct.",
    ],
    focusItems: [
      "Keep related radio options inside the same group.",
      "Place hint and validation text close to the group.",
    ],
    keyboardInteractions: [
      ...focusRows("radio group"),
      keyboardRows.arrowsRadio(),
      keyboardRows.spaceActivate("focused radio option"),
    ],
  },
  select: {
    builtInItems: [
      "Select combines an input-like trigger with a selectable option menu.",
      "The menu supports keyboard opening, movement, and selection.",
    ],
    authorItems: [
      "Use a visible label that describes the choice.",
      "Keep option labels short and unique.",
    ],
    focusItems: [
      "Users should be able to open the option list and select an item without a pointer.",
      "Keep validation feedback close to the select.",
    ],
    keyboardInteractions: menuRows("select"),
  },
  sidenav: {
    builtInItems: [
      "Side navigation provides structured navigation links and expandable sections.",
      "Expandable side navigation items support keyboard opening and closing.",
    ],
    authorItems: [
      "Use clear section labels and link text.",
      "Keep the current page state accurate.",
    ],
    focusItems: [
      "Users should be able to move through navigation links in order.",
      "Do not hide focusable links inside collapsed sections.",
    ],
    keyboardInteractions: [
      ...focusRows("side navigation item"),
      keyboardRows.enterActivate("focused side navigation item"),
      keyboardRows.spaceActivate("focused side navigation item"),
      {
        key: "↓ Down or → Right",
        description: "Opens the focused expandable side navigation item.",
      },
      {
        key: "↑ Up or ← Left",
        description: "Closes the focused expandable side navigation item.",
      },
    ],
  },
  skeleton: {
    builtInItems: [
      "Skeletons are loading placeholders.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Use skeletons only while content is loading.",
      "Replace the skeleton with real content as soon as it is available.",
    ],
    focusItems: [
      "Skeleton placeholders should not receive focus.",
      "Do not use skeletons as the only status message for long waits.",
    ],
  },
  spinner: {
    builtInItems: [
      "Spinners are loading indicators.",
      "The component does not add custom keyboard behaviour.",
    ],
    authorItems: [
      "Pair the spinner with text when users need to know what is loading.",
      "Use a progress bar instead when determinate progress is available.",
    ],
    focusItems: [
      "Spinners should not receive focus.",
      "Do not trap users on a loading state without a way forward.",
    ],
  },
  stepper: {
    builtInItems: [
      "Steppers communicate progress through a sequence of steps.",
      "Clickable stepper items support Enter when the component is configured as clickable.",
    ],
    authorItems: [
      "Use clear step names that match the task.",
      "Keep the current step state accurate.",
    ],
    focusItems: [
      "If steps are clickable, users should be able to reach them in order.",
      "Do not make future steps clickable when users must complete earlier steps first.",
    ],
    keyboardInteractions: [
      ...focusRows("clickable step"),
      keyboardRows.enterActivate("focused step"),
    ],
  },
  subnav: {
    builtInItems: [
      "Sub-navigation supports expandable sections.",
      "Expandable sub-navigation items support Enter and Space for opening and closing.",
    ],
    authorItems: [
      "Use concise labels that describe the destination or section.",
      "Keep nesting shallow so users can scan the navigation.",
    ],
    focusItems: [
      "Users should be able to move through sub-navigation links in order.",
      "Do not leave hidden links focusable when a section is collapsed.",
    ],
    keyboardInteractions: actionRows("sub-navigation item"),
  },
  switch: {
    builtInItems: [
      "Switches render native checkbox inputs with switch styling.",
      "The component reflects checked and disabled states.",
    ],
    authorItems: [
      "Use switch for settings that take effect immediately.",
      "Use a label that describes the setting, not the current state only.",
    ],
    focusItems: [
      "Users should be able to reach the switch in form order.",
      "Keep any status text close to the switch it describes.",
    ],
    keyboardInteractions: actionRows("switch"),
  },
  "system-banner": {
    builtInItems: [
      "System banners expose application-level messages as an alert region.",
      "Pagination and dismiss actions use SGDS icon button and close button controls.",
    ],
    authorItems: [
      "Use system banners for important application-level messages.",
      "Keep each message short and action-oriented.",
    ],
    focusItems: [
      "Users should be able to reach banner actions without losing their place in the page.",
      "Auto-cycling pauses on focus and hover in the SGDS implementation.",
    ],
    keyboardInteractions: actionRows("banner action"),
  },
  tab: {
    builtInItems: [
      "Tabs expose tablist, tab, and panel relationships.",
      "The tab group connects each tab with its controlled panel.",
    ],
    authorItems: [
      "Use short tab labels that describe each panel.",
      "Keep tab content related to the selected tab.",
    ],
    focusItems: [
      "Users should be able to move between tabs and continue into the active panel.",
      "Do not place critical content only in an inactive panel without a clear tab label.",
    ],
    keyboardInteractions: [
      ...focusRows("tab"),
      keyboardRows.enterActivate("focused tab"),
      keyboardRows.spaceActivate("focused tab"),
      {
        key: "← Left or ↑ Up",
        description: "Moves focus to the previous tab.",
      },
      {
        key: "→ Right or ↓ Down",
        description: "Moves focus to the next tab.",
      },
      {
        key: "Home",
        description: "Moves focus to the first tab.",
      },
      {
        key: "End",
        description: "Moves focus to the last tab.",
      },
    ],
  },
  table: {
    builtInItems: [
      "Tables render table, row, header, and cell components for structured data.",
      "Responsive tables can receive focus so users can scroll the table area.",
    ],
    authorItems: [
      "Use clear column and row headers.",
      "Keep cell content concise and avoid using tables for layout.",
    ],
    focusItems: [
      "Interactive elements inside cells should follow the table reading order.",
      "Do not remove table headers when switching to responsive layouts.",
    ],
    keyboardInteractions: focusRows("responsive table or cell control"),
  },
  "table-of-contents": {
    builtInItems: [
      "Tables of contents provide structured lists of page links.",
      "Links placed in the contents slot keep their native link behaviour.",
    ],
    authorItems: [
      "Use section names that match the headings on the page.",
      "Keep the table of contents updated when sections change.",
    ],
    focusItems: [
      "Users should be able to tab through each contents link in page order.",
      "Do not include links to sections that are hidden or missing.",
    ],
    keyboardInteractions: linkRows("table of contents link"),
  },
  textarea: {
    builtInItems: [
      "Textareas render native textarea controls and connect labels, hint text, and feedback to the control.",
      "The component supports disabled, read-only, required, invalid, and feedback states.",
    ],
    authorItems: [
      "Use a visible label that tells users what to enter.",
      "Use hint text for character limits or formatting expectations.",
    ],
    focusItems: [
      "Focus should move to the textarea in form order.",
      "Keep validation feedback close to the textarea.",
    ],
    keyboardInteractions: [
      ...focusRows("textarea"),
      {
        key: "Text keys",
        description: "Enters or edits text in the textarea.",
      },
      {
        key: "Enter",
        description: "Adds a new line in the textarea.",
      },
    ],
  },
  "thumbnail-card": {
    builtInItems: [
      "Thumbnail cards use card structure with a thumbnail slot and optional stretched-link behaviour.",
      "The card becomes focusable only when it is configured as a stretched link.",
    ],
    authorItems: [
      "Use thumbnail images that support the title or content.",
      "Provide alt text for meaningful thumbnail images.",
    ],
    focusItems: [
      "If the card links somewhere, use one clear destination.",
      "Keep nested actions reachable and clearly labelled.",
    ],
  },
  toast: {
    builtInItems: [
      "Toasts expose their message as an assertive live alert when shown.",
      "Dismissible toasts use the SGDS close button.",
    ],
    authorItems: [
      "Use toast messages for short status updates.",
      "Do not use a toast as the only place for important instructions.",
    ],
    focusItems: [
      "Do not move focus to a toast automatically for routine status updates.",
      "If a toast includes a close button, it should remain reachable without interrupting the task.",
    ],
  },
  tooltip: {
    builtInItems: [
      "Tooltips display supporting text on hover and keyboard focus by default.",
      "The tooltip bubble uses `role=\"tooltip\"`.",
    ],
    authorItems: [
      "Use tooltip content to clarify, not to hide essential instructions.",
      "Keep tooltip text short.",
    ],
    focusItems: [
      "The trigger must be focusable for keyboard users.",
      "Add `tabindex=\"0\"` to non-focusable HTML triggers when they need a tooltip.",
    ],
    keyboardInteractions: focusRows("tooltip trigger"),
  },
};

const getGeneratedAccessibilityProfile = (doc: ComponentDoc): GeneratedAccessibilityProfile => {
  const override = generatedAccessibilityProfileOverrides[doc.key] ?? {};

  return {
    builtInDescription: override.builtInDescription ?? [],
    builtInItems: override.builtInItems ?? [
      "Use the SGDS component instead of recreating the same pattern with custom markup.",
      "Keep component states such as disabled, invalid, active, or expanded in sync with the user interface.",
    ],
    authorDescription: override.authorDescription ?? [],
    authorItems: override.authorItems ?? [
      "Use clear labels, headings, and supporting text.",
      "Do not rely on colour, position, or icon shape as the only way to communicate meaning.",
    ],
    focusDescription: override.focusDescription ?? [],
    focusItems: override.focusItems ?? [
      "Keep interactive content reachable in the normal tab order.",
      "Do not add custom keyboard handling unless the SGDS component does not already support the interaction.",
    ],
    keyboardInteractions: override.keyboardInteractions,
  };
};

const accessibilityDemoMarkupOverrides: Record<string, AccessibilityDemoMarkups> = {
  accordion: {
    builtIn: `<sgds-accordion>
      <sgds-accordion-item open>
        <span slot="header">Expanded section</span>
        <div slot="content">Visible content confirms the current state.</div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <span slot="header">Collapsed section</span>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
    author: `<sgds-accordion>
      <sgds-accordion-item>
        <span slot="header">Application eligibility</span>
        <div slot="content">Check who can apply before you start.</div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <span slot="header">Required documents</span>
        <div slot="content">Prepare the documents you need to upload.</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
    focus: `<sgds-accordion>
      <sgds-accordion-item open>
        <span slot="header">Review the details</span>
        <div slot="content" class="portal-demo-stack-sm">
          <p class="sgds:m-0">Read the guidance, then continue to the next step.</p>
          <sgds-link><a href="#">Read the full guide</a></sgds-link>
        </div>
      </sgds-accordion-item>
      <sgds-accordion-item>
        <span slot="header">Next section</span>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
  },
  alert: {
    builtIn: `<sgds-alert show variant="warning" title="Service unavailable">
      The payment service is unavailable. Try again later.
    </sgds-alert>`,
    author: `<sgds-alert show variant="info" title="Application saved">
      Your progress has been saved. <sgds-alert-link href="#">View draft</sgds-alert-link>
    </sgds-alert>`,
    focus: `<sgds-alert show dismissible variant="success" title="Changes saved">
      You can continue editing this page.
    </sgds-alert>`,
  },
  badge: {
    builtIn: `<div class="portal-demo-row sgds:gap-sm">
      <span>Application status</span>
      <sgds-badge variant="success">Approved</sgds-badge>
    </div>`,
    author: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-badge variant="warning">Pending review</sgds-badge>
      <span>Documents are being checked.</span>
    </div>`,
    focus: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-button variant="outline">View application <sgds-badge slot="rightIcon" variant="neutral">2</sgds-badge></sgds-button>
    </div>`,
  },
  breadcrumb: {
    builtIn: `<sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item active>Passport application</sgds-breadcrumb-item>
    </sgds-breadcrumb>`,
    author: `<sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Housing grants</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item active>Eligibility</sgds-breadcrumb-item>
    </sgds-breadcrumb>`,
    focus: `<sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Profile</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item active>Contact details</sgds-breadcrumb-item>
    </sgds-breadcrumb>`,
  },
  button: {
    builtIn: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-button>Submit application</sgds-button>
      <sgds-button disabled>Submitting</sgds-button>
    </div>`,
    author: `<div class="portal-demo-row"><sgds-button>Pay application fee</sgds-button></div>`,
    focus: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-button variant="outline">Back</sgds-button>
      <sgds-button>Continue</sgds-button>
    </div>`,
  },
  card: {
    builtIn: `<sgds-card class="portal-demo-card">
      <span slot="title">Renew your passport</span>
      <span slot="description">Check the documents you need before applying.</span>
      <sgds-button slot="footer" variant="outline">View details</sgds-button>
    </sgds-card>`,
    author: `<sgds-card class="portal-demo-card">
      <span slot="title">Housing grant</span>
      <span slot="description">Find out if your household is eligible.</span>
      <sgds-button slot="footer">Check eligibility</sgds-button>
    </sgds-card>`,
    focus: `<sgds-card class="portal-demo-card">
      <span slot="title">Application draft</span>
      <span slot="description">Continue where you left off.</span>
      <sgds-button slot="footer">Resume</sgds-button>
    </sgds-card>`,
  },
  checkbox: {
    builtIn: `<sgds-checkbox-group label="Delivery options">
      <sgds-checkbox value="email">Email</sgds-checkbox>
      <sgds-checkbox value="sms">SMS</sgds-checkbox>
    </sgds-checkbox-group>`,
    author: `<sgds-checkbox-group label="Select the documents you have">
      <sgds-checkbox value="nric">NRIC</sgds-checkbox>
      <sgds-checkbox value="proof">Proof of address</sgds-checkbox>
    </sgds-checkbox-group>`,
    focus: `<sgds-checkbox-group label="Notification preferences">
      <sgds-checkbox value="email">Email updates</sgds-checkbox>
      <sgds-checkbox value="sms">SMS updates</sgds-checkbox>
    </sgds-checkbox-group>`,
  },
  "close-button": {
    builtIn: `<div class="portal-demo-row sgds:gap-sm">
      <span>Draft saved</span>
      <sgds-close-button></sgds-close-button>
    </div>`,
    author: `<sgds-alert show dismissible variant="info" title="New message">
      Read this update before continuing.
    </sgds-alert>`,
    focus: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-button variant="outline">Open panel</sgds-button>
      <sgds-close-button></sgds-close-button>
    </div>`,
  },
  "combo-box": {
    builtIn: `<sgds-combo-box placeholder="Search service">
      <sgds-combo-box-option value="housing">Housing</sgds-combo-box-option>
      <sgds-combo-box-option value="transport">Transport</sgds-combo-box-option>
      <sgds-combo-box-option value="health">Health</sgds-combo-box-option>
    </sgds-combo-box>`,
    author: `<sgds-combo-box placeholder="Search by service name">
      <sgds-combo-box-option value="passport">Passport renewal</sgds-combo-box-option>
      <sgds-combo-box-option value="licence">Driving licence</sgds-combo-box-option>
    </sgds-combo-box>`,
    focus: `<sgds-combo-box open placeholder="Search service">
      <sgds-combo-box-option value="passport">Passport renewal</sgds-combo-box-option>
      <sgds-combo-box-option value="tax">Tax filing</sgds-combo-box-option>
    </sgds-combo-box>`,
  },
  datepicker: {
    builtIn: `<sgds-datepicker open placeholder="Select appointment date"></sgds-datepicker>`,
    author: `<div class="portal-demo-stack-sm">
      <label for="appointment-date">Appointment date</label>
      <sgds-datepicker id="appointment-date" placeholder="DD/MM/YYYY"></sgds-datepicker>
      <span class="sgds:text-subtle">Use the format DD/MM/YYYY.</span>
    </div>`,
    focus: `<sgds-datepicker open placeholder="Select appointment date"></sgds-datepicker>`,
  },
  "description-list": {
    builtIn: `<sgds-description-list-group>
      <sgds-description-list term="Application ID">A1234567</sgds-description-list>
      <sgds-description-list term="Status">Pending review</sgds-description-list>
    </sgds-description-list-group>`,
    author: `<sgds-description-list-group>
      <sgds-description-list term="Submission date">23 Apr 2026</sgds-description-list>
      <sgds-description-list term="Officer">Service team</sgds-description-list>
    </sgds-description-list-group>`,
    focus: `<sgds-description-list-group>
      <sgds-description-list term="Reference"><sgds-link><a href="#">View application</a></sgds-link></sgds-description-list>
    </sgds-description-list-group>`,
  },
  divider: {
    builtIn: `<div class="portal-demo-stack-sm">
      <h4 class="sgds:m-0">Personal details</h4>
      <sgds-divider></sgds-divider>
      <h4 class="sgds:m-0">Contact details</h4>
    </div>`,
    author: `<div class="portal-demo-stack-sm">
      <p class="sgds:m-0">Group related content before separating the next section.</p>
      <sgds-divider></sgds-divider>
      <p class="sgds:m-0">Start the next section with a clear heading.</p>
    </div>`,
    focus: `<div class="portal-demo-stack-sm">
      <sgds-link><a href="#">Previous section link</a></sgds-link>
      <sgds-divider></sgds-divider>
      <sgds-link><a href="#">Next section link</a></sgds-link>
    </div>`,
  },
  drawer: {
    builtIn: `<div class="portal-demo-overlay">
      <sgds-drawer open contained size="sm">
        <span slot="title">Edit contact details</span>
        <span slot="description">Update your phone number and email address.</span>
        <sgds-input placeholder="Email address"></sgds-input>
      </sgds-drawer>
    </div>`,
    author: `<div class="portal-demo-overlay">
      <sgds-drawer open contained size="sm">
        <span slot="title">Update address</span>
        <span slot="description">Make changes for this application only.</span>
        <sgds-button slot="footer">Save changes</sgds-button>
      </sgds-drawer>
    </div>`,
    focus: `<div class="portal-demo-overlay">
      <sgds-drawer open contained size="sm">
        <span slot="title">Review details</span>
        <sgds-button slot="footer">Confirm</sgds-button>
      </sgds-drawer>
    </div>`,
  },
  dropdown: {
    builtIn: `<sgds-dropdown>
      <sgds-button slot="toggler" variant="outline">More actions</sgds-button>
      <sgds-dropdown-item><button>Edit</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Download</button></sgds-dropdown-item>
    </sgds-dropdown>`,
    author: `<sgds-dropdown>
      <sgds-button slot="toggler" variant="outline">Application actions</sgds-button>
      <sgds-dropdown-item><button>View details</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Cancel application</button></sgds-dropdown-item>
    </sgds-dropdown>`,
    focus: `<sgds-dropdown open>
      <sgds-button slot="toggler" variant="outline">More actions</sgds-button>
      <sgds-dropdown-item><button>Edit</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Download</button></sgds-dropdown-item>
    </sgds-dropdown>`,
  },
  "file-upload": {
    builtIn: `<sgds-file-upload accept=".pdf,.doc,.docx">Upload document</sgds-file-upload>`,
    author: `<div class="portal-demo-stack-sm">
      <p class="sgds:m-0">Upload a PDF, DOC, or DOCX file. Maximum size: 5 MB.</p>
      <sgds-file-upload accept=".pdf,.doc,.docx">Upload supporting document</sgds-file-upload>
    </div>`,
    focus: `<sgds-file-upload accept=".pdf">Upload PDF</sgds-file-upload>`,
  },
  footer: {
    builtIn: `<sgds-footer>
      <sgds-footer-item slot="items"><a href="#">Contact us</a></sgds-footer-item>
      <sgds-footer-item slot="items"><a href="#">Privacy statement</a></sgds-footer-item>
    </sgds-footer>`,
    author: `<sgds-footer>
      <sgds-footer-item slot="items"><a href="#">Accessibility</a></sgds-footer-item>
      <sgds-footer-item slot="items"><a href="#">Report vulnerability</a></sgds-footer-item>
    </sgds-footer>`,
    focus: `<sgds-footer>
      <sgds-footer-item slot="items"><a href="#">Contact us</a></sgds-footer-item>
      <sgds-footer-item slot="items"><a href="#">Terms of use</a></sgds-footer-item>
    </sgds-footer>`,
  },
  icon: {
    builtIn: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-icon name="info-circle-fill" size="lg"></sgds-icon>
      <span>Information</span>
    </div>`,
    author: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
      <span>Application approved</span>
    </div>`,
    focus: `<sgds-button><sgds-icon slot="leftIcon" name="search"></sgds-icon>Search</sgds-button>`,
  },
  "icon-list": {
    builtIn: `<sgds-icon-list>
      <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle-fill"></sgds-icon><span>Bring your NRIC</span></div>
      <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle-fill"></sgds-icon><span>Prepare proof of address</span></div>
    </sgds-icon-list>`,
    author: `<sgds-icon-list>
      <div role="listitem" class="portal-demo-list-item"><sgds-icon name="info-circle-fill"></sgds-icon><span>Each item remains clear without the icon.</span></div>
    </sgds-icon-list>`,
    focus: `<sgds-icon-list>
      <div role="listitem" class="portal-demo-list-item"><sgds-icon name="link"></sgds-icon><sgds-link><a href="#">Read eligibility details</a></sgds-link></div>
    </sgds-icon-list>`,
  },
  "icon-button": {
    builtIn: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-icon-button name="search" ariaLabel="Search services"></sgds-icon-button>
      <sgds-icon-button name="three-dots" ariaLabel="More actions"></sgds-icon-button>
    </div>`,
    author: `<sgds-icon-button name="trash" ariaLabel="Delete document"></sgds-icon-button>`,
    focus: `<div class="portal-demo-row sgds:gap-sm">
      <span>Document.pdf</span>
      <sgds-icon-button name="trash" ariaLabel="Delete Document.pdf"></sgds-icon-button>
    </div>`,
  },
  "icon-card": {
    builtIn: `<sgds-icon-card class="portal-demo-card">
      <sgds-icon slot="icon" name="house"></sgds-icon>
      <span slot="title">Housing services</span>
      <span slot="description">Find grants and eligibility guidance.</span>
    </sgds-icon-card>`,
    author: `<sgds-icon-card class="portal-demo-card">
      <sgds-icon slot="icon" name="file-text"></sgds-icon>
      <span slot="title">Application forms</span>
      <span slot="description">Download the forms you need.</span>
    </sgds-icon-card>`,
    focus: `<sgds-icon-card class="portal-demo-card" href="#">
      <sgds-icon slot="icon" name="arrow-right-circle"></sgds-icon>
      <span slot="title">Continue application</span>
    </sgds-icon-card>`,
  },
  "image-card": {
    builtIn: `<sgds-image-card class="portal-demo-card">
      <img slot="image" src="/landing/card-media-placement.svg" alt="">
      <span slot="title">Community support</span>
      <span slot="description">Find help available near you.</span>
    </sgds-image-card>`,
    author: `<sgds-image-card class="portal-demo-card">
      <img slot="image" src="/landing/card-media-placement.svg" alt="">
      <span slot="title">Apply for support</span>
      <span slot="description">Check eligibility before applying.</span>
    </sgds-image-card>`,
    focus: `<sgds-image-card class="portal-demo-card" href="#">
      <img slot="image" src="/landing/card-media-placement.svg" alt="">
      <span slot="title">View support schemes</span>
    </sgds-image-card>`,
  },
  input: {
    builtIn: `<sgds-input placeholder="Search services"><sgds-icon slot="icon" name="search"></sgds-icon></sgds-input>`,
    author: `<div class="portal-demo-stack-sm">
      <label for="postal-code">Postal code</label>
      <sgds-input id="postal-code" placeholder="For example, 123456"></sgds-input>
      <span class="sgds:text-subtle">Enter a 6-digit postal code.</span>
    </div>`,
    focus: `<sgds-input placeholder="Search services"><sgds-icon slot="trailing-icon" name="x-circle"></sgds-icon></sgds-input>`,
  },
  link: {
    builtIn: `<sgds-link><a href="#">Read eligibility guidance</a></sgds-link>`,
    author: `<p class="sgds:m-0">Before applying, <sgds-link><a href="#">check the required documents</a></sgds-link>.</p>`,
    focus: `<div class="portal-demo-stack-sm">
      <sgds-link><a href="#">Previous step</a></sgds-link>
      <sgds-link><a href="#">Continue application</a></sgds-link>
    </div>`,
  },
  mainnav: {
    builtIn: `<div class="portal-demo-nav">
      <sgds-mainnav>
        <sgds-mainnav-item><a href="#">Services</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="#">Contact</a></sgds-mainnav-item>
      </sgds-mainnav>
    </div>`,
    author: `<div class="portal-demo-nav">
      <sgds-mainnav>
        <sgds-mainnav-item><a href="#">Benefits</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="#">Applications</a></sgds-mainnav-item>
      </sgds-mainnav>
    </div>`,
    focus: `<div class="portal-demo-nav">
      <sgds-mainnav>
        <sgds-mainnav-item><a href="#">Home</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="#">Services</a></sgds-mainnav-item>
      </sgds-mainnav>
    </div>`,
  },
  masthead: {
    builtIn: `<div class="portal-demo-nav"><sgds-masthead fluid></sgds-masthead></div>`,
    author: `<div class="portal-demo-nav"><sgds-masthead fluid></sgds-masthead></div>`,
    focus: `<div class="portal-demo-nav"><sgds-masthead fluid></sgds-masthead></div>`,
  },
  modal: {
    builtIn: `<div class="portal-modal-preview">
      <sgds-modal open>
        <span slot="title">Confirm submission</span>
        <p>Check your details before submitting.</p>
      </sgds-modal>
    </div>`,
    author: `<div class="portal-modal-preview">
      <sgds-modal open>
        <span slot="title">Delete draft?</span>
        <p>This draft will be removed from your applications.</p>
        <sgds-button slot="footer" variant="danger">Delete draft</sgds-button>
      </sgds-modal>
    </div>`,
    focus: `<div class="portal-modal-preview">
      <sgds-modal open>
        <span slot="title">Review application</span>
        <sgds-button slot="footer">Confirm</sgds-button>
      </sgds-modal>
    </div>`,
  },
  "overflow-menu": {
    builtIn: `<sgds-overflow-menu>
      <sgds-dropdown-item><button>Rename</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Download</button></sgds-dropdown-item>
    </sgds-overflow-menu>`,
    author: `<sgds-overflow-menu>
      <sgds-dropdown-item><button>View details</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Cancel application</button></sgds-dropdown-item>
    </sgds-overflow-menu>`,
    focus: `<sgds-overflow-menu open>
      <sgds-dropdown-item><button>Rename</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Download</button></sgds-dropdown-item>
    </sgds-overflow-menu>`,
  },
  pagination: {
    builtIn: `<sgds-pagination currentPage="2" dataLength="120" itemsPerPage="10" variant="number"></sgds-pagination>`,
    author: `<sgds-pagination currentPage="5" dataLength="120" itemsPerPage="10" variant="number"></sgds-pagination>`,
    focus: `<sgds-pagination currentPage="2" dataLength="120" itemsPerPage="10" variant="number"></sgds-pagination>`,
  },
  "progress-bar": {
    builtIn: `<sgds-progress-bar value="64" label="Submission progress"></sgds-progress-bar>`,
    author: `<div class="portal-demo-stack-sm">
      <sgds-progress-bar value="3" max="4" label="Step 3 of 4"></sgds-progress-bar>
      <span class="sgds:text-subtle">Uploading supporting documents.</span>
    </div>`,
    focus: `<div class="portal-demo-stack-sm">
      <sgds-progress-bar value="64" label="Submission progress"></sgds-progress-bar>
      <sgds-link><a href="#">Cancel upload</a></sgds-link>
    </div>`,
  },
  "quantity-toggle": {
    builtIn: `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
    author: `<div class="portal-demo-stack-sm">
      <label for="ticket-count">Number of tickets</label>
      <sgds-quantity-toggle id="ticket-count" value="2" min="0" max="5"></sgds-quantity-toggle>
    </div>`,
    focus: `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
  },
  radio: {
    builtIn: `<sgds-radio-group label="Preferred contact method" value="email">
      <sgds-radio value="email">Email</sgds-radio>
      <sgds-radio value="sms">SMS</sgds-radio>
    </sgds-radio-group>`,
    author: `<sgds-radio-group label="Choose one delivery method" value="post">
      <sgds-radio value="post">Postal mail</sgds-radio>
      <sgds-radio value="pickup">Self collection</sgds-radio>
    </sgds-radio-group>`,
    focus: `<sgds-radio-group label="Preferred contact method" value="email">
      <sgds-radio value="email">Email</sgds-radio>
      <sgds-radio value="sms">SMS</sgds-radio>
    </sgds-radio-group>`,
  },
  select: {
    builtIn: `<sgds-select open placeholder="Choose a service">
      <sgds-select-option value="passport">Passport</sgds-select-option>
      <sgds-select-option value="licence">Driving licence</sgds-select-option>
    </sgds-select>`,
    author: `<sgds-select placeholder="Choose a service">
      <sgds-select-option value="passport">Passport renewal</sgds-select-option>
      <sgds-select-option value="licence">Driving licence</sgds-select-option>
    </sgds-select>`,
    focus: `<sgds-select open placeholder="Choose a service">
      <sgds-select-option value="passport">Passport</sgds-select-option>
      <sgds-select-option value="licence">Driving licence</sgds-select-option>
    </sgds-select>`,
  },
  sidenav: {
    builtIn: `<div class="portal-demo-nav-sm">
      <sgds-sidenav>
        <sgds-sidenav-item active>
          <span slot="title">Applications</span>
          <sgds-sidenav-link active><a href="#">Current applications</a></sgds-sidenav-link>
          <sgds-sidenav-link><a href="#">Past applications</a></sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav>
    </div>`,
    author: `<div class="portal-demo-nav-sm">
      <sgds-sidenav>
        <sgds-sidenav-link><a href="#">Dashboard</a></sgds-sidenav-link>
        <sgds-sidenav-link active><a href="#">Profile</a></sgds-sidenav-link>
      </sgds-sidenav>
    </div>`,
    focus: `<div class="portal-demo-nav-sm">
      <sgds-sidenav>
        <sgds-sidenav-item active>
          <span slot="title">Services</span>
          <sgds-sidenav-link><a href="#">Housing</a></sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav>
    </div>`,
  },
  skeleton: {
    builtIn: `<div class="portal-demo-stack-sm">
      <sgds-skeleton></sgds-skeleton>
      <sgds-skeleton></sgds-skeleton>
    </div>`,
    author: `<div class="portal-demo-stack-sm">
      <sgds-skeleton></sgds-skeleton>
      <span class="sgds:text-subtle">Loading application details...</span>
    </div>`,
    focus: `<div class="portal-demo-stack-sm">
      <sgds-skeleton></sgds-skeleton>
      <sgds-button variant="outline">Cancel loading</sgds-button>
    </div>`,
  },
  spinner: {
    builtIn: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-spinner></sgds-spinner>
      <span>Loading results</span>
    </div>`,
    author: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-spinner></sgds-spinner>
      <span>Submitting your application...</span>
    </div>`,
    focus: `<div class="portal-demo-row sgds:gap-sm">
      <sgds-spinner></sgds-spinner>
      <sgds-button variant="outline">Cancel</sgds-button>
    </div>`,
  },
  stepper: {
    builtIn: `<div class="portal-demo-stepper">
      <sgds-stepper activeStep="2">
        <sgds-stepper-item stepHeader="Personal details"></sgds-stepper-item>
        <sgds-stepper-item stepHeader="Upload documents"></sgds-stepper-item>
        <sgds-stepper-item stepHeader="Review"></sgds-stepper-item>
      </sgds-stepper>
    </div>`,
    author: `<div class="portal-demo-stepper">
      <sgds-stepper activeStep="2">
        <sgds-stepper-item stepHeader="Details"></sgds-stepper-item>
        <sgds-stepper-item stepHeader="Documents"></sgds-stepper-item>
        <sgds-stepper-item stepHeader="Submit"></sgds-stepper-item>
      </sgds-stepper>
    </div>`,
    focus: `<div class="portal-demo-stepper">
      <sgds-stepper activeStep="2">
        <sgds-stepper-item stepHeader="Details"></sgds-stepper-item>
        <sgds-stepper-item stepHeader="Documents"></sgds-stepper-item>
      </sgds-stepper>
    </div>`,
  },
  subnav: {
    builtIn: `<div class="portal-demo-nav">
      <sgds-subnav>
        <sgds-subnav-item><a href="#">Overview</a></sgds-subnav-item>
        <sgds-subnav-item><a href="#">Eligibility</a></sgds-subnav-item>
      </sgds-subnav>
    </div>`,
    author: `<div class="portal-demo-nav">
      <sgds-subnav>
        <sgds-subnav-item><a href="#">Overview</a></sgds-subnav-item>
        <sgds-subnav-item><a href="#">Required documents</a></sgds-subnav-item>
      </sgds-subnav>
    </div>`,
    focus: `<div class="portal-demo-nav">
      <sgds-subnav>
        <sgds-subnav-item><a href="#">Overview</a></sgds-subnav-item>
        <sgds-subnav-item><a href="#">Apply</a></sgds-subnav-item>
      </sgds-subnav>
    </div>`,
  },
  switch: {
    builtIn: `<sgds-switch checked>Email notifications</sgds-switch>`,
    author: `<sgds-switch checked>Send me SMS updates</sgds-switch>`,
    focus: `<div class="portal-demo-stack-sm">
      <sgds-switch checked>Email notifications</sgds-switch>
      <span class="sgds:text-subtle">Changes take effect immediately.</span>
    </div>`,
  },
  "system-banner": {
    builtIn: `<sgds-system-banner show>
      <span slot="title">Maintenance tonight</span>
      <span slot="description">Some services may be unavailable from 11pm.</span>
    </sgds-system-banner>`,
    author: `<sgds-system-banner show>
      <span slot="title">Service update</span>
      <span slot="description">Submit applications before 10pm today.</span>
    </sgds-system-banner>`,
    focus: `<sgds-system-banner show dismissible>
      <span slot="title">Maintenance tonight</span>
      <span slot="description">Dismiss this message after reading.</span>
    </sgds-system-banner>`,
  },
  tab: {
    builtIn: `<sgds-tab-group variant="underlined">
      <sgds-tab slot="nav" panel="overview" active>Overview</sgds-tab>
      <sgds-tab slot="nav" panel="documents">Documents</sgds-tab>
      <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
      <sgds-tab-panel name="documents">Document content</sgds-tab-panel>
    </sgds-tab-group>`,
    author: `<sgds-tab-group variant="underlined">
      <sgds-tab slot="nav" panel="summary" active>Summary</sgds-tab>
      <sgds-tab slot="nav" panel="history">History</sgds-tab>
      <sgds-tab-panel name="summary">Current application details</sgds-tab-panel>
      <sgds-tab-panel name="history">Past updates</sgds-tab-panel>
    </sgds-tab-group>`,
    focus: `<sgds-tab-group variant="underlined">
      <sgds-tab slot="nav" panel="one" active>Details</sgds-tab>
      <sgds-tab slot="nav" panel="two">Documents</sgds-tab>
      <sgds-tab-panel name="one"><sgds-link><a href="#">Edit details</a></sgds-link></sgds-tab-panel>
      <sgds-tab-panel name="two">Document list</sgds-tab-panel>
    </sgds-tab-group>`,
  },
  table: {
    builtIn: `<sgds-table
      rowHeader='["Name","Status"]'
      tableData='[["Application A","Pending"],["Application B","Approved"]]'
      headerBackground
      tableBorder
    ></sgds-table>`,
    author: `<sgds-table
      rowHeader='["Application","Status","Updated"]'
      tableData='[["Passport renewal","Pending","23 Apr 2026"],["Grant application","Approved","22 Apr 2026"]]'
      headerBackground
      tableBorder
    ></sgds-table>`,
    focus: `<sgds-table
      rowHeader='["Document","Action"]'
      tableData='[["NRIC","View"],["Proof of address","Download"]]'
      headerBackground
      tableBorder
      responsive="always"
    ></sgds-table>`,
  },
  "table-of-contents": {
    builtIn: `<sgds-table-of-contents>
      <a href="#overview">Overview</a>
      <a href="#eligibility">Eligibility</a>
      <a href="#apply">Apply</a>
    </sgds-table-of-contents>`,
    author: `<sgds-table-of-contents>
      <a href="#required-documents">Required documents</a>
      <a href="#fees">Fees</a>
      <a href="#processing-time">Processing time</a>
    </sgds-table-of-contents>`,
    focus: `<sgds-table-of-contents>
      <a href="#overview">Overview</a>
      <a href="#next-steps">Next steps</a>
    </sgds-table-of-contents>`,
  },
  textarea: {
    builtIn: `<sgds-textarea rows="4" placeholder="Add supporting details"></sgds-textarea>`,
    author: `<div class="portal-demo-stack-sm">
      <label for="reason">Reason for appeal</label>
      <sgds-textarea id="reason" rows="4" placeholder="Explain what happened"></sgds-textarea>
      <span class="sgds:text-subtle">Include dates, reference numbers, and supporting details.</span>
    </div>`,
    focus: `<sgds-textarea rows="4" placeholder="Add supporting details"></sgds-textarea>`,
  },
  "thumbnail-card": {
    builtIn: `<sgds-thumbnail-card class="portal-demo-card">
      <img slot="thumbnail" src="/landing/card-media-placement.svg" alt="">
      <span slot="title">Required documents</span>
      <span slot="description">Prepare files before starting.</span>
    </sgds-thumbnail-card>`,
    author: `<sgds-thumbnail-card class="portal-demo-card">
      <img slot="thumbnail" src="/landing/card-media-placement.svg" alt="">
      <span slot="title">Proof of address</span>
      <span slot="description">Upload a recent utility bill or bank statement.</span>
    </sgds-thumbnail-card>`,
    focus: `<sgds-thumbnail-card class="portal-demo-card" href="#">
      <img slot="thumbnail" src="/landing/card-media-placement.svg" alt="">
      <span slot="title">View document guide</span>
    </sgds-thumbnail-card>`,
  },
  toast: {
    builtIn: `<sgds-toast show title="Saved" variant="success">
      Your application has been saved.
    </sgds-toast>`,
    author: `<sgds-toast show title="Upload complete" variant="success">
      Document.pdf has been uploaded.
    </sgds-toast>`,
    focus: `<sgds-toast show dismissible title="Saved" variant="success">
      Continue editing your application.
    </sgds-toast>`,
  },
  tooltip: {
    builtIn: `<sgds-tooltip content="Your Singpass name will be used for this application." trigger="hover focus">
      <sgds-button variant="outline">Why we need this</sgds-button>
    </sgds-tooltip>`,
    author: `<sgds-tooltip content="Maximum file size is 5 MB." trigger="hover focus">
      <sgds-button variant="outline">File size</sgds-button>
    </sgds-tooltip>`,
    focus: `<sgds-tooltip content="More details about this action" trigger="hover focus">
      <sgds-button variant="outline">More information</sgds-button>
    </sgds-tooltip>`,
  },
};

const buildAccessibilitySections = (doc: ComponentDoc): AccessibilitySection[] => {
  const demoMarkups = accessibilityDemoMarkupOverrides[doc.key] ?? {};

  if (doc.accessibility && "sections" in doc.accessibility) {
    return (doc.accessibility.sections ?? []).map((section) => ({
      ...section,
      markup:
        section.markup
        ?? (section.title === "Built-in accessibility"
          ? demoMarkups.builtIn
          : section.title === "Labels and content"
            ? demoMarkups.author
            : section.title === "Focus and interaction"
              ? demoMarkups.focus
              : undefined),
    }));
  }

  const profile = getGeneratedAccessibilityProfile(doc);

  return [
    {
      title: "Built-in accessibility",
      description: profile.builtInDescription,
      items: profile.builtInItems,
      markup: demoMarkups.builtIn,
    },
    {
      title: "Labels and content",
      description: profile.authorDescription,
      items: profile.authorItems,
      markup: demoMarkups.author,
    },
    {
      title: "Focus and interaction",
      description: profile.focusDescription,
      items: profile.focusItems,
      markup: demoMarkups.focus,
    },
  ];
};

const buildAccessibilityKeyboardRows = (doc: ComponentDoc): AccessibilityKeyboardRow[] => {
  if (doc.accessibility?.keyboardInteractions?.length) return doc.accessibility.keyboardInteractions;

  return getGeneratedAccessibilityProfile(doc).keyboardInteractions ?? [];
};

const keyboardNoteOverrides: Record<string, string[]> = {
  alert: [
    "The alert container is a status region, not a keyboard control.",
    "Links or close buttons inside an alert use their own native keyboard behaviour.",
  ],
  badge: [
    "Badges are visual labels for status, count, or category information.",
    "They should not receive focus unless they are part of another interactive control.",
  ],
  card: [
    "Cards do not define a keyboard pattern on their own.",
    "Keyboard behaviour depends on the links, buttons, or stretched-link pattern placed inside the card.",
  ],
  "description-list": [
    "Description lists are structural content for term and detail pairs.",
    "Keyboard interaction only applies to links, buttons, or controls placed inside a value.",
  ],
  divider: [
    "Dividers are visual separators and should not receive focus.",
    "Use headings or labels to communicate the structure that the divider separates.",
  ],
  icon: [
    "Icons are visual symbols and should not receive focus on their own.",
    "Keyboard behaviour belongs to the parent button, link, or control that contains the icon.",
  ],
  "icon-card": [
    "Icon cards do not define a keyboard pattern on their own.",
    "Keyboard behaviour depends on whether the card is configured as a link or contains interactive elements.",
  ],
  "icon-list": [
    "Icon lists are structured content with supporting icons.",
    "Keyboard interaction only applies when list items contain links or controls.",
  ],
  "image-card": [
    "Image cards do not define a keyboard pattern on their own.",
    "Keyboard behaviour depends on whether the card is configured as a link or contains interactive elements.",
  ],
  "progress-bar": [
    "Progress bars communicate status and usually should not receive focus.",
    "Keyboard interaction belongs to any related control, such as a cancel or retry button.",
  ],
  skeleton: [
    "Skeletons are loading placeholders and should not receive focus.",
    "If loading takes time, provide status text or a related control outside the skeleton.",
  ],
  spinner: [
    "Spinners are loading indicators and should not receive focus.",
    "Keyboard interaction belongs to any related control, such as a cancel or retry button.",
  ],
  "thumbnail-card": [
    "Thumbnail cards do not define a keyboard pattern on their own.",
    "Keyboard behaviour depends on whether the card is configured as a link or contains interactive elements.",
  ],
  toast: [
    "Toast messages are status updates and should not take focus automatically.",
    "Dismissible toasts use the close button's native keyboard behaviour.",
  ],
};

const buildAccessibilityKeyboardNotes = (doc: ComponentDoc, keyboardInteractions: AccessibilityKeyboardRow[]): string[] => {
  if (keyboardInteractions.length) return [];
  if (doc.accessibility?.keyboardNotes?.length) return doc.accessibility.keyboardNotes;

  return keyboardNoteOverrides[doc.key] ?? [
    `${doc.title} does not define a separate keyboard pattern on its own.`,
    "Keyboard interaction only applies to links, buttons, or controls placed inside the component.",
  ];
};

const buildResolvedAccessibility = (doc: ComponentDoc): AccessibilityContent => {
  const keyboardInteractions = buildAccessibilityKeyboardRows(doc);

  return {
    sections: buildAccessibilitySections(doc),
    keyboardInteractions,
    keyboardNotes: buildAccessibilityKeyboardNotes(doc, keyboardInteractions),
  };
};

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
