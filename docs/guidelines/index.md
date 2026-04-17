---
layout: page
title: Guidelines
description: Guidelines explain how to apply SGDS foundations, components, and patterns consistently across real product experiences.
---

<script setup>
import { guidelines } from "../.vitepress/data/guidelines";
import PortalImageCard from "../.vitepress/components/landing/PortalImageCard.vue";

const currentPhase = 99;
</script>

<div :class="$style.container" class="sgds-grid">
  <PortalImageCard
    v-for="guideline in guidelines"
    :key="guideline.id"
    :item="guideline"
    :currentPhase
    class="sgds-col-4"
  />
</div>

<style module>
  .container {
    row-gap: var(--sgds-spacer-10);
  }
</style>
