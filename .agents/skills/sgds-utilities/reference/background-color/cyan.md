# Cyan Background Colors Reference

**Meaning**: No semantic meaning - visual variety
**Usage**: Non-semantic tagging, visual differentiation, brand expression

## Design Semantics

- **Cyan = Additional Color / Visual Variety**
- No inherent semantic meaning (unlike success/danger/warning)
- Use for visual differentiation when meaning isn't needed
- Good for categories, tags, or brand expression
- Equal importance with purple - use for variety
- **Alternative when primary and accent are similar**: If your theme's primary and accent colors are similar, use cyan (or purple) to create visual differentiation

## Available Tokens

### Page Level

#### `sgds:bg-cyan-default`
**Page-level cyan sections.**

```html
<section class="sgds:bg-cyan-default">
  <div>
    <h2>Featured Section</h2>
    <p>No semantic meaning, just visual interest</p>
  </div>
</section>
```

#### `sgds:bg-cyan-muted`
**Subtle cyan background.**

```html
<div class="sgds:bg-cyan-muted">
  <p>Subtle cyan accent</p>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-cyan-surface-default`
**Standard cyan component backgrounds.**

**When to use:**
- Category tags (no semantic meaning)
- Visual differentiation
- Decorative elements
- Brand expression

```html
<div class="sgds:bg-cyan-surface-default">
  <p>Cyan Component</p>
</div>
```

#### `sgds:bg-cyan-surface-emphasis`
**Emphasized cyan component.**

```html
<div class="sgds:bg-cyan-surface-emphasis">
  Emphasized cyan
</div>
```

#### `sgds:bg-cyan-surface-muted`
**Subtle cyan component.**

```html
<span class="sgds:bg-cyan-surface-muted">
  Tag
</span>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Category Tags

```html
<div>
  <span class="sgds:bg-cyan-surface-default">
    Technology
  </span>
  <span>
    Innovation
  </span>
  <span class="sgds:bg-cyan-surface-muted">
    Digital
  </span>
</div>
```

### Feature Card

```html
<div class="sgds:bg-cyan-surface-default">
  <h3>Feature Title</h3>
  <p>
    Description of the feature with no specific semantic meaning
  </p>
</div>
```

### Badge (Non-Semantic)

```html
<span class="sgds:bg-cyan-surface-default">
  Featured
</span>
```

### Decorative Accent

```html
<div>
  <h4>Note</h4>
  <p>Cyan accent for visual interest</p>
</div>
```

### Multi-Category Filter

```html
<div>
  <button class="sgds:bg-cyan-surface-default">
    All Items
  </button>
  <button>
    Featured
  </button>
  <button class="sgds:bg-cyan-surface-muted">
    Latest
  </button>
</div>
```

### Alternating Cards

```html
<div>
  <div class="sgds:bg-cyan-surface-default">
    <h3>Item 1</h3>
  </div>
  <div>
    <h3>Item 2</h3>
  </div>
  <div class="sgds:bg-cyan-surface-default">
    <h3>Item 3</h3>
  </div>
</div>
```

### Department/Division Cards

```html
<div>
  <div class="sgds:bg-cyan-surface-default">
    <h3>Engineering</h3>
    <p>50+ members</p>
  </div>
  <div>
    <h3>Design</h3>
    <p>30+ members</p>
  </div>
</div>
```

## Best Practices

### ✅ DO: Use for Visual Variety

```html
<!-- ✅ Good - adds visual interest -->
<span class="sgds:bg-cyan-surface-default">
  Technology
</span>
<span>
  Innovation
</span>
```

### ✅ DO: Use for Non-Semantic Tagging

```html
<!-- ✅ Good - category tags without meaning -->
<div>
  <span class="sgds:bg-cyan-surface-default">API</span>
  <span>SDK</span>
</div>
```

### ✅ DO: Combine with Purple for Balance

```html
<!-- ✅ Good - alternating for visual variety -->
<div>
  <div class="sgds:bg-cyan-surface-default">Cyan</div>
  <div>Purple</div>
</div>
```

### ❌ DON'T: Use for Semantic States

```html
<!-- ❌ Avoid - cyan for informational (use accent instead) -->
<div class="sgds:bg-cyan-surface-default">
  Important information (use accent instead)
</div>

<!-- ✅ Better - accent for informational -->
<div>
  Important information
</div>
```

### ❌ DON'T: Use for Status Indicators

```html
<!-- ❌ Avoid - cyan for active status -->
<span class="sgds:bg-cyan-surface-default">Active</span>

<!-- ✅ Better - use semantic colors for status -->
<span>Active</span>
```

### ❌ DON'T: Overuse in One Interface

```html
<!-- ❌ Avoid - too much cyan -->
<div class="sgds:bg-cyan-surface-default">
  <button class="sgds:bg-cyan-default">Button</button>
  <span class="sgds:bg-cyan-surface-emphasis">Badge</span>
</div>

<!-- ✅ Better - mix with other colors -->
<div>
  <button>Button</button>
  <span class="sgds:bg-cyan-surface-default">Badge</span>
</div>
```

## See Also

- **purple.md** - Additional variety color (pair with cyan)
- **neutral.md** - Equal importance tagging
- **accent.md** - Informational colors (semantic alternative)
