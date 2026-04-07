<script setup lang="ts">
export type Section = {
  title: string;
  description?: string;
}
const { title, description } = defineProps<Section>();
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
    <div class="sgds:flex sgds:gap-2 sgds:items-center">
      <h2
        class="sgds:text-6 sgds:font-bold sgds:leading-40 sgds:tracking-tighter sgds:mb-0"
      >
        {{ title }}
      </h2>
      <sgds-icon-button name="link" variant="ghost" tone="neutral" size="xs" />
    </div>
    <p
      v-if="description"
      class="sgds:text-subtle sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:max-w-[864px] sgds:mb-0"
    >{{ description }}</p>
  </div>
</template>
