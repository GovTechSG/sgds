<script setup lang="ts">
export type Section = {
  title: string;
  description?: string;
}
const { title, description } = defineProps<Section>();
</script>

<template>
  <div :class="$style['section-header']">
    <div :class="$style['title-container']">
      <h2
        :class="$style.title"
        class="sgds:text-6 sgds:font-bold sgds:leading-40 sgds:tracking-tighter"
      >
        {{ title }}
      </h2>
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
    color: var(--sgds-body-color-subtle);
    font-size: var(--sgds-font-size-2);
    font-weight: var(--sgds-font-weight-regular);
    line-height: var(--sgds-line-height-24);
    letter-spacing: var(--sgds-letter-spacing-normal);
    max-width: 864px;
    margin-bottom: var(--sgds-margin-none);
  }
</style>
