---
layout: docs
title: Token governance
description: Understand the impact, risks, and decision criteria for adding, modifying, or removing SGDS design tokens.
---

Changing a token can have wide system impact. SGDS tokens are consumed by documentation, utility classes, web components, themes, and downstream government services.

Treat token changes as design-system changes, not isolated CSS edits.

## Adding tokens

Add a token only when there is a repeatable design decision that cannot be expressed with the current system. Before adding one, check the relevant foundation page, `themes/root.css`, `themes/day.css`, `themes/night.css`, `themes/responsive.css`, and existing SGDS utilities.

When adding a token, document the token name, value or alias, intended use, related utility class if one exists, and the foundation page where teams can learn how to use it.

## Modifying tokens

Modifying a primitive token can affect every semantic token that references it. Modifying a semantic token can change many components and utilities at once.

Review visual impact in day and night themes. Check contrast when colour changes are involved. Verify affected docs pages and component examples.

Responsive tokens need extra care because a change may only appear at tablet or desktop breakpoints. Test mobile, tablet, and desktop widths when changing typography, spacing, or container tokens.

## Removing tokens

Remove a token only after confirming that it is unused or replaced. If teams may already depend on it, deprecate it first and provide a replacement path. The existing `--sgds-font-size-0` to `--sgds-font-size-9` comments in `root.css` are an example of how older tokens can remain available while a newer naming model is documented.

## Practical rule

The more foundational the token, the more carefully it needs to change. Palette, spacer, dimension, typography, z-index, motion, and elevation primitives can ripple into semantic tokens, utilities, and component examples.

Semantic colour changes can ripple across day mode, night mode, accessibility, and product branding.

## Recommended process

When adding a token, identify the gap, check whether an existing token already solves it, propose the name and alias, review the design intent, implement it in the correct theme file, add or update utility mappings where needed, and document it.

When modifying a token, audit usage, explain the reason, review day and night values, check accessibility impact, verify responsive behaviour if relevant, and run the docs build.

When removing a token, confirm redundancy, mark it deprecated, provide migration guidance, update documentation and examples, and remove it only after dependencies are addressed.
