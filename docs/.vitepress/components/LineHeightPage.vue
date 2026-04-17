<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import { ref } from "vue";

const lineHeights = [
  { utilityClass: "sgds:leading-3-xs", mobile: "16", tablet: "16", desktop: "16", usage: "Compact labels, badges"           },
  { utilityClass: "sgds:leading-2-xs", mobile: "20", tablet: "20", desktop: "20", usage: "Small labels, captions, overlines" },
  { utilityClass: "sgds:leading-xs",   mobile: "24", tablet: "24", desktop: "24", usage: "Subtitles, body medium and small"  },
  { utilityClass: "sgds:leading-sm",   mobile: "24", tablet: "28", desktop: "28", usage: "Small headings (H4)"               },
  { utilityClass: "sgds:leading-md",   mobile: "28", tablet: "32", desktop: "32", usage: "Medium headings (H3), body large"  },
  { utilityClass: "sgds:leading-lg",   mobile: "32", tablet: "36", desktop: "40", usage: "Large headings (H2)"               },
  { utilityClass: "sgds:leading-xl",   mobile: "40", tablet: "44", desktop: "48", usage: "XL headings (H1), display small"   },
  { utilityClass: "sgds:leading-2-xl", mobile: "44", tablet: "52", desktop: "56", usage: "Display medium"                    },
  { utilityClass: "sgds:leading-3-xl", mobile: "48", tablet: "60", desktop: "64", usage: "Display large"                     },
] as const;

const staticLineHeights = [
  { utilityClass: "sgds:leading-16", value: "16px / 1rem", usage: "Fixed compact line-height." },
  { utilityClass: "sgds:leading-20", value: "20px / 1.25rem", usage: "Fixed small-text line-height." },
  { utilityClass: "sgds:leading-24", value: "24px / 1.5rem", usage: "Fixed body and subtitle line-height." },
  { utilityClass: "sgds:leading-28", value: "28px / 1.75rem", usage: "Fixed small-heading line-height." },
  { utilityClass: "sgds:leading-32", value: "32px / 2rem", usage: "Fixed medium-heading line-height." },
  { utilityClass: "sgds:leading-36", value: "36px / 2.25rem", usage: "Fixed large-heading line-height." },
  { utilityClass: "sgds:leading-40", value: "40px / 2.5rem", usage: "Fixed large display line-height." },
  { utilityClass: "sgds:leading-44", value: "44px / 2.75rem", usage: "Fixed display line-height." },
  { utilityClass: "sgds:leading-48", value: "48px / 3rem", usage: "Fixed display line-height." },
  { utilityClass: "sgds:leading-52", value: "52px / 3.25rem", usage: "Fixed expanded display line-height." },
  { utilityClass: "sgds:leading-56", value: "56px / 3.5rem", usage: "Fixed expanded display line-height." },
  { utilityClass: "sgds:leading-60", value: "60px / 3.75rem", usage: "Fixed hero display line-height." },
  { utilityClass: "sgds:leading-64", value: "64px / 4rem", usage: "Fixed hero display line-height." },
] as const;

const lineHeightModes = [
  { id: "responsive", label: "Responsive" },
  { id: "static", label: "Static" },
] as const;

const activeLineHeightMode = ref<(typeof lineHeightModes)[number]["id"]>("responsive");
const copiedKey = ref<string | null>(null);

const onLineHeightTabShow = (event: Event) => {
  const nextMode = (event as CustomEvent<{ name?: string }>).detail?.name as (typeof lineHeightModes)[number]["id"] | undefined;
  if (nextMode && lineHeightModes.some((mode) => mode.id === nextMode)) activeLineHeightMode.value = nextMode;
};

const copyTokenValue = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Line height utilities</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Line height (leading) controls the vertical space between lines of text. SGDS semantic leading tokens are responsive — they scale up at tablet (1024px) and desktop (1440px) breakpoints to maintain comfortable reading rhythm alongside larger font sizes.
          </p>
        </div>
        <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onLineHeightTabShow">
          <sgds-tab
            v-for="mode in lineHeightModes"
            :key="mode.id"
            slot="nav"
            :panel="mode.id"
            :active="activeLineHeightMode === mode.id || null"
          >{{ mode.label }}</sgds-tab>
          <sgds-tab-panel
            v-for="mode in lineHeightModes"
            :key="`line-height-mode-panel-${mode.id}`"
            :name="mode.id"
          ></sgds-tab-panel>
        </sgds-tab-group>

        <div v-if="activeLineHeightMode === 'responsive'" class="typography-page-template__content-block">
          <sgds-table
            tableBorder
            headerBackground
            responsive="always"
            class="typography-page-template__utility-table"
          >
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-metric-column">Mobile</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-metric-column">Tablet</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-metric-column">Desktop</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="lh in lineHeights" :key="lh.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="ts-snippet-row">
                  <code class="ts-snippet-code">
                    <span>{{ lh.utilityClass }}</span>
                  </code>
                  <button
                    class="ts-snippet-copy-btn"
                    @click="copyTokenValue(lh.utilityClass, lh.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === lh.utilityClass ? 'check' : 'copy'" size="sm" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-metric-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ lh.mobile }}px</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-metric-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ lh.tablet }}px</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-metric-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ lh.desktop }}px</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ lh.usage }}</span>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </div>

        <div v-else class="typography-page-template__content-block">
          <sgds-table
            tableBorder
            headerBackground
            responsive="always"
            class="typography-page-template__utility-table"
          >
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="lh in staticLineHeights" :key="lh.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column">
                <div class="ts-snippet-row">
                  <code class="ts-snippet-code">
                    <span>{{ lh.utilityClass }}</span>
                  </code>
                  <button
                    class="ts-snippet-copy-btn"
                    @click="copyTokenValue(lh.utilityClass, lh.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === lh.utilityClass ? 'check' : 'copy'" size="sm" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ lh.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ lh.usage }}</span>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
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
