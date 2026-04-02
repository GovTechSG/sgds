<script setup lang="ts">
defineProps<{
  steps: Array<{
    number: number;
    title: string;
  }>;
}>();
</script>

<template>
  <div :class="$style.block">
    <div :class="$style.stepper">
      <div
        v-for="(step, index) in steps"
        :key="step.number"
        :class="$style.stepperRow"
      >
        <div :class="$style.markerColumn">
          <span :class="$style.marker">{{ step.number }}</span>
          <span
            v-if="index < steps.length - 1"
            :class="$style.connector"
          ></span>
        </div>
        <div :class="$style.stepContent">
          <h4 :class="[$style.stepTitle, 'sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal']">
            {{ step.title }}
          </h4>
          <slot :name="`step-${step.number}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.block {
  margin: 0;
}

.stepper {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xl);
  width: 100%;
}

.stepperRow {
  align-items: stretch;
  display: grid;
  gap: var(--sgds-gap-md);
  grid-template-columns: var(--sgds-dimension-32) minmax(0, 1fr);
}

.markerColumn {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.marker {
  align-items: center;
  background: var(--sgds-surface-raised);
  border-radius: 50%;
  color: var(--sgds-color-subtle);
  display: inline-flex;
  flex: 0 0 auto;
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-semibold);
  height: var(--sgds-dimension-32);
  justify-content: center;
  line-height: var(--sgds-line-height-20);
  letter-spacing: var(--sgds-letter-spacing-normal);
  width: var(--sgds-dimension-32);
}

.connector {
  background: var(--sgds-surface-raised);
  display: block;
  margin-top: calc(var(--sgds-gap-xs) * -1);
  flex: 1 1 auto;
  min-height: 0;
  width: var(--sgds-border-width-1);
}

.stepTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
  padding-top: var(--sgds-padding-2-xs);
}

.stepContent {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  min-width: 0;
  width: 100%;
}

.stepContent :global(sgds-copy-button) {
  width: 100%;
}

.stepContent :global(p) {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

@media (max-width: 767px) {
  .stepper {
    width: 100%;
  }
}
</style>
