<script setup lang="ts">
defineProps<{
  number: number | string;
  title: string;
  note?: string;
}>();
</script>

<template>
  <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:min-w-0">
    <div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-inverse sgds:rounded-full sgds:flex-none sgds:h-6 sgds:w-6">
      <span class="sgds:text-inverse sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:text-center sgds:w-4">{{ number }}</span>
    </div>
    <p class="sgds:text-heading-default sgds:flex-1 sgds:m-0 sgds:min-w-0">
      <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">{{ title }}</span>
      <span v-if="note" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ ` ${note}` }}</span>
    </p>
  </div>
</template>
