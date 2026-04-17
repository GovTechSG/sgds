<script setup lang="ts">
import { ref } from "vue";
import TypographyPageTemplate from "../TypographyPageTemplate.vue";

type ZIndexUtility = {
  utilityClass: string;
  value: string;
  usage: string;
};

const zIndexUtilities: ZIndexUtility[] = [
  {
    utilityClass: "sgds:z-modal",
    value: "800",
    usage: "Top-level modal dialogs and scrims that must appear above other global layers.",
  },
  {
    utilityClass: "sgds:z-overlay",
    value: "400",
    usage: "Transient overlays such as toasts, tooltips, and overlay chrome.",
  },
  {
    utilityClass: "sgds:z-floating",
    value: "200",
    usage: "Floating UI such as navigation, dropdown menus, popovers, and anchored menus.",
  },
  {
    utilityClass: "sgds:z-raised",
    value: "100",
    usage: "Raised surfaces such as cards, panels, and elevated content regions.",
  },
  {
    utilityClass: "sgds:z-base",
    value: "0",
    usage: "Default page content and base surfaces.",
  },
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
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Z-index utilities</h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Use z-index utilities to apply SGDS layer values consistently in code. The utilities are ordered from highest stack to lowest stack.
          </p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="item in zIndexUtilities" :key="item.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="ts-snippet-row">
                <code class="ts-snippet-code">
                  <span>{{ item.utilityClass }}</span>
                </code>
                <button
                  class="ts-snippet-copy-btn"
                  @click="copyTokenValue(item.utilityClass, item.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="sm" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">{{ item.value }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-usage-column">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>
