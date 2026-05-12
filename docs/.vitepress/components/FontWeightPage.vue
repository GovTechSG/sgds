<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import { ref } from "vue";

const weights = [
  { utilityClass: "sgds:font-light",    value: "300", label: "Light"    },
  { utilityClass: "sgds:font-regular",   value: "400", label: "Regular"  },
  { utilityClass: "sgds:font-semibold",  value: "600", label: "Semibold" },
  { utilityClass: "sgds:font-bold",      value: "700", label: "Bold"     },
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
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Font weight utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Font weight utilities set the thickness of text strokes. SGDS provides four weights — light, regular, semibold, and bold — mapped to semantic tokens that pair consistently with the type scale.
          </p>
        </div>
      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table font-weight-utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-value-column sgds:w-[8%] sgds:min-w-12">Value</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-preview-column sgds:w-[40%] sgds:min-w-[14rem]">Preview</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row v-for="w in weights" :key="w.utilityClass">
          <sgds-table-cell class="typography-page-template__table-utility-column">
            <div class="sgds:flex sgds:items-start sgds:justify-between sgds:gap-2-xs sgds:rounded-sm sgds:border sgds:border-muted sgds:bg-surface-raised sgds:px-sm sgds:py-[0.375rem]">
              <code class="sgds:flex sgds:flex-1 sgds:min-w-0 sgds:flex-col sgds:gap-2-xs sgds:overflow-visible sgds:whitespace-normal sgds:font-mono sgds:text-body-sm sgds:leading-xs sgds:text-subtle">
                <span class="sgds:self-start sgds:whitespace-nowrap sgds:text-default">{{ w.utilityClass }}</span>
              </code>
              <button
                class="sgds:flex sgds:flex-shrink-0 sgds:cursor-pointer sgds:rounded-sm sgds:border-0 sgds:bg-transparent sgds:p-1 sgds:hover:bg-translucent-subtle"
                @click="copyTokenValue(w.utilityClass, w.utilityClass)"
              >
                <sgds-icon :name="copiedKey === w.utilityClass ? 'check' : 'copy'" size="sm" />
              </button>
            </div>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-value-column sgds:w-[8%] sgds:min-w-12">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ w.value }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-preview-column sgds:w-[40%] sgds:min-w-[14rem]">
            <p
              :class="['sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:m-0', w.utilityClass]"
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>
