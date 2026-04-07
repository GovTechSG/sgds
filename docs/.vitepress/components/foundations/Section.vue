<script setup lang="ts">
import SectionHeader, { Section } from './SectionHeader.vue';

const { title, description } = defineProps<Section>();
</script>

<template>
  <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <SectionHeader
      :title="title"
      :description="description"
    />
    <div class="sgds:flex sgds:flex-col">
      <slot></slot>
    </div>
  </section>
</template>
