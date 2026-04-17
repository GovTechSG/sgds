<script setup lang="ts">
import { ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const screenSizeGuideXs = [211, 467, 723, 979, 1235, 1491] as const;
const screenSizeViewBoxWidth = 1672;
const screenSizeViewBoxHeight = 480;

const screenSizeRanges = [
  { label: "small", x: 215, width: 36, lineStart: 0, lineEnd: 466 },
  { label: "medium", x: 697.5, width: 51, lineStart: 468, lineEnd: 978 },
  { label: "large", x: 1179.5, width: 43, lineStart: 980, lineEnd: 1394 },
  { label: "extra large", x: 1506, width: 70, lineStart: 1396, lineEnd: 1672 },
] as const;

const screenSizeMarkers = [
  { label: "320", sublabel: "(min)", x: 275, emphasized: true, thickTick: true },
  { label: "360", x: 315 },
  { label: "400", x: 355 },
  { label: "512", x: 467 },
  { label: "768", x: 723, emphasized: true, thickTick: true },
  { label: "1024", x: 979 },
  { label: "1280", x: 1235 },
  { label: "1440", sublabel: "(max)", x: 1395, emphasized: true, thickTick: true },
] as const;

const tokenViewOptions = [
  { id: "css-variable", label: "CSS variable" },
  { id: "figma", label: "Figma token" },
] as const;
type TokenViewId = (typeof tokenViewOptions)[number]["id"];

// Single shared tab-group controls both breakpoint tables below.
const activeTokenViewId = ref<TokenViewId>("css-variable");

const onTokenViewShow = (event: Event) => {
  const nextView = (event as CustomEvent<{ name?: string }>).detail?.name as TokenViewId | undefined;
  if (nextView && tokenViewOptions.some((o) => o.id === nextView)) activeTokenViewId.value = nextView;
};

const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "css-variable") return `--${token}`;
  return token;
};

const breakpointTokens = [
  {
    token: "sgds-breakpoint-xs",
    screenSize: "320 to 511",
    containerWidth: "auto",
    columns: "4",
    gutters: "16",
    outerMargins: "20",
  },
  {
    token: "sgds-breakpoint-sm",
    screenSize: "512 to 767",
    containerWidth: "auto",
    columns: "8",
    gutters: "16",
    outerMargins: "24",
  },
  {
    token: "sgds-breakpoint-md",
    screenSize: "768 to 1023",
    containerWidth: "auto",
    columns: "8",
    gutters: "24",
    outerMargins: "28",
  },
  {
    token: "sgds-breakpoint-lg",
    screenSize: "1024 to 1279",
    containerWidth: "888",
    columns: "12",
    gutters: "24",
    outerMargins: "auto",
  },
  {
    token: "sgds-breakpoint-xl",
    screenSize: "1280 to 1439",
    containerWidth: "1168",
    columns: "12",
    gutters: "32",
    outerMargins: "auto",
  },
  {
    token: "sgds-breakpoint-2-xl",
    screenSize: "1440 and above",
    containerWidth: "1312",
    columns: "12",
    gutters: "32",
    outerMargins: "auto",
  },
] as const;

const stickySidebarTokens = [
  {
    token: "sgds-breakpoint-sbar-md",
    screenSize: "768 to 1023",
    containerWidth: "auto",
    columns: "8",
    gutters: "24",
    outerMargins: "48",
    sideNavWidth: "72 (collapse)",
  },
  {
    token: "sgds-breakpoint-sbar-lg",
    screenSize: "1024 to 1279",
    containerWidth: "840",
    columns: "12",
    gutters: "24",
    outerMargins: "auto",
    sideNavWidth: "72 (collapse)",
  },
  {
    token: "sgds-breakpoint-sbar-xl",
    screenSize: "1280 to 1439",
    containerWidth: "888",
    columns: "12",
    gutters: "24",
    outerMargins: "auto",
    sideNavWidth: "272 (expand)",
  },
  {
    token: "sgds-breakpoint-sbar-2-xl",
    screenSize: "1440 and above",
    containerWidth: "1024",
    columns: "12",
    gutters: "32",
    outerMargins: "auto",
    sideNavWidth: "272 (expand)",
  },
] as const;

</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Screen sizes</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Designers should create outputs for at least three key sizes: mobile (320px), tablet (768px), and desktop
          (1440px) for development.
        </p>

        <div class="sgds:w-full">
          <div class="sgds:relative sgds:h-[18.5rem] sgds:w-full">
            <svg
              viewBox="0 0 1672 480"
              aria-label="Screen size breakpoint diagram"
              class="sgds:h-full sgds:w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="0" width="1672" height="480" rx="32" fill="var(--sgds-bg-translucent-subtle)" />

              <line
                v-for="guideX in screenSizeGuideXs"
                :key="guideX"
                :x1="guideX"
                :x2="guideX"
                y1="0"
                y2="480"
                stroke="var(--sgds-border-color-emphasis)"
                stroke-width="1"
                stroke-linecap="round"
                stroke-dasharray="1 5"
              />

              <g class="sgds:text-danger-default">
                <line
                  v-for="range in screenSizeRanges"
                  :key="`${range.label}-line`"
                  :x1="range.lineStart"
                  :x2="range.lineEnd"
                  y1="240"
                  y2="240"
                  stroke="currentColor"
                  stroke-width="1"
                />
              </g>

              <g v-for="marker in screenSizeMarkers" :key="marker.label">
                <line
                  :x1="marker.x"
                  :x2="marker.x"
                  y1="240"
                  y2="248"
                  stroke="var(--sgds-body-color-default)"
                  :stroke-width="marker.thickTick ? 2 : 1"
                />
              </g>
            </svg>

            <div class="sgds:absolute sgds:inset-0 sgds:pointer-events-none">
              <div
                v-for="range in screenSizeRanges"
                :key="`badge-${range.label}`"
                class="sgds:absolute sgds:-translate-x-1/2"
                :style="{
                  left: `${((range.x + range.width / 2) / screenSizeViewBoxWidth) * 100}%`,
                  top: `${(189 / screenSizeViewBoxHeight) * 100}%`,
                }"
              >
                <sgds-badge variant="danger" size="sm">{{ range.label }}</sgds-badge>
              </div>

              <div
                v-for="marker in screenSizeMarkers"
                :key="`label-${marker.label}`"
                class="sgds:absolute sgds:-translate-x-1/2 sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:text-default sgds:text-label-xs sgds:leading-xs sgds:tracking-normal"
                :style="{
                  left: `${(marker.x / screenSizeViewBoxWidth) * 100}%`,
                  top: `${(278 / screenSizeViewBoxHeight) * 100}%`,
                }"
              >
                <span :class="marker.emphasized ? 'sgds:font-semibold' : 'sgds:font-regular'">{{ marker.label }}</span>
                <span v-if="marker.sublabel" class="sgds:font-semibold">{{ marker.sublabel }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Breakpoint tokens</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Breakpoints maintain layout integrity across screen sizes. Each breakpoint range determines the number of
          columns, recommended margins and gutters for each display size.
        </p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
          <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
          <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
        </sgds-tab-group>

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Standard breakpoint</h5>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head :class="$style.tokenColumn">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Screen size</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Container width</sgds-table-head>
                <sgds-table-head :class="$style.numericColumn">Columns</sgds-table-head>
                <sgds-table-head :class="$style.numericColumn">Gutters</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Outer margins</sgds-table-head>
              </sgds-table-row>

              <sgds-table-row v-for="row in breakpointTokens" :key="row.token">
                <sgds-table-cell :class="$style.tokenColumn">
                  <CodeToken :label="getTokenValue(row.token)" />
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.screenSize }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.containerWidth }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.numericColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.columns }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.numericColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.gutters }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.outerMargins }}
                  </span>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Breakpoint with sticky sidebar</h5>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head :class="$style.tokenColumn">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Screen size</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Container width</sgds-table-head>
                <sgds-table-head :class="$style.numericColumn">Columns</sgds-table-head>
                <sgds-table-head :class="$style.numericColumn">Gutters</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Outer margins</sgds-table-head>
                <sgds-table-head :class="$style.valueColumn">Side nav width</sgds-table-head>
              </sgds-table-row>

              <sgds-table-row v-for="row in stickySidebarTokens" :key="row.token">
                <sgds-table-cell :class="$style.tokenColumn">
                  <CodeToken :label="getTokenValue(row.token)" />
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.screenSize }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.containerWidth }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.numericColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.columns }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.numericColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.gutters }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.outerMargins }}
                  </span>
                </sgds-table-cell>
                <sgds-table-cell :class="$style.valueColumn">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.sideNavWidth }}
                  </span>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>
        </div>
      </div>
    </section>

  </TypographyPageTemplate>
</template>

<style module>
.tokenColumn {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: clamp(12rem, 22vw, 16rem);
  min-inline-size: 12rem;
}

.valueColumn {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 11rem;
  min-inline-size: 7.5rem;
}

.numericColumn {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 6rem;
  min-inline-size: 4.5rem;
}

@media (max-width: 1023px) {
  .tokenColumn,
  .valueColumn,
  .numericColumn {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}
</style>
