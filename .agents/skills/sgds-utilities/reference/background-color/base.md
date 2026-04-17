# Base Background Colors Reference

**Level**: Page level
**Usage**: Page backgrounds, full-width sections, overlays

## Available Tokens

### `sgds:bg-default`
**Default page background color.**

**When to use:**
- Main body/page background
- Default backdrop for all content

```html
<body class="sgds:bg-default">
  Main page content
</body>
```

---

### `sgds:bg-alternate`
**Distinguish sections** within a page.

**When to use:**
- Visually separate two sections on the same page
- Create alternating section patterns
- Add visual rhythm to page layout

```html
<section class="sgds:bg-default">
  Section 1
</section>
<section class="sgds:bg-alternate">
  Section 2 (visually distinct)
</section>
<section class="sgds:bg-default">
  Section 3
</section>
```

**Example - Alternating Landing Page:**
```html
<body class="sgds:bg-default">
  <section class="sgds:bg-default">Hero Section</section>
  <section class="sgds:bg-alternate">Features Section</section>
  <section class="sgds:bg-default">Testimonials Section</section>
  <section class="sgds:bg-alternate">CTA Section</section>
</body>
```

---

### `sgds:bg-fixed-light` / `sgds:bg-fixed-dark`
**Never changes** with theme mode.

**When to use:**
- Page section with background image
- Brand requirements for specific page colors
- Guaranteed contrast for page sections

```html
<section class="sgds:bg-fixed-dark">
  Always dark section (doesn't change with theme)
</section>
```

---

### `sgds:bg-overlay`
**Full-screen overlays only.**

**When to use:**
- Modal backdrops
- Drawer overlays
- Dialog backgrounds
- Always spans full viewport

```html
<!-- Modal backdrop -->
<div class="sgds:bg-overlay">
  Full-screen semi-transparent overlay
</div>
```

**Example - Complete Modal:**
```html
<!-- Overlay backdrop -->
<div class="sgds:bg-overlay">
  <!-- Modal content -->
  <div class="sgds:bg-surface-raised">
    <h3>Modal Title</h3>
    <p>Modal content</p>
  </div>
</div>
```

---

### `sgds:bg-translucent`
**Semi-transparent background.**

**When to use (Component level):**
- Hover effects
- Active states
- State differentiation
- Allows underlying background to show through

```html
<button class="sgds:bg-transparent hover:sgds:bg-translucent">
  Hover me (shows translucent overlay)
</button>
```

---

### `sgds:bg-translucent-subtle`
**Lighter color grade** than translucent.

**When to use:**
- Even subtler state changes
- Minimal hover feedback
- Gentle background tint

```html
<div class="sgds:bg-translucent-subtle">
  Subtle background tint
</div>
```

---

### `sgds:bg-translucent-inverse`
**Semi-transparent inverse color.**

**When to use:**
- Translucent overlays that adapt to theme
- Changes with theme mode

---

### `sgds:bg-translucent-fixed-light` / `sgds:bg-translucent-fixed-dark`
**Semi-transparent fixed colors.**

**When to use:**
- Same as fixed colors, but translucent
- Never changes with theme

---

### `sgds:bg-transparent`
**No visible color.**

**When to use:**
- Outline buttons (no background fill)
- Maintain box model without visible background
- Can be used at any level (component or page)

```html
<button class="sgds:bg-transparent">
  Outline button
</button>
```

## Common Patterns

### Alternating Sections Page

```html
<main>
  <section class="sgds:bg-default">
    <div>
      <h2>Section 1</h2>
      <p>Content...</p>
    </div>
  </section>

  <section class="sgds:bg-alternate">
    <div>
      <h2>Section 2</h2>
      <p>Content...</p>
    </div>
  </section>
</main>
```

### Modal with Overlay

```html
<!-- Backdrop overlay -->
<div class="sgds:bg-overlay"></div>

<!-- Modal (positioned above overlay) -->
<div>
  <div class="sgds:bg-surface-raised">
    <h3>Modal Title</h3>
    <p>Modal content</p>
    <div>
      <button class="sgds:bg-transparent">Cancel</button>
      <button class="sgds:bg-primary-default">Confirm</button>
    </div>
  </div>
</div>
```

### Hover Effect Button

```html
<button class="sgds:bg-transparent hover:sgds:bg-translucent active:sgds:bg-translucent-subtle">
  Hover and Click Me
</button>
```

### Outline Button

```html
<button class="sgds:bg-transparent hover:sgds:bg-primary-default">
  Outline to Filled on Hover
</button>
```

## Best Practices

### ✅ DO: Use `bg-default` for Main Page

```html
<!-- ✅ Good - standard page background -->
<body class="sgds:bg-default">
  Page content
</body>
```

### ✅ DO: Alternate Sections for Visual Rhythm

```html
<!-- ✅ Good - clear visual separation -->
<section class="sgds:bg-default">Section 1</section>
<section class="sgds:bg-alternate">Section 2</section>
```

### ✅ DO: Use `bg-overlay` for Full-Screen Overlays

```html
<!-- ✅ Good - proper full-screen overlay -->
<div class="sgds:bg-overlay">
  Modal backdrop
</div>
```

### ✅ DO: Use `bg-transparent` for Outline Buttons

```html
<!-- ✅ Good - transparent with border -->
<button class="sgds:bg-transparent">
  Outline Button
</button>
```

### ❌ DON'T: Use `bg-overlay` on Components

```html
<!-- ❌ Avoid - overlay is for full-screen only -->
<div class="sgds:bg-overlay">
  Wrong usage
</div>

<!-- ✅ Use translucent for components instead -->
<div class="sgds:bg-translucent">
  Correct usage
</div>
```

### ❌ DON'T: Use Same Background for All Sections

```html
<!-- ❌ Avoid - no visual rhythm -->
<section class="sgds:bg-default">Section 1</section>
<section class="sgds:bg-default">Section 2</section>
<section class="sgds:bg-default">Section 3</section>

<!-- ✅ Better - alternating backgrounds -->
<section class="sgds:bg-default">Section 1</section>
<section class="sgds:bg-alternate">Section 2</section>
<section class="sgds:bg-default">Section 3</section>
```

## See Also

- **[surface.md](surface.md)** — Component-level surface tokens
- **[form.md](form.md)** — Form input background tokens
- **[semantic.md](semantic.md)** — Semantic color backgrounds (primary, accent, success, danger, warning, purple, cyan, neutral)
