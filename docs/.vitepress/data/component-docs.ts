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

export type AnatomyVariant = {
  label: string;
  value: string;
  markup: string;
  parts: AnatomyInput[];
  callouts: AnatomyCallout[];
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
  usage?: string;
  variant?: string;
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
  mapKey?: string;
  usage?: string;
  // Optional variant label (e.g. "Underlined", "Solid", "Compact density"). Rendered
  // as a small chip in the "Where it's used" column so users can see at a glance
  // which variant a token applies to without parsing prose.
  variant?: string;
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
  /**
   * Which control the demo renders to switch between options. Defaults to
   * "segmented" (the shared SegmentedControl). Use "select" when the option
   * count is too high for a comfortable segmented layout (e.g. 5+ numeric
   * values). Use "number" for typed numeric values, with a `{{value}}`
   * placeholder in the first option's markup.
   */
  controlType?: "segmented" | "select" | "number";
  range?: {
    min: number;
    max: number;
    step?: number;
    unit?: string;
  };
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

type AccessibilityDemoMarkups = Partial<
  Record<"builtIn" | "author" | "focus", string>
>;

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
  anatomyPreviewMarkup?: string;
  anatomyVariants?: AnatomyVariant[];
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
   *  - extra-compact: 180px. For very small components (breadcrumb, badge)
   *  - compact:       240px. For small components (link, icon-button)
   *  - default:       376px. Baseline
   *  - tall:          480px. For large components (datepicker, modal, stepper)
   */
  playgroundSize?: "extra-compact" | "compact" | "default" | "tall";
  usage?: UsageContent;
  accessibility?: AccessibilityContent;
  updates?: UpdatesContent;
  props?: ComponentProp[];
  codeExample?: string;
  accessibilityNotes?: string[];
  releaseRows?: UpdatesRow[];
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
  {
    secondTitle: string;
    secondDescription: string;
    thirdTitle: string;
    thirdDescription: string;
  }
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
      "Use list patterns to break content into consistent, scannable units.",
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
  (parts && parts.length
    ? parts
    : [{ title: "Container" }, { title: "Core content" }]
  ).map((part, index) => ({
    number: index + 1,
    ...part,
  }));

const demo = (
  title: string,
  description: string,
  markup: string,
): ComponentDemo => ({
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
        title: "Hide supporting content",
        description: "Show headings first, then let users expand the details they need.",
      },
      {
        title: "Help users scan sections",
        description: "Use clear headings so users can compare topics before opening a panel.",
      },
      {
        title: "Keep details in context",
        description: "Expanded content stays directly under its heading, so the relationship remains clear.",
      },
    ],
    anatomyMarkup: `<div class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)] sgds:mx-auto">
      <sgds-accordion variant="border" class="portal-anatomy-accordion">
        <sgds-accordion-item class="portal-anatomy-accordion-item" open ariaLabel="Accordion title">
          <sgds-icon slot="icon" class="portal-anatomy-accordion-icon" name="info-circle-fill"></sgds-icon>
          <span slot="header" class="portal-anatomy-accordion-title">Accordion title</span>
          <sgds-badge slot="badge" class="portal-anatomy-accordion-badge" variant="neutral" outlined>Badge</sgds-badge>
          <div slot="content" class="portal-anatomy-accordion-content">Accordion content</div>
        </sgds-accordion-item>
        <sgds-accordion-item ariaLabel="Second section">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          <span slot="header">Second section</span>
          <div slot="content">Accordion content</div>
        </sgds-accordion-item>
      </sgds-accordion>
    </div>`,
    anatomyParts: [
      { title: "Title" },
      { title: "Indicator", note: "(chevron)" },
      { title: "Content panel", note: "(slot)" },
      { title: "Divider" },
      { title: "Leading icon", note: "(optional)" },
      { title: "Badge", note: "(optional)" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "top",
        targetSelector: ".portal-anatomy-accordion-title",
        targetX: "center",
        targetY: "top",
        stemLengthToken: "--sgds-dimension-56",
      },
      {
        number: 2,
        direction: "right",
        targetSelector: ".portal-anatomy-accordion-item",
        targetShadowSelector: ".accordion-header__trailing",
        targetX: "right",
        targetY: "center",
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-anatomy-accordion-content",
        targetX: "left",
        targetY: "center",
        stemLengthToken: "--sgds-dimension-64",
        alignBadgeWithCallout: 4,
      },
      {
        number: 4,
        direction: "left",
        targetSelector: ".portal-anatomy-accordion-item",
        targetShadowSelector: ".accordion-item",
        targetX: "left",
        targetY: "bottom",
      },
      {
        number: 5,
        direction: "top",
        targetSelector: ".portal-anatomy-accordion-icon",
        targetX: "center",
        targetY: "top",
        stemLengthToken: "--sgds-dimension-56",
      },
      {
        number: 6,
        direction: "top",
        targetSelector: ".portal-anatomy-accordion-badge",
        targetX: "center",
        targetY: "top",
        stemLengthToken: "--sgds-dimension-56",
      },
    ],
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-accordion variant="border">
          <sgds-accordion-item open ariaLabel="Accordion title">
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
        usage: "Background colour of the hover variant",
      },
      {
        mapKey: "title-color",
        category: "Colour",
        element: "",
        property: "title-color",
        designToken: "sgds/color-default",
        rawValue: "#1A1A1A",
        usage: "Text colour of the title",
      },
      {
        mapKey: "icon-color",
        category: "Colour",
        element: "",
        property: "icon-color",
        designToken: "sgds/color-subtle",
        rawValue: "#525252",
        usage: "Text colour of the icon",
      },
      {
        mapKey: "gap",
        category: "Gap",
        element: "Gap",
        property: "gap",
        designToken: "sgds/gap/md",
        rawValue: "16px",
        usage: "Spacing between items inside the accordion",
      },
      {
        mapKey: "border-color",
        category: "Border",
        element: "Border",
        property: "border-color",
        designToken: "sgds/border-color-muted",
        rawValue: "#DFDFDF",
        usage: "Colour of the border around the accordion",
      },
      {
        mapKey: "border-width",
        category: "Border",
        element: "",
        property: "border-width",
        designToken: "sgds/border-width/1",
        rawValue: "1px",
        usage: "Thickness of the border around the accordion",
      },
      {
        mapKey: "border-radius",
        category: "Border",
        element: "",
        property: "border-radius",
        designToken: "sgds/border-radius/md",
        rawValue: "8px",
        usage: "Corner radius of the accordion",
      },
    ],
    measurementTokenGroups: [
      {
        title: "sgds / accordion",
        tokens: [
          {
            mapKey: "padding-x-default",
            category: "Padding",
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
            variant: "default",
            usage: "Space between the left and right edges of the component and its content",
          },
          {
            mapKey: "padding-y-default",
            category: "Padding",
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/lg",
            rawValue: "20px",
            variant: "default",
            usage: "Space between the top and bottom edges of the component and its content",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
            variant: "default",
            usage: "Top padding of the accordion",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "",
            property: "padding-bottom",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "default",
            usage: "Bottom padding of the accordion",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "",
            property: "padding-x",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "default",
            usage: "Left and right padding of accordion content",
          },
          {
            mapKey: "padding-x-default",
            category: "Padding",
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "compact",
            usage: "Space between the left and right edges of the component and its content",
          },
          {
            mapKey: "padding-y-default",
            category: "Padding",
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "compact",
            usage: "Space between the top and bottom edges of the component and its content",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
            variant: "compact",
            usage: "Top padding of the accordion",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "",
            property: "padding-bottom",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "compact",
            usage: "Bottom padding of the accordion",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "",
            property: "padding-x",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "compact",
            usage: "Left and right padding of accordion content",
          },
          {
            mapKey: "padding-x-default",
            category: "Padding",
            element: "Padding",
            property: "padding-x",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
            variant: "spacious",
            usage: "Space between the left and right edges of the component and its content",
          },
          {
            mapKey: "padding-y-default",
            category: "Padding",
            element: "",
            property: "padding-y",
            designToken: "sgds/padding/xl",
            rawValue: "24px",
            variant: "spacious",
            usage: "Space between the top and bottom edges of the component and its content",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "Content padding",
            property: "padding-top",
            designToken: "sgds/padding/xs",
            rawValue: "4px",
            variant: "spacious",
            usage: "Top padding of the accordion",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "",
            property: "padding-bottom",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "spacious",
            usage: "Bottom padding of the accordion",
          },
          {
            mapKey: "content-padding",
            category: "Padding",
            element: "",
            property: "padding-x",
            designToken: "sgds/padding/md",
            rawValue: "16px",
            variant: "spacious",
            usage: "Left and right padding of accordion content",
          },
          { category: "Typography", element: "Typography", property: "font-size-body-md", designToken: "sgds/font-size/body-md", usage: "Font size inherited by the accordion host" },
          { category: "Typography", element: "", property: "font-size-body-sm", designToken: "sgds/font-size/body-sm", usage: "Font size of compact accordion body text" },
          { category: "Typography", element: "", property: "font-size-heading-sm", designToken: "sgds/font-size/heading-sm", usage: "Font size of spacious accordion heading text" },
          { category: "Typography", element: "", property: "font-size-subtitle-md", designToken: "sgds/font-size/subtitle-md", usage: "Font size of default accordion heading text" },
          { category: "Typography", element: "", property: "font-size-subtitle-sm", designToken: "sgds/font-size/subtitle-sm", usage: "Font size of compact accordion heading text" },
          { category: "Typography", element: "", property: "font-weight-semibold", designToken: "sgds/font-weight/semibold", usage: "Font weight of the accordion heading" },
          { category: "Typography", element: "", property: "letter-spacing-tight", designToken: "sgds/letter-spacing/tight", usage: "Letter spacing of the accordion heading" },
          { category: "Typography", element: "", property: "line-height-2-xs", designToken: "sgds/line-height/2-xs", usage: "Line height of compact accordion text" },
          { category: "Typography", element: "", property: "line-height-sm", designToken: "sgds/line-height/sm", usage: "Line height of spacious accordion heading text" },
          { category: "Typography", element: "", property: "line-height-xs", designToken: "sgds/line-height/xs", usage: "Line height of default accordion text" },
          { category: "Outline", element: "Focus", property: "outline-focus", designToken: "sgds/outline-focus", usage: "Focus outline of the accordion header" },
          { category: "Outline", element: "", property: "outline-offset-focus", designToken: "sgds/outline-offset-focus", usage: "Focus outline offset of the accordion header" },
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
        usage: "Used by the background colour",
      },
      {
        mapKey: "leading-icon-color",
        category: "Colour",
        element: "Icon colour",
        property: "",
        designToken: "sgds/color-default",
        rawValue: "#1A1A1A",
        usage: "Text colour of the leading icon",
      },
    ],
    demos: [
      {
        ...demo(
          "Size",
          "The accordion offers default, compact, and spacious density options to adapt to different contexts.",
          `<div class="portal-demo-stack">
          <sgds-accordion>
            <sgds-accordion-item ariaLabel="Default">
              <span slot="header">Default</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>
          <sgds-accordion density="compact">
            <sgds-accordion-item ariaLabel="Compact">
              <span slot="header">Compact</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>
          <sgds-accordion density="spacious">
            <sgds-accordion-item ariaLabel="Spacious">
              <span slot="header">Spacious</span>
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
          <sgds-accordion-item ariaLabel="Accordion title">
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item ariaLabel="Accordion title">
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
        </sgds-accordion>`,
      ),
      demo(
        "Start slot",
        "The start slot is an optional area placed before the accordion title. It is intended for identifiers or visual anchors that help users recognise the type or context of the content at a glance.\n\nThis slot should stay visually balanced and not contain interactive elements.",
        `<sgds-accordion>
          <sgds-accordion-item ariaLabel="Accordion title">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item ariaLabel="Accordion title">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <span slot="header">Accordion title</span>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item ariaLabel="Accordion title">
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
          <sgds-accordion-item ariaLabel="Accordion title">
            <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
              <span>Accordion title</span>
              <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
            </div>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item ariaLabel="Accordion title">
            <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
              <span>Accordion title</span>
              <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
            </div>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
          <sgds-accordion-item ariaLabel="Accordion title">
            <div slot="header" style="align-items:center;display:flex;justify-content:space-between;width:100%;">
              <span>Accordion title</span>
              <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
            </div>
            <div slot="content">Accordion content</div>
          </sgds-accordion-item>
        </sgds-accordion>`,
      ),
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Accordion variant controls whether the group is rendered as a plain list or with an enclosing border.",
        controlLabel: "Accordion variant options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item open ariaLabel="Application details">
                <span slot="header">Application details</span>
                <div slot="content">Review your saved application details.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use the default variant when the accordion sits naturally in page content.",
          },
          {
            label: "Border",
            value: "border",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]" variant="border">
              <sgds-accordion-item open ariaLabel="Application details">
                <span slot="header">Application details</span>
                <div slot="content">Review your saved application details.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use the border variant when the accordion needs clearer separation from surrounding content.",
          },
        ],
      },
      {
        title: "Density",
        description:
          "Accordion density adjusts the spacing inside each item to suit compact or roomy layouts.",
        controlLabel: "Accordion density options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item open ariaLabel="Default density">
                <span slot="header">Default density</span>
                <div slot="content">Use for most page layouts.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description: "Use for most accordions.",
          },
          {
            label: "Compact",
            value: "compact",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]" density="compact">
              <sgds-accordion-item open ariaLabel="Compact density">
                <span slot="header">Compact density</span>
                <div slot="content">Use where vertical space is limited.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description: "Use in dense panels, tables, or sidebars.",
          },
          {
            label: "Spacious",
            value: "spacious",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]" density="spacious">
              <sgds-accordion-item open ariaLabel="Spacious density">
                <span slot="header">Spacious density</span>
                <div slot="content">Use where the accordion needs more breathing room.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description: "Use in content-heavy pages with generous spacing.",
          },
        ],
      },
      {
        title: "Multiple open items",
        description:
          "Use allowMultiple when users may need to compare content across more than one section.",
        controlLabel: "Accordion multiple open options",
        defaultValue: "single",
        options: [
          {
            label: "Single",
            value: "single",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item open ariaLabel="Eligibility">
                <span slot="header">Eligibility</span>
                <div slot="content">Only one item remains open.</div>
              </sgds-accordion-item>
              <sgds-accordion-item ariaLabel="Documents">
                <span slot="header">Documents</span>
                <div slot="content">Supporting details.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use the default single-open behaviour when each item is read independently.",
          },
          {
            label: "Multiple",
            value: "multiple",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]" allowMultiple>
              <sgds-accordion-item open ariaLabel="Eligibility">
                <span slot="header">Eligibility</span>
                <div slot="content">Users can keep this section open.</div>
              </sgds-accordion-item>
              <sgds-accordion-item open ariaLabel="Documents">
                <span slot="header">Documents</span>
                <div slot="content">Users can compare this with eligibility.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use when comparing expanded details is useful to the task.",
          },
        ],
      },
      {
        title: "Item state",
        description:
          "Accordion items can be opened by default or disabled when a section is not available.",
        controlLabel: "Accordion item state options",
        defaultValue: "open",
        options: [
          {
            label: "Open",
            value: "open",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item open ariaLabel="Open item">
                <span slot="header">Open item</span>
                <div slot="content">This panel is expanded by default.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use an open item when one section needs to be surfaced immediately.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item disabled ariaLabel="Disabled item">
                <span slot="header">Disabled item</span>
                <div slot="content">Unavailable content.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use disabled only when the item is temporarily unavailable and that state is explained nearby.",
          },
        ],
      },
      {
        title: "Icon and badge",
        description:
          "Accordion items support icon and badge slots for compact status or category cues.",
        controlLabel: "Accordion slot options",
        defaultValue: "with-slots",
        options: [
          {
            label: "With slots",
            value: "with-slots",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item open ariaLabel="Application status">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <span slot="header">Application status</span>
                <sgds-badge slot="badge" variant="success">Ready</sgds-badge>
                <div slot="content">The status badge stays close to the section label.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description:
              "Use icon and badge slots only when they add useful recognition or status.",
          },
          {
            label: "Text only",
            value: "text-only",
            markup: `<sgds-accordion class="sgds:w-full sgds:max-w-[var(--sgds-dimension-480)]">
              <sgds-accordion-item open ariaLabel="Application status">
                <span slot="header">Application status</span>
                <div slot="content">Keep the item simple when text is enough.</div>
              </sgds-accordion-item>
            </sgds-accordion>`,
            description: "Use text-only items when no extra visual cue is needed.",
          },
        ],
      },
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
            <sgds-accordion-item open ariaLabel="What is design system?">
              <span slot="header">What is design system?</span>
              <div slot="content">It is a shared set of principles, tokens, and components used to build consistent interfaces.</div>
            </sgds-accordion-item>
            <sgds-accordion-item ariaLabel="How does the accordion behave?">
              <span slot="header">How does the accordion behave?</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
            <sgds-accordion-item ariaLabel="Can multiple items open?">
              <span slot="header">Can multiple items open?</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        ),
        {
          ...demo(
            "Size",
            "Use default, compact, or spacious density depending on the surrounding layout and information density.",
            `<div class="portal-demo-stack">
              <sgds-accordion>
                <sgds-accordion-item ariaLabel="Default">
                  <span slot="header">Default</span>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
              <sgds-accordion density="compact">
                <sgds-accordion-item ariaLabel="Compact">
                  <span slot="header">Compact</span>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
              <sgds-accordion density="spacious">
                <sgds-accordion-item ariaLabel="Spacious">
                  <span slot="header">Spacious</span>
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
                <sgds-accordion-item ariaLabel="With start slot">
                  <div slot="header" class="portal-demo-list-item">
                    <sgds-icon name="grid"></sgds-icon>
                    <span>With start slot</span>
                  </div>
                  <div slot="content">Accordion content</div>
                </sgds-accordion-item>
              </sgds-accordion>
              <sgds-accordion>
                <sgds-accordion-item ariaLabel="With end slot">
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
            <sgds-accordion-item ariaLabel="First item">
              <span slot="header">First item</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
            <sgds-accordion-item ariaLabel="Second item">
              <span slot="header">Second item</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
            <sgds-accordion-item ariaLabel="Third item">
              <span slot="header">Third item</span>
              <div slot="content">Accordion content</div>
            </sgds-accordion-item>
          </sgds-accordion>`,
        ),
      ],
      contentGuidelines: [
        {
          title: "Use sentence case",
          description: "This keeps titles scannable.",
          tone: "do",
          markup: `<sgds-accordion>
            <sgds-accordion-item ariaLabel="What is your return policy?">
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
            <sgds-accordion-item ariaLabel="WHAT IS YOUR RETURN POLICY?">
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
            <sgds-accordion-item ariaLabel="Application eligibility"><span slot="header">Application eligibility</span><div slot="content">Accordion content</div></sgds-accordion-item>
            <sgds-accordion-item ariaLabel="Required documents"><span slot="header">Required documents</span><div slot="content">Accordion content</div></sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Do not use long titles",
          description: "Move supporting detail into the panel content.",
          tone: "dont",
          markup: `<sgds-accordion>
            <sgds-accordion-item ariaLabel="This is a very long accordion title that makes the list harder to scan and understand quickly"><span slot="header">This is a very long accordion title that makes the list harder to scan and understand quickly</span><div slot="content">Accordion content</div></sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Match content to the title",
          description: "Users should get what the heading promises.",
          tone: "do",
          markup: `<sgds-accordion>
            <sgds-accordion-item open ariaLabel="What is your return policy?">
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
            <sgds-accordion-item open ariaLabel="What is your return policy?">
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
            <sgds-accordion-item ariaLabel="Payment details"><span slot="header">Payment details</span><div slot="content">Accordion content</div></sgds-accordion-item>
            <sgds-accordion-item ariaLabel="Supporting information"><span slot="header">Supporting information</span><div slot="content">Accordion content</div></sgds-accordion-item>
            <sgds-accordion-item ariaLabel="Declarations"><span slot="header">Declarations</span><div slot="content">Accordion content</div></sgds-accordion-item>
          </sgds-accordion>`,
        },
        {
          title: "Do not nest accordions",
          description: "Multiple layers make navigation harder.",
          tone: "dont",
          markup: `<sgds-accordion>
            <sgds-accordion-item open ariaLabel="Parent accordion">
              <span slot="header">Parent accordion</span>
              <div slot="content">
                <sgds-accordion>
                  <sgds-accordion-item ariaLabel="Nested accordion">
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
  <sgds-accordion-item open ariaLabel="Accordion title">
    <span slot="header">Accordion title</span>
    <div slot="content">Accordion content</div>
  </sgds-accordion-item>
  <sgds-accordion-item ariaLabel="Accordion title">
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
          description:
            "Moves focus to the next accordion header or interactive element in the expanded content.",
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
        linkLabel: "Slack → #ask-sgds-v3",
        href: "https://govtech.slack.com/archives/C07VD8Z5QKS",
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
      "Alerts provide short, timely, and relevant information for your users. It can be a plain text message or customised HTML content with paragraphs, headings, and links.",
    purposeCards: [
      {
        title: "Show timely messages",
        description: "Use alerts for information that affects the task or page the user is viewing.",
      },
      {
        title: "Make severity clear",
        description: "Choose info, success, warning, danger, or neutral to match the message.",
      },
      {
        title: "Keep users on the page",
        description: "Inline alerts sit with the content, so users can read the message and continue.",
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
      { number: 1, direction: "left", targetSelector: ".portal-alert-anatomy-demo", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "top", targetSelector: ".portal-alert-anatomy-demo", targetShadowSelector: ".alert-title", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 4, direction: "bottom", targetSelector: ".portal-alert-description", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-64" },
      { number: 5, direction: "top", targetSelector: ".portal-alert-anatomy-demo", targetShadowSelector: "sgds-close-button", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "The alert offers variants to convey a different level of importance.",
        controlLabel: "Alert variant options",
        defaultValue: "info",
        options: [
          {
            label: "Info",
            value: "info",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="info" title="Info alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="info" outlined title="Info alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description:
              "Use to provide general context or neutral information, such as announcements or guidance that do not indicate a status outcome, in either filled or outlined style.",
          },
          {
            label: "Success",
            value: "success",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="success" title="Success alert">
                <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
                <div>Your application has been submitted successfully. <sgds-alert-link href="#">View confirmation</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="success" outlined title="Success alert">
                <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
                <div>Your application has been submitted successfully. <sgds-alert-link href="#">View confirmation</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description:
              "Use to confirm that an action or process has completed successfully, reassuring users that their input was accepted in either filled or outlined style.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="danger" title="Danger alert">
                <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
                <div>We could not save your changes because the session expired. <sgds-alert-link href="#">Sign in again</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="danger" outlined title="Danger alert">
                <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
                <div>We could not save your changes because the session expired. <sgds-alert-link href="#">Sign in again</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description:
              "Use to communicate errors or critical failures that require immediate attention. Reserve for situations that could block the user, in either filled or outlined style.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="warning" title="Warning alert">
                <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
                <div>Some required documents are missing from your application. <sgds-alert-link href="#">Check requirements</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="warning" outlined title="Warning alert">
                <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
                <div>Some required documents are missing from your application. <sgds-alert-link href="#">Check requirements</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description:
              "Use to flag potential issues that may need attention without blocking the user from proceeding, in either filled or outlined style.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<div class="portal-demo-stack">
              <sgds-alert show variant="neutral" title="Neutral alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>This service will save your progress automatically while you complete the form. <sgds-alert-link href="#">Learn more</sgds-alert-link></div>
              </sgds-alert>
              <sgds-alert show variant="neutral" outlined title="Neutral alert">
                <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
                <div>This service will save your progress automatically while you complete the form. <sgds-alert-link href="#">Learn more</sgds-alert-link></div>
              </sgds-alert>
            </div>`,
            description:
              "Use when the message carries no particular status or urgency, such as notices or reminders, in either filled or outlined style.",
          },
        ],
      },
      {
        title: "Style",
        description: "The alert supports two styles, filled and outlined.",
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
            description:
              "Use filled alerts when the message needs stronger visual emphasis, such as higher-priority updates or messages users should notice immediately.",
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
            description:
              "Use outlined alerts for messages that should stay visible with less visual weight. They work well as the default style when the message does not need to dominate the page.",
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
            description:
              "Use for persistent messages that must remain visible, such as system statuses or warnings the user needs to act on.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<sgds-alert show dismissible variant="info" title="A dismissible alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>You can dismiss this message after reading the update. <sgds-alert-link href="#">View update</sgds-alert-link></div>
            </sgds-alert>`,
            description:
              "Use for non-critical messages the user can close after reading, such as informational banners or one-time notices.",
          },
        ],
      },
      {
        title: "Icon",
        description:
          "Alerts may include an icon to reinforce meaning. The icon should support, not replace, the message text.",
        controlLabel: "Alert icon options",
        defaultValue: "with-icon",
        options: [
          {
            label: "Icon",
            value: "with-icon",
            markup: `<sgds-alert show variant="info" title="Application received">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>We have received your application and will send updates to your registered email address.</div>
            </sgds-alert>`,
            description:
              "Use to reinforce the alert's meaning with a recognisable visual cue. The icon should support, not replace, the message text.",
          },
          {
            label: "No icon",
            value: "no-icon",
            markup: `<sgds-alert show variant="info" title="Application received">
              <div>We have received your application and will send updates to your registered email address.</div>
            </sgds-alert>`,
            description:
              "Use when the message is self-explanatory or when a minimal, text-only appearance is preferred.",
          },
        ],
      },
      {
        title: "Title",
        description:
          "Alerts can include a title to summarise the message and provide hierarchy, especially for longer or more complex content.",
        controlLabel: "Alert title options",
        defaultValue: "with-title",
        options: [
          {
            label: "Title",
            value: "with-title",
            markup: `<sgds-alert show variant="info" title="Draft saved">
              <div>Your draft has been saved and you can continue editing it before submission.</div>
            </sgds-alert>`,
            description:
              "Use when the alert contains longer or more detailed content that benefits from a clear summary heading.",
          },
          {
            label: "No title",
            value: "no-title",
            markup: `<sgds-alert show variant="info">
              <div>Your draft has been saved and you can continue editing it before submission.</div>
            </sgds-alert>`,
            description:
              "Use for short, single-line messages that scan without an additional heading.",
          },
        ],
      },
      {
        title: "Slot",
        description:
          "The default slot can contain supplementary content such as links or supporting actions, as long as the message stays clear and scannable.",
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
            description:
              "Use when the alert message is complete without extra supporting content.",
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
            description:
              "Use the default slot to include supplementary content such as links, descriptions, or supporting actions below the main message.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Style",
        "The alert supports two styles, filled and outlined.",
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
        "The default slot can contain supplementary content such as links or supporting actions, as long as the message stays clear and scannable.",
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
        description:
          "Enables a close button that allows the user to dismiss the alert.",
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
        description:
          "Controls the alert visual between a lighter outline and a solid darker variant.",
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
          { category: "Padding", name: "padding-x", value: "sgds/padding/lg", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/lg", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "content-padding-right", value: "sgds/padding/2-xl", usage: "Right padding of the alert content" },
          { category: "Gap", name: "gap", value: "sgds/gap/sm", usage: "Spacing between items of the alert" },
          { category: "Gap", name: "title-gap", value: "sgds/gap/2-xs", usage: "Spacing between items of the alert content upper" },
          { category: "Gap", name: "content-gap", value: "sgds/gap/md", usage: "Spacing between items of the alert content" },
          { name: "border-width", value: "sgds/border-width/1", usage: "Border of the alert" },
          { name: "border-radius", value: "sgds/border-radius/md", usage: "Corner radius of the alert" },
          { category: "Typography", name: "font-size-body-sm", value: "sgds/font-size/body-sm", usage: "Font size of alert body text and alert link text" },
          { category: "Typography", name: "font-size-subtitle-sm", value: "sgds/font-size/subtitle-sm", usage: "Font size of the alert title" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight of alert body text and alert link text" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the alert title" },
          { category: "Typography", name: "line-height-2-xs", value: "sgds/line-height/2-xs", usage: "Line height of alert body text, title, and link text" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the alert link" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus outline offset of the alert link" },
        ],
      },
    ],
    semanticTokenGroups: [
      {
        title: "sgds / alert / info",
        rows: [
          { name: "bg-emphasis", value: "sgds/primary/surface-default", usage: "Background colour of the alert" },
          { name: "bg-muted", value: "sgds/primary/surface-muted", usage: "Background colour of the alert" },
          { name: "border-color", value: "sgds/primary/border-color-muted", usage: "Border of the alert" },
        ],
      },
      {
        title: "sgds / alert / success",
        rows: [
          { name: "bg-emphasis", value: "sgds/success/surface-default", usage: "Background colour of the alert" },
          { name: "bg-muted", value: "sgds/success/surface-muted", usage: "Background colour of the alert" },
          { name: "border-color", value: "sgds/success/border-color-muted", usage: "Border of the alert" },
          {
            name: "bg-emphasis",
            value: "sgds/warning/surface-default",
            usage: "Background colour of the alert",
          },
          {
            name: "bg-muted",
            value: "sgds/warning/surface-muted",
            usage: "Background colour of the alert",
          },
          {
            name: "border-color",
            value: "sgds/warning/border-color-muted",
            usage: "Border of the alert",
          },
        ],
      },
      {
        title: "sgds / alert / neutral",
        rows: [
          { name: "bg-emphasis", value: "sgds/neutral/surface-emphasis", usage: "Background colour of the alert" },
          { name: "bg-muted", value: "sgds/neutral/surface-muted", usage: "Background colour of the alert" },
          { name: "border-color", value: "sgds/neutral/border-color-muted", usage: "Border of the alert" },
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
          items: ["Icons should reinforce meaning, not duplicate it."],
        },
        {
          title: "Action",
          items: [
            "Use a clear link or action only when it helps users resolve or understand the alert.",
          ],
        },
      ],
      bestPractices: [
        {
          title: "Match the alert to the message",
          description: "Use the variant that reflects the message severity so users can understand the status quickly.",
          tone: "do",
          markup: `<sgds-alert show variant="info" title="Info alert">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            <div>Review the latest guidance before submitting your application. <sgds-alert-link href="#">Read the details</sgds-alert-link></div>
          </sgds-alert>`,
        },
        {
          title: "Do not flood the page with alerts",
          description: "Too many alerts compete with the page content. Prioritise the message users need most.",
          tone: "dont",
          markup: `<div class="portal-demo-stack-sm">
            <sgds-alert show outlined variant="info" title="Info alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>Review the latest guidance before submitting your application.</div>
            </sgds-alert>
            <sgds-alert show outlined variant="warning" title="Warning alert">
              <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
              <div>Check your documents before you continue.</div>
            </sgds-alert>
            <sgds-alert show outlined variant="danger" title="Danger alert">
              <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
              <div>We could not save one part of the form.</div>
            </sgds-alert>
            <sgds-alert show outlined variant="success" title="Success alert">
              <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
              <div>Your progress will be saved automatically.</div>
            </sgds-alert>
            <sgds-alert show outlined variant="neutral" title="Neutral alert">
              <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
              <div>This service keeps drafts for 30 days.</div>
            </sgds-alert>
          </div>`,
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
      "Badges highlight short pieces of information such as labels, notifications, and status.",
    purposeCards: [
      {
        title: "Add short labels",
        description: "Use badges for compact status, category, or count labels.",
      },
      {
        title: "Show status quickly",
        description: "Colour variants help users scan states such as active, warning, or danger.",
      },
      {
        title: "Support dense layouts",
        description: "Badges add meaning beside text while keeping rows and cards compact.",
      },
    ],
    anatomyMarkup: `<div class="portal-demo-row"><sgds-badge class="portal-anatomy-badge"><sgds-icon slot="icon" name="star-fill" size="sm"></sgds-icon><span class="portal-anatomy-badge-label">Badge label</span></sgds-badge></div>`,
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.default,
      defaultPartTitleMap.icon,
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-badge", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-badge-label", targetX: "right", targetY: "center" },
      { number: 3, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-24" },
    ],
    configurationDemos: [
      {
        title: "Variants",
        description:
          "Badge variants use colour to convey meaning at a glance. Each variant signals a different status or category.",
        controlLabel: "Badge variant options",
        defaultValue: "neutral",
        options: [
          {
            label: "Neutral",
            value: "neutral",
            markup: `<div class="portal-demo-row"><sgds-badge variant="neutral">Neutral</sgds-badge><sgds-badge variant="neutral" outlined>Neutral</sgds-badge></div>`,
            description:
              "The default tone for generic labels with no particular status weight. Use when the badge is purely informational, whether you need a stronger filled style or a quieter outlined style.",
          },
          {
            label: "Primary",
            value: "primary",
            markup: `<div class="portal-demo-row"><sgds-badge variant="primary">Primary</sgds-badge><sgds-badge variant="primary" outlined>Primary</sgds-badge></div>`,
            description:
              "Uses the brand tone. Use for labels that should align with the primary identity of the interface in either filled or outlined form.",
          },
          {
            label: "Accent",
            value: "accent",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent">Accent</sgds-badge><sgds-badge variant="accent" outlined>Accent</sgds-badge></div>`,
            description:
              "An alternative emphasis tone. Use to distinguish a small group of labels without relying on a status colour, in either a filled or outlined treatment.",
          },
          {
            label: "Success",
            value: "success",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success">Success</sgds-badge><sgds-badge variant="success" outlined>Success</sgds-badge></div>`,
            description:
              "Use to signal a positive state such as completed, approved, or active, with either strong or subtle emphasis.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<div class="portal-demo-row"><sgds-badge variant="warning">Warning</sgds-badge><sgds-badge variant="warning" outlined>Warning</sgds-badge></div>`,
            description:
              "Use to flag items needing attention without blocking the user (for example, pending review or nearing a threshold) in filled or outlined form.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<div class="portal-demo-row"><sgds-badge variant="danger">Danger</sgds-badge><sgds-badge variant="danger" outlined>Danger</sgds-badge></div>`,
            description:
              "Use to communicate an error, failure, or critical state that should draw the user's attention immediately, whether as a filled or outlined badge.",
          },
          {
            label: "Cyan",
            value: "cyan",
            markup: `<div class="portal-demo-row"><sgds-badge variant="cyan">Cyan</sgds-badge><sgds-badge variant="cyan" outlined>Cyan</sgds-badge></div>`,
            description:
              "A supplementary category tone. Use to differentiate labels when a status colour is not appropriate, in either filled or outlined style.",
          },
          {
            label: "Purple",
            value: "purple",
            markup: `<div class="portal-demo-row"><sgds-badge variant="purple">Purple</sgds-badge><sgds-badge variant="purple" outlined>Purple</sgds-badge></div>`,
            description:
              "Another supplementary category tone. Pair with cyan to separate two or more non-status categories, with filled and outlined options available.",
          },
          {
            label: "White",
            value: "white",
            markup: `<div class="portal-demo-row portal-demo-row-inverse"><sgds-badge variant="white">White</sgds-badge><sgds-badge variant="white" outlined>White</sgds-badge></div>`,
            description:
              "Use on dark or coloured backgrounds where the other variants would lack contrast, in either filled or outlined form.",
          },
        ],
      },
      {
        title: "Outlined",
        description:
          "Controls whether the badge uses a filled or outlined style. Outlined gives the badge a lighter visual presence.",
        controlLabel: "Badge outlined options",
        defaultValue: "filled",
        options: [
          {
            label: "Filled",
            value: "filled",
            markup: `<div class="portal-demo-row portal-demo-row-center">
              <sgds-badge variant="neutral">Neutral</sgds-badge>
              <sgds-badge variant="primary">Primary</sgds-badge>
              <sgds-badge variant="accent">Accent</sgds-badge>
              <sgds-badge variant="success">Success</sgds-badge>
              <sgds-badge variant="warning">Warning</sgds-badge>
              <sgds-badge variant="danger">Danger</sgds-badge>
              <sgds-badge variant="cyan">Cyan</sgds-badge>
              <sgds-badge variant="purple">Purple</sgds-badge>
            </div>`,
            description:
              "The default filled style uses a solid background. Use when badges need to read strongly at a glance across the full variant set.",
          },
          {
            label: "Outlined",
            value: "outlined",
            markup: `<div class="portal-demo-row portal-demo-row-center">
              <sgds-badge variant="neutral" outlined>Neutral</sgds-badge>
              <sgds-badge variant="primary" outlined>Primary</sgds-badge>
              <sgds-badge variant="accent" outlined>Accent</sgds-badge>
              <sgds-badge variant="success" outlined>Success</sgds-badge>
              <sgds-badge variant="warning" outlined>Warning</sgds-badge>
              <sgds-badge variant="danger" outlined>Danger</sgds-badge>
              <sgds-badge variant="cyan" outlined>Cyan</sgds-badge>
              <sgds-badge variant="purple" outlined>Purple</sgds-badge>
            </div>`,
            description:
              "The outlined style uses a border with a subtle fill. Use when badges should feel quieter alongside dense content across the full variant set.",
          },
        ],
      },
      {
        title: "Dismissible",
        description:
          "Add a close button when the user should be able to remove the badge. For example, active filters or removable tags.",
        controlLabel: "Badge dismissible options",
        defaultValue: "static",
        options: [
          {
            label: "Static",
            value: "static",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent">Filter</sgds-badge></div>`,
            description:
              "Use when the badge is informational only and should not be removed by the user.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<div class="portal-demo-row"><sgds-badge variant="accent" dismissible show>Filter</sgds-badge></div>`,
            description:
              "Renders a close button. Use for active filters, selected tags, or any context where the user should be able to remove the label.",
          },
        ],
      },
      {
        title: "Icon",
        description:
          "Pair the badge with an icon when a visual cue helps users recognise meaning faster than the text alone.",
        controlLabel: "Badge icon options",
        defaultValue: "with-icon",
        options: [
          {
            label: "With icon",
            value: "with-icon",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success"><sgds-icon slot="icon" name="check-circle-fill" size="sm"></sgds-icon>Active</sgds-badge></div>`,
            description:
              "Add an icon through the icon slot. Use small, recognisable icons that reinforce the badge's meaning without competing with the label.",
          },
          {
            label: "Without icon",
            value: "without-icon",
            markup: `<div class="portal-demo-row"><sgds-badge variant="success">Active</sgds-badge></div>`,
            description:
              "Use when the text label is enough to convey the badge's meaning.",
          },
        ],
      },
      {
        title: "Full width",
        description:
          "Use full width when the badge needs to align to the width of its container.",
        controlLabel: "Badge full width options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="sgds:flex sgds:w-full sgds:justify-center">
              <sgds-badge variant="neutral">Application review in progress</sgds-badge>
            </div>`,
            description: "Use the default width for short inline labels.",
          },
          {
            label: "Full width",
            value: "full-width",
            markup: `<div class="sgds:flex sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:justify-center">
              <sgds-badge variant="neutral" fullWidth>Application review in progress</sgds-badge>
            </div>`,
            description:
              "Use fullWidth when the badge is part of a stacked layout or needs to fill a narrow container.",
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
    measurements: [
      {
        title: "",
        description: "",
        markup: `<div class="portal-demo-row">
          <sgds-badge outlined dismissible show>Badge</sgds-badge>
        </div>`,
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds / badge",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/xs", mapKey: "padding-x", usage: "Space between the left and right edges of the badge container and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/none", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content; also removes right padding when dismissible" },
          { category: "Padding", name: "padding-3-xs", value: "sgds/padding/3-xs", usage: "Space between the left and right edges of the badge label and its content" },
          { category: "Border", name: "border-radius-sm", value: "sgds/border-radius/sm", mapKey: "border-radius", usage: "Corner radius of the badge; corner radius of the sgds close button" },
          { category: "Border", name: "close-btn-border-radius", value: "sgds/close-btn/border-radius", usage: "Corner radius alias used by the dismissible close button" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Border of the badge" },
          { category: "Border", name: "primary-border-color-muted", value: "sgds/primary/border-color/muted", usage: "Border of the badge" },
          { category: "Typography", name: "font-size-label-xs", value: "sgds/font-size/label-xs", usage: "Font size of the badge" },
          { category: "Typography", name: "line-height-3-xs", value: "sgds/line-height/3-xs", usage: "Line height of the badge" },
          { category: "Size", name: "dimension-192", value: "sgds/dimension/192", usage: "Maximum width before the badge label truncates" },
          { category: "Size", name: "dimension-24", value: "sgds/dimension/24", usage: "Height of the badge" },
          { category: "Colour", name: "primary-color-fixed-dark", value: "sgds/primary/color-fixed/dark", usage: "Text colour of the badge" },
          { category: "Colour", name: "primary-surface-muted", value: "sgds/primary/surface/muted", usage: "Background colour of the badge" },
        ],
      },
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
        title: "Show page location",
        description: "Breadcrumbs show where the current page sits in the site structure.",
      },
      {
        title: "Link to parent pages",
        description: "Each previous level is a link, so users can move back up quickly.",
      },
      {
        title: "Support deep navigation",
        description: "Use breadcrumbs when users may land inside a deep or nested section.",
      },
    ],
    anatomyMarkup: `<sgds-breadcrumb>
      <sgds-breadcrumb-item class="portal-anatomy-breadcrumb-page-link"><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Fees</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">Refunds</a></sgds-breadcrumb-item>
    </sgds-breadcrumb>`,
    anatomyParts: [
      { title: "Page link" },
      { title: "Separator" },
      { title: "Overflow link" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: "sgds-breadcrumb",
        targetShadowSelector: ".portal-anatomy-breadcrumb-page-link a",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "top",
        targetSelector: "sgds-breadcrumb",
        targetShadowSelector: ".breadcrumb sgds-breadcrumb-item:first-child >>> .separator",
        targetX: "center",
        targetY: "center",
        targetYOffset: -3,
      },
      {
        number: 3,
        direction: "bottom",
        targetSelector: "sgds-breadcrumb",
        targetShadowSelector: "sgds-overflow-menu",
        targetX: "center",
        targetY: "bottom",
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds / breadcrumb",
        rows: [
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items inside the component; spacing between items of the breadcrumb" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", usage: "Size of breadcrumb separators and overflow icon" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the content when active; text colour of the content on hover and when active" },
          { category: "Colour", name: "color-subtle", value: "sgds/color-subtle", usage: "Text colour of the separator" },
        ],
      },
    ],
    semanticTokenGroups: [
      {
        title: "sgds / breadcrumb",
        rows: [
          { category: "Colour", name: "icon-color", value: "sgds/body-color-default", usage: "Text colour of the component" },
          { category: "Colour", name: "page-link-color", value: "sgds/link-color-default", usage: "Text colour of the component" },
          { category: "Colour", name: "page-link-color-emphasis", value: "sgds/link-color-emphasis", usage: "Text colour of the component" },
          { category: "Colour", name: "current-page-color", value: "sgds/color-default", usage: "Text colour of the content when active; text colour of the content on hover and when active" },
          { category: "Background", name: "overflow-bg", value: "sgds/bg-transparent", usage: "Value used by the component" },
          { category: "Background", name: "overflow-bg-hover", value: "sgds/bg-translucent-subtle", usage: "Value used by the component" },
        ],
      },
    ],
    configurationDemos: [
      {
        title: "Number of links",
        description:
          "Control how many breadcrumb items are shown. When 5 or more items are present, the middle items automatically collapse into an overflow menu placed as the second link.",
        controlLabel: "Number of links",
        controlType: "select",
        defaultValue: "3",
        options: [
          {
            label: "1",
            value: "1",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description:
              "A single-item breadcrumb only marks the current page.",
          },
          {
            label: "2",
            value: "2",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description:
              "Use two items when the current page sits one level below the root.",
          },
          {
            label: "3",
            value: "3",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description:
              "Three items show a typical nested path from the root to the current page.",
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
            description:
              "Four items are the maximum shown in full before the overflow menu kicks in.",
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
            description:
              "At five items, the breadcrumb automatically collapses the middle items into an overflow menu placed in the second position.",
          },
        ],
      },
      {
        title: "Overflow",
        description:
          "When there are too many links, overflow can be applied by collapsing items into an ellipsis to prevent visual clutter.",
        controlLabel: "Breadcrumb overflow options",
        defaultValue: "off",
        options: [
          {
            label: "Off",
            value: "off",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Fees</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description:
              "With four or fewer items, every link stays visible. No ellipsis is needed.",
          },
          {
            label: "On",
            value: "on",
            markup: `<sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Fees</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Refunds</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>`,
            description:
              "With five or more items, middle links collapse into an ellipsis overflow menu placed in the second position.",
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
    usage: {
      bestPractices: [
        {
          title: "Keep the current page as the last step",
          description:
            "All earlier breadcrumb items should link back to previous levels, while the final item represents the current page.",
          tone: "do",
          markup: `<sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Category</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item active>Current page</sgds-breadcrumb-item>
          </sgds-breadcrumb>`,
        },
        {
          title: "Use overflow on longer trails",
          description:
            "When the hierarchy gets deeper, let the breadcrumb collapse middle levels into the built-in overflow menu.",
          tone: "do",
          markup: `<sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Services</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Payments</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Property tax</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item active>Appeal outcome</sgds-breadcrumb-item>
          </sgds-breadcrumb>`,
        },
        {
          title: "Use specific, meaningful labels",
          description:
            "Breadcrumb labels should match the page structure closely so users can predict where each level leads.",
          tone: "do",
          markup: `<sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Property for sale</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item active>HDB for sale</sgds-breadcrumb-item>
          </sgds-breadcrumb>`,
        },
        {
          title: "Do not use generic labels",
          description:
            "Generic names such as 'Page 1' and 'Page 2' do not help users understand the content or structure.",
          tone: "dont",
          markup: `<sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Page 1</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item active>Page 2</sgds-breadcrumb-item>
          </sgds-breadcrumb>`,
        },
        {
          title: "Do not use breadcrumb for the wrong hierarchy",
          description:
            "Breadcrumbs should reflect the actual site or service structure, not a temporary journey or task sequence.",
          tone: "dont",
          markup: `<sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Search results</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Filtered results</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item active>Current page</sgds-breadcrumb-item>
          </sgds-breadcrumb>`,
        },
        {
          title: "Do not leave intermediate crumbs inactive",
          description:
            "Every breadcrumb item before the current page should work as a link back to that level.",
          tone: "dont",
          markup: `<sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item>Services</sgds-breadcrumb-item>
            <sgds-breadcrumb-item>Payments</sgds-breadcrumb-item>
            <sgds-breadcrumb-item active>Current page</sgds-breadcrumb-item>
          </sgds-breadcrumb>`,
        },
      ],
    },
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
        title: "Start an action",
        description: "Use buttons for actions such as submitting, saving, opening, or confirming.",
      },
      {
        title: "Show action hierarchy",
        description: "Variants help users identify the main action and secondary choices.",
      },
      {
        title: "Cover common states",
        description: "Loading, `disabled`, and focus states keep button behaviour predictable.",
      },
    ],
    anatomyMarkup: `<div class="portal-demo-row"><sgds-button class="portal-anatomy-button"><sgds-icon slot="leftIcon" name="house"></sgds-icon><span class="portal-anatomy-button-label">Button label</span><sgds-icon slot="rightIcon" name="chevron-right"></sgds-icon></sgds-button></div>`,
    anatomyParts: [
      { title: "Container" },
      { title: "Label" },
      defaultPartTitleMap.leftIcon,
      defaultPartTitleMap.rightIcon,
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-button", targetX: "left", targetY: "center" },
      { number: 2, direction: "bottom", targetSelector: ".portal-anatomy-button-label", targetX: "center", targetY: "bottom" },
      { number: 3, direction: "top", targetSelector: "sgds-icon[slot='leftIcon']", targetX: "center", targetY: "top" },
      { number: 4, direction: "right", targetSelector: "sgds-icon[slot='rightIcon']", targetX: "right", targetY: "center" },
    ],
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-button class="portal-structure-button" variant="outline">
          <sgds-icon slot="leftIcon" name="house"></sgds-icon>
          Button label
          <sgds-icon slot="rightIcon" name="chevron-right"></sgds-icon>
        </sgds-button>`,
      },
    ],
    measurementTokens: [
      { mapKey: "border-radius", category: "Border", element: "Border", property: "border-radius", designToken: "sgds/border-radius/md", rawValue: "8px", usage: "Corner radius of the button" },
      { mapKey: "border-width", category: "Border", element: "", property: "border-width", designToken: "sgds/border-width/1", rawValue: "1px", usage: "Thickness of the border around the button" },
      { mapKey: "gap", category: "Gap", element: "Gap", property: "gap", designToken: "sgds/gap/2-xs", rawValue: "4px", usage: "Spacing between items inside the button" },
    ],
    measurementTokenGroups: [
      {
        title: "sgds / button",
        tokens: [
          { mapKey: "padding-x", category: "Padding", element: "Padding", property: "padding-x", designToken: "sgds/padding/sm", rawValue: "12px", variant: "xs", usage: "Space between the left and right edges of the component and its content" },
          { mapKey: "height", category: "Size", element: "Size", property: "height", designToken: "sgds/dimension/32", rawValue: "32px", variant: "xs", usage: "Height of the button" },
          { mapKey: "min-width", category: "Size", element: "", property: "min-width", designToken: "sgds/dimension/64", rawValue: "64px", variant: "xs", usage: "Minimum width of the button" },
          { mapKey: "font-size", category: "Typography", element: "Typography", property: "font-size", designToken: "sgds/font-size/label-xs", rawValue: "12px", variant: "xs", usage: "Font size of the button" },
          { mapKey: "line-height", category: "Typography", element: "", property: "line-height", designToken: "sgds/line-height/3-xs", rawValue: "16px", variant: "xs", usage: "Line height of the button" },
          { mapKey: "padding-x", category: "Padding", element: "Padding", property: "padding-x", designToken: "sgds/padding/md", rawValue: "16px", variant: "sm", usage: "Space between the left and right edges of the component and its content" },
          { mapKey: "height", category: "Size", element: "Size", property: "height", designToken: "sgds/dimension/40", rawValue: "40px", variant: "sm", usage: "Height of the button" },
          { mapKey: "min-width", category: "Size", element: "", property: "min-width", designToken: "sgds/dimension/80", rawValue: "80px", variant: "sm", usage: "Minimum width of the button" },
          { mapKey: "font-size", category: "Typography", element: "Typography", property: "font-size", designToken: "sgds/font-size/label-sm", rawValue: "14px", variant: "sm", usage: "Font size of the button" },
          { mapKey: "line-height", category: "Typography", element: "", property: "line-height", designToken: "sgds/line-height/2-xs", rawValue: "20px", variant: "sm", usage: "Line height of the button" },
          { mapKey: "padding-x", category: "Padding", element: "Padding", property: "padding-x", designToken: "sgds/padding/lg", rawValue: "20px", variant: "md", usage: "Space between the left and right edges of the component and its content" },
          { mapKey: "height", category: "Size", element: "Size", property: "height", designToken: "sgds/dimension/48", rawValue: "48px", variant: "md", usage: "Height of the button" },
          { mapKey: "min-width", category: "Size", element: "", property: "min-width", designToken: "sgds/dimension/96", rawValue: "96px", variant: "md", usage: "Minimum width of the button" },
          { mapKey: "font-size", category: "Typography", element: "Typography", property: "font-size", designToken: "sgds/font-size/label-md", rawValue: "16px", variant: "md", usage: "Font size of the button" },
          { mapKey: "line-height", category: "Typography", element: "", property: "line-height", designToken: "sgds/line-height/xs", rawValue: "24px", variant: "md", usage: "Line height of the button" },
          { mapKey: "padding-x", category: "Padding", element: "Padding", property: "padding-x", designToken: "sgds/padding/xl", rawValue: "24px", variant: "lg", usage: "Space between the left and right edges of the component and its content" },
          { mapKey: "height", category: "Size", element: "Size", property: "height", designToken: "sgds/dimension/56", rawValue: "56px", variant: "lg", usage: "Height of the button" },
          { mapKey: "min-width", category: "Size", element: "", property: "min-width", designToken: "sgds/dimension/112", rawValue: "112px", variant: "lg", usage: "Minimum width of the button" },
          { mapKey: "font-size", category: "Typography", element: "Typography", property: "font-size", designToken: "sgds/font-size/label-lg", rawValue: "20px", variant: "lg", usage: "Font size of the button" },
          { mapKey: "line-height", category: "Typography", element: "", property: "line-height", designToken: "sgds/line-height/md", rawValue: "32px", variant: "lg", usage: "Line height of the button" },
        ],
      },
      {
        title: "sgds/btn/primary/brand",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/primary/surface-default", rawValue: "#6B4FEB", mapKey: "primary-brand-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/primary/surface-emphasis", rawValue: "#523ABC", mapKey: "primary-brand-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3", mapKey: "primary-brand-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/primary/danger",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/danger/surface/default", rawValue: "#CF2323", mapKey: "primary-danger-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/danger/surface/emphasis", rawValue: "#A11B1B", mapKey: "primary-danger-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3", mapKey: "primary-danger-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/primary/neutral",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/surface-inverse", rawValue: "#2A2A2A", mapKey: "primary-neutral-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/bg-translucent-inverse", rawValue: "oklch(from #FFFFFF l c h / 0.2)", mapKey: "primary-neutral-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-inverse", rawValue: "#F3F3F3", mapKey: "primary-neutral-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/primary/fixed-light",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/surface-fixed-light", rawValue: "#FFFFFF", mapKey: "primary-fixed-light-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/surface-fixed-light + sgds/bg-translucent-fixed-dark", rawValue: "#FFFFFF + oklch(from #0E0E0E l c h / 0.2)", mapKey: "primary-fixed-light-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-fixed-dark", rawValue: "#1A1A1A", mapKey: "primary-fixed-light-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/outline/brand",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "outline-brand-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/primary/bg-translucent", rawValue: "oklch(from #523ABC l c h / 0.1)", mapKey: "outline-brand-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/primary/color-default", rawValue: "#6B4FEB", mapKey: "outline-brand-text-and-icon-color", usage: "Text colour of the text and icon" },
          { category: "", element: "", property: "border-color", designToken: "sgds/primary/border-color/default", rawValue: "#6B4FEB", mapKey: "outline-brand-border-color", usage: "Colour of the border around the button" },
        ],
      },
      {
        title: "sgds/btn/outline/danger",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "outline-danger-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/danger/surface/translucent", rawValue: "oklch(from #A11B1B l c h / 0.08)", mapKey: "outline-danger-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/danger/color/default", rawValue: "#CF2323", mapKey: "outline-danger-text-and-icon-color", usage: "Text colour of the text and icon" },
          { category: "", element: "", property: "border-color", designToken: "sgds/danger/border-color/default", rawValue: "#CF2323", mapKey: "outline-danger-border-color", usage: "Colour of the border around the button" },
        ],
      },
      {
        title: "sgds/btn/outline/neutral",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "outline-neutral-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/bg-translucent-subtle + sgds/bg-translucent-inverse", rawValue: "oklch(from #0E0E0E l c h / 0.05) + oklch(from #FFFFFF l c h / 0.2)", mapKey: "outline-neutral-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-default", rawValue: "#1A1A1A", mapKey: "outline-neutral-text-and-icon-color", usage: "Text colour of the text and icon" },
          { category: "", element: "", property: "border-color", designToken: "sgds/border-color/emphasis", rawValue: "#3B3B3B", mapKey: "outline-neutral-border-color", usage: "Colour of the border around the button" },
        ],
      },
      {
        title: "sgds/btn/outline/fixed-light",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "outline-fixed-light-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/bg-transparent + sgds/bg-translucent-fixed-dark", rawValue: "Transparent + oklch(from #0E0E0E l c h / 0.2)", mapKey: "outline-fixed-light-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3", mapKey: "outline-fixed-light-text-and-icon-color", usage: "Text colour of the text and icon" },
          { category: "", element: "", property: "border-color", designToken: "sgds/border-color/fixed-light", rawValue: "#FFFFFF", mapKey: "outline-fixed-light-border-color", usage: "Colour of the border around the button" },
        ],
      },
      {
        title: "sgds/btn/ghost/brand",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "ghost-brand-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/primary/surface/translucent", rawValue: "oklch(from #523ABC l c h / 0.1)", mapKey: "ghost-brand-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/primary/color-default", rawValue: "#6B4FEB", mapKey: "ghost-brand-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/ghost/danger",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "ghost-danger-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/danger/surface/translucent", rawValue: "oklch(from #A11B1B l c h / 0.08)", mapKey: "ghost-danger-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/danger/color/default", rawValue: "#CF2323", mapKey: "ghost-danger-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/ghost/neutral",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "ghost-neutral-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/bg-translucent-subtle", rawValue: "oklch(from #0E0E0E l c h / 0.05)", mapKey: "ghost-neutral-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-default", rawValue: "#1A1A1A", mapKey: "ghost-neutral-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
      {
        title: "sgds/btn/ghost/fixed-light",
        tokens: [
          { category: "Colour", element: "Colour", property: "background", designToken: "sgds/bg-transparent", rawValue: "Transparent", mapKey: "ghost-fixed-light-background", usage: "Background colour of the button" },
          { category: "", element: "", property: "hover-bg", designToken: "sgds/bg-transparent + sgds/bg-translucent-fixed-dark", rawValue: "Transparent + oklch(from #0E0E0E l c h / 0.2)", mapKey: "ghost-fixed-light-hover-bg", usage: "Background colour of the hover variant" },
          { category: "", element: "", property: "text-and-icon-color", designToken: "sgds/color-fixed-light", rawValue: "#F3F3F3", mapKey: "ghost-fixed-light-text-and-icon-color", usage: "Text colour of the text and icon" },
        ],
      },
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
      {
        mapKey: "background",
        category: "Colour",
        element: "Colour",
        property: "background",
        designToken: "sgds/primary/surface-default",
        rawValue: "#6B4FEB",
      },
      {
        mapKey: "hover-bg",
        category: "Colour",
        element: "",
        property: "hover-bg",
        designToken: "sgds/primary/surface-emphasis",
        rawValue: "#523ABC",
      },
      {
        mapKey: "text-color",
        category: "Colour",
        element: "",
        property: "text-color",
        designToken: "sgds/color-fixed-light",
        rawValue: "#F3F3F3",
      },
      {
        mapKey: "border-radius",
        category: "Border",
        element: "Border",
        property: "border-radius",
        designToken: "sgds/border-radius/md",
        rawValue: "8px",
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
        mapKey: "padding-x",
        category: "Spacing",
        element: "Spacing",
        property: "padding-x",
        designToken: "sgds/padding/lg",
        rawValue: "20px",
      },
      {
        mapKey: "gap",
        category: "Spacing",
        element: "",
        property: "gap",
        designToken: "sgds/gap/2-xs",
        rawValue: "4px",
      },
      {
        category: "Spacing",
        element: "",
        property: "no-icon-gap",
        designToken: "sgds/gap/none",
        rawValue: "0px",
        usage: "Gap used when the button has no icon slots",
      },
      {
        category: "Padding",
        element: "",
        property: "label-padding-x",
        designToken: "sgds/padding/2-xs",
        rawValue: "4px",
        usage: "Left and right padding around the button label span",
      },
      {
        mapKey: "height",
        category: "Size",
        element: "Size",
        property: "height",
        designToken: "sgds/dimension/48",
        rawValue: "48px",
      },
      {
        mapKey: "min-width",
        category: "Size",
        element: "",
        property: "min-width",
        designToken: "sgds/dimension/96",
        rawValue: "96px",
      },
      {
        mapKey: "font-size",
        category: "Typography",
        element: "Typography",
        property: "font-size",
        designToken: "sgds/font-size/label-md",
        rawValue: "16px",
      },
      {
        mapKey: "line-height",
        category: "Typography",
        element: "",
        property: "line-height",
        designToken: "sgds/line-height/xs",
        rawValue: "24px",
      },
    ],
    globalTokens: [
      {
        mapKey: "leading-icon-color",
        category: "Colour",
        element: "Leading icon",
        property: "",
        designToken: "sgds/color-fixed-light",
        rawValue: "#F3F3F3",
      },
      {
        mapKey: "trailing-icon-color",
        category: "Colour",
        element: "Trailing icon",
        property: "",
        designToken: "sgds/color-fixed-light",
        rawValue: "#F3F3F3",
      },
    ],
    configurationDemos: [
      {
        title: "Variants",
        description:
          "Button variants communicate hierarchy and help users identify the primary action on a screen.",
        controlLabel: "Button variant options",
        defaultValue: "primary",
        options: [
          {
            label: "Primary",
            value: "primary",
            markup: `<div class="portal-demo-row"><sgds-button>Primary action</sgds-button></div>`,
            description:
              "Use for the main action on a screen. Each view should have only one primary button to communicate the next step.",
          },
          {
            label: "Outline",
            value: "outline",
            markup: `<div class="portal-demo-row"><sgds-button variant="outline">Secondary action</sgds-button></div>`,
            description:
              "Use for secondary actions that support the primary action, such as cancelling, going back, or choosing an alternative.",
          },
          {
            label: "Ghost",
            value: "ghost",
            markup: `<div class="portal-demo-row"><sgds-button variant="ghost">Tertiary action</sgds-button></div>`,
            description:
              "Use for tertiary or low-priority actions that should not compete visually with the primary or secondary button.",
          },
        ],
      },
      {
        title: "Tone",
        description:
          "Button tone changes the colour treatment within the selected variant so the action can match the surrounding context.",
        controlLabel: "Button tone options",
        defaultValue: "brand",
        options: [
          {
            label: "Brand",
            value: "brand",
            markup: `<div class="portal-demo-row"><sgds-button>Button label</sgds-button></div>`,
            description:
              "The default button tone. Use for standard actions in the main SGDS brand colour system.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<div class="portal-demo-row"><sgds-button tone="neutral">Button label</sgds-button></div>`,
            description:
              "Use when the button should feel quieter or sit inside a more neutral interface context.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<div class="portal-demo-row"><sgds-button tone="danger">Button label</sgds-button></div>`,
            description:
              "Use for destructive or high-risk actions that need stronger visual warning.",
          },
          {
            label: "Fixed light",
            value: "fixed-light",
            markup: `<div class="portal-demo-row"><sgds-button tone="fixed-light">Button label</sgds-button></div>`,
            description:
              "Only use on fixed dark or strongly coloured backgrounds. If it does not stand out on the page surface, use a standard tone instead.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Button sizes let you match the visual weight of the action to the density of the surrounding layout.",
        controlLabel: "Button size options",
        defaultValue: "md",
        options: [
          {
            label: "Extra small",
            value: "xs",
            markup: `<div class="portal-demo-row"><sgds-button size="xs">Button label</sgds-button></div>`,
            description:
              "Use in tight, compact surfaces such as table rows, toolbars, or dense list items where space is limited.",
          },
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-row"><sgds-button size="sm">Button label</sgds-button></div>`,
            description:
              "Use in secondary contexts such as inline actions, cards, or alongside other compact controls.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-row"><sgds-button size="md">Button label</sgds-button></div>`,
            description:
              "The default size. Use for most primary actions across forms, dialogs, and general page content.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-demo-row"><sgds-button size="lg">Button label</sgds-button></div>`,
            description:
              "Use for prominent calls to action, such as hero sections or landing pages, where the button needs extra visual weight.",
          },
        ],
      },
      {
        title: "Leading icon",
        description:
          "A leading icon sits to the left of the button label and reinforces the meaning of the action.",
        controlLabel: "Leading icon options",
        defaultValue: "leading",
        options: [
          {
            label: "Leading icon",
            value: "leading",
            markup: `<div class="portal-demo-row"><sgds-button><sgds-icon slot="leftIcon" name="house"></sgds-icon>Button label</sgds-button></div>`,
            description:
              "Use a leading icon when the icon adds clarity to the action. For example, a download icon before a download label.",
          },
          {
            label: "No leading icon",
            value: "none",
            markup: `<div class="portal-demo-row"><sgds-button>Button label</sgds-button></div>`,
            description:
              "Omit the leading icon when the label alone is clear and no visual reinforcement is needed.",
          },
        ],
      },
      {
        title: "Trailing icon",
        description:
          "A trailing icon sits to the right of the button label and is typically used to signal direction or progression.",
        controlLabel: "Trailing icon options",
        defaultValue: "trailing",
        options: [
          {
            label: "Trailing icon",
            value: "trailing",
            markup: `<div class="portal-demo-row"><sgds-button>Button label<sgds-icon slot="rightIcon" name="chevron-right"></sgds-icon></sgds-button></div>`,
            description:
              "Use a trailing icon to indicate navigation, forward movement, or that a menu or panel will open.",
          },
          {
            label: "No trailing icon",
            value: "none",
            markup: `<div class="portal-demo-row"><sgds-button>Button label</sgds-button></div>`,
            description:
              "Omit the trailing icon when the action does not imply movement, navigation, or a follow-up interaction.",
          },
        ],
      },
  {
        title: "State",
        description:
          "Buttons expose disabled, loading, and active states for common interaction feedback.",
        controlLabel: "Button state options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-button>Button label</sgds-button></div>`,
            description: "Use for actions that are available immediately.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<div class="portal-demo-row"><sgds-button disabled>Button label</sgds-button></div>`,
            description:
              "Use disabled when the action is unavailable and the page explains how to enable it.",
          },
          {
            label: "Loading",
            value: "loading",
            markup: `<div class="portal-demo-row"><sgds-button loading>Button label</sgds-button></div>`,
            description:
              "Use loading after an action has been submitted and the user should wait.",
          },
          {
            label: "Active",
            value: "active",
            markup: `<div class="portal-demo-row"><sgds-button variant="outline" active>Button label</sgds-button></div>`,
            description:
              "Use active when the button represents a selected or pressed state.",
          },
        ],
      },
      {
        title: "Full width",
        description:
          "Full width makes the button fill its parent container for stacked or narrow layouts.",
        controlLabel: "Button full width options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="sgds:flex sgds:w-full sgds:justify-center">
              <sgds-button>Button label</sgds-button>
            </div>`,
            description: "Use the default width for inline actions.",
          },
          {
            label: "Full width",
            value: "full-width",
            markup: `<div class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)]">
              <sgds-button fullWidth>Button label</sgds-button>
            </div>`,
            description:
              "Use fullWidth on mobile, forms, or stacked actions where the button should span the available width.",
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
    componentTokenGroups: [
      {
        title: "sgds / button",
        rows: [
          { category: "Padding", name: "padding-2-xs", value: "sgds/padding/2-xs", usage: "Padding of the span" },
          { category: "Gap", name: "gap-none", value: "sgds/gap/none", usage: "Spacing between items of the button" },
        ],
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a clear action label",
          description: "Specific labels help users understand the outcome before they act.",
          tone: "do",
          markup: `<div class="portal-demo-row"><sgds-button>Save changes</sgds-button></div>`,
        },
        {
          title: "Do not use vague labels",
          description: "Generic labels such as Click here force users to read surrounding text to understand what happens.",
          tone: "dont",
          markup: `<div class="portal-demo-row"><sgds-button>Click here</sgds-button></div>`,
        },
      ],
    },
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
        description: "Use cards to package a title, description, media, and action as one unit.",
      },
      {
        title: "Support quick comparison",
        description: "Consistent card layouts help users scan options across a list or grid.",
      },
      {
        title: "Adapt to content",
        description: "Slots let cards support summaries, media, metadata, and links.",
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
      {
        number: 1,
        direction: "right",
        targetSelector: "sgds-card",
        targetX: "right",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: "[slot='icon']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 3,
        direction: "left",
        targetSelector: "[slot='subtitle']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 4,
        direction: "left",
        targetSelector: "[slot='title']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 5,
        direction: "left",
        targetSelector: ".portal-anatomy-card-default-slot",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 6,
        direction: "left",
        targetSelector: "[slot='description']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 7,
        direction: "left",
        targetSelector: "[slot='lower']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 8,
        direction: "left",
        targetSelector: "[slot='footer']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 9,
        direction: "right",
        targetSelector: "[slot='menu']",
        targetX: "right",
        targetY: "center",
      },
    ],
    anatomyMarkup: `<sgds-card class="portal-demo-card portal-anatomy-card">
      <sgds-badge slot="menu" variant="neutral" outlined>Badge</sgds-badge>
      <sgds-icon slot="icon" name="box-seam" size="2-xl"></sgds-icon>
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
      { mapKey: "background", category: "Colour", element: "Colour", property: "background", designToken: "sgds/surface-default", rawValue: "#FFFFFF", usage: "Background colour of the card" },
      { mapKey: "title-color", category: "Colour", element: "", property: "title-color", designToken: "sgds/body-color-default", rawValue: "#1A1A1A", usage: "Text colour of the title" },
      { mapKey: "description-color", category: "Colour", element: "", property: "description-color", designToken: "sgds/color-subtle", rawValue: "#525252", usage: "Text colour of the description" },
      { mapKey: "border-color", category: "Border", element: "Border", property: "border-color", designToken: "sgds/border-color-muted", rawValue: "#DFDFDF", usage: "Colour of the border around the card" },
      { mapKey: "border-width", category: "Border", element: "", property: "border-width", designToken: "sgds/border-width/1", rawValue: "1px", usage: "Thickness of the border around the card" },
      { mapKey: "border-radius", category: "Border", element: "", property: "border-radius", designToken: "sgds/border-radius/md", rawValue: "8px", usage: "Corner radius of the card" },
      { mapKey: "padding-x", category: "Padding", element: "Padding", property: "padding-x", designToken: "sgds/padding/xl", rawValue: "24px", usage: "Space between the left and right edges of the component and its content" },
      { mapKey: "padding-y", category: "Padding", element: "", property: "padding-y", designToken: "sgds/padding/xl", rawValue: "24px", usage: "Space between the top and bottom edges of the component and its content" },
      { mapKey: "gap", category: "Gap", element: "Gap", property: "gap", designToken: "sgds/gap/lg", rawValue: "20px", usage: "Spacing between items inside the card" },
      { mapKey: "title-gap", category: "Gap", element: "", property: "title-gap", designToken: "sgds/gap/xs", rawValue: "8px", usage: "Spacing around the title" },
      { mapKey: "subtitle-gap", category: "Gap", element: "", property: "subtitle-gap", designToken: "sgds/gap/2-xs", rawValue: "4px", usage: "Spacing around the subtitle" },
      { mapKey: "slot-gap", category: "Gap", element: "", property: "slot-gap", designToken: "sgds/gap/lg", rawValue: "20px", usage: "Spacing around the slot" },
    ],
    globalTokens: [
      { mapKey: "title-color", category: "Colour", element: "Card title", property: "", designToken: "sgds/body-color-default", rawValue: "#1A1A1A", usage: "Text colour of the title" },
      { mapKey: "subtitle-color", category: "Colour", element: "Subtitle", property: "", designToken: "sgds/color-subtle", rawValue: "#525252", usage: "Text colour of the subtitle" },
      { mapKey: "description-color", category: "Colour", element: "Description", property: "", designToken: "sgds/color-subtle", rawValue: "#525252", usage: "Text colour of the description" },
      { mapKey: "secondary-text-color", category: "Colour", element: "Secondary text", property: "", designToken: "sgds/body-color-default", rawValue: "#1A1A1A", usage: "Text colour of the secondary text" },
      { mapKey: "link-color", category: "Colour", element: "Link", property: "", designToken: "sgds/link-color-default", rawValue: "#0269D0", usage: "Text colour of the link" },
      { mapKey: "link-color-emphasis", category: "Colour", element: "Link on hover", property: "", designToken: "sgds/link-color-emphasis", rawValue: "#0151A0", usage: "Used by the link on hover" },
      { mapKey: "tinted-bg", category: "Background", element: "Tinted", property: "", designToken: "sgds/bg-translucent-subtle", rawValue: "oklch(from #0E0E0E l c h / 0.05)", usage: "Background colour of the tinted variant" },
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
            description:
              "Shows the default card border. Use when the card needs a clear container that stands apart from the surrounding layout.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use the default border when the card needs its own visual container.</span>
            </sgds-card>`,
          },
          {
            label: "Borderless",
            value: "borderless",
            description:
              "Removes the default card border. Use when the page layout already provides enough separation and the border feels too heavy.",
            markup: `<sgds-card class="portal-demo-card" hideBorder>
              <span slot="title">Card title</span>
              <span slot="description">Hide the border when the surrounding layout already gives enough separation.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Tinted",
        description:
          "Background treatment that changes visual emphasis without changing structure.",
        controlLabel: "Card tinted options",
        defaultValue: "true",
        options: [
          {
            label: "Tinted",
            value: "true",
            description:
              "Adds a subtle tinted background. Use to add gentle emphasis while keeping the same structure and content hierarchy.",
            markup: `<sgds-card class="portal-demo-card" tinted>
              <span slot="title">Card title</span>
              <span slot="description">Use tinted cards to add gentle emphasis without changing the structure.</span>
            </sgds-card>`,
          },
          {
            label: "Default",
            value: "false",
            description:
              "Uses the standard card background. Use for neutral card layouts that should not draw extra attention.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">The default treatment works for most neutral card layouts.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Orientation",
        description:
          "Layout direction for arranging content and media vertically or horizontally.",
        controlLabel: "Card orientation options",
        defaultValue: "false",
        options: [
          {
            label: "Vertical",
            value: "false",
            description:
              "Stacks the media above the content. Use when the card should follow a more traditional vertical layout.",
            markup: `<sgds-card class="portal-demo-card">
              <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Service preview" width="760" height="480" />
              <span slot="title">Card title</span>
              <span slot="description">Media sits above the content in the default vertical layout.</span>
            </sgds-card>`,
          },
          {
            label: "Horizontal",
            value: "true",
            description:
              "Places the media beside the content. Use when you need a denser layout with media next to the body instead of above it.",
            markup: `<sgds-card class="portal-demo-card" orientation="horizontal" imagePosition="before">
              <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Service preview" width="760" height="480" />
              <span slot="title">Card title</span>
              <span slot="description">Media moves to the left when the card uses a horizontal layout.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Image position",
        description:
          "Image placement before or after the content across vertical and horizontal layouts.",
        controlLabel: "Card image position options",
        defaultValue: "before",
        options: [
          {
            label: "Before",
            value: "before",
            description:
              "Places the image before the content. Use when the image should appear above in vertical cards or to the left in horizontal cards.",
            markup: `<div class="sgds:grid sgds:grid-cols-2 sgds:gap-layout-md sgds:max-sm:grid-cols-1">
              <sgds-card class="portal-demo-card">
                <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears above the content in a vertical card.</span>
              </sgds-card>
              <sgds-card class="portal-demo-card" orientation="horizontal" imagePosition="before">
                <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears to the left of the content in a horizontal card.</span>
              </sgds-card>
            </div>`,
          },
          {
            label: "After",
            value: "after",
            description:
              "Places the image after the content. Use when the image should appear below in vertical cards or to the right in horizontal cards.",
            markup: `<div class="sgds:grid sgds:grid-cols-2 sgds:gap-layout-md sgds:max-sm:grid-cols-1">
              <sgds-card class="portal-demo-card" imagePosition="after">
                <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears below the content in a vertical card.</span>
              </sgds-card>
              <sgds-card class="portal-demo-card" orientation="horizontal" imagePosition="after">
                <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Service preview" width="760" height="480" />
                <span slot="title">Card title</span>
                <span slot="description">The image appears to the right of the content in a horizontal card.</span>
              </sgds-card>
            </div>`,
          },
        ],
      },
      {
        title: "Badge",
        description:
          "Top-right badge content for lightweight status or metadata.",
        controlLabel: "Card badge options",
        defaultValue: "true",
        options: [
          {
            label: "Badge",
            value: "true",
            description:
              "A badge sits in the top-right area of the card. Use it to surface status, count, or lightweight metadata without taking over the card body.",
            markup: `<sgds-card class="portal-demo-card">
              <sgds-badge slot="menu" variant="neutral" outlined>Badge</sgds-badge>
              <span slot="title">Card title</span>
              <span slot="description">Add a badge when the card needs visible status at the top-right.</span>
            </sgds-card>`,
          },
          {
            label: "No badge",
            value: "false",
            description:
              "Removes the top-right badge area. Use when the card does not need extra status or metadata there.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use this when the card does not need a badge.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Secondary text",
        description:
          "An extra supporting text row below the description for added context.",
        controlLabel: "Card secondary text options",
        defaultValue: "true",
        options: [
          {
            label: "Secondary text",
            value: "true",
            description:
              "Secondary text sits below the description as a supporting row. Use it when the card needs an extra line for metadata, status, or supporting details.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Supporting description for the card content.</span>
              <span slot="lower">Secondary text</span>
            </sgds-card>`,
          },
          {
            label: "No secondary text",
            value: "false",
            description:
              "Removes the secondary text row. Use when the title and description already provide enough context on their own.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Supporting description for the card content.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Footer",
        description:
          "Footer content patterns, from lightweight links to stronger calls to action.",
        controlLabel: "Card footer options",
        defaultValue: "none",
        options: [
          {
            label: "No footer",
            value: "none",
            description:
              "Removes the footer action area. Use when the card is purely informational and does not need a follow-up action.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use this layout when no footer action is needed.</span>
            </sgds-card>`,
          },
          {
            label: "Link",
            value: "link",
            description:
              "A footer link provides a lightweight next step. Use it when the action does not need strong visual emphasis.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a footer link for a lighter follow-up action.</span>
              <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
            </sgds-card>`,
          },
          {
            label: "Button",
            value: "button",
            description:
              "A footer button gives the action more emphasis than a text link. Use it when the card needs a clearer call to action.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a footer button when the action needs stronger emphasis.</span>
              <sgds-button slot="footer" variant="outline">Take action</sgds-button>
            </sgds-card>`,
          },
          {
            label: "Full width button",
            value: "full-width-button",
            description:
              "A full width button spans the footer and carries the strongest emphasis. Use it when the primary action should stand out clearly.",
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
            description:
              "A footer badge carries compact status or label content. Use it when the footer needs a short classification instead of an action.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use a footer badge for compact status or label content.</span>
              <sgds-badge slot="footer" variant="neutral" outlined>In progress</sgds-badge>
            </sgds-card>`,
          },
          {
            label: "Text",
            value: "text",
            description:
              "Footer text provides supporting metadata instead of an action. Use it for dates, status, or other small supporting details.",
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
        description:
          "Title emphasis across heading levels within the same card structure.",
        controlLabel: "Card hierarchy options",
        defaultValue: "h4",
        options: [
          {
            label: "H4",
            value: "h4",
            description:
              "Uses a larger heading level for the title. Use when the card title needs stronger emphasis in the layout.",
            markup: `<sgds-card class="portal-demo-card portal-card-title-h4-demo">
              <h4 slot="title" class="portal-card-title-h4 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Card title</h4>
              <span slot="description">Use a higher emphasis when the title needs more prominence.</span>
            </sgds-card>`,
          },
          {
            label: "H5",
            value: "h5",
            description:
              "Uses a lighter heading level for the title. Use when the card sits in a denser layout and the title should feel slightly lighter.",
            markup: `<sgds-card class="portal-demo-card portal-card-title-h5-demo">
              <h5 slot="title" class="portal-card-title-h5 sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Card title</h5>
              <span slot="description">Use a slightly lighter heading level for denser layouts.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Subtitle",
        description:
          "A short label above the title for category or supporting context.",
        controlLabel: "Card subtitle options",
        defaultValue: "true",
        options: [
          {
            label: "Subtitle",
            value: "true",
            description:
              "Adds a short label above the title. Use to show a category or supporting context before the title.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="subtitle">Category</span>
              <span slot="title">Card title</span>
              <span slot="description">The subtitle helps users scan the card context quickly.</span>
            </sgds-card>`,
          },
          {
            label: "No subtitle",
            value: "false",
            description:
              "Removes the label above the title. Use when the title already provides enough context without extra support.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Remove the subtitle when the title already carries enough context.</span>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Description",
        description:
          "Supporting text beneath the title for added explanation or context.",
        controlLabel: "Card description options",
        defaultValue: "true",
        options: [
          {
            label: "Description",
            value: "true",
            description:
              "Description text sits below the title as supporting copy. Use it when the card needs extra explanation or context.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <span slot="description">Use the description slot for longer supporting text.</span>
              <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
            </sgds-card>`,
          },
          {
            label: "No description",
            value: "false",
            description:
              "Removes the supporting text area. Use when the card can stay compact and the title or action is enough on its own.",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Card title</span>
              <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
            </sgds-card>`,
          },
        ],
      },
      {
        title: "Content slot",
        description:
          "Custom content areas within the card body using the available content slots.",
        controlLabel: "Card content slot options",
        defaultValue: "default",
        interactionMode: "content-slots",
        options: [
          {
            label: "Default",
            value: "default",
            markup: "",
            description:
              "The default slot sits directly below the title. Use it for the card's main custom content, such as text, metadata, or small supporting elements.",
            selectedByDefault: true,
          },
          {
            label: "Upper",
            value: "upper",
            markup: "",
            description:
              "The upper slot sits above the title and main body content. Use it for banners, status markers, or supporting content that should appear first.",
          },
          {
            label: "Lower",
            value: "lower",
            markup: "",
            description:
              "The lower slot sits below the description. Use it for badges, metadata, or other supporting information.",
          },
        ],
      },
  {
        title: "State",
        description:
          "Cards can be disabled when their primary action or destination is unavailable.",
        controlLabel: "Card state options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Application guide</span>
              <span slot="description">Review the latest guidance.</span>
            </sgds-card>`,
            description: "Use the default state for available content.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-card class="portal-demo-card" disabled>
              <span slot="title">Application guide</span>
              <span slot="description">This content is temporarily unavailable.</span>
            </sgds-card>`,
            description:
              "Use disabled only when the card cannot be acted on and the surrounding page explains why.",
          },
        ],
      },
      {
        title: "Stretched link",
        description:
          "Stretched link makes the card's link cover the whole card area while keeping the visual structure unchanged.",
        controlLabel: "Card stretched link options",
        defaultValue: "default",
        options: [
          {
            label: "Default link",
            value: "default",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Service overview</span>
              <span slot="description">Open the overview from the footer link.</span>
              <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
            </sgds-card>`,
            description:
              "Use when only the explicit link should be interactive.",
          },
          {
            label: "Stretched link",
            value: "stretched",
            markup: `<sgds-card class="portal-demo-card" stretchedLink>
              <span slot="title">Service overview</span>
              <span slot="description">The whole card behaves as the link target.</span>
              <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
            </sgds-card>`,
            description:
              "Use when the card is a single destination and there are no competing actions inside it.",
          },
        ],
      },
      {
        title: "Menu slot",
        description:
          "Use the menu slot for compact secondary actions associated with the card.",
        controlLabel: "Card menu options",
        defaultValue: "with-menu",
        options: [
          {
            label: "With menu",
            value: "with-menu",
            markup: `<sgds-card class="portal-demo-card">
              <sgds-overflow-menu slot="menu" size="sm">
                <sgds-dropdown-item>Edit</sgds-dropdown-item>
                <sgds-dropdown-item>Archive</sgds-dropdown-item>
              </sgds-overflow-menu>
              <span slot="title">Case file</span>
              <span slot="description">Menu actions stay visually separate from card content.</span>
            </sgds-card>`,
            description:
              "Use for secondary actions that should not dominate the card.",
          },
          {
            label: "No menu",
            value: "no-menu",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Case file</span>
              <span slot="description">No secondary actions are shown.</span>
            </sgds-card>`,
            description: "Omit the menu when the card has no secondary actions.",
          },
        ],
      },
      {
        title: "Upper and lower slots",
        description:
          "Upper and lower slots add supporting metadata above or below the main content.",
        controlLabel: "Card metadata slot options",
        defaultValue: "with-metadata",
        options: [
          {
            label: "With metadata",
            value: "with-metadata",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="upper">Updated today</span>
              <span slot="title">Grant application</span>
              <span slot="description">Track the progress of this application.</span>
              <span slot="lower">Owner: Service team</span>
            </sgds-card>`,
            description:
              "Use metadata slots for short supporting details that help users scan cards.",
          },
          {
            label: "Content only",
            value: "content-only",
            markup: `<sgds-card class="portal-demo-card">
              <span slot="title">Grant application</span>
              <span slot="description">Track the progress of this application.</span>
            </sgds-card>`,
            description: "Keep the card simpler when metadata is not needed.",
          },
        ],
      },
      {
        title: "Image adjustment",
        description:
          "Image adjustment controls how image content is fitted within the card image area.",
        controlLabel: "Card image adjustment options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-card class="portal-demo-card" imageAdjustment="default">
              <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Scenic preview">
              <span slot="title">Default image</span>
              <span slot="description">The image sits flush with the top edge of the card.</span>
            </sgds-card>`,
            description:
              "Use the default image treatment when the image should connect directly to the card edge.",
          },
          {
            label: "Padding around",
            value: "padding-around",
            markup: `<sgds-card class="portal-demo-card" imageAdjustment="padding around">
              <img slot="image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" alt="Scenic preview">
              <span slot="title">Padded image</span>
              <span slot="description">The image has spacing around it inside the card.</span>
            </sgds-card>`,
            description:
              "Use padding around when the image needs separation from the card edge.",
          },
        ],
      },
    ],
    props: [
      {
        name: "imagePosition",
        type: '"before" | "after"',
        defaultValue: '"before"',
        description:
          "Sets where the image slot appears in relation to the card content.",
      },
      {
        name: "imageAdjustment",
        type: '"default" | "padding around" | "aspect ratio"',
        defaultValue: '"default"',
        description:
          "Controls how the image is sized and fitted inside the card media area.",
      },
      {
        name: "hasImageSlot",
        type: "boolean",
        defaultValue: "false",
        description:
          "Used only for SSR to indicate the presence of the image slot.",
      },
      {
        name: "hasIconSlot",
        type: "boolean",
        defaultValue: "false",
        description:
          "Used only for SSR to indicate the presence of the icon slot.",
      },
      {
        name: "hasUpperSlot",
        type: "boolean",
        defaultValue: "false",
        description:
          "Used only for SSR to indicate the presence of the upper slot.",
      },
      {
        name: "stretchedLink",
        type: "boolean",
        defaultValue: "false",
        description:
          "Extends the footer or legacy link slot anchor so the card behaves like one larger click target.",
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
        description:
          "Controls whether the card content is laid out vertically or horizontally.",
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds / card",
        rows: [
          {
            category: "Padding",
            name: "padding-x",
            value: "sgds/padding/xl",
            mapKey: "padding-x",
            usage:
              "Horizontal inset of the card body from its left and right edges",
          },
          {
            category: "Padding",
            name: "padding-y",
            value: "sgds/padding/xl",
            mapKey: "padding-y",
            usage:
              "Vertical inset of the card body from its top and bottom edges",
          },
          {
            category: "Colour",
            name: "bg-translucent-subtle",
            value: "sgds/bg-translucent-subtle",
            usage: "Background colour of the card tinted bg",
          },
          {
            category: "Opacity",
            name: "opacity-50",
            value: "sgds/opacity/50",
            usage: "Transparency of the card tinted bg",
          },
        ],
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds / card",
        rows: [
          {
            category: "Padding",
            name: "padding-x",
            value: "sgds/padding/xl",
            mapKey: "padding-x",
            usage:
              "Horizontal inset of the card body from its left and right edges",
          },
          {
            category: "Padding",
            name: "padding-y",
            value: "sgds/padding/xl",
            mapKey: "padding-y",
            usage:
              "Vertical inset of the card body from its top and bottom edges",
          },
          {
            category: "Colour",
            name: "bg-translucent-subtle",
            value: "sgds/bg-translucent-subtle",
            usage: "Background colour of the card tinted bg",
          },
          {
            category: "Opacity",
            name: "opacity-50",
            value: "sgds/opacity/50",
            usage: "Transparency of the card tinted bg",
          },
        ],
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds / card",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/xl", mapKey: "padding-x", usage: "Horizontal inset of the card body from its left and right edges" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/xl", mapKey: "padding-y", usage: "Vertical inset of the card body from its top and bottom edges" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the card tinted bg" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the card tinted bg" },
        ],
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
        title: "Select multiple options",
        description: "Use checkboxes when users can choose more than one item from a list.",
      },
      {
        title: "Show every choice",
        description: "Visible options help users compare choices before they submit.",
      },
      {
        title: "Group related choices",
        description: "Use a shared label when several checkboxes answer the same question.",
      },
    ],
    anatomyMarkup: `<sgds-checkbox checked>Option label</sgds-checkbox>`,
    anatomyParts: [
      { title: "Checkbox control" },
      { title: "Option label" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-checkbox", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: "sgds-checkbox", targetShadowSelector: ".form-check-label", targetX: "right", targetY: "center" },
    ],
    componentTokenGroups: [
      {
        title: "sgds / checkbox",
        rows: [
          { category: "Padding", name: "form-padding-inline-sm", value: "sgds/form/padding/inline-sm", usage: "Outer spacing of the form check" },
          { category: "Gap", name: "form-gap-md", value: "sgds/form/gap/md", usage: "Spacing between items of the fieldset; spacing between items of the checkbox container" },
          { category: "Gap", name: "form-gap-sm", value: "sgds/form/gap/sm", usage: "Spacing between items of the label hint container" },
          { category: "Gap", name: "checkbox-group-gap", value: "sgds/checkbox-group/gap", usage: "Internal checkbox group gap alias" },
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the form check input" },
          { category: "Border", name: "form-border-width-default", value: "sgds/form/border-width/default", usage: "Border of the form check input" },
          { category: "Typography", name: "font-size-label-md", value: "sgds/font-size/label-md", usage: "Font size of the form label" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight of the form label" },
          { category: "Size", name: "spacer-2", value: "sgds/spacer/2", usage: "Spacing between items inside the component" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the checkbox indicator icon" },
          { category: "Colour", name: "form-color-default", value: "sgds/form/color/default", usage: "Text colour of the form label" },
          { category: "Colour", name: "form-danger-surface-default", value: "sgds/form/danger-surface-default", usage: "Background colour of the form check input" },
          { category: "Colour", name: "form-primary-surface-default", value: "sgds/form/primary-surface-default", usage: "Background colour of the form check input" },
          { category: "Colour", name: "form-primary-surface-emphasis", value: "sgds/form/primary-surface-emphasis", usage: "Background colour of the form check input on hover" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the label hint container when disabled" },
          { category: "Border", name: "form-border-radius-md", value: "sgds/form/border-radius/md", usage: "Corner radius of the form check input" },
        ],
      },
    ],
    configurationDemos: [
      {
        title: "State",
        description:
          "A checkbox can be unchecked, checked, or indeterminate. Indeterminate is used when a parent represents a mixed selection of its children.",
        controlLabel: "Checkbox state options",
        defaultValue: "checked",
        options: [
          {
            label: "Checked",
            value: "checked",
            markup: `<sgds-checkbox checked>Email me updates</sgds-checkbox>`,
            description:
              "Indicates the option has been selected. Use when the user has actively opted in or the value is pre-selected by default.",
          },
          {
            label: "Unchecked",
            value: "unchecked",
            markup: `<sgds-checkbox>Email me updates</sgds-checkbox>`,
            description:
              "The default empty state. Use when the option is not currently selected.",
          },
          {
            label: "Indeterminate",
            value: "indeterminate",
            markup: `<sgds-checkbox indeterminate>Select all</sgds-checkbox>`,
            description:
              "A mixed state for a parent checkbox when only some of its child checkboxes are selected. Resolves to checked or unchecked when the user clicks it.",
          },
        ],
      },
      {
        title: "Group",
        description:
          "Use a checkbox group to bind related options under a single label. The group manages the consolidated value of the selected checkboxes.",
        controlLabel: "Checkbox group options",
        defaultValue: "standalone",
        options: [
          {
            label: "Standalone",
            value: "standalone",
            markup: `<sgds-checkbox>Subscribe to monthly digest</sgds-checkbox>`,
            description:
              "A single checkbox used on its own. For example, to confirm a setting or accept terms.",
          },
          {
            label: "Group",
            value: "group",
            markup: `<sgds-checkbox-group label="Delivery options">
          <sgds-checkbox checked>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
            description:
              "Displays related checkboxes under a shared label. Use when users may select more than one option from the same category.",
          },
        ],
      },
      {
        title: "Hint text",
        description:
          "Add hint text to a checkbox group to explain what users are choosing or how the selection will be used.",
        controlLabel: "Checkbox hint text options",
        defaultValue: "hint-text",
        options: [
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-checkbox-group label="Delivery options" hintText="Choose one or more channels we can use to reach you.">
          <sgds-checkbox>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
            description:
              "Use when the choice needs additional context, such as how the data will be used or what selecting an option implies.",
          },
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-checkbox-group label="Delivery options">
          <sgds-checkbox>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
            description:
              "The default. Use when the label alone is enough for users to understand the choice.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use the `disabled` state to prevent interaction when the option is not available in the current context.",
        controlLabel: "Checkbox disabled options",
        defaultValue: "disabled",
        options: [
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-checkbox checked disabled>Email me updates</sgds-checkbox>`,
            description:
              "Use when the option is temporarily unavailable. Disabled checkboxes appear muted and cannot be focused or toggled.",
          },
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-checkbox checked>Email me updates</sgds-checkbox>`,
            description:
              "The default. Checkboxes are interactive and can be toggled.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "When the group is invalid, surface inline feedback so users can correct the input. Use `hasFeedback` to control whether validation shows as text, style, or both.",
        controlLabel: "Checkbox validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-checkbox-group label="Delivery options">
          <sgds-checkbox>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
            description:
              "No feedback styling. Use when the field has no validation requirements.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-checkbox-group label="Delivery options" required hasFeedback invalid invalidFeedback="Select at least one delivery option">
          <sgds-checkbox>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
          <sgds-checkbox>Phone call</sgds-checkbox>
        </sgds-checkbox-group>`,
            description:
              "Shows the invalid state with the supplied `invalidFeedback` message. Use to tell the user what is wrong and how to fix it.",
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
        </sgds-checkbox-group>`,
      ),
    ],
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-checkbox-group label="Delivery options">
          <sgds-checkbox checked>Email</sgds-checkbox>
          <sgds-checkbox>SMS</sgds-checkbox>
        </sgds-checkbox-group>`,
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a single checkbox for one optional choice",
          description: "Use a standalone checkbox when users are confirming or selecting one optional item within a form.",
          tone: "do",
          markup: `<sgds-checkbox>Email me updates</sgds-checkbox>`,
        },
        {
          title: "Do not use checkboxes for one required choice",
          description: "If users must choose exactly one option, use radio buttons so the mutual exclusivity is clear.",
          tone: "dont",
          markup: `<sgds-checkbox-group label="Preferred contact method">
            <sgds-checkbox>Email</sgds-checkbox>
            <sgds-checkbox>SMS</sgds-checkbox>
            <sgds-checkbox>Phone call</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Use checkbox groups for multi-select choices",
          description: "Use checkboxes when users can select more than one option from the same set.",
          tone: "do",
          markup: `<sgds-checkbox-group label="Delivery options">
            <sgds-checkbox checked>Email</sgds-checkbox>
            <sgds-checkbox>SMS</sgds-checkbox>
            <sgds-checkbox>Phone call</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Do not use two checkboxes for a yes-or-no decision",
          description: "A pair of Yes and No checkboxes lets users select both. Use radio buttons or one clearly labelled checkbox instead.",
          tone: "dont",
          markup: `<sgds-checkbox-group label="Do you want to receive updates?">
            <sgds-checkbox>Yes</sgds-checkbox>
            <sgds-checkbox>No</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Use checkbox groups for multi-select choices",
          description:
            "Use checkboxes when users can select more than one option from the same set.",
          tone: "do",
          markup: `<sgds-checkbox-group label="Delivery options">
            <sgds-checkbox checked>Email</sgds-checkbox>
            <sgds-checkbox>SMS</sgds-checkbox>
            <sgds-checkbox>Phone call</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Do not use two checkboxes for a yes-or-no decision",
          description:
            "A pair of Yes and No checkboxes lets users select both. Use radio buttons or one clearly labelled checkbox instead.",
          tone: "dont",
          markup: `<sgds-checkbox-group label="Do you want to receive updates?">
            <sgds-checkbox>Yes</sgds-checkbox>
            <sgds-checkbox>No</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Use checkbox groups for multi-select choices",
          description:
            "Use checkboxes when users can select more than one option from the same set.",
          tone: "do",
          markup: `<sgds-checkbox-group label="Delivery options">
            <sgds-checkbox checked>Email</sgds-checkbox>
            <sgds-checkbox>SMS</sgds-checkbox>
            <sgds-checkbox>Phone call</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Do not use two checkboxes for a yes-or-no decision",
          description:
            "A pair of Yes and No checkboxes lets users select both. Use radio buttons or one clearly labelled checkbox instead.",
          tone: "dont",
          markup: `<sgds-checkbox-group label="Do you want to receive updates?">
            <sgds-checkbox>Yes</sgds-checkbox>
            <sgds-checkbox>No</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Use a clear group label",
          description:
            "A shared label helps users understand what the checkbox options represent before they start selecting.",
          tone: "do",
          markup: `<sgds-checkbox-group label="Documents submitted">
            <sgds-checkbox>NRIC</sgds-checkbox>
            <sgds-checkbox>Proof of address</sgds-checkbox>
            <sgds-checkbox>Income statement</sgds-checkbox>
            <sgds-checkbox>Supporting letter</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
        {
          title: "Do not overload a checkbox group",
          description: "If the list is long or hard to scan, use select or combo box instead of showing every option as a checkbox.",
          tone: "dont",
          markup: `<sgds-checkbox-group label="Services of interest">
            <sgds-checkbox>Passport renewal</sgds-checkbox>
            <sgds-checkbox>Driving licence</sgds-checkbox>
            <sgds-checkbox>Housing grant</sgds-checkbox>
            <sgds-checkbox>Healthcare subsidy</sgds-checkbox>
            <sgds-checkbox>Work permit</sgds-checkbox>
            <sgds-checkbox>Business registration</sgds-checkbox>
            <sgds-checkbox>Marriage registration</sgds-checkbox>
            <sgds-checkbox>Property tax</sgds-checkbox>
          </sgds-checkbox-group>`,
        },
      ],
    },
  },
  "close-button": {
    key: "close-button",
    title: "Close button",
    tag: "sgds-close-button",
    group: "labels",
    summary:
      "A close button dismisses surfaces such as modals, drawers, alerts, and toasts.",
    purposeCards: [
      {
        title: "Dismiss a surface",
        description: "Use close buttons on dismissible surfaces such as modals, drawers, alerts, and toasts.",
      },
      {
        title: "Use a familiar control",
        description: "The close icon is recognised in compact surfaces where text would take too much room.",
      },
      {
        title: "Support interaction states",
        description: "Built-in hover, focus, and `disabled` states keep the control predictable.",
      },
    ],
    anatomyMarkup: `<sgds-close-button class="portal-close-button-anatomy" style="--sgds-bg-transparent: var(--sgds-bg-translucent);"></sgds-close-button>`,
    anatomyParts: [{ title: "Button container" }, { title: "Close icon" }],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-close-button-anatomy",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "top",
        targetSelector: ".portal-close-button-anatomy",
        targetShadowSelector: "sgds-icon",
        targetX: "center",
        targetY: "center",
      },
    ],
    configurationDemos: [
      {
        title: "Tone",
        description:
          "The close button tone adjusts the icon colour so it remains visible on different background contexts.",
        controlLabel: "Close button tone options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-close-button></sgds-close-button></div>`,
            description:
              "The default tone for use on standard light surfaces such as modals, drawers, and inline alerts.",
          },
          {
            label: "Fixed light",
            value: "fixed-light",
            markup: `<div class="portal-demo-row"><sgds-close-button tone="fixed-light"></sgds-close-button></div>`,
            description:
              "Only use on fixed dark or strongly coloured backgrounds. It may be hard to see on this page surface because the icon always stays light.",
          },
          {
            label: "Fixed dark",
            value: "fixed-dark",
            markup: `<div class="portal-demo-row"><sgds-close-button tone="fixed-dark"></sgds-close-button></div>`,
            description:
              "Only use on fixed light backgrounds. It may be hard to see in dark mode because the icon always stays dark.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Close button sizes let you match the visual weight of the dismiss control to the surface it sits within.",
        controlLabel: "Close button size options",
        defaultValue: "md",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-row"><sgds-close-button size="sm"></sgds-close-button></div>`,
            description:
              "Use in compact surfaces such as toasts, inline alerts, and tightly packed toolbars where a smaller dismiss control fits better.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-row"><sgds-close-button size="md"></sgds-close-button></div>`,
            description:
              "The default size. Use for most surfaces such as modals, drawers, and standard alerts.",
          },
        ],
      },
  {
        title: "Disabled",
        description:
          "Use disabled only when the close action is temporarily unavailable and the reason is clear.",
        controlLabel: "Close button disabled options",
        defaultValue: "enabled",
        options: [
          {
            label: "Enabled",
            value: "enabled",
            markup: `<div class="portal-demo-row"><sgds-close-button ariaLabel="Close"></sgds-close-button></div>`,
            description: "Use when the close action is available.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<div class="portal-demo-row"><sgds-close-button disabled="true"></sgds-close-button></div>`,
            description:
              "Use sparingly because users usually expect close actions to remain available.",
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
    usage: {
      bestPractices: [
        {
          title: "Use the close button to dismiss a transient surface",
          description:
            "Pair the close button with surfaces users can leave without committing: modals, drawers, toasts, and alerts.",
          tone: "do",
          markup: `<div class="portal-modal-preview">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">Confirm changes</div>
                  <div class="portal-modal-description">Review your changes before saving.</div>
                </div>
                <sgds-close-button></sgds-close-button>
              </div>
              <div class="portal-modal-body"><p>This surface can be dismissed without saving.</p></div>
            </div>
          </div>`,
        },
        {
          title: "Do not use the close button to confirm or commit a task",
          description:
            "The close button only dismisses. For actions that save or submit work, use a labelled button so the outcome is clear.",
          tone: "dont",
          markup: `<div class="portal-demo-row">
            <span>Save changes</span>
            <sgds-close-button></sgds-close-button>
          </div>`,
        },
        {
          title: "Match the tone to the surface beneath it",
          description:
            "Use fixed-light on dark surfaces and fixed-dark on light fixed surfaces so the icon keeps enough contrast.",
          tone: "do",
          markup: `<div class="portal-demo-row portal-demo-row-inverse">
            <sgds-close-button tone="fixed-light"></sgds-close-button>
          </div>`,
        },
        {
          title: "Do not use the default tone on dark surfaces",
          description:
            "On dark or strongly coloured backgrounds, the default tone can fall below contrast. Use a fixed tone.",
          tone: "dont",
          markup: `<div class="portal-demo-row portal-demo-row-inverse">
            <sgds-close-button></sgds-close-button>
          </div>`,
        },
        {
          title: "Use the small size in dense surfaces",
          description:
            "Set size to sm inside compact surfaces such as toasts or inline alerts so the dismiss control fits in.",
          tone: "do",
          markup: `<div class="portal-demo-row"><sgds-close-button size="sm"></sgds-close-button></div>`,
        },
        {
          title:
            "Do not place the close button far from the surface it dismisses",
          description:
            "Anchor the close button inside or at the corner of the surface it controls so the relationship stays clear.",
          tone: "dont",
          markup: `<div class="portal-demo-stack">
            <sgds-close-button></sgds-close-button>
            <div>Modal content shown far below the close button.</div>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / close-button",
        rows: [
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the button close" },
          { category: "Border", name: "border-radius-sm", value: "sgds/border-radius/sm", mapKey: "border-radius", usage: "Corner radius of items inside the component" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Border of the button close" },
          { category: "Size", name: "dimension-24", value: "sgds/dimension/24", mapKey: "dimension", variant: "sm", usage: "Height of the button close; width of the button close" },
          { category: "Size", name: "dimension-32", value: "sgds/dimension/32", mapKey: "dimension", variant: "md", usage: "Height of the button close; width of the button close" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", variant: "sm", usage: "Height of the inner icon; width of the inner icon" },
          { category: "Colour", name: "bg-translucent", value: "sgds/bg-translucent", usage: "Background colour of the button close on hover" },
          { category: "Colour", name: "bg-translucent-fixed-dark", value: "sgds/bg-translucent-fixed-dark", usage: "Background colour of the button close on hover" },
          { category: "Colour", name: "bg-translucent-fixed-light", value: "sgds/bg-translucent-fixed-light", usage: "Background colour of the button close on hover" },
          { category: "Colour", name: "bg-transparent", value: "sgds/bg-transparent", usage: "Background colour of the button close" },
          { category: "Colour", name: "color-fixed-dark", value: "sgds/color-fixed-dark", usage: "Text colour of the button close" },
          { category: "Colour", name: "color-fixed-light", value: "sgds/color-fixed-light", usage: "Text colour of the button close" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the button close when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the button close when keyboard-focused" },
          { category: "Border", name: "close-btn-border-radius", value: "sgds/close-btn-border-radius", usage: "Corner radius of the button close" },
        ],
      },
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
        description: "Use combo box when users need to filter a longer list of options.",
      },
      {
        title: "Constrain choices",
        description: "Users can type to narrow options while still selecting valid values.",
      },
      {
        title: "Support single or multiple values",
        description: "Use single or multi-select modes based on the question.",
      },
    ],
    anatomyMarkup: `<div class="portal-anatomy-combo-stage">
      <sgds-combo-box
        class="portal-anatomy-combo-real"
        label="Label"
        data-anatomy-display-value="Filled text"
      >
        <sgds-combo-box-option value="housing">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-[2px]">
            <div class="portal-anatomy-combo-option-label">Option label</div>
            <div class="portal-anatomy-combo-option-secondary sgds:text-body-sm sgds:text-subtle">Secondary text</div>
          </div>
        </sgds-combo-box-option>
        <sgds-combo-box-option value="transport">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-[2px]">
            <div>Option label</div>
            <div class="sgds:text-body-sm sgds:text-subtle">Secondary text</div>
          </div>
        </sgds-combo-box-option>
        <sgds-combo-box-option value="health">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-[2px]">
            <div>Option label</div>
            <div class="sgds:text-body-sm sgds:text-subtle">Secondary text</div>
          </div>
        </sgds-combo-box-option>
      </sgds-combo-box>
    </div>`,
    anatomyParts: [
      { title: "Label" },
      { title: "Value (Placeholder text/Filled text)" },
      { title: "Input container" },
      { title: "Option label" },
      { title: "Secondary text (optional)" },
      { title: "Menu (dropdown)" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-anatomy-combo-real",
        targetShadowSelector: ".form-label",
        targetX: "left",
        targetY: "center",
        stemLengthToken: "--sgds-dimension-32",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: ".portal-anatomy-combo-real",
        targetShadowSelector: "input.form-control",
        targetX: "left",
        targetY: "center",
        stemLengthToken: "--sgds-dimension-32",
        alignBadgeWithCallout: 1,
      },
      {
        number: 3,
        direction: "right",
        targetSelector: ".portal-anatomy-combo-real",
        targetShadowSelector: ".form-control-group",
        targetX: "right",
        targetY: "center",
        stemLengthToken: "--sgds-dimension-32",
      },
      {
        number: 4,
        direction: "left",
        targetSelector: ".portal-anatomy-combo-stage",
        targetX: "left",
        targetY: "top",
        targetXOffset: 12,
        targetYOffset: 164,
        stemLengthToken: "--sgds-dimension-40",
        alignBadgeWithCallout: 1,
      },
      {
        number: 5,
        direction: "left",
        targetSelector: ".portal-anatomy-combo-stage",
        targetX: "left",
        targetY: "top",
        targetXOffset: 12,
        targetYOffset: 262,
        stemLengthToken: "--sgds-dimension-40",
        alignBadgeWithCallout: 1,
      },
      {
        number: 6,
        direction: "right",
        targetSelector: ".portal-anatomy-combo-stage",
        targetX: "right",
        targetY: "center",
        targetXOffset: -10,
        targetYOffset: 42,
        stemLengthToken: "--sgds-dimension-40",
        alignBadgeWithCallout: 3,
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds / combo-box",
        rows: [
          { category: "Padding", name: "form-padding-y", value: "sgds/form/padding/y", mapKey: "form-padding-y", usage: "Space between the top and bottom edges of the field and the typed value" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the combobox input container" },
          { category: "Border", name: "form-border-width-default", value: "sgds/form/border-width/default", usage: "Padding of the combobox input container" },
          { category: "Size", name: "dimension-48", value: "sgds/dimension/48", mapKey: "form-height", usage: "Height of the combo box input container" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the clear icon in the combo box" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the form clearable when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the form clearable when keyboard-focused" },
        ],
      },
    ],
    configurationDemos: [
      {
        title: "Hint text",
        description:
          "Add hint text to the combo box to clarify what users are searching for.",
        controlLabel: "Combo box hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-combo-box label="Country">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
          <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description: "The default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-combo-box label="Country" hintText="Start typing to filter the list">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
          <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description: "Hint text gives users guidance about what to type.",
          },
        ],
      },
      {
        title: "Placeholder",
        description:
          "Use placeholder text to suggest the kind of value the user can search for.",
        controlLabel: "Combo box placeholder options",
        defaultValue: "no-placeholder",
        options: [
          {
            label: "No placeholder",
            value: "no-placeholder",
            markup: `<sgds-combo-box label="Country">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description: "Empty input with no helper text inside.",
          },
          {
            label: "Placeholder",
            value: "placeholder",
            markup: `<sgds-combo-box label="Country" placeholder="Search countries">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description:
              "Placeholder appears in the input until the user types or selects.",
          },
        ],
      },
      {
        title: "Selection mode",
        description:
          "Combo boxes can accept a single value or multiple values through checkbox items. In multi-select, selected values wrap within the same field width and the control grows vertically as needed.",
        controlLabel: "Combo box selection mode options",
        defaultValue: "single",
        options: [
          {
            label: "Single select",
            value: "single",
            markup: `<sgds-combo-box label="Country">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
          <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description:
              "User picks one option; selecting another replaces the first.",
          },
          {
            label: "Multi select",
            value: "multi",
            markup: `<div class="sgds:w-full sgds:max-w-full sgds:min-w-0">
          <sgds-combo-box class="sgds:w-full sgds:max-w-full sgds:min-w-0" label="Countries" multiSelect badgeFullWidth>
            <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
            <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
            <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
          </sgds-combo-box>
        </div>`,
            description:
              "Each option becomes a checkbox; selected values appear as badges that wrap to new lines instead of stretching the field horizontally.",
          },
        ],
      },
      {
        title: "Disabled",
        description: "Disable the combo box so its value cannot be changed.",
        controlLabel: "Combo box disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-combo-box label="Country" value="sg">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-combo-box label="Country" value="sg" disabled>
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description:
              "The combo box appears muted and cannot receive input.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and a feedback message when the input is invalid.",
        controlLabel: "Combo box validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-combo-box label="Country">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description: "No feedback shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-combo-box label="Country" required hasFeedback invalid invalidFeedback="Select a country">
          <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
          <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        </sgds-combo-box>`,
            description:
              "Combo box shows error border and feedback message below.",
          },
        ],
      },
  {
        title: "Clearable",
        description:
          "Clearable combo boxes let users remove the selected value without deleting text manually.",
        controlLabel: "Combo box clearable options",
        defaultValue: "clearable",
        options: [
          {
            label: "Clearable",
            value: "clearable",
            markup: `<sgds-combo-box label="Agency" value="govtech" clearable>
              <sgds-combo-box-option value="govtech">GovTech</sgds-combo-box-option>
              <sgds-combo-box-option value="mci">MCI</sgds-combo-box-option>
            </sgds-combo-box>`,
            description:
              "Use clearable when users commonly need to reset a selected value.",
          },
          {
            label: "Not clearable",
            value: "not-clearable",
            markup: `<sgds-combo-box label="Agency" value="govtech">
              <sgds-combo-box-option value="govtech">GovTech</sgds-combo-box-option>
              <sgds-combo-box-option value="mci">MCI</sgds-combo-box-option>
            </sgds-combo-box>`,
            description: "Use the default when clearing is not a common action.",
          },
        ],
      },
      {
        title: "Loading and empty state",
        description:
          "Use loading and empty async menu states when combo box options are retrieved after the user searches.",
        controlLabel: "Combo box async options",
        defaultValue: "loading",
        options: [
          {
            label: "Loading",
            value: "loading",
            markup: `<sgds-combo-box label="Agency" placeholder="Search agency" loading>
              <sgds-combo-box-option value="govtech">GovTech</sgds-combo-box-option>
            </sgds-combo-box>`,
            description: "Use loading while options are being fetched.",
          },
          {
            label: "Empty async",
            value: "empty",
            markup: `<sgds-combo-box label="Agency" placeholder="Search agency" async emptyMenuAsync></sgds-combo-box>`,
            description:
              "Use an empty async state when the search returns no available options.",
          },
        ],
      },
      {
        title: "Multi-select badge width",
        description:
          "Multi-select selections can use full-width badges when labels need to align in a stacked layout.",
        controlLabel: "Combo box badge width options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-combo-box label="Topics" multiSelect value="finance;health">
              <sgds-combo-box-option value="finance">Finance and procurement services</sgds-combo-box-option>
              <sgds-combo-box-option value="health">Health support services</sgds-combo-box-option>
            </sgds-combo-box>`,
            description:
              "Use the default badge width for short selected labels.",
          },
          {
            label: "Full width",
            value: "full-width",
            markup: `<sgds-combo-box label="Topics" multiSelect value="finance;health" badgeFullWidth>
              <sgds-combo-box-option value="finance">Finance and procurement services</sgds-combo-box-option>
              <sgds-combo-box-option value="health">Health support services</sgds-combo-box-option>
            </sgds-combo-box>`,
            description:
              "Use full-width badges when selected labels need a stronger stacked rhythm.",
          },
        ],
      },
      {
        title: "Disabled option",
        description:
          "Individual combo box items can be disabled when an option is unavailable.",
        controlLabel: "Combo box option state",
        defaultValue: "available",
        options: [
          {
            label: "Available",
            value: "available",
            markup: `<sgds-combo-box label="Agency" value="govtech">
              <sgds-combo-box-option value="govtech">GovTech</sgds-combo-box-option>
              <sgds-combo-box-option value="mci">MCI</sgds-combo-box-option>
            </sgds-combo-box>`,
            description: "Use available options for selectable values.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-combo-box label="Agency">
              <sgds-combo-box-option value="govtech">GovTech</sgds-combo-box-option>
              <sgds-combo-box-option value="mci" disabled>MCI unavailable</sgds-combo-box-option>
            </sgds-combo-box>`,
            description:
              "Use disabled options when the choice should remain visible but cannot be selected.",
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
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-combo-box label="Categories" placeholder="Search categories" multiSelect value="housing">
          <sgds-combo-box-option value="housing">Housing</sgds-combo-box-option>
          <sgds-combo-box-option value="transport">Transport</sgds-combo-box-option>
          <sgds-combo-box-option value="health">Health</sgds-combo-box-option>
        </sgds-combo-box>`,
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "Use combo box for longer option lists",
          description:
            "Use combo box when the list is long enough that typing helps users reach an option faster than scrolling.",
          tone: "do",
          markup: `<sgds-combo-box label="Country" hintText="Type to filter the list">
            <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
            <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
            <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
            <sgds-combo-box-option value="th">Thailand</sgds-combo-box-option>
            <sgds-combo-box-option value="vn">Vietnam</sgds-combo-box-option>
          </sgds-combo-box>`,
        },
        {
          title: "Do not use combo box for very short lists",
          description:
            "For a small number of options, use a simpler control such as radio buttons or select instead.",
          tone: "dont",
          markup: `<sgds-combo-box label="Preferred contact method">
            <sgds-combo-box-option value="email">Email</sgds-combo-box-option>
            <sgds-combo-box-option value="sms">SMS</sgds-combo-box-option>
          </sgds-combo-box>`,
        },
        {
          title: "Use a clear label and supporting hint",
          description:
            "Keep the visible label specific, and use hint text to clarify what users can search for.",
          tone: "do",
          markup: `<sgds-combo-box label="Service category" hintText="Search by service name or topic">
            <sgds-combo-box-option value="housing">Housing grants</sgds-combo-box-option>
            <sgds-combo-box-option value="transport">Transport licences</sgds-combo-box-option>
            <sgds-combo-box-option value="health">Health subsidies</sgds-combo-box-option>
          </sgds-combo-box>`,
        },
        {
          title: "Do not rely on placeholder as the only instruction",
          description:
            "Placeholder text disappears once users type. Keep the field label visible so the purpose stays clear.",
          tone: "dont",
          markup: `<sgds-combo-box placeholder="Search services">
            <sgds-combo-box-option value="housing">Housing grants</sgds-combo-box-option>
            <sgds-combo-box-option value="transport">Transport licences</sgds-combo-box-option>
            <sgds-combo-box-option value="health">Health subsidies</sgds-combo-box-option>
          </sgds-combo-box>`,
        },
        {
          title: "Keep option text specific and searchable",
          description:
            "Use option labels that match the words users are likely to type so filtering stays reliable.",
          tone: "do",
          markup: `<sgds-combo-box label="Agency">
            <sgds-combo-box-option value="mom">Ministry of Manpower (MOM)</sgds-combo-box-option>
            <sgds-combo-box-option value="moh">Ministry of Health (MOH)</sgds-combo-box-option>
            <sgds-combo-box-option value="msf">Ministry of Social and Family Development (MSF)</sgds-combo-box-option>
          </sgds-combo-box>`,
        },
        {
          title: "Do not use combo box as free-text input",
          description:
            "Combo box is for filtering and selecting from provided options. For custom values, use a text input.",
          tone: "dont",
          markup: `<sgds-combo-box label="School name">
            <sgds-combo-box-option value="school-a">School A</sgds-combo-box-option>
            <sgds-combo-box-option value="school-b">School B</sgds-combo-box-option>
            <sgds-combo-box-option value="school-c">School C</sgds-combo-box-option>
          </sgds-combo-box>`,
        },
      ],
    },
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
        title: "Select a date",
        description: "The calendar view helps users choose dates with surrounding context.",
      },
      {
        title: "Allow typing or picking",
        description: "Users can enter a date in the input or choose one from the calendar.",
      },
      {
        title: "Reduce date ambiguity",
        description: "Use a shared date pattern so users know what format to enter.",
      },
    ],
    measurements: [
      {
        title: "Default",
        description: "Datepicker combines an input, trigger button, and calendar dropdown.",
        markup: `<sgds-datepicker class="portal-structure-datepicker" label="Appointment date" value="22/12/2024" menuisopen noflip></sgds-datepicker>`,
      },
    ],
    anatomyMarkup: `<sgds-datepicker class="portal-anatomy-datepicker" mode="range" label="Label" value="12/05/2026 - 25/05/2026"></sgds-datepicker>`,
    anatomyParts: [
      { title: "Label" },
      { title: "Value" },
      { title: "Input container" },
      { title: "Month navigators" },
      { title: "Month and year" },
      { title: "Days" },
      { title: "Current date" },
      { title: "Container" },
      { title: "Date range start" },
      { title: "Date range selected" },
      { title: "Date range end" },
      { title: "Date" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-input >>> .form-label", targetX: "left", targetY: "center" },
      { number: 2, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-input >>> input.form-control", targetX: "left", targetY: "center", alignBadgeWithCallout: 1 },
      { number: 3, direction: "right", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-icon-button[name='calendar']", targetX: "right", targetY: "center" },
      { number: 4, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-header >>> sgds-icon-button[name='arrow-left']", targetX: "left", targetY: "center", alignBadgeWithCallout: 1 },
      { number: 5, direction: "right", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-header >>> sgds-icon-button[name='arrow-right']", targetX: "right", targetY: "center", alignBadgeWithCallout: 3 },
      { number: 6, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-calendar >>> thead", targetX: "left", targetY: "center", alignBadgeWithCallout: 1 },
      { number: 7, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-calendar >>> td.today", targetX: "left", targetY: "center", alignBadgeWithCallout: 1 },
      { number: 8, direction: "right", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: ".dropdown-menu", targetX: "right", targetY: "bottom", targetYOffset: -44, alignBadgeWithCallout: 3 },
      { number: 9, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-calendar >>> td[data-day='12']", targetX: "left", targetY: "center", alignBadgeWithCallout: 1 },
      { number: 10, direction: "left", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-calendar >>> td[data-day='19']", targetX: "left", targetY: "center", alignBadgeWithCallout: 1 },
      { number: 11, direction: "right", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-calendar >>> td[data-day='25']", targetX: "right", targetY: "center", alignBadgeWithCallout: 3 },
      { number: 12, direction: "right", targetSelector: ".portal-anatomy-datepicker", targetShadowSelector: "sgds-datepicker-calendar >>> td[data-day='11']", targetX: "right", targetY: "center", alignBadgeWithCallout: 3 },
    ],
    configurationDemos: [
      {
        title: "Hint text",
        description: "Use hint text to clarify the expected date format.",
        controlLabel: "Datepicker hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date of birth"></sgds-datepicker>`,
            description: "Default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date of birth" hintText="Use the format DD/MM/YYYY"></sgds-datepicker>`,
            description: "Hint text reinforces the expected date format.",
          },
        ],
      },
      {
        title: "Selection mode",
        description: "Datepicker can collect a single date or a date range.",
        controlLabel: "Datepicker selection mode options",
        defaultValue: "single",
        options: [
          {
            label: "Single date",
            value: "single",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Appointment date" mode="single"></sgds-datepicker>`,
            description: "User picks one date from the calendar.",
          },
          {
            label: "Date range",
            value: "range",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Travel dates" mode="range"></sgds-datepicker>`,
            description: "User picks a start and end date.",
          },
        ],
      },
      {
        title: "Min and max date",
        description:
          "Restrict the selectable date window using `minDate` and `maxDate` as ISO strings.",
        controlLabel: "Datepicker date range options",
        defaultValue: "no-limits",
        options: [
          {
            label: "No limits",
            value: "no-limits",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date"></sgds-datepicker>`,
            description: "All dates can be selected.",
          },
          {
            label: "Min and max",
            value: "min-max",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date" minDate="2024-01-01T00:00:00.000Z" maxDate="2024-12-31T00:00:00.000Z"></sgds-datepicker>`,
            description: "Selection is constrained to dates within 2024.",
          },
        ],
      },
      {
        title: "Drop direction",
        description:
          "Control whether the calendar opens above or below the input.",
        controlLabel: "Datepicker drop direction options",
        defaultValue: "down",
        options: [
          {
            label: "Down",
            value: "down",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date" drop="down"></sgds-datepicker>`,
            description: "Calendar drops below the input.",
          },
          {
            label: "Up",
            value: "up",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date" drop="up"></sgds-datepicker>`,
            description:
              "Calendar opens above the input, useful near the bottom of a viewport.",
          },
        ],
      },
      {
        title: "Disabled",
        description: "Disable the datepicker so users cannot change the value.",
        controlLabel: "Datepicker disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date" value="22/12/2024"></sgds-datepicker>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date" value="22/12/2024" disabled></sgds-datepicker>`,
            description:
              "Input and calendar trigger appear muted and uneditable.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and a feedback message when the date is invalid.",
        controlLabel: "Datepicker validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date"></sgds-datepicker>`,
            description: "No feedback shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-datepicker class="portal-demo-datepicker" label="Date" required hasFeedback invalidFeedback="Enter a valid date"></sgds-datepicker>`,
            description:
              "Datepicker is configured to show the feedback message when validation fails.",
          },
        ],
      },
  {
        title: "Pre-selected value",
        description:
          "Use a value when the datepicker should open with an existing date or date range.",
        controlLabel: "Datepicker value options",
        defaultValue: "empty",
        options: [
          {
            label: "Empty",
            value: "empty",
            markup: `<sgds-datepicker label="Travel dates" mode="range"></sgds-datepicker>`,
            description: "Use empty when the user must provide a new date.",
          },
          {
            label: "Selected",
            value: "selected",
            markup: `<sgds-datepicker label="Travel dates" mode="range" value="12/05/2026 - 25/05/2026"></sgds-datepicker>`,
            description:
              "Use a selected value when editing an existing date or range.",
          },
        ],
      },
      {
        title: "Required",
        description:
          "Mark datepicker as required when the form cannot be submitted without a date.",
        controlLabel: "Datepicker required options",
        defaultValue: "optional",
        options: [
          {
            label: "Optional",
            value: "optional",
            markup: `<sgds-datepicker label="Appointment date"></sgds-datepicker>`,
            description: "Use optional when the date is not mandatory.",
          },
          {
            label: "Required",
            value: "required",
            markup: `<sgds-datepicker label="Appointment date" required></sgds-datepicker>`,
            description:
              "Use required only when the date is necessary to complete the task.",
          },
        ],
      },
      {
        title: "Auto-flipping",
        description:
          "Use noFlip to prevent the calendar from changing direction automatically.",
        controlLabel: "Datepicker auto-flipping options",
        defaultValue: "auto",
        options: [
          {
            label: "Auto",
            value: "auto",
            markup: `<sgds-datepicker label="Appointment date"></sgds-datepicker>`,
            description:
              "Allow the calendar to choose the best direction based on available space.",
          },
          {
            label: "No flip",
            value: "no-flip",
            markup: `<sgds-datepicker label="Appointment date" noFlip></sgds-datepicker>`,
            description:
              "Use noFlip only when the menu direction must remain fixed for layout reasons.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use datepicker when users need a guided way to enter a calendar date.",
        `<sgds-datepicker label="Appointment date"></sgds-datepicker>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use the datepicker for calendar-relevant dates",
          description:
            "Use the datepicker when the day of the week or surrounding dates matter, such as appointments or travel.",
          tone: "do",
          markup: `<sgds-datepicker label="Appointment date" hintText="Use the format DD/MM/YYYY"></sgds-datepicker>`,
        },
        {
          title: "Do not use the datepicker for dates the user already knows",
          description:
            "For dates users can recall and type confidently, like a date of birth, a plain text input is faster.",
          tone: "dont",
          markup: `<sgds-datepicker label="Date of birth"></sgds-datepicker>`,
        },
        {
          title: "Constrain the calendar to the dates users can actually choose",
          description: "Set `minDate` and `maxDate` to limit selection to valid dates. For example, future dates only when scheduling.",
          tone: "do",
          markup: `<sgds-datepicker label="Booking date" minDate="2026-01-01T00:00:00.000Z" maxDate="2026-12-31T00:00:00.000Z"></sgds-datepicker>`,
        },
        {
          title: "Do not leave the format ambiguous",
          description: "Use `hintText` to show the expected date format so users do not confuse day-month with month-day order.",
          tone: "dont",
          markup: `<sgds-datepicker label="Submission date"></sgds-datepicker>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / datepicker",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/form/padding/x", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/form/padding/y", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Gap", name: "form-gap-md", value: "sgds/form/gap/md", usage: "Spacing between items of the datepicker header" },
          { category: "Gap", name: "form-gap-sm", value: "sgds/form/gap/sm", usage: "Spacing between items of the dropdown menu" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of items inside the component" },
          { category: "Typography", name: "font-size-label-sm", value: "sgds/font-size/label-sm", usage: "Font size of month and year picker buttons" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the th; value of the sgds button" },
          { category: "Typography", name: "line-height-2-xs", value: "sgds/line-height/2-xs", usage: "Line height of month and year picker buttons" },
          { category: "Typography", name: "line-height-20", value: "sgds/line-height/20", usage: "Line height of the button.year; line height of the th" },
          { category: "Typography", name: "line-height-24", value: "sgds/line-height/24", usage: "Outer spacing of the calendar button" },
          { category: "Size", name: "dimension-48", value: "sgds/dimension/48", rawValue: "48px", mapKey: "dimension-48", usage: "Height of the input container" },
          { category: "Size", name: "dimension-160", value: "sgds/dimension/160", rawValue: "160px", mapKey: "dimension-160", usage: "Minimum width of the input" },
          { category: "Size", name: "dimension-320", value: "sgds/dimension/320", rawValue: "320px", mapKey: "dimension-320", usage: "Maximum width of the dropdown menu" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", usage: "Size of the datepicker calendar icon" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the td on hover; background colour of the td when keyboard-focused" },
          { category: "Colour", name: "form-color-default", value: "sgds/form/color/default", usage: "Text colour of the datepicker body" },
          { category: "Colour", name: "form-color-fixed-light", value: "sgds/form/color-fixed/light", usage: "Text colour of the td.active.selected ends when active" },
          { category: "Colour", name: "form-color-inverse", value: "sgds/form/color/inverse", usage: "Background colour of the today when active" },
          { category: "Colour", name: "form-primary-surface-default", value: "sgds/form/primary-surface-default", usage: "Background colour of the td.active.selected ends when active; background colour of the today" },
          { category: "Colour", name: "form-primary-surface-emphasis", value: "sgds/form/primary-surface-emphasis", usage: "Background colour of the td.active.selected ends on hover and when active" },
          { category: "Colour", name: "form-surface-default", value: "sgds/form/surface/default", usage: "Background colour of the dropdown menu" },
          { category: "Colour", name: "primary-surface-translucent", value: "sgds/primary/surface/translucent", usage: "Background colour of the td.active when active; background colour of the button.year.active when active" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the td.disabled when disabled" },
          { category: "Border", name: "form-border-radius-md", value: "sgds/form/border-radius/md", usage: "Corner radius of the sgds datepicker input; corner radius of the sgds icon button" },
          { category: "Border", name: "form-border-radius-sm", value: "sgds/form/border-radius/sm", usage: "Corner radius of the button.year; corner radius of the td.active when keyboard-focused and when active" },
          { category: "Size", name: "form-height-lg", value: "sgds/form/height-lg", usage: "Height of the th" },
          { category: "Outline", name: "form-outline-focus", value: "sgds/form/outline/focus", usage: "Focus outline of the td when keyboard-focused" },
          { category: "Outline", name: "form-outline-offset-focus", value: "sgds/form/outline-offset/focus", usage: "Focus-outline offset of the td when keyboard-focused" },
          { category: "Size", name: "form-width-md", value: "sgds/form/width-md", usage: "Width of the th" },
          { category: "Colour", name: "primary", value: "sgds/primary", usage: "Text colour of items inside the component; background colour of items inside the component" },
          { category: "Colour", name: "primary-100", value: "sgds/primary/100", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "primary-700", value: "sgds/primary/700", usage: "Background colour of items inside the component" },
        ],
      },
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
        description: "Use description lists for names and values, terms and definitions, or attributes and data.",
      },
      {
        title: "Support review",
        description: "Show entered details on summary or confirmation pages before users submit.",
      },
      {
        title: "Keep details readable",
        description: "The layout separates labels and values in a compact summary.",
      },
    ],
    anatomyParts: [
      { title: "Title", note: "(optional)" },
      { title: "Description", note: "(optional)" },
      { title: "Label" },
      { title: "Data" },
      { title: "Divider" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-description-list-title",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: ".portal-description-list-description",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-description-list-first-label",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 4,
        direction: "right",
        targetSelector: ".portal-description-list-first-data",
        targetX: "right",
        targetY: "center",
        alignBadgeWithCallout: 5,
      },
      {
        number: 5,
        direction: "right",
        targetSelector: ".portal-description-list-divider-target",
        targetShadowSelector: ".container",
        targetX: "right",
        targetY: "bottom",
      },
    ],
    anatomyMarkup: `<sgds-description-list-group class="portal-description-list-anatomy">
      <span slot="title" class="portal-description-list-title">Title</span>
      <span slot="description" class="portal-description-list-description">Description</span>
      <sgds-description-list>
        <span class="portal-description-list-first-label">Label</span>
        <span slot="data" class="portal-description-list-first-data">Data</span>
      </sgds-description-list>
      <sgds-description-list>
        <span>Label</span>
        <span slot="data">Data</span>
      </sgds-description-list>
      <sgds-description-list class="portal-description-list-divider-target">
        <span>Label</span>
        <span slot="data">Data</span>
      </sgds-description-list>
    </sgds-description-list-group>`,
    configurationDemos: [
      {
        title: "Layout direction",
        description:
          "Use `stacked` to display the label above the data instead of side by side.",
        controlLabel: "Description list layout options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-description-list-group>
          <sgds-description-list>
            Full name
            <span slot="data">Tan Mei Ling</span>
          </sgds-description-list>
          <sgds-description-list>
            Email
            <span slot="data">meiling.tan@example.gov.sg</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
            description:
              "Default layout displays the label and data side by side.",
          },
          {
            label: "Stacked",
            value: "stacked",
            markup: `<sgds-description-list-group stacked>
          <sgds-description-list stacked>
            Full name
            <span slot="data">Tan Mei Ling</span>
          </sgds-description-list>
          <sgds-description-list stacked>
            Email
            <span slot="data">meiling.tan@example.gov.sg</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
            description:
              "Stacks the label above the data for narrower layouts or longer values.",
          },
        ],
      },
      {
        title: "Bordered",
        description:
          "Use `bordered` to add dividers between each description list item and around the group.",
        controlLabel: "Description list border options",
        defaultValue: "no-border",
        options: [
          {
            label: "No border",
            value: "no-border",
            markup: `<sgds-description-list-group>
          <sgds-description-list>
            Application status
            <span slot="data">In review</span>
          </sgds-description-list>
          <sgds-description-list>
            Submitted on
            <span slot="data">12 Mar 2026</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
            description:
              "Borderless presentation suits compact summaries within other surfaces.",
          },
          {
            label: "Bordered",
            value: "bordered",
            markup: `<sgds-description-list-group bordered>
          <sgds-description-list bordered>
            Application status
            <span slot="data">In review</span>
          </sgds-description-list>
          <sgds-description-list bordered>
            Submitted on
            <span slot="data">12 Mar 2026</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
            description:
              "Adds a border around the group and dividers between rows for clearer separation.",
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
            <span>Application status</span>
            <span slot="data">Pending verification by service team</span>
          </sgds-description-list>
          <sgds-description-list>
            <span>Updated</span>
            <span slot="data">31 Mar 2026, 10:30am</span>
          </sgds-description-list>
        </sgds-description-list-group>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use description lists for read-only key-value pairs",
          description:
            "Description lists display paired information for review. Use them on summary, confirmation, and detail pages.",
          tone: "do",
          markup: `<sgds-description-list-group bordered>
            <sgds-description-list bordered>
              Application reference
              <span slot="data">SG-2026-04823</span>
            </sgds-description-list>
            <sgds-description-list bordered>
              Submitted on
              <span slot="data">12 Mar 2026</span>
            </sgds-description-list>
            <sgds-description-list bordered>
              Status
              <span slot="data">In review</span>
            </sgds-description-list>
          </sgds-description-list-group>`,
        },
        {
          title: "Do not use a description list for tabular data",
          description:
            "Use a table for row-by-row comparison. Description lists describe one entity at a time.",
          tone: "dont",
          markup: `<sgds-description-list-group>
            <sgds-description-list>
              Applicant 1
              <span slot="data">Tan Mei Ling. Approved</span>
            </sgds-description-list>
            <sgds-description-list>
              Applicant 2
              <span slot="data">Lim Wei Jie. Pending</span>
            </sgds-description-list>
            <sgds-description-list>
              Applicant 3
              <span slot="data">Nur Aisyah. Rejected</span>
            </sgds-description-list>
          </sgds-description-list-group>`,
        },
        {
          title: "Stack the layout when values are long",
          description:
            "Use the stacked layout when values wrap to multiple lines or in narrow columns and small screens.",
          tone: "do",
          markup: `<sgds-description-list-group stacked>
            <sgds-description-list stacked>
              Mailing address
              <span slot="data">Block 123, Toa Payoh Lorong 4, #08-456, Singapore 310123</span>
            </sgds-description-list>
            <sgds-description-list stacked>
              Notes from officer
              <span slot="data">Documents have been verified. Awaiting final approval from the assessment team.</span>
            </sgds-description-list>
          </sgds-description-list-group>`,
        },
        {
          title: "Keep labels short and consistent",
          description:
            "Use concise, parallel labels so users can scan the left column. Avoid sentence-style labels or colons.",
          tone: "do",
          markup: `<sgds-description-list-group>
            <sgds-description-list>
              Full name
              <span slot="data">Tan Mei Ling</span>
            </sgds-description-list>
            <sgds-description-list>
              Email
              <span slot="data">meiling.tan@example.gov.sg</span>
            </sgds-description-list>
            <sgds-description-list>
              Phone
              <span slot="data">+65 9123 4567</span>
            </sgds-description-list>
          </sgds-description-list-group>`,
        },
        {
          title: "Do not make labels hard to scan",
          description:
            "Avoid long question-style labels or inconsistent wording. Full-sentence content belongs elsewhere.",
          tone: "dont",
          markup: `<sgds-description-list-group>
            <sgds-description-list>
              What is the applicant's full legal name?
              <span slot="data">Tan Mei Ling</span>
            </sgds-description-list>
            <sgds-description-list>
              Email address:
              <span slot="data">meiling.tan@example.gov.sg</span>
            </sgds-description-list>
            <sgds-description-list>
              Contact number provided by applicant
              <span slot="data">+65 9123 4567</span>
            </sgds-description-list>
          </sgds-description-list-group>`,
        },
        {
          title: "Do not leave empty values without a placeholder",
          description:
            "If a value is missing, show a placeholder such as 'Not provided' rather than leaving the slot empty.",
          tone: "dont",
          markup: `<sgds-description-list-group>
            <sgds-description-list>
              Phone
              <span slot="data"></span>
            </sgds-description-list>
            <sgds-description-list>
              Alternate email
              <span slot="data"></span>
            </sgds-description-list>
          </sgds-description-list-group>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / description-list",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/xl", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/lg", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Gap", name: "gap-2-xl", value: "sgds/gap/2-xl", usage: "Spacing between items of the container" },
          { category: "Gap", name: "gap-2-xs", value: "sgds/gap/2-xs", usage: "Spacing between items of the container" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the header" },
          { category: "Border", name: "border-color-muted", value: "sgds/border-color-muted", usage: "Border of the container; bottom border of the has header" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", mapKey: "border-radius", usage: "Corner radius of the container" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Border of the container; bottom border of the has header" },
          { category: "Typography", name: "font-size-16", value: "sgds/font-size/16", usage: "Font size of the content; font size of the label" },
          { category: "Typography", name: "font-size-24", value: "sgds/font-size/24", usage: "Font size of the content" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight of the content; font weight of the data" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the content; font weight of the label" },
          { category: "Typography", name: "letter-spacing-tight", value: "sgds/letter-spacing/tight", usage: "Letter spacing of the content" },
          { category: "Typography", name: "line-height-24", value: "sgds/line-height/24", usage: "Line height of the content" },
          { category: "Typography", name: "line-height-32", value: "sgds/line-height/32", usage: "Line height of the content" },
          { category: "Size", name: "dimension-280", value: "sgds/dimension/280", usage: "Maximum width of the label container" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the label" },
          { category: "Colour", name: "color-subtle", value: "sgds/color-subtle", usage: "Text colour of the content; text colour of the data" },
          { category: "Colour", name: "heading-color-default", value: "sgds/heading-color-default", usage: "Text colour of the content" },
        ],
      },
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
        title: "Separate content",
        description: "Use dividers to mark a clear break between related sections.",
      },
      {
        title: "Add light structure",
        description: "A divider separates content with less weight than a card or container.",
      },
      {
        title: "Work across orientations",
        description: "Use horizontal or vertical dividers to fit the layout direction.",
      },
    ],
    anatomyParts: [{ title: "Divider" }],
    anatomyCallouts: [
      {
        number: 1,
        direction: "right",
        targetSelector: "sgds-divider",
        targetX: "right",
        targetY: "center",
      },
    ],
    anatomyMarkup: `<sgds-divider class="sgds:w-[var(--sgds-dimension-280)]"></sgds-divider>`,
    measurements: [
      {
        title: "Default",
        description: "Divider thickness is set with the `thickness` prop.",
        markup: `<div class="sgds:w-full"><sgds-divider thickness="thin"></sgds-divider></div>`,
      },
    ],
    configurationDemos: [
      {
        title: "Orientation",
        description:
          "Dividers can run horizontally or vertically depending on the layout direction of the content they separate.",
        controlLabel: "Divider orientation options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<div class="sgds:w-full"><sgds-divider></sgds-divider></div>`,
            description:
              "Use to separate content stacked vertically, such as between sections, list rows, or form groups.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<div class="portal-demo-row sgds:h-12"><span>Left</span><sgds-divider orientation="vertical"></sgds-divider><span>Right</span></div>`,
            description:
              "Use to separate content placed side by side, such as between columns, inline labels, or adjacent actions.",
          },
        ],
      },
      {
        title: "Thickness",
        description:
          "Divider thickness controls how heavy the rule appears, letting you match the visual weight to the importance of the separation.",
        controlLabel: "Divider thickness options",
        defaultValue: "thin",
        options: [
          {
            label: "Thin",
            value: "thin",
            markup: `<div class="sgds:w-full"><sgds-divider thickness="thin"></sgds-divider></div>`,
            description:
              "The default. Use for subtle separation between closely related content such as list rows or paragraphs.",
          },
          {
            label: "Thick",
            value: "thick",
            markup: `<div class="sgds:w-full"><sgds-divider thickness="thick"></sgds-divider></div>`,
            description:
              "Use for clearer separation between distinct sections of a page where the rule should be more noticeable.",
          },
          {
            label: "Thicker",
            value: "thicker",
            markup: `<div class="sgds:w-full"><sgds-divider thickness="thicker"></sgds-divider></div>`,
            description:
              "Use for the strongest visual separation, such as between major page regions where a heavier rule is needed for clear hierarchy.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a divider to separate related groups within a section",
          description:
            "Use a divider when content sits close together but represents distinct ideas within the same surface.",
          tone: "do",
          markup: `<div class="portal-demo-stack">
            <p>Personal details</p>
            <sgds-divider></sgds-divider>
            <p>Contact information</p>
          </div>`,
        },
        {
          title: "Do not use a divider when spacing alone is enough",
          description:
            "If the layout already has clear spacing between sections, a divider only adds noise. Use spacing first.",
          tone: "dont",
          markup: `<div class="portal-demo-stack">
            <h3>Section title</h3>
            <sgds-divider></sgds-divider>
            <p>Short paragraph that already has generous spacing above and below.</p>
            <sgds-divider></sgds-divider>
            <p>Another paragraph.</p>
          </div>`,
        },
        {
          title: "Match the divider orientation to the layout direction",
          description:
            "Use a vertical divider only between side-by-side content. Use the horizontal default everywhere else.",
          tone: "do",
          markup: `<div class="portal-demo-row sgds:h-12">
            <span>Edit</span>
            <sgds-divider orientation="vertical"></sgds-divider>
            <span>Duplicate</span>
            <sgds-divider orientation="vertical"></sgds-divider>
            <span>Delete</span>
          </div>`,
        },
        {
          title: "Use thicker dividers sparingly",
          description:
            "Reserve thicker rules for the strongest separation between major page regions to keep hierarchy clear.",
          tone: "do",
          markup: `<div class="portal-demo-stack">
            <p>Account settings</p>
            <sgds-divider thickness="thicker"></sgds-divider>
            <p>Notification preferences</p>
          </div>`,
        },
        {
          title: "Do not make every divider heavy",
          description:
            "Avoid thick dividers between every small group. Equal weight hides which separations matter.",
          tone: "dont",
          markup: `<div class="portal-demo-stack">
            <p>Profile details</p>
            <sgds-divider thickness="thicker"></sgds-divider>
            <p>Contact details</p>
            <sgds-divider thickness="thicker"></sgds-divider>
            <p>Notification settings</p>
          </div>`,
        },
        {
          title: "Do not use a divider as a decorative element",
          description:
            "A divider should always carry meaning. Rules added purely for visual rhythm make structure harder to read.",
          tone: "dont",
          markup: `<div class="portal-demo-stack">
            <sgds-divider></sgds-divider>
            <h3>Section title</h3>
            <sgds-divider></sgds-divider>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / divider",
        rows: [
          { category: "Border", name: "border-color-muted", value: "sgds/border-color-muted", usage: "Top border of items inside the component; left border of items inside the component" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", variant: "Thin", usage: "Border thickness of items inside the component" },
          { category: "Border", name: "border-width-2", value: "sgds/border-width/2", mapKey: "border-width", variant: "Thick", usage: "Border thickness of items inside the component" },
          { category: "Border", name: "border-width-4", value: "sgds/border-width/4", mapKey: "border-width", variant: "Thicker", usage: "Border thickness of items inside the component" },
        ],
      },
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
        title: "Open a side panel",
        description: "Drawers reveal extra content or controls from the edge of the screen.",
      },
      {
        title: "Keep context nearby",
        description: "Use drawers for content that relates to the current page.",
      },
      {
        title: "Support secondary tasks",
        description: "Drawers work well for filters, settings, and supporting details.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      { title: "Title", note: "(optional)" },
      { title: "Description", note: "(optional)" },
      { title: "Slot", note: "(optional)" },
      { title: "Scrim", note: "(optional)" },
      { title: "Close button", note: "(optional)" },
      { title: "Scrollbar", note: "(situational)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-drawer-anatomy-panel", targetX: "center", targetY: "top" },
      { number: 2, direction: "top", targetSelector: ".portal-drawer-anatomy-title", targetX: "center", targetY: "top" },
      { number: 3, direction: "top", targetSelector: ".portal-drawer-anatomy-description", targetX: "left", targetY: "top", targetXOffset: 68 },
      { number: 4, direction: "right", targetSelector: ".portal-drawer-anatomy-slot", targetX: "right", targetY: "center" },
      { number: 5, direction: "left", targetSelector: ".portal-drawer-anatomy-scrim", targetX: "center", targetY: "center", stemLengthToken: "--sgds-dimension-160" },
      { number: 6, direction: "top", targetSelector: ".portal-drawer-anatomy-close", targetX: "center", targetY: "top" },
      { number: 7, direction: "right", targetSelector: ".portal-drawer-anatomy-scrollbar", targetX: "right", targetY: "center" },
    ],
    anatomyMarkup: `<svg class="portal-drawer-anatomy" width="560" height="288" viewBox="0 0 560 288" role="img" aria-label="Drawer anatomy diagram">
      <rect class="portal-drawer-anatomy-scrim" x="0" y="0" width="240" height="288" fill="var(--sgds-bg-overlay)"></rect>
      <g class="portal-drawer-anatomy-panel">
        <rect x="240" y="0" width="320" height="288" fill="var(--sgds-surface-default)" stroke="var(--sgds-border-color-muted)" stroke-width="1"></rect>
        <g transform="translate(264 24)">
          <text class="portal-drawer-anatomy-title" x="0" y="20" fill="var(--sgds-color-default)" font-family="Inter, sans-serif" font-size="20" font-weight="600">Title</text>
          <text class="portal-drawer-anatomy-description" x="0" y="48" fill="var(--sgds-color-subtle)" font-family="Inter, sans-serif" font-size="16">Description</text>
        </g>
        <g class="portal-drawer-anatomy-close" transform="translate(512 24)">
          <circle cx="16" cy="16" r="16" fill="transparent"></circle>
          <path d="M10 10L22 22M22 10L10 22" stroke="var(--sgds-color-default)" stroke-width="2" stroke-linecap="round"></path>
        </g>
        <rect class="portal-drawer-anatomy-slot" x="264" y="96" width="272" height="88" rx="0" fill="var(--sgds-accent-surface-muted)" stroke="var(--sgds-link-color-default)" stroke-width="1" stroke-dasharray="4 4"></rect>
        <text x="288" y="146" fill="var(--sgds-link-color-default)" font-family="Inter, sans-serif" font-size="16">Default slot content</text>
        <rect class="portal-drawer-anatomy-scrollbar" x="550" y="76" width="2" height="48" rx="1" fill="var(--sgds-border-color-muted)"></rect>
      </g>
    </svg>`,
    configurationDemos: [
      {
        title: "Placement",
        description:
          "Drawers slide in from any edge of the screen. Choose the edge that best matches the relationship between the drawer content and the page beneath it.",
        controlLabel: "Drawer placement options",
        defaultValue: "end",
        options: [
          {
            label: "Start",
            value: "start",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="start">
            <span slot="title" class="sgds:font-semibold">Start drawer</span>
            <span slot="description">Slides in from the leading edge.</span>
            <p>Useful for navigation or filters.</p>
          </sgds-drawer>
        </div>`,
            description:
              "Enters from the leading edge, typical for navigation.",
          },
          {
            label: "End",
            value: "end",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="end">
            <span slot="title" class="sgds:font-semibold">End drawer</span>
            <span slot="description">Slides in from the trailing edge.</span>
            <p>Common for detail panels or settings.</p>
          </sgds-drawer>
        </div>`,
            description:
              "Default placement, suitable for inspector and detail panels.",
          },
          {
            label: "Top",
            value: "top",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="top">
            <span slot="title" class="sgds:font-semibold">Top drawer</span>
            <span slot="description">Drops down from the top edge.</span>
            <p>Useful for short alerts or system messages.</p>
          </sgds-drawer>
        </div>`,
            description: "Drops in from the top, useful for short banners.",
          },
          {
            label: "Bottom",
            value: "bottom",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="bottom">
            <span slot="title" class="sgds:font-semibold">Bottom drawer</span>
            <span slot="description">Rises from the bottom edge.</span>
            <p>Commonly used on mobile for short actions.</p>
          </sgds-drawer>
        </div>`,
            description: "Rises from the bottom, common for mobile sheets.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Choose a size that matches how much content the drawer holds.",
        controlLabel: "Drawer size options",
        defaultValue: "sm",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="end" size="sm">
            <span slot="title" class="sgds:font-semibold">Small drawer</span>
            <span slot="description">Compact panel for short content.</span>
            <p>Suits short actions or summaries.</p>
          </sgds-drawer>
        </div>`,
            description: "Default compact size for short content.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="end" size="md">
            <span slot="title" class="sgds:font-semibold">Medium drawer</span>
            <span slot="description">Balanced panel for typical detail views.</span>
            <p>Suits forms and rich content.</p>
          </sgds-drawer>
        </div>`,
            description: "Wider panel that suits forms and detail views.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-demo-overlay">
          <sgds-drawer open contained placement="end" size="lg">
            <span slot="title" class="sgds:font-semibold">Large drawer</span>
            <span slot="description">Spacious panel for dense content.</span>
            <p>Use when the drawer needs to feel like a workspace.</p>
          </sgds-drawer>
        </div>`,
            description:
              "Spacious panel that approaches the size of a sidebar workspace.",
          },
        ],
      },
  {
        title: "Contained",
        description:
          "Contained drawers stay within their parent surface instead of covering the full viewport.",
        controlLabel: "Drawer containment options",
        defaultValue: "viewport",
        options: [
          {
            label: "Viewport",
            value: "viewport",
            markup: `<div class="portal-demo-overlay">
              <sgds-drawer open size="sm">
                <span slot="title">Drawer title</span>
                <span slot="description">This drawer is positioned against the viewport.</span>
              </sgds-drawer>
            </div>`,
            description:
              "Use the default viewport drawer for page-level tasks.",
          },
          {
            label: "Contained",
            value: "contained",
            markup: `<div class="portal-demo-overlay">
              <sgds-drawer open contained size="sm">
                <span slot="title">Drawer title</span>
                <span slot="description">This drawer is constrained to its parent demo area.</span>
              </sgds-drawer>
            </div>`,
            description:
              "Use contained only inside a bounded application surface that owns the drawer interaction.",
          },
        ],
      },
      {
        title: "Footer slot",
        description:
          "Use the footer slot for the primary actions that complete or dismiss the drawer task.",
        controlLabel: "Drawer footer options",
        defaultValue: "with-footer",
        options: [
          {
            label: "With footer",
            value: "with-footer",
            markup: `<div class="portal-demo-overlay">
              <sgds-drawer open contained size="sm">
                <span slot="title">Review details</span>
                <span slot="description">Confirm the information before continuing.</span>
                <div slot="footer" class="portal-demo-row">
                  <sgds-button>Confirm</sgds-button>
                  <sgds-button variant="outline">Cancel</sgds-button>
                </div>
              </sgds-drawer>
            </div>`,
            description:
              "Use a footer when the drawer contains a task that needs actions.",
          },
          {
            label: "No footer",
            value: "no-footer",
            markup: `<div class="portal-demo-overlay">
              <sgds-drawer open contained size="sm">
                <span slot="title">Information</span>
                <span slot="description">Use this layout for read-only drawer content.</span>
              </sgds-drawer>
            </div>`,
            description: "Omit the footer for read-only supporting content.",
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
            <span slot="title" class="sgds:font-semibold">Edit details</span>
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
    usage: {
      bestPractices: [
        {
          title: "Use a drawer for supporting tasks alongside the main page",
          description:
            "Drawers work best for filters, settings, or detail panels. Users keep the page in view while they work.",
          tone: "do",
          markup: `<sgds-drawer open contained placement="end" size="sm">
            <span slot="title" class="sgds:font-semibold">Filter results</span>
            <span slot="description">Refine the list without leaving the page.</span>
            <p>Adjust filters and apply them when you are done.</p>
            <div slot="footer" class="portal-demo-row">
              <sgds-button variant="outline">Reset</sgds-button>
              <sgds-button>Apply filters</sgds-button>
            </div>
          </sgds-drawer>`,
        },
        {
          title: "Do not use a drawer for critical confirmations",
          description:
            "Decisions that block progress or are irreversible belong in a modal, where users must respond first.",
          tone: "dont",
          markup: `<sgds-drawer open contained placement="end" size="sm">
            <span slot="title" class="sgds:font-semibold">Delete account</span>
            <span slot="description">This action cannot be undone.</span>
            <p>Are you sure you want to permanently delete your account?</p>
            <div slot="footer" class="portal-demo-row">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button variant="danger">Delete account</sgds-button>
            </div>
          </sgds-drawer>`,
        },
        {
          title: "Anchor the drawer to the edge that matches the content",
          description:
            "Use end for detail panels, start for navigation, and bottom for mobile sheets so placement matches purpose.",
          tone: "do",
          markup: `<sgds-drawer open contained placement="end" size="md">
            <span slot="title" class="sgds:font-semibold">Booking details</span>
            <span slot="description">Reference number SG-20260427</span>
            <p>Reviewing details on the right keeps the booking list visible.</p>
          </sgds-drawer>`,
        },
        {
          title: "Do not stack multiple drawers on top of each other",
          description:
            "Opening a second drawer from inside another hides the first context. Resolve the current one first.",
          tone: "dont",
          markup: `<div class="portal-demo-overlay">
            <sgds-drawer open contained placement="end" size="sm">
              <span slot="title" class="sgds:font-semibold">Edit profile</span>
              <p>Update your details below.</p>
            </sgds-drawer>
            <sgds-drawer open contained placement="end" size="sm">
              <span slot="title" class="sgds:font-semibold">Change password</span>
              <p>Enter your new password.</p>
            </sgds-drawer>
          </div>`,
        },
        {
          title: "Provide a clear way to close the drawer",
          description:
            "Include a footer action such as Save or Cancel, paired with the built-in close, so users have an obvious exit.",
          tone: "do",
          markup: `<sgds-drawer open contained placement="end" size="sm">
            <span slot="title" class="sgds:font-semibold">Edit details</span>
            <span slot="description">Update and save your changes.</span>
            <p>Make changes to the form below.</p>
            <div slot="footer" class="portal-demo-row">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Save changes</sgds-button>
            </div>
          </sgds-drawer>`,
        },
        {
          title: "Do not use a drawer when navigation would be clearer",
          description:
            "If the content is a full task or page on its own, send users to a dedicated page instead of a drawer.",
          tone: "dont",
          markup: `<sgds-drawer open contained placement="end" size="lg">
            <span slot="title" class="sgds:font-semibold">Submit a new application</span>
            <span slot="description">A multi-step form with eligibility checks.</span>
            <p>This long task includes uploads, multiple steps, and a review screen.</p>
          </sgds-drawer>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / drawer",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/2-xl", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/2-xl", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-lg", value: "sgds/padding/lg", usage: "Padding of the drawer header; padding of the content" },
          { category: "Padding", name: "padding-none", value: "sgds/padding/none", usage: "Bottom padding of the drawer header" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the drawer header" },
          { category: "Margin", name: "margin-none", value: "sgds/margin/none", usage: "Outer spacing of the content" },
          { category: "Typography", name: "font-size-24", value: "sgds/font-size/24", usage: "Font size of the content" },
          { category: "Size", name: "dimension-512", value: "sgds/dimension/512", mapKey: "dimension", usage: "Width of the drawer panel; height of the drawer panel (small)" },
          { category: "Size", name: "dimension-768", value: "sgds/dimension/768", usage: "Width of the drawer panel; height of the drawer panel (medium)" },
          { category: "Size", name: "dimension-1024", value: "sgds/dimension/1024", usage: "Width of the drawer panel; height of the drawer panel (large)" },
          { category: "Colour", name: "bg-overlay", value: "sgds/bg-overlay", usage: "Background colour of the drawer overlay" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the content" },
          { category: "Colour", name: "color-subtle", value: "sgds/color-subtle", usage: "Text colour of the content" },
          { category: "Colour", name: "surface-default", value: "sgds/surface-default", usage: "Background colour of the drawer panel; background colour of the content" },
          { category: "Layer", name: "z-index-modal", value: "sgds/z-index-modal", usage: "Stacking layer of the drawer fixed" },
        ],
      },
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
        title: "Show extra actions",
        description: "Use dropdowns to keep secondary actions or links available on demand.",
      },
      {
        title: "Stay tied to a trigger",
        description: "The menu opens from the control that launched it, keeping context clear.",
      },
      {
        title: "Organise menu content",
        description: "Use items, icons, and dividers to group related options.",
      },
    ],
    anatomyMarkup: `<sgds-dropdown class="portal-anatomy-dropdown" menuisopen noFlip>
      <sgds-icon-button class="portal-anatomy-dropdown-action" slot="toggler" name="chevron-down" variant="outline" ariaLabel="Open menu" active></sgds-icon-button>
      <sgds-dropdown-item>
        <a href="#">
          <sgds-icon class="portal-anatomy-dropdown-menu-icon" name="gear" size="md" aria-hidden="true"></sgds-icon>
          <span class="portal-anatomy-dropdown-menu-label">Menu label</span>
        </a>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <a href="#">
          <sgds-icon name="gear" size="md" aria-hidden="true"></sgds-icon>
          <span>Menu label</span>
        </a>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <a href="#">
          <sgds-icon name="gear" size="md" aria-hidden="true"></sgds-icon>
          <span>Menu label</span>
        </a>
      </sgds-dropdown-item>
      <sgds-dropdown-item>
        <a href="#">
          <sgds-icon name="gear" size="md" aria-hidden="true"></sgds-icon>
          <span class="portal-anatomy-dropdown-bottom-menu-label">Menu label</span>
        </a>
      </sgds-dropdown-item>
    </sgds-dropdown>`,
    anatomyParts: [
      { title: "Action" },
      { title: "Icon (optional)" },
      { title: "Label" },
      { title: "Container" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-anatomy-dropdown-action",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: ".portal-anatomy-dropdown-menu-icon",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 3,
        direction: "bottom",
        targetSelector: ".portal-anatomy-dropdown-bottom-menu-label",
        targetX: "center",
        targetY: "bottom",
      },
      {
        number: 4,
        direction: "right",
        targetSelector: ".portal-anatomy-dropdown",
        targetShadowSelector: ".dropdown-menu",
        targetX: "right",
        targetY: "center",
      },
    ],
    configurationDemos: [
      {
        title: "Drop direction",
        description:
          "Drop direction controls where the menu opens relative to the trigger. Pick the direction with the most available space.",
        controlLabel: "Dropdown drop direction options",
        defaultValue: "down",
        options: [
          {
            label: "Down",
            value: "down",
            markup: `<sgds-dropdown drop="down">
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Sign out</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description:
              "Menu opens below the trigger. This is the default behaviour.",
          },
          {
            label: "Up",
            value: "up",
            markup: `<sgds-dropdown drop="up">
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Sign out</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description:
              "Menu opens above the trigger, useful near the bottom of the page.",
          },
          {
            label: "Left",
            value: "left",
            markup: `<sgds-dropdown drop="left">
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description: "Menu opens to the leading side of the trigger.",
          },
          {
            label: "Right",
            value: "right",
            markup: `<sgds-dropdown drop="right">
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description: "Menu opens to the trailing side of the trigger.",
          },
        ],
      },
      {
        title: "Menu alignment",
        description:
          "Align the menu to the trigger's start or end. Use right alignment when the trigger sits near the trailing edge of the screen.",
        controlLabel: "Dropdown menu alignment options",
        defaultValue: "start",
        options: [
          {
            label: "Start",
            value: "start",
            markup: `<sgds-dropdown>
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description:
              "Default alignment, menu lines up with the trigger's leading edge.",
          },
          {
            label: "End",
            value: "end",
            markup: `<sgds-dropdown menuAlignRight>
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description:
              "Menu's right edge lines up with the trigger's right edge.",
          },
        ],
      },
      {
        title: "Auto-flipping",
        description:
          "By default the menu flips to stay in view. Disable flipping when you need the menu to stay anchored in a fixed direction.",
        controlLabel: "Dropdown flip options",
        defaultValue: "flip",
        options: [
          {
            label: "Flip",
            value: "flip",
            markup: `<sgds-dropdown>
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description:
              "Menu flips to the opposite side when there is not enough space.",
          },
          {
            label: "No flip",
            value: "no-flip",
            markup: `<sgds-dropdown noFlip>
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description:
              "Menu always opens in the configured direction, even if it overflows.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Disable the dropdown when the action is not currently available.",
        controlLabel: "Dropdown disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-dropdown>
          <sgds-button slot="toggler" ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description: "Default state. The toggler opens the menu on click.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-dropdown disabled>
          <sgds-button slot="toggler" disabled ariaLabel="Open menu">Open menu</sgds-button>
          <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
        </sgds-dropdown>`,
            description: "The toggler is inert and the menu cannot be opened.",
          },
        ],
      },
  {
        title: "Item state",
        description:
          "Dropdown items can show active or disabled states inside the menu.",
        controlLabel: "Dropdown item state options",
        defaultValue: "active",
        options: [
          {
            label: "Active",
            value: "active",
            markup: `<sgds-dropdown class="portal-demo-dropdown-active">
              <sgds-button slot="toggler" variant="outline" ariaLabel="Open menu">Open menu</sgds-button>
              <sgds-dropdown-item active><a href="#">Active item</a></sgds-dropdown-item>
              <sgds-dropdown-item><a href="#">Default item</a></sgds-dropdown-item>
            </sgds-dropdown>`,
            description:
              "Use active to identify the currently selected destination or value.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-dropdown class="portal-demo-dropdown-active">
              <sgds-button slot="toggler" variant="outline" ariaLabel="Open menu">Open menu</sgds-button>
              <sgds-dropdown-item><a href="#">Available item</a></sgds-dropdown-item>
              <sgds-dropdown-item disabled><a href="#">Disabled item</a></sgds-dropdown-item>
            </sgds-dropdown>`,
            description:
              "Use disabled when an item must remain visible but unavailable.",
          },
        ],
      },
      {
        title: "Close behaviour",
        description:
          "Use close behaviour to decide whether selecting an item should dismiss the dropdown menu.",
        controlLabel: "Dropdown close options",
        defaultValue: "close",
        options: [
          {
            label: "Close on select",
            value: "close",
            markup: `<sgds-dropdown close>
              <sgds-button slot="toggler" variant="outline" ariaLabel="Actions">Actions</sgds-button>
              <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
              <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
            </sgds-dropdown>`,
            description:
              "Use close when selecting an item completes the menu interaction.",
          },
          {
            label: "Stay open",
            value: "stay-open",
            markup: `<sgds-dropdown close="false">
              <sgds-button slot="toggler" variant="outline" ariaLabel="Filters">Filters</sgds-button>
              <sgds-dropdown-item><a href="#">Status</a></sgds-dropdown-item>
              <sgds-dropdown-item><a href="#">Owner</a></sgds-dropdown-item>
            </sgds-dropdown>`,
            description:
              "Use stay-open behaviour when users may need to make repeated selections.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use dropdowns to collect related actions under a single trigger.",
        `<sgds-dropdown>
          <sgds-button slot="toggler" variant="outline" ariaLabel="Actions">Actions</sgds-button>
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
        </sgds-dropdown>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a dropdown to group related actions",
          description:
            "Collect a small set of related actions or links under one trigger so the surrounding interface stays clean.",
          tone: "do",
          markup: `<sgds-dropdown>
            <sgds-button slot="toggler" variant="outline" ariaLabel="Actions">Actions</sgds-button>
            <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
        {
          title: "Do not hide the primary action inside a dropdown",
          description:
            "Expose the primary action as a button on the surface. Burying it behind a trigger hides intent.",
          tone: "dont",
          markup: `<sgds-dropdown>
            <sgds-button slot="toggler" variant="primary" ariaLabel="More">More</sgds-button>
            <sgds-dropdown-item><a href="#">Submit application</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
        {
          title: "Use a clear, action-led trigger label",
          description:
            "Label the trigger with a noun or verb that describes what the menu opens, so users know what to expect before clicking.",
          tone: "do",
          markup: `<sgds-dropdown>
            <sgds-button slot="toggler" variant="outline" ariaLabel="Manage record">Manage record</sgds-button>
            <sgds-dropdown-item><a href="#">Edit details</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Change owner</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Delete</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
        {
          title: "Do not use a dropdown to choose a value from a list",
          description:
            "Dropdowns are for actions and links. Use select for a single value, combo box for filterable lists.",
          tone: "dont",
          markup: `<sgds-dropdown>
            <sgds-button slot="toggler" variant="outline" ariaLabel="Country">Country</sgds-button>
            <sgds-dropdown-item><a href="#">Singapore</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Malaysia</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Indonesia</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
        {
          title: "Keep the menu short and scannable",
          description:
            "Aim for a small number of clearly labelled items. Long menus are hard to scan and signal poor grouping.",
          tone: "do",
          markup: `<sgds-dropdown>
            <sgds-button slot="toggler" variant="outline" ariaLabel="Account">Account</sgds-button>
            <sgds-dropdown-item><a href="#">Profile</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Settings</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Sign out</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
        {
          title: "Do not nest dropdowns inside other dropdowns",
          description:
            "Multi-level dropdowns are hard to operate on touch and with assistive technology. Restructure instead.",
          tone: "dont",
          markup: `<sgds-dropdown>
            <sgds-button slot="toggler" variant="outline" ariaLabel="Actions">Actions</sgds-button>
            <sgds-dropdown-item>
              <sgds-dropdown>
                <sgds-button slot="toggler" variant="ghost" ariaLabel="Export">Export</sgds-button>
                <sgds-dropdown-item><a href="#">CSV</a></sgds-dropdown-item>
                <sgds-dropdown-item><a href="#">PDF</a></sgds-dropdown-item>
              </sgds-dropdown>
            </sgds-dropdown-item>
          </sgds-dropdown>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / dropdown",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/lg", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/sm", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-none", value: "sgds/padding/none", usage: "Padding of the dropdown item" },
          { category: "Padding", name: "padding-xs", value: "sgds/padding/xs", usage: "Top and bottom padding of the dropdown menu" },
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the dropdown item; spacing between items of the content" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", mapKey: "border-radius", usage: "Corner radius of the dropdown menu" },
          { category: "Border", name: "nav-tabs-border-width", value: "sgds/nav-tabs-border-width", usage: "Outer spacing of the dropdown menu" },
          { category: "Size", name: "dimension-192", value: "sgds/dimension/192", usage: "Minimum width of the dropdown menu" },
          { category: "Size", name: "dimension-320", value: "sgds/dimension/320", usage: "Maximum width of the dropdown menu" },
          { category: "Size", name: "dimension-480", value: "sgds/dimension/480", usage: "Maximum height of the dropdown menu" },
          { category: "Size", name: "mainnav-max-width", value: "sgds/mainnav/max-width", usage: "Maximum width used by dropdown items in mainnav context" },
          { category: "Padding", name: "mainnav-mobile-padding-x", value: "sgds/mainnav/mobile-padding-x", usage: "Horizontal padding used by dropdown items in mobile mainnav context" },
          { category: "Padding", name: "mainnav-padding-x", value: "sgds/mainnav/padding-x", usage: "Horizontal padding used by dropdown items in desktop mainnav context" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the dropdown item on hover; background colour of the dropdown item when keyboard-focused" },
          { category: "Colour", name: "bg-transparent", value: "sgds/bg-transparent", usage: "Background colour of the dropdown item" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the dropdown item; text colour of the dropdown menu" },
          { category: "Colour", name: "primary-color-default", value: "sgds/primary/color/default", usage: "Text colour of the dropdown item when active" },
          { category: "Colour", name: "surface-default", value: "sgds/surface-default", usage: "Background colour of the dropdown menu" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the dropdown item when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the dropdown item when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the dropdown item when disabled" },
          { category: "Layer", name: "z-index-floating", value: "sgds/z-index-floating", usage: "Stacking layer of the dropdown menu" },
        ],
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "Use specific item labels",
          description: "Clear verbs and nouns help users predict what each menu item does before they choose.",
          tone: "do",
          markup: `<sgds-dropdown menuisopen noFlip>
            <sgds-button slot="toggler" variant="outline" ariaLabel="Export">Export</sgds-button>
            <sgds-dropdown-item><a href="#">Download CSV</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Download PDF</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Email report</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
        {
          title: "Do not use vague item labels",
          description: "Generic labels such as Item force users to read every option to find what they need.",
          tone: "dont",
          markup: `<sgds-dropdown menuisopen noFlip>
            <sgds-button slot="toggler" variant="outline" ariaLabel="More">More</sgds-button>
            <sgds-dropdown-item><a href="#">Item</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Item</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Item</a></sgds-dropdown-item>
          </sgds-dropdown>`,
        },
      ],
    },
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
        description: "Use file upload when users need to attach documents, images, or other files.",
      },
      {
        title: "Show selected files",
        description: "Display the filename and size so users can check what they added.",
      },
      {
        title: "Set file requirements",
        description: "Use accepted types, size guidance, and feedback to reduce upload errors.",
      },
    ],
    anatomyMarkup: `<sgds-file-upload class="portal-anatomy-file-upload" label="Label" hintText="Hint text">Choose file</sgds-file-upload>`,
    anatomyParts: [
      { title: "Label (optional)" },
      { title: "Action (button)" },
      { title: "Hint text (optional)" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-anatomy-file-upload",
        targetShadowSelector: ".form-label",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: ".portal-anatomy-file-upload",
        targetShadowSelector: "sgds-button",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-anatomy-file-upload",
        targetShadowSelector: ".form-text",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "File upload supports a default button-style picker and a drag-and-drop surface.",
        controlLabel: "File upload variant options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-file-upload class="portal-demo-file-upload-default" label="Upload documents" hintText="PDF, JPG, or PNG. Max 5 MB per file.">Choose file</sgds-file-upload>`,
            description:
              "Use the default variant for compact forms or single file inputs.",
          },
          {
            label: "Drag and drop",
            value: "drag-and-drop",
            markup: `<sgds-file-upload class="portal-demo-file-upload-drag" label="Upload documents" hintText="PDF, JPG, or PNG. Max 5 MB per file." variant="drag-and-drop" multiple>Choose files</sgds-file-upload>`,
            description:
              "Use drag-and-drop when uploading files is a prominent part of the task.",
          },
        ],
      },
      {
        title: "Multiple files",
        description: "Allow more than one file to be selected at once.",
        controlLabel: "File upload multiple options",
        defaultValue: "single",
        options: [
          {
            label: "Single file",
            value: "single",
            markup: `<sgds-file-upload>Upload file</sgds-file-upload>`,
            description:
              "Only one file can be selected; reselecting replaces the previous one.",
          },
          {
            label: "Multiple files",
            value: "multiple",
            markup: `<sgds-file-upload multiple>Upload files</sgds-file-upload>`,
            description:
              "Users can select several files in one go and they are listed below the button.",
          },
        ],
      },
      {
        title: "Accepted file types",
        description:
          "Restrict the file picker to specific file types using the `accept` attribute.",
        controlLabel: "File upload accept options",
        defaultValue: "any",
        options: [
          {
            label: "Any file",
            value: "any",
            markup: `<sgds-file-upload>Upload file</sgds-file-upload>`,
            description: "No restriction on file type.",
          },
          {
            label: "Images only",
            value: "images",
            markup: `<sgds-file-upload accept="image/*">Upload image</sgds-file-upload>`,
            description: "File picker filters to image formats only.",
          },
          {
            label: "PDF only",
            value: "pdf",
            markup: `<sgds-file-upload accept="application/pdf">Upload PDF</sgds-file-upload>`,
            description: "File picker filters to PDF documents.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Disable the upload button to prevent users from picking a file.",
        controlLabel: "File upload disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-file-upload>Upload file</sgds-file-upload>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-file-upload disabled>Upload file</sgds-file-upload>`,
            description:
              "Button appears muted and the file picker cannot be opened.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and feedback when the upload is invalid.",
        controlLabel: "File upload validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-file-upload>Upload file</sgds-file-upload>`,
            description: "No feedback shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-file-upload required hasFeedback invalid invalidFeedback="Attach at least one file">Upload file</sgds-file-upload>`,
            description:
              "Upload control shows error styling and feedback message when no file is attached.",
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
    measurements: [
      {
        title: "File upload structure",
        description: "File upload structure shows the upload control and the spacing, padding, and border tokens used by the component.",
        markup: `<sgds-file-upload class="portal-structure-file-upload" label="Supporting documents" hintText="PDF, JPG, or PNG. Max 5 MB per file.">Upload file</sgds-file-upload>`,
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "State the accepted file types and size up front",
          description:
            "Tell users which file types and sizes are accepted before they pick a file to reduce failed uploads.",
          tone: "do",
          markup: `<div class="portal-demo-stack">
            <sgds-file-upload accept=".pdf,.jpg,.png">Upload document</sgds-file-upload>
            <span>Accepted formats: PDF, JPG, PNG. Maximum 5 MB per file.</span>
          </div>`,
        },
        {
          title: "Restrict file types in the picker",
          description: "Set the `accept` attribute to filter the system file picker so users do not have to scan files manually.",
          tone: "do",
          markup: `<sgds-file-upload accept="application/pdf">Upload PDF</sgds-file-upload>`,
        },
        {
          title: "Do not leave the upload action ambiguous",
          description:
            "Use a clear verb-led label inside the slot, for example Upload report, rather than generic File or Browse.",
          tone: "dont",
          markup: `<sgds-file-upload>File</sgds-file-upload>`,
        },
        {
          title: "Allow several files only when users genuinely need it",
          description: "Add the `multiple` attribute when the task expects several files in one go, such as photo evidence.",
          tone: "do",
          markup: `<sgds-file-upload accept="image/*" multiple>Upload supporting photos</sgds-file-upload>`,
        },
        {
          title: "Show validation feedback when an upload is required",
          description: "Pair `required` with `hasFeedback` and `invalidFeedback` so the empty state can be flagged inline.",
          tone: "do",
          markup: `<sgds-file-upload required hasFeedback invalid invalidFeedback="Attach at least one file">Upload document</sgds-file-upload>`,
        },
        {
          title: "Do not use file upload for very small text inputs",
          description:
            "For a short value such as a reference number, use a text input. Uploading a file adds friction.",
          tone: "dont",
          markup: `<sgds-file-upload>Upload your reference number</sgds-file-upload>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / file-upload",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/form/padding/x", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/form/padding/y", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Gap", name: "form-gap-lg", value: "sgds/form/gap/lg", usage: "Spacing between items of the file upload list item" },
          { category: "Gap", name: "form-gap-md", value: "sgds/form/gap/md", usage: "Spacing between items of the file upload container" },
          { category: "Gap", name: "form-gap-sm", value: "sgds/form/gap/sm", usage: "Spacing between items of the upload feedback message" },
          { category: "Gap", name: "form-gap-xl", value: "sgds/form/gap/xl", usage: "Spacing between items of the file upload list" },
          { category: "Gap", name: "gap-md", value: "sgds/gap/md", usage: "Spacing between items inside the drag and drop zone" },
          { category: "Border", name: "border-color-muted", value: "sgds/border-color-muted", usage: "Border of the file upload list item" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", usage: "Corner radius of the drag and drop zone" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", usage: "Dashed border width of the drag and drop zone" },
          { category: "Border", name: "border-width-2", value: "sgds/border-width/2", usage: "Error focus outline width of the drag and drop zone" },
          { category: "Border", name: "form-border-width-default", value: "sgds/form/border-width/default", usage: "Border of the file upload list item" },
          { category: "Border", name: "form-border-width-thick", value: "sgds/form/border-width/thick", usage: "Hover outline width of the drag and drop zone" },
          { category: "Typography", name: "font-size-12", value: "sgds/font-size/12", usage: "Font size of upload item error message" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of drag and drop helper text" },
          { category: "Typography", name: "line-height-16", value: "sgds/line-height/16", usage: "Line height of upload item error message" },
          { category: "Typography", name: "line-height-20", value: "sgds/line-height/20", usage: "Line height of drag and drop helper text" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of status icons in the upload list" },
          { category: "Size", name: "icon-size-lg", value: "sgds/icon-size/lg", usage: "Size of the drag and drop upload icon" },
          { category: "Margin", name: "margin-xl", value: "sgds/margin/xl", usage: "Top margin of the upload list when files are present" },
          { category: "Padding", name: "padding-2-xl", value: "sgds/padding/2-xl", usage: "Padding of the drag and drop zone" },
          { category: "Motion", name: "motion-duration-standard", value: "sgds/motion-duration/standard", usage: "Duration of file upload item enter and exit animations" },
          { category: "Motion", name: "motion-easing-enter", value: "sgds/motion-easing/enter", usage: "Easing of the file upload item enter animation" },
          { category: "Motion", name: "motion-easing-exit", value: "sgds/motion-easing/exit", usage: "Easing of the file upload item exit animation" },
          { category: "Motion", name: "motion-easing-standard", value: "sgds/motion-easing/standard", usage: "Easing of file upload item transitions" },
          { category: "Outline", name: "form-outline-focus", value: "sgds/form/outline/focus", usage: "Focus outline of the drag and drop zone" },
          { category: "Outline", name: "form-outline-offset-focus", value: "sgds/form/outline-offset/focus", usage: "Focus outline offset of the drag and drop zone" },
          { category: "Colour", name: "color-muted", value: "sgds/color-muted", usage: "Text colour of the sgds icon.invalid when invalid" },
          { category: "Colour", name: "form-success-color-default", value: "sgds/form/success-color-default", usage: "Text colour of the sgds icon.valid" },
          { category: "Colour", name: "form-surface-default", value: "sgds/form/surface/default", usage: "Background colour of the file upload list item" },
          { category: "Border", name: "form-border-radius-md", value: "sgds/form/border-radius/md", usage: "Corner radius of the file upload list item" },
        ],
      },
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
        title: "Meet service requirements",
        description: "Use the footer to provide service details, contact links, privacy, and terms.",
      },
      {
        title: "Offer a consistent endpoint",
        description: "Place the footer across pages so supporting information is always easy to find.",
      },
      {
        title: "Support trust",
        description: "A standard footer reinforces that the service belongs to the Singapore Government.",
      },
    ],
    anatomyParts: [
      { title: "Site title", note: "(optional)" },
      { title: "Site description", note: "(optional)" },
      { title: "Slot", note: "(optional)" },
      { title: "Footer navigation" },
      { title: "Divider" },
      { title: "Copyright notice" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-footer-anatomy-title",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: ".portal-footer-anatomy-description",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-footer-anatomy-slot",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 4,
        direction: "left",
        targetSelector: ".portal-footer-anatomy",
        targetShadowSelector: ".footer-mandatory-links ul",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 5,
        direction: "right",
        targetSelector: ".portal-footer-anatomy",
        targetShadowSelector: ".footer-top",
        targetX: "right",
        targetY: "bottom",
      },
      {
        number: 6,
        direction: "right",
        targetSelector: ".portal-footer-anatomy",
        targetShadowSelector: ".footer-copyrights",
        targetX: "right",
        targetY: "center",
        alignBadgeWithCallout: 5,
      },
    ],
    anatomyMarkup: `<sgds-footer class="portal-footer-anatomy" copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
      <h2 slot="title" class="portal-footer-anatomy-title">Site title</h2>
      <p slot="description" class="portal-footer-anatomy-description">Site description</p>
      <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
    </sgds-footer>`,
    configurationDemos: [
      {
        title: "Device",
        description:
          "Footer layout responds to the available viewport width. Use the device presets to check how links and copyright wrap across common breakpoints.",
        controlLabel: "Viewport size (px)",
        defaultValue: "1440",
        controlType: "select",
        options: [
          {
            label: "1440",
            value: "1440",
            markup: `<div class="sgds:w-[var(--sgds-dimension-1312)] sgds:max-w-full">
          <sgds-footer copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
            <span slot="title">Site title</span>
            <span slot="description">Site description</span>
            <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
          </sgds-footer>
        </div>`,
            description:
              "Large desktop width. Footer content has the most horizontal space.",
          },
          {
            label: "1280",
            value: "1280",
            markup: `<div class="sgds:w-[var(--sgds-dimension-1168)] sgds:max-w-full">
          <sgds-footer copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
            <span slot="title">Site title</span>
            <span slot="description">Site description</span>
            <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
          </sgds-footer>
        </div>`,
            description:
              "Desktop width where footer navigation and copyright sit on the same row when space allows.",
          },
          {
            label: "1024",
            value: "1024",
            markup: `<div class="sgds:w-[var(--sgds-dimension-888)] sgds:max-w-full">
          <sgds-footer copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
            <span slot="title">Site title</span>
            <span slot="description">Site description</span>
            <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
          </sgds-footer>
        </div>`,
            description:
              "Tablet landscape width. The footer keeps a compact desktop-style content width.",
          },
          {
            label: "768",
            value: "768",
            markup: `<div class="sgds:w-[var(--sgds-dimension-688)] sgds:max-w-full">
          <sgds-footer copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
            <span slot="title">Site title</span>
            <span slot="description">Site description</span>
            <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
          </sgds-footer>
        </div>`,
            description:
              "Tablet portrait width. Navigation has less horizontal space and may wrap.",
          },
          {
            label: "512",
            value: "512",
            markup: `<div class="sgds:w-[var(--sgds-dimension-480)] sgds:max-w-full">
          <sgds-footer copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
            <span slot="title">Site title</span>
            <span slot="description">Site description</span>
            <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
          </sgds-footer>
        </div>`,
            description:
              "Small tablet width. Footer navigation begins to stack more visibly.",
          },
          {
            label: "320",
            value: "320",
            markup: `<div class="sgds:w-[var(--sgds-dimension-320)] sgds:max-w-full">
          <sgds-footer copyrightLiner="Government of Singapore" faqHref="#" sitemapHref="#">
            <span slot="title">Site title</span>
            <span slot="description">Site description</span>
            <div class="portal-slot-example portal-footer-anatomy-slot">[Slot]</div>
          </sgds-footer>
        </div>`,
            description:
              "Mobile width. Footer links stack vertically for narrow screens.",
          },
        ],
      },
      {
        title: "Contact information",
        description:
          "Provide contact and feedback links so users can reach the service team. Both fields accept a URL.",
        controlLabel: "Footer contact information options",
        defaultValue: "with-contact",
        options: [
          {
            label: "Without contact links",
            value: "without-contact",
            markup: `<sgds-footer copyrightLiner="Government of Singapore">
          <span slot="title">Service Name</span>
          <span slot="description">A short description of the service.</span>
        </sgds-footer>`,
            description:
              "Use only when contact and feedback channels are surfaced elsewhere on the page.",
          },
          {
            label: "With contact links",
            value: "with-contact",
            markup: `<sgds-footer
          contactHref="https://www.example.gov.sg/contact"
          feedbackHref="https://www.example.gov.sg/feedback"
          copyrightLiner="Government of Singapore"
        >
          <span slot="title">Service Name</span>
          <span slot="description">A short description of the service.</span>
        </sgds-footer>`,
            description:
              "Recommended for all .gov.sg services so users can reach support and submit feedback.",
          },
        ],
      },
      {
        title: "Optional links",
        description:
          "FAQ and sitemap links are optional. Add them when they help users navigate the service.",
        controlLabel: "Footer optional links options",
        defaultValue: "without-optional",
        options: [
          {
            label: "Without FAQ or sitemap",
            value: "without-optional",
            markup: `<sgds-footer
          contactHref="#"
          feedbackHref="#"
          privacyHref="#"
          termsOfUseHref="#"
          copyrightLiner="Government of Singapore"
        >
          <span slot="title">Service Name</span>
        </sgds-footer>`,
            description:
              "Minimum compliant footer with the mandatory privacy and terms links only.",
          },
          {
            label: "With FAQ and sitemap",
            value: "with-optional",
            markup: `<sgds-footer
          contactHref="#"
          feedbackHref="#"
          faqHref="#"
          sitemapHref="#"
          privacyHref="#"
          termsOfUseHref="#"
          copyrightLiner="Government of Singapore"
        >
          <span slot="title">Service Name</span>
        </sgds-footer>`,
            description:
              "Adds shortcut links to FAQ and sitemap for content-heavy services.",
          },
        ],
      },
      {
        title: "Grouped link sections",
        description:
          "Use the items slot with sgds-footer-item to group related links under titled columns.",
        controlLabel: "Footer items layout options",
        defaultValue: "without-items",
        options: [
          {
            label: "Without grouped items",
            value: "without-items",
            markup: `<sgds-footer
          contactHref="#"
          feedbackHref="#"
          privacyHref="#"
          termsOfUseHref="#"
          copyrightLiner="Government of Singapore"
        >
          <span slot="title">Service Name</span>
          <span slot="description">A short description of the service.</span>
        </sgds-footer>`,
            description:
              "Compact footer suitable for small services with few outbound links.",
          },
          {
            label: "With grouped items",
            value: "with-items",
            markup: `<sgds-footer
          contactHref="#"
          feedbackHref="#"
          privacyHref="#"
          termsOfUseHref="#"
          copyrightLiner="Government of Singapore"
        >
          <span slot="title">Service Name</span>
          <sgds-footer-item slot="items">
            <span slot="title">About</span>
            <a href="#">Our mission</a>
            <a href="#">Careers</a>
          </sgds-footer-item>
          <sgds-footer-item slot="items">
            <span slot="title">Resources</span>
            <a href="#">Guides</a>
            <a href="#">Newsroom</a>
          </sgds-footer-item>
        </sgds-footer>`,
            description:
              "Group related links under named sections to help users scan a richer footer.",
          },
        ],
      },
  {
        title: "Tone",
        description:
          "Footer tone controls whether the footer uses a neutral or fixed dark surface.",
        controlLabel: "Footer tone options",
        defaultValue: "neutral",
        options: [
          {
            label: "Neutral",
            value: "neutral",
            markup: `<sgds-footer tone="neutral"></sgds-footer>`,
            description: "Use neutral footer tone in standard light layouts.",
          },
          {
            label: "Fixed dark",
            value: "fixed-dark",
            markup: `<sgds-footer tone="fixed-dark"></sgds-footer>`,
            description:
              "Use fixed dark when the footer should retain a dark brand surface across themes.",
          },
        ],
      },
      {
        title: "Layout",
        description:
          "Footer layout supports standard page footers and sidebar application shells.",
        controlLabel: "Footer layout options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-footer layout="default"></sgds-footer>`,
            description: "Use the default layout for full-width pages.",
          },
          {
            label: "Sidebar",
            value: "sidebar",
            markup: `<sgds-footer layout="sidebar"></sgds-footer>`,
            description:
              "Use sidebar layout when the footer needs to align with an application shell.",
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
    usage: {
      bestPractices: [
        {
          title: "Include the mandatory legal links",
          description:
            "All .gov.sg services must show privacy and terms of use links in the footer on every page.",
          tone: "do",
          markup: `<sgds-footer
            contactHref="https://www.example.gov.sg/contact"
            feedbackHref="https://www.example.gov.sg/feedback"
            privacyHref="https://www.example.gov.sg/privacy"
            termsOfUseHref="https://www.example.gov.sg/terms"
            copyrightLiner="Government of Singapore"
          >
            <span slot="title">Example service</span>
            <span slot="description">A short description of the service.</span>
          </sgds-footer>`,
        },
        {
          title: "Do not omit privacy and terms",
          description:
            "Even compact footers must surface privacy and terms of use links to stay compliant with .gov.sg rules.",
          tone: "dont",
          markup: `<sgds-footer copyrightLiner="Government of Singapore">
            <span slot="title">Example service</span>
          </sgds-footer>`,
        },
        {
          title: "Group related links under titled sections",
          description:
            "Use sgds-footer-item to group destinations under clear headings so users can scan by topic.",
          tone: "do",
          markup: `<sgds-footer
            contactHref="#"
            feedbackHref="#"
            privacyHref="#"
            termsOfUseHref="#"
            copyrightLiner="Government of Singapore"
          >
            <span slot="title">Example service</span>
            <sgds-footer-item slot="items">
              <span slot="title">About</span>
              <a href="#">Our mission</a>
              <a href="#">Careers</a>
            </sgds-footer-item>
            <sgds-footer-item slot="items">
              <span slot="title">Resources</span>
              <a href="#">Guides</a>
              <a href="#">Newsroom</a>
            </sgds-footer-item>
          </sgds-footer>`,
        },
        {
          title: "Do not use the footer for primary actions",
          description:
            "The footer is for supporting information. Place primary calls to action in the page body or main nav.",
          tone: "dont",
          markup: `<sgds-footer
            privacyHref="#"
            termsOfUseHref="#"
            copyrightLiner="Government of Singapore"
          >
            <span slot="title">Example service</span>
            <sgds-footer-item slot="items">
              <span slot="title">Apply now</span>
              <a href="#">Start your application</a>
            </sgds-footer-item>
          </sgds-footer>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / footer",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/none", mapKey: "padding-x", usage: "Left and right padding of the footer top and footer bottom" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/2-xl", mapKey: "padding-y", usage: "Top and bottom padding of the footer top (320px breakpoint)", variant: "320" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/2-xl", mapKey: "padding-y", usage: "Top and bottom padding of the footer top (512px breakpoint)", variant: "512" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/2-xl", mapKey: "padding-y", usage: "Top and bottom padding of the footer top (768px breakpoint)", variant: "768" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/3-xl", mapKey: "padding-y", usage: "Top and bottom padding of the footer top (1024px breakpoint)", variant: "1024" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/3-xl", mapKey: "padding-y", usage: "Top and bottom padding of the footer top (1280px breakpoint)", variant: "1280" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/3-xl", mapKey: "padding-y", usage: "Top and bottom padding of the footer top (1440px breakpoint)", variant: "1440" },
          { category: "Padding", name: "padding-2-xl", value: "sgds/padding/2-xl", usage: "Top and bottom padding of the footer bottom" },
          { category: "Gap", name: "gap-2-xl", value: "sgds/gap/2-xl", usage: "Spacing between items of the footer top (320px, 512px, and 768px breakpoints)", variant: "320" },
          { category: "Gap", name: "gap-2-xl", value: "sgds/gap/2-xl", usage: "Spacing between items of the footer top (512px breakpoint)", variant: "512" },
          { category: "Gap", name: "gap-2-xl", value: "sgds/gap/2-xl", usage: "Spacing between items of the footer top (768px breakpoint)", variant: "768" },
          { category: "Gap", name: "gap-3-xl", value: "sgds/gap/3-xl", usage: "Spacing between items of the footer top (1024px breakpoint)", variant: "1024" },
          { category: "Gap", name: "gap-3-xl", value: "sgds/gap/3-xl", usage: "Spacing between items of the footer top (1280px breakpoint)", variant: "1280" },
          { category: "Gap", name: "gap-3-xl", value: "sgds/gap/3-xl", usage: "Spacing between items of the footer top (1440px breakpoint)", variant: "1440" },
          { category: "Gap", name: "gap-lg", value: "sgds/gap/lg", usage: "Spacing between items of the footer items" },
          { category: "Gap", name: "gap-md", value: "sgds/gap/md", usage: "Spacing between items of the footer items; spacing between items of the footer bottom" },
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the footer header; spacing between items of the ul" },
          { category: "Gap", name: "gap-xl", value: "sgds/gap/xl", usage: "Spacing between items of the footer mandatory links; spacing between items of the ul" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the links" },
          { category: "Margin", name: "margin-none", value: "sgds/margin/none", usage: "Value of the content; outer spacing of the content" },
          { category: "Margin", name: "margin-xs", value: "sgds/margin/xs", usage: "Outer spacing of the footer item" },
          { category: "Border", name: "border-color-default", value: "sgds/border-color-default", usage: "Bottom border of the footer top" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Bottom border of the footer top" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of the footer copyrights" },
          { category: "Typography", name: "font-size-label-sm", value: "sgds/font-size/label-sm", usage: "Font size of the mandatory footer links" },
          { category: "Typography", name: "font-size-heading-md", value: "sgds/font-size/heading-md", usage: "Font size of the footer title" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight alias used by footer item titles" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Value of the content; font weight of the content" },
          { category: "Typography", name: "letter-spacing-tight", value: "sgds/letter-spacing/tight", usage: "Letter spacing of the content" },
          { category: "Typography", name: "line-height-2-xs", value: "sgds/line-height/2-xs", usage: "Line height of the footer copyrights" },
          { category: "Typography", name: "line-height-md", value: "sgds/line-height/md", usage: "Line height of the footer title" },
          { category: "Typography", name: "paragraph-spacing-xl", value: "sgds/paragraph-spacing-xl", usage: "Paragraph spacing reset used by footer item titles" },
          { category: "Size", name: "dimension-888", value: "sgds/dimension/888", usage: "Maximum width of the footer top and footer bottom (1024px breakpoint)", variant: "1024" },
          { category: "Size", name: "dimension-1168", value: "sgds/dimension/1168", usage: "Maximum width of the footer top and footer bottom (1280px breakpoint)", variant: "1280" },
          { category: "Size", name: "dimension-1312", value: "sgds/dimension/1312", usage: "Maximum width of the footer top and footer bottom (1440px breakpoint)", variant: "1440" },
          { category: "Colour", name: "bg-fixed-dark", value: "sgds/bg-fixed-dark", usage: "Background colour of the footer" },
          { category: "Colour", name: "color-fixed-light", value: "sgds/color-fixed-light", usage: "Text colour of the content; text colour of the content on hover" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the content when keyboard-focused; focus outline of the link when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the content when keyboard-focused; focus-outline offset of the link when keyboard-focused" },
        ],
      },
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
        title: "Add visual cues",
        description: "Use icons to support labels, status, navigation, and actions.",
      },
      {
        title: "Support labels",
        description: "Icons should reinforce text. Add an accessible label when an icon stands alone.",
      },
      {
        title: "Use a shared icon set",
        description: "The icon component renders from the SGDS icon library for visual consistency.",
      },
    ],
    anatomyParts: [{ title: "Container" }, { title: "Icon" }],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-icon-anatomy-container",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "top",
        targetSelector: ".portal-icon-anatomy-icon",
        targetX: "center",
        targetY: "top",
      },
    ],
    anatomyMarkup: `<div class="portal-icon-anatomy-container">
      <sgds-icon class="portal-icon-anatomy-icon" name="circle" size="md" aria-hidden="true"></sgds-icon>
    </div>`,
    configurationDemos: [
      {
        title: "Name",
        description:
          "The icon name from the SGDS icon library. Browse the icon library to find the right shorthand for your context.",
        controlLabel: "Icon name options",
        defaultValue: "info-circle",
        options: [
          {
            label: "Info circle",
            value: "info-circle",
            markup: `<div class="portal-demo-row"><sgds-icon name="info-circle"></sgds-icon></div>`,
            description: "Use for informational messages and tooltips.",
          },
          {
            label: "Check circle",
            value: "check-circle",
            markup: `<div class="portal-demo-row"><sgds-icon name="check-circle"></sgds-icon></div>`,
            description:
              "Use to confirm a successful action or completed state.",
          },
          {
            label: "Exclamation triangle",
            value: "exclamation-triangle",
            markup: `<div class="portal-demo-row"><sgds-icon name="exclamation-triangle"></sgds-icon></div>`,
            description: "Use for warnings that need user attention.",
          },
          {
            label: "X circle",
            value: "x-circle",
            markup: `<div class="portal-demo-row"><sgds-icon name="x-circle"></sgds-icon></div>`,
            description: "Use to indicate errors or destructive states.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Sets the icon size relative to the surrounding text or container.",
        controlLabel: "Icon size options",
        defaultValue: "md",
        options: [
          {
            label: "Extra small",
            value: "xs",
            markup: `<div class="portal-demo-row"><sgds-icon name="info-circle" size="xs"></sgds-icon></div>`,
            description: "Smallest scale that fits inline with body text.",
          },
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-row"><sgds-icon name="info-circle" size="sm"></sgds-icon></div>`,
            description: "Small icon for inline use within compact components.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-row"><sgds-icon name="info-circle" size="md"></sgds-icon></div>`,
            description: "Default size for most icons.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-demo-row"><sgds-icon name="info-circle" size="lg"></sgds-icon></div>`,
            description: "Larger icon for cards and feature blocks.",
          },
          {
            label: "Extra large",
            value: "xl",
            markup: `<div class="portal-demo-row"><sgds-icon name="info-circle" size="xl"></sgds-icon></div>`,
            description: "Extra large icon for hero sections.",
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
    usage: {
      bestPractices: [
        {
          title: "Pair icons with a clear text label",
          description:
            "Use icons to reinforce meaning already clear from nearby text. They aid recognition on later visits.",
          tone: "do",
          markup: `<sgds-button>
            <sgds-icon slot="leftIcon" name="download"></sgds-icon>
            Download report
          </sgds-button>`,
        },
        {
          title: "Do not rely on an icon alone to convey meaning",
          description:
            "Standalone icons are often misread. Pair icon-only controls with a tooltip or accessible label.",
          tone: "dont",
          markup: `<div class="portal-demo-row">
            <sgds-icon name="gear"></sgds-icon>
            <sgds-icon name="bell"></sgds-icon>
            <sgds-icon name="three-dots"></sgds-icon>
          </div>`,
        },
        {
          title: "Use the same icon for the same meaning",
          description:
            "Pick one icon per concept and reuse it across the product. Switching icons for the same idea hurts recognition.",
          tone: "do",
          markup: `<div class="portal-demo-row">
            <sgds-button variant="ghost">
              <sgds-icon slot="leftIcon" name="gear"></sgds-icon>
              Settings
            </sgds-button>
            <sgds-button variant="ghost">
              <sgds-icon slot="leftIcon" name="gear"></sgds-icon>
              Account settings
            </sgds-button>
          </div>`,
        },
        {
          title: "Do not use icons that conflict with their usual meaning",
          description:
            "An exclamation triangle reads as warning and a check circle as success. Do not use them for other purposes.",
          tone: "dont",
          markup: `<div class="portal-demo-row">
            <span><sgds-icon name="exclamation-triangle"></sgds-icon> Help and FAQs</span>
            <span><sgds-icon name="x-circle"></sgds-icon> Close menu</span>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / icon",
        rows: [
          { category: "Size", name: "icon-size-xs", value: "sgds/icon-size/xs", mapKey: "icon-size", variant: "xs", usage: "Height of the svg; width of the svg" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", mapKey: "icon-size", variant: "sm", usage: "Height of the svg; width of the svg" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", mapKey: "icon-size", variant: "md", usage: "Height of the svg; width of the svg" },
          { category: "Size", name: "icon-size-lg", value: "sgds/icon-size/lg", mapKey: "icon-size", variant: "lg", usage: "Height of the svg; width of the svg" },
          { category: "Size", name: "icon-size-xl", value: "sgds/icon-size/xl", mapKey: "icon-size", variant: "xl", usage: "Height of the svg; width of the svg" },
          { category: "Size", name: "icon-size-2-xl", value: "sgds/icon-size/2-xl", mapKey: "icon-size", variant: "2-xl", usage: "Height of the svg; width of the svg" },
          { category: "Size", name: "icon-size-3-xl", value: "sgds/icon-size/3-xl", mapKey: "icon-size", variant: "3-xl", usage: "Height of the svg; width of the svg" },
        ],
      },
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
        title: "Save space for actions",
        description: "Use icon buttons in toolbars, table rows, and compact headers.",
      },
      {
        title: "Label the action",
        description: "Add an accessible label because the button has no visible text.",
      },
      {
        title: "Keep icon actions consistent",
        description: "The component keeps icon-only actions aligned, sized, and styled consistently.",
      },
    ],
    anatomyParts: [{ title: "Button container" }, { title: "Icon" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-icon-button-anatomy-primary", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: ".portal-icon-button-anatomy-primary", targetShadowSelector: "sgds-icon", targetX: "right", targetY: "center" },
    ],
    anatomyMarkup: `<div class="sgds:flex sgds:items-center sgds:gap-lg">
      <sgds-icon-button class="portal-icon-button-anatomy-primary" name="search" ariaLabel="Search"></sgds-icon-button>
    </div>`,
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-icon-button class="portal-structure-icon-button" name="search" ariaLabel="Search"></sgds-icon-button>`,
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds/icon-button",
        rows: [
          { category: "Size", name: "dimension-32", value: "sgds/dimension/32", mapKey: "dimension", variant: "xs", usage: "Height of the button; width of the button" },
          { category: "Size", name: "dimension-40", value: "sgds/dimension/40", mapKey: "dimension", variant: "sm", usage: "Height of the button; width of the button" },
          { category: "Size", name: "dimension-48", value: "sgds/dimension/48", mapKey: "dimension", variant: "md", usage: "Height of the button; width of the button" },
          { category: "Size", name: "dimension-56", value: "sgds/dimension/56", mapKey: "dimension", variant: "lg", usage: "Height of the button; width of the button" },
        ],
      },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Icon button variants control the visual weight of the control to suit different interface contexts.",
        controlLabel: "Icon button variant options",
        defaultValue: "primary",
        options: [
          {
            label: "Primary",
            value: "primary",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "The default filled variant is visually heavier. Use in toolbars or alongside other solid controls where the icon button needs to stand out.",
          },
          {
            label: "Outline",
            value: "outline",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="three-dots" variant="outline" ariaLabel="More options"></sgds-icon-button></div>`,
            description: "The outlined variant has a lighter presence.",
          },
          {
            label: "Ghost",
            value: "ghost",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="three-dots" variant="ghost" ariaLabel="More options"></sgds-icon-button></div>`,
            description:
              "Use for low-priority actions where the icon button should not compete visually with surrounding content.",
          },
        ],
      },
      {
        title: "Tone",
        description:
          "Icon button tone changes the colour treatment within the selected variant so the action can match the surrounding context.",
        controlLabel: "Icon button tone options",
        defaultValue: "brand",
        options: [
          {
            label: "Brand",
            value: "brand",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "The default tone. Use for standard icon-only actions in the main SGDS brand colour system.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" tone="neutral" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Use when the icon button should feel quieter or sit inside a more neutral interface context.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="trash" tone="danger" ariaLabel="Delete"></sgds-icon-button></div>`,
            description:
              "Use for destructive or high-risk icon-only actions that need stronger visual warning.",
          },
          {
            label: "Fixed light",
            value: "fixed-light",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" tone="fixed-light" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Only use on fixed dark or strongly coloured backgrounds. If it is hard to see on the page surface, use a standard tone instead.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Icon button sizes let you match the control to the density of the surrounding layout.",
        controlLabel: "Icon button size options",
        defaultValue: "md",
        options: [
          {
            label: "Extra small",
            value: "xs",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" size="xs" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Use in tight, compact surfaces such as table rows, toolbars, or dense list items.",
          },
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" size="sm" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Use in secondary contexts such as inline actions, cards, or alongside other compact controls.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" size="md" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "The default size. Use for most icon-only actions across forms, dialogs, and general page content.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" size="lg" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Use for prominent icon-only actions, such as floating action buttons or emphasised toolbar controls.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use the `disabled` state to prevent interaction when the action is not available in the current context.",
        controlLabel: "Icon button disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "The default. Icon buttons are interactive and respond to pointer and keyboard input.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" disabled ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Use when the action is temporarily unavailable. Disabled icon buttons appear muted and cannot be focused or clicked.",
          },
        ],
      },
      {
        title: "Loading",
        description:
          "Show a loading spinner inside the icon button while a triggered action is in progress.",
        controlLabel: "Icon button loading options",
        defaultValue: "not-loading",
        options: [
          {
            label: "Not loading",
            value: "not-loading",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "The default state. The icon is shown and the button is interactive.",
          },
          {
            label: "Loading",
            value: "loading",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" loading ariaLabel="Search"></sgds-icon-button></div>`,
            description:
              "Replaces the icon with a spinner and disables interaction. Use to indicate that a triggered action is in progress.",
          },
        ],
      },
  {
        title: "Active",
        description:
          "Use active when an icon button represents a selected tool or toggled state.",
        controlLabel: "Icon button active options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button></div>`,
            description: "Use for available actions that are not selected.",
          },
          {
            label: "Active",
            value: "active",
            markup: `<div class="portal-demo-row"><sgds-icon-button name="search" ariaLabel="Search" active></sgds-icon-button></div>`,
            description:
              "Use active to show that a tool, filter, or mode is currently applied.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Variants",
        "Use icon buttons for compact actions where the icon remains clear and familiar in context.",
        `<div class="portal-demo-row">
          <sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button>
          <sgds-icon-button name="three-dots" variant="outline" ariaLabel="More options"></sgds-icon-button>
        </div>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use icon buttons for actions that are universally recognised",
          description:
            "Reserve icon-only buttons for widely understood actions: search, close, edit, and delete.",
          tone: "do",
          markup: `<div class="portal-demo-row">
            <sgds-icon-button name="search" ariaLabel="Search"></sgds-icon-button>
            <sgds-icon-button name="x-lg" variant="ghost" ariaLabel="Close"></sgds-icon-button>
          </div>`,
        },
        {
          title: "Always provide an accessible label",
          description:
            "Without visible text, icon buttons need an aria-label so screen reader users know what the action does.",
          tone: "do",
          markup: `<sgds-icon-button name="trash" tone="danger" ariaLabel="Delete item"></sgds-icon-button>`,
        },
        {
          title: "Do not use icon buttons for primary calls to action",
          description:
            "Primary actions deserve a visible label. Use a regular button with text rather than an icon-only one.",
          tone: "dont",
          markup: `<sgds-icon-button name="check-lg" ariaLabel="Submit application"></sgds-icon-button>`,
        },
        {
          title: "Match the tone to the action",
          description:
            "Use danger for destructive actions, neutral for quiet utility, and the brand default for everything else.",
          tone: "do",
          markup: `<div class="portal-demo-row">
            <sgds-icon-button name="pencil" variant="ghost" ariaLabel="Edit row"></sgds-icon-button>
            <sgds-icon-button name="trash" variant="ghost" tone="danger" ariaLabel="Delete row"></sgds-icon-button>
          </div>`,
        },
        {
          title: "Do not use misleading tones",
          description:
            "Avoid styling destructive actions like neutral ones, or using danger tone for harmless actions.",
          tone: "dont",
          markup: `<div class="portal-demo-row">
            <sgds-icon-button name="trash" variant="ghost" ariaLabel="Delete row"></sgds-icon-button>
            <sgds-icon-button name="pencil" variant="ghost" tone="danger" ariaLabel="Edit row"></sgds-icon-button>
          </div>`,
        },
        {
          title: "Do not crowd icon buttons together without separation",
          description:
            "When icon buttons sit side by side, use the ghost variant or add spacing so users can tell them apart.",
          tone: "dont",
          markup: `<div class="portal-demo-row">
            <sgds-icon-button name="pencil" ariaLabel="Edit"></sgds-icon-button>
            <sgds-icon-button name="trash" ariaLabel="Delete"></sgds-icon-button>
            <sgds-icon-button name="share" ariaLabel="Share"></sgds-icon-button>
            <sgds-icon-button name="download" ariaLabel="Download"></sgds-icon-button>
          </div>`,
        },
      ],
    },
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
        title: "Lead with an icon",
        description: "Use an icon to give each card a clear visual cue.",
      },
      {
        title: "Show categories or features",
        description: "Icon cards work well for service options, feature grids, and category lists.",
      },
      {
        title: "Keep grids scannable",
        description: "A repeated icon, title, and description pattern keeps rows balanced.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.icon,
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "right",
        targetSelector: "sgds-icon-card",
        targetX: "right",
        targetY: "center",
      },
      {
        number: 2,
        direction: "top",
        targetSelector: "[slot='icon']",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 3,
        direction: "left",
        targetSelector: "[slot='title']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 4,
        direction: "bottom",
        targetSelector: "[slot='description']",
        targetX: "center",
        targetY: "bottom",
      },
    ],
    configurationDemos: [
      {
        title: "Orientation",
        description:
          "Use `orientation` to switch between a vertical icon-on-top layout and a horizontal icon-beside layout.",
        controlLabel: "Icon card orientation options",
        defaultValue: "vertical",
        options: [
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-icon-card class="portal-demo-card" orientation="vertical">
          <sgds-icon slot="icon" name="building"></sgds-icon>
          <span slot="title">Business grants</span>
          <span slot="description">Find financial support for growing local businesses.</span>
        </sgds-icon-card>`,
            description:
              "Stacks the icon above the content. Suits grids of feature cards.",
          },
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-icon-card class="portal-demo-card" orientation="horizontal">
          <sgds-icon slot="icon" name="building"></sgds-icon>
          <span slot="title">Business grants</span>
          <span slot="description">Find financial support for growing local businesses.</span>
        </sgds-icon-card>`,
            description:
              "Places the icon beside the content, useful in narrower lists or sidebars.",
          },
        ],
      },
      {
        title: "Tinted background",
        description:
          "Use `tinted` to apply a subtle background colour that helps the card stand out from its surface.",
        controlLabel: "Icon card background options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="calendar-check"></sgds-icon>
          <span slot="title">Secure access</span>
          <span slot="description">Sign in with Singpass for verified identity.</span>
        </sgds-icon-card>`,
            description: "Standard surface uses the page background.",
          },
          {
            label: "Tinted",
            value: "tinted",
            markup: `<sgds-icon-card class="portal-demo-card" tinted>
          <sgds-icon slot="icon" name="calendar-check"></sgds-icon>
          <span slot="title">Secure access</span>
          <span slot="description">Sign in with Singpass for verified identity.</span>
        </sgds-icon-card>`,
            description:
              "Adds a tinted background for visual emphasis without a heavier border.",
          },
        ],
      },
      {
        title: "Border",
        description:
          "Use `hideBorder` to remove the default card outline when the surrounding layout already provides separation.",
        controlLabel: "Icon card border options",
        defaultValue: "bordered",
        options: [
          {
            label: "Bordered",
            value: "bordered",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
          <span slot="title">Tips and tricks</span>
          <span slot="description">Practical ideas to help you get started.</span>
        </sgds-icon-card>`,
            description: "Default appearance with a visible card border.",
          },
          {
            label: "Borderless",
            value: "borderless",
            markup: `<sgds-icon-card class="portal-demo-card" hideBorder>
          <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
          <span slot="title">Tips and tricks</span>
          <span slot="description">Practical ideas to help you get started.</span>
        </sgds-icon-card>`,
            description:
              "Removes the outline for a flatter look that blends into the page.",
          },
        ],
      },
      {
        title: "Footer link",
        description:
          "Use the `footer` slot to add a call-to-action link or button below the card content.",
        controlLabel: "Icon card footer options",
        defaultValue: "no-footer",
        options: [
          {
            label: "No footer",
            value: "no-footer",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="file-earmark-text"></sgds-icon>
          <span slot="title">Application form</span>
          <span slot="description">Complete your details to start your application.</span>
        </sgds-icon-card>`,
            description: "Card without an explicit action surface.",
          },
          {
            label: "Footer link",
            value: "with-footer",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="file-earmark-text"></sgds-icon>
          <span slot="title">Application form</span>
          <span slot="description">Complete your details to start your application.</span>
          <sgds-link slot="footer"><a href="#">Start application</a></sgds-link>
        </sgds-icon-card>`,
            description:
              "Adds a visible link in the footer for a clear next step.",
          },
        ],
      },
      {
        title: "Stretched link",
        description:
          "Use `stretchedLink` when the whole card should behave as one larger navigation target. The href is taken from the anchor inside the footer link.",
        controlLabel: "Icon card stretched link options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="file-earmark-text"></sgds-icon>
          <span slot="title">Application form</span>
          <span slot="description">Complete your details to start your application.</span>
          <sgds-link slot="footer"><a href="#">Start application</a></sgds-link>
        </sgds-icon-card>`,
            description:
              "Only the visible footer link is clickable. Use when users should choose the explicit link.",
          },
          {
            label: "Stretched",
            value: "stretched",
            markup: `<sgds-icon-card class="portal-demo-card" stretchedLink>
          <sgds-icon slot="icon" name="file-earmark-text"></sgds-icon>
          <span slot="title">Application form</span>
          <span slot="description">Complete your details to start your application.</span>
          <sgds-link slot="footer"><a href="#">Start application</a></sgds-link>
        </sgds-icon-card>`,
            description:
              "Extends the footer link so the entire card becomes the navigation target.",
          },
        ],
      },
      {
        title: "Padding",
        description:
          "Use `noPadding` to remove the card's internal padding when the surrounding layout provides its own spacing.",
        controlLabel: "Icon card padding options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="grid-fill"></sgds-icon>
          <span slot="title">Dashboard modules</span>
          <span slot="description">Choose the modules you want to review.</span>
        </sgds-icon-card>`,
            description:
              "Keeps the standard icon card spacing for most content cards.",
          },
          {
            label: "No padding",
            value: "no-padding",
            markup: `<sgds-icon-card class="portal-demo-card" noPadding>
          <sgds-icon slot="icon" name="grid-fill"></sgds-icon>
          <span slot="title">Dashboard modules</span>
          <span slot="description">Choose the modules you want to review.</span>
        </sgds-icon-card>`,
            description:
              "Removes internal padding. Use carefully when the card is placed inside a custom layout that already controls spacing.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use `disabled` when the card should be visible but unavailable.",
        controlLabel: "Icon card disabled options",
        defaultValue: "enabled",
        options: [
          {
            label: "Enabled",
            value: "enabled",
            markup: `<sgds-icon-card class="portal-demo-card">
          <sgds-icon slot="icon" name="calendar-check"></sgds-icon>
          <span slot="title">Book appointment</span>
          <span slot="description">Choose a date and time for your visit.</span>
          <sgds-link slot="footer"><a href="#">Book now</a></sgds-link>
        </sgds-icon-card>`,
            description:
              "Default interactive state when the card's content or action is available.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-icon-card class="portal-demo-card" disabled>
          <sgds-icon slot="icon" name="calendar-check"></sgds-icon>
          <span slot="title">Book appointment</span>
          <span slot="description">Choose a date and time for your visit.</span>
          <sgds-link slot="footer"><a href="#">Book now</a></sgds-link>
        </sgds-icon-card>`,
            description:
              "Applies disabled styling when the card is not currently available.",
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
          <span slot="description">A concise summary of the service update and what users can do next.</span>
        </sgds-icon-card>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use icon cards for parallel categories or features",
          description:
            "Icon cards work best in a grid where items share the same shape. Services, features, or topics.",
          tone: "do",
          markup: `<sgds-icon-card class="portal-demo-card">
            <sgds-icon slot="icon" name="building"></sgds-icon>
            <span slot="title">Business grants</span>
            <span slot="description">Find financial support for growing local businesses.</span>
            <a slot="footer" href="#">Learn more</a>
          </sgds-icon-card>`,
        },
        {
          title: "Keep titles and descriptions short",
          description:
            "Icon cards are made to be scanned. Keep titles a few words and descriptions a single sentence.",
          tone: "do",
          markup: `<sgds-icon-card class="portal-demo-card">
            <sgds-icon slot="icon" name="shield-check"></sgds-icon>
            <span slot="title">Secure access</span>
            <span slot="description">Sign in with Singpass for verified identity.</span>
          </sgds-icon-card>`,
        },
        {
          title: "Do not pack long-form content into an icon card",
          description:
            "If the description runs into multiple sentences, the card stops being scannable. Move it out of the card.",
          tone: "dont",
          markup: `<sgds-icon-card class="portal-demo-card">
            <sgds-icon slot="icon" name="file-earmark-text"></sgds-icon>
            <span slot="title">Application form</span>
            <span slot="description">Complete your details to start your application. You will need to provide your NRIC, contact information, and supporting documents. The form takes about fifteen minutes to finish, and you can save your progress at any point and return later before submission.</span>
          </sgds-icon-card>`,
        },
        {
          title: "Make the whole card navigate only when intended",
          description: "Add a footer link with `stretchedLink` so the whole card is clickable and focusable for keyboard users.",
          tone: "do",
          markup: `<sgds-icon-card class="portal-demo-card" stretchedLink>
            <sgds-icon slot="icon" name="file-earmark-text"></sgds-icon>
            <span slot="title">Apply for a permit</span>
            <span slot="description">Start a new application for an event permit.</span>
            <a slot="footer" href="#">Start application</a>
          </sgds-icon-card>`,
        },
        {
          title: "Do not use icon cards as replacements for buttons",
          description:
            "Icon cards introduce a category or feature. For a single action without description, use a button instead.",
          tone: "dont",
          markup: `<sgds-icon-card class="portal-demo-card" stretchedLink>
            <sgds-icon slot="icon" name="download"></sgds-icon>
            <span slot="title">Download</span>
            <a slot="footer" href="#">Download</a>
          </sgds-icon-card>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / icon-card",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/none", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/xl", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the card" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Border of the card" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the card tinted bg" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the card tinted bg" },
        ],
      },
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
        title: "Pair icons with text",
        description: "Use icon lists when each row benefits from a visual marker.",
      },
      {
        title: "Show type or status",
        description: "Icons can signal category, priority, or state before users read the text.",
      },
      {
        title: "Add light visual structure",
        description: "Icon lists add emphasis while keeping the layout simple.",
      },
    ],
    anatomyParts: [
      { title: "List container" },
      { title: "List item" },
      { title: "Leading icon" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: "sgds-icon-list", targetX: "right", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-demo-list-item", targetX: "center", targetY: "top" },
      { number: 3, direction: "left", targetSelector: "sgds-icon", targetX: "left", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Size",
        description:
          "Use `size` to scale the font size of all list items in the icon list.",
        controlLabel: "Icon list size options",
        defaultValue: "md",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<sgds-icon-list size="sm">
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle"></sgds-icon><span>Application submitted</span></div>
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle"></sgds-icon><span>Documents verified</span></div>
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="clock"></sgds-icon><span>Review in progress</span></div>
        </sgds-icon-list>`,
            description: "Compact size for dense layouts and sidebars.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<sgds-icon-list size="md">
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle"></sgds-icon><span>Application submitted</span></div>
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle"></sgds-icon><span>Documents verified</span></div>
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="clock"></sgds-icon><span>Review in progress</span></div>
        </sgds-icon-list>`,
            description: "Default size suitable for most body content.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<sgds-icon-list size="lg">
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle"></sgds-icon><span>Application submitted</span></div>
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="check-circle"></sgds-icon><span>Documents verified</span></div>
          <div role="listitem" class="portal-demo-list-item"><sgds-icon name="clock"></sgds-icon><span>Review in progress</span></div>
        </sgds-icon-list>`,
            description: "Larger size for hero sections or feature highlights.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a consistent icon when items share a meaning",
          description:
            "When every item belongs to the same category, repeat the same icon so the visual rhythm shows they are peers.",
          tone: "do",
          markup: `<sgds-icon-list>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Identity verified with Singpass</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Documents uploaded</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Application submitted</span>
            </div>
          </sgds-icon-list>`,
        },
        {
          title: "Vary the icon when items represent different states",
          description:
            "When each item carries different meaning, match icons to each state so the list reads as more than a checklist.",
          tone: "do",
          markup: `<sgds-icon-list>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Application submitted</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Documents verified</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="clock"></sgds-icon>
              <span>Review in progress</span>
            </div>
          </sgds-icon-list>`,
        },
        {
          title: "Do not mix unrelated icons in the same list",
          description:
            "If icons do not share a common purpose, they create noise. Use one icon, or icons tied to a shared dimension.",
          tone: "dont",
          markup: `<sgds-icon-list>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="house"></sgds-icon>
              <span>Eligible for housing grant</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="bell"></sgds-icon>
              <span>Documents verified</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="three-dots"></sgds-icon>
              <span>Application submitted</span>
            </div>
          </sgds-icon-list>`,
        },
        {
          title: "Keep each item to a single line where possible",
          description:
            "Icon lists scan best when items are short and parallel. For longer explanations, use a different layout.",
          tone: "do",
          markup: `<sgds-icon-list>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Free to use for all residents</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Available 24 hours a day</span>
            </div>
          </sgds-icon-list>`,
        },
        {
          title:
            "Do not use an icon list as a substitute for a navigation menu",
          description:
            "An icon list is presentational, not interactive. Use sidenav or a list of buttons for navigation instead.",
          tone: "dont",
          markup: `<sgds-icon-list>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="house"></sgds-icon>
              <span>Home</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="gear"></sgds-icon>
              <span>Settings</span>
            </div>
          </sgds-icon-list>`,
        },
        {
          title: "Do not write long explanations as icon list items",
          description: "Long items make the icon alignment less useful and slow scanning. Use paragraphs, cards, or description lists for detailed content.",
          tone: "dont",
          markup: `<sgds-icon-list>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Bring all supporting documents, including identification, proof of address, and any letters requested by the agency.</span>
            </div>
            <div role="listitem" class="portal-demo-list-item">
              <sgds-icon name="check-circle"></sgds-icon>
              <span>Review the full eligibility criteria before applying, especially if your household details recently changed.</span>
            </div>
          </sgds-icon-list>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / icon-list",
        rows: [
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items inside the component; spacing between items of the content" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", variant: "sm", usage: "Font size of the content" },
          { category: "Typography", name: "font-size-body-md", value: "sgds/font-size/body-md", variant: "md", usage: "Font size of the content (inherited from parent)" },
          { category: "Typography", name: "font-size-20", value: "sgds/font-size/20", variant: "lg", usage: "Font size of the content" },
          { category: "Typography", name: "line-height-20", value: "sgds/line-height/20", variant: "sm", usage: "Line height of the content" },
          { category: "Typography", name: "line-height-xs", value: "sgds/line-height/xs", variant: "md", usage: "Line height of the content (inherited from parent)" },
          { category: "Typography", name: "line-height-32", value: "sgds/line-height/32", variant: "lg", usage: "Line height of the content" },
        ],
      },
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
        title: "Lead with an image",
        description: "Use an image to give quick context before users read the card.",
      },
      {
        title: "Present visual content",
        description: "Image cards fit articles, projects, resources, or items with useful imagery.",
      },
      {
        title: "Keep card grids stable",
        description: "Shared structure and proportions help repeated image cards align.",
      },
    ],
    anatomyMarkup: `<sgds-image-card class="portal-anatomy-image-card portal-demo-card">
      <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
      <span slot="title">Image card title</span>
      <span slot="description">Supporting description with detail to explain image card content clearly.</span>
    </sgds-image-card>`,
    anatomyParts: [
      { title: "Container" },
      { title: "Image" },
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "right",
        targetSelector: ".portal-anatomy-image-card",
        targetX: "right",
        targetY: "center",
      },
      {
        number: 2,
        direction: "top",
        targetSelector: ".portal-anatomy-image-card [slot='image']",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-anatomy-image-card [slot='title']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 4,
        direction: "bottom",
        targetSelector: ".portal-anatomy-image-card [slot='description']",
        targetX: "center",
        targetY: "bottom",
      },
    ],
    configurationDemos: [
      {
        title: "Orientation",
        description:
          "Use `orientation` to control whether the image sits above the content or beside it.",
        controlLabel: "Image card orientation options",
        defaultValue: "vertical",
        options: [
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-image-card class="portal-demo-card" orientation="vertical">
          <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
          <span slot="title">National Day Parade</span>
          <span slot="description">Celebrate Singapore's birthday with the nation.</span>
        </sgds-image-card>`,
            description:
              "Default vertical layout stacks the image above the content.",
          },
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-image-card class="portal-demo-card" orientation="horizontal">
          <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
          <span slot="title">National Day Parade</span>
          <span slot="description">Celebrate Singapore's birthday with the nation.</span>
        </sgds-image-card>`,
            description:
              "Horizontal layout places the image beside the content. Use in narrower columns or list views.",
          },
        ],
      },
      {
        title: "Image position",
        description:
          "Use `imagePosition` to flip the image to the opposite side of the content.",
        controlLabel: "Image card image position options",
        defaultValue: "before",
        options: [
          {
            label: "Before content",
            value: "before",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="before">
          <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
          <span slot="title">Career fair</span>
          <span slot="description">Meet hiring agencies and explore new roles.</span>
        </sgds-image-card>`,
            description:
              "Image renders before the content (above in vertical, left in horizontal).",
          },
          {
            label: "After content",
            value: "after",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="after">
          <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
          <span slot="title">Career fair</span>
          <span slot="description">Meet hiring agencies and explore new roles.</span>
        </sgds-image-card>`,
            description:
              "Image renders after the content (below in vertical, right in horizontal).",
          },
        ],
      },
      {
        title: "Tinted background",
        description:
          "Use `tinted` to apply a subtle background colour that lifts the card from the page surface.",
        controlLabel: "Image card background options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-image-card class="portal-demo-card">
          <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
          <span slot="title">Featured story</span>
          <span slot="description">A look at this month's highlights.</span>
        </sgds-image-card>`,
            description: "Uses the page background.",
          },
          {
            label: "Tinted",
            value: "tinted",
            markup: `<sgds-image-card class="portal-demo-card" tinted>
          <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
          <span slot="title">Featured story</span>
          <span slot="description">A look at this month's highlights.</span>
        </sgds-image-card>`,
            description:
              "Adds a tinted background to differentiate the card from surrounding content.",
          },
        ],
      },
  {
        title: "Padding",
        description:
          "Use noPadding when the image card content should sit flush inside the card surface.",
        controlLabel: "Image card padding options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Default padding</span>
              <span slot="description">Content uses the default inset spacing.</span>
            </sgds-image-card>`,
            description: "Use default padding for most image cards.",
          },
          {
            label: "No padding",
            value: "no-padding",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top" noPadding>
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">No padding</span>
              <span slot="description">Content can sit closer to the card edge.</span>
            </sgds-image-card>`,
            description:
              "Use noPadding only when the surrounding composition already provides enough spacing.",
          },
        ],
      },
      {
        title: "Border and disabled",
        description:
          "Image cards can remove the border or show a disabled state when unavailable.",
        controlLabel: "Image card state options",
        defaultValue: "border",
        options: [
          {
            label: "Border",
            value: "border",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">With border</span>
            </sgds-image-card>`,
            description: "Use the default border for clearer separation.",
          },
          {
            label: "No border",
            value: "no-border",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top" hideBorder>
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">No border</span>
            </sgds-image-card>`,
            description:
              "Use no border only when the card sits inside a surface that already creates separation.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top" disabled>
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Disabled card</span>
            </sgds-image-card>`,
            description:
              "Use disabled when the card destination or action is temporarily unavailable.",
          },
        ],
      },
      {
        title: "Image adjustment",
        description:
          "Image adjustment controls how the thumbnail image fits inside the image area.",
        controlLabel: "Image card adjustment options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-image-card class="portal-demo-card" imageAdjustment="default">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Default image</span>
            </sgds-image-card>`,
            description:
              "Use the default treatment when the image should connect directly to the card edge.",
          },
          {
            label: "Padding around",
            value: "padding-around",
            markup: `<sgds-image-card class="portal-demo-card" imageAdjustment="padding around">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Padded image</span>
            </sgds-image-card>`,
            description:
              "Use padding around when the image needs separation from the card edge.",
          },
        ],
      },
      {
        title: "Image slots",
        description:
          "Image badge and action slots add compact metadata or controls on top of the image.",
        controlLabel: "Image card image slot options",
        defaultValue: "with-slots",
        options: [
          {
            label: "With slots",
            value: "with-slots",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <sgds-badge slot="image-badge" variant="success">New</sgds-badge>
              <sgds-icon-button slot="image-action" name="bookmark" ariaLabel="Save"></sgds-icon-button>
              <span slot="title">Image slots</span>
            </sgds-image-card>`,
            description:
              "Use these slots for concise image-level status or actions.",
          },
          {
            label: "Image only",
            value: "image-only",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Image only</span>
            </sgds-image-card>`,
            description: "Keep the image area clean when no overlay is needed.",
          },
        ],
      },
      {
        title: "Footer link and stretched link",
        description:
          "Image cards support footer links and stretched link behaviour for navigational cards.",
        controlLabel: "Image card link options",
        defaultValue: "footer",
        options: [
          {
            label: "Footer link",
            value: "footer",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top">
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Article</span>
              <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
            </sgds-image-card>`,
            description: "Use a footer link when only the link should navigate.",
          },
          {
            label: "Stretched link",
            value: "stretched",
            markup: `<sgds-image-card class="portal-demo-card" imagePosition="top" stretchedLink>
              <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80">
              <span slot="title">Article</span>
              <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
            </sgds-image-card>`,
            description:
              "Use stretchedLink when the entire card is one destination.",
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
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80"
          />
          <span slot="title">Image card title</span>
          <span slot="description">Supporting description for the image card content.</span>
        </sgds-image-card>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a meaningful image, not a generic placeholder",
          description:
            "The image is the primary signal. Pick one that previews the content so users can decide whether to click.",
          tone: "do",
          markup: `<sgds-image-card class="portal-demo-card">
            <img slot="image" alt="Crowd at the National Day Parade" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
            <span slot="title">National Day Parade</span>
            <span slot="description">Celebrate Singapore's birthday with the nation.</span>
          </sgds-image-card>`,
        },
        {
          title: "Always provide meaningful alt text",
          description:
            "Write a brief, specific alt description. Never leave alt empty or repeat the card title verbatim.",
          tone: "do",
          markup: `<sgds-image-card class="portal-demo-card">
            <img slot="image" alt="Hawker preparing chicken rice at a stall" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
            <span slot="title">Hawker culture</span>
            <span slot="description">Stories from Singapore's hawker centres.</span>
          </sgds-image-card>`,
        },
        {
          title: "Do not use image cards when the image adds no information",
          description:
            "If the image is purely decorative or interchangeable, drop it. Icon or text cards will scan better.",
          tone: "dont",
          markup: `<sgds-image-card class="portal-demo-card">
            <img slot="image" alt="" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
            <span slot="title">Frequently asked questions</span>
            <span slot="description">Answers to common questions about our service.</span>
          </sgds-image-card>`,
        },
        {
          title: "Use horizontal orientation in narrow columns",
          description:
            "Horizontal image cards work better in lists, sidebars, or columns too narrow for a vertical image.",
          tone: "do",
          markup: `<sgds-image-card class="portal-demo-card" orientation="horizontal">
            <img slot="image" alt="Job seekers at a career fair" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&h=140&q=80" />
            <span slot="title">Career fair</span>
            <span slot="description">Meet hiring agencies and explore new roles.</span>
          </sgds-image-card>`,
        },
        {
          title: "Do not stretch images to fill mismatched aspect ratios",
          description:
            "Provide images sized for the card's expected ratio. Crop the source rather than relying on stretching.",
          tone: "dont",
          markup: `<sgds-image-card class="portal-demo-card">
            <img slot="image" alt="Distorted city view" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&h=600&q=80" />
            <span slot="title">Featured story</span>
            <span slot="description">A look at this month's highlights.</span>
          </sgds-image-card>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / image-card",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/none", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/xl", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the card" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Border of the card" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the card tinted bg" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the card tinted bg" },
        ],
      },
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
        title: "Collect short text",
        description: "Use text inputs for single-line values such as names, references, and search terms.",
      },
      {
        title: "Show validation clearly",
        description: "Built-in states help users see errors, warnings, and successful entries.",
      },
      {
        title: "Keep guidance near the field",
        description: "Labels, hint text, and feedback stay close to the input they explain.",
      },
    ],
    anatomyMarkup: `<sgds-input class="portal-anatomy-input" label="Label" hintText="Hint text" type="password" prefix="Prefix" suffix="Suffix" placeholder="Placeholder text"><sgds-icon slot="icon" name="search"></sgds-icon><sgds-icon slot="trailing-icon" name="cross"></sgds-icon><sgds-icon-button slot="action" name="gear" variant="ghost" size="md" aria-label="Open input settings"></sgds-icon-button></sgds-input>`,
    anatomyParts: [
      { title: "Label" },
      { title: "Leading icon" },
      { title: "Hint text" },
      { title: "Prefix" },
      { title: "Value" },
      { title: "Password icon" },
      { title: "Suffix" },
      { title: "Trailing icon" },
      { title: "Action - Icon button" },
      { title: "Input container" },
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "left",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: ".form-label",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: "sgds-icon[slot='icon']",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: ".form-text",
        targetX: "left",
        targetY: "center",
        alignBadgeWithCallout: 1,
      },
      {
        number: 4,
        direction: "top",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: ".form-control-prefix",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 5,
        direction: "top",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: "input.form-control",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 6,
        direction: "top",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: "sgds-icon[role='button']",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 7,
        direction: "top",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: ".form-control-suffix",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 8,
        direction: "top",
        targetSelector: "sgds-icon[slot='trailing-icon']",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 9,
        direction: "right",
        targetSelector: "sgds-icon-button[slot='action']",
        targetX: "right",
        targetY: "center",
      },
      {
        number: 10,
        direction: "bottom",
        targetSelector: ".portal-anatomy-input",
        targetShadowSelector: ".form-control-group",
        targetX: "center",
        targetY: "bottom",
      },
    ],
    configurationDemos: [
      {
        title: "Hint text",
        description: "Use hint text to clarify the expected value.",
        controlLabel: "Input hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-input label="Full name"></sgds-input>`,
            description: "Default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-input label="Full name" hintText="As shown on your NRIC"></sgds-input>`,
            description: "Hint text gives users guidance about what to enter.",
          },
        ],
      },
      {
        title: "Input type",
        description:
          "Use the appropriate type so the browser can apply the right keyboard and validation.",
        controlLabel: "Input type options",
        defaultValue: "text",
        options: [
          {
            label: "Text",
            value: "text",
            markup: `<sgds-input label="Name" type="text"></sgds-input>`,
            description: "Standard single-line text input.",
          },
          {
            label: "Email",
            value: "email",
            markup: `<sgds-input label="Email" type="email" placeholder="name@example.com"></sgds-input>`,
            description:
              "Browser-native email validation and email keyboard on mobile.",
          },
          {
            label: "Password",
            value: "password",
            markup: `<sgds-input label="Password" type="password"></sgds-input>`,
            description: "Masks the entered characters.",
          },
          {
            label: "Number",
            value: "number",
            markup: `<sgds-input label="Quantity" type="number" min="0" max="100" step="1"></sgds-input>`,
            description:
              "Restricts entry to numeric values; supports min, max and step.",
          },
        ],
      },
      {
        title: "Placeholder",
        description:
          "Provide a placeholder hint for the kind of value to enter.",
        controlLabel: "Input placeholder options",
        defaultValue: "no-placeholder",
        options: [
          {
            label: "No placeholder",
            value: "no-placeholder",
            markup: `<sgds-input label="Search" placeholder=""></sgds-input>`,
            description: "Empty input with no inline helper.",
          },
          {
            label: "Placeholder",
            value: "placeholder",
            markup: `<sgds-input label="Search" placeholder="Search articles"></sgds-input>`,
            description: "Placeholder shows until the user starts typing.",
          },
        ],
      },
      {
        title: "Icon",
        description:
          "Use the icon slot to add a leading icon for visual context.",
        controlLabel: "Input icon options",
        defaultValue: "no-icon",
        options: [
          {
            label: "No icon",
            value: "no-icon",
            markup: `<sgds-input label="Search"></sgds-input>`,
            description: "Default input without a leading icon.",
          },
          {
            label: "Icon",
            value: "icon",
            markup: `<sgds-input label="Search">
          <sgds-icon slot="icon" name="search"></sgds-icon>
        </sgds-input>`,
            description: "A leading icon sits inside the input on the left.",
          },
        ],
      },
      {
        title: "Read-only",
        description:
          "Display a value that the user can read and copy but not edit.",
        controlLabel: "Input read-only options",
        defaultValue: "editable",
        options: [
          {
            label: "Editable",
            value: "editable",
            markup: `<sgds-input label="Reference number" value="REF-12345"></sgds-input>`,
            description: "Default editable input.",
          },
          {
            label: "Read-only",
            value: "readonly",
            markup: `<sgds-input label="Reference number" value="REF-12345" readonly></sgds-input>`,
            description:
              "Value is shown without an editable border, but text can still be selected.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Disable the input to prevent it from being edited or focused.",
        controlLabel: "Input disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-input label="Full name" value="Tan Ah Kow"></sgds-input>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-input label="Full name" value="Tan Ah Kow" disabled></sgds-input>`,
            description: "Input appears muted and cannot receive focus.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and a feedback message when the input is invalid.",
        controlLabel: "Input validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-input label="Email" type="email"></sgds-input>`,
            description: "No feedback is shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-input label="Email" type="email" required hasFeedback="both" invalid invalidFeedback="Enter a valid email"></sgds-input>`,
            description:
              "Input shows error styling and feedback message below.",
          },
        ],
      },
  {
        title: "Prefix and suffix",
        description:
          "Prefix and suffix text add fixed context to the value users enter.",
        controlLabel: "Input prefix and suffix options",
        defaultValue: "prefix-suffix",
        options: [
          {
            label: "Prefix and suffix",
            value: "prefix-suffix",
            markup: `<sgds-input label="Amount" prefix="$" suffix="SGD" value="120"></sgds-input>`,
            description:
              "Use when the unit or symbol is part of understanding the value.",
          },
          {
            label: "No adornment",
            value: "none",
            markup: `<sgds-input label="Amount" value="120"></sgds-input>`,
            description: "Omit prefix and suffix when the label is enough.",
          },
        ],
      },
      {
        title: "Character count and length",
        description:
          "Use character count with minimum or maximum length requirements when input length matters.",
        controlLabel: "Input length options",
        defaultValue: "count",
        options: [
          {
            label: "Count",
            value: "count",
            markup: `<sgds-input label="Short name" value="Portal" maxlength="20" characterCount></sgds-input>`,
            description:
              "Use character count to help users stay within a length limit.",
          },
          {
            label: "Length rule",
            value: "length",
            markup: `<sgds-input label="Reference code" minlength="6" maxlength="12" hasFeedback invalid invalidFeedback="Use 6 to 12 characters."></sgds-input>`,
            description:
              "Use length validation when the submitted value must meet a fixed rule.",
          },
        ],
      },
      {
        title: "Required",
        description:
          "Mark an input as required when the form cannot be completed without a value.",
        controlLabel: "Input required options",
        defaultValue: "optional",
        options: [
          {
            label: "Optional",
            value: "optional",
            markup: `<sgds-input label="Middle name"></sgds-input>`,
            description: "Use optional inputs only when the value is not needed.",
          },
          {
            label: "Required",
            value: "required",
            markup: `<sgds-input label="Full name" required></sgds-input>`,
            description:
              "Use required for fields that must be completed before submission.",
          },
        ],
      },
      {
        title: "Loading and valid",
        description:
          "Inputs can show asynchronous checking and successful validation states.",
        controlLabel: "Input async state options",
        defaultValue: "loading",
        options: [
          {
            label: "Loading",
            value: "loading",
            markup: `<sgds-input label="Username" value="maya.lim" loading></sgds-input>`,
            description:
              "Use loading while checking a value against a service.",
          },
          {
            label: "Valid",
            value: "valid",
            markup: `<sgds-input label="Username" value="maya.lim" hasFeedback valid></sgds-input>`,
            description:
              "Use valid feedback only when confirming a value helps users continue confidently.",
          },
        ],
      },
      {
        title: "Slots",
        description:
          "Trailing icon and action slots add contextual controls to the input.",
        controlLabel: "Input slot options",
        defaultValue: "trailing-icon",
        options: [
          {
            label: "Trailing icon",
            value: "trailing-icon",
            markup: `<sgds-input label="Search" placeholder="Search services">
              <sgds-icon slot="trailing-icon" name="search"></sgds-icon>
            </sgds-input>`,
            description:
              "Use a trailing icon for a passive visual cue or status icon.",
          },
          {
            label: "Action",
            value: "action",
            markup: `<sgds-input label="Search" placeholder="Search services">
              <sgds-button slot="action">Search</sgds-button>
            </sgds-input>`,
            description:
              "Use an action slot when the input has a directly associated command.",
          },
        ],
      },
      {
        title: "Number constraints",
        description:
          "Number inputs support minimum, maximum, and step constraints.",
        controlLabel: "Input number constraint options",
        defaultValue: "step",
        options: [
          {
            label: "Constrained",
            value: "step",
            markup: `<sgds-input label="Quantity" type="number" min="1" max="10" step="1" value="12" hasFeedback invalid invalidFeedback="Enter a number from 1 to 10."></sgds-input>`,
            description:
              "Use min, max, and step when numeric values must stay within a known range.",
          },
          {
            label: "No constraints",
            value: "none",
            markup: `<sgds-input label="Quantity" type="number" value="4"></sgds-input>`,
            description:
              "Use unconstrained number input only when any number is valid.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a clear, persistent label",
          description:
            "Always pair the input with a visible label so users know what to enter, even after they have typed.",
          tone: "do",
          markup: `<sgds-input label="Full name" hintText="As shown on your NRIC"></sgds-input>`,
        },
        {
          title: "Do not rely on placeholder text as the only label",
          description:
            "Placeholder text disappears once users type. Keep the label visible above the field at all times.",
          tone: "dont",
          markup: `<sgds-input placeholder="Full name"></sgds-input>`,
        },
        {
          title: "Match the input type to the value being collected",
          description:
            "Use type=email, type=number, or type=password so the browser provides the right keyboard and validation.",
          tone: "do",
          markup: `<sgds-input label="Email" type="email" placeholder="name@example.com"></sgds-input>`,
        },
        {
          title:
            "Do not use type=number for identifiers like NRIC or phone numbers",
          description:
            "type=number strips leading zeros and exposes spinners that do not fit IDs. Use type=text and validate.",
          tone: "dont",
          markup: `<sgds-input label="Mobile number" type="number"></sgds-input>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / input",
        rows: [
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the form control row" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the form control suffix" },
          { category: "Size", name: "dimension-160", value: "sgds/dimension/160", usage: "Minimum width of items inside the component" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the interactive icon inside the input" },
          { category: "Colour", name: "form-color-subtle", value: "sgds/form/color/subtle", usage: "Text colour of the form control suffix" },
          { category: "Border", name: "form-border-radius-md", value: "sgds/form/border-radius/md", usage: "Corner radius of items inside the component" },
          { category: "Outline", name: "form-outline-focus", value: "sgds/form/outline/focus", usage: "Focus outline of the sgds icon when keyboard-focused" },
        ],
      },
    ],
  },
  link: {
    key: "link",
    title: "Link",
    tag: "sgds-link",
    group: "labels",
    summary:
      "Link allows users to click and navigate their way from page to page",
    purposeCards: [
      {
        title: "Move between resources",
        description: "Use links to take users to related pages, files, or sections.",
      },
      {
        title: "Stand out in text",
        description: "Underline and colour treatments make links recognisable inside content.",
      },
      {
        title: "Match surrounding type",
        description: "Size options help links sit naturally in body text, captions, or headings.",
      },
    ],
    anatomyMarkup: `<sgds-link class="portal-anatomy-link">
      <a href="#">
        <sgds-icon class="portal-anatomy-link-leading-icon" name="arrow-left"></sgds-icon>
        <span class="portal-anatomy-link-label">Link label</span>
        <sgds-icon class="portal-anatomy-link-trailing-icon" name="arrow-right"></sgds-icon>
      </a>
    </sgds-link>`,
    anatomyParts: [
      { title: "Leading icon", note: "(optional)" },
      { title: "Label" },
      { title: "Trailing icon", note: "(optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-link-leading-icon", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-link-label", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-24" },
      { number: 3, direction: "right", targetSelector: ".portal-anatomy-link-trailing-icon", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Tone",
        description:
          "Link tone adjusts the colour treatment so the link can match its context. Body copy, danger messaging, or dark surfaces.",
        controlLabel: "Link tone options",
        defaultValue: "primary",
        options: [
          {
            label: "Primary",
            value: "primary",
            markup: `<sgds-link><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "The default tone. Use for most inline links within body copy or navigation contexts.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<sgds-link tone="neutral"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Use when the link should feel quieter and sit naturally within neutral interface text.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<sgds-link tone="danger"><a href="#">Remove this item</a></sgds-link>`,
            description:
              "Use for destructive or high-risk navigation actions that need stronger visual warning.",
          },
          {
            label: "Fixed light",
            value: "fixed-light",
            markup: `<sgds-link tone="fixed-light"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Only use on fixed dark or strongly coloured backgrounds. It may be hard to see on this page surface because the link always stays light.",
          },
          {
            label: "Fixed dark",
            value: "fixed-dark",
            markup: `<sgds-link tone="fixed-dark"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Only use on fixed light backgrounds. It may be hard to see in dark mode because the link always stays dark.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Link sizes let you match the link to the surrounding type (body copy, captions, or headings) without breaking the typographic hierarchy.",
        controlLabel: "Link size options",
        defaultValue: "md",
        options: [
          {
            label: "Extra small",
            value: "xs",
            markup: `<sgds-link size="xs"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Use within fine print or caption-sized text where the link needs to sit at the smallest typographic step.",
          },
          {
            label: "Small",
            value: "sm",
            markup: `<sgds-link size="sm"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Use within small body text or compact metadata where the link should match the surrounding type.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<sgds-link size="md"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "The default size. Use within standard body copy and most page content.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<sgds-link size="lg"><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Use within larger body or subheading text where the link needs to keep parity with bigger surrounding type.",
          },
        ],
      },
      {
        title: "Active",
        description:
          "Use the active state to visually indicate the currently selected link, such as the active item in a list of related links.",
        controlLabel: "Link active options",
        defaultValue: "not-active",
        options: [
          {
            label: "Not active",
            value: "not-active",
            markup: `<sgds-link><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "The default state. Use for any link that does not represent the current selection.",
          },
          {
            label: "Active",
            value: "active",
            markup: `<sgds-link active><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Applies the active styling to indicate the currently selected link in a navigational set or related-link list.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use the `disabled` state to prevent navigation when the destination is not available in the current context.",
        controlLabel: "Link disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-link><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "The default. Links are interactive and follow their anchor destination.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-link disabled><a href="#">Visit related guidance</a></sgds-link>`,
            description:
              "Use when the link target is temporarily unavailable. Disabled links appear muted and cannot be activated.",
          },
        ],
      },
    ],
    measurements: [
      demo(
        "Structure",
        "Link structure preview with a trailing icon.",
        `<sgds-link><a href="#">Visit related guidance<sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>`,
      ),
    ],
    demos: [
      demo(
        "Default",
        "Use links for navigation between pages, sections, or related references.",
        `<sgds-link><a href="#">Visit related guidance</a></sgds-link>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use links for navigation, buttons for actions",
          description:
            "A link should take the user to another page or anchor. For actions that change data, use sgds-button.",
          tone: "do",
          markup: `<p>Read the full <sgds-link><a href="/eligibility">eligibility criteria</a></sgds-link> before applying.</p>`,
        },
        {
          title: "Do not style buttons as links for actions",
          description:
            "Styling an action as a link hides its consequence. Use a button when the control performs an action.",
          tone: "dont",
          markup: `<sgds-link tone="danger"><a href="#">Delete account</a></sgds-link>`,
        },
        {
          title: "Write descriptive link text",
          description:
            "Make the link label describe the destination. 'Read the housing grant guide' beats 'Click here'.",
          tone: "do",
          markup: `<p>For more details, see the <sgds-link><a href="/grants/housing">housing grant guide</a></sgds-link>.</p>`,
        },
        {
          title: "Do not use vague link text",
          description:
            "Generic labels like 'click here' force users to read the surrounding sentence and hurt screen reader use.",
          tone: "dont",
          markup: `<p>For more details about housing grants, <sgds-link><a href="/grants/housing">click here</a></sgds-link>.</p>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / link",
        rows: [
          { category: "Typography", name: "font-size-12", value: "sgds/font-size/12", variant: "xs", usage: "Font size of the content" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", variant: "sm", usage: "Font size of the content" },
          { category: "Typography", name: "font-size-16", value: "sgds/font-size/16", variant: "md", usage: "Font size of the content" },
          { category: "Typography", name: "font-size-20", value: "sgds/font-size/20", variant: "lg", usage: "Font size of the content" },
          { category: "Typography", name: "line-height-16", value: "sgds/line-height/16", variant: "xs", usage: "Line height of the content" },
          { category: "Typography", name: "line-height-20", value: "sgds/line-height/20", variant: "sm", usage: "Line height of the content" },
          { category: "Typography", name: "line-height-24", value: "sgds/line-height/24", variant: "md", usage: "Line height of the content" },
          { category: "Typography", name: "line-height-32", value: "sgds/line-height/32", variant: "lg", usage: "Line height of the content" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", mapKey: "icon-size", variant: "xs", usage: "Height of the content; width of the content" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", mapKey: "icon-size", variant: "sm", usage: "Height of the content; width of the content" },
          { category: "Size", name: "icon-size-lg", value: "sgds/icon-size/lg", mapKey: "icon-size", variant: "md", usage: "Height of the content; width of the content" },
          { category: "Size", name: "icon-size-xl", value: "sgds/icon-size/xl", mapKey: "icon-size", variant: "lg", usage: "Height of the content; width of the content" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of items inside the component; text colour of the content" },
          { category: "Colour", name: "color-fixed-dark", value: "sgds/color-fixed-dark", usage: "Text colour of items inside the component; text colour of the content" },
          { category: "Colour", name: "color-fixed-light", value: "sgds/color-fixed-light", usage: "Text colour of items inside the component; text colour of the content" },
          { category: "Colour", name: "danger-color-default", value: "sgds/danger/color/default", usage: "Text colour of the content" },
          { category: "Colour", name: "danger-color-emphasis", value: "sgds/danger/color/emphasis", usage: "Text colour of items inside the component; text colour of the content on hover" },
          { category: "Colour", name: "link-color-default", value: "sgds/link-color-default", usage: "Text colour of the content" },
          { category: "Colour", name: "link-color-emphasis", value: "sgds/link-color-emphasis", usage: "Text colour of items inside the component" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the content) when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the content) when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the content when disabled" },
          { category: "Motion", name: "motion-duration-standard", value: "sgds/motion-duration-standard", usage: "Transition of the content; transition of the content when active" },
          { category: "Motion", name: "motion-easing-enter", value: "sgds/motion-easing-enter", usage: "Transition of the content; transition of the content when active" },
        ],
      },
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
        title: "Show main sections",
        description: "Mainnav gives users access to the top-level areas of a service.",
      },
      {
        title: "Anchor the service brand",
        description: "Use the brand slot so users know which service they are using.",
      },
      {
        title: "Work across screen sizes",
        description: "The navigation adapts from desktop layouts to smaller screens.",
      },
    ],
    anatomyMarkup: `<sgds-mainnav fluid expand="always" brandHref="/" class="portal-mainnav-anatomy sgds:w-[var(--sgds-dimension-688)]">
      <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
      <sgds-mainnav-item active><a href="#">Services</a></sgds-mainnav-item>
      <sgds-mainnav-item><a href="#">Resources</a></sgds-mainnav-item>
      <sgds-mainnav-item><a href="#">Contact</a></sgds-mainnav-item>
      <sgds-button slot="end">Log in</sgds-button>
    </sgds-mainnav>`,
    anatomyParts: [
      { title: "Slot content" },
      { title: "Nav menus" },
      { title: "Container" },
      { title: "Primary action" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-mainnav-brand-slot", targetX: "center", targetY: "top" },
      { number: 2, direction: "bottom", targetSelector: "sgds-mainnav-item[active]", targetX: "center", targetY: "bottom" },
      { number: 3, direction: "bottom", targetSelector: ".portal-mainnav-anatomy", targetX: "center", targetY: "bottom" },
      { number: 4, direction: "top", targetSelector: "sgds-button[slot='end']", targetX: "center", targetY: "top" },
    ],
    configurationDemos: [
      {
        title: "Container width",
        description:
          "Toggle the fluid prop to remove the max-width constraint and stretch the navbar across the viewport.",
        controlLabel: "Mainnav container width options",
        defaultValue: "constrained",
        options: [
          {
            label: "Constrained width",
            value: "constrained",
            markup: `<div class="portal-demo-nav portal-mainnav-width-demo sgds:w-full">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-mainnav-item>Services</sgds-mainnav-item>
            <sgds-mainnav-item>Contact</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Default behaviour. Content is bounded by the standard SGDS container max-width.",
          },
          {
            label: "Full-bleed (fluid)",
            value: "fluid",
            markup: `<div class="portal-demo-nav portal-mainnav-width-demo sgds:w-full">
          <sgds-mainnav brandHref="/" fluid>
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-mainnav-item>Services</sgds-mainnav-item>
            <sgds-mainnav-item>Contact</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Stretches the navbar to the full viewport width. Use for app shells and dashboards.",
          },
        ],
      },
      {
        title: "Item states",
        description:
          "Mark the current page with `active` and use `disabled` to indicate items that are unavailable.",
        controlLabel: "Mainnav item states options",
        defaultValue: "with-active",
        options: [
          {
            label: "Default items",
            value: "default-items",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-mainnav-item>Contact</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Plain navigation items with no current page indicator.",
          },
          {
            label: "With active item",
            value: "with-active",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-mainnav-item>Contact</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Highlights the current page so users know where they are in the site.",
          },
          {
            label: "With disabled item",
            value: "with-disabled",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-mainnav-item disabled>Coming soon</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Use sparingly to indicate a section that exists but is not yet available.",
          },
        ],
      },
      {
        title: "Dropdown menu",
        description:
          "Use sgds-mainnav-dropdown to group related destinations under a single navigation item.",
        controlLabel: "Mainnav dropdown options",
        defaultValue: "without-dropdown",
        options: [
          {
            label: "Without dropdown",
            value: "without-dropdown",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-mainnav-item>Contact</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Flat list of items, best when there are five or fewer destinations.",
          },
          {
            label: "With dropdown",
            value: "with-dropdown",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-dropdown>
              <span slot="toggler">Services</span>
              <sgds-dropdown-item>Apply</sgds-dropdown-item>
              <sgds-dropdown-item>Renew</sgds-dropdown-item>
              <sgds-dropdown-item>Track status</sgds-dropdown-item>
            </sgds-mainnav-dropdown>
            <sgds-mainnav-item>Contact</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description:
              "Group related sub-pages under one parent item to keep the navbar compact.",
          },
        ],
      },
      {
        title: "End slot content",
        description:
          "Use the end slot to anchor sign-in buttons or other actions to the right end of the navbar.",
        controlLabel: "Mainnav end slot options",
        defaultValue: "without-end",
        options: [
          {
            label: "Without end slot",
            value: "without-end",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
          </sgds-mainnav>
        </div>`,
            description: "Use when the navbar carries only navigation links.",
          },
          {
            label: "With sign-in action",
            value: "with-end-action",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item active>Home</sgds-mainnav-item>
            <sgds-mainnav-item>About</sgds-mainnav-item>
            <sgds-button slot="end" variant="primary">Sign in</sgds-button>
          </sgds-mainnav>
        </div>`,
            description:
              "Anchor a primary call-to-action like Sign in or Get started to the right.",
          },
        ],
      },
      {
        title: "Non-collapsible slot",
        description:
          "The non-collapsible slot keeps critical actions visible even when navigation items collapse.",
        controlLabel: "Main navigation persistent action options",
        defaultValue: "with-action",
        options: [
          {
            label: "With action",
            value: "with-action",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active><a href="#">Home</a></sgds-mainnav-item>
              <sgds-mainnav-item><a href="#">About</a></sgds-mainnav-item>
              <sgds-mainnav-item><a href="#">Contact</a></sgds-mainnav-item>
              <sgds-button slot="non-collapsible" size="sm">Log in</sgds-button>
            </sgds-mainnav>
        </div>`,
            description:
              "Use for actions that must stay visible across responsive states.",
          },
          {
            label: "No action",
            value: "no-action",
            markup: `<div class="portal-demo-nav">
          <sgds-mainnav brandHref="/">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active><a href="#">Home</a></sgds-mainnav-item>
              <sgds-mainnav-item><a href="#">About</a></sgds-mainnav-item>
              <sgds-mainnav-item><a href="#">Contact</a></sgds-mainnav-item>
            </sgds-mainnav>
        </div>`,
            description:
              "Omit the slot when there is no persistent action.",
          },
        ],
      },
    ],
    measurements: [
      demo(
        "Structure",
        "Mainnav structure preview with illustrative slot content.",
        `<div class="portal-demo-nav">
          <sgds-mainnav fluid expand="always" brandHref="/">
            <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
            <sgds-mainnav-item><a href="#">Overview</a></sgds-mainnav-item>
            <sgds-mainnav-dropdown active>
              <span slot="toggler">Services</span>
              <sgds-dropdown-item><a href="#">Apply</a></sgds-dropdown-item>
            </sgds-mainnav-dropdown>
            <sgds-mainnav-item><a href="#">Contact</a></sgds-mainnav-item>
            <div slot="end" class="portal-slot-example"><span>Slot content</span></div>
          </sgds-mainnav>
        </div>`,
      ),
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
    usage: {
      bestPractices: [
        {
          title: "Use mainnav for top-level destinations",
          description:
            "Reserve mainnav for primary sections every user needs. Keep secondary or task-specific links elsewhere.",
          tone: "do",
          markup: `<div class="portal-demo-nav">
            <sgds-mainnav brandHref="/" expand="always">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active>Home</sgds-mainnav-item>
              <sgds-mainnav-item>Services</sgds-mainnav-item>
              <sgds-mainnav-item>About</sgds-mainnav-item>
              <sgds-mainnav-item>Contact</sgds-mainnav-item>
            </sgds-mainnav>
          </div>`,
        },
        {
          title: "Do not overload the mainnav with every link",
          description:
            "Long mainnavs are hard to scan. With more than five items, consolidate or move some into a dropdown or subnav.",
          tone: "dont",
          markup: `<div class="portal-demo-nav">
            <sgds-mainnav brandHref="/" expand="always">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item>Home</sgds-mainnav-item>
              <sgds-mainnav-item>Apply</sgds-mainnav-item>
              <sgds-mainnav-item>Renew</sgds-mainnav-item>
              <sgds-mainnav-item>Track</sgds-mainnav-item>
              <sgds-mainnav-item>News</sgds-mainnav-item>
              <sgds-mainnav-item>Resources</sgds-mainnav-item>
              <sgds-mainnav-item>Help</sgds-mainnav-item>
              <sgds-mainnav-item>Contact</sgds-mainnav-item>
              <sgds-mainnav-item>About</sgds-mainnav-item>
            </sgds-mainnav>
          </div>`,
        },
        {
          title: "Reserve the end slot for account and sign-in actions",
          description:
            "Anchor user-account actions like sign in to the end slot so users find them in a consistent place.",
          tone: "do",
          markup: `<div class="portal-demo-nav">
            <sgds-mainnav brandHref="/" expand="always">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active>Home</sgds-mainnav-item>
              <sgds-mainnav-item>About</sgds-mainnav-item>
              <sgds-button slot="end" variant="primary">Sign in</sgds-button>
            </sgds-mainnav>
          </div>`,
        },
        {
          title: "Do not use the end slot for unrelated marketing content",
          description:
            "The end slot draws strong attention. Reserve it for one global action, not promotional links or badges.",
          tone: "dont",
          markup: `<div class="portal-demo-nav">
            <sgds-mainnav brandHref="/" expand="always">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active>Home</sgds-mainnav-item>
              <div slot="end">
                <sgds-badge>New</sgds-badge>
                <sgds-button variant="primary">Get started</sgds-button>
                <sgds-button variant="outline">Sign in</sgds-button>
              </div>
            </sgds-mainnav>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / mainnav",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/mainnav/padding-x", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "mobile-padding-x", value: "sgds/mainnav/mobile-padding-x", usage: "Mobile horizontal padding of the mainnav container" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/md", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-sm", value: "sgds/padding/sm", usage: "Padding of the nav link; padding of the link" },
          { category: "Gap", name: "gap-xl", value: "sgds/gap/xl", usage: "Spacing between items of the navbar" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the nav link; spacing between items of the link" },
          { category: "Border", name: "border-color-translucent", value: "sgds/border-color-translucent", mapKey: "navbar-body-border-color", usage: "Colour of the bottom border stroke of the mainnav component" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "navbar-body-border-width", usage: "Thickness of the bottom border stroke of the mainnav component" },
          { category: "Border", name: "border-width-4", value: "sgds/border-width/4", mapKey: "nav-link-border-width", usage: "Thickness of the active nav link purple stroke" },
          { category: "Border", name: "primary-border-color-default", value: "sgds/primary/border-color/default", mapKey: "nav-link-border-color", usage: "Colour of the active nav link purple stroke" },
          { category: "Size", name: "spacer-4", value: "sgds/spacer/4", usage: "Spacing between items inside the component" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", usage: "Size of the mainnav disclosure icon" },
          { category: "Size", name: "mainnav-max-width", value: "sgds/mainnav/max-width", usage: "Maximum width of the mainnav container" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the content when active" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the link; text colour of the content" },
          { category: "Colour", name: "primary-color-default", value: "sgds/primary/color/default", usage: "Text colour of the nav link when active; text colour of the nav link on hover" },
          { category: "Colour", name: "surface-default", value: "sgds/surface-default", usage: "Background colour of the dropdown items; background colour of the nav" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the nav link when keyboard-focused; focus outline of the link when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the nav link when keyboard-focused; focus-outline offset of the link when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the nav link when disabled; transparency of the content when disabled" },
          { category: "Layer", name: "z-index-floating", value: "sgds/z-index-floating", usage: "Stacking layer of the nav; stacking layer of the navbar body" },
        ],
      },
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
        title: "Identify government services",
        description: "The masthead shows the official government banner at the top of the page.",
      },
      {
        title: "Build immediate trust",
        description: "A standard banner helps users recognise an official Singapore Government service.",
      },
      {
        title: "Stay consistent across services",
        description: "Use the same masthead pattern across pages and services.",
      },
    ],
    anatomyMarkup: `<div class="portal-demo-nav sgds:w-full">
      <sgds-masthead fluid class="portal-anatomy-masthead"></sgds-masthead>
    </div>`,
    anatomyParts: [
      { title: "Icon", note: "(Merlion)" },
      { title: "Label" },
      { title: "Link" },
      { title: "Container" },
      { title: "Expanded container" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-masthead", targetShadowSelector: ".sg-crest", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-masthead", targetShadowSelector: ".masthead-text-layout", targetX: "center", targetY: "top" },
      { number: 3, direction: "left", targetSelector: ".portal-anatomy-masthead", targetShadowSelector: ".trusted-websites-link", targetX: "left", targetY: "center" },
      { number: 4, direction: "left", targetSelector: ".portal-anatomy-masthead", targetShadowSelector: ".banner", targetX: "left", targetY: "center" },
      { number: 5, direction: "bottom", targetSelector: ".portal-anatomy-masthead", targetShadowSelector: ".sgds-masthead-content", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Container width",
        description:
          "Use the default constrained masthead container so it aligns with the standard page shell.",
        controlLabel: "Masthead container width options",
        defaultValue: "constrained",
        options: [
          {
            label: "Constrained width",
            value: "constrained",
            markup: `<div class="portal-masthead-width-demo">
              <div class="portal-masthead-width-demo__viewport">
                <sgds-masthead></sgds-masthead>
              </div>
            </div>`,
            description:
              "Default. Content is bounded by the standard SGDS container max-width.",
          },
          {
            label: "Constrained with navigation",
            value: "with-navigation",
            markup: `<div class="portal-masthead-width-demo">
              <div class="portal-masthead-width-demo__viewport">
                <sgds-masthead></sgds-masthead>
                <sgds-mainnav brandHref="/">
                  <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot portal-masthead-mainnav-brand-slot"><span>Slot content</span></div>
                  <sgds-mainnav-item active>Home</sgds-mainnav-item>
                </sgds-mainnav>
              </div>
            </div>`,
            description:
              "Masthead and navigation share the same constrained page shell.",
          },
          {
            label: "Full-bleed (fluid)",
            value: "fluid",
            markup: `<div class="portal-masthead-width-demo">
              <div class="portal-masthead-width-demo__viewport portal-masthead-width-demo__viewport--fluid">
                <sgds-masthead fluid></sgds-masthead>
              </div>
            </div>`,
            description:
              "Use `fluid` when the page shell stretches across the full viewport.",
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
    usage: {
      bestPractices: [
        {
          title: "Place the masthead at the very top of every page",
          description:
            "Render the official banner on every page, ahead of branding or navigation, so users can verify the site.",
          tone: "do",
          markup: `<div class="portal-demo-nav"><sgds-masthead></sgds-masthead></div>`,
        },
        {
          title: "Do not omit the masthead on .gov.sg services",
          description:
            "Skipping the banner, even on internal flows or success screens, undermines the trust signal users rely on.",
          tone: "dont",
          markup: `<div class="portal-demo-nav">
            <sgds-mainnav brandHref="/">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active>Home</sgds-mainnav-item>
            </sgds-mainnav>
          </div>`,
        },
        {
          title: "Match the masthead width to the page shell",
          description:
            "Use fluid when the app shell is full-bleed, and constrained when the navigation below is constrained too.",
          tone: "do",
          markup: `<div class="portal-demo-nav">
            <sgds-masthead fluid></sgds-masthead>
            <sgds-mainnav fluid brandHref="/">
              <div slot="brand" class="portal-slot-example portal-mainnav-brand-slot"><span>Slot content</span></div>
              <sgds-mainnav-item active>Home</sgds-mainnav-item>
            </sgds-mainnav>
          </div>`,
        },
        {
          title: "Do not restyle or override the banner",
          description:
            "The masthead is a standardised government identifier. Do not change its colours, copy, or layout.",
          tone: "dont",
          markup: `<div class="portal-demo-nav"><sgds-masthead class="portal-masthead-restyled-demo"></sgds-masthead></div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / masthead",
        rows: [
          { category: "Mainnav Max Width", name: "mainnav-max-width", value: "sgds/mainnav/max-width", rawValue: "1440px", usage: "Maximum width of the masthead container" },
          { category: "Padding", name: "mainnav-mobile-padding-x", value: "sgds/mainnav/mobile-padding-x", usage: "Left and right padding of the masthead container (mobile)" },
          { category: "Padding", name: "mainnav-padding-x", value: "sgds/mainnav/padding-x", usage: "Left and right padding of the masthead container (desktop)" },
          { category: "Size", name: "icon-size-sm", value: "sgds/icon-size/sm", usage: "Size of the masthead external-link icon" },
        ],
      },
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
        title: "Focus the user",
        description: "Use modals when users need to read or act before returning to the page.",
      },
      {
        title: "Confirm risky actions",
        description: "Ask users to confirm destructive or hard-to-reverse actions.",
      },
      {
        title: "Contain a short task",
        description: "Keep the title, message, and actions in one focused surface.",
      },
    ],
    anatomyMarkup: `<div class="portal-modal-preview sgds:bg-[var(--sgds-bg-overlay)] sgds:min-h-[var(--sgds-dimension-360)] sgds:p-xl">
      <div class="portal-modal-panel">
        <div class="portal-modal-header">
          <div class="portal-modal-header-copy">
            <div class="portal-modal-title">Confirm submission</div>
            <div class="portal-modal-description">Review the information before you continue.</div>
          </div>
          <sgds-close-button aria-label="Close modal"></sgds-close-button>
        </div>
        <div class="portal-modal-body">
          <div class="portal-slot-example portal-modal-slot-content"><span>Slot content</span></div>
        </div>
        <div class="portal-modal-footer">
          <sgds-button>Confirm</sgds-button>
        </div>
      </div>
    </div>`,
    anatomyParts: [
      { title: "Title" },
      { title: "Description", note: "(optional)" },
      { title: "Slot content", note: "(optional)" },
      { title: "Dismissible", note: "(optional)" },
      { title: "Action", note: "(optional)" },
      { title: "Scrim" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-modal-title", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-80" },
      { number: 2, direction: "right", targetSelector: ".portal-modal-description", targetX: "right", targetY: "center", stemLengthToken: "--sgds-dimension-96" },
      { number: 3, direction: "left", targetSelector: ".portal-modal-slot-content", targetX: "left", targetY: "center", stemLengthToken: "--sgds-dimension-96" },
      { number: 4, direction: "right", targetSelector: "sgds-close-button", targetShadowSelector: ".btn-close", targetX: "right", targetY: "center", stemLengthToken: "--sgds-dimension-96" },
      { number: 5, direction: "bottom", targetSelector: ".portal-modal-footer sgds-button", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-80" },
      { number: 6, direction: "bottom", targetSelector: ".portal-modal-preview", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-112" },
    ],
    configurationDemos: [
      {
        title: "Size",
        description:
          "Modals come in different sizes to match the weight of the task. Smaller sizes work for short confirmations, larger sizes give content room to breathe.",
        controlLabel: "Modal size options",
        defaultValue: "md",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-modal-preview portal-modal-preview-sm">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Small modal</div>
                <div class="portal-modal-description">Used for short confirmations.</div>
              </div>
              <sgds-close-button aria-label="Close"></sgds-close-button>
            </div>
            <div class="portal-modal-body"><p>Are you sure you want to continue?</p></div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description: "Compact width for short confirmation prompts.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-modal-preview">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Medium modal</div>
                <div class="portal-modal-description">The default modal size.</div>
              </div>
              <sgds-close-button aria-label="Close"></sgds-close-button>
            </div>
            <div class="portal-modal-body"><p>Use this size for typical messages and short forms.</p></div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description: "Default size that suits most flows.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-modal-preview portal-modal-preview-lg">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Large modal</div>
                <div class="portal-modal-description">Gives long-form content more room.</div>
              </div>
              <sgds-close-button aria-label="Close"></sgds-close-button>
            </div>
            <div class="portal-modal-body"><p>Use this size for richer content such as multi-field forms.</p></div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description: "Wider canvas for multi-field forms or longer copy.",
          },
          {
            label: "Extra large",
            value: "xl",
            markup: `<div class="portal-modal-preview portal-modal-preview-xl">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Extra large modal</div>
                <div class="portal-modal-description">Provides the widest standard modal panel.</div>
              </div>
              <sgds-close-button aria-label="Close"></sgds-close-button>
            </div>
            <div class="portal-modal-body"><p>Use this size for content-heavy focused tasks that still belong in a modal.</p></div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description: 'Use `size="xl"` for the widest standard modal panel.',
          },
          {
            label: "Fullscreen",
            value: "fullscreen",
            markup: `<div class="portal-modal-preview portal-modal-preview-fullscreen">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Fullscreen modal</div>
                <div class="portal-modal-description">Uses the fullscreen layout for maximum available space.</div>
              </div>
              <sgds-close-button aria-label="Close"></sgds-close-button>
            </div>
            <div class="portal-modal-body"><p>Use this for focused tasks that need more space while still blocking the page behind it.</p></div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description:
              'Use `size="fullscreen"` when the modal needs the fullscreen layout.',
          },
        ],
      },
      {
        title: "Close button",
        description:
          "The close button gives users a clear exit. Hide it only when closing should be deliberate, such as in destructive flows.",
        controlLabel: "Modal close button options",
        defaultValue: "with-close",
        options: [
          {
            label: "Close button",
            value: "with-close",
            markup: `<div class="portal-modal-preview">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">With close button</div>
                <div class="portal-modal-description">Default behaviour shows a close icon.</div>
              </div>
              <sgds-close-button aria-label="Close"></sgds-close-button>
            </div>
            <div class="portal-modal-body"><p>Users can dismiss the modal from the header.</p></div>
            <div class="portal-modal-footer">
              <sgds-button>Got it</sgds-button>
            </div>
          </div>
        </div>`,
            description: "Default header includes a close icon.",
          },
          {
            label: "No close button",
            value: "no-close",
            markup: `<div class="portal-modal-preview">
          <div class="portal-modal-panel">
            <div class="portal-modal-header">
              <div class="portal-modal-header-copy">
                <div class="portal-modal-title">Without close button</div>
                <div class="portal-modal-description">Users must use a footer action to exit.</div>
              </div>
            </div>
            <div class="portal-modal-body"><p>Use only when explicit choice is required.</p></div>
            <div class="portal-modal-footer">
              <sgds-button variant="outline">Cancel</sgds-button>
              <sgds-button>Confirm</sgds-button>
            </div>
          </div>
        </div>`,
            description:
              "Hides the header close icon when an explicit decision is required.",
          },
        ],
      },
  {
        title: "Footer slot",
        description:
          "Use the modal footer for actions that confirm, cancel, or complete the modal task.",
        controlLabel: "Modal footer options",
        defaultValue: "with-footer",
        options: [
          {
            label: "With footer",
            value: "with-footer",
            markup: `<div class="portal-modal-preview">
              <div class="portal-modal-panel">
                <div class="portal-modal-header">
                  <div class="portal-modal-header-copy">
                    <div class="portal-modal-title">Submit application?</div>
                    <div class="portal-modal-description">Review your details before submitting.</div>
                  </div>
                  <sgds-close-button aria-label="Close"></sgds-close-button>
                </div>
                <div class="portal-modal-body"><p>The footer contains the actions that complete the modal task.</p></div>
                <div class="portal-modal-footer">
                  <sgds-button variant="outline">Cancel</sgds-button>
                  <sgds-button>Submit</sgds-button>
                </div>
              </div>
            </div>`,
            description:
              "Use a footer when the modal asks the user to make a decision.",
          },
          {
            label: "No footer",
            value: "no-footer",
            markup: `<div class="portal-modal-preview">
              <div class="portal-modal-panel">
                <div class="portal-modal-header">
                  <div class="portal-modal-header-copy">
                    <div class="portal-modal-title">Information</div>
                    <div class="portal-modal-description">This modal contains read-only supporting information.</div>
                  </div>
                  <sgds-close-button aria-label="Close"></sgds-close-button>
                </div>
                <div class="portal-modal-body"><p>Omit the footer when no modal-level action is required.</p></div>
              </div>
            </div>`,
            description:
              "Omit the footer when the modal is informational and close is enough.",
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
    measurements: [
      {
        title: "Modal structure",
        description: "Modal structure uses the real SGDS modal component so the size control reflects the documented modal sizes.",
        markup: `<sgds-modal noAnimation data-structure-open>
          <h2 slot="title">Confirm submission</h2>
          <p slot="description">Review the information before you continue.</p>
          <p>The modal can contain short supporting content and clear actions.</p>
          <sgds-button slot="footer" variant="outline">Cancel</sgds-button>
          <sgds-button slot="footer">Confirm</sgds-button>
        </sgds-modal>`,
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a modal for decisions that need an immediate response",
          description:
            "Use modals for confirmations, destructive actions, or short focused tasks that need a response first.",
          tone: "do",
          markup: `<div class="portal-modal-preview">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">Delete this draft?</div>
                  <div class="portal-modal-description">This action cannot be undone.</div>
                </div>
                <sgds-close-button aria-label="Close"></sgds-close-button>
              </div>
              <div class="portal-modal-body"><p>Removing this draft will permanently delete its contents.</p></div>
              <div class="portal-modal-footer">
                <sgds-button variant="outline">Keep draft</sgds-button>
                <sgds-button variant="danger">Delete draft</sgds-button>
              </div>
            </div>
          </div>`,
        },
        {
          title: "Do not use a modal for non-blocking notifications",
          description:
            "If users do not need to respond, use a toast or inline alert. Modals are disproportionate for routine messages.",
          tone: "dont",
          markup: `<div class="portal-modal-preview">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">Saved</div>
                </div>
                <sgds-close-button aria-label="Close"></sgds-close-button>
              </div>
              <div class="portal-modal-body"><p>Your changes have been saved.</p></div>
              <div class="portal-modal-footer">
                <sgds-button>OK</sgds-button>
              </div>
            </div>
          </div>`,
        },
        {
          title: "Use clear, action-led button labels",
          description:
            "Label the primary button with the verb that describes the outcome (Delete, Submit, Confirm), not Yes or OK.",
          tone: "do",
          markup: `<div class="portal-modal-preview">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">Submit application</div>
                  <div class="portal-modal-description">You will not be able to edit after submission.</div>
                </div>
                <sgds-close-button aria-label="Close"></sgds-close-button>
              </div>
              <div class="portal-modal-body"><p>Confirm that the information is correct before you continue.</p></div>
              <div class="portal-modal-footer">
                <sgds-button variant="outline">Review again</sgds-button>
                <sgds-button>Submit application</sgds-button>
              </div>
            </div>
          </div>`,
        },
        {
          title: "Do not stack modals on top of modals",
          description:
            "Opening a second modal from inside the first hides context and traps focus. Resolve the current one first.",
          tone: "dont",
          markup: `<div class="portal-modal-preview">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">Edit details</div>
                </div>
                <sgds-close-button aria-label="Close"></sgds-close-button>
              </div>
              <div class="portal-modal-body">
                <p>Update your details.</p>
                <div class="portal-modal-panel">
                  <div class="portal-modal-header">
                    <div class="portal-modal-title">Confirm change</div>
                  </div>
                  <div class="portal-modal-body"><p>Are you sure you want to change this?</p></div>
                </div>
              </div>
            </div>
          </div>`,
        },
        {
          title: "Keep the modal content short and focused",
          description:
            "A modal should hold one task. If the content scrolls significantly, send users to a dedicated page instead.",
          tone: "do",
          markup: `<div class="portal-modal-preview portal-modal-preview-sm">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">Sign out?</div>
                </div>
                <sgds-close-button aria-label="Close"></sgds-close-button>
              </div>
              <div class="portal-modal-body"><p>You will need to sign in again to continue.</p></div>
              <div class="portal-modal-footer">
                <sgds-button variant="outline">Cancel</sgds-button>
                <sgds-button>Sign out</sgds-button>
              </div>
            </div>
          </div>`,
        },
        {
          title: "Do not hide the close button without a reason",
          description:
            "Give users a clear way to dismiss the modal. Only hide the close button when an explicit decision is required.",
          tone: "dont",
          markup: `<div class="portal-modal-preview">
            <div class="portal-modal-panel">
              <div class="portal-modal-header">
                <div class="portal-modal-header-copy">
                  <div class="portal-modal-title">New feature available</div>
                  <div class="portal-modal-description">Check out the latest updates.</div>
                </div>
              </div>
              <div class="portal-modal-body"><p>We have updated the dashboard with new charts.</p></div>
              <div class="portal-modal-footer">
                <sgds-button>Got it</sgds-button>
              </div>
            </div>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / modal",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/xl", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/xl", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-md", value: "sgds/padding/md", usage: "Top padding of the modal content; offset of the modal close button" },
          { category: "Gap", name: "gap-2-xl", value: "sgds/gap/2-xl", usage: "Spacing between items of the modal panel; spacing between items of the modal content" },
          { category: "Gap", name: "gap-md", value: "sgds/gap/md", usage: "Spacing between items of the modal header title description; spacing between items of the modal footer" },
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the modal header title description" },
          { category: "Margin", name: "margin-2-xl", value: "sgds/margin/2-xl", usage: "Outer spacing of the modal panel; height of the modal panel" },
          { category: "Margin", name: "margin-4-xl", value: "sgds/margin/4-xl", usage: "Outer spacing of the modal panel; height of the modal panel" },
          { category: "Margin", name: "margin-lg", value: "sgds/margin/lg", usage: "Outer spacing of the modal panel" },
          { category: "Margin", name: "margin-none", value: "sgds/margin/none", usage: "Outer spacing of the content; value of the content" },
          { category: "Margin", name: "margin-xl", value: "sgds/margin/xl", usage: "Height of the modal panel; outer spacing of the modal panel" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", mapKey: "border-radius", usage: "Corner radius of the modal panel" },
          { category: "Typography", name: "font-size-24", value: "sgds/font-size/24", usage: "Font size of the content" },
          { category: "Typography", name: "line-height-24", value: "sgds/line-height/24", usage: "Line height of the content" },
          { category: "Typography", name: "line-height-40", value: "sgds/line-height/40", usage: "Line height of the content" },
          { category: "Typography", name: "paragraph-spacing-xl", value: "sgds/paragraph-spacing-xl", usage: "Paragraph spacing reset used by modal content" },
          { category: "Size", name: "dimension-480", value: "sgds/dimension/480", mapKey: "dimension", variant: "sm", usage: "Maximum width of the modal panel" },
          { category: "Size", name: "dimension-640", value: "sgds/dimension/640", mapKey: "dimension", variant: "md", usage: "Maximum width of the modal panel" },
          { category: "Size", name: "dimension-800", value: "sgds/dimension/800", mapKey: "dimension", variant: "lg", usage: "Maximum width of the modal panel" },
          { category: "Size", name: "dimension-1280", value: "sgds/dimension/1280", mapKey: "dimension", variant: "xl", usage: "Maximum width of the modal panel" },
          { category: "Size", name: "dimension-872", value: "sgds/dimension/872", variant: "fullscreen", usage: "Maximum width of the modal header" },
          { category: "Size", name: "dimension-888", value: "sgds/dimension/888", variant: "fullscreen", usage: "Maximum width of the modal panel (≥1024px viewport)" },
          { category: "Size", name: "dimension-1168", value: "sgds/dimension/1168", variant: "fullscreen", usage: "Maximum width of the modal panel (≥1280px viewport)" },
          { category: "Size", name: "dimension-1312", value: "sgds/dimension/1312", variant: "fullscreen", usage: "Maximum width of the modal panel (≥1440px viewport)" },
          { category: "Colour", name: "bg-overlay", value: "sgds/bg-overlay", usage: "Background colour of the modal overlay" },
          { category: "Colour", name: "color-subtle", value: "sgds/color-subtle", usage: "Text colour of the content" },
          { category: "Colour", name: "surface-default", value: "sgds/surface-default", usage: "Background colour of the modal panel; background colour of the modal overlay" },
          { category: "Layer", name: "z-index-modal", value: "sgds/z-index-modal", usage: "Stacking layer of the modal" },
          { category: "Typography", name: "body-font-family", value: "sgds/body-font-family", usage: "Font-family of the modal" },
        ],
      },
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
        title: "Hide secondary actions",
        description: "Use overflow menus for actions users need less often.",
      },
      {
        title: "Reduce visual crowding",
        description: "Move extra row or card actions into the menu to keep the layout clean.",
      },
      {
        title: "Use a familiar trigger",
        description: "The three-dot trigger signals that more options are available.",
      },
    ],
    anatomyMarkup: `<sgds-overflow-menu class="portal-anatomy-overflow-menu">
      <sgds-dropdown-item>Edit</sgds-dropdown-item>
      <sgds-dropdown-item>Duplicate</sgds-dropdown-item>
      <sgds-dropdown-item>Delete</sgds-dropdown-item>
    </sgds-overflow-menu>`,
    anatomyParts: [{ title: "Trigger button" }, { title: "Menu" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-overflow-menu", targetShadowSelector: ".overflow-btn", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-overflow-menu", targetShadowSelector: "sgds-dropdown >>> .dropdown-menu", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Size",
        description:
          "Pick a size that matches the surrounding controls. Use small in dense lists and toolbars, medium for comfortable touch targets.",
        controlLabel: "Overflow menu size options",
        defaultValue: "md",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<sgds-overflow-menu size="sm">
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
        </sgds-overflow-menu>`,
            description:
              "Compact trigger that fits in dense rows and toolbars.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<sgds-overflow-menu size="md">
          <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
          <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
        </sgds-overflow-menu>`,
            description: "Default size with a comfortable touch target.",
          },
        ],
      },
  {
        title: "Item state",
        description:
          "Overflow menu items can show active and disabled states.",
        controlLabel: "Overflow menu item state options",
        defaultValue: "active",
        options: [
          {
            label: "Active",
            value: "active",
            markup: `<sgds-overflow-menu class="portal-demo-overflow-active">
              <sgds-dropdown-item active>Active item</sgds-dropdown-item>
              <sgds-dropdown-item>Default item</sgds-dropdown-item>
            </sgds-overflow-menu>`,
            description:
              "Use active for the currently selected item in the menu.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-overflow-menu class="portal-demo-overflow-active">
              <sgds-dropdown-item>Available item</sgds-dropdown-item>
              <sgds-dropdown-item disabled>Disabled item</sgds-dropdown-item>
            </sgds-overflow-menu>`,
            description:
              "Use disabled when the item must remain visible but unavailable.",
          },
        ],
      },
      {
        title: "Item icon",
        description:
          "Use item icons when they help users recognise menu actions quickly.",
        controlLabel: "Overflow menu icon options",
        defaultValue: "with-icon",
        options: [
          {
            label: "With icon",
            value: "with-icon",
            markup: `<sgds-overflow-menu class="portal-demo-overflow-active">
              <sgds-dropdown-item><sgds-icon slot="icon" name="pencil"></sgds-icon>Edit</sgds-dropdown-item>
              <sgds-dropdown-item><sgds-icon slot="icon" name="trash"></sgds-icon>Delete</sgds-dropdown-item>
            </sgds-overflow-menu>`,
            description:
              "Use icons for familiar actions where the icon reinforces the label.",
          },
          {
            label: "Text only",
            value: "text-only",
            markup: `<sgds-overflow-menu class="portal-demo-overflow-active">
              <sgds-dropdown-item>Edit</sgds-dropdown-item>
              <sgds-dropdown-item>Delete</sgds-dropdown-item>
            </sgds-overflow-menu>`,
            description:
              "Use text-only menu items when labels are clear on their own.",
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
    usage: {
      bestPractices: [
        {
          title: "Use overflow menus for secondary or contextual actions",
          description:
            "Tuck infrequent or row-level actions behind the overflow trigger so primary actions stay visible.",
          tone: "do",
          markup: `<sgds-overflow-menu>
            <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
          </sgds-overflow-menu>`,
        },
        {
          title: "Do not hide the primary action inside an overflow menu",
          description:
            "Surface the most-used row action directly, hiding it behind the menu adds an extra step.",
          tone: "dont",
          markup: `<sgds-overflow-menu>
            <sgds-dropdown-item><a href="#">Submit application</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Save draft</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Discard</a></sgds-dropdown-item>
          </sgds-overflow-menu>`,
        },
        {
          title: "Keep menu items short and verb-led",
          description:
            "Use short verb-led phrases so users can scan the available choices. Match the wording to the outcome.",
          tone: "do",
          markup: `<sgds-overflow-menu>
            <sgds-dropdown-item><a href="#">Rename</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Move to folder</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Download</a></sgds-dropdown-item>
          </sgds-overflow-menu>`,
        },
        {
          title: "Do not stuff the overflow menu with too many items",
          description:
            "A long overflow list is hard to scan. Group options into sections or rethink the structure of the page.",
          tone: "dont",
          markup: `<sgds-overflow-menu>
            <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Move</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Rename</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Share</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Star</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Delete</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Export</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Print</a></sgds-dropdown-item>
          </sgds-overflow-menu>`,
        },
        {
          title: "Match the trigger size to the surrounding controls",
          description:
            "Use small in dense rows or toolbars, and medium when it shares space with full-size buttons.",
          tone: "do",
          markup: `<sgds-overflow-menu size="sm">
            <sgds-dropdown-item><a href="#">Edit</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Duplicate</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Archive</a></sgds-dropdown-item>
          </sgds-overflow-menu>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / overflow-menu",
        rows: [
          { category: "Border", name: "border-radius-sm", value: "sgds/border-radius/sm", mapKey: "border-radius", usage: "Corner radius of the overflow button" },
          { category: "Size", name: "dimension-24", value: "sgds/dimension/24", mapKey: "dimension", variant: "sm", usage: "Height of the overflow button; width of the overflow button" },
          { category: "Size", name: "dimension-32", value: "sgds/dimension/32", mapKey: "dimension", variant: "md", usage: "Height of the overflow button; width of the overflow button" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the overflow button on hover; background colour of the overflow button when keyboard-focused" },
          { category: "Colour", name: "bg-transparent", value: "sgds/bg-transparent", usage: "Background colour of the overflow button" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the overflow button when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the overflow button when keyboard-focused" },
        ],
      },
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
        title: "Break up long lists",
        description: "Use pagination when a list or table spans more results than one page should show.",
      },
      {
        title: "Show current position",
        description: "The current page indicator helps users understand where they are in the set.",
      },
      {
        title: "Control result browsing",
        description: "Pair with page size controls when users need to change how many results they see.",
      },
    ],
    anatomyMarkup: `<sgds-pagination class="portal-anatomy-pagination" variant="default" dataLength="100" itemsPerPage="10" currentPage="4"></sgds-pagination>`,
    anatomyParts: [
      { title: "Previous navigation" },
      { title: "Active page" },
      { title: "Page number" },
      { title: "Overflow icon" },
      { title: "Next navigation" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-pagination", targetShadowSelector: "sgds-icon-button[name='arrow-left']", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-pagination", targetShadowSelector: ".page-item.active .page-link", targetX: "center", targetY: "top" },
      { number: 3, direction: "bottom", targetSelector: ".portal-anatomy-pagination", targetShadowSelector: "li[key='5'] .page-link", targetX: "center", targetY: "bottom" },
      { number: 4, direction: "bottom", targetSelector: ".portal-anatomy-pagination", targetShadowSelector: ".ellipsis", targetX: "center", targetY: "bottom" },
      { number: 5, direction: "right", targetSelector: ".portal-anatomy-pagination", targetShadowSelector: "sgds-icon-button[name='arrow-right']", targetX: "right", targetY: "center" },
    ],
    measurements: [
      {
        title: "",
        description: "",
        markup: `<sgds-pagination variant="default" dataLength="30" itemsPerPage="10" currentPage="3"></sgds-pagination>`,
      },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Pagination supports four visual styles. Choose the variant that best fits your layout density and the user task.",
        controlLabel: "Pagination variant options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-pagination dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description:
              "First, last and page-direction buttons with a window of page numbers and ellipses.",
          },
          {
            label: "Number",
            value: "number",
            markup: `<sgds-pagination variant="number" dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description:
              "Compact page-number jumper for dense tables and lists.",
          },
          {
            label: "Button",
            value: "button",
            markup: `<sgds-pagination variant="button" dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description:
              "Previous and next buttons only, for sequential flows.",
          },
          {
            label: "Description",
            value: "description",
            markup: `<sgds-pagination variant="description" dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description:
              "Adds a descriptive label like 'Page 1 of 10' alongside the controls.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Match the pagination scale to the surrounding UI density.",
        controlLabel: "Pagination size options",
        defaultValue: "md",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<sgds-pagination size="sm" dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description:
              "Compact size for use inside cards, drawers and tight toolbars.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<sgds-pagination size="md" dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description: "Default size suitable for most pages.",
          },
        ],
      },
      {
        title: "Current page",
        description: "Sets the active page on first render.",
        controlLabel: "Pagination current page options",
        defaultValue: "page-3",
        options: [
          {
            label: "First page",
            value: "page-1",
            markup: `<sgds-pagination dataLength="100" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
            description:
              "Active state on the first page hides the previous-page button affordance.",
          },
          {
            label: "Middle page",
            value: "page-3",
            markup: `<sgds-pagination dataLength="100" itemsPerPage="10" currentPage="3"></sgds-pagination>`,
            description:
              "Mid-range page reveals leading and trailing ellipses.",
          },
          {
            label: "Last page",
            value: "page-10",
            markup: `<sgds-pagination dataLength="100" itemsPerPage="10" currentPage="10"></sgds-pagination>`,
            description:
              "Active state on the last page disables the next-page affordance.",
          },
        ],
      },
  {
        title: "Navigation",
        description:
          "Pagination can show number-only navigation or include previous and next controls.",
        controlLabel: "Pagination navigation options",
        defaultValue: "page-numbers",
        options: [
          {
            label: "Page numbers",
            value: "page-numbers",
            markup: `<sgds-pagination currentPage="2" dataLength="80" itemsPerPage="10" variant="number"></sgds-pagination>`,
            description:
              "Use page numbers when direct page access matters and previous/next controls are not needed.",
          },
          {
            label: "Previous and next",
            value: "previous-next",
            markup: `<sgds-pagination currentPage="2" dataLength="80" itemsPerPage="10" variant="default" navigation="icon-button"></sgds-pagination>`,
            description:
              "Use previous and next controls when users move sequentially through the result set.",
          },
        ],
      },
      {
        title: "Result count",
        description:
          "Data length and items per page determine how many pages are rendered.",
        controlLabel: "Pagination result options",
        defaultValue: "many",
        options: [
          {
            label: "Many pages",
            value: "many",
            markup: `<sgds-pagination currentPage="3" dataLength="120" itemsPerPage="10" variant="number"></sgds-pagination>`,
            description:
              "Use dataLength and itemsPerPage to match the number of records being paginated.",
          },
          {
            label: "Few pages",
            value: "few",
            markup: `<sgds-pagination currentPage="1" dataLength="24" itemsPerPage="10" variant="number"></sgds-pagination>`,
            description:
              "Fewer records render fewer page links from the same component.",
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
    usage: {
      bestPractices: [
        {
          title: "Use pagination for large, browsable result sets",
          description: "Pagination suits tables and lists with many entries. Set `itemsPerPage` to fit the surrounding layout.",
          tone: "do",
          markup: `<sgds-pagination dataLength="240" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
        },
        {
          title: "Do not paginate very small lists",
          description:
            "If the full list fits on one page, omit pagination. A single-page control only adds visual noise.",
          tone: "dont",
          markup: `<sgds-pagination dataLength="6" itemsPerPage="10" currentPage="1"></sgds-pagination>`,
        },
        {
          title: "Use the button variant for sequential flows",
          description:
            "When users only need previous and next controls, like a guided tour, the button variant keeps the UI clean.",
          tone: "do",
          markup: `<sgds-pagination variant="button" dataLength="50" itemsPerPage="10" currentPage="2"></sgds-pagination>`,
        },
        {
          title: "Do not pair pagination with infinite scroll",
          description:
            "Pagination and infinite scroll conflict on how data loads. Pick one pattern per surface.",
          tone: "dont",
          markup: `<div class="portal-demo-stack">
            <div>Loading more results as you scroll...</div>
            <sgds-pagination dataLength="500" itemsPerPage="20" currentPage="1"></sgds-pagination>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / pagination",
        rows: [
          { category: "Gap", name: "gap-2-xs", value: "sgds/gap/2-xs", usage: "Spacing between items of the pagination" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", mapKey: "border-radius", usage: "Corner radius of the page link" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", variant: "sm", usage: "Font size of the page link; font size of the pagination description" },
          { category: "Size", name: "dimension-40", value: "sgds/dimension/40", mapKey: "dimension", variant: "sm", usage: "Height of the page link; width of the page link" },
          { category: "Size", name: "dimension-48", value: "sgds/dimension/48", mapKey: "dimension", variant: "md", usage: "Height of the page link; width of the page link" },
          { category: "Colour", name: "bg-transparent", value: "sgds/bg-transparent", usage: "Background colour of the page link" },
          { category: "Colour", name: "color-fixed-light", value: "sgds/color-fixed-light", usage: "Text colour of the page link when active" },
          { category: "Colour", name: "primary-color-default", value: "sgds/primary/color/default", usage: "Text colour of the page link on hover" },
          { category: "Colour", name: "primary-surface-default", value: "sgds/primary/surface/default", usage: "Background colour of the page link when active" },
          { category: "Colour", name: "primary-surface-translucent", value: "sgds/primary/surface/translucent", usage: "Background colour of the page link on hover" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the page link when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the page link when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the page link when disabled" },
        ],
      },
    ],
  },
  "progress-bar": {
    key: "progress-bar",
    title: "Progress bar",
    tag: "sgds-progress-bar",
    group: "feedback",
    summary:
      "Provide up-to-date feedback on the progress of a workflow or action with flexible progress bars.",
    purposeCards: [
      {
        title: "Show ongoing progress",
        description: "Use a progress bar when a task has measurable completion.",
      },
      {
        title: "Show how much is done",
        description: "The filled track helps users see progress against the full amount.",
      },
      {
        title: "Support longer waits",
        description: "Progress feedback reassures users during uploads, setup, or processing.",
      },
    ],
    anatomyMarkup: `<div class="portal-progress-bar-anatomy-demo">
      <sgds-progress-bar class="portal-anatomy-progress-bar" value="64" label="64%" arialabel="Submission progress 64%"></sgds-progress-bar>
    </div>`,
    anatomyParts: [
      { title: "Active indicator" },
      { title: "Track" },
      { title: "Label (optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-anatomy-progress-bar", targetShadowSelector: ".progress-bar", targetX: "center", targetY: "top" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-progress-bar", targetShadowSelector: ".progress", targetX: "right", targetY: "center" },
      { number: 3, direction: "bottom", targetSelector: ".portal-anatomy-progress-bar", targetShadowSelector: ".label", targetX: "left", targetY: "center", targetXOffset: 24 },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Progress bars come in two visual tones. Pick the one that matches the surrounding surface.",
        controlLabel: "Progress bar variant options",
        defaultValue: "primary",
        options: [
          {
            label: "Primary",
            value: "primary",
            markup: `<sgds-progress-bar variant="primary" value="60" arialabel="Loading"></sgds-progress-bar>`,
            description:
              "Brand-coloured fill. Use for the dominant progress indicator on a page.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<sgds-progress-bar variant="neutral" value="60" arialabel="Loading"></sgds-progress-bar>`,
            description:
              "Neutral fill. Use for secondary or low-emphasis progress.",
          },
        ],
      },
      {
        title: "Value",
        description: "The current progress as a percentage from 0 to 100.",
        controlLabel: "Progress bar value",
        controlType: "number",
        range: { min: 0, max: 100, step: 1, unit: "%" },
        defaultValue: "30",
        options: [
          {
            label: "Value",
            value: "30",
            markup: `<sgds-progress-bar value="{{value}}" label="{{value}}%" arialabel="Progress {{value}}%"></sgds-progress-bar>`,
            description: "Type a value to set progress to {{value}}%.",
          },
        ],
      },
      {
        title: "Label",
        description:
          "Optional text label rendered above the bar to describe what is loading.",
        controlLabel: "Progress bar label options",
        defaultValue: "with-label",
        options: [
          {
            label: "No label",
            value: "no-label",
            markup: `<sgds-progress-bar value="50" arialabel="Loading"></sgds-progress-bar>`,
            description:
              "Bar only. Use when the surrounding context already explains the action.",
          },
          {
            label: "Label",
            value: "with-label",
            markup: `<sgds-progress-bar value="50" label="Uploading files" arialabel="Uploading files"></sgds-progress-bar>`,
            description:
              "Adds a descriptive label above the bar to clarify the running task.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Label",
        "Use progress bars to indicate how far a task or workflow has progressed.",
        `<sgds-progress-bar value="64" label="Submission progress" arialabel="Submission progress"></sgds-progress-bar>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a progress bar when progress is measurable",
          description:
            "Use a progress bar only for operations with a known endpoint. Use a spinner for indeterminate waits.",
          tone: "do",
          markup: `<sgds-progress-bar value="40" ariamin="0" ariamax="100" label="Uploading 2 of 5 files" arialabel="File upload progress"></sgds-progress-bar>`,
        },
        {
          title: "Do not use a progress bar for unknown durations",
          description:
            "If progress cannot be calculated, do not fake it. A bar that creeps forward misleads users. Use a spinner.",
          tone: "dont",
          markup: `<sgds-progress-bar value="30" ariamin="0" ariamax="100" label="Connecting" arialabel="Connection progress"></sgds-progress-bar>`,
        },
        {
          title: "Label the running task",
          description:
            "Add a label that names what is happening. A bar without context tells users that something is loading but not what.",
          tone: "do",
          markup: `<sgds-progress-bar value="65" ariamin="0" ariamax="100" label="Generating report" arialabel="Report generation progress"></sgds-progress-bar>`,
        },
        {
          title: "Always provide an accessible label",
          description: "Set `arialabel` so screen reader users know what is progressing. Pair it with a visible `label` when the surrounding context is not enough.",
          tone: "do",
          markup: `<sgds-progress-bar value="80" ariamin="0" ariamax="100" label="Submission progress" arialabel="Submission progress"></sgds-progress-bar>`,
        },
        {
          title: "Do not use progress as failure feedback",
          description: "Progress bars are for in-flight progress, not errors. If an operation fails, stop the progress state and show an alert.",
          tone: "dont",
          markup: `<sgds-progress-bar value="40" ariamin="0" ariamax="100" label="Upload failed" arialabel="Upload progress"></sgds-progress-bar>`,
        },
        {
          title: "Do not let progress fall outside its range",
          description: "Keep `value` within `ariamin` and `ariamax`. Out-of-range values can render as empty or overflow and misrepresent the task.",
          tone: "dont",
          markup: `<sgds-progress-bar value="-10" ariamin="0" ariamax="100" label="-10%" arialabel="Upload progress"></sgds-progress-bar>`,
        },
        {
          title: "Do not rely on the bar alone for completion",
          description: "When `value` reaches `ariamax`, show a success message, next action, or completion state. The component does not trigger completion feedback by itself.",
          tone: "dont",
          markup: `<sgds-progress-bar value="100" ariamin="0" ariamax="100" label="Processing 100%" arialabel="Report generation progress"></sgds-progress-bar>`,
        },
        {
          title: "Use the neutral variant for secondary progress",
          description:
            "When a page already shows a primary progress bar, use the neutral variant for any secondary progress.",
          tone: "do",
          markup: `<sgds-progress-bar variant="neutral" value="30" ariamin="0" ariamax="100" label="Syncing in background" arialabel="Background sync progress"></sgds-progress-bar>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / progress-bar",
        rows: [
          { category: "Gap", name: "gap-2-xs", value: "sgds/gap/2-xs", usage: "Spacing between items of the progress container" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of the label" },
          { category: "Size", name: "dimension-4", value: "sgds/dimension/4", usage: "Height of the progress bar" },
          { category: "Colour", name: "bg-translucent", value: "sgds/bg-translucent", usage: "Background colour of the progress" },
          { category: "Colour", name: "color-subtle", value: "sgds/color-subtle", usage: "Text colour of the label" },
          { category: "Colour", name: "neutral-surface-default", value: "sgds/neutral/surface/default", usage: "Background colour of the progress bar" },
          { category: "Colour", name: "primary-surface-default", value: "sgds/primary/surface/default", usage: "Background colour of the progress bar" },
        ],
      },
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
        title: "Adjust a number",
        description: "Use the stepper buttons when users need to increase or decrease a quantity.",
      },
      {
        title: "Set valid limits",
        description: "Min, max, and step values help keep quantities within the allowed range.",
      },
      {
        title: "Fit transactional flows",
        description: "Use quantity toggles for tickets, bookings, orders, and similar counts.",
      },
    ],
    anatomyParts: [
      { title: "Decrement action" },
      { title: "Input value" },
      { title: "Increment action" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-quantity-toggle", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: "sgds-quantity-toggle", targetShadowSelector: "sgds-input >>> input.form-control", targetX: "center", targetY: "center", targetYOffset: -4 },
      { number: 3, direction: "right", targetSelector: "sgds-quantity-toggle", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Range",
        description:
          "Use the `min` and `max` attributes to constrain the value within an allowed range.",
        controlLabel: "Quantity toggle range options",
        defaultValue: "bounded",
        options: [
          {
            label: "Bounded",
            value: "bounded",
            markup: `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description:
              "Sets a minimum and maximum so users cannot decrement below 0 or increment above 5.",
          },
          {
            label: "Wider range",
            value: "wider",
            markup: `<sgds-quantity-toggle value="50" min="0" max="100"></sgds-quantity-toggle>`,
            description:
              "Use a wider range when the quantity can vary across a larger set of values.",
          },
        ],
      },
      {
        title: "Step",
        description:
          "Use `step` to control how much the value changes each time the increment or decrement button is pressed.",
        controlLabel: "Quantity toggle step options",
        defaultValue: "step-1",
        options: [
          {
            label: "Step of 1",
            value: "step-1",
            markup: `<sgds-quantity-toggle value="2" min="0" max="10" step="1"></sgds-quantity-toggle>`,
            description:
              "The default. Each press of the increment or decrement button changes the value by one unit.",
          },
          {
            label: "Step of 5",
            value: "step-5",
            markup: `<sgds-quantity-toggle value="10" min="0" max="50" step="5"></sgds-quantity-toggle>`,
            description:
              "Use larger steps when users typically adjust quantities in bigger increments.",
          },
        ],
      },
      {
        title: "Hint text",
        description:
          "Add hint text to clarify constraints such as a maximum allowed quantity.",
        controlLabel: "Quantity toggle hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-quantity-toggle label="Quantity" value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description: "Default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-quantity-toggle label="Quantity" hintText="Maximum 5 per order." value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description:
              "Use hint text to explain constraints such as a maximum allowed quantity.",
          },
        ],
      },
      {
        title: "Read only",
        description:
          "Use the read-only state when the value should be visible but not editable.",
        controlLabel: "Quantity toggle read only options",
        defaultValue: "not-readonly",
        options: [
          {
            label: "Not read only",
            value: "not-readonly",
            markup: `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description:
              "The default. Users can adjust the value with the increment and decrement buttons or by typing.",
          },
          {
            label: "Read only",
            value: "readonly",
            markup: `<sgds-quantity-toggle value="2" min="0" max="5" readonly></sgds-quantity-toggle>`,
            description:
              "Locks the value so it cannot be edited, while the field still appears active.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use the `disabled` state to prevent interaction when the field is not available in the current context.",
        controlLabel: "Quantity toggle disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-quantity-toggle value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description:
              "The default. The quantity toggle is interactive and accepts input.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-quantity-toggle value="2" min="0" max="5" disabled></sgds-quantity-toggle>`,
            description:
              "Use when the quantity field is temporarily unavailable. Disabled quantity toggles appear muted and cannot be focused or adjusted.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "When the value is invalid, surface inline feedback so users can correct the input.",
        controlLabel: "Quantity toggle validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-quantity-toggle label="Quantity" value="2" min="0" max="5"></sgds-quantity-toggle>`,
            description:
              "No feedback styling. Use when the field has no validation requirements.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-quantity-toggle label="Quantity" value="6" min="0" max="5" hasFeedback invalid invalidFeedback="Enter a quantity between 0 and 5"></sgds-quantity-toggle>`,
            description:
              "Shows the invalid state with the supplied `invalidFeedback` message.",
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
    usage: {
      bestPractices: [
        {
          title: "Use quantity toggle for small, bounded counts",
          description:
            "Quantity toggle is for items adjusted in single units, such as tickets or copies. For large numbers, use a number input.",
          tone: "do",
          markup: `<sgds-quantity-toggle label="Number of tickets" value="2" min="1" max="10"></sgds-quantity-toggle>`,
        },
        {
          title: "Do not use quantity toggle for arbitrary numbers",
          description:
            "Numbers without a count meaning, postcodes, IDs, amounts, do not belong in a quantity toggle.",
          tone: "dont",
          markup: `<sgds-quantity-toggle label="Postal code" value="540123" min="0" max="999999"></sgds-quantity-toggle>`,
        },
        {
          title: "Set min and max to reflect real limits",
          description: "Use `min` and `max` to constrain the field to accepted values, and use `hintText` to tell users the maximum before they adjust it.",
          tone: "do",
          markup: `<sgds-quantity-toggle label="Travellers" hintText="Max 9" value="1" min="1" max="9"></sgds-quantity-toggle>`,
        },
        {
          title: "Do not use quantity toggle for large ranges",
          description: "If users may need to enter values like 250 or 1,000, repeated incrementing becomes tedious. Use `sgds-input type=number` instead.",
          tone: "dont",
          markup: `<sgds-quantity-toggle label="Number of records" value="250" min="0" max="1000" step="1"></sgds-quantity-toggle>`,
        },
        {
          title: "Pair with a label and explain the limit when needed",
          description:
            "Always provide a label so users know what they count. Add hint text when the maximum is meaningful.",
          tone: "do",
          markup: `<sgds-quantity-toggle label="Tickets" hintText="Maximum 5 per booking" value="2" min="1" max="5"></sgds-quantity-toggle>`,
        },
        {
          title: "Do not use quantity toggle for precise values",
          description: "Currency, measurements, percentages, or decimals need direct entry and clearer validation. Quantity toggle works best for whole-number counts.",
          tone: "dont",
          markup: `<sgds-quantity-toggle label="Payment amount" value="125.50" min="0" max="500" step="0.01"></sgds-quantity-toggle>`,
        },
        {
          title: "Choose a step size that matches the use case",
          description:
            "Increment by 1 for single-unit adjustments. Use a larger step only when typical adjustments are bigger.",
          tone: "do",
          markup: `<sgds-quantity-toggle label="Bulk order quantity" value="10" min="0" max="100" step="5"></sgds-quantity-toggle>`,
        },
        {
          title: "Do not hide the allowed range",
          description: "If there is a meaningful `min` or `max`, do not make users discover it by pressing the buttons. Show the limit in the label or `hintText`.",
          tone: "dont",
          markup: `<sgds-quantity-toggle label="Tickets" value="5" min="1" max="5"></sgds-quantity-toggle>`,
        },
        {
          title: "Surface invalid feedback inline",
          description: "When the value falls outside the allowed range, set `hasFeedback` and `invalid` with a clear `invalidFeedback`.",
          tone: "do",
          markup: `<sgds-quantity-toggle label="Tickets" value="6" min="1" max="5" hasFeedback invalid invalidFeedback="Enter a quantity between 1 and 5"></sgds-quantity-toggle>`,
        },
        {
          title: "Do not remove submitted values unintentionally",
          description: "A `disabled` quantity toggle is excluded from form submission. Use `readonly` when the value should stay visible, unchanged, and still be submitted.",
          tone: "dont",
          markup: `<sgds-quantity-toggle class="portal-quantity-toggle-compact" label="Attendees" name="attendees" value="3" disabled></sgds-quantity-toggle>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / quantity-toggle",
        rows: [
          { category: "Gap", name: "gap-none", value: "sgds/gap/none", usage: "Spacing between items of the input group" },
          { category: "Border", name: "form-border-width-default", value: "sgds/form/border-width/default", usage: "Outer spacing of the sgds input" },
          { category: "Border", name: "form-border-radius-md", value: "sgds/form/border-radius/md", usage: "Corner radius of the sgds icon button.minus btn; corner radius of the sgds icon button.plus btn" },
          { category: "Size", name: "dimension-0", value: "sgds/dimension/0", usage: "Minimum width of the sgds input" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the plus and minus icons" },
        ],
      },
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
        title: "Choose one option",
        description: "Use radio buttons when users can select only one item from a set.",
      },
      {
        title: "Show options upfront",
        description: "Radio groups work well for short lists where users need to compare choices.",
      },
      {
        title: "Keep selection clear",
        description: "The selected state remains visible until users change it.",
      },
    ],
    anatomyMarkup: `<sgds-radio class="portal-anatomy-radio" value="email" checked>Option label</sgds-radio>`,
    anatomyParts: [{ title: "Radio input" }, { title: "Label" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-radio", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-radio", targetX: "right", targetY: "center" },
    ],
    measurements: [
      demo(
        "Structure",
        "Radio structure shows the label, hint text, radio options, and the gaps between them.",
        `<sgds-radio-group label="Would you like to receive SMS reminders?" hintText="We will send reminders before your appointment.">
          <sgds-radio value="yes">Yes</sgds-radio>
          <sgds-radio value="no">No</sgds-radio>
        </sgds-radio-group>`,
      ),
    ],
    configurationDemos: [
      {
        title: "Hint text",
        description: "Add hint text to a radio group to explain the choice.",
        controlLabel: "Radio hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-radio-group label="Notification frequency" value="weekly">
          <sgds-radio value="daily">Daily</sgds-radio>
          <sgds-radio value="weekly">Weekly</sgds-radio>
          <sgds-radio value="monthly">Monthly</sgds-radio>
        </sgds-radio-group>`,
            description: "Default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-radio-group label="Notification frequency" hintText="You can change this anytime in Settings" value="weekly">
          <sgds-radio value="daily">Daily</sgds-radio>
          <sgds-radio value="weekly">Weekly</sgds-radio>
          <sgds-radio value="monthly">Monthly</sgds-radio>
        </sgds-radio-group>`,
            description:
              "Hint text adds extra clarification beneath the label.",
          },
        ],
      },
      {
        title: "Selected value",
        description: "Set the radio group's value to mark a default selection.",
        controlLabel: "Radio selected value options",
        defaultValue: "none",
        options: [
          {
            label: "Nothing selected",
            value: "none",
            markup: `<sgds-radio-group label="Plan">
          <sgds-radio value="basic">Basic</sgds-radio>
          <sgds-radio value="standard">Standard</sgds-radio>
          <sgds-radio value="premium">Premium</sgds-radio>
        </sgds-radio-group>`,
            description: "No radio is preselected.",
          },
          {
            label: "Pre-selected",
            value: "preselected",
            markup: `<sgds-radio-group label="Plan" value="standard">
          <sgds-radio value="basic">Basic</sgds-radio>
          <sgds-radio value="standard">Standard</sgds-radio>
          <sgds-radio value="premium">Premium</sgds-radio>
        </sgds-radio-group>`,
            description: "Standard option starts selected.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Disable individual radios or the whole group to prevent selection.",
        controlLabel: "Radio disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-radio-group label="Plan" value="basic">
          <sgds-radio value="basic">Basic</sgds-radio>
          <sgds-radio value="standard">Standard</sgds-radio>
          <sgds-radio value="premium">Premium</sgds-radio>
        </sgds-radio-group>`,
            description: "All options are interactive.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-radio-group label="Plan" value="basic" disabled>
          <sgds-radio value="basic">Basic</sgds-radio>
          <sgds-radio value="standard">Standard</sgds-radio>
          <sgds-radio value="premium">Premium</sgds-radio>
        </sgds-radio-group>`,
            description: "All radios in the group appear muted and uneditable.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and a feedback message when no option is selected.",
        controlLabel: "Radio validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-radio-group label="Plan">
          <sgds-radio value="basic">Basic</sgds-radio>
          <sgds-radio value="standard">Standard</sgds-radio>
        </sgds-radio-group>`,
            description: "No feedback shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-radio-group label="Plan" required hasFeedback invalid invalidFeedback="Choose a plan">
          <sgds-radio value="basic">Basic</sgds-radio>
          <sgds-radio value="standard">Standard</sgds-radio>
        </sgds-radio-group>`,
            description: "Group shows the error message and invalid styling.",
          },
        ],
      },
    ],
    usage: {
      bestPractices: [
        {
          title: "Use radios for one choice from a visible set",
          description: "Use a radio group when users must choose exactly one option and seeing all options helps them compare.",
          tone: "do",
          markup: `<sgds-radio-group label="Preferred contact method" value="email">
            <sgds-radio value="email">Email</sgds-radio>
            <sgds-radio value="sms">SMS</sgds-radio>
            <sgds-radio value="phone">Phone call</sgds-radio>
          </sgds-radio-group>`,
        },
        {
          title: "Do not use radios when users can select several options",
          description: "Radio groups are mutually exclusive. Use checkboxes when more than one option can apply.",
          tone: "dont",
          markup: `<sgds-radio-group label="Delivery channels">
            <sgds-radio value="email">Email</sgds-radio>
            <sgds-radio value="sms">SMS</sgds-radio>
            <sgds-radio value="phone">Phone call</sgds-radio>
          </sgds-radio-group>`,
        },
        {
          title: "Use a clear group label",
          description: "The radio group label should state the decision users are making before they compare the options.",
          tone: "do",
          markup: `<sgds-radio-group label="Payment frequency" value="monthly">
            <sgds-radio value="monthly">Monthly</sgds-radio>
            <sgds-radio value="quarterly">Quarterly</sgds-radio>
            <sgds-radio value="yearly">Yearly</sgds-radio>
          </sgds-radio-group>`,
        },
        {
          title: "Do not use radios for very long option lists",
          description: "Long radio groups are hard to scan. Use select or combo box when the list is too long to compare at once.",
          tone: "dont",
          markup: `<sgds-radio-group label="Service type">
            <sgds-radio value="passport">Passport renewal</sgds-radio>
            <sgds-radio value="licence">Driving licence</sgds-radio>
            <sgds-radio value="housing">Housing grant</sgds-radio>
            <sgds-radio value="healthcare">Healthcare subsidy</sgds-radio>
            <sgds-radio value="work">Work permit</sgds-radio>
            <sgds-radio value="business">Business registration</sgds-radio>
          </sgds-radio-group>`,
        },
      ],
    },
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
    componentTokenGroups: [
      {
        title: "sgds / radio",
        rows: [
          { category: "Gap", name: "form-gap-md", value: "sgds/form/gap/md", usage: "Spacing between items of the fieldset; spacing between items of the radio container" },
          { category: "Gap", name: "form-gap-sm", value: "sgds/form/gap/sm", usage: "Spacing between items of the label hint container" },
          { category: "Colour", name: "form-danger-surface-default", value: "sgds/form/danger-surface-default", usage: "Background colour of the form check input" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the label hint container when disabled" },
        ],
      },
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
        title: "Choose from a list",
        description: "Use select when users need to pick one option from a known set.",
      },
      {
        title: "Save space in forms",
        description: "A select keeps many options inside one field when radio buttons would be too long.",
      },
      {
        title: "Follow expected behaviour",
        description: "The select supports standard field, option, and keyboard interaction patterns.",
      },
    ],
    anatomyMarkup: `<div style="min-height: 180px;"><sgds-select class="portal-anatomy-select" placeholder="Choose a service" menuIsOpen><sgds-select-option class="portal-anatomy-select-option" value="passport">Passport</sgds-select-option><sgds-select-option value="licence">Licence</sgds-select-option><sgds-select-option value="benefits">Benefits</sgds-select-option></sgds-select></div>`,
    anatomyParts: [{ title: "Trigger field" }, { title: "Listbox" }, { title: "Option" }],
    anatomyCallouts: [
      {
        number: 1,
        direction: "top",
        targetSelector: ".portal-anatomy-select",
        targetX: "center",
        targetY: "top",
        stemLengthToken: "--sgds-dimension-56",
      },
      {
        number: 2,
        direction: "right",
        targetSelector: ".portal-anatomy-select",
        targetX: "right",
        targetY: "bottom",
        stemLengthToken: "--sgds-dimension-56",
      },
      {
        number: 3,
        direction: "left",
        targetSelector: ".portal-anatomy-select-option",
        targetX: "left",
        targetY: "center",
      },
    ],
    configurationDemos: [
      {
        title: "Hint text",
        description: "Use hint text to clarify the choice.",
        controlLabel: "Select hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-select label="Country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
          <sgds-select-option value="id">Indonesia</sgds-select-option>
        </sgds-select>`,
            description: "Default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-select label="Country" hintText="Select the country you are billing to">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
          <sgds-select-option value="id">Indonesia</sgds-select-option>
        </sgds-select>`,
            description: "Hint text adds extra context for the user.",
          },
        ],
      },
      {
        title: "Placeholder",
        description:
          "Provide a placeholder to indicate that no value has been selected yet.",
        controlLabel: "Select placeholder options",
        defaultValue: "no-placeholder",
        options: [
          {
            label: "No placeholder",
            value: "no-placeholder",
            markup: `<sgds-select label="Country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "Field is empty with no inline helper.",
          },
          {
            label: "Placeholder",
            value: "placeholder",
            markup: `<sgds-select label="Country" placeholder="Select a country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "Placeholder shows until the user picks an option.",
          },
        ],
      },
      {
        title: "Pre-selected value",
        description: "Use the value attribute to mark a default selection.",
        controlLabel: "Select pre-selected value options",
        defaultValue: "none",
        options: [
          {
            label: "Nothing selected",
            value: "none",
            markup: `<sgds-select label="Country" placeholder="Select a country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "No option is preselected.",
          },
          {
            label: "Pre-selected",
            value: "preselected",
            markup: `<sgds-select label="Country" value="sg">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "Singapore is set as the initial value.",
          },
        ],
      },
      {
        title: "Disabled options",
        description:
          "Disable individual options to prevent users from selecting them.",
        controlLabel: "Select disabled option configurations",
        defaultValue: "all-enabled",
        options: [
          {
            label: "All enabled",
            value: "all-enabled",
            markup: `<sgds-select label="Country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
          <sgds-select-option value="id">Indonesia</sgds-select-option>
        </sgds-select>`,
            description: "Every option is selectable.",
          },
          {
            label: "Option disabled",
            value: "option-disabled",
            markup: `<sgds-select label="Country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my" disabled>Malaysia</sgds-select-option>
          <sgds-select-option value="id">Indonesia</sgds-select-option>
        </sgds-select>`,
            description:
              "Disabled options appear muted in the menu and cannot be picked.",
          },
        ],
      },
      {
        title: "Disabled",
        description: "Disable the entire select to prevent any interaction.",
        controlLabel: "Select disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-select label="Country" value="sg">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-select label="Country" value="sg" disabled>
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "Select appears muted and cannot be opened.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and a feedback message when no value is selected.",
        controlLabel: "Select validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-select label="Country" placeholder="Select a country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description: "No feedback shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-select label="Country" placeholder="Select a country" required hasFeedback invalid invalidFeedback="Select a country">
          <sgds-select-option value="sg">Singapore</sgds-select-option>
          <sgds-select-option value="my">Malaysia</sgds-select-option>
        </sgds-select>`,
            description:
              "Select shows error styling with feedback message below.",
          },
        ],
      },
  {
        title: "Loading",
        description:
          "Use loading while select options are being retrieved or refreshed.",
        controlLabel: "Select loading options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-select label="Agency" placeholder="Choose agency">
              <sgds-select-option value="govtech">GovTech</sgds-select-option>
              <sgds-select-option value="mci">MCI</sgds-select-option>
            </sgds-select>`,
            description: "Use default when options are ready.",
          },
          {
            label: "Loading",
            value: "loading",
            markup: `<sgds-select label="Agency" placeholder="Choose agency" loading>
              <sgds-select-option value="govtech">GovTech</sgds-select-option>
            </sgds-select>`,
            description: "Use loading while options are being prepared.",
          },
        ],
      },
      {
        title: "Required",
        description:
          "Mark select as required when the form cannot be submitted without a selected option.",
        controlLabel: "Select required options",
        defaultValue: "optional",
        options: [
          {
            label: "Optional",
            value: "optional",
            markup: `<sgds-select label="Preferred agency" placeholder="Choose agency">
              <sgds-select-option value="govtech">GovTech</sgds-select-option>
            </sgds-select>`,
            description: "Use optional selects for non-essential choices.",
          },
          {
            label: "Required",
            value: "required",
            markup: `<sgds-select label="Agency" placeholder="Choose agency" required>
              <sgds-select-option value="govtech">GovTech</sgds-select-option>
            </sgds-select>`,
            description:
              "Use required for choices that must be completed before submission.",
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
    usage: {
      bestPractices: [
        {
          title: "Use select for one choice from a known list",
          description:
            "Use select when users must pick one value from a defined set, especially when radios would crowd the page.",
          tone: "do",
          markup: `<sgds-select label="Country" placeholder="Select a country">
            <sgds-select-option value="sg">Singapore</sgds-select-option>
            <sgds-select-option value="my">Malaysia</sgds-select-option>
            <sgds-select-option value="id">Indonesia</sgds-select-option>
            <sgds-select-option value="th">Thailand</sgds-select-option>
          </sgds-select>`,
        },
        {
          title: "Do not use select for very short option sets",
          description:
            "If there are only two or three options, show them as radio buttons so users can compare and pick without opening a menu.",
          tone: "dont",
          markup: `<sgds-select label="Preferred contact method">
            <sgds-select-option value="email">Email</sgds-select-option>
            <sgds-select-option value="sms">SMS</sgds-select-option>
          </sgds-select>`,
        },
        {
          title: "Use a placeholder to indicate no value is selected",
          description:
            "Set a placeholder so users can tell the field is empty and that they still need to make a choice.",
          tone: "do",
          markup: `<sgds-select label="Country" placeholder="Select a country">
            <sgds-select-option value="sg">Singapore</sgds-select-option>
            <sgds-select-option value="my">Malaysia</sgds-select-option>
          </sgds-select>`,
        },
        {
          title: "Do not use select when users need to type to find an option",
          description:
            "If the list is long and users know the value, use a combo box so they can filter by typing.",
          tone: "dont",
          markup: `<sgds-select label="Country">
            <sgds-select-option value="sg">Singapore</sgds-select-option>
            <sgds-select-option value="my">Malaysia</sgds-select-option>
            <sgds-select-option value="id">Indonesia</sgds-select-option>
            <sgds-select-option value="th">Thailand</sgds-select-option>
            <sgds-select-option value="vn">Vietnam</sgds-select-option>
            <sgds-select-option value="ph">Philippines</sgds-select-option>
            <sgds-select-option value="kh">Cambodia</sgds-select-option>
            <sgds-select-option value="la">Laos</sgds-select-option>
          </sgds-select>`,
        },
        {
          title: "Order options in a way users can predict",
          description:
            "Sort options alphabetically, by frequency, or by recommended order so users can find their choice quickly.",
          tone: "do",
          markup: `<sgds-select label="Country">
            <sgds-select-option value="id">Indonesia</sgds-select-option>
            <sgds-select-option value="my">Malaysia</sgds-select-option>
            <sgds-select-option value="sg">Singapore</sgds-select-option>
            <sgds-select-option value="th">Thailand</sgds-select-option>
          </sgds-select>`,
        },
        {
          title: "Do not use select when multi-selection is required",
          description:
            "Select only supports a single value. For more than one, use a combo box with multiSelect or checkboxes.",
          tone: "dont",
          markup: `<sgds-select label="Languages spoken">
            <sgds-select-option value="en">English</sgds-select-option>
            <sgds-select-option value="zh">Mandarin</sgds-select-option>
            <sgds-select-option value="ms">Malay</sgds-select-option>
            <sgds-select-option value="ta">Tamil</sgds-select-option>
          </sgds-select>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / select",
        rows: [
          { category: "Gap", name: "form-gap-md", value: "sgds/form/gap/md", usage: "Spacing between items inside the form control" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items inside the component" },
          { category: "Border", name: "form-border-radius-md", value: "sgds/form/border-radius/md", usage: "Value used by the component" },
          { category: "Border", name: "form-border-width-default", value: "sgds/form/border-width/default", usage: "Value used by the component" },
          { category: "Size", name: "dimension-48", value: "sgds/dimension/48", usage: "Height of the select trigger" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the icon" },
          { category: "Outline", name: "form-outline-focus", value: "sgds/form/outline/focus", usage: "Focus outline of the form control" },
          { category: "Outline", name: "form-outline-offset-focus", value: "sgds/form/outline/offset-focus", usage: "Focus outline offset of the form control" },
        ],
      },
    ],
  },
  sidebar: {
    key: "sidebar",
    title: "Sidebar",
    tag: "sgds-sidebar",
    group: "navigation",
    summary:
      "The sidebar provides collapsible vertical navigation for application layouts, dashboards, and internal tools.",
    purposeCards: [
      {
        title: "Keep app navigation visible",
        description: "Use a sidebar for product areas that users move between often.",
      },
      {
        title: "Organise many destinations",
        description: "Sections and groups keep complex navigation easier to scan.",
      },
      {
        title: "Collapse for more workspace",
        description: "Use the collapsed state when dense pages need more horizontal room.",
      },
    ],
    anatomyMarkup: `<sgds-sidebar active="selected-label" variant="collapsible" scrim aria-label="Example sidebar navigation" class="portal-anatomy-sidebar sgds:h-[640px]">
      <div slot="upper" class="portal-slot-example portal-sidebar-upper-slot"><span>Slot content</span></div>
      <sgds-sidebar-section title="Main" name="main">
        <sgds-sidebar-group title="Label" name="selected-label">
          <sgds-icon name="placeholder" slot="icon"></sgds-icon>
          <sgds-sidebar-item title="Label" name="nested-label-1">
            <sgds-icon name="placeholder" slot="icon"></sgds-icon>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Label" name="nested-label-2">
            <sgds-icon name="placeholder" slot="icon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar-group>
        <sgds-sidebar-item title="Label" name="label-2">
          <sgds-icon name="placeholder" slot="icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Label" name="label-3">
          <sgds-icon name="placeholder" slot="icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
      <div slot="lower" class="portal-slot-example portal-sidebar-lower-slot"><span>Slot content</span></div>
    </sgds-sidebar>`,
    anatomyParts: [
      { title: "Level 1 sidebar" },
      { title: "Collapsible icon" },
      { title: "Level 2 sidebar", note: "(optional)" },
      { title: "Scrim", note: "(optional)" },
      { title: "Slot content", note: "(optional)" },
      { title: "Side bar menus" },
      { title: "Slot content", note: "(optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-sidebar", targetShadowSelector: ".sidebar-main", targetX: "left", targetY: "center" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-sidebar", targetShadowSelector: "sgds-icon-button", targetX: "center", targetY: "top" },
      { number: 3, direction: "top", targetSelector: ".portal-anatomy-sidebar", targetShadowSelector: ".sidebar-nested-overlay", targetX: "center", targetY: "top" },
      { number: 4, direction: "right", targetSelector: ".portal-anatomy-sidebar", targetX: "right", targetY: "center" },
      { number: 5, direction: "left", targetSelector: ".portal-sidebar-lower-slot", targetX: "left", targetY: "center" },
      { number: 6, direction: "left", targetSelector: "sgds-sidebar-group[name='selected-label']", targetX: "left", targetY: "center" },
      { number: 7, direction: "top", targetSelector: ".portal-sidebar-upper-slot", targetX: "center", targetY: "top" },
    ],
    demos: [
      {
        title: "Basic sidebar",
        description: "Use sidebar items for a flat application navigation.",
        markup: `<sgds-sidebar active="dashboard" aria-label="Dashboard navigation" class="sgds:h-[360px]">
          <sgds-sidebar-item title="Dashboard" name="dashboard">
            <sgds-icon name="grid" slot="icon"></sgds-icon>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Cases" name="cases">
            <sgds-icon name="folder" slot="icon"></sgds-icon>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Settings" name="settings">
            <sgds-icon name="gear" slot="icon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar>`,
      },
      {
        title: "Sidebar with sections",
        description: "Use sections to group related destinations under a clear heading.",
        markup: `<sgds-sidebar active="team" aria-label="Admin navigation" class="sgds:h-[420px]">
          <sgds-sidebar-section title="Workspace" name="workspace">
            <sgds-sidebar-item title="Overview" name="overview">
              <sgds-icon name="house" slot="icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Team" name="team">
              <sgds-icon name="users" slot="icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
          <sgds-sidebar-section title="Administration" name="administration" collapsible>
            <sgds-sidebar-item title="Billing" name="billing">
              <sgds-icon name="credit-card" slot="icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>`,
      },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Choose a sidebar variant based on how much space the layout can reserve for navigation.",
        controlLabel: "Sidebar variant options",
        defaultValue: "collapsible",
        options: [
          {
            label: "Collapsible",
            value: "collapsible",
            markup: `<sgds-sidebar active="overview" variant="collapsible" aria-label="Collapsible sidebar" class="sgds:h-[360px]">
              <sgds-sidebar-item title="Overview" name="overview">
                <sgds-icon name="house" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Reports" name="reports">
                <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar>`,
            description:
              "Use when users can expand or collapse the sidebar while staying in the same workspace.",
          },
          {
            label: "Persistent",
            value: "persistent",
            markup: `<sgds-sidebar active="overview" variant="persistent" aria-label="Persistent sidebar" class="sgds:h-[360px]">
              <sgds-sidebar-item title="Overview" name="overview">
                <sgds-icon name="house" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Reports" name="reports">
                <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar>`,
            description:
              "Use when the layout always reserves space for navigation.",
          },
          {
            label: "Collapsed",
            value: "collapsed",
            markup: `<sgds-sidebar active="overview" collapsed aria-label="Collapsed sidebar" class="sgds:h-[360px]">
              <sgds-sidebar-item title="Overview" name="overview">
                <sgds-icon name="house" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Reports" name="reports">
                <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar>`,
            description:
              "Use icon-only mode when users need more room for the main workspace.",
          },
        ],
      },
  {
        title: "Collapsed",
        description:
          "Sidebar can collapse to a narrower state when space is limited.",
        controlLabel: "Sidebar collapsed options",
        defaultValue: "expanded",
        options: [
          {
            label: "Expanded",
            value: "expanded",
            markup: `<sgds-sidebar active="applications" aria-label="Application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]">
              <div slot="upper" class="sgds:px-md sgds:py-sm sgds:font-semibold">Service portal</div>
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
              <sgds-sidebar-section title="Admin" name="admin">
                <sgds-sidebar-item title="Settings" name="settings">
                  <sgds-icon name="gear" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
            </sgds-sidebar>`,
            description: "Use expanded sidebars when labels should stay visible.",
          },
          {
            label: "Collapsed",
            value: "collapsed",
            markup: `<sgds-sidebar active="applications" aria-label="Application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]" collapsed>
              <div slot="upper" class="sgds:px-md sgds:py-sm sgds:font-semibold">Service portal</div>
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
              <sgds-sidebar-section title="Admin" name="admin">
                <sgds-sidebar-item title="Settings" name="settings">
                  <sgds-icon name="gear" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
            </sgds-sidebar>`,
            description:
              "Use collapsed when preserving horizontal workspace is more important.",
          },
        ],
      },
      {
        title: "Active item",
        description:
          "Use active sidebar items to show the current page or section.",
        controlLabel: "Sidebar active item options",
        defaultValue: "active",
        options: [
          {
            label: "Active",
            value: "active",
            markup: `<sgds-sidebar active="applications" aria-label="Application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]">
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
            </sgds-sidebar>`,
            description: "Use active to orient users in the current navigation.",
          },
          {
            label: "Default",
            value: "default",
            markup: `<sgds-sidebar aria-label="Application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]">
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
            </sgds-sidebar>`,
            description: "Use default items for inactive destinations.",
          },
        ],
      },
      {
        title: "Scrim",
        description:
          "Scrim adds an overlay treatment for temporary sidebar states on smaller screens.",
        controlLabel: "Sidebar scrim options",
        defaultValue: "without-scrim",
        options: [
          {
            label: "No scrim",
            value: "without-scrim",
            markup: `<sgds-sidebar active="applications" variant="persistent" aria-label="Persistent application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]">
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
            </sgds-sidebar>`,
            description: "Use no scrim for persistent sidebars.",
          },
          {
            label: "Scrim",
            value: "scrim",
            markup: `<div class="sgds:relative sgds:h-[var(--sgds-dimension-360)] sgds:w-full sgds:overflow-hidden sgds:rounded-md sgds:border sgds:border-muted sgds:bg-bg-alternate">
              <sgds-sidebar active="applications" variant="overlay" aria-label="Overlay application navigation" class="portal-demo-sidebar-open sgds:absolute sgds:left-0 sgds:top-0 sgds:z-[1] sgds:h-full" scrim>
                <sgds-sidebar-section title="Workspace" name="workspace">
                  <sgds-sidebar-item title="Dashboard" name="dashboard">
                    <sgds-icon name="house" slot="icon"></sgds-icon>
                  </sgds-sidebar-item>
                  <sgds-sidebar-group title="Applications" name="applications">
                    <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                    <sgds-sidebar-item title="New applications" name="new-applications">
                      <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                    </sgds-sidebar-item>
                    <sgds-sidebar-item title="Submitted" name="submitted">
                      <sgds-icon name="folder" slot="icon"></sgds-icon>
                    </sgds-sidebar-item>
                  </sgds-sidebar-group>
                  <sgds-sidebar-item title="Reports" name="reports">
                    <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                  </sgds-sidebar-item>
                </sgds-sidebar-section>
              </sgds-sidebar>
            </div>`,
            description:
              "Use scrim when the sidebar behaves as a temporary overlay.",
          },
        ],
      },
      {
        title: "Upper and lower slots",
        description:
          "Sidebar supports upper and lower slots for fixed content around the navigation list.",
        controlLabel: "Sidebar slot options",
        defaultValue: "with-slots",
        options: [
          {
            label: "With slots",
            value: "with-slots",
            markup: `<sgds-sidebar active="applications" aria-label="Application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]">
              <div slot="upper" class="sgds:p-md sgds:font-semibold">Portal</div>
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
              <div slot="lower" class="sgds:p-md"><sgds-button size="sm" fullWidth>Help</sgds-button></div>
            </sgds-sidebar>`,
            description:
              "Use slots for persistent header or footer content connected to the sidebar.",
          },
          {
            label: "Navigation only",
            value: "navigation-only",
            markup: `<sgds-sidebar active="applications" aria-label="Application navigation" class="sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:h-[var(--sgds-dimension-360)]">
              <sgds-sidebar-section title="Workspace" name="workspace">
                <sgds-sidebar-item title="Dashboard" name="dashboard">
                  <sgds-icon name="house" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-section>
            </sgds-sidebar>`,
            description: "Use navigation only when no supporting content is needed.",
          },
        ],
      },
    ],
    measurements: [
      {
        title: "Structure",
        description: "Sidebar width defaults to 288px and collapses to 72px. Navigation content uses compact padding and gaps so dense application menus stay scannable.",
        markup: `<div class="sgds:flex sgds:justify-start sgds:w-[calc(var(--sgds-dimension-288)*2)] sgds:max-w-full">
          <sgds-sidebar active="applications" variant="collapsible" scrim aria-label="Structure example sidebar" class="sgds:h-[420px]">
            <sgds-sidebar-section title="Main" name="main" separator>
              <sgds-sidebar-item title="Overview" name="overview">
                <sgds-icon name="house" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-group title="Records" name="records">
                <sgds-icon name="folder" slot="icon"></sgds-icon>
                <sgds-sidebar-item title="Applications" name="applications">
                  <sgds-icon name="file-text" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Reports" name="reports">
                  <sgds-icon name="bar-chart" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-group>
            </sgds-sidebar-section>
          </sgds-sidebar>
        </div>`,
      },
    ],
    componentTokenGroups: [
      {
        title: "sgds/sidebar",
        rows: [
          { name: "width", value: "sgds/dimension/288", rawValue: "288px", mapKey: "width", category: "Size", usage: "Width or height of an element inside" },
          { name: "collapsed-width", value: "sgds/dimension/72", rawValue: "72px", mapKey: "collapsed-width", category: "Size", usage: "Width or height of an element inside" },
          { name: "surface", value: "sgds/surface-default", rawValue: "#FFFFFF", mapKey: "surface", category: "Colour", usage: "Background colour of the component" },
          { name: "raised-surface", value: "sgds/surface-raised", rawValue: "#FFFFFF", mapKey: "raised-surface", category: "Colour", usage: "Background colour of the component" },
          { name: "border-color", value: "sgds/border-color-muted", rawValue: "#DFDFDF", mapKey: "border-color", category: "Colour", usage: "Text colour of the component" },
          { name: "active-background", value: "sgds/bg-translucent-subtle", rawValue: "5% black overlay", mapKey: "active-background", category: "Colour", usage: "Colour used somewhere in the component" },
          { name: "label-color", value: "sgds/label-color-default", rawValue: "#242424", mapKey: "label-color", category: "Colour", usage: "Text colour of the component" },
          { name: "section-label-color", value: "sgds/label-color-subtle", rawValue: "#686868", mapKey: "section-label-color", category: "Colour", usage: "Text colour of the component" },
          { name: "container-padding", value: "sgds/padding/lg", rawValue: "20px", mapKey: "container-padding", category: "Padding", usage: "Value used by the component" },
          { name: "item-padding", value: "sgds/padding/xs", rawValue: "8px", mapKey: "item-padding", category: "Padding", usage: "Value used by the component" },
          { name: "content-gap", value: "sgds/gap/md", rawValue: "16px", mapKey: "content-gap", category: "Gap", usage: "Value used by the component" },
          { name: "item-gap", value: "sgds/gap/xs", rawValue: "8px", mapKey: "item-gap", category: "Gap", usage: "Value used by the component" },
          { name: "item-border-radius", value: "sgds/border-radius/md", rawValue: "8px", mapKey: "item-border-radius", category: "Border", usage: "Corner radius of bordered elements" },
          { name: "active-indicator-width", value: "sgds/dimension/2", rawValue: "2px", mapKey: "active-indicator-width", category: "Border", usage: "Border style of the component" },
          { name: "border-radius-xs", value: "sgds/border-radius/xs", category: "Border", usage: "Corner radius of the active indicator" },
          { name: "border-width-1", value: "sgds/border-width/1", category: "Border", usage: "Border of the sidebar container and nested overlay" },
          { name: "dimension-0", value: "sgds/dimension/0", category: "Size", usage: "Collapsed inset and reset size values used inside the component" },
          { name: "dimension-256", value: "sgds/dimension/256", category: "Size", usage: "Width of the nested sidebar overlay" },
          { name: "font-size-0", value: "sgds/font-size/0", category: "Typography", usage: "Font-size reset used while the sidebar is collapsed" },
          { name: "font-size-1", value: "sgds/font-size/1", category: "Typography", usage: "Font-size reset used for collapsed labels" },
          { name: "gap-2-xs", value: "sgds/gap/2-xs", category: "Gap", usage: "Compact gap between sidebar icon and text content" },
          { name: "icon-size-sm", value: "sgds/icon-size/sm", category: "Size", usage: "Size of the sidebar expand and collapse icons" },
          { name: "line-height-20", value: "sgds/line-height/20", category: "Typography", usage: "Line height of sidebar item labels" },
          { name: "margin-2-xl", value: "sgds/margin/2-xl", category: "Margin", usage: "Offset used by nested sidebar content" },
          { name: "margin-md", value: "sgds/margin/md", category: "Margin", usage: "Offset used by sidebar section and item content" },
          { name: "motion-duration-slow", value: "sgds/motion-duration/slow", category: "Motion", usage: "Duration of sidebar collapse and overlay transitions" },
          { name: "padding-md", value: "sgds/padding/md", category: "Padding", usage: "Padding inside nested sidebar overlay" },
          { name: "padding-sm", value: "sgds/padding/sm", category: "Padding", usage: "Padding inside sidebar item content and controls" },
          { name: "outline-focus", value: "sgds/outline-focus", category: "Outline", usage: "Focus outline of sidebar controls" },
          { name: "outline-offset-focus", value: "sgds/outline-offset-focus", category: "Outline", usage: "Focus outline offset of sidebar controls" },
          { name: "z-index", value: "sgds/z-index-sticky", rawValue: "200", mapKey: "z-index", category: "Layer", usage: "Stacking order over other elements on the page" },
          { name: "motion-duration", value: "sgds/motion-duration/standard", rawValue: "200ms", mapKey: "motion-duration", category: "Motion", usage: "Value used by the component" },
          { name: "motion-easing", value: "sgds/motion-easing/standard", rawValue: "cubic-bezier(0.42, 0, 0.58, 1)", mapKey: "motion-easing", category: "Motion", usage: "Value used by the component" },
        ],
      },
    ],
    usage: {
      guidance: [
        {
          title: "Use for application navigation",
          tone: "do",
          items: [
            "Use sidebar for dashboards, admin tools, and internal products where users switch between major areas often.",
            "Pair sidebar with application layouts that reserve a left navigation rail.",
          ],
        },
        {
          title: "Keep active state accurate",
          tone: "do",
          items: [
            "Set active on the sidebar to match the current item name.",
            "Give every item and group a unique name so active tracking works reliably.",
          ],
        },
        {
          title: "Do not use for simple site navigation",
          tone: "dont",
          items: [
            "Use mainnav or subnav for public-facing pages with shallow navigation.",
            "Use table of contents for navigation within a single page.",
          ],
        },
      ],
      bestPractices: [
        {
          title: "Group related destinations",
          description: "Use sections and groups to make complex application navigation easier to scan.",
          tone: "do",
          markup: `<sgds-sidebar active="cases" aria-label="Grouped navigation" class="sgds:h-[360px]">
            <sgds-sidebar-section title="Workspace" name="workspace">
              <sgds-sidebar-item title="Cases" name="cases">
                <sgds-icon name="folder" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Tasks" name="tasks">
                <sgds-icon name="check2-square" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-section>
          </sgds-sidebar>`,
        },
        {
          title: "Do not omit item names",
          description: "Sidebar uses name values to resolve active state. Missing or duplicated names make current-page highlights unreliable.",
          tone: "dont",
          markup: `<sgds-sidebar active="cases" aria-label="Navigation with missing names" class="sgds:h-[240px]">
            <sgds-sidebar-item title="Cases">
              <sgds-icon name="folder" slot="icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar>`,
        },
      ],
    },
    accessibility: {
      builtInItems: [
        "Sidebar renders a navigation landmark with an accessible label.",
        "Items, groups, and sections expose active and expanded states through their interactive controls.",
      ],
      authorItems: [
        "Set aria-label on the sidebar when the page has more than one navigation landmark.",
        "Provide a unique name for each item and group so active state can be matched correctly.",
      ],
      focusItems: [
        "Users should be able to move through sidebar controls in a logical order.",
        "Do not place focusable controls inside collapsed sections unless users can expand them.",
      ],
      keyboardInteractions: [
        {
          key: "Tab",
          description: "Moves focus to the next sidebar item or control.",
        },
        {
          key: "Shift + Tab",
          description: "Moves focus to the previous sidebar item or control.",
        },
        {
          key: "Enter",
          description: "Activates the focused sidebar item or opens an expandable group.",
        },
        {
          key: "Space",
          description: "Activates the focused sidebar item or opens an expandable group.",
        },
        {
          key: "↓ Down",
          description: "Moves focus to the next sidebar item, or to the first child item when an expanded group is focused.",
        },
        {
          key: "↑ Up",
          description: "Moves focus to the previous sidebar item, or to the last child of the previous group.",
        },
        {
          key: "→ Right",
          description: "Opens the focused expandable group, or moves focus into its first child when already open.",
        },
        {
          key: "← Left",
          description: "Closes the focused expandable group, or returns focus to the parent group from a nested item.",
        },
      ],
    },
    props: [
      {
        name: "active",
        type: "string",
        defaultValue: '""',
        description: "Name of the currently active sidebar item or group.",
      },
      {
        name: "collapsed",
        type: "boolean",
        defaultValue: "false",
        description: "Shows the sidebar in icon-only mode.",
      },
      {
        name: "variant",
        type: '"collapsible" | "persistent" | "overlay"',
        defaultValue: '"collapsible"',
        description: "Controls whether the sidebar can collapse, stays visible, or overlays the page content.",
      },
      {
        name: "scrim",
        type: "boolean",
        defaultValue: "false",
        description: "Shows an overlay behind the sidebar drawer when the drawer or overlay variant is open.",
      },
      {
        name: "aria-label",
        type: "string",
        defaultValue: '"Sidebar navigation"',
        description: "Accessible label for the sidebar navigation landmark.",
      },
    ],
    releaseRows: [
      {
        Date: "29 Apr 2026",
        Version: "v3.18.0",
        Description:
          'Sidebar and sidenav now use the new sticky z-index layer (<a class="updates-source-link" href="https://github.com/GovTechSG/sgds-web-component/pull/612" target="_blank" rel="noopener noreferrer">#612</a>).',
      },
      {
        Date: "17 Apr 2026",
        Version: "v3.17.0",
        Description:
          'New sidebar component added (<a class="updates-source-link" href="https://github.com/GovTechSG/sgds-web-component/pull/570" target="_blank" rel="noopener noreferrer">#570</a>).',
      },
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
        title: "Navigate within a section",
        description: "Use sidenav for related pages or subsections in the same area.",
      },
      {
        title: "Keep section links nearby",
        description: "Side placement keeps local navigation close to the page content.",
      },
      {
        title: "Show current location",
        description: "The active state helps users see where they are in the section.",
      },
    ],
    anatomyMarkup: `<div class="portal-demo-nav-sm portal-sidenav-anatomy-demo">
      <sgds-sidenav class="sgds:block sgds:w-full">
        <sgds-sidenav-item active>
          <sgds-icon name="file-text" slot="icon" class="portal-sidenav-leading-icon"></sgds-icon>
          <span slot="title" class="portal-sidenav-label">Reports</span>
          <sgds-sidenav-link active class="portal-sidenav-active-link"><a href="#">Monthly summary</a></sgds-sidenav-link>
          <sgds-sidenav-link><a href="#">Annual report</a></sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav>
    </div>`,
    anatomyParts: [
      { title: "Leading icon", note: "(optional)" },
      { title: "Label" },
      { title: "Submenu indicator" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-sidenav-leading-icon", targetX: "left", targetY: "center" },
      { number: 2, direction: "left", targetSelector: ".portal-sidenav-active-link", targetX: "left", targetY: "center", targetXOffset: 48 },
      { number: 3, direction: "right", targetSelector: "sgds-sidenav-item[active]", targetShadowSelector: ".caret-icon", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Item type",
        description:
          "Sidenav items render as a single link or as a collapsible menu depending on the children passed to the default slot.",
        controlLabel: "Sidenav item type options",
        defaultValue: "menu-items",
        options: [
          {
            label: "Link items only",
            value: "link-items",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active><a href="#">Overview</a></sgds-sidenav-item>
            <sgds-sidenav-item><a href="#">Activity</a></sgds-sidenav-item>
            <sgds-sidenav-item><a href="#">Settings</a></sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description:
              "Use when each section maps directly to a single page.",
          },
          {
            label: "Menu items with sub-links",
            value: "menu-items",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active>
              <span slot="title">Reports</span>
              <sgds-sidenav-link active><a href="#">Monthly summary</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Annual report</a></sgds-sidenav-link>
            </sgds-sidenav-item>
            <sgds-sidenav-item>
              <span slot="title">Settings</span>
              <sgds-sidenav-link><a href="#">Profile</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Notifications</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description:
              "Group related links under expandable parent items. Up to three levels are supported.",
          },
        ],
      },
      {
        title: "Active and expanded states",
        description:
          "Set active on a parent menu item to expand it on first load and highlight the current child link.",
        controlLabel: "Sidenav initial state options",
        defaultValue: "with-active",
        options: [
          {
            label: "All collapsed",
            value: "all-collapsed",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item>
              <span slot="title">Reports</span>
              <sgds-sidenav-link><a href="#">Monthly summary</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Annual report</a></sgds-sidenav-link>
            </sgds-sidenav-item>
            <sgds-sidenav-item>
              <span slot="title">Settings</span>
              <sgds-sidenav-link><a href="#">Profile</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description: "Use when no section is currently selected.",
          },
          {
            label: "With active expanded item",
            value: "with-active",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active>
              <span slot="title">Reports</span>
              <sgds-sidenav-link active><a href="#">Monthly summary</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Annual report</a></sgds-sidenav-link>
            </sgds-sidenav-item>
            <sgds-sidenav-item>
              <span slot="title">Settings</span>
              <sgds-sidenav-link><a href="#">Profile</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description:
              "The parent expands automatically and the matching child is highlighted as the current page.",
          },
        ],
      },
      {
        title: "Disabled link",
        description:
          "Disable individual sidenav links to indicate sections that are not yet available to the user.",
        controlLabel: "Sidenav disabled link options",
        defaultValue: "all-enabled",
        options: [
          {
            label: "All enabled",
            value: "all-enabled",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active>
              <span slot="title">Reports</span>
              <sgds-sidenav-link active><a href="#">Monthly summary</a></sgds-sidenav-link>
              <sgds-sidenav-link><a href="#">Annual report</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description: "Standard menu where every link is interactive.",
          },
          {
            label: "Disabled link",
            value: "with-disabled-link",
            markup: `<div class="portal-demo-nav-sm">
          <sgds-sidenav>
            <sgds-sidenav-item active>
              <span slot="title">Reports</span>
              <sgds-sidenav-link active><a href="#">Monthly summary</a></sgds-sidenav-link>
              <sgds-sidenav-link disabled><a href="#">Annual report</a></sgds-sidenav-link>
            </sgds-sidenav-item>
          </sgds-sidenav>
        </div>`,
            description:
              "Communicates that an item exists but is locked behind a permission or feature flag.",
          },
        ],
      },
  {
        title: "Sticky",
        description:
          "Sticky sidenav stays visible while the user scrolls through related page content.",
        controlLabel: "Sidenav sticky options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav-sm">
              <sgds-sidenav>
                <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Details</a></sgds-sidenav-link>
              </sgds-sidenav>
            </div>`,
            description: "Use default when the sidenav scrolls with content.",
          },
          {
            label: "Sticky",
            value: "sticky",
            markup: `<div class="portal-demo-nav-sm">
              <sgds-sidenav sticky>
                <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Details</a></sgds-sidenav-link>
              </sgds-sidenav>
            </div>`,
            description:
              "Use sticky when section navigation should remain available on long pages.",
          },
        ],
      },
      {
        title: "Icon slot",
        description:
          "Sidenav links can include an icon to support recognition in dense navigation.",
        controlLabel: "Sidenav icon options",
        defaultValue: "with-icon",
        options: [
          {
            label: "With icon",
            value: "with-icon",
            markup: `<div class="portal-demo-nav-sm">
              <sgds-sidenav>
                <sgds-sidenav-link active>
                  <sgds-icon slot="icon" name="house"></sgds-icon>
                  <a href="#">Overview</a>
                </sgds-sidenav-link>
              </sgds-sidenav>
            </div>`,
            description:
              "Use icons when they help users scan repeated navigation items.",
          },
          {
            label: "Text only",
            value: "text-only",
            markup: `<div class="portal-demo-nav-sm">
              <sgds-sidenav>
                <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
              </sgds-sidenav>
            </div>`,
            description: "Use text-only links when labels are clear on their own.",
          },
        ],
      },
      {
        title: "Caret icon",
        description:
          "Nested sidenav items can customise the caret icon used for expansion.",
        controlLabel: "Sidenav caret options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<div class="portal-demo-nav-sm">
              <sgds-sidenav>
                <sgds-sidenav-item active>
                  <span slot="title">Section</span>
                  <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
                </sgds-sidenav-item>
              </sgds-sidenav>
            </div>`,
            description: "Use the default caret for standard nested navigation.",
          },
          {
            label: "Custom",
            value: "custom",
            markup: `<div class="portal-demo-nav-sm">
              <sgds-sidenav>
                <sgds-sidenav-item active>
                  <span slot="title">Section</span>
                  <sgds-icon slot="caret" name="chevron-down"></sgds-icon>
                  <sgds-sidenav-link active><a href="#">Overview</a></sgds-sidenav-link>
                </sgds-sidenav-item>
              </sgds-sidenav>
            </div>`,
            description:
              "Use a custom caret only when matching a specific icon system requirement.",
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
    usage: {
      bestPractices: [
        {
          title: "Use sidenav for navigating within a section",
          description:
            "Sidenav suits content-heavy sections like documentation or settings where users need every link in view.",
          tone: "do",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-sidenav>
              <sgds-sidenav-item active>
                <span slot="title">Account</span>
                <sgds-sidenav-link active><a href="#">Profile</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Notifications</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Privacy</a></sgds-sidenav-link>
              </sgds-sidenav-item>
              <sgds-sidenav-item>
                <span slot="title">Billing</span>
                <sgds-sidenav-link><a href="#">Plans</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Invoices</a></sgds-sidenav-link>
              </sgds-sidenav-item>
            </sgds-sidenav>
          </div>`,
        },
        {
          title: "Do not use sidenav as the only top-level navigation",
          description:
            "Sidenav is for moving within a section. Place the global mainnav above it so users can still cross sections.",
          tone: "dont",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-sidenav>
              <sgds-sidenav-item><a href="#">Home</a></sgds-sidenav-item>
              <sgds-sidenav-item><a href="#">Services</a></sgds-sidenav-item>
              <sgds-sidenav-item><a href="#">About</a></sgds-sidenav-item>
              <sgds-sidenav-item><a href="#">Contact</a></sgds-sidenav-item>
            </sgds-sidenav>
          </div>`,
        },
        {
          title: "Group related links under a parent item",
          description:
            "Use sgds-sidenav-item with child links when sub-pages belong together so the nav stays scannable.",
          tone: "do",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-sidenav>
              <sgds-sidenav-item>
                <span slot="title">Reports</span>
                <sgds-sidenav-link><a href="#">Monthly summary</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Annual report</a></sgds-sidenav-link>
              </sgds-sidenav-item>
              <sgds-sidenav-item>
                <span slot="title">Settings</span>
                <sgds-sidenav-link><a href="#">Profile</a></sgds-sidenav-link>
                <sgds-sidenav-link><a href="#">Notifications</a></sgds-sidenav-link>
              </sgds-sidenav-item>
            </sgds-sidenav>
          </div>`,
        },
        {
          title: "Do not nest more levels than needed",
          description:
            "Deeply nested sidenavs are hard to operate. Restrict nesting to one level and split larger structures.",
          tone: "dont",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-sidenav>
              <sgds-sidenav-item active>
                <span slot="title">Reports</span>
                <sgds-sidenav-link active>
                  <a href="#">Monthly</a>
                  <sgds-sidenav-link><a href="#">January</a></sgds-sidenav-link>
                  <sgds-sidenav-link><a href="#">February</a></sgds-sidenav-link>
                </sgds-sidenav-link>
              </sgds-sidenav-item>
            </sgds-sidenav>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / sidenav",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/sm", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/sm", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-2-xs", value: "sgds/padding/2-xs", usage: "Padding of the sidenav button; padding of the content" },
          { category: "Padding", name: "padding-3-xl", value: "sgds/padding/3-xl", usage: "Left padding of the sidenav button; left padding of the content" },
          { category: "Padding", name: "padding-xl", value: "sgds/padding/xl", usage: "Left padding of the content" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the sidenav button; spacing between items of the content" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", mapKey: "border-radius", usage: "Corner radius of the sidenav button; corner radius of the content" },
          { category: "Typography", name: "font-size-16", value: "sgds/font-size/16", usage: "Font size of the sidenav button; font size of the content" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight of the sidenav button" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the sidenav button; font weight of the content" },
          { category: "Typography", name: "line-height-24", value: "sgds/line-height/24", usage: "Line height of the sidenav button; line height of the content" },
          { category: "Size", name: "icon-size-lg", value: "sgds/icon-size/lg", usage: "Size of sidenav expand and collapse icons" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the sidenav button on hover; background colour of the sidenav button when keyboard-focused" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the sidenav button when active; text colour of the content" },
          { category: "Colour", name: "link-color-default", value: "sgds/link-color-default", usage: "Text colour of the content; text colour of the content when active" },
          { category: "Colour", name: "link-color-emphasis", value: "sgds/link-color-emphasis", usage: "Text colour of the content on hover; text colour of the content on hover and when active" },
          { category: "Colour", name: "primary-color-emphasis", value: "sgds/primary/color/emphasis", usage: "Text colour of the content when active; text colour of the content on hover and when active" },
          { category: "Colour", name: "primary-surface-translucent", value: "sgds/primary/surface/translucent", usage: "Background colour of the content when active" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the sidenav button when keyboard-focused; focus outline of the content when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the sidenav button when keyboard-focused; focus-outline offset of the content when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the sidenav button when disabled; transparency of the content when disabled" },
          { category: "Colour", name: "primary-bg-translucent", value: "sgds/primary/bg/translucent", usage: "Background colour of the content when keyboard-focused and when active" },
        ],
      },
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
        title: "Show loading structure",
        description: "Skeletons preview the shape of content while data is loading.",
      },
      {
        title: "Reduce perceived waiting",
        description: "A matching placeholder reassures users that the page is still working.",
      },
      {
        title: "Prevent layout jumps",
        description: "Use skeletons sized like the final content to keep the page stable.",
      },
    ],
    anatomyMarkup: `<div class="portal-skeleton-anatomy-demo">
      <sgds-skeleton class="portal-anatomy-skeleton portal-anatomy-skeleton-heading" width="100%" height="16px" sheen></sgds-skeleton>
      <sgds-skeleton class="portal-anatomy-skeleton" width="88%" height="16px" sheen></sgds-skeleton>
      <sgds-skeleton class="portal-anatomy-skeleton" width="64%" height="16px" sheen></sgds-skeleton>
    </div>`,
    anatomyParts: [{ title: "Shape (text)" }],
    anatomyCallouts: [
      { number: 1, direction: "right", targetSelector: ".portal-anatomy-skeleton-heading", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Sheen animation",
        description:
          "Toggle the animated sheen that signals an active loading state.",
        controlLabel: "Skeleton sheen options",
        defaultValue: "with-sheen",
        options: [
          {
            label: "No sheen",
            value: "no-sheen",
            markup: `<sgds-skeleton width="240px" height="16px"></sgds-skeleton>`,
            description:
              "Static placeholder. Use when the loading state is brief or animation would be distracting.",
          },
          {
            label: "Sheen",
            value: "with-sheen",
            markup: `<sgds-skeleton width="240px" height="16px" sheen></sgds-skeleton>`,
            description:
              "Adds the sheening effect to communicate ongoing data loading.",
          },
        ],
      },
      {
        title: "Shape",
        description:
          "Use borderRadius to match the shape of the content that will replace the skeleton.",
        controlLabel: "Skeleton shape options",
        defaultValue: "rounded-rectangle",
        options: [
          {
            label: "Rectangle",
            value: "rectangle",
            markup: `<sgds-skeleton width="160px" height="64px" borderRadius="0" sheen></sgds-skeleton>`,
            description:
              "Sharp rectangle. Use for image or content blocks with square corners.",
          },
          {
            label: "Rounded rectangle",
            value: "rounded-rectangle",
            markup: `<sgds-skeleton width="160px" height="64px" borderRadius="8px" sheen></sgds-skeleton>`,
            description:
              "Rounded rectangle. Use for cards, buttons, and inputs.",
          },
          {
            label: "Circle",
            value: "circle",
            markup: `<sgds-skeleton width="80px" height="80px" borderRadius="50%" sheen></sgds-skeleton>`,
            description:
              "Circle. Use for avatars or circular icon placeholders.",
          },
        ],
      },
      {
        title: "Rows",
        description:
          "Render multiple stacked rows within the skeleton's height to mimic paragraphs of text.",
        controlLabel: "Skeleton rows options",
        defaultValue: "single-row",
        options: [
          {
            label: "Single row",
            value: "single-row",
            markup: `<sgds-skeleton width="320px" height="16px" sheen></sgds-skeleton>`,
            description: "One row. Represents a single line of text.",
          },
          {
            label: "Three rows",
            value: "three-rows",
            markup: `<sgds-skeleton width="320px" height="80px" rows="3" sheen></sgds-skeleton>`,
            description:
              "Three evenly-spaced rows for short paragraph placeholders.",
          },
          {
            label: "Five rows",
            value: "five-rows",
            markup: `<sgds-skeleton width="320px" height="140px" rows="5" sheen></sgds-skeleton>`,
            description: "Five rows for longer body text placeholders.",
          },
        ],
      },
  {
        title: "Dimensions",
        description:
          "Skeleton supports custom width and height for matching the loading placeholder to the final content.",
        controlLabel: "Skeleton dimension options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-skeleton width="240px" height="16px"></sgds-skeleton>`,
            description: "Use a simple line-sized skeleton for text placeholders.",
          },
          {
            label: "Custom",
            value: "custom",
            markup: `<sgds-skeleton width="240px" height="96px"></sgds-skeleton>`,
            description:
              "Use custom dimensions when the placeholder should match a card, thumbnail, or media region.",
          },
        ],
      },
      {
        title: "Border radius",
        description:
          "Border radius lets the skeleton match rounded controls or media shapes.",
        controlLabel: "Skeleton radius options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-skeleton width="240px" height="16px"></sgds-skeleton>`,
            description: "Use default radius for text-like placeholders.",
          },
          {
            label: "Rounded",
            value: "rounded",
            markup: `<sgds-skeleton width="96px" height="96px" borderRadius="999px"></sgds-skeleton>`,
            description:
              "Use rounded placeholders for avatars or circular image regions.",
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
    usage: {
      bestPractices: [
        {
          title: "Match the skeleton to the shape of the incoming content",
          description:
            "Size each placeholder to the element it stands in for so nothing shifts when the real content arrives.",
          tone: "do",
          markup: `<div class="portal-demo-stack">
            <sgds-skeleton width="60%" height="24px" sheen></sgds-skeleton>
            <sgds-skeleton width="100%" height="64px" rows="3" sheen></sgds-skeleton>
          </div>`,
        },
        {
          title: "Do not use skeletons for very brief waits",
          description:
            "If content loads in under a second, a skeleton flashes in and out. Use a spinner for short waits instead.",
          tone: "dont",
          markup: `<sgds-skeleton width="80px" height="16px" sheen></sgds-skeleton>`,
        },
        {
          title: "Use the sheen animation for active loading",
          description:
            "Turn on sheen so loading reads as in progress. A static placeholder looks like a permanent element.",
          tone: "do",
          markup: `<sgds-skeleton width="240px" height="16px" sheen></sgds-skeleton>`,
        },
        {
          title: "Do not use skeletons as decorative placeholders",
          description:
            "Skeletons signal loading, showing them in empty states misleads users into thinking content is on the way.",
          tone: "dont",
          markup: `<div class="portal-demo-stack">
            <sgds-skeleton width="100%" height="80px" rows="3" sheen></sgds-skeleton>
            <p>No results found.</p>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / skeleton",
        rows: [
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the skeleton" },
          { category: "Border", name: "border-radius-sm", value: "sgds/border-radius/sm", mapKey: "border-radius", usage: "Corner radius of the skeleton; corner radius of the div" },
          { category: "Colour", name: "bg-translucent", value: "sgds/bg-translucent", usage: "Background colour of the div; text colour of the sheen" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Value of the skeleton" },
        ],
      },
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
        title: "Show work in progress",
        description: "Use a spinner to show that the system is processing a request.",
      },
      {
        title: "Handle unknown duration",
        description: "Spinners fit waits where progress cannot be measured precisely.",
      },
      {
        title: "Place feedback near the action",
        description: "Show the spinner near the control or area that started loading.",
      },
    ],
    anatomyMarkup: `<sgds-spinner label="Loading"></sgds-spinner>`,
    anatomyParts: [{ title: "Spinner glyph" }, { title: "Label" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-spinner", targetShadowSelector: ".spinner", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: "sgds-spinner", targetShadowSelector: ".spinner-label", targetX: "right", targetY: "center" },
    ],
    measurements: [
      {
        title: "Spinner structure",
        description: "Spinner structure shows the spinner glyph, label, and the size, gap, and typography tokens used by the component.",
        markup: `<div class="portal-demo-row"><sgds-spinner label="Loading"></sgds-spinner></div>`,
      },
    ],
    configurationDemos: [
      {
        title: "Tone",
        description:
          "The colour tone of the spinner. Pick a tone that contrasts with the surface it sits on.",
        controlLabel: "Spinner tone options",
        defaultValue: "brand",
        options: [
          {
            label: "Brand",
            value: "brand",
            markup: `<div class="portal-demo-row"><sgds-spinner tone="brand"></sgds-spinner></div>`,
            description:
              "Brand-coloured spinner. Default for primary loading states.",
          },
          {
            label: "Neutral",
            value: "neutral",
            markup: `<div class="portal-demo-row"><sgds-spinner tone="neutral"></sgds-spinner></div>`,
            description: "Neutral grey for secondary contexts.",
          },
          {
            label: "Fixed light",
            value: "fixed-light",
            markup: `<div class="portal-demo-row"><sgds-spinner tone="fixed-light"></sgds-spinner></div>`,
            description:
              "Only use on fixed dark, strongly coloured, or photographic backgrounds. It may be hard to see on this page surface because it always stays light.",
          },
          {
            label: "Fixed dark",
            value: "fixed-dark",
            markup: `<div class="portal-demo-row"><sgds-spinner tone="fixed-dark"></sgds-spinner></div>`,
            description:
              "Only use on fixed light backgrounds. It may be hard to see in dark mode because it always stays dark.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Match the spinner scale to the size of the surrounding component or button.",
        controlLabel: "Spinner size options",
        defaultValue: "md",
        options: [
          {
            label: "Extra small",
            value: "xs",
            markup: `<div class="portal-demo-row"><sgds-spinner size="xs"></sgds-spinner></div>`,
            description:
              "Smallest size that fits inline within compact buttons and chips.",
          },
          {
            label: "Small",
            value: "sm",
            markup: `<div class="portal-demo-row"><sgds-spinner size="sm"></sgds-spinner></div>`,
            description: "Small size for inline indicators next to body text.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<div class="portal-demo-row"><sgds-spinner size="md"></sgds-spinner></div>`,
            description: "Default size for most loading states.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<div class="portal-demo-row"><sgds-spinner size="lg"></sgds-spinner></div>`,
            description: "Large size for prominent in-page loading.",
          },
        ],
      },
      {
        title: "Label",
        description:
          "Optional text label that accompanies the spinner to describe the action being performed.",
        controlLabel: "Spinner label options",
        defaultValue: "with-label",
        options: [
          {
            label: "No label",
            value: "no-label",
            markup: `<div class="portal-demo-row"><sgds-spinner></sgds-spinner></div>`,
            description:
              "Spinner only. Use when the surrounding UI already explains the action.",
          },
          {
            label: "Label",
            value: "with-label",
            markup: `<div class="portal-demo-row"><sgds-spinner label="Loading"></sgds-spinner></div>`,
            description:
              "Adds a descriptive label so users know what is being loaded.",
          },
        ],
      },
  {
        title: "Orientation",
        description:
          "Spinner orientation controls whether the label sits beside or below the spinner.",
        controlLabel: "Spinner orientation options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-spinner label="Loading" orientation="horizontal"></sgds-spinner>`,
            description:
              "Use horizontal orientation when space allows the label to sit beside the spinner.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-spinner label="Loading" orientation="vertical"></sgds-spinner>`,
            description:
              "Use vertical orientation in centred loading states or narrow containers.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a spinner for short, indeterminate waits",
          description:
            "Spinners suit brief, unmeasurable waits like fetching data. For longer or measurable progress, use a bar.",
          tone: "do",
          markup: `<div class="portal-demo-row"><sgds-spinner label="Loading"></sgds-spinner></div>`,
        },
        {
          title: "Do not use a spinner for measurable progress",
          description:
            "If you can show what proportion is done, uploading a known file size, a progress bar gives better feedback.",
          tone: "dont",
          markup: `<div class="portal-demo-row"><sgds-spinner label="Uploading 3 of 10 files"></sgds-spinner></div>`,
        },
        {
          title: "Pair the spinner with a label when context helps",
          description:
            "Add a label so users know what is loading. Without context, a spinner only says that something is happening, not what.",
          tone: "do",
          markup: `<div class="portal-demo-row"><sgds-spinner label="Submitting application"></sgds-spinner></div>`,
        },
        {
          title: "Do not leave a spinner running with no resolution",
          description:
            "If the operation fails or stalls, replace the spinner with a clear error message and a way to retry.",
          tone: "dont",
          markup: `<div class="portal-demo-row"><sgds-spinner label="Loading"></sgds-spinner></div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / spinner",
        rows: [
          { category: "Gap", name: "gap-2-xs", value: "sgds/gap/2-xs", usage: "Spacing between items of the spinner wrapper" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of the spinner label" },
          { category: "Size", name: "dimension-16", value: "sgds/dimension/16", mapKey: "dimension", variant: "xs", usage: "Height of the spinner; width of the spinner" },
          { category: "Size", name: "dimension-24", value: "sgds/dimension/24", mapKey: "dimension", variant: "sm", usage: "Height of the spinner; width of the spinner" },
          { category: "Size", name: "dimension-32", value: "sgds/dimension/32", mapKey: "dimension", variant: "md", usage: "Height of the spinner; width of the spinner" },
          { category: "Size", name: "dimension-48", value: "sgds/dimension/48", mapKey: "dimension", variant: "lg", usage: "Height of the spinner; width of the spinner" },
          { category: "Size", name: "dimension-64", value: "sgds/dimension/64", mapKey: "dimension", variant: "xl", usage: "Height of the spinner; width of the spinner" },
          { category: "Colour", name: "bg-translucent", value: "sgds/bg-translucent", usage: "Border of the spinner" },
          { category: "Colour", name: "neutral-color-default", value: "sgds/neutral/color/default", usage: "Text colour of the spinner label" },
          { category: "Colour", name: "neutral-surface-default", value: "sgds/neutral/surface/default", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "primary-surface-default", value: "sgds/primary/surface/default", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "surface-default", value: "sgds/surface-default", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "surface-fixed-dark", value: "sgds/surface-fixed-dark", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "surface-fixed-light", value: "sgds/surface-fixed-light", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "surface-inverse", value: "sgds/surface-inverse", usage: "Background colour of items inside the component" },
          { category: "Colour", name: "spinner-bg", value: "sgds/spinner-bg", usage: "Right border of the spinner" },
          { category: "Colour", name: "spinner-color", value: "sgds/spinner-color", usage: "Text colour of the spinner" },
        ],
      },
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
        title: "Show process progress",
        description: "Steppers show where users are in a multi-step form or workflow.",
      },
      {
        title: "Support review",
        description: "Completed steps can stay available for checking or correcting earlier inputs.",
      },
      {
        title: "Set expectations",
        description: "Showing the steps helps users understand the length of the process.",
      },
    ],
    anatomyParts: [
      { title: "Step indicator" },
      { title: "Label" },
      { title: "Slot (optional)" },
      { title: "Connection line" },
    ],
    anatomyPreviewMarkup: `<div class="portal-demo-stepper sgds:flex sgds:w-[var(--sgds-dimension-480)] sgds:max-w-full sgds:flex-col">
      <sgds-stepper class="portal-anatomy-stepper" data-portal-stepper="default"></sgds-stepper>
    </div>`,
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: ".portal-anatomy-stepper", targetShadowSelector: ".stepper-item-container:first-child .stepper-marker", targetX: "center", targetY: "top" },
      { number: 2, direction: "left", targetSelector: ".portal-anatomy-stepper", targetShadowSelector: ".stepper-item-container:first-child .portal-anatomy-stepper-label", targetX: "left", targetY: "center" },
      { number: 3, direction: "bottom", targetSelector: ".portal-anatomy-stepper", targetShadowSelector: ".stepper-item-container:first-child .portal-anatomy-stepper-slot", targetX: "center", targetY: "bottom" },
      { number: 4, direction: "top", targetSelector: ".portal-anatomy-stepper", targetShadowSelector: ".stepper-item-container:nth-child(2) .stepper-item", targetX: "left", targetY: "top", targetXOffset: -30, targetYOffset: 15 },
    ],
    configurationDemos: [
      {
        title: "Orientation",
        description:
          "Steppers can be laid out horizontally or vertically depending on the surrounding layout.",
        controlLabel: "Stepper orientation options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" orientation="horizontal"></sgds-stepper>
        </div>`,
            description:
              "Steps run left to right, best for top-of-page progress trackers.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" orientation="vertical"></sgds-stepper>
        </div>`,
            description:
              "Steps stack top to bottom, best for sidebars and narrow layouts.",
          },
        ],
      },
      {
        title: "Active step",
        description:
          "Sets the current step. Use to communicate the user's position within a multi-step process.",
        controlLabel: "Stepper active step options",
        defaultValue: "step-1",
        options: [
          {
            label: "First step",
            value: "step-0",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" activeStep="0"></sgds-stepper>
        </div>`,
            description: "Process has just started.",
          },
          {
            label: "Middle step",
            value: "step-1",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" activeStep="1"></sgds-stepper>
        </div>`,
            description: "Active state on a step in the middle of the flow.",
          },
          {
            label: "Final step",
            value: "step-2",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" activeStep="2"></sgds-stepper>
        </div>`,
            description:
              "Use when the user has reached the last step in the process.",
          },
        ],
      },
      {
        title: "Clickable steps",
        description:
          "Completed steps can be clickable so users can go back to earlier parts of the flow.",
        controlLabel: "Stepper clickable options",
        defaultValue: "static",
        options: [
          {
            label: "Static",
            value: "static",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" activeStep="2"></sgds-stepper>
        </div>`,
            description:
              "Use when users should move through the process using separate next or previous controls.",
          },
          {
            label: "Clickable",
            value: "clickable",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" activeStep="2" clickable></sgds-stepper>
        </div>`,
            description:
              "Allows completed steps to be selected, so users can return to earlier steps.",
          },
        ],
      },
      {
        title: "Markers",
        description:
          "Stepper markers can use numbers or icons based on the step metadata.",
        controlLabel: "Stepper marker options",
        defaultValue: "numbered",
        options: [
          {
            label: "Numbered",
            value: "numbered",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="default" activeStep="1"></sgds-stepper>
        </div>`,
            description:
              "Numbered markers show the position of each step in the sequence.",
          },
          {
            label: "Icons",
            value: "icons",
            markup: `<div class="portal-demo-stepper">
          <sgds-stepper data-portal-stepper="icons" activeStep="1"></sgds-stepper>
        </div>`,
            description: "Icon markers use the `iconName` value in each step.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a stepper for sequential, multi-step processes",
          description:
            "Steppers suit linear flows like application forms or sign-ups where each step depends on the previous one.",
          tone: "do",
          markup: `<div class="portal-demo-stepper sgds:flex sgds:flex-col sgds:gap-md">
            <sgds-stepper data-portal-stepper="default" activeStep="1"></sgds-stepper>
            <div class="sgds:flex sgds:flex-col sgds:gap-xs sgds:rounded-md sgds:border sgds:border-muted sgds:bg-surface-default sgds:p-md">
              <span class="sgds:text-subtitle-sm sgds:font-semibold">Review details</span>
              <div class="sgds:flex sgds:justify-between sgds:gap-sm">
                <sgds-button variant="outline" size="sm">Back</sgds-button>
                <sgds-button size="sm">Continue</sgds-button>
              </div>
            </div>
          </div>`,
        },
        {
          title: "Do not use a stepper for parallel views",
          description:
            "If users can visit sections in any order, use tabs or sidenav. A stepper implies progress through a workflow.",
          tone: "dont",
          markup: `<div class="portal-demo-stepper sgds:flex sgds:flex-col sgds:gap-md">
            <sgds-stepper data-portal-stepper="default" activeStep="0"></sgds-stepper>
            <div class="sgds:grid sgds:grid-cols-3 sgds:gap-2-xs sgds:text-center">
              <span class="sgds:rounded-sm sgds:bg-surface-default sgds:px-2-xs sgds:py-2-xs sgds:text-body-sm">Overview</span>
              <span class="sgds:rounded-sm sgds:bg-surface-default sgds:px-2-xs sgds:py-2-xs sgds:text-body-sm">Documents</span>
              <span class="sgds:rounded-sm sgds:bg-surface-default sgds:px-2-xs sgds:py-2-xs sgds:text-body-sm">Status</span>
            </div>
          </div>`,
        },
        {
          title: "Show all steps upfront",
          description:
            "Reveal the full set of steps from the start so users can estimate effort and decide whether to begin.",
          tone: "do",
          markup: `<div class="portal-demo-stepper sgds:flex sgds:flex-col sgds:gap-md">
            <sgds-stepper data-portal-stepper="default" activeStep="0"></sgds-stepper>
            <div class="sgds:rounded-md sgds:border sgds:border-muted sgds:bg-surface-default sgds:p-md sgds:text-body-sm">
              Step 1 of 3: Start the application
            </div>
          </div>`,
        },
        {
          title: "Do not pile on too many steps",
          description:
            "Long steppers reduce completion. Group related steps into phases or use progressive disclosure.",
          tone: "dont",
          markup: `<div class="portal-demo-stepper sgds:flex sgds:flex-col sgds:gap-md">
            <sgds-stepper data-portal-stepper="long" activeStep="4"></sgds-stepper>
            <div class="sgds:rounded-md sgds:border sgds:border-muted sgds:bg-surface-default sgds:p-md sgds:text-body-sm">
              Eight crowded steps make progress hard to scan.
            </div>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / stepper",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/2-xs", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/2-xs", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-xl", value: "sgds/padding/xl", usage: "Outer spacing of the stepper item" },
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the stepper item" },
          { category: "Border", name: "border-color-translucent", value: "sgds/border-color-translucent", usage: "Background colour of the stepper item" },
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the stepper marker; border colour of the stepper marker on hover" },
          { category: "Border", name: "border-width-2", value: "sgds/border-width/2", usage: "Border of the stepper marker" },
          { category: "Border", name: "primary-border-color-default", value: "sgds/primary/border-color/default", usage: "Background colour of the stepper item; border of the stepper marker" },
          { category: "Size", name: "dimension-128", value: "sgds/dimension/128", usage: "Maximum width of the stepper detail" },
          { category: "Size", name: "dimension-2", value: "sgds/dimension/2", usage: "Height of the stepper item; width of the stepper item" },
          { category: "Size", name: "dimension-32", value: "sgds/dimension/32", usage: "Width of the stepper item; height of the stepper item" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the completed step marker icon" },
          { category: "Colour", name: "bg-translucent", value: "sgds/bg-translucent", usage: "Background colour of the stepper item; background colour of the stepper marker" },
          { category: "Colour", name: "bg-transparent", value: "sgds/bg-transparent", usage: "Background colour of the stepper marker" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the stepper marker" },
          { category: "Colour", name: "color-fixed-light", value: "sgds/color-fixed-light", usage: "Text colour of the stepper marker on hover; text colour of the stepper marker" },
          { category: "Colour", name: "color-subtle", value: "sgds/color-subtle", usage: "Text colour of the stepper detail" },
          { category: "Colour", name: "primary-color-default", value: "sgds/primary/color/default", usage: "Text colour of the stepper detail; text colour of the stepper marker" },
          { category: "Colour", name: "primary-color-emphasis", value: "sgds/primary/color/emphasis", usage: "Text colour of the stepper detail on hover" },
          { category: "Colour", name: "primary-surface-default", value: "sgds/primary/surface/default", usage: "Background colour of the stepper marker" },
          { category: "Colour", name: "primary-surface-emphasis", value: "sgds/primary/surface/emphasis", usage: "Background colour of the stepper marker on hover" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the stepper item when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the stepper item when keyboard-focused" },
        ],
      },
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
        title: "Move within a section",
        description: "Use subnav for closely related pages under the same main area.",
      },
      {
        title: "Show related pages",
        description: "Visible links help users understand what the section contains.",
      },
      {
        title: "Mark the active page",
        description: "The active state keeps users oriented within the section.",
      },
    ],
    anatomyParts: [
      { title: "Header", note: "(optional)" },
      { title: "Sub nav menu" },
      { title: "Call to action", note: "(optional)" },
      { title: "Container" },
    ],
    anatomyMarkup: `<div class="sgds:w-[var(--sgds-dimension-688)] sgds:max-w-full">
      <sgds-subnav class="portal-anatomy-subnav">
        <h5 slot="header">Header</h5>
        <sgds-button slot="actions" size="sm">Register</sgds-button>
        <sgds-button slot="actions" size="sm">Exhibit</sgds-button>
        <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
        <sgds-subnav-item disabled><a href="#">On-site Activities</a></sgds-subnav-item>
        <sgds-subnav-item><a href="#">Programme</a></sgds-subnav-item>
        <sgds-subnav-item><a href="#">Speakers</a></sgds-subnav-item>
      </sgds-subnav>
    </div>`,
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "[slot='header']", targetX: "center", targetY: "top" },
      { number: 2, direction: "bottom", targetSelector: "sgds-subnav-item[active]", targetX: "center", targetY: "bottom" },
      { number: 3, direction: "top", targetSelector: "[slot='actions']", targetX: "center", targetY: "top" },
      { number: 4, direction: "bottom", targetSelector: ".portal-anatomy-subnav", targetShadowSelector: ".subnav", targetX: "center", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Item active state",
        description:
          "Mark the current sub-section with active so users can orient themselves within the page.",
        controlLabel: "Subnav active item options",
        defaultValue: "with-active",
        options: [
          {
            label: "No active item",
            value: "no-active",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Project Apollo</span>
            <sgds-subnav-item>Overview</sgds-subnav-item>
            <sgds-subnav-item>Tasks</sgds-subnav-item>
            <sgds-subnav-item>Members</sgds-subnav-item>
          </sgds-subnav>
        </div>`,
            description:
              "Use when the subnav lands on a generic landing tab without a default selection.",
          },
          {
            label: "With active item",
            value: "with-active",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Project Apollo</span>
            <sgds-subnav-item active>Overview</sgds-subnav-item>
            <sgds-subnav-item>Tasks</sgds-subnav-item>
            <sgds-subnav-item>Members</sgds-subnav-item>
          </sgds-subnav>
        </div>`,
            description:
              "Highlights the current sub-page so users always know which view they are on.",
          },
        ],
      },
      {
        title: "Header content",
        description:
          "Use the header slot to label the section the subnav belongs to.",
        controlLabel: "Subnav header options",
        defaultValue: "with-header",
        options: [
          {
            label: "No header",
            value: "without-header",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <sgds-subnav-item active>Overview</sgds-subnav-item>
            <sgds-subnav-item>Tasks</sgds-subnav-item>
            <sgds-subnav-item>Members</sgds-subnav-item>
          </sgds-subnav>
        </div>`,
            description:
              "Use when the surrounding page already provides enough context.",
          },
          {
            label: "With header",
            value: "with-header",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Project Apollo</span>
            <sgds-subnav-item active>Overview</sgds-subnav-item>
            <sgds-subnav-item>Tasks</sgds-subnav-item>
            <sgds-subnav-item>Members</sgds-subnav-item>
          </sgds-subnav>
        </div>`,
            description:
              "Recommended for record-level subnavs so the entity is always visible while users navigate tabs.",
          },
        ],
      },
      {
        title: "Contextual actions",
        description:
          "Use the actions slot to surface buttons or controls scoped to the current section.",
        controlLabel: "Subnav actions options",
        defaultValue: "with-actions",
        options: [
          {
            label: "No actions",
            value: "without-actions",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Project Apollo</span>
            <sgds-subnav-item active>Overview</sgds-subnav-item>
            <sgds-subnav-item>Tasks</sgds-subnav-item>
          </sgds-subnav>
        </div>`,
            description:
              "Pure navigation. Use when the page surfaces actions in its body content instead.",
          },
          {
            label: "With actions",
            value: "with-actions",
            markup: `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Project Apollo</span>
            <sgds-subnav-item active>Overview</sgds-subnav-item>
            <sgds-subnav-item>Tasks</sgds-subnav-item>
            <div slot="actions">
              <sgds-button size="sm" variant="outline">Share</sgds-button>
              <sgds-button size="sm" variant="primary">New task</sgds-button>
            </div>
          </sgds-subnav>
        </div>`,
            description:
              "Pin section-specific actions like Share or New task next to the navigation tabs.",
          },
        ],
      },
  {
        title: "Disabled item",
        description:
          "Subnav items can be disabled when a section is visible but unavailable.",
        controlLabel: "Subnav disabled options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-subnav>
              <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
              <sgds-subnav-item><a href="#">Details</a></sgds-subnav-item>
            </sgds-subnav>`,
            description: "Use default items for available sections.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-subnav>
              <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
              <sgds-subnav-item disabled><a href="#">Details</a></sgds-subnav-item>
            </sgds-subnav>`,
            description:
              "Use disabled only when the unavailable section needs to remain visible.",
          },
        ],
      },
    ],
    measurements: [
      demo(
        "Structure",
        "Subnav structure highlights the header, navigation items, action, and the padding/gap tokens applied to each region.",
        `<div class="portal-demo-nav">
          <sgds-subnav>
            <h5 slot="header">Header</h5>
            <sgds-button slot="actions" size="sm" variant="primary">Manage</sgds-button>
            <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">History</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">Settings</a></sgds-subnav-item>
          </sgds-subnav>
        </div>`,
      ),
    ],
    demos: [
      demo(
        "Default",
        "Use subnav for local, section-level navigation that complements the primary navigation.",
        `<div class="portal-demo-nav">
          <sgds-subnav>
            <span slot="header">Applications</span>
            <sgds-button slot="actions" size="sm" variant="ghost">Manage</sgds-button>
            <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">History</a></sgds-subnav-item>
            <sgds-subnav-item><a href="#">Settings</a></sgds-subnav-item>
          </sgds-subnav>
        </div>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use subnav for record-level or section-scoped tabs",
          description:
            "Subnav suits pages where one entity has several views, such as overview, tasks, and members. Keep cross-service nav in mainnav.",
          tone: "do",
          markup: `<div class="portal-demo-nav">
            <sgds-subnav>
              <span slot="header">Project Apollo</span>
              <sgds-subnav-item active>Overview</sgds-subnav-item>
              <sgds-subnav-item>Tasks</sgds-subnav-item>
              <sgds-subnav-item>Members</sgds-subnav-item>
              <sgds-subnav-item>Settings</sgds-subnav-item>
            </sgds-subnav>
          </div>`,
        },
        {
          title: "Do not duplicate the mainnav inside a subnav",
          description:
            "Subnav is for moving within a section. Repeating top-level destinations dilutes the primary navigation.",
          tone: "dont",
          markup: `<div class="portal-demo-nav">
            <sgds-subnav>
              <sgds-subnav-item>Home</sgds-subnav-item>
              <sgds-subnav-item>Services</sgds-subnav-item>
              <sgds-subnav-item>About</sgds-subnav-item>
              <sgds-subnav-item>Contact</sgds-subnav-item>
            </sgds-subnav>
          </div>`,
        },
        {
          title: "Use the actions slot for section-scoped controls only",
          description:
            "Place buttons that act on the current section here. Avoid global controls unrelated to the sub-page.",
          tone: "do",
          markup: `<div class="portal-demo-nav">
            <sgds-subnav>
              <span slot="header">Project Apollo</span>
              <sgds-subnav-item active>Tasks</sgds-subnav-item>
              <sgds-subnav-item>Members</sgds-subnav-item>
              <div slot="actions">
                <sgds-button size="sm" variant="outline">Share</sgds-button>
                <sgds-button size="sm" variant="primary">New task</sgds-button>
              </div>
            </sgds-subnav>
          </div>`,
        },
        {
          title: "Do not stack multiple subnavs on the same page",
          description:
            "Each page should have at most one subnav. Stacking two creates competing wayfinding and confuses users.",
          tone: "dont",
          markup: `<div class="portal-demo-nav">
            <sgds-subnav>
              <span slot="header">Project Apollo</span>
              <sgds-subnav-item active>Tasks</sgds-subnav-item>
              <sgds-subnav-item>Members</sgds-subnav-item>
            </sgds-subnav>
            <sgds-subnav>
              <sgds-subnav-item active>Open</sgds-subnav-item>
              <sgds-subnav-item>Closed</sgds-subnav-item>
              <sgds-subnav-item>Drafts</sgds-subnav-item>
            </sgds-subnav>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / subnav",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/lg", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/sm", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-2-xl", value: "sgds/padding/2-xl", usage: "Padding of the header container; padding of the subnav actions" },
          { category: "Padding", name: "padding-md", value: "sgds/padding/md", usage: "Padding of the header container; padding of the subnav actions" },
          { category: "Padding", name: "padding-none", value: "sgds/padding/none", usage: "Padding of the content; top padding of the content" },
          { category: "Gap", name: "gap-lg", value: "sgds/gap/lg", usage: "Spacing between items of the subnav nav" },
          { category: "Gap", name: "gap-md", value: "sgds/gap/md", usage: "Spacing between items of the header container; spacing between items of the subnav actions" },
          { category: "Gap", name: "gap-none", value: "sgds/gap/none", usage: "Spacing between items of the subnav; spacing between items of the subnav nav group" },
          { category: "Gap", name: "gap-xl", value: "sgds/gap/xl", usage: "Spacing between items of the subnav; spacing between items of the subnav nav group" },
          { category: "Margin", name: "margin-none", value: "sgds/margin/none", usage: "Value of the content" },
          { category: "Border", name: "border-color-muted", value: "sgds/border-color-muted", usage: "Bottom border of the nav; bottom border of the subnav" },
          { category: "Border", name: "border-width-0", value: "sgds/border-width/0", usage: "Border reset for inactive subnav content" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", usage: "Bottom border of the nav; bottom border of the subnav" },
          { category: "Border", name: "border-width-2", value: "sgds/border-width/2", usage: "Bottom border of the content when active; bottom border of the content" },
          { category: "Border", name: "primary-border-color-default", value: "sgds/primary/border-color/default", usage: "Bottom border of the content when active" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of the content" },
          { category: "Margin", name: "margin-xs", value: "sgds/margin/xs", usage: "Spacing around subnav item content" },
          { category: "Size", name: "icon-size-lg", value: "sgds/icon-size/lg", usage: "Size of the mobile subnav toggler icon" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Height of the content; width of the content" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the content when active" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Text colour of the content; text colour of the content on hover and when disabled" },
          { category: "Colour", name: "primary-color-default", value: "sgds/primary/color/default", usage: "Text colour of the content when active; text colour of the content on hover" },
          { category: "Colour", name: "surface-raised", value: "sgds/surface-raised", usage: "Background colour of the nav; background colour of the subnav nav" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the content when keyboard-focused; focus outline of the subnav toggler when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the content when keyboard-focused; focus-outline offset of the subnav toggler when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the content when disabled" },
          { category: "Layer", name: "z-index-sticky", value: "sgds/z-index-sticky", usage: "Stacking layer of items inside the component" },
        ],
      },
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
        title: "Toggle a setting",
        description: "Use switches for binary settings such as on or off.",
      },
      {
        title: "Apply changes on toggle",
        description: "A switch takes effect when users change it.",
      },
      {
        title: "Show the current state",
        description: "The thumb position and colour help users see whether the setting is on or off.",
      },
    ],
    anatomyParts: [{ title: "Switch" }, { title: "Label" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-switch", targetShadowSelector: "input.form-check-input", targetX: "left", targetY: "center" },
      { number: 2, direction: "right", targetSelector: "sgds-switch", targetShadowSelector: "label.form-check-label:not(.d-none)", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Checked",
        description:
          "The switch reflects its on or off state visually and applies the change immediately.",
        controlLabel: "Switch checked options",
        defaultValue: "checked",
        options: [
          {
            label: "Unchecked",
            value: "unchecked",
            markup: `<sgds-switch>Enable notifications</sgds-switch>`,
            description:
              "The default off state. Use when the setting is currently `disabled`.",
          },
          {
            label: "Checked",
            value: "checked",
            markup: `<sgds-switch checked>Enable notifications</sgds-switch>`,
            description:
              "Renders the switch in its active on state. Use when a setting should take effect immediately without a separate save action.",
          },
        ],
      },
      {
        title: "Size",
        description:
          "Switch sizes let you match the toggle to the density of the surrounding layout.",
        controlLabel: "Switch size options",
        defaultValue: "sm",
        options: [
          {
            label: "Small",
            value: "sm",
            markup: `<sgds-switch checked size="sm">Enable notifications</sgds-switch>`,
            description:
              "The default size. Use in most form layouts and settings panels.",
          },
          {
            label: "Medium",
            value: "md",
            markup: `<sgds-switch checked size="md">Enable notifications</sgds-switch>`,
            description:
              "Use when the toggle needs slightly more visual weight, such as in feature cards.",
          },
          {
            label: "Large",
            value: "lg",
            markup: `<sgds-switch checked size="lg">Enable notifications</sgds-switch>`,
            description:
              "Use for prominent toggles where the switch needs to draw clear attention.",
          },
        ],
      },
      {
        title: "Icon",
        description:
          "An optional icon inside the switch thumb reinforces the on or off state.",
        controlLabel: "Switch icon options",
        defaultValue: "no-icon",
        options: [
          {
            label: "No icon",
            value: "no-icon",
            markup: `<sgds-switch checked>Enable notifications</sgds-switch>`,
            description:
              "The default. Use when the switch position alone is sufficient to communicate the state.",
          },
          {
            label: "Icon",
            value: "icon",
            markup: `<sgds-switch checked icon>Enable notifications</sgds-switch>`,
            description:
              "Adds a check or cross icon inside the thumb to reinforce the on or off state.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use the `disabled` state to prevent toggling when the setting is not available in the current context.",
        controlLabel: "Switch disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-switch checked>Enable notifications</sgds-switch>`,
            description:
              "The default. Switches are interactive and can be toggled by the user.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-switch checked disabled>Enable notifications</sgds-switch>`,
            description:
              "Use when the setting is temporarily unavailable. Disabled switches appear muted and cannot be focused or toggled.",
          },
        ],
      },
  {
        title: "Label placement",
        description:
          "Switch labels can sit on the default side or in the left label slot depending on the form layout.",
        controlLabel: "Switch label placement options",
        defaultValue: "right",
        options: [
          {
            label: "Right label",
            value: "right",
            markup: `<sgds-switch checked>Receive updates</sgds-switch>`,
            description:
              "Use the default label position for simple stacked forms.",
          },
          {
            label: "Left label",
            value: "left",
            markup: `<sgds-switch checked>
              <span slot="leftLabel">Receive updates</span>
            </sgds-switch>`,
            description:
              "Use the left label slot when the label should precede the control.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a switch for settings that take effect immediately",
          description:
            "Use a switch when toggling should change the system right away, like turning on notifications.",
          tone: "do",
          markup: `<sgds-switch checked>Enable notifications</sgds-switch>`,
        },
        {
          title: "Do not use a switch inside a form that needs Save",
          description:
            "If the change only takes effect after submission, use a checkbox so the convention matches pending-save.",
          tone: "dont",
          markup: `<sgds-switch>Receive monthly newsletter</sgds-switch>`,
        },
        {
          title: "Use a positive, action-led label",
          description:
            "Phrase the label as the on-state behaviour, Enable two-factor authentication, so the result is clear.",
          tone: "do",
          markup: `<sgds-switch checked>Enable two-factor authentication</sgds-switch>`,
        },
        {
          title: "Do not use ambiguous on or off labels",
          description:
            "Avoid labels like On or Yes. The label should describe the setting that the switch controls.",
          tone: "dont",
          markup: `<sgds-switch>On</sgds-switch>`,
        },
        {
          title: "Add the icon prop when the state needs to be unmistakable",
          description:
            "Use the icon prop to show a check or cross inside the thumb when users need a cue beyond colour.",
          tone: "do",
          markup: `<sgds-switch checked icon>Enable dark mode</sgds-switch>`,
        },
        {
          title: "Do not use a switch when there are more than two states",
          description:
            "A switch is binary. For more than two values (Off, Low, High), use radio buttons or a select instead.",
          tone: "dont",
          markup: `<sgds-switch>Notification frequency</sgds-switch>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / switch",
        rows: [
          { category: "Padding", name: "form-padding-inline-sm", value: "sgds/form/padding/inline-sm", usage: "Horizontal padding of the form check input; background-position of the form check input" },
          { category: "Gap", name: "form-gap-lg", value: "sgds/form/gap/lg", usage: "Spacing between items of the form check" },
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the form check input" },
          { category: "Border", name: "form-border-width-default", value: "sgds/form/border-width/default", usage: "Border of the form check input" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", variant: "sm", usage: "Font size of the form check" },
          { category: "Typography", name: "font-size-20", value: "sgds/font-size/20", variant: "lg", usage: "Font size of the form check" },
          { category: "Colour", name: "form-primary-surface-default", value: "sgds/form/primary-surface-default", usage: "Background colour of the form check input" },
          { category: "Colour", name: "form-primary-surface-emphasis", value: "sgds/form/primary-surface-emphasis", usage: "Background colour of the form check input on hover" },
          { category: "Colour", name: "form-surface-emphasis", value: "sgds/form/surface/emphasis", usage: "Background colour of the form check input when keyboard-focused; background colour of the form check input on hover" },
          { category: "Colour", name: "form-surface-subtle", value: "sgds/form/surface/subtle", usage: "Background colour of the form check input" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of the form check input when keyboard-focused" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus-outline offset of the form check input when keyboard-focused" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the form check when disabled" },
          { category: "Border", name: "form-border-radius-full", value: "sgds/form/border-radius/full", usage: "Corner radius of the form check input" },
          { category: "Size", name: "form-height-2-xs", value: "sgds/form/height-2-xs", variant: "sm", usage: "Height of the toggle indicator icon" },
          { category: "Size", name: "form-height-sm", value: "sgds/form/height-sm", variant: "sm", usage: "Height of the form check input" },
          { category: "Size", name: "form-height-md", value: "sgds/form/height-md", variant: "md", usage: "Height of the form check input" },
          { category: "Size", name: "form-height-lg", value: "sgds/form/height-lg", variant: "lg", usage: "Height of the form check input" },
          { category: "Size", name: "form-width-2-xs", value: "sgds/form/width-2-xs", variant: "sm", usage: "Width of the toggle indicator icon" },
          { category: "Size", name: "form-width-md", value: "sgds/form/width-md", variant: "sm", usage: "Width of the form check input" },
          { category: "Size", name: "form-width-xs", value: "sgds/form/width-xs", variant: "md", usage: "Width of the toggle indicator icon" },
          { category: "Size", name: "form-width-xl", value: "sgds/form/width-xl", variant: "md", usage: "Width of the form check input" },
          { category: "Size", name: "form-width-sm", value: "sgds/form/width-sm", variant: "lg", usage: "Width of the toggle indicator icon" },
          { category: "Size", name: "form-width-3-xl", value: "sgds/form/width-3-xl", variant: "lg", usage: "Width of the form check input" },
          { category: "Image", name: "switch-bg-image", value: "sgds/switch-bg-image", usage: "Background-image of the form check input" },
          { category: "Size", name: "switch-height", value: "sgds/switch-height", usage: "Height of the form check input" },
          { category: "Size", name: "switch-width", value: "sgds/switch-width", usage: "Width of the form check input" },
        ],
      },
    ],
  },
  "system-banner": {
    key: "system-banner",
    title: "System banner",
    tag: "sgds-system-banner",
    group: "feedback",
    summary:
      "The system banner component for displaying service-wide messages to users at the application level.",
    purposeCards: [
      {
        title: "Show service-wide messages",
        description: "Use system banners for notices that affect the whole service.",
      },
      {
        title: "Keep messages visible",
        description: "A banner stays in the page flow until the service or user dismisses it.",
      },
      {
        title: "Support multiple notices",
        description: "Use banner items when several service messages need to share the same area.",
      },
    ],
    anatomyMarkup: `<div class="sgds:w-[var(--sgds-dimension-888)]">
      <sgds-system-banner show dismissible fluid noClampAction class="portal-anatomy-system-banner">
      <sgds-system-banner-item>
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        Scheduled maintenance will take place tonight from 10pm to 11pm.
        <sgds-link slot="action" href="#">View details</sgds-link>
      </sgds-system-banner-item>
      <sgds-system-banner-item>
        <sgds-badge slot="badge" variant="accent">Update</sgds-badge>
        New service hours start next Monday.
        <sgds-link slot="action" href="#">Learn more</sgds-link>
      </sgds-system-banner-item>
      </sgds-system-banner>
    </div>`,
    anatomyParts: [
      { title: "Leading icon / Badge", note: "(optional)" },
      { title: "Message" },
      { title: "Action", note: "(optional)" },
      { title: "Pagination", note: "(optional)" },
      { title: "Dismissible - Close button", note: "(optional)" },
      { title: "Container" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "bottom", targetSelector: ".portal-anatomy-system-banner sgds-system-banner-item[active]", targetShadowSelector: ".banner-item", targetX: "left", targetY: "bottom", targetXOffset: 16, stemLengthToken: "--sgds-dimension-32" },
      { number: 2, direction: "bottom", targetSelector: ".portal-anatomy-system-banner sgds-system-banner-item[active]", targetShadowSelector: ".message", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-32" },
      { number: 3, direction: "bottom", targetSelector: ".portal-anatomy-system-banner sgds-system-banner-item[active]", targetShadowSelector: ".action", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-32" },
      { number: 4, direction: "bottom", targetSelector: ".portal-anatomy-system-banner", targetShadowSelector: ".pagination", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-32" },
      { number: 5, direction: "bottom", targetSelector: ".portal-anatomy-system-banner", targetShadowSelector: "sgds-close-button", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-32" },
      { number: 6, direction: "bottom", targetSelector: ".portal-anatomy-system-banner", targetShadowSelector: ".banner", targetX: "center", targetY: "bottom", stemLengthToken: "--sgds-dimension-32" },
    ],
    configurationDemos: [
      {
        title: "Dismissible",
        description:
          "Adds a close button so users can dismiss the banner once they have read it.",
        controlLabel: "System banner dismissible options",
        defaultValue: "not-dismissible",
        options: [
          {
            label: "Not dismissible",
            value: "not-dismissible",
            markup: `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description:
              "Banner stays visible. Use for persistent system-level messages.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<sgds-system-banner show dismissible>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description:
              "Adds a close affordance. Use for time-bound announcements.",
          },
        ],
      },
      {
        title: "Container width",
        description:
          "Constrains the banner to the application max-width or stretches it across the full screen.",
        controlLabel: "System banner container width options",
        defaultValue: "constrained",
        options: [
          {
            label: "Constrained",
            value: "constrained",
            markup: `<div class="portal-system-banner-width-demo sgds:w-full">
          <sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
        </sgds-system-banner>
        </div>`,
            description:
              "Default. Content is constrained to the standard application width.",
          },
          {
            label: "Fluid",
            value: "fluid",
            markup: `<div class="portal-system-banner-width-demo sgds:w-full">
          <sgds-system-banner show fluid>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
        </sgds-system-banner>
        </div>`,
            description:
              "Removes the max-width so the banner stretches to the screen edges.",
          },
        ],
      },
      {
        title: "Action",
        description:
          "Pass an action element such as a link or button into the banner item to deep-link to more details.",
        controlLabel: "System banner action options",
        defaultValue: "with-action",
        options: [
          {
            label: "No action",
            value: "no-action",
            markup: `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description: "Plain message banner with no inline action.",
          },
          {
            label: "Action",
            value: "with-action",
            markup: `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
            <sgds-link slot="action" href="#">Learn more</sgds-link>
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description:
              "Includes an inline action. Use to direct users to status page or details.",
          },
        ],
      },
      {
        title: "Multiple items",
        description:
          "Up to five banner items can cycle automatically every five seconds, with pagination controls.",
        controlLabel: "System banner items options",
        defaultValue: "single",
        options: [
          {
            label: "Single item",
            value: "single",
            markup: `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description: "Only one message, so pagination is hidden.",
          },
          {
            label: "Multiple items",
            value: "multiple",
            markup: `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle"></sgds-icon>
            Scheduled maintenance from 1am to 3am on Sunday.
          </sgds-system-banner-item>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="exclamation-triangle"></sgds-icon>
            A new privacy policy takes effect on 1 May.
          </sgds-system-banner-item>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="check-circle"></sgds-icon>
            Service has been fully restored.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
            description:
              "Multiple items rotate automatically with pagination controls.",
          },
        ],
      },
    ],
    measurements: [
      demo(
        "Structure",
        "System banner structure highlights the icon, message, action, and gaps between them.",
        `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
            Scheduled maintenance will take place tonight from 10pm to 11pm.
            <sgds-link slot="action" href="#">View details</sgds-link>
          </sgds-system-banner-item>
        </sgds-system-banner>`,
      ),
    ],
    demos: [
      demo(
        "Default",
        "Use system banners for application-level messages that must stay prominent.",
        `<sgds-system-banner show>
          <sgds-system-banner-item>
            <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
            Scheduled maintenance will take place tonight from 10pm to 11pm.
          </sgds-system-banner-item>
        </sgds-system-banner>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use system banners for service-wide announcements",
          description:
            "Reserve system banners for service-wide messages. Planned downtime, advisories, or beta indicators.",
          tone: "do",
          markup: `<sgds-system-banner show>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              Scheduled maintenance from 1am to 3am on Sunday.
              <sgds-link slot="action" href="#">View status page</sgds-link>
            </sgds-system-banner-item>
          </sgds-system-banner>`,
        },
        {
          title: "Do not use system banners for page-specific feedback",
          description:
            "Messages tied to a single screen or action belong in an inline alert. The system banner is for the whole app.",
          tone: "dont",
          markup: `<sgds-system-banner show>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="exclamation-triangle"></sgds-icon>
              Complete the highlighted fields before submitting this form.
            </sgds-system-banner-item>
          </sgds-system-banner>`,
        },
        {
          title: "Keep banner copy short and scannable",
          description:
            "Lead with the headline message because users may only glance, then use an action link for more context.",
          tone: "do",
          markup: `<sgds-system-banner show>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              Some services may be slower than usual.
              <sgds-link slot="action" href="#">Learn more</sgds-link>
            </sgds-system-banner-item>
          </sgds-system-banner>`,
        },
        {
          title: "Do not stack many banner items at once",
          description:
            "Items rotate automatically, but too many dilute urgency. Limit to the highest priority and remove stale ones.",
          tone: "dont",
          markup: `<sgds-system-banner show>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              Reminder: tax season starts on 1 March.
            </sgds-system-banner-item>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              New onboarding flow is now live.
            </sgds-system-banner-item>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              We have updated the privacy policy.
            </sgds-system-banner-item>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              Try the new search experience.
            </sgds-system-banner-item>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              Office hours have changed for the festive period.
            </sgds-system-banner-item>
          </sgds-system-banner>`,
        },
        {
          title: "Make time-bound banners dismissible",
          description:
            "Allow users to dismiss informational messages once read. Reserve persistent banners for ongoing system states.",
          tone: "do",
          markup: `<sgds-system-banner show dismissible>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              A new privacy policy takes effect on 1 May.
              <sgds-link slot="action" href="#">Read the policy</sgds-link>
            </sgds-system-banner-item>
          </sgds-system-banner>`,
        },
        {
          title: "Do not use a system banner in place of a toast",
          description:
            "Confirmations like Saved or Sent are short-lived. Show them as a toast, not a system banner.",
          tone: "dont",
          markup: `<sgds-system-banner show>
            <sgds-system-banner-item>
              <sgds-icon slot="icon" name="check-circle"></sgds-icon>
              Your changes have been saved.
            </sgds-system-banner-item>
          </sgds-system-banner>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / system-banner",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/mainnav/mobile-padding-x", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/sm", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-2-xs", value: "sgds/padding/2-xs", usage: "Padding of the banner item" },
          { category: "Gap", name: "gap-2-xs", value: "sgds/gap/2-xs", usage: "Spacing between items of the pagination" },
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the banner item; spacing between items of the banner item message_and action" },
          { category: "Gap", name: "gap-xl", value: "sgds/gap/xl", usage: "Spacing between items of the banner" },
          { category: "Gap", name: "gap-xs", value: "sgds/gap/xs", usage: "Spacing between items of the banner item message_and action" },
          { category: "Margin", name: "margin-2-xl", value: "sgds/margin/2-xl", usage: "Outer spacing of the clamped container" },
          { category: "Typography", name: "font-size-12", value: "sgds/font-size/12", usage: "Font size of the pagination" },
          { category: "Typography", name: "font-size-14", value: "sgds/font-size/14", usage: "Font size of the banner item text" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight of the banner item text" },
          { category: "Typography", name: "letter-spacing-normal", value: "sgds/letter-spacing/normal", usage: "Letter spacing of the banner item text" },
          { category: "Typography", name: "line-height-16", value: "sgds/line-height/16", usage: "Line height of pagination text" },
          { category: "Typography", name: "line-height-20", value: "sgds/line-height/20", usage: "Height of the action" },
          { category: "Size", name: "icon-size-xs", value: "sgds/icon-size/xs", usage: "Size of the banner item icon" },
          { category: "Size", name: "mainnav-max-width", value: "sgds/mainnav/max-width", usage: "Maximum width of the banner container" },
          { category: "Padding", name: "mainnav-padding-x", value: "sgds/mainnav/padding-x", usage: "Desktop horizontal padding of the banner container" },
          { category: "Size", name: "dimension-64", value: "sgds/dimension/64", usage: "Minimum height of the banner" },
          { category: "Size", name: "dimension-872", value: "sgds/dimension/872", usage: "Maximum width of the clamped container" },
          { category: "Colour", name: "color-fixed-light", value: "sgds/color-fixed-light", usage: "Text colour of the content); text colour of the banner item" },
          { category: "Colour", name: "surface-fixed-dark", value: "sgds/surface-fixed-dark", usage: "Background colour of the message; background colour of the banner wrapper" },
        ],
      },
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
        title: "Switch related views",
        description: "Use tabs for sections that share the same context.",
      },
      {
        title: "Show available sections",
        description: "Visible tab labels help users see the views they can open.",
      },
      {
        title: "Keep views in place",
        description: "Tabs change panels while keeping users in the same context.",
      },
    ],
    anatomyMarkup: `<sgds-tab-group variant="underlined" class="portal-anatomy-tab">
          <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">
            <sgds-icon slot="icon" name="house"></sgds-icon>
            <span class="portal-anatomy-tab-label">Overview</span>
          </sgds-tab>
          <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history" ariaLabel="History">History</sgds-tab>
        </sgds-tab-group>`,
    anatomyParts: [
      { title: "Leading icon", note: "(optional)" },
      { title: "Label" },
      { title: "Active indicator" },
      { title: "Divider", note: "(optional)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-tab[active] sgds-icon[slot='icon']", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 2, direction: "top", targetSelector: ".portal-anatomy-tab-label", targetX: "center", targetY: "top", stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "bottom", targetSelector: "sgds-tab[active]", targetX: "center", targetY: "bottom" },
      { number: 4, direction: "bottom", targetSelector: ".portal-anatomy-tab", targetShadowSelector: ".tab-group__nav", targetX: "right", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Tab variants control the visual style of the active tab indicator to suit different surface contexts.",
        controlLabel: "Tab variant options",
        defaultValue: "underlined",
        options: [
          {
            label: "Underlined",
            value: "underlined",
            markup: `<sgds-tab-group variant="underlined">
          <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history" ariaLabel="History">History</sgds-tab>
          <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="details">Details content</sgds-tab-panel>
          <sgds-tab-panel name="history">History content</sgds-tab-panel>
        </sgds-tab-group>`,
            description:
              "The underlined variant marks the active tab with a bottom border. Use as the default tab style in most page and panel contexts.",
          },
          {
            label: "Solid",
            value: "solid",
            markup: `<sgds-tab-group variant="solid">
          <sgds-tab slot="nav" panel="overview2" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details2" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history2" ariaLabel="History">History</sgds-tab>
          <sgds-tab-panel name="overview2">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="details2">Details content</sgds-tab-panel>
          <sgds-tab-panel name="history2">History content</sgds-tab-panel>
        </sgds-tab-group>`,
            description:
              "The solid variant marks the active tab with a filled pill. Use in dense or compact surfaces where a stronger indicator improves visual clarity.",
          },
        ],
      },
      {
        title: "Orientation",
        description:
          "Lay the tab nav horizontally above the panels or vertically beside them.",
        controlLabel: "Tab orientation options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-tab-group orientation="horizontal">
          <sgds-tab slot="nav" panel="ho-overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="ho-details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab-panel name="ho-overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="ho-details">Details content</sgds-tab-panel>
        </sgds-tab-group>`,
            description:
              "Default orientation. Tab nav runs along the top of the panels.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-tab-group orientation="vertical">
          <sgds-tab slot="nav" panel="ve-overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="ve-details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab-panel name="ve-overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="ve-details">Details content</sgds-tab-panel>
        </sgds-tab-group>`,
            description:
              "Tab nav runs down the left of the panels, best for narrow content areas.",
          },
        ],
      },
      {
        title: "Disabled tab",
        description:
          "Disable individual tabs that are not yet available to the user.",
        controlLabel: "Tab disabled options",
        defaultValue: "all-enabled",
        options: [
          {
            label: "All enabled",
            value: "all-enabled",
            markup: `<sgds-tab-group>
          <sgds-tab slot="nav" panel="ae-overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="ae-details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="ae-activity" ariaLabel="Activity">Activity</sgds-tab>
          <sgds-tab-panel name="ae-overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="ae-details">Details content</sgds-tab-panel>
          <sgds-tab-panel name="ae-activity">Activity content</sgds-tab-panel>
        </sgds-tab-group>`,
            description: "All tabs interactive. This is the default state.",
          },
          {
            label: "Disabled tab",
            value: "with-disabled",
            markup: `<sgds-tab-group>
          <sgds-tab slot="nav" panel="dt-overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="dt-details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="dt-activity" disabled ariaLabel="Activity">Activity</sgds-tab>
          <sgds-tab-panel name="dt-overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="dt-details">Details content</sgds-tab-panel>
          <sgds-tab-panel name="dt-activity">Activity content</sgds-tab-panel>
        </sgds-tab-group>`,
            description:
              "Use the `disabled` state for tabs that are temporarily unavailable.",
          },
        ],
      },
  {
        title: "Density",
        description:
          "Tab density adjusts the spacing of tab items for compact or standard layouts.",
        controlLabel: "Tab density options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-tab-group density="default">
              <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
              <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
              <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
              <sgds-tab-panel name="details">Details content</sgds-tab-panel>
            </sgds-tab-group>`,
            description: "Use default density for most tab groups.",
          },
          {
            label: "Compact",
            value: "compact",
            markup: `<sgds-tab-group density="compact">
              <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
              <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
              <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
              <sgds-tab-panel name="details">Details content</sgds-tab-panel>
            </sgds-tab-group>`,
            description:
              "Use compact density when tabs sit in dense product interfaces.",
          },
        ],
      },
    ],
    // Structure-section preview uses a slimmer tab nav without panel content,
    // so the demo focuses on the bordered nav strip + active indicator that the
    // tokens table describes. Width constraint comes from the
    // `.structure-preview-markup > sgds-tab-group` CSS rule in StructureSection.
    measurements: [
      demo(
        "Structure",
        "Tab structure highlights the nav strip, divider, and active-tab indicator.",
        `<sgds-tab-group variant="underlined">
          <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history" ariaLabel="History">History</sgds-tab>
        </sgds-tab-group>`,
      ),
    ],
    demos: [
      demo(
        "Underlined",
        "Use tabs to switch between related views while keeping users in the same context.",
        `<sgds-tab-group variant="underlined">
          <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
          <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
          <sgds-tab slot="nav" panel="history" ariaLabel="History">History</sgds-tab>
          <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
          <sgds-tab-panel name="details">Details content</sgds-tab-panel>
          <sgds-tab-panel name="history">History content</sgds-tab-panel>
        </sgds-tab-group>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use tabs for parallel views of the same content",
          description:
            "Use tabs when each panel shows a different facet of the same object. Overview, details, history.",
          tone: "do",
          markup: `<sgds-tab-group variant="underlined">
            <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
            <sgds-tab slot="nav" panel="details" ariaLabel="Details">Details</sgds-tab>
            <sgds-tab slot="nav" panel="history" ariaLabel="History">History</sgds-tab>
            <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
            <sgds-tab-panel name="details">Details content</sgds-tab-panel>
            <sgds-tab-panel name="history">History content</sgds-tab-panel>
          </sgds-tab-group>`,
        },
        {
          title: "Do not use tabs for sequential steps",
          description:
            "For steps that must be completed in order, use a stepper. Tabs imply any panel can be visited anytime.",
          tone: "dont",
          markup: `<sgds-tab-group variant="underlined">
            <sgds-tab slot="nav" panel="step1" active ariaLabel="Step 1: Personal details">Step 1: Personal details</sgds-tab>
            <sgds-tab slot="nav" panel="step2" ariaLabel="Step 2: Address">Step 2: Address</sgds-tab>
            <sgds-tab slot="nav" panel="step3" ariaLabel="Step 3: Review and submit">Step 3: Review and submit</sgds-tab>
            <sgds-tab-panel name="step1">Personal details form</sgds-tab-panel>
            <sgds-tab-panel name="step2">Address form</sgds-tab-panel>
            <sgds-tab-panel name="step3">Review form</sgds-tab-panel>
          </sgds-tab-group>`,
        },
        {
          title: "Keep tab labels short and parallel",
          description:
            "Use short nouns or noun phrases for each view. Consistent grammar helps users scan the row quickly.",
          tone: "do",
          markup: `<sgds-tab-group variant="underlined">
            <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
            <sgds-tab slot="nav" panel="documents" ariaLabel="Documents">Documents</sgds-tab>
            <sgds-tab slot="nav" panel="activity" ariaLabel="Activity">Activity</sgds-tab>
            <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
            <sgds-tab-panel name="documents">Documents content</sgds-tab-panel>
            <sgds-tab-panel name="activity">Activity content</sgds-tab-panel>
          </sgds-tab-group>`,
        },
        {
          title: "Do not use too many tabs in one group",
          description:
            "Long tab rows wrap or scroll. With more than five tabs, reorganise the content or use sidenav instead.",
          tone: "dont",
          markup: `<sgds-tab-group variant="underlined">
            <sgds-tab slot="nav" panel="t1" active ariaLabel="Overview">Overview</sgds-tab>
            <sgds-tab slot="nav" panel="t2" ariaLabel="Profile">Profile</sgds-tab>
            <sgds-tab slot="nav" panel="t3" ariaLabel="Activity">Activity</sgds-tab>
            <sgds-tab slot="nav" panel="t4" ariaLabel="Documents">Documents</sgds-tab>
            <sgds-tab slot="nav" panel="t5" ariaLabel="Notifications">Notifications</sgds-tab>
            <sgds-tab slot="nav" panel="t6" ariaLabel="Permissions">Permissions</sgds-tab>
            <sgds-tab slot="nav" panel="t7" ariaLabel="Audit log">Audit log</sgds-tab>
            <sgds-tab slot="nav" panel="t8" ariaLabel="Billing">Billing</sgds-tab>
            <sgds-tab slot="nav" panel="t9" ariaLabel="Settings">Settings</sgds-tab>
            <sgds-tab-panel name="t1">Overview</sgds-tab-panel>
            <sgds-tab-panel name="t2">Profile</sgds-tab-panel>
            <sgds-tab-panel name="t3">Activity</sgds-tab-panel>
            <sgds-tab-panel name="t4">Documents</sgds-tab-panel>
            <sgds-tab-panel name="t5">Notifications</sgds-tab-panel>
            <sgds-tab-panel name="t6">Permissions</sgds-tab-panel>
            <sgds-tab-panel name="t7">Audit log</sgds-tab-panel>
            <sgds-tab-panel name="t8">Billing</sgds-tab-panel>
            <sgds-tab-panel name="t9">Settings</sgds-tab-panel>
          </sgds-tab-group>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / tab",
        // Rows are tagged with `variant` so the structure section can show a
        // segmented control inside the demo box that switches both the rendered
        // tab variant and the visible token rows. Ordered so the first detected
        // variant ("Underlined") matches the demo's default state.
        // `name` is a role-based label rendered as the coloured semibold tag
        // in the inspect popup (e.g. "nav-content-gap", "active-indicator-width").
        // `value` is the actual SGDS global token the tab consumes — that's
        // what the table's "Token" column shows. `mapKey` stays as the role
        // key so the structure section targets the right rect for highlights.
        rows: [
          { category: "Gap", name: "nav-content-gap", value: "sgds/gap/xl", mapKey: "nav-content-gap", usage: "Vertical spacing between the tab nav strip and the panel content below it" },
          { category: "Border", name: "nav-divider-width", value: "sgds/border-width/1", mapKey: "nav-divider-width", variant: "Underlined", usage: "Thickness of the divider rule under the nav strip" },
          { category: "Border", name: "active-indicator-width", value: "sgds/border-width/4", mapKey: "active-indicator-width", variant: "Underlined", usage: "Thickness of the active-tab indicator (the underline beneath the selected tab)" },
          { category: "Border", name: "nav-divider-color", value: "sgds/border-color-muted", variant: "Underlined", usage: "Colour of the divider rule under the nav strip" },
          { category: "Colour", name: "color-active", value: "sgds/primary/color/default", variant: "Underlined", usage: "Text colour of the active tab" },
          { category: "Gap", name: "nav-tab-gap", value: "sgds/gap/xs", mapKey: "nav-tab-gap", variant: "Solid", usage: "Horizontal spacing between adjacent tabs" },
          { category: "Border", name: "tab-border-radius", value: "sgds/border-radius/md", mapKey: "tab-border-radius", variant: "Solid", usage: "Corner radius of each tab pill" },
          { category: "Colour", name: "color-active-solid", value: "sgds/color-fixed-light", variant: "Solid", usage: "Text colour of the active tab" },
          { category: "Colour", name: "tab-bg", value: "sgds/bg-translucent-subtle", variant: "Solid", usage: "Background of inactive tabs" },
          { category: "Colour", name: "tab-bg-hover", value: "sgds/bg-translucent", variant: "Solid", usage: "Background of tabs on hover and focus" },
          { category: "Colour", name: "active-bg", value: "sgds/primary/surface/default", variant: "Solid", usage: "Background of the active tab" },
          { category: "Typography", name: "font-size", value: "sgds/font-size/14", usage: "Font size of the tab label (compact density)" },
          { category: "Size", name: "spacer-3", value: "sgds/spacer/3", usage: "Compact vertical padding of the tab label" },
          { category: "Size", name: "spacer-4", value: "sgds/spacer/4", usage: "Default tab spacing" },
          { category: "Size", name: "spacer-5", value: "sgds/spacer/5", usage: "Large tab spacing" },
          { category: "Colour", name: "color-default", value: "sgds/color-default", usage: "Default text colour of an inactive tab" },
          { category: "Outline", name: "outline-focus", value: "sgds/outline-focus", usage: "Focus outline of tab controls" },
          { category: "Outline", name: "outline-offset-focus", value: "sgds/outline-offset-focus", usage: "Focus outline offset of tab controls" },
          { category: "Opacity", name: "disabled-opacity", value: "sgds/opacity/50", usage: "Opacity applied to disabled tabs" },
        ],
      },
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
        title: "Compare structured data",
        description: "Use tables when each record shares the same fields.",
      },
      {
        title: "Handle dense records",
        description: "Rows and columns give repeated information a predictable position.",
      },
      {
        title: "Support row actions",
        description: "Tables can include selection, sorting, filtering, and actions where needed.",
      },
    ],
    anatomyMarkup: `<sgds-table tableBorder headerBackground rowHeader='["Service","Owner","Status"]' tableData='[["Citizen portal","GovTech","Live"],["Booking system","NLB","Beta"]]'></sgds-table>`,
    anatomyParts: [
      { title: "Header row" },
      { title: "Data row" },
      { title: "Data cell" },
      { title: "Border", note: "(optional)" },
      { title: "Header cell" },
      { title: "Header background", note: "(optional)" },
      { title: "Row divider", note: "(bottom)" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-table", targetShadowSelector: "table.table thead tr", targetX: "left", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "sgds-table", targetShadowSelector: "table.table tbody tr:first-child", targetX: "left", targetY: "center" },
      { number: 3, direction: "left", targetSelector: "sgds-table", targetShadowSelector: "table.table tbody tr:nth-child(2) td:first-child", targetX: "left", targetY: "center" },
      { number: 4, direction: "top", targetSelector: "sgds-table", targetShadowSelector: "table.table", targetX: "center", targetY: "top", targetXOffset: -100 },
      { number: 5, direction: "top", targetSelector: "sgds-table", targetShadowSelector: "table.table thead th:nth-child(2)", targetX: "center", targetY: "top" },
      { number: 6, direction: "right", targetSelector: "sgds-table", targetShadowSelector: "table.table thead", targetX: "right", targetY: "center" },
      { number: 7, direction: "right", targetSelector: "sgds-table", targetShadowSelector: "table.table tbody tr:first-child", targetX: "right", targetY: "bottom" },
    ],
    configurationDemos: [
      {
        title: "Header position",
        description:
          "Use `headerPosition` to put headers across the top, down the side, or both.",
        controlLabel: "Table header position options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-table headerPosition="horizontal"
          rowHeader='["Service","Owner","Status"]'
          tableData='[["Citizen portal","GovTech","Live"],["Booking system","NLB","Beta"]]'
        ></sgds-table>`,
            description:
              "Headers across the top. Most common arrangement for tabular data.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-table headerPosition="vertical"
          rowHeader='["Service","Owner","Status"]'
          tableData='[["Citizen portal","GovTech","Live"],["Booking system","NLB","Beta"]]'
        ></sgds-table>`,
            description:
              "Headers down the left side. Helpful when comparing a few items across many attributes.",
          },
          {
            label: "Both",
            value: "both",
            markup: `<sgds-table headerPosition="both"
          rowHeader='["Service","Owner","Status"]'
          tableData='[["Citizen portal","GovTech","Live"],["Booking system","NLB","Beta"]]'
        ></sgds-table>`,
            description:
              "Headers along both axes. Use for cross-tabulated data such as metrics by period.",
          },
        ],
      },
      {
        title: "Header background",
        description:
          "Use `header-background` to apply a tinted fill to the header cells for stronger visual separation from the body.",
        controlLabel: "Table header background options",
        defaultValue: "no-background",
        options: [
          {
            label: "No background",
            value: "no-background",
            markup: `<sgds-table
          rowHeader='["Application ID","Submitted","Status"]'
          tableData='[["APP-0421","12 Mar 2026","In review"],["APP-0422","13 Mar 2026","Approved"]]'
        ></sgds-table>`,
            description:
              "Plain header. Suits tables embedded in low-contrast surfaces.",
          },
          {
            label: "Header background",
            value: "header-background",
            markup: `<sgds-table headerBackground
          rowHeader='["Application ID","Submitted","Status"]'
          tableData='[["APP-0421","12 Mar 2026","In review"],["APP-0422","13 Mar 2026","Approved"]]'
        ></sgds-table>`,
            description:
              "Tinted header band makes column titles easier to scan.",
          },
        ],
      },
      {
        title: "Cell borders",
        description:
          "Use `table-border` to draw borders around every cell for tables with dense numeric data.",
        controlLabel: "Table cell borders options",
        defaultValue: "no-borders",
        options: [
          {
            label: "No cell borders",
            value: "no-borders",
            markup: `<sgds-table
          rowHeader='["Region","Population","Area"]'
          tableData='[["Central","950,000","132.7"],["East","720,000","93.1"]]'
        ></sgds-table>`,
            description:
              "Default borderless cells keep the table light and uncluttered.",
          },
          {
            label: "Cell borders",
            value: "table-border",
            markup: `<sgds-table tableBorder
          rowHeader='["Region","Population","Area"]'
          tableData='[["Central","950,000","132.7"],["East","720,000","93.1"]]'
        ></sgds-table>`,
            description:
              "Borders around every cell aid scanning for tables packed with values.",
          },
        ],
      },
  {
        title: "Responsive",
        description:
          "Responsive tables can change layout at smaller breakpoints.",
        controlLabel: "Table responsive options",
        defaultValue: "responsive",
        options: [
          {
            label: "Responsive",
            value: "responsive",
            markup: `<sgds-table responsive
              rowHeader='["Name","Status","Owner"]'
              tableData='[["Alpha","Active","Team A"],["Beta","Pending","Team B"]]'
            ></sgds-table>`,
            description:
              "Use responsive tables when the table must remain readable on smaller screens.",
          },
          {
            label: "Static",
            value: "static",
            markup: `<sgds-table
              rowHeader='["Name","Status","Owner"]'
              tableData='[["Alpha","Active","Team A"],["Beta","Pending","Team B"]]'
            ></sgds-table>`,
            description:
              "Use static layout only when the table fits comfortably in its container.",
          },
        ],
      },
      {
        title: "Table layout",
        description:
          "Table layout controls whether columns size automatically or use fixed distribution.",
        controlLabel: "Table layout options",
        defaultValue: "auto",
        options: [
          {
            label: "Auto",
            value: "auto",
            markup: `<sgds-table layout="auto"
              rowHeader='["Name","Status","Owner"]'
              tableData='[["Alpha","Active","Team A"],["Beta","Pending","Team B"]]'
            ></sgds-table>`,
            description:
              "Use auto layout when content length should influence column sizing.",
          },
          {
            label: "Fixed",
            value: "fixed",
            markup: `<sgds-table layout="fixed"
              rowHeader='["Name","Status","Owner"]'
              tableData='[["Alpha","Active","Team A"],["Beta","Pending","Team B"]]'
            ></sgds-table>`,
            description:
              "Use fixed layout when columns should distribute predictably.",
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
    usage: {
      bestPractices: [
        {
          title: "Use a table when users need to compare records",
          description:
            "Tables are for repeating data with shared attributes. Applications, transactions, devices.",
          tone: "do",
          markup: `<sgds-table headerBackground
            rowHeader='["Application ID","Submitted","Status"]'
            tableData='[["APP-0421","12 Mar 2026","In review"],["APP-0422","13 Mar 2026","Approved"],["APP-0423","14 Mar 2026","Rejected"]]'
          ></sgds-table>`,
        },
        {
          title: "Do not use a table for a single record",
          description:
            "For attributes of a single item, a description list shows the label–value relationship more clearly.",
          tone: "dont",
          markup: `<sgds-table
            rowHeader='["Name","Email","Role"]'
            tableData='[["Lim Wei Ming","wei.ming@example.gov.sg","Officer"]]'
          ></sgds-table>`,
        },
        {
          title: "Use clear, consistent column headers",
          description:
            "Keep headers short and consistent, 'Submitted' for a date, 'Status' for a state, so users know each column.",
          tone: "do",
          markup: `<sgds-table headerBackground
            rowHeader='["Service","Owner","Status"]'
            tableData='[["Citizen portal","GovTech","Live"],["Booking system","NLB","Beta"]]'
          ></sgds-table>`,
        },
        {
          title: "Do not pack actions into too many columns",
          description:
            "If every row needs three or more controls, move secondary actions into an overflow menu.",
          tone: "dont",
          markup: `<sgds-table
            rowHeader='["Name","Status","Edit","Delete","Share","Archive"]'
            tableData='[["Alpha","Active","Edit","Delete","Share","Archive"]]'
          ></sgds-table>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / table",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/md", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/sm", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Border", name: "border-color-emphasis", value: "sgds/border-color-emphasis", usage: "Top border of the table" },
          { category: "Border", name: "border-color-muted", value: "sgds/border-color-muted", usage: "Bottom border of items inside the component; bottom border of the th" },
          { category: "Border", name: "border-width-0", value: "sgds/border-width/0", mapKey: "border-width", usage: "Border of the tr" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Bottom border of items inside the component; bottom border of the th" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the table head; font weight of the th" },
          { category: "Size", name: "dimension-56", value: "sgds/dimension/56", usage: "Minimum height of the table cell; minimum height of the table head" },
          { category: "Colour", name: "surface-raised", value: "sgds/surface-raised", usage: "Background colour of items inside the component; background colour of the th" },
        ],
      },
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
        title: "Navigate long pages",
        description: "Use a table of contents to link directly to sections on the same page.",
      },
      {
        title: "Show page structure",
        description: "A list of headings helps users understand what the page contains.",
      },
      {
        title: "Keep section links nearby",
        description: "Use it on long documentation, guidance, or policy pages.",
      },
    ],
    anatomyMarkup: `<div class="sgds:w-[var(--sgds-dimension-320)]">
      <sgds-table-of-contents class="portal-anatomy-table-of-contents">
        <h3 class="portal-anatomy-table-of-contents-header">On this page</h3>
        <li slot="contents">
          <sgds-link><a href="#overview">Overview</a></sgds-link>
        </li>
        <li slot="contents">
          <sgds-link><a href="#usage">Usage</a></sgds-link>
        </li>
        <li slot="contents">
          <sgds-link><a href="#accessibility">Accessibility</a></sgds-link>
        </li>
      </sgds-table-of-contents>
    </div>`,
    anatomyParts: [{ title: "Header" }, { title: "Link(s)" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-table-of-contents-header", targetX: "left", targetY: "center", stemLengthToken: "--sgds-dimension-32" },
      { number: 2, direction: "left", targetSelector: ".portal-anatomy-table-of-contents", targetShadowSelector: ".contents", targetX: "left", targetY: "center", stemLengthToken: "--sgds-dimension-32" },
    ],
    demos: [
      demo(
        "Default",
        "Use table of contents patterns to help users jump across longer pages.",
        `<div class="portal-demo-nav-sm">
          <sgds-table-of-contents>
            <h3>On this page</h3>
            <li slot="contents"><sgds-link><a href="#overview">Overview</a></sgds-link></li>
            <li slot="contents"><sgds-link><a href="#requirements">Requirements</a></sgds-link></li>
            <li slot="contents"><sgds-link><a href="#examples">Examples</a></sgds-link></li>
          </sgds-table-of-contents>
        </div>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a table of contents on long, scannable pages",
          description:
            "Documentation, policy pages, and long-form articles benefit most. Each link should map to a heading.",
          tone: "do",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents"><sgds-link><a href="#introduction">Introduction</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#background">Background</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#findings">Findings</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#conclusion">Conclusion</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Do not use a table of contents on short pages",
          description:
            "If the page fits on one or two screens, a table of contents adds little value and competes with the body.",
          tone: "dont",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents"><sgds-link><a href="#summary">Summary</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Label the block with a clear heading",
          description:
            "Use a short heading like On this page or Contents so users immediately recognise the navigation block.",
          tone: "do",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents"><sgds-link><a href="#overview">Overview</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#requirements">Requirements</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#examples">Examples</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Mirror the page's heading structure",
          description:
            "Each link should match a real heading in the same order. Out-of-sync entries break trust and create dead links.",
          tone: "do",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents"><sgds-link><a href="#overview">Overview</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#anatomy">Anatomy</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#behaviour">Behaviour</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#accessibility">Accessibility</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Do not use it for site-level navigation",
          description: "Table of contents links should stay within the current page. Use mainnav or sidenav when users need to move across pages.",
          tone: "dont",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>Explore services</h3>
              <li slot="contents"><sgds-link><a href="/services">Services</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="/forms">Forms</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="/contact">Contact</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Keep contents entries one level deep",
          description: "Use one direct contents item for each major section. Split dense pages into clearer major sections instead of nesting links.",
          tone: "do",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents"><sgds-link><a href="#introduction">Introduction</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#findings">Findings</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#recommendations">Recommendations</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#conclusion">Conclusion</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Do not link to missing or duplicate sections",
          description: "Each anchor must match one unique section id on the page. Broken or repeated ids can send users to the wrong place.",
          tone: "dont",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents"><sgds-link><a href="#overview">Overview</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#missing-section">Eligibility</a></sgds-link></li>
              <li slot="contents"><sgds-link><a href="#overview">Fees</a></sgds-link></li>
            </sgds-table-of-contents>
          </div>`,
        },
        {
          title: "Do not nest contents links",
          description: "Nested lists are not part of the SGDS table of contents structure and may not receive the component's spacing or list treatment.",
          tone: "dont",
          markup: `<div class="portal-demo-nav-sm">
            <sgds-table-of-contents>
              <h3>On this page</h3>
              <li slot="contents">
                <sgds-link><a href="#findings">Findings</a></sgds-link>
                <ul>
                  <li><sgds-link><a href="#findings-quant">Quantitative</a></sgds-link></li>
                  <li><sgds-link><a href="#findings-qual">Qualitative</a></sgds-link></li>
                </ul>
              </li>
            </sgds-table-of-contents>
          </div>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / table-of-contents",
        rows: [
          { category: "Padding", name: "padding", value: "sgds/padding/none", mapKey: "padding", usage: "Space between the edges of the component and its content" },
          { category: "Gap", name: "gap-md", value: "sgds/gap/md", usage: "Spacing between items of the container; spacing between items of the contents" },
          { category: "Margin", name: "margin-none", value: "sgds/margin/none", usage: "Outer spacing of the content; outer spacing of the contents" },
          { category: "Typography", name: "font-size-subtitle-md", value: "sgds/font-size/subtitle-md", usage: "Font size of the content" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the content" },
          { category: "Typography", name: "line-height-xs", value: "sgds/line-height/xs", usage: "Line height of the content" },
        ],
      },
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
        title: "Collect longer text",
        description: "Use textareas for responses that may need more than one line.",
      },
      {
        title: "Give enough writing space",
        description: "Rows and resize options help the field fit the expected response length.",
      },
      {
        title: "Reuse form feedback",
        description: "Textarea uses the same validation and helper patterns as other form fields.",
      },
    ],
    anatomyMarkup: `<sgds-textarea label="Comments" hintText="Tell us what you think" maxlength="200" value="Great service overall."></sgds-textarea>`,
    anatomyParts: [
      { title: "Label" },
      { title: "Value" },
      { title: "Hint text" },
      { title: "Input container" },
      { title: "Character count" },
    ],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: "sgds-textarea", targetShadowSelector: ".form-label", targetX: "left", targetY: "center" },
      { number: 2, direction: "left", targetSelector: "sgds-textarea", targetShadowSelector: "textarea", targetX: "left", targetY: "top", targetXOffset: 16, targetYOffset: 16 },
      { number: 3, direction: "left", targetSelector: "sgds-textarea", targetShadowSelector: ".form-text", targetX: "left", targetY: "center" },
      { number: 4, direction: "right", targetSelector: "sgds-textarea", targetShadowSelector: "textarea", targetX: "right", targetY: "center" },
      { number: 5, direction: "right", targetSelector: "sgds-textarea", targetShadowSelector: ".word-count", targetX: "right", targetY: "center" },
    ],
    configurationDemos: [
      {
        title: "Hint text",
        description: "Use hint text to clarify expectations for the response.",
        controlLabel: "Textarea hint text options",
        defaultValue: "no-hint-text",
        options: [
          {
            label: "No hint text",
            value: "no-hint-text",
            markup: `<sgds-textarea label="Comments"></sgds-textarea>`,
            description: "Default. Use when the label alone is enough.",
          },
          {
            label: "Hint text",
            value: "hint-text",
            markup: `<sgds-textarea label="Comments" hintText="Tell us what you liked or did not like"></sgds-textarea>`,
            description: "Hint text adds context about what to write.",
          },
        ],
      },
      {
        title: "Placeholder",
        description:
          "Show a placeholder to suggest the kind of content the user can enter.",
        controlLabel: "Textarea placeholder options",
        defaultValue: "no-placeholder",
        options: [
          {
            label: "No placeholder",
            value: "no-placeholder",
            markup: `<sgds-textarea label="Comments"></sgds-textarea>`,
            description: "Empty textarea with no inline helper.",
          },
          {
            label: "Placeholder",
            value: "placeholder",
            markup: `<sgds-textarea label="Comments" placeholder="Share your feedback here"></sgds-textarea>`,
            description: "Placeholder appears until the user starts typing.",
          },
        ],
      },
      {
        title: "Character count",
        description:
          "Set maxlength to show the character count below the textarea.",
        controlLabel: "Textarea character count options",
        defaultValue: "no-count",
        options: [
          {
            label: "No count",
            value: "no-count",
            markup: `<sgds-textarea label="Comments" value="Great service overall."></sgds-textarea>`,
            description: "Default. No count appears when maxlength is not set.",
          },
          {
            label: "Max length",
            value: "max-length",
            markup: `<sgds-textarea label="Comments" maxlength="200" value="Great service overall."></sgds-textarea>`,
            description:
              "The character count appears when maxlength is set.",
          },
        ],
      },
      {
        title: "Rows",
        description:
          "Use the rows attribute to set the visible height of the textarea.",
        controlLabel: "Textarea rows options",
        defaultValue: "default",
        options: [
          {
            label: "Default (3 rows)",
            value: "default",
            markup: `<sgds-textarea class="portal-textarea-api-demo" label="Comments" rows="3"></sgds-textarea>`,
            description: "Compact textarea suited to short responses.",
          },
          {
            label: "Tall (10 rows)",
            value: "tall",
            markup: `<sgds-textarea class="portal-textarea-api-demo" label="Comments" rows="10"></sgds-textarea>`,
            description: "Taller textarea encourages longer answers.",
          },
        ],
      },
      {
        title: "Resize",
        description: "Control whether the user can resize the textarea.",
        controlLabel: "Textarea resize options",
        defaultValue: "vertical",
        options: [
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-textarea class="portal-textarea-api-demo" label="Comments" resize="vertical"></sgds-textarea>`,
            description: "Drag the bottom-right corner to resize vertically.",
          },
          {
            label: "None",
            value: "none",
            markup: `<sgds-textarea class="portal-textarea-api-demo" label="Comments" resize="none"></sgds-textarea>`,
            description:
              "Textarea height is fixed and cannot be resized by the user.",
          },
          {
            label: "Auto",
            value: "auto",
            markup: `<sgds-textarea class="portal-textarea-api-demo" label="Comments" resize="auto" value="First point&#10;Second point&#10;Third point"></sgds-textarea>`,
            description: "Textarea grows automatically to fit its content.",
          },
        ],
      },
      {
        title: "Read-only",
        description:
          "Display a value that the user can read and copy but not edit.",
        controlLabel: "Textarea read-only options",
        defaultValue: "editable",
        options: [
          {
            label: "Editable",
            value: "editable",
            markup: `<sgds-textarea label="Comments" value="Great experience overall."></sgds-textarea>`,
            description: "Default editable textarea.",
          },
          {
            label: "Read-only",
            value: "readonly",
            markup: `<sgds-textarea label="Comments" value="Great experience overall." readonly></sgds-textarea>`,
            description:
              "Value is shown without an editable border, but text can still be selected.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Disable the textarea to prevent it from being edited or focused.",
        controlLabel: "Textarea disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-textarea label="Comments" value="Great experience overall."></sgds-textarea>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-textarea label="Comments" value="Great experience overall." disabled></sgds-textarea>`,
            description: "Textarea appears muted and cannot receive focus.",
          },
        ],
      },
      {
        title: "Required",
        description:
          "Mark the textarea as required when the form cannot be submitted without a value.",
        controlLabel: "Textarea required options",
        defaultValue: "optional",
        options: [
          {
            label: "Optional",
            value: "optional",
            markup: `<sgds-textarea label="Comments"></sgds-textarea>`,
            description: "Default. The textarea can be left blank.",
          },
          {
            label: "Required",
            value: "required",
            markup: `<sgds-textarea label="Comments" required hasFeedback invalid invalidFeedback="Enter your comments"></sgds-textarea>`,
            description:
              "Required textareas should show clear feedback when left blank.",
          },
        ],
      },
      {
        title: "Length validation",
        description:
          "Use minlength and maxlength to validate the allowed response length.",
        controlLabel: "Textarea length validation options",
        defaultValue: "min-length",
        options: [
          {
            label: "Minimum length",
            value: "min-length",
            markup: `<sgds-textarea label="Comments" minlength="20" required hasFeedback invalid invalidFeedback="Enter at least 20 characters" value="Too short"></sgds-textarea>`,
            description:
              "Use minlength when the response needs enough detail.",
          },
          {
            label: "Maximum length",
            value: "max-length",
            markup: `<sgds-textarea label="Comments" maxlength="80" value="This response stays within the character limit."></sgds-textarea>`,
            description:
              "Use maxlength to limit long responses and show the count.",
          },
        ],
      },
      {
        title: "Validation feedback",
        description:
          "Show error styling and a feedback message when the input is invalid.",
        controlLabel: "Textarea validation feedback options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-textarea label="Comments"></sgds-textarea>`,
            description: "No feedback shown.",
          },
          {
            label: "Invalid",
            value: "invalid",
            markup: `<sgds-textarea label="Comments" required hasFeedback invalid invalidFeedback="Share your feedback"></sgds-textarea>`,
            description:
              "Textarea shows error styling and feedback message below.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use textarea when users need more space than a single-line input provides.",
        `<sgds-textarea label="Comments" rows="4" placeholder="Add supporting details"></sgds-textarea>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use textarea for open-ended responses",
          description:
            "Use textarea when users may write more than one line. Feedback, descriptions, or notes.",
          tone: "do",
          markup: `<sgds-textarea label="Comments" hintText="Tell us what you liked or did not like" rows="4"></sgds-textarea>`,
        },
        {
          title: "Do not use textarea for single-line values",
          description:
            "For a one-line value like a name or reference number, use a text input. Textarea implies a longer response.",
          tone: "dont",
          markup: `<sgds-textarea label="Full name"></sgds-textarea>`,
        },
        {
          title: 'Use resize="auto" when responses can vary widely',
          description:
            "Set resize to auto so the textarea grows with the content rather than trapping users in a tiny scroll area.",
          tone: "do",
          markup: `<sgds-textarea label="Additional notes" resize="auto"></sgds-textarea>`,
        },
        {
          title: "Do not lock the height when responses might be long",
          description:
            'Avoid resize="none" for open-ended questions. Users get stuck scrolling once they exceed the visible rows.',
          tone: "dont",
          markup: `<sgds-textarea label="Tell us about your experience" rows="2" resize="none"></sgds-textarea>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / textarea",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/form/padding/x", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/form/padding/y", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Size", name: "dimension-136", value: "sgds/dimension/136", usage: "Minimum height of the textarea form control group" },
          { category: "Size", name: "icon-size-md", value: "sgds/icon-size/md", usage: "Size of the interactive icon inside the textarea" },
        ],
      },
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
        title: "Preview linked content",
        description: "A small image gives users a quick cue before they open the item.",
      },
      {
        title: "List content compactly",
        description: "Use thumbnail cards for dense lists where an image helps scanning.",
      },
      {
        title: "Keep grids stable",
        description: "Consistent thumbnail proportions help repeated cards align cleanly.",
      },
    ],
    anatomyParts: [
      { title: "Container" },
      defaultPartTitleMap.thumbnail,
      defaultPartTitleMap.title,
      defaultPartTitleMap.description,
    ],
    anatomyCallouts: [
      {
        number: 1,
        direction: "right",
        targetSelector: "sgds-thumbnail-card",
        targetX: "right",
        targetY: "center",
      },
      {
        number: 2,
        direction: "left",
        targetSelector: "[slot='thumbnail']",
        targetX: "left",
        targetY: "center",
      },
      {
        number: 3,
        direction: "top",
        targetSelector: "[slot='title']",
        targetX: "center",
        targetY: "top",
      },
      {
        number: 4,
        direction: "bottom",
        targetSelector: "[slot='description']",
        targetX: "center",
        targetY: "bottom",
      },
    ],
    configurationDemos: [
      {
        title: "Orientation",
        description:
          "Use `orientation` to control whether the thumbnail sits above the content or beside it.",
        controlLabel: "Thumbnail card orientation options",
        defaultValue: "horizontal",
        options: [
          {
            label: "Horizontal",
            value: "horizontal",
            markup: `<sgds-thumbnail-card class="portal-demo-card" orientation="horizontal">
          <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
          <span slot="title">Annual report 2025</span>
          <span slot="description">Highlights and metrics from the past year.</span>
        </sgds-thumbnail-card>`,
            description:
              "Thumbnail sits beside the content, best for lists and narrow columns.",
          },
          {
            label: "Vertical",
            value: "vertical",
            markup: `<sgds-thumbnail-card class="portal-demo-card" orientation="vertical">
          <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 96px; height: 96px; object-fit: cover; border-radius: 8px;" />
          <span slot="title">Annual report 2025</span>
          <span slot="description">Highlights and metrics from the past year.</span>
        </sgds-thumbnail-card>`,
            description:
              "Thumbnail sits above the content, useful for grid layouts.",
          },
        ],
      },
      {
        title: "Tinted background",
        description:
          "Use `tinted` to apply a subtle background colour to the thumbnail card.",
        controlLabel: "Thumbnail card background options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-thumbnail-card class="portal-demo-card">
          <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
          <span slot="title">Tax filing guide</span>
          <span slot="description">Step-by-step instructions for residents.</span>
        </sgds-thumbnail-card>`,
            description: "Standard surface uses the page background.",
          },
          {
            label: "Tinted",
            value: "tinted",
            markup: `<sgds-thumbnail-card class="portal-demo-card" tinted>
          <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
          <span slot="title">Tax filing guide</span>
          <span slot="description">Step-by-step instructions for residents.</span>
        </sgds-thumbnail-card>`,
            description:
              "Tinted background helps the card stand out from a busier page.",
          },
        ],
      },
      {
        title: "Disabled",
        description:
          "Use `disabled` to mute the card and prevent interaction with its links or actions.",
        controlLabel: "Thumbnail card disabled options",
        defaultValue: "not-disabled",
        options: [
          {
            label: "Not disabled",
            value: "not-disabled",
            markup: `<sgds-thumbnail-card class="portal-demo-card" stretchedLink>
          <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
          <span slot="title">Browse datasets</span>
          <span slot="description">Open data published by Singapore agencies.</span>
          <a slot="footer" href="#">Open</a>
        </sgds-thumbnail-card>`,
            description: "Default interactive state.",
          },
          {
            label: "Disabled",
            value: "disabled",
            markup: `<sgds-thumbnail-card class="portal-demo-card" disabled stretchedLink>
          <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
          <span slot="title">Browse datasets</span>
          <span slot="description">Open data published by Singapore agencies.</span>
          <a slot="footer" href="#">Open</a>
        </sgds-thumbnail-card>`,
            description: "Greys out the card and disables its actions.",
          },
        ],
      },
      {
        title: "Padding",
        description:
          "Thumbnail cards can remove internal padding when used in compact media lists.",
        controlLabel: "Thumbnail card padding options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-thumbnail-card class="portal-demo-card">
              <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
              <span slot="title">Default padding</span>
              <span slot="description">Content uses default card padding.</span>
            </sgds-thumbnail-card>`,
            description: "Use default padding for most thumbnail cards.",
          },
          {
            label: "No padding",
            value: "no-padding",
            markup: `<sgds-thumbnail-card class="portal-demo-card" noPadding>
              <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
              <span slot="title">No padding</span>
              <span slot="description">Content sits closer to the edge.</span>
            </sgds-thumbnail-card>`,
            description:
              "Use noPadding only when the surrounding layout provides enough spacing.",
          },
        ],
      },
      {
        title: "Footer and stretched link",
        description:
          "Thumbnail cards support footer links and stretched link behaviour for navigational cards.",
        controlLabel: "Thumbnail card link options",
        defaultValue: "footer",
        options: [
          {
            label: "Footer link",
            value: "footer",
            markup: `<sgds-thumbnail-card class="portal-demo-card">
              <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
              <span slot="title">Guide</span>
              <sgds-link slot="footer"><a href="#">Read guide</a></sgds-link>
            </sgds-thumbnail-card>`,
            description: "Use a footer link when only the link should navigate.",
          },
          {
            label: "Stretched link",
            value: "stretched",
            markup: `<sgds-thumbnail-card class="portal-demo-card" stretchedLink>
              <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
              <span slot="title">Guide</span>
              <sgds-link slot="footer"><a href="#">Read guide</a></sgds-link>
            </sgds-thumbnail-card>`,
            description:
              "Use stretchedLink when the whole thumbnail card is one destination.",
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
    usage: {
      bestPractices: [
        {
          title:
            "Use thumbnail cards in dense lists where a small visual helps scanning",
          description:
            "Thumbnail cards work best in lists of resources or articles where a small image gives a preview at a glance.",
          tone: "do",
          markup: `<sgds-thumbnail-card class="portal-demo-card">
            <img slot="thumbnail" alt="Cover of annual report 2025" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
            <span slot="title">Annual report 2025</span>
            <span slot="description">Highlights and metrics from the past year.</span>
          </sgds-thumbnail-card>`,
        },
        {
          title: "Keep thumbnails consistently sized within a list",
          description:
            "Use the same thumbnail dimensions for every card in a list. Mismatched sizes break the visual rhythm.",
          tone: "do",
          markup: `<sgds-thumbnail-card class="portal-demo-card">
            <img slot="thumbnail" alt="Tax filing guide cover" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
            <span slot="title">Tax filing guide</span>
            <span slot="description">Step-by-step instructions for residents.</span>
          </sgds-thumbnail-card>`,
        },
        {
          title: "Do not use a thumbnail card when the image needs to lead",
          description:
            "If the image is the main reason to click the card, use an image card so the picture has room to work.",
          tone: "dont",
          markup: `<sgds-thumbnail-card class="portal-demo-card">
            <img slot="thumbnail" alt="National Day fireworks" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
            <span slot="title">National Day Parade</span>
            <span slot="description">A photo essay from this year's celebration.</span>
          </sgds-thumbnail-card>`,
        },
        {
          title: "Make the whole card one click target only when intended",
          description: "Add `stretchedLink` so the entire card, not just the footer link, responds to click and keyboard.",
          tone: "do",
          markup: `<sgds-thumbnail-card class="portal-demo-card" stretchedLink>
            <img slot="thumbnail" alt="Open data icon" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
            <span slot="title">Browse datasets</span>
            <span slot="description">Open data published by Singapore agencies.</span>
            <a slot="footer" href="#">Open</a>
          </sgds-thumbnail-card>`,
        },
        {
          title: "Do not omit alt text on the thumbnail image",
          description:
            "The thumbnail still carries meaning. Provide concise alt text describing the picture, not the title.",
          tone: "dont",
          markup: `<sgds-thumbnail-card class="portal-demo-card">
            <img slot="thumbnail" alt="" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=160&q=80" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;" />
            <span slot="title">Census 2025 results</span>
            <span slot="description">Key statistics from the latest national census.</span>
          </sgds-thumbnail-card>`,
        },
      ],
    },
    componentTokenGroups: [
      {
        title: "sgds / thumbnail-card",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/none", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/xl", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Border", name: "border-color-transparent", value: "sgds/border-color-transparent", usage: "Border of the card" },
          { category: "Border", name: "border-width-1", value: "sgds/border-width/1", mapKey: "border-width", usage: "Border of the card" },
          { category: "Size", name: "dimension-128", value: "sgds/dimension/128", usage: "Maximum width of the thumbnail" },
          { category: "Size", name: "dimension-64", value: "sgds/dimension/64", usage: "Minimum width of the thumbnail" },
          { category: "Colour", name: "bg-translucent-subtle", value: "sgds/bg-translucent-subtle", usage: "Background colour of the card tinted bg" },
          { category: "Opacity", name: "opacity-50", value: "sgds/opacity/50", usage: "Transparency of the card tinted bg" },
        ],
      },
    ],
  },
  toast: {
    key: "toast",
    title: "Toast",
    tag: "sgds-toast",
    group: "feedback",
    summary: "Toast lets you convey short messaging notifications to the user.",
    purposeCards: [
      {
        title: "Confirm without interrupting",
        description: "Use toasts for short, non-blocking status messages.",
      },
      {
        title: "Expire on their own",
        description: "Autohide lets transient messages disappear after a short delay.",
      },
      {
        title: "Keep the page usable",
        description: "Toasts appear above the page while users continue their work.",
      },
    ],
    anatomyMarkup: `<sgds-toast show dismissible title="Saved" variant="success">
      <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
      Changes have been saved successfully.
      <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
    </sgds-toast>`,
    anatomyParts: [{ title: "Icon" }, { title: "Title" }, { title: "Content" }, { title: "Action" }, { title: "Close button" }, { title: "Container" }],
    anatomyCallouts: [
      { number: 1, direction: "top", targetSelector: "sgds-icon[slot='icon']", targetX: "center", targetY: "top" },
      { number: 2, direction: "top", targetSelector: "sgds-toast", targetShadowSelector: ".toast-body__title", targetX: "left", targetY: "top", targetXOffset: 32, targetYOffset: 4, stemLengthToken: "--sgds-dimension-56" },
      { number: 3, direction: "left", targetSelector: "sgds-toast", targetShadowSelector: ".toast-body__message", targetX: "left", targetY: "center" },
      { number: 4, direction: "bottom", targetSelector: "sgds-link[slot='action'] a", targetX: "center", targetY: "bottom" },
      { number: 5, direction: "top", targetSelector: "sgds-toast", targetShadowSelector: "sgds-close-button", targetX: "center", targetY: "top" },
      { number: 6, direction: "right", targetSelector: "sgds-toast", targetShadowSelector: ".toast", targetX: "right", targetY: "center" },
    ],
    componentTokenGroups: [
      {
        title: "Toast surface and layout",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/md", mapKey: "padding-x", usage: "Space between the left and right edges of the toast and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/md", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Padding", name: "padding-xl", value: "sgds/padding/xl", usage: "Right padding of the toast content" },
          { category: "Gap", name: "gap-2-xs", value: "sgds/gap/2-xs", usage: "Spacing between items of the toast body" },
          { category: "Gap", name: "gap-sm", value: "sgds/gap/sm", usage: "Spacing between items of the toast; spacing between items of the toast content" },
          { category: "Gap", name: "layout-gap-md", value: "sgds/layout-gap-md", usage: "Spacing between items inside the component" },
          { category: "Border", name: "border-radius-md", value: "sgds/border-radius/md", mapKey: "border-radius", usage: "Corner radius of the toast" },
          { category: "Typography", name: "font-size-label-sm", value: "sgds/font-size/label-sm", usage: "Font size of the toast body message" },
          { category: "Typography", name: "font-size-subtitle-sm", value: "sgds/font-size/subtitle-sm", usage: "Font size of the toast body title" },
          { category: "Typography", name: "font-weight-regular", value: "sgds/font-weight/regular", usage: "Font weight of the toast body message" },
          { category: "Typography", name: "font-weight-semibold", value: "sgds/font-weight/semibold", usage: "Font weight of the toast body title" },
          { category: "Typography", name: "line-height-2-xs", value: "sgds/line-height/2-xs", usage: "Line height of the toast body title" },
          { category: "Size", name: "dimension-280", value: "sgds/dimension/280", usage: "Minimum width of the toast" },
          { category: "Size", name: "dimension-480", value: "sgds/dimension/480", usage: "Maximum width of the toast" },
          { category: "Size", name: "spacer-8", value: "sgds/spacer/8", usage: "Value of the toast container" },
          { category: "Colour", name: "danger-color-default", value: "sgds/danger/color/default", usage: "Text colour of the content" },
          { category: "Colour", name: "link-color-default", value: "sgds/link-color-default", usage: "Text colour of the toast action" },
          { category: "Colour", name: "primary-color-default", value: "sgds/primary/color/default", usage: "Text colour of the content" },
          { category: "Colour", name: "success-color-default", value: "sgds/success/color/default", usage: "Text colour of the content" },
          { category: "Colour", name: "surface-default", value: "sgds/surface-default", usage: "Background colour of the toast" },
          { category: "Colour", name: "warning-color-fixed-light", value: "sgds/warning/color-fixed/light", usage: "Text colour of the content" },
          { category: "Layer", name: "z-index-overlay", value: "sgds/z-index-overlay", usage: "Stacking layer of the toast container" },
        ],
      },
      {
        title: "Toast text",
        rows: [
          { category: "Typography", name: "title-font-size", value: "sgds/font-size/subtitle-sm", rawValue: "16px", mapKey: "title-font-size", usage: "Font size of the toast body title" },
          { category: "Typography", name: "title-font-weight", value: "sgds/font-weight/semibold", rawValue: "600", mapKey: "title-font-weight", usage: "Font weight of the toast body title" },
          { category: "Typography", name: "line-height", value: "sgds/line-height/2-xs", rawValue: "20px", mapKey: "line-height", usage: "Line height of the toast body title" },
          { category: "Colour", name: "message-color", value: "sgds/color-subtle", rawValue: "#525252", mapKey: "message-color", usage: "Text colour of the component" },
          { category: "Typography", name: "message-font-size", value: "sgds/font-size/label-sm", rawValue: "14px", mapKey: "message-font-size", usage: "Font size of the toast body message" },
          { category: "Typography", name: "message-font-weight", value: "sgds/font-weight/regular", rawValue: "400", mapKey: "message-font-weight", usage: "Font weight of the toast body message" },
          { category: "Colour", name: "action-color", value: "sgds/link-color-default", rawValue: "#0269D0", mapKey: "action-color", usage: "Text colour of the toast action" },
        ],
      },
      {
        title: "Variant icon colours",
        rows: [
          { category: "Colour", name: "info-icon", value: "sgds/primary/color/default", rawValue: "#6B4FEB", mapKey: "info-icon", usage: "Text colour of the content" },
          { category: "Colour", name: "success-icon", value: "sgds/success/color/default", rawValue: "#0E7C3D", mapKey: "success-icon", usage: "Text colour of the content" },
          { category: "Colour", name: "danger-icon", value: "sgds/danger/color/default", rawValue: "#CF2323", mapKey: "danger-icon", usage: "Text colour of the content" },
          { category: "Colour", name: "warning-icon", value: "sgds/warning/color/fixed-light", rawValue: "#E5BF29", mapKey: "warning-icon", usage: "Text colour of the content" },
        ],
      },
      {
        title: "Toast container",
        rows: [
          { category: "Spacing", name: "viewport-offset", value: "sgds/spacer-8", rawValue: "32px", mapKey: "viewport-offset", usage: "Value of the toast container" },
          { category: "Layer", name: "z-index", value: "sgds/z-index-overlay", rawValue: "800", mapKey: "z-index", usage: "Stacking layer of the toast container" },
        ],
      },
    ],
    configurationDemos: [
      {
        title: "Variant",
        description:
          "Toast variants use colour and context to communicate the nature of the notification.",
        controlLabel: "Toast variant options",
        defaultValue: "success",
        options: [
          {
            label: "Success",
            value: "success",
            markup: `<sgds-toast show title="Saved" variant="success">
          <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
          Changes have been saved successfully.
          <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
        </sgds-toast>`,
            description:
              "Use to confirm that an action completed successfully, such as saving, submitting, or deleting an item.",
          },
          {
            label: "Warning",
            value: "warning",
            markup: `<sgds-toast show title="Check your input" variant="warning">
          <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
          Some fields may need your attention before proceeding.
        </sgds-toast>`,
            description:
              "Use to alert users to something that needs attention without blocking their current task.",
          },
          {
            label: "Danger",
            value: "danger",
            markup: `<sgds-toast show title="Action failed" variant="danger">
          <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
          The request could not be completed. Try again.
        </sgds-toast>`,
            description:
              "Use to communicate that an action has failed or that something requires immediate attention.",
          },
          {
            label: "Info",
            value: "info",
            markup: `<sgds-toast show title="Update available" variant="info">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          A new version of this service is available.
        </sgds-toast>`,
            description:
              "Use for neutral, informational updates that are not directly tied to a user action or status outcome.",
          },
        ],
      },
      {
        title: "Dismissible",
        description:
          "Dismissible toasts give users control to clear them. Pair with autohide for transient messages and keep dismissible for messages users may want to read again.",
        controlLabel: "Toast dismissible options",
        defaultValue: "not-dismissible",
        options: [
          {
            label: "Not dismissible",
            value: "not-dismissible",
            markup: `<sgds-toast show variant="info" title="Heads up">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          This toast cannot be closed manually.
        </sgds-toast>`,
            description: "Toast remains until autohide or programmatic close.",
          },
          {
            label: "Dismissible",
            value: "dismissible",
            markup: `<sgds-toast show dismissible variant="info" title="Heads up">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          Use the close icon to dismiss this message.
        </sgds-toast>`,
            description: "Adds a close button so the user can clear the toast.",
          },
        ],
      },
      {
        title: "Autohide",
        description:
          "Autohide makes the toast disappear after a delay. Use it for confirmations or transient updates that do not need acknowledgement.",
        controlLabel: "Toast autohide options",
        defaultValue: "no-autohide",
        options: [
          {
            label: "No autohide",
            value: "no-autohide",
            markup: `<sgds-toast show dismissible variant="info" title="Heads up">
          <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
          This toast stays until manually dismissed.
        </sgds-toast>`,
            description:
              "Toast persists until the user closes it or the app removes it.",
          },
          {
            label: "Autohide",
            value: "autohide",
            markup: `<sgds-toast show autohide variant="success" title="Saved">
          <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
          Your draft was saved automatically.
        </sgds-toast>`,
            description:
              "Toast removes itself after the delay (5000ms by default).",
          },
        ],
      },
  {
        title: "Position",
        description:
          "Toast position controls where the toast stack appears in the viewport.",
        controlLabel: "Toast position options",
        defaultValue: "top-end",
        options: [
          {
            label: "Top end",
            value: "top-end",
            markup: `<div class="sgds:relative sgds:h-[var(--sgds-dimension-256)] sgds:w-full sgds:rounded-md sgds:border sgds:border-muted sgds:bg-bg-alternate sgds:p-md">
              <div class="sgds:absolute sgds:right-md sgds:top-md sgds:flex sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:items-start sgds:gap-sm sgds:rounded-md sgds:border sgds:border-muted sgds:bg-surface-default sgds:p-md">
                <sgds-icon name="check-circle-fill" class="sgds:shrink-0 sgds:text-success"></sgds-icon>
                <span class="sgds:text-body-sm sgds:text-default">Saved successfully.</span>
              </div>
            </div>`,
            description:
              "Use top end for common non-blocking status updates.",
          },
          {
            label: "Bottom end",
            value: "bottom-end",
            markup: `<div class="sgds:relative sgds:h-[var(--sgds-dimension-256)] sgds:w-full sgds:rounded-md sgds:border sgds:border-muted sgds:bg-bg-alternate sgds:p-md">
              <div class="sgds:absolute sgds:bottom-md sgds:right-md sgds:flex sgds:w-full sgds:max-w-[var(--sgds-dimension-320)] sgds:items-start sgds:gap-sm sgds:rounded-md sgds:border sgds:border-muted sgds:bg-surface-default sgds:p-md">
                <sgds-icon name="check-circle-fill" class="sgds:shrink-0 sgds:text-success"></sgds-icon>
                <span class="sgds:text-body-sm sgds:text-default">Saved successfully.</span>
              </div>
            </div>`,
            description:
              "Use bottom end when top-level chrome or banners occupy the top area.",
          },
        ],
      },
      {
        title: "Action and icon slots",
        description:
          "Toast supports action and icon slots for brief follow-up actions and visual context.",
        controlLabel: "Toast slot options",
        defaultValue: "with-slots",
        options: [
          {
            label: "With slots",
            value: "with-slots",
            markup: `<sgds-toast show>
              <div slot="icon" class="portal-slot-example sgds:p-sm"><span>Icon slot content</span></div>
              Draft saved.
              <div slot="action" class="portal-slot-example sgds:p-sm"><span>Action slot content</span></div>
            </sgds-toast>`,
            description:
              "Use slots only when the action or icon adds clear value to the message.",
          },
          {
            label: "Message only",
            value: "message-only",
            markup: `<sgds-toast show>Draft saved.</sgds-toast>`,
            description: "Use message-only to keep routine updates simple.",
          },
        ],
      },
      {
        title: "Delay",
        description:
          "Delay controls how long an autohide toast remains visible.",
        controlLabel: "Toast delay options",
        defaultValue: "default",
        options: [
          {
            label: "Default",
            value: "default",
            markup: `<sgds-toast show autohide>Saved successfully.</sgds-toast>`,
            description:
              "Use the default 5000ms (5 seconds) delay for short, routine messages.",
          },
          {
            label: "Longer",
            value: "longer",
            markup: `<sgds-toast show autohide delay="8000">Saved successfully.</sgds-toast>`,
            description:
              "Use the 8000ms (8 seconds) delay when the message needs slightly more reading time.",
          },
        ],
      },
    ],
    demos: [
      demo(
        "Default",
        "Use toast for lightweight, non-blocking confirmations and status updates.",
        `<sgds-toast show title="Saved" variant="success">
          <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
          Changes have been saved successfully.
          <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
        </sgds-toast>`,
      ),
    ],
    measurements: [
      demo(
        "Structure",
        "Toast structure shows the container, padding, content area, action, icon, and close button.",
        `<sgds-toast show dismissible title="Saved" variant="success">
          <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
          Changes have been saved successfully.
          <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
        </sgds-toast>`,
      ),
    ],
    usage: {
      bestPractices: [
        {
          title: "Use a toast to confirm a non-blocking action",
          description:
            "Toasts acknowledge background actions like save or send without interrupting the user's current task.",
          tone: "do",
          markup: `<sgds-toast show title="Saved" variant="success">
            <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
            Your changes have been saved.
            <sgds-link slot="action"><a href="#">Undo</a></sgds-link>
          </sgds-toast>`,
        },
        {
          title: "Do not use a toast for critical errors that block progress",
          description:
            "Errors that require action or block the task belong in an inline alert or modal, where they stay visible.",
          tone: "dont",
          markup: `<sgds-toast show title="Payment failed" variant="danger">
            <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
            Your card was declined. The order has not been submitted.
          </sgds-toast>`,
        },
        {
          title: "Match the variant to the nature of the message",
          description:
            "Use success for confirmations, info for neutral updates, warning for issues, and danger for failures.",
          tone: "do",
          markup: `<sgds-toast show title="Update available" variant="info">
            <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
            A new version of this service is available.
          </sgds-toast>`,
        },
        {
          title: "Do not show many toasts at the same time",
          description:
            "Stacked toasts compete for attention. Surface only the most relevant, or batch related updates into one.",
          tone: "dont",
          markup: `<div class="portal-demo-row">
            <sgds-toast show title="File uploaded" variant="success">
              <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
              Report.pdf has been uploaded.
            </sgds-toast>
            <sgds-toast show title="File uploaded" variant="success">
              <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
              Summary.pdf has been uploaded.
            </sgds-toast>
            <sgds-toast show title="File uploaded" variant="success">
              <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
              Notes.pdf has been uploaded.
            </sgds-toast>
          </div>`,
        },
        {
          title:
            "Keep toast content short and pair with an action where useful",
          description:
            "Keep to a brief title and one supporting line. Add an action like Undo or View when it helps recovery.",
          tone: "do",
          markup: `<sgds-toast show title="Message sent" variant="success">
            <sgds-icon slot="icon" name="send"></sgds-icon>
            Your reply has been sent.
            <sgds-link slot="action"><a href="#">View thread</a></sgds-link>
          </sgds-toast>`,
        },
        {
          title:
            "Do not use a toast as the only signal for critical information",
          description:
            "Toasts dismiss themselves and may be missed. For must-read information, use a banner, modal, or inline alert.",
          tone: "dont",
          markup: `<sgds-toast show title="Account suspended" variant="danger">
            <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
            Your account has been suspended. You cannot access your records until this is resolved.
          </sgds-toast>`,
        },
      ],
    },
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
        title: "Add brief help",
        description: "Use tooltips for short hints, descriptions, or keyboard shortcuts.",
      },
      {
        title: "Support visible labels",
        description: "Tooltips add detail to a labelled control or icon, rather than replacing the label.",
      },
      {
        title: "Open on user attention",
        description: "Tooltips can appear on hover, focus, or click based on the trigger.",
      },
    ],
    anatomyMarkup: `<div class="portal-tooltip-anatomy">
      <sgds-tooltip class="portal-anatomy-tooltip-real" content="Tooltip text" placement="top">
        <span class="portal-anatomy-tooltip-anchor" aria-hidden="true"></span>
      </sgds-tooltip>
    </div>`,
    anatomyParts: [{ title: "Label" }, { title: "Container" }],
    anatomyCallouts: [
      { number: 1, direction: "left", targetSelector: ".portal-anatomy-tooltip-real", targetShadowSelector: ".tooltip", targetX: "left", targetY: "center", targetXOffset: 12 },
      { number: 2, direction: "right", targetSelector: ".portal-anatomy-tooltip-real", targetShadowSelector: ".tooltip", targetX: "right", targetY: "center" },
    ],
    measurements: [
      demo(
        "Structure",
        "Tooltip structure uses the real tooltip component in its open state. The bubble is constrained by a 320px max-width, so the preview text is long enough to show wrapping at that limit.",
        `<div class="portal-tooltip-anatomy">
          <sgds-tooltip class="portal-structure-tooltip-real" content="Tooltip max width is 320px for brief help." placement="top">
            <span class="portal-anatomy-tooltip-anchor" aria-hidden="true"></span>
          </sgds-tooltip>
        </div>`,
      ),
    ],
    componentTokenGroups: [
      {
        title: "sgds/tooltip",
        rows: [
          { category: "Padding", name: "padding-x", value: "sgds/padding/sm", rawValue: "12px", mapKey: "padding-x", usage: "Space between the left and right edges of the component and its content" },
          { category: "Padding", name: "padding-y", value: "sgds/padding/xs", rawValue: "8px", mapKey: "padding-y", usage: "Space between the top and bottom edges of the component and its content" },
          { category: "Border", name: "border-radius", value: "sgds/border-radius/md", rawValue: "8px", mapKey: "border-radius", usage: "Corner radius of the tooltip" },
          { category: "Typography", name: "font-size", value: "sgds/font-size/14", rawValue: "14px", mapKey: "font-size", usage: "Font size of the tooltip" },
          { category: "Colour", name: "text-color", value: "sgds/color-fixed-light", rawValue: "#F3F3F3", mapKey: "text-color", usage: "Text colour of the tooltip" },
          { category: "Colour", name: "surface", value: "sgds/surface-fixed-dark", rawValue: "#2A2A2A", mapKey: "surface", usage: "Background colour of the tooltip" },
          { category: "Size", name: "max-width", value: "sgds/dimension/320", rawValue: "320px", mapKey: "max-width", usage: "Maximum width of the tooltip" },
          { category: "Layer", name: "z-index", value: "sgds/z-index-overlay", rawValue: "800", mapKey: "z-index", usage: "Stacking layer of the tooltip" },
        ],
      },
    ],
    configurationDemos: [
      {
        title: "Placement",
        description:
          "Tooltips can be anchored to any side of their target. Choose the side with the most space and least overlap with surrounding content.",
        controlLabel: "Tooltip placement options",
        defaultValue: "top",
        options: [
          {
            label: "Top",
            value: "top",
            markup: `<sgds-tooltip content="Tooltip on top" placement="top">
          <sgds-button variant="outline">Hover me</sgds-button>
        </sgds-tooltip>`,
            description:
              "Anchors above the target. This is the default placement.",
          },
          {
            label: "Bottom",
            value: "bottom",
            markup: `<sgds-tooltip content="Tooltip on bottom" placement="bottom">
          <sgds-button variant="outline">Hover me</sgds-button>
        </sgds-tooltip>`,
            description:
              "Drops below the target. Useful when there is little headroom above.",
          },
          {
            label: "Left",
            value: "left",
            markup: `<sgds-tooltip content="Tooltip on left" placement="left">
          <sgds-button variant="outline">Hover me</sgds-button>
        </sgds-tooltip>`,
            description: "Sits to the leading side of the target.",
          },
          {
            label: "Right",
            value: "right",
            markup: `<sgds-tooltip content="Tooltip on right" placement="right">
          <sgds-button variant="outline">Hover me</sgds-button>
        </sgds-tooltip>`,
            description: "Sits to the trailing side of the target.",
          },
        ],
      },
      {
        title: "Trigger",
        description:
          "Tooltips can open on hover and focus, or only on a specific interaction. Use click to make the tooltip persistent on touch devices.",
        controlLabel: "Tooltip trigger options",
        defaultValue: "hover-focus",
        options: [
          {
            label: "Hover and focus",
            value: "hover-focus",
            markup: `<sgds-tooltip content="Opens on hover or keyboard focus" trigger="hover focus">
          <sgds-button variant="outline">Hover or focus me</sgds-button>
        </sgds-tooltip>`,
            description:
              "Default behaviour, open through mouse hover or keyboard focus.",
          },
          {
            label: "Hover",
            value: "hover",
            markup: `<sgds-tooltip content="Opens on hover only" trigger="hover">
          <sgds-button variant="outline">Hover me</sgds-button>
        </sgds-tooltip>`,
            description: "Opens only on mouse hover.",
          },
          {
            label: "Focus",
            value: "focus",
            markup: `<sgds-tooltip content="Opens on keyboard focus only" trigger="focus">
          <sgds-button variant="outline">Focus me</sgds-button>
        </sgds-tooltip>`,
            description: "Opens only when the target receives keyboard focus.",
          },
          {
            label: "Click",
            value: "click",
            markup: `<sgds-tooltip content="Opens and stays on click" trigger="click">
          <sgds-button variant="outline">Click me</sgds-button>
        </sgds-tooltip>`,
            description: "Toggles open on click and stays until clicked again.",
          },
        ],
      },
  {
        title: "Content length",
        description:
          "Tooltip content should stay short enough to read quickly without covering important UI.",
        controlLabel: "Tooltip content length options",
        defaultValue: "short",
        options: [
          {
            label: "Short",
            value: "short",
            markup: `<sgds-tooltip content="Save draft" open>
              <sgds-button variant="outline">Hover me</sgds-button>
            </sgds-tooltip>`,
            description:
              "Use short content for quick clarification of a control or icon.",
          },
          {
            label: "Long",
            value: "long",
            markup: `<sgds-tooltip content="This longer tooltip wraps within the component max width and should still remain supplementary." open>
              <sgds-button variant="outline">Hover me</sgds-button>
            </sgds-tooltip>`,
            description:
              "Avoid long tooltip content when the information is essential or needs interaction.",
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
    usage: {
      bestPractices: [
        {
          title: "Use tooltips for short supplementary hints",
          description:
            "Use tooltips for brief explanations or shortcut hints on elements that already have a visible affordance.",
          tone: "do",
          markup: `<sgds-tooltip content="Save this draft" trigger="hover focus" open>
            <sgds-icon-button name="save" ariaLabel="Save draft"></sgds-icon-button>
          </sgds-tooltip>`,
        },
        {
          title: "Do not put critical information in a tooltip",
          description:
            "Information users need to complete a task should be visible without hovering. Use hint text or inline messages.",
          tone: "dont",
          markup: `<sgds-tooltip content="Password must be at least 12 characters and include a number" trigger="hover focus" open>
            <sgds-input label="Password" type="password"></sgds-input>
          </sgds-tooltip>`,
        },
        {
          title: "Keep tooltip text concise",
          description:
            "Aim for a short phrase that fits on one or two lines. Long tooltips are often missed and hard to read.",
          tone: "do",
          markup: `<sgds-tooltip content="Filter results" trigger="hover focus" open>
            <sgds-icon-button name="bi-funnel" ariaLabel="Filter results"></sgds-icon-button>
          </sgds-tooltip>`,
        },
        {
          title:
            "Do not attach tooltips to elements that already have a visible label",
          description:
            "Only use a tooltip when it explains something the label or icon does not already convey.",
          tone: "dont",
          markup: `<sgds-tooltip content="Submit" trigger="hover focus" open>
            <sgds-button>Submit</sgds-button>
          </sgds-tooltip>`,
        },
        {
          title: "Choose a placement that does not cover key content",
          description:
            "Anchor the tooltip on the side with the most space and least overlap so users can read it without losing context.",
          tone: "do",
          markup: `<sgds-tooltip content="View activity log" placement="bottom" trigger="hover focus" open>
            <sgds-icon-button name="clock" ariaLabel="View activity log"></sgds-icon-button>
          </sgds-tooltip>`,
        },
        {
          title:
            "Do not rely on hover-only tooltips for keyboard or touch users",
          description:
            "Hover-only triggers exclude keyboard and touch users. Use the default hover and focus trigger so tabbing also opens it.",
          tone: "dont",
          markup: `<sgds-tooltip content="Edit settings" trigger="hover" open>
            <sgds-icon-button name="gear" ariaLabel="Edit settings"></sgds-icon-button>
          </sgds-tooltip>`,
        },
      ],
    },
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

const defaultGeneratedUsagePatterns: Record<
  ComponentGroup,
  GeneratedUsagePattern
> = {
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
    dontTitle: "Do not make the content compete",
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
    doDescription:
      "Use a clear message with one purpose so users can act or move on quickly.",
    dontTitle: "Do not stack competing messages",
    dontDescription:
      "Multiple repeated messages compete for attention and make it harder to see what matters.",
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
    doDescription:
      "Use clear labels, predictable values, and a single obvious action for the control.",
    dontTitle: "Do not increase input effort",
    dontDescription:
      "Too many repeated controls or unclear prompts make form completion slower and less confident.",
  },
  labels: {
    use: [
      "Use this component as supporting text or visual context that strengthens nearby content.",
      "Use it when a short label or reference helps users interpret the surrounding interface more quickly.",
    ],
    avoid: [
      "Do not rely on this component as the only explanation for a critical action, state, or instruction.",
      "Do not use long or decorative content when a short, direct label is enough.",
    ],
    doTitle: "Keep the label concise",
    doDescription:
      "Short labels are easier to scan and support the main content without competing with it.",
    dontTitle: "Do not make the label carry everything",
    dontDescription:
      "When the label becomes too long or too vague, it stops helping users orient themselves.",
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
    doDescription:
      "A light layout treatment should help users read the page, not compete with the content.",
    dontTitle: "Do not add visual noise",
    dontDescription:
      "Repeated layout elements weaken hierarchy when spacing or simpler structure would do the job.",
  },
  table: {
    use: [
      "Use this component when users need to compare structured results or move through a long list in a predictable way.",
      "Use it when the component reduces effort for scanning, comparison, or navigation across related records.",
    ],
    avoid: [
      "Do not use this component when the content is short enough to show directly without extra controls.",
      "Do not split short information into more pages, rows, or controls than users need.",
    ],
    doTitle: "Match the structure to the task",
    doDescription:
      "Use structured navigation or comparison only when it helps users move through results with less effort.",
    dontTitle: "Do not add structure for its own sake",
    dontDescription:
      "Extra pagination or tabular structure slows users down when the content could stay compact.",
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
    doDescription:
      "Short, specific labels and a clear current state help users move through the interface with confidence.",
    dontTitle: "Do not compete with the page structure",
    dontDescription:
      "Repeated or unnecessary navigation patterns make it harder to understand where to go next.",
  },
};

const generatedUsagePatternOverrides: Partial<
  Record<string, GeneratedUsagePattern>
> = {
  accordion: {
    use: [
      "Use accordion to group related information that users may read selectively.",
      "Use it when space is limited and users do not need to see every section at once.",
    ],
    avoid: [
      "Do not use accordion when most users need to read all of the content straight through.",
      "Do not hide essential information that users need to see immediately.",
    ],
    doTitle: "Keep sections scannable",
    doDescription:
      "Short titles and clearly grouped content help users decide what to open.",
    dontTitle: "Do not hide core information",
    dontDescription:
      "Accordion adds interaction cost, so it should not conceal information users must see at once.",
  },
  alert: {
    use: [
      "Use alert for inline feedback that affects the task or page the user is on.",
      "Use the alert variant that matches the message severity and required response.",
    ],
    avoid: [
      "Do not use alert for routine supporting text or content that belongs in the page body.",
      "Do not show several alerts of equal priority when one clear message is enough.",
    ],
    doTitle: "Match the alert to the message",
    doDescription:
      "A clear title, short body, and suitable variant help users understand what needs attention.",
    dontTitle: "Do not flood the page with alerts",
    dontDescription:
      "Too many alerts compete for attention and make it harder to spot the message that matters.",
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
    dontTitle: "Do not put sentences inside a badge",
    dontDescription: "Long badge text is hard to scan at a glance and stops looking like a label.",
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
    doDescription:
      "Specific labels help users understand where they are and what each level represents.",
    dontTitle: "Do not make the trail ambiguous",
    dontDescription:
      "Vague breadcrumb labels weaken orientation instead of improving it.",
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
    doDescription:
      "Specific button labels help users understand the outcome before they act.",
    dontTitle: "Do not use vague labels",
    dontDescription:
      "Generic labels such as 'Click here' or 'Submit' without context slow users down.",
  },
  card: {
    use: [
      "Use card to group a related set of content and actions into a single scannable block.",
      "Use it when users need to compare similar items quickly across a list or grid.",
    ],
    avoid: [
      "Do not fill a card with too many competing text blocks, actions, or metadata.",
      "Do not use a card when the content works better as a list or page section.",
    ],
    doTitle: "Keep the card focused",
    doDescription:
      "A clear title, short description, and one obvious hierarchy make cards easier to compare.",
    dontTitle: "Do not cram the card",
    dontDescription:
      "Too much competing content makes the card harder to scan and weakens the primary action.",
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
    doDescription:
      "A clear prompt and a single expected date help users complete the field confidently.",
    dontTitle: "Do not rely on the placeholder",
    dontDescription:
      "Users should not have to guess the expected input from placeholder text alone.",
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
    doDescription:
      "A divider should quietly separate content without becoming the main thing users notice.",
    dontTitle: "Do not divide everything",
    dontDescription:
      "Too many dividers add noise and make the page feel heavier than it needs to.",
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
    doDescription:
      "A drawer works best when it supports one related task and a clear next step.",
    dontTitle: "Do not turn the drawer into a whole page",
    dontDescription:
      "Too many unrelated tasks or messages make the drawer harder to complete and dismiss.",
  },
  footer: {
    use: [
      "Use footer for persistent supporting links and organisational information at the end of the page.",
      "Use it for secondary actions and reference content, not primary task content.",
    ],
    avoid: [
      "Do not move primary task actions or critical page guidance into the footer.",
      "Do not overload the footer with too many competing link groups.",
    ],
    doTitle: "Keep footer content secondary",
    doDescription:
      "Supporting links and organisational details belong in the footer because they do not interrupt the main task.",
    dontTitle: "Do not hide primary content in the footer",
    dontDescription:
      "If users need the content to finish the task, it should not be buried at the end of the page.",
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
    doDescription:
      "Icons work best when nearby text or structure already explains what they mean.",
    dontTitle: "Do not rely on icon alone",
    dontDescription:
      "Without enough context, users may interpret the same icon in different ways.",
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
    doDescription:
      "Users should understand what to enter before they start typing.",
    dontTitle: "Do not make users guess",
    dontDescription:
      "Placeholder-only instructions disappear and make the field harder to complete accurately.",
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
    doDescription:
      "Specific link text helps users decide whether it is worth following.",
    dontTitle: "Do not hide the destination",
    dontDescription:
      "Generic link labels make it harder to scan the page and predict what happens next.",
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
    doDescription:
      "A modal should present one clear task with one clear next step.",
    dontTitle: "Do not overload the modal",
    dontDescription:
      "When a modal becomes too dense, users lose context and the interaction becomes harder to finish.",
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
    doDescription:
      "Pagination works best when it reduces load and helps users move through many related results.",
    dontTitle: "Do not paginate short content",
    dontDescription:
      "Extra page controls add work when the content could stay on a single page.",
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
    doDescription:
      "Skeleton works best when it closely reflects the content that will replace it.",
    dontTitle: "Do not let loading states linger",
    dontDescription:
      "A loading placeholder should disappear as soon as real content is ready to read.",
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
    doDescription:
      "A spinner works best when the wait is short and users only need confirmation that work has started.",
    dontTitle: "Do not leave users waiting without context",
    dontDescription:
      "Long waits need clearer status information than a spinner alone can provide.",
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
    doDescription:
      "A good stepper helps users see where they are, what is next, and how much remains.",
    dontTitle: "Do not add steps for decoration",
    dontDescription:
      "Extra or vague steps make the journey feel longer and less clear than it is.",
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
    doDescription:
      "A small set of clear local links helps users move around a section without losing context.",
    dontTitle: "Do not duplicate navigation",
    dontDescription:
      "Repeated navigation patterns make it harder to tell which links matter for the current task.",
  },
  table: {
    use: [
      "Use table when users need to compare values across rows and columns.",
      "Use it for structured data where alignment helps users spot patterns or differences quickly.",
    ],
    avoid: [
      "Do not use table for short content that reads better as a list or card.",
      "Do not crowd the table with columns that users do not need for the decision at hand.",
    ],
    doTitle: "Keep the table comparable",
    doDescription:
      "Relevant columns and clear row content help users scan and compare results quickly.",
    dontTitle: "Do not overload the table",
    dontDescription:
      "Too many columns or repeated details make comparison slower and more error-prone.",
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
    doDescription:
      "Users write better answers when they know what kind of detail the field is asking for.",
    dontTitle: "Do not leave the prompt ambiguous",
    dontDescription:
      "An unclear prompt makes responses less useful and harder to review later.",
  },
  toast: {
    use: [
      "Use toast for brief status updates that confirm an action or surface a timely non-blocking message.",
      "Use it when users can continue their task without stopping to resolve the message immediately.",
    ],
    avoid: [
      "Do not use toast for content that must stay visible until the user reads it.",
      "Do not show several toasts in rapid succession for related updates.",
    ],
    doTitle: "Keep the toast brief",
    doDescription:
      "A short message with one clear outcome helps users recognise what just happened.",
    dontTitle: "Do not use toast for permanent guidance",
    dontDescription:
      "If users need the content to stay visible, it should not disappear on its own.",
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
    doDescription:
      "Short supporting text works best because users should be able to read it at a glance.",
    dontTitle: "Do not hide essential guidance",
    dontDescription:
      "Critical instructions should stay visible in the interface rather than only appearing on hover or focus.",
  },
};

const getGeneratedUsagePattern = (doc: ComponentDoc): GeneratedUsagePattern =>
  generatedUsagePatternOverrides[doc.key] ??
  defaultGeneratedUsagePatterns[doc.group] ?? {
    use: [
      `Use ${doc.title.toLowerCase()} when it gives users a clearer, more consistent SGDS interaction for the task at hand.`,
      "Use the built-in SGDS pattern when it helps users recognise the component quickly and act with confidence.",
    ],
    avoid: [
      "Do not use this component when a simpler SGDS pattern would communicate the same thing more clearly.",
      "Do not add repeated or decorative instances that compete with the main content.",
    ],
    doTitle: "Keep the pattern clear",
    doDescription:
      "Use one clear, purposeful instance so users can understand the component quickly.",
    dontTitle: "Do not add noise",
    dontDescription:
      "Repeated or decorative instances make the interface harder to scan.",
  };

const getPrimaryUsageDemoMarkup = (doc: ComponentDoc): string =>
  doc.configurationDemos
    ?.find((demo) => demo.defaultValue)
    ?.options.find(
      (option) =>
        option.value ===
        doc.configurationDemos?.find(
          (demo2) => demo2.defaultValue === demo.defaultValue,
        )?.defaultValue,
    )?.markup ||
  doc.configurationDemos?.[0]?.options.find(
    (option) => option.value === doc.configurationDemos?.[0]?.defaultValue,
  )?.markup ||
  doc.configurationDemos?.[0]?.options[0]?.markup ||
  doc.demos[0]?.markup ||
  doc.anatomyMarkup ||
  doc.codeExample ||
  `<${doc.tag}></${doc.tag}>`;

const buildRepeatedMarkup = (markup: string) =>
  `<div class="portal-demo-stack-sm">
    ${markup}
    ${markup}
  </div>`;

const buildAnatomyPreviewMarkup = (doc: ComponentDoc): string => {
  if (doc.anatomyMarkup) return doc.anatomyMarkup;
  if (doc.anatomyPreviewMarkup) return doc.anatomyPreviewMarkup;
  if (doc.demos.length <= 1) return doc.demos[0]?.markup || `<${doc.tag}></${doc.tag}>`;

  return `<div class="portal-demo-stack">${doc.demos
    .map((example) => `<div class="portal-anatomy-demo-block">${example.markup}</div>`)
    .join("")}</div>`;
};

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
      return `<sgds-datepicker label="Date"></sgds-datepicker>`;
    case "divider":
      return `<div class="portal-demo-stack-sm">
        <sgds-divider></sgds-divider>
        <sgds-divider></sgds-divider>
        <sgds-divider></sgds-divider>
      </div>`;
    case "drawer":
      return `<div class="portal-demo-overlay">
        <sgds-drawer open contained size="sm">
          <span slot="title" class="sgds:font-semibold">Task one</span>
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
        <sgds-button slot="toggler" variant="outline" ariaLabel="More">More</sgds-button>
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
      return `<sgds-radio-group label="Would you like to receive SMS reminders?" hintText="We will send reminders before your appointment.">
        <sgds-radio value="yes">Yes</sgds-radio>
        <sgds-radio value="no">No</sgds-radio>
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

const buildUsageContentSections = (
  doc: ComponentDoc,
): UsageContentSection[] => {
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

  if (
    hasAnatomyPart(
      doc,
      /description|content|body|panel|value|data|details|contents/i,
    )
  ) {
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
        "Keep actions concise and recognisable so they do not compete with the component’s primary content.",
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

const compactBestPracticeMarkup = (doc: ComponentDoc, markup: string): string => {
  if (doc.key !== "mainnav") return markup;

  return markup.replace(/<sgds-mainnav(?![^>]*\bexpand=)/g, '<sgds-mainnav expand="always"');
};

const getBestPracticeDemoMarkup = (doc: ComponentDoc, tone: BestPractice["tone"]): string =>
  compactBestPracticeMarkup(doc, tone === "do" ? getPrimaryUsageDemoMarkup(doc) : buildAntiPatternMarkup(doc));

const buildGeneratedBestPractices = (doc: ComponentDoc): BestPractice[] => {
  const pattern = getGeneratedUsagePattern(doc);

  return [
    {
      title: pattern.doTitle,
      description: pattern.doDescription,
      tone: "do",
      markup: getBestPracticeDemoMarkup(doc, "do"),
    },
    {
      title: pattern.dontTitle,
      description: pattern.dontDescription,
      tone: "dont",
      markup: getBestPracticeDemoMarkup(doc, "dont"),
    },
  ];
};

const buildResolvedUsage = (doc: ComponentDoc): UsageContent => {
  const usage = doc.usage ?? {};
  const generatedBestPractices = buildGeneratedBestPractices(doc);
  const contentGuidelines = usage.contentGuidelines ?? [];

  return {
    guidance: usage.guidance?.length ? usage.guidance : buildUsageGuidance(doc),
    content: usage.content?.length ? usage.content : buildUsageContentSections(doc),
    contentGuidelines,
    behaviours: usage.behaviours?.length ? usage.behaviours : buildUsageBehaviours(doc),
    motion: usage.motion,
    bestPractices: usage.bestPractices?.length
      ? usage.bestPractices
      : generatedBestPractices,
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

const generatedAccessibilityProfileOverrides: Record<
  string,
  Partial<GeneratedAccessibilityProfile>
> = {
  alert: {
    builtInDescription: [
      "Alerts expose their message as an alert region when they are shown.",
      "Dismissible alerts use the SGDS close button for the close action.",
    ],
    builtInItems: [
      'The alert container uses `role="alert"` and updates `aria-hidden` based on its shown state.',
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
      "The last item is marked as the current location automatically.",
    ],
    authorItems: [
      "Use link text that matches the destination page.",
      "Keep the trail short enough for users to scan.",
    ],
    focusItems: [
      "Users should be able to tab through breadcrumb links in page order and reach the overflow menu trigger when it appears.",
      "Do not remove the native link destination from breadcrumb items.",
    ],
    keyboardInteractions: [
      {
        key: "Tab",
        description:
          "Moves focus to the next breadcrumb link or to the overflow menu trigger when it is present.",
      },
      {
        key: "Shift + Tab",
        description:
          "Moves focus to the previous breadcrumb link or back to the previous focusable element.",
      },
      {
        key: "Enter",
        description:
          "Activates the focused breadcrumb link, or opens the overflow menu when focus is on the ellipsis button.",
      },
      {
        key: "Space",
        description:
          "Opens the overflow menu when focus is on the ellipsis button.",
      },
      {
        key: "Tab or ↓ Down",
        description: "Moves focus to the next item in the open overflow menu.",
      },
      {
        key: "Shift + Tab or ↑ Up",
        description:
          "Moves focus to the previous item in the open overflow menu.",
      },
      {
        key: "Esc",
        description:
          "Closes the overflow menu and returns focus to the ellipsis button.",
      },
    ],
  },
  button: {
    builtInItems: [
      "Buttons render as native buttons by default and anchors when `href` is provided.",
      "The component exposes `disabled` and loading states to assistive technology.",
    ],
    authorItems: [
      "Use button text that describes the action.",
      "Add an accessible label when the visible text is replaced by an icon or loading state.",
    ],
    focusItems: [
      "Keep buttons in the same order as the task flow.",
      "Do not use a `disabled` button as the only way to explain what users need to do next.",
    ],
    keyboardInteractions: actionRows("button"),
  },
  card: {
    builtInItems: [
      "Cards provide structured slots for title, description, media, supporting content, and footer actions.",
      "Cards can become focusable when the `stretchedLink` pattern is used.",
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
      "Checkboxes render native checkbox inputs and reflect checked, `disabled`, and `invalid` states.",
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
        description:
          "Removes the last selected item when multi-select is enabled and the input is empty.",
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
      "Icon cards use card structure with an icon slot and optional `stretchedLink` behaviour.",
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
      "Image cards use card structure with an image slot and optional `stretchedLink` behaviour.",
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
      "The component supports `disabled`, `readonly`, `required`, `invalid`, and feedback states.",
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
      'Progress bars expose progress semantics with `role="progressbar"`.',
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
        description:
          "Uses the native number input cursor or step behaviour when available.",
      },
    ],
  },
  radio: {
    builtInItems: [
      "Radio buttons render native radio inputs and reflect checked and `disabled` states.",
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
      "The component reflects checked and `disabled` states.",
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
      "Use system banners for application-level messages.",
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
      "The component supports `disabled`, `readonly`, `required`, `invalid`, and feedback states.",
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
      "Thumbnail cards use card structure with a thumbnail slot and optional `stretchedLink` behaviour.",
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
      "Do not use a toast as the only place for critical instructions.",
    ],
    focusItems: [
      "Do not move focus to a toast automatically for routine status updates.",
      "If a toast includes a close button, it should remain reachable without interrupting the task.",
    ],
  },
  tooltip: {
    builtInItems: [
      "Tooltips display supporting text on hover and keyboard focus by default.",
      'The tooltip bubble uses `role="tooltip"`.',
    ],
    authorItems: [
      "Use tooltip content to clarify, not to hide essential instructions.",
      "Keep tooltip text short.",
    ],
    focusItems: [
      "The trigger must be focusable for keyboard users.",
      'Add `tabindex="0"` to non-focusable HTML triggers when they need a tooltip.',
    ],
    keyboardInteractions: focusRows("tooltip trigger"),
  },
};

const getGeneratedAccessibilityProfile = (
  doc: ComponentDoc,
): GeneratedAccessibilityProfile => {
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

const accessibilityDemoMarkupOverrides: Record<
  string,
  AccessibilityDemoMarkups
> = {
  accordion: {
    builtIn: `<sgds-accordion>
      <sgds-accordion-item open ariaLabel="Expanded section">
        <span slot="header">Expanded section</span>
        <div slot="content">Visible content confirms the current state.</div>
      </sgds-accordion-item>
      <sgds-accordion-item ariaLabel="Collapsed section">
        <span slot="header">Collapsed section</span>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
    author: `<sgds-accordion>
      <sgds-accordion-item ariaLabel="Application eligibility">
        <span slot="header">Application eligibility</span>
        <div slot="content">Check who can apply before you start.</div>
      </sgds-accordion-item>
      <sgds-accordion-item ariaLabel="Required documents">
        <span slot="header">Required documents</span>
        <div slot="content">Prepare the documents you need to upload.</div>
      </sgds-accordion-item>
    </sgds-accordion>`,
    focus: `<sgds-accordion>
      <sgds-accordion-item open ariaLabel="Review the details">
        <span slot="header">Review the details</span>
        <div slot="content" class="portal-demo-stack-sm">
          <p class="sgds:m-0">Read the guidance, then continue to the next step.</p>
          <sgds-link><a href="#">Read the full guide</a></sgds-link>
        </div>
      </sgds-accordion-item>
      <sgds-accordion-item ariaLabel="Next section">
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
    builtIn: `<sgds-datepicker open label="Appointment date"></sgds-datepicker>`,
    author: `<div class="portal-demo-stack-sm">
      <label for="appointment-date">Appointment date</label>
      <sgds-datepicker id="appointment-date" label="Appointment date" hintText="Use the format DD/MM/YYYY"></sgds-datepicker>
      <span class="sgds:text-subtle">Use the format DD/MM/YYYY.</span>
    </div>`,
    focus: `<sgds-datepicker open label="Appointment date"></sgds-datepicker>`,
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
        <span slot="title" class="sgds:font-semibold">Edit contact details</span>
        <span slot="description">Update your phone number and email address.</span>
        <sgds-input placeholder="Email address"></sgds-input>
      </sgds-drawer>
    </div>`,
    author: `<div class="portal-demo-overlay">
      <sgds-drawer open contained size="sm">
        <span slot="title" class="sgds:font-semibold">Update address</span>
        <span slot="description">Make changes for this application only.</span>
        <sgds-button slot="footer">Save changes</sgds-button>
      </sgds-drawer>
    </div>`,
    focus: `<div class="portal-demo-overlay">
      <sgds-drawer open contained size="sm">
        <span slot="title" class="sgds:font-semibold">Review details</span>
        <sgds-button slot="footer">Confirm</sgds-button>
      </sgds-drawer>
    </div>`,
  },
  dropdown: {
    builtIn: `<sgds-dropdown>
      <sgds-button slot="toggler" variant="outline" ariaLabel="More actions">More actions</sgds-button>
      <sgds-dropdown-item><button>Edit</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Download</button></sgds-dropdown-item>
    </sgds-dropdown>`,
    author: `<sgds-dropdown>
      <sgds-button slot="toggler" variant="outline" ariaLabel="Application actions">Application actions</sgds-button>
      <sgds-dropdown-item><button>View details</button></sgds-dropdown-item>
      <sgds-dropdown-item><button>Cancel application</button></sgds-dropdown-item>
    </sgds-dropdown>`,
    focus: `<sgds-dropdown open>
      <sgds-button slot="toggler" variant="outline" ariaLabel="More actions">More actions</sgds-button>
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
      <div class="portal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-built-in-title">
        <div class="portal-modal-header">
          <div class="portal-modal-header-copy">
            <span id="modal-built-in-title" class="portal-modal-title">Confirm submission</span>
          </div>
          <sgds-close-button aria-label="Close modal"></sgds-close-button>
        </div>
        <div class="portal-modal-body"><p>Check your details before submitting.</p></div>
      </div>
    </div>`,
    author: `<div class="portal-modal-preview">
      <div class="portal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-author-title">
        <div class="portal-modal-header">
          <div class="portal-modal-header-copy">
            <span id="modal-author-title" class="portal-modal-title">Delete draft?</span>
          </div>
          <sgds-close-button aria-label="Close modal"></sgds-close-button>
        </div>
        <div class="portal-modal-body"><p>This draft will be removed from your applications.</p></div>
        <div class="portal-modal-footer"><sgds-button variant="danger">Delete draft</sgds-button></div>
      </div>
    </div>`,
    focus: `<div class="portal-modal-preview">
      <div class="portal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-focus-title">
        <div class="portal-modal-header">
          <div class="portal-modal-header-copy">
            <span id="modal-focus-title" class="portal-modal-title">Review application</span>
          </div>
          <sgds-close-button aria-label="Close modal"></sgds-close-button>
        </div>
        <div class="portal-modal-footer"><sgds-button>Confirm</sgds-button></div>
      </div>
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
    builtIn: `<sgds-progress-bar value="64" label="Submission progress" arialabel="Submission progress"></sgds-progress-bar>`,
    author: `<div class="portal-demo-stack-sm">
      <sgds-progress-bar value="3" max="4" label="Step 3 of 4" arialabel="Step 3 of 4"></sgds-progress-bar>
      <span class="sgds:text-subtle">Uploading supporting documents.</span>
    </div>`,
    focus: `<div class="portal-demo-stack-sm">
      <sgds-progress-bar value="64" label="Submission progress" arialabel="Submission progress"></sgds-progress-bar>
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
    builtIn: `<sgds-select menuIsOpen placeholder="Choose a service">
      <sgds-select-option value="passport">Passport</sgds-select-option>
      <sgds-select-option value="licence">Driving licence</sgds-select-option>
    </sgds-select>`,
    author: `<sgds-select placeholder="Choose a service">
      <sgds-select-option value="passport">Passport renewal</sgds-select-option>
      <sgds-select-option value="licence">Driving licence</sgds-select-option>
    </sgds-select>`,
    focus: `<sgds-select menuIsOpen placeholder="Choose a service">
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
      <sgds-stepper data-portal-stepper="default" activeStep="2"></sgds-stepper>
    </div>`,
    author: `<div class="portal-demo-stepper">
      <sgds-stepper data-portal-stepper="default" activeStep="1"></sgds-stepper>
    </div>`,
    focus: `<div class="portal-demo-stepper">
      <sgds-stepper data-portal-stepper="default" activeStep="0"></sgds-stepper>
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
      <sgds-tab slot="nav" panel="overview" active ariaLabel="Overview">Overview</sgds-tab>
      <sgds-tab slot="nav" panel="documents" ariaLabel="Documents">Documents</sgds-tab>
      <sgds-tab-panel name="overview">Overview content</sgds-tab-panel>
      <sgds-tab-panel name="documents">Document content</sgds-tab-panel>
    </sgds-tab-group>`,
    author: `<sgds-tab-group variant="underlined">
      <sgds-tab slot="nav" panel="summary" active ariaLabel="Summary">Summary</sgds-tab>
      <sgds-tab slot="nav" panel="history" ariaLabel="History">History</sgds-tab>
      <sgds-tab-panel name="summary">Current application details</sgds-tab-panel>
      <sgds-tab-panel name="history">Past updates</sgds-tab-panel>
    </sgds-tab-group>`,
    focus: `<sgds-tab-group variant="underlined">
      <sgds-tab slot="nav" panel="one" active ariaLabel="Details">Details</sgds-tab>
      <sgds-tab slot="nav" panel="two" ariaLabel="Documents">Documents</sgds-tab>
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
      <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
      Your application has been saved.
    </sgds-toast>`,
    author: `<sgds-toast show title="Upload complete" variant="success">
      <sgds-icon slot="icon" name="cloud-upload"></sgds-icon>
      Document.pdf has been uploaded.
    </sgds-toast>`,
    focus: `<sgds-toast show dismissible title="Saved" variant="success">
      <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
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

const buildAccessibilitySections = (
  doc: ComponentDoc,
): AccessibilitySection[] => {
  const demoMarkups = accessibilityDemoMarkupOverrides[doc.key] ?? {};

  if (doc.accessibility && "sections" in doc.accessibility) {
    return (doc.accessibility.sections ?? []).map((section) => ({
      ...section,
      markup:
        section.markup ??
        (section.title === "Built-in accessibility"
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

const buildAccessibilityKeyboardRows = (
  doc: ComponentDoc,
): AccessibilityKeyboardRow[] => {
  if (doc.accessibility?.keyboardInteractions?.length)
    return doc.accessibility.keyboardInteractions;

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
    "Keyboard behaviour depends on the links, buttons, or `stretchedLink` pattern placed inside the card.",
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

const buildAccessibilityKeyboardNotes = (
  doc: ComponentDoc,
  keyboardInteractions: AccessibilityKeyboardRow[],
): string[] => {
  if (keyboardInteractions.length) return [];
  if (doc.accessibility?.keyboardNotes?.length)
    return doc.accessibility.keyboardNotes;

  return (
    keyboardNoteOverrides[doc.key] ?? [
      `${doc.title} does not define a separate keyboard pattern on its own.`,
      "Keyboard interaction only applies to links, buttons, or controls placed inside the component.",
    ]
  );
};

const buildResolvedAccessibility = (
  doc: ComponentDoc,
): AccessibilityContent => {
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
      rows: doc.releaseRows ?? [],
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
      linkLabel: "Slack → #ask-sgds-v3",
      href: "https://govtech.slack.com/archives/C07VD8Z5QKS",
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
  anatomyPreviewMarkup: string;
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
    anatomyPreviewMarkup: buildAnatomyPreviewMarkup(doc),
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

const componentStorybookIdSegment = (key: string): string =>
  key.replace(/-/g, "");

export const getComponentStorybookHref = (key: string): string =>
  `https://webcomponent.designsystem.tech.gov.sg/?path=/docs/components-${componentStorybookIdSegment(key)}--docs`;

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
