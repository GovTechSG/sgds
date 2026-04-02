<script setup lang="ts">
import type { AvailabilityStatus } from "../data/component-docs";

type MetadataItem = {
  label: string;
  status: AvailabilityStatus;
};

export type Page = {
  title: string;
  description?: string;
  metadata?: MetadataItem[];
  titleClass?: string;
  descriptionClass?: string;
}
const { title, description, metadata, titleClass, descriptionClass } = defineProps<Page>();
</script>

<template>
  <div :class="$style['page-header']">
    <h1 :class="[$style.title, titleClass || 'sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter']">{{ title }}</h1>
    <p
      v-if="description"
      :class="[$style.description, descriptionClass || 'sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight']"
    >
      {{ description }}
    </p>
  </div>
  <div :class="$style.metadata" v-if="metadata?.length">
    <div
      v-for="item in metadata"
      :key="item.label"
      :class="[$style.item, item.status === 'available' ? $style.available : $style.unavailable]"
    >
      <sgds-icon name="check-circle-fill" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<style module>
  .page-header {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-2-xl);
    margin-bottom: var(--sgds-layout-gap-md);
  }

  .title {
    margin-bottom: var(--sgds-margin-none);
  }

  .description {
    color: var(--sgds-heading-color-subtle);
    margin-bottom: var(--sgds-margin-none);
    max-width: var(--sgds-container-max-width-md);
  }

  .metadata {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sgds-gap-2-xl);
    margin: var(--sgds-layout-gap-lg) var(--sgds-margin-none);
  }

  .item {
    display: flex;
    gap: var(--sgds-gap-xs);
    align-items: center;
  }

  .available sgds-icon {
    color: var(--sgds-success-color-default);
  }

  .unavailable sgds-icon {
    color: var(--sgds-border-color-muted);
  }
</style>
