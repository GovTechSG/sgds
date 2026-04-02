# Warning Border Colors Reference

**Meaning**: Caution, requires attention
**Usage**: Caution-state borders on containers and components

## Design Semantics

- **Warning = Caution or attention needed**
- Communicates actions requiring review, non-critical issues
- Applied to **containers and components only** — not page-level
- Third modifier is `subtle` (not `muted`) — a softer caution presence

## Available Tokens

### `sgds:border-warning-default`
**Standard caution-state border.**

**When to use:**
- Warning alert containers
- Components requiring user attention

```html
<div class="sgds:border sgds:border-warning-default">
  Caution state container
</div>
```

### `sgds:border-warning-emphasis`
**Strong caution-state border.**

**When to use:**
- High-visibility caution indicators

```html
<div class="sgds:border-2 sgds:border-warning-emphasis">
  Prominent warning container
</div>
```

### `sgds:border-warning-subtle`
**Softest caution-state border.**

**When to use:**
- Soft caution presence without alarming
- Background pairing where default warning border is too prominent

```html
<div class="sgds:border sgds:border-warning-subtle">
  Subtle warning border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-alert>`, `<sgds-badge>` when available. Warning border tokens are for creating custom components when library components don't meet your needs.

### Warning Alert

```html
<div class="sgds:border-l-4 sgds:border-warning-default">
  Please review before proceeding.
</div>
```

### Warning Badge

```html
<span class="sgds:border sgds:border-warning-default">
  Pending
</span>
```
