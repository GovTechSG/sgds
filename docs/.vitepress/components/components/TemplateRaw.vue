<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { pageTemplateMarkupByKey } from "../../data/template-markup";

const props = defineProps<{ templateKey: string }>();

const markup = computed(() => pageTemplateMarkupByKey[props.templateKey] ?? "");
const rootRef = ref<HTMLElement | null>(null);

const executeTemplateScripts = async () => {
  await nextTick();
  const root = rootRef.value;
  if (!root) return;

  root.querySelectorAll("script").forEach((oldScript) => {
    const script = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attribute) => {
      script.setAttribute(attribute.name, attribute.value);
    });
    script.textContent = oldScript.textContent;
    oldScript.replaceWith(script);
  });
};

onMounted(executeTemplateScripts);
watch(() => props.templateKey, executeTemplateScripts);
</script>

<template>
  <div ref="rootRef" v-html="markup"></div>
</template>
