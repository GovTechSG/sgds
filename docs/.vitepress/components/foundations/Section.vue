<script setup lang="ts">
import SectionHeader, { Section } from './SectionHeader.vue';

const { title, description, headingLevel } = defineProps<Section>();
</script>

<template>
  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
    <SectionHeader
      :title="title"
      :description="description"
      :heading-level="headingLevel"
    />
    <div class="sgds:flex sgds:flex-col">
      <slot></slot>
    </div>
  </section>
</template>
