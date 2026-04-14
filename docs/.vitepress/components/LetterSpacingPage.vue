<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import { ref } from "vue";

const spacings = [
  { utilityClass: "sgds:tracking-tighter", token: "--sgds-letter-spacing-tighter", value: "-1px",    usage: "Large display headings"             },
  { utilityClass: "sgds:tracking-tight",   token: "--sgds-letter-spacing-tight",   value: "-0.4px",  usage: "Section headings (H1–H4)"           },
  { utilityClass: "sgds:tracking-normal",  token: "--sgds-letter-spacing-normal",  value: "0px",     usage: "Body, labels, captions, links"      },
  { utilityClass: "sgds:tracking-wide",    token: "--sgds-letter-spacing-wide",    value: "1px",     usage: "Overlines (uppercase small text)"   },
  { utilityClass: "sgds:tracking-wider",   token: "--sgds-letter-spacing-wider",   value: "2px",     usage: "Decorative or spaced-out labels"    },
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
          Letter spacing (tracking) controls the horizontal space between characters. SGDS pairs specific tracking values with typographic roles — tighter for large display text, normal for body and UI text, and wider for overlines.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row v-for="s in spacings" :key="s.utilityClass">
          <sgds-table-cell class="typography-page-template__table-utility-column">
            <div class="typography-page-template__utility-copy">
              <CodeToken :label="s.utilityClass" />
              <button
                :class="[
                  'typography-page-template__utility-copy-button',
                  copiedKey === s.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                ]"
                :aria-label="copiedKey === s.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                @click="copyUtility(s.utilityClass)"
              >
                <sgds-icon :name="copiedKey === s.utilityClass ? 'check' : 'copy'" size="md" />
              </button>
            </div>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-value-column">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ s.value }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-usage-column">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ s.usage }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-preview-column">
            <p
              class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:m-0"
              :style="{ letterSpacing: s.value }"
            >
              Typography
            </p>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </section>
  </TypographyPageTemplate>
</template>
