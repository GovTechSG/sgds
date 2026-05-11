<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{
  prompt: string;
  label?: string;
}>(), {
  label: "Example prompt",
});

const copied = ref(false);

const copyPrompt = async () => {
  await navigator.clipboard.writeText(props.prompt);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <div class="sgds:box-border sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)] sgds:min-w-0 sgds:max-w-full sgds:py-[var(--sgds-padding-md)] sgds:px-[var(--sgds-component-padding-xs)] sgds:w-full">
    <div class="sgds:flex sgds:items-center sgds:justify-between sgds:gap-[var(--sgds-gap-md)] sgds:min-w-0">
      <span class="sgds:text-[var(--sgds-label-color-subtle)] sgds:uppercase sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">{{ label }}</span>
      <button
        :class="['sgds:flex sgds:items-center sgds:justify-center sgds:bg-transparent sgds:border-0 sgds:rounded sgds:cursor-pointer sgds:flex-none sgds:p-1 sgds:transition sgds:duration-200 sgds:ease-in-out sgds:hover:bg-muted', copied ? 'sgds:text-success-default' : 'sgds:text-default']"
        :aria-label="copied ? 'Copied!' : 'Copy prompt'"
        @click="copyPrompt"
      >
        <sgds-icon :name="copied ? 'check' : 'copy'" size="md"></sgds-icon>
      </button>
    </div>
    <div class="prompt-box-text sgds:text-default sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:min-w-0 sgds:break-words sgds:w-full">
      <slot>
        {{ prompt }}
      </slot>
    </div>
  </div>
</template>

<style>
/* Global selector targeting slotted p elements inside prompt box — requires descendant combinator */
.prompt-box-text p {
  margin: 0;
}
</style>
