<script setup lang="ts">
import { computed } from "vue";
import ComponentDesignPage from "./ComponentDesignPage.vue";
import { getResourceDoc } from "../data/resource-docs";

const props = defineProps<{
  resourceKey: string;
}>();

const doc = computed(() => getResourceDoc(props.resourceKey));
</script>

<template>
  <ComponentDesignPage
    v-if="doc"
    :component-key="resourceKey"
    :doc-override="doc"
  />

  <div v-else>
    Resource documentation coming soon.
  </div>
</template>
