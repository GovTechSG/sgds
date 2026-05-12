<script setup lang="ts">
import type { MeasurementAsset, ComponentDemo } from "../../data/component-docs";

defineProps<{
  examples: (MeasurementAsset | ComponentDemo)[];
}>();
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <div
      v-for="example in examples"
      :key="example.title"
      class="sgds:flex sgds:flex-col sgds:justify-start sgds:relative"
    >
      <div
        v-if="example.title"
        class="sgds:flex sgds:flex-col sgds:items-start sgds:mb-[var(--sgds-gap-sm)]"
      >
        <h3 class="sgds:text-subtle sgds:text-label-sm sgds:font-regular sgds:tracking-normal sgds:leading-xs sgds:m-0">{{ example.title }}</h3>
      </div>

      <div class="measurements-demo-box sgds:flex sgds:items-center sgds:justify-center sgds:relative sgds:w-full sgds:border sgds:border-muted sgds:rounded-xl sgds:overflow-clip sgds:min-h-[var(--sgds-dimension-288)] sgds:px-component-md sgds:py-component-sm">
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
    </div>
  </div>
</template>

<style>
/* Dark theme image switching — requires global class selector */
.sgds-night-theme .measurement-image-light { display: none; }
.sgds-night-theme .measurement-image-dark { display: block !important; }

/* Matches the accordion structure demo box background; alternate subtle grey
   surface can only be expressed via the SGDS CSS variable, so a single
   background rule is unavoidable here. */
.measurements-demo-box {
  background: var(--sgds-bg-alternate);
  box-sizing: border-box;
  max-width: 100%;
}

/* Global selector for SGDS alerts rendered through v-html in structure demos. */
.measurements-demo-box sgds-alert {
  box-sizing: border-box;
  display: block;
  margin-inline: auto;
  max-width: var(--sgds-dimension-512);
  min-width: 0;
  width: 100%;
}
</style>
