<script setup lang="ts">
import { computed } from "vue";
import ComponentDesignPage from "./ComponentDesignPage.vue";
import { getPatternDoc } from "../../data/pattern-docs";
import { getGuidelineDoc } from "../../data/guideline-docs";
import { getResourceDoc } from "../../data/resource-docs";

const props = defineProps<{
  docType: "pattern" | "guideline" | "resource";
  docKey: string;
}>();

const doc = computed(() => {
  if (props.docType === "pattern") return getPatternDoc(props.docKey);
  if (props.docType === "guideline") return getGuidelineDoc(props.docKey);
  return getResourceDoc(props.docKey);
});

const fallbackLabel = computed(() => {
  if (props.docType === "pattern") return "Pattern documentation coming soon.";
  if (props.docType === "guideline") return "Guideline documentation coming soon.";
  return "Resource documentation coming soon.";
});
</script>

<template>
  <ComponentDesignPage
    v-if="doc"
    :component-key="docKey"
    :doc-override="doc"
  />
  <div v-else>{{ fallbackLabel }}</div>
</template>
