<script setup lang="ts">
import { ref } from "vue";
import CodeToken from "./CodeToken.vue";

const props = withDefaults(
  defineProps<{
    label: string;
    copyLabel?: string;
  }>(),
  {
    copyLabel: "Copy token",
  },
);

const copied = ref(false);

const copyToken = async () => {
  await navigator.clipboard.writeText(props.label);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <div class="typography-page-template__utility-copy">
    <CodeToken :label="props.label" />
    <sgds-tooltip :content="copied ? 'Copied' : props.copyLabel" placement="top">
      <button
        :class="[
          'typography-page-template__utility-copy-button',
          copied ? 'sgds:text-success-default' : 'sgds:text-default'
        ]"
        :aria-label="copied ? 'Copied!' : props.copyLabel"
        @click="copyToken"
      >
        <sgds-icon :name="copied ? 'check' : 'copy'" size="md" />
      </button>
    </sgds-tooltip>
  </div>
</template>
