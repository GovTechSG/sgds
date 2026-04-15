<script setup lang="ts">
import { computed, ref } from "vue";
import TypographyPageTemplate from "../TypographyPageTemplate.vue";
import CodeToken from "../ui/CodeToken.vue";
import CopyCodeToken from "../ui/CopyCodeToken.vue";

const props = defineProps<{
  section: "surface" | "edge";
}>();

type ElevationUtility = {
  utilityClass: string;
  token: string;
  usage: string;
  previewClass: string;
  previewLabel: string;
};

type ElevationUtilityGroup = {
  id: string;
  label: string;
  description: string;
  rows: ElevationUtility[];
};

const surfaceUtilities: ElevationUtility[] = [
  {
    utilityClass: "sgds:shadow-1",
    token: "--sgds-elevation-surface-1",
    usage: "Subtle elevation for elements resting close to the page surface.",
    previewClass: "sgds:shadow-1",
    previewLabel: "1",
  },
  {
    utilityClass: "sgds:shadow-2",
    token: "--sgds-elevation-surface-2",
    usage: "Default raised treatment for cards, tiles, and small panels.",
    previewClass: "sgds:shadow-2",
    previewLabel: "2",
  },
  {
    utilityClass: "sgds:shadow-3",
    token: "--sgds-elevation-surface-3",
    usage: "Use for active cards, expanded sections, and floating toolbars.",
    previewClass: "sgds:shadow-3",
    previewLabel: "3",
  },
  {
    utilityClass: "sgds:shadow-4",
    token: "--sgds-elevation-surface-4",
    usage: "Prominent elevation for modals, dialogs, popovers, and overlays.",
    previewClass: "sgds:shadow-4",
    previewLabel: "4",
  },
  {
    utilityClass: "sgds:shadow-5",
    token: "--sgds-elevation-surface-5",
    usage: "Maximum elevation for top-level overlays, drawers, and focused layers.",
    previewClass: "sgds:shadow-5",
    previewLabel: "5",
  },
];

const edgeUtilities: ElevationUtility[] = [
  {
    utilityClass: "sgds:shadow-edge-top",
    token: "--sgds-elevation-edge-top",
    usage: "Directional shadow for sticky footers and elements pinned to the bottom edge.",
    previewClass: "sgds:shadow-edge-top",
    previewLabel: "Top",
  },
  {
    utilityClass: "sgds:shadow-edge-bottom",
    token: "--sgds-elevation-edge-bottom",
    usage: "Directional shadow for sticky headers and elements pinned to the top edge.",
    previewClass: "sgds:shadow-edge-bottom",
    previewLabel: "Bottom",
  },
];

const utilityGroups: ElevationUtilityGroup[] = [
  {
    id: "surface",
    label: "Surface elevation",
    description: "Use surface elevation when a component floats above the page or another surface.",
    rows: surfaceUtilities,
  },
  {
    id: "edge",
    label: "Edge elevation",
    description: "Use edge elevation when an element is pinned to a viewport edge and needs separation from scrolling content.",
    rows: edgeUtilities,
  },
];

const copiedKey = ref<string | null>(null);

const activeGroup = computed(
  () => utilityGroups.find((group) => group.id === props.section) ?? utilityGroups[0],
);

const currentRows = computed(() => activeGroup.value.rows);

const copyUtility = async (utilityClass: string) => {
  await navigator.clipboard.writeText(utilityClass);
  copiedKey.value = utilityClass;
  setTimeout(() => {
    if (copiedKey.value === utilityClass) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ activeGroup.label }}</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          {{ activeGroup.description }} Pair elevation utilities with a surface background such as
          <CodeToken label="sgds:bg-surface-raised" /> and an appropriate radius token so layers feel intentional.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column elevation-utilities-utility-column">SGDS Tailwind token</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-token-column">CSS variables</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head
                :class="[
                  'typography-page-template__table-preview-column',
                  props.section === 'surface' ? 'elevation-utilities-preview-column--surface' : '',
                ]"
              >Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in currentRows" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column elevation-utilities-utility-column">
                <div class="typography-page-template__utility-copy">
                  <CodeToken :label="item.utilityClass" />
                  <button
                    :class="[
                      'typography-page-template__utility-copy-button',
                      copiedKey === item.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                    ]"
                    :aria-label="copiedKey === item.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                    @click="copyUtility(item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="md" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-token-column">
                <CopyCodeToken :label="item.token" copy-label="Copy CSS variable" />
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
              </sgds-table-cell>
              <sgds-table-cell
                :class="[
                  'typography-page-template__table-preview-column',
                  props.section === 'surface' ? 'elevation-utilities-preview-column--surface' : '',
                ]"
              >
                <div class="sgds:flex sgds:min-h-[5rem] sgds:items-center sgds:justify-center">
                  <div
                    :class="[
                      'sgds:flex sgds:h-14 sgds:w-20 sgds:items-center sgds:justify-center sgds:rounded-lg sgds:bg-surface-raised sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal',
                      item.previewClass
                    ]"
                  >
                    {{ item.previewLabel }}
                  </div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.elevation-utilities-preview-column--surface {
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 6rem;
}

.elevation-utilities-utility-column {
  inline-size: max-content;
  max-inline-size: 16rem;
  min-inline-size: 12rem;
}
</style>
