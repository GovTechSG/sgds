<script setup lang="ts">
import CodeToken from "./CodeToken.vue";
import { skills } from "../../data/skills";
</script>

<template>
  <sgds-table tableBorder headerBackground responsive="always" class="sgds:w-full">
    <sgds-table-row>
      <sgds-table-head>Skill</sgds-table-head>
      <sgds-table-head>What it covers</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row v-for="skill in skills" :key="skill.name">
      <sgds-table-cell><CodeToken :label="skill.name" /></sgds-table-cell>
      <sgds-table-cell>
        <span
          class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default"
          v-html="skill.descriptionHtml"
        ></span>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</template>
