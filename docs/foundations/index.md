---
layout: page
title: Foundations
description: Foundations are the core building blocks of a design system, covering essentials like color, typography, spacing, and tokens to ensure consistency and scalability across products.
---

<script setup>
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import { foundations } from '../.vitepress/data/foundations';
import PortalImageCard from "../.vitepress/components/PortalImageCard.vue";

const currentPhase = 1
</script>

<div :class="$style.container" class="sgds-grid">
  <PortalImageCard
    v-for="foundation in foundations"
    :key="foundation.id"
    :item="foundation"
    :currentPhase
    class="sgds-col-4"
  >
  </PortalImageCard>
</div>

<style module>
  .container {
    row-gap: var(--sgds-spacer-10);
  }
</style>
