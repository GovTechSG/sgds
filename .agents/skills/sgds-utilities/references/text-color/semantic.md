# Text Color — Semantic Colors Reference

Semantic text color tokens carry meaning (brand, status, feedback). Use them when color communicates a specific intent, not just for aesthetic variation.

## Token Pattern

```
sgds:text-{variant}-{modifier}
```

**Variants:** `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

**Modifiers:** `default`, `emphasis`, `fixed-light`, `fixed-dark`

For modifier definitions see **[`color-semantics`](../color-semantics.md)**.

## Variant Reference

### `primary`
Brand color. Use for callouts, interactive elements, and branded text.

```html
<span class="sgds:text-primary-default">Primary brand text</span>
<span class="sgds:text-primary-emphasis">Hover or active state</span>
<span class="sgds:text-primary-fixed-light">On dark brand background</span>
<span class="sgds:text-primary-fixed-dark">On light brand background</span>
```

### `accent`
Secondary brand color. Use for highlights and secondary CTAs.

```html
<span class="sgds:text-accent-default">Accent text</span>
<span class="sgds:text-accent-emphasis">Emphasized accent</span>
```

### `success`
Positive / completion state.

```html
<span class="sgds:text-success-default">Saved successfully</span>
<span class="sgds:text-success-emphasis">Strong success emphasis</span>
```

### `danger`
Error / destructive state.

```html
<span class="sgds:text-danger-default">This field is required</span>
<span class="sgds:text-danger-emphasis">Critical error</span>
```

### `warning`
Cautionary / non-blocking state.

```html
<span class="sgds:text-warning-default">Please review before submitting</span>
<span class="sgds:text-warning-emphasis">Strong caution</span>
```

### `purple`
Supplementary brand color.

```html
<span class="sgds:text-purple-default">Purple label</span>
```

### `cyan`
Supplementary brand color.

```html
<span class="sgds:text-cyan-default">Cyan label</span>
```

### `neutral`
Non-semantic grey used for tags, badges, and disabled states.

```html
<span class="sgds:text-neutral-default">Neutral label</span>
```

## Common Patterns

### Form Validation States

```html
<!-- Success state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2">Email</label>
  <input class="sgds:border sgds:border-success-default sgds:p-2 sgds:rounded">
  <p class="sgds:text-success-default sgds:text-sm sgds:mt-1">Valid email address</p>
</div>

<!-- Error state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2">Password</label>
  <input class="sgds:border sgds:border-danger-default sgds:p-2 sgds:rounded">
  <p class="sgds:text-danger-default sgds:text-sm sgds:mt-1">Password is required</p>
</div>
```

### Alert Messages

```html
<!-- Success alert -->
<div class="sgds:bg-success-surface-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-success-default sgds:font-semibold sgds:mb-1">Success</p>
  <p class="sgds:text-success-default sgds:text-sm">Your changes have been saved.</p>
</div>

<!-- Warning alert -->
<div class="sgds:bg-warning-surface-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-warning-default sgds:font-semibold sgds:mb-1">Warning</p>
  <p class="sgds:text-warning-default sgds:text-sm">Please review your input.</p>
</div>

<!-- Error alert -->
<div class="sgds:bg-danger-surface-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-danger-default sgds:font-semibold sgds:mb-1">Error</p>
  <p class="sgds:text-danger-default sgds:text-sm">Something went wrong.</p>
</div>
```

### Status Indicators

```html
<div class="sgds:flex sgds:flex-col sgds:gap-2">
  <span class="sgds:text-success-default">● Online</span>
  <span class="sgds:text-warning-default">● Pending</span>
  <span class="sgds:text-danger-default">● Offline</span>
  <span class="sgds:text-neutral-default">● Unknown</span>
</div>
```

### Hero Section with Fixed Text

```html
<section class="sgds:bg-primary-default sgds:py-12 sgds:px-6">
  <h1 class="sgds:text-fixed-light sgds:text-4-xl sgds:font-bold sgds:mb-4">
    Welcome to SGDS
  </h1>
  <p class="sgds:text-fixed-light sgds:text-xl sgds:mb-6">
    Build better government digital services.
  </p>
  <button class="sgds:bg-white sgds:text-primary-default sgds:px-6 sgds:py-3 sgds:rounded">
    Get Started
  </button>
</section>
```

## Best Practices

- Use `sgds:text-{variant}-default` for standard states; `emphasis` for hover or active states — not both simultaneously.
- On colored or fixed-image backgrounds, use `text-fixed-light` or `text-fixed-dark` to guarantee contrast.
- Do not use semantic colors purely for visual variety — each variant carries meaning for assistive technology and users.
- SGDS component library (`<sgds-*>`) handles validation colors internally; apply these tokens only when building custom components.

## See Also

- **[base.md](base.md)** — Base text color tokens (default, muted, inverse, fixed)
- **[typography-roles.md](typography-roles.md)** — Role-based text tokens (heading, body, label, link)
- **[color-semantics](../color-semantics.md)** — Modifier definitions (default, emphasis, muted)
- **[background-color/semantic.md](../background-color/semantic.md)** — Matching semantic background tokens
