<script setup lang="ts">
import svgSource from "./assets/design-token-structure-chart.svg?raw";
import DesignTokenSvgViewer from "./DesignTokenSvgViewer.vue";

// The exported SVG includes a "Design token structure chart" title at the
// top above the column headers. The page already renders an h2 with that
// label, so crop the viewBox to start below the title text.
const VIEWBOX_TOP_OFFSET = 100;
const NATIVE_HEIGHT = 2352;
const CHART_LABEL_Y_LIMIT = 260;

const tokeniseDarkFill = (element: string) => {
  if (element.startsWith("<rect") && element.includes('y="170"')) {
    return element.replace('fill="#222222"', 'fill="var(--sgds-color-default)"');
  }

  const firstPathY = Number(element.match(/[ML][0-9.]+[ ,]([0-9.]+)/)?.[1]);
  const fillToken =
    Number.isFinite(firstPathY) && firstPathY < CHART_LABEL_Y_LIMIT
      ? "var(--sgds-color-default)"
      : "var(--sgds-color-fixed-dark)";

  return element.replace('fill="#222222"', `fill="${fillToken}"`);
};

const tokenizedSvgSource = svgSource
  .replace(
    /viewBox="0 0 3136 2352"/,
    `viewBox="0 ${VIEWBOX_TOP_OFFSET} 3136 ${NATIVE_HEIGHT - VIEWBOX_TOP_OFFSET}"`,
  )
  .replace(/height="2352"/, `height="${NATIVE_HEIGHT - VIEWBOX_TOP_OFFSET}"`)
  // Box colours mirror the pill tones in the anatomy diagrams above:
  // namespace = neutral, context = accent, object = primary, scale = success.
  // Header and column labels adapt to the active theme; pill labels stay dark
  // for the muted token surfaces.
  .replace(/<(?:rect|path)[^>]*fill="#222222"[^>]*>/g, tokeniseDarkFill)
  .replaceAll('fill="#D9D9D9" fill-opacity="0.25"', 'fill="var(--sgds-neutral-surface-muted)"')
  .replaceAll('fill="#C7EFFF"', 'fill="var(--sgds-accent-surface-muted)"')
  .replaceAll('fill="#FFEBEB"', 'fill="var(--sgds-primary-surface-muted)"')
  .replaceAll('fill="#ECFFEB"', 'fill="var(--sgds-success-surface-muted)"')
  .replaceAll('fill="white"', 'fill="var(--sgds-bg-default)"');
</script>

<template>
  <DesignTokenSvgViewer
    :svg-source="tokenizedSvgSource"
    title="Design token structure chart"
    :native-width="3136"
  />
</template>
