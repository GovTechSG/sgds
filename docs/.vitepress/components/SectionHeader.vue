<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/IconButton/index.js";

export type Section = {
  title: string;
  description?: string;
}
const { title, description } = defineProps<Section>();
</script>

<template>
  <div :class="$style['section-header']">
    <div :class="$style['title-container']">
      <h2 :class="$style.title">{{ title }}</h2>
      <sgds-icon-button name="link" variant="ghost" tone="neutral" size="xs" />
    </div>
    <p v-if="description" :class="$style.description">{{ description }}</p>
  </div>
</template>

<style module>
  .section-header {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-md);
  }

  .title-container {
    display: flex;
    gap: var(--sgds-gap-xs);
    align-items: center;
  }

  .title {
    margin-bottom: var(--sgds-margin-none);
  }

  .description {
    margin-bottom: var(--sgds-margin-none);
  }
</style>