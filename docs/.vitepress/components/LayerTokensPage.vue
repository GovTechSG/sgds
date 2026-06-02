<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import SectionHeader from "./foundations/SectionHeader.vue";
import CodeToken from "./ui/CodeToken.vue";

type LayerToken = {
  token: string;
  value: number;
  usage: string;
};

const globalLayerTokens: LayerToken[] = [
  { token: "sgds-z-index-base", value: 0, usage: "Default page content and base surfaces." },
  { token: "sgds-z-index-raised", value: 100, usage: "Raised surfaces such as cards, panels, and elevated content regions." },
  { token: "sgds-z-index-sticky", value: 200, usage: "Sticky elements such as headers, navigation bars, and fixed sidebars that remain in view while scrolling." },
  { token: "sgds-z-index-floating", value: 400, usage: "Floating UI such as dropdown menus, popovers, and anchored menus." },
  { token: "sgds-z-index-overlay", value: 800, usage: "Transient overlays such as toasts, tooltips, and overlay chrome." },
  { token: "sgds-z-index-modal", value: 1600, usage: "Top-level modal dialogs and scrims that must appear above all other layers." },
];

const tokenColumnClass = "sgds:box-border sgds:w-max sgds:min-w-[14rem] sgds:max-w-[20rem]";
const valueColumnClass = "sgds:box-border sgds:w-max sgds:min-w-24 sgds:max-w-32 sgds:whitespace-nowrap";
const usageColumnClass = "sgds:box-border sgds:w-max sgds:min-w-[18rem] sgds:max-w-[28rem]";
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <SectionHeader title="Z-index tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                Use these tokens to apply consistent stacking order across the design system. Values increase from base content to top-level modals.
              </p>
            </div>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table sgds:w-max sgds:max-w-full">
              <sgds-table-row>
                <sgds-table-head :class="tokenColumnClass">Token</sgds-table-head>
                <sgds-table-head :class="valueColumnClass">Value</sgds-table-head>
                <sgds-table-head :class="usageColumnClass">Usage</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in globalLayerTokens" :key="row.token">
                <sgds-table-cell :class="tokenColumnClass">
                  <CodeToken :label="`--${row.token}`" />
                </sgds-table-cell>
                <sgds-table-cell :class="valueColumnClass">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
                </sgds-table-cell>
                <sgds-table-cell :class="usageColumnClass">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>
        </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>
