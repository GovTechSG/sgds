<script setup>
import { Content } from "vitepress";
</script>

<template>
  <div :class="$style['layout-container']">
    <Content />
  </div>
</template>

<style module>
  .layout-container {
    margin: var(--sgds-margin-none) var(--sgds-margin-none) var(--sgds-margin-xl);
  }
</style>
