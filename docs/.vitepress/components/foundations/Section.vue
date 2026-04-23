<script setup lang="ts">
import SectionHeader, { Section } from './SectionHeader.vue';

const { title, description, gap = 'sgds:gap-text-lg' } = defineProps<Section & { gap?: string }>();
</script>

<template>
  <section :class="['sgds:flex sgds:flex-col', gap]">
    <SectionHeader
      :title="title"
      :description="description"
    >
      <template v-if="$slots['title-suffix']" #title-suffix>
        <slot name="title-suffix"></slot>
      </template>
    </SectionHeader>
    <div class="sgds:flex sgds:flex-col">
      <slot></slot>
    </div>
  </section>
</template>
