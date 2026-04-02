<script setup lang="ts">
import { computed } from "vue";
import ComponentDesignPage from "./ComponentDesignPage.vue";
import { getGuidelineDoc } from "../data/guideline-docs";

const props = defineProps<{
  guidelineKey: string;
}>();

const doc = computed(() => getGuidelineDoc(props.guidelineKey));
</script>

<template>
  <ComponentDesignPage
    v-if="doc"
    :component-key="guidelineKey"
    :doc-override="doc"
  />

  <div v-else>
    Guideline documentation coming soon.
  </div>
</template>
