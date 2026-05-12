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
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">What the number in brackets means</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">Some components in the diagram show a small number in brackets — like <strong>Toast (3)</strong> or <strong>Main nav (2)</strong>. That number is the component's position <em>inside</em> its layer. Add it to the layer's base value to get the final z-index.</p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">For example, <strong>Toast (3)</strong> lives in the overlay layer (base value 800), so its actual z-index is <strong>800 + 3 = 803</strong>. <strong>Main nav (2)</strong> lives in the floating layer (base value 400) at <strong>402</strong> — so Toast sits well above the nav.</p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">The layer scale</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">
          Layers are shown from highest to lowest z-index — the top of each stack is what your user sees first. The scale runs from base (0) through raised (100), floating (400), overlay (800), up to modal (1600).
        </p>
      </div>
    </div>

  </FoundationPrincipleTemplate>
</template>
