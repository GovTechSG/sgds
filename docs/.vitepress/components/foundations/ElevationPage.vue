<script setup lang="ts">
import Section from "./Section.vue";
import CodeToken from "../ui/CodeToken.vue";

const props = withDefaults(
  defineProps<{
    section?: "all" | "surface" | "edge";
  }>(),
  {
    section: "all",
  },
);

type ElevationRow = {
  name: string;
  token: string;
  shadowClass: string;
  description: string;
  usage: string;
};

type EdgeRow = {
  name: string;
  token: string;
  shadowClass: string;
  direction: "top" | "bottom";
  description: string;
  usage: string;
};

const surfaceRows: ElevationRow[] = [
  {
    name: "Surface 1",
    token: "--sgds-elevation-surface-1",
    shadowClass: "elevation-surface-1",
    description: "Subtle lift for elements resting close to the page surface.",
    usage: "Chips, tags, input fields",
  },
  {
    name: "Surface 2",
    token: "--sgds-elevation-surface-2",
    shadowClass: "elevation-surface-2",
    description: "Low elevation for cards and panels on a flat surface.",
    usage: "Cards, inline panels",
  },
  {
    name: "Surface 3",
    token: "--sgds-elevation-surface-3",
    shadowClass: "elevation-surface-3",
    description: "Medium elevation for floating elements above content.",
    usage: "Popovers, floating toolbars",
  },
  {
    name: "Surface 4",
    token: "--sgds-elevation-surface-4",
    shadowClass: "elevation-surface-4",
    description: "High elevation for overlays appearing above the main view.",
    usage: "Drawers, toasts, notifications",
  },
  {
    name: "Surface 5",
    token: "--sgds-elevation-surface-5",
    shadowClass: "elevation-surface-5",
    description: "Maximum elevation for critical overlays requiring full focus.",
    usage: "Modals, dialogs",
  },
];

const edgeRows: EdgeRow[] = [
  {
    name: "Edge top",
    token: "--sgds-elevation-edge-top",
    shadowClass: "elevation-edge-top",
    direction: "top",
    description: "Shadow cast upward for elements anchored to the bottom of the viewport.",
    usage: "Bottom navigation bars, bottom toolbars",
  },
  {
    name: "Edge bottom",
    token: "--sgds-elevation-edge-bottom",
    shadowClass: "elevation-edge-bottom",
    direction: "bottom",
    description: "Shadow cast downward for elements anchored to the top of the viewport.",
    usage: "Sticky headers, top navigation bars",
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

    <!-- Surface elevation -->
    <template v-if="props.section === 'all' || props.section === 'surface'">
    <Section
      title="Surface elevation"
      description="Surface shadows lift elements above the page. Use progressively higher levels as elements sit further from the base surface."
    >
      <sgds-table tableBorder headerBackground responsive="always" class="elevation-utility-table">
        <sgds-table-row>
          <sgds-table-head class="ev-token-col">Token</sgds-table-head>
          <sgds-table-head class="ev-preview-col">Preview</sgds-table-head>
          <sgds-table-head class="ev-desc-col">Description</sgds-table-head>
          <sgds-table-head class="ev-usage-col">Usage</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="row in surfaceRows" :key="row.token">
          <sgds-table-cell class="ev-token-col">
            <CodeToken :label="row.token" />
          </sgds-table-cell>
          <sgds-table-cell class="ev-preview-col" aria-hidden="true">
            <div class="ev-shadow-swatch" :class="row.shadowClass"></div>
          </sgds-table-cell>
          <sgds-table-cell class="ev-desc-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.description }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="ev-usage-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </Section>
    </template>

    <!-- Edge elevation -->
    <template v-if="props.section === 'all' || props.section === 'edge'">
    <Section
      title="Edge elevation"
      description="Edge shadows are directional and indicate that an element is pinned to a viewport edge, casting a shadow toward the content beneath."
    >
      <sgds-table tableBorder headerBackground responsive="always" class="elevation-utility-table">
        <sgds-table-row>
          <sgds-table-head class="ev-token-col">Token</sgds-table-head>
          <sgds-table-head class="ev-preview-col">Preview</sgds-table-head>
          <sgds-table-head class="ev-desc-col">Description</sgds-table-head>
          <sgds-table-head class="ev-usage-col">Usage</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="row in edgeRows" :key="row.token">
          <sgds-table-cell class="ev-token-col">
            <CodeToken :label="row.token" />
          </sgds-table-cell>
          <sgds-table-cell class="ev-preview-col" aria-hidden="true">
            <div class="ev-edge-preview-wrap">
              <div class="ev-edge-shadow-box" :class="row.shadowClass"></div>
            </div>
          </sgds-table-cell>
          <sgds-table-cell class="ev-desc-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.description }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="ev-usage-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </Section>
    </template>

  </div>
</template>

<style>
/* Table shell */
.elevation-utility-table {
  inline-size: max-content;
  max-inline-size: 100%;
  width: auto;
}

.elevation-utility-table sgds-table-head,
.elevation-utility-table sgds-table-cell {
  box-sizing: border-box;
  max-inline-size: 22rem;
  overflow-wrap: anywhere;
  white-space: normal;
}

.elevation-utility-table sgds-table-cell {
  height: auto;
  vertical-align: top;
}

/* Column widths — clamp() cannot be expressed as sgds: utilities */
.ev-name-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 6rem;
  min-inline-size: 5rem;
}

.ev-token-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 20rem;
  min-inline-size: 16rem;
}

.ev-preview-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 6rem;
}

.ev-desc-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 18rem;
  min-inline-size: 12rem;
}

.ev-usage-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 18rem;
  min-inline-size: 12rem;
}

/* Shadow tokens — applied via CSS variables, no sgds: utility equivalent exists */
.elevation-surface-1 { box-shadow: var(--sgds-elevation-surface-1); }
.elevation-surface-2 { box-shadow: var(--sgds-elevation-surface-2); }
.elevation-surface-3 { box-shadow: var(--sgds-elevation-surface-3); }
.elevation-surface-4 { box-shadow: var(--sgds-elevation-surface-4); }
.elevation-surface-5 { box-shadow: var(--sgds-elevation-surface-5); }
.elevation-edge-top    { box-shadow: var(--sgds-elevation-edge-top); }
.elevation-edge-bottom { box-shadow: var(--sgds-elevation-edge-bottom); }

/* Surface shadow swatch in the table */
.ev-shadow-swatch {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  height: 3rem;
  width: 5rem;
}

/* Edge shadow preview — apply the elevation token directly to the sample box */
.ev-edge-preview-wrap {
  align-items: center;
  display: flex;
}

.ev-edge-shadow-box {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  height: 3rem;
  width: 5rem;
}

@media (max-width: 1023px) {
  .ev-name-col,
  .ev-token-col,
  .ev-preview-col,
  .ev-desc-col,
  .ev-usage-col {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}
</style>
