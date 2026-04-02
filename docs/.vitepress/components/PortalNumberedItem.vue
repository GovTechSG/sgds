<script setup lang="ts">
defineProps<{
  number: number | string;
  title: string;
  note?: string;
}>();
</script>

<template>
  <div :class="$style.item">
    <div :class="$style.number">
      <span :class="$style.numberLabel">{{ number }}</span>
    </div>
    <p :class="$style.label">
      <span :class="$style.title">{{ title }}</span>
      <span v-if="note" :class="$style.note">{{ ` ${note}` }}</span>
    </p>
  </div>
</template>

<style module>
.item {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
  min-width: 0;
}

.number {
  align-items: center;
  background: var(--sgds-surface-inverse);
  border-radius: 50%;
  display: flex;
  flex: 0 0 auto;
  height: var(--sgds-dimension-24);
  justify-content: center;
  width: var(--sgds-dimension-24);
}

.numberLabel {
  color: var(--sgds-color-inverse);
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-16);
  text-align: center;
  width: var(--sgds-dimension-16);
}

.label {
  color: var(--sgds-heading-color-default);
  flex: 1 0 0;
  margin: 0;
  min-width: 0;
}

.title,
.note {
  font-size: var(--sgds-font-size-2);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
}

.title {
  font-weight: var(--sgds-font-weight-semibold);
}

.note {
  font-weight: var(--sgds-font-weight-regular);
}
</style>
