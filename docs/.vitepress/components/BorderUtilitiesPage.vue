<script setup lang="ts">
import { computed, ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = defineProps<{
  section: "width" | "radius" | "colour";
}>();

type WidthUtility = {
  utilityClass: string;
  applies: string;
  usage: string;
  previewClass: string;
};

type RadiusUtility = {
  utilityClass: string;
  value?: string;
  usage: string;
  previewClass: string;
  previewLabel: string;
};

type BorderColorToken = {
  utilityClass: string;
  usage: string;
  previewClass: string;
};

type BorderColorGroup = {
  id: string;
  label: string;
  rows: BorderColorToken[];
};

const widthUtilities: WidthUtility[] = [
  {
    utilityClass: "sgds:border sgds:border-default",
    applies: "1px all sides",
    usage: "Default structural border for cards, panels, and custom containers.",
    previewClass: "sgds:border sgds:border-default",
  },
  {
    utilityClass: "sgds:border-2 sgds:border-emphasis",
    applies: "2px all sides",
    usage: "Use when the border itself needs more presence, such as selected or focus-adjacent states.",
    previewClass: "sgds:border-2 sgds:border-emphasis",
  },
  {
    utilityClass: "sgds:border-b-4 sgds:border-default",
    applies: "4px bottom only",
    usage: "Strong directional border for tabs and anchored section treatments.",
    previewClass: "sgds:border-b-4 sgds:border-default sgds:rounded-none",
  },
  {
    utilityClass: "sgds:border-x sgds:border-muted",
    applies: "1px left + right",
    usage: "Good for grouped content areas where only the side edges should be visible.",
    previewClass: "sgds:border-x sgds:border-muted sgds:rounded-none",
  },
  {
    utilityClass: "sgds:border-l-4 sgds:border-primary-default",
    applies: "4px left only",
    usage: "Useful for callouts and semantic accents without framing the full container.",
    previewClass: "sgds:border-l-4 sgds:border-primary-default sgds:rounded-none",
  },
];

const generalRadiusUtilities: RadiusUtility[] = [
  {
    utilityClass: "sgds:rounded-none",
    value: "0px",
    usage: "Sharp corners for tables, strict layouts, and mechanical surfaces.",
    previewClass: "sgds:rounded-none",
    previewLabel: "Square",
  },
  {
    utilityClass: "sgds:rounded-sm",
    value: "2px",
    usage: "Subtle rounding for small tags and restrained surface treatments.",
    previewClass: "sgds:rounded-sm",
    previewLabel: "Subtle",
  },
  {
    utilityClass: "sgds:rounded",
    value: "4px",
    usage: "Default small-component radius.",
    previewClass: "sgds:rounded-sm",
    previewLabel: "Default",
  },
  {
    utilityClass: "sgds:rounded-md",
    value: "6px",
    usage: "Balanced radius for panels and medium surfaces.",
    previewClass: "sgds:rounded-md",
    previewLabel: "Panel",
  },
  {
    utilityClass: "sgds:rounded-lg",
    value: "8px",
    usage: "Common for cards, menus, and larger surfaced components.",
    previewClass: "sgds:rounded-lg",
    previewLabel: "Card",
  },
  {
    utilityClass: "sgds:rounded-xl",
    value: "12px",
    usage: "Featured surfaces and softer emphasis blocks.",
    previewClass: "sgds:rounded-xl",
    previewLabel: "Feature",
  },
  {
    utilityClass: "sgds:rounded-2-xl",
    value: "16px",
    usage: "Large containers and more expressive panels.",
    previewClass: "sgds:rounded-2-xl",
    previewLabel: "Large",
  },
  {
    utilityClass: "sgds:rounded-3-xl",
    value: "24px",
    usage: "Hero and promotional surfaces with the softest corners.",
    previewClass: "sgds:rounded-3-xl",
    previewLabel: "Hero",
  },
  {
    utilityClass: "sgds:rounded-full",
    value: "9999px",
    usage: "Pills, badges, avatars, and circular icon treatments.",
    previewClass: "sgds:rounded-full",
    previewLabel: "Pill",
  },
];

const formRadiusUtilities: RadiusUtility[] = [
  {
    utilityClass: "sgds:rounded-form-none",
    value: "0px",
    usage: "Square native form controls.",
    previewClass: "sgds:rounded-none",
    previewLabel: "Form none",
  },
  {
    utilityClass: "sgds:rounded-form-xs",
    value: "2px",
    usage: "Very compact native inputs.",
    previewClass: "sgds:rounded-sm",
    previewLabel: "Form xs",
  },
  {
    utilityClass: "sgds:rounded-form-sm",
    value: "4px",
    usage: "Compact native inputs and dense control layouts.",
    previewClass: "sgds:rounded-sm",
    previewLabel: "Form sm",
  },
  {
    utilityClass: "sgds:rounded-form-md",
    value: "8px",
    usage: "Default choice for native input, select, and textarea elements.",
    previewClass: "sgds:rounded-lg",
    previewLabel: "Form md",
  },
  {
    utilityClass: "sgds:rounded-form-full",
    value: "9999px",
    usage: "Pill-shaped search and filter inputs.",
    previewClass: "sgds:rounded-full",
    previewLabel: "Form full",
  },
];

const foundationalBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-default",
    usage: "First choice for standard structural borders.",
    previewClass: "sgds:border-default",
  },
  {
    utilityClass: "sgds:border-emphasis",
    usage: "Higher-visibility border when the edge needs stronger presence.",
    previewClass: "sgds:border-emphasis",
  },
  {
    utilityClass: "sgds:border-muted",
    usage: "Low-emphasis separators and softer component outlines.",
    previewClass: "sgds:border-muted",
  },
  {
    utilityClass: "sgds:border-translucent",
    usage: "Semi-transparent borders on layered or decorative surfaces.",
    previewClass: "sgds:border-translucent",
  },
  {
    utilityClass: "sgds:border-transparent",
    usage: "Invisible border that preserves box model spacing.",
    previewClass: "sgds:border-transparent",
  },
  {
    utilityClass: "sgds:border-fixed-light",
    usage: "Always-light border for fixed dark surfaces.",
    previewClass: "sgds:border-fixed-light",
  },
  {
    utilityClass: "sgds:border-fixed-dark",
    usage: "Always-dark border for fixed light surfaces.",
    previewClass: "sgds:border-fixed-dark",
  },
];

const primaryBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-primary-default",
    usage: "Brand, active, or selected states.",
    previewClass: "sgds:border-primary-default",
  },
  {
    utilityClass: "sgds:border-primary-emphasis",
    usage: "Higher-visibility primary borders.",
    previewClass: "sgds:border-primary-emphasis",
  },
  {
    utilityClass: "sgds:border-primary-muted",
    usage: "Subtle primary framing.",
    previewClass: "sgds:border-primary-muted",
  },
];

const accentBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-accent-default",
    usage: "Informational or link-adjacent borders.",
    previewClass: "sgds:border-accent-default",
  },
  {
    utilityClass: "sgds:border-accent-emphasis",
    usage: "Higher-visibility informational borders.",
    previewClass: "sgds:border-accent-emphasis",
  },
  {
    utilityClass: "sgds:border-accent-muted",
    usage: "Subtle informational framing.",
    previewClass: "sgds:border-accent-muted",
  },
];

const successBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-success-default",
    usage: "Positive feedback and valid states.",
    previewClass: "sgds:border-success-default",
  },
  {
    utilityClass: "sgds:border-success-emphasis",
    usage: "Higher-visibility success borders.",
    previewClass: "sgds:border-success-emphasis",
  },
  {
    utilityClass: "sgds:border-success-muted",
    usage: "Subtle success framing.",
    previewClass: "sgds:border-success-muted",
  },
];

const dangerBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-danger-default",
    usage: "Error, destructive, and invalid states.",
    previewClass: "sgds:border-danger-default",
  },
  {
    utilityClass: "sgds:border-danger-emphasis",
    usage: "Higher-visibility error borders.",
    previewClass: "sgds:border-danger-emphasis",
  },
  {
    utilityClass: "sgds:border-danger-muted",
    usage: "Subtle error framing.",
    previewClass: "sgds:border-danger-muted",
  },
];

const warningBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-warning-default",
    usage: "Caution and attention-needed states.",
    previewClass: "sgds:border-warning-default",
  },
  {
    utilityClass: "sgds:border-warning-emphasis",
    usage: "Higher-visibility warning borders.",
    previewClass: "sgds:border-warning-emphasis",
  },
  {
    utilityClass: "sgds:border-warning-muted",
    usage: "Subtle warning framing.",
    previewClass: "sgds:border-warning-muted",
  },
];

const neutralBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-neutral-default",
    usage: "Equal-importance groupings with no semantic meaning.",
    previewClass: "sgds:border-neutral-default",
  },
  {
    utilityClass: "sgds:border-neutral-emphasis",
    usage: "Higher-visibility neutral borders.",
    previewClass: "sgds:border-neutral-emphasis",
  },
  {
    utilityClass: "sgds:border-neutral-muted",
    usage: "Subtle neutral framing.",
    previewClass: "sgds:border-neutral-muted",
  },
];

const purpleBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-purple-default",
    usage: "Visual differentiation without semantic meaning.",
    previewClass: "sgds:border-purple-default",
  },
  {
    utilityClass: "sgds:border-purple-emphasis",
    usage: "Higher-visibility purple borders.",
    previewClass: "sgds:border-purple-emphasis",
  },
  {
    utilityClass: "sgds:border-purple-muted",
    usage: "Subtle purple framing.",
    previewClass: "sgds:border-purple-muted",
  },
];

const cyanBorderColors: BorderColorToken[] = [
  {
    utilityClass: "sgds:border-cyan-default",
    usage: "Visual differentiation without semantic meaning.",
    previewClass: "sgds:border-cyan-default",
  },
  {
    utilityClass: "sgds:border-cyan-emphasis",
    usage: "Higher-visibility cyan borders.",
    previewClass: "sgds:border-cyan-emphasis",
  },
  {
    utilityClass: "sgds:border-cyan-muted",
    usage: "Subtle cyan framing.",
    previewClass: "sgds:border-cyan-muted",
  },
];

const borderColorGroups: BorderColorGroup[] = [
  { id: "foundational", label: "Grayscale", rows: foundationalBorderColors },
  { id: "primary", label: "Primary", rows: primaryBorderColors },
  { id: "accent", label: "Accent", rows: accentBorderColors },
  { id: "success", label: "Success", rows: successBorderColors },
  { id: "danger", label: "Danger", rows: dangerBorderColors },
  { id: "warning", label: "Warning", rows: warningBorderColors },
];

const copiedKey = ref<string | null>(null);
const activeBorderColorGroupId = ref("foundational");
const activeRadiusGroupId = ref("general");

const copyUtility = async (utilityClass: string) => {
  await navigator.clipboard.writeText(utilityClass);
  copiedKey.value = utilityClass;
  setTimeout(() => {
    if (copiedKey.value === utilityClass) copiedKey.value = null;
  }, 2000);
};

const isWidthPage = computed(() => props.section === "width");
const isRadiusPage = computed(() => props.section === "radius");
const isColourPage = computed(() => props.section === "colour");
const currentBorderColorRows = computed(
  () => borderColorGroups.find((group) => group.id === activeBorderColorGroupId.value)?.rows ?? foundationalBorderColors,
);

function onBorderColorTabShow(e: Event) {
  activeBorderColorGroupId.value = (e as CustomEvent).detail.name as string;
}

function onRadiusTabShow(e: Event) {
  activeRadiusGroupId.value = (e as CustomEvent).detail.name as string;
}
</script>

<template>
  <TypographyPageTemplate>
    <section v-if="!isColourPage" class="typography-page-template__section">
      <div class="typography-page-template__copy-block">
        <template v-if="isWidthPage">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Border width utilities define thickness and which sides are visible. Use them when you need to frame a custom
            container, stateful surface, or directional accent.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            For a visible border, pair a width utility such as <CodeToken label="sgds:border" /> with a colour utility such
            as <CodeToken label="sgds:border-default" />.
          </p>
        </template>

        <template v-else-if="isRadiusPage"></template>

        <template v-else>
        </template>
      </div>
    </section>

    <section v-if="isWidthPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Border width</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Border width utilities define thickness and which sides are visible. Prefer SGDS components like
          <CodeToken label="<sgds-divider>" :surface="false" /> for separators between content sections instead of simulating
          them with border utilities.
        </p>
      </div>

      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-value-column">Applies</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row v-for="item in widthUtilities" :key="item.utilityClass">
          <sgds-table-cell class="typography-page-template__table-utility-column">
            <div class="typography-page-template__utility-copy">
              <CodeToken :label="item.utilityClass" />
              <button
                :class="[
                  'typography-page-template__utility-copy-button',
                  copiedKey === item.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                ]"
                :aria-label="copiedKey === item.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                @click="copyUtility(item.utilityClass)"
              >
                <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="md" />
              </button>
            </div>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-value-column">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.applies }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-usage-column">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-preview-column">
            <div class="sgds:flex sgds:justify-center sgds:min-h-[5rem]">
              <div :class="['sgds:h-14 sgds:w-14 sgds:rounded sgds:bg-transparent', item.previewClass]"></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </section>

    <section v-if="isRadiusPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Border radius</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          SGDS has two radius scales: general radius utilities for components and surfaces, and form radius utilities for
          native HTML form elements. Use general tokens by default, and switch to <CodeToken label="sgds:rounded-form-*" />
          only for native form controls.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined" @sgds-tab-show="onRadiusTabShow">
            <sgds-tab slot="nav" panel="general" :active="activeRadiusGroupId === 'general' || null">General radius</sgds-tab>
            <sgds-tab slot="nav" panel="form" :active="activeRadiusGroupId === 'form' || null">Form radius</sgds-tab>
            <sgds-tab-panel name="general"></sgds-tab-panel>
            <sgds-tab-panel name="form"></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table
            v-if="activeRadiusGroupId === 'general'"
            tableBorder
            headerBackground
            responsive="always"
            class="typography-page-template__utility-table border-utilities-radius-table"
          >
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in generalRadiusUtilities" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="typography-page-template__utility-copy">
                  <CodeToken :label="item.utilityClass" />
                  <button
                    :class="[
                      'typography-page-template__utility-copy-button',
                      copiedKey === item.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                    ]"
                    :aria-label="copiedKey === item.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                    @click="copyUtility(item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="md" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-preview-column">
                <div class="sgds:flex sgds:justify-center sgds:min-h-[5rem]">
                  <div
                    :class="[
                      'sgds:flex sgds:h-14 sgds:w-[6.5rem] sgds:items-center sgds:justify-center sgds:border sgds:border-default sgds:bg-transparent',
                      item.previewClass
                    ]"
                  >
                    <span class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.previewLabel }}</span>
                  </div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>

        <article v-if="activeRadiusGroupId === 'form'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Use these only on native HTML controls. When SGDS web components are available, prefer the component over
              styling custom form controls yourself.
            </p>
          </div>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table border-utilities-radius-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in formRadiusUtilities" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="typography-page-template__utility-copy">
                  <CodeToken :label="item.utilityClass" />
                  <button
                    :class="[
                      'typography-page-template__utility-copy-button',
                      copiedKey === item.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                    ]"
                    :aria-label="copiedKey === item.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                    @click="copyUtility(item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="md" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-preview-column">
                <div class="sgds:flex sgds:justify-center sgds:min-h-[5rem]">
                  <div
                    :class="[
                      'sgds:flex sgds:h-12 sgds:w-full sgds:max-w-[12rem] sgds:items-center sgds:border sgds:border-default sgds:bg-transparent sgds:px-component-xs',
                      item.previewClass
                    ]"
                  >
                    <span class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                      {{ item.previewLabel }}
                    </span>
                  </div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

    <section v-if="isColourPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Border semantics</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Border colour utilities are theme-aware and follow the pattern <CodeToken label="sgds:border-{semantic}-{modifier}" />.
          The word <CodeToken label="color" :surface="false" /> never appears in the class name. Always pair border colour
          with a width utility for the border to be visible.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <h5 class="sgds-subtitle-md-semibold sgds:m-0">Border colour tokens</h5>
          </div>

          <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined" @sgds-tab-show="onBorderColorTabShow">
            <sgds-tab
              v-for="group in borderColorGroups"
              :key="group.id"
              slot="nav"
              :panel="group.id"
              :active="activeBorderColorGroupId === group.id || null"
            >{{ group.label }}</sgds-tab>
            <sgds-tab-panel
              v-for="group in borderColorGroups"
              :key="`border-colour-panel-${group.id}`"
              :name="group.id"
            ></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in currentBorderColorRows" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="typography-page-template__utility-copy">
                  <CodeToken :label="item.utilityClass" />
                  <button
                    :class="[
                      'typography-page-template__utility-copy-button',
                      copiedKey === item.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                    ]"
                    :aria-label="copiedKey === item.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                    @click="copyUtility(item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="md" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-preview-column">
                <div class="sgds:flex sgds:justify-center sgds:min-h-[5rem]">
                  <div :class="['sgds:h-14 sgds:w-14 sgds:border sgds:bg-transparent', item.previewClass, 'sgds:rounded-lg']"></div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
/* Radius tables: wider utility column, narrower preview column */
.border-utilities-radius-table .typography-page-template__table-utility-column {
  inline-size: clamp(10rem, 20vw, 14rem);
  min-inline-size: clamp(10rem, 20vw, 14rem);
}

.border-utilities-radius-table .typography-page-template__table-preview-column {
  inline-size: clamp(9rem, 18vw, 12rem);
  min-inline-size: clamp(9rem, 18vw, 12rem);
}
</style>
