---
layout: docs
title: Token naming
description: Learn the SGDS naming principles, naming structure, and common anti-patterns for design tokens.
---

Good token names make SGDS easier to read, scale, and maintain. SGDS tokens are CSS custom properties.

Token names use the `--sgds-` namespace followed by the token family, role, scale, state, or component context.

## Naming structure

Every public SGDS token starts with `--sgds-`. After that, the name narrows from broad family or context to specific role.

For primitive tokens, the name usually identifies a foundation scale and a step:

```css
--sgds-purple-600
--sgds-spacer-5
--sgds-font-size-16
--sgds-border-radius-md
```

For semantic colour tokens, the name usually identifies role, property, and emphasis:

```css
--sgds-primary-surface-default
--sgds-danger-border-color-muted
--sgds-body-color-subtle
--sgds-bg-translucent-subtle
```

For responsive spacing and typography tokens, the name identifies the usage context:

```css
--sgds-font-size-heading-md
--sgds-line-height-xs
--sgds-layout-gap-md
--sgds-component-padding-lg
```

For form-oriented aliases, the name keeps the form context visible:

```css
--sgds-form-height-md
--sgds-form-icon-size-lg
--sgds-form-danger-border-color-default
```

## Read the name from general to specific

Read names from left to right. `--sgds-primary-surface-default` means SGDS namespace, primary role, surface property, default emphasis. `--sgds-form-danger-border-color-default` means SGDS namespace, form context, danger state, border colour property, default emphasis.

## Naming principles

Use names that describe meaning instead of literal appearance. Prefer `danger`, `warning`, `success`, `surface`, `border-color`, `heading`, and `body`.

Avoid names that only describe a visual value such as red, yellow, or large. Keep names compact enough to scan. Make them specific enough that teams can choose the right token without looking up the resolved value.

Use scale names consistently. SGDS uses size names such as `xs`, `sm`, `md`, `lg`, and `xl`, numeric steps for primitive scales such as `--sgds-spacer-5`, and emphasis names such as `default`, `muted`, `subtle`, `emphasis`, `inverse`, and `fixed`.

## Anti-patterns

Avoid naming tokens after raw values, one-off components, or temporary visual decisions. A token named for the current colour value will become misleading when theming changes. A token named for one page or one component should only exist if the decision is genuinely scoped to that context.

Do not create multiple names for the same decision. If a shared semantic token already fits, reuse it. If a component requires a scoped token, document why the shared token is not enough and where the new token is supported.
