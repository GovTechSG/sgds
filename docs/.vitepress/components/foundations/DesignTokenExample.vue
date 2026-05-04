<script setup lang="ts">
import svgSource from "./assets/design-token-example.svg?raw";
import DesignTokenSvgViewer from "./DesignTokenSvgViewer.vue";

// The exported SVG includes an "Example" title at the top (y=0–~70) above
// the column headers. The page already renders an h2 "Example", so crop the
// viewBox to start below the title text.
const VIEWBOX_TOP_OFFSET = 100;
const NATIVE_HEIGHT = 2612;

const tokenizedSvgSource = svgSource
  .replace(
    /viewBox="0 0 1408 2612"/,
    `viewBox="0 ${VIEWBOX_TOP_OFFSET} 1408 ${NATIVE_HEIGHT - VIEWBOX_TOP_OFFSET}"`,
  )
  .replace(/height="2612"/, `height="${NATIVE_HEIGHT - VIEWBOX_TOP_OFFSET}"`)
  // Box colours mirror the pill tones in the anatomy diagrams above:
  // namespace = neutral, context = accent, object = primary, scale = success.
  // Text uses fixed-dark so it stays legible on the pastel surface-muted
  // chips, which don't flip in dark mode.
  .replaceAll('fill="#222222"', 'fill="var(--sgds-color-fixed-dark)"')
  .replaceAll('fill="#D9D9D9" fill-opacity="0.25"', 'fill="var(--sgds-neutral-surface-muted)"')
  .replaceAll('fill="#C7EFFF"', 'fill="var(--sgds-accent-surface-muted)"')
  .replaceAll('fill="#FFEBEB"', 'fill="var(--sgds-primary-surface-muted)"')
  .replaceAll('fill="#ECFFEB"', 'fill="var(--sgds-success-surface-muted)"')
  .replaceAll('fill="white"', 'fill="var(--sgds-bg-default)"');
</script>

<template>
  <DesignTokenSvgViewer
    :svg-source="tokenizedSvgSource"
    title="Design token example"
    :native-width="1408"
  />
</template>
