<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    surface?: boolean;
    wrap?: boolean;
  }>(),
  {
    label: "",
    surface: true,
    wrap: false,
  },
);

const displayLabel = computed(() => props.label.replace(/^--sgds-/, "sgds-"));
</script>

<template>
  <code
    :class="[
      'sgds:text-default sgds:font-mono sgds:text-size-xs sgds:leading-[1.4]',
      props.wrap
        ? 'sgds:inline sgds:whitespace-normal sgds:break-all'
        : 'sgds:inline-block sgds:whitespace-nowrap',
      props.surface
        ? 'sgds:bg-surface-raised sgds:text-default sgds:rounded-sm sgds:px-[6px] sgds:py-0'
        : ''
    ]"
  >
    <slot>{{ displayLabel }}</slot>
  </code>
</template>
