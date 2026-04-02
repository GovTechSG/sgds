<script setup lang="ts">
import { computed } from "vue";
import ComponentDesignPage from "./ComponentDesignPage.vue";
import { getPatternDoc } from "../data/pattern-docs";

const props = defineProps<{
  patternKey: string;
}>();

const doc = computed(() => getPatternDoc(props.patternKey));
</script>

<template>
  <ComponentDesignPage
    v-if="doc"
    :component-key="patternKey"
    :doc-override="doc"
  />

  <div v-else>
    Pattern documentation coming soon.
  </div>
</template>
