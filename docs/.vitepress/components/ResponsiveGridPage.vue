<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import SectionHeader from "./foundations/SectionHeader.vue";

type GridPreset = {
  title: string;
  screenSize: string;
  usage: string;
  columns: number;
  columnsLabel: string;
  gutters: string;
  outerMargins: string;
  containerWidth: string;
  sidebarWidth?: string;
  showConstruction?: boolean;
  figmaDemo?:
    | "extra-small"
    | "small"
    | "medium"
    | "large"
    | "extra-large"
    | "2-extra-large"
    | "sticky-small"
    | "sticky-large"
    | "sticky-extra-large"
    | "sticky-2-extra-large";
};

const gridPresets: GridPreset[] = [
  {
    title: "Extra small column",
    screenSize: "320px to 511px",
    usage: "Use for small screens like example mobile vertical.",
    columns: 4,
    columnsLabel: "4 columns flexed",
    gutters: "16px",
    outerMargins: "20px fixed",
    containerWidth: "Auto",
    showConstruction: true,
    figmaDemo: "extra-small",
  },
  {
    title: "Small column",
    screenSize: "512px to 767px",
    usage: "Use for medium screens like example mobile horizontal.",
    columns: 8,
    columnsLabel: "8 columns flexed",
    gutters: "16px",
    outerMargins: "24px fixed",
    containerWidth: "Auto",
    showConstruction: true,
    figmaDemo: "small",
  },
  {
    title: "Medium column",
    screenSize: "768px to 1023px",
    usage: "Use for medium screens like example tablet vertical or small notebook.",
    columns: 8,
    columnsLabel: "8 columns flexed",
    gutters: "24px",
    outerMargins: "28px fixed",
    containerWidth: "Auto",
    showConstruction: true,
    figmaDemo: "medium",
  },
  {
    title: "Large column",
    screenSize: "1024px to 1279px",
    usage: "Use for large screens like tablet landscape layouts or notebooks.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "24px",
    outerMargins: "Auto flexed",
    containerWidth: "888px",
    showConstruction: true,
    figmaDemo: "large",
  },
  {
    title: "Extra large column",
    screenSize: "1280px to 1439px",
    usage: "Use for extra large screens like desktop layouts.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "32px",
    outerMargins: "Auto flexed",
    containerWidth: "1168px",
    showConstruction: true,
    figmaDemo: "extra-large",
  },
  {
    title: "2 extra large column",
    screenSize: "1440px and above",
    usage: "Use for extra large screens like wide-screen monitors.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "32px",
    outerMargins: "Auto flexed",
    containerWidth: "1312px",
    showConstruction: true,
    figmaDemo: "2-extra-large",
  },
];

const stickySidebarPresets: GridPreset[] = [
  {
    title: "Small column",
    screenSize: "768px to 1023px",
    usage: "Use for medium screens like example tablet vertical.",
    columns: 8,
    columnsLabel: "8 columns flexed",
    gutters: "16px",
    outerMargins: "56px fixed",
    containerWidth: "Auto",
    sidebarWidth: "72px side bar fixed (collapse)",
    showConstruction: true,
    figmaDemo: "sticky-small",
  },
  {
    title: "Medium column",
    screenSize: "1024px to 1279px",
    usage: "Use for large screens like example tablet horizontal or notebook.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "24px",
    outerMargins: "Auto flexed",
    containerWidth: "840px",
    sidebarWidth: "72px side bar fixed (collapse)",
    showConstruction: true,
    figmaDemo: "sticky-large",
  },
  {
    title: "Large column",
    screenSize: "1280px to 1439px",
    usage: "Use for extra large screens like example desktop or wide screen monitor.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "24px",
    outerMargins: "Auto flexed",
    containerWidth: "888px",
    sidebarWidth: "272px side bar fixed (expand)",
    showConstruction: true,
    figmaDemo: "sticky-extra-large",
  },
  {
    title: "Extra large column",
    screenSize: "1440px and above",
    usage: "Use for extra large screens like example desktop or wide screen monitor.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "32px",
    outerMargins: "Auto flexed",
    containerWidth: "1024px",
    sidebarWidth: "272px side bar fixed (expand)",
    showConstruction: true,
    figmaDemo: "sticky-2-extra-large",
  },
];

const gridStyle = (preset: GridPreset) => ({
  "--grid-columns": preset.columns,
  "--grid-gutter": preset.gutters,
});
</script>

<template>
  <TypographyPageTemplate class="rg-page">
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Responsive grid presets" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          SGDS have six main grid presets to consolidate margin and gutter adjustments across breakpoints.
        </p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table rg-scroll-table">
          <sgds-table-row>
            <sgds-table-head class="rg-name-col">Grid</sgds-table-head>
            <sgds-table-head class="rg-value-col">Screen size</sgds-table-head>
            <sgds-table-head class="rg-value-col">Columns</sgds-table-head>
            <sgds-table-head class="rg-value-col">Gutters</sgds-table-head>
            <sgds-table-head class="rg-value-col">Outer margins</sgds-table-head>
            <sgds-table-head class="rg-value-col">Container width</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row v-for="preset in gridPresets" :key="preset.title">
            <sgds-table-cell class="rg-name-col">
              <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                {{ preset.title }}
              </span>
            </sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.screenSize }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.columnsLabel }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.gutters }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.outerMargins }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.containerWidth }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
          <article v-for="preset in gridPresets" :key="preset.title" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
                {{ preset.title }} ({{ preset.screenSize }})
              </h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                {{ preset.usage }}
              </p>
              <div v-if="preset.showConstruction" class="sgds:mt-[var(--sgds-text-gap-sm)] sgds:flex sgds:flex-col">
                <dl class="sgds:m-0 sgds:grid sgds:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] sgds:gap-component-sm">
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Columns</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.columnsLabel }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Gutters</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.gutters }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Margins</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.outerMargins }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Container width</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.containerWidth }}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div v-if="preset.figmaDemo === 'extra-small'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="636" y="128" width="400" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="631" y="123" width="410" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="656" y="128" width="78" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="750" y="128" width="78" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="844" y="128" width="78" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="938" y="128" width="78" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="819" y="281" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="295" text-anchor="middle">Auto</text>
                  <path d="M656 306V312M656 309H1016M1016 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="634" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="646" y="111" text-anchor="middle">20</text>
                  <path d="M636 122V128M636 125H656M656 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1014" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1026" y="111" text-anchor="middle">20</text>
                  <path d="M1016 122V128M1016 125H1036M1036 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="730" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="742" y="111" text-anchor="middle">16</text>
                  <path d="M734 122V128M734 125H750M750 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="824" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="111" text-anchor="middle">16</text>
                  <path d="M828 122V128M828 125H844M844 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="918" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="930" y="111" text-anchor="middle">16</text>
                  <path d="M922 122V128M922 125H938M938 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'small'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="580" y="128" width="512" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="575" y="123" width="522" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="604" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="664" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="724" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="784" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="844" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="904" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="964" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1024" y="128" width="44" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="819.5" y="281" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836.5" y="295" text-anchor="middle">Auto</text>
                  <path d="M604.5 306V312M604.5 309H1068.5M1068.5 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="580" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="592" y="111" text-anchor="middle">24</text>
                  <path d="M580 122V128M580 125H604M604 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1068" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1080" y="111" text-anchor="middle">24</text>
                  <path d="M1068 122V128M1068 125H1092M1092 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="644" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="656" y="111" text-anchor="middle">16</text>
                  <path d="M648 122V128M648 125H664M664 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="704" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="716" y="111" text-anchor="middle">16</text>
                  <path d="M708 122V128M708 125H724M724 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="764" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="776" y="111" text-anchor="middle">16</text>
                  <path d="M768 122V128M768 125H784M784 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="824" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="111" text-anchor="middle">16</text>
                  <path d="M828 122V128M828 125H844M844 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="884" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="896" y="111" text-anchor="middle">16</text>
                  <path d="M888 122V128M888 125H904M904 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="944" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="956" y="111" text-anchor="middle">16</text>
                  <path d="M948 122V128M948 125H964M964 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1004" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1016" y="111" text-anchor="middle">16</text>
                  <path d="M1008 122V128M1008 125H1024M1024 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'medium'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="452" y="128" width="768" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="447" y="123" width="778" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="480" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="572" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="664" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="756" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="848" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="940" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1032" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1124" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="819" y="281" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="295" text-anchor="middle">Auto</text>
                  <path d="M480 306V312M480 309H1192M1192 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="454" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="466" y="111" text-anchor="middle">28</text>
                  <path d="M452 122V128M452 125H480M480 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1194" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1206" y="111" text-anchor="middle">28</text>
                  <path d="M1192 122V128M1192 125H1220M1220 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="548" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="560" y="111" text-anchor="middle">24</text>
                  <path d="M548 122V128M548 125H572M572 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="640" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="652" y="111" text-anchor="middle">24</text>
                  <path d="M640 122V128M640 125H664M664 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="732" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="744" y="111" text-anchor="middle">24</text>
                  <path d="M732 122V128M732 125H756M756 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="824" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="111" text-anchor="middle">24</text>
                  <path d="M824 122V128M824 125H848M848 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="916" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="928" y="111" text-anchor="middle">24</text>
                  <path d="M916 122V128M916 125H940M940 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1008" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1020" y="111" text-anchor="middle">24</text>
                  <path d="M1008 122V128M1008 125H1032M1032 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1100" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1112" y="111" text-anchor="middle">24</text>
                  <path d="M1100 122V128M1100 125H1124M1124 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'large'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="324" y="128" width="1024" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="319" y="123" width="1034" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="392" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="468" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="544" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="620" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="696" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="772" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="848" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="924" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1000" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1076" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1152" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1228" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="341" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="358" y="111" text-anchor="middle">Auto</text>
                  <path d="M324 122V128M324 125H392M392 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1297" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1314" y="111" text-anchor="middle">Auto</text>
                  <path d="M1280 122V128M1280 125H1348M1348 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="821" y="281" width="30" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="295" text-anchor="middle">888</text>
                  <path d="M392 306V312M392 309H1280M1280 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="444" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="456" y="111" text-anchor="middle">24</text>
                  <path d="M444 122V128M444 125H468M468 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="520" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="532" y="111" text-anchor="middle">24</text>
                  <path d="M520 122V128M520 125H544M544 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="596" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="608" y="111" text-anchor="middle">24</text>
                  <path d="M596 122V128M596 125H620M620 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="672" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="684" y="111" text-anchor="middle">24</text>
                  <path d="M672 122V128M672 125H696M696 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="748" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="760" y="111" text-anchor="middle">24</text>
                  <path d="M748 122V128M748 125H772M772 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="824" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="111" text-anchor="middle">24</text>
                  <path d="M824 122V128M824 125H848M848 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="900" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="912" y="111" text-anchor="middle">24</text>
                  <path d="M900 122V128M900 125H924M924 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="976" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="988" y="111" text-anchor="middle">24</text>
                  <path d="M976 122V128M976 125H1000M1000 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1052" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1064" y="111" text-anchor="middle">24</text>
                  <path d="M1052 122V128M1052 125H1076M1076 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1128" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1140" y="111" text-anchor="middle">24</text>
                  <path d="M1128 122V128M1128 125H1152M1152 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1204" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1216" y="111" text-anchor="middle">24</text>
                  <path d="M1204 122V128M1204 125H1228M1228 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'extra-large'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="196" y="128" width="1280" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="191" y="123" width="1290" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="252" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="352" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="452" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="552" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="652" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="752" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="852" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="952" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1052" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1152" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1252" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1352" y="128" width="68" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="207" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="224" y="111" text-anchor="middle">Auto</text>
                  <path d="M196 122V128M196 125H252M252 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1431" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1448" y="111" text-anchor="middle">Auto</text>
                  <path d="M1420 122V128M1420 125H1476M1476 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="819.5" y="281" width="33" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="295" text-anchor="middle">1168</text>
                  <path d="M248 306V312M248 309H1424M1424 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="324" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="336" y="111" text-anchor="middle">32</text>
                  <path d="M320 122V128M320 125H352M352 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="424" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="436" y="111" text-anchor="middle">32</text>
                  <path d="M420 122V128M420 125H452M452 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="524" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="536" y="111" text-anchor="middle">32</text>
                  <path d="M520 122V128M520 125H552M552 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="624" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="636" y="111" text-anchor="middle">32</text>
                  <path d="M620 122V128M620 125H652M652 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="724" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="736" y="111" text-anchor="middle">32</text>
                  <path d="M720 122V128M720 125H752M752 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="824" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="111" text-anchor="middle">32</text>
                  <path d="M820 122V128M820 125H852M852 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="924" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="936" y="111" text-anchor="middle">32</text>
                  <path d="M920 122V128M920 125H952M952 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1024" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1036" y="111" text-anchor="middle">32</text>
                  <path d="M1020 122V128M1020 125H1052M1052 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1124" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1136" y="111" text-anchor="middle">32</text>
                  <path d="M1120 122V128M1120 125H1152M1152 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1224" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1236" y="111" text-anchor="middle">32</text>
                  <path d="M1220 122V128M1220 125H1252M1252 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1324" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1336" y="111" text-anchor="middle">32</text>
                  <path d="M1320 122V128M1320 125H1352M1352 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === '2-extra-large'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="116" y="128" width="1440" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="111" y="123" width="1450" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="180" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="292" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="404" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="516" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="628" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="740" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="852" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="964" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1076" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1188" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1300" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1412" y="128" width="80" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="131" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="148" y="111" text-anchor="middle">Auto</text>
                  <path d="M116 122V128M116 125H180M180 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1507" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1524" y="111" text-anchor="middle">Auto</text>
                  <path d="M1492 122V128M1492 125H1556M1556 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="819.5" y="281" width="33" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="295" text-anchor="middle">1312</text>
                  <path d="M180 306V312M180 309H1492M1492 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="264" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="276" y="111" text-anchor="middle">32</text>
                  <path d="M260 122V128M260 125H292M292 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="376" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="388" y="111" text-anchor="middle">32</text>
                  <path d="M372 122V128M372 125H404M404 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="488" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="500" y="111" text-anchor="middle">32</text>
                  <path d="M484 122V128M484 125H516M516 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="600" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="612" y="111" text-anchor="middle">32</text>
                  <path d="M596 122V128M596 125H628M628 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="712" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="724" y="111" text-anchor="middle">32</text>
                  <path d="M708 122V128M708 125H740M740 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="824" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="836" y="111" text-anchor="middle">32</text>
                  <path d="M820 122V128M820 125H852M852 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="936" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="948" y="111" text-anchor="middle">32</text>
                  <path d="M932 122V128M932 125H964M964 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1048" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1060" y="111" text-anchor="middle">32</text>
                  <path d="M1044 122V128M1044 125H1076M1076 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1160" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1172" y="111" text-anchor="middle">32</text>
                  <path d="M1156 122V128M1156 125H1188M1188 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1272" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1284" y="111" text-anchor="middle">32</text>
                  <path d="M1268 122V128M1268 125H1300M1300 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1384" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1396" y="111" text-anchor="middle">32</text>
                  <path d="M1380 122V128M1380 125H1412M1412 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else class="rg-grid-demo" :style="gridStyle(preset)" aria-hidden="true">
              <div class="rg-grid-frame">
                <div class="rg-grid-columns">
                  <span v-for="column in preset.columns" :key="column" class="rg-grid-column" />
                </div>
              </div>
              <dl class="rg-construction">
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Columns</dt>
                  <dd class="rg-construction__value">{{ preset.columnsLabel }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Gutters</dt>
                  <dd class="rg-construction__value">{{ preset.gutters }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Margins</dt>
                  <dd class="rg-construction__value">{{ preset.outerMargins }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Container width</dt>
                  <dd class="rg-construction__value">{{ preset.containerWidth }}</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Responsive grid with sticky sidebar" />
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
            A responsive grid with a sticky sidebar is a layout where the main content uses a flexible grid system,
            while the sidebar remains fixed within the viewport when scrolling.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
            On mobile devices, the sidebar is hidden or repositioned to prioritise content visibility and improve
            usability.
          </p>
        </div>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table rg-scroll-table">
          <sgds-table-row>
            <sgds-table-head class="rg-name-col">Grid</sgds-table-head>
            <sgds-table-head class="rg-value-col">Screen size</sgds-table-head>
            <sgds-table-head class="rg-value-col">Columns</sgds-table-head>
            <sgds-table-head class="rg-value-col">Gutters</sgds-table-head>
            <sgds-table-head class="rg-value-col">Outer margins</sgds-table-head>
            <sgds-table-head class="rg-value-col">Container width</sgds-table-head>
            <sgds-table-head class="rg-value-col">Sidebar width</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row v-for="preset in stickySidebarPresets" :key="preset.title">
            <sgds-table-cell class="rg-name-col">
              <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                {{ preset.title }}
              </span>
            </sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.screenSize }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.columnsLabel }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.gutters }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.outerMargins }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.containerWidth }}</sgds-table-cell>
            <sgds-table-cell class="rg-value-col">{{ preset.sidebarWidth }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
          <article v-for="preset in stickySidebarPresets" :key="preset.title" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
                {{ preset.title }} ({{ preset.screenSize }})
              </h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                {{ preset.usage }}
              </p>
              <div v-if="preset.showConstruction" class="sgds:mt-[var(--sgds-text-gap-sm)] sgds:flex sgds:flex-col">
                <dl class="sgds:m-0 sgds:grid sgds:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] sgds:gap-component-sm">
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Columns</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.columnsLabel }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Gutters</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.gutters }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Margins</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.outerMargins }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Container width</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.containerWidth }}</dd>
                  </div>
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <dt>Sidebar</dt>
                    <dd class="sgds:m-0 sgds:font-semibold">{{ preset.sidebarWidth }}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div v-if="preset.figmaDemo === 'sticky-small'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="452" y="128" width="768" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="447" y="123" width="778" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <rect x="580" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="656" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="732" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="808" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="884" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="960" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1036" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1112" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <path d="M452 160C452 142.327 466.327 128 484 128H524V568H452V160Z" fill="var(--sgds-color-fixed-dark)" />

                <g class="rg-xs-svg__measure">
                  <rect x="855" y="281" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="872" y="295" text-anchor="middle">Auto</text>
                  <path d="M580 306V312M580 309H1164M1164 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="477" y="281" width="22" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="488" y="295" text-anchor="middle">72</text>
                  <path d="M452 306V312M452 309H524M524 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="540" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="552" y="111" text-anchor="middle">56</text>
                  <path d="M524 122V128M524 125H580M580 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1180" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1192" y="111" text-anchor="middle">56</text>
                  <path d="M1164 122V128M1164 125H1220M1220 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="632" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="644" y="111" text-anchor="middle">24</text>
                  <path d="M632 122V128M632 125H656M656 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="708" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="720" y="111" text-anchor="middle">24</text>
                  <path d="M708 122V128M708 125H732M732 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="784" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="796" y="111" text-anchor="middle">24</text>
                  <path d="M784 122V128M784 125H808M808 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="860" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="872" y="111" text-anchor="middle">24</text>
                  <path d="M860 122V128M860 125H884M884 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="936" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="948" y="111" text-anchor="middle">24</text>
                  <path d="M936 122V128M936 125H960M960 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1012" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1024" y="111" text-anchor="middle">24</text>
                  <path d="M1012 122V128M1012 125H1036M1036 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1088" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1100" y="111" text-anchor="middle">24</text>
                  <path d="M1088 122V128M1088 125H1112M1112 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'sticky-large'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Screen background and border -->
                <rect x="324" y="128" width="1024" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="319" y="123" width="1034" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <!-- Collapsed sidebar (72px) -->
                <path d="M324 160C324 142.327 338.327 128 356 128H396V568H324V160Z" fill="var(--sgds-color-fixed-dark)" />
                <!-- 12 columns -->
                <rect x="452" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="524" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="596" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="668" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="740" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="812" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="884" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="956" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1028" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1100" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1172" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1244" y="128" width="48" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <!-- Sidebar width: 72 -->
                <g class="rg-xs-svg__measure">
                  <rect x="349" y="281" width="22" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="360" y="295" text-anchor="middle">72</text>
                  <path d="M324 306V312M324 309H396M396 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <!-- Container width: 840 -->
                <g class="rg-xs-svg__measure">
                  <rect x="857" y="281" width="30" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="872" y="295" text-anchor="middle">840</text>
                  <path d="M452 306V312M452 309H1292M1292 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <!-- Left auto margin -->
                <g class="rg-xs-svg__measure">
                  <rect x="407" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="424" y="111" text-anchor="middle">Auto</text>
                  <path d="M396 122V128M396 125H452M452 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <!-- Right auto margin -->
                <g class="rg-xs-svg__measure">
                  <rect x="1303" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1320" y="111" text-anchor="middle">Auto</text>
                  <path d="M1292 122V128M1292 125H1348M1348 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <!-- 11 gutters: 24px each -->
                <g class="rg-xs-svg__measure">
                  <rect x="500" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="512" y="111" text-anchor="middle">24</text>
                  <path d="M500 122V128M500 125H524M524 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="572" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="584" y="111" text-anchor="middle">24</text>
                  <path d="M572 122V128M572 125H596M596 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="644" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="656" y="111" text-anchor="middle">24</text>
                  <path d="M644 122V128M644 125H668M668 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="716" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="728" y="111" text-anchor="middle">24</text>
                  <path d="M716 122V128M716 125H740M740 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="788" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="800" y="111" text-anchor="middle">24</text>
                  <path d="M788 122V128M788 125H812M812 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="860" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="872" y="111" text-anchor="middle">24</text>
                  <path d="M860 122V128M860 125H884M884 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="932" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="944" y="111" text-anchor="middle">24</text>
                  <path d="M932 122V128M932 125H956M956 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1004" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1016" y="111" text-anchor="middle">24</text>
                  <path d="M1004 122V128M1004 125H1028M1028 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1076" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1088" y="111" text-anchor="middle">24</text>
                  <path d="M1076 122V128M1076 125H1100M1100 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1148" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1160" y="111" text-anchor="middle">24</text>
                  <path d="M1148 122V128M1148 125H1172M1172 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1220" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1232" y="111" text-anchor="middle">24</text>
                  <path d="M1220 122V128M1220 125H1244M1244 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'sticky-extra-large'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="196" y="128" width="1280" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="191" y="123" width="1290" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <path d="M196 160C196 142.327 210.327 128 228 128H468V568H196V160Z" fill="var(--sgds-color-fixed-dark)" />
                <rect x="528" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="604" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="680" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="756" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="832" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="908" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="984" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1060" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1136" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1212" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1288" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1364" y="128" width="52" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="317.5" y="281" width="29" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="332" y="295" text-anchor="middle">272</text>
                  <path d="M196 306V312M196 309H468M468 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="481" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="498" y="111" text-anchor="middle">Auto</text>
                  <path d="M468 122V128M468 125H528M528 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="957" y="281" width="30" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="972" y="295" text-anchor="middle">888</text>
                  <path d="M528 306V312M528 309H1416M1416 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1429" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1446" y="111" text-anchor="middle">Auto</text>
                  <path d="M1416 122V128M1416 125H1476M1476 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="580" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="592" y="111" text-anchor="middle">24</text>
                  <path d="M580 122V128M580 125H604M604 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="656" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="668" y="111" text-anchor="middle">24</text>
                  <path d="M656 122V128M656 125H680M680 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="732" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="744" y="111" text-anchor="middle">24</text>
                  <path d="M732 122V128M732 125H756M756 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="808" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="820" y="111" text-anchor="middle">24</text>
                  <path d="M808 122V128M808 125H832M832 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="884" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="896" y="111" text-anchor="middle">24</text>
                  <path d="M884 122V128M884 125H908M908 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="960" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="972" y="111" text-anchor="middle">24</text>
                  <path d="M960 122V128M960 125H984M984 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1036" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1048" y="111" text-anchor="middle">24</text>
                  <path d="M1036 122V128M1036 125H1060M1060 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1112" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1124" y="111" text-anchor="middle">24</text>
                  <path d="M1112 122V128M1112 125H1136M1136 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1188" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1200" y="111" text-anchor="middle">24</text>
                  <path d="M1188 122V128M1188 125H1212M1212 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1264" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1276" y="111" text-anchor="middle">24</text>
                  <path d="M1264 122V128M1264 125H1288M1288 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1340" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1352" y="111" text-anchor="middle">24</text>
                  <path d="M1340 122V128M1340 125H1364M1364 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else-if="preset.figmaDemo === 'sticky-2-extra-large'" class="rg-xs-demo" aria-hidden="true">
              <svg class="rg-xs-svg" width="1672" height="480" viewBox="0 0 1672 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="116" y="128" width="1440" height="440" rx="32" fill="var(--sgds-bg-default)" />
                <rect x="111" y="123" width="1450" height="450" rx="37" stroke="var(--sgds-border-color-translucent)" stroke-width="10" />
                <path d="M116 160C116 142.327 130.327 128 148 128H388V568H116V160Z" fill="var(--sgds-color-fixed-dark)" />
                <rect x="460" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="548" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="636" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="724" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="812" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="900" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="988" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1076" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1164" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1252" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1340" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />
                <rect x="1428" y="128" width="56" height="440" fill="var(--sgds-danger-surface-translucent)" />

                <g class="rg-xs-svg__measure">
                  <rect x="237.5" y="281" width="29" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="252" y="295" text-anchor="middle">272</text>
                  <path d="M116 306V312M116 309H388M388 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="407" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="424" y="111" text-anchor="middle">Auto</text>
                  <path d="M388 122V128M388 125H460M460 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="954.5" y="281" width="35" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="972" y="295" text-anchor="middle">1024</text>
                  <path d="M460 306V312M460 309H1484M1484 306V312" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1503" y="97" width="34" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1520" y="111" text-anchor="middle">Auto</text>
                  <path d="M1484 122V128M1484 125H1556M1556 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>

                <g class="rg-xs-svg__measure">
                  <rect x="520" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="532" y="111" text-anchor="middle">32</text>
                  <path d="M516 122V128M516 125H548M548 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="608" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="620" y="111" text-anchor="middle">32</text>
                  <path d="M604 122V128M604 125H636M636 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="696" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="708" y="111" text-anchor="middle">32</text>
                  <path d="M692 122V128M692 125H724M724 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="784" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="796" y="111" text-anchor="middle">32</text>
                  <path d="M780 122V128M780 125H812M812 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="872" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="884" y="111" text-anchor="middle">32</text>
                  <path d="M868 122V128M868 125H900M900 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="960" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="972" y="111" text-anchor="middle">32</text>
                  <path d="M956 122V128M956 125H988M988 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1048" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1060" y="111" text-anchor="middle">32</text>
                  <path d="M1044 122V128M1044 125H1076M1076 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1136" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1148" y="111" text-anchor="middle">32</text>
                  <path d="M1132 122V128M1132 125H1164M1164 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1224" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1236" y="111" text-anchor="middle">32</text>
                  <path d="M1220 122V128M1220 125H1252M1252 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1312" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1324" y="111" text-anchor="middle">32</text>
                  <path d="M1308 122V128M1308 125H1340M1340 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
                <g class="rg-xs-svg__measure">
                  <rect x="1400" y="97" width="24" height="20" rx="4" fill="var(--sgds-danger-surface-default)" />
                  <text x="1412" y="111" text-anchor="middle">32</text>
                  <path d="M1396 122V128M1396 125H1428M1428 122V128" stroke="var(--sgds-danger-border-color-default)" />
                </g>
              </svg>
            </div>
            <div v-else class="rg-grid-demo" :style="gridStyle(preset)" aria-hidden="true">
              <div class="rg-grid-frame">
                <span class="rg-sidebar-block" />
                <div class="rg-grid-columns">
                  <span v-for="column in preset.columns" :key="column" class="rg-grid-column" />
                </div>
              </div>
              <dl class="rg-construction">
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Columns</dt>
                  <dd class="rg-construction__value">{{ preset.columnsLabel }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Gutters</dt>
                  <dd class="rg-construction__value">{{ preset.gutters }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Margins</dt>
                  <dd class="rg-construction__value">{{ preset.outerMargins }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Container width</dt>
                  <dd class="rg-construction__value">{{ preset.containerWidth }}</dd>
                </div>
                <div class="rg-construction__item">
                  <dt class="rg-construction__label">Sidebar</dt>
                  <dd class="rg-construction__value">{{ preset.sidebarWidth }}</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
/* Page-level gap override — increases section gap beyond the default layout-gap-lg */
.typography-page-template.rg-page {
  gap: var(--sgds-layout-gap-xl);
}

/* Table column widths — clamp() values cannot be expressed as SGDS utilities */
.rg-name-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 14rem;
  min-inline-size: 11rem;
}

.rg-value-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 11rem;
  min-inline-size: 8rem;
}

/* Grid summary tables should scroll horizontally on narrow screens instead of wrapping cell text. */
.rg-scroll-table sgds-table-head,
.rg-scroll-table sgds-table-cell {
  max-inline-size: none;
  overflow-wrap: normal;
  white-space: nowrap;
  word-break: keep-all;
}

.rg-scroll-table .rg-name-col {
  min-inline-size: 14rem;
}

.rg-scroll-table .rg-value-col {
  min-inline-size: 10rem;
}

/* Construction list — descendant combinator targeting li items */
.rg-construction-list {
  color: var(--sgds-body-color-default);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-2-xs);
  margin: 0;
  padding-inline-start: var(--sgds-spacer-6);
}

.rg-construction-list li {
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

/* Grid demo visualisation */
.rg-grid-demo {
  background: var(--sgds-bg-translucent-subtle);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-component-gap-sm);
  justify-content: center;
  min-block-size: 16rem;
  overflow: hidden;
  padding: var(--sgds-component-padding-md);
}

.rg-grid-frame {
  background: var(--sgds-bg-default);
  border: var(--sgds-border-width-8) solid var(--sgds-border-color-translucent);
  border-radius: var(--sgds-border-radius-lg);
  box-sizing: border-box;
  display: flex;
  gap: var(--sgds-component-gap-sm);
  margin-inline: auto;
  max-inline-size: 100%;
  min-block-size: 9rem;
  padding: var(--sgds-spacer-4);
  width: min(100%, 56rem);
}

/* Uses CSS custom properties set dynamically via :style binding */
.rg-grid-columns {
  display: grid;
  flex: 1;
  gap: var(--grid-gutter);
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  min-width: 0;
}

.rg-grid-column {
  background: var(--sgds-danger-surface-muted);
  border-radius: var(--sgds-border-radius-xs);
  min-block-size: 8rem;
  opacity: 0.65;
}

.rg-sidebar-block {
  background: var(--sgds-color-fixed-dark);
  border-radius: var(--sgds-border-radius-md) 0 0 var(--sgds-border-radius-md);
  flex: 0 0 clamp(3rem, 18%, 6rem);
  min-block-size: 8rem;
}

.rg-xs-demo {
  background: var(--sgds-bg-translucent-subtle);
  border-radius: var(--sgds-border-radius-xl);
  aspect-ratio: 1672 / 480;
  box-sizing: border-box;
  inline-size: 100%;
  overflow: hidden;
  position: relative;
}

.rg-xs-svg {
  block-size: 100%;
  inline-size: 100%;
}

.rg-xs-svg__measure rect {
  transform: scale(1.5);
  transform-box: fill-box;
  transform-origin: center;
}

.rg-xs-svg__measure text {
  color: var(--sgds-color-fixed-light);
  fill: var(--sgds-color-fixed-light);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-medium);
  letter-spacing: 0;
  line-height: var(--sgds-line-height-3-xs);
  transform: scale(1.3);
  transform-box: fill-box;
  transform-origin: center;
}

.rg-demo-label {
  color: var(--sgds-body-color-muted);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  text-align: center;
}

/* Construction stats row inside the demo box — grid keeps items evenly spaced */
.rg-construction {
  display: grid;
  gap: var(--sgds-component-gap-md);
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: 0;
  margin-inline: auto;
  width: min(100%, 56rem);
}

.rg-construction__item {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-2-xs);
  min-inline-size: 0;
  text-align: center;
}

.rg-construction__label {
  color: var(--sgds-body-color-muted);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  margin: 0;
  text-transform: uppercase;
}

.rg-construction__value {
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
  margin: 0;
}

@media (max-width: 1023px) {
  .rg-name-col,
  .rg-value-col {
    inline-size: auto;
    min-inline-size: 0;
  }

  .rg-grid-demo {
    min-block-size: 13rem;
    padding: var(--sgds-component-padding-sm);
  }

  .rg-grid-frame {
    padding: var(--sgds-spacer-3);
  }

  .rg-grid-columns {
    gap: var(--sgds-spacer-2);
  }

  .rg-construction {
    grid-auto-flow: row;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
