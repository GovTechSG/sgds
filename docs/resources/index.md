---
layout: page
title: Resources
description: Resources provide supporting materials, references, and downloadable assets to help teams design and build with SGDS effectively.
---

<script setup>
import { resources } from "../.vitepress/data/resources";
import PortalImageCard from "../.vitepress/components/landing/PortalImageCard.vue";

const currentPhase = 99;
</script>

<div :class="$style.container" class="sgds-grid">
  <PortalImageCard
    v-for="(resource, index) in resources"
    :key="resource.id"
    :item="resource"
    :currentPhase
    :fetchpriority="index === 0 ? 'high' : undefined"
    class="sgds-col-4"
  />
</div>

<style module>
  .container {
    row-gap: var(--sgds-spacer-10);
  }
</style>
