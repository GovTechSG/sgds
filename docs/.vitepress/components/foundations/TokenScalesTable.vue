<script setup lang="ts">
type Scale = {
  name: string;
  rows: Array<{
    use: string;
    example: string;
  }>;
};

const scales: Scale[] = [
  {
    name: "Numeric",
    rows: [
      { use: "Spacing", example: "--sgds-spacer-5" },
      { use: "Opacity", example: "--sgds-opacity-50" },
      { use: "Colour ramp step", example: "--sgds-purple-600" },
    ],
  },
  {
    name: "Size",
    rows: [
      { use: "Icon size", example: "--sgds-icon-size-lg" },
      { use: "Border radius", example: "--sgds-border-radius-sm" },
      { use: "Component height", example: "--sgds-form-height-md" },
    ],
  },
  {
    name: "Level",
    rows: [
      { use: "Surface elevation", example: "--sgds-elevation-surface-1" },
      { use: "Layer order", example: "--sgds-z-index-tooltip" },
      { use: "Border width", example: "--sgds-border-width-1" },
    ],
  },
  {
    name: "Ratio",
    rows: [
      { use: "Body line height", example: "--sgds-line-height-body-md" },
      { use: "Heading line height", example: "--sgds-line-height-heading-md" },
    ],
  },
  {
    name: "Categorical",
    rows: [
      { use: "Font weight", example: "--sgds-font-weight-bold" },
      { use: "Text role", example: "--sgds-color-muted" },
      { use: "Surface role", example: "--sgds-surface-raised" },
    ],
  },
  {
    name: "Positional",
    rows: [
      { use: "Horizontal padding", example: "--sgds-form-padding-x" },
      { use: "Vertical padding", example: "--sgds-form-padding-y" },
    ],
  },
  {
    name: "Direction",
    rows: [
      { use: "Inline padding", example: "--sgds-padding-inline" },
      { use: "Top padding", example: "--sgds-padding-top" },
    ],
  },
];
</script>

<template>
  <sgds-table tableBorder headerBackground responsive="always">
    <sgds-table-row>
      <sgds-table-head class="sgds:align-top">Scale</sgds-table-head>
      <sgds-table-head class="sgds:align-top">What it applies to</sgds-table-head>
      <sgds-table-head class="sgds:align-top">Scale example</sgds-table-head>
    </sgds-table-row>
    <template v-for="scale in scales" :key="scale.name">
      <sgds-table-row
        v-for="(row, rowIndex) in scale.rows"
        :key="`${scale.name}-${row.use}`"
      >
        <sgds-table-cell class="sgds:align-top">
          <span
            v-if="rowIndex === 0"
            class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal"
          >
            {{ scale.name }}
          </span>
        </sgds-table-cell>
        <sgds-table-cell class="sgds:align-top">
          <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            {{ row.use }}
          </span>
        </sgds-table-cell>
        <sgds-table-cell class="sgds:align-top">
          <CodeToken :label="row.example" />
        </sgds-table-cell>
      </sgds-table-row>
    </template>
  </sgds-table>
</template>
