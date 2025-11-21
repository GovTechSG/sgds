<script setup lang="ts">
import SectionHeader, { Section } from './SectionHeader.vue';

const { title, description } = defineProps<Section>();
</script>

<template>
  <section :class="$style.container">
    <SectionHeader
      :title="title"
      :description="description"
    />
    <slot></slot>
  </section>
</template>

<style module>
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-3-xl);
  }
</style>