<script setup lang="ts">
import { useData } from "vitepress";

const { site } = useData()
</script>

<template>
  <sgds-footer>
    <h2 slot="title">{{ site.title }}</h2>
    <p slot="description">The Singapore Government Design System was developed to empower teams in creating fast, accessible and mobile-friendly digital services.</p>
  </sgds-footer>
</template>
