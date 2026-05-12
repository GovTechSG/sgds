<script setup lang="ts">
type Column = { label: string; value: string; x: number };
type FilledBar = { x: number; y: number; h: number; w?: number; variant?: "inverse" | "scrim" };
type OutlinedBar = { x: number; y: number; h: number; w?: number };
type FormContainer = { x: number; y: number; w: number; h: number };
type LabelItem = {
  x: number;
  y: number;
  lines: string[];
  w?: number;
  align?: "left" | "right";
};
type Connector = { x1: number; x2: number; y: number };

// All coordinates are in the Figma source frame (origin at left=64, top=1192).
// The SVG uses viewBox="64 1192 1376 1560" so these values can be used directly.
const columns: Column[] = [
  { label: "global-layer-", value: "base (0)", x: 192 },
  { label: "global-layer-", value: "raised (100)", x: 352 },
  { label: "global-layer-", value: "floating (400)", x: 512 },
  { label: "global-layer-", value: "overlay (800)", x: 672 },
  { label: "global-layer-", value: "modal (1600)", x: 832 },
  { label: "local-layer-", value: "raised (1700)", x: 992 },
  { label: "local-layer-", value: "floating (2000)", x: 1152 },
  { label: "local-layer-", value: "overlay (2400)", x: 1312 },
];

const filledBars: FilledBar[] = [
  // Scrim (full-height grey) must render BEFORE the modal so the modal sits over it
  { x: 812, y: 1472, h: 1198, variant: "scrim" },
  // global-layer-raised (100)
  { x: 352, y: 1920, h: 320 },
  // global-layer-floating (200) — stacks
  { x: 512, y: 1472, h: 80 },
  { x: 512, y: 1553, h: 320 },
  { x: 512, y: 1992, h: 192 },
  { x: 512, y: 2463.5, h: 192 },
  // global-layer-overlay (400)
  { x: 672, y: 1600, h: 128 },
  { x: 672, y: 2304, h: 144 },
  // global-layer-modal (800)
  { x: 832, y: 1623, h: 896 },
  // local-layer-raised (900)
  { x: 992, y: 1719, h: 320 },
  // local-layer-floating (1000)
  { x: 1152, y: 2278.5, h: 192 },
  // local-layer-overlay (1200)
  { x: 1312, y: 1719, h: 144 },
];

const outlinedBars: OutlinedBar[] = [
  { x: 192, y: 1600, h: 256 },
  { x: 212, y: 1784, h: 48 },
  { x: 192, y: 2304, h: 64 },
  { x: 192, y: 2400, h: 64 },
  { x: 192, y: 2496, h: 32 },
  { x: 192, y: 2544, h: 32 },
  { x: 192, y: 2608, h: 48 },
  { x: 372, y: 1944, h: 48 },
  { x: 532, y: 1488, h: 48 },
  { x: 852, y: 2119, h: 64 },
  { x: 852, y: 2215, h: 64 },
  { x: 852, y: 2311, h: 32 },
  { x: 852, y: 2359, h: 32 },
  { x: 852, y: 2423, h: 48 },
];

const formContainers: FormContainer[] = [
  { x: 820, y: 2087, w: 172, h: 416 },
  { x: 160, y: 2272, w: 172, h: 416 },
];

const labels: LabelItem[] = [
  { x: 564, y: 1472, lines: ["Main nav (2)"] },
  { x: 564, y: 1502, lines: ["Button"] },
  { x: 704, y: 1654, lines: ["Toast (3)"] },
  { x: 544, y: 1683, lines: ["Mega", "menu/", "Dropdown", "menu (2)"], w: 108 },
  { x: 864, y: 1623, lines: ["Modal (4)"] },
  { x: 222, y: 1718, lines: ["Panel"] },
  { x: 244, y: 1798, lines: ["Button"] },
  { x: 384, y: 2060, lines: ["Card (1)", "On hover (5)"], w: 108 },
  { x: 1024, y: 1859, lines: ["Card (1)", "On hover (5)"], w: 108 },
  { x: 180, y: 2051, lines: ["Page", "background"], align: "right", w: 90 },
  { x: 762, y: 2061, lines: ["Scrim"] },
  { x: 544, y: 2058, lines: ["Overflow", "menu/", "Dropdown", "menu (2)"], w: 108 },
  { x: 404, y: 1958, lines: ["Icon button"] },
  { x: 704, y: 2364, lines: ["Tooltip (3)"] },
  { x: 1344, y: 1779, lines: ["Tooltip (3)"] },
  { x: 224, y: 2326, lines: ["Text input"] },
  { x: 224, y: 2402, lines: ["Select/", "Combobox/", "Datepicker"], w: 108 },
  { x: 224, y: 2516, lines: ["Radio button/", "Checkbox"], w: 108 },
  { x: 224, y: 2622, lines: ["Button"] },
  { x: 544, y: 2509, lines: ["Select", "menu/", "Combobox", "menu/", "Datepicker", "menu (2)"], w: 108 },
  { x: 884, y: 2141, lines: ["Text input"] },
  { x: 884, y: 2217, lines: ["Select/", "Combobox/", "Datepicker"], w: 108 },
  { x: 884, y: 2331, lines: ["Radio button/", "Checkbox"], w: 108 },
  { x: 884, y: 2437, lines: ["Button"] },
  { x: 1184, y: 2324, lines: ["Select", "menu/", "Combobox", "menu/", "Datepicker", "menu (2)"], w: 108 },
  { x: 114, y: 2470, lines: ["Form"] },
  { x: 1004, y: 2285, lines: ["Form"] },
];

const connectors: Connector[] = [
  { x1: 212, x2: 512, y: 2464 },
  { x1: 212, x2: 672, y: 2304 },
  { x1: 1012, x2: 1312, y: 1719.5 },
  { x1: 392, x2: 512, y: 1992 },
  { x1: 872, x2: 1152, y: 2279 },
];
</script>

<template>
  <section class="lp-diagram-wrapper">
    <div class="lp-diagram-scroll">
      <svg
        class="lp-diagram-svg"
        viewBox="64 1192 1376 1560"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Layer z-index stacking order diagram"
      >
        <!-- Outer rounded frame -->
        <rect
          x="64" y="1192"
          width="1376" height="1560"
          rx="32"
          fill="none"
          stroke="var(--sgds-border-color-muted)"
          stroke-width="2"
        />

        <!-- Section headers -->
        <text x="488" y="1256" text-anchor="middle"
          font-family="var(--sgds-font-family-base)"
          font-size="24" font-weight="600"
          letter-spacing="-0.4"
          fill="var(--sgds-body-color-default)"
        >Global</text>
        <text x="488" y="1286" text-anchor="middle"
          font-family="var(--sgds-font-family-base)"
          font-size="16" font-weight="400"
          fill="var(--sgds-body-color-default)"
        >stacking order across the entire</text>
        <text x="488" y="1308" text-anchor="middle"
          font-family="var(--sgds-font-family-base)"
          font-size="16" font-weight="400"
          fill="var(--sgds-body-color-default)"
        >application or page</text>

        <text x="1176" y="1256" text-anchor="middle"
          font-family="var(--sgds-font-family-base)"
          font-size="24" font-weight="600"
          letter-spacing="-0.4"
          fill="var(--sgds-body-color-default)"
        >Local</text>
        <text x="1176" y="1286" text-anchor="middle"
          font-family="var(--sgds-font-family-base)"
          font-size="16" font-weight="400"
          fill="var(--sgds-body-color-default)"
        >inside a parent container to manage</text>
        <text x="1176" y="1308" text-anchor="middle"
          font-family="var(--sgds-font-family-base)"
          font-size="16" font-weight="400"
          fill="var(--sgds-body-color-default)"
        >stacking within that container</text>

        <!-- Column labels -->
        <template v-for="col in columns" :key="`col-label-${col.x}`">
          <text :x="col.x" y="1362" text-anchor="middle"
            font-family="var(--sgds-font-family-base)"
            font-size="16" font-weight="600"
            fill="var(--sgds-body-color-default)"
          >{{ col.label }}</text>
          <text :x="col.x" y="1382" text-anchor="middle"
            font-family="var(--sgds-font-family-base)"
            font-size="16" font-weight="600"
            fill="var(--sgds-body-color-default)"
          >{{ col.value }}</text>
        </template>

        <!-- Global/Local divider -->
        <line x1="912" y1="1192" x2="912" y2="2752"
          stroke="var(--sgds-border-color-emphasis)"
          stroke-width="2" stroke-dasharray="2 8"
        />

        <!-- Form containers (rendered first so column lines draw on top of them) -->
        <rect
          v-for="(form, i) in formContainers"
          :key="`form-${i}`"
          :x="form.x" :y="form.y"
          :width="form.w" :height="form.h"
          fill="var(--sgds-surface-raised)"
          stroke="var(--sgds-border-color-muted)"
          stroke-width="1"
        />

        <!-- Column vertical lines (dashed), except the base column which is a solid axis -->
        <template v-for="col in columns" :key="`col-line-${col.x}`">
          <line
            v-if="col.x === 192"
            :x1="col.x" y1="1472" :x2="col.x" y2="2670"
            stroke="var(--sgds-body-color-default)"
            stroke-width="2"
          />
          <line
            v-else
            :x1="col.x" y1="1472" :x2="col.x" y2="2670"
            stroke="var(--sgds-border-color-emphasis)"
            stroke-width="1"
            stroke-dasharray="2 8"
          />
        </template>

        <!-- Connector lines (horizontal, dashed) -->
        <line
          v-for="(c, i) in connectors"
          :key="`connector-${i}`"
          :x1="c.x1" :y1="c.y"
          :x2="c.x2" :y2="c.y"
          stroke="var(--sgds-border-color-emphasis)"
          stroke-width="1"
          stroke-dasharray="2 4"
        />

        <!-- Filled bars -->
        <rect
          v-for="(bar, i) in filledBars"
          :key="`filled-${i}`"
          :x="bar.x" :y="bar.y"
          :width="bar.w ?? 20" :height="bar.h"
          :fill="bar.variant === 'scrim' ? '#868686' : 'var(--sgds-surface-inverse, #2a2a2a)'"
        />

        <!-- Outlined bars -->
        <rect
          v-for="(bar, i) in outlinedBars"
          :key="`outlined-${i}`"
          :x="bar.x" :y="bar.y"
          :width="bar.w ?? 20" :height="bar.h"
          fill="var(--sgds-surface-raised)"
          stroke="var(--sgds-border-color-emphasis)"
          stroke-width="1"
        />

        <!-- Component labels -->
        <template v-for="(lbl, i) in labels" :key="`label-${i}`">
          <text
            v-for="(line, li) in lbl.lines"
            :key="`label-${i}-${li}`"
            :x="lbl.x"
            :y="lbl.y + li * 18"
            :text-anchor="lbl.align === 'right' ? 'end' : 'start'"
            font-family="var(--sgds-font-family-base)"
            font-size="14" font-weight="400"
            fill="var(--sgds-body-color-default)"
          >{{ line }}</text>
        </template>
      </svg>
    </div>

    <!-- Legend — rendered outside SVG so text stays readable when the SVG scales -->
    <ul class="lp-legend" aria-label="Diagram legend">
      <li class="lp-legend__item">
        <span class="lp-legend__swatch lp-legend__swatch--inverse" aria-hidden="true"></span>
        <span>Components with elevation</span>
      </li>
      <li class="lp-legend__item">
        <span class="lp-legend__swatch lp-legend__swatch--outlined" aria-hidden="true"></span>
        <span>Components without elevation</span>
      </li>
      <li class="lp-legend__item">
        <span class="lp-legend__swatch lp-legend__swatch--scrim" aria-hidden="true"></span>
        <span>Scrim</span>
      </li>
    </ul>
  </section>
</template>

<style>
/* The infographic scales responsively via its viewBox — the SVG fills the
 * container width and shrinks/grows proportionally. */
.lp-diagram-wrapper {
  width: 100%;
}

.lp-diagram-scroll {
  width: 100%;
}

.lp-diagram-svg {
  display: block;
  height: auto;
  width: 100%;
}

.lp-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-component-gap-md) var(--sgds-component-gap-lg);
  list-style: none;
  margin: 0;
  margin-block-start: var(--sgds-layout-gap-sm);
  padding: 0;
}

.lp-legend__item {
  align-items: center;
  color: var(--sgds-body-color-default);
  display: inline-flex;
  font-family: var(--sgds-font-family-base);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  gap: var(--sgds-gap-xs);
  line-height: var(--sgds-line-height-xs);
}

.lp-legend__swatch {
  block-size: 1.5rem;
  border-radius: var(--sgds-border-radius-xs);
  display: inline-block;
  flex-shrink: 0;
  inline-size: 1.5rem;
}

.lp-legend__swatch--inverse {
  background: var(--sgds-surface-inverse, #2a2a2a);
}

.lp-legend__swatch--outlined {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-emphasis);
}

.lp-legend__swatch--scrim {
  background: #868686;
}
</style>
