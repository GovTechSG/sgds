<script setup lang="ts">
type Category = {
  name: string;
  rows: Array<{
    cover: string;
    example: string;
  }>;
};

const categories: Category[] = [
  {
    name: "Colour",
    rows: [
      { cover: "Backgrounds", example: "--sgds-bg-default" },
      { cover: "Surfaces", example: "--sgds-surface-raised" },
      { cover: "Text", example: "--sgds-color-default" },
      { cover: "Borders", example: "--sgds-border-color-muted" },
      { cover: "Interactive component colours", example: "--sgds-primary-bg-default" },
    ],
  },
  {
    name: "Typography",
    rows: [
      { cover: "Font family", example: "--sgds-font-family-brand" },
      { cover: "Font size", example: "--sgds-font-size-body-md" },
      { cover: "Font weight", example: "--sgds-font-weight-regular" },
      { cover: "Line height", example: "--sgds-line-height-xs" },
      { cover: "Letter spacing", example: "--sgds-letter-spacing-normal" },
      { cover: "Paragraph spacing", example: "--sgds-paragraph-spacing-md" },
    ],
  },
  {
    name: "Spacing",
    rows: [
      { cover: "Margins", example: "--sgds-margin-md" },
      { cover: "Paddings", example: "--sgds-padding-lg" },
      { cover: "Gaps between elements", example: "--sgds-gap-xs" },
    ],
  },
  {
    name: "Sizing",
    rows: [
      { cover: "Icon sizes", example: "--sgds-icon-size-lg" },
      { cover: "Form control heights", example: "--sgds-form-height-md" },
      { cover: "Component dimensions", example: "--sgds-dimension-320" },
      { cover: "Container sizes", example: "--sgds-container-max-width-lg" },
    ],
  },
  {
    name: "Border",
    rows: [
      { cover: "Border width", example: "--sgds-border-width-1" },
      { cover: "Border radius", example: "--sgds-border-radius-md" },
      { cover: "Form border width", example: "--sgds-form-border-width-default" },
    ],
  },
  {
    name: "Shadow",
    rows: [
      { cover: "Surface elevation", example: "--sgds-elevation-surface-1" },
      { cover: "Edge elevation", example: "--sgds-elevation-edge-top" },
    ],
  },
  {
    name: "Opacity",
    rows: [
      { cover: "Transparency levels", example: "--sgds-opacity-50" },
      { cover: "Visibility", example: "--sgds-opacity-100" },
      { cover: "Subtle overlays", example: "--sgds-opacity-10" },
    ],
  },
  {
    name: "Timing",
    rows: [
      { cover: "Animation duration", example: "--sgds-motion-duration-fast" },
      { cover: "Easing functions", example: "--sgds-motion-easing-enter" },
      { cover: "Standard motion", example: "--sgds-motion-duration-standard" },
    ],
  },
  {
    name: "Z-index",
    rows: [
      { cover: "Modals", example: "--sgds-z-index-modal" },
      { cover: "Floating elements", example: "--sgds-z-index-floating" },
      { cover: "Raised elements", example: "--sgds-z-index-raised" },
      { cover: "Overlays", example: "--sgds-z-index-overlay" },
    ],
  },
  {
    name: "Breakpoints",
    rows: [
      { cover: "Viewport widths", example: "--sgds-breakpoint-sm" },
      { cover: "Layout breakpoints", example: "--sgds-breakpoint-lg" },
      { cover: "Token adaptation points", example: "--sgds-breakpoint-xl" },
    ],
  },
  {
    name: "Grid",
    rows: [
      { cover: "Grid row gap", example: "--sgds-layout-gap-sm" },
      { cover: "Grid column gap", example: "--sgds-layout-gap-md" },
      { cover: "Grid width", example: "--sgds-container-width" },
    ],
  },
];
</script>

<template>
  <sgds-table tableBorder headerBackground responsive="always">
    <sgds-table-row>
      <sgds-table-head class="sgds:align-top">Category</sgds-table-head>
      <sgds-table-head class="sgds:align-top">What it covers</sgds-table-head>
      <sgds-table-head class="sgds:align-top">Examples</sgds-table-head>
    </sgds-table-row>
    <template v-for="cat in categories" :key="cat.name">
      <sgds-table-row
        v-for="(row, rowIndex) in cat.rows"
        :key="`${cat.name}-${row.cover}`"
      >
        <sgds-table-cell class="sgds:align-top">
          <span
            v-if="rowIndex === 0"
            class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal"
          >
            {{ cat.name }}
          </span>
        </sgds-table-cell>
        <sgds-table-cell class="sgds:align-top">
          <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            {{ row.cover }}
          </span>
        </sgds-table-cell>
        <sgds-table-cell class="sgds:align-top">
          <CodeToken :label="row.example" />
        </sgds-table-cell>
      </sgds-table-row>
    </template>
  </sgds-table>
</template>
