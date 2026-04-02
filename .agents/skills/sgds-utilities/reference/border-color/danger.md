# Danger Border Colors Reference

**Meaning**: Error, negative feedback, destructive action
**Usage**: Error-state and destructive-action borders on containers and components

## Design Semantics

- **Danger = Error or destructive**
- Communicates failed states, invalid inputs, irreversible actions
- Applied to **containers and components only** — not page-level
- Third modifier is `subtle` (not `muted`) — a softer error presence

## Available Tokens

### `sgds:border-danger-default`
**Standard error-state border.**

**When to use:**
- Error alert containers
- Invalid or failed component states

```html
<div class="sgds:border sgds:border-danger-default">
  Error state container
</div>
```

### `sgds:border-danger-emphasis`
**Strong error-state border.**

**When to use:**
- High-severity error components
- Critical failure indicators

```html
<div class="sgds:border-2 sgds:border-danger-emphasis">
  Critical error container
</div>
```

### `sgds:border-danger-subtle`
**Softest error-state border.**

**When to use:**
- Soft danger presence that doesn't alarm
- Background pairing where full danger border is too strong

```html
<div class="sgds:border sgds:border-danger-subtle">
  Subtle danger border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-alert>`, `<sgds-input>` when available. Danger border tokens are for creating custom components when library components don't meet your needs.

### Error Alert

```html
<div class="sgds:border-l-4 sgds:border-danger-default">
  Something went wrong. Please try again.
</div>
```

### Error Badge

```html
<span class="sgds:border sgds:border-danger-default">
  Failed
</span>
```
