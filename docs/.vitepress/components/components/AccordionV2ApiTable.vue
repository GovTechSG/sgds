<script setup lang="ts">
import type { AccordionV2ApiRow } from "../../data/accordion-v2";

defineProps<{
  rows: AccordionV2ApiRow[];
}>();
</script>

<template>
  <sgds-table tableBorder headerBackground responsive="always">
    <sgds-table-row>
      <sgds-table-head>Property</sgds-table-head>
      <sgds-table-head>Type</sgds-table-head>
      <sgds-table-head>Default</sgds-table-head>
      <sgds-table-head>Description</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row v-for="row in rows" :key="row.name">
      <sgds-table-cell>{{ row.name }}</sgds-table-cell>
      <sgds-table-cell>{{ row.type }}</sgds-table-cell>
      <sgds-table-cell>{{ row.defaultValue }}</sgds-table-cell>
      <sgds-table-cell>{{ row.description }}</sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</template>
