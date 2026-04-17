<script setup lang="ts">
import CodeToken from "../ui/CodeToken.vue";
import type { AccordionV2TokenRow } from "../../data/accordion-v2";

defineProps<{
  rows: AccordionV2TokenRow[];
}>();
</script>

<template>
  <sgds-table tableBorder headerBackground responsive="always">
    <sgds-table-row>
      <sgds-table-head>Token</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Usage</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row v-for="row in rows" :key="row.token">
      <sgds-table-cell><CodeToken :label="row.token" /></sgds-table-cell>
      <sgds-table-cell>{{ row.value }}</sgds-table-cell>
      <sgds-table-cell>{{ row.usage }}</sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</template>
