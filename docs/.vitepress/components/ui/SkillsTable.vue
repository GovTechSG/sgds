<script setup lang="ts">
import CodeToken from "./CodeToken.vue";
import { skills } from "../../data/skills";
</script>

<template>
  <sgds-table tableBorder headerBackground responsive="always">
    <sgds-table-row>
      <sgds-table-head>Skill</sgds-table-head>
      <sgds-table-head>What it covers</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row v-for="skill in skills" :key="skill.name">
      <sgds-table-cell><CodeToken :label="skill.name" /></sgds-table-cell>
      <sgds-table-cell><span v-html="skill.descriptionHtml"></span></sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</template>

<style>
/* Matches CodeToken surface styling for inline use in v-html descriptions */
.portal-code-token {
  background: var(--sgds-surface-raised);
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-body-color-default);
  display: inline-block;
  font-family: monospace;
  font-size: 0.875em;
  line-height: 1.4;
  padding: 0 6px;
  white-space: nowrap;
}
</style>
