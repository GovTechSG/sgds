<script setup lang="ts">
import type { UsageBehaviour } from "../../data/component-docs";
import CodeToken from "../ui/CodeToken.vue";
import { textParts } from "../../utils/text-parts";

defineProps<{
  items: UsageBehaviour[];
}>();
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <article
      v-for="example in items"
      :key="example.title"
      class="sgds:grid sgds:gap-layout-lg sgds:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] sgds:max-lg:grid-cols-1"
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
        <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ example.title }}</h3>
        <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          <template
            v-for="(part, index) in textParts(example.description)"
            :key="`${example.title}-${index}`"
          >
            <CodeToken v-if="part.isCode" :label="part.text" />
            <template v-else>{{ part.text }}</template>
          </template>
        </p>
      </div>

      <div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-288)] sgds:p-component-md sgds:max-lg:min-h-[var(--sgds-dimension-320)]">
        <div :class="example.surface === 'flush' ? 'sgds:bg-surface-default sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full' : 'sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full'">
          <div class="behaviour-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="example.markup"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<style>
/* Global selectors targeting slotted web component elements in v-html markup */
.behaviour-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.behaviour-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.behaviour-demo-markup sgds-alert-link {
  vertical-align: baseline;
}
</style>
