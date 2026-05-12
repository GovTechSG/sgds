<script setup lang="ts">
import typographyDiagramSource from "./assets/typography.svg?raw";

const highlightLabelToken = "__SGDS_HIGHLIGHT_LABEL__";
const typographyDiagramWithReadableHighlightLabels = typographyDiagramSource
  .split("\n")
  .map((line, index, lines) => {
    const previousLine = lines[index - 1] ?? "";
    if (previousLine.includes('fill="#ECF5FE"')) {
      return line.replaceAll('fill="#1A1A1A"', `fill="${highlightLabelToken}"`);
    }
    return line;
  })
  .join("\n");

const tokenizedTypographyDiagram = typographyDiagramWithReadableHighlightLabels
  .replace(
    /<svg/,
    '<svg class="sgds:block sgds:h-auto sgds:w-full sgds:max-w-full" role="img" aria-label="Display medium bold typography token composition with desktop, tablet, and mobile raw values"',
  )
  .replaceAll('fill="#1A1A1A"', 'fill="var(--sgds-color-default)"')
  .replaceAll('fill="black"', 'fill="var(--sgds-color-default)"')
  .replaceAll('stroke="#1A1A1A"', 'stroke="var(--sgds-color-default)"')
  .replaceAll('fill="white"', 'fill="var(--sgds-surface-default)"')
  .replaceAll('fill="#F7F7F7"', 'fill="var(--sgds-surface-raised)"')
  .replaceAll('fill="#ECF5FE"', 'fill="var(--typography-diagram-primary-surface)"')
  .replaceAll('fill="#FCF1F1"', 'fill="var(--typography-diagram-danger-surface)"')
  .replaceAll(`fill="${highlightLabelToken}"`, 'fill="var(--sgds-color-default)"');
</script>

<template>
  <figure
    class="typography-diagram sgds:m-0 sgds:block sgds:w-full sgds:max-w-full sgds:min-w-0"
    aria-label="Display medium bold typography token composition with responsive raw values"
  >
    <div class="sgds:box-border sgds:block sgds:w-full sgds:max-w-full sgds:min-w-0 sgds:overflow-hidden sgds:rounded-lg sgds:bg-surface-raised sgds:p-component-md">
      <div
        class="sgds:block sgds:w-full sgds:max-w-full"
        v-html="tokenizedTypographyDiagram"
      ></div>
    </div>
  </figure>
</template>

<style>
/* The SVG is rendered through v-html, so these custom properties are the
   bridge that lets its fill attributes follow SGDS theme tokens. */
.typography-diagram {
  --typography-diagram-primary-surface: var(--sgds-primary-surface-muted);
  --typography-diagram-danger-surface: var(--sgds-danger-surface-muted);
}

.sgds-night-theme .typography-diagram {
  --typography-diagram-primary-surface: var(--sgds-primary-surface-emphasis);
  --typography-diagram-danger-surface: var(--sgds-danger-surface-emphasis);
}
</style>
