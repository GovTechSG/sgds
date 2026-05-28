<script setup lang="ts">
const props = defineProps<{
  label: string;
  variant?: "tool" | "skill";
}>();
</script>

<template>
  <code :class="[
    'sgds:rounded-sm sgds:text-default sgds:inline-block sgds:font-mono sgds:text-body-sm sgds:tracking-normal sgds:leading-2-xs sgds:px-1 sgds:py-0 sgds:whitespace-nowrap',
    props.variant === 'skill'
      ? 'sgds:bg-[var(--sgds-primary-surface-translucent)] sgds:text-[var(--sgds-primary-color-emphasis)]'
      : 'sgds:bg-surface-raised'
  ]">
    {{ props.label }}
  </code>
</template>
