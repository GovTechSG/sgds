# Cyan Border Colors Reference

**Meaning**: Visual variety, no semantic meaning
**Usage**: Non-semantic component/container borders for visual differentiation

## Design Semantics

- **Cyan = No semantic meaning**
- Used alongside purple for alternating color variety
- Good choice when primary and accent colors are similar — cyan provides contrast without conflicting semantics
- Applied to **containers and components only** — not page-level
- **Alternative when primary and accent are similar**: If your theme's primary and accent colors are similar, use cyan (or purple) to create visual differentiation

## Available Tokens

### `sgds:border-cyan-default`
**Standard cyan border.**

**When to use:**
- Non-semantic category borders alternating from purple
- Visual grouping without implied state

```html
<div class="sgds:border sgds:border-cyan-default">
  Cyan-bordered component
</div>
```

### `sgds:border-cyan-emphasis`
**Strong cyan border.**

**When to use:**
- High-visibility cyan components

```html
<div class="sgds:border-2 sgds:border-cyan-emphasis">
  Prominent cyan container
</div>
```

### `sgds:border-cyan-muted`
**Subtle cyan border.**

**When to use:**
- Soft cyan presence

```html
<div class="sgds:border sgds:border-cyan-muted">
  Subtle cyan border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-badge>` when available. Cyan border tokens are for creating custom components when library components don't meet your needs.

### Category Tag (alternating with purple)

```html
<span class="sgds:border sgds:border-purple-default">Category A</span>
<span class="sgds:border sgds:border-cyan-default">Category B</span>
```
