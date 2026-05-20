<script setup lang="ts">
import Section from "./Section.vue";

type Rule = {
  title: string;
  body?: string;
  description?: string;
  demo?: string;
};

const { rules, title = "Rules and guidelines" } = defineProps<{
  title?: string;
  rules: Rule[];
}>();
</script>

<template>
  <Section :title="title" gap="sgds:gap-layout-md">
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <article
        v-for="rule in rules"
        :key="rule.title"
        class="sgds:grid sgds:grid-cols-1 sgds:items-stretch sgds:gap-layout-md sgds:max-md:grid-cols-1"
      >
        <div class="sgds:flex sgds:min-w-0 sgds:flex-col sgds:gap-text-xs sgds:max-w-text">
          <h4 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            {{ rule.title }}
          </h4>
          <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            {{ rule.body ?? rule.description }}
          </p>
        </div>

        <!-- <div class="sgds:min-w-0">
          <div class="sgds:flex sgds:min-h-[14rem] sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-component-md sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-surface-raised sgds:p-layout-md">
            <p class="sgds:m-0 sgds:text-center sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              Placeholder illustration. Replace with final artwork.
            </p>
          </div>
        </div> -->
      </article>
    </div>
  </Section>
</template>
