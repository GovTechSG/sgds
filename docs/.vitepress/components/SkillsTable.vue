<script setup lang="ts">
import CodeToken from "./CodeToken.vue";
</script>

<template>
  <sgds-table tableBorder headerBackground>
    <sgds-table-row>
      <sgds-table-head>Skill</sgds-table-head>
      <sgds-table-head>What it covers</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-workflow" /></sgds-table-cell>
      <sgds-table-cell>Start here when unsure. Maps all SGDS skills and the order to use them.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-getting-started" /></sgds-table-cell>
      <sgds-table-cell>Technical setup: fonts, CSS imports, component registration, and app layout.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-components" /></sgds-table-cell>
      <sgds-table-cell>All 46 <CodeToken>&lt;sgds-*&gt;</CodeToken> web components — attributes, slots, events, and usage examples.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-utilities" /></sgds-table-cell>
      <sgds-table-cell>All <CodeToken>sgds:</CodeToken> Tailwind utility classes: grid, spacing, typography, colours, borders, and more.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-theming" /></sgds-table-cell>
      <sgds-table-cell>Brand colour overrides, dark mode setup, and font customisation.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-forms" /></sgds-table-cell>
      <sgds-table-cell>Form validation, constraint validation, <CodeToken>FormData</CodeToken>, and <CodeToken>setInvalid</CodeToken>.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-pattern-block-templates" /></sgds-table-cell>
      <sgds-table-cell>App shell and self-contained UI blocks: filter sidebar, session detail, and more.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-pattern-page-templates" /></sgds-table-cell>
      <sgds-table-cell>Full-page layouts: dashboard, login, list page, form page, settings.</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><CodeToken label="sgds-data-visualisation" /></sgds-table-cell>
      <sgds-table-cell>Charts and dashboards using ECharts with the SGDS colour palette.</sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</template>
