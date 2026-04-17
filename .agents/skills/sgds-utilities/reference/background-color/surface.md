# Surface Background Colors Reference

**Level**: Component level
**Usage**: Individual components like cards, badges, panels, forms

## Available Tokens

### `sgds:bg-surface-default`
**Always the default** background color for components.

**When to use:**
- First choice for any component background
- Cards, panels, containers, form fields

```html
<div class="sgds:bg-surface-default">
  Default card background
</div>
```

---

### `sgds:bg-surface-raised`
**One shade darker/different** than `surface-default`.

**When to use:**
- Differentiate from component background
- Badge on a card
- Nested div needing visual separation
- Create hierarchy within a component

```html
<div class="sgds:bg-surface-default">
  Card background
  <span class="sgds:bg-surface-raised">
    Badge (differentiated from card)
  </span>
</div>
```

**Example - Nested Cards:**
```html
<div class="sgds:bg-surface-default">
  <h3>Outer Card</h3>
  <div class="sgds:bg-surface-raised">
    Inner card (visually separated)
  </div>
</div>
```

---

### `sgds:bg-surface-inverse`
**Opposite color** relative to current theme mode.

**When to use:**
- Inverse contrast within a component
- Dark card in light theme, light card in dark theme
- Always pairs with `sgds:text-inverse`

```html
<div class="sgds:bg-surface-inverse">
  Inverted component (adapts to theme)
</div>
```

**Example - Dark Card in Any Theme:**
```html
<div class="sgds:bg-surface-default">
  Normal card
  <div class="sgds:bg-surface-inverse">
    This is always inverse of the theme
  </div>
</div>
```

---

### `sgds:bg-surface-fixed-light`
**Never changes** - always light background.

**When to use:**
- Background over images (images don't change with theme)
- Brand requirements for specific color
- Guaranteed contrast needed

**Important**: Always pair with `sgds:text-fixed-dark` for contrast.

```html
<div>
  <img src="photo.jpg" />
  <div class="sgds:bg-surface-fixed-light">
    Text overlay on image (always readable)
  </div>
</div>
```

---

### `sgds:bg-surface-fixed-dark`
**Never changes** - always dark background.

**When to use:**
- Same as `fixed-light` but for dark theme needs
- Over light-colored images
- Brand colors requiring dark backgrounds

**Important**: Always pair with `sgds:text-fixed-light` for contrast.

```html
<div>
  <img src="light-photo.jpg" />
  <div class="sgds:bg-surface-fixed-dark">
    Dark overlay on light image
  </div>
</div>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>` when available. Surface tokens are for creating custom components when library components don't meet your needs.

### Card with Badge

```html
<div class="sgds:bg-surface-default">
  <div>
    <h3>Card Title</h3>
    <span class="sgds:bg-surface-raised">
      New
    </span>
  </div>
  <p>Card content</p>
</div>
```

### Layered Components

```html
<div class="sgds:bg-surface-default">
  Layer 1 - Base surface
  <div class="sgds:bg-surface-raised">
    Layer 2 - Raised surface
    <div class="sgds:bg-surface-default">
      Layer 3 - Back to default (creates depth)
    </div>
  </div>
</div>
```

### Image Overlay Component

```html
<div>
  <img src="hero.jpg" />
  <div class="sgds:bg-surface-fixed-dark"></div>
  <div class="sgds:bg-surface-fixed-light">
    <h2>Image Title</h2>
    <p>Description overlay with fixed background</p>
  </div>
</div>
```

## Best Practices

### ✅ DO: Use `surface-default` as First Choice

```html
<!-- ✅ Good - standard component background -->
<div class="sgds:bg-surface-default">
  Component content
</div>
```

### ✅ DO: Use `surface-raised` for Differentiation

```html
<!-- ✅ Good - badge stands out from card -->
<div class="sgds:bg-surface-default">
  <span class="sgds:bg-surface-raised">Badge</span>
</div>
```

### ✅ DO: Pair Fixed Colors with Fixed Text

```html
<!-- ✅ Good - consistent contrast -->
<div class="sgds:bg-surface-fixed-dark">
  Always readable
</div>
```

### ❌ DON'T: Use Same Surface Level for Hierarchy

```html
<!-- ❌ Avoid - no visual differentiation -->
<div class="sgds:bg-surface-default">
  <span class="sgds:bg-surface-default">Badge doesn't stand out</span>
</div>
```

## See Also

- **[base.md](base.md)** — Page-level background tokens
- **[form.md](form.md)** — Form input background tokens
- **[semantic.md](semantic.md)** — Semantic color backgrounds (primary, accent, success, danger, warning, purple, cyan, neutral)
