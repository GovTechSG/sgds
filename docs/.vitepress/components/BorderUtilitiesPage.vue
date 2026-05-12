<script setup lang="ts">
import { computed, ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = defineProps<{
  section: "width" | "radius" | "colour";
}>();

type WidthUtility = {
  utilityClass: string;
  cssVariables: string[];
  applies: string;
  usage: string;
  previewClass: string;
};

type RadiusUtility = {
  utilityClass: string;
  cssVariable: string;
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
    cssVariables: ["--sgds-border-width-1", "--sgds-border-color-default"],
    applies: "1px all sides",
    usage: "Default structural border for cards, panels, and custom containers.",
    previewClass: "sgds:border sgds:border-default",
  },
  {
    utilityClass: "sgds:border-2 sgds:border-emphasis",
    cssVariables: ["--sgds-border-width-2", "--sgds-border-color-emphasis"],
    applies: "2px all sides",
    usage: "Use when the border itself needs more presence, such as selected or focus-adjacent states.",
    previewClass: "sgds:border-2 sgds:border-emphasis",
  },
  {
    utilityClass: "sgds:border-b-4 sgds:border-default",
    cssVariables: ["--sgds-border-width-4", "--sgds-border-color-default"],
    applies: "4px bottom only",
    usage: "Strong directional border for tabs and anchored section treatments.",
    previewClass: "sgds:border-b-4 sgds:border-default sgds:rounded-none",
  },
  {
    utilityClass: "sgds:border-x sgds:border-muted",
    cssVariables: ["--sgds-border-width-1", "--sgds-border-color-muted"],
    applies: "1px left + right",
    usage: "Good for grouped content areas where only the side edges should be visible.",
    previewClass: "sgds:border-x sgds:border-muted sgds:rounded-none",
  },
  {
    utilityClass: "sgds:border-l-4 sgds:border-primary-default",
    cssVariables: ["--sgds-border-width-4", "--sgds-primary-border-color-default"],
    applies: "4px left only",
    usage: "Useful for callouts and semantic accents without framing the full container.",
    previewClass: "sgds:border-l-4 sgds:border-primary-default sgds:rounded-none",
  },
];

const generalRadiusUtilities: RadiusUtility[] = [
  {
    utilityClass: "sgds:rounded-none",
    cssVariable: "--sgds-border-radius-none",
    value: "0px",
    usage: "Sharp corners for tables, strict layouts, and mechanical surfaces.",
    previewClass: "sgds:rounded-none",
    previewLabel: "Square",
  },
  {
    utilityClass: "sgds:rounded-xs",
    cssVariable: "--sgds-border-radius-xs",
    value: "2px",
    usage: "Subtle rounding for small tags and restrained surface treatments.",
    previewClass: "sgds:rounded-xs",
    previewLabel: "Subtle",
  },
  {
    utilityClass: "sgds:rounded-sm",
    cssVariable: "--sgds-border-radius-sm",
    value: "4px",
    usage: "Default small-component radius.",
    previewClass: "sgds:rounded-sm",
    previewLabel: "Default",
  },
  {
    utilityClass: "sgds:rounded-md",
    cssVariable: "--sgds-border-radius-md",
    value: "8px",
    usage: "Balanced radius for panels and medium surfaces.",
    previewClass: "sgds:rounded-md",
    previewLabel: "Panel",
  },
  {
    utilityClass: "sgds:rounded-lg",
    cssVariable: "--sgds-border-radius-lg",
    value: "12px",
    usage: "Common for cards, menus, and larger surfaced components.",
    previewClass: "sgds:rounded-lg",
    previewLabel: "Card",
  },
  {
    utilityClass: "sgds:rounded-xl",
    cssVariable: "--sgds-border-radius-xl",
    value: "16px",
    usage: "Featured surfaces and softer emphasis blocks.",
    previewClass: "sgds:rounded-xl",
    previewLabel: "Feature",
  },
  {
    utilityClass: "sgds:rounded-2-xl",
    cssVariable: "--sgds-border-radius-2-xl",
    value: "24px",
    usage: "Large containers and more expressive panels.",
    previewClass: "sgds:rounded-2-xl",
    previewLabel: "Large",
  },
  {
    utilityClass: "sgds:rounded-3-xl",
    cssVariable: "--sgds-border-radius-3-xl",
    value: "32px",
    usage: "Hero and promotional surfaces with the softest corners.",
    previewClass: "sgds:rounded-3-xl",
    previewLabel: "Hero",
  },
  {
    utilityClass: "sgds:rounded-full",
    cssVariable: "--sgds-border-radius-full",
    value: "999px",
    usage: "Pills, badges, avatars, and circular icon treatments.",
    previewClass: "sgds:rounded-full",
    previewLabel: "Pill",
  },
];

const formRadiusUtilities: RadiusUtility[] = [
  {
    utilityClass: "sgds:rounded-form-none",
    cssVariable: "--sgds-form-border-radius-none",
    value: "0px",
    usage: "Square native form controls.",
    previewClass: "sgds:rounded-none",
    previewLabel: "Form none",
  },
  {
    utilityClass: "sgds:rounded-form-xs",
    cssVariable: "--sgds-form-border-radius-xs",
    value: "2px",
    usage: "Very compact native inputs.",
    previewClass: "sgds:rounded-xs",
    previewLabel: "Form xs",
  },
  {
    utilityClass: "sgds:rounded-form-sm",
    cssVariable: "--sgds-form-border-radius-sm",
    value: "4px",
    usage: "Compact native inputs and dense control layouts.",
    previewClass: "sgds:rounded-sm",
    previewLabel: "Form sm",
  },
  {
    utilityClass: "sgds:rounded-form-md",
    cssVariable: "--sgds-form-border-radius-md",
    value: "8px",
    usage: "Default choice for native input, select, and textarea elements.",
    previewClass: "sgds:rounded-md",
    previewLabel: "Form md",
  },
  {
    utilityClass: "sgds:rounded-form-full",
    cssVariable: "--sgds-form-border-radius-full",
    value: "999px",
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


const copyTokenValue = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = null;
  }, 2000);
};

const isWidthPage = computed(() => props.section === "width");
const isRadiusPage = computed(() => props.section === "radius");
const isColourPage = computed(() => props.section === "colour");
</script>

<template>
  <TypographyPageTemplate>
    <!-- ═══════════════ WIDTH ═══════════════ -->
    <section v-if="isWidthPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Border width utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Border width utilities define thickness and which sides are visible. Prefer SGDS components like
            <CodeToken label="<sgds-divider>" :surface="false" /> for separators between content sections instead of simulating
            them with border utilities.
          </p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column sgds:min-w-[7.5rem]">Applies</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="item in widthUtilities" :key="item.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="ts-snippet-row">
                <code class="ts-snippet-code">
                  <span v-for="token in item.utilityClass.split(' ')" :key="`${item.utilityClass}-${token}`">{{ token }}</span>
                </code>
                <button
                  class="ts-snippet-copy-btn"
                  @click="copyTokenValue(item.utilityClass, item.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="sm" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column sgds:min-w-[7.5rem]">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.applies }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-usage-column">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-preview-column">
              <div class="sgds:flex sgds:justify-center">
                <div :class="['sgds:h-14 sgds:w-14 sgds:rounded sgds:bg-transparent', item.previewClass]"></div>
              </div>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>

    <!-- ═══════════════ RADIUS ═══════════════ -->
    <section v-if="isRadiusPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Border radius utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            SGDS has two radius scales: general radius utilities for components and surfaces, and form radius utilities for
            native HTML form elements. Use general tokens by default, and switch to <CodeToken label="sgds:rounded-form-*" />
            only for native form controls.
          </p>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">General radius</h5>
            <sgds-table
              tableBorder
              headerBackground
              responsive="always"
              class="typography-page-template__utility-table border-utilities-radius-table"
            >
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in generalRadiusUtilities" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="ts-snippet-row">
                  <code class="ts-snippet-code">
                    <span>{{ item.utilityClass }}</span>
                  </code>
                  <button
                    class="ts-snippet-copy-btn"
                    @click="copyTokenValue(item.utilityClass, item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="sm" />
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
                <div class="sgds:flex sgds:justify-center">
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
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Form radius</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Use these only on native HTML controls. When SGDS web components are available, prefer the component over
              styling custom form controls yourself.
            </p>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table border-utilities-radius-table">
              <sgds-table-row>
                <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
                <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
                <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
                <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
              </sgds-table-row>

              <sgds-table-row v-for="item in formRadiusUtilities" :key="item.utilityClass">
                <sgds-table-cell class="typography-page-template__table-utility-column">
                  <div class="ts-snippet-row">
                    <code class="ts-snippet-code">
                      <span>{{ item.utilityClass }}</span>
                    </code>
                    <button
                      class="ts-snippet-copy-btn"
                      @click="copyTokenValue(item.utilityClass, item.utilityClass)"
                    >
                      <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="sm" />
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
                  <div class="sgds:flex sgds:justify-center">
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
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ COLOUR ═══════════════ -->
    <section v-if="isColourPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Border colour utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Border colour utilities are theme-aware and follow the pattern <CodeToken label="sgds:border-{semantic}-{modifier}" />.
            The word <CodeToken label="color" :surface="false" /> never appears in the class name. Always pair border colour
            with a width utility for the border to be visible.
          </p>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div
            v-for="group in borderColorGroups"
            :key="group.id"
            class="sgds:flex sgds:flex-col sgds:gap-layout-xs"
          >
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">{{ group.label }}</h5>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in group.rows" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="ts-snippet-row">
                  <code class="ts-snippet-code">
                    <span>{{ item.utilityClass }}</span>
                  </code>
                  <button
                    class="ts-snippet-copy-btn"
                    @click="copyTokenValue(item.utilityClass, item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="sm" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-preview-column">
                <div class="sgds:flex sgds:justify-center">
                  <div :class="['sgds:h-14 sgds:w-14 sgds:border sgds:bg-transparent', item.previewClass, 'sgds:rounded-lg']"></div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
            </sgds-table>
          </div>
        </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
/* Radius tables: wider utility column, narrower preview column */
.border-utilities-radius-table .typography-page-template__table-preview-column {
  min-width: 6rem;
}

/* ts-snippet styles (shared with typography pages) */
.ts-snippet-row {
  align-items: flex-start;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: flex;
  gap: var(--sgds-gap-2-xs);
  justify-content: space-between;
  padding: 0.375rem var(--sgds-padding-sm);
}

.ts-snippet-code {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: var(--sgds-font-family-mono, monospace);
  font-size: var(--sgds-font-size-body-sm);
  gap: var(--sgds-gap-2-xs);
  line-height: var(--sgds-line-height-xs);
  min-width: 0;
  overflow: visible;
  white-space: normal;
}

.ts-snippet-code span {
  align-self: flex-start;
  color: var(--sgds-body-color-default);
  white-space: nowrap;
}

.ts-snippet-copy-btn {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-sm);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: var(--sgds-spacer-1);
}

.ts-snippet-copy-btn:hover {
  background: var(--sgds-bg-translucent-subtle);
}
</style>
