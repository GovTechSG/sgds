<script setup lang="ts">
import { computed } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import SectionHeader from "./foundations/SectionHeader.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = defineProps<{
  section: "width" | "radius";
}>();

const isWidthPage = computed(() => props.section === "width");
const isRadiusPage = computed(() => props.section === "radius");

type BorderToken = {
  token: string;
  value: string;
  note?: string;
  usage?: string;
  previewLabel?: string;
};

const borderWidthTokens: BorderToken[] = [
  { token: "sgds-border-width-0", value: "0" },
  { token: "sgds-border-width-1", value: "1/0.0625", note: "Default" },
  { token: "sgds-border-width-2", value: "2/0.125" },
  { token: "sgds-border-width-3", value: "3/0.1875" },
  { token: "sgds-border-width-4", value: "4/0.25" },
];

const borderRadiusTokens: BorderToken[] = [
  { token: "sgds-border-radius-none", value: "0", usage: "Sharp corners for tables, strict layouts, and mechanical surfaces.", previewLabel: "Square" },
  { token: "sgds-border-radius-xs", value: "2/0.125", usage: "Subtle rounding for small tags and restrained surface treatments.", previewLabel: "Subtle" },
  { token: "sgds-border-radius-sm", value: "4/0.25", usage: "Default small-component radius.", previewLabel: "Default" },
  { token: "sgds-border-radius-md", value: "8/0.5", note: "Default", usage: "Balanced radius for panels and medium surfaces.", previewLabel: "Panel" },
  { token: "sgds-border-radius-lg", value: "12/0.75", usage: "Common for cards, menus, and larger surfaced components.", previewLabel: "Card" },
  { token: "sgds-border-radius-xl", value: "16/1", usage: "Featured surfaces and softer emphasis blocks.", previewLabel: "Feature" },
  { token: "sgds-border-radius-2-xl", value: "24/1.5", usage: "Large containers and more expressive panels.", previewLabel: "Large" },
  { token: "sgds-border-radius-3-xl", value: "32/2", usage: "Hero and promotional surfaces with the softest corners.", previewLabel: "Hero" },
  { token: "sgds-border-radius-full", value: "999", usage: "Pills, badges, avatars, and circular icon treatments.", previewLabel: "Pill" },
];

const formRadiusTokens: BorderToken[] = [
  { token: "sgds-form-border-radius-none", value: "0", usage: "Square native form controls.", previewLabel: "Form none" },
  { token: "sgds-form-border-radius-xs", value: "2/0.125", usage: "Very compact native inputs.", previewLabel: "Form xs" },
  { token: "sgds-form-border-radius-sm", value: "4/0.25", usage: "Compact native inputs and dense control layouts.", previewLabel: "Form sm" },
  { token: "sgds-form-border-radius-md", value: "8/0.5", note: "Default", usage: "Default choice for native input, select, and textarea elements.", previewLabel: "Form md" },
  { token: "sgds-form-border-radius-full", value: "999", usage: "Pill-shaped search and filter inputs.", previewLabel: "Form full" },
];
</script>

<template>
  <TypographyPageTemplate>
    <section v-if="isWidthPage" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Border width tokens" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Width tokens define the stroke thickness of borders applied to components and custom surfaces.
        </p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="border-token-table-name-col">CSS variable</sgds-table-head>
            <sgds-table-head class="border-token-table-value-col">Value (px/rem)</sgds-table-head>
            <sgds-table-head class="border-token-table-example-col">Preview</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row
            v-for="row in borderWidthTokens"
            :key="row.token"
            :class="row.note ? 'border-token-default-row' : undefined"
          >
            <sgds-table-cell class="border-token-table-name-col">
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                <CodeToken :label="`--${row.token}`" />
                <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="border-token-table-value-col">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="border-token-table-example-col">
              <div class="sgds:flex sgds:items-center border-token-preview-cell">
                <div
                  class="border-token-width-preview"
                  :style="{ borderWidth: `var(--${row.token})` }"
                />
              </div>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>

    <section v-if="isRadiusPage" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
      <SectionHeader title="Border radius tokens" />
      <div class="typography-page-template__body typography-page-template__body--prose">

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">General radius</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                Radius tokens define the corner rounding applied to components, surfaces, and form controls.
              </p>
            </div>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="border-token-table-name-col">CSS variable</sgds-table-head>
                <sgds-table-head class="border-token-table-value-col">Value (px/rem)</sgds-table-head>
                <sgds-table-head class="border-token-table-example-col">Preview</sgds-table-head>
              </sgds-table-row>

              <sgds-table-row
                v-for="row in borderRadiusTokens"
                :key="row.token"
                :class="row.note ? 'border-token-default-row' : undefined"
              >
                <sgds-table-cell class="border-token-table-name-col">
                  <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                    <CodeToken :label="`--${row.token}`" />
                    <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
                  </div>
                </sgds-table-cell>
                <sgds-table-cell class="border-token-table-value-col">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="border-token-table-example-col">
                  <div class="sgds:flex sgds:justify-center border-token-preview-cell">
                    <div
                      class="border-token-radius-preview-box"
                      :style="{ borderRadius: `var(--${row.token})` }"
                    >
                      <span class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.previewLabel }}</span>
                    </div>
                  </div>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">Form radius</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                Use form radius tokens only on native HTML form controls. When SGDS web components are available, prefer the component over styling custom form controls yourself.
              </p>
            </div>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="border-token-table-name-col">CSS variable</sgds-table-head>
                <sgds-table-head class="border-token-table-value-col">Value (px/rem)</sgds-table-head>
                <sgds-table-head class="border-token-table-example-col">Preview</sgds-table-head>
              </sgds-table-row>

              <sgds-table-row
                v-for="row in formRadiusTokens"
                :key="row.token"
                :class="row.note ? 'border-token-default-row' : undefined"
              >
                <sgds-table-cell class="border-token-table-name-col">
                  <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                    <CodeToken :label="`--${row.token}`" />
                    <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
                  </div>
                </sgds-table-cell>
                <sgds-table-cell class="border-token-table-value-col">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="border-token-table-example-col">
                  <div class="sgds:flex sgds:justify-center border-token-preview-cell">
                    <div
                      class="border-token-form-radius-preview-box sgds:px-component-xs"
                      :style="{ borderRadius: `var(--${row.token})` }"
                    >
                      <span class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.previewLabel }}</span>
                    </div>
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
.border-token-table-name-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 18rem;
  min-inline-size: 14rem;
}

.border-token-table-value-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 10rem;
  min-inline-size: 8rem;
}

.border-token-table-usage-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: clamp(18rem, 30vw, 24rem);
  min-inline-size: 16rem;
}

.border-token-table-example-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 12rem;
  min-inline-size: 10rem;
}

.border-token-preview-cell {
  min-block-size: var(--sgds-dimension-64);
}

/* Border width preview: light tinted box showing the border thickness */
.border-token-width-preview {
  background: rgba(0, 0, 0, 0.05);
  border-color: var(--sgds-border-color-default);
  border-style: solid;
  block-size: 4rem;
  box-sizing: border-box;
  inline-size: 8rem;
}

/* Border radius preview: bordered transparent box showing the corner rounding,
   matching the utilities page treatment. */
.border-token-radius-preview-box {
  align-items: center;
  background: transparent;
  block-size: 3.5rem;
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  box-sizing: border-box;
  display: flex;
  inline-size: 6.5rem;
  justify-content: center;
}

/* Form radius preview: wider rectangle with leading text, mimics a form input. */
.border-token-form-radius-preview-box {
  align-items: center;
  background: transparent;
  block-size: 3rem;
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  box-sizing: border-box;
  display: flex;
  inline-size: 100%;
  max-inline-size: 12rem;
}

.border-token-default-row {
  background: var(--sgds-primary-surface-muted);
}

.border-token-default-row span,
.border-token-default-row p {
  color: var(--sgds-color-fixed-dark);
}
</style>
