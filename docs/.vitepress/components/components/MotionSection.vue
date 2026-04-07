<script setup lang="ts">
import type { MotionSpec } from "../../data/component-docs";

defineProps<{
  previewMarkup: string;
  specs: MotionSpec[];
}>();
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <article class="sgds:flex sgds:flex-col sgds:justify-start sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:p-component-md">
      <div class="sgds:flex sgds:items-center sgds:justify-center sgds:flex-1 sgds:relative sgds:w-full">
        <div class="sgds:flex sgds:items-center sgds:justify-center sgds:flex-1 sgds:w-full">
          <div class="sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="previewMarkup"></div>
        </div>
      </div>
    </article>
    <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xl)]">
      <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-3 sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Motion specifications</h3>
      <sgds-table tableBorder headerBackground>
        <sgds-table-row>
          <sgds-table-head>Element</sgds-table-head>
          <sgds-table-head>Value</sgds-table-head>
          <sgds-table-head>Duration</sgds-table-head>
          <sgds-table-head>Ease</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="spec in specs" :key="spec.element">
          <sgds-table-cell>{{ spec.element }}</sgds-table-cell>
          <sgds-table-cell>{{ spec.value }}</sgds-table-cell>
          <sgds-table-cell>{{ spec.duration }}</sgds-table-cell>
          <sgds-table-cell>{{ spec.easing }}</sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </div>
  </div>
</template>
