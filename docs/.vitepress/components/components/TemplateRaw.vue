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
  <div ref="rootRef" class="template-raw-root" v-html="markup"></div>
</template>

<style>
/* Theme treatment for the stock SGDS placeholder image inside v-html previews.
   The source image remains the original light asset; dark mode mutes it into a
   near-black placeholder so the preview keeps the same composition. */
.sgds-night-theme .template-raw-root img[src*="placeholder-sgds.png"] {
  filter: invert(1) brightness(0.9) contrast(1.05);
}
</style>
