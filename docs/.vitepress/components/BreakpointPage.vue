<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

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
    <section class="typography-page-template__section">
      <div class="typography-page-template__copy-block">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Breakpoints maintain layout integrity across screen sizes. Each breakpoint range determines the number of
          columns, recommended margins and gutters for each display size.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Breakpoint tokens</h4>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head :class="$style.tokenColumn">Token name</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Screen size</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Container width</sgds-table-head>
            <sgds-table-head :class="$style.numericColumn">Columns</sgds-table-head>
            <sgds-table-head :class="$style.numericColumn">Gutters</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Outer margins</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="row in breakpointTokens" :key="row.token">
            <sgds-table-cell :class="$style.tokenColumn">
              <CodeToken :label="row.token" />
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
    </section>

    <section class="typography-page-template__section">
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
        Breakpoint tokens with sticky sidebar
      </h4>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head :class="$style.tokenColumn">Token name</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Screen size</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Container width</sgds-table-head>
            <sgds-table-head :class="$style.numericColumn">Columns</sgds-table-head>
            <sgds-table-head :class="$style.numericColumn">Gutters</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Outer margins</sgds-table-head>
            <sgds-table-head :class="$style.valueColumn">Side nav width</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="row in stickySidebarTokens" :key="row.token">
            <sgds-table-cell :class="$style.tokenColumn">
              <CodeToken :label="row.token" />
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
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Screen sizes</h2>
      <div class="typography-page-template__copy-block">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Designers should create outputs for at least three key sizes: mobile (320px), tablet (768px), and desktop
          (1440px) for development.
        </p>
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
