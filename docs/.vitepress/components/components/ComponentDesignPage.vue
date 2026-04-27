<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Section from "../foundations/Section.vue";
import AnatomySection from "./AnatomySection.vue";
import BehaviourSection from "./BehaviourSection.vue";
import InteractivePropertyDemo from "./InteractivePropertyDemo.vue";
import AlertPlayground from "./AlertPlayground.vue";
import ComponentPlayground from "./ComponentPlayground.vue";
import StructureSection from "./StructureSection.vue";
import BestPracticesSection from "./BestPracticesSection.vue";
import MotionSection from "./MotionSection.vue";
import AccessibilitySection from "./AccessibilitySection.vue";
import UpdatesSection from "./UpdatesSection.vue";
import { getComponentDoc } from "../../data/component-docs";
import { accordionV2Data } from "../../data/accordion-v2";

const props = defineProps<{
  componentKey: string;
  docOverride?: ReturnType<typeof getComponentDoc>;
}>();

const doc = computed(() => props.docOverride ?? getComponentDoc(props.componentKey));
const currentPageKey = computed(() => doc.value?.key ?? props.componentKey);

const toOptionValue = (label: string, index: number) => {
  const normalised = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalised || `option-${index + 1}`;
};

// Configuration demos: prefer the doc's own configurationDemos; fall back to
// accordion-v2's variantPropertyDemos for the accordion page until that data is
// migrated into component-docs.ts. For all other components, wrap flat demos
// into the same stacked InteractivePropertyDemo shell so the configuration
// section matches the accordion page template.
const configurationDemos = computed(() => {
  if (doc.value?.configurationDemos?.length) return doc.value.configurationDemos;
  if (currentPageKey.value === "accordion") return accordionV2Data.variantPropertyDemos;
  return (doc.value?.demos ?? []).map((demo, index) => ({
    title: demo.title,
    description: demo.description,
    controlLabel: `${doc.value?.title || "Component"} ${demo.title}`,
    defaultValue: toOptionValue(demo.title, index),
    options: [
      {
        label: demo.title,
        value: toOptionValue(demo.title, index),
        markup: demo.markup,
      },
    ],
  }));
});

const mergedBestPractices = computed(() => [
  ...(doc.value?.usage?.contentGuidelines ?? []),
  ...(doc.value?.usage?.bestPractices ?? []),
]);

const measurementExamples = computed(() => {
  if (!doc.value) return [];
  if (doc.value.measurements) return doc.value.measurements;
  return doc.value.demos.slice(0, 2);
});

const rawValueByDesignToken: Record<string, string> = {
  "sgds/bg-transparent": "Transparent",
  "sgds/bg-translucent-subtle": "oklch(from #0E0E0E l c h / 0.05)",
  "sgds/body-color-default": "#1A1A1A",
  "sgds/border-color-muted": "#DFDFDF",
  "sgds/border-width/1": "1px",
  "sgds/border-radius/md": "8px",
  "sgds/color-default": "#1A1A1A",
  "sgds/color-fixed-light": "#F3F3F3",
  "sgds/color-subtle": "#525252",
  "sgds/danger/border-color-muted": "#F8D7D7",
  "sgds/danger/surface-default": "#CF2323",
  "sgds/danger/surface-muted": "#FCF1F1",
  "sgds/dimension/256": "256px",
  "sgds/dimension/48": "48px",
  "sgds/dimension/96": "96px",
  "sgds/font-size/16": "16px",
  "sgds/gap/2-xs": "4px",
  "sgds/gap/xs": "8px",
  "sgds/gap/sm": "12px",
  "sgds/gap/md": "16px",
  "sgds/gap/lg": "20px",
  "sgds/line-height/24": "24px",
  "sgds/link-color-default": "#0269D0",
  "sgds/link-color-emphasis": "#0151A0",
  "sgds/neutral/border-color-muted": "#DFDFDF",
  "sgds/neutral/surface-emphasis": "#525252",
  "sgds/neutral/surface-muted": "#F3F3F3",
  "sgds/padding/xs": "4px",
  "sgds/padding/md": "16px",
  "sgds/padding/lg": "20px",
  "sgds/padding/xl": "24px",
  "sgds/padding/2-xl": "32px",
  "sgds/primary/border-color-muted": "#E1DBFB",
  "sgds/primary/surface-default": "#6B4FEB",
  "sgds/primary/surface-emphasis": "#523ABC",
  "sgds/primary/surface-muted": "#F4F2FE",
  "sgds/success/border-color-muted": "#B1EDCB",
  "sgds/success/surface-default": "#0E7C3D",
  "sgds/success/surface-muted": "#E3F9ED",
  "sgds/surface-default": "#FFFFFF",
  "sgds/warning/border-color-muted": "#FCDE63",
  "sgds/warning/surface-default": "#FCDE63",
  "sgds/warning/surface-muted": "#FEF4CB",
};

const fallbackComponentTokensByKey: Record<string, string[]> = {
  accordion: ["sgds/padding/lg", "sgds/padding/md", "sgds/padding/xl", "sgds/padding/xs", "sgds/gap/md", "sgds/border-color-muted", "sgds/border-radius/md", "sgds/border-width/1", "sgds/font-size/body-sm", "sgds/font-size/heading-sm", "sgds/font-size/subtitle-md", "sgds/font-size/subtitle-sm", "sgds/font-weight/semibold", "sgds/line-height/2-xs", "sgds/line-height/sm", "sgds/line-height/xs", "sgds/color-default", "sgds/color-subtle"],
  badge: ["sgds/padding/3-xs", "sgds/padding/none", "sgds/padding/xs", "sgds/border-color-muted", "sgds/border-color-transparent", "sgds/border-radius/sm", "sgds/border-width/1", "sgds/font-size/14", "sgds/font-weight/regular", "sgds/line-height/20", "sgds/color-fixed-dark", "sgds/color-fixed-light", "sgds/surface-fixed-light", "sgds/primary/border-color/muted", "sgds/primary/color/fixed-dark", "sgds/primary/surface/default", "sgds/primary/surface/muted", "sgds/success/border-color/muted"],
  breadcrumb: ["sgds/gap/xs", "sgds/color-default", "sgds/link-color-default", "sgds/link-color-emphasis"],
  button: ["sgds/padding/2-xs", "sgds/gap/none"],
  card: ["sgds/bg-translucent-subtle", "sgds/opacity/50"],
  checkbox: ["sgds/font-size/16", "sgds/font-weight/regular", "sgds/form/color/default", "sgds/form/gap/md", "sgds/form/gap/sm", "sgds/form/padding-inline/sm", "sgds/form/surface/default", "sgds/form/height/sm", "sgds/form/width/xs", "sgds/form/border-radius/md", "sgds/form/border-width/default", "sgds/form/border-width/thick", "sgds/border-color/default", "sgds/border-color/emphasis", "sgds/border-color/transparent", "sgds/form/outline/focus", "sgds/form/outline-offset/focus", "sgds/form/primary/surface/default", "sgds/form/primary/surface/emphasis", "sgds/form/danger/surface/default", "sgds/form/danger/border-color/default", "sgds/form/danger/color/default", "sgds/border-width/2", "sgds/opacity/50"],
  "close-button": ["sgds/border-color-transparent", "sgds/border-radius/sm", "sgds/border-width/1", "sgds/color-fixed-dark", "sgds/color-fixed-light", "sgds/icon-size/sm", "sgds/bg-translucent", "sgds/bg-transparent", "sgds/dimension/24", "sgds/dimension/32", "sgds/close-btn-border-radius", "sgds/outline-focus", "sgds/outline-offset-focus"],
  "combo-box": ["sgds/gap/xs", "sgds/icon-size/md", "sgds/form/border-width/default", "sgds/dimension/48", "sgds/outline-focus", "sgds/outline-offset-focus"],
  datepicker: ["sgds/form/border-radius/md", "sgds/form/padding/x"],
  "description-list": ["sgds/padding/lg", "sgds/padding/xl", "sgds/gap/2-xl", "sgds/gap/2-xs", "sgds/gap/xs", "sgds/border-color-muted", "sgds/border-radius/md", "sgds/border-width/1", "sgds/font-size/16", "sgds/font-size/24", "sgds/font-weight/regular", "sgds/font-weight/semibold", "sgds/line-height/24", "sgds/line-height/32", "sgds/color-default", "sgds/color-subtle", "sgds/dimension/280"],
  divider: ["sgds/border-color-muted", "sgds/border-width/1", "sgds/border-width/2", "sgds/border-width/4"],
  drawer: ["sgds/padding/2-xl", "sgds/padding/lg", "sgds/padding/none", "sgds/gap/xs", "sgds/font-size/24", "sgds/color-default", "sgds/color-subtle", "sgds/surface-default", "sgds/bg-overlay", "sgds/dimension/512", "sgds/dimension/768", "sgds/dimension/1024"],
  dropdown: ["sgds/padding/lg", "sgds/padding/none", "sgds/padding/sm", "sgds/padding/xs", "sgds/gap/sm", "sgds/border-radius/md", "sgds/color-default", "sgds/surface-default", "sgds/bg-translucent-subtle", "sgds/bg-transparent", "sgds/primary/color/default", "sgds/dimension/192", "sgds/dimension/480", "sgds/opacity/50"],
  "file-upload": ["sgds/border-color-muted", "sgds/color-muted", "sgds/form/border-radius/md", "sgds/form/border-width/default", "sgds/form/gap/2-xl", "sgds/form/gap/lg", "sgds/form/gap/md", "sgds/form/gap/xl", "sgds/form/padding/x", "sgds/form/padding/y", "sgds/form/success/color/default", "sgds/form/surface/default"],
  footer: ["sgds/padding/2-xl", "sgds/padding/3-xl", "sgds/padding/lg", "sgds/padding/none", "sgds/padding/xl", "sgds/gap/2-xl", "sgds/gap/3-xl", "sgds/gap/lg", "sgds/gap/md", "sgds/gap/sm", "sgds/gap/xl", "sgds/gap/xs", "sgds/border-color-default", "sgds/border-width/1", "sgds/font-size/14", "sgds/font-size/24", "sgds/font-size/28", "sgds/font-weight/regular"],
  icon: ["sgds/icon-size/2-xl", "sgds/icon-size/3-xl", "sgds/icon-size/lg", "sgds/icon-size/md", "sgds/icon-size/sm", "sgds/icon-size/xl", "sgds/icon-size/xs"],
  "icon-button": ["sgds/dimension/32", "sgds/dimension/40", "sgds/dimension/48", "sgds/dimension/56"],
  "icon-card": ["sgds/padding/none", "sgds/padding/xl", "sgds/border-color-transparent", "sgds/border-width/1", "sgds/bg-translucent-subtle", "sgds/opacity/50"],
  "icon-list": ["sgds/gap/xs", "sgds/font-size/14", "sgds/font-size/20", "sgds/line-height/20", "sgds/line-height/32"],
  "image-card": ["sgds/padding/none", "sgds/padding/xl", "sgds/border-color-transparent", "sgds/border-width/1", "sgds/bg-translucent-subtle", "sgds/opacity/50"],
  input: ["sgds/gap/sm", "sgds/gap/xs", "sgds/form/border-radius/md", "sgds/form/color/subtle", "sgds/form/outline/focus"],
  link: ["sgds/font-size/12", "sgds/font-size/14", "sgds/font-size/16", "sgds/font-size/20", "sgds/line-height/16", "sgds/line-height/20", "sgds/line-height/24", "sgds/line-height/32", "sgds/color-default", "sgds/color-fixed-dark", "sgds/color-fixed-light", "sgds/link-color-default", "sgds/link-color-emphasis", "sgds/icon-size/lg", "sgds/icon-size/md", "sgds/icon-size/sm", "sgds/icon-size/xl", "sgds/danger/color/default"],
  mainnav: ["sgds/padding/md", "sgds/padding/sm", "sgds/gap/xl", "sgds/gap/xs", "sgds/border-color-translucent", "sgds/border-width/1", "sgds/border-width/4", "sgds/color-default", "sgds/link-color-default", "sgds/link-color-emphasis", "sgds/surface-default", "sgds/bg-translucent-subtle", "sgds/primary/border-color/default", "sgds/primary/color/default", "sgds/opacity/50"],
  masthead: ["sgds/icon-size/sm", "sgds/mainnav-max-width", "sgds/mainnav-mobile-padding-x", "sgds/mainnav-padding-x"],
  modal: ["sgds/padding/md", "sgds/padding/xl", "sgds/gap/2-xl", "sgds/gap/md", "sgds/gap/sm", "sgds/border-radius/md", "sgds/font-size/24", "sgds/line-height/24", "sgds/line-height/40", "sgds/color-subtle", "sgds/surface-default", "sgds/bg-overlay", "sgds/dimension/480", "sgds/dimension/640", "sgds/dimension/800"],
  "overflow-menu": ["sgds/border-radius/sm", "sgds/bg-translucent-subtle", "sgds/bg-transparent", "sgds/dimension/24", "sgds/dimension/32", "sgds/outline-focus", "sgds/outline-offset-focus"],
  pagination: ["sgds/gap/2-xs", "sgds/border-radius/md", "sgds/font-size/14", "sgds/color-fixed-light", "sgds/bg-transparent", "sgds/primary/color/default", "sgds/primary/surface/default", "sgds/primary/surface/translucent", "sgds/dimension/40", "sgds/dimension/48", "sgds/opacity/50"],
  "progress-bar": ["sgds/gap/2-xs", "sgds/font-size/14", "sgds/color-subtle", "sgds/bg-translucent", "sgds/primary/surface/default", "sgds/neutral/surface/default", "sgds/dimension/4"],
  "quantity-toggle": ["sgds/form/gap/lg"],
  radio: ["sgds/form/danger/surface/default", "sgds/form/gap/md", "sgds/form/gap/sm", "sgds/opacity/50"],
  sidenav: ["sgds/padding/2-xs", "sgds/padding/3-xl", "sgds/padding/sm", "sgds/padding/xl", "sgds/gap/xs", "sgds/border-radius/md", "sgds/font-size/16", "sgds/font-weight/regular", "sgds/font-weight/semibold", "sgds/line-height/24", "sgds/color-default", "sgds/link-color-default", "sgds/link-color-emphasis", "sgds/bg-translucent-subtle", "sgds/primary/bg/translucent", "sgds/primary/color/emphasis", "sgds/primary/surface/translucent"],
  skeleton: ["sgds/gap/xs", "sgds/border-radius/sm", "sgds/bg-translucent", "sgds/bg-translucent-subtle"],
  spinner: ["sgds/gap/2-xs", "sgds/font-size/14", "sgds/surface-default", "sgds/surface-fixed-dark", "sgds/surface-fixed-light", "sgds/surface-inverse", "sgds/bg-translucent", "sgds/primary/surface/default", "sgds/neutral/color/default", "sgds/neutral/surface/default", "sgds/dimension/16", "sgds/dimension/24", "sgds/dimension/32", "sgds/dimension/48", "sgds/dimension/64"],
  stepper: ["sgds/padding/2-xs", "sgds/padding/xl", "sgds/gap/sm", "sgds/border-color-translucent", "sgds/border-color-transparent", "sgds/border-width/2", "sgds/color-default", "sgds/color-fixed-light", "sgds/color-subtle", "sgds/bg-translucent", "sgds/bg-transparent", "sgds/primary/border-color/default", "sgds/primary/color/default", "sgds/primary/color/emphasis", "sgds/primary/surface/default", "sgds/primary/surface/emphasis"],
  subnav: ["sgds/padding/2-xl", "sgds/padding/lg", "sgds/padding/md", "sgds/padding/none", "sgds/padding/sm", "sgds/gap/lg", "sgds/gap/md", "sgds/gap/none", "sgds/gap/xl", "sgds/border-color-muted", "sgds/border-width/0", "sgds/border-width/1", "sgds/border-width/2", "sgds/font-size/14", "sgds/color-default", "sgds/link-color-default", "sgds/link-color-emphasis", "sgds/icon-size/md"],
  switch: ["sgds/border-color-transparent", "sgds/font-size/14", "sgds/font-size/20", "sgds/form/border-radius/full", "sgds/form/border-width/default", "sgds/form/gap/lg", "sgds/form/height/2-xs", "sgds/form/height/lg", "sgds/form/height/md", "sgds/form/height/sm", "sgds/form/padding-inline/sm", "sgds/form/primary/surface/default", "sgds/form/primary/surface/emphasis", "sgds/form/surface/emphasis", "sgds/form/surface/subtle", "sgds/form/width/2-xs", "sgds/form/width/3-xl", "sgds/form/width/md"],
  "system-banner": ["sgds/padding/2-xs", "sgds/padding/sm", "sgds/gap/2-xs", "sgds/gap/sm", "sgds/gap/xl", "sgds/gap/xs", "sgds/font-size/12", "sgds/font-size/14", "sgds/font-weight/regular", "sgds/line-height/16", "sgds/line-height/20", "sgds/color-fixed-light", "sgds/surface-fixed-dark", "sgds/dimension/64", "sgds/dimension/872"],
  tab: ["sgds/gap/xl", "sgds/gap/xs", "sgds/border-color-muted", "sgds/border-radius/md", "sgds/border-width/1", "sgds/border-width/4", "sgds/font-size/14", "sgds/color-default", "sgds/color-fixed-light", "sgds/bg-translucent", "sgds/bg-translucent-subtle", "sgds/primary/color/default", "sgds/primary/surface/default", "sgds/opacity/50"],
  table: ["sgds/padding/md", "sgds/padding/sm", "sgds/border-color-emphasis", "sgds/border-color-muted", "sgds/border-width/0", "sgds/border-width/1", "sgds/font-weight/semibold", "sgds/surface-raised", "sgds/dimension/56"],
  "table-of-contents": ["sgds/padding/none", "sgds/gap/md", "sgds/gap/xl", "sgds/font-size/24", "sgds/font-weight/semibold", "sgds/margin/none"],
  textarea: ["sgds/form/padding/x", "sgds/form/padding/y", "sgds/dimension/136"],
  "thumbnail-card": ["sgds/padding/none", "sgds/padding/xl", "sgds/border-color-transparent", "sgds/border-width/1", "sgds/bg-translucent-subtle", "sgds/dimension/128", "sgds/dimension/64", "sgds/opacity/50"],
  toast: ["sgds/padding/md", "sgds/padding/xl", "sgds/gap/2-xs", "sgds/gap/sm", "sgds/border-radius/md", "sgds/font-size/label-sm", "sgds/font-size/subtitle-sm", "sgds/font-weight/regular", "sgds/font-weight/semibold", "sgds/line-height/2-xs", "sgds/color-subtle", "sgds/link-color-default", "sgds/surface-default", "sgds/primary/color/default", "sgds/success/color/default", "sgds/danger/color/default", "sgds/warning/color/fixed-light", "sgds/dimension/280"],
  tooltip: ["sgds/padding/sm", "sgds/padding/xs", "sgds/border-radius/md", "sgds/font-size/14", "sgds/color-fixed-light", "sgds/surface-fixed-dark", "sgds/dimension/320", "sgds/z-index-overlay"],
};

const defaultComponentTokens = ["sgds/padding/lg", "sgds/gap/sm", "sgds/border-color-muted", "sgds/border-radius/md", "sgds/border-width/1", "sgds/color-default", "sgds/surface-default"];

const tokenToCssVarName = (token: string) => `--${token.replace(/\//g, "-")}`;

const resolveTokenRawValue = (token: string) => {
  if (typeof window !== "undefined") {
    const runtimeValue = getComputedStyle(document.documentElement)
      .getPropertyValue(tokenToCssVarName(token))
      .trim();
    if (runtimeValue) return runtimeValue;
  }
  return rawValueByDesignToken[token] ?? "";
};

const tokenCategoryFromToken = (token: string) => {
  const [, category = ""] = token.match(/^sgds\/([^/]+)/) ?? [];
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes("padding")) return "Padding";
  if (lowerCategory.includes("gap")) return "Gap";
  if (lowerCategory.includes("border")) return "Border";
  if (lowerCategory.includes("font") || lowerCategory.includes("line-height")) return "Typography";
  if (lowerCategory.includes("color") || lowerCategory.includes("surface") || lowerCategory.includes("bg")) return "Colour";
  if (lowerCategory.includes("dimension") || lowerCategory.includes("icon-size")) return "Size";
  if (["primary", "success", "danger", "warning", "neutral", "accent", "link"].includes(lowerCategory)) return "Colour";
  if (lowerCategory === "form") return "Form";
  return category ? category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "";
};

const componentTokenNameFromToken = (token: string) => token.replace(/^sgds\//, "").replace(/\//g, "-");

const normaliseComponentTokenRows = (rows: Array<{ category?: string; name: string; value: string; rawValue?: string; mapKey?: string }>) => {
  let previousCategory = "";
  return rows.map((row) => {
    const resolvedCategory = row.category ?? tokenCategoryFromToken(row.value);
    const category = resolvedCategory === previousCategory ? "" : resolvedCategory;
    previousCategory = resolvedCategory;
    return {
      ...row,
      category,
      rawValue: row.rawValue ?? resolveTokenRawValue(row.value),
    };
  });
};

const measurementTokens = computed(() => {
  if (currentPageKey.value === "alert" && doc.value?.componentTokenGroups?.length) {
    const categoryByName: Record<string, string> = {
      "padding-x": "Padding",
      "padding-y": "",
      "content-padding-right": "",
      gap: "Gap",
      "title-gap": "",
      "content-gap": "",
      "border-width": "Border",
      "border-radius": "",
    };
    return doc.value.componentTokenGroups[0].rows.map((row) => ({
      element: categoryByName[row.name] ?? "",
      property: row.name,
      designToken: row.value,
      rawValue: resolveTokenRawValue(row.value),
      mapKey: row.name,
    }));
  }
  return doc.value?.measurementTokens ?? [];
});
const measurementTokenGroups = computed(() => {
  if (currentPageKey.value === "alert" && doc.value?.semanticTokenGroups?.length) {
    return doc.value.semanticTokenGroups.map((group) => ({
      title: group.title,
      tokens: group.rows.map((row, index) => ({
        element: index === 0 ? "Colour" : "",
        property: row.name,
        designToken: row.value,
        rawValue: resolveTokenRawValue(row.value),
        mapKey: row.name === "border-color" && group.title.endsWith("/ success") ? row.name : undefined,
      })),
    }));
  }
  return doc.value?.measurementTokenGroups ?? [];
});
const fallbackComponentTokenGroups = computed(() => {
  const tokens = fallbackComponentTokensByKey[currentPageKey.value] ?? defaultComponentTokens;
  return [
    {
      title: `sgds/${currentPageKey.value}`,
      rows: normaliseComponentTokenRows(tokens.map((token) => ({
        category: tokenCategoryFromToken(token),
        name: componentTokenNameFromToken(token),
        value: token,
        rawValue: resolveTokenRawValue(token),
      }))),
    },
  ];
});
const componentTokenGroups = computed(() => {
  if (currentPageKey.value === "alert") return [];
  if (doc.value?.componentTokenGroups?.length) {
    return doc.value.componentTokenGroups.map((group) => ({
      ...group,
      rows: normaliseComponentTokenRows(group.rows),
    }));
  }
  return fallbackComponentTokenGroups.value;
});
const semanticTokenGroups = computed(() => (currentPageKey.value === "alert" ? [] : doc.value?.semanticTokenGroups ?? []));
const globalTokens = computed(() => doc.value?.globalTokens ?? []);
const globalTokenGroups = computed(() => {
  if (currentPageKey.value === "alert") return [];
  return doc.value?.globalTokenGroups ?? [];
});
type StructureFilterToken = {
  category?: string;
  element?: string;
  property?: string;
  designToken?: string;
  value?: string;
  name?: string;
  mapKey?: string;
};
const shouldHideStructureToken = (token: StructureFilterToken) => {
  const haystack = [
    token.category,
    token.element,
    token.property,
    token.designToken,
    token.value,
    token.name,
    token.mapKey,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (haystack.includes("colour")) return true;
  if (haystack.includes("color")) return true;
  if (haystack.includes("surface")) return true;
  if (haystack.includes("background")) return true;
  if (haystack.includes("hover-bg")) return true;
  if (haystack.includes("bg-")) return true;
  if (haystack.includes("bg/")) return true;
  if (haystack.includes("opacity/50")) return true;
  return false;
};
const filterStructureTokens = (tokens: StructureFilterToken[]) =>
  tokens.filter((token) => !shouldHideStructureToken(token));
const structureGlobalTokenGroups = computed(() => {
  return [
    ...semanticTokenGroups.value.map((group) => ({
      title: group.title,
      tokens: filterStructureTokens(group.rows.map((row) => ({
        category: row.category,
        element: row.category ?? "",
        property: row.name,
        designToken: row.value,
        rawValue: row.rawValue || resolveTokenRawValue(row.value),
        mapKey: row.mapKey ?? row.name,
      }))),
    })),
    ...globalTokenGroups.value
      .map((group) => ({
        ...group,
        tokens: filterStructureTokens(group.tokens),
      }))
      .filter((group) => group.tokens.length > 0),
  ].filter((group) => group.tokens.length > 0);
});
const customStructureKeys = ["accordion", "card", "button", "alert"];
const hasCustomStructure = computed(() => customStructureKeys.includes(currentPageKey.value));
const structureTokens = computed(() => (hasCustomStructure.value ? filterStructureTokens(measurementTokens.value) : []));
const structureTokenGroups = computed(() => {
  if (hasCustomStructure.value) {
    return measurementTokenGroups.value
      .map((group) => ({
        ...group,
        tokens: filterStructureTokens(group.tokens),
      }))
      .filter((group) => group.tokens.length > 0);
  }

  return [
    ...componentTokenGroups.value.map((group) => ({
      title: group.title,
      tokens: filterStructureTokens(group.rows.map((row) => ({
        category: row.category,
        element: row.category ?? "",
        property: row.name,
        designToken: row.value,
        rawValue: row.rawValue || resolveTokenRawValue(row.value),
        mapKey: row.mapKey ?? row.name,
      }))),
    })),
    ...measurementTokenGroups.value
      .map((group) => ({
        ...group,
        tokens: filterStructureTokens(group.tokens),
      }))
      .filter((group) => group.tokens.length > 0),
  ].filter((group) => group.tokens.length > 0);
});
const structurePreviewMarkup = computed(() => {
  if (currentPageKey.value === "breadcrumb" && doc.value?.anatomyMarkup) {
    return doc.value.anatomyMarkup;
  }
  const first = measurementExamples.value[0];
  if (first && "markup" in first && first.markup) return first.markup;
  return "";
});

const anatomyPreviewMarkup = computed(() => {
  if (!doc.value) return "";
  if (doc.value.anatomyMarkup) return doc.value.anatomyMarkup;
  if (doc.value.demos.length <= 1) {
    return doc.value.demos[0]?.markup || `<${doc.value.tag}></${doc.value.tag}>`;
  }
  return `<div class="portal-demo-stack">${doc.value.demos
    .map((example) => `<div class="portal-anatomy-demo-block">${example.markup}</div>`)
    .join("")}</div>`;
});

const initSteppers = async () => {
  await nextTick();
  const root = document.querySelector(`[data-component-page="${currentPageKey.value}"]`);
  if (!root) return;

  root.querySelectorAll<HTMLElement>('sgds-stepper[data-portal-stepper="default"]').forEach((el) => {
    (el as HTMLElement & { steps?: unknown[] }).steps = [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Review", component: "Step two" },
      { stepHeader: "Confirm", component: "Step three" },
    ];
  });
};

// Tab hash sync — universal 4-tab layout (design / usage / accessibility / updates).
// The Code tab is intentionally hidden on every component page to mirror the
// accordion v1 pattern; code snippets live in the Storybook/repo reference
// instead.
const TAB_PANELS = ["design", "usage", "accessibility", "updates"];
const visibleTabPanels = computed(() => TAB_PANELS);
const tabGroupRef = ref<Element | null>(null);

const handleTabClick = (panel: string) => {
  history.replaceState(null, "", `${window.location.pathname}#${panel}`);
};

const activateTabFromHash = async () => {
  await nextTick();
  const hash = window.location.hash.slice(1).toLowerCase();
  if (!visibleTabPanels.value.includes(hash) || hash === "design") return;

  // Wait for the Lit element to be defined and finish its first update cycle
  await customElements.whenDefined("sgds-tab-group");
  const tabGroup = (tabGroupRef.value ?? document.querySelector("sgds-tab-group")) as any;
  await tabGroup?.updateComplete;
  tabGroup?.show?.(hash);
};

onMounted(() => {
  void initSteppers();
  void activateTabFromHash();
  window.addEventListener("hashchange", activateTabFromHash);
});
watch(() => props.componentKey, () => {
  void initSteppers();
  void activateTabFromHash();
});
onBeforeUnmount(() => {
  window.removeEventListener("hashchange", activateTabFromHash);
});
</script>

<template>
  <div v-if="doc" class="sgds:flex sgds:flex-col" :data-component-page="currentPageKey">
    <sgds-tab-group ref="tabGroupRef" class="sgds:block sgds:w-full" variant="underlined">
      <sgds-tab slot="nav" panel="design" active @click="handleTabClick('design')">Design</sgds-tab>
      <sgds-tab slot="nav" panel="usage" @click="handleTabClick('usage')">Usage</sgds-tab>
      <sgds-tab slot="nav" panel="accessibility" @click="handleTabClick('accessibility')">Accessibility</sgds-tab>
      <sgds-tab slot="nav" panel="updates" @click="handleTabClick('updates')">Updates</sgds-tab>

      <!-- Design tab -->
      <sgds-tab-panel name="design">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Purpose" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <div class="sgds-grid">
              <article
                v-for="card in doc.purposeCards"
                :key="card.title"
                class="sgds-col-4 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:min-w-0 sgds:p-0"
              >
                <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ card.title }}</h3>
                <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ card.description }}</p>
              </article>
            </div>
          </Section>

          <Section title="Anatomy" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <AnatomySection
              :anatomy-asset="doc.anatomyAsset"
              :anatomy-preview-markup="anatomyPreviewMarkup"
              :anatomy-callouts="doc.anatomyCallouts"
              :resolved-anatomy-parts="doc.resolvedAnatomyParts"
            />
          </Section>

          <Section title="Configuration" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <InteractivePropertyDemo
                v-for="demo in configurationDemos"
                :key="demo.title"
                :demo="demo"
              />
            </div>
          </Section>

          <Section title="Playground" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <template #title-suffix>
              <sgds-badge variant="accent" outlined>BETA</sgds-badge>
            </template>
            <AlertPlayground v-if="currentPageKey === 'alert' && doc.alertPlayground" :content="doc.alertPlayground" />
            <ComponentPlayground v-else :title="doc.title" :demos="configurationDemos" :size="doc.playgroundSize" />
          </Section>

          <Section v-if="measurementExamples.length || measurementTokens.length || measurementTokenGroups.length || componentTokenGroups.length || semanticTokenGroups.length || globalTokens.length || globalTokenGroups.length" title="Structure">
            <StructureSection
              :preview-markup="structurePreviewMarkup"
              :tokens="structureTokens"
              :token-groups="structureTokenGroups"
              :global-tokens="globalTokens"
              :global-token-groups="structureGlobalTokenGroups"
            />
          </Section>
        </div>
      </sgds-tab-panel>

      <!-- Usage tab -->
      <sgds-tab-panel name="usage">
        <div v-if="doc.usage" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section v-if="doc.usage.guidance?.length" title="Usage" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xl)] sgds:max-w-[var(--sgds-container-max-width-md)]">
              <article
                v-for="section in doc.usage.guidance"
                :key="section.title"
                class="sgds:flex sgds:flex-col sgds:gap-text-xs"
              >
                <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-2-xs)]">
                  <span :class="['sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8', section.tone === 'do' ? 'sgds:text-success-default' : 'sgds:text-danger-default']">
                    <sgds-icon :name="section.tone === 'do' ? 'check-circle-fill' : 'xcircle-fill'" size="lg"></sgds-icon>
                  </span>
                  <h4 class="sgds:m-0">{{ section.title }}</h4>
                </div>
                <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
                  <li v-for="item in section.items" :key="item" class="sgds:mt-0">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section v-if="mergedBestPractices.length" title="Best practices" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <BestPracticesSection
              :best-practices="mergedBestPractices"
              show-titles
              icons-in-box
              title-tag="h6"
              compact-titles
              compact-side-padding
            />
          </Section>

          <Section v-if="doc.usage.motion" title="Motion">
            <MotionSection
              :preview-markup="doc.usage.motion.previewMarkup"
              :specs="doc.usage.motion.specs"
            />
          </Section>
        </div>

        <article v-else class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
          <h3 class="sgds:text-heading-default sgds:m-0">Usage guidance</h3>
          <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line">
            Use <code>{{ doc.title }}</code> when its built-in SGDS pattern matches the task, instead of recreating the same interaction with custom markup.
          </p>
        </article>
      </sgds-tab-panel>

      <!-- Accessibility tab -->
      <sgds-tab-panel name="accessibility">
        <div v-if="doc.accessibility?.sections?.length || doc.accessibility?.keyboardInteractions?.length" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Accessibility considerations" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <AccessibilitySection :accessibility="doc.accessibility" />
          </Section>
        </div>
        <Section v-else title="Accessibility considerations" gap="sgds:gap-[var(--sgds-gap-xl)]">
          <article class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
            <ul v-if="doc.accessibilityNotes?.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
              <li v-for="note in doc.accessibilityNotes" :key="note">{{ note }}</li>
            </ul>
            <p v-else class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line">
              Use the component with clear labels, meaningful text, and the SGDS interaction states that come with the component. Validate keyboard flow and screen reader behaviour in the surrounding page context.
            </p>
          </article>
        </Section>
      </sgds-tab-panel>

      <!-- Updates tab -->
      <sgds-tab-panel name="updates">
        <UpdatesSection :updates="doc.updates" :component-key="currentPageKey" />
      </sgds-tab-panel>
    </sgds-tab-group>
  </div>
</template>

<style>
/* Global portal utility classes used in component markup strings */
.portal-demo-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-sm);
}

.portal-demo-row-center {
  justify-content: center;
}

/* Dark-background modifier for demos that showcase items designed to sit on
   inverse surfaces (e.g. the White badge variant). Pairs with .portal-demo-row. */
.portal-demo-row-inverse {
  background: var(--sgds-surface-inverse);
  border-radius: var(--sgds-border-radius-md);
  justify-content: center;
  padding: var(--sgds-padding-md);
}

.portal-demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  width: 100%;
}

.portal-anatomy-demo-block {
  width: 100%;
}

.portal-demo-stack-sm {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

.portal-demo-card {
  display: block;
  max-width: var(--sgds-dimension-360);
  margin-inline: auto;
  width: 100%;
}

.portal-demo-datepicker {
  display: block;
  width: var(--sgds-dimension-288);
}

.portal-slot-example {
  align-items: center;
  background: var(--sgds-accent-surface-muted);
  border: var(--sgds-border-width-1) dashed var(--sgds-link-color-default);
  border-radius: var(--sgds-border-radius-none);
  box-sizing: border-box;
  color: var(--sgds-link-color-default);
  display: flex;
  gap: var(--sgds-gap-sm);
  justify-content: flex-start;
  padding: var(--sgds-padding-md);
}

.portal-slot-example span {
  color: inherit;
  text-align: left;
}

.portal-slot-example sgds-icon {
  color: inherit;
  flex-shrink: 0;
}

.portal-card-title-h4 {
  font-size: var(--sgds-font-size-heading-sm) !important;
  font-weight: var(--sgds-font-weight-semibold) !important;
  letter-spacing: var(--sgds-letter-spacing-tight) !important;
  line-height: var(--sgds-line-height-heading-sm) !important;
}

.portal-card-title-h5 {
  font-size: var(--sgds-font-size-subtitle-md) !important;
  font-weight: var(--sgds-font-weight-semibold) !important;
  letter-spacing: var(--sgds-letter-spacing-normal) !important;
  line-height: var(--sgds-line-height-xs) !important;
}

.portal-card-footer-full-width {
  display: block;
  width: 100% !important;
}

/* Card titles are styled inside shadow DOM with the 24px title token.
   Override that token per demo so the hierarchy examples can reflect SGDS H4/H5 typography. */
.portal-card-title-h4-demo {
  --sgds-font-size-24: var(--sgds-font-size-heading-sm);
}

.portal-card-title-h5-demo {
  --sgds-font-size-24: var(--sgds-font-size-subtitle-md);
}

.portal-demo-overlay {
  min-height: var(--sgds-dimension-288);
  position: relative;
  width: 100%;
}

.portal-modal-preview {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-288);
  width: 100%;
}

.portal-modal-panel {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xl);
  max-width: var(--sgds-dimension-480);
  padding: var(--sgds-padding-xl);
  width: 100%;
}

.portal-modal-header {
  display: flex;
  gap: var(--sgds-gap-md);
  justify-content: space-between;
}

.portal-modal-header-copy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.portal-modal-title {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-24);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-40);
}

.portal-modal-description {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
}

.portal-modal-body {
  color: var(--sgds-body-color-default);
}

.portal-modal-body p {
  margin: 0;
}

.portal-modal-footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-md);
  justify-content: flex-end;
}

/* Anatomy mockups for components whose `open` state portals their menu
   outside the demo container. Static HTML keeps the entire anatomy inside
   the demo box where callouts can target individual parts. */
.portal-popover-anatomy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  width: var(--sgds-dimension-280);
}

.portal-popover-anatomy-trigger {
  align-items: center;
  background: var(--sgds-surface-default);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-color-subtle);
  display: flex;
  font-size: var(--sgds-font-size-body-md);
  gap: var(--sgds-gap-md);
  justify-content: space-between;
  padding: var(--sgds-padding-sm) var(--sgds-padding-md);
}

.portal-popover-anatomy-listbox {
  background: var(--sgds-surface-default);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  border-radius: var(--sgds-border-radius-md);
  display: flex;
  flex-direction: column;
  padding: var(--sgds-padding-2-xs);
}

.portal-popover-anatomy-option {
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-color-default);
  font-size: var(--sgds-font-size-body-md);
  padding: var(--sgds-padding-sm) var(--sgds-padding-md);
}

/* Combo box anatomy uses the real web component; these descendant selectors
   style only the light-DOM content passed into slotted option rows. */
.portal-anatomy-combo-real {
  display: block;
  width: 15.75rem;
}

.portal-anatomy-combo-stage {
  align-items: flex-start;
  display: inline-flex;
  justify-content: center;
  min-height: 17.5rem;
  padding-top: 2.75rem;
}

.portal-anatomy-combo-option-label {
  color: var(--sgds-color-default);
  line-height: var(--sgds-line-height-xs);
}

.portal-anatomy-combo-option-secondary {
  color: var(--sgds-color-subtle);
  line-height: var(--sgds-line-height-2-xs);
  margin-top: 0.125rem;
}

.portal-tooltip-anatomy {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sgds-gap-md);
}

.portal-tooltip-anatomy-bubble {
  background: var(--sgds-surface-inverse);
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-color-inverse);
  font-size: var(--sgds-font-size-body-sm);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-md);
}

.portal-tooltip-anatomy-arrow {
  background: var(--sgds-surface-inverse);
  height: var(--sgds-dimension-8);
  margin-top: calc(var(--sgds-dimension-4) * -1);
  transform: rotate(45deg);
  width: var(--sgds-dimension-8);
}

.portal-demo-nav {
  max-width: var(--sgds-dimension-688);
  width: 100%;
}

.portal-demo-nav-sm {
  max-width: var(--sgds-dimension-320);
  width: 100%;
}

.portal-demo-list-item {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
}

.portal-accessibility-preview {
  min-height: var(--sgds-dimension-400);
  position: relative;
  width: 100%;
}

.portal-accessibility-frame {
  left: 50%;
  max-width: var(--sgds-dimension-400);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.portal-accessibility-accordion {
  background: var(--sgds-surface-default);
  display: block;
  position: relative;
  width: 100%;
  z-index: 1;
}

.portal-accessibility-link {
  margin-top: var(--sgds-gap-sm);
}

.portal-accessibility-callout {
  left: 0;
  position: absolute;
  width: var(--sgds-dimension-80);
  z-index: 3;
}

.portal-accessibility-callout::before {
  border-color: var(--sgds-primary-border-color-default);
  border-style: solid;
  border-width: 0 0 var(--sgds-border-width-1) var(--sgds-border-width-1);
  border-bottom-left-radius: var(--sgds-border-radius-xl);
  content: "";
  height: var(--sgds-dimension-24);
  left: var(--sgds-dimension-24);
  position: absolute;
  top: 50%;
  width: var(--sgds-dimension-40);
}

.portal-accessibility-badge {
  align-items: center;
  background: var(--sgds-surface-inverse);
  border-radius: 50%;
  color: var(--sgds-color-inverse);
  display: inline-flex;
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-24);
  justify-content: center;
  line-height: var(--sgds-line-height-16);
  width: var(--sgds-dimension-24);
}

.portal-accessibility-callout-1 { top: 22%; }
.portal-accessibility-callout-2 { top: 35%; }
.portal-accessibility-callout-3 { top: 57%; }
.portal-accessibility-callout-4 { top: 80%; }

.portal-demo-stepper {
  max-width: var(--sgds-dimension-688);
  width: 100%;
}

@media (max-width: 1023px) {
  .portal-accessibility-preview {
    min-height: var(--sgds-dimension-360);
  }
}

/* Accordion button measurement diagram — global classes for v-html markup */
.accordion-m-bubble {
  background: #6b4feb;
  border-radius: 3.5px;
  color: #fff;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 4px;
  white-space: nowrap;
}
.accordion-m-bubble--w {
  padding-left: 8px;
  padding-right: 8px;
}
.accordion-m-outer {
  --accordion-measure-fill: rgba(107, 79, 235, 0.05);
  --accordion-measure-line: #6b4feb;
  display: flex;
  flex-direction: column;
  max-width: 688px;
  width: 100%;
}
.accordion-m-inspector {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-lg);
  width: 100%;
}
.accordion-m-preview {
  max-width: 688px;
  position: relative;
  width: 100%;
}
.accordion-m-main {
  align-items: flex-start;
  display: flex;
  gap: 8px;
}
.accordion-m-left {
  align-items: center;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 64px;
  margin-top: 32px;
}
.accordion-m-v-bracket {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
}
.accordion-m-h-tick-h {
  background: var(--accordion-measure-line);
  height: 1px;
  width: 6px;
}
.accordion-m-v-line-seg {
  background: var(--accordion-measure-line);
  flex: 1;
  width: 1px;
}
.accordion-m-col {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}
.accordion-m-anns {
  display: flex;
  height: 32px;
}
.accordion-m-a {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.accordion-m-stem {
  background: var(--accordion-measure-line);
  height: 6px;
  width: 1px;
}
.accordion-m-p {
  flex: 0 0 20px;
}
.accordion-m-i {
  flex: 0 0 16px;
}
.accordion-m-g {
  flex: 0 0 16px;
}
.accordion-m-t {
  flex: 1;
  min-width: 0;
}
.accordion-m-b {
  flex: 0 0 64px;
}
.accordion-m-btn {
  background: var(--sgds-surface-default);
  height: 64px;
  overflow: hidden;
  position: relative;
}
.accordion-m-live {
  background: var(--sgds-surface-default);
  height: 100%;
  width: 100%;
}
.accordion-m-live-border {
  position: relative;
}
.accordion-m-live > sgds-accordion {
  background: var(--sgds-surface-default);
  display: block;
  width: 100%;
}
.accordion-m-header-copy {
  align-items: center;
  color: var(--sgds-heading-color-default);
  display: inline-flex;
  font-size: var(--sgds-font-size-5);
  font-weight: var(--sgds-font-weight-semibold);
  gap: var(--sgds-gap-md);
  line-height: var(--sgds-line-height-40);
  min-width: 0;
  position: relative;
}
.accordion-m-header-icon {
  color: var(--sgds-color-subtle);
  flex: 0 0 auto;
}
.accordion-m-hover-target {
  inset: 0 auto auto 0;
  height: 64px;
  position: absolute;
  right: 0;
  z-index: 2;
}
.accordion-m-gap-overlay {
  height: 24px;
  left: 44px;
  position: absolute;
  top: 20px;
  width: 16px;
  z-index: 3;
}
.accordion-m-title-target {
  color: inherit;
  display: inline-block;
  font: inherit;
  line-height: inherit;
}
.accordion-m-title-tooltip {
  align-items: center;
  color: inherit;
  display: inline-flex;
  font: inherit;
  line-height: inherit;
}
.accordion-m-border-target {
  inset: 0;
  position: absolute;
  z-index: 1;
}
.accordion-m-panel-target {
  left: 20px;
  position: absolute;
  right: 20px;
  z-index: 3;
}
.accordion-m-panel-target-x {
  top: 0;
  bottom: 0;
}
.accordion-m-panel-target-y {
  top: 20px;
  height: 44px;
}
.accordion-m-inspectable {
  cursor: pointer;
  font: inherit;
  position: relative;
}
.accordion-m-content {
  color: var(--sgds-body-color-default);
}
.accordion-m-content-copy {
  display: inline-block;
  font: inherit;
}
.accordion-m-inspectable:hover {
  background: rgba(107, 79, 235, 0.12);
  box-shadow: inset 0 0 0 1px rgba(107, 79, 235, 0.28);
}
.accordion-m-border-target:hover {
  background: rgba(107, 79, 235, 0.06);
  box-shadow: inset 0 0 0 1px rgba(107, 79, 235, 0.28);
}
.accordion-m-map {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  max-width: 688px;
  width: 100%;
}
.accordion-m-map-section {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  overflow: hidden;
}
.accordion-m-map-heading {
  background: var(--sgds-surface-raised);
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-3);
  font-weight: var(--sgds-font-weight-semibold);
  line-height: var(--sgds-line-height-24);
  padding: var(--sgds-padding-md);
}
.accordion-m-map-row {
  align-items: center;
  border-top: 1px solid var(--sgds-border-color-muted);
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1.5fr) auto;
  padding: var(--sgds-padding-md);
}
.accordion-m-map-name,
.accordion-m-map-prop,
.accordion-m-map-value {
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-24);
}
.accordion-m-map-token {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-color-default);
  display: inline-block;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--sgds-font-size-2);
  line-height: var(--sgds-line-height-24);
  padding: 4px 10px;
  width: fit-content;
}
@media (max-width: 767px) {
  .accordion-m-map-row {
    grid-template-columns: 1fr;
  }
}
.accordion-m-stage .accordion-m-token-row {
  transition: background-color 120ms ease;
}
.accordion-m-stage .accordion-m-token-row[data-map="title-color"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="title-color"]:hover) .accordion-m-token-row[data-map="title-color"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="title-color"]:hover) .accordion-m-inspectable[data-map="title-color"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="border-color"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="border-color"]:hover) .accordion-m-token-row[data-map="border-color"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="border-color"]:hover) .accordion-m-inspectable[data-map="border-color"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="border-color"]:hover) .accordion-m-border-target,
.accordion-m-stage:has(.accordion-m-border-target:hover) .accordion-m-token-row[data-map="border-color"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="padding-x-default"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="padding-x-default"]:hover) .accordion-m-token-row[data-map="padding-x-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-x-default"]:hover) .accordion-m-inspectable[data-map="padding-x-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-x-default"]:hover) .accordion-m-panel-target-x,
.accordion-m-stage:has(.accordion-m-panel-target-x:hover) .accordion-m-token-row[data-map="padding-x-default"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="padding-y-default"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="padding-y-default"]:hover) .accordion-m-token-row[data-map="padding-y-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-y-default"]:hover) .accordion-m-inspectable[data-map="padding-y-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-y-default"]:hover) .accordion-m-panel-target-y,
.accordion-m-stage:has(.accordion-m-panel-target-y:hover) .accordion-m-token-row[data-map="padding-y-default"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="content-padding"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="content-padding"]:hover) .accordion-m-token-row[data-map="content-padding"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="content-padding"]:hover) .accordion-m-inspectable[data-map="content-padding"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-hl {
  background: var(--accordion-measure-line);
  flex: 1;
  height: 1px;
}
.accordion-m-right {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 64px;
  margin-top: 32px;
  min-width: 36px;
}
.accordion-m-va {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.accordion-m-vm {
  flex: 1;
}
.accordion-m-vr {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 20px;
}
.accordion-m-ht {
  background: var(--accordion-measure-line);
  height: 1px;
  width: 6px;
}
.accordion-m-vl {
  background: var(--accordion-measure-line);
  flex: 1;
  width: 1px;
}
</style>
