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
    margin: var(--sgds-margin-xl) var(--sgds-margin-none);
  }
</style>