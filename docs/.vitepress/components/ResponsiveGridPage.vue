<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

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
  },
];

const stickySidebarPresets: GridPreset[] = [
  {
    title: "Medium column",
    screenSize: "768px to 1023px",
    usage: "Use for medium screens like tablet portrait layouts.",
    columns: 8,
    columnsLabel: "8 columns flexed",
    gutters: "16px",
    outerMargins: "56px fixed",
    containerWidth: "Auto",
    sidebarWidth: "72px collapsed",
  },
  {
    title: "Large column",
    screenSize: "1024px to 1279px",
    usage: "Use for large screens like tablet landscape layouts or notebooks.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "24px",
    outerMargins: "Auto flexed",
    containerWidth: "840px",
    sidebarWidth: "72px collapsed",
  },
  {
    title: "Extra large column",
    screenSize: "1280px to 1439px",
    usage: "Use for extra large screens like desktop or wide-screen monitor layouts.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "24px",
    outerMargins: "Auto flexed",
    containerWidth: "888px",
    sidebarWidth: "272px expanded",
  },
  {
    title: "2 extra large column",
    screenSize: "1440px and above",
    usage: "Use for extra large screens like desktop or wide-screen monitor layouts.",
    columns: 12,
    columnsLabel: "12 columns fixed",
    gutters: "32px",
    outerMargins: "Auto flexed",
    containerWidth: "1024px",
    sidebarWidth: "272px expanded",
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
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Responsive grid presets</h4>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          SGDS have six main grid presets to consolidate margin and gutter adjustments across breakpoints.
        </p>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
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

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <article v-for="preset in gridPresets" :key="preset.title" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-lg">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
                {{ preset.title }} ({{ preset.screenSize }})
              </h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                {{ preset.usage }}
              </p>
              <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
                <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
                  Construction
                </p>
                <ul class="rg-construction-list">
                  <li>{{ preset.columnsLabel }}</li>
                  <li>{{ preset.gutters }} gutters</li>
                  <li>{{ preset.outerMargins }} margins</li>
                  <li>{{ preset.containerWidth }} container width</li>
                </ul>
              </div>
            </div>
            <div class="rg-grid-demo" :style="gridStyle(preset)" aria-hidden="true">
              <div class="rg-grid-frame">
                <div class="rg-grid-columns">
                  <span v-for="column in preset.columns" :key="column" class="rg-grid-column" />
                </div>
              </div>
              <span class="rg-demo-label">{{ preset.columnsLabel }} · {{ preset.gutters }} gutters</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section typography-page-template__section--spaced">
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
        Responsive grid with sticky sidebar
      </h4>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            A responsive grid with a sticky sidebar is a layout where the main content uses a flexible grid system,
            while the sidebar remains fixed within the viewport when scrolling.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            On mobile devices, the sidebar is hidden or repositioned to prioritise content visibility and improve
            usability.
          </p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
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

        <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <article v-for="preset in stickySidebarPresets" :key="preset.title" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-lg">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
                {{ preset.title }} ({{ preset.screenSize }})
              </h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                {{ preset.usage }}
              </p>
              <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
                <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
                  Construction
                </p>
                <ul class="rg-construction-list">
                  <li>{{ preset.columnsLabel }}</li>
                  <li>{{ preset.gutters }} gutters</li>
                  <li>{{ preset.outerMargins }} margins</li>
                  <li>{{ preset.containerWidth }} container width</li>
                  <li>{{ preset.sidebarWidth }} sidebar</li>
                </ul>
              </div>
            </div>
            <div class="rg-grid-demo" :style="gridStyle(preset)" aria-hidden="true">
              <div class="rg-grid-frame">
                <span class="rg-sidebar-block" />
                <div class="rg-grid-columns">
                  <span v-for="column in preset.columns" :key="column" class="rg-grid-column" />
                </div>
              </div>
              <span class="rg-demo-label">
                {{ preset.columnsLabel }} · {{ preset.sidebarWidth }}
              </span>
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
  inline-size: clamp(11rem, 18vw, 14rem);
  min-inline-size: clamp(11rem, 18vw, 14rem);
}

.rg-value-col {
  box-sizing: border-box;
  inline-size: clamp(8rem, 14vw, 11rem);
  min-inline-size: clamp(8rem, 14vw, 11rem);
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
  width: min(100%, 42rem);
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

.rg-demo-label {
  color: var(--sgds-body-color-muted);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  text-align: center;
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
}
</style>
