# Primary Background Colors Reference

**Meaning**: Brand color
**Usage**: Brand emphasis, hero sections, CTA sections

## Design Semantics

- **Primary = Brand Color**
- Use to emphasize important sections with brand identity
- Typically full-width for page level
- Component level for branded elements

## Available Tokens

### Page Level

#### `sgds:bg-primary-default`
**Emphasize important page sections.**

**When to use:**
- Hero sections
- Call-to-action (CTA) sections
- Full-width branded sections
- Stretched across page left to right

```html
<section class="sgds:bg-primary-default">
  <div>
    <h2>Hero Section</h2>
    <p>Emphasized with brand color</p>
    <button>
      Get Started
    </button>
  </div>
</section>
```

#### `sgds:bg-primary-muted`
**Lightest shade of primary. Reduces emphasis.**

**When to use:**
- Want the color but not too jarring
- Subtle brand presence
- Reduced emphasis while maintaining color

```html
<div class="sgds:bg-primary-muted">
  <p>
    Subtle primary background (doesn't dominate attention)
  </p>
</div>
```

#### `sgds:bg-primary-translucent`
**Semi-transparent primary.**

**When to use:**
- Overlay effects with primary color
- Allows underlying content to show through

```html
<div>
  <img src="background.jpg" />
  <div class="sgds:bg-primary-translucent">
    <h2>Content over image with primary tint</h2>
  </div>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-primary-surface-default`
**Standard primary tinted surface.**

**When to use:**
- Component backgrounds needing brand color
- Cards, panels with primary theme

```html
<div class="sgds:bg-primary-surface-default">
  Primary themed component
</div>
```

#### `sgds:bg-primary-surface-emphasis`
**Component level with emphasized primary.**

**When to use:**
- Strong primary color on a component
- More saturated than `surface-default`
- Draw maximum attention to component

```html
<div class="sgds:bg-primary-surface-emphasis">
  Strongly emphasized primary component
</div>
```

#### `sgds:bg-primary-surface-muted`
**Component level, subtle primary.**

**When to use:**
- Same concept as `primary-muted` but for components
- Subtle primary for component backgrounds
- Less prominent than `surface-default`

```html
<div class="sgds:bg-primary-surface-muted">
  Subtle primary component background
</div>
```

#### `sgds:bg-primary-surface-translucent`
**Semi-transparent primary surface.**

**When to use:**
- Translucent component backgrounds
- Layered effects

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Hero Section (Page Level)

```html
<section class="sgds:bg-primary-default">
  <div>
    <h1>
      Welcome to Our Service
    </h1>
    <p>
      Build amazing things with our platform
    </p>
    <button>
      Get Started
    </button>
  </div>
</section>
```

### Primary Card (Component Level)

```html
<div class="sgds:bg-primary-surface-default">
  <h3>Featured Item</h3>
  <p>This item is highlighted with primary brand color</p>
  <button class="sgds:bg-primary-default">
    Learn More
  </button>
</div>
```

### CTA Section with Muted Background

```html
<section class="sgds:bg-primary-muted">
  <div>
    <h2>
      Ready to Get Started?
    </h2>
    <p>
      Join thousands of users already using our platform
    </p>
    <button class="sgds:bg-primary-default">
      Sign Up Now
    </button>
  </div>
</section>
```

### Primary Badge on Card

```html
<div>
  <div>
    <h3>Product Name</h3>
    <span class="sgds:bg-primary-surface-emphasis">
      Featured
    </span>
  </div>
  <p>Product description...</p>
</div>
```

### Emphasis Progression

```html
<!-- Most subtle to most emphasized -->
<div>
  <div class="sgds:bg-primary-surface-muted">
    Subtle (Muted)
  </div>
  <div class="sgds:bg-primary-surface-default">
    Standard (Default)
  </div>
  <div class="sgds:bg-primary-surface-emphasis">
    Strong (Emphasis)
  </div>
  <div class="sgds:bg-primary-default">
    Strongest (Solid)
  </div>
</div>
```

## Best Practices

### ✅ DO: Use for Brand Emphasis

```html
<!-- ✅ Good - hero section with brand color -->
<section class="sgds:bg-primary-default">
  Hero content with strong brand presence
</section>
```

### ✅ DO: Pair with Appropriate Text Colors

```html
<!-- ✅ Good - solid primary with white text -->
<div class="sgds:bg-primary-default">Solid primary</div>

<!-- ✅ Good - surface primary with primary text -->
<div class="sgds:bg-primary-surface-default">Primary surface</div>
```

### ✅ DO: Use Emphasis Levels Appropriately

```html
<!-- ✅ Good - subtle for less important items -->
<span class="sgds:bg-primary-surface-muted">
  Info badge
</span>

<!-- ✅ Good - emphasis for important items -->
<span class="sgds:bg-primary-surface-emphasis">
  Featured badge
</span>
```

### ❌ DON'T: Overuse Primary Color

```html
<!-- ❌ Avoid - everything is primary -->
<div class="sgds:bg-primary-default">
  <div class="sgds:bg-primary-surface-emphasis">
    <span class="sgds:bg-primary-surface-default">
      Too much primary color (visual overload)
    </span>
  </div>
</div>

<!-- ✅ Better - selective primary use -->
<div>
  <h3>Normal content</h3>
  <span class="sgds:bg-primary-surface-emphasis">
    Featured item (stands out)
  </span>
</div>
```

### ❌ DON'T: Mix Wrong Text Colors

```html
<!-- ❌ Avoid - poor contrast -->
<div class="sgds:bg-primary-default">
  Hard to read
</div>

<!-- ✅ Correct - proper contrast -->
<div class="sgds:bg-primary-default">
  Easy to read
</div>
```

## See Also

- **accent.md** - Informational color backgrounds
- **surface.md** - Base component backgrounds
- **form.md** - Form with primary states
