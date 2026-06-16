<script setup>
import { Content } from "vitepress";
</script>

<template>
  <main class="preview-layout">
    <Content />
  </main>
</template>

<style>
.preview-layout {
  min-height: 100vh;
  background: var(--sgds-surface-raised);
}
</style>
