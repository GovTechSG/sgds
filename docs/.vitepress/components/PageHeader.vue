<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Icon/index.js";

export type Page = {
  title: string;
  description?: string;
  figma?: boolean;
  responsive?: boolean;
  storybook?: boolean;
}
const { title, description, figma, responsive, storybook } = defineProps<Page>();
</script>

<template>
  <div :class="$style['page-header']">
    <h1 :class="$style.title">{{ title }}</h1>
    <p v-if="description" :class="$style.description">{{ description }}</p>
  </div>
  <div :class="$style.metadata" v-if="figma || responsive || storybook">
    <div :class="$style.item" v-if="figma">
      <sgds-icon name="check-circle-fill" />
      <span>Figma</span>
    </div>
    <div :class="$style.item" v-if="responsive">
      <sgds-icon name="check-circle-fill" />
      <span>Responsive</span>
    </div>
    <div :class="$style.item" v-if="storybook">
      <sgds-icon name="check-circle-fill" />
      <span>Storybook</span>
    </div>
  </div>
</template>

<style module>
  .page-header {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-2-xl);
  }

  .title {
    font-size: var(--sgds-font-size-9);
    margin-bottom: var(--sgds-margin-none);
  }

  .description {
    font-size: var(--sgds-font-size-4);
    font-weight: var(--sgds-font-weight-light);
    line-height: var(--sgds-line-height-32);
    letter-spacing: var(--sgds-letter-spacing-tight);
    margin-bottom: var(--sgds-margin-none);
  }

  .metadata {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sgds-gap-2-xl);
    margin: var(--sgds-margin-xl) var(--sgds-margin-none);
  }
  
  .item {
    display: flex;
    gap: var(--sgds-gap-sm);
    align-items: center;
  }

  .item sgds-icon {
    color: var(--sgds-success-color-default);
  }
</style>