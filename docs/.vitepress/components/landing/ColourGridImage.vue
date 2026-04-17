<script setup lang="ts">
import gsap from "gsap";
import { onBeforeUnmount, onMounted, ref } from "vue";

const root = ref<SVGSVGElement | null>(null);
let ctx: gsap.Context | undefined;
let observer: IntersectionObserver | undefined;

const TILE_SIZE = 117;
const TILE_GAP = 14;
const RADIUS = 8;
const xStart = -18;
const yStart = -15;
const xPositions = Array.from({ length: 6 }, (_, index) => xStart + index * (TILE_SIZE + TILE_GAP));
const yPositions = Array.from({ length: 6 }, (_, index) => yStart + index * (TILE_SIZE + TILE_GAP));

const rows = [
  ["#e9add6", "#dc80c5", "#d14ca8", "#c7138f", "#8f0b67", "#5f004f"],
  ["#efb8b5", "#e98583", "#dd5556", "#d4171e", "#9d1114", "#760a0c"],
  ["#ffbc75", "#ff861c", "#df7900", "#b76100", "#884a00", "#643300"],
  ["#e6cc28", "#c9b423", "#9d8e20", "#827917", "#5e5a0d", "#373603"],
  ["#5ed995", "#14b85c", "#0d9649", "#087437", "#045327", "#002f17"],
  ["#28c9da", "#25aebe", "#1b8d9a", "#14737e", "#0d5660", "#063940"],
];

function getColourKeyframes(rowIndex: number, columnIndex: number) {
  const row = rows[rowIndex];
  const direction = columnIndex % 2 === 0 ? 1 : -1;

  return [1, 2, 1, 0].map((step) => {
    const nextIndex = (columnIndex + step * direction + row.length) % row.length;

    return {
      attr: { fill: row[nextIndex] },
      duration: 1.4,
      ease: "sine.inOut",
    };
  });
}

onMounted(() => {
  if (!root.value) return;

  ctx = gsap.context(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = gsap.timeline({ paused: true });

    gsap.utils.toArray<SVGRectElement>(".colour-grid-swatch").forEach((swatch) => {
      const rowIndex = Number(swatch.dataset.row);
      const columnIndex = Number(swatch.dataset.column);

      timeline.to(swatch, {
        keyframes: getColourKeyframes(rowIndex, columnIndex),
      }, rowIndex * 0.18 + columnIndex * 0.08);
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
    viewBox="0 0 736 752"
    xmlns="http://www.w3.org/2000/svg"
    class="sgds:block sgds:h-full sgds:w-full"
    aria-label="Colour palette swatches"
  >
    <g v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
      <rect
        v-for="(colour, columnIndex) in row"
        :key="`${rowIndex}-${columnIndex}`"
        class="colour-grid-swatch"
        :data-row="rowIndex"
        :data-column="columnIndex"
        :x="xPositions[columnIndex]"
        :y="yPositions[rowIndex]"
        :width="TILE_SIZE"
        :height="TILE_SIZE"
        :rx="RADIUS"
        :fill="colour"
      />
    </g>
  </svg>
</template>
