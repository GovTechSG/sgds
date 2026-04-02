# Success Border Colors Reference

**Meaning**: Positive feedback
**Usage**: Success-state borders on containers and components

## Design Semantics

- **Success = Positive outcome**
- Conveys successful states, valid inputs, completion
- Applied to **containers and components only** — not page-level

## Available Tokens

### `sgds:border-success-default`
**Standard success-state border.**

**When to use:**
- Success alert containers
- Checked/valid component states

```html
<div class="sgds:border sgds:border-success-default">
  Success state container
</div>
```

### `sgds:border-success-emphasis`
**Strong success-state border.**

**When to use:**
- High-visibility success indicators
- Strongly bordered success callouts

```html
<div class="sgds:border-2 sgds:border-success-emphasis">
  Prominent success container
</div>
```

### `sgds:border-success-muted`
**Subtle success-state border.**

**When to use:**
- Low-emphasis success indication

```html
<div class="sgds:border sgds:border-success-muted">
  Subtle success border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-alert>`, `<sgds-badge>` when available. Success border tokens are for creating custom components when library components don't meet your needs.

### Success Alert

```html
<div class="sgds:border-l-4 sgds:border-success-default">
  Your submission was successful.
</div>
```

### Success Badge

```html
<span class="sgds:border sgds:border-success-default">
  Completed
</span>
```
