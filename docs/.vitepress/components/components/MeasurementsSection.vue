<script setup lang="ts">
import type { MeasurementAsset, ComponentDemo } from "../../data/component-docs";

defineProps<{
  examples: (MeasurementAsset | ComponentDemo)[];
}>();
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <article
      v-for="example in examples"
      :key="example.title"
      class="sgds:flex sgds:flex-col sgds:justify-start sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:p-component-md"
    >
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:absolute sgds:left-[var(--sgds-component-padding-md)] sgds:top-[var(--sgds-component-padding-md)] sgds:z-[1]">
        <h3 class="sgds:text-subtle sgds:text-label-sm sgds:font-regular sgds:tracking-normal sgds:leading-xs sgds:m-0">{{ example.title }}</h3>
      </div>

      <div class="sgds:flex sgds:items-center sgds:justify-center sgds:flex-1 sgds:relative sgds:w-full">
        <template v-if="'lightSrc' in example">
          <img
            class="sgds:block sgds:h-auto sgds:max-w-full sgds:w-[min(100%,var(--sgds-dimension-688))] measurement-image-light"
            :src="example.lightSrc"
            :alt="example.alt"
          />
          <img
            class="sgds:hidden sgds:h-auto sgds:max-w-full sgds:w-[min(100%,var(--sgds-dimension-688))] measurement-image-dark"
            :src="example.darkSrc"
            :alt="`${example.alt} in dark mode`"
          />
        </template>
        <div v-else class="sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="example.markup"></div>
      </div>
    </article>
  </div>
</template>

<style>
/* Dark theme image switching — requires global class selector */
.sgds-night-theme .measurement-image-light { display: none; }
.sgds-night-theme .measurement-image-dark { display: block !important; }
</style>
