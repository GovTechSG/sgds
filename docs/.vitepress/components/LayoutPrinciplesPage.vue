<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";

const principles = [
  {
    title: "Predictable",
    body: "Use intuitive and predictable layouts with consistent UI regions and spatial organisation.",
  },
  {
    title: "Consistent",
    body: "Maintaining a consistent visual rhythm provides a consistent user experience. It also drives consistent scalability.",
  },
  {
    title: "Hierarchical",
    body: "Giving elements a visual hierarchy.",
  },
];
</script>

<template>
  <FoundationPrincipleTemplate>
    <FoundationPrinciplesList :principles="principles" />
  </FoundationPrincipleTemplate>
</template>
