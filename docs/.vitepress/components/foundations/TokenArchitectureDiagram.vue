<script setup lang="ts">
type Layer = {
  label: string;
  title: string;
  description: string;
  examples: string[];
};

type Family = {
  title: string;
  description: string;
  examples: string[];
};

const layers: Layer[] = [
  {
    label: "01",
    title: "Primitive",
    description: "Base SGDS scales in root.css. They hold visual values such as palette steps, spacer values, dimensions, type sizes, radius, width, opacity, motion, z-index, and elevation.",
    examples: ["--sgds-purple-600", "--sgds-spacer-5", "--sgds-font-size-16"],
  },
  {
    label: "02",
    title: "Semantic",
    description: "Meaningful aliases in day.css and night.css. They describe interface roles such as background, surface, text, border, primary, danger, warning, success, and form.",
    examples: ["--sgds-bg-default", "--sgds-primary-surface-default", "--sgds-form-danger-border-color-default"],
  },
  {
    label: "03",
    title: "Responsive",
    description: "Breakpoint-aware aliases in responsive.css. They remap typography, line-height, layout gap, component gap, padding, and container width.",
    examples: ["--sgds-font-size-heading-md", "--sgds-layout-gap-md", "--sgds-container-width"],
  },
  {
    label: "04",
    title: "Component usage",
    description: "SGDS components consume the shared tokens and expose documented hooks where styling needs to be scoped to a component, such as form sizing, component measurements, CSS custom properties, or parts.",
    examples: ["--sgds-form-height-md", "--sgds-form-icon-size-md", "--sidenav-theme-color"],
  },
];

const families: Family[] = [
  {
    title: "Colour",
    description: "Primitive palettes become role-based surface, text, border, background, state, and form tokens.",
    examples: ["--sgds-product-primary-600", "--sgds-color-default", "--sgds-danger-surface-default"],
  },
  {
    title: "Typography",
    description: "Font family, weight, size, line-height, letter spacing, paragraph spacing, and responsive text styles.",
    examples: ["--sgds-font-family-brand", "--sgds-font-size-body-md", "--sgds-line-height-xs"],
  },
  {
    title: "Spacing",
    description: "Spacer values map into gap, padding, margin, layout, component, and text spacing aliases.",
    examples: ["--sgds-spacer-5", "--sgds-gap-md", "--sgds-component-padding-md"],
  },
  {
    title: "Shape and layer",
    description: "Radius, border width, dimensions, elevation, z-index, motion, breakpoints, and icon sizing.",
    examples: ["--sgds-border-radius-md", "--sgds-elevation-surface-3", "--sgds-z-index-modal"],
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <div class="sgds-grid">
      <div
        v-for="layer in layers"
        :key="layer.title"
        class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:flex sgds:min-w-0"
      >
        <sgds-card class="sgds:h-full sgds:w-full sgds:min-w-0">
          <span slot="subtitle">Layer {{ layer.label }}</span>
          <span slot="title">{{ layer.title }}</span>
          <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
            <p class="sgds:m-0 sgds:text-body-sm sgds:text-subtle">
              {{ layer.description }}
            </p>
            <code
              v-for="example in layer.examples"
              :key="example"
              class="sgds:block sgds:max-w-full sgds:break-all sgds:rounded-md sgds:bg-surface-raised sgds:px-component-sm sgds:py-[var(--sgds-padding-2-xs)] sgds:text-body-sm"
            >
              {{ example }}
            </code>
          </div>
        </sgds-card>
      </div>
    </div>

    <div class="sgds-grid">
      <div
        v-for="family in families"
        :key="family.title"
        class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:flex sgds:min-w-0"
      >
        <sgds-card class="sgds:h-full sgds:w-full sgds:min-w-0" tinted>
          <span slot="title">{{ family.title }}</span>
          <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
            <p class="sgds:m-0 sgds:text-body-sm sgds:text-subtle">
              {{ family.description }}
            </p>
            <code
              v-for="example in family.examples"
              :key="example"
              class="sgds:block sgds:max-w-full sgds:break-all sgds:rounded-md sgds:bg-surface-default sgds:px-component-sm sgds:py-[var(--sgds-padding-2-xs)] sgds:text-body-sm"
            >
              {{ example }}
            </code>
          </div>
        </sgds-card>
      </div>
    </div>
  </div>
</template>
