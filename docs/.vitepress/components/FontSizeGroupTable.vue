<script setup lang="ts">
import { ref } from "vue";
import CodeToken from "./ui/CodeToken.vue";

type FontSizeRow = {
  name: string;
  utilityClass: string;
  token: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

type FontSizeGroup = {
  key: string;
  label: string;
  description: string;
  sizes: readonly FontSizeRow[];
};

const props = defineProps<{
  group: FontSizeGroup;
}>();

const copiedKey = ref<string | null>(null);

const getRowKey = (sizeName: string) => `${props.group.key}-${sizeName}`;

const getPreviewLabel = (sizeName: string) => `${props.group.label} ${sizeName}`;

const getLinkSize = (sizeName: string) => {
  switch (sizeName) {
    case "Large":
      return "lg";
    case "Medium":
      return "md";
    case "Small":
      return "sm";
    case "XS":
      return "xs";
    default:
      return "md";
  }
};

const copyUtility = async (sizeName: string, utilityClass: string) => {
  const key = getRowKey(sizeName);
  await navigator.clipboard.writeText(utilityClass);
  copiedKey.value = key;
  setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <article :id="group.key" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
    <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ group.label }}</h4>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ group.description }}</p>
    </div>

    <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
      <sgds-table-row>
        <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-metric-column">Mobile</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-metric-column">Tablet</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-metric-column">Desktop</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
      </sgds-table-row>

      <sgds-table-row v-for="size in group.sizes" :key="size.name">
        <sgds-table-cell class="typography-page-template__table-utility-column">
          <div class="typography-page-template__utility-copy">
            <CodeToken :label="size.utilityClass" />
            <button
              :class="[
                'typography-page-template__utility-copy-button',
                copiedKey === getRowKey(size.name) ? 'sgds:text-success-default' : 'sgds:text-default'
              ]"
              :aria-label="copiedKey === getRowKey(size.name) ? 'Copied!' : 'Copy SGDS utility'"
              @click="copyUtility(size.name, size.utilityClass)"
            >
              <sgds-icon :name="copiedKey === getRowKey(size.name) ? 'check' : 'copy'" size="md" />
            </button>
          </div>
        </sgds-table-cell>
        <sgds-table-cell class="typography-page-template__table-metric-column">
          <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ size.mobile }}px</span>
        </sgds-table-cell>
        <sgds-table-cell class="typography-page-template__table-metric-column">
          <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ size.tablet }}px</span>
        </sgds-table-cell>
        <sgds-table-cell class="typography-page-template__table-metric-column">
          <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ size.desktop }}px</span>
        </sgds-table-cell>
        <sgds-table-cell class="typography-page-template__table-preview-column">
          <div class="font-size-preview-cell">
            <p
              v-if="group.key !== 'link'"
              :class="['font-size-preview-text', 'sgds:m-0', size.utilityClass]"
            >
              {{ getPreviewLabel(size.name) }}
            </p>
            <sgds-link
              v-else
              :size="getLinkSize(size.name)"
            >
              <a href="javascript:void(0)">{{ getPreviewLabel(size.name) }}</a>
            </sgds-link>
          </div>
        </sgds-table-cell>
      </sgds-table-row>
    </sgds-table>
  </article>
</template>

<style>
.font-size-preview-cell {
  align-items: center;
  display: flex;
  min-width: 0;
  width: 100%;
}

.font-size-preview-text {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  max-inline-size: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
