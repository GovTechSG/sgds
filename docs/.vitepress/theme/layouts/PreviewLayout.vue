<script setup>
import { Content } from "vitepress";
</script>

<template>
  <div class="preview-layout">
    <Content />
  </div>
</template>

<style>
.preview-layout {
  min-height: 100vh;
  background: var(--sgds-surface-raised);
}
</style>
