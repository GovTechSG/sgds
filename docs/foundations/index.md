---
layout: page
title: Foundations
description: Foundations are the core building blocks of a design system, covering essentials like colour, typography, spacing, and tokens to ensure consistency and scalability across products.
---

<script setup>
import { foundations } from '../.vitepress/data/foundations';
import PortalImageCard from "../.vitepress/components/landing/PortalImageCard.vue";

const currentPhase = 99
</script>

<div class="sgds-grid sgds:gap-y-10">
  <PortalImageCard
    v-for="(foundation, index) in foundations"
    :key="foundation.id"
    :item="foundation"
    :currentPhase
    :fetchpriority="index === 0 ? 'high' : undefined"
    class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-4"
  >
  </PortalImageCard>
</div>
