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
const structureKind = computed<"accordion" | "card" | "button" | "alert" | "generic">(() => {
  if (props.previewMarkup.includes("<sgds-accordion")) return "accordion";
  if (props.previewMarkup.includes("<sgds-card")) return "card";
  if (props.previewMarkup.includes("<sgds-button")) return "button";
  if (props.previewMarkup.includes("<sgds-alert")) return "alert";
  return "generic";
});
const densityOptions = [
  { id: "default", label: "Default" },
  { id: "compact", label: "Compact" },
  { id: "spacious", label: "Spacious" },
] as const;
type DensityId = (typeof densityOptions)[number]["id"];
const activeDensityId = ref<DensityId>("default");

const densitySegmentOptions = computed(() =>
  densityOptions.map((option) => ({ value: option.id, label: option.label })),
);

const onDensitySegmentChange = (next: string) => {
  if (densityOptions.some((option) => option.id === next)) {
    activeDensityId.value = next as DensityId;
    hoverKey.value = null;
  }
};
let resizeObserver: ResizeObserver | null = null;

const activeDensityGroup = computed(
  () => props.tokenGroups?.find((group) => group.title.endsWith(`/${activeDensityId.value}`)) ?? null,
);
const tokenDisplay = (row?: MeasurementTokenRow) => row?.designToken || "—";
const tokenValue = (row?: MeasurementTokenRow) => row?.rawValue || "—";

const cardTokenMap = computed(() => new Map(
  (props.tokenGroups?.[0]?.tokens ?? []).map((token) => [token.mapKey || token.property, token]),
));

const cardBaseTokenMap = computed(() => new Map(
  props.tokens.map((token) => [token.mapKey || token.property, token]),
));

const accordionBaseTokenMap = computed(() => new Map(
  props.tokens.map((token) => [token.mapKey || token.property, token]),
));

const buttonBaseTokenMap = computed(() => new Map(
  props.tokens.map((token) => [token.mapKey || token.property, token]),
));

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

const baseTokenTitle = computed(() => {
  if (structureKind.value === "card") return "sgds/card";
  if (structureKind.value === "accordion") return "sgds/accordion";
  if (structureKind.value === "button") return "sgds/button";
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

const getStructureTone = (key: string | null) => {
  if (isPaddingOverlayKey(key)) return "padding";
  if (isGapOverlayKey(key)) return "gap";
  if (isBorderOrColorOverlayKey(key)) return "border";
  return "border";
};

const inspectMeta = computed<Record<string, InspectMeta>>(() => {
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
      "leading-icon-color": { label: "", value: tokenDisplay(globalTokenMap.value.get("leading-icon-color")), valueSuffix: tokenValue(globalTokenMap.value.get("leading-icon-color")), aria: "Inspect button leading icon colour" },
      "trailing-icon-color": { label: "", value: tokenDisplay(globalTokenMap.value.get("trailing-icon-color")), valueSuffix: tokenValue(globalTokenMap.value.get("trailing-icon-color")), aria: "Inspect button trailing icon colour" },
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
  if (structureKind.value !== "accordion") return props.previewMarkup;
  const densityAttribute = activeDensityId.value === "default" ? "" : ` density="${activeDensityId.value}"`;
  return props.previewMarkup.replace("<sgds-accordion", `<sgds-accordion${densityAttribute}`);
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
  if (structureKind.value === "accordion" && ["padding-x-default", "padding-y-default"].includes(key)) {
    return ["padding-x-default", "padding-y-default"];
  }
  if (structureKind.value === "accordion" && key === "content-padding") return ["content-padding", "padding-y-default"];
  return [key];
};

const isRowActive = (key: string | null) => Boolean(key && selectedKeys.value.includes(key));

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
  } else {
    const rootElement = previewMarkupRef.value?.firstElementChild as HTMLElement | null;
    const tagName = rootElement?.tagName.toLowerCase();
    if (tagName?.startsWith("sgds-")) {
      await customElements.whenDefined(tagName);
    }
  }

  const shell = previewShellRef.value;
  const root = previewMarkupRef.value;
  if (!shell || !root) return;

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

const isActiveDensityGroup = (groupTitle?: string) =>
  structureKind.value === "accordion"
    ? groupTitle?.endsWith(`/${activeDensityId.value}`) ?? false
    : true;
</script>

<template>
  <div ref="rootRef" class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <div
      class="structure-demo-box sgds:flex sgds:flex-col sgds:gap-component-sm sgds:border sgds:border-muted sgds:rounded-xl sgds:overflow-visible sgds:min-h-[var(--sgds-dimension-288)] sgds:px-component-md sgds:py-component-sm"
      :data-hover-key="hoverKey || null"
      @mouseleave="clearPreviewHover"
    >
      <SegmentedControl
        v-if="structureKind === 'accordion'"
        :model-value="activeDensityId"
        :options="densitySegmentOptions"
        aria-label="Accordion density"
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
            !isBackgroundOverlayKey(key as string) &&
            !(structureKind === 'card' && ['padding-x', 'padding-y'].includes(key as string)) &&
            !(structureKind === 'accordion' && isAccordionPaddingKey(key as string)) &&
            !(structureKind === 'alert' && isAlertPaddingKey(key as string)) &&
            !(structureKind === 'alert' && ['border-color', 'border-width', 'border-radius'].includes(key as string))
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
            v-for="row in tokens"
            :key="`${row.element}-${row.property}-${row.designToken}`"
            :class="isRowActive(row.mapKey || null) ? 'structure-row-active' : ''"
            :data-structure-row-key="row.mapKey || null"
            :data-structure-tone="getStructureTone(row.mapKey || null)"
            tabindex="-1"
            @mouseenter="row.mapKey && !isBackgroundOverlayKey(row.mapKey) ? (hoverKey = row.mapKey) : null"
            @mouseleave="hoverKey = null"
          >
            <sgds-table-cell>{{ row.element || row.category }}</sgds-table-cell>
            <sgds-table-cell>{{ row.property }}</sgds-table-cell>
            <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
            <sgds-table-cell>{{ row.rawValue || "—" }}</sgds-table-cell>
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
            v-for="row in group.tokens"
            :key="`${group.title}-${row.property}-${row.designToken}`"
            :class="isActiveDensityGroup(group.title) && isRowActive(getRowMapKey(row, group.title)) ? 'structure-row-active' : ''"
            :data-structure-row-key="getRowMapKey(row, group.title) || null"
            :data-structure-tone="getStructureTone(getRowMapKey(row, group.title))"
            tabindex="-1"
            @mouseenter="isActiveDensityGroup(group.title) && getRowMapKey(row, group.title) && !isBackgroundOverlayKey(getRowMapKey(row, group.title)) ? (hoverKey = getRowMapKey(row, group.title)) : null"
            @mouseleave="hoverKey = null"
          >
            <sgds-table-cell>{{ row.element || row.category }}</sgds-table-cell>
            <sgds-table-cell>{{ row.property }}</sgds-table-cell>
            <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
            <sgds-table-cell>{{ row.rawValue || "—" }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </div>

    <div v-if="globalTokens?.length || props.globalTokenGroups?.length" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]">
      <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Semantic tokens</h3>
      <div
        v-for="group in props.globalTokenGroups"
        :key="group.title"
        class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]"
      >
        <h5 class="sgds:m-0 sgds:text-heading-xs sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ group.title }}</h5>
        <sgds-table tableBorder headerBackground responsive="always">
          <sgds-table-row>
            <sgds-table-head>Category</sgds-table-head>
            <sgds-table-head>Element</sgds-table-head>
            <sgds-table-head>Semantic token</sgds-table-head>
            <sgds-table-head>Value</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row
            v-for="row in group.tokens"
            :key="`global-group-${group.title}-${row.property}-${row.designToken}`"
            :class="isRowActive(row.mapKey || null) ? 'structure-row-active' : ''"
            :data-structure-row-key="row.mapKey || null"
            :data-structure-tone="getStructureTone(row.mapKey || null)"
            tabindex="-1"
            @mouseenter="row.mapKey && !isBackgroundOverlayKey(row.mapKey) ? (hoverKey = row.mapKey) : null"
            @mouseleave="hoverKey = null"
          >
            <sgds-table-cell>{{ row.category }}</sgds-table-cell>
            <sgds-table-cell>{{ row.element }}</sgds-table-cell>
            <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
            <sgds-table-cell>{{ row.rawValue || "—" }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
      <sgds-table tableBorder headerBackground responsive="always">
        <sgds-table-row>
          <sgds-table-head>Category</sgds-table-head>
          <sgds-table-head>Element</sgds-table-head>
          <sgds-table-head>Semantic token</sgds-table-head>
          <sgds-table-head>Value</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row
          v-for="row in globalTokens"
          :key="`global-${row.element}-${row.property}-${row.designToken}`"
          :class="isRowActive(row.mapKey || null) ? 'structure-row-active' : ''"
          :data-structure-row-key="row.mapKey || null"
          :data-structure-tone="getStructureTone(row.mapKey || null)"
          tabindex="-1"
          @mouseenter="row.mapKey && !isBackgroundOverlayKey(row.mapKey) ? (hoverKey = row.mapKey) : null"
          @mouseleave="hoverKey = null"
        >
          <sgds-table-cell>{{ row.category }}</sgds-table-cell>
          <sgds-table-cell>{{ row.element || (row.mapKey === "link-color-emphasis" && isRowActive(row.mapKey) ? "Link" : "") }}</sgds-table-cell>
          <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
          <sgds-table-cell>{{ row.rawValue || "—" }}</sgds-table-cell>
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

sgds-table-row.structure-row-active[data-structure-tone="border"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 52%, transparent);
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

.structure-demo-box[data-hover-key] .accordion-inspect-hotspot[aria-label^="Inspect component"][data-active="true"][data-structure-tone="border"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 38%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
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

/* Button hotspot styles */
.structure-demo-box[data-hover-key="background"] .accordion-inspect-hotspot[aria-label="Inspect button background colour"],
.structure-demo-box[data-hover-key="hover-bg"] .accordion-inspect-hotspot[aria-label="Inspect button hover background"],
.structure-demo-box[data-hover-key="text-color"] .accordion-inspect-hotspot[aria-label="Inspect button text colour"],
.structure-demo-box[data-hover-key="height"] .accordion-inspect-hotspot[aria-label="Inspect button height"],
.structure-demo-box[data-hover-key="min-width"] .accordion-inspect-hotspot[aria-label="Inspect button min width"],
.structure-demo-box[data-hover-key="font-size"] .accordion-inspect-hotspot[aria-label="Inspect button font size"],
.structure-demo-box[data-hover-key="line-height"] .accordion-inspect-hotspot[aria-label="Inspect button line height"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="border-width"] .accordion-inspect-hotspot[aria-label="Inspect button border width"],
.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect button border radius"] {
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="border-radius"] .accordion-inspect-hotspot[aria-label="Inspect button border radius"] {
  border-radius: 8px;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"] {
  background: color-mix(in srgb, var(--sgds-accent-surface-muted) 52%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-accent-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="padding-x"] .accordion-inspect-hotspot[aria-label="Inspect button padding x"]::before {
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

.structure-demo-box[data-hover-key="gap"] .accordion-inspect-hotspot[aria-label="Inspect button gap"] {
  background: color-mix(in srgb, var(--sgds-purple-surface-muted) 46%, transparent);
  mix-blend-mode: multiply;
  outline: 1px dashed var(--sgds-purple-border-color-default);
  outline-offset: 0;
}

.structure-demo-box[data-hover-key="leading-icon-color"] .accordion-inspect-hotspot[aria-label="Inspect button leading icon colour"],
.structure-demo-box[data-hover-key="trailing-icon-color"] .accordion-inspect-hotspot[aria-label="Inspect button trailing icon colour"] {
  background: color-mix(in srgb, var(--sgds-neutral-surface-muted) 68%, transparent);
  outline: 1px dashed var(--sgds-neutral-border-color-default);
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
