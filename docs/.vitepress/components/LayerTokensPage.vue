<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

type FormulaPart = { type: "token"; value: string } | { type: "text"; value: string };

type LayerToken = {
  token: string;
  value: number;
  formula?: FormulaPart[];
};

const globalLayerTokens: LayerToken[] = [
  { token: "sgds-global-layer-base", value: 0 },
  { token: "sgds-global-layer-raised", value: 100 },
  { token: "sgds-global-layer-floating", value: 200 },
  { token: "sgds-global-layer-overlay", value: 400 },
  { token: "sgds-global-layer-modal", value: 800 },
];

const localLayerTokens: LayerToken[] = [
  {
    token: "sgds-local-layer-raised",
    value: 900,
    formula: [
      { type: "token", value: "sgds-global-layer-modal" },
      { type: "text", value: " + " },
      { type: "token", value: "sgds-global-layer-raised" },
      { type: "text", value: " = 800 + 100" },
    ],
  },
  {
    token: "sgds-local-layer-floating",
    value: 1000,
    formula: [
      { type: "token", value: "sgds-global-layer-modal" },
      { type: "text", value: " + " },
      { type: "token", value: "sgds-global-layer-floating" },
      { type: "text", value: " = 800 + 200" },
    ],
  },
  {
    token: "sgds-local-layer-overlay",
    value: 1200,
    formula: [
      { type: "token", value: "sgds-global-layer-modal" },
      { type: "text", value: " + " },
      { type: "token", value: "sgds-global-layer-overlay" },
      { type: "text", value: " = 800 + 400" },
    ],
  },
];
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Layer tokens</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Layer tokens define the z-index stacking order of UI elements across the design system.
          Global layers span the entire application; local layers manage stacking within a parent stacking context.
        </p>
      </div>

      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Global layer tokens</h5>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="layer-token-name-col">Figma token</sgds-table-head>
                <sgds-table-head class="layer-token-value-col">Value (z-index)</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in globalLayerTokens" :key="row.token">
                <sgds-table-cell class="layer-token-name-col">
                  <CodeToken :label="row.token" />
                </sgds-table-cell>
                <sgds-table-cell class="layer-token-value-col">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Local layer tokens</h5>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="layer-token-name-col">Figma token</sgds-table-head>
                <sgds-table-head class="layer-token-value-col">Value (z-index)</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in localLayerTokens" :key="row.token">
                <sgds-table-cell class="layer-token-name-col">
                  <CodeToken :label="row.token" />
                </sgds-table-cell>
                <sgds-table-cell class="layer-token-value-col">
                  <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                    <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
                    <span v-if="row.formula" class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-text-2-xs">
                      <template v-for="(part, pi) in row.formula" :key="pi">
                        <CodeToken v-if="part.type === 'token'" :label="part.value" />
                        <span v-else class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ part.value }}</span>
                      </template>
                    </span>
                  </div>
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
  inline-size: auto;
  min-inline-size: 10rem;
}

@media (max-width: 1023px) {
  .layer-token-name-col,
  .layer-token-value-col {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}
</style>
