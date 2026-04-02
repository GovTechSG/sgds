<script setup lang="ts">
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
</script>

<template>
  <code :class="[$style.token, props.surface ? $style.surface : $style.plain]">
    <slot>{{ props.label }}</slot>
  </code>
</template>

<style module>
.token {
  color: var(--sgds-body-color-default);
  display: inline-block;
  font-family: monospace;
  font-size: 0.875em;
  line-height: 1.4;
  white-space: nowrap;
}

.surface {
  background: var(--sgds-surface-raised);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  padding: 2px 6px;
}

.plain {
  background: none;
  border: none;
  padding: 0;
}
</style>
