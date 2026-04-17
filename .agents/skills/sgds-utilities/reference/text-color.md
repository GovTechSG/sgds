# SGDS Text Color Utilities Skill

SGDS text color utilities use the `sgds:text-{token}` pattern. All colors are theme-aware (automatically switching between day/night) unless a `fixed` variant is used.

## Core Concept

All SGDS text utilities follow the `sgds:text-{variant}-{modifier}` pattern with the `sgds:` prefix.

> **Common mistake**: The word "color" never appears in the class name. Do NOT write `sgds:text-color-muted`, `sgds:text-color-default`, etc. The correct classes are `sgds:text-muted`, `sgds:text-default`, etc.

For definitions of suffix modifiers (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`, `inverse`, `surface`), see **[color-semantics](color-semantics.md)**.

## Quick Decision Guide

| What you need | Token to use |
|---|---|
| Body / paragraph text | `sgds:text-default`, `sgds:text-subtle`, `sgds:text-muted` |
| Inverted surface text | `sgds:text-inverse` |
| On a fixed dark background | `sgds:text-fixed-light` |
| On a fixed light background | `sgds:text-fixed-dark` |
| Headings | `sgds:text-heading-default` |
| Display / hero headline | `sgds:text-display-default` |
| Body copy | `sgds:text-body-default` or `sgds:text-body-subtle` |
| Form labels | `sgds:text-label-default` |
| Links | `sgds:text-link-default` / `sgds:text-link-emphasis` |
| Success / error / warning messages | `sgds:text-{success\|danger\|warning}-default` |
| Brand-colored text | `sgds:text-primary-default` or `sgds:text-accent-default` |

## Token Categories

Three categories cover all text color needs:

**1. Semantic base** — content hierarchy that adapts to theme (`text-default`, `text-subtle`, `text-muted`, `text-inverse`, `text-fixed-light`, `text-fixed-dark`)

**2. Semantic** — named semantic colors for specific meanings (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral` — each with `default`, `emphasis`, `fixed-light`, `fixed-dark`)

**3. Typography roles** — purpose-specific tokens for structured content (`display-default`, `heading-default`, `body-default`, `body-subtle`, `label-default`, `link-default`, `link-emphasis`)

## Reference Documentation

| Topic | File |
|---|---|
| Semantic base colors (default, subtle, muted, inverse, fixed) | [text-color/base.md](text-color/base.md) |
| Semantic colors (primary, success, danger, warning…) | [text-color/semantic.md](text-color/semantic.md) |
| Typography role tokens (display, heading, body, label, link) | [text-color/typography-roles.md](text-color/typography-roles.md) |

---

**For AI agents**: When no specific color is requested, start with typography role tokens (`heading-default`, `body-default`, `label-default`, `link-default`) for structured content. Use semantic base tokens for generic text hierarchy. Reserve semantic colors for state or brand meaning. Prefer SGDS components (`<sgds-*>`) when available.
