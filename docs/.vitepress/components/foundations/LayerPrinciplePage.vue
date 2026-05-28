<script setup lang="ts">
import FoundationPrincipleTemplate from "./FoundationPrincipleTemplate.vue";
import FoundationPrinciplesList from "./FoundationPrinciplesList.vue";
import LayerStackDiagram from "./LayerStackDiagram.vue";

const principles = [
  {
    title: "Global layer",
    description:
      "Use global layers to keep navigation, modals, and notifications in a consistent order.",
  },
  {
    title: "Local layer",
    description:
      "Use local layers so dropdowns, tooltips, and popovers stay within their parent context.",
  },
  {
    title: "Stacking order",
    description:
      "Show layers from highest to lowest z-index. Users see the top of the stack first.",
  },
] as const;
</script>

<template>
  <FoundationPrincipleTemplate>
    <FoundationPrinciplesList :principles="principles" />

    <!-- Stacking order infographic (Figma node 2630:4023) -->
    <LayerStackDiagram />

    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">The layer scale</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">
          Layers are shown from highest to lowest z-index — the top of each stack is what your user sees first. The scale runs from base (0) through raised (100), floating (400), overlay (800), up to modal (1600).
        </p>
      </div>
    </div>

  </FoundationPrincipleTemplate>
</template>
