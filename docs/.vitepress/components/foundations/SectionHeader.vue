<script setup lang="ts">
import { computed } from "vue";

export type Section = {
  title: string;
  description?: string;
  headingLevel?: "h2" | "h3" | "h4";
  headerGap?: string;
}
const { title, description, headingLevel, headerGap = "sgds:gap-text-md" } = defineProps<Section>();

const sectionId = computed(() =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, ""),
);

const headingClass = computed(() =>
  headingLevel === "h4"
    ? "sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:mb-0"
    : headingLevel === "h3"
    ? "sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:mb-0"
    : "sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:mb-0",
);
</script>

<template>
  <div :class="['sgds:flex sgds:flex-col', headerGap]">
    <div class="sgds:flex sgds:gap-2 sgds:items-center">
      <component
        :is="headingLevel ?? 'h2'"
        :id="sectionId"
        :class="headingClass"
      >
        {{ title }}
      </component>
      <slot name="title-suffix"></slot>
      <a
        :href="`#${sectionId}`"
        class="sgds:inline-flex sgds:h-8 sgds:w-8 sgds:items-center sgds:justify-center sgds:rounded-sm sgds:text-subtle sgds:no-underline sgds:hover:text-default sgds:focus:text-default sgds:focus-visible:text-default sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
        :aria-label="`Link to ${title}`"
      >
        <sgds-icon name="link" size="sm" />
      </a>
    </div>
    <p
      v-if="description"
      class="sgds:text-subtle sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:max-w-[864px] sgds:mb-0"
    >{{ description }}</p>
  </div>
</template>
