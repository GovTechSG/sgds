<script setup lang="ts">
import { usePrevNext } from '../../theme/composables/usePrevNext';

const prevNext = usePrevNext();
</script>

<template>
  <nav class="sgds-grid sgds:gap-layout-md">
    <a
      v-if="prevNext.prev"
      :href="prevNext.prev.link"
      class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:items-start sgds:bg-surface-raised sgds:rounded-lg sgds:text-default sgds:gap-component-sm sgds:p-5 sgds:no-underline sgds:hover:text-default sgds:focus:text-default sgds:focus-visible:text-default sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
    >
      <sgds-icon name="arrow-circle-left" size="2-xl" class="sgds:shrink-0"></sgds-icon>
      <div class="sgds:flex sgds:flex-1 sgds:flex-col sgds:gap-text-2-xs sgds:min-w-0">
        <p class="sgds:text-1 sgds:font-regular sgds:leading-20 sgds:tracking-normal sgds:mb-0">Previous</p>
        <h5 class="sgds:text-heading-default sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-0">{{ prevNext.prev.text }}</h5>
      </div>
    </a>

    <a
      v-if="prevNext.next"
      :href="prevNext.next.link"
      class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:items-start sgds:justify-between sgds:bg-surface-raised sgds:rounded-lg sgds:text-default sgds:gap-component-sm sgds:p-5 sgds:no-underline sgds:hover:text-default sgds:focus:text-default sgds:focus-visible:text-default sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
    >
      <div class="sgds:flex sgds:flex-1 sgds:flex-col sgds:gap-text-2-xs sgds:min-w-0">
        <p class="sgds:text-1 sgds:font-regular sgds:leading-20 sgds:tracking-normal sgds:mb-0">Next</p>
        <h5 class="sgds:text-heading-default sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-0">{{ prevNext.next.text }}</h5>
      </div>
      <sgds-icon name="arrow-circle-right" size="2-xl" class="sgds:shrink-0"></sgds-icon>
    </a>
  </nav>
</template>
