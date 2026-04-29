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
const hoverKey = ref<string | null>(null);
const selectedKeys = ref<string[]>([]);
const rootRef = ref<HTMLElement | null>(null);
const previewShellRef = ref<HTMLElement | null>(null);
const previewMarkupRef = ref<HTMLElement | null>(null);
const hotspotRects = ref<Record<string, HotspotRect | null>>({});
const breadcrumbGroupGapBands = ref<Array<{ left: number; top: number; width: number; height: number }>>([]);
const breadcrumbIconBands = ref<Array<{ left: number; top: number; width: number; height: number }>>([]);
// Button `gap` highlights each void between adjacent content (leftIcon↔label,
// label↔rightIcon) rather than one wide band across the whole label. Each
// entry is a discrete band; hover proxies + visual overlays v-for over these.
const buttonGapBands = ref<Array<{ left: number; top: number; width: number; height: number }>>([]);
const isComboBoxStructure = computed(() => props.previewMarkup.includes("<sgds-combo-box"));
const isTooltipStructure = computed(() => props.previewMarkup.includes("<sgds-tooltip"));
const structureKind = computed<"accordion" | "card" | "button" | "alert" | "breadcrumb" | "generic">(() => {
  if (props.previewMarkup.includes("<sgds-accordion")) return "accordion";
  if (props.previewMarkup.includes("<sgds-card")) return "card";
  if (props.previewMarkup.includes("<sgds-button")) return "button";
  if (props.previewMarkup.includes("<sgds-alert")) return "alert";
  if (props.previewMarkup.includes("<sgds-breadcrumb")) return "breadcrumb";
  return "generic";
});
// Structure-tab size/density toggle. When the Structure data includes grouped
// measurement tokens (for example button sizes or accordion densities), we
// surface them as a segmented control in the preview box. The control is
// derived from the token-group title suffixes so the renderer can support more
// components without new hardcoded options each time.
type SizeToggleConfig = {
  options: { id: string; label: string }[];
  defaultId: string;
  ariaLabel: string;
  attributeName: string;
};

const structureVariantGroupIds = computed(() => {
  const suffixes = (props.tokenGroups ?? [])
    .map((group) => group.title.split("/").pop()?.trim() || "")
    .filter(Boolean);
  return Array.from(new Set(suffixes));
});

const structureVariantAttributeName = computed(() => {
  if (structureKind.value === "accordion") return "density";
  if (
    props.previewMarkup.includes("<sgds-button") ||
    props.previewMarkup.includes("<sgds-close-button") ||
    props.previewMarkup.includes("<sgds-drawer") ||
    props.previewMarkup.includes("<sgds-icon ") ||
    props.previewMarkup.includes("<sgds-icon-button") ||
    props.previewMarkup.includes("<sgds-icon-list") ||
    props.previewMarkup.includes("<sgds-link") ||
    props.previewMarkup.includes("<sgds-modal") ||
    props.previewMarkup.includes("<sgds-overflow-menu") ||
    props.previewMarkup.includes("<sgds-pagination") ||
    props.previewMarkup.includes("<sgds-spinner") ||
    props.previewMarkup.includes("<sgds-switch")
  ) return "size";
  return null;
});

const structureVariantLabel = (id: string) => {
  const labels: Record<string, string> = {
    default: "Default",
    compact: "Compact",
    spacious: "Spacious",
    xs: "Extra small",
    sm: "Small",
    md: "Medium",
    lg: "Large",
    xl: "Extra large",
  };
  return labels[id] ?? id.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const sizeToggleConfig = computed<SizeToggleConfig | null>(() => {
  const attributeName = structureVariantAttributeName.value;
  const options = structureVariantGroupIds.value;
  if (!attributeName || options.length <= 1) return null;

  const defaultId = options.includes("default")
    ? "default"
    : options.includes("md")
      ? "md"
      : options[0];

  const controlName = attributeName === "density" ? "density" : "size";
  const componentLabel = props.previewMarkup.match(/<sgds-([a-z-]+)/)?.[1]?.replace(/-/g, " ") || "component";

  return {
    options: options.map((id) => ({ id, label: structureVariantLabel(id) })),
    defaultId,
    ariaLabel: `${componentLabel} ${controlName}`,
    attributeName,
  };
});

const activeDensityId = ref<string>(sizeToggleConfig.value?.defaultId ?? "default");

const densitySegmentOptions = computed(() =>
  (sizeToggleConfig.value?.options ?? []).map((option) => ({ value: option.id, label: option.label })),
);

const onDensitySegmentChange = (next: string) => {
  const config = sizeToggleConfig.value;
  if (!config) return;
  if (config.options.some((option) => option.id === next)) {
    activeDensityId.value = next;
    hoverKey.value = null;
  }
};

// Reset the active selection when the component kind changes (e.g. navigating
// between an accordion page and a button page with the same renderer).
watch(sizeToggleConfig, (config) => {
  if (!config) return;
  if (!config.options.some((option) => option.id === activeDensityId.value)) {
    activeDensityId.value = config.defaultId;
    hoverKey.value = null;
  }
}, { immediate: true });

let resizeObserver: ResizeObserver | null = null;

const activeDensityGroup = computed(
  () => props.tokenGroups?.find((group) => group.title.endsWith(`/${activeDensityId.value}`)) ?? null,
);
const tokenDisplay = (row?: MeasurementTokenRow) => row?.designToken || "—";
const tokenValue = (row?: MeasurementTokenRow) => row?.rawValue || "—";
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

// Merge the shared button tokens (colour/border/gap) with the tokens of the
// currently-active size group (padding-x/height/min-width/font-size/line-height)
// so hotspot tooltips always reflect the selected size.
const buttonBaseTokenMap = computed(() => {
  const activeSizeTokens = structureKind.value === "button"
    ? activeDensityGroup.value?.tokens ?? []
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
  activeDensityGroup.value?.tokens.map((token) => [token.property, token]) ?? [],
));

const genericTokenRows = computed(() => [
  ...props.tokens,
  ...(props.tokenGroups?.flatMap((group) => group.tokens) ?? []),
]);

const genericTokenMap = computed(() => new Map(
  genericTokenRows.value.map((token) => [token.mapKey || token.property, token]),
));

const allStructureTokenRows = computed(() => [
  ...props.tokens,
  ...(props.tokenGroups?.flatMap((group) => group.tokens) ?? []),
  ...(props.globalTokens ?? []),
  ...(props.globalTokenGroups?.flatMap((group) => group.tokens) ?? []),
]);

const allStructureTokenMap = computed(() => new Map(
  allStructureTokenRows.value.map((token) => [token.mapKey || token.property, token]),
));

const flattenedSemanticTokens = computed(() => [
  ...(props.globalTokenGroups?.flatMap((group) => group.tokens) ?? []),
  ...(props.globalTokens ?? []),
]);

const baseTokenTitle = computed(() => {
  if (structureKind.value === "card") return "sgds/card";
  if (structureKind.value === "accordion") return "sgds/accordion";
  if (structureKind.value === "button") return "sgds/btn";
  if (structureKind.value === "alert") return "sgds/alert";
  if (props.tokenGroups?.[0]?.title) return props.tokenGroups[0].title;
  return "";
});

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
// rows in the token list light up together (see getRelatedRowKeys + the CSS
// at the bottom of the file). Without these proxies the user can only hover
// the two stacked surface hotspots which each highlight a single token.
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

const checkboxBorderHoverBands = computed(() => {
  if (structureKind.value !== "generic") return [];
  const rect = hotspotRects.value["control-border-radius"];
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

const comboBoxBorderHoverBands = computed(() => {
  if (structureKind.value !== "generic" || !isComboBoxStructure.value) return [];
  const rect = hotspotRects.value["border-width"];
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

const tooltipBorderHoverBands = computed(() => {
  if (structureKind.value !== "generic" || !isTooltipStructure.value) return [];
  const rect = hotspotRects.value["border-radius"];
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

const getSizeAnnotationKeys = (key: string | null) => {
  if (!key) return null;
  if (key.includes("border-width")) {
    return null;
  }
  if (key === "input-size") {
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
  if (key.includes("dimension") || key.endsWith("size") || key.includes("-size")) {
    return { heightKey: key, widthKey: key };
  }
  return null;
};

const staticSizeAnnotations = computed(() => {
  if (structureKind.value === "button") return null;
  const annotations: Array<{
    id: string;
    orientation: "height" | "width";
    labelPlacement?: "default" | "left";
    label: string;
    left: number;
    top: number;
    size: number;
  }> = [];

  Object.keys(hotspotRects.value).forEach((key) => {
    const annotationKeys = getSizeAnnotationKeys(key);
    const rect = hotspotRects.value[key];
    if (!annotationKeys || !rect) return;

    if (annotationKeys.heightKey) {
      const heightLeft = structureKind.value === "generic" && key === "input-size"
        ? rect.left - DIMENSION_ANNOTATION_WIDTH - DIMENSION_ANNOTATION_GUTTER
        : rect.left + rect.width + DIMENSION_ANNOTATION_GUTTER;
      annotations.push({
        id: `${key}-height`,
        orientation: "height",
        labelPlacement: structureKind.value === "generic" && key === "input-size" ? "left" : "default",
        label: getStructureValue(allStructureTokenMap.value.get(annotationKeys.heightKey), annotationKeys.heightKey, "height"),
        left: heightLeft,
        top: rect.top,
        size: rect.height,
      });
    }

    if (annotationKeys.widthKey) {
      annotations.push({
        id: `${key}-width`,
        orientation: "width",
        labelPlacement: "default",
        label: getStructureValue(allStructureTokenMap.value.get(annotationKeys.widthKey), annotationKeys.widthKey, "width"),
        left: rect.left,
        top: rect.top + rect.height + DIMENSION_ANNOTATION_GUTTER,
        size: rect.width,
      });
    }
  });

  return annotations;
});

const getPaddingBands = (rect: HotspotRect | null) => {
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

  return [
    ...(topHeight > 0 ? [{ left: rect.left, top: rect.top, width: rect.width, height: topHeight }] : []),
    ...(bottomHeight > 0 ? [{ left: rect.left, top: bottomTop, width: rect.width, height: bottomHeight }] : []),
    ...(leftWidth > 0 ? [{ left: rect.left, top: rect.top, width: leftWidth, height: rect.height }] : []),
    ...(rightWidth > 0 ? [{ left: rightLeft, top: rect.top, width: rightWidth, height: rect.height }] : []),
  ];
};

const accordionPaddingKeys = ["padding-x-default", "padding-y-default", "content-padding"] as const;

const accordionPaddingHoverBandGroups = computed(() => {
  if (structureKind.value !== "accordion") return [];

  return accordionPaddingKeys
    .map((key) => ({
      key,
      bands: getPaddingBands(hotspotRects.value[key]),
    }))
    .filter((group) => group.bands.length);
});

const activeAccordionPaddingBands = computed(() => {
  if (!hoverKey.value || !accordionPaddingKeys.includes(hoverKey.value as (typeof accordionPaddingKeys)[number])) {
    return [];
  }

  return getPaddingBands(hotspotRects.value[hoverKey.value]);
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
      bands: getPaddingBands(hotspotRects.value[key]),
    }))
    .filter((group) => group.bands.length);
});

const activeAlertPaddingBands = computed(() => {
  if (!hoverKey.value || !alertPaddingKeys.includes(hoverKey.value as (typeof alertPaddingKeys)[number])) {
    return [];
  }

  return getPaddingBands(hotspotRects.value[hoverKey.value]);
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


const cardPaddingXHoverBands = computed(() => {
  if (structureKind.value !== "card") return [];
  const rect = hotspotRects.value["padding-x"];
  if (!rect || rect.insetTop == null || rect.insetHeight == null) return [];

  const topHeight = Math.max(0, rect.insetTop);
  const bottomTop = rect.top + rect.insetTop + rect.insetHeight;
  const bottomHeight = Math.max(0, rect.height - rect.insetTop - rect.insetHeight);

  return [
    ...(topHeight > 0 ? [{ left: rect.left, top: rect.top, width: rect.width, height: topHeight }] : []),
    ...(bottomHeight > 0 ? [{ left: rect.left, top: bottomTop, width: rect.width, height: bottomHeight }] : []),
  ];
});

const cardPaddingYHoverBands = computed(() => {
  if (structureKind.value !== "card") return [];
  const rect = hotspotRects.value["padding-y"];
  if (!rect || rect.insetLeft == null || rect.insetWidth == null) return [];

  const leftWidth = Math.max(0, rect.insetLeft);
  const rightLeft = rect.left + rect.insetLeft + rect.insetWidth;
  const rightWidth = Math.max(0, rect.width - rect.insetLeft - rect.insetWidth);

  return [
    ...(leftWidth > 0 ? [{ left: rect.left, top: rect.top, width: leftWidth, height: rect.height }] : []),
    ...(rightWidth > 0 ? [{ left: rightLeft, top: rect.top, width: rightWidth, height: rect.height }] : []),
  ];
});

// Datepicker form-padding-x bands — left + right strips between the input
// border and the DD/MM/YYYY text. Mirrors the card pattern: hide the surface
// hotspot (which would tint the whole field) and draw only the padding strips.
const datepickerFormPaddingXBands = computed(() => {
  if (structureKind.value !== "generic") return [];
  const rect = hotspotRects.value["form-padding-x"];
  if (!rect || rect.insetLeft == null || rect.insetWidth == null) return [];

  const leftWidth = Math.max(0, rect.insetLeft);
  const rightLeft = rect.left + rect.insetLeft + rect.insetWidth;
  const rightWidth = Math.max(0, rect.width - rect.insetLeft - rect.insetWidth);

  return [
    ...(leftWidth > 0 ? [{ left: rect.left, top: rect.top, width: leftWidth, height: rect.height }] : []),
    ...(rightWidth > 0 ? [{ left: rightLeft, top: rect.top, width: rightWidth, height: rect.height }] : []),
  ];
});

const tooltipPaddingXBands = computed(() => {
  if (structureKind.value !== "generic" || !isTooltipStructure.value) return [];
  const rect = hotspotRects.value["padding-x"];
  if (!rect || rect.insetLeft == null || rect.insetWidth == null) return [];

  const leftWidth = Math.max(0, rect.insetLeft);
  const rightLeft = rect.left + rect.insetLeft + rect.insetWidth;
  const rightWidth = Math.max(0, rect.width - rect.insetLeft - rect.insetWidth);

  return [
    ...(leftWidth > 0 ? [{ left: rect.left, top: rect.top, width: leftWidth, height: rect.height }] : []),
    ...(rightWidth > 0 ? [{ left: rightLeft, top: rect.top, width: rightWidth, height: rect.height }] : []),
  ];
});

const tooltipPaddingYBands = computed(() => {
  if (structureKind.value !== "generic" || !isTooltipStructure.value) return [];
  const rect = hotspotRects.value["padding-y"];
  if (!rect || rect.insetTop == null || rect.insetHeight == null) return [];

  const topHeight = Math.max(0, rect.insetTop);
  const bottomTop = rect.top + rect.insetTop + rect.insetHeight;
  const bottomHeight = Math.max(0, rect.height - rect.insetTop - rect.insetHeight);

  return [
    ...(topHeight > 0 ? [{ left: rect.left, top: rect.top, width: rect.width, height: topHeight }] : []),
    ...(bottomHeight > 0 ? [{ left: rect.left, top: bottomTop, width: rect.width, height: bottomHeight }] : []),
  ];
});

// Universal padding bands for all generic components — replaces the
// full-surface hotspot with thin perimeter strips that highlight only the
// padding region (top/bottom/left/right gaps between border and content).
// Keyed by every padding token in the inspectMeta so the renderer can
// iterate without hard-coding component-specific lists.
const genericPaddingBandsByKey = computed(() => {
  if (structureKind.value !== "generic") return {} as Record<string, ReturnType<typeof getPaddingBands>>;
  const result: Record<string, ReturnType<typeof getPaddingBands>> = {};
  Object.keys(inspectMeta.value).forEach((key) => {
    if (!isPaddingOverlayKey(key)) return;
    const bands = getPaddingBands(hotspotRects.value[key] ?? null);
    if (bands.length) result[key] = bands;
  });
  return result;
});

const activeGenericPaddingBands = computed(() => {
  if (structureKind.value !== "generic" || !hoverKey.value) return [];
  return genericPaddingBandsByKey.value[hoverKey.value] ?? [];
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
    lower.includes("border-width")
  );
};

const genericBorderRectKey = computed<string | null>(() => {
  if (structureKind.value !== "generic") return null;
  const radiusKey = Object.keys(inspectMeta.value).find((key) => key.includes("border-radius"));
  if (radiusKey && hotspotRects.value[radiusKey]) return radiusKey;
  const widthKey = Object.keys(inspectMeta.value).find((key) => key.includes("border-width"));
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

const isHoverableStructureKey = (key: string | null) =>
  isPaddingOverlayKey(key) ||
  isGapOverlayKey(key) ||
  key === "border-width" ||
  key === "border-radius" ||
  isControlBorderOverlayKey(key);

const inspectMeta = computed<Record<string, InspectMeta>>(() => {
  if (structureKind.value === "breadcrumb") {
    return {
      "icon-color": {
        label: "icon-color",
        value: tokenDisplay(allStructureTokenMap.value.get("icon-color")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("icon-color")),
        aria: "Inspect breadcrumb icon colour",
      },
      "group-gap": {
        label: "group-gap",
        value: tokenDisplay(allStructureTokenMap.value.get("group-gap")),
        valueSuffix: tokenValue(allStructureTokenMap.value.get("group-gap")),
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
        return [
          key,
          {
            label: row.property,
            value: tokenDisplay(genericTokenMap.value.get(key)),
            valueSuffix: tokenValue(genericTokenMap.value.get(key)),
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
      value: tokenDisplay(densityTokenMap.value.get("padding-x")),
      valueSuffix: tokenValue(densityTokenMap.value.get("padding-x")),
      rows: [
        {
          label: "padding-y",
          value: tokenDisplay(densityTokenMap.value.get("padding-y")),
          valueSuffix: tokenValue(densityTokenMap.value.get("padding-y")),
        },
      ],
      aria: "Inspect accordion header padding x",
    },
    "padding-y-default": {
      label: "padding-x",
      value: tokenDisplay(densityTokenMap.value.get("padding-x")),
      valueSuffix: tokenValue(densityTokenMap.value.get("padding-x")),
      rows: [
        {
          label: "padding-y",
          value: tokenDisplay(densityTokenMap.value.get("padding-y")),
          valueSuffix: tokenValue(densityTokenMap.value.get("padding-y")),
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
          label: "padding-bottom",
          value: tokenDisplay(densityTokenMap.value.get("padding-bottom")),
          valueSuffix: tokenValue(densityTokenMap.value.get("padding-bottom")),
        },
        {
          label: "padding-y",
          value: tokenDisplay(densityTokenMap.value.get("padding-bottom")),
          valueSuffix: tokenValue(densityTokenMap.value.get("padding-bottom")),
        },
      ],
      aria: "Inspect accordion content padding",
    },
  };
});

const resolvedPreviewMarkup = computed(() => {
  const config = sizeToggleConfig.value;
  if (!config) return props.previewMarkup;

  const variantAttribute = activeDensityId.value === config.defaultId ? "" : ` ${config.attributeName}="${activeDensityId.value}"`;
  return props.previewMarkup.replace(/<sgds-[a-z-]+/, (match) => `${match}${variantAttribute}`);
});

const clearPreviewHover = () => {
  hoverKey.value = null;
};

const isAlertCloseEvent = (event: Event) =>
  structureKind.value === "alert" &&
  event.composedPath().some((node) =>
    node instanceof HTMLElement && node.tagName.toLowerCase() === "sgds-close-button",
  );

const preventAlertClose = (event: Event) => {
  if (!isAlertCloseEvent(event)) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const preventAlertCloseKeyboard = (event: KeyboardEvent) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  preventAlertClose(event);
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
  if (structureKind.value === "card" && ["padding-x", "padding-y"].includes(key)) return ["padding-x", "padding-y"];
  if (structureKind.value === "alert" && ["padding-x", "padding-y"].includes(key)) return ["padding-x", "padding-y"];
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
  if (structureKind.value === "accordion" && ["padding-x-default", "padding-y-default"].includes(key)) {
    return ["padding-x-default", "padding-y-default"];
  }
  if (structureKind.value === "accordion" && key === "content-padding") return ["content-padding", "padding-y-default"];
  return [key];
};

// Cross-table design-token highlighting. Any row whose `designToken` value
// matches the currently hovered/selected row's `designToken` lights up too —
// this is what pairs up rows like `page-link-color` (component token) with
// `sgds/link-color-default` (semantic token), or `title-color` and
// `secondary-text-color` that both resolve to `sgds/body-color-default`.
const activeDesignTokens = computed(() => {
  const tokens = new Set<string>();
  const collect = (key: string | null) => {
    if (!key) return;
    const row = allStructureTokenMap.value.get(key);
    if (row?.designToken) tokens.add(row.designToken);
  };
  selectedKeys.value.forEach(collect);
  // Propagate related row keys on hover too — so hovering one border token
  // lights up the other border row without requiring a click.
  if (hoverKey.value) {
    getRelatedRowKeys(hoverKey.value).forEach(collect);
  }
  return tokens;
});

// Same as activeDesignTokens but for row `mapKey` values — used by isRowActive
// to light up related rows on hover (e.g. border-width ↔ border-radius).
const activeRowKeys = computed(() => {
  const keys = new Set<string>();
  selectedKeys.value.forEach((k) => keys.add(k));
  if (hoverKey.value) {
    getRelatedRowKeys(hoverKey.value).forEach((k) => keys.add(k));
  }
  return keys;
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
  if (root.querySelector(`style[data-structure-style="${id}"]`)) return;
  const style = document.createElement("style");
  style.setAttribute("data-structure-style", id);
  style.textContent = css;
  root.appendChild(style);
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
         pointer-events: none !important;
       }`,
    );
    const input = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement | null;
    if (input) {
      input.tabIndex = -1;
      input.readOnly = true;
      input.setAttribute("readonly", "");
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

  await openStructureDropdowns();

  const shell = previewShellRef.value;
  const root = previewMarkupRef.value;
  if (!shell || !root) return;

  if (structureKind.value === "breadcrumb") {
    const breadcrumb = root.querySelector("sgds-breadcrumb") as HTMLElement | null;
    const breadcrumbRoot = breadcrumb?.shadowRoot;
    const breadcrumbRow = breadcrumbRoot?.querySelector(".breadcrumb") as HTMLElement | null;
    if (!breadcrumb || !breadcrumbRoot || !breadcrumbRow) return;

    const rowRect = getRelativeRect(breadcrumbRow, shell);
    const shellBounds = shell.getBoundingClientRect();
    const items = Array.from(breadcrumbRoot.querySelectorAll("sgds-breadcrumb-item")) as HTMLElement[];
    const orderedElements: HTMLElement[] = [];
    const separatorElements: HTMLElement[] = [];

    items.forEach((item) => {
      const anchor = item.querySelector("a") as HTMLElement | null;
      const overflowButton = item.querySelector("sgds-overflow-menu")?.shadowRoot?.querySelector(".overflow-btn") as HTMLElement | null;
      const separator = item.shadowRoot?.querySelector(".separator svg") as HTMLElement | null;

      if (overflowButton) {
        orderedElements.push(overflowButton);
      } else if (anchor) {
        orderedElements.push(anchor);
      }

      if (separator) {
        const rect = separator.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          separatorElements.push(separator);
          orderedElements.push(separator);
        }
      }
    });

    const sortedElements = orderedElements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .sort((left, right) => left.getBoundingClientRect().left - right.getBoundingClientRect().left);

    const gapBands = sortedElements.flatMap((element, index) => {
      const next = sortedElements[index + 1];
      if (!next) return [];

      const currentBounds = element.getBoundingClientRect();
      const nextBounds = next.getBoundingClientRect();
      const width = Math.max(0, nextBounds.left - currentBounds.right);
      if (width <= 0) return [];

      return [{
        left: currentBounds.right - shellBounds.left,
        top: rowRect.top,
        width,
        height: rowRect.height,
      }];
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
      const firstCheckbox = component.querySelector("sgds-checkbox") as HTMLElement | null;
      const firstFormCheck = firstCheckbox?.shadowRoot?.querySelector(".form-check") as HTMLElement | null;
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

    if (component.tagName === "SGDS-COMBO-BOX") {
      const comboRoot = component.shadowRoot;
      const controlGroup = comboRoot?.querySelector(".form-control-group") as HTMLElement | null;
      const inputContainer = comboRoot?.querySelector(".combobox-input-container") as HTMLElement | null;
      const input = comboRoot?.querySelector("input.form-control") as HTMLElement | null;
      const suffixIcon = comboRoot?.querySelector('sgds-icon[name="chevron-down"], sgds-icon[name="chevron-up"]') as HTMLElement | null;

      nextRects["padding-y"] = null;

      if (controlGroup) {
        const controlRect = getRelativeRect(controlGroup, shell);
        nextRects["height"] = controlRect;
        nextRects["border-width"] = controlRect;
        nextRects["border-radius"] = controlRect;

        if (inputContainer && suffixIcon) {
          const inputContainerBounds = inputContainer.getBoundingClientRect();
          const suffixIconBounds = suffixIcon.getBoundingClientRect();
          const shellBounds = shell.getBoundingClientRect();
          const width = Math.max(0, suffixIconBounds.left - inputContainerBounds.right);
          if (width > 0) {
            const gapRect = {
              left: inputContainerBounds.right - shellBounds.left,
              top: controlRect.top,
              width,
              height: controlRect.height,
            };
            Object.keys(nextRects)
              .filter((key) => key.includes("gap"))
              .forEach((key) => {
                nextRects[key] = gapRect;
              });
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

      // Replace surface for all form-* tokens with the actual bordered field.
      Object.keys(nextRects).forEach((key) => {
        if (!key.startsWith("form-") && !key.startsWith("control-")) return;
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
          insetLeft: 0,
          insetTop: Math.max(0, contentStackRect.top - bodyRect.top),
          insetWidth: bodyRect.width,
          insetHeight: contentStackRect.height,
        };

        nextRects["padding-y"] = {
          left: bodyRect.left,
          top: bodyRect.top,
          width: bodyRect.width,
          height: bodyRect.height,
          insetLeft: Math.max(0, contentStackRect.left - bodyRect.left),
          insetTop: 0,
          insetWidth: contentStackRect.width,
          insetHeight: bodyRect.height,
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
    const contentRect = getRelativeRect(assignedContent, shell);
    nextRects["content-padding"] = {
      ...slotRect,
      insetLeft: Math.max(0, contentRect.left - slotRect.left),
      insetTop: Math.max(0, contentRect.top - slotRect.top),
      insetWidth: contentRect.width,
      insetHeight: contentRect.height,
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
  if (!groupTitle?.startsWith("sgds/accordion/")) return null;
  if (row.property === "padding-x") return "padding-x-default";
  if (row.property === "padding-y") return "padding-y-default";
  if (row.property === "padding-top" || row.property === "padding-bottom") return "content-padding";
  return null;
};

const isActiveDensityGroup = (groupTitle?: string) => {
  if (!sizeToggleConfig.value) return true;
  return groupTitle?.endsWith(`/${activeDensityId.value}`) ?? false;
};

const getCollapsedCategory = (
  rows: MeasurementTokenRow[],
  row: MeasurementTokenRow,
  index: number,
) => {
  const currentCategory = (row.category || row.element || "").trim();
  if (!currentCategory) return "";
  if (index === 0) return currentCategory;
  const previousCategory = (rows[index - 1]?.category || rows[index - 1]?.element || "").trim();
  return previousCategory === currentCategory ? "" : currentCategory;
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
        v-if="sizeToggleConfig"
        :model-value="activeDensityId"
        :options="densitySegmentOptions"
        :aria-label="sizeToggleConfig.ariaLabel"
        @update:model-value="onDensitySegmentChange"
      />

      <div
        ref="previewShellRef"
        :class="[
          'sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-560)] sgds:w-full sgds:relative sgds:flex sgds:flex-1 sgds:items-center sgds:justify-center sgds:min-h-[var(--sgds-dimension-224)]',
          structureKind === 'alert' ? 'sgds:min-h-[var(--sgds-dimension-288)] sgds:flex sgds:items-center' : '',
        ]"
      >
        <div
          ref="previewMarkupRef"
          :class="[
            'structure-preview-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full',
            structureKind === 'alert' ? 'sgds:items-center' : '',
          ]"
          @pointerdown.capture="preventAlertClose"
          @click.capture="preventAlertClose"
          @keydown.capture="preventAlertCloseKeyboard"
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
            !(structureKind === 'generic' && isGenericBorderKey(key as string) && genericBorderRectKey === key) &&
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
          }"
        ></div>

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

        <button
          v-for="(band, index) in checkboxBorderHoverBands"
          :key="`checkbox-border-band-${index}`"
          type="button"
          class="accordion-inspect-border-proxy"
          :style="{
            left: `${band.left}px`,
            top: `${band.top}px`,
            width: `${band.width}px`,
            height: `${band.height}px`,
          }"
          @mouseenter="hoverKey = 'control-border-radius'"
          @mouseleave="clearPreviewHover"
          @focus="hoverKey = 'control-border-radius'"
          @blur="clearPreviewHover"
          @click="scrollToTableRow('control-border-radius')"
          aria-label="Inspect checkbox border radius"
        >
          <span class="sgds:sr-only">Inspect checkbox border radius</span>
        </button>

        <button
          v-for="(band, index) in comboBoxBorderHoverBands"
          :key="`combo-box-border-band-${index}`"
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
          aria-label="Inspect combo box border"
        >
          <span class="sgds:sr-only">Inspect combo box border</span>
        </button>

        <button
          v-for="(band, index) in tooltipBorderHoverBands"
          :key="`tooltip-border-band-${index}`"
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
          aria-label="Inspect tooltip border radius"
        >
          <span class="sgds:sr-only">Inspect tooltip border radius</span>
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
          v-if="hoverKey && hotspotRects[hoverKey]"
          :class="[
            'accordion-inspect-tooltip',
            tooltipPlacement === 'right' ? 'accordion-inspect-tooltip--align-right' : '',
          ]"
          :style="tooltipStyle"
        >
          <sgds-badge
            v-if="isSemanticTokenKey(hoverKey)"
            variant="neutral"
            outlined
          >Semantic token</sgds-badge>
          <div class="accordion-inspect-tooltip__grid">
            <div
              v-if="inspectMeta[hoverKey].label"
              :class="getTooltipTagClass(hoverKey)"
            >
              {{ inspectMeta[hoverKey].label }}
            </div>
            <div
              class="accordion-inspect-tooltip__value"
              :class="!inspectMeta[hoverKey].label ? 'accordion-inspect-tooltip__value--span-name' : ''"
            >
              {{ inspectMeta[hoverKey].value }}
            </div>
            <div class="accordion-inspect-tooltip__value accordion-inspect-tooltip__value--raw">
              {{ inspectMeta[hoverKey].valueSuffix }}
            </div>
            <template
              v-for="(row, index) in inspectMeta[hoverKey].rows"
              :key="`${hoverKey}-tooltip-row-${index}`"
            >
              <div v-if="row.label" :class="getTooltipTagClass(hoverKey)">
                {{ row.label }}
              </div>
              <div
                class="accordion-inspect-tooltip__value"
                :class="!row.label ? 'accordion-inspect-tooltip__value--span-name' : ''"
              >
                {{ row.value }}
              </div>
              <div class="accordion-inspect-tooltip__value accordion-inspect-tooltip__value--raw">
                {{ row.valueSuffix }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="baseTokenTitle && (tokens.length || tokenGroups?.length)" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Component tokens</h3>
        <p v-if="structureKind !== 'alert'" class="sgds:m-0 sgds:max-w-[var(--sgds-dimension-760)] sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">
          Component tokens are specific to each component. Use the table title as the prefix:
          <span class="sgds:font-semibold">{{ componentTokenHelper.exampleToken }}</span>
          under
          <span class="sgds:font-semibold">{{ componentTokenHelper.prefix }}</span>
          means
          <span class="sgds:font-semibold">{{ componentTokenHelper.fullToken }}</span>.
        </p>
        <p v-else class="sgds:m-0 sgds:max-w-[var(--sgds-dimension-760)] sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">
          Component tokens are specific to Alert. Use the table title as the prefix:
          <span class="sgds:font-semibold">padding-x</span>
          under
          <span class="sgds:font-semibold">sgds/alert</span>
          means
          <span class="sgds:font-semibold">sgds/alert/padding-x</span>;
          <span class="sgds:font-semibold">bg-emphasis</span>
          under
          <span class="sgds:font-semibold">sgds / alert / info</span>
          means
          <span class="sgds:font-semibold">sgds/alert/info/bg-emphasis</span>.
        </p>
      </div>
      <div v-if="tokens.length" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)]">
        <h5 class="sgds:m-0 sgds:text-heading-xs sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ baseTokenTitle }}</h5>
        <sgds-table tableBorder headerBackground responsive="always">
          <sgds-table-row>
            <sgds-table-head>Category</sgds-table-head>
            <sgds-table-head>Component token</sgds-table-head>
            <sgds-table-head>Semantic token</sgds-table-head>
            <sgds-table-head>Value</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row
            v-for="(row, index) in tokens"
            :key="`${row.element}-${row.property}-${row.designToken}`"
            :class="[isRowActive(row.mapKey || null, row.designToken) ? 'structure-row-active' : '']"
            :data-structure-row-key="row.mapKey || null"
            :data-structure-tone="getStructureTone(row.mapKey || null)"
            tabindex="-1"
            @mouseenter="row.mapKey && isHoverableStructureKey(row.mapKey) && !isBackgroundOverlayKey(row.mapKey) ? (hoverKey = row.mapKey) : null"
            @mouseleave="hoverKey = null"
          >
            <sgds-table-cell>{{ getCollapsedCategory(tokens, row, index) }}</sgds-table-cell>
            <sgds-table-cell>{{ row.property }}</sgds-table-cell>
            <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
            <sgds-table-cell>{{ getStructureValue(row, row.mapKey || row.property) }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>

      <div
        v-for="group in tokenGroups"
        :key="group.title"
        class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)]"
      >
        <h5 class="sgds:m-0 sgds:text-heading-xs sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ group.title }}</h5>
        <sgds-table tableBorder headerBackground responsive="always">
          <sgds-table-row>
            <sgds-table-head>Category</sgds-table-head>
            <sgds-table-head>Component token</sgds-table-head>
            <sgds-table-head>Semantic token</sgds-table-head>
            <sgds-table-head>Value</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row
            v-for="(row, index) in group.tokens"
            :key="`${group.title}-${row.property}-${row.designToken}`"
            :class="[isActiveDensityGroup(group.title) && isRowActive(getRowMapKey(row, group.title), row.designToken) ? 'structure-row-active' : '']"
            :data-structure-row-key="getRowMapKey(row, group.title) || null"
            :data-structure-tone="getStructureTone(getRowMapKey(row, group.title))"
            tabindex="-1"
            @mouseenter="isActiveDensityGroup(group.title) && getRowMapKey(row, group.title) && isHoverableStructureKey(getRowMapKey(row, group.title)) && !isBackgroundOverlayKey(getRowMapKey(row, group.title)) ? (hoverKey = getRowMapKey(row, group.title)) : null"
            @mouseleave="hoverKey = null"
          >
            <sgds-table-cell>{{ getCollapsedCategory(group.tokens, row, index) }}</sgds-table-cell>
            <sgds-table-cell>{{ row.property }}</sgds-table-cell>
            <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
            <sgds-table-cell>{{ getStructureValue(row, getRowMapKey(row, group.title)) }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </div>

    <div v-if="flattenedSemanticTokens.length" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]">
      <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Semantic tokens</h3>
      <sgds-table tableBorder headerBackground responsive="always">
        <sgds-table-row>
          <sgds-table-head>Category</sgds-table-head>
          <sgds-table-head>Semantic token</sgds-table-head>
          <sgds-table-head>Value</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row
          v-for="(row, index) in flattenedSemanticTokens"
          :key="`global-${row.element}-${row.property}-${row.designToken}-${index}`"
          :class="[isRowActive(row.mapKey || null, row.designToken) ? 'structure-row-active' : '']"
          :data-structure-row-key="row.mapKey || null"
          :data-structure-tone="getStructureTone(row.mapKey || null)"
          tabindex="-1"
          @mouseenter="row.mapKey && isHoverableStructureKey(row.mapKey) && !isBackgroundOverlayKey(row.mapKey) ? (hoverKey = row.mapKey) : null"
          @mouseleave="hoverKey = null"
        >
          <sgds-table-cell>{{ getCollapsedCategory(flattenedSemanticTokens, row, index) }}</sgds-table-cell>
          <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
          <sgds-table-cell>{{ getStructureValue(row, row.mapKey || row.property) }}</sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
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

sgds-table-row.structure-row-clickable {
  cursor: pointer;
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
  z-index: 8;
}

.accordion-inspect-padding-proxy {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  z-index: 8;
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
  height: 100%;
  left: 8px;
  position: absolute;
  top: 0;
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
  left: 20px;
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
  left: 0;
  position: absolute;
  top: 8px;
  width: 100%;
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
  left: 50%;
  top: 16px;
  transform: translateX(-50%);
}

.accordion-inspect-annotation--min-width.accordion-inspect-annotation--label-left .accordion-inspect-annotation__label {
  left: 0;
  top: 16px;
  transform: translateX(0);
}

.accordion-inspect-annotation--height.accordion-inspect-annotation--label-left .accordion-inspect-annotation__label {
  left: -8px;
  top: 50%;
  transform: translate(-100%, -50%);
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
  z-index: 10;
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
