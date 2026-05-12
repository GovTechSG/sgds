<script setup lang="ts">
type CalloutPlacement = "top" | "bottom";

type Segment = {
  text: string;
  label: string;
  number: string;
  placement: CalloutPlacement;
  toneClass: string;
};

const segments: Segment[] = [
  {
    text: "sgds",
    label: "Namespace",
    number: "1",
    placement: "bottom",
    toneClass: "sgds:bg-neutral-surface-muted",
  },
  {
    text: "form",
    label: "Object",
    number: "2",
    placement: "top",
    toneClass: "sgds:bg-accent-surface-muted",
  },
  {
    text: "padding",
    label: "Base",
    number: "3",
    placement: "bottom",
    toneClass: "sgds:bg-primary-surface-muted",
  },
  {
    text: "y",
    label: "Modifier",
    number: "4",
    placement: "top",
    toneClass: "sgds:bg-success-surface-muted",
  },
];
</script>

<template>
  <figure
    class="sgds:m-0 sgds:overflow-x-auto"
    aria-label="Token naming positions shown with sgds form padding y"
  >
    <div class="sgds:flex sgds:min-w-[28rem] sgds:items-center sgds:justify-center sgds:px-component-xs sgds:py-component-sm">
      <div class="sgds:mx-auto sgds:grid sgds:grid-cols-[repeat(4,max-content)] sgds:items-end sgds:gap-text-xs">
        <div
          v-for="segment in segments"
          :key="segment.number"
          class="sgds:relative sgds:flex sgds:flex-col sgds:items-center sgds:gap-0"
        >
          <template v-if="segment.placement === 'top'">
            <span class="sgds:absolute sgds:left-1/2 sgds:top-0 sgds:block sgds:-translate-x-1/2 sgds:overflow-visible sgds:whitespace-nowrap sgds:text-center sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
              {{ segment.label }}
            </span>
            <span class="sgds:block sgds:h-[var(--sgds-line-height-2-xs)]" aria-hidden="true"></span>
            <span class="sgds:block sgds:h-[var(--sgds-text-gap-xs)]" aria-hidden="true"></span>
            <span class="sgds:inline-flex sgds:h-6 sgds:min-w-6 sgds:flex-shrink-0 sgds:items-center sgds:justify-center sgds:rounded-full sgds:bg-surface-inverse sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:text-inverse">
              {{ segment.number }}
            </span>
            <span class="sgds:block sgds:h-5 sgds:w-[var(--sgds-border-width-1)] sgds:bg-[var(--sgds-border-color-default)]" aria-hidden="true"></span>
          </template>
          <template v-else>
            <span class="sgds:block sgds:h-[var(--sgds-line-height-2-xs)]" aria-hidden="true"></span>
            <span class="sgds:invisible sgds:block sgds:h-[var(--sgds-text-gap-xs)]" aria-hidden="true"></span>
            <span class="sgds:invisible sgds:inline-flex sgds:h-6 sgds:min-w-6 sgds:flex-shrink-0 sgds:items-center sgds:justify-center sgds:rounded-full sgds:text-label-xs sgds:font-regular sgds:leading-3-xs">
              {{ segment.number }}
            </span>
            <span class="sgds:invisible sgds:block sgds:h-5 sgds:w-[var(--sgds-border-width-1)]" aria-hidden="true"></span>
          </template>

          <span
            :class="[
              'sgds:inline-flex sgds:items-center sgds:justify-center sgds:whitespace-nowrap sgds:rounded-full sgds:px-md sgds:py-2-xs sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-fixed-dark',
              segment.toneClass,
            ]"
          >
            {{ segment.text }}
          </span>

          <template v-if="segment.placement === 'bottom'">
            <span class="sgds:block sgds:h-5 sgds:w-[var(--sgds-border-width-1)] sgds:bg-[var(--sgds-border-color-default)]" aria-hidden="true"></span>
            <span class="sgds:inline-flex sgds:h-6 sgds:min-w-6 sgds:flex-shrink-0 sgds:items-center sgds:justify-center sgds:rounded-full sgds:bg-surface-inverse sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:text-inverse">
              {{ segment.number }}
            </span>
            <span class="sgds:block sgds:h-[var(--sgds-text-gap-xs)]" aria-hidden="true"></span>
            <span class="sgds:absolute sgds:bottom-0 sgds:left-1/2 sgds:block sgds:-translate-x-1/2 sgds:overflow-visible sgds:whitespace-nowrap sgds:text-center sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
              {{ segment.label }}
            </span>
            <span class="sgds:block sgds:h-[var(--sgds-line-height-2-xs)]" aria-hidden="true"></span>
          </template>
          <template v-else>
            <span class="sgds:invisible sgds:block sgds:h-5 sgds:w-[var(--sgds-border-width-1)]" aria-hidden="true"></span>
            <span class="sgds:invisible sgds:inline-flex sgds:h-6 sgds:min-w-6 sgds:flex-shrink-0 sgds:items-center sgds:justify-center sgds:rounded-full sgds:text-label-xs sgds:font-regular sgds:leading-3-xs">
              {{ segment.number }}
            </span>
            <span class="sgds:invisible sgds:block sgds:h-[var(--sgds-text-gap-xs)]" aria-hidden="true"></span>
            <span class="sgds:block sgds:h-[var(--sgds-line-height-2-xs)]" aria-hidden="true"></span>
          </template>
        </div>
      </div>
    </div>
  </figure>
</template>
