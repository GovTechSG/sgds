---
layout: docs
title: Token architecture
description: Understand how SGDS design tokens move from primitive values to semantic, responsive, and component usage.
---

<script setup>
import TokenArchitectureDiagram from "../.vitepress/components/foundations/TokenArchitectureDiagram.vue";
</script>

SGDS tokens work best as a layered system. The source of truth is the CSS token set distributed with `@govtechsg/sgds-web-component`.

<TokenArchitectureDiagram />

## Primitive layer

Primitive tokens live mainly in `themes/root.css`. They define base SGDS scales for palettes, typography, spacing, dimensions, radius, width, opacity, motion, z-index, and elevation.

Examples include `--sgds-product-primary-600`, `--sgds-gray-1000`, `--sgds-spacer-5`, `--sgds-font-size-16`, `--sgds-border-radius-md`, and `--sgds-motion-duration-standard`.

## Semantic layer

Semantic tokens live mainly in `themes/day.css` and `themes/night.css`. They map primitive values to interface meaning.

Use this layer first when the UI role is clear. Semantic tokens communicate intent and can change across themes.

Examples include `--sgds-bg-default`, `--sgds-surface-raised`, `--sgds-color-subtle`, `--sgds-border-color-muted`, `--sgds-primary-surface-default`, `--sgds-danger-color-default`, and `--sgds-form-surface-default`.

## Responsive layer

Responsive tokens live in `themes/responsive.css`. They map typography and spacing aliases to different primitive values at SGDS breakpoints.

For example, `--sgds-font-size-heading-md`, `--sgds-line-height-md`, `--sgds-layout-gap-md`, `--sgds-component-padding-md`, and `--sgds-container-width` change across mobile, tablet, and desktop contexts.

## Component usage layer

SGDS web components consume shared tokens internally. Some foundations also define component-oriented aliases.

Examples include `--sgds-form-height-md`, `--sgds-form-width-md`, `--sgds-form-icon-size-md`, `--sgds-form-padding-x`, and `--sgds-form-gap-md`.

Where a component exposes scoped styling hooks, the component page documents the supported CSS custom properties or `::part` selectors. For example, the theming guide shows `--sidenav-theme-color` as a component-specific custom property for `sgds-sidenav`.

## Recommended usage path

Start with semantic tokens when the UI role is clear. Use responsive tokens for typography, layout spacing, component spacing, and container sizing.

Use primitive tokens when documenting the system, building a new semantic alias, or working with a low-level foundation scale. Use component hooks only when the component documentation exposes them.

## What to avoid

Do not use raw values directly when a token already exists. Do not choose a primitive colour just because it visually matches a design. Do not override component internals unless the component exposes a supported token or part. If a visual requirement cannot be expressed with the current token set, raise it as a token or utility gap.
