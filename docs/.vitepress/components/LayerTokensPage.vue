<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
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
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:m-0">Z-index tokens</h2>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                Use these tokens to apply consistent stacking order across the design system. Values increase from base content to top-level modals.
              </p>
            </div>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="layer-token-name-col">Token</sgds-table-head>
                <sgds-table-head class="layer-token-value-col">Value (z-index)</sgds-table-head>
                <sgds-table-head class="layer-token-usage-col">Usage</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in globalLayerTokens" :key="row.token">
                <sgds-table-cell class="layer-token-name-col">
                  <CodeToken :label="`--${row.token}`" />
                </sgds-table-cell>
                <sgds-table-cell class="layer-token-value-col">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="layer-token-usage-col">
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

<style>
.layer-token-name-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: clamp(14rem, 24vw, 20rem);
  min-inline-size: 14rem;
}

.layer-token-value-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 6rem;
}

.layer-token-usage-col {
  box-sizing: border-box;
  inline-size: auto;
  max-inline-size: clamp(18rem, 30vw, 28rem);
  min-inline-size: 16rem;
}

@media (max-width: 1023px) {
  .layer-token-name-col,
  .layer-token-value-col,
  .layer-token-usage-col {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}
</style>
