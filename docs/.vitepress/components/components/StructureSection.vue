<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CodeToken from "../ui/CodeToken.vue";
import SegmentedControl from "./SegmentedControl.vue";
import type { MeasurementTokenGroup, MeasurementTokenRow } from "../../data/component-docs";

const props = defineProps<{
  previewMarkup: string;
  tokens: MeasurementTokenRow[];
  tokenGroups?: MeasurementTokenGroup[];
  globalTokens?: MeasurementTokenRow[];
  globalTokenGroups?: MeasurementTokenGroup[];
}>();
type HotspotRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  insetLeft?: number;
  insetTop?: number;
  insetWidth?: number;
  insetHeight?: number;
};
type InspectMeta = {
  label: string;
  value: string;
  valueSuffix?: string;
  aria: string;
  rows?: {
    label: string;
    value: string;
    valueSuffix?: string;
  }[];
};
type InspectMetaRow = NonNullable<InspectMeta["rows"]>[number];
type StructureTokenTableRow = MeasurementTokenRow & {
  groupTitle?: string;
};
type PaddingBand = { left: number; top: number; width: number; height: number; borderRadius?: string };
type PaddingAxis = "x" | "y" | "all" | "left" | "right" | "top" | "bottom";
const hoverKey = ref<string | null>(null);
const selectedKeys = ref<string[]>([]);
const rootRef = ref<HTMLElement | null>(null);
const previewShellRef = ref<HTMLElement | null>(null);
const previewMarkupRef = ref<HTMLElement | null>(null);
const hotspotRects = ref<Record<string, HotspotRect | null>>({});
const breadcrumbGroupGapBands = ref<Array<{ left: number; top: number; width: number; height: number }>>([]);
const breadcrumbIconBands = ref<Array<{ left: number; top: number; width: number; height: number }>>([]);
const genericGapBandsByKey = ref<Record<string, PaddingBand[]>>({});
// Component-specific padding bands populated by measureHotspots (e.g. table
// renders bands on every cell, not just the first). Merged into
// genericPaddingBandsByKey alongside the auto-computed bands.
const extraPaddingBandsByKey = ref<Record<string, PaddingBand[]>>({});
// Component-specific border bands populated by measureHotspots when the
// generic perimeter-ring rendering is wrong for this component. Subnav, for
// instance, has bottom-only borders on the nav element (1px) and the active
// subnav-item (2px) — wrapping the whole subnav in a ring would imply
// borders on all four sides. When a key has bands here, the perimeter ring
// is suppressed and these bands render as proxy buttons + visual strips
// instead.
const customBorderBandsByKey = ref<Record<string, PaddingBand[]>>({});
// Button `gap` highlights each void between adjacent content (leftIcon↔label,
// label↔rightIcon) rather than one wide band across the whole label. Each
// entry is a discrete band; hover proxies + visual overlays v-for over these.
const buttonGapBands = ref<Array<{ left: number; top: number; width: number; height: number }>>([]);
const isComboBoxStructure = computed(() => props.previewMarkup.includes("<sgds-combo-box"));
const isDatepickerStructure = computed(() => props.previewMarkup.includes("<sgds-datepicker"));
const isDescriptionListStructure = computed(() => props.previewMarkup.includes("<sgds-description-list"));
const isDividerStructure = computed(() => props.previewMarkup.includes("<sgds-divider"));
const isDropdownStructure = computed(() => props.previewMarkup.includes("<sgds-dropdown"));
const isDrawerStructure = computed(() => props.previewMarkup.includes("<sgds-drawer"));
const isFooterStructure = computed(() => props.previewMarkup.includes("<sgds-footer"));
const isMastheadStructure = computed(() => props.previewMarkup.includes("<sgds-masthead"));
const isModalStructure = computed(() => props.previewMarkup.includes("<sgds-modal"));
const isModalFullscreenStructure = computed(() => isModalStructure.value && activeVariant.value === "fullscreen");
const isTooltipStructure = computed(() => props.previewMarkup.includes("<sgds-tooltip"));
const isToastStructure = computed(() => props.previewMarkup.includes("<sgds-toast"));
const isTabStructure = computed(() => props.previewMarkup.includes("<sgds-tab-group"));
const isLinkStructure = computed(() => props.previewMarkup.includes("<sgds-link"));
const isSelectStructure = computed(() => props.previewMarkup.includes("<sgds-select"));
const isSwitchStructure = computed(() => props.previewMarkup.includes("<sgds-switch"));
const isSidebarStructure = computed(() => props.previewMarkup.includes("<sgds-sidebar"));
const isStepperStructure = computed(() => props.previewMarkup.includes("<sgds-stepper"));

// Collect every distinct `variant` label from the token rows. When this list
// has 2+ entries, the structure preview shows a segmented control above the
// demo to switch the active variant. Tokens that omit `variant` are shared
// across all variants and always render in the table.
const structureRowVariants = computed<string[]>(() => {
  const variants = new Set<string>();
  for (const row of props.tokens) {
    if (row.variant) variants.add(row.variant);
  }
  for (const group of props.tokenGroups ?? []) {
    for (const row of group.tokens) {
      if (row.variant) variants.add(row.variant);
    }
  }
  return Array.from(variants);
});

// Spelled-out labels for size variants. Used for any component whose
// segmented control switches the `size` attribute (link, button, icon-button,
// modal, drawer, switch, spinner, …) — keeps the segment text human-readable
// instead of the cryptic two-letter token names.
const sizeLabels: Record<string, string> = {
  xs: "Extra small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
  "2-xl": "2x large",
  "3-xl": "3x large",
  fullscreen: "Fullscreen",
};
const densityLabels: Record<string, string> = {
  default: "Default",
  compact: "Compact",
  spacious: "Spacious",
};
const breakpointOrder = ["320", "512", "768", "1024", "1280", "1440"];
const footerBreakpointWidthClasses: Record<string, string> = {
  "320": "sgds:w-[var(--sgds-dimension-320)]",
  "512": "sgds:w-[var(--sgds-dimension-480)]",
  "768": "sgds:w-[var(--sgds-dimension-688)]",
  "1024": "sgds:w-[var(--sgds-dimension-888)]",
  "1280": "sgds:w-[var(--sgds-dimension-1168)]",
  "1440": "sgds:w-[var(--sgds-dimension-1312)]",
};

// Stable ordering for size segments so they always read smallest → largest,
// regardless of the order tokens happen to be authored in the data file.
const sizeOrder = ["xs", "sm", "md", "lg", "xl", "2-xl", "3-xl", "fullscreen"];
const densityOrder = ["default", "compact", "spacious"];

// Pick a sensible starting variant from the available list. Prefers `md`
// (the SGDS default for most sized components), then `default`, then the
// first entry. Used both for the initial state and whenever the variant set
// changes.
const pickDefaultVariant = (variants: string[]): string | null => {
  if (variants.length === 0) return null;
  if (variants.includes("md")) return "md";
  if (variants.includes("default")) return "default";
  return variants[0];
};

// Active variant state for the demo + tokens table.
const activeVariant = ref<string | null>(pickDefaultVariant(structureRowVariants.value));
watch(structureRowVariants, (variants) => {
  if (variants.length === 0) {
    activeVariant.value = null;
  } else if (!activeVariant.value || !variants.includes(activeVariant.value)) {
    activeVariant.value = pickDefaultVariant(variants);
  }
});

// Maps a chip-cased variant ("Underlined", "Solid") to the lowercase value the
// SGDS web component expects on its `variant=""` attribute.
const variantAttributeValue = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

// SGDS components that switch size via the `size=""` HTML attribute. When the
// structure preview targets one of these, the segmented control writes the
// selected variant onto this attribute (mirroring the live component's API).
const SIZED_COMPONENT_TAGS = [
  "sgds-button",
  "sgds-link",
  "sgds-icon",
  "sgds-icon-button",
  "sgds-icon-list",
  "sgds-close-button",
  "sgds-modal",
  "sgds-drawer",
  "sgds-spinner",
  "sgds-switch",
  "sgds-overflow-menu",
  "sgds-pagination",
];

const isSizedStructure = computed(() =>
  SIZED_COMPONENT_TAGS.some((tag) => props.previewMarkup.includes(`<${tag}`)),
);

// HTML attribute name to set on the structure-section's component for variant
// switching. Tabs use `variant`; sized components use `size`.
const variantAttributeName = computed<string | null>(() => {
  if (structureKind.value === "accordion") return "density";
  if (isFooterStructure.value) return "data-structure-breakpoint";
  if (isDividerStructure.value) return "thickness";
  if (isTabStructure.value) return "variant";
  if (isSizedStructure.value) return "size";
  return null;
});

const variantSegmentOptions = computed(() => {
  const usesSizeLabels = variantAttributeName.value === "size";
  const usesDensityLabels = variantAttributeName.value === "density";
  const variants = usesSizeLabels
    ? [...structureRowVariants.value].sort(
        (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b),
      )
    : usesDensityLabels
      ? [...structureRowVariants.value].sort(
          (a, b) => densityOrder.indexOf(a) - densityOrder.indexOf(b),
        )
    : isFooterStructure.value
      ? [...structureRowVariants.value].sort(
          (a, b) => breakpointOrder.indexOf(a) - breakpointOrder.indexOf(b),
        )
      : structureRowVariants.value;
  return variants.map((label) => ({
    value: label,
    label: usesSizeLabels
      ? sizeLabels[label] ?? label
      : usesDensityLabels
        ? densityLabels[label] ?? label
        : label,
  }));
});

const footerPreviewWidthClass = computed(() =>
  footerBreakpointWidthClasses[activeVariant.value ?? ""] ?? footerBreakpointWidthClasses["320"],
);

const rowTextMentionsVariant = (row: MeasurementTokenRow, variant: string) => {
  const label = variant.toLowerCase();
  const haystack = [
    row.element,
    row.property,
    row.designToken,
    row.rawValue,
    row.usage,
  ].filter(Boolean).join(" ").toLowerCase();

  return new RegExp(`\\b${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(haystack);
};

const inferredRowVariant = (row: MeasurementTokenRow) =>
  structureRowVariants.value.find((variant) => rowTextMentionsVariant(row, variant)) ?? null;

// True when a token row should be visible given the currently selected variant.
// Rows with an explicit `variant` only show when it matches the active variant.
// Rows without `variant` are shared, unless their copy clearly names one of
// the available variants (for example "compact accordion body text").
const isRowVisibleForActiveVariant = (row: MeasurementTokenRow) => {
  if (!activeVariant.value) return true;
  const rowVariant = row.variant ?? inferredRowVariant(row);
  if (!rowVariant) return true;
  return rowVariant === activeVariant.value;
};
// The OUTER SGDS element in the preview markup determines the structure kind.
// Picking the first match in the string would mis-classify components like
// subnav (which contains `<sgds-button slot="actions">` inside it) as a button.
const outerSgdsTag = computed(() => props.previewMarkup.match(/<sgds-([a-z][a-z0-9-]*)/)?.[1] ?? "");
const structureKind = computed<"accordion" | "card" | "button" | "alert" | "breadcrumb" | "generic">(() => {
  switch (outerSgdsTag.value) {
    case "accordion": return "accordion";
    case "card": return "card";
    case "button": return "button";
    case "alert": return "alert";
    case "breadcrumb": return "breadcrumb";
    default: return "generic";
  }
});
const defaultStructureVariantId = computed(() => {
  const uniqueVariants = structureRowVariants.value;
  return uniqueVariants.includes("default")
    ? "default"
    : uniqueVariants.includes("md")
      ? "md"
      : uniqueVariants[0] ?? null;
});

let resizeObserver: ResizeObserver | null = null;

const visibleTokenGroups = computed(() => {
  return props.tokenGroups ?? [];
});
const tokenDisplay = (row?: MeasurementTokenRow) => row?.designToken || "—";
const tokenValue = (row?: MeasurementTokenRow) => row?.rawValue || "—";
const hasTooltipValue = (value?: string) => Boolean(value && value !== "—");
const isVisibleTooltipRow = (row: InspectMetaRow) =>
  hasTooltipValue(row.value) && hasTooltipValue(row.valueSuffix);
const getVisibleTooltipRows = (meta: InspectMeta) =>
  meta.rows?.filter(isVisibleTooltipRow) ?? [];
const shouldShowPrimaryTooltipRow = (meta: InspectMeta) =>
  hasTooltipValue(meta.value) && hasTooltipValue(meta.valueSuffix);
const hasVisibleTooltipContent = (meta?: InspectMeta) =>
  Boolean(meta && (shouldShowPrimaryTooltipRow(meta) || getVisibleTooltipRows(meta).length));
const shouldShowTooltipRowCategory = (meta: InspectMeta, index: number) =>
  !shouldShowPrimaryTooltipRow(meta) && index === 0;
// Render tokens as `sgds-border-radius-md` instead of `sgds/border-radius/md`
// to match how they're consumed as CSS custom properties (--sgds-border-radius-md).
const formatToken = (token: string) => token.replace(/\//g, "-");
const getDimensionFallbackLabel = (
  key: string | null,
  orientation: "height" | "width" | null = null,
) => {
  if (orientation === "height") return "Height varies";
  if (orientation === "width") return "Width varies";
  if (key?.includes("height")) return "Height varies";
  if (key?.includes("width")) return "Width varies";
  if (key === "min-width") return "Width varies";
  return null;
};
const getStructureValue = (
  row?: MeasurementTokenRow,
  key: string | null = null,
  orientation: "height" | "width" | null = null,
) => {
  if (row?.rawValue) return row.rawValue;
  return getDimensionFallbackLabel(key, orientation) || "—";
};

const cardTokenMap = computed(() => new Map(
  (props.tokenGroups?.[0]?.tokens ?? []).map((token) => [token.mapKey || token.property, token]),
));

const cardBaseTokenMap = computed(() => new Map(
  props.tokens.map((token) => [token.mapKey || token.property, token]),
));

const accordionBaseTokenMap = computed(() => new Map(
  props.tokens.map((token) => [token.mapKey || token.property, token]),
));

const activeVariantGroupTokens = computed(() =>
  (props.tokenGroups?.flatMap((group) => group.tokens) ?? []).filter(isRowVisibleForActiveVariant),
);

// Merge the shared button tokens (colour/border/gap) with the tokens of the
// currently-active size group (padding-x/height/min-width/font-size/line-height)
// so hotspot tooltips always reflect the selected size.
const buttonBaseTokenMap = computed(() => {
  const activeSizeTokens = structureKind.value === "button"
    ? activeVariantGroupTokens.value
    : [];
  return new Map(
    [...props.tokens, ...activeSizeTokens].map((token) => [token.mapKey || token.property, token]),
  );
});

const alertBaseTokenMap = computed(() => new Map(
  props.tokens.map((token) => [token.mapKey || token.property, token]),
));

const alertSemanticTokenMap = computed(() => new Map(
  (
    props.tokenGroups?.find((group) => group.title.endsWith("/ success"))?.tokens ??
    props.tokenGroups?.[0]?.tokens ??
    []
  ).map((token) => [token.mapKey || token.property, token]),
));

const globalTokenMap = computed(() => new Map(
  (props.globalTokens ?? []).map((token) => [token.mapKey || token.property, token]),
));

const densityTokenMap = computed(() => new Map(
  activeVariantGroupTokens.value.flatMap((token) => {
    const keys = [token.property];
    if (token.mapKey) keys.push(token.mapKey);
    return keys.map((key) => [key, token] as const);
  }),
));

const genericTokenRows = computed(() => [
  ...props.tokens,
  ...(props.tokenGroups?.flatMap((group) => group.tokens) ?? []),
]);

const activeGenericTokenRows = computed(() =>
  genericTokenRows.value.filter(isRowVisibleForActiveVariant),
);

const genericTokenMap = computed(() => new Map(
  activeGenericTokenRows.value.map((token) => [token.mapKey || token.property, token]),
));

const allStructureTokenRows = computed(() => [
  ...props.tokens,
  ...(props.tokenGroups?.flatMap((group) => group.tokens) ?? []),
  ...(props.globalTokens ?? []),
  ...(props.globalTokenGroups?.flatMap((group) => group.tokens) ?? []),
]);

const activeStructureTokenRows = computed(() =>
  allStructureTokenRows.value.filter(isRowVisibleForActiveVariant),
);

const allStructureTokenMap = computed(() => new Map(
  activeStructureTokenRows.value.map((token) => [token.mapKey || token.property, token]),
));

const getTooltipTokenRowByKey = (key?: string | null): MeasurementTokenRow | undefined => {
  if (!key) return undefined;
  return (
    allStructureTokenMap.value.get(key) ||
    genericTokenMap.value.get(key) ||
    densityTokenMap.value.get(key) ||
    buttonBaseTokenMap.value.get(key) ||
    alertBaseTokenMap.value.get(key) ||
    cardBaseTokenMap.value.get(key) ||
    accordionBaseTokenMap.value.get(key) ||
    alertSemanticTokenMap.value.get(key) ||
    globalTokenMap.value.get(key)
  );
};

const getTooltipTokenRowByValue = (value?: string | null): MeasurementTokenRow | undefined => {
  if (!value) return undefined;
  return activeStructureTokenRows.value.find((token) => token.designToken === value);
};

const getTooltipCategoryFallback = (key?: string | null) => {
  if (isPaddingOverlayKey(key || null)) return "Padding";
  if (isGapOverlayKey(key || null)) return "Gap";
  if (isSizeOverlayKey(key || null)) return "Size";
  if (isBorderOrColorOverlayKey(key || null)) {
    return key?.includes("border") ? "Border" : "Colour";
  }
  return "Token";
};

const getTooltipPrimaryCategory = (key: string | null, meta: InspectMeta) => {
  const tokenRow =
    getTooltipTokenRowByKey(key) ||
    getTooltipTokenRowByKey(meta.label) ||
    getTooltipTokenRowByValue(meta.value);
  return tokenRow?.category || tokenRow?.element || getTooltipCategoryFallback(key || meta.label || meta.value);
};

const getTooltipRowCategory = (row: InspectMetaRow, fallbackKey: string | null) => {
  const tokenRow =
    getTooltipTokenRowByKey(row.label) ||
    getTooltipTokenRowByValue(row.value) ||
    getTooltipTokenRowByKey(fallbackKey);
  return tokenRow?.category || tokenRow?.element || getTooltipCategoryFallback(row.label || fallbackKey || row.value);
};

const baseTokenRows = computed(() => [
  ...props.tokens,
  ...(props.globalTokens ?? []),
].filter(isRowVisibleForActiveVariant));

const visibleDesignTokenGroups = computed(() => [
  ...visibleTokenGroups.value,
  ...(props.globalTokenGroups ?? []),
]);

const visibleRowsInGroup = (group: { tokens: MeasurementTokenRow[] }) =>
  group.tokens.filter(isRowVisibleForActiveVariant);

const designTokenRows = computed<StructureTokenTableRow[]>(() => [
  ...baseTokenRows.value,
  ...visibleDesignTokenGroups.value.flatMap((group) =>
    visibleRowsInGroup(group).map((row) => ({
      ...row,
      groupTitle: group.title,
    })),
  ),
]);

const hasDesignTokenRows = computed(() =>
  designTokenRows.value.length > 0,
);

const baseTokenTitle = computed(() => {
  if (structureKind.value === "card") return "sgds/card";
  if (structureKind.value === "accordion") return "sgds/accordion";
  if (structureKind.value === "button") return "sgds/btn";
  if (structureKind.value === "alert") return "sgds/alert";
  if (props.tokenGroups?.[0]?.title) return props.tokenGroups[0].title;
  return "";
});

const isThumbnailCardStructure = computed(() =>
  baseTokenTitle.value.includes("thumbnail-card"),
);

const componentTokenHelper = computed(() => {
  const exampleToken = props.tokens[0]?.property || props.tokenGroups?.[0]?.tokens[0]?.property || "token-name";
  return {
    exampleToken,
    prefix: baseTokenTitle.value,
    fullToken: `${baseTokenTitle.value}/${exampleToken}`,
  };
});

const tooltipPlacement = computed(() => {
  if (!hoverKey.value) return "left";
  const rect = hotspotRects.value[hoverKey.value];
  const shellWidth = previewShellRef.value?.clientWidth ?? 0;
  if (!rect || !shellWidth) return "left";
  return rect.left + rect.width / 2 > shellWidth * 0.62 ? "right" : "left";
});

const tooltipStyle = computed(() => {
  if (!hoverKey.value) return {};
  const rect = hotspotRects.value[hoverKey.value];
  if (!rect) return {};

  return {
    left: `${tooltipPlacement.value === "right" ? rect.left + rect.width : rect.left}px`,
    top: `${rect.top}px`,
  };
});

const cardBorderHoverBands = computed(() => {
  if (structureKind.value !== "card") return [];
  if (!isHoverableStructureKey("border-radius")) return [];
  const rect = hotspotRects.value["border-radius"] ?? hotspotRects.value["border-width"];
  if (!rect) return [];

  const thickness = 10;
  const horizontalWidth = Math.max(0, rect.width - thickness * 2);
  const verticalHeight = Math.max(0, rect.height - thickness * 2);

  return [
    { left: rect.left, top: rect.top, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + rect.height - thickness, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + thickness, width: thickness, height: verticalHeight },
    { left: rect.left + rect.width - thickness, top: rect.top + thickness, width: thickness, height: verticalHeight },
  ];
});

const accordionBorderHoverBands = computed(() => {
  if (structureKind.value !== "accordion") return [];
  if (!isHoverableStructureKey("border-radius")) return [];
  const rect = hotspotRects.value["border-radius"] ?? hotspotRects.value["border-width"];
  if (!rect) return [];

  const thickness = 6;
  const verticalHeight = Math.max(0, rect.height - thickness * 2);

  return [
    { left: rect.left, top: rect.top, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + rect.height - thickness, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + thickness, width: thickness, height: verticalHeight },
    { left: rect.left + rect.width - thickness, top: rect.top + thickness, width: thickness, height: verticalHeight },
  ];
});

const alertBorderHoverBands = computed(() => {
  if (structureKind.value !== "alert") return [];
  if (!isHoverableStructureKey("border-radius")) return [];
  const rect = hotspotRects.value["border-radius"] ?? hotspotRects.value["border-width"];
  if (!rect) return [];

  const thickness = 10;
  const horizontalWidth = Math.max(0, rect.width - thickness * 2);
  const verticalHeight = Math.max(0, rect.height - thickness * 2);

  return [
    { left: rect.left, top: rect.top, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + rect.height - thickness, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + thickness, width: thickness, height: verticalHeight },
    { left: rect.left + rect.width - thickness, top: rect.top + thickness, width: thickness, height: verticalHeight },
  ];
});

// Thin proxy bands that follow the button's border edge. Hovering any of them
// sets hoverKey to a shared "border" key so both border-width and border-radius
// overlays are inspected together.
const buttonBorderHoverBands = computed(() => {
  if (structureKind.value !== "button") return [];
  if (!isHoverableStructureKey("border-width")) return [];
  const rect = hotspotRects.value["border-radius"] ?? hotspotRects.value["border-width"];
  if (!rect) return [];

  const thickness = 4;
  const verticalHeight = Math.max(0, rect.height - thickness * 2);

  return [
    { left: rect.left, top: rect.top, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + rect.height - thickness, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + thickness, width: thickness, height: verticalHeight },
    { left: rect.left + rect.width - thickness, top: rect.top + thickness, width: thickness, height: verticalHeight },
  ];
});

const DIMENSION_ANNOTATION_GUTTER = 8;
const DIMENSION_ANNOTATION_WIDTH = 18;

// Static dimension annotations (height, min-width) rendered outside the
// button's surface rect — Figma-style guide lines. These do not intercept
// hover, so padding-x / typography hotspots under the button are accessible.
// Returns null when either the surface isn't known yet or the structure isn't
// a button.
const buttonDimensionAnnotations = computed(() => {
  if (structureKind.value !== "button") return null;
  const rect = hotspotRects.value["background"];
  if (!rect) return null;

  const heightLabel = getStructureValue(buttonBaseTokenMap.value.get("height"), "height", "height");
  const minWidthLabel = getStructureValue(buttonBaseTokenMap.value.get("min-width"), "min-width", "width");

  return {
    height: {
      label: heightLabel,
      left: rect.left + rect.width + DIMENSION_ANNOTATION_GUTTER,
      top: rect.top,
      size: rect.height,
    },
    minWidth: {
      label: minWidthLabel,
      left: rect.left,
      top: rect.top + rect.height + DIMENSION_ANNOTATION_GUTTER,
      size: rect.width,
    },
  };
});

// Tokens whose name contains "width" but whose value represents a STROKE
// thickness (perpendicular to the long axis of a thin strip) — e.g. the 4px
// active-tab indicator or the 1px nav divider. They are still hoverable via
// the inspect-proxy bands, but we don't render a static dimension annotation
// for them in the demo: the strip itself is too thin for a bracket and the
// floating label clutters the preview without adding information that's not
// already in the popup on hover.
const isStrokeThicknessKey = (key: string) =>
  key.includes("indicator-width") || key.includes("divider-width") || key.includes("stroke-width");

const getSizeAnnotationKeys = (key: string | null) => {
  if (!key) return null;
  if (isStrokeThicknessKey(key)) {
    return null;
  }
  if (key.includes("border-width")) {
    return null;
  }
  if (key === "input-size") {
    return { heightKey: key, widthKey: key };
  }
  if (isLinkStructure.value && key === "icon-size") {
    return { heightKey: key, widthKey: key };
  }
  if (key.includes("font-size") || key.includes("line-height")) {
    return null;
  }
  if (key.includes("height")) {
    return { heightKey: key, widthKey: null };
  }
  if (key.includes("width")) {
    return { heightKey: null, widthKey: key };
  }
  if (
    isModalFullscreenStructure.value &&
    ["dimension-888", "dimension-1168", "dimension-1312"].includes(key)
  ) {
    return null;
  }
  if (key.includes("dimension") || key.endsWith("size") || key.includes("-size")) {
    return { heightKey: key, widthKey: key };
  }
  return null;
};

// Read a token's `usage` string to infer which axis the value applies to.
// "Height of the foo" → "height". "Maximum width of the bar" → "width".
// "Height of X; width of X" → "both". Anything ambiguous returns null so the
// annotation logic falls back to its default behaviour (both axes).
const inferDimensionAxis = (usage?: string): "height" | "width" | "both" | null => {
  if (!usage) return null;
  const lower = usage.toLowerCase();
  const hasHeight = /\bheight\b/.test(lower);
  const hasWidth = /\bwidth\b/.test(lower);
  if (hasHeight && hasWidth) return "both";
  if (hasHeight) return "height";
  if (hasWidth) return "width";
  return null;
};

// Detect whether a dimension token represents a max-* or min-* constraint
// based on its usage text. Used to render the bracket at the constraint's
// pixel value (e.g. 192px) rather than the component's current rendered
// size, and to prefix the label with "Max " / "Min ".
const inferDimensionConstraint = (usage?: string): "max" | "min" | null => {
  if (!usage) return null;
  const lower = usage.toLowerCase();
  if (/\bmax(?:imum)?\b/.test(lower)) return "max";
  if (/\bmin(?:imum)?\b/.test(lower)) return "min";
  return null;
};

// Convert a raw token value like "192px" or "1.5rem" to a pixel number for
// sizing annotation brackets. Returns null when the value is non-numeric
// (e.g. "Width varies").
const parseRawPxValue = (rawValue?: string): number | null => {
  if (!rawValue) return null;
  const pxMatch = rawValue.match(/^(-?\d+(?:\.\d+)?)px$/);
  if (pxMatch) return Number.parseFloat(pxMatch[1]);
  const remMatch = rawValue.match(/^(-?\d+(?:\.\d+)?)rem$/);
  if (remMatch) return Number.parseFloat(remMatch[1]) * 16;
  return null;
};

const isZeroTokenValue = (token?: MeasurementTokenRow | null) => {
  if (!token) return false;
  const raw = (token.rawValue || "").trim();
  if (raw && /^0(?:\.0+)?(?:px|rem|em|%)?$/.test(raw)) return true;
  const designToken = (token.designToken || "").toLowerCase();
  return designToken.endsWith("/none") || designToken.endsWith("/0");
};

const formatConstraintLabel = (constraint: "max" | "min" | null, rawValue: string): string => {
  if (constraint === "max") return `Max ${rawValue}`;
  if (constraint === "min") return `Min ${rawValue}`;
  return rawValue;
};

const isDrawerDimensionKey = (key: string | null) =>
  isDrawerStructure.value && (key === "dimension" || Boolean(key?.startsWith("dimension-")));

const staticSizeAnnotations = computed(() => {
  if (structureKind.value === "button") return null;
  const annotations: Array<{
    id: string;
    orientation: "height" | "width";
    labelPlacement?: "default" | "left" | "above";
    label: string;
    left: number;
    top: number;
    size: number;
    isThickness?: boolean;
    isIconSize?: boolean;
  }> = [];
  const annotationSlots = new Set<string>();
  const addAnnotation = (annotation: (typeof annotations)[number]) => {
    const slotKey = [
      annotation.orientation,
      annotation.labelPlacement || "default",
      Math.round(annotation.left),
      Math.round(annotation.top),
      Math.round(annotation.size),
    ].join(":");
    if (annotationSlots.has(slotKey)) return;
    annotationSlots.add(slotKey);
    annotations.push(annotation);
  };

  // Bracket element dimensions (must match .accordion-inspect-annotation--*
  // CSS). The bracket itself is 18px in its main axis, with end caps spanning
  // offsets 4–13 inside that 18px box.
  const HEIGHT_BRACKET_WIDTH = 18;
  const WIDTH_BRACKET_HEIGHT = 18;
  // Estimated footprint of a bracket + label outside the component rect.
  // Used to detect when the default placement would push the annotation off
  // the preview shell so we can flip it to the opposite side instead.
  const HEIGHT_BRACKET_FOOTPRINT = 60; // bracket (18px) + label peek (~40px)
  const WIDTH_BRACKET_FOOTPRINT = 32; // bracket (18px) + label peek (~14px)
  const shellWidth = previewShellRef.value?.clientWidth ?? 0;
  const shellHeight = previewShellRef.value?.clientHeight ?? 0;

  Object.keys(hotspotRects.value).forEach((key) => {
    const annotationKeys = getSizeAnnotationKeys(key);
    const rect = hotspotRects.value[key];
    if (!annotationKeys || !rect) return;
    if (isDatepickerStructure.value && ["form-height-lg", "form-width-md"].includes(key)) return;
    if (isDescriptionListStructure.value && key === "dimension-280") return;
    if (isDrawerDimensionKey(key)) return;
    if (isDropdownStructure.value && key === "dimension-192") return;

    // When the component is flush with the shell's right or bottom edge, the
    // default bracket placement would render outside the preview area (or on
    // top of the component, since the shell clips overflow). Flip the bracket
    // to the opposite side in that case.
    const rightOverflow =
      shellWidth > 0 &&
      rect.left + rect.width + DIMENSION_ANNOTATION_GUTTER + HEIGHT_BRACKET_FOOTPRINT >
        shellWidth;
    const bottomOverflow =
      shellHeight > 0 &&
      rect.top + rect.height + DIMENSION_ANNOTATION_GUTTER + WIDTH_BRACKET_FOOTPRINT >
        shellHeight;

    // Some structures populate hotspot rects for keys that have no backing
    // token row (e.g. icon-button sets "width"/"height"/"icon-size" rects on
    // the surface for hover-pairing only). Without this guard, those keys
    // would render "Width varies" / "Height varies" fallback brackets even
    // though no token row exists to inspect. Skip the axis when there's no
    // active token to read a value from.
    const heightToken = annotationKeys.heightKey
      ? allStructureTokenMap.value.get(annotationKeys.heightKey)
      : null;
    const widthToken = annotationKeys.widthKey
      ? allStructureTokenMap.value.get(annotationKeys.widthKey)
      : null;

    // Suppress the height bracket when the active token's `usage` only
    // describes a width, and vice versa. Tokens like "Maximum width of the
    // modal panel" should render a width bracket below the surface but no
    // height bracket on the right. Square-shape tokens whose usage mentions
    // both axes ("Height of X; width of X") still render both.
    const heightAxis = inferDimensionAxis(heightToken?.usage);
    const widthAxis = inferDimensionAxis(widthToken?.usage);

    if (
      annotationKeys.heightKey &&
      heightToken?.rawValue &&
      !isZeroTokenValue(heightToken) &&
      heightAxis !== "width" &&
      !isDrawerDimensionKey(key)
    ) {
      const isThickness = isStrokeThicknessKey(key);
      // The switch's toggle sits to the LEFT of its label inside the host —
      // a bracket on the right would overlap the label text. Pin the switch
      // height bracket to the left of the toggle instead.
      const leftSpace = rect.left;
      const rightSpace = shellWidth > 0
        ? shellWidth - (rect.left + rect.width)
        : Number.POSITIVE_INFINITY;
      const leftHasBracketSpace = leftSpace >= HEIGHT_BRACKET_WIDTH + DIMENSION_ANNOTATION_GUTTER;
      const rightHasBracketSpace = rightSpace >= HEIGHT_BRACKET_WIDTH + DIMENSION_ANNOTATION_GUTTER;
      const forceLeftSide = isMastheadStructure.value && key === "dimension-20";
      const forceRightSide = isStepperStructure.value && key === "dimension-32";
      const prefersLeft =
        !forceRightSide &&
        (
          (structureKind.value === "generic" && key === "input-size") ||
          isSwitchStructure.value ||
          isThickness ||
          rightOverflow
        );
      const placeOnLeft =
        leftHasBracketSpace &&
        (forceLeftSide || prefersLeft || (!rightHasBracketSpace && leftSpace > rightSpace));
      // Stroke-thickness annotations render as a label badge anchored to the
      // strip's vertical centre rather than a tall bracket — the strip is too
      // thin to bracket meaningfully. Inflate the visual `size` to a readable
      // minimum so the badge has somewhere to sit; the displayed label still
      // shows the actual thickness.
      const visualSize = isThickness ? Math.max(rect.height, 20) : rect.height;
      const visualTop = isThickness
        ? rect.top + rect.height / 2 - visualSize / 2
        : rect.top;
      // Thickness annotations are just the label badge (no bracket); anchor
      // the container's right edge near the strip and let the label extend
      // leftward. Clamp the right edge so the label always stays inside the
      // shell — overlapping the strip's left tip is preferable to clipping.
      const thicknessLabelWidth = 32; // approximate width of the label badge
      const thicknessIdealRight = rect.left - 4;
      const thicknessMinRight = thicknessLabelWidth; // keep label.left >= 0
      // The bracket element is 18px wide. On the right we sit it at
      // `rect.right + GUTTER` so the bracket's leftmost visual element (the
      // end cap at offset 4) lands `GUTTER + 4` past the component edge. To
      // keep the same visual gap when placed on the LEFT, we have to subtract
      // both the gutter AND the bracket's full width — otherwise the bracket
      // overlaps the component.
      const heightLeft = isThickness
        ? Math.max(thicknessMinRight, thicknessIdealRight)
        : placeOnLeft
          ? rect.left - DIMENSION_ANNOTATION_GUTTER - HEIGHT_BRACKET_WIDTH
          : rect.left + rect.width + DIMENSION_ANNOTATION_GUTTER;
      const heightRawValue = getStructureValue(allStructureTokenMap.value.get(annotationKeys.heightKey), annotationKeys.heightKey, "height");
      const heightConstraint = inferDimensionConstraint(heightToken?.usage);
      const heightConstraintPx = heightConstraint ? parseRawPxValue(heightToken?.rawValue) : null;
      const useRenderedHeightForConstraint =
        isDropdownStructure.value && key === "dimension-480";
      addAnnotation({
        id: `${key}-height`,
        orientation: "height",
        labelPlacement: placeOnLeft ? "left" : "default",
        label: formatConstraintLabel(heightConstraint, heightRawValue),
        left: heightLeft,
        top: visualTop,
        // Render the bracket at the constraint's pixel value so a "Max 480px"
        // label sits on a 480-tall bracket regardless of the component's
        // current rendered height. Falls back to the rendered height for
        // non-constraint tokens.
        size: useRenderedHeightForConstraint ? visualSize : heightConstraintPx ?? visualSize,
        isThickness,
        isIconSize: isLinkStructure.value && key === "icon-size",
      });
    }

    if (
      annotationKeys.widthKey &&
      widthToken?.rawValue &&
      !isZeroTokenValue(widthToken) &&
      widthAxis !== "height" &&
      !isSelectStructure.value
    ) {
      const isStepperMarkerDimension = isStepperStructure.value && key === "dimension-32";
      const isThumbnailDimensionWidth =
        isThumbnailCardStructure.value &&
        ["dimension-128", "dimension-64"].includes(key);
      if (isThumbnailDimensionWidth && key === "dimension-128") return;
      const isDatepickerInputMinWidth =
        isDatepickerStructure.value && key === "dimension-160";
      const isDatepickerDropdownMaxWidth =
        isDatepickerStructure.value && key === "dimension-320";
      const isDropdownMenuMaxWidth =
        isDropdownStructure.value && key === "dimension-320";
      const isDescriptionListLabelMaxWidth =
        isDescriptionListStructure.value && key === "dimension-280";
      const isDrawerPanelDimensionWidth =
        isDrawerDimensionKey(key);
      const isFooterContentMaxWidth =
        isFooterStructure.value && key.startsWith("dimension-");
      const isModalPanelDimensionWidth =
        isModalStructure.value && (key === "dimension" || key.startsWith("dimension-"));
      const forceAbove = isMastheadStructure.value && key === "dimension-20";
      const forceBelow = isModalFullscreenStructure.value && isModalPanelDimensionWidth;
      const placeAbove =
        !forceBelow &&
        !isFooterContentMaxWidth &&
        (forceAbove || isStepperMarkerDimension || isDatepickerInputMinWidth || isThumbnailDimensionWidth || isDrawerPanelDimensionWidth || bottomOverflow);
      const widthRawValue = getStructureValue(allStructureTokenMap.value.get(annotationKeys.widthKey), annotationKeys.widthKey, "width");
      const widthConstraint = inferDimensionConstraint(widthToken?.usage);
      const widthConstraintPx = widthConstraint ? parseRawPxValue(widthToken?.rawValue) : null;
      // Constraint brackets (max/min) decouple from the component's rendered
      // size — a "Max 192px" bracket on a 74px-wide badge has no obvious
      // anchor point. Centre it horizontally inside the preview shell so it
      // reads as a stand-alone measurement of the constraint, not as a
      // bracket attached to the live element. Non-constraint width brackets
      // stay anchored to the component's left edge.
      const widthSize = isModalPanelDimensionWidth
        ? rect.width
        : isFooterContentMaxWidth && shellWidth > 0
        ? Math.min(widthConstraintPx ?? rect.width, shellWidth)
        : widthConstraintPx ?? rect.width;
      const unclampedWidthLeft = isModalPanelDimensionWidth
        ? rect.left
        : isThumbnailDimensionWidth
        ? Math.round(rect.left + rect.width / 2 - widthSize / 2)
        : isDatepickerInputMinWidth || isDatepickerDropdownMaxWidth || isDropdownMenuMaxWidth || isFooterContentMaxWidth
          ? Math.round(rect.left + rect.width / 2 - widthSize / 2)
        : isDescriptionListLabelMaxWidth
          ? rect.left
        : widthConstraintPx != null && shellWidth > 0
          ? Math.round((shellWidth - widthSize) / 2)
          : rect.left;
      const widthLeft = shellWidth > 0
        ? Math.max(0, Math.min(unclampedWidthLeft, Math.max(0, shellWidth - widthSize)))
        : unclampedWidthLeft;
      const minTopForAboveLabel = isThumbnailDimensionWidth ? 24 : 0;
      const widthTop = placeAbove
        ? Math.max(minTopForAboveLabel, rect.top - WIDTH_BRACKET_HEIGHT - DIMENSION_ANNOTATION_GUTTER)
        : rect.top + rect.height + DIMENSION_ANNOTATION_GUTTER;
      addAnnotation({
        id: `${key}-width`,
        orientation: "width",
        labelPlacement: placeAbove ? "above" : "default",
        label: formatConstraintLabel(widthConstraint, widthRawValue),
        left: widthLeft,
        top: widthTop,
        // Render the bracket at the constraint's pixel value so a "Max 192px"
        // label sits on a 192-wide bracket regardless of the component's
        // current rendered width. Falls back to the rendered width for
        // non-constraint tokens.
        size: widthSize,
        isIconSize: isLinkStructure.value && key === "icon-size",
      });
    }
  });

  return annotations;
});

const getPaddingAxisFromToken = (row?: MeasurementTokenRow, fallbackKey?: string | null): PaddingAxis => {
  const usageText = (row?.usage ?? "").toLowerCase();
  const fallbackText = `${row?.property ?? ""} ${row?.mapKey ?? ""} ${fallbackKey ?? ""}`.toLowerCase();
  const explicitLeft = usageText.includes("left padding") || usageText.includes("padding on the left");
  const explicitRight = usageText.includes("right padding") || usageText.includes("padding on the right");
  const explicitTop = usageText.includes("top padding") || usageText.includes("padding on the top");
  const explicitBottom = usageText.includes("bottom padding") || usageText.includes("padding on the bottom");

  if (explicitLeft && !explicitRight) return "left";
  if (explicitRight && !explicitLeft) return "right";
  if (explicitTop && !explicitBottom) return "top";
  if (explicitBottom && !explicitTop) return "bottom";

  const text = `${usageText} ${fallbackText}`;
  const isHorizontal =
    text.includes("left and right") ||
    text.includes("left/right") ||
    text.includes("horizontal") ||
    text.includes("padding-x") ||
    text.includes("padding x");
  const isVertical =
    text.includes("top and bottom") ||
    text.includes("top/bottom") ||
    text.includes("vertical") ||
    text.includes("padding-y") ||
    text.includes("padding y");

  if (isHorizontal && isVertical) return "all";
  if (isHorizontal) return "x";
  if (isVertical) return "y";
  return "all";
};

const getPaddingBands = (rect: HotspotRect | null, axis: PaddingAxis = "all"): PaddingBand[] => {
  if (
    !rect ||
    rect.insetLeft == null ||
    rect.insetTop == null ||
    rect.insetWidth == null ||
    rect.insetHeight == null
  ) {
    return [];
  }

  const topHeight = Math.max(0, rect.insetTop);
  const bottomTop = rect.top + rect.insetTop + rect.insetHeight;
  const bottomHeight = Math.max(0, rect.height - rect.insetTop - rect.insetHeight);
  const leftWidth = Math.max(0, rect.insetLeft);
  const rightLeft = rect.left + rect.insetLeft + rect.insetWidth;
  const rightWidth = Math.max(0, rect.width - rect.insetLeft - rect.insetWidth);

  const topBand = topHeight > 0 ? [{ left: rect.left, top: rect.top, width: rect.width, height: topHeight }] : [];
  const bottomBand = bottomHeight > 0 ? [{ left: rect.left, top: bottomTop, width: rect.width, height: bottomHeight }] : [];
  const leftBand = leftWidth > 0 ? [{ left: rect.left, top: rect.top, width: leftWidth, height: rect.height }] : [];
  const rightBand = rightWidth > 0 ? [{ left: rightLeft, top: rect.top, width: rightWidth, height: rect.height }] : [];

  if (axis === "left") return leftBand;
  if (axis === "right") return rightBand;
  if (axis === "top") return topBand;
  if (axis === "bottom") return bottomBand;
  if (axis === "x") return [...leftBand, ...rightBand];
  if (axis === "y") return [...topBand, ...bottomBand];
  return [...topBand, ...bottomBand, ...leftBand, ...rightBand];
};

const getPaddingBandsForKey = (key: string, rect: HotspotRect | null) => {
  if (structureKind.value === "accordion" && key === "content-padding") {
    return getPaddingBands(rect, "all");
  }

  return getPaddingBands(rect, getPaddingAxisFromToken(getTooltipTokenRowByKey(key), key));
};

const getRelatedPaddingBandsForKey = (key: string) => {
  const relatedPaddingKeys = getRelatedRowKeys(key).filter(isPaddingOverlayKey);
  if (!relatedPaddingKeys.length && !isPaddingOverlayKey(key)) return [];
  const keys = relatedPaddingKeys.length ? relatedPaddingKeys : [key];
  return keys.flatMap((relatedKey) => getPaddingBandsForKey(relatedKey, hotspotRects.value[relatedKey] ?? null));
};

const accordionPaddingKeys = ["padding-x-default", "padding-y-default", "content-padding"] as const;

const accordionPaddingHoverBandGroups = computed(() => {
  if (structureKind.value !== "accordion") return [];

  return accordionPaddingKeys
    .map((key) => ({
      key,
      bands: getPaddingBandsForKey(key, hotspotRects.value[key]),
    }))
    .filter((group) => group.bands.length);
});

const activeAccordionPaddingBands = computed(() => {
  if (!hoverKey.value || !accordionPaddingKeys.includes(hoverKey.value as (typeof accordionPaddingKeys)[number])) {
    return [];
  }

  return getRelatedPaddingBandsForKey(hoverKey.value);
});

const isAccordionPaddingKey = (key: string) =>
  accordionPaddingKeys.includes(key as (typeof accordionPaddingKeys)[number]);

const alertPaddingKeys = ["padding-x", "padding-y"] as const;
const alertPaddingProxyKeys = ["padding-x"] as const;

const alertPaddingHoverBandGroups = computed(() => {
  if (structureKind.value !== "alert") return [];

  return alertPaddingProxyKeys
    .map((key) => ({
      key,
      bands: getPaddingBandsForKey(key, hotspotRects.value[key]),
    }))
    .filter((group) => group.bands.length);
});

const activeAlertPaddingBands = computed(() => {
  if (!hoverKey.value || !alertPaddingKeys.includes(hoverKey.value as (typeof alertPaddingKeys)[number])) {
    return [];
  }

  return getRelatedPaddingBandsForKey(hoverKey.value);
});

const isAlertPaddingKey = (key: string) =>
  alertPaddingKeys.includes(key as (typeof alertPaddingKeys)[number]);

const activeBreadcrumbGroupGapBands = computed(() =>
  hoverKey.value === "group-gap" || selectedKeys.value.includes("group-gap")
    ? breadcrumbGroupGapBands.value
    : [],
);

const activeBreadcrumbIconBands = computed(() =>
  isHoverableStructureKey("icon-color") && (hoverKey.value === "icon-color" || selectedKeys.value.includes("icon-color"))
    ? breadcrumbIconBands.value
    : [],
);

const activeButtonGapBands = computed(() =>
  hoverKey.value === "gap" || selectedKeys.value.includes("gap")
    ? buttonGapBands.value
    : [],
);

const activeGenericGapBands = computed(() => {
  if (structureKind.value !== "generic" || !hoverKey.value) return [];
  return genericGapBandsByKey.value[hoverKey.value] ?? [];
});


const cardPaddingXHoverBands = computed(() => {
  if (structureKind.value !== "card") return [];
  const rect = hotspotRects.value["padding-x"];
  return getPaddingBandsForKey("padding-x", rect ?? null);
});

const cardPaddingYHoverBands = computed(() => {
  if (structureKind.value !== "card") return [];
  const rect = hotspotRects.value["padding-y"];
  return getPaddingBandsForKey("padding-y", rect ?? null);
});

// Datepicker form-padding-x bands — left + right strips between the input
// border and the DD/MM/YYYY text. Mirrors the card pattern: hide the surface
// hotspot (which would tint the whole field) and draw only the padding strips.
const datepickerFormPaddingXBands = computed(() => {
  if (structureKind.value !== "generic") return [];
  const rect = hotspotRects.value["form-padding-x"];
  return getPaddingBandsForKey("form-padding-x", rect ?? null);
});

const tooltipPaddingXBands = computed(() => {
  if (structureKind.value !== "generic" || !isTooltipStructure.value) return [];
  const rect = hotspotRects.value["padding-x"];
  return getPaddingBandsForKey("padding-x", rect ?? null);
});

const tooltipPaddingYBands = computed(() => {
  if (structureKind.value !== "generic" || !isTooltipStructure.value) return [];
  const rect = hotspotRects.value["padding-y"];
  return getPaddingBandsForKey("padding-y", rect ?? null);
});

// Universal padding bands for all generic components — replaces the
// full-surface hotspot with thin perimeter strips that highlight only the
// padding region (top/bottom/left/right gaps between border and content).
// Keyed by every padding token in the inspectMeta so the renderer can
// iterate without hard-coding component-specific lists.
const genericPaddingBandsByKey = computed(() => {
  if (structureKind.value !== "generic") return {} as Record<string, PaddingBand[]>;
  const result: Record<string, PaddingBand[]> = {};
  Object.keys(inspectMeta.value).forEach((key) => {
    if (!isPaddingOverlayKey(key)) return;
    const bands = getPaddingBandsForKey(key, hotspotRects.value[key] ?? null);
    if (bands.length) result[key] = bands;
  });
  // Merge in any per-component manually-computed bands (e.g. table replicates
  // the same padding strips across every cell rather than just the first).
  Object.entries(extraPaddingBandsByKey.value).forEach(([key, bands]) => {
    if (bands.length) result[key] = [...(result[key] ?? []), ...bands];
  });
  return result;
});

const activeGenericPaddingBands = computed(() => {
  if (structureKind.value !== "generic" || !hoverKey.value) return [];
  // Prefer the merged genericPaddingBandsByKey when it has bands for the
  // active key (covers manually-populated cases like table's per-cell strips).
  // Fall back to the auto-computed related-padding bands for components that
  // share padding-x/padding-y across one rect.
  const related = getRelatedRowKeys(hoverKey.value).filter(isPaddingOverlayKey);
  const keys = related.length ? related : [hoverKey.value];
  return keys.flatMap((key) =>
    genericPaddingBandsByKey.value[key]
      ?? getPaddingBandsForKey(key, hotspotRects.value[key] ?? null),
  );
});

// Universal border ring for generic components — thin perimeter ring (top,
// bottom, left, right strips) that highlights only the border region,
// matching the card/alert pattern. Picks any token whose key contains
// "border-radius" or "border-width" so prefixed names like form-border-radius-md
// or control-border-width also work.
const isGenericBorderKey = (key: string | null) => {
  if (!key) return false;
  const lower = key;
  return (
    lower === "border-radius" ||
    lower === "border-width" ||
    lower.includes("border-radius") ||
    lower.includes("border-width") ||
    lower.includes("border-color")
  );
};

// Resolve the active border-radius rawValue (e.g. "999px", "8px") so the
// dashed border-visual rendered around a generic component matches the actual
// rounded-corner radius of the component. Returns "0" when no border-radius
// row exists in the token table — components like table and divider have no
// rounded corners, so the highlight should also have sharp corners.
const genericBorderRadiusValue = computed<string>(() => {
  const radiusKey = Object.keys(inspectMeta.value).find((key) =>
    key.includes("border-radius"),
  );
  if (!radiusKey) return "0";
  const token = allStructureTokenMap.value.get(radiusKey);
  return token?.rawValue || "0";
});

const genericBorderRectKey = computed<string | null>(() => {
  if (structureKind.value !== "generic") return null;
  const customKeys = customBorderBandsByKey.value;
  const radiusKey = Object.keys(inspectMeta.value).find(
    (key) => key.includes("border-radius") && !customKeys[key]?.length,
  );
  if (radiusKey && hotspotRects.value[radiusKey]) return radiusKey;
  const widthKey = Object.keys(inspectMeta.value).find(
    (key) => key.includes("border-width") && !customKeys[key]?.length,
  );
  if (widthKey && hotspotRects.value[widthKey]) return widthKey;
  return null;
});

const genericBorderHoverBands = computed(() => {
  const key = genericBorderRectKey.value;
  if (!key) return [];
  const rect = hotspotRects.value[key];
  if (!rect) return [];

  const thickness = 8;
  const verticalHeight = Math.max(0, rect.height - thickness * 2);

  return [
    { left: rect.left, top: rect.top, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + rect.height - thickness, width: rect.width, height: thickness },
    { left: rect.left, top: rect.top + thickness, width: thickness, height: verticalHeight },
    { left: rect.left + rect.width - thickness, top: rect.top + thickness, width: thickness, height: verticalHeight },
  ];
});

const isPaddingOverlayKey = (key: string | null) =>
  Boolean(key?.includes("padding")) ||
  key === "padding-x-default" ||
  key === "padding-y-default" ||
  key === "content-padding" ||
  key === "padding-x" ||
  key === "padding-y" ||
  key === "padding-top" ||
  key === "padding-bottom" ||
  key === "padding-left" ||
  key === "padding-right";

const isGapOverlayKey = (key: string | null) =>
  Boolean(key?.includes("gap")) ||
  key === "gap" ||
  key === "title-gap" ||
  key === "subtitle-gap" ||
  key === "slot-gap";

const isSizeOverlayKey = (key: string | null) =>
  !key?.includes("border-width") &&
  Boolean(
    key?.includes("height") ||
    key?.includes("width") ||
    key?.includes("dimension") ||
    key?.includes("size") ||
    key?.includes("font-size") ||
    key?.includes("line-height"),
  ) ||
  key === "min-width";

const isControlBorderOverlayKey = (key: string | null) =>
  key === "control-border-width" || key === "control-border-radius";

const isBackgroundOverlayKey = (key: string | null) =>
  Boolean(
    key?.includes("background") ||
    key?.includes("hover-bg") ||
    key?.includes("surface") ||
    key?.includes("bg"),
  );

const isBorderOrColorOverlayKey = (key: string | null) =>
  Boolean(
    key?.includes("border") ||
    key?.includes("color") ||
    key?.includes("surface") ||
    key?.includes("bg") ||
    key?.includes("font") ||
    key?.includes("line-height") ||
    key?.includes("dimension") ||
    key?.includes("height") ||
    key?.includes("width") ||
    key?.includes("icon-size") ||
    key?.includes("opacity"),
  ) ||
  key === "hover-bg" ||
  key === "background" ||
  key === "title-color" ||
  key === "text-color" ||
  key === "subtitle-color" ||
  key === "description-color" ||
  key === "secondary-text-color" ||
  key === "link-color" ||
  key === "link-color-emphasis" ||
  key === "tinted-bg" ||
  key === "icon-color" ||
  key === "leading-icon-color" ||
  key === "trailing-icon-color" ||
  key === "border-color" ||
  key === "border-width" ||
  key === "border-radius" ||
  key === "height" ||
  key === "min-width" ||
  key === "font-size" ||
  key === "line-height";

const isSemanticTokenKey = (key: string | null) =>
  (structureKind.value === "alert" &&
    key === "border-color") ||
  (structureKind.value === "breadcrumb" &&
    [
      "page-link-color",
      "page-link-color-emphasis",
      "current-page-color",
      "overflow-bg",
      "overflow-bg-hover",
    ].includes(key || "")) ||
  key === "subtitle-color" ||
  key === "secondary-text-color" ||
  key === "link-color" ||
  key === "link-color-emphasis" ||
  key === "tinted-bg" ||
  key === "leading-icon-color" ||
  key === "trailing-icon-color";

const getTooltipTagClass = (key: string | null) => [
  "accordion-inspect-tooltip__tag",
  isPaddingOverlayKey(key) ? "accordion-inspect-tooltip__tag--padding" : "",
  isGapOverlayKey(key) ? "accordion-inspect-tooltip__tag--gap" : "",
  isBorderOrColorOverlayKey(key) && !isSemanticTokenKey(key) ? "accordion-inspect-tooltip__tag--border" : "",
  isSemanticTokenKey(key) ? "accordion-inspect-tooltip__tag--semantic" : "",
];

// Structure hover-overlay tone rule — defines the single source of truth
// for every overlay colour in the Structure tab. Keep this ordering stable
// so downstream CSS continues to work:
//   • "padding"  → blue  (accent)  — all padding-related tokens
//   • "gap"      → purple           — every gap / spacing-between token
//   • "size"     → accent          — dimension / measurement annotations
//   • "semantic" → grey  (neutral) — link / subtitle / tinted-bg / etc.
//   • "border"   → purple           — non-semantic border & colour tokens
// Semantic is checked first so semantic colour tokens override the generic
// colour fallback (which would otherwise classify them as "border").
const getStructureTone = (key: string | null) => {
  if (isSemanticTokenKey(key)) return "semantic";
  if (isPaddingOverlayKey(key)) return "padding";
  if (isGapOverlayKey(key)) return "gap";
  if (isSizeOverlayKey(key)) return "size";
  if (isBorderOrColorOverlayKey(key)) return "border";
  return "border";
};

// A token's rawValue resolves to 0 (e.g. "0", "0px", "0rem", "sgds/padding/none"),
// which means the token doesn't render anything visible — there's no padding
// strip, gap, or border to highlight. Used by isHoverableStructureKey so the
// inspect hotspot doesn't activate a popup on a row that has nothing to show.
const isZeroValueToken = (key: string | null) => {
  if (!key) return false;
  const token = allStructureTokenMap.value.get(key);
  return isZeroTokenValue(token);
};

const isHoverableStructureKey = (key: string | null) =>
  !isZeroValueToken(key) && (
    isPaddingOverlayKey(key) ||
    isGapOverlayKey(key) ||
    Boolean(key?.includes("border-width")) ||
    Boolean(key?.includes("border-radius")) ||
    Boolean(key && customBorderBandsByKey.value[key]?.length) ||
    Boolean(key?.includes("divider-width")) ||
    Boolean(key?.includes("indicator-width")) ||
    isControlBorderOverlayKey(key)
  );

const inspectMeta = computed<Record<string, InspectMeta>>(() => {
  if (structureKind.value === "breadcrumb") {
    const breadcrumbGapToken = allStructureTokenMap.value.get("gap-xs");
    return {
      "icon-color": {
        label: "icon-color",
        value: tokenDisplay(allStructureTokenMap.value.get("icon-color")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("icon-color")),
        aria: "Inspect breadcrumb icon colour",
      },
      "group-gap": {
        label: "gap-xs",
        value: tokenDisplay(breadcrumbGapToken),
        valueSuffix: tokenValue(breadcrumbGapToken),
        aria: "Inspect breadcrumb group gap",
      },
      "page-link-color": {
        label: "page-link-color",
        value: tokenDisplay(allStructureTokenMap.value.get("page-link-color")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("page-link-color")),
        aria: "Inspect breadcrumb page link colour",
      },
      "page-link-color-emphasis": {
        label: "page-link-color-emphasis",
        value: tokenDisplay(allStructureTokenMap.value.get("page-link-color-emphasis")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("page-link-color-emphasis")),
        aria: "Inspect breadcrumb page link emphasis colour",
      },
      "current-page-color": {
        label: "current-page-color",
        value: tokenDisplay(allStructureTokenMap.value.get("current-page-color")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("current-page-color")),
        aria: "Inspect breadcrumb current page colour",
      },
      "overflow-bg": {
        label: "overflow-bg",
        value: tokenDisplay(allStructureTokenMap.value.get("overflow-bg")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("overflow-bg")),
        aria: "Inspect breadcrumb overflow background",
      },
      "overflow-bg-hover": {
        label: "overflow-bg-hover",
        value: tokenDisplay(allStructureTokenMap.value.get("overflow-bg-hover")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("overflow-bg-hover")),
        aria: "Inspect breadcrumb overflow hover background",
      },
    };
  }

  if (structureKind.value === "generic") {
    return Object.fromEntries(
      genericTokenRows.value.map((row) => {
        const key = row.mapKey || row.property;

        // Toast-specific: hovering content-padding-right also shows the base
        // padding row for context.
        const toastRelated = isToastStructure.value && key === "content-padding-right"
          ? [
              {
                label: "padding",
                value: tokenDisplay(genericTokenMap.value.get("padding")),
                valueSuffix: tokenValue(genericTokenMap.value.get("padding")),
              },
            ]
          : undefined;

        // Generic pairing (e.g. padding-x ↔ padding-y) so hovering one
        // padding axis shows both axes in the popup. `getRelatedRowKeys`
        // returns just `[key]` when there are no peers to surface.
        const peerKeys = getRelatedRowKeys(key).filter((k) => k !== key);
        const peerRows = peerKeys
          .map((k) => {
            const peer = genericTokenMap.value.get(k);
            if (!peer) return null;
            return {
              label: peer.property || k,
              value: tokenDisplay(peer),
              valueSuffix: tokenValue(peer),
            };
          })
          .filter((row): row is NonNullable<typeof row> => row !== null);

        const relatedRows = toastRelated ?? (peerRows.length ? peerRows : undefined);
        const hasRelated = Boolean(relatedRows && relatedRows.length);

        return [
          key,
          {
            // When there are related rows (e.g. padding-x paired with
            // padding-y), use the property name for each so they're
            // distinguishable. Otherwise show the category as the coloured
            // tag for high-level grouping.
            label: hasRelated ? row.property : (row.category || row.element || ""),
            value: tokenDisplay(genericTokenMap.value.get(key)),
            valueSuffix: tokenValue(genericTokenMap.value.get(key)),
            rows: relatedRows,
            aria: `Inspect component ${row.property}`,
          },
        ];
      }),
    );
  }

  if (structureKind.value === "button") {
    return {
      background: { label: "background", value: tokenDisplay(buttonBaseTokenMap.value.get("background")), valueSuffix: tokenValue(buttonBaseTokenMap.value.get("background")), aria: "Inspect button background colour" },
      "hover-bg": { label: "hover-bg", value: tokenDisplay(buttonBaseTokenMap.value.get("hover-bg")), valueSuffix: tokenValue(buttonBaseTokenMap.value.get("hover-bg")), aria: "Inspect button hover background" },
      "text-color": { label: "text-color", value: tokenDisplay(buttonBaseTokenMap.value.get("text-color")), valueSuffix: tokenValue(buttonBaseTokenMap.value.get("text-color")), aria: "Inspect button text colour" },
      "border-radius": {
        label: "border-radius",
        value: tokenDisplay(buttonBaseTokenMap.value.get("border-radius")),
        valueSuffix: tokenValue(buttonBaseTokenMap.value.get("border-radius")),
        rows: [
          {
            label: "border-width",
            value: tokenDisplay(buttonBaseTokenMap.value.get("border-width")),
            valueSuffix: tokenValue(buttonBaseTokenMap.value.get("border-width")),
          },
        ],
        aria: "Inspect button border radius",
      },
      "border-width": {
        label: "border-radius",
        value: tokenDisplay(buttonBaseTokenMap.value.get("border-radius")),
        valueSuffix: tokenValue(buttonBaseTokenMap.value.get("border-radius")),
        rows: [
          {
            label: "border-width",
            value: tokenDisplay(buttonBaseTokenMap.value.get("border-width")),
            valueSuffix: tokenValue(buttonBaseTokenMap.value.get("border-width")),
          },
        ],
        aria: "Inspect button border width",
      },
      "padding-x": { label: "padding-x", value: tokenDisplay(buttonBaseTokenMap.value.get("padding-x")), valueSuffix: tokenValue(buttonBaseTokenMap.value.get("padding-x")), aria: "Inspect button padding x" },
      gap: { label: "gap", value: tokenDisplay(buttonBaseTokenMap.value.get("gap")), valueSuffix: tokenValue(buttonBaseTokenMap.value.get("gap")), aria: "Inspect button gap" },
      height: {
        label: "height",
        value: tokenDisplay(buttonBaseTokenMap.value.get("height")),
        valueSuffix: tokenValue(buttonBaseTokenMap.value.get("height")),
        rows: [
          {
            label: "min-width",
            value: tokenDisplay(buttonBaseTokenMap.value.get("min-width")),
            valueSuffix: tokenValue(buttonBaseTokenMap.value.get("min-width")),
          },
        ],
        aria: "Inspect button height",
      },
      "min-width": {
        label: "height",
        value: tokenDisplay(buttonBaseTokenMap.value.get("height")),
        valueSuffix: tokenValue(buttonBaseTokenMap.value.get("height")),
        rows: [
          {
            label: "min-width",
            value: tokenDisplay(buttonBaseTokenMap.value.get("min-width")),
            valueSuffix: tokenValue(buttonBaseTokenMap.value.get("min-width")),
          },
        ],
        aria: "Inspect button min width",
      },
      "font-size": {
        label: "font-size",
        value: tokenDisplay(buttonBaseTokenMap.value.get("font-size")),
        valueSuffix: tokenValue(buttonBaseTokenMap.value.get("font-size")),
        rows: [
          {
            label: "line-height",
            value: tokenDisplay(buttonBaseTokenMap.value.get("line-height")),
            valueSuffix: tokenValue(buttonBaseTokenMap.value.get("line-height")),
          },
        ],
        aria: "Inspect button font size",
      },
      "line-height": {
        label: "font-size",
        value: tokenDisplay(buttonBaseTokenMap.value.get("font-size")),
        valueSuffix: tokenValue(buttonBaseTokenMap.value.get("font-size")),
        rows: [
          {
            label: "line-height",
            value: tokenDisplay(buttonBaseTokenMap.value.get("line-height")),
            valueSuffix: tokenValue(buttonBaseTokenMap.value.get("line-height")),
          },
        ],
        aria: "Inspect button line height",
      },
    };
  }

  if (structureKind.value === "alert") {
    return {
      "padding-x": {
        label: "padding-x",
        value: tokenDisplay(alertBaseTokenMap.value.get("padding-x")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("padding-x")),
        rows: [
          {
            label: "padding-y",
            value: tokenDisplay(alertBaseTokenMap.value.get("padding-y")),
            valueSuffix: tokenValue(alertBaseTokenMap.value.get("padding-y")),
          },
        ],
        aria: "Inspect alert padding x",
      },
      "padding-y": {
        label: "padding-x",
        value: tokenDisplay(alertBaseTokenMap.value.get("padding-x")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("padding-x")),
        rows: [
          {
            label: "padding-y",
            value: tokenDisplay(alertBaseTokenMap.value.get("padding-y")),
            valueSuffix: tokenValue(alertBaseTokenMap.value.get("padding-y")),
          },
        ],
        aria: "Inspect alert padding y",
      },
      "content-padding-right": {
        label: "content-padding-right",
        value: tokenDisplay(alertBaseTokenMap.value.get("content-padding-right")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("content-padding-right")),
        aria: "Inspect alert content padding right",
      },
      gap: {
        label: "gap",
        value: tokenDisplay(alertBaseTokenMap.value.get("gap")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("gap")),
        aria: "Inspect alert gap",
      },
      "title-gap": {
        label: "title-gap",
        value: tokenDisplay(alertBaseTokenMap.value.get("title-gap")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("title-gap")),
        aria: "Inspect alert title gap",
      },
      "content-gap": {
        label: "content-gap",
        value: tokenDisplay(alertBaseTokenMap.value.get("content-gap")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("content-gap")),
        aria: "Inspect alert content gap",
      },
      "border-width": {
        label: "border-width",
        value: tokenDisplay(alertBaseTokenMap.value.get("border-width")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("border-width")),
        aria: "Inspect alert border width",
      },
      "border-radius": {
        label: "border-radius",
        value: tokenDisplay(alertBaseTokenMap.value.get("border-radius")),
        valueSuffix: tokenValue(alertBaseTokenMap.value.get("border-radius")),
        aria: "Inspect alert border radius",
      },
      "border-color": {
        label: "border-color",
        value: tokenDisplay(alertSemanticTokenMap.value.get("border-color")),
        valueSuffix: tokenValue(alertSemanticTokenMap.value.get("border-color")),
        aria: "Inspect alert border colour",
      },
    };
  }

  if (structureKind.value === "card") {
    return {
      background: { label: "background", value: tokenDisplay(cardBaseTokenMap.value.get("background")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("background")), aria: "Inspect card background colour" },
      "title-color": { label: "title-color", value: tokenDisplay(cardBaseTokenMap.value.get("title-color")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("title-color")), aria: "Inspect card title colour" },
      "description-color": { label: "description-color", value: tokenDisplay(cardBaseTokenMap.value.get("description-color")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("description-color")), aria: "Inspect card description colour" },
      "border-color": {
        label: "border-color",
        value: tokenDisplay(cardBaseTokenMap.value.get("border-color")),
        valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-color")),
        rows: [
          {
            label: "border-width",
            value: tokenDisplay(cardBaseTokenMap.value.get("border-width")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-width")),
          },
          {
            label: "border-radius",
            value: tokenDisplay(cardBaseTokenMap.value.get("border-radius")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-radius")),
          },
        ],
        aria: "Inspect card border colour",
      },
      "border-width": {
        label: "border-color",
        value: tokenDisplay(cardBaseTokenMap.value.get("border-color")),
        valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-color")),
        rows: [
          {
            label: "border-width",
            value: tokenDisplay(cardBaseTokenMap.value.get("border-width")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-width")),
          },
          {
            label: "border-radius",
            value: tokenDisplay(cardBaseTokenMap.value.get("border-radius")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-radius")),
          },
        ],
        aria: "Inspect card border width",
      },
      "border-radius": {
        label: "border-color",
        value: tokenDisplay(cardBaseTokenMap.value.get("border-color")),
        valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-color")),
        rows: [
          {
            label: "border-width",
            value: tokenDisplay(cardBaseTokenMap.value.get("border-width")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-width")),
          },
          {
            label: "border-radius",
            value: tokenDisplay(cardBaseTokenMap.value.get("border-radius")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("border-radius")),
          },
        ],
        aria: "Inspect card border radius",
      },
      "padding-x": {
        label: "padding-x",
        value: tokenDisplay(cardBaseTokenMap.value.get("padding-x")),
        valueSuffix: tokenValue(cardBaseTokenMap.value.get("padding-x")),
        rows: [
          {
            label: "padding-y",
            value: tokenDisplay(cardBaseTokenMap.value.get("padding-y")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("padding-y")),
          },
        ],
        aria: "Inspect card padding x",
      },
      "padding-y": {
        label: "padding-y",
        value: tokenDisplay(cardBaseTokenMap.value.get("padding-y")),
        valueSuffix: tokenValue(cardBaseTokenMap.value.get("padding-y")),
        rows: [
          {
            label: "padding-x",
            value: tokenDisplay(cardBaseTokenMap.value.get("padding-x")),
            valueSuffix: tokenValue(cardBaseTokenMap.value.get("padding-x")),
          },
        ],
        aria: "Inspect card padding y",
      },
      gap: { label: "gap", value: tokenDisplay(cardBaseTokenMap.value.get("gap")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("gap")), aria: "Inspect card gap" },
      "title-gap": { label: "title-gap", value: tokenDisplay(cardBaseTokenMap.value.get("title-gap")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("title-gap")), aria: "Inspect card title gap" },
      "subtitle-gap": { label: "subtitle-gap", value: tokenDisplay(cardBaseTokenMap.value.get("subtitle-gap")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("subtitle-gap")), aria: "Inspect card subtitle gap" },
      "slot-gap": { label: "slot-gap", value: tokenDisplay(cardBaseTokenMap.value.get("slot-gap")), valueSuffix: tokenValue(cardBaseTokenMap.value.get("slot-gap")), aria: "Inspect card slot gap" },
      "subtitle-color": { label: "", value: tokenDisplay(globalTokenMap.value.get("subtitle-color")), valueSuffix: tokenValue(globalTokenMap.value.get("subtitle-color")), aria: "Inspect card subtitle colour" },
      "secondary-text-color": { label: "", value: tokenDisplay(globalTokenMap.value.get("secondary-text-color")), valueSuffix: tokenValue(globalTokenMap.value.get("secondary-text-color")), aria: "Inspect card secondary text colour" },
      "link-color": {
        label: "",
        value: tokenDisplay(globalTokenMap.value.get("link-color")),
        valueSuffix: tokenValue(globalTokenMap.value.get("link-color")),
        rows: [
          {
            label: "",
            value: tokenDisplay(globalTokenMap.value.get("link-color-emphasis")),
            valueSuffix: tokenValue(globalTokenMap.value.get("link-color-emphasis")),
          },
        ],
        aria: "Inspect card link colour",
      },
      "link-color-emphasis": {
        label: "",
        value: tokenDisplay(globalTokenMap.value.get("link-color")),
        valueSuffix: tokenValue(globalTokenMap.value.get("link-color")),
        rows: [
          {
            label: "",
            value: tokenDisplay(globalTokenMap.value.get("link-color-emphasis")),
            valueSuffix: tokenValue(globalTokenMap.value.get("link-color-emphasis")),
          },
        ],
        aria: "Inspect card link emphasis colour",
      },
      "tinted-bg": { label: "", value: tokenDisplay(globalTokenMap.value.get("tinted-bg")), valueSuffix: tokenValue(globalTokenMap.value.get("tinted-bg")), aria: "Inspect card tinted background" },
    };
  }

  return {
    "hover-bg": { label: "hover-bg", value: tokenDisplay(accordionBaseTokenMap.value.get("hover-bg")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("hover-bg")), aria: "Inspect accordion header background" },
    "title-color": { label: "title-color", value: tokenDisplay(accordionBaseTokenMap.value.get("title-color")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("title-color")), aria: "Inspect accordion title colour" },
    "icon-color": { label: "icon-color", value: tokenDisplay(accordionBaseTokenMap.value.get("icon-color")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("icon-color")), aria: "Inspect accordion chevron colour" },
    "leading-icon-color": { label: "", value: tokenDisplay(globalTokenMap.value.get("leading-icon-color")), valueSuffix: tokenValue(globalTokenMap.value.get("leading-icon-color")), aria: "Inspect accordion leading icon colour" },
    gap: { label: "gap", value: tokenDisplay(accordionBaseTokenMap.value.get("gap")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("gap")), aria: "Inspect accordion gap" },
    "border-color": { label: "border-color", value: tokenDisplay(accordionBaseTokenMap.value.get("border-color")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("border-color")), aria: "Inspect accordion border colour" },
    "border-width": { label: "border-width", value: tokenDisplay(accordionBaseTokenMap.value.get("border-width")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("border-width")), aria: "Inspect accordion border width" },
    "border-radius": { label: "border-radius", value: tokenDisplay(accordionBaseTokenMap.value.get("border-radius")), valueSuffix: tokenValue(accordionBaseTokenMap.value.get("border-radius")), aria: "Inspect accordion border radius" },
    "padding-x-default": {
      label: "padding-x",
      value: tokenDisplay(densityTokenMap.value.get("padding-x-default")),
      valueSuffix: tokenValue(densityTokenMap.value.get("padding-x-default")),
      rows: [
        {
          label: "padding-y",
          value: tokenDisplay(densityTokenMap.value.get("padding-y-default")),
          valueSuffix: tokenValue(densityTokenMap.value.get("padding-y-default")),
        },
      ],
      aria: "Inspect accordion header padding x",
    },
    "padding-y-default": {
      label: "padding-x",
      value: tokenDisplay(densityTokenMap.value.get("padding-x-default")),
      valueSuffix: tokenValue(densityTokenMap.value.get("padding-x-default")),
      rows: [
        {
          label: "padding-y",
          value: tokenDisplay(densityTokenMap.value.get("padding-y-default")),
          valueSuffix: tokenValue(densityTokenMap.value.get("padding-y-default")),
        },
      ],
      aria: "Inspect accordion header padding y",
    },
    "content-padding": {
      label: "padding-top",
      value: tokenDisplay(densityTokenMap.value.get("padding-top")),
      valueSuffix: tokenValue(densityTokenMap.value.get("padding-top")),
      rows: [
        {
          label: "padding-x",
          value: tokenDisplay(densityTokenMap.value.get("content-padding")),
          valueSuffix: tokenValue(densityTokenMap.value.get("content-padding")),
        },
      ],
      aria: "Inspect accordion content padding",
    },
  };
});

const resolvedPreviewMarkup = computed(() => {
  const attrName = variantAttributeName.value;
  if (!attrName || !activeVariant.value) return props.previewMarkup;
  const attrValue = variantAttributeValue(activeVariant.value);
  // Inject the variant attribute on the first SGDS custom element in the markup.
  // If a value is already declared we replace it; otherwise we append a new
  // attribute. This lets the structure preview switch variants without the
  // component-doc author needing to maintain multiple markup strings.
  const attrPattern = new RegExp(`(<sgds-[a-z-]+\\b[^>]*?)\\s${attrName}="[^"]*"`, "i");
  if (attrPattern.test(props.previewMarkup)) {
    return props.previewMarkup.replace(attrPattern, `$1 ${attrName}="${attrValue}"`);
  }
  return props.previewMarkup.replace(/<sgds-[a-z-]+/, (match) => `${match} ${attrName}="${attrValue}"`);
});

const clearPreviewHover = () => {
  hoverKey.value = null;
};

const isAlertCloseEvent = (event: Event) =>
  structureKind.value === "alert" &&
  event.composedPath().some((node) =>
    node instanceof HTMLElement && node.tagName.toLowerCase() === "sgds-close-button",
  );

const isDrawerInteractionEvent = (event: Event) =>
  isDrawerStructure.value &&
  event.composedPath().some((node) =>
    node instanceof HTMLElement && node.tagName.toLowerCase() === "sgds-drawer",
  );

const isModalInteractionEvent = (event: Event) =>
  isModalStructure.value &&
  event.composedPath().some((node) =>
    node instanceof HTMLElement && node.tagName.toLowerCase() === "sgds-modal",
  );

const preventPreviewInteraction = (event: Event) => {
  if (isDrawerInteractionEvent(event) || isModalInteractionEvent(event)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return;
  }

  if (!isAlertCloseEvent(event)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const preventPreviewInteractionKeyboard = (event: KeyboardEvent) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  preventPreviewInteraction(event);
};

const scrollToTableRow = async (key: string) => {
  hoverKey.value = key;
  selectedKeys.value = getRelatedRowKeys(key);
  await nextTick();
  const row = selectedKeys.value
    .map((rowKey) => rootRef.value?.querySelector<HTMLElement>(`[data-structure-row-key="${rowKey}"]`))
    .find(Boolean);
  row?.scrollIntoView({ behavior: "smooth", block: "center" });
  row?.focus({ preventScroll: true });
};

const getRelatedRowKeys = (key: string) => {
  // Generic padding pairing: hovering padding-x or padding-y always pops
  // both rows together (when both exist), across every component, so the
  // user sees what the structural padding is in both axes at once. Same for
  // form-padding-x / form-padding-y on form components. Reads from
  // genericTokenMap (built from data) rather than inspectMeta (still being
  // computed here) to avoid a circular dependency.
  if (["padding-x", "padding-y"].includes(key)) {
    const paired = ["padding-x", "padding-y"].filter((k) => Boolean(genericTokenMap.value.get(k)));
    if (paired.length > 1) return paired;
  }
  if (["form-padding-x", "form-padding-y"].includes(key)) {
    const paired = ["form-padding-x", "form-padding-y"].filter((k) => Boolean(genericTokenMap.value.get(k)));
    if (paired.length > 1) return paired;
  }
  if (structureKind.value === "alert" && ["border-color", "border-width", "border-radius"].includes(key)) return ["border-color", "border-width", "border-radius"];
  if (structureKind.value === "card" && ["link-color", "link-color-emphasis"].includes(key)) {
    return ["link-color", "link-color-emphasis"];
  }
  if (structureKind.value === "card" && ["border-color", "border-width", "border-radius"].includes(key)) {
    return ["border-color", "border-width", "border-radius"];
  }
  // Button's border is a single visual edge: hovering either border-width or
  // border-radius should light up both rows in the token list.
  if (structureKind.value === "button" && ["border-width", "border-radius"].includes(key)) {
    return ["border-width", "border-radius"];
  }
  if (structureKind.value === "generic") {
    const mainnavBodyBorderKeys = ["navbar-body-border-color", "navbar-body-border-width"];
    const mainnavLinkBorderKeys = ["nav-link-border-color", "nav-link-border-width"];
    if (mainnavBodyBorderKeys.includes(key)) return mainnavBodyBorderKeys;
    if (mainnavLinkBorderKeys.includes(key)) return mainnavLinkBorderKeys;
  }
  // Generic structures (switch, input, etc.) — when the hovered token is a
  // border-* row, pair it with any other visible border-* rows so the popup
  // surfaces border-width AND border-radius together. The keys aren't fixed
  // (e.g. form-border-radius-full vs form-border-width-default), so we
  // discover them from the active token map at hover time.
  // Exception: when a key has custom per-element border bands (e.g. subnav's
  // border-width-1 paints the nav's bottom rule and border-width-2 paints
  // the active item's underline — distinct strokes on distinct elements),
  // each one stands alone in the popup so the user reads exactly the
  // stroke they are hovering.
  if (
    structureKind.value === "generic" &&
    (key.includes("border-radius") || key.includes("border-width") || key.includes("border-color")) &&
    !customBorderBandsByKey.value[key]?.length
  ) {
    const borderKeys = Array.from(genericTokenMap.value.keys()).filter((k) =>
      (k.includes("border-radius") || k.includes("border-width") || k.includes("border-color")) &&
      !customBorderBandsByKey.value[k]?.length,
    );
    if (borderKeys.length > 1) return borderKeys;
  }
  if (structureKind.value === "accordion" && ["padding-x-default", "padding-y-default"].includes(key)) {
    return ["padding-x-default", "padding-y-default"];
  }
  if (structureKind.value === "accordion" && key === "content-padding") return ["content-padding"];
  if (structureKind.value === "breadcrumb" && key === "group-gap") return ["group-gap", "gap-xs"];
  return [key];
};

const activeRowKeys = computed(() => new Set(selectedKeys.value));

const activeDesignTokens = computed(() => {
  const tokens = new Set<string>();
  selectedKeys.value.forEach((key) => {
    const row = allStructureTokenMap.value.get(key);
    if (row?.designToken) tokens.add(row.designToken);
  });
  return tokens;
});

const isRowActive = (key: string | null, designToken?: string | null) => {
  if (key && activeRowKeys.value.has(key)) return true;
  if (designToken && activeDesignTokens.value.has(designToken)) return true;
  return false;
};

const syncAccordionForegroundLayers = () => {
  if (structureKind.value !== "accordion") return;
  const root = previewMarkupRef.value;
  const item = root?.querySelector("sgds-accordion-item") as HTMLElement | null;
  const trailing = item?.shadowRoot?.querySelector(".accordion-header__trailing") as HTMLElement | null;

  if (!trailing) return;

  trailing.style.pointerEvents = "none";
  trailing.style.position = "relative";
  trailing.style.zIndex = "8";
};

const injectShadowStyles = (host: HTMLElement, id: string, css: string) => {
  const root = host.shadowRoot;
  if (!root) return;
  const existing = root.querySelector<HTMLStyleElement>(`style[data-structure-style="${id}"]`);
  if (existing) {
    existing.textContent = css;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-structure-style", id);
  style.textContent = css;
  root.appendChild(style);
};

const getFooterBreakpointStyle = (breakpoint: string | null) => {
  const footerPaddingX =
    breakpoint === "320"
      ? "var(--sgds-padding-lg)"
      : breakpoint === "512"
        ? "var(--sgds-padding-xl)"
        : breakpoint === "768"
          ? "var(--sgds-padding-2-xl)"
          : "var(--sgds-padding-none)";
  const desktop = ["1024", "1280", "1440"].includes(breakpoint ?? "");
  const contentMaxWidth =
    breakpoint === "1280"
      ? "var(--sgds-dimension-1168)"
      : breakpoint === "1440"
        ? "var(--sgds-dimension-1312)"
        : "var(--sgds-dimension-888)";
  const topPaddingY = desktop ? "var(--sgds-padding-3-xl)" : "var(--sgds-padding-2-xl)";
  const topGap = desktop ? "var(--sgds-gap-3-xl)" : "var(--sgds-gap-2-xl)";
  const titleFontSize = desktop ? "var(--sgds-font-size-28)" : "var(--sgds-font-size-24)";
  const titleLineHeight = desktop ? "var(--sgds-line-height-36)" : "var(--sgds-line-height-32)";
  const mandatoryDirection = ["1280", "1440"].includes(breakpoint ?? "") ? "row" : "column";
  const mandatoryListDirection = ["768", "1024", "1280", "1440"].includes(breakpoint ?? "") ? "row" : "column";
  const mandatoryListGap = desktop ? "var(--sgds-gap-xl)" : "var(--sgds-gap-sm)";
  const mandatoryListColumnGap = ["768", "1024", "1280", "1440"].includes(breakpoint ?? "")
    ? "var(--sgds-gap-xl)"
    : mandatoryListGap;

  return `
    .footer {
      padding: var(--sgds-padding-none) ${footerPaddingX} !important;
    }
    .footer-top {
      max-width: ${desktop ? contentMaxWidth : "none"} !important;
      padding: ${topPaddingY} var(--sgds-padding-none) !important;
      width: 100% !important;
    }
    .footer-top.has-content {
      gap: ${topGap} !important;
    }
    slot[name="title"]::slotted(*) {
      font-size: ${titleFontSize} !important;
      line-height: ${titleLineHeight} !important;
    }
    .footer-bottom {
      max-width: ${desktop ? contentMaxWidth : "none"} !important;
      padding: var(--sgds-padding-2-xl) var(--sgds-padding-none) !important;
      width: 100% !important;
    }
    .footer-mandatory-links {
      flex-direction: ${mandatoryDirection} !important;
    }
    .footer-mandatory-links ul {
      flex-direction: ${mandatoryListDirection} !important;
      gap: var(--sgds-gap-sm) ${mandatoryListColumnGap} !important;
    }
  `;
};

const getModalStructurePreviewStyle = () => `
  :host {
    display: block;
    min-height: var(--sgds-dimension-480);
    position: relative;
    width: 100%;
  }
  :host([size="fullscreen"]) {
    min-height: var(--sgds-dimension-320);
  }
  .modal {
    display: flex !important;
    inset: 0 !important;
    pointer-events: none !important;
    position: absolute !important;
    z-index: 1 !important;
  }
  .modal[hidden] {
    display: flex !important;
  }
  .modal-panel {
    opacity: 1 !important;
    transform: none !important;
  }
  .modal-panel[hidden] {
    display: flex !important;
  }
  :host([size="fullscreen"]) .modal-panel {
    background-color: var(--sgds-surface-default) !important;
    border-radius: var(--sgds-border-radius-md) !important;
    height: 100% !important;
    margin: 0 !important;
    max-height: 100% !important;
    max-width: 100% !important;
    padding: var(--sgds-padding-xl) !important;
  }
  :host([size="fullscreen"]) .modal-header__close {
    right: 0 !important;
    top: 0 !important;
  }
  .modal-overlay {
    display: none !important;
    position: absolute !important;
  }
  .modal-overlay[hidden] {
    display: none !important;
  }
`;

const revealModalStructurePreview = (component: HTMLElement) => {
  if (!component.hasAttribute("data-structure-open")) return;

  const modalRoot = component.shadowRoot;
  const dialog = modalRoot?.querySelector(".modal") as HTMLElement | null;
  const panel = modalRoot?.querySelector(".modal-panel") as HTMLElement | null;

  dialog?.removeAttribute("hidden");
  dialog?.classList.add("show");
  panel?.removeAttribute("hidden");
  panel?.setAttribute("aria-hidden", "false");
};

const openStructureDropdowns = async () => {
  await nextTick();
  const root = previewMarkupRef.value;
  if (!root) return;

  const comboBoxes = Array.from(
    root.querySelectorAll("sgds-combo-box") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      multiSelect?: boolean;
      selectedItems?: { label: string; value: string }[];
      value?: string;
    }>,
  );

  for (const el of comboBoxes) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "combo-box-inline-menu",
      `:host {
         display: inline-block;
         width: var(--sgds-dimension-560);
       }
       .form-control-container {
         display: flex !important;
         flex-wrap: wrap !important;
         align-items: flex-start !important;
       }
       .form-control-group {
         min-height: var(--sgds-dimension-48) !important;
       }
       .combobox-input-container {
         flex-wrap: nowrap !important;
       }
       .dropdown-menu {
         position: relative !important;
         inset: auto !important;
         transform: none !important;
         box-shadow: var(--sgds-box-shadow-md) !important;
         margin-top: var(--sgds-margin-2-xs) !important;
         z-index: auto !important;
         max-height: none !important;
         flex-basis: 100% !important;
         pointer-events: none !important;
       }
       input.form-control {
         flex: 1 1 var(--sgds-dimension-96) !important;
         width: auto !important;
         pointer-events: none !important;
       }`,
    );
    const input = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement | null;
    if (input) {
      input.tabIndex = -1;
      input.readOnly = true;
      input.setAttribute("readonly", "");
    }
    const selectedValues = (el.value ?? "").split(";").filter(Boolean);
    if (el.multiSelect && selectedValues.length && !el.selectedItems?.length) {
      const options = Array.from(el.querySelectorAll("sgds-combo-box-option")) as HTMLElement[];
      const selectedItems = options
        .map((option) => ({
          label: option.textContent?.trim() ?? "",
          value: option.getAttribute("value") ?? option.textContent?.trim() ?? "",
        }))
        .filter((option) => selectedValues.includes(option.value));
      if (selectedItems.length) {
        el.selectedItems = selectedItems;
        await el.updateComplete;
      }
    }
    (el as HTMLElement & { noFlip?: boolean; drop?: string }).noFlip = true;
    (el as HTMLElement & { drop?: string }).drop = "down";
    if (typeof el.showMenu === "function" && !el.menuIsOpen) {
      try {
        await el.showMenu();
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      } catch {
        // noop
      }
    }
  }

  const datepickers = Array.from(
    root.querySelectorAll("sgds-datepicker") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      hideMenu?: (isOutside?: boolean) => void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      noFlip?: boolean;
      drop?: string;
      _handleClickOutOfElement?: (event: Event) => void;
      _handleCloseMenu?: () => void;
      _handleOpenMenu?: () => void;
    }>,
  );

  for (const el of datepickers) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "datepicker-inline-menu",
      `:host {
         display: inline-block;
         width: var(--sgds-dimension-320);
       }
       .datepicker-container {
         display: flex !important;
         flex-wrap: wrap !important;
         align-items: flex-start !important;
       }
       sgds-datepicker-input {
         flex: 0 0 var(--sgds-dimension-160) !important;
         width: var(--sgds-dimension-160) !important;
       }
       .dropdown-menu {
         position: relative !important;
         inset: auto !important;
         left: auto !important;
         top: auto !important;
         transform: none !important;
         box-shadow: var(--sgds-box-shadow-md) !important;
         margin-top: var(--sgds-margin-2-xs) !important;
         z-index: auto !important;
         flex-basis: 100% !important;
         pointer-events: none !important;
       }
       sgds-datepicker-input,
       sgds-icon-button {
         pointer-events: none !important;
       }`,
    );
    // The structure preview keeps the datepicker calendar open as a static
    // measurement diagram. Detach the production outside-click and focus
    // handlers so clicks in Configuration do not close this preview calendar
    // and then scroll the page down by focusing the structure input.
    if (el._handleClickOutOfElement) {
      document.removeEventListener("click", el._handleClickOutOfElement);
    }
    if (el._handleCloseMenu) {
      el.removeEventListener("sgds-hide", el._handleCloseMenu as EventListener);
    }
    if (el._handleOpenMenu) {
      el.removeEventListener("sgds-show", el._handleOpenMenu as EventListener);
    }
    el.hideMenu = () => {};
    el.noFlip = true;
    el.drop = "down";
    if (typeof el.showMenu === "function" && !el.menuIsOpen) {
      try {
        await el.showMenu();
      } catch {
        // noop
      }
    } else {
      el.menuIsOpen = true;
    }
    await el.updateComplete;
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  const dropdowns = Array.from(
    root.querySelectorAll("sgds-dropdown") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      noFlip?: boolean;
      drop?: string;
    }>,
  );

  for (const el of dropdowns) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "dropdown-inline-menu",
      `:host {
         display: inline-flex !important;
         width: var(--sgds-dimension-320) !important;
       }
       .dropdown {
         display: flex !important;
         flex-direction: column !important;
         align-items: stretch !important;
         width: 100% !important;
       }
       .toggler-container {
         align-self: center !important;
         flex: none !important;
       }
       .dropdown-menu {
         display: block !important;
         position: relative !important;
         inset: auto !important;
         left: auto !important;
         top: auto !important;
         transform: none !important;
         width: 100% !important;
         max-width: var(--sgds-dimension-320) !important;
         max-height: none !important;
         margin-top: var(--sgds-margin-2-xs) !important;
         box-shadow: var(--sgds-box-shadow-md) !important;
         z-index: auto !important;
         pointer-events: none !important;
       }`,
    );
    el.noFlip = true;
    el.drop = "down";
    if (typeof el.showMenu === "function" && !el.menuIsOpen) {
      try {
        await el.showMenu();
      } catch {
        // noop
      }
    } else {
      el.menuIsOpen = true;
    }
    await el.updateComplete;
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  const tooltips = Array.from(
    root.querySelectorAll("sgds-tooltip") as NodeListOf<HTMLElement & {
      open?: boolean;
      show?: () => Promise<void> | void;
      updateComplete?: Promise<unknown>;
    }>,
  );

  for (const el of tooltips) {
    await customElements.whenDefined(el.localName);
    el.open = true;
    await el.updateComplete;
    injectShadowStyles(
      el,
      "tooltip-inline-structure",
      `:host {
         display: inline-flex !important;
       }
       .tooltip-placeholder {
         align-items: center !important;
         display: inline-flex !important;
         justify-content: center !important;
         max-width: none !important;
       }
       .tooltip-placeholder slot {
         display: none !important;
       }
       .tooltip {
         left: auto !important;
         position: static !important;
         top: auto !important;
         visibility: visible !important;
       }`,
    );
    if (typeof el.show === "function") {
      try {
        await el.show();
      } catch {
        // noop
      }
    }
  }

  const overflowMenus = Array.from(
    root.querySelectorAll(".portal-structure-overflow-hover") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot?: ShadowRoot | null;
    }>,
  );

  for (const el of overflowMenus) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "overflow-menu-active-structure",
      `:host {
         pointer-events: none !important;
       }
       sgds-dropdown {
         display: inline-block !important;
       }
       .overflow-btn,
       .overflow-btn:hover {
         background: var(--sgds-bg-translucent-subtle) !important;
         background-color: var(--sgds-bg-translucent-subtle) !important;
         cursor: default !important;
       }`,
    );
  }
};

const getUnionRect = (elements: HTMLElement[], container: HTMLElement): HotspotRect | null => {
  if (!elements.length) return null;
  const containerBounds = container.getBoundingClientRect();
  const bounds = elements.map((element) => element.getBoundingClientRect());
  const minLeft = Math.min(...bounds.map((rect) => rect.left));
  const minTop = Math.min(...bounds.map((rect) => rect.top));
  const maxRight = Math.max(...bounds.map((rect) => rect.right));
  const maxBottom = Math.max(...bounds.map((rect) => rect.bottom));

  return {
    left: minLeft - containerBounds.left,
    top: minTop - containerBounds.top,
    width: maxRight - minLeft,
    height: maxBottom - minTop,
  };
};

const getGapRect = (first: HTMLElement | null, second: HTMLElement | null, container: HTMLElement): HotspotRect | null => {
  if (!first || !second) return null;
  const containerBounds = container.getBoundingClientRect();
  const firstBounds = first.getBoundingClientRect();
  const secondBounds = second.getBoundingClientRect();

  return {
    left: Math.min(firstBounds.left, secondBounds.left) - containerBounds.left,
    top: firstBounds.bottom - containerBounds.top,
    width: Math.max(firstBounds.width, secondBounds.width),
    height: Math.max(0, secondBounds.top - firstBounds.bottom),
  };
};

const getHorizontalGapRect = (first: HTMLElement | null, second: HTMLElement | null, container: HTMLElement): HotspotRect | null => {
  if (!first || !second) return null;
  const containerBounds = container.getBoundingClientRect();
  const firstBounds = first.getBoundingClientRect();
  const secondBounds = second.getBoundingClientRect();
  const leftElement = firstBounds.left <= secondBounds.left ? firstBounds : secondBounds;
  const rightElement = firstBounds.left <= secondBounds.left ? secondBounds : firstBounds;
  const width = Math.max(0, rightElement.left - leftElement.right);
  if (width <= 0) return null;

  return {
    left: leftElement.right - containerBounds.left,
    top: Math.min(leftElement.top, rightElement.top) - containerBounds.top,
    width,
    height: Math.max(leftElement.bottom, rightElement.bottom) - Math.min(leftElement.top, rightElement.top),
  };
};

const parseCssLength = (value: string | null | undefined) => {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : 0;
};

const getUnionBandRect = (bands: PaddingBand[]): HotspotRect | null => {
  if (!bands.length) return null;
  const left = Math.min(...bands.map((band) => band.left));
  const top = Math.min(...bands.map((band) => band.top));
  const right = Math.max(...bands.map((band) => band.left + band.width));
  const bottom = Math.max(...bands.map((band) => band.top + band.height));
  return {
    left,
    top,
    width: right - left,
    height: bottom - top,
  };
};

const clampBandToRect = (band: PaddingBand | null, rect: HotspotRect): PaddingBand | null => {
  if (!band) return null;
  const left = Math.max(band.left, rect.left);
  const top = Math.max(band.top, rect.top);
  const right = Math.min(band.left + band.width, rect.left + rect.width);
  const bottom = Math.min(band.top + band.height, rect.top + rect.height);
  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);
  if (width <= 0 || height <= 0) return null;
  return { left, top, width, height };
};

const getRelativeRect = (element: Element, container: HTMLElement): HotspotRect => {
  const containerBounds = container.getBoundingClientRect();
  const bounds = element.getBoundingClientRect();
  return {
    left: bounds.left - containerBounds.left,
    top: bounds.top - containerBounds.top,
    width: bounds.width,
    height: bounds.height,
  };
};

// Convert a CSS length string (e.g. "12px", "0.75rem") to pixels using the
// document root font size. Returns null when the value cannot be parsed.
// Used to translate gap-token rawValues into the same pixel space that
// getComputedStyle returns, so we can match a CSS `gap` value to the token
// row that documents it.
const parseLengthToPx = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const trimmed = value.trim();
  const match = trimmed.match(/^([0-9]+(?:\.[0-9]+)?)(px|rem|em)?$/i);
  if (!match) return null;
  const num = Number.parseFloat(match[1]);
  if (!Number.isFinite(num)) return null;
  const unit = (match[2] || "px").toLowerCase();
  if (unit === "rem" || unit === "em") {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return num * rootFontSize;
  }
  return num;
};

// Expand <slot> children into their assigned/flattened elements so the
// returned list reflects what the flex/grid layout actually arranges. A bare
// <slot> has zero size and would otherwise be skipped, breaking gap
// detection for shadow-DOM hosts that compose slotted light-DOM content
// (e.g. system-banner-item's `.banner-item` flex strip).
const expandSlotElement = (el: Element): HTMLElement[] => {
  if (el instanceof HTMLSlotElement) {
    const assigned = el.assignedElements({ flatten: true });
    if (assigned.length) {
      return assigned.filter((node): node is HTMLElement => node instanceof HTMLElement);
    }
    return Array.from(el.children).filter((node): node is HTMLElement => node instanceof HTMLElement);
  }
  if (el instanceof HTMLElement) return [el];
  return [];
};

// "Effective" children of a flex/grid container — what the layout treats as
// participants. Filters out collapsed slots and zero-size siblings so the
// adjacency walk only considers visible items.
const getEffectiveChildren = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.children)
    .flatMap(expandSlotElement)
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
};

// A nested SGDS element is "intrinsic" to the host (e.g. `sgds-subnav-item`
// inside `sgds-subnav`) only when its tag begins with the host's tag prefix.
// Standalone SGDS components reused inside another component (e.g. an
// `sgds-button` placed in a subnav's actions slot) live in their own
// component page with their own tokens — their internal padding / gap should
// NOT be attributed to the host's tokens, even if the pixel values happen
// to match. The auto-detect walks therefore stop at non-intrinsic shadow
// boundaries.
const isIntrinsicToHost = (el: Element, hostTag: string): boolean => {
  const tag = el.tagName.toLowerCase();
  if (!tag.startsWith("sgds-")) return true;
  return tag === hostTag || tag.startsWith(`${hostTag}-`);
};

// Walk both light DOM and shadow DOM under `root`, collecting every flex /
// inline-flex / grid / inline-grid container. The generic gap detector runs
// `detectGapBandsForToken` against every entry to find where a given gap
// token actually paints. Walking shadow roots is essential because most
// SGDS components encapsulate their flex strips inside their shadow tree.
// The walk skips shadow DOM of nested non-intrinsic SGDS components so a
// sgds-button reused inside a sgds-subnav's actions slot doesn't leak its
// internal flex/gap into the subnav's auto-detect results.
const enumerateFlexGridContainers = (root: HTMLElement): HTMLElement[] => {
  const result: HTMLElement[] = [];
  const visited = new WeakSet<Element>();
  const hostTag = root.tagName.toLowerCase();
  const visit = (el: Element) => {
    if (visited.has(el)) return;
    visited.add(el);
    if (el instanceof HTMLElement) {
      const cs = getComputedStyle(el);
      const display = cs.display;
      if (display === "flex" || display === "inline-flex" || display === "grid" || display === "inline-grid") {
        result.push(el);
      }
    }
    for (const child of Array.from(el.children)) visit(child);
    if (el instanceof HTMLElement && el.shadowRoot && isIntrinsicToHost(el, hostTag)) {
      for (const child of Array.from(el.shadowRoot.children)) visit(child);
    }
  };
  visit(root);
  return result;
};

// Find every visible gap region inside `containers` whose CSS `gap` matches
// `gapPx` pixels (within 0.5px tolerance to absorb subpixel rounding). For
// each match, compute one band per pair of adjacent effective children, so
// the highlight covers every void the gap token paints — not just one of
// them. This is the engine that auto-detects gaps for any component with a
// gap-* token row.
const detectGapBandsForToken = (
  containers: HTMLElement[],
  gapPx: number,
  shell: HTMLElement,
): PaddingBand[] => {
  const bands: PaddingBand[] = [];
  const targetRounded = Math.round(gapPx);
  for (const container of containers) {
    const cs = getComputedStyle(container);
    const display = cs.display;
    const isFlex = display === "flex" || display === "inline-flex";
    const isGrid = display === "grid" || display === "inline-grid";
    if (!isFlex && !isGrid) continue;
    const flexDirection = cs.flexDirection;
    const isVerticalFlex = isFlex && (flexDirection === "column" || flexDirection === "column-reverse");
    const isHorizontalFlex = isFlex && (flexDirection === "row" || flexDirection === "row-reverse" || !flexDirection);
    const rowGapPx = Math.round(parseCssLength(cs.rowGap) || parseCssLength(cs.gap));
    const colGapPx = Math.round(parseCssLength(cs.columnGap) || parseCssLength(cs.gap));
    const matchVertical = (isVerticalFlex || isGrid) && rowGapPx === targetRounded;
    const matchHorizontal = (isHorizontalFlex || isGrid) && colGapPx === targetRounded;
    if (!matchVertical && !matchHorizontal) continue;
    const children = getEffectiveChildren(container);
    if (children.length < 2) continue;
    const shellBounds = shell.getBoundingClientRect();
    if (matchHorizontal) {
      const sorted = [...children].sort(
        (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left,
      );
      for (let i = 0; i < sorted.length - 1; i++) {
        const aBounds = sorted[i].getBoundingClientRect();
        const bBounds = sorted[i + 1].getBoundingClientRect();
        const visualGap = Math.max(0, bBounds.left - aBounds.right);
        if (visualGap <= 0) continue;
        // Clamp the highlight to the actual gap-token width so layouts that
        // also use `margin: auto` (e.g. system-banner's `.action`) don't
        // bleed the highlight across the auto-margin space — only the CSS
        // gap region is shaded. When the visual void is smaller than the
        // token (rare; usually means flex-shrink ate the gap) fall back to
        // the visual width so the band stays visible.
        const width = Math.min(targetRounded, visualGap);
        bands.push({
          left: aBounds.right - shellBounds.left,
          top: aBounds.top - shellBounds.top,
          width,
          height: aBounds.height,
        });
      }
    }
    if (matchVertical) {
      const sorted = [...children].sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
      );
      for (let i = 0; i < sorted.length - 1; i++) {
        const aBounds = sorted[i].getBoundingClientRect();
        const bBounds = sorted[i + 1].getBoundingClientRect();
        const visualGap = Math.max(0, bBounds.top - aBounds.bottom);
        if (visualGap <= 0) continue;
        const height = Math.min(targetRounded, visualGap);
        bands.push({
          left: aBounds.left - shellBounds.left,
          top: aBounds.bottom - shellBounds.top,
          width: aBounds.width,
          height,
        });
      }
    }
  }
  return bands;
};

// Auto-populate gap bands for every gap-* key in `inspectMeta` that hasn't
// already been set by component-specific logic above. Components that
// declare a Gap row in their token table get a working highlight + popup
// for free — no per-component branch in measureHotspots is needed. The
// detector matches by computed pixel value, so a token row with rawValue
// "12px" / "0.75rem" auto-binds to every flex/grid container whose CSS
// gap resolves to 12px under the current viewport.
const autoDetectGenericGapBands = (
  component: HTMLElement,
  shell: HTMLElement,
  nextRects: Record<string, HotspotRect | null>,
) => {
  const gapKeys = Object.keys(inspectMeta.value).filter((key) => isGapOverlayKey(key));
  if (!gapKeys.length) return;
  const pendingKeys = gapKeys.filter((key) => !genericGapBandsByKey.value[key]?.length);
  if (!pendingKeys.length) return;
  const containers = enumerateFlexGridContainers(component);
  if (!containers.length) return;
  let updates: Record<string, PaddingBand[]> | null = null;
  for (const key of pendingKeys) {
    const token = genericTokenMap.value.get(key);
    const px = parseLengthToPx(token?.rawValue);
    if (!px) continue;
    const bands = detectGapBandsForToken(containers, px, shell);
    if (!bands.length) continue;
    if (!updates) updates = {};
    updates[key] = bands;
    nextRects[key] = getUnionBandRect(bands);
  }
  if (updates) {
    genericGapBandsByKey.value = {
      ...genericGapBandsByKey.value,
      ...updates,
    };
  }
};

// Walk both light and shadow DOM under `root`, collecting every element. The
// padding auto-detector iterates this list to find which element actually
// owns each padding-* token, regardless of nesting depth or shadow boundary.
// Skips shadow DOM of nested non-intrinsic SGDS components (see
// isIntrinsicToHost) so a reused sgds-button's internal padding doesn't leak
// into the host component's padding tokens just because pixel values match.
const enumerateAllElements = (root: HTMLElement): HTMLElement[] => {
  const result: HTMLElement[] = [];
  const visited = new WeakSet<Element>();
  const hostTag = root.tagName.toLowerCase();
  const visit = (el: Element) => {
    if (visited.has(el)) return;
    visited.add(el);
    if (el instanceof HTMLElement) result.push(el);
    for (const child of Array.from(el.children)) visit(child);
    if (el instanceof HTMLElement && el.shadowRoot && isIntrinsicToHost(el, hostTag)) {
      for (const child of Array.from(el.shadowRoot.children)) visit(child);
    }
  };
  visit(root);
  return result;
};

// Find every visible padding strip whose computed value matches `paddingPx`
// pixels. Each side is checked independently; an element with `padding: 12px
// 0` produces a top + bottom band but no horizontal ones. The token's axis
// (derived from its name / usage text) restricts which sides count, so a
// `padding-x` row never claims a vertical strip, etc.
const detectPaddingBandsForToken = (
  elements: HTMLElement[],
  paddingPx: number,
  shell: HTMLElement,
  axis: PaddingAxis,
): PaddingBand[] => {
  const bands: PaddingBand[] = [];
  const target = Math.round(paddingPx);
  const shellBounds = shell.getBoundingClientRect();
  const considerLeft = axis === "all" || axis === "x" || axis === "left";
  const considerRight = axis === "all" || axis === "x" || axis === "right";
  const considerTop = axis === "all" || axis === "y" || axis === "top";
  const considerBottom = axis === "all" || axis === "y" || axis === "bottom";
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    const cs = getComputedStyle(el);
    const padTop = Math.round(parseCssLength(cs.paddingTop));
    const padRight = Math.round(parseCssLength(cs.paddingRight));
    const padBottom = Math.round(parseCssLength(cs.paddingBottom));
    const padLeft = Math.round(parseCssLength(cs.paddingLeft));
    if (considerTop && padTop === target && padTop > 0) {
      bands.push({
        left: rect.left - shellBounds.left,
        top: rect.top - shellBounds.top,
        width: rect.width,
        height: padTop,
      });
    }
    if (considerBottom && padBottom === target && padBottom > 0) {
      bands.push({
        left: rect.left - shellBounds.left,
        top: rect.bottom - padBottom - shellBounds.top,
        width: rect.width,
        height: padBottom,
      });
    }
    if (considerLeft && padLeft === target && padLeft > 0) {
      bands.push({
        left: rect.left - shellBounds.left,
        top: rect.top - shellBounds.top,
        width: padLeft,
        height: rect.height,
      });
    }
    if (considerRight && padRight === target && padRight > 0) {
      bands.push({
        left: rect.right - padRight - shellBounds.left,
        top: rect.top - shellBounds.top,
        width: padRight,
        height: rect.height,
      });
    }
  }
  return bands;
};

// Auto-populate padding bands for every padding-* key in `inspectMeta` that
// hasn't already been set by component-specific logic. Mirrors the gap
// auto-detector: matches each token's computed pixel value against every
// element's padding-top/right/bottom/left, scoped by the token's axis hint.
// Setting `nextRects[key] = null` ensures the surface-rect fallback in
// `genericPaddingBandsByKey` doesn't double-render the surfaceRect strips
// alongside our targeted bands — the per-band buttons populated via
// `extraPaddingBandsByKey` become the single source of highlight + hover.
const autoDetectGenericPaddingBands = (
  component: HTMLElement,
  shell: HTMLElement,
  nextRects: Record<string, HotspotRect | null>,
) => {
  const paddingKeys = Object.keys(inspectMeta.value).filter((key) => isPaddingOverlayKey(key));
  if (!paddingKeys.length) return;
  const pendingKeys = paddingKeys.filter((key) => !extraPaddingBandsByKey.value[key]?.length);
  if (!pendingKeys.length) return;
  const elements = enumerateAllElements(component);
  if (!elements.length) return;
  let updates: Record<string, PaddingBand[]> | null = null;
  for (const key of pendingKeys) {
    const token = genericTokenMap.value.get(key);
    const px = parseLengthToPx(token?.rawValue);
    if (!px) {
      // Zero-value padding tokens (padding-none, etc.) don't paint anything,
      // so the surface-rect fallback's measurement-noise strip would just be
      // misleading — null the rect so no band renders.
      nextRects[key] = null;
      continue;
    }
    const axis = getPaddingAxisFromToken(token, key);
    const bands = detectPaddingBandsForToken(elements, px, shell, axis);
    if (bands.length) {
      if (!updates) updates = {};
      updates[key] = bands;
      // Replace the rect with a no-inset union of the targeted bands. The
      // tooltip's `v-if` checks `hotspotRects[hoverKey]` is truthy, so a
      // non-null rect is needed for the popup to appear on hover. The union
      // rect omits inset properties, which also makes getPaddingBandsForKey
      // return [] (it requires all four insets), so the surface-rect
      // fallback doesn't double-render alongside our per-element bands.
      nextRects[key] = getUnionBandRect(bands);
      continue;
    }
    // No targeted match. Decide whether to keep the surface-rect fallback.
    // The default initialization sets every padding key to the component's
    // surfaceRect with insets derived from its child union. When the token
    // describes padding on an inner shadow-DOM element (e.g. subnav's
    // .subnav-actions), those insets are tiny measurement noise — rendering
    // them as the token's padding strip is misleading. Validate that at
    // least one surface inset actually equals the token's pixel value
    // before letting the fallback render. Components that explicitly set a
    // custom rect (e.g. SGDS-CHECKBOX-GROUP wrapping its form-check margin
    // into form-padding-inline-sm) keep working because their insets DO
    // equal the token's value.
    const existing = nextRects[key];
    if (
      existing &&
      existing.insetLeft != null &&
      existing.insetTop != null &&
      existing.insetWidth != null &&
      existing.insetHeight != null
    ) {
      const target = Math.round(px);
      const surfaceTop = Math.round(existing.insetTop);
      const surfaceLeft = Math.round(existing.insetLeft);
      const surfaceBottom = Math.round(existing.height - existing.insetTop - existing.insetHeight);
      const surfaceRight = Math.round(existing.width - existing.insetLeft - existing.insetWidth);
      const matchesTop = (axis === "all" || axis === "y" || axis === "top") && surfaceTop === target;
      const matchesBottom = (axis === "all" || axis === "y" || axis === "bottom") && surfaceBottom === target;
      const matchesLeft = (axis === "all" || axis === "x" || axis === "left") && surfaceLeft === target;
      const matchesRight = (axis === "all" || axis === "x" || axis === "right") && surfaceRight === target;
      if (!matchesTop && !matchesBottom && !matchesLeft && !matchesRight) {
        nextRects[key] = null;
      }
    }
  }
  if (updates) {
    extraPaddingBandsByKey.value = {
      ...extraPaddingBandsByKey.value,
      ...updates,
    };
  }
};

const setupStructureSidebars = async () => {
  await nextTick();
  const root = previewMarkupRef.value;
  if (!root) return;

  const sidebars = Array.from(
    root.querySelectorAll("sgds-sidebar") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
    }>,
  );

  for (const sidebar of sidebars) {
    await customElements.whenDefined("sgds-sidebar");
    await customElements.whenDefined("sgds-sidebar-group");
    await customElements.whenDefined("sgds-sidebar-item");
    await sidebar.updateComplete;

    injectShadowStyles(
      sidebar,
      "sidebar-structure-inspect-layers",
      `:host {
         position: relative;
         z-index: 0 !important;
       }
       .sidebar,
       .sidebar-main,
       .sidebar-nested-overlay,
       .sidebar--overlay {
         z-index: 0 !important;
       }`,
    );

    const activeGroup =
      (sidebar.querySelector("sgds-sidebar-group[active]") as HTMLElement | null) ??
      (sidebar.querySelector("sgds-sidebar-group") as HTMLElement | null);
    const drawerIsOpen = sidebar.shadowRoot?.querySelector(".sidebar-nested-overlay.show");
    if (!activeGroup || drawerIsOpen) continue;

    await (activeGroup as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete;
    const openDrawer = (activeGroup as HTMLElement & { _handleClick?: () => void })._handleClick;
    if (typeof openDrawer === "function") {
      openDrawer.call(activeGroup);
      await sidebar.updateComplete;
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
  }
};

const setupStructureSteppers = async () => {
  const root = previewMarkupRef.value;
  if (!root?.querySelector("sgds-stepper[data-portal-stepper]")) return;

  await customElements.whenDefined("sgds-stepper");

  const stepperSteps: Record<string, unknown[]> = {
    default: [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Review", component: "Step two" },
      { stepHeader: "Confirm", component: "Step three" },
    ],
    icons: [
      { stepHeader: "Start", component: "Step one", iconName: "pencil" },
      { stepHeader: "Review", component: "Step two", iconName: "file-earmark-text" },
      { stepHeader: "Confirm", component: "Step three", iconName: "check" },
    ],
    long: [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Profile", component: "Step two" },
      { stepHeader: "Eligibility", component: "Step three" },
      { stepHeader: "Documents", component: "Step four" },
      { stepHeader: "Review", component: "Step five" },
      { stepHeader: "Payment", component: "Step six" },
      { stepHeader: "Submit", component: "Step seven" },
      { stepHeader: "Confirm", component: "Step eight" },
    ],
  };

  const steppers = Array.from(
    root.querySelectorAll<HTMLElement>("sgds-stepper[data-portal-stepper]"),
  );

  for (const el of steppers) {
    const variant = el.dataset.portalStepper || "default";
    const activeStep = Number(el.getAttribute("activeStep") ?? el.getAttribute("activestep") ?? el.dataset.portalActiveStep ?? 0);
    const stepper = el as HTMLElement & { activeStep?: number; steps?: unknown[]; updateComplete?: Promise<unknown> };
    stepper.steps = stepperSteps[variant] ?? stepperSteps.default;
    stepper.activeStep = Number.isFinite(activeStep) ? activeStep : 0;
    await stepper.updateComplete;
  }
};

const measureHotspots = async () => {
  await nextTick();
  if (structureKind.value === "accordion") {
    await customElements.whenDefined("sgds-accordion-item");
  } else if (structureKind.value === "card") {
    await customElements.whenDefined("sgds-card");
  } else if (structureKind.value === "button") {
    await customElements.whenDefined("sgds-button");
  } else if (structureKind.value === "alert") {
    await customElements.whenDefined("sgds-alert");
  } else if (structureKind.value === "breadcrumb") {
    await customElements.whenDefined("sgds-breadcrumb");
    await customElements.whenDefined("sgds-breadcrumb-item");
    await customElements.whenDefined("sgds-overflow-menu");
  } else {
    const rootElement = previewMarkupRef.value?.firstElementChild as HTMLElement | null;
    const tagName = rootElement?.tagName.toLowerCase();
    if (tagName?.startsWith("sgds-")) {
      await customElements.whenDefined(tagName);
    }
  }

  await setupStructureSteppers();
  await setupStructureSidebars();
  await openStructureDropdowns();

  const shell = previewShellRef.value;
  const root = previewMarkupRef.value;
  if (!shell || !root) return;
  genericGapBandsByKey.value = {};
  extraPaddingBandsByKey.value = {};
  customBorderBandsByKey.value = {};

  if (structureKind.value === "breadcrumb") {
    const breadcrumb = root.querySelector("sgds-breadcrumb") as HTMLElement | null;
    const breadcrumbRoot = breadcrumb?.shadowRoot;
    const breadcrumbRow = breadcrumbRoot?.querySelector(".breadcrumb") as HTMLElement | null;
    if (!breadcrumb || !breadcrumbRoot || !breadcrumbRow) return;

    const rowRect = getRelativeRect(breadcrumbRow, shell);
    const shellBounds = shell.getBoundingClientRect();
    const items = Array.from(breadcrumbRoot.querySelectorAll("sgds-breadcrumb-item")) as HTMLElement[];
    const separatorElements: HTMLElement[] = [];
    const breadcrumbGap = Number.parseFloat(getComputedStyle(breadcrumbRow).gap || "0") || 8;

    items.forEach((item) => {
      const separator = item.shadowRoot?.querySelector(".separator sgds-icon") as HTMLElement | null;

      if (separator) {
        const rect = separator.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          separatorElements.push(separator);
        }
      }
    });

    const gapBands = separatorElements.flatMap((separator) => {
      const rect = getRelativeRect(separator, shell);
      const gapWidth = Math.max(0, breadcrumbGap);
      return [
        {
          left: Math.max(rowRect.left, rect.left - gapWidth),
          top: rowRect.top,
          width: Math.min(gapWidth, Math.max(0, rect.left - rowRect.left)),
          height: rowRect.height,
        },
        {
          left: rect.left + rect.width,
          top: rowRect.top,
          width: Math.min(gapWidth, Math.max(0, rowRect.left + rowRect.width - (rect.left + rect.width))),
          height: rowRect.height,
        },
      ].filter((band) => band.width > 0);
    });

    breadcrumbGroupGapBands.value = gapBands;
    breadcrumbIconBands.value = separatorElements.map((separator) => {
      const rect = getRelativeRect(separator, shell);
      return {
        left: rect.left,
        top: rowRect.top,
        width: rect.width,
        height: rowRect.height,
      };
    });

    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => [key, null]),
    ) as Record<string, HotspotRect | null>;

    if (gapBands.length) {
      const left = Math.min(...gapBands.map((band) => band.left));
      const right = Math.max(...gapBands.map((band) => band.left + band.width));
      nextRects["group-gap"] = {
        left,
        top: rowRect.top,
        width: right - left,
        height: rowRect.height,
      };
    }

    const iconRect = getUnionRect(separatorElements, shell);
    if (iconRect) nextRects["icon-color"] = iconRect;

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "generic") {
    // Some component demos wrap their SGDS element in a layout div (e.g.
    // <div class="portal-demo-nav"><sgds-mainnav>...). Walk through any
    // single-child non-SGDS wrappers so we use the actual SGDS host as the
    // component. Otherwise the wrapper's only child IS the SGDS host, which
    // makes contentRect === surfaceRect and padding bands collapse to 0.
    let component = root.firstElementChild as HTMLElement | null;
    while (
      component &&
      !component.tagName.toLowerCase().startsWith("sgds-") &&
      component.children.length === 1
    ) {
      component = component.firstElementChild as HTMLElement | null;
    }
    if (!component) return;

    if (component.tagName === "SGDS-FOOTER") {
      injectShadowStyles(
        component,
        "footer-breakpoint-preview",
        getFooterBreakpointStyle(activeVariant.value),
      );
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }

    if (component.tagName === "SGDS-MODAL") {
      injectShadowStyles(
        component,
        "modal-structure-preview",
        getModalStructurePreviewStyle(),
      );
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      revealModalStructurePreview(component);
    }

    const surfaceRect = getRelativeRect(component, shell);
    const childElements = Array.from(component.children).filter((child) => {
      const rect = child.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }) as HTMLElement[];
    const contentRect = getUnionRect(childElements, shell);
    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => {
        // Default fallback: surfaceRect (with padding insets when applicable).
        // Gap-* keys are an exception — they should only highlight when a
        // component-specific override (below) supplies a real gap rect.
        // Otherwise the hotspot would tint the entire surface as a "gap",
        // which is misleading. Initial null means the hotspot stays hidden
        // unless explicitly set later in this branch.
        if (isGapOverlayKey(key)) return [key, null as HotspotRect | null];
        const nextRect = isPaddingOverlayKey(key) && contentRect
          ? {
              ...surfaceRect,
              insetLeft: Math.max(0, contentRect.left - surfaceRect.left),
              insetTop: Math.max(0, contentRect.top - surfaceRect.top),
              insetWidth: contentRect.width,
              insetHeight: contentRect.height,
            }
          : surfaceRect;
        return [key, nextRect];
      }),
    ) as Record<string, HotspotRect | null>;

    if (component.tagName === "SGDS-MASTHEAD") {
      const crest = component.shadowRoot?.querySelector(".sg-crest") as HTMLElement | null;
      if (crest && "dimension-20" in nextRects) {
        nextRects["dimension-20"] = getRelativeRect(crest, shell);
      }
      const container = component.shadowRoot?.querySelector(".container") as HTMLElement | null;
      if (container) {
        const containerRect = getRelativeRect(container, shell);
        const paddingUpdates: Record<string, PaddingBand[]> = {};
        ["mainnav-mobile-padding-x", "mainnav-padding-x"].forEach((key) => {
          if (!(key in nextRects)) return;
          const tokenPx =
            parseLengthToPx(genericTokenMap.value.get(key)?.rawValue) ??
            parseCssLength(getComputedStyle(container).paddingLeft);
          if (!tokenPx) {
            nextRects[key] = null;
            return;
          }
          const width = Math.min(tokenPx, containerRect.width / 2);
          const bands = [
            {
              left: containerRect.left,
              top: containerRect.top,
              width,
              height: containerRect.height,
            },
            {
              left: containerRect.left + containerRect.width - width,
              top: containerRect.top,
              width,
              height: containerRect.height,
            },
          ];
          paddingUpdates[key] = bands;
          nextRects[key] = getUnionBandRect(bands);
        });
        if (Object.keys(paddingUpdates).length) {
          extraPaddingBandsByKey.value = {
            ...extraPaddingBandsByKey.value,
            ...paddingUpdates,
          };
        }
      }
    }

    if (component.tagName === "SGDS-SKELETON") {
      const skeletonRoot = component.shadowRoot;
      const skeletonSurface = skeletonRoot?.querySelector(".skeleton") as HTMLElement | null;
      const skeletonRows = Array.from(
        skeletonRoot?.querySelectorAll(".skeleton > div[class*='skeleton-row']") ?? [],
      ) as HTMLElement[];
      const borderTargets = skeletonRows.length
        ? skeletonRows
        : skeletonSurface
          ? [skeletonSurface]
          : [];
      const borderRadius = allStructureTokenMap.value.get("border-radius")?.rawValue || "4px";
      const borderBands = borderTargets.map((target) => ({
        ...getRelativeRect(target, shell),
        borderRadius,
      }));
      if (borderBands.length) {
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          "border-radius": borderBands,
        };
        nextRects["border-radius"] = getUnionBandRect(borderBands);
      }
    }

    if (component.tagName === "SGDS-PROGRESS-BAR") {
      const progressRoot = component.shadowRoot;
      const progressTrack = progressRoot?.querySelector(".progress") as HTMLElement | null;
      const progressBar = progressRoot?.querySelector(".progress-bar") as HTMLElement | null;
      const label = progressRoot?.querySelector(".label") as HTMLElement | null;

      if (progressBar) {
        nextRects["primary-surface-default"] = getRelativeRect(progressBar, shell);
        nextRects["neutral-surface-default"] = getRelativeRect(progressBar, shell);
      }

      if (progressTrack) {
        const trackRect = getRelativeRect(progressTrack, shell);
        nextRects["dimension-4"] = trackRect;
        nextRects["bg-translucent"] = trackRect;
      }

      if (label) {
        const labelRect = getRelativeRect(label, shell);
        nextRects["font-size-14"] = labelRect;
        nextRects["color-subtle"] = labelRect;
      }
    }

    if (component.tagName === "SGDS-PAGINATION") {
      const paginationRoot = component.shadowRoot;
      const pageLinks = Array.from(
        paginationRoot?.querySelectorAll('li[key] .page-link') ?? [],
      ) as HTMLElement[];
      const pageLink =
        (paginationRoot?.querySelector('li[key="12"] .page-link') as HTMLElement | null) ??
        (paginationRoot?.querySelector(".page-item.active .page-link") as HTMLElement | null) ??
        (paginationRoot?.querySelector(".page-link:not(.ellipsis)") as HTMLElement | null);

      if (pageLink && "dimension" in nextRects) {
        nextRects.dimension = getRelativeRect(pageLink, shell);
      }

      if (pageLink && "border-radius" in nextRects) {
        const borderTargets = pageLinks.length ? pageLinks : [pageLink];
        const borderRadius = allStructureTokenMap.value.get("border-radius")?.rawValue || getComputedStyle(pageLink).borderRadius || "8px";
        const borderBands = borderTargets.map((target) => ({
          ...getRelativeRect(target, shell),
          borderRadius: getComputedStyle(target).borderRadius || borderRadius,
        }));
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          "border-radius": borderBands,
        };
        nextRects["border-radius"] = getUnionBandRect(borderBands);
      }
    }

    if (component.tagName === "SGDS-SIDENAV") {
      const activeLink =
        (component.querySelector("sgds-sidenav-link[active]") as HTMLElement | null) ??
        (component.querySelector("sgds-sidenav-link") as HTMLElement | null);
      const activeItem =
        (component.querySelector("sgds-sidenav-item[active]") as HTMLElement | null) ??
        (component.querySelector("sgds-sidenav-item") as HTMLElement | null);
      const linkAnchor = activeLink?.querySelector("a") as HTMLElement | null;
      const itemButton = activeItem?.shadowRoot?.querySelector(".sidenav-btn") as HTMLElement | null;
      const itemAnchor = activeItem?.querySelector("a") as HTMLElement | null;
      const borderTarget = linkAnchor ?? itemButton ?? itemAnchor;
      if (borderTarget && "border-radius" in nextRects) {
        nextRects["border-radius"] = getRelativeRect(borderTarget, shell);
      }
    }

    if (component.tagName === "SGDS-FOOTER") {
      const footerSurface = component.shadowRoot?.querySelector(".footer") as HTMLElement | null;
      if (footerSurface && "padding-x" in nextRects) {
        const footerRect = getRelativeRect(footerSurface, shell);
        const footerStyles = getComputedStyle(footerSurface);
        const paddingLeft = parseCssLength(footerStyles.paddingLeft);
        const paddingRight = parseCssLength(footerStyles.paddingRight);
        const bands: PaddingBand[] = [];
        if (paddingLeft > 0) {
          bands.push({
            left: footerRect.left,
            top: footerRect.top,
            width: paddingLeft,
            height: footerRect.height,
          });
        }
        if (paddingRight > 0) {
          bands.push({
            left: footerRect.left + footerRect.width - paddingRight,
            top: footerRect.top,
            width: paddingRight,
            height: footerRect.height,
          });
        }
        nextRects["padding-x"] = bands.length ? getUnionBandRect(bands) : null;
        extraPaddingBandsByKey.value = {
          ...extraPaddingBandsByKey.value,
          "padding-x": bands,
        };
      }

      const footerTop = component.shadowRoot?.querySelector(".footer-top") as HTMLElement | null;
      if (footerTop) {
        const footerTopRect = getRelativeRect(footerTop, shell);
        const footerTopStyles = getComputedStyle(footerTop);
        const borderBottomWidth = parseCssLength(footerTopStyles.borderBottomWidth) || 1;
        const footerTopBottomBorder: PaddingBand = {
          left: footerTopRect.left,
          top: footerTopRect.top + footerTopRect.height - borderBottomWidth,
          width: footerTopRect.width,
          height: borderBottomWidth,
        };
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          "border-color-default": [footerTopBottomBorder],
          "border-width": [footerTopBottomBorder],
        };
        nextRects["border-color-default"] = footerTopBottomBorder;
        nextRects["border-width"] = footerTopBottomBorder;
      }
    }

    if (component.tagName === "SGDS-MODAL") {
      const modalRoot = component.shadowRoot;
      const panel = modalRoot?.querySelector(".modal-panel") as HTMLElement | null;
      const header = modalRoot?.querySelector(".modal-header") as HTMLElement | null;
      const overlay = modalRoot?.querySelector(".modal-overlay") as HTMLElement | null;

      if (panel) {
        const panelRect = getRelativeRect(panel, shell);
        Object.keys(nextRects).forEach((key) => {
          if (key === "dimension" || key.startsWith("dimension-")) {
            nextRects[key] = panelRect;
          }
        });
        nextRects["border-radius"] = panelRect;
        nextRects["surface-default"] = panelRect;
      }

      if (header && "dimension-872" in nextRects && !isModalFullscreenStructure.value) {
        nextRects["dimension-872"] = getRelativeRect(header, shell);
      }

      if (overlay && "bg-overlay" in nextRects) {
        nextRects["bg-overlay"] = null;
      }
    }

    if (component.tagName === "SGDS-DRAWER") {
      Object.keys(nextRects).forEach((key) => {
        if (key === "dimension" || key.startsWith("dimension-")) {
          nextRects[key] = null;
        }
      });
      nextRects["padding-none"] = null;
    }

    if (component.tagName === "SGDS-DROPDOWN") {
      Object.keys(nextRects).forEach((key) => {
        nextRects[key] = null;
      });
      const dropdownMenu = component.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement | null;
      if (dropdownMenu) {
        const dropdownRect = getRelativeRect(dropdownMenu, shell);
        const dropdownStyles = getComputedStyle(dropdownMenu);
        const dropdownPaddingTop = parseCssLength(dropdownStyles.paddingTop);
        const dropdownPaddingBottom = parseCssLength(dropdownStyles.paddingBottom);
        const dropdownPaddingRect = {
          ...dropdownRect,
          insetLeft: 0,
          insetTop: dropdownPaddingTop,
          insetWidth: dropdownRect.width,
          insetHeight: Math.max(
            0,
            dropdownRect.height - dropdownPaddingTop - dropdownPaddingBottom,
          ),
        };
        nextRects["dimension-192"] = dropdownRect;
        nextRects["dimension-320"] = dropdownRect;
        nextRects["dimension-480"] = dropdownRect;
        nextRects["border-radius"] = dropdownRect;
        nextRects["padding-xs"] = dropdownPaddingRect;
        extraPaddingBandsByKey.value = {
          ...extraPaddingBandsByKey.value,
          "padding-xs": getPaddingBands(dropdownPaddingRect, "y"),
        };
      }
    }

    if (component.tagName === "SGDS-FILE-UPLOAD") {
      const uploadRoot = component.shadowRoot;
      const uploadContainer = uploadRoot?.querySelector(".file-upload-container") as HTMLElement | null;
      const uploadButton = uploadRoot?.querySelector("sgds-button") as HTMLElement | null;
      const buttonSurface = uploadButton?.shadowRoot?.querySelector(".btn") as HTMLElement | null;
      const buttonLabel = uploadButton?.shadowRoot?.querySelector(".btn > span") as HTMLElement | null;
      const rightIconSlot = uploadButton?.shadowRoot?.querySelector('slot[name="rightIcon"]') as HTMLSlotElement | null;
      const rightIcon = rightIconSlot?.assignedElements?.({ flatten: true })[0] as HTMLElement | undefined;

      if (buttonSurface) {
        const buttonRect = getRelativeRect(buttonSurface, shell);
        const buttonStyles = getComputedStyle(buttonSurface);
        const paddingTop = parseCssLength(buttonStyles.paddingTop);
        const paddingRight = parseCssLength(buttonStyles.paddingRight);
        const paddingBottom = parseCssLength(buttonStyles.paddingBottom);
        const paddingLeft = parseCssLength(buttonStyles.paddingLeft);
        nextRects["padding-x"] = {
          ...buttonRect,
          insetLeft: paddingLeft,
          insetTop: 0,
          insetWidth: Math.max(0, buttonRect.width - paddingLeft - paddingRight),
          insetHeight: buttonRect.height,
        };
        nextRects["padding-y"] = {
          ...buttonRect,
          insetLeft: 0,
          insetTop: paddingTop,
          insetWidth: buttonRect.width,
          insetHeight: Math.max(0, buttonRect.height - paddingTop - paddingBottom),
        };
        nextRects["border-color-muted"] = buttonRect;
        nextRects["form-border-width-default"] = buttonRect;
        nextRects["form-border-radius-md"] = buttonRect;
      }

      const containerChildren = uploadContainer
        ? getEffectiveChildren(uploadContainer).filter((child) => child.getBoundingClientRect().height > 0)
        : [];
      const uploadContainerGapBands = containerChildren
        .slice(0, -1)
        .map((child, index) => getGapRect(child, containerChildren[index + 1], shell))
        .filter((band): band is HotspotRect => Boolean(band && band.height > 0));
      const buttonGapBand = getHorizontalGapRect(buttonLabel, rightIcon ?? null, shell);
      genericGapBandsByKey.value = {
        ...genericGapBandsByKey.value,
        "form-gap-md": uploadContainerGapBands,
        "form-gap-lg": buttonGapBand ? [buttonGapBand] : [],
      };
      Object.entries(genericGapBandsByKey.value).forEach(([key, bands]) => {
        if (bands.length) nextRects[key] = getUnionBandRect(bands);
        else if (key in nextRects) nextRects[key] = null;
      });

      for (const key of ["form-gap-2-xl", "form-gap-xl"]) {
        if (key in nextRects) nextRects[key] = null;
      }
    }

    if (component.tagName === "SGDS-MAINNAV") {
      const mainnavRoot = component.shadowRoot;
      injectShadowStyles(
        component,
        "mainnav-structure-layer",
        `nav,
         nav > .navbar-body {
           z-index: auto !important;
         }`,
      );
      const mainnavSurface = mainnavRoot?.querySelector("nav") as HTMLElement | null;
      const activeItem = component.querySelector("sgds-mainnav-item[active]") as HTMLElement | null;
      const activeItemSlot = activeItem?.shadowRoot?.querySelector("slot") as HTMLSlotElement | null;
      const activeDropdown = component.querySelector("sgds-mainnav-dropdown[active]") as HTMLElement | null;
      const activeDropdownNavLink = activeDropdown?.shadowRoot?.querySelector(".nav-link") as HTMLElement | null;
      const activeLink = activeDropdownNavLink ?? (
        activeItemSlot?.assignedElements({ flatten: true })[0] ??
        activeItem?.querySelector("a")
      ) as HTMLElement | null;
      const dropdown = activeDropdown ?? component.querySelector("sgds-mainnav-dropdown") as HTMLElement | null;
      const dropdownNavLink = dropdown?.shadowRoot?.querySelector(".nav-link") as HTMLElement | null;
      const dropdownTogglerSlot = dropdownNavLink?.querySelector("slot[name='toggler']") as HTMLSlotElement | null;
      const dropdownToggler = dropdownTogglerSlot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
      const dropdownChevron = dropdownNavLink?.querySelector("sgds-icon") as HTMLElement | null;
      const customBands: Record<string, PaddingBand[]> = {};

      const setCustomBorderBand = (key: string, band: PaddingBand | null) => {
        if (!(key in nextRects) || !band) return;
        customBands[key] = [band];
        nextRects[key] = band;
      };

      const setCustomGapBands = (key: string, bands: PaddingBand[]) => {
        if (!(key in nextRects) || !bands.length) return;
        genericGapBandsByKey.value = {
          ...genericGapBandsByKey.value,
          [key]: bands,
        };
        nextRects[key] = getUnionBandRect(bands);
      };

      if (mainnavSurface) {
        const mainnavSurfaceRect = getRelativeRect(mainnavSurface, shell);
        const bottomBorderWidth =
          parseLengthToPx(genericTokenMap.value.get("navbar-body-border-width")?.rawValue) ||
          1;
        const mainnavBottomBorder = {
          left: mainnavSurfaceRect.left,
          top: mainnavSurfaceRect.top + mainnavSurfaceRect.height - bottomBorderWidth,
          width: mainnavSurfaceRect.width,
          height: bottomBorderWidth,
        };
        setCustomBorderBand("navbar-body-border-color", mainnavBottomBorder);
        setCustomBorderBand("navbar-body-border-width", mainnavBottomBorder);
      }

      if (activeLink) {
        const activeLinkRect = getRelativeRect(activeLink, shell);
        const activeLinkStyles = getComputedStyle(activeLink);
        const bottomBorderWidth =
          parseCssLength(activeLinkStyles.borderBottomWidth) ||
          parseLengthToPx(genericTokenMap.value.get("nav-link-border-width")?.rawValue) ||
          4;
        const activeLinkBottomBorder = {
          left: activeLinkRect.left,
          top: activeLinkRect.top + activeLinkRect.height - bottomBorderWidth,
          width: activeLinkRect.width,
          height: bottomBorderWidth,
        };
        setCustomBorderBand("nav-link-border-color", activeLinkBottomBorder);
        setCustomBorderBand("nav-link-border-width", activeLinkBottomBorder);
      }

      const dropdownLinkGapBand = getHorizontalGapRect(dropdownToggler ?? null, dropdownChevron, shell);
      if (dropdownLinkGapBand) {
        setCustomGapBands("gap-xs", [dropdownLinkGapBand]);
      }

      if (Object.keys(customBands).length) {
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          ...customBands,
        };
      }
    }

    // Subnav: at the structure preview's typical desktop viewport (≥1024px),
    // SGDS's media queries collapse `.header-container` and `.subnav-actions`
    // padding to 0, hiding the `padding-2-xl` (32px horizontal) and
    // `padding-md` (16px vertical) tokens entirely. Inject a stylesheet into
    // the subnav's shadow root that pins these tokens onto both elements so
    // the structure preview renders all four documented padding tokens at
    // once. The override only applies inside the docs preview — no shipped
    // SGDS CSS changes.
    if (component.tagName === "SGDS-SUBNAV") {
      const SUBNAV_OVERRIDE_MARKER = "__sgds_subnav_structure_preview__";
      const subnavRoot = component.shadowRoot;
      if (subnavRoot) {
        const existing = (subnavRoot.adoptedStyleSheets ?? []).find(
          (sheet: any) => sheet[SUBNAV_OVERRIDE_MARKER],
        );
        if (!existing) {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(`
            .subnav {
              align-items: center !important;
            }
            .subnav-nav-group {
              align-items: center !important;
            }
            .header-container {
              align-items: center !important;
              padding: var(--sgds-padding-md) var(--sgds-padding-2-xl) !important;
            }
            .subnav-actions {
              align-items: center !important;
              padding: var(--sgds-padding-sm) var(--sgds-padding-2-xl) !important;
            }
            /* SGDS adds 20px padding-top to the slotted header at desktop
               widths so the heading sits below an invisible breadcrumb
               row. In the structure preview the row is standalone and
               align-items: center already vertically centres the H5 box —
               the extra padding pushes the visible text below the row's
               true centre, leaving empty space above. Reset it. */
            slot[name="header"]::slotted(*) {
              padding-top: 0 !important;
              margin-top: 0 !important;
            }
          `);
          (sheet as any)[SUBNAV_OVERRIDE_MARKER] = true;
          subnavRoot.adoptedStyleSheets = [
            ...(subnavRoot.adoptedStyleSheets ?? []),
            sheet,
          ];
        }
      }

      // Subnav's "borders" are bottom-only strokes:
      //   • border-width-1 (1px) + border-color-muted → bottom of the .nav
      //     element (the row-separator rule under the entire subnav)
      //   • border-width-2 (2px) + primary-border-color-default → bottom of
      //     the active subnav-item (the active-tab indicator)
      // The generic perimeter ring would wrap the whole subnav in a 4-sided
      // outline — wrong for both tokens. Populate customBorderBandsByKey so
      // each token highlights only the actual stroke region, and dimension
      // annotations / perimeter rings are suppressed.
      const navEl = subnavRoot?.querySelector("nav") as HTMLElement | null;
      const subnavInner = subnavRoot?.querySelector(".subnav") as HTMLElement | null;
      const navBorderTarget = navEl ?? subnavInner;
      if (navBorderTarget) {
        const navStyles = getComputedStyle(navBorderTarget);
        const navThickness = Number.parseFloat(navStyles.borderBottomWidth) || 1;
        const navRect = getRelativeRect(navBorderTarget, shell);
        const navStripe: PaddingBand = {
          left: navRect.left,
          top: navRect.top + navRect.height - navThickness,
          width: navRect.width,
          height: navThickness,
        };
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          "border-width-1": [navStripe],
        };
        nextRects["border-width-1"] = navStripe;
      }

      const activeItem = component.querySelector("sgds-subnav-item[active]") as HTMLElement | null;
      const activeAnchor = activeItem?.querySelector("a, :scope > *") as HTMLElement | null;
      const activeTarget = activeAnchor ?? activeItem;
      if (activeTarget) {
        const activeStyles = getComputedStyle(activeTarget);
        const activeThickness = Number.parseFloat(activeStyles.borderBottomWidth) || 2;
        const activeRect = getRelativeRect(activeTarget, shell);
        const activeStripe: PaddingBand = {
          left: activeRect.left,
          top: activeRect.top + activeRect.height - activeThickness,
          width: activeRect.width,
          height: activeThickness,
        };
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          "border-width-2": [activeStripe],
        };
        nextRects["border-width-2"] = activeStripe;
      }

      // Suppress the icon-size-md dimension annotations — the subnav-item's
      // external-link affordance isn't rendered in the structure preview, so
      // the 1.25rem brackets that would otherwise flank the row don't
      // correspond to anything visible.
      nextRects["icon-size-md"] = null;
    }

    // Stepper structure tokens map onto specific shadow-DOM elements per the
    // "Where it's used" column — wrapping the whole component in a perimeter
    // ring or annotating its full bounds would be wrong:
    //   • border-width-2 → 2px connector stroke between markers
    //   • dimension-32   → step 3 marker box (32x32)
    //   • other dimension tokens are listed in the table but not annotated
    //   • padding-x/y/xl → don't apply at the horizontal-orientation preview
    if (component.tagName === "SGDS-STEPPER") {
      const stepperRoot = component.shadowRoot;
      const markers = Array.from(
        stepperRoot?.querySelectorAll(".stepper-marker") ?? [],
      ) as HTMLElement[];
      // Connector stroke: the actual line is a pseudo-element between each
      // marker pair, so synthesise the same 2px band from marker positions.
      if (markers.length >= 2) {
        const shellBounds = shell.getBoundingClientRect();
        const strokeWidth =
          parseLengthToPx(allStructureTokenMap.value.get("border-width-2")?.rawValue) ||
          2;
        const connectorBands: PaddingBand[] = [];
        for (let index = 0; index < markers.length - 1; index++) {
          const a = markers[index].getBoundingClientRect();
          const b = markers[index + 1].getBoundingClientRect();
          const width = Math.max(0, b.left - a.right);
          if (width <= 0) continue;
          connectorBands.push({
            left: a.right - shellBounds.left,
            top: a.top - shellBounds.top + (a.height - strokeWidth) / 2,
            width,
            height: strokeWidth,
          });
        }
        customBorderBandsByKey.value = {
          ...customBorderBandsByKey.value,
          "border-width-2": connectorBands,
        };
        nextRects["border-width-2"] = connectorBands.length
          ? getUnionBandRect(connectorBands)
          : null;
      }

      // dimension-32 — markers are square (32x32). Anchor the only Stepper
      // size annotation to step 3 so it sits beside the final marker.
      if (markers.length) {
        const marker = markers[2] ?? markers[markers.length - 1] ?? markers[0];
        nextRects["dimension-32"] = getRelativeRect(marker, shell);
      }

      // Keep the Stepper structure preview focused: only the marker's
      // 32px dimension is annotated. Other size tokens remain in the table
      // but do not render dimension brackets in the demo.
      nextRects["dimension-128"] = null;
      nextRects["dimension-2"] = null;

      // padding-x / padding-y / padding-xl don't apply at the horizontal
      // preview's viewport — clear them so no dimension annotation or
      // surface-rect hotspot renders.
      nextRects["padding-x"] = null;
      nextRects["padding-y"] = null;
      nextRects["padding-xl"] = null;
    }

    if (isToastStructure.value && component.tagName === "SGDS-TOAST") {
      const toastRoot = component.shadowRoot;
      const toastSurface = toastRoot?.querySelector(".toast") as HTMLElement | null;
      const toastRect = toastSurface ? getRelativeRect(toastSurface, shell) : surfaceRect;
      const iconSlot = toastRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement | null;
      const actionSlot = toastRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;
      const icon = (iconSlot?.assignedElements({ flatten: true })[0] ?? component.querySelector('[slot="icon"]')) as HTMLElement | null;
      const action = (actionSlot?.assignedElements({ flatten: true })[0] ?? component.querySelector('[slot="action"]')) as HTMLElement | null;
      const toastContent = toastRoot?.querySelector(".toast-content") as HTMLElement | null;
      const toastBody = toastRoot?.querySelector(".toast-body") as HTMLElement | null;
      const title = toastRoot?.querySelector(".toast-body__title") as HTMLElement | null;
      const message = toastRoot?.querySelector(".toast-body__message") as HTMLElement | null;

      const toastBodyGapBands = [
        getGapRect(title, message, shell),
      ]
        .map((band) => clampBandToRect(band, toastRect))
        .filter((band): band is PaddingBand => Boolean(band && band.height > 0));

      const toastContentGapBands = [
        getGapRect(toastBody, action, shell),
      ]
        .map((band) => clampBandToRect(band, toastRect))
        .filter((band): band is PaddingBand => Boolean(band && band.height > 0));

      const toastGapBands = [
        getHorizontalGapRect(icon, toastContent, shell),
        ...toastContentGapBands,
      ]
        .map((band) => clampBandToRect(band, toastRect))
        .filter((band): band is PaddingBand => Boolean(band && (band.width > 0 || band.height > 0)));

      genericGapBandsByKey.value = {
        "gap-2-xs": toastBodyGapBands,
        "gap-sm": toastGapBands,
      };

      Object.entries(genericGapBandsByKey.value).forEach(([key, bands]) => {
        nextRects[key] = getUnionBandRect(bands);
      });

      nextRects["layout-gap-md"] = null;
    }

    if (component.tagName === "SGDS-BADGE") {
      const badgeRoot = component.shadowRoot;
      const badgeSurface = badgeRoot?.querySelector(".badge") as HTMLElement | null;
      const badgeLabel = badgeRoot?.querySelector(".badge-label") as HTMLElement | null;

      if (badgeSurface) {
        const badgeRect = getRelativeRect(badgeSurface, shell);
        const badgeStyles = getComputedStyle(badgeSurface);
        const paddingLeft = Number.parseFloat(badgeStyles.paddingLeft || "0");
        const paddingRight = paddingLeft;
        nextRects["padding-x"] = {
          ...badgeRect,
          insetLeft: paddingLeft,
          insetTop: 0,
          insetWidth: Math.max(0, badgeRect.width - paddingLeft - paddingRight),
          insetHeight: badgeRect.height,
        };
        nextRects["padding-y"] = null;
        if (badgeLabel) {
          const labelRect = getRelativeRect(badgeLabel, shell);
          const labelStyles = getComputedStyle(badgeLabel);
          const labelPadding = Number.parseFloat(labelStyles.paddingLeft || "0");
          nextRects["padding-3-xs"] = {
            ...labelRect,
            insetLeft: labelPadding,
            insetTop: 0,
            insetWidth: Math.max(0, labelRect.width - labelPadding * 2),
            insetHeight: labelRect.height,
          };
        }
        nextRects["border-width"] = badgeRect;
        nextRects["border-radius"] = badgeRect;
        nextRects["height"] = badgeRect;
        nextRects["min-width"] = badgeRect;
      }
    }

    if (component.tagName === "SGDS-DESCRIPTION-LIST-GROUP") {
      const listItems = Array.from(component.querySelectorAll("sgds-description-list")) as HTMLElement[];
      const xBands: PaddingBand[] = [];
      const yBands: PaddingBand[] = [];
      const labelContainers = listItems
        .map((item) => item.shadowRoot?.querySelector(".label-container") as HTMLElement | null)
        .filter((labelContainer): labelContainer is HTMLElement => Boolean(labelContainer));
      const lastLabelContainer = labelContainers.at(-1);

      if (lastLabelContainer) {
        const labelRect = getRelativeRect(lastLabelContainer, shell);
        const componentRect = getRelativeRect(component, shell);
        nextRects["dimension-280"] = {
          ...labelRect,
          height: Math.max(labelRect.height, componentRect.top + componentRect.height - labelRect.top),
        };
      }

      listItems.forEach((item) => {
        const itemRoot = item.shadowRoot;
        const itemContainer = itemRoot?.querySelector(".container") as HTMLElement | null;
        const labelContainer = itemRoot?.querySelector(".label-container") as HTMLElement | null;
        const dataContainer = itemRoot?.querySelector(".data-container") as HTMLElement | null;
        const contentRect = getUnionRect(
          [labelContainer, dataContainer].filter(Boolean) as HTMLElement[],
          shell,
        );
        if (!itemContainer || !contentRect) return;

        const itemRect = getRelativeRect(itemContainer, shell);
        const paddingRect: HotspotRect = {
          ...itemRect,
          insetLeft: Math.max(0, contentRect.left - itemRect.left),
          insetTop: Math.max(0, contentRect.top - itemRect.top),
          insetWidth: contentRect.width,
          insetHeight: contentRect.height,
        };
        xBands.push(...getPaddingBands(paddingRect, "x"));
        yBands.push(...getPaddingBands(paddingRect, "y"));
      });

      if (xBands.length || yBands.length) {
        extraPaddingBandsByKey.value = {
          ...extraPaddingBandsByKey.value,
          ...(xBands.length ? { "padding-x": xBands } : {}),
          ...(yBands.length ? { "padding-y": yBands } : {}),
        };
        if (xBands.length) nextRects["padding-x"] = getUnionBandRect(xBands);
        if (yBands.length) nextRects["padding-y"] = getUnionBandRect(yBands);
      }
    }

    if (component.tagName === "SGDS-LINK") {
      const trailingIcon = component.querySelector("a sgds-icon:last-child") as HTMLElement | null;
      if (trailingIcon) {
        nextRects["icon-size"] = getRelativeRect(trailingIcon, shell);
      }
    }

    // For checkbox-group, override the form-padding-inline-sm hotspot to
    // highlight the actual vertical margin strip applied per checkbox row.
    // SGDS sets `.form-check { margin: var(--sgds-form-padding-inline-sm) 0 }`
    // on each <sgds-checkbox>, so the visible effect is a thin band above and
    // below each row — not padding around the whole group. We point at the
    // first checkbox as a representative example: surface = its host rect
    // (which includes margin), content = its inner .form-check rect.
    if (component.tagName === "SGDS-CHECKBOX-GROUP") {
      const groupRoot = component.shadowRoot;
      const labelHintContainer = groupRoot?.querySelector(".label-hint-container") as HTMLElement | null;
      const checkboxContainer = groupRoot?.querySelector(".checkbox-container") as HTMLElement | null;
      const checkboxItems = Array.from(component.querySelectorAll("sgds-checkbox")) as HTMLElement[];
      const firstCheckbox = checkboxItems[0] ?? null;
      const secondCheckbox = checkboxItems[1] ?? null;
      const firstFormCheck = firstCheckbox?.shadowRoot?.querySelector(".form-check") as HTMLElement | null;
      const secondFormCheck = secondCheckbox?.shadowRoot?.querySelector(".form-check") as HTMLElement | null;
      const firstInput = firstCheckbox?.shadowRoot?.querySelector(".form-check-input") as HTMLElement | null;
      const firstLabel = firstCheckbox?.shadowRoot?.querySelector(".form-check-label") as HTMLElement | null;
      if (firstCheckbox && firstFormCheck) {
        const hostRect = getRelativeRect(firstCheckbox, shell);
        const innerRect = getRelativeRect(firstFormCheck, shell);
        nextRects["form-padding-inline-sm"] = {
          ...hostRect,
          insetLeft: Math.max(0, innerRect.left - hostRect.left),
          insetTop: Math.max(0, innerRect.top - hostRect.top),
          insetWidth: innerRect.width,
          insetHeight: innerRect.height,
        };
      }
      if (firstInput) {
        const inputRect = getRelativeRect(firstInput, shell);
        nextRects["input-size"] = inputRect;
        nextRects["control-border-width"] = inputRect;
        nextRects["control-border-radius"] = inputRect;
        // Point any form-border-* hotspots at the same checkbox input rect
        // so the generic border hover bands wrap the visible border (the
        // checkbox itself), not the whole form-check-group row.
        Object.keys(nextRects).forEach((key) => {
          if (key.includes("border-radius") || key.includes("border-width") || key.includes("border-color")) {
            nextRects[key] = inputRect;
          }
        });
      }
      if (firstInput && firstLabel && firstFormCheck) {
        const inputBounds = firstInput.getBoundingClientRect();
        const labelBounds = firstLabel.getBoundingClientRect();
        const formCheckBounds = firstFormCheck.getBoundingClientRect();
        const shellBounds = shell.getBoundingClientRect();
        const computedGap = Number.parseFloat(getComputedStyle(firstFormCheck).columnGap || getComputedStyle(firstFormCheck).gap || "0");
        const measuredWidth = Math.max(0, labelBounds.left - inputBounds.right);
        const width = Math.max(measuredWidth, computedGap);
        if (width > 0) {
          nextRects["option-gap"] = {
            left: inputBounds.right - shellBounds.left,
            top: formCheckBounds.top - shellBounds.top,
            width,
            height: formCheckBounds.height,
          };
        }
      }
      if (firstFormCheck && secondFormCheck) {
        const optionGap = getGapRect(firstFormCheck, secondFormCheck, shell);
        if (optionGap && optionGap.height > 0) {
          genericGapBandsByKey.value = {
            ...genericGapBandsByKey.value,
            "form-gap-md": [optionGap],
          };
          nextRects["form-gap-md"] = optionGap;
        }
      }
      if (labelHintContainer && checkboxContainer) {
        const labelBounds = labelHintContainer.getBoundingClientRect();
        const groupBounds = checkboxContainer.getBoundingClientRect();
        const shellBounds = shell.getBoundingClientRect();
        const height = Math.max(0, groupBounds.top - labelBounds.bottom);
        if (height > 0) {
          nextRects["group-gap"] = {
            left: Math.min(labelBounds.left, groupBounds.left) - shellBounds.left,
            top: labelBounds.bottom - shellBounds.top,
            width: Math.max(labelBounds.right, groupBounds.right) - Math.min(labelBounds.left, groupBounds.left),
            height,
          };
        }
      }
    }

    if (component.tagName === "SGDS-RADIO-GROUP") {
      const groupRoot = component.shadowRoot;
      const formLabel = groupRoot?.querySelector(".label-hint-container .form-label") as HTMLElement | null;
      const hintText = groupRoot?.querySelector(".label-hint-container .form-text") as HTMLElement | null;
      const radioItems = Array.from(component.querySelectorAll("sgds-radio")) as HTMLElement[];
      const firstRadio = radioItems[0] ?? null;
      const secondRadio = radioItems[1] ?? null;
      const firstFormCheck = firstRadio?.shadowRoot?.querySelector(".form-check") as HTMLElement | null;
      const secondFormCheck = secondRadio?.shadowRoot?.querySelector(".form-check") as HTMLElement | null;

      if (formLabel && hintText) {
        const labelHintGap = getGapRect(formLabel, hintText, shell);
        if (labelHintGap && labelHintGap.height > 0) {
          genericGapBandsByKey.value = {
            ...genericGapBandsByKey.value,
            "form-gap-sm": [labelHintGap],
          };
          nextRects["form-gap-sm"] = labelHintGap;
        }
      }

      if (firstFormCheck && secondFormCheck) {
        const optionGap = getGapRect(firstFormCheck, secondFormCheck, shell);
        if (optionGap && optionGap.height > 0) {
          genericGapBandsByKey.value = {
            ...genericGapBandsByKey.value,
            "form-gap-md": [optionGap],
          };
          nextRects["form-gap-md"] = optionGap;
        }
      }
    }

    if (component.tagName === "SGDS-COMBO-BOX") {
      const comboRoot = component.shadowRoot;
      const controlGroup = comboRoot?.querySelector(".form-control-group") as HTMLElement | null;
      const inputContainer = comboRoot?.querySelector(".combobox-input-container") as HTMLElement | null;
      const input = comboRoot?.querySelector("input.form-control") as HTMLElement | null;

      nextRects["padding-y"] = null;

      if (controlGroup) {
        const controlRect = getRelativeRect(controlGroup, shell);
        nextRects["height"] = controlRect;
        nextRects["border-width"] = controlRect;
        nextRects["border-radius"] = controlRect;

        if (inputContainer) {
          const inputContainerRect = getRelativeRect(inputContainer, shell);
          const inputContainerStyles = getComputedStyle(inputContainer);
          const paddingTop = Number.parseFloat(inputContainerStyles.paddingTop || "0");
          const paddingBottom = Number.parseFloat(inputContainerStyles.paddingBottom || "0");
          nextRects["form-padding-y"] = {
            ...inputContainerRect,
            insetLeft: 0,
            insetTop: paddingTop,
            insetWidth: inputContainerRect.width,
            insetHeight: Math.max(0, inputContainerRect.height - paddingTop - paddingBottom),
          };
        }

        if (inputContainer && input) {
          const visibleItems = Array.from(inputContainer.children).filter((child): child is HTMLElement => {
            if (!(child instanceof HTMLElement)) return false;
            const rect = child.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          });
          const firstBadge = inputContainer.querySelector("sgds-badge") as HTMLElement | null;
          let gapRect = getHorizontalGapRect(firstBadge, input, shell);
          for (let i = 0; !gapRect && i < visibleItems.length - 1; i += 1) {
            gapRect = getHorizontalGapRect(visibleItems[i], visibleItems[i + 1], shell);
          }
          if (!gapRect) {
            const inputContainerRect = getRelativeRect(inputContainer, shell);
            const inputRect = getRelativeRect(input, shell);
            const inputContainerStyles = getComputedStyle(inputContainer);
            const gapWidth =
              parseCssLength(inputContainerStyles.columnGap) ||
              parseCssLength(inputContainerStyles.gap) ||
              parseCssLength(getComputedStyle(document.documentElement).getPropertyValue("--sgds-gap-xs"));
            const fallbackWidth = Math.min(gapWidth, Math.max(0, inputRect.left - inputContainerRect.left));
            if (fallbackWidth > 0) {
              gapRect = {
                left: inputRect.left - fallbackWidth,
                top: inputRect.top,
                width: fallbackWidth,
                height: inputRect.height,
              };
            }
          }
          if (!gapRect) {
            const firstVisibleItem = visibleItems[0] ?? null;
            const inputContainerStyles = getComputedStyle(inputContainer);
            const gapWidth =
              parseCssLength(inputContainerStyles.columnGap) ||
              parseCssLength(inputContainerStyles.gap) ||
              parseCssLength(getComputedStyle(document.documentElement).getPropertyValue("--sgds-gap-xs"));
            if (firstVisibleItem && gapWidth > 0) {
              const itemRect = getRelativeRect(firstVisibleItem, shell);
              gapRect = {
                left: itemRect.left + itemRect.width,
                top: itemRect.top,
                width: gapWidth,
                height: itemRect.height,
              };
            }
          }
          if (gapRect && gapRect.width > 0) {
            genericGapBandsByKey.value = {
              ...genericGapBandsByKey.value,
              "gap-xs": [gapRect],
            };
            if ("gap-xs" in nextRects) {
              nextRects["gap-xs"] = gapRect;
            }
          }
        }

        if (input) {
          const inputRect = getRelativeRect(input, shell);
          if ("padding-x" in nextRects) {
            nextRects["padding-x"] = {
              ...controlRect,
              insetLeft: Math.max(0, inputRect.left - controlRect.left),
              insetTop: 0,
              insetWidth: inputRect.width,
              insetHeight: controlRect.height,
            };
          }
        }
      }
    }

    // For SGDS form components (input, textarea, select, datepicker, etc.),
    // the form-* tokens describe the internal field's properties — the
    // bordered .form-control-group, not the host element. Resolve the field
    // and inner control rect from the shadow DOM and override hotspots:
    //   • form-padding-x → bands between control border and inner text edge
    //   • form-padding-y → bands above/below the inner text
    //   • form-border-radius / form-border-width → ring around the field
    //   • form-height-* → the field's height
    //   • form-outline-focus → ring outside the field
    // This keeps every form component using the same band/ring rendering
    // without per-component custom logic.
    const findFormField = (host: HTMLElement): { field: HTMLElement | null; control: HTMLElement | null } => {
      const root = host.shadowRoot;
      if (!root) return { field: null, control: null };
      // Datepicker projects its input through sgds-datepicker-input
      const nestedInput = root.querySelector("sgds-datepicker-input") as HTMLElement | null;
      const targetRoot = nestedInput?.shadowRoot ?? root;
      const field = targetRoot.querySelector(".form-control-group") as HTMLElement | null;
      const control =
        (targetRoot.querySelector(".form-control") as HTMLElement | null) ||
        (targetRoot.querySelector("input") as HTMLElement | null) ||
        (targetRoot.querySelector("textarea") as HTMLElement | null) ||
        (targetRoot.querySelector("select") as HTMLElement | null);
      return { field, control };
    };

    const formField = findFormField(component);
    if (formField.field) {
      const fieldRect = getRelativeRect(formField.field, shell);
      const controlRect = formField.control ? getRelativeRect(formField.control, shell) : fieldRect;

      // Compute the inner text-content rect. For inputs the control sits
      // inside the field with horizontal padding (.form-control-group
      // padding); for textareas the .form-control-group equals the textarea
      // itself, so the visible padding is the textarea's own CSS padding.
      let textRect = controlRect;
      const fieldHostsControl = formField.control && (
        controlRect.width < fieldRect.width - 1 || controlRect.height < fieldRect.height - 1
      );
      if (formField.control && !fieldHostsControl) {
        const cs = getComputedStyle(formField.control);
        const pl = Number.parseFloat(cs.paddingLeft) || 0;
        const pr = Number.parseFloat(cs.paddingRight) || 0;
        const pt = Number.parseFloat(cs.paddingTop) || 0;
        const pb = Number.parseFloat(cs.paddingBottom) || 0;
        textRect = {
          left: controlRect.left + pl,
          top: controlRect.top + pt,
          width: Math.max(0, controlRect.width - pl - pr),
          height: Math.max(0, controlRect.height - pt - pb),
        };
      }

      // Replace surface for all form-* / control-* / dimension-* tokens with
      // the actual bordered field. For form components with labels above the
      // field (textarea, datepicker, input), the host element's rect spans
      // label + field, so a raw "Minimum height of the form control group"
      // token would otherwise anchor to the whole component instead of just
      // the field. dimension-* tokens on form components always describe the
      // field, never the label.
      Object.keys(nextRects).forEach((key) => {
        // Generic padding-x / padding-y on a form component refer to the
        // field's padding (e.g. textarea uses sgds/form/padding/x), not the
        // host element. Route them to the field rect so the hover bands
        // bracket the visible left/right or top/bottom padding strips of the
        // bordered field, not the entire host (which spans the label too).
        const isFormToken =
          key.startsWith("form-") ||
          key.startsWith("control-") ||
          key.startsWith("dimension-") ||
          key === "padding-x" ||
          key === "padding-y";
        if (!isFormToken) return;
        if (component.tagName === "SGDS-COMBO-BOX" && key === "form-padding-y") return;
        if (isPaddingOverlayKey(key)) {
          nextRects[key] = {
            ...fieldRect,
            insetLeft: Math.max(0, textRect.left - fieldRect.left),
            insetTop: Math.max(0, textRect.top - fieldRect.top),
            insetWidth: textRect.width,
            insetHeight: textRect.height,
          };
        } else {
          nextRects[key] = fieldRect;
        }
      });

      if (component.tagName === "SGDS-DATEPICKER") {
        const datepickerInput = component.shadowRoot?.querySelector("sgds-datepicker-input") as HTMLElement | null;
        const calendarButton = component.shadowRoot?.querySelector("sgds-icon-button[name='calendar']") as HTMLElement | null;
        const inputLabel = datepickerInput?.shadowRoot?.querySelector(".form-label") as HTMLElement | null;
        const inputField = datepickerInput?.shadowRoot?.querySelector(".form-control-group") as HTMLElement | null;
        const inputRowRect = getUnionRect(
          [datepickerInput, calendarButton].filter(Boolean) as HTMLElement[],
          shell,
        );
        const inputControlRect = getUnionRect(
          [inputField, calendarButton].filter(Boolean) as HTMLElement[],
          shell,
        );
        if (inputRowRect && inputControlRect) {
          if ("dimension-48" in nextRects) nextRects["dimension-48"] = inputControlRect;
          if ("dimension-160" in nextRects) {
            const fieldOnlyRect = inputField ? getRelativeRect(inputField, shell) : inputControlRect;
            const labelRect = inputLabel ? getRelativeRect(inputLabel, shell) : null;
            const top = labelRect ? Math.min(labelRect.top, fieldOnlyRect.top) : fieldOnlyRect.top;
            nextRects["dimension-160"] = {
              ...fieldOnlyRect,
              top,
              height: fieldOnlyRect.top + fieldOnlyRect.height - top,
            };
          }
        }
        const dropdown = component.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement | null;
        if (dropdown) {
          const dropdownRect = getRelativeRect(dropdown, shell);
          if ("dimension-320" in nextRects) nextRects["dimension-320"] = dropdownRect;
        }
      }
    }

    // Switch's form-check-input (the toggle pill) is the visible "switch
    // surface" — its width/height come from --sgds-switch-width / --sgds-switch-height,
    // which resolve to form-width-* / form-height-* size tokens. The host
    // <sgds-switch> rect includes the label too, so without overriding the
    // hotspot rect, the dimension annotation would point at the whole row
    // (label + toggle) rather than the toggle itself.
    if (component.tagName === "SGDS-SWITCH") {
      const switchInput = component.shadowRoot?.querySelector(
        ".form-check-input",
      ) as HTMLElement | null;
      if (switchInput) {
        const switchRect = getRelativeRect(switchInput, shell);
        Object.keys(nextRects).forEach((key) => {
          if (
            key.startsWith("form-width") ||
            key.startsWith("form-height") ||
            key === "switch-width" ||
            key === "switch-height" ||
            // The visible border lives on the toggle pill, not the host row.
            // Point border-radius / border-width / border-color / outline
            // hotspots at the same .form-check-input rect so hovering any
            // border row highlights the actual border edge.
            key.includes("border-radius") ||
            key.includes("border-width") ||
            key.includes("border-color") ||
            key.startsWith("outline") ||
            key.startsWith("form-outline")
          ) {
            nextRects[key] = switchRect;
          }
        });
        // The toggle pill applies horizontal padding via
        // `padding: 0 var(--sgds-form-padding-inline-sm)`. Compute the inset
        // from the live computed style so the padding band overlay highlights
        // exactly the left/right padding strips, no top/bottom bands.
        const inputCs = getComputedStyle(switchInput);
        const padLeft = Number.parseFloat(inputCs.paddingLeft) || 0;
        const padRight = Number.parseFloat(inputCs.paddingRight) || 0;
        if ("form-padding-inline-sm" in nextRects && (padLeft > 0 || padRight > 0)) {
          nextRects["form-padding-inline-sm"] = {
            ...switchRect,
            insetLeft: padLeft,
            insetTop: 0,
            insetWidth: Math.max(0, switchRect.width - padLeft - padRight),
            insetHeight: switchRect.height,
          };
        }
      }
    }

    if (isTooltipStructure.value) {
      const tooltip = root.querySelector("sgds-tooltip") as HTMLElement | null;
      const bubble = tooltip?.shadowRoot?.querySelector(".tooltip") as HTMLElement | null;

      if (bubble) {
        const bubbleRect = getRelativeRect(bubble, shell);
        const bubbleStyles = getComputedStyle(bubble);
        const paddingLeft = Number.parseFloat(bubbleStyles.paddingLeft || "0");
        const paddingRight = Number.parseFloat(bubbleStyles.paddingRight || "0");
        const paddingTop = Number.parseFloat(bubbleStyles.paddingTop || "0");
        const paddingBottom = Number.parseFloat(bubbleStyles.paddingBottom || "0");

        nextRects["padding-x"] = {
          ...bubbleRect,
          insetLeft: paddingLeft,
          insetTop: 0,
          insetWidth: Math.max(0, bubbleRect.width - paddingLeft - paddingRight),
          insetHeight: bubbleRect.height,
        };
        nextRects["padding-y"] = {
          ...bubbleRect,
          insetLeft: 0,
          insetTop: paddingTop,
          insetWidth: bubbleRect.width,
          insetHeight: Math.max(0, bubbleRect.height - paddingTop - paddingBottom),
        };
        nextRects["border-radius"] = bubbleRect;
      }
    }

    if (component.tagName === "SGDS-ICON-BUTTON") {
      const buttonSurface = component.shadowRoot?.querySelector(".btn") as HTMLElement | null;
      const icon = component.shadowRoot?.querySelector("sgds-icon") as HTMLElement | null;

      if (buttonSurface) {
        const buttonRect = getRelativeRect(buttonSurface, shell);
        nextRects.width = buttonRect;
        nextRects.height = buttonRect;
      }

      if (icon) {
        nextRects["icon-size"] = getRelativeRect(icon, shell);
      }
    }

    if (component.tagName === "SGDS-THUMBNAIL-CARD") {
      const thumbnailSlot = component.shadowRoot?.querySelector(
        'slot[name="thumbnail"]',
      ) as HTMLSlotElement | null;
      const thumbnail = thumbnailSlot?.assignedElements?.()[0] as HTMLElement | null;
      if (thumbnail) {
        const thumbnailRect = getRelativeRect(thumbnail, shell);
        nextRects["dimension-128"] = thumbnailRect;
        nextRects["dimension-64"] = thumbnailRect;
      }
    }

    // Icon list uses the same gap-xs token in two places:
    //   • the default slot stacks each list item
    //   • each slotted list item spaces its leading icon from its content
    // A shadow <slot> has no regular children, so the generic flex detector
    // cannot see the item-to-item gap. Measure both places from the assigned
    // list items and their visible children.
    if (component.tagName === "SGDS-ICON-LIST") {
      const iconListSlot = component.shadowRoot?.querySelector("slot") as HTMLSlotElement | null;
      const itemElements = (
        iconListSlot?.assignedElements({ flatten: true }) ??
        Array.from(component.children)
      )
        .filter((el): el is HTMLElement => el instanceof HTMLElement)
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

      const bands: PaddingBand[] = [];
      for (let i = 0; i < itemElements.length - 1; i++) {
        const itemGap = getGapRect(itemElements[i], itemElements[i + 1], shell);
        if (itemGap && itemGap.height > 0) bands.push(itemGap);
      }

      itemElements.forEach((item) => {
        const contentChildren = Array.from(item.children)
          .filter((el): el is HTMLElement => el instanceof HTMLElement)
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })
          .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

        for (let i = 0; i < contentChildren.length - 1; i++) {
          const contentGap = getHorizontalGapRect(contentChildren[i], contentChildren[i + 1], shell);
          if (contentGap && contentGap.width > 0) bands.push(contentGap);
        }
      });

      if (bands.length) {
        genericGapBandsByKey.value = {
          ...genericGapBandsByKey.value,
          "gap-xs": bands,
        };
        nextRects["gap-xs"] = getUnionBandRect(bands);
      }
    }

    // Table of contents: gap-md applies between the heading and the contents
    // list, and between adjacent list items. Use the first <li> pair under
    // .contents so the gap hover lands on a visible strip between two items.
    if (component.tagName === "SGDS-TABLE-OF-CONTENTS") {
      // gap-md applies in two places:
      //   • between the heading slot and the .contents list (.container has
      //     `gap: var(--sgds-gap-md)` on the column layout)
      //   • between adjacent <li> items inside .contents (same gap rule on
      //     .contents)
      // Render every visible gap band as a separate hover proxy so the
      // highlight covers the full set of strips, not just one of them.
      const contents = component.shadowRoot?.querySelector(".contents") as HTMLElement | null;
      const heading = component.querySelector(":scope > :not([slot])") as HTMLElement | null;
      const items = contents
        ? Array.from(contents.querySelectorAll("slot[name='contents']"))
            .flatMap((s) => (s as HTMLSlotElement).assignedElements?.() ?? [])
        : [];
      const visibleItems = items.filter((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      }) as HTMLElement[];
      const bands: PaddingBand[] = [];
      const headingGap = heading && contents ? getGapRect(heading, contents, shell) : null;
      if (headingGap && headingGap.height > 0) bands.push(headingGap);
      for (let i = 0; i < visibleItems.length - 1; i++) {
        const itemGap = getGapRect(visibleItems[i], visibleItems[i + 1], shell);
        if (itemGap && itemGap.height > 0) bands.push(itemGap);
      }
      if (bands.length) {
        genericGapBandsByKey.value = {
          ...genericGapBandsByKey.value,
          "gap-md": bands,
        };
        nextRects["gap-md"] = getUnionBandRect(bands);
      }
    }

    // Table: padding-x and padding-y are applied to the inner <div> of each
    // <th>/<td> cell (`padding: <padding-y> <padding-x>` per the SGDS source).
    // Replicate the padding bands across every cell so the highlight covers
    // the whole table instead of just the first column. The same token value
    // applies to every cell, so we just collect bands from each one.
    if (component.tagName === "SGDS-TABLE") {
      const cells = Array.from(component.shadowRoot?.querySelectorAll("th, td") ?? []) as HTMLElement[];
      const xBands: PaddingBand[] = [];
      const yBands: PaddingBand[] = [];
      cells.forEach((cell) => {
        const innerDiv = cell.querySelector("div") as HTMLElement | null;
        if (!innerDiv) return;
        const innerRect = getRelativeRect(innerDiv, shell);
        const cs = getComputedStyle(innerDiv);
        const padLeft = Number.parseFloat(cs.paddingLeft) || 0;
        const padRight = Number.parseFloat(cs.paddingRight) || 0;
        const padTop = Number.parseFloat(cs.paddingTop) || 0;
        const padBottom = Number.parseFloat(cs.paddingBottom) || 0;
        if (padLeft > 0) xBands.push({ left: innerRect.left, top: innerRect.top, width: padLeft, height: innerRect.height });
        if (padRight > 0) xBands.push({ left: innerRect.left + innerRect.width - padRight, top: innerRect.top, width: padRight, height: innerRect.height });
        if (padTop > 0) yBands.push({ left: innerRect.left, top: innerRect.top, width: innerRect.width, height: padTop });
        if (padBottom > 0) yBands.push({ left: innerRect.left, top: innerRect.top + innerRect.height - padBottom, width: innerRect.width, height: padBottom });
      });
      if (xBands.length || yBands.length) {
        extraPaddingBandsByKey.value = {
          ...extraPaddingBandsByKey.value,
          ...(xBands.length ? { "padding-x": xBands } : {}),
          ...(yBands.length ? { "padding-y": yBands } : {}),
        };
        if (xBands.length) nextRects["padding-x"] = getUnionBandRect(xBands);
        if (yBands.length) nextRects["padding-y"] = getUnionBandRect(yBands);
      }
    }

    // Tab-group structure: locate the sgds-tab-group anywhere under the
    // structure-preview-markup root (not just as the first child) so an
    // optional layout wrapper around the tab-group doesn't break detection.
    const tabGroup = (component.tagName === "SGDS-TAB-GROUP" ? component : root.querySelector("sgds-tab-group")) as HTMLElement | null;
    if (tabGroup) {
      const tabGroupRoot = tabGroup.shadowRoot;
      const tabGroupBox = tabGroupRoot?.querySelector(".tab-group") as HTMLElement | null;
      const navStrip = tabGroupRoot?.querySelector(".tab-group__nav") as HTMLElement | null;
      const contentBox = tabGroupRoot?.querySelector(".tab-group__content") as HTMLElement | null;
      const tabs = Array.from(tabGroup.querySelectorAll("sgds-tab")) as HTMLElement[];
      const activeTab = tabs.find((tab) => tab.hasAttribute("active")) ?? tabs[0];
      const activeTabSurface = activeTab?.shadowRoot?.querySelector(".tab") as HTMLElement | null;
      const variantAttr = tabGroup.getAttribute("variant") || "underlined";

      // 1. nav-content-gap: vertical strip between the nav strip's bottom and the panel content's top.
      if (navStrip && contentBox) {
        const navBounds = navStrip.getBoundingClientRect();
        const contentBounds = contentBox.getBoundingClientRect();
        const shellBounds = shell.getBoundingClientRect();
        const gapHeight = Math.max(0, contentBounds.top - navBounds.bottom);
        if (gapHeight > 0) {
          nextRects["nav-content-gap"] = {
            left: navBounds.left - shellBounds.left,
            top: navBounds.bottom - shellBounds.top,
            width: navBounds.width,
            height: gapHeight,
          };
        }
      }

      // 2. nav-tab-gap: horizontal strips between EVERY pair of adjacent tabs
      // (solid variant only; underlined tabs sit flush). Render one band per
      // gap so the highlight covers the whole nav strip, not just the first
      // gap. Clear the rect when no gap is present so the proxy doesn't fall
      // back to the host's surface rect.
      nextRects["nav-tab-gap"] = null;
      const tabRects = tabs
        .map((tab) => tab.shadowRoot?.querySelector(".tab") as HTMLElement | null)
        .filter((el): el is HTMLElement => Boolean(el))
        .map((el) => el.getBoundingClientRect())
        .sort((a, b) => a.left - b.left);
      const tabGapBands: PaddingBand[] = [];
      const tabShellBounds = shell.getBoundingClientRect();
      for (let i = 0; i < tabRects.length - 1; i++) {
        const a = tabRects[i];
        const b = tabRects[i + 1];
        const gapWidth = Math.max(0, b.left - a.right);
        if (gapWidth > 0) {
          tabGapBands.push({
            left: a.right - tabShellBounds.left,
            top: a.top - tabShellBounds.top,
            width: gapWidth,
            height: a.height,
          });
        }
      }
      if (tabGapBands.length) {
        genericGapBandsByKey.value = {
          ...genericGapBandsByKey.value,
          "nav-tab-gap": tabGapBands,
        };
        nextRects["nav-tab-gap"] = getUnionBandRect(tabGapBands);
      }

      const orientation = tabGroup.getAttribute("orientation") || "horizontal";

      // 3. nav-divider-width: the rule under (or right of) the nav strip. Only
      // present when the underlined variant actually paints a border on
      // .tab-group__nav. If border-width is 0 the token doesn't apply — clear
      // the rect so its inspect proxy + token row stay hidden.
      nextRects["nav-divider-width"] = null;
      if (navStrip) {
        const navStripStyles = getComputedStyle(navStrip);
        const dividerThickness =
          Number.parseFloat(orientation === "vertical" ? navStripStyles.borderRightWidth : navStripStyles.borderBottomWidth) || 0;
        if (dividerThickness > 0) {
          const navRect = getRelativeRect(navStrip, shell);
          nextRects["nav-divider-width"] = orientation === "vertical"
            ? {
                left: navRect.left + navRect.width - dividerThickness,
                top: navRect.top,
                width: dividerThickness,
                height: navRect.height,
              }
            : {
                left: navRect.left,
                top: navRect.top + navRect.height - dividerThickness,
                width: navRect.width,
                height: dividerThickness,
              };
        }
      }

      // 4. active-indicator-width: the ::after strip under the active tab.
      // Only the underlined variant renders this pseudo-element. Reading
      // `content` from the computed style tells us whether it exists; if the
      // computed value is "none" the indicator isn't drawn.
      nextRects["active-indicator-width"] = null;
      if (activeTabSurface) {
        const after = getComputedStyle(activeTabSurface, "::after");
        const hasIndicator = after.content && after.content !== "none";
        if (hasIndicator) {
          const indicatorThickness = Number.parseFloat(orientation === "vertical" ? after.width : after.height) || 0;
          if (indicatorThickness > 0) {
            const tabBounds = activeTabSurface.getBoundingClientRect();
            const shellBounds = shell.getBoundingClientRect();
            nextRects["active-indicator-width"] = orientation === "vertical"
              ? {
                  left: tabBounds.right - shellBounds.left - indicatorThickness,
                  top: tabBounds.top - shellBounds.top,
                  width: indicatorThickness,
                  height: tabBounds.height,
                }
              : {
                  left: tabBounds.left - shellBounds.left,
                  top: tabBounds.bottom - shellBounds.top - indicatorThickness,
                  width: tabBounds.width,
                  height: indicatorThickness,
                };
          }
        }
      }

      // 5. tab-border-radius: only solid-variant tabs have a non-zero radius.
      // Read the computed border-radius on the active tab's .tab element; if
      // it's 0 (underlined variant) clear the rect so the token row + ring
      // proxy don't surface.
      nextRects["tab-border-radius"] = null;
      if (activeTabSurface) {
        const activeRadius = Number.parseFloat(getComputedStyle(activeTabSurface).borderTopLeftRadius || "0") || 0;
        if (activeRadius > 0) {
          nextRects["tab-border-radius"] = getRelativeRect(activeTabSurface, shell);
        }
      }

      // Non-border tokens that always reference the active-tab surface.
      if (activeTabSurface) {
        const surfaceRect = getRelativeRect(activeTabSurface, shell);
        nextRects["tab-bg"] = surfaceRect;
        nextRects["tab-bg-hover"] = surfaceRect;
        nextRects["active-bg"] = surfaceRect;
        nextRects["color-default"] = surfaceRect;
        nextRects["color-active"] = surfaceRect;
        nextRects["color-active-solid"] = surfaceRect;
        nextRects["font-size"] = surfaceRect;
        nextRects["disabled-opacity"] = surfaceRect;
      }
    }

    // Auto-detect gap bands for any gap-* token row that wasn't already
    // populated above. Walks the component's flex/grid descendants (incl.
    // shadow DOM) and matches each container's computed gap to the gap
    // tokens declared in this component's table — so new components inherit
    // gap highlighting just by listing the token, no per-component branch.
    autoDetectGenericGapBands(component, shell, nextRects);

    // Same idea for padding: walk every descendant and match its computed
    // padding-top/right/bottom/left against each padding-* token's pixel
    // value, so each token only highlights the actual element it applies
    // to (subnav-actions's 12px padding-y, header's 32px padding, etc.) —
    // not the whole-component surface rect.
    autoDetectGenericPaddingBands(component, shell, nextRects);

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "button") {
    const button = root.querySelector("sgds-button") as HTMLElement | null;
    const buttonRoot = button?.shadowRoot;
    const buttonSurface = buttonRoot?.querySelector(".btn") as HTMLElement | null;
    // The button's shadow DOM wraps the default slot (label text) in a single
    // <span>, so we can target it directly. Typography tokens (font-size,
    // line-height) should highlight this label, not the full surface.
    const buttonLabel = buttonRoot?.querySelector(".btn > span") as HTMLElement | null;
    const leftIconSlot = buttonRoot?.querySelector('slot[name="leftIcon"]') as HTMLSlotElement | null;
    const rightIconSlot = buttonRoot?.querySelector('slot[name="rightIcon"]') as HTMLSlotElement | null;
    const leftIcon = (leftIconSlot?.assignedElements?.()[0] ?? root.querySelector('[slot="leftIcon"]')) as HTMLElement | null;
    const rightIcon = (rightIconSlot?.assignedElements?.()[0] ?? root.querySelector('[slot="rightIcon"]')) as HTMLElement | null;

    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => [key, null]),
    ) as Record<string, HotspotRect | null>;

    if (buttonSurface) {
      const surfaceRect = getRelativeRect(buttonSurface, shell);
      nextRects["background"] = surfaceRect;
      nextRects["hover-bg"] = surfaceRect;
      nextRects["text-color"] = surfaceRect;
      nextRects["border-width"] = surfaceRect;
      nextRects["border-radius"] = surfaceRect;
      // height and min-width are rendered as static dimension annotations
      // outside the button surface (see buttonHeightAnnotation /
      // buttonMinWidthAnnotation below); they intentionally do not claim the
      // full surfaceRect so they don't block padding-x/typography hotspots.
      nextRects["height"] = surfaceRect;
      nextRects["min-width"] = surfaceRect;

      // font-size and line-height highlight the label span only, falling back
      // to the surface rect if the span can't be located.
      const labelRect = buttonLabel ? getRelativeRect(buttonLabel, shell) : surfaceRect;
      nextRects["font-size"] = labelRect;
      nextRects["line-height"] = labelRect;

      // Compute inner content rect for padding-x. Include the label span so the
      // padding bands also render when the button has no icons — padding-x is
      // the strip between the surface edge and the leftmost/rightmost content.
      const innerElements = [leftIcon, buttonLabel, rightIcon].filter(Boolean) as HTMLElement[];
      if (innerElements.length) {
        const innerRect = getUnionRect(innerElements, shell);
        if (innerRect) {
          nextRects["padding-x"] = {
            ...surfaceRect,
            insetLeft: Math.max(0, innerRect.left - surfaceRect.left),
            insetTop: 0,
            insetWidth: innerRect.width,
            insetHeight: surfaceRect.height,
          };
        }
      }
    }

    // `gap` is the spacing between icons and the label — compute one band per
    // void: leftIcon↔label, label↔rightIcon. Storing bands separately (rather
    // than one union rect spanning the label) is what lets the overlay paint
    // only the true gap regions and not tint the label text too.
    if (buttonSurface && buttonLabel) {
      const shellBounds = shell.getBoundingClientRect();
      const surfaceBounds = buttonSurface.getBoundingClientRect();
      const labelBounds = buttonLabel.getBoundingClientRect();
      const bands: Array<{ left: number; top: number; width: number; height: number }> = [];

      if (leftIcon) {
        const leftBounds = leftIcon.getBoundingClientRect();
        const width = Math.max(0, labelBounds.left - leftBounds.right);
        if (width > 0) {
          bands.push({
            left: leftBounds.right - shellBounds.left,
            top: surfaceBounds.top - shellBounds.top,
            width,
            height: surfaceBounds.height,
          });
        }
      }

      if (rightIcon) {
        const rightBounds = rightIcon.getBoundingClientRect();
        const width = Math.max(0, rightBounds.left - labelBounds.right);
        if (width > 0) {
          bands.push({
            left: labelBounds.right - shellBounds.left,
            top: surfaceBounds.top - shellBounds.top,
            width,
            height: surfaceBounds.height,
          });
        }
      }

      buttonGapBands.value = bands;

      // Union rect still required for tooltip positioning — tooltipStyle reads
      // hotspotRects[hoverKey] to place itself. The standard hotspot button
      // for this key is hidden in the template (see v-show skip list below).
      if (bands.length) {
        const left = Math.min(...bands.map((band) => band.left));
        const right = Math.max(...bands.map((band) => band.left + band.width));
        nextRects.gap = {
          left,
          top: surfaceBounds.top - shellBounds.top,
          width: right - left,
          height: surfaceBounds.height,
        };
      }
    } else {
      buttonGapBands.value = [];
    }

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "alert") {
    const alert = root.querySelector("sgds-alert") as HTMLElement | null;
    const alertRoot = alert?.shadowRoot;
    const alertSurface = alertRoot?.querySelector(".alert") as HTMLElement | null;
    const alertContent = alertRoot?.querySelector(".alert-content") as HTMLElement | null;
    const alertTitle = alertRoot?.querySelector(".alert-title") as HTMLElement | null;
    const iconSlot = alertRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement | null;
    const descriptionSlot = alertRoot?.querySelector(".alert-content__description") as HTMLSlotElement | null;
    const closeButton = alertRoot?.querySelector("sgds-close-button") as HTMLElement | null;
    const icon = (iconSlot?.assignedElements?.()[0] ?? root.querySelector('[slot="icon"]')) as HTMLElement | null;
    const description = (
      descriptionSlot?.assignedElements?.()[0] ??
      alert?.querySelector(':scope > div:not([slot])')
    ) as HTMLElement | null;

    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => [key, null]),
    ) as Record<string, HotspotRect | null>;

    if (alertSurface) {
      const surfaceRect = getRelativeRect(alertSurface, shell);
      nextRects["border-color"] = surfaceRect;
      nextRects["border-width"] = surfaceRect;
      nextRects["border-radius"] = surfaceRect;

      const innerElements = [icon, alertContent, closeButton].filter(Boolean) as HTMLElement[];
      const innerRect = getUnionRect(innerElements, shell);

      if (innerRect) {
        nextRects["padding-x"] = {
          ...surfaceRect,
          insetLeft: Math.max(0, innerRect.left - surfaceRect.left),
          insetTop: Math.max(0, innerRect.top - surfaceRect.top),
          insetWidth: innerRect.width,
          insetHeight: innerRect.height,
        };
        nextRects["padding-y"] = {
          ...surfaceRect,
          insetLeft: Math.max(0, innerRect.left - surfaceRect.left),
          insetTop: Math.max(0, innerRect.top - surfaceRect.top),
          insetWidth: innerRect.width,
          insetHeight: innerRect.height,
        };
      }
    }

    if (alertContent) {
      const contentRect = getRelativeRect(alertContent, shell);
      const contentInnerRect = getUnionRect([alertTitle, description].filter(Boolean) as HTMLElement[], shell);

      if (contentInnerRect) {
        const paddingRightLeft = contentInnerRect.left + contentInnerRect.width;
        nextRects["content-padding-right"] = {
          left: paddingRightLeft,
          top: contentRect.top,
          width: Math.max(0, contentRect.left + contentRect.width - paddingRightLeft),
          height: contentRect.height,
        };
      }
    }

    if (icon && alertContent) {
      const shellBounds = shell.getBoundingClientRect();
      const iconBounds = icon.getBoundingClientRect();
      const contentBounds = alertContent.getBoundingClientRect();
      nextRects.gap = {
        left: iconBounds.right - shellBounds.left,
        top: contentBounds.top - shellBounds.top,
        width: Math.max(0, contentBounds.left - iconBounds.right),
        height: contentBounds.height,
      };
    }

    nextRects["content-gap"] = getGapRect(alertContent, closeButton, shell);
    nextRects["title-gap"] = getGapRect(alertTitle, description, shell);

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "generic") {
    const component = root.firstElementChild as HTMLElement | null;
    if (!component) return;

    const surfaceRect = getRelativeRect(component, shell);
    const childElements = Array.from(component.children).filter((child) => {
      const rect = child.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }) as HTMLElement[];
    const contentRect = getUnionRect(childElements, shell);
    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => {
        const nextRect = isPaddingOverlayKey(key) && contentRect
          ? {
              ...surfaceRect,
              insetLeft: Math.max(0, contentRect.left - surfaceRect.left),
              insetTop: Math.max(0, contentRect.top - surfaceRect.top),
              insetWidth: contentRect.width,
              insetHeight: contentRect.height,
            }
          : surfaceRect;
        return [key, nextRect];
      }),
    ) as Record<string, HotspotRect | null>;

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "button") {
    const button = root.querySelector("sgds-button") as HTMLElement | null;
    const buttonRoot = button?.shadowRoot;
    const buttonSurface = buttonRoot?.querySelector(".btn") as HTMLElement | null;
    const leftIconSlot = buttonRoot?.querySelector('slot[name="leftIcon"]') as HTMLSlotElement | null;
    const rightIconSlot = buttonRoot?.querySelector('slot[name="rightIcon"]') as HTMLSlotElement | null;
    const leftIcon = (leftIconSlot?.assignedElements?.()[0] ?? root.querySelector('[slot="leftIcon"]')) as HTMLElement | null;
    const rightIcon = (rightIconSlot?.assignedElements?.()[0] ?? root.querySelector('[slot="rightIcon"]')) as HTMLElement | null;

    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => [key, null]),
    ) as Record<string, HotspotRect | null>;

    if (buttonSurface) {
      const surfaceRect = getRelativeRect(buttonSurface, shell);
      nextRects["background"] = surfaceRect;
      nextRects["hover-bg"] = surfaceRect;
      nextRects["text-color"] = surfaceRect;
      nextRects["border-width"] = surfaceRect;
      nextRects["border-radius"] = surfaceRect;
      nextRects["height"] = surfaceRect;
      nextRects["min-width"] = surfaceRect;
      nextRects["font-size"] = surfaceRect;
      nextRects["line-height"] = surfaceRect;

      // Compute inner content rect for padding-x and gap overlays
      const innerElements = [leftIcon, rightIcon].filter(Boolean) as HTMLElement[];
      if (innerElements.length) {
        const innerRect = getUnionRect(innerElements, shell);
        if (innerRect) {
          nextRects["padding-x"] = {
            ...surfaceRect,
            insetLeft: Math.max(0, innerRect.left - surfaceRect.left),
            insetTop: 0,
            insetWidth: innerRect.width,
            insetHeight: surfaceRect.height,
          };
        }
      }
    }

    if (leftIcon && rightIcon && buttonSurface) {
      const shellBounds = shell.getBoundingClientRect();
      const leftBounds = leftIcon.getBoundingClientRect();
      const rightBounds = rightIcon.getBoundingClientRect();
      const surfaceBounds = buttonSurface.getBoundingClientRect();
      nextRects.gap = {
        left: leftBounds.right - shellBounds.left,
        top: surfaceBounds.top - shellBounds.top,
        width: Math.max(0, rightBounds.left - leftBounds.right),
        height: surfaceBounds.height,
      };
    }

    if (leftIcon) {
      nextRects["leading-icon-color"] = getRelativeRect(leftIcon, shell);
    }

    if (rightIcon) {
      nextRects["trailing-icon-color"] = getRelativeRect(rightIcon, shell);
    }

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "alert") {
    const alert = root.querySelector("sgds-alert") as HTMLElement | null;
    const alertRoot = alert?.shadowRoot;
    const alertSurface = alertRoot?.querySelector(".alert") as HTMLElement | null;
    const alertContent = alertRoot?.querySelector(".alert-content") as HTMLElement | null;
    const alertTitle = alertRoot?.querySelector(".alert-title") as HTMLElement | null;
    const iconSlot = alertRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement | null;
    const descriptionSlot = alertRoot?.querySelector(".alert-content__description") as HTMLSlotElement | null;
    const closeButton = alertRoot?.querySelector("sgds-close-button") as HTMLElement | null;
    const icon = (iconSlot?.assignedElements?.()[0] ?? root.querySelector('[slot="icon"]')) as HTMLElement | null;
    const description = (
      descriptionSlot?.assignedElements?.()[0] ??
      alert?.querySelector(':scope > div:not([slot])')
    ) as HTMLElement | null;

    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => [key, null]),
    ) as Record<string, HotspotRect | null>;

    if (alertSurface) {
      const surfaceRect = getRelativeRect(alertSurface, shell);
      nextRects["border-color"] = surfaceRect;
      nextRects["border-width"] = surfaceRect;
      nextRects["border-radius"] = surfaceRect;

      const innerElements = [icon, alertContent, closeButton].filter(Boolean) as HTMLElement[];
      const innerRect = getUnionRect(innerElements, shell);

      if (innerRect) {
        nextRects["padding-x"] = {
          ...surfaceRect,
          insetLeft: Math.max(0, innerRect.left - surfaceRect.left),
          insetTop: Math.max(0, innerRect.top - surfaceRect.top),
          insetWidth: innerRect.width,
          insetHeight: innerRect.height,
        };
        nextRects["padding-y"] = {
          ...surfaceRect,
          insetLeft: Math.max(0, innerRect.left - surfaceRect.left),
          insetTop: Math.max(0, innerRect.top - surfaceRect.top),
          insetWidth: innerRect.width,
          insetHeight: innerRect.height,
        };
      }
    }

    if (alertContent) {
      const contentRect = getRelativeRect(alertContent, shell);
      const contentInnerRect = getUnionRect([alertTitle, description].filter(Boolean) as HTMLElement[], shell);

      if (contentInnerRect) {
        const paddingRightLeft = contentInnerRect.left + contentInnerRect.width;
        nextRects["content-padding-right"] = {
          left: paddingRightLeft,
          top: contentRect.top,
          width: Math.max(0, contentRect.left + contentRect.width - paddingRightLeft),
          height: contentRect.height,
        };
      }
    }

    if (icon && alertContent) {
      const shellBounds = shell.getBoundingClientRect();
      const iconBounds = icon.getBoundingClientRect();
      const contentBounds = alertContent.getBoundingClientRect();
      nextRects.gap = {
        left: iconBounds.right - shellBounds.left,
        top: contentBounds.top - shellBounds.top,
        width: Math.max(0, contentBounds.left - iconBounds.right),
        height: contentBounds.height,
      };
    }

    nextRects["content-gap"] = getGapRect(alertContent, closeButton, shell);
    nextRects["title-gap"] = getGapRect(alertTitle, description, shell);

    hotspotRects.value = nextRects;
    return;
  }

  if (structureKind.value === "card") {
    const card = root.querySelector("sgds-card") as HTMLElement | null;
    const cardRoot = card?.shadowRoot;
    const cardSurface = cardRoot?.querySelector(".card") as HTMLElement | null;
    const cardBody = cardRoot?.querySelector(".card-body") as HTMLElement | null;
    const headerContainer = cardRoot?.querySelector(".card-header-container") as HTMLElement | null;
    const subtitle = root.querySelector('[slot="subtitle"]') as HTMLElement | null;
    const title = root.querySelector('[slot="title"]') as HTMLElement | null;
    const defaultSlot = root.querySelector(".portal-structure-card-default-slot") as HTMLElement | null;
    const description = root.querySelector('[slot="description"]') as HTMLElement | null;
    const lower = root.querySelector('[slot="lower"]') as HTMLElement | null;
    const footer = root.querySelector('[slot="footer"]') as HTMLElement | null;

    const nextRects = Object.fromEntries(
      Object.keys(inspectMeta.value).map((key) => [key, null]),
    ) as Record<string, HotspotRect | null>;

    if (cardSurface) {
      const borderRect = getRelativeRect(cardSurface, shell);
      nextRects["background"] = borderRect;
      nextRects["tinted-bg"] = borderRect;
      nextRects["border-color"] = borderRect;
      nextRects["border-width"] = borderRect;
      nextRects["border-radius"] = borderRect;
    }

    if (title) {
      nextRects["title-color"] = getRelativeRect(title, shell);
    }

    if (subtitle) {
      nextRects["subtitle-color"] = getRelativeRect(subtitle, shell);
    }

    if (description) {
      nextRects["description-color"] = getRelativeRect(description, shell);
    }

    if (lower) {
      nextRects["secondary-text-color"] = getRelativeRect(lower, shell);
    }

    if (footer) {
      const footerAnchor = footer.querySelector("a") as HTMLElement | null;
      nextRects["link-color"] = getRelativeRect(footerAnchor ?? footer, shell);
    }

    if (cardBody) {
      const bodyRect = getRelativeRect(cardBody, shell);
      const contentStackRect = getUnionRect(
        [headerContainer, description, lower, footer].filter(Boolean) as HTMLElement[],
        shell,
      );

      if (contentStackRect) {
        nextRects["padding-x"] = {
          left: bodyRect.left,
          top: bodyRect.top,
          width: bodyRect.width,
          height: bodyRect.height,
          insetLeft: Math.max(0, contentStackRect.left - bodyRect.left),
          insetTop: 0,
          insetWidth: contentStackRect.width,
          insetHeight: bodyRect.height,
        };

        nextRects["padding-y"] = {
          left: bodyRect.left,
          top: bodyRect.top,
          width: bodyRect.width,
          height: bodyRect.height,
          insetLeft: 0,
          insetTop: Math.max(0, contentStackRect.top - bodyRect.top),
          insetWidth: bodyRect.width,
          insetHeight: contentStackRect.height,
        };
      }
    }

    nextRects.gap = getGapRect(description, lower, shell);
    nextRects["subtitle-gap"] = getGapRect(subtitle, title, shell);
    nextRects["title-gap"] = getGapRect(title, defaultSlot, shell);
    nextRects["slot-gap"] = getGapRect(defaultSlot, description, shell);

    hotspotRects.value = nextRects;
    return;
  }

  const icon = root.querySelector('[slot="icon"]') as HTMLElement | null;
  const title = root.querySelector('[slot="header"]') as HTMLElement | null;
  const accordion = root.querySelector("sgds-accordion") as HTMLElement | null;
  const item = root.querySelector("sgds-accordion-item") as HTMLElement | null;
  const button = item?.shadowRoot?.querySelector(".accordion-btn") as HTMLElement | null;
  const contentSlot = item?.shadowRoot?.querySelector('slot[name="content"]') as HTMLElement | null;
  const caretSlot = item?.shadowRoot?.querySelector('slot[name="caret"]') as HTMLSlotElement | null;
  const caretIcon = (caretSlot?.assignedElements?.()[0] ?? caretSlot?.querySelector("sgds-icon")) as HTMLElement | null;

  const nextRects = Object.fromEntries(
    Object.keys(inspectMeta.value).map((key) => [key, null]),
  ) as Record<string, HotspotRect | null>;

  if (button) {
    const buttonRect = getRelativeRect(button, shell);
    nextRects["hover-bg"] = buttonRect;
    nextRects["border-width"] = {
      left: buttonRect.left,
      top: buttonRect.top,
      width: buttonRect.width,
      height: 2,
    };

    const trailing = item?.shadowRoot?.querySelector(".accordion-header__trailing") as HTMLElement | null;
    const innerElements = [icon, title, trailing].filter(Boolean) as HTMLElement[];

    if (innerElements.length) {
      const bounds = innerElements.map((element) => element.getBoundingClientRect());
      const minLeft = Math.min(...bounds.map((rect) => rect.left));
      const minTop = Math.min(...bounds.map((rect) => rect.top));
      const maxRight = Math.max(...bounds.map((rect) => rect.right));
      const maxBottom = Math.max(...bounds.map((rect) => rect.bottom));
      const innerRect: HotspotRect = {
        left: minLeft - shell.getBoundingClientRect().left,
        top: minTop - shell.getBoundingClientRect().top,
        width: maxRight - minLeft,
        height: maxBottom - minTop,
      };

      nextRects["padding-x-default"] = {
        ...buttonRect,
        insetLeft: Math.max(0, innerRect.left - buttonRect.left),
        insetTop: Math.max(0, innerRect.top - buttonRect.top),
        insetWidth: innerRect.width,
        insetHeight: innerRect.height,
      };

      nextRects["padding-y-default"] = {
        ...buttonRect,
        insetLeft: Math.max(0, innerRect.left - buttonRect.left),
        insetTop: Math.max(0, innerRect.top - buttonRect.top),
        insetWidth: innerRect.width,
        insetHeight: innerRect.height,
      };
    } else {
      nextRects["padding-x-default"] = buttonRect;
      nextRects["padding-y-default"] = buttonRect;
    }
  }

  if (caretIcon) {
    nextRects["icon-color"] = getRelativeRect(caretIcon, shell);
  }

  if (icon) {
    nextRects["leading-icon-color"] = getRelativeRect(icon, shell);
  }

  if (title) {
    nextRects["title-color"] = getRelativeRect(title, shell);
  }

  if (icon && title) {
    const shellBounds = shell.getBoundingClientRect();
    const iconBounds = icon.getBoundingClientRect();
    const titleBounds = title.getBoundingClientRect();
    nextRects.gap = {
      left: iconBounds.right - shellBounds.left,
      top: Math.min(iconBounds.top, titleBounds.top) - shellBounds.top,
      width: Math.max(0, titleBounds.left - iconBounds.right),
      height: Math.max(iconBounds.height, titleBounds.height),
    };
  }

  if (accordion) {
    nextRects["border-color"] = getRelativeRect(accordion, shell);
    nextRects["border-radius"] = getRelativeRect(accordion, shell);
  }

  const assignedContent = contentSlot?.assignedElements?.()[0] as HTMLElement | null;

  if (contentSlot && assignedContent) {
    const slotRect = getRelativeRect(contentSlot, shell);
    const contentPaddingX = 16;
    const contentPaddingTop = 4;
    const contentPaddingBottom = 16;

    nextRects["content-padding"] = {
      ...slotRect,
      insetLeft: contentPaddingX,
      insetTop: contentPaddingTop,
      insetWidth: Math.max(0, slotRect.width - contentPaddingX * 2),
      insetHeight: Math.max(0, slotRect.height - contentPaddingTop - contentPaddingBottom),
    };
  }

  hotspotRects.value = nextRects;
  syncAccordionForegroundLayers();
};

onMounted(async () => {
  await measureHotspots();
  if (previewMarkupRef.value) {
    resizeObserver = new ResizeObserver(() => {
      void measureHotspots();
    });
    resizeObserver.observe(previewMarkupRef.value);
  }
  window.addEventListener("resize", measureHotspots);
});

watch(resolvedPreviewMarkup, () => {
  void measureHotspots();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", measureHotspots);
});

const getRowMapKey = (row: MeasurementTokenRow, groupTitle?: string) => {
  if (groupTitle?.startsWith("sgds/card") && row.property.startsWith("padding") && !["padding-x", "padding-y"].includes(row.property)) return null;
  if (row.mapKey) return row.mapKey;
  if (groupTitle?.startsWith("sgds/card")) return row.property;
  if (structureKind.value !== "accordion") return null;
  if (row.property === "padding-x") return "padding-x-default";
  if (row.property === "padding-y") return "padding-y-default";
  if (row.property === "padding-top" || row.property === "padding-bottom") return "content-padding";
  return null;
};

const getRowCategory = (row: MeasurementTokenRow) =>
  (row.category || row.element || "").trim();

// Show the category label only on the first row of each consecutive run, so
// the table reads like a grouped list ("Padding" once, then padding-x /
// padding-y blank in the category column).
const getCollapsedCategory = (
  rows: { category?: string; element?: string }[],
  row: { category?: string; element?: string },
  index: number,
) => {
  const current = (row.category || row.element || "").trim();
  if (!current || index === 0) return current;
  const previous = (rows[index - 1]?.category || rows[index - 1]?.element || "").trim();
  return current === previous ? "" : current;
};
</script>

<template>
  <div ref="rootRef" class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <div
      class="structure-demo-box sgds:flex sgds:flex-col sgds:gap-component-sm sgds:border sgds:border-muted sgds:rounded-xl sgds:overflow-visible sgds:min-h-[var(--sgds-dimension-288)] sgds:px-component-xs sgds:py-component-sm"
      :data-hover-key="hoverKey || null"
      @mouseleave="clearPreviewHover"
    >
      <SegmentedControl
        v-if="variantSegmentOptions.length >= 2 && activeVariant"
        :model-value="activeVariant"
        :options="variantSegmentOptions"
        :aria-label="variantAttributeName ? `${variantAttributeName} variant` : 'Design token variant'"
        @update:model-value="(value: string) => activeVariant = value"
      />

      <div
        ref="previewShellRef"
        :class="[
          'sgds:bg-transparent sgds:mx-auto sgds:w-full sgds:relative sgds:flex sgds:flex-1 sgds:items-center sgds:justify-center sgds:min-h-[var(--sgds-dimension-224)]',
          isFooterStructure
            ? 'sgds:max-w-full sgds:min-h-[var(--sgds-dimension-512)]'
            : isSidebarStructure
              ? 'sgds:max-w-full sgds:min-h-[var(--sgds-dimension-512)]'
              : isModalFullscreenStructure
                ? 'sgds:max-w-full sgds:min-h-[var(--sgds-dimension-400)]'
                : isModalStructure
                ? 'sgds:max-w-full sgds:min-h-[var(--sgds-dimension-512)]'
                : 'sgds:max-w-[var(--sgds-dimension-560)]',
          structureKind === 'alert' ? 'sgds:min-h-[var(--sgds-dimension-288)] sgds:flex sgds:items-center' : '',
          isDatepickerStructure ? 'sgds:min-h-[var(--sgds-dimension-512)] sgds:items-start sgds:pt-component-sm' : '',
          isDropdownStructure ? 'sgds:min-h-[var(--sgds-dimension-360)]' : '',
          isDrawerStructure ? 'sgds:min-h-[var(--sgds-dimension-360)]' : '',
        ]"
      >
        <div
          ref="previewMarkupRef"
          :class="[
            'structure-preview-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:max-w-full',
            isFooterStructure ? footerPreviewWidthClass : 'sgds:w-full',
            structureKind === 'alert' ? 'sgds:items-center' : '',
            isDatepickerStructure ? 'sgds:items-start' : '',
            isDrawerStructure ? 'sgds:min-h-[var(--sgds-dimension-360)]' : '',
            isModalFullscreenStructure
              ? 'sgds:min-h-[var(--sgds-dimension-320)]'
              : isModalStructure
                ? 'sgds:min-h-[var(--sgds-dimension-480)]'
                : '',
          ]"
          @pointerdown.capture="preventPreviewInteraction"
          @click.capture="preventPreviewInteraction"
          @keydown.capture="preventPreviewInteractionKeyboard"
          v-html="resolvedPreviewMarkup"
        ></div>

        <button
          v-for="(meta, key) in inspectMeta"
          :key="key"
          v-show="
            hotspotRects[key] &&
            isHoverableStructureKey(key as string) &&
            !isBackgroundOverlayKey(key as string) &&
            !(structureKind === 'generic' && key === 'control-border-radius') &&
            !(structureKind === 'breadcrumb' && key === 'icon-color') &&
            !(structureKind === 'breadcrumb' && key === 'group-gap') &&
            !(structureKind === 'card' && ['padding-x', 'padding-y'].includes(key as string)) &&
            !(structureKind === 'generic' && isPaddingOverlayKey(key as string) && genericPaddingBandsByKey[key as string]?.length) &&
            !(structureKind === 'generic' && isGapOverlayKey(key as string) && genericGapBandsByKey[key as string]?.length) &&
            !(structureKind === 'generic' && isGenericBorderKey(key as string) && genericBorderRectKey) &&
            !(structureKind === 'generic' && customBorderBandsByKey[key as string]?.length) &&
            !(isTooltipStructure && structureKind === 'generic' && ['padding-x', 'padding-y'].includes(key as string)) &&
            !(isTooltipStructure && structureKind === 'generic' && key === 'border-radius') &&
            !(isComboBoxStructure && structureKind === 'generic' && key === 'border-width') &&
            !(structureKind === 'accordion' && isAccordionPaddingKey(key as string)) &&
            !(structureKind === 'alert' && isAlertPaddingKey(key as string)) &&
            !(structureKind === 'alert' && ['border-color', 'border-width', 'border-radius'].includes(key as string)) &&
            !(structureKind === 'button' && ['height', 'min-width', 'border-width', 'border-radius', 'gap'].includes(key as string))
          "
          type="button"
          class="accordion-inspect-hotspot"
          :data-active="hoverKey === key ? 'true' : null"
          :data-structure-tone="getStructureTone(key as string)"
          :style="{
            left: `${hotspotRects[key]?.left || 0}px`,
            top: `${hotspotRects[key]?.top || 0}px`,
            width: `${hotspotRects[key]?.width || 0}px`,
            height: `${hotspotRects[key]?.height || 0}px`,
            '--inspect-inset-left': `${hotspotRects[key]?.insetLeft || 0}px`,
            '--inspect-inset-top': `${hotspotRects[key]?.insetTop || 0}px`,
            '--inspect-inset-width': `${hotspotRects[key]?.insetWidth || 0}px`,
            '--inspect-inset-height': `${hotspotRects[key]?.insetHeight || 0}px`,
          }"
          @mouseenter="hoverKey = key"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = key"
          @blur="clearPreviewHover"
          @click="scrollToTableRow(key as string)"
          :aria-label="meta.aria"
        >
          <span class="sgds:sr-only">{{ meta.aria }}</span>
        </button>

        <template
          v-if="structureKind === 'breadcrumb'"
        >
          <button
            v-if="isHoverableStructureKey('icon-color')"
            v-for="(band, index) in breadcrumbIconBands"
            :key="`breadcrumb-icon-${index}`"
            type="button"
            class="accordion-inspect-padding-proxy"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = 'icon-color'"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = 'icon-color'"
            @blur="clearPreviewHover"
            @click="scrollToTableRow('icon-color')"
            aria-label="Inspect breadcrumb icon colour"
          >
            <span class="sgds:sr-only">Inspect breadcrumb icon colour</span>
          </button>

          <button
            v-for="(band, index) in breadcrumbGroupGapBands"
            :key="`breadcrumb-group-gap-${index}`"
            type="button"
            class="accordion-inspect-padding-proxy"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = 'group-gap'"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = 'group-gap'"
            @blur="clearPreviewHover"
            @click="scrollToTableRow('group-gap')"
            aria-label="Inspect breadcrumb group gap"
          >
            <span class="sgds:sr-only">Inspect breadcrumb group gap</span>
          </button>
        </template>

        <div
          v-if="activeBreadcrumbGroupGapBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeBreadcrumbGroupGapBands"
            :key="`breadcrumb-group-gap-visual-${index}`"
            class="accordion-inspect-padding-visual__band accordion-inspect-padding-visual__band--gap"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
              borderRadius: band.borderRadius,
            }"
          ></div>
        </div>

        <div
          v-if="activeBreadcrumbIconBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeBreadcrumbIconBands"
            :key="`breadcrumb-icon-visual-${index}`"
            class="accordion-inspect-padding-visual__band accordion-inspect-padding-visual__band--semantic"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <template
          v-for="group in accordionPaddingHoverBandGroups"
          :key="`accordion-padding-${group.key}`"
        >
          <button
            v-for="(band, index) in group.bands"
            :key="`accordion-padding-${group.key}-${index}`"
            type="button"
            class="accordion-inspect-padding-proxy"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = group.key"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = group.key"
            @blur="clearPreviewHover"
            @click="scrollToTableRow(group.key)"
            :aria-label="inspectMeta[group.key].aria"
          >
            <span class="sgds:sr-only">{{ inspectMeta[group.key].aria }}</span>
          </button>
        </template>

        <div
          v-if="activeAccordionPaddingBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeAccordionPaddingBands"
            :key="`accordion-padding-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <template
          v-for="group in alertPaddingHoverBandGroups"
          :key="`alert-padding-${group.key}`"
        >
          <button
            v-for="(band, index) in group.bands"
            :key="`alert-padding-${group.key}-${index}`"
            type="button"
            class="accordion-inspect-padding-proxy"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = group.key"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = group.key"
            @blur="clearPreviewHover"
            @click="scrollToTableRow(group.key)"
            :aria-label="inspectMeta[group.key].aria"
          >
            <span class="sgds:sr-only">{{ inspectMeta[group.key].aria }}</span>
          </button>
        </template>

        <div
          v-if="activeAlertPaddingBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeAlertPaddingBands"
            :key="`alert-padding-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <button
          v-for="(band, index) in cardPaddingXHoverBands"
          :key="`card-padding-x-band-${index}`"
          type="button"
          class="accordion-inspect-padding-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'padding-x'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'padding-x'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('padding-x')"
          aria-label="Inspect card padding x"
        >
          <span class="sgds:sr-only">Inspect card padding x</span>
        </button>

        <div
          v-if="hoverKey === 'padding-x' || hoverKey === 'padding-y'"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in cardPaddingXHoverBands"
            :key="`card-padding-x-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
          <div
            v-for="(band, index) in cardPaddingYHoverBands"
            :key="`card-padding-y-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <button
          v-for="(band, index) in cardPaddingYHoverBands"
          :key="`card-padding-y-band-${index}`"
          type="button"
          class="accordion-inspect-padding-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'padding-y'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'padding-y'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('padding-y')"
          aria-label="Inspect card padding y"
        >
          <span class="sgds:sr-only">Inspect card padding y</span>
        </button>

        <!-- Universal generic-component padding bands. Replaces the
             full-surface hotspot with thin perimeter strips for every padding
             token in the inspectMeta. Mirrors the accordion/card pattern but
             applies to every "generic" component automatically. -->
        <template
          v-for="(bands, key) in genericPaddingBandsByKey"
          :key="`generic-padding-${key}`"
        >
          <button
            v-for="(band, index) in bands"
            :key="`generic-padding-${key}-band-${index}`"
            type="button"
            :class="[
              'accordion-inspect-padding-proxy',
              key === 'padding-x' || key === 'padding-xs' ? 'accordion-inspect-padding-proxy--priority' : '',
            ]"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = key"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = key"
            @blur="clearPreviewHover"
            @click="scrollToTableRow(key as string)"
            :aria-label="inspectMeta[key]?.aria || `Inspect component ${key}`"
          >
            <span class="sgds:sr-only">{{ inspectMeta[key]?.aria || `Inspect component ${key}` }}</span>
          </button>
        </template>

        <div
          v-if="activeGenericPaddingBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeGenericPaddingBands"
            :key="`generic-padding-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <template
          v-for="(bands, key) in genericGapBandsByKey"
          :key="`generic-gap-${key}`"
        >
          <button
            v-for="(band, index) in bands"
            :key="`generic-gap-${key}-band-${index}`"
            type="button"
            class="accordion-inspect-padding-proxy"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = key"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = key"
            @blur="clearPreviewHover"
            @click="scrollToTableRow(key as string)"
            :aria-label="inspectMeta[key]?.aria || `Inspect component ${key}`"
          >
            <span class="sgds:sr-only">{{ inspectMeta[key]?.aria || `Inspect component ${key}` }}</span>
          </button>
        </template>

        <div
          v-if="activeGenericGapBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeGenericGapBands"
            :key="`generic-gap-visual-${index}`"
            class="accordion-inspect-padding-visual__band accordion-inspect-padding-visual__band--gap"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <!-- Universal generic-component border ring. Thin perimeter strips
             that highlight only the border edge for any border-width or
             border-radius token. Without this, hovering border tokens would
             tint the entire surface. -->
        <button
          v-if="genericBorderRectKey"
          v-for="(band, index) in genericBorderHoverBands"
          :key="`generic-border-band-${index}`"
          type="button"
          class="accordion-inspect-border-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = genericBorderRectKey"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = genericBorderRectKey"
          @blur="clearPreviewHover"
          @click="genericBorderRectKey && scrollToTableRow(genericBorderRectKey)"
          :aria-label="`Inspect component ${genericBorderRectKey}`"
        >
          <span class="sgds:sr-only">{{ `Inspect component ${genericBorderRectKey}` }}</span>
        </button>

        <div
          v-if="genericBorderRectKey && hoverKey === genericBorderRectKey && hotspotRects[genericBorderRectKey]"
          class="alert-inspect-border-visual"
          aria-hidden="true"
          :style="{
            left: `${hotspotRects[genericBorderRectKey]?.left || 0}px`,
            top: `${hotspotRects[genericBorderRectKey]?.top || 0}px`,
            width: `${hotspotRects[genericBorderRectKey]?.width || 0}px`,
            height: `${hotspotRects[genericBorderRectKey]?.height || 0}px`,
            borderRadius: genericBorderRadiusValue,
          }"
        ></div>

        <!-- Custom per-element border bands (e.g. subnav's bottom-only
             strokes on the .nav rule and the active item's underline).
             Renders one proxy + one visual per band, replacing the
             4-sided perimeter ring for keys whose border isn't a
             rectangle around the whole component. -->
        <template
          v-for="(bands, key) in customBorderBandsByKey"
          :key="`custom-border-${key}`"
        >
          <button
            v-for="(band, index) in bands"
            :key="`custom-border-${key}-band-${index}`"
            type="button"
            :class="key.includes('border-radius') ? 'accordion-inspect-border-proxy' : 'accordion-inspect-padding-proxy'"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = key"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = key"
            @blur="clearPreviewHover"
            @click="scrollToTableRow(key as string)"
            :aria-label="inspectMeta[key]?.aria || `Inspect component ${key}`"
          >
            <span class="sgds:sr-only">{{ inspectMeta[key]?.aria || `Inspect component ${key}` }}</span>
          </button>
        </template>

        <div
          v-if="hoverKey && customBorderBandsByKey[hoverKey]?.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in customBorderBandsByKey[hoverKey]"
            :key="`custom-border-visual-${index}`"
            :class="hoverKey.includes('border-radius') ? 'alert-inspect-border-visual' : 'accordion-inspect-padding-visual__band accordion-inspect-padding-visual__band--gap'"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
              borderRadius: hoverKey.includes('border-radius') ? (band.borderRadius || genericBorderRadiusValue) : undefined,
            }"
          ></div>
        </div>

        <button
          v-for="(band, index) in tooltipPaddingXBands"
          :key="`tooltip-padding-x-band-${index}`"
          type="button"
          class="accordion-inspect-padding-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'padding-x'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'padding-x'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('padding-x')"
          aria-label="Inspect tooltip padding x"
        >
          <span class="sgds:sr-only">Inspect tooltip padding x</span>
        </button>

        <button
          v-for="(band, index) in tooltipPaddingYBands"
          :key="`tooltip-padding-y-band-${index}`"
          type="button"
          class="accordion-inspect-padding-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'padding-y'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'padding-y'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('padding-y')"
          aria-label="Inspect tooltip padding y"
        >
          <span class="sgds:sr-only">Inspect tooltip padding y</span>
        </button>

        <div
          v-if="isTooltipStructure && structureKind === 'generic' && (hoverKey === 'padding-x' || hoverKey === 'padding-y')"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in tooltipPaddingXBands"
            :key="`tooltip-padding-x-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
          <div
            v-for="(band, index) in tooltipPaddingYBands"
            :key="`tooltip-padding-y-visual-${index}`"
            class="accordion-inspect-padding-visual__band"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <button
          v-for="(band, index) in cardBorderHoverBands"
          :key="`card-border-band-${index}`"
          type="button"
          class="accordion-inspect-border-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'border-radius'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'border-radius'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('border-radius')"
          aria-label="Inspect card border"
        >
          <span class="sgds:sr-only">Inspect card border</span>
        </button>

        <button
          v-for="(band, index) in accordionBorderHoverBands"
          :key="`accordion-border-band-${index}`"
          type="button"
          class="accordion-inspect-border-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'border-radius'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'border-radius'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('border-radius')"
          aria-label="Inspect accordion border"
        >
          <span class="sgds:sr-only">Inspect accordion border</span>
        </button>

        <button
          v-for="(band, index) in alertBorderHoverBands"
          :key="`alert-border-band-${index}`"
          type="button"
          class="accordion-inspect-border-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'border-radius'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'border-radius'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('border-radius')"
          aria-label="Inspect alert border"
        >
          <span class="sgds:sr-only">Inspect alert border</span>
        </button>

        <button
          v-for="(band, index) in buttonBorderHoverBands"
          :key="`button-border-band-${index}`"
          type="button"
          class="accordion-inspect-border-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'border-width'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'border-width'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('border-width')"
          aria-label="Inspect button border"
        >
          <span class="sgds:sr-only">Inspect button border</span>
        </button>

        <!-- Button gap hover proxies: one per void (leftIcon↔label,
             label↔rightIcon). Each proxy sets hoverKey='gap' so the tooltip
             and token-row highlight still work through the shared inspect
             meta, while the overlay bands below paint only the true gap
             strips rather than one wide band across the label. -->
        <template v-if="structureKind === 'button'">
          <button
            v-for="(band, index) in buttonGapBands"
            :key="`button-gap-band-${index}`"
            type="button"
            class="accordion-inspect-padding-proxy"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
            @mouseenter="hoverKey = 'gap'"
            @mouseleave="clearPreviewHover"
            @focus="hoverKey = 'gap'"
            @blur="clearPreviewHover"
            @click="scrollToTableRow('gap')"
            aria-label="Inspect button gap"
          >
            <span class="sgds:sr-only">Inspect button gap</span>
          </button>
        </template>

        <div
          v-if="structureKind === 'button' && activeButtonGapBands.length"
          class="accordion-inspect-padding-visual"
          aria-hidden="true"
        >
          <div
            v-for="(band, index) in activeButtonGapBands"
            :key="`button-gap-visual-${index}`"
            class="accordion-inspect-padding-visual__band accordion-inspect-padding-visual__band--gap"
            :style="{
              left: `${band.left}px`,
              top: `${band.top}px`,
              width: `${band.width}px`,
              height: `${band.height}px`,
            }"
          ></div>
        </div>

        <!-- Button border visual: rendered when the user hovers either
             border token or one of the border-edge proxy bands. Drawn as a
             single rounded outline that spans the button surface so the user
             sees exactly what the token controls. -->
        <div
          v-if="structureKind === 'button' && ['border-width', 'border-radius'].includes(hoverKey || '') && hotspotRects['border-radius']"
          class="button-inspect-border-visual"
          aria-hidden="true"
          :style="{
            left: `${hotspotRects['border-radius']?.left || 0}px`,
            top: `${hotspotRects['border-radius']?.top || 0}px`,
            width: `${hotspotRects['border-radius']?.width || 0}px`,
            height: `${hotspotRects['border-radius']?.height || 0}px`,
          }"
        ></div>

        <div
          v-if="structureKind === 'generic' && hoverKey === 'control-border-radius' && hotspotRects['control-border-radius']"
          class="button-inspect-border-visual"
          aria-hidden="true"
          :style="{
            left: `${hotspotRects['control-border-radius']?.left || 0}px`,
            top: `${hotspotRects['control-border-radius']?.top || 0}px`,
            width: `${hotspotRects['control-border-radius']?.width || 0}px`,
            height: `${hotspotRects['control-border-radius']?.height || 0}px`,
          }"
        ></div>

        <div
          v-if="isComboBoxStructure && structureKind === 'generic' && hoverKey === 'border-width' && hotspotRects['border-width']"
          class="button-inspect-border-visual"
          aria-hidden="true"
          :style="{
            left: `${hotspotRects['border-width']?.left || 0}px`,
            top: `${hotspotRects['border-width']?.top || 0}px`,
            width: `${hotspotRects['border-width']?.width || 0}px`,
            height: `${hotspotRects['border-width']?.height || 0}px`,
          }"
        ></div>

        <!-- Static dimension annotations for the button's height and
             min-width. Rendered outside the button surface (to the right for
             height, below for min-width) so the lines don't intercept the
             padding-x / typography hotspots. Non-interactive: aria-hidden and
             pointer-events: none via the accordion-inspect-annotation CSS. -->
        <template v-if="structureKind === 'button' && buttonDimensionAnnotations">
          <div
            class="accordion-inspect-annotation accordion-inspect-annotation--height"
            aria-hidden="true"
            data-active="true"
            :style="{
              left: `${buttonDimensionAnnotations.height.left}px`,
              top: `${buttonDimensionAnnotations.height.top}px`,
              height: `${buttonDimensionAnnotations.height.size}px`,
            }"
          >
            <span class="accordion-inspect-annotation__label">{{ buttonDimensionAnnotations.height.label }}</span>
          </div>
          <div
            class="accordion-inspect-annotation accordion-inspect-annotation--min-width"
            aria-hidden="true"
            data-active="true"
            :style="{
              left: `${buttonDimensionAnnotations.minWidth.left}px`,
              top: `${buttonDimensionAnnotations.minWidth.top}px`,
              width: `${buttonDimensionAnnotations.minWidth.size}px`,
            }"
          >
            <span class="accordion-inspect-annotation__label">{{ buttonDimensionAnnotations.minWidth.label }}</span>
          </div>
        </template>

        <template v-if="staticSizeAnnotations?.length">
          <div
            v-for="annotation in staticSizeAnnotations"
            :key="annotation.id"
            class="accordion-inspect-annotation"
            :class="[
              annotation.orientation === 'height' ? 'accordion-inspect-annotation--height' : 'accordion-inspect-annotation--min-width',
              annotation.labelPlacement === 'left' ? 'accordion-inspect-annotation--label-left' : '',
              annotation.labelPlacement === 'above' ? 'accordion-inspect-annotation--label-above' : '',
              annotation.isThickness ? 'accordion-inspect-annotation--thickness' : '',
              annotation.isIconSize ? 'accordion-inspect-annotation--icon-size' : '',
            ]"
            aria-hidden="true"
            data-active="true"
            :style="{
              left: `${annotation.left}px`,
              top: `${annotation.top}px`,
              ...(annotation.orientation === 'height'
                ? { height: `${annotation.size}px` }
                : { width: `${annotation.size}px` }),
            }"
          >
            <span class="accordion-inspect-annotation__label">{{ annotation.label }}</span>
          </div>
        </template>

        <div
          v-if="structureKind === 'alert' && ['border-color', 'border-width', 'border-radius'].includes(hoverKey || '') && hotspotRects['border-radius']"
          class="alert-inspect-border-visual"
          aria-hidden="true"
          :style="{
            left: `${hotspotRects['border-radius']?.left || 0}px`,
            top: `${hotspotRects['border-radius']?.top || 0}px`,
            width: `${hotspotRects['border-radius']?.width || 0}px`,
            height: `${hotspotRects['border-radius']?.height || 0}px`,
          }"
        ></div>

        <div
          v-if="hoverKey && hotspotRects[hoverKey] && hasVisibleTooltipContent(inspectMeta[hoverKey])"
          :class="[
            'accordion-inspect-tooltip',
            tooltipPlacement === 'right' ? 'accordion-inspect-tooltip--align-right' : '',
          ]"
          :style="tooltipStyle"
        >
          <div class="accordion-inspect-tooltip__grid">
            <div
              v-if="shouldShowPrimaryTooltipRow(inspectMeta[hoverKey])"
              :class="getTooltipTagClass(hoverKey)"
            >
              {{ getTooltipPrimaryCategory(hoverKey, inspectMeta[hoverKey]) }}
            </div>
            <div
              v-if="shouldShowPrimaryTooltipRow(inspectMeta[hoverKey])"
              class="accordion-inspect-tooltip__value"
            >
              {{ formatToken(inspectMeta[hoverKey].value) }}
            </div>
            <div
              v-if="shouldShowPrimaryTooltipRow(inspectMeta[hoverKey])"
              class="accordion-inspect-tooltip__value accordion-inspect-tooltip__value--raw"
            >
              {{ inspectMeta[hoverKey].valueSuffix }}
            </div>
            <template
              v-for="(row, index) in getVisibleTooltipRows(inspectMeta[hoverKey])"
              :key="`${hoverKey}-tooltip-row-${index}`"
            >
              <div :class="getTooltipTagClass(row.label || hoverKey)">
                <template v-if="shouldShowTooltipRowCategory(inspectMeta[hoverKey], index)">
                  {{ getTooltipRowCategory(row, hoverKey) }}
                </template>
              </div>
              <div class="accordion-inspect-tooltip__value">
                {{ formatToken(row.value) }}
              </div>
              <div class="accordion-inspect-tooltip__value accordion-inspect-tooltip__value--raw">
                {{ row.valueSuffix }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasDesignTokenRows" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Design tokens used</h3>
        <p class="sgds:m-0 sgds:max-w-[var(--sgds-dimension-760)] sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">
          Each row is a colour, spacing, or size value the component uses, and
          the right-most column tells you where in the component you'll see it.
        </p>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)]">
        <sgds-table tableBorder headerBackground responsive="always">
          <sgds-table-row>
            <sgds-table-head>Category</sgds-table-head>
            <sgds-table-head>Token</sgds-table-head>
            <sgds-table-head>Value</sgds-table-head>
            <sgds-table-head>Where it's used</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row
            v-for="(row, index) in designTokenRows"
            :key="`${row.groupTitle || 'base'}-${row.element}-${row.property}-${row.designToken}-${index}`"
            :class="[isRowActive(getRowMapKey(row, row.groupTitle) || row.mapKey || null, row.designToken) ? 'structure-row-active' : '']"
            :data-structure-row-key="getRowMapKey(row, row.groupTitle) || row.mapKey || null"
            :data-structure-tone="getStructureTone(getRowMapKey(row, row.groupTitle) || row.mapKey || null)"
            tabindex="-1"
          >
            <sgds-table-cell>{{ getCollapsedCategory(designTokenRows, row, index) }}</sgds-table-cell>
            <sgds-table-cell><CodeToken :label="formatToken(row.designToken)" /></sgds-table-cell>
            <sgds-table-cell>
              <CodeToken
                :label="getStructureValue(row, getRowMapKey(row, row.groupTitle) || row.mapKey || row.property)"
                :surface="false"
              />
            </sgds-table-cell>
            <sgds-table-cell>{{ row.usage || "" }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </div>

  </div>
</template>

<style>
.structure-demo-box {
  background: var(--sgds-bg-alternate);
}

sgds-table-row.structure-row-active[data-structure-tone="padding"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
}

sgds-table-row.structure-row-active[data-structure-tone="gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
}

sgds-table-row.structure-row-active[data-structure-tone="size"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
}

sgds-table-row.structure-row-active[data-structure-tone="border"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
}

sgds-table-row.structure-row-active[data-structure-tone="semantic"] {
  background: color-mix(in srgb, var(--sgds-neutral-surface-muted) 52%, transparent);
}

/* Make the rendered component non-interactive so hover events fall through
   to the absolutely-positioned inspect proxy buttons sitting beside the
   markup. Without this, the host element (e.g. <sgds-button>, <sgds-tooltip>)
   captures pointer events and the proxies under it never fire. */
.structure-preview-markup,
.structure-preview-markup * {
  pointer-events: none;
}

/* Suppress host-level z-index on rendered sgds components inside the
   structure preview. Components like <sgds-subnav> set
   `z-index: var(--sgds-z-index-sticky)` (200) on their host to support
   sticky behaviour in real layouts, but inside the static structure
   preview that ranking pushes the component above the inspect overlay
   (`.accordion-inspect-padding-visual` / `.accordion-inspect-padding-proxy`,
   z-index 6–10), hiding the padding / gap highlight bands. The preview
   doesn't need any layering semantics from the rendered components, so
   reset their z-index here. Shadow-DOM internals are unaffected — this
   rule only reaches the host elements in the light DOM. */
.structure-preview-markup > *,
.structure-preview-markup > * * {
  z-index: auto !important;
}

.structure-preview-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  max-width: var(--sgds-dimension-640);
  overflow: hidden;
  width: 100%;
}

.structure-preview-markup > sgds-card {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  max-width: var(--sgds-dimension-560);
  pointer-events: none;
  width: min(100%, var(--sgds-dimension-480));
}

.structure-preview-markup > sgds-button {
  display: inline-flex;
  pointer-events: none;
}

.structure-preview-markup > sgds-alert {
  display: block;
  max-width: var(--sgds-dimension-640);
  width: 100%;
}

.structure-preview-markup > sgds-modal {
  display: block;
  min-height: var(--sgds-dimension-480);
  position: relative;
  width: 100%;
}

.structure-preview-markup > sgds-modal[size="fullscreen"] {
  min-height: var(--sgds-dimension-320);
}

/* Global selectors for drawer markup rendered through v-html. The SGDS
   contained drawer expects its parent to provide the containing block. */
.structure-preview-markup > .portal-demo-overlay:has(> sgds-drawer) {
  background: var(--sgds-bg-overlay);
  min-height: var(--sgds-dimension-360);
}

.structure-preview-markup > .portal-demo-overlay > sgds-drawer {
  inset: 0;
  position: absolute;
}

/* Tab structure preview: constrain the underlined nav so it doesn't stretch
   across the full structure shell. Higher specificity (class + attribute) is
   needed to override the SGDS `sgds-tab-group[variant="underlined"]` rule
   that forces width: 100%. Keeps the demo focused on the nav strip, divider
   rule and active-indicator, and leaves room for thickness-annotation labels
   on the left. */
.structure-preview-markup > sgds-tab-group,
.structure-preview-markup > sgds-tab-group[variant="underlined"],
.structure-preview-markup > sgds-tab-group[variant="solid"] {
  display: block;
  inline-size: var(--sgds-dimension-256);
  max-inline-size: 100%;
  width: var(--sgds-dimension-256);
}

.accordion-inspect-hotspot {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 6;
}

.accordion-inspect-hotspot[aria-label="Inspect accordion chevron colour"],
.accordion-inspect-hotspot[aria-label="Inspect accordion leading icon colour"],
.accordion-inspect-hotspot[aria-label="Inspect accordion title colour"],
.accordion-inspect-hotspot[aria-label="Inspect accordion gap"] {
  z-index: 7;
}

.accordion-inspect-hotspot[aria-label="Inspect card background colour"],
.accordion-inspect-hotspot[aria-label="Inspect card tinted background"],
.accordion-inspect-hotspot[aria-label="Inspect card border colour"],
.accordion-inspect-hotspot[aria-label="Inspect card border width"],
.accordion-inspect-hotspot[aria-label="Inspect card border radius"] {
  z-index: 5;
  pointer-events: none;
}

.accordion-inspect-hotspot[aria-label="Inspect card padding x"],
.accordion-inspect-hotspot[aria-label="Inspect card padding y"],
.accordion-inspect-hotspot[aria-label="Inspect card padding top"],
.accordion-inspect-hotspot[aria-label="Inspect card padding bottom"],
.accordion-inspect-hotspot[aria-label="Inspect card padding left"],
.accordion-inspect-hotspot[aria-label="Inspect card padding right"] {
  z-index: 6;
}

.accordion-inspect-hotspot[aria-label="Inspect card gap"],
.accordion-inspect-hotspot[aria-label="Inspect card title gap"],
.accordion-inspect-hotspot[aria-label="Inspect card subtitle gap"],
.accordion-inspect-hotspot[aria-label="Inspect card slot gap"] {
  z-index: 7;
}

.accordion-inspect-border-proxy {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  /* Sit above sibling proxies (padding, etc.) at the same z-stack so the
     thin strip running along the visible border edge always wins the hover
     race. Without this, a padding-y proxy that overlaps the border strip
     captures the pointer first and the border popup never appears. */
  z-index: 9;
}

.accordion-inspect-padding-proxy {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  min-height: 8px;
  min-width: 8px;
  padding: 0;
  position: absolute;
  z-index: 8;
}

.accordion-inspect-padding-proxy--priority {
  min-width: 12px;
  z-index: 10;
}

.alert-inspect-border-visual {
  border-radius: 8px;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 8;
}

/* Static dimension annotations (Figma-style guide lines) for non-interactive
   tokens like button height and min-width. The line follows one edge of the
   button and the label sits outside the surface so neither blocks hover on
   padding-x / typography hotspots. Pointer-events are disabled so the
   annotation never intercepts hovers — hovering the matching row in the
   token list still flips data-active via the :data-active binding. */
.accordion-inspect-annotation {
  pointer-events: none;
  position: absolute;
  z-index: 7;
}

.accordion-inspect-annotation__label {
  background: var(--sgds-purple-surface-default);
  border: 1px solid var(--sgds-purple-surface-default);
  box-shadow: 0 0 0 2px var(--sgds-purple-surface-default);
  border-radius: 4px;
  color: var(--sgds-color-fixed-light);
  font-family: var(--sgds-font-family-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  padding: 2px 6px;
  position: absolute;
  white-space: nowrap;
  z-index: 1;
}

/* Height annotation — vertical line sitting just to the right of the button.
   ::before draws the main vertical line, ::after paints the top + bottom cap
   marks in a single element using two stacked linear-gradient backgrounds. */
.accordion-inspect-annotation--height {
  width: 18px;
}
.accordion-inspect-annotation--height::before {
  background: var(--sgds-purple-border-color-default);
  content: "";
  height: calc(100% - 2px);
  left: 8px;
  position: absolute;
  top: 1px;
  width: 1px;
}
.accordion-inspect-annotation--height::after {
  background-image:
    linear-gradient(var(--sgds-purple-border-color-default), var(--sgds-purple-border-color-default)),
    linear-gradient(var(--sgds-purple-border-color-default), var(--sgds-purple-border-color-default));
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, 0 calc(100% - 1px);
  background-size: 9px 1px, 9px 1px;
  content: "";
  height: 100%;
  left: 4px;
  position: absolute;
  top: 0;
  width: 9px;
}
.accordion-inspect-annotation--height .accordion-inspect-annotation__label {
  /* Bracket end cap right edge sits at offset 13. Add 8px for consistent gap. */
  left: 21px;
  top: 50%;
  transform: translateY(-50%);
}

/* Min-width annotation — horizontal line sitting just below the button.
   ::before draws the main horizontal line, ::after paints the left + right
   cap marks in a single element. */
.accordion-inspect-annotation--min-width {
  height: 18px;
}
.accordion-inspect-annotation--min-width::before {
  background: var(--sgds-purple-border-color-default);
  content: "";
  height: 1px;
  left: 1px;
  position: absolute;
  top: 8px;
  width: calc(100% - 2px);
}
.accordion-inspect-annotation--min-width::after {
  background-image:
    linear-gradient(var(--sgds-purple-border-color-default), var(--sgds-purple-border-color-default)),
    linear-gradient(var(--sgds-purple-border-color-default), var(--sgds-purple-border-color-default));
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 1px) 0;
  background-size: 1px 9px, 1px 9px;
  content: "";
  height: 9px;
  left: 0;
  position: absolute;
  top: 4px;
  width: 100%;
}
.accordion-inspect-annotation--min-width .accordion-inspect-annotation__label {
  /* Bracket end cap bottom sits at offset 13. Add 8px for consistent gap. */
  left: 50%;
  top: 21px;
  transform: translateX(-50%);
}

.accordion-inspect-annotation--min-width.accordion-inspect-annotation--icon-size .accordion-inspect-annotation__label {
  top: 21px;
}

.accordion-inspect-annotation--min-width.accordion-inspect-annotation--label-left .accordion-inspect-annotation__label {
  left: 0;
  top: 21px;
  transform: translateX(0);
}

.accordion-inspect-annotation--min-width.accordion-inspect-annotation--label-above .accordion-inspect-annotation__label {
  /* Bracket end cap top at offset 4. Subtract 8px for consistent gap. */
  left: 50%;
  top: -4px;
  transform: translate(-50%, -100%);
}

.accordion-inspect-annotation--height.accordion-inspect-annotation--label-left .accordion-inspect-annotation__label {
  /* Bracket end cap left at offset 4. Subtract 8px for consistent gap. */
  left: -4px;
  top: 50%;
  transform: translate(-100%, -50%);
}

/* Stroke-thickness annotations (e.g. nav divider, active-tab indicator). The
   strip is too thin to bracket meaningfully so we drop the bracket lines
   and render only the label badge. The container is a 0-width anchor whose
   right edge sits one gutter away from the strip; the label is absolutely
   positioned and grows leftward from that anchor. */
.accordion-inspect-annotation--thickness {
  width: 0;
}

.accordion-inspect-annotation--thickness::before,
.accordion-inspect-annotation--thickness::after {
  display: none;
}

/* Higher specificity to override the .label-left rule that translates the
   label by -100% (which would push it off-screen for thickness annotations).
   Also tighter padding so the badge fits in the narrow space between the
   demo box's left edge and the strip itself. */
.accordion-inspect-annotation--height.accordion-inspect-annotation--thickness .accordion-inspect-annotation__label,
.accordion-inspect-annotation--height.accordion-inspect-annotation--thickness.accordion-inspect-annotation--label-left .accordion-inspect-annotation__label {
  font-size: 10px;
  left: auto;
  padding: 1px 5px;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}

.accordion-inspect-annotation[data-active="true"] .accordion-inspect-annotation__label {
  background: var(--sgds-purple-surface-emphasis);
  border-color: var(--sgds-purple-surface-emphasis);
  box-shadow: 0 0 0 2px var(--sgds-purple-surface-emphasis);
  color: var(--sgds-color-fixed-light);
}

.accordion-inspect-padding-visual {
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 6;
}

.accordion-inspect-padding-visual__band {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
  position: absolute;
}

/* Structure overlay tone modifiers — keep in sync with getStructureTone().
   --gap: every gap / spacing-between overlay renders in purple.
   --semantic: semantic colour tokens (icon-color, link-color, etc.) render
   in grey so they visually separate from structural padding/gap overlays. */
.accordion-inspect-padding-visual__band--gap {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
  outline-color: var(--sgds-purple-border-color-default);
}

.accordion-inspect-padding-visual__band--semantic {
  background: color-mix(in srgb, var(--sgds-neutral-surface-muted) 52%, transparent);
  outline-color: var(--sgds-neutral-border-color-default);
}

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="padding"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="padding"]::before {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 38%, transparent);
  content: "";
  display: block;
  height: var(--inspect-inset-height);
  left: var(--inspect-inset-left);
  mix-blend-mode: multiply;
  position: absolute;
  top: var(--inspect-inset-top);
  width: var(--inspect-inset-width);
  z-index: 1;
}

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="size"] {
  background: transparent;
  outline: none;
}

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="border"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 38%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="semantic"] {
  background: color-mix(in srgb, var(--sgds-neutral-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-neutral-border-color-default);
  outline-offset: 0;
}

.structure-demo-box [slot="icon"],
.structure-demo-box [slot="header"],
.structure-demo-box [slot="content"] {
  pointer-events: none;
  position: relative;
  z-index: 8;
}

.structure-demo-box [slot="subtitle"],
.structure-demo-box [slot="title"],
.structure-demo-box [slot="description"],
.structure-demo-box [slot="lower"],
.structure-demo-box [slot="footer"],
.structure-demo-box .portal-structure-card-default-slot {
  pointer-events: none;
  position: relative;
  z-index: 10;
}

.structure-demo-box [slot="leftIcon"],
.structure-demo-box [slot="rightIcon"] {
  pointer-events: none;
  position: relative;
  z-index: 10;
}

.structure-demo-box[data-hover-key="icon-color"] .accordion-inspect-hotspot[aria-label="Inspect accordion chevron colour"],
.structure-demo-box[data-hover-key="title-color"] .accordion-inspect-hotspot[aria-label="Inspect accordion title colour"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 68%, transparent);
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="leading-icon-color"] .accordion-inspect-hotspot[aria-label="Inspect accordion leading icon colour"] {
  background: color-mix(in srgb, var(--sgds-neutral-surface-muted) 68%, transparent);
  outline: 1px dashed var(--sgds-neutral-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="gap"] .accordion-inspect-hotspot[aria-label="Inspect accordion gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 68%, transparent);
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="hover-bg"] .accordion-inspect-hotspot[aria-label="Inspect accordion header background"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="padding-x-default"] .accordion-inspect-hotspot[aria-label="Inspect accordion header padding x"],
.structure-demo-box[data-hover-key="padding-y-default"] .accordion-inspect-hotspot[aria-label="Inspect accordion header padding y"],
.structure-demo-box[data-hover-key="content-padding"] .accordion-inspect-hotspot[aria-label="Inspect accordion content padding"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="padding-x-default"] .accordion-inspect-hotspot[aria-label="Inspect accordion header padding x"],
.structure-demo-box[data-hover-key="padding-y-default"] .accordion-inspect-hotspot[aria-label="Inspect accordion header padding y"],
.structure-demo-box[data-hover-key="content-padding"] .accordion-inspect-hotspot[aria-label="Inspect accordion content padding"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
}

.structure-demo-box[data-hover-key="padding-x-default"] .accordion-inspect-hotspot[aria-label="Inspect accordion header padding x"]::before,
.structure-demo-box[data-hover-key="padding-y-default"] .accordion-inspect-hotspot[aria-label="Inspect accordion header padding y"]::before,
.structure-demo-box[data-hover-key="content-padding"] .accordion-inspect-hotspot[aria-label="Inspect accordion content padding"]::before {
  content: none;
}

.structure-demo-box[data-hover-key="border-color"] .accordion-inspect-hotspot[aria-label="Inspect accordion border colour"],
.structure-demo-box[data-hover-key="border-width"] .accordion-inspect-hotspot[aria-label="Inspect accordion border width"],
.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect accordion border radius"] {
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect accordion border radius"] {
  border-radius: 8px;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect alert padding x"],
.structure-demo-box[data-hover-key="padding-y"] .accordion-inspect-hotspot[aria-label="Inspect alert padding y"],
.structure-demo-box[data-hover-key="content-padding-right"] .accordion-inspect-hotspot[aria-label="Inspect alert content padding right"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="gap"] .accordion-inspect-hotspot[aria-label="Inspect alert gap"],
.structure-demo-box[data-hover-key="title-gap"] .accordion-inspect-hotspot[aria-label="Inspect alert title gap"],
.structure-demo-box[data-hover-key="content-gap"] .accordion-inspect-hotspot[aria-label="Inspect alert content gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 68%, transparent);
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="border-color"] .accordion-inspect-hotspot[aria-label="Inspect alert border colour"],
.structure-demo-box[data-hover-key="border-width"] .accordion-inspect-hotspot[aria-label="Inspect alert border width"],
.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect alert border radius"],
.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-border-proxy[aria-label="Inspect alert border"] {
  outline: none;
}

.structure-demo-box[data-hover-key="border-color"] .accordion-inspect-hotspot[aria-label="Inspect alert border colour"],
.structure-demo-box[data-hover-key="border-width"] .accordion-inspect-hotspot[aria-label="Inspect alert border width"],
.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect alert border radius"] {
  border-radius: 0;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect card padding x"],
.structure-demo-box[data-hover-key="padding-y"] .accordion-inspect-hotspot[aria-label="Inspect card padding y"],
.structure-demo-box[data-hover-key="padding-top"] .accordion-inspect-hotspot[aria-label="Inspect card padding top"],
.structure-demo-box[data-hover-key="padding-bottom"] .accordion-inspect-hotspot[aria-label="Inspect card padding bottom"],
.structure-demo-box[data-hover-key="padding-left"] .accordion-inspect-hotspot[aria-label="Inspect card padding left"],
.structure-demo-box[data-hover-key="padding-right"] .accordion-inspect-hotspot[aria-label="Inspect card padding right"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect card padding x"]::before,
.structure-demo-box[data-hover-key="padding-y"] .accordion-inspect-hotspot[aria-label="Inspect card padding y"]::before,
.structure-demo-box[data-hover-key="padding-top"] .accordion-inspect-hotspot[aria-label="Inspect card padding top"]::before,
.structure-demo-box[data-hover-key="padding-bottom"] .accordion-inspect-hotspot[aria-label="Inspect card padding bottom"]::before,
.structure-demo-box[data-hover-key="padding-left"] .accordion-inspect-hotspot[aria-label="Inspect card padding left"]::before,
.structure-demo-box[data-hover-key="padding-right"] .accordion-inspect-hotspot[aria-label="Inspect card padding right"]::before {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 38%, transparent);
  content: "";
  display: block;
  height: var(--inspect-inset-height);
  left: var(--inspect-inset-left);
  mix-blend-mode: multiply;
  position: absolute;
  top: var(--inspect-inset-top);
  width: var(--inspect-inset-width);
  z-index: 1;
}

.structure-demo-box[data-hover-key="gap"] .accordion-inspect-hotspot[aria-label="Inspect card gap"],
.structure-demo-box[data-hover-key="title-gap"] .accordion-inspect-hotspot[aria-label="Inspect card title gap"],
.structure-demo-box[data-hover-key="subtitle-gap"] .accordion-inspect-hotspot[aria-label="Inspect card subtitle gap"],
.structure-demo-box[data-hover-key="slot-gap"] .accordion-inspect-hotspot[aria-label="Inspect card slot gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="title-color"] .accordion-inspect-hotspot[aria-label="Inspect card title colour"],
.structure-demo-box[data-hover-key="description-color"] .accordion-inspect-hotspot[aria-label="Inspect card description colour"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="subtitle-color"] .accordion-inspect-hotspot[aria-label="Inspect card subtitle colour"],
.structure-demo-box[data-hover-key="secondary-text-color"] .accordion-inspect-hotspot[aria-label="Inspect card secondary text colour"],
.structure-demo-box[data-hover-key="link-color"] .accordion-inspect-hotspot[aria-label="Inspect card link colour"] {
  background: color-mix(in srgb, var(--sgds-neutral-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-neutral-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="border-color"] .accordion-inspect-hotspot[aria-label="Inspect card border colour"],
.structure-demo-box[data-hover-key="border-width"] .accordion-inspect-hotspot[aria-label="Inspect card border width"],
.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect card border radius"] {
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect card border radius"] {
  border-radius: 8px;
}

/* Button hotspot styles.
   Note: height and min-width are NOT listed here — they render as static
   dimension annotations outside the button (see .accordion-inspect-annotation
   below). Border tokens also don't render as clickable hotspots; the border
   edge is covered by the accordion-inspect-border-proxy bands, and the active
   state is drawn by .button-inspect-border-visual. */
.structure-demo-box[data-hover-key="background"] .accordion-inspect-hotspot[aria-label="Inspect button background colour"],
.structure-demo-box[data-hover-key="hover-bg"] .accordion-inspect-hotspot[aria-label="Inspect button hover background"],
.structure-demo-box[data-hover-key="text-color"] .accordion-inspect-hotspot[aria-label="Inspect button text colour"],
.structure-demo-box[data-hover-key="font-size"] .accordion-inspect-hotspot[aria-label="Inspect button font size"],
.structure-demo-box[data-hover-key="line-height"] .accordion-inspect-hotspot[aria-label="Inspect button line height"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

/* Button border visual — drawn as a single rounded outline over the surface
   whenever either border-width or border-radius is active (hover or row
   selection). Matches the button's resolved border-radius. */
.button-inspect-border-visual {
  border-radius: 8px;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 8;
}

/* Padding-x is rendered as two rectangles (left + right bands) flanking the
   content area. We leave the hotspot itself transparent and draw the two
   bands with ::before (left) and ::after (right), using the inset coords
   computed in code. */
.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"] {
  background: transparent;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"]::before,
.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"]::after {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  content: "";
  display: block;
  height: var(--inspect-inset-height);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
  position: absolute;
  top: var(--inspect-inset-top);
  z-index: 1;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"]::before {
  left: 0;
  width: var(--inspect-inset-left);
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"]::after {
  left: calc(var(--inspect-inset-left) + var(--inspect-inset-width));
  right: 0;
}

.structure-demo-box[data-hover-key="gap"] .accordion-inspect-hotspot[aria-label="Inspect button gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.accordion-inspect-tooltip {
  align-items: flex-start;
  background: var(--sgds-surface-fixed-light);
  border-radius: 12px;
  box-shadow:
    0 8px 24px color-mix(in srgb, var(--sgds-color-fixed-dark) 16%, transparent),
    0 2px 6px color-mix(in srgb, var(--sgds-color-fixed-dark) 8%, transparent);
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  left: 0;
  padding: 12px 16px;
  position: absolute;
  top: 0;
  transform: translate(-12px, calc(-100% - 12px));
  z-index: var(--sgds-z-index-overlay);
}

.accordion-inspect-tooltip--align-right {
  transform: translate(calc(-100% + 12px), calc(-100% - 12px));
}

.accordion-inspect-tooltip::after {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid var(--sgds-surface-fixed-light);
  content: "";
  left: 18px;
  position: absolute;
  top: 100%;
}

.accordion-inspect-tooltip--align-right::after {
  left: auto;
  right: 18px;
}

.accordion-inspect-tooltip__grid {
  column-gap: 16px;
  display: grid;
  grid-template-columns: max-content max-content max-content;
  row-gap: 8px;
}

.accordion-inspect-tooltip__tag {
  color: var(--sgds-purple-color-default);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--sgds-font-size-label-xs);
  font-weight: 600;
  line-height: var(--sgds-line-height-2-xs);
  white-space: nowrap;
}

.accordion-inspect-tooltip__tag--padding {
  color: var(--sgds-accent-color-fixed-dark);
}

.accordion-inspect-tooltip__tag--gap {
  color: var(--sgds-purple-color-default);
}

.accordion-inspect-tooltip__tag--border {
  color: var(--sgds-purple-color-default);
}

.accordion-inspect-tooltip__tag--semantic {
  color: var(--sgds-neutral-color-default);
}

.accordion-inspect-tooltip__value {
  color: var(--sgds-color-fixed-dark);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--sgds-font-size-label-xs);
  font-weight: 500;
  line-height: var(--sgds-line-height-2-xs);
  white-space: pre;
}

.accordion-inspect-tooltip__value--span-name {
  grid-column: 1 / span 2;
}

.accordion-inspect-tooltip__value--raw {
  font-weight: 700;
}

.structure-demo-box .accordion-m-content-copy {
  position: relative;
  z-index: 4;
}

.structure-demo-box[data-hover-key] .accordion-header__trailing,
.structure-demo-box[data-hover-key] .accordion-header__trailing sgds-icon {
  color: var(--sgds-color-fixed-dark);
}

.structure-demo-box .accordion-m-border-target,
.structure-demo-box .accordion-m-panel-target,
.structure-demo-box .accordion-m-gap-overlay,
.structure-demo-box .accordion-m-title-target,
.structure-demo-box .accordion-m-header-icon,
.structure-demo-box .accordion-m-content-copy {
  transition: background-color 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
}

.structure-demo-box[data-hover-key="title-color"] .accordion-m-title-target,
.structure-demo-box[data-hover-key="icon-color"] .accordion-m-header-icon {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--sgds-purple-border-color-default) 28%, transparent);
}

.structure-demo-box[data-hover-key="border-color"] .accordion-m-border-target,
.structure-demo-box[data-hover-key="border-width"] .accordion-m-border-target,
.structure-demo-box[data-hover-key="border-radius"] .accordion-m-border-target {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 36%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--sgds-purple-border-color-default) 28%, transparent);
}

</style>
