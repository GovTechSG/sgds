<script setup lang="ts">
import { computed, ref } from "vue";
import { typographyTokenDocs } from "../data/typography-token-docs";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import SegmentedControl from "./components/SegmentedControl.vue";

const props = defineProps<{
  tokenKey: string;
}>();

const doc = computed(() => typographyTokenDocs[props.tokenKey]);
const isResponsive = computed(() => doc.value?.rows?.some((r) => r.mobile !== undefined) ?? false);

const tokenViewOptions = [
  { value: "css-variable", label: "Token" },
  { value: "figma", label: "Figma token" },
  { value: "utility", label: "SGDS tailwind token" },
] as const;
type TokenViewId = (typeof tokenViewOptions)[number]["value"];
const activeTokenViewId = ref<TokenViewId>("css-variable");

// Map a typography CSS variable to its SGDS utility class.
// Returns the original string if no pattern matches (e.g. text-decoration's
// "No SGDS token variable" rows, which are handled via the exampleClass fallback).
const tokenToUtility = (token: string): string => {
  if (token === "--sgds-font-family-brand") return "sgds:font-display";
  let m = token.match(/^--sgds-font-size-(.+)$/);
  if (m) return `sgds:text-${m[1]}`;
  m = token.match(/^--sgds-font-weight-(.+)$/);
  if (m) return `sgds:font-${m[1]}`;
  m = token.match(/^--sgds-line-height-(.+)$/);
  if (m) return `sgds:leading-${m[1]}`;
  m = token.match(/^--sgds-letter-spacing-(.+)$/);
  if (m) return `sgds:tracking-${m[1]}`;
  m = token.match(/^--sgds-paragraph-spacing-(.+)$/);
  if (m) return `sgds:mb-paragraph-${m[1]}`;
  return token;
};

const getTokenValue = (token: string, fallback?: string) => {
  if (activeTokenViewId.value === "utility") {
    const u = tokenToUtility(token);
    return u === token ? (fallback ?? token) : u;
  }
  if (activeTokenViewId.value === "css-variable") return token;
  return token.replace(/^--/, "");
};

// Resolve the raw computed CSS value for a given token (e.g. "--sgds-font-size-56" → "3.5rem").
// SSR-safe: returns empty string on the server; tooltip remains empty until client hydration.
const getCssVarValue = (variable: string): string => {
  if (typeof window === "undefined") return "";
  const normalised = variable.startsWith("--") ? variable : `--${variable}`;
  return getComputedStyle(document.documentElement).getPropertyValue(normalised).trim();
};

const tokenTooltip = (variable: string): string => {
  const value = getCssVarValue(variable);
  if (!value) return variable;
  if (variable.includes("font-size")) return `Font size: ${value}`;
  if (variable.includes("line-height")) return `Line height: ${value}`;
  if (variable.includes("font-weight")) return `Font weight: ${value}`;
  if (variable.includes("letter-spacing")) return `Letter spacing: ${value}`;
  return value;
};

// For a semantic responsive token (e.g. --sgds-font-size-display-lg), show the
// value it resolves to at each breakpoint by looking up its mapped primitive tokens.
const responsiveTokenTooltip = (row: { desktop: string; tablet: string; mobile: string }): string => {
  const desktop = getCssVarValue(row.desktop) || row.desktop;
  const tablet = getCssVarValue(row.tablet) || row.tablet;
  const mobile = getCssVarValue(row.mobile) || row.mobile;
  return `${desktop} / ${tablet} / ${mobile}`;
};
</script>

<template>
  <TypographyPageTemplate>
    <section v-if="doc" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">{{ doc.title }}</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">{{ doc.description }}</p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <SegmentedControl v-model="activeTokenViewId" :options="tokenViewOptions" aria-label="Token view" style="margin-bottom: calc(var(--sgds-layout-gap-md) * -0.66);" />

          <!-- Responsive font-size subgroups (e.g. Display / Heading / Body …). Renders one h5 + table per subgroup. -->
          <div
            v-for="subgroup in doc.responsiveFontSizeSubgroups"
            :key="`rfs-${subgroup.label}`"
            class="sgds:flex sgds:flex-col sgds:gap-layout-xs"
          >
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">{{ subgroup.label }}</h5>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table typography-token-table">
              <sgds-table-row>
                <sgds-table-head class="typography-token-table__token-column">Token name</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Desktop</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Tablet</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Mobile</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row
                v-for="row in subgroup.rows"
                :key="`${subgroup.label}-${row.token}`"
                :class="row.isDefault ? 'typography-token-default-row' : undefined"
              >
                <sgds-table-cell class="typography-token-table__token-column">
                  <div class="typography-token-table__token-cell sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                    <sgds-tooltip :content="responsiveTokenTooltip(row)" placement="top">
                      <CodeToken :label="getTokenValue(row.token)" />
                    </sgds-tooltip>
                    <sgds-badge v-if="row.isDefault" variant="primary">Default</sgds-badge>
                  </div>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="tokenTooltip(row.desktop)" placement="top">
                    <CodeToken :label="getTokenValue(row.desktop)" />
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="tokenTooltip(row.tablet)" placement="top">
                    <CodeToken :label="getTokenValue(row.tablet)" />
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="tokenTooltip(row.mobile)" placement="top">
                    <CodeToken :label="getTokenValue(row.mobile)" />
                  </sgds-tooltip>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>

          <div
            v-if="doc.rows && doc.rows.length"
            :class="doc.subgroupLabel ? 'sgds:flex sgds:flex-col sgds:gap-layout-xs' : null"
          >
          <h5
            v-if="doc.subgroupLabel"
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0"
          >{{ doc.subgroupLabel }}</h5>
          <sgds-table
            tableBorder
            headerBackground
            responsive="always"
            :class="[
              'typography-page-template__utility-table typography-token-table',
              doc.key === 'paragraph-spacing' ? 'typography-token-table--paragraph-spacing' : null,
              doc.key === 'letter-spacing' ? 'typography-token-table--letter-spacing' : null
            ]"
          >
            <sgds-table-row>
              <sgds-table-head class="typography-token-table__token-column">{{ tokenViewOptions.find((o) => o.value === activeTokenViewId)?.label }}</sgds-table-head>
              <template v-if="isResponsive">
                <sgds-table-head class="typography-token-table__breakpoint-column">Mobile</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Tablet</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Desktop</sgds-table-head>
              </template>
              <sgds-table-head v-else class="typography-token-table__value-column">Value</sgds-table-head>
              <sgds-table-head class="typography-token-table__example-column">
                {{ doc.key === 'letter-spacing' || doc.key === 'paragraph-spacing' ? 'Usage' : 'Preview' }}
              </sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in doc.rows"
              :key="`${doc.key}-${row.token}-${row.value}-${row.exampleClass ?? ''}`"
              :class="row.note ? 'typography-token-default-row' : undefined"
            >
              <sgds-table-cell class="typography-token-table__token-column">
                <div class="typography-token-table__token-cell sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="getTokenValue(row.token, row.exampleClass)" />
                  <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
                </div>
              </sgds-table-cell>
              <template v-if="isResponsive">
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
                </sgds-table-cell>
              </template>
              <sgds-table-cell v-else class="typography-token-table__value-column">
                <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-token-table__example-column">
                <div v-if="doc.key === 'paragraph-spacing'" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span>
                  <div v-if="row.usageExampleItems?.length" class="typography-token-example-stack">
                    <p
                      v-for="item in row.usageExampleItems"
                      :key="`${row.token}-${item.text}`"
                      :class="['typography-token-example-text', 'sgds:mt-0', item.className, row.exampleClass]"
                    >
                      {{ item.text }}
                    </p>
                  </div>
                </div>
                <div
                  v-else-if="doc.key === 'letter-spacing' && row.usageExampleItems?.length"
                  class="sgds:flex sgds:flex-col sgds:gap-text-xs"
                >
                  <component
                    :is="item.href ? 'a' : 'p'"
                    v-for="item in row.usageExampleItems"
                    :key="`${row.token}-${item.text}`"
                    :href="item.href"
                    :class="['typography-token-example-text', 'sgds:m-0', item.className]"
                  >
                    {{ item.text }}
                  </component>
                </div>
                <p
                  v-else-if="doc.key === 'letter-spacing'"
                  :class="['typography-token-example-text', 'sgds:m-0', row.usageExampleClass ?? row.exampleClass]"
                >
                  {{ row.usage }}
                </p>
                <p
                  v-else
                  :class="['typography-token-example-text', 'sgds:m-0', row.exampleClass]"
                >
                  {{ row.exampleText ?? 'Typography example' }}
                </p>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.typography-token-default-row {
  background: var(--sgds-primary-surface-muted);
}

.typography-token-default-row span,
.typography-token-default-row p {
  color: var(--sgds-color-fixed-dark);
}

.typography-token-table__token-column,
.typography-token-table__value-column,
.typography-token-table__example-column {
  box-sizing: border-box;
  inline-size: max-content;
}

.typography-token-table__token-column {
  max-inline-size: 18rem;
  min-inline-size: 14rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__token-column {
  max-inline-size: 21rem;
  min-inline-size: 18rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__value-column {
  max-inline-size: 8rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__example-column {
  max-inline-size: 24rem;
}

.typography-token-table--letter-spacing .typography-token-table__value-column {
  max-inline-size: 12rem;
  min-inline-size: 10rem;
}

.typography-token-table--letter-spacing .typography-token-table__example-column {
  max-inline-size: 24rem;
  min-inline-size: 18rem;
}

.typography-token-table__value-column {
  max-inline-size: 18rem;
  min-inline-size: 12rem;
}

.typography-token-table__breakpoint-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 6rem;
}

.typography-token-table__example-column {
  max-inline-size: 24rem;
  min-inline-size: 14rem;
}

.typography-token-table__token-cell {
  white-space: normal;
}

.typography-token-example-stack,
.typography-token-example-text {
  color: var(--sgds-body-color-default);
  white-space: pre-line;
}

.typography-token-example-stack .typography-token-example-text:first-child {
  margin-top: 0;
}

.typography-token-example-stack .typography-token-example-text:last-child {
  margin-bottom: 0;
}

/* Snippet row for copy-able token values */
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
