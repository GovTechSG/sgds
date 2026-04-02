# Primary Border Colors Reference

**Meaning**: Brand color
**Usage**: Brand-emphasis borders on containers and components

## Design Semantics

- **Primary = Brand Color**
- Conveys brand identity through borders
- Used for active states, selected elements, brand-accented components
- Applied to **containers and components only** — not page-level

## Available Tokens

### `sgds:border-primary-default`
**Standard brand-colored border.**

**When to use:**
- Active/selected component states
- Components that need brand emphasis
- Focus indicators on interactive elements

```html
<div class="sgds:border-2 sgds:border-primary-default">
  Active or selected component
</div>
```

### `sgds:border-primary-emphasis`
**Strong brand-colored border.**

**When to use:**
- High-prominence brand indicators
- Call-to-action containers
- Strong active state borders

```html
<div class="sgds:border-2 sgds:border-primary-emphasis">
  Strong brand border
</div>
```

### `sgds:border-primary-muted`
**Subtle brand-colored border.**

**When to use:**
- Soft brand presence on components
- Inactive states with brand color hint

```html
<div class="sgds:border sgds:border-primary-muted">
  Subtle brand border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-button>`, `<sgds-tab>`, `<sgds-input>` when available. Primary border tokens are for creating custom components when library components don't meet your needs.

### Selected/Active Component

```html
<div class="sgds:border-2 sgds:border-primary-default">
  Selected card
</div>
```

### Active Tab Indicator

```html
<button class="sgds:border-b-2 sgds:border-primary-default">
  Active Tab
</button>
```

### Left Accent Callout

```html
<div class="sgds:border-l-4 sgds:border-primary-default">
  Important callout
</div>
```
