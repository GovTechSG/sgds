<script setup lang="ts">
import svgSource from "./assets/design-token-example.svg?raw";
import DesignTokenSvgViewer from "./DesignTokenSvgViewer.vue";

// The exported SVG includes an "Example" title at the top (y=0–~70) above
// the column headers. The page already renders an h2 "Example", so crop the
// viewBox to start below the title text.
const VIEWBOX_TOP_OFFSET = 100;
const NATIVE_HEIGHT = 2612;

type Bounds = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const getNumberAttribute = (element: string, attribute: string) =>
  Number(element.match(new RegExp(`${attribute}="([^"]+)"`))?.[1] ?? 0);

const getShapeBounds = (element: string): Bounds | null => {
  if (element.startsWith("<rect")) {
    const x = getNumberAttribute(element, "x");
    const y = getNumberAttribute(element, "y");
    const width = getNumberAttribute(element, "width");
    const height = getNumberAttribute(element, "height");

    return { x1: x, y1: y, x2: x + width, y2: y + height };
  }

  const d = element.match(/d="([^"]+)"/)?.[1];
  const firstMove = d?.match(/M([0-9.]+)[ ,]([0-9.]+)/);
  if (!firstMove) {
    return null;
  }

  const x = Number(firstMove[1]);
  const y = Number(firstMove[2]);
  return { x1: x, y1: y, x2: x + 256, y2: y + 100 };
};

const mutedPillBounds = Array.from(
  svgSource.matchAll(/<(?:rect|path)[^>]*(?:fill="#D9D9D9"|fill="#C7EFFF"|fill="#FFEBEB"|fill="#ECFFEB")[^>]*>/g),
)
  .map(([element]) => getShapeBounds(element))
  .filter((bounds): bounds is Bounds => Boolean(bounds));

const isInsideMutedPill = (element: string) => {
  const firstPoint = element.match(/d="M([0-9.]+)[ ,]([0-9.]+)/);
  if (!firstPoint) {
    return false;
  }

  const x = Number(firstPoint[1]);
  const y = Number(firstPoint[2]);
  return mutedPillBounds.some(({ x1, y1, x2, y2 }) => x >= x1 && x <= x2 && y >= y1 && y <= y2);
};

const tokeniseDarkFill = (element: string) =>
  element.replace(
    'fill="#222222"',
    isInsideMutedPill(element) ? 'fill="var(--sgds-color-fixed-dark)"' : 'fill="var(--sgds-color-default)"',
  );

const tokenizedSvgSource = svgSource
  .replace(
    /viewBox="0 0 1408 2612"/,
    `viewBox="0 ${VIEWBOX_TOP_OFFSET} 1408 ${NATIVE_HEIGHT - VIEWBOX_TOP_OFFSET}"`,
  )
  .replace(/height="2612"/, `height="${NATIVE_HEIGHT - VIEWBOX_TOP_OFFSET}"`)
  // Box colours mirror the pill tones in the anatomy diagrams above:
  // namespace = neutral, context = accent, object = primary, scale = success.
  // Free-standing labels adapt to the theme; pill labels stay dark for the
  // muted token surfaces.
  .replace(/<path[^>]*fill="#222222"[^>]*>/g, tokeniseDarkFill)
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
