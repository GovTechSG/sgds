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
  <div class="sgds:bg-surface-default sgds:border sgds:border-default sgds:rounded-xl sgds:box-border sgds:overflow-hidden sgds:w-full sgds:max-w-full sgds:min-w-0">
    <div class="sgds:flex sgds:items-center sgds:bg-surface-default sgds:border-b sgds:border-default sgds:gap-md sgds:justify-between sgds:min-h-[2.75rem] sgds:min-w-0 sgds:py-0 sgds:px-[1rem]">
      <span class="sgds:text-default sgds:font-mono sgds:text-[0.75rem] sgds:font-regular sgds:tracking-[0.04em] sgds:leading-none sgds:uppercase sgds:select-none">{{ label }}</span>
      <sgds-button
        size="xs"
        variant="ghost"
        tone="neutral"
        :aria-label="copied ? 'Copied!' : 'Copy prompt'"
        @click="copyPrompt"
      >
        <sgds-icon :name="copied ? 'check' : 'files'" size="sm" slot="leftIcon"></sgds-icon>
        {{ copied ? "Copied" : "Copy" }}
      </sgds-button>
    </div>
    <div class="prompt-box-text sgds:text-default sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:min-w-0 sgds:w-full sgds:max-w-full sgds:whitespace-pre-wrap sgds:break-words sgds:[overflow-wrap:anywhere] sgds:py-[1rem] sgds:px-[1rem]" role="region" aria-label="Example prompt">
      <slot>
        {{ prompt }}
      </slot>
    </div>
  </div>
</template>

<style>
/* Text wrapping fallback for prompt content passed as props or markdown slots. */
.prompt-box-text {
  max-width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal;
  word-break: normal;
}

/* Global selector targeting slotted p elements inside prompt box — requires descendant combinator */
.prompt-box-text p {
  margin: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
</style>
