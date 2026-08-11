<script setup lang="ts">
const { stackedExamples = false } = defineProps<{
  stackedExamples?: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'typography-page-template',
      stackedExamples ? 'typography-page-template--stacked' : '',
    ]"
  >
    <slot />
  </div>
</template>

<style>
.typography-page-template {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  width: 100%;
}

.typography-page-template__section {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
  width: 100%;
}

.typography-page-template__section--spaced {
  gap: var(--sgds-layout-gap-md);
}

.typography-page-template__body {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  width: 100%;
}

.typography-page-template__body--prose {
  gap: var(--sgds-layout-gap-lg);
}

.typography-page-template__content-block {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.typography-page-template__copy-block {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.typography-page-template__split-row {
  box-sizing: border-box;
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: minmax(0, 3fr) minmax(0, 6fr);
  width: 100%;
}

.typography-page-template__copy-pane,
.typography-page-template__demo-pane {
  min-width: 0;
}

.typography-page-template__demo-pane {
  display: flex;
}

.typography-page-template__demo-pane > * {
  flex: 1;
}

.typography-page-template__copy-pane {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.typography-page-template--stacked .typography-page-template__split-row {
  gap: var(--sgds-layout-gap-xs);
  grid-template-columns: minmax(0, 1fr);
}

.typography-page-template--stacked .typography-page-template__demo-pane {
  inline-size: 100%;
}

.typography-page-template--stacked .typography-page-template__card {
  min-block-size: 22rem;
}

.typography-page-template__card {
  background: var(--sgds-bg-alternate);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  min-block-size: 18rem;
  overflow: hidden;
  width: 100%;
}

.typography-page-template__section h2,
.typography-page-template__section h3,
.typography-page-template__section h4,
.typography-page-template__section p,
.typography-page-template__section ol,
.typography-page-template__copy-pane h2,
.typography-page-template__copy-pane h3,
.typography-page-template__copy-pane h4,
.typography-page-template__copy-pane h5,
.typography-page-template__copy-pane p {
  margin: 0;
}

.typography-page-template__section p,
.typography-page-template__section ol {
  color: var(--sgds-body-color-default);
}

.typography-page-template__utility-table {
  inline-size: 100%;
}

.typography-page-template__utility-table sgds-table-row {
  height: auto;
}

.typography-page-template__utility-table sgds-table-head,
.typography-page-template__utility-table sgds-table-cell {
  block-size: auto;
  box-sizing: border-box;
  max-inline-size: 22rem;
  overflow-wrap: anywhere;
  white-space: normal;
  word-break: normal;
}

.typography-page-template__utility-table sgds-table-cell {
  height: auto;
  vertical-align: top;
}

.typography-page-template__utility-table code {
  max-inline-size: none;
  white-space: nowrap;
}

.typography-page-template__table-token-column,
.typography-page-template__table-utility-column {
  box-sizing: border-box;
  width: 30%;
  min-width: 10rem;
}

.typography-page-template__table-metric-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 5.5rem;
  min-inline-size: 3.75rem;
}

.typography-page-template__table-preview-column {
  box-sizing: border-box;
  width: 22%;
  min-width: 10rem;
}

.typography-page-template__table-value-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 5rem;
}

.typography-page-template__table-style-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: clamp(14rem, 22vw, 18rem);
  min-inline-size: 14rem;
}

.typography-page-template__table-usage-column {
  box-sizing: border-box;
  inline-size: auto;
  min-inline-size: 14rem;
}

.typography-page-template__utility-copy {
  align-items: flex-start;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--sgds-gap-2-xs);
  min-width: 0;
}

.typography-page-template__utility-copy code {
  flex: 1;
  min-width: 0;
}

.typography-page-template__utility-copy-button {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-sm);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: var(--sgds-spacer-1);
}

.typography-page-template__utility-copy-button:hover {
  background: var(--sgds-bg-translucent-subtle);
}

@media (max-width: 1023px) {
  .typography-page-template__split-row {
    grid-template-columns: minmax(0, 1fr);
  }

  .typography-page-template__table-token-column,
  .typography-page-template__table-utility-column,
  .typography-page-template__table-metric-column,
  .typography-page-template__table-preview-column,
  .typography-page-template__table-style-column,
  .typography-page-template__table-value-column,
  .typography-page-template__table-usage-column {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}

/* Token-view tab group — collapses the empty content-slot gap inside
 * sgds-tab-group when the panels are empty placeholders (the table
 * lives outside the component). Shared by all typography pages that
 * use a token-view switcher above their table. */
.ts-token-tab-group {
  --sgds-gap-xl: 0;
  /* Standardise the space around the tab group to layout-gap-sm on both
   * sides. The gap ABOVE comes from section--spaced (layout-gap-md between
   * the h3+p block and body--prose), the gap BELOW comes from body--prose
   * (layout-gap-lg between the tab group and the table blocks). Negative
   * margins compensate each respective gap so the visible space becomes sm. */
  margin-top: calc(var(--sgds-layout-gap-sm) - var(--sgds-layout-gap-md));
  margin-bottom: calc(var(--sgds-layout-gap-sm) - var(--sgds-layout-gap-lg));
}

/* ── Copyable token snippet row ──────────────────────────────────────────────
 * Shared by all utility and token tables. Shows a code token with a copy
 * button. Defined here so every page that uses TypographyPageTemplate
 * inherits it without duplicating the rules. */


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

</style>
