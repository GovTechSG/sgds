<script setup lang="ts">
const props = defineProps<{
  label: string;
  variant?: "tool" | "skill";
}>();
</script>

<template>
  <code :class="[
    'sgds:border sgds:border-muted sgds:rounded-sm sgds:text-default sgds:inline-block sgds:font-mono sgds:text-label-xs sgds:tracking-normal sgds:leading-2-xs sgds:px-[var(--sgds-padding-2-xs)] sgds:py-[1px] sgds:whitespace-nowrap',
    props.variant === 'skill'
      ? 'sgds:bg-[var(--sgds-primary-surface-translucent)] sgds:border-[var(--sgds-primary-border-color-muted)] sgds:text-[var(--sgds-primary-color-emphasis)]'
      : 'sgds:bg-surface-raised'
  ]">
    {{ props.label }}
  </code>
</template>
