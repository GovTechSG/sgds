<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";

const principles = [
  {
    title: "Predictable",
    body: "Use familiar regions and clear spatial organisation so users know where to look.",
  },
  {
    title: "Consistent",
    body: "Keep a steady visual rhythm so layouts feel consistent and easier to scale.",
  },
  {
    title: "Hierarchical",
    body: "Give elements a clear visual order so users can spot what matters first.",
  },
];

</script>

<template>
  <FoundationPrincipleTemplate>
    <FoundationPrinciplesList :principles="principles" />

  </FoundationPrincipleTemplate>
</template>
