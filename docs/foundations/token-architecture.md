---
layout: docs
title: Token architecture
description: How SGDS design tokens are organised — token types, categories, scales, and the architecture that connects them.
---

<script setup>
import TokenArchitectureDiagram from "../.vitepress/components/foundations/TokenArchitectureDiagram.vue";
import TokenChangeImpactTable from "../.vitepress/components/foundations/TokenChangeImpactTable.vue";
import TokenCategoriesTable from "../.vitepress/components/foundations/TokenCategoriesTable.vue";
import TokenScalesTable from "../.vitepress/components/foundations/TokenScalesTable.vue";
</script>

## Token types

<div class="sgds:mb-layout-lg sgds:flex sgds:flex-col sgds:gap-text-md">
  <p class="sgds:m-0">SGDS organises tokens in a layered architecture. Each layer references the layer below it, so a single change cascades through the system. SGDS defines five token types. Each type has a different scope and a different rule for when to use it.</p>
  <TokenArchitectureDiagram />
  <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-md sgds:pl-[var(--sgds-padding-lg)]">
    <li class="sgds:m-0"><span class="sgds:font-semibold">Raw values</span> refer to the actual, hard-coded values, such as <CodeToken label="#5A42C0" /> for colours or <CodeToken label="16px" /> for spacing, used within design tokens.</li>
    <li class="sgds:m-0"><span class="sgds:font-semibold">Primitive tokens</span>, also called Global or Core tokens, are the foundational tokens that define the core values of the design system. They represent the most fundamental design decisions, such as base colours, typography, spacing, and sizing.</li>
    <li class="sgds:m-0"><span class="sgds:font-semibold">Simplified semantic tokens</span>, also called Alias tokens, provide a more general abstraction of the design system. They are broader and easier to use across various components and contexts. The focus is on simplifying how you access design decisions, particularly for common use cases.</li>
    <li class="sgds:m-0"><span class="sgds:font-semibold">Granular semantic tokens</span>, also called Alias tokens, are more specific and tailored for particular components, groups, or contexts, such as forms, actions, and feedback. Granular tokens allow for more detailed control over styling decisions and can vary depending on the specific requirements of different design elements.</li>
    <li class="sgds:m-0"><span class="sgds:font-semibold">Component-specific tokens</span> are used to customise or refine design elements for individual components. They reference global or alias tokens and apply them to specific components like buttons, cards, or modals.</li>
  </ul>
</div>

### Token categories

<div class="sgds:mb-layout-lg sgds:flex sgds:flex-col sgds:gap-text-md">
  <p class="sgds:m-0">SGDS tokens group into the following categories, each covering one design dimension.</p>
  <p class="sgds:m-0">Some token values adapt across SGDS breakpoints. Typography, line-height, layout gap, component padding, and container width tokens keep the same name, but resolve to different primitive values on mobile, tablet, and desktop. These mappings live in <CodeToken label="themes/responsive.css" />.</p>
  <p class="sgds:m-0">Responsive remapping is not a separate token type. The token name stays the same; only the resolved value changes.</p>
  <TokenCategoriesTable />
</div>

### Token scales

<div class="sgds:mb-layout-lg sgds:flex sgds:flex-col sgds:gap-text-md">
  <p class="sgds:m-0">SGDS uses several scale patterns. Each pattern reflects how the values inside a category relate to each other.</p>
  <TokenScalesTable />
</div>

## Token change impact

<div class="sgds:flex sgds:flex-col sgds:gap-text-md">
  <p class="sgds:m-0">Start with simplified semantic tokens when the UI role is clear. Reach for granular semantic tokens when a context like forms, actions, or feedback needs a scoped variant. Use primitive tokens when documenting the system, defining a new semantic alias, or working with a low-level foundation scale. Use component hooks only when the component documentation exposes them.</p>
  <p class="sgds:m-0">Token changes affect different parts of the system depending on the token type and how widely it is used. Use this guide before adding, modifying, or removing tokens.</p>
  <TokenChangeImpactTable />
</div>
