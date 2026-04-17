<script setup lang="ts">
import FoundationPrincipleTemplate from "./FoundationPrincipleTemplate.vue";
import SectionHeader from "./SectionHeader.vue";
import LayerStackDiagram from "./LayerStackDiagram.vue";
</script>

<template>
  <FoundationPrincipleTemplate>

    <!-- Global layer -->
    <SectionHeader
      title="Global layer"
      description="A global layer defines the stacking order across the entire application. It ensures that key UI elements such as navigation, modals, and system notifications appear above or below other components consistently, regardless of where they are in the DOM."
    />

    <!-- Local layer -->
    <SectionHeader
      title="Local layer"
      description="A local layer exists inside a parent container to manage stacking within that container, without affecting other parts of the page. It allows components like dropdowns, tooltips, or popovers to appear above their container but still stay inside the parent stacking context."
    />

    <!-- Stacking order infographic (Figma node 2630:4023) -->
    <LayerStackDiagram />

    <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">What the number in brackets means</h5>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">Some components in the diagram show a small number in brackets — like <strong>Toast (3)</strong> or <strong>Card (1)</strong>. That number is the component's position <em>inside</em> its layer. Add it to the layer's base value to get the final z-index.</p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">For example, <strong>Toast (3)</strong> lives in the floating layer (base value 200), so its actual z-index is <strong>200 + 3 = 203</strong>. <strong>Main nav (2)</strong> is also in the floating layer at <strong>202</strong> — so Toast sits just above the nav.</p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">Hover states work the same way: a Card sits at <strong>101</strong> by default, and jumps to <strong>105</strong> when hovered.</p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">The layer scale</h5>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default sgds:m-0 sgds:max-w-[54rem]">
          Layers are shown from highest to lowest z-index — the top of each stack is what your user sees first. Local layers always sit above global layers (except modal), so they form their own stack on top.
        </p>
      </div>
    </div>

  </FoundationPrincipleTemplate>
</template>
