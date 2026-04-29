<script setup lang="ts">
import { computed } from "vue";
import { getPatternDoc } from "../../data/pattern-docs";

const props = defineProps<{ blockKey: string }>();

// Render every variant of the requested block category, stacked vertically
// inside the iframe. The toolbar in the parent preview shell exposes the same
// switcher dropdown the page templates use, so users land on the canonical
// "block kit" view by default.
const variants = computed(() => {
  const doc = getPatternDoc(props.blockKey);
  return doc?.demos ?? [];
});

const isSingleVariant = computed(() => variants.value.length === 1);
</script>

<template>
  <div v-if="isSingleVariant" class="block-raw-single" v-html="variants[0]?.markup"></div>
  <div v-else class="block-raw-root">
    <section
      v-for="(variant, idx) in variants"
      :key="idx"
      class="block-raw-variant"
    >
      <header class="block-raw-variant-header">
        <span class="block-raw-variant-label">{{ idx + 1 }} of {{ variants.length }}</span>
        <h2 class="block-raw-variant-title">{{ variant.title }}</h2>
        <p v-if="variant.description" class="block-raw-variant-description">{{ variant.description }}</p>
      </header>
      <div class="block-raw-variant-body" v-html="variant.markup"></div>
    </section>
  </div>
</template>

<style>
.block-raw-root {
  display: flex;
  flex-direction: column;
  /* Each variant gets a clear visual divider against the surrounding stage so
     the iframe reads as a stacked "kit" of options, not a single page. */
  background: var(--sgds-surface-raised);
}

.block-raw-variant {
  background: var(--sgds-surface-default);
  margin-bottom: var(--sgds-spacing-layout-md);
}

.block-raw-variant:last-child {
  margin-bottom: 0;
}

.block-raw-variant-header {
  padding: var(--sgds-spacing-component-md) var(--sgds-spacing-layout-md);
  border-bottom: 1px solid var(--sgds-border-color-muted);
  background: var(--sgds-surface-raised);
}

.block-raw-variant-label {
  display: inline-block;
  font-size: var(--sgds-font-size-1);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-wide);
  color: var(--sgds-body-color-subtle);
  text-transform: uppercase;
  margin-bottom: var(--sgds-spacing-2-xs);
}

.block-raw-variant-title {
  font-size: var(--sgds-font-size-4);
  font-weight: var(--sgds-font-weight-semibold);
  color: var(--sgds-heading-color-default);
  margin: 0 0 var(--sgds-spacing-2-xs) 0;
}

.block-raw-variant-description {
  font-size: var(--sgds-font-size-2);
  color: var(--sgds-body-color-subtle);
  margin: 0;
}

.block-raw-variant-body {
  /* Each variant renders as the storybook content does — full-width inside
     this wrapper. Container utilities inside the markup constrain horizontal
     bleed, so no extra padding is needed here. */
}

.block-raw-single {
  background: var(--sgds-surface-default);
}
</style>
