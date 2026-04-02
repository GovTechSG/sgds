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
    <div :class="$style.content">
      <slot></slot>
    </div>
  </section>
</template>

<style module>
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-layout-gap-md);
  }

  .content {
    display: flex;
    flex-direction: column;
  }
</style>
