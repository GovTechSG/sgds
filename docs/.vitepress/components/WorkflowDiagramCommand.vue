<script setup lang="ts">
const props = defineProps<{
  label: string;
  variant?: "tool" | "skill";
}>();
</script>

<template>
  <code :class="[$style.command, props.variant === 'skill' ? $style.skill : $style.tool]">
    {{ props.label }}
  </code>
</template>

<style module>
.command {
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-body-color-default);
  display: inline-block;
  font-family: monospace;
  font-size: var(--sgds-font-size-label-xs);
  letter-spacing: normal;
  line-height: var(--sgds-line-height-16);
  padding: 1px var(--sgds-padding-2-xs);
  white-space: nowrap;
}

.tool {
  background: var(--sgds-surface-raised);
}

.skill {
  background: var(--sgds-primary-surface-translucent);
  border-color: var(--sgds-primary-border-color-muted);
  color: var(--sgds-primary-color-emphasis);
}
</style>
