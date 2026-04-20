<script setup lang="ts">
import { ref } from "vue";
import CodeToken from "../ui/CodeToken.vue";

const props = withDefaults(
  defineProps<{
    section?: "all" | "surface" | "edge";
  }>(),
  {
    section: "all",
  },
);

const tokenViewOptions = [
  { id: "css-variable", label: "CSS variable" },
  { id: "figma", label: "Figma token" },
] as const;
type TokenViewId = (typeof tokenViewOptions)[number]["id"];
const activeTokenViewId = ref<TokenViewId>("css-variable");

const onTokenViewShow = (event: Event) => {
  const nextView = (event as CustomEvent<{ name?: string }>).detail?.name as TokenViewId | undefined;
  if (nextView && tokenViewOptions.some((o) => o.id === nextView)) activeTokenViewId.value = nextView;
};

const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "css-variable") return token;
  return token.replace(/^--/, "");
};

type ElevationRow = {
  name: string;
  token: string;
  shadowClass: string;
  value: string;
};

type EdgeRow = {
  name: string;
  token: string;
  shadowClass: string;
  direction: "top" | "bottom";
  value: string;
};

const surfaceRows: ElevationRow[] = [
  {
    name: "Surface 1",
    token: "--sgds-elevation-surface-1",
    shadowClass: "elevation-surface-1",
    value: "box-shadow:\n0 0 2px 0 rgba(14, 14, 14, 0.16);",
  },
  {
    name: "Surface 2",
    token: "--sgds-elevation-surface-2",
    shadowClass: "elevation-surface-2",
    value: "box-shadow:\n0 0 2px 0 rgba(14, 14, 14, 0.16), 0 2px 4px 0 rgba(14, 14, 14, 0.08);",
  },
  {
    name: "Surface 3",
    token: "--sgds-elevation-surface-3",
    shadowClass: "elevation-surface-3",
    value: "box-shadow:\n0 0 2px 0 rgba(14, 14, 14, 0.16), 0 4px 8px 0 rgba(14, 14, 14, 0.08);",
  },
  {
    name: "Surface 4",
    token: "--sgds-elevation-surface-4",
    shadowClass: "elevation-surface-4",
    value: "box-shadow:\n0 0 2px 0 rgba(14, 14, 14, 0.16), 0 8px 16px 0 rgba(14, 14, 14, 0.08);",
  },
  {
    name: "Surface 5",
    token: "--sgds-elevation-surface-5",
    shadowClass: "elevation-surface-5",
    value: "box-shadow:\n0 0 2px 0 rgba(14, 14, 14, 0.16), 0 16px 32px 0 rgba(14, 14, 14, 0.08);",
  },
];

const edgeRows: EdgeRow[] = [
  {
    name: "Edge top",
    token: "--sgds-elevation-edge-top",
    shadowClass: "elevation-edge-top",
    direction: "top",
    value: "box-shadow:\n0 -2px 4px 0 rgba(14, 14, 14, 0.08);",
  },
  {
    name: "Edge bottom",
    token: "--sgds-elevation-edge-bottom",
    shadowClass: "elevation-edge-bottom",
    direction: "bottom",
    value: "box-shadow:\n0 2px 4px 0 rgba(14, 14, 14, 0.08);",
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

    <!-- Surface elevation -->
    <template v-if="props.section === 'all' || props.section === 'surface'">
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Surface elevation tokens</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">Surface shadows lift elements above the page. Use progressively higher levels as elements sit further from the base surface.</p>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
        <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
          <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
          <sgds-tab-panel v-for="option in tokenViewOptions" :key="`elevation-${option.id}`" :name="option.id"></sgds-tab-panel>
        </sgds-tab-group>
        <sgds-table tableBorder headerBackground responsive="always" class="elevation-utility-table">
          <sgds-table-row>
            <sgds-table-head class="ev-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
            <sgds-table-head class="ev-value-col">Value (px/rem)</sgds-table-head>
            <sgds-table-head class="ev-preview-col">Preview</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row v-for="row in surfaceRows" :key="row.token">
            <sgds-table-cell class="ev-token-col">
              <CodeToken :label="getTokenValue(row.token)" />
            </sgds-table-cell>
            <sgds-table-cell class="ev-value-col">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:whitespace-pre-wrap">{{ row.value }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="ev-preview-col" aria-hidden="true">
              <div class="ev-shadow-swatch" :class="row.shadowClass"></div>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </div>
    </template>

    <!-- Edge elevation -->
    <template v-if="props.section === 'all' || props.section === 'edge'">
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Edge elevation tokens</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">Edge shadows are directional and indicate that an element is pinned to a viewport edge, casting a shadow toward the content beneath.</p>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
        <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
          <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
          <sgds-tab-panel v-for="option in tokenViewOptions" :key="`elevation-${option.id}`" :name="option.id"></sgds-tab-panel>
        </sgds-tab-group>
      <sgds-table tableBorder headerBackground responsive="always" class="elevation-utility-table">
        <sgds-table-row>
          <sgds-table-head class="ev-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
          <sgds-table-head class="ev-value-col">Value (px/rem)</sgds-table-head>
          <sgds-table-head class="ev-preview-col">Preview</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="row in edgeRows" :key="row.token">
          <sgds-table-cell class="ev-token-col">
            <CodeToken :label="getTokenValue(row.token)" />
          </sgds-table-cell>
          <sgds-table-cell class="ev-value-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:whitespace-pre-wrap">{{ row.value }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="ev-preview-col" aria-hidden="true">
            <div class="ev-edge-preview-wrap">
              <div class="ev-edge-shadow-box" :class="row.shadowClass"></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
      </div>
    </div>
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
  width: 30%;
  min-width: 10rem;
}

.ev-preview-col {
  box-sizing: border-box;
  width: 10%;
  min-width: 5rem;
}

.ev-value-col {
  box-sizing: border-box;
  inline-size: auto;
  min-width: 10rem;
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


/* Token tab group — removes default gap so tabs sit flush above the table.
 * Margin-block compensates parent flex-gap so visible spacing above and below
 * the tab group is always layout-gap-sm. */
.ts-token-tab-group {
  --sgds-gap-xl: 0;
  margin-top: calc(var(--sgds-layout-gap-sm) - var(--sgds-layout-gap-md));
  margin-bottom: calc(var(--sgds-layout-gap-sm) - var(--sgds-layout-gap-lg));
}

/* Snippet row for copy-able token values */
.ts-snippet-row {
  align-items: flex-start;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: flex;
  gap: var(--sgds-gap-2-xs);
  justify-content: space-between;
  padding: 0.375rem var(--sgds-padding-sm);
}

.ts-snippet-code {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: var(--sgds-font-family-mono, monospace);
  font-size: var(--sgds-font-size-body-sm);
  gap: var(--sgds-gap-2-xs);
  line-height: var(--sgds-line-height-xs);
  min-width: 0;
  overflow: visible;
  white-space: normal;
}

.ts-snippet-code span {
  align-self: flex-start;
  color: var(--sgds-body-color-default);
  white-space: nowrap;
}

.ts-snippet-copy-btn {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-sm);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: var(--sgds-spacer-1);
}

.ts-snippet-copy-btn:hover {
  background: var(--sgds-bg-translucent-subtle);
}
</style>
