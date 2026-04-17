<script setup lang="ts">
import CodeToken from "./ui/CodeToken.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import { ref } from "vue";

const spacingUtilityRows = [
  { multiplier: "1", utility: "sgds:m-1", value: "4 px" },
  { multiplier: "2", utility: "sgds:m-2", value: "8 px" },
  { multiplier: "3", utility: "sgds:m-3", value: "12 px" },
  { multiplier: "4", utility: "sgds:m-4", value: "16 px" },
  { multiplier: "5", utility: "sgds:m-5", value: "20 px" },
  { multiplier: "6", utility: "sgds:m-6", value: "24 px" },
  { multiplier: "8", utility: "sgds:m-8", value: "32 px" },
  { multiplier: "12", utility: "sgds:m-12", value: "48 px" },
  { multiplier: "16", utility: "sgds:m-16", value: "64 px" },
  { multiplier: "24", utility: "sgds:m-24", value: "96 px" },
];

const copiedKey = ref<string | null>(null);

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
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Spacing utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Spacing utilities apply the SGDS spacing scale directly in code. Use them for margin, padding, axis-specific spacing, and one-off layout adjustments.
          </p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table spacing-utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-metric-column">Multiplier</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="row in spacingUtilityRows" :key="row.utility">
            <sgds-table-cell class="typography-page-template__table-metric-column">
              {{ row.multiplier }}
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="ts-snippet-row">
                <code class="ts-snippet-code">
                  <span>{{ row.utility }}</span>
                </code>
                <button
                  class="ts-snippet-copy-btn"
                  @click="copyTokenValue(row.utility, row.utility)"
                >
                  <sgds-icon :name="copiedKey === row.utility ? 'check' : 'copy'" size="sm" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              {{ row.value }}
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Best practices</h4>
          <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li><strong>Use a consistent scale:</strong> stick to named utilities rather than arbitrary values.</li>
            <li><strong>Layer spacing:</strong> combine axis-specific utilities for semantic meaning.</li>
            <li><strong>Maintain vertical rhythm:</strong> use <CodeToken label="sgds:my-*" /> to keep vertical spacing consistent.</li>
            <li><strong>Use component padding:</strong> apply <CodeToken label="sgds:p-*" /> for internal component spacing.</li>
            <li><strong>Set layout margins:</strong> use <CodeToken label="sgds:m-*" />, <CodeToken label="sgds:mx-*" />, and <CodeToken label="sgds:my-*" /> for component spacing.</li>
          </ul>
        </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.spacing-utility-table .typography-page-template__table-metric-column,
.spacing-utility-table .typography-page-template__table-utility-column,
.spacing-utility-table .typography-page-template__table-value-column {
  width: 33%;
}
</style>
