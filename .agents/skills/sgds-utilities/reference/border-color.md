# SGDS Border Color Utilities Skill

Helps developers apply theme-aware semantic border colors to components and containers.

**Related**: [border-width](border-width.md) — Border thickness and side selection | [border-radius](border-radius.md) — Rounded corners

## Core Concept

All SGDS border color utilities use the `sgds:border-{semantic}-{modifier}` pattern with the `sgds:` prefix.

> **Common mistake**: The word "color" never appears in the class name. Do NOT write `sgds:border-color-default`, `sgds:border-color-primary`, etc. The correct classes are `sgds:border-default`, `sgds:border-primary-default`, etc.

**Border colors are theme-aware** — they automatically adapt when toggling between day/night themes (unless using `fixed` variants).

**Border colors are component and container level only** — unlike background tokens, there is no page-level distinction.

## Token Categories Overview

### Token Naming Pattern

- `sgds:border-{modifier}` — Foundational borders (no semantic color)
- `sgds:border-{color}-{modifier}` — Semantic color borders

**Examples:**
- `sgds:border-default` — Standard neutral border
- `sgds:border-primary-default` — Brand-colored border, default emphasis
- `sgds:border-danger-emphasis` — Error border, strong emphasis

### Foundational Borders

- `default` — Standard border (first choice for cards, containers)
- `emphasis` — Strong, high-visibility border
- `muted` — Subtle, de-emphasized border
- `fixed-light` — Never changes with theme (always light)
- `fixed-dark` — Never changes with theme (always dark)
- `translucent` — Semi-transparent border
- `transparent` — Invisible border (preserves box model spacing)

See **[`base.md`](border-color/base.md)** for detailed examples.

### Semantic Color Meanings

For full definitions of semantic categories (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`) and what each suffix modifier means (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`), see **[color-semantics](color-semantics.md)**.

Each semantic color has these variants:
- `{color}-default` — Standard emphasis
- `{color}-emphasis` — Strong, high-visibility
- `{color}-muted` — Subtle presence

See **[`semantic.md`](border-color/semantic.md)** for all eight color variants with detailed examples.

### Form Borders

Form-specific tokens for `<input>`, `<select>`, `<textarea>`, and `<form>` elements only.

See **[`form.md`](border-color/form.md)** for details.

## Quick Decision Guide

Use this guide to quickly choose the right border color token:

**Step 1: Choose Semantic Meaning**
- No special meaning, structural — `base` (use `sgds:border-default`)
- Brand / active / selected state → `primary`
- Informational / links → `accent`
- Positive feedback → `success`
- Negative feedback / error → `danger`
- Caution → `warning`
- Visual variety, no meaning → `purple`, `cyan`
- Equal importance, no meaning → `neutral`
- Form HTML elements → `form` tokens (see `form.md`)

**Step 2: Adjust Emphasis**
- Strong / high-visibility → `-emphasis`
- Standard → `-default`
- Subtle / reduced → `-muted`

**Step 3: Fixed or Theme-Aware?**
- Adapts to light/dark theme → use standard tokens
- Must always be light → `-fixed-light`
- Must always be dark → `-fixed-dark`

## Reference Documentation

For detailed guidance on specific border color categories, see the following reference files:

### Foundational Borders

**[`base.md`](border-color/base.md)** — Neutral structural borders
Covers: `border-default`, `border-emphasis`, `border-muted`, `border-fixed-light/dark`, `border-translucent`, `border-transparent`
Use for: Cards, dividers, layout separators, row borders, invisible borders for spacing

### Semantic Colors

**[`semantic.md`](border-color/semantic.md)** — All semantic color borders in one file
Covers: `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral` — each with `default`, `emphasis`, and `muted`/`subtle` variants
Use for: Any component or container needing brand, state, or feedback color on its border

### Form Specific

**[`form.md`](border-color/form.md)** — Form element borders
Covers: form default, disabled, and validation state tokens
Use for: `<input>`, `<select>`, `<textarea>`, `<form>` elements only

---

**For AI Agents**: When users ask about border colors, choose the right semantic category first, then consult the appropriate reference file for detailed examples. Key principles:

1. **All border colors** = component/container level (never page level)
2. **`border-default`** is the first choice for cards and generic containers
3. **`border-subtle`** for low-emphasis internal separators
4. **`border-transparent`** to maintain consistent sizing when toggling borders
5. **Semantic colors** should match the semantic of the parent component (e.g., `border-danger-default` on an error input)
6. **Muted** = reduce visual weight, **Emphasis** = increase prominence
7. **Form tokens** only for native HTML form elements
8. Always combine border color with a border-width class (`sgds:border`) — color alone produces no visible border
