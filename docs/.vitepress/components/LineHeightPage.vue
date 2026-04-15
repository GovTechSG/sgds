<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import CopyCodeToken from "./ui/CopyCodeToken.vue";
import { ref } from "vue";

const lineHeights = [
  { utilityClass: "sgds:leading-3-xs", token: "--sgds-line-height-3-xs", mobile: "16", tablet: "16", desktop: "16", usage: "Compact labels, badges"           },
  { utilityClass: "sgds:leading-2-xs", token: "--sgds-line-height-2-xs", mobile: "20", tablet: "20", desktop: "20", usage: "Small labels, captions, overlines" },
  { utilityClass: "sgds:leading-xs",   token: "--sgds-line-height-xs",   mobile: "24", tablet: "24", desktop: "24", usage: "Subtitles, body medium and small"  },
  { utilityClass: "sgds:leading-sm",   token: "--sgds-line-height-sm",   mobile: "24", tablet: "28", desktop: "28", usage: "Small headings (H4)"               },
  { utilityClass: "sgds:leading-md",   token: "--sgds-line-height-md",   mobile: "28", tablet: "32", desktop: "32", usage: "Medium headings (H3), body large"  },
  { utilityClass: "sgds:leading-lg",   token: "--sgds-line-height-lg",   mobile: "32", tablet: "36", desktop: "40", usage: "Large headings (H2)"               },
  { utilityClass: "sgds:leading-xl",   token: "--sgds-line-height-xl",   mobile: "40", tablet: "44", desktop: "48", usage: "XL headings (H1), display small"   },
  { utilityClass: "sgds:leading-2-xl", token: "--sgds-line-height-2-xl", mobile: "44", tablet: "52", desktop: "56", usage: "Display medium"                    },
  { utilityClass: "sgds:leading-3-xl", token: "--sgds-line-height-3-xl", mobile: "48", tablet: "60", desktop: "64", usage: "Display large"                     },
] as const;

const staticLineHeights = [
  { utilityClass: "sgds:leading-16", token: "--sgds-line-height-16", value: "16px / 1rem", usage: "Fixed compact line-height." },
  { utilityClass: "sgds:leading-20", token: "--sgds-line-height-20", value: "20px / 1.25rem", usage: "Fixed small-text line-height." },
  { utilityClass: "sgds:leading-24", token: "--sgds-line-height-24", value: "24px / 1.5rem", usage: "Fixed body and subtitle line-height." },
  { utilityClass: "sgds:leading-28", token: "--sgds-line-height-28", value: "28px / 1.75rem", usage: "Fixed small-heading line-height." },
  { utilityClass: "sgds:leading-32", token: "--sgds-line-height-32", value: "32px / 2rem", usage: "Fixed medium-heading line-height." },
  { utilityClass: "sgds:leading-36", token: "--sgds-line-height-36", value: "36px / 2.25rem", usage: "Fixed large-heading line-height." },
  { utilityClass: "sgds:leading-40", token: "--sgds-line-height-40", value: "40px / 2.5rem", usage: "Fixed large display line-height." },
  { utilityClass: "sgds:leading-44", token: "--sgds-line-height-44", value: "44px / 2.75rem", usage: "Fixed display line-height." },
  { utilityClass: "sgds:leading-48", token: "--sgds-line-height-48", value: "48px / 3rem", usage: "Fixed display line-height." },
  { utilityClass: "sgds:leading-52", token: "--sgds-line-height-52", value: "52px / 3.25rem", usage: "Fixed expanded display line-height." },
  { utilityClass: "sgds:leading-56", token: "--sgds-line-height-56", value: "56px / 3.5rem", usage: "Fixed expanded display line-height." },
  { utilityClass: "sgds:leading-60", token: "--sgds-line-height-60", value: "60px / 3.75rem", usage: "Fixed hero display line-height." },
  { utilityClass: "sgds:leading-64", token: "--sgds-line-height-64", value: "64px / 4rem", usage: "Fixed hero display line-height." },
] as const;

const lineHeightModes = [
  { id: "responsive", label: "Responsive" },
  { id: "static", label: "Static" },
] as const;

const activeLineHeightMode = ref<(typeof lineHeightModes)[number]["id"]>("responsive");
const copiedKey = ref<string | null>(null);

const onLineHeightTabShow = (e: Event) => {
  const nextMode = (e as CustomEvent).detail.name as (typeof lineHeightModes)[number]["id"];
  if (lineHeightModes.some((mode) => mode.id === nextMode)) activeLineHeightMode.value = nextMode;
};

const copyUtility = async (utilityClass: string) => {
  await navigator.clipboard.writeText(utilityClass);
  copiedKey.value = utilityClass;
  setTimeout(() => {
    if (copiedKey.value === utilityClass) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Line height utilities</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Line height (leading) controls the vertical space between lines of text. SGDS semantic leading tokens are responsive — they scale up at tablet (1024px) and desktop (1440px) breakpoints to maintain comfortable reading rhythm alongside larger font sizes.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined" @sgds-tab-show="onLineHeightTabShow">
          <sgds-tab
            v-for="mode in lineHeightModes"
            :key="mode.id"
            slot="nav"
            :panel="mode.id"
            :active="activeLineHeightMode === mode.id || null"
          >{{ mode.label }}</sgds-tab>
          <sgds-tab-panel
            v-for="mode in lineHeightModes"
            :key="`line-height-panel-${mode.id}`"
            :name="mode.id"
          ></sgds-tab-panel>
        </sgds-tab-group>

        <sgds-table
          v-if="activeLineHeightMode === 'responsive'"
          tableBorder
          headerBackground
          responsive="always"
          class="typography-page-template__utility-table"
        >
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS Tailwind token</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-token-column">CSS variables</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-metric-column">Mobile</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-metric-column">Tablet</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-metric-column">Desktop</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="lh in lineHeights" :key="lh.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="typography-page-template__utility-copy">
                <CodeToken :label="lh.utilityClass" />
                <button
                  :class="[
                    'typography-page-template__utility-copy-button',
                    copiedKey === lh.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                  ]"
                  :aria-label="copiedKey === lh.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                  @click="copyUtility(lh.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === lh.utilityClass ? 'check' : 'copy'" size="md" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-token-column">
              <CopyCodeToken :label="lh.token" copy-label="Copy CSS variable" />
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

        <sgds-table
          v-else
          tableBorder
          headerBackground
          responsive="always"
          class="typography-page-template__utility-table"
        >
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS Tailwind token</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-token-column">CSS variables</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="lh in staticLineHeights" :key="lh.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="typography-page-template__utility-copy">
                <CodeToken :label="lh.utilityClass" />
                <button
                  :class="[
                    'typography-page-template__utility-copy-button',
                    copiedKey === lh.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                  ]"
                  :aria-label="copiedKey === lh.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                  @click="copyUtility(lh.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === lh.utilityClass ? 'check' : 'copy'" size="md" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-token-column">
              <CopyCodeToken :label="lh.token" copy-label="Copy CSS variable" />
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
    </section>
  </TypographyPageTemplate>
</template>
