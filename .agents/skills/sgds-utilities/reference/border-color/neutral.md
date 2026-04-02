# Neutral Border Colors Reference

**Meaning**: Equal importance, no differentiation
**Usage**: Tags and components where all items carry equal weight

## Design Semantics

- **Neutral = No differentiation**
- Use when all items should appear equally prominent
- No brand, state, or semantic meaning implied
- Applied to **containers and components only** — not page-level

## Available Tokens

### `sgds:border-neutral-default`
**Standard neutral border.**

**When to use:**
- Tags where all items have equal importance
- Non-semantic groupings

```html
<span class="sgds:border sgds:border-neutral-default">
  Tag
</span>
```

### `sgds:border-neutral-emphasis`
**Strong neutral border.**

**When to use:**
- More prominent neutral-bordered components

```html
<div class="sgds:border-2 sgds:border-neutral-emphasis">
  Prominent neutral container
</div>
```

### `sgds:border-neutral-muted`
**Subtle neutral border.**

**When to use:**
- Very low-emphasis neutral borders

```html
<div class="sgds:border sgds:border-neutral-muted">
  Subtle neutral border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-badge>` when available. Neutral border tokens are for creating custom components when library components don't meet your needs.

### Uniform Tags (equal importance)

```html
<span class="sgds:border sgds:border-neutral-default">Tag 1</span>
<span class="sgds:border sgds:border-neutral-default">Tag 2</span>
<span class="sgds:border sgds:border-neutral-default">Tag 3</span>
```
