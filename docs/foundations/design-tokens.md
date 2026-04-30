---
layout: docs
title: Design tokens
description: Learn how SGDS design tokens store shared design decisions across colour, typography, spacing, shape, layer, motion, and responsive layout.
---

Design tokens are named values that store SGDS design decisions as reusable system data. They help teams avoid hard-coding values such as `#6B4FEB`, `16px`, or `300ms` into product interfaces.

SGDS exposes these tokens as CSS custom properties that teams can use across design and code.

SGDS tokens are defined in the theme files from `@govtechsg/sgds-web-component`. `root.css` contains the primitive scales and shared foundation aliases. `day.css` and `night.css` map those scales to semantic roles for light and dark themes. `responsive.css` remaps selected typography, spacing, and container tokens at SGDS breakpoints.

## What tokens cover

SGDS token families include colour, typography, spacing, border width, border radius, icon size, dimensions, breakpoints, opacity, motion, z-index, elevation, text width, container width, form sizing, and layout measurements.

Use the detailed foundation pages when you need a specific inventory, such as Colour tokens, Typography tokens, Spacing tokens, Border tokens, Layer tokens, Icon tokens, or Elevation tokens.

## Why SGDS uses tokens

Tokens give SGDS a shared source of truth for repeated decisions. They help teams apply the same visual language across government services.

Tokens also help SGDS switch between day and night themes, keep responsive typography and spacing consistent, and update system-wide decisions without chasing hard-coded values through every component.

## How to use this section

Read Token architecture to understand how SGDS moves from primitive values to semantic and responsive usage. Read Token naming to learn how token names communicate family, role, scale, and state. Read Token governance when you need to add, modify, deprecate, or remove a token.

For day-to-day implementation, choose the token by meaning first. For example, use `--sgds-primary-surface-default` when you need a primary surface, not because it currently resolves to a particular purple value. If no meaningful token exists, treat that as a token gap instead of adding a one-off value.
