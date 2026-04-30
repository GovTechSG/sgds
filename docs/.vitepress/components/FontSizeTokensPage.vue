<script setup lang="ts">
import { ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import SegmentedControl from "./components/SegmentedControl.vue";

const tokenViewOptions = [
  { value: "css-variable", label: "CSS variable" },
  { value: "figma", label: "Figma token" },
  { value: "utility", label: "SGDS tailwind token" },
] as const;
type TokenViewId = (typeof tokenViewOptions)[number]["value"];
const activeTokenViewId = ref<TokenViewId>("css-variable");

// --sgds-font-size-{N} → sgds:text-{N}
const tokenToUtility = (token: string): string => {
  const m = token.match(/^--sgds-font-size-(.+)$/);
  return m ? `sgds:text-${m[1]}` : token;
};

const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "utility") return tokenToUtility(token);
  if (activeTokenViewId.value === "css-variable") return token;
  return token.replace(/^--/, "");
};

type FontSizeToken = {
  token: string;
  value: string;
  px: number;
  note?: string;
};

const fontSizeTokens: FontSizeToken[] = [
  { token: "--sgds-font-size-12", value: "12px / 0.75rem",   px: 12 },
  { token: "--sgds-font-size-14", value: "14px / 0.875rem",  px: 14 },
  { token: "--sgds-font-size-16", value: "16px / 1rem",      px: 16, note: "Base" },
  { token: "--sgds-font-size-18", value: "18px / 1.125rem",  px: 18, note: "Responsive" },
  { token: "--sgds-font-size-20", value: "20px / 1.25rem",   px: 20 },
  { token: "--sgds-font-size-22", value: "22px / 1.375rem",  px: 22, note: "Responsive" },
  { token: "--sgds-font-size-24", value: "24px / 1.5rem",    px: 24 },
  { token: "--sgds-font-size-26", value: "26px / 1.625rem",  px: 26, note: "Responsive" },
  { token: "--sgds-font-size-28", value: "28px / 1.75rem",   px: 28 },
  { token: "--sgds-font-size-30", value: "30px / 1.875rem",  px: 30, note: "Responsive" },
  { token: "--sgds-font-size-32", value: "32px / 2rem",      px: 32 },
  { token: "--sgds-font-size-36", value: "36px / 2.25rem",   px: 36, note: "Responsive" },
  { token: "--sgds-font-size-40", value: "40px / 2.5rem",    px: 40 },
  { token: "--sgds-font-size-44", value: "44px / 2.75rem",   px: 44, note: "Responsive" },
  { token: "--sgds-font-size-48", value: "48px / 3rem",      px: 48 },
  { token: "--sgds-font-size-52", value: "52px / 3.25rem",   px: 52, note: "Responsive" },
  { token: "--sgds-font-size-56", value: "56px / 3.5rem",    px: 56 },
];
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Font size tokens</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">Font size tokens define every step of the type scale. Use these tokens to build custom text styles that remain in sync with system typography.</p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <SegmentedControl v-model="activeTokenViewId" :options="tokenViewOptions" aria-label="Token view" style="margin-bottom: calc(var(--sgds-layout-gap-md) * -0.66);" />

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="font-size-token-col-name">{{ tokenViewOptions.find((o) => o.value === activeTokenViewId)?.label }}</sgds-table-head>
            <sgds-table-head class="font-size-token-col-value">Value (px/rem)</sgds-table-head>
            <sgds-table-head class="font-size-token-col-preview">Preview</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row
            v-for="row in fontSizeTokens"
            :key="row.token"
            :class="row.note ? 'font-size-token-base-row' : undefined"
          >
            <sgds-table-cell class="font-size-token-col-name">
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                <CodeToken :label="getTokenValue(row.token)" />
                <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="font-size-token-col-value">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="font-size-token-col-preview">
              <div :style="{ fontSize: row.px + 'px', lineHeight: '1.2', fontFamily: 'inherit' }">Ag</div>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.font-size-token-col-name {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 18rem;
  min-inline-size: 13rem;
}

.font-size-token-col-value {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 10rem;
  min-inline-size: 7rem;
}

.font-size-token-col-preview {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 10rem;
  min-inline-size: 8rem;
}

/* No fixed height — let sgds-table-cell's internal min-height drive row size */

.font-size-token-base-row {
  background: var(--sgds-primary-surface-muted);
}

.font-size-token-base-row span,
.font-size-token-base-row p,
.font-size-token-base-row div {
  color: var(--sgds-color-fixed-dark);
}
</style>
