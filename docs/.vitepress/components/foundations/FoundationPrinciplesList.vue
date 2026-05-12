<script setup lang="ts">
import Section from "./Section.vue";

type Principle = {
  title: string;
  body?: string;
  description?: string;
};

const { principles, title = "Principles", headingLevel, layout = "grid" } = defineProps<{
  title?: string;
  headingLevel?: "h2" | "h3" | "h4";
  layout?: "grid" | "stack";
  principles: Principle[];
}>();
</script>

<template>
  <Section :title="title" :heading-level="headingLevel" gap="sgds:gap-[var(--sgds-gap-xl)]">
    <div :class="layout === 'stack' ? 'sgds:flex sgds:flex-col sgds:gap-text-xl' : 'sgds-grid'">
      <article
        v-for="principle in principles"
        :key="principle.title"
        :class="[
          'sgds:flex sgds:flex-col sgds:gap-text-xs sgds:min-w-0 sgds:p-0',
          layout === 'grid' ? 'sgds-col-4 sgds-col-lg-4' : '',
        ]"
      >
        <h4 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
          {{ principle.title }}
        </h4>
        <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          {{ principle.body ?? principle.description }}
        </p>
      </article>
    </div>
  </Section>
</template>
