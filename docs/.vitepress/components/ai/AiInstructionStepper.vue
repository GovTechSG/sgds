<script setup lang="ts">
defineProps<{
  steps: Array<{
    number: number;
    title: string;
  }>;
}>();
</script>

<template>
  <div class="sgds:m-0">
    <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xl)] sgds:w-full">
      <div
        v-for="(step, index) in steps"
        :key="step.number"
        class="sgds:grid sgds:items-stretch sgds:gap-[var(--sgds-gap-md)] sgds:grid-cols-[var(--sgds-dimension-32)_minmax(0,1fr)]"
      >
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:h-full">
          <span class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-surface-raised sgds:rounded-full sgds:text-subtle sgds:flex-none sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:h-8 sgds:w-8">{{ step.number }}</span>
          <span
            v-if="index < steps.length - 1"
            class="sgds:bg-surface-raised sgds:block sgds:-mt-[var(--sgds-gap-xs)] sgds:flex-1 sgds:min-h-0 sgds:w-[var(--sgds-border-width-1)]"
          ></span>
        </div>
        <div class="instruction-step-content sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:min-w-0 sgds:w-full">
          <h4 class="sgds:text-heading-default sgds:m-0 sgds:pt-[var(--sgds-padding-2-xs)] sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
            {{ step.title }}
          </h4>
          <slot :name="`step-${step.number}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Global selectors targeting slotted content inside instruction stepper steps */
.instruction-step-content sgds-copy-button {
  width: 100%;
}

.instruction-step-content p {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}
</style>
