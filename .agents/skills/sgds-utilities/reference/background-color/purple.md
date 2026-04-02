# Purple Background Colors Reference

**Meaning**: No semantic meaning - visual variety
**Usage**: Non-semantic tagging, visual differentiation, brand expression

## Design Semantics

- **Purple = Additional Color / Visual Variety**
- No inherent semantic meaning (unlike success/danger/warning)
- Use for visual differentiation when meaning isn't needed
- Good for categories, tags, or brand expression
- Equal importance with cyan - use for variety
- **Alternative when primary and accent are similar**: If your theme's primary and accent colors are similar, use purple (or cyan) to create visual differentiation

## Available Tokens

### Page Level

#### `sgds:bg-purple-default`
**Page-level purple sections.**

```html
<section class="sgds:bg-purple-default">
  <div>
    <h2>Featured Section</h2>
    <p>No semantic meaning, just visual interest</p>
  </div>
</section>
```

#### `sgds:bg-purple-muted`
**Subtle purple background.**

```html
<div class="sgds:bg-purple-muted">
  <p>Subtle purple accent</p>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-purple-surface-default`
**Standard purple component backgrounds.**

**When to use:**
- Category tags (no semantic meaning)
- Visual differentiation
- Decorative elements
- Brand expression

```html
<div class="sgds:bg-purple-surface-default">
  <p>Purple Component</p>
</div>
```

#### `sgds:bg-purple-surface-emphasis`
**Emphasized purple component.**

```html
<div class="sgds:bg-purple-surface-emphasis">
  Emphasized purple
</div>
```

#### `sgds:bg-purple-surface-muted`
**Subtle purple component.**

```html
<span class="sgds:bg-purple-surface-muted">
  Tag
</span>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Category Tags

```html
<div>
  <span class="sgds:bg-purple-surface-default">
    Design
  </span>
  <span class="sgds:bg-cyan-surface-default">
    Development
  </span>
  <span class="sgds:bg-purple-surface-muted">
    Research
  </span>
</div>
```

### Feature Card

```html
<div class="sgds:bg-purple-surface-default">
  <h3>Feature Title</h3>
  <p>
    Description of the feature with no specific semantic meaning
  </p>
</div>
```

### Badge (Non-Semantic)

```html
<span class="sgds:bg-purple-surface-default">
  Premium
</span>
```

### Decorative Accent

```html
<div>
  <h4>Tip</h4>
  <p>Purple accent for visual interest</p>
</div>
```

### Multi-Category Filter

```html
<div>
  <button class="sgds:bg-purple-surface-default">
    Category A
  </button>
  <button class="sgds:bg-cyan-surface-default">
    Category B
  </button>
  <button class="sgds:bg-purple-surface-muted">
    Category C
  </button>
</div>
```

### Alternating Cards

```html
<div>
  <div class="sgds:bg-purple-surface-default">
    <h3>Item 1</h3>
  </div>
  <div class="sgds:bg-cyan-surface-default">
    <h3>Item 2</h3>
  </div>
  <div class="sgds:bg-purple-surface-default">
    <h3>Item 3</h3>
  </div>
</div>
```

## Best Practices

### ✅ DO: Use for Visual Variety

```html
<!-- ✅ Good - adds visual interest -->
<span class="sgds:bg-purple-surface-default">
  Design
</span>
<span class="sgds:bg-cyan-surface-default">
  Technology
</span>
```

### ✅ DO: Use for Non-Semantic Tagging

```html
<!-- ✅ Good - category tags without meaning -->
<div>
  <span class="sgds:bg-purple-surface-default">Frontend</span>
  <span class="sgds:bg-cyan-surface-default">Backend</span>
</div>
```

### ✅ DO: Combine with Cyan for Balance

```html
<!-- ✅ Good - alternating for visual variety -->
<div>
  <div class="sgds:bg-purple-surface-default">Purple</div>
  <div class="sgds:bg-cyan-surface-default">Cyan</div>
</div>
```

### ❌ DON'T: Use for Semantic States

```html
<!-- ❌ Avoid - purple for success state -->
<div class="sgds:bg-purple-surface-default">
  Form submitted successfully (use success instead)
</div>

<!-- ✅ Better - success for semantic feedback -->
<div class="sgds:bg-success-surface-default">
  Form submitted successfully
</div>
```

### ❌ DON'T: Use for Status Indicators

```html
<!-- ❌ Avoid - purple for status -->
<span class="sgds:bg-purple-surface-default">Active</span>

<!-- ✅ Better - use semantic colors for status -->
<span class="sgds:bg-success-surface-default">Active</span>
```

### ❌ DON'T: Overuse in One Interface

```html
<!-- ❌ Avoid - too much purple -->
<div class="sgds:bg-purple-surface-default">
  <button class="sgds:bg-purple-default">Button</button>
  <span class="sgds:bg-purple-surface-emphasis">Badge</span>
</div>

<!-- ✅ Better - mix with other colors -->
<div>
  <button>Button</button>
  <span class="sgds:bg-purple-surface-default">Badge</span>
</div>
```

## See Also

- **cyan.md** - Additional variety color (pair with purple)
- **neutral.md** - Equal importance tagging
- **primary.md** - Brand colors (for semantic use)
