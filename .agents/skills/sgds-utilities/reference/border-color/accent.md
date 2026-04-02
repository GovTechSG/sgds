# Accent Border Colors Reference

**Meaning**: Informational
**Usage**: Informational-emphasis borders on containers and components

## Design Semantics

- **Accent = Informational, no urgency**
- Communicates informational context without alarm
- Used for info badges, informational callouts, link-adjacent components
- Applied to **containers and components only** — not page-level

## Available Tokens

### `sgds:border-accent-default`
**Standard informational border.**

**When to use:**
- Info-state components
- Informational callout containers
- Neutral emphasis without danger/warning connotation

```html
<div class="sgds:border sgds:border-accent-default">
  Informational container
</div>
```

### `sgds:border-accent-emphasis`
**Strong informational border.**

**When to use:**
- High-visibility informational components
- Strongly bordered info callouts

```html
<div class="sgds:border-2 sgds:border-accent-emphasis">
  Prominent info container
</div>
```

### `sgds:border-accent-muted`
**Subtle informational border.**

**When to use:**
- Low-key informational components
- Minimal accent presence

```html
<div class="sgds:border sgds:border-accent-muted">
  Subtle info border
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-badge>`, `<sgds-alert>` when available. Accent border tokens are for creating custom components when library components don't meet your needs.

### Info Badge

```html
<span class="sgds:border sgds:border-accent-default">
  Info
</span>
```

### Info Callout

```html
<div class="sgds:border-l-4 sgds:border-accent-default">
  Informational callout text
</div>
```
