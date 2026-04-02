# Purple Border Colors Reference

**Meaning**: Visual variety, no semantic meaning
**Usage**: Non-semantic component/container borders for visual differentiation

## Design Semantics

- **Purple = No semantic meaning**
- Used purely for visual variety and differentiation
- Good choice when primary and accent colors are similar — purple provides contrast without conflicting semantics
- Applied to **containers and components only** — not page-level
- **Alternative when primary and accent are similar**: If your theme's primary and accent colors are similar, use purple to create visual differentiation

## Available Tokens

### `sgds:border-purple-default`
**Standard purple border.**

**When to use:**
- Non-semantic category borders
- Visual grouping without implied state

```html
<div class="sgds:border sgds:border-purple-default">
  Purple-bordered component
</div>
```

### `sgds:border-purple-emphasis`
**Strong purple border.**

**When to use:**
- High-visibility purple components

```html
<div class="sgds:border-2 sgds:border-purple-emphasis">
  Prominent purple container
</div>
```

### `sgds:border-purple-muted`
**Subtle purple border.**

**When to use:**
- Soft purple presence

```html
<div class="sgds:border sgds:border-purple-muted">
  Subtle purple border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-badge>` when available. Purple border tokens are for creating custom components when library components don't meet your needs.

### Category Tag

```html
<span class="sgds:border sgds:border-purple-default">
  Category A
</span>
```

### Left-accent Variety

```html
<div class="sgds:border-l-4 sgds:border-purple-default">
  Featured section
</div>
```
