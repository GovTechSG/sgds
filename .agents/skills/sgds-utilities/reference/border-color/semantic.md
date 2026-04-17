# Border Color — Semantic Colors Reference

Semantic border color tokens carry meaning (brand, state, feedback). Use them when color communicates a specific intent, not just for structure.

All semantic border tokens apply at **component and container level only** — there is no page-level distinction for borders.

## Token Pattern

```
sgds:border-{variant}-{modifier}
```

**Variants:** `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

**Modifiers:** `default`, `emphasis`, `muted`

For modifier definitions see **[`color-semantics`](../color-semantics.md)**.

## Quick Reference

| Variant | Meaning | Tokens |
|---------|---------|--------|
| `primary` | Brand color | `border-primary-default/emphasis/muted` |
| `accent` | Informational, no urgency | `border-accent-default/emphasis/muted` |
| `success` | Positive feedback | `border-success-default/emphasis/muted` |
| `danger` | Error / destructive | `border-danger-default/emphasis/muted` |
| `warning` | Caution | `border-warning-default/emphasis/muted` |
| `purple` | Visual variety (no semantic meaning) | `border-purple-default/emphasis/muted` |
| `cyan` | Visual variety (no semantic meaning) | `border-cyan-default/emphasis/muted` |
| `neutral` | Equal importance, no differentiation | `border-neutral-default/emphasis/muted` |

---

## Variant Reference

> **Note**: Use library components like `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>`, `<sgds-input>` when available. These tokens are for custom components when library components don't meet your needs.

### `primary`
Brand color. Use for active/selected states, brand-accented components, and focus indicators.

```html
<div class="sgds:border-2 sgds:border-primary-default">Active or selected component</div>
<div class="sgds:border-2 sgds:border-primary-emphasis">Strong brand border</div>
<div class="sgds:border sgds:border-primary-muted">Soft brand presence</div>
```

**Common patterns:**
```html
<!-- Selected/active component -->
<div class="sgds:border-2 sgds:border-primary-default">Selected card</div>

<!-- Active tab indicator -->
<button class="sgds:border-b-2 sgds:border-primary-default">Active Tab</button>

<!-- Left-accent callout -->
<div class="sgds:border-l-4 sgds:border-primary-default">Important callout</div>
```

---

### `accent`
Informational, no urgency. Use for info badges, informational callouts, and link-adjacent components.

```html
<div class="sgds:border sgds:border-accent-default">Informational container</div>
<div class="sgds:border-2 sgds:border-accent-emphasis">Prominent info container</div>
<div class="sgds:border sgds:border-accent-muted">Subtle info border</div>
```

**Common patterns:**
```html
<!-- Info badge -->
<span class="sgds:border sgds:border-accent-default">Info</span>

<!-- Info callout -->
<div class="sgds:border-l-4 sgds:border-accent-default">Informational callout text</div>
```

---

### `success`
Positive feedback. Use for success alerts, valid input states, and completion indicators.

```html
<div class="sgds:border sgds:border-success-default">Success state container</div>
<div class="sgds:border-2 sgds:border-success-emphasis">Prominent success container</div>
<div class="sgds:border sgds:border-success-muted">Subtle success border</div>
```

**Common patterns:**
```html
<!-- Success alert -->
<div class="sgds:border-l-4 sgds:border-success-default">Your submission was successful.</div>

<!-- Success badge -->
<span class="sgds:border sgds:border-success-default">Completed</span>
```

---

### `danger`
Error or destructive state. Use for error alerts, invalid input states, and destructive action borders.

```html
<div class="sgds:border sgds:border-danger-default">Error state container</div>
<div class="sgds:border-2 sgds:border-danger-emphasis">Critical error container</div>
<div class="sgds:border sgds:border-danger-muted">Soft danger border</div>
```

**Common patterns:**
```html
<!-- Error alert -->
<div class="sgds:border-l-4 sgds:border-danger-default">Something went wrong. Please try again.</div>

<!-- Error badge -->
<span class="sgds:border sgds:border-danger-default">Failed</span>
```

---

### `warning`
Caution or attention needed. Use for warning alerts, fields requiring review, and non-critical issue indicators.

```html
<div class="sgds:border sgds:border-warning-default">Caution state container</div>
<div class="sgds:border-2 sgds:border-warning-emphasis">Prominent warning container</div>
<div class="sgds:border sgds:border-warning-muted">Soft warning border</div>
```

**Common patterns:**
```html
<!-- Warning alert -->
<div class="sgds:border-l-4 sgds:border-warning-default">Please review before proceeding.</div>

<!-- Warning badge -->
<span class="sgds:border sgds:border-warning-default">Pending</span>
```

---

### `purple`
Visual variety, no semantic meaning. Use when primary and accent are visually similar and you need a third distinguishable color.

```html
<div class="sgds:border sgds:border-purple-default">Purple-bordered component</div>
<div class="sgds:border-2 sgds:border-purple-emphasis">Prominent purple container</div>
<div class="sgds:border sgds:border-purple-muted">Subtle purple border</div>
```

**Common patterns:**
```html
<!-- Category tag -->
<span class="sgds:border sgds:border-purple-default">Category A</span>

<!-- Left-accent variety -->
<div class="sgds:border-l-4 sgds:border-purple-default">Featured section</div>
```

---

### `cyan`
Visual variety, no semantic meaning. Use alongside `purple` for alternating color differentiation.

```html
<div class="sgds:border sgds:border-cyan-default">Cyan-bordered component</div>
<div class="sgds:border-2 sgds:border-cyan-emphasis">Prominent cyan container</div>
<div class="sgds:border sgds:border-cyan-muted">Subtle cyan border</div>
```

**Common patterns:**
```html
<!-- Category tags alternating with purple -->
<span class="sgds:border sgds:border-purple-default">Category A</span>
<span class="sgds:border sgds:border-cyan-default">Category B</span>
```

---

### `neutral`
Equal importance, no differentiation. Use for tags, badges, and components where all items carry equal visual weight.

```html
<span class="sgds:border sgds:border-neutral-default">Tag</span>
<div class="sgds:border-2 sgds:border-neutral-emphasis">Prominent neutral container</div>
<div class="sgds:border sgds:border-neutral-muted">Very subtle neutral border</div>
```

**Common patterns:**
```html
<!-- Uniform tags (equal importance) -->
<span class="sgds:border sgds:border-neutral-default">Tag 1</span>
<span class="sgds:border sgds:border-neutral-default">Tag 2</span>
<span class="sgds:border sgds:border-neutral-default">Tag 3</span>
```

## See Also

- **[base.md](base.md)** — Base border color tokens (default, inverse, transparent, fixed)
- **[form.md](form.md)** — Form input border tokens
- **[border-width](../border-width.md)** — Border thickness utilities
- **[color-semantics](../color-semantics.md)** — Modifier definitions (default, emphasis, muted)
