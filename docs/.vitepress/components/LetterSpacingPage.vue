<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import { ref } from "vue";

const spacings = [
  { utilityClass: "sgds:tracking-tighter", value: "-1px",    usage: "Large display headings"             },
  { utilityClass: "sgds:tracking-tight",   value: "-0.4px",  usage: "Section headings (H1–H4)"           },
  { utilityClass: "sgds:tracking-normal",  value: "0px",     usage: "Body, labels, captions, links"      },
  { utilityClass: "sgds:tracking-wide",    value: "1px",     usage: "Overlines (uppercase small text)"   },
  { utilityClass: "sgds:tracking-wider",   value: "2px",     usage: "Decorative or spaced-out labels"    },
] as const;

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
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Letter spacing utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Letter spacing (tracking) controls the horizontal space between characters. SGDS pairs specific tracking values with typographic roles — tighter for large display text, normal for body and UI text, and wider for overlines.
          </p>
        </div>
      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row v-for="s in spacings" :key="s.utilityClass">
          <sgds-table-cell class="typography-page-template__table-utility-column">
            <div class="sgds:flex sgds:items-start sgds:justify-between sgds:gap-2-xs sgds:rounded-sm sgds:border sgds:border-muted sgds:bg-surface-raised sgds:px-sm sgds:py-[0.375rem]">
              <code class="sgds:flex sgds:flex-1 sgds:min-w-0 sgds:flex-col sgds:gap-2-xs sgds:overflow-visible sgds:whitespace-normal sgds:font-mono sgds:text-body-sm sgds:leading-xs sgds:text-subtle">
                <span class="sgds:self-start sgds:whitespace-nowrap sgds:text-default">{{ s.utilityClass }}</span>
              </code>
              <button
                class="sgds:flex sgds:flex-shrink-0 sgds:cursor-pointer sgds:rounded-sm sgds:border-0 sgds:bg-transparent sgds:p-1 sgds:hover:bg-translucent-subtle"
                @click="copyTokenValue(s.utilityClass, s.utilityClass)"
              >
                <sgds-icon :name="copiedKey === s.utilityClass ? 'check' : 'copy'" size="sm" />
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
              :class="['sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:m-0', s.utilityClass]"
            >
              Typography
            </p>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>
