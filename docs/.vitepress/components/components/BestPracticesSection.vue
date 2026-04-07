<script setup lang="ts">
import { computed } from "vue";
import type { BestPractice } from "../../data/component-docs";

const props = defineProps<{
  bestPractices: BestPractice[];
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
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
    <div
      v-for="(row, index) in bestPracticeRows"
      :key="`best-practice-row-${index}`"
      class="sgds:grid sgds:items-stretch sgds:gap-[var(--sgds-gap-2-xl)] sgds:grid-cols-2 sgds:max-lg:grid-cols-1"
    >
      <article v-if="row.do" :key="row.do.title" class="sgds:flex sgds:flex-col sgds:gap-layout-sm sgds:h-full">
        <div class="sgds:flex sgds:flex-col sgds:justify-center sgds:bg-surface-raised sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-280)] sgds:overflow-hidden sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
          <div class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
            <div class="best-practice-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="row.do.markup"></div>
          </div>
        </div>
        <div class="sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xs)]">
          <span class="sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-success-default">
            <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
          </span>
          <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.do.description }}</p>
        </div>
      </article>
      <div v-else class="sgds:min-w-0"></div>

      <article v-if="row.dont" :key="row.dont.title" class="sgds:flex sgds:flex-col sgds:gap-layout-sm sgds:h-full">
        <div class="sgds:flex sgds:flex-col sgds:justify-center sgds:bg-surface-raised sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-280)] sgds:overflow-hidden sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
          <div class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
            <div class="best-practice-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="row.dont.markup"></div>
          </div>
        </div>
        <div class="sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xs)]">
          <span class="sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-danger-default">
            <sgds-icon name="xcircle-fill" size="lg"></sgds-icon>
          </span>
          <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.dont.description }}</p>
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
  display: block;
  width: 100%;
}

.best-practice-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.best-practice-demo-markup sgds-alert-link {
  vertical-align: baseline;
}
</style>
