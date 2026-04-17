<script setup lang="ts">
import Section from "./Section.vue";

type Principle = {
  title: string;
  body?: string;
  description?: string;
};

const { principles, title = "Principles" } = defineProps<{
  title?: string;
  principles: Principle[];
}>();
</script>

<template>
  <Section :title="title">
    <div class="sgds:flex sgds:flex-col sgds:gap-text-xl">
      <div
        v-for="principle in principles"
        :key="principle.title"
        class="sgds:flex sgds:flex-col sgds:gap-text-xs"
      >
        <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
          {{ principle.title }}
        </h5>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          {{ principle.body ?? principle.description }}
        </p>
      </div>
    </div>
  </Section>
</template>
