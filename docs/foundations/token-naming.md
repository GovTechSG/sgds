---
layout: docs
title: Token naming
description: How SGDS names design tokens — the four-part pattern, the principles behind it, and worked examples for each token type.
---

<script setup>
import DesignTokenStructureChart from "../.vitepress/components/foundations/DesignTokenStructureChart.vue";
import DesignTokenExample from "../.vitepress/components/foundations/DesignTokenExample.vue";
import PrimitiveTokenAnatomy from "../.vitepress/components/foundations/PrimitiveTokenAnatomy.vue";
import SemanticTokenAnatomy from "../.vitepress/components/foundations/SemanticTokenAnatomy.vue";
import ComponentTokenAnatomy from "../.vitepress/components/foundations/ComponentTokenAnatomy.vue";
import TokenNameLegend from "../.vitepress/components/foundations/TokenNameLegend.vue";
import TokenNameExample from "../.vitepress/components/foundations/TokenNameExample.vue";
import TokenNamingPositionMap from "../.vitepress/components/foundations/TokenNamingPositionMap.vue";
</script>

## Naming convention

SGDS tokens are named in four ordered parts: **namespace**, **object**, **base**, and **modifier**. Each part narrows the meaning, so a token name reads from the broadest system context down to a specific design attribute. The legend below names each position; the worked example shows how the parts combine for a real token.

<div class="sgds:flex sgds:flex-col sgds:gap-layout-sm sgds:mb-[var(--sgds-layout-gap-lg)]">
  <TokenNamingPositionMap />
  <TokenNameLegend />
  <div class="sgds:h-[var(--sgds-layout-gap-xs)]" aria-hidden="true"></div>
  <TokenNameExample />
</div>

### Anatomy by token type

Each token type uses the four positions slightly differently. The diagrams below show how primitive, semantic, and component tokens combine namespace, object, base, and modifier.

<div class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:mb-[var(--sgds-layout-gap-lg)]">
  <PrimitiveTokenAnatomy />
  <SemanticTokenAnatomy />
  <ComponentTokenAnatomy />
</div>

## Naming principles

<div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:mb-[var(--sgds-layout-gap-lg)] sgds:[&>p]:!my-0 sgds:[&>ul]:!my-0">

We follow five principles when naming SGDS tokens. They explain the choices behind every name shown above.

- **Short:** keep names compact enough to scan in code, design tools, and documentation.
- **Meaningful:** name the decision, not the current value. Prefer role-based words like <CodeToken label="danger" />, <CodeToken label="warning" />, <CodeToken label="success" />, <CodeToken label="surface" />, <CodeToken label="border-color" />, <CodeToken label="heading" />, and <CodeToken label="body" />.
- **Scalable:** choose names that can support more products, themes, states, and component variants over time.
- **Flexible:** keep shared tokens broad enough for reuse. Add context, such as <CodeToken label="form" /> or <CodeToken label="btn" />, only when the decision is genuinely scoped.
- **Clear:** make each segment easy to understand without resolving the token value.

</div>

## Full naming structure

For the full picture, the chart below maps every position, segment, and modifier the system can produce. Use it as the reference whenever a new token name needs to slot into the system.

<div class="sgds:mb-[var(--sgds-layout-gap-lg)]">
  <DesignTokenStructureChart />
</div>

## Worked example

The button-with-hover-state example below traces every position through a real token name, from primitive to component.

<div class="sgds:mb-[var(--sgds-layout-gap-lg)]">
  <DesignTokenExample />
</div>
