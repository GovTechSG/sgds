<script setup lang="ts">
import SectionHeader, { Section } from './SectionHeader.vue';

const { title, description, headingLevel, headerGap, gap = 'sgds:gap-text-lg' } = defineProps<Section & { gap?: string }>();
</script>

<template>
  <section :class="['sgds:flex sgds:flex-col', gap]">
    <SectionHeader
      :title="title"
      :description="description"
      :heading-level="headingLevel"
      :header-gap="headerGap"
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
