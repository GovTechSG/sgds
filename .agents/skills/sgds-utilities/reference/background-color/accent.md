# Accent Background Colors Reference

**Meaning**: Links & Information
**Usage**: Informational elements, link-related components, neutral communication

## Design Semantics

- **Accent = Informational Color** (typically blue)
- No urgency or semantic weight
- Neutral, informational tone
- Has color unlike neutral gray (color = meaning)
- Use for link-related components, informational elements

## Available Tokens

### Page Level

#### `sgds:bg-accent-default`
**Page-level informational sections.**

```html
<section class="sgds:bg-accent-default">
  <div>
    <h2>Information Section</h2>
    <p>Neutral informational content</p>
  </div>
</section>
```

#### `sgds:bg-accent-muted`
**Subtle informational background.**

```html
<div class="sgds:bg-accent-muted">
  <p>Subtle informational message</p>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-accent-surface-default`
**Informational component backgrounds.**

```html
<a href="#" class="sgds:bg-accent-surface-default">
  Informational link button
</a>
```

#### `sgds:bg-accent-surface-emphasis`
**Emphasized informational component.**

```html
<div class="sgds:bg-accent-surface-emphasis">
  Important information highlighted
</div>
```

#### `sgds:bg-accent-surface-muted`
**Subtle informational component.**

```html
<div class="sgds:bg-accent-surface-muted">
  Subtle info badge
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Custom Informational Card

```html
<div class="sgds:bg-accent-surface-default">
  <h3>Did You Know?</h3>
  <p>Informational content that doesn't require urgency</p>
</div>
```

### Link Button

```html
<a href="/docs" class="sgds:bg-accent-surface-default">
  Read Documentation
  <svg><!-- icon --></svg>
</a>
```

### Info Banner

```html
<div class="sgds:bg-accent-surface-default">
  <p>Information</p>
  <p>Additional details about this feature</p>
</div>
```

## Best Practices

### ✅ DO: Use for Informational Content

```html
<!-- ✅ Good - neutral information -->
<div class="sgds:bg-accent-surface-default">
  Informational message without urgency
</div>
```

### ✅ DO: Use for Link-Related Elements

```html
<!-- ✅ Good - link button with accent -->
<a href="#" class="sgds:bg-accent-surface-default">
  Learn More
</a>
```

### ❌ DON'T: Use for Urgent Messages

```html
<!-- ❌ Avoid - accent implies no urgency -->
<div class="sgds:bg-accent-surface-default">
  Urgent error message (use danger instead)
</div>

<!-- ✅ Better - danger for urgent -->
<div class="sgds:bg-danger-surface-default">
  Urgent error message
</div>
```

## See Also

- **primary.md** - Brand color backgrounds
- **success.md, danger.md, warning.md** - State-based colors
