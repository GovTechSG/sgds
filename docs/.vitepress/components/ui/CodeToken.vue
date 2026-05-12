<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    surface?: boolean;
  }>(),
  {
    label: "",
    surface: true,
  },
);

const displayLabel = computed(() => props.label.replace(/^--sgds-/, "sgds-"));
</script>

<template>
  <code
    :class="[
      'sgds:text-default sgds:inline-block sgds:font-mono sgds:text-[0.875em] sgds:leading-[1.4] sgds:whitespace-nowrap',
      props.surface
        ? 'sgds:bg-surface-raised sgds:text-default sgds:rounded-sm sgds:px-[6px] sgds:py-0'
        : ''
    ]"
  >
    <slot>{{ displayLabel }}</slot>
  </code>
</template>
