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
  <div :class="$style.promptCard">
    <div :class="$style.promptCardHeader">
      <span :class="$style.promptLabel" class="sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">{{ label }}</span>
      <button
        :class="[$style.promptCopyButton, copied && $style.promptCopyButtonCopied]"
        :aria-label="copied ? 'Copied!' : 'Copy prompt'"
        @click="copyPrompt"
      >
        <sgds-icon :name="copied ? 'check' : 'copy'" size="md"></sgds-icon>
      </button>
    </div>
    <div :class="$style.promptText" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
      <slot>
        {{ prompt }}
      </slot>
    </div>
  </div>
</template>

<style module>
.promptCard {
  background: var(--sgds-surface-raised);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  max-width: 100%;
  min-width: 0;
  padding: var(--sgds-padding-md) var(--sgds-component-padding-xs);
  width: 100%;
}

.promptCardHeader {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-md);
  justify-content: space-between;
  min-width: 0;
}

.promptLabel {
  color: var(--sgds-label-color-subtle);
  text-transform: uppercase;
}

.promptCopyButton {
  align-items: center;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--sgds-color-default);
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  padding: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.promptCopyButton:hover {
  background-color: var(--sgds-border-color-muted);
}

.promptCopyButtonCopied {
  color: var(--sgds-success-color-default);
}

.promptText {
  color: var(--sgds-body-color-default);
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal;
  width: 100%;
}

.promptText :global(p) {
  margin: 0;
}
</style>
