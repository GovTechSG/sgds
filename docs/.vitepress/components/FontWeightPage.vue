<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import CopyCodeToken from "./ui/CopyCodeToken.vue";
import { ref } from "vue";

const weights = [
  { utilityClass: "sgds:font-light",    token: "--sgds-font-weight-light",    value: "300", label: "Light"    },
  { utilityClass: "sgds:font-regular",  token: "--sgds-font-weight-regular",  value: "400", label: "Regular"  },
  { utilityClass: "sgds:font-semibold", token: "--sgds-font-weight-semibold", value: "600", label: "Semibold" },
  { utilityClass: "sgds:font-bold",     token: "--sgds-font-weight-bold",     value: "700", label: "Bold"     },
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
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Font weight utilities</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Font weight utilities set the thickness of text strokes. SGDS provides four weights — light, regular, semibold, and bold — mapped to semantic tokens that pair consistently with the type scale.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS Tailwind token</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-token-column">CSS variables</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row v-for="w in weights" :key="w.utilityClass">
          <sgds-table-cell class="typography-page-template__table-utility-column">
            <div class="typography-page-template__utility-copy">
              <CodeToken :label="w.utilityClass" />
              <button
                :class="[
                  'typography-page-template__utility-copy-button',
                  copiedKey === w.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                ]"
                :aria-label="copiedKey === w.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                @click="copyUtility(w.utilityClass)"
              >
                <sgds-icon :name="copiedKey === w.utilityClass ? 'check' : 'copy'" size="md" />
              </button>
            </div>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-token-column">
            <CopyCodeToken :label="w.token" copy-label="Copy CSS variable" />
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-value-column">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ w.value }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="typography-page-template__table-preview-column">
            <p
              class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:m-0"
              :style="{ fontWeight: w.value }"
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </section>
  </TypographyPageTemplate>
</template>
