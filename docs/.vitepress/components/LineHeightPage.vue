<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
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

const copiedKey = ref<string | null>(null);

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
      <div class="typography-page-template__copy-block">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Line height (leading) controls the vertical space between lines of text. SGDS semantic leading tokens are responsive — they scale up at tablet (1024px) and desktop (1440px) breakpoints to maintain comfortable reading rhythm alongside larger font sizes.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
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
    </section>
  </TypographyPageTemplate>
</template>
