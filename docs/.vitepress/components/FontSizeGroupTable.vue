<script setup lang="ts">
import { ref } from "vue";

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

const props = withDefaults(
  defineProps<{
    group: FontSizeGroup;
    showHeader?: boolean;
  }>(),
  { showHeader: true },
);

const copiedKey = ref<string | null>(null);

const getRowKey = (sizeName: string) => `${props.group.key}-${sizeName}`;

const getPreviewLabel = (sizeName: string) => `${props.group.label} ${sizeName}`;

const getPreviewTextClasses = (size: FontSizeRow) => {
  if (props.group.key === "display") {
    const leadingClass = size.name === "Large" ? "sgds:leading-3-xl" : size.name === "Medium" ? "sgds:leading-2-xl" : "sgds:leading-xl";
    return [size.utilityClass, "sgds:font-bold", leadingClass, "sgds:tracking-tighter"];
  }

  if (props.group.key === "heading") {
    const leadingClass = size.name === "XL" ? "sgds:leading-xl" : size.name === "Large" ? "sgds:leading-lg" : size.name === "Medium" ? "sgds:leading-md" : "sgds:leading-sm";
    const weightClass = size.name === "XL" || size.name === "Large" ? "sgds:font-bold" : "sgds:font-semibold";
    return [size.utilityClass, weightClass, leadingClass, "sgds:tracking-tight"];
  }

  if (props.group.key === "subtitle") {
    const leadingClass = size.name === "Medium" ? "sgds:leading-xs" : "sgds:leading-2-xs";
    return [size.utilityClass, "sgds:font-semibold", leadingClass, "sgds:tracking-normal"];
  }

  if (props.group.key === "body") {
    const leadingClass = size.name === "Large" ? "sgds:leading-md" : size.name === "Medium" ? "sgds:leading-xs" : "sgds:leading-2-xs";
    return [size.utilityClass, "sgds:font-regular", leadingClass, "sgds:tracking-normal"];
  }

  if (props.group.key === "label") {
    const leadingClass = size.name === "Large" ? "sgds:leading-md" : size.name === "Medium" ? "sgds:leading-xs" : size.name === "Small" ? "sgds:leading-2-xs" : "sgds:leading-3-xs";
    return [size.utilityClass, "sgds:font-regular", leadingClass, "sgds:tracking-normal"];
  }

  if (props.group.key === "caption") {
    return [size.utilityClass, "sgds:font-regular", "sgds:leading-2-xs", "sgds:tracking-normal"];
  }

  if (props.group.key === "overline") {
    return [size.utilityClass, "sgds:font-regular", "sgds:leading-2-xs", "sgds:tracking-wide", "sgds:uppercase"];
  }

  return [size.utilityClass, "sgds:font-regular", "sgds:leading-xs", "sgds:tracking-normal"];
};

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

const copyTokenValue = async (sizeName: string, text: string) => {
  const key = getRowKey(sizeName);
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <article :id="group.key" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
    <h5 v-if="showHeader !== false" class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">{{ group.label }}</h5>

    <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table font-size-utility-table">
      <sgds-table-row>
        <sgds-table-head class="typography-page-template__table-utility-column">SGDS tailwind token</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-metric-column">Mobile</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-metric-column">Tablet</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-metric-column">Desktop</sgds-table-head>
        <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
      </sgds-table-row>

      <sgds-table-row v-for="size in group.sizes" :key="size.name">
        <sgds-table-cell class="typography-page-template__table-utility-column">
          <div class="ts-snippet-row">
            <code class="ts-snippet-code">
              <span>{{ size.utilityClass }}</span>
            </code>
            <button
              class="ts-snippet-copy-btn"
              @click="copyTokenValue(size.name, size.utilityClass)"
            >
              <sgds-icon :name="copiedKey === getRowKey(size.name) ? 'check' : 'copy'" size="sm" />
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
              :class="['font-size-preview-text', 'sgds:m-0', ...getPreviewTextClasses(size)]"
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
.font-size-utility-table {
  inline-size: max-content;
  max-inline-size: 100%;
  width: auto;
}

.font-size-utility-table sgds-table-head,
.font-size-utility-table sgds-table-cell {
  box-sizing: border-box;
  overflow-wrap: anywhere;
  white-space: normal;
}

.font-size-utility-table sgds-table-cell {
  height: auto;
  vertical-align: top;
}

.font-size-preview-cell {
  align-items: flex-start;
  display: flex;
  max-inline-size: clamp(12rem, 28vw, 20rem);
  min-width: 0;
  width: 100%;
}

.font-size-utility-table .typography-page-template__table-metric-column {
  width: 10%;
  min-width: 5.5rem;
}

.font-size-utility-table .typography-page-template__table-preview-column {
  width: 35%;
  min-width: 14rem;
}

.font-size-preview-text {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  inline-size: 100%;
  max-inline-size: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal;
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

@media (max-width: 1023px) {
  .font-size-utility-table .typography-page-template__table-utility-column,
  .font-size-utility-table .typography-page-template__table-preview-column,
  .font-size-utility-table .typography-page-template__table-metric-column {
    width: auto;
    min-width: 0;
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}
</style>
