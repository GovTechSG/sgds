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
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Font weight utilities</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Font weight utilities set the thickness of text strokes. SGDS provides four weights — light, regular, semibold, and bold — mapped to semantic tokens that pair consistently with the type scale.
          </p>
        </div>
      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table font-weight-utility-table">
        <sgds-table-row>
          <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
          <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row v-for="w in weights" :key="w.utilityClass">
          <sgds-table-cell class="typography-page-template__table-utility-column">
            <div class="ts-snippet-row">
              <code class="ts-snippet-code">
                <span>{{ w.utilityClass }}</span>
              </code>
              <button
                class="ts-snippet-copy-btn"
                @click="copyTokenValue(w.utilityClass, w.utilityClass)"
              >
                <sgds-icon :name="copiedKey === w.utilityClass ? 'check' : 'copy'" size="sm" />
              </button>
            </div>
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
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.font-weight-utility-table .typography-page-template__table-value-column {
  width: 8%;
  min-width: 3rem;
}

.font-weight-utility-table .typography-page-template__table-preview-column {
  width: 40%;
  min-width: 14rem;
}

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
