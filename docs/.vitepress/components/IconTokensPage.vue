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

// Icon size has no direct utility class. The token is consumed via the `size`
// attribute on `<sgds-icon>`, so surface that pattern in the utility view.
const tokenToUtility = (token: string): string => {
  const m = token.match(/^sgds-icon-size-(.+)$/);
  return m ? `size="${m[1]}"` : token;
};

const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "utility") return tokenToUtility(token);
  if (activeTokenViewId.value === "css-variable") return `--${token}`;
  return token;
};

const iconSizeTokens = [
  { token: "sgds-icon-size-xs", value: "12/0.75", size: "12px" },
  { token: "sgds-icon-size-sm", value: "16/1", size: "16px" },
  { token: "sgds-icon-size-md", value: "20/1.25", size: "20px" },
  { token: "sgds-icon-size-lg", value: "24/1.5", size: "24px", note: "Base" },
  { token: "sgds-icon-size-xl", value: "32/2", size: "32px" },
  { token: "sgds-icon-size-2-xl", value: "48/3", size: "48px" },
  { token: "sgds-icon-size-3-xl", value: "64/4", size: "64px" },
] as const;
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Icon size tokens</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Icon size tokens define the rendered dimensions for icons across the system.
        </p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <SegmentedControl v-model="activeTokenViewId" :options="tokenViewOptions" aria-label="Token view" style="margin-bottom: calc(var(--sgds-layout-gap-md) * -0.66);" />

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="icon-token-table-col">{{ tokenViewOptions.find((o) => o.value === activeTokenViewId)?.label }}</sgds-table-head>
            <sgds-table-head class="icon-token-table-col">Value (px/rem)</sgds-table-head>
            <sgds-table-head class="icon-token-table-col">Preview</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row
            v-for="row in iconSizeTokens"
            :key="row.token"
            :class="row.note ? 'icon-token-default-row' : undefined"
          >
            <sgds-table-cell class="icon-token-table-col">
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                <CodeToken :label="getTokenValue(row.token)" />
                <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="icon-token-table-col">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="icon-token-table-col">
              <div class="sgds:flex sgds:items-center icon-token-preview-cell">
                <span
                  class="icon-token-icon-preview"
                  :style="{ inlineSize: row.size, blockSize: row.size }"
                  aria-hidden="true"
                />
              </div>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.icon-token-table-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 16rem;
  min-inline-size: 7rem;
}

.icon-token-preview-cell {
  min-block-size: var(--sgds-dimension-64);
}

.icon-token-icon-preview {
  border: var(--sgds-border-width-1) dashed var(--sgds-border-color-emphasis);
  border-radius: var(--sgds-border-radius-circle);
  box-sizing: border-box;
  display: inline-block;
  flex: none;
}

.icon-token-default-row {
  background: var(--sgds-primary-surface-muted);
}

.icon-token-default-row span,
.icon-token-default-row p {
  color: var(--sgds-color-fixed-dark);
}
</style>
