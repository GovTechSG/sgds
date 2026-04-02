---
layout: docs
title: Using colour
description: Colour should be used purposefully to convey meaning and support usability. Consider contrast ratios, hierarchy, and visual balance when applying colour. Avoid using colour alone to communicate information—pair it with text, icons, or patterns.
---

<script setup>
import Section from "../../.vitepress/components/Section.vue";
</script>

<div :class="$style.sections">
  <Section
    title="Colour pairing"
    description="Our core colours are our 3 GovTech brand colours. We have 10 colour families with 9 shades in each family, totalling 100 colours in our full palette. We use subsets of this palette for data visualisation and illustration."
  >
  </Section>

  <Section
    title="Semantic colour"
    description="Semantic colours are used to reflect status. Typically, red represents negative; yellow represents a warning, and green represents positive."
  >
  </Section>

  <Section
    title="Colour roles"
    description="SGDS’s grays follow a perceptually curved progression of lightness. The outcome is a progression of gray colour values that are optimal for SGDS’s usage of gray. Each lightness value was converted into a target contrast ratio, which follow a polynomial curve."
  >
  </Section>

  <Section
    title="Modes"
    description="Our core colours are our 3 GovTech brand colours. We have 10 colour families with 9 shades in each family, totalling 100 colours in our full palette. We use subsets of this palette for data visualisation and illustration."
  >
  </Section>

  <Section title="Resources">
  </Section>
</div>

<style module>
  .sections {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-layout-gap-lg);
  }
</style>
