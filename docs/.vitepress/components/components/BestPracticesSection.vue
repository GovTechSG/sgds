<script setup lang="ts">
import { computed } from "vue";
import type { BestPractice } from "../../data/component-docs";

const props = defineProps<{
  bestPractices: BestPractice[];
  showTitles?: boolean;
  iconsInBox?: boolean;
  titleTag?: "h3" | "h4" | "h5" | "h6";
  compactTitles?: boolean;
  compactSidePadding?: boolean;
}>();

const bestPracticeRows = computed(() => {
  const dos = props.bestPractices.filter((item) => item.tone === "do");
  const donts = props.bestPractices.filter((item) => item.tone === "dont");
  const rowCount = Math.max(dos.length, donts.length);

  return Array.from({ length: rowCount }, (_, index) => ({
    do: dos[index] ?? null,
    dont: donts[index] ?? null,
  }));
});
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <div
      v-for="(row, index) in bestPracticeRows"
      :key="`best-practice-row-${index}`"
      class="best-practice-row sgds:grid sgds:items-stretch sgds:gap-[var(--sgds-gap-2-xl)] sgds:grid-cols-2"
    >
      <article v-if="row.do" :key="row.do.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:h-full">
        <div :class="[
          'sgds:flex sgds:flex-1 sgds:flex-col sgds:justify-center sgds:bg-surface-raised sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:overflow-hidden sgds:gap-[var(--sgds-gap-md)] sgds:py-component-md',
          compactSidePadding ? 'sgds:px-component-sm' : 'sgds:px-component-md',
        ]">
          <span
            v-if="iconsInBox"
            class="sgds:absolute sgds:top-component-xs sgds:right-component-xs sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-success-default"
          >
            <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
            <div class="best-practice-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="row.do.markup"></div>
          </div>
        </div>
        <div :class="iconsInBox ? 'sgds:flex sgds:flex-col sgds:gap-text-2-xs' : 'sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xs)]'">
          <span v-if="!iconsInBox" class="sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-success-default">
            <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <component
              :is="titleTag || 'h3'"
              v-if="showTitles"
              :class="[
                'sgds:text-heading-default sgds:m-0 sgds:font-semibold',
                compactTitles
                  ? 'sgds:text-subtitle-sm sgds:leading-2-xs sgds:tracking-normal'
                  : 'sgds:text-heading-sm sgds:leading-sm sgds:tracking-tight',
              ]"
            >{{ row.do.title }}</component>
            <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.do.description }}</p>
          </div>
        </div>
      </article>
      <div v-else class="sgds:min-w-0"></div>

      <article v-if="row.dont" :key="row.dont.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:h-full">
        <div :class="[
          'sgds:flex sgds:flex-1 sgds:flex-col sgds:justify-center sgds:bg-surface-raised sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:overflow-hidden sgds:gap-[var(--sgds-gap-md)] sgds:py-component-md',
          compactSidePadding ? 'sgds:px-component-sm' : 'sgds:px-component-md',
        ]">
          <span
            v-if="iconsInBox"
            class="sgds:absolute sgds:top-component-xs sgds:right-component-xs sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-danger-default"
          >
            <sgds-icon name="xcircle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
            <div class="best-practice-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="row.dont.markup"></div>
          </div>
        </div>
        <div :class="iconsInBox ? 'sgds:flex sgds:flex-col sgds:gap-text-2-xs' : 'sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xs)]'">
          <span v-if="!iconsInBox" class="sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-danger-default">
            <sgds-icon name="xcircle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <component
              :is="titleTag || 'h3'"
              v-if="showTitles"
              :class="[
                'sgds:text-heading-default sgds:m-0 sgds:font-semibold',
                compactTitles
                  ? 'sgds:text-subtitle-sm sgds:leading-2-xs sgds:tracking-normal'
                  : 'sgds:text-heading-sm sgds:leading-sm sgds:tracking-tight',
              ]"
            >{{ row.dont.title }}</component>
            <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.dont.description }}</p>
          </div>
        </div>
      </article>
      <div v-else class="sgds:min-w-0"></div>
    </div>
  </div>
</template>

<style>
/* Global selectors targeting slotted web component elements in v-html markup */
.best-practice-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.best-practice-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.best-practice-demo-markup sgds-alert-link {
  vertical-align: baseline;
}

/* Responsive fallback for this section because the SGDS prefixed breakpoint utility
   is not being applied reliably in the current build pipeline. */
@media (max-width: 511px) {
  .best-practice-row {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
