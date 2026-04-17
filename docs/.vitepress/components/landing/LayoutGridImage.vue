<script setup lang="ts">
import gsap from "gsap";
import { onBeforeUnmount, onMounted, ref } from "vue";

const root = ref<SVGSVGElement | null>(null);
let ctx: gsap.Context | undefined;
let observer: IntersectionObserver | undefined;

const WIDTH = 1320;
const HEIGHT = 752;
const margin = 83;
const columnWidth = 66;
const gutter = 33;
const startGutter = 0;
const columnTop = 30;
const columnHeight = 576;
const columns = Array.from({ length: 12 }, (_, index) => getColumnX(index));
const gapLabelIndexes = Array.from({ length: 11 }, (_, index) => index);

function getColumnX(index: number, gap = gutter) {
  return margin + index * (columnWidth + gap);
}

function getGapBounds(index: number, gap = gutter) {
  return {
    left: getColumnX(index, gap) + columnWidth,
    right: getColumnX(index + 1, gap),
  };
}

onMounted(() => {
  if (!root.value) return;

  ctx = gsap.context(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const columnNodes = gsap.utils.toArray<SVGRectElement>(".layout-grid-column");
    const gapGroups = gsap.utils.toArray<SVGGElement>(".layout-grid-gap");
    const gapLabels = gsap.utils.toArray<SVGTextElement>(".layout-grid-gap-label");

    columnNodes.forEach((column) => {
      const index = Number(column.dataset.index);
      gsap.set(column, { attr: { x: getColumnX(index, startGutter) } });
    });

    gapGroups.forEach((group) => {
      const index = Number(group.dataset.index);
      const { left, right } = getGapBounds(index, startGutter);

      gsap.set(group.querySelector(".layout-grid-gap-line"), { attr: { x1: left, x2: right }, opacity: 0 });
      gsap.set(group.querySelector(".layout-grid-gap-left"), { attr: { x1: left, x2: left }, opacity: 0 });
      gsap.set(group.querySelector(".layout-grid-gap-right"), { attr: { x1: right, x2: right }, opacity: 0 });
    });

    gapLabels.forEach((label) => {
      const index = Number(label.dataset.index);
      const { left } = getGapBounds(index, startGutter);
      gsap.set(label, { attr: { x: left + 4 }, opacity: 0 });
    });

    const timeline = gsap.timeline({ paused: true });

    columnNodes.forEach((column, index) => {
      timeline.to(
        column,
        { attr: { x: getColumnX(index) }, duration: 1.8, ease: "power3.inOut" },
        index === 0 ? 0 : "<",
      );
    });

    gapGroups.forEach((group, index) => {
      const { left, right } = getGapBounds(index);

      timeline.to(
        group.querySelector(".layout-grid-gap-line"),
        { attr: { x1: left, x2: right }, opacity: 1, duration: 1.8, ease: "power3.inOut" },
        0,
      );
      timeline.to(
        group.querySelector(".layout-grid-gap-left"),
        { attr: { x1: left, x2: left }, opacity: 1, duration: 1.8, ease: "power3.inOut" },
        0,
      );
      timeline.to(
        group.querySelector(".layout-grid-gap-right"),
        { attr: { x1: right, x2: right }, opacity: 1, duration: 1.8, ease: "power3.inOut" },
        0,
      );
    });

    gapLabels.forEach((label, index) => {
      const { left } = getGapBounds(index);

      timeline.to(
        label,
        { attr: { x: left + 4 }, opacity: 1, duration: 0.65, ease: "power1.out" },
        1.05,
      );
    });

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        timeline.play(0);
        observer?.disconnect();
        observer = undefined;
      },
      { threshold: 0.35 },
    );

    observer.observe(root.value!);
  }, root.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  ctx?.revert();
});
</script>

<template>
  <svg
    ref="root"
    viewBox="0 0 1320 752"
    xmlns="http://www.w3.org/2000/svg"
    class="landing-layout-grid-image sgds:block sgds:h-full sgds:w-full"
    aria-label="Layout grid measurement diagram"
  >
    <rect :width="WIDTH" :height="HEIGHT" fill="var(--landing-layout-grid-bg, #FCE5C1)" />

    <g>
      <rect
        v-for="(x, index) in columns"
        :key="x"
        class="layout-grid-column"
        :data-index="index"
        :x="x"
        :y="columnTop"
        :width="columnWidth"
        :height="columnHeight"
        fill="var(--landing-layout-grid-column, #F1D29B)"
      />
    </g>

    <g fill="none" stroke="var(--sgds-danger-color-default)" stroke-width="1" opacity="0.78">
      <line x1="0" y1="424" x2="83" y2="424" />
      <line x1="0" y1="418" x2="0" y2="430" />
      <line x1="83" y1="418" x2="83" y2="430" />

      <line x1="1237" y1="424" x2="1320" y2="424" />
      <line x1="1237" y1="418" x2="1237" y2="430" />
      <line x1="1320" y1="418" x2="1320" y2="430" />

      <line x1="83" y1="636" x2="1237" y2="636" />
      <line x1="83" y1="630" x2="83" y2="642" />
      <line x1="1237" y1="630" x2="1237" y2="642" />

      <line x1="0" y1="696" x2="1320" y2="696" />
      <line x1="0" y1="690" x2="0" y2="702" />
      <line x1="1320" y1="690" x2="1320" y2="702" />

      <g v-for="index in gapLabelIndexes" :key="index" class="layout-grid-gap" :data-index="index">
        <line
          class="layout-grid-gap-line"
          :x1="columns[index] + columnWidth"
          y1="560"
          :x2="columns[index + 1]"
          y2="560"
        />
        <line
          class="layout-grid-gap-left"
          :x1="columns[index] + columnWidth"
          y1="554"
          :x2="columns[index] + columnWidth"
          y2="566"
        />
        <line
          class="layout-grid-gap-right"
          :x1="columns[index + 1]"
          y1="554"
          :x2="columns[index + 1]"
          y2="566"
        />
      </g>

      <line x1="0" y1="390" x2="0" y2="500" stroke-dasharray="1 2" opacity="0.5" />
      <line x1="83" y1="390" x2="83" y2="606" stroke-dasharray="1 2" opacity="0.5" />
      <line x1="1237" y1="390" x2="1237" y2="606" stroke-dasharray="1 2" opacity="0.5" />
      <line x1="1320" y1="390" x2="1320" y2="500" stroke-dasharray="1 2" opacity="0.5" />
    </g>

    <g fill="var(--sgds-danger-color-default)" font-family="Inter, Arial, sans-serif" font-size="12">
      <text x="28" y="446">100px</text>
      <text x="1262" y="446">100px</text>
      <text x="641" y="654">1400px</text>
      <text x="641" y="714">1600px</text>

      <text
        v-for="index in gapLabelIndexes"
        :key="`label-${index}`"
        class="layout-grid-gap-label"
        :data-index="index"
        :x="columns[index] + columnWidth + 4"
        y="578"
      >
        40px
      </text>
    </g>
  </svg>
</template>

<style>
/* Local SVG colour bridge: the beige artwork colour is not an SGDS semantic token, so expose it as a theme-aware custom property. */
.landing-layout-grid-image {
  --landing-layout-grid-bg: #FCE5C1;
  --landing-layout-grid-column: color-mix(in srgb, #F1D29B 60%, transparent);
}

.sgds-night-theme .landing-layout-grid-image {
  --landing-layout-grid-bg: var(--sgds-surface-raised);
  --landing-layout-grid-column: color-mix(in srgb, var(--sgds-warning-surface-muted) 16%, transparent);
}
</style>
