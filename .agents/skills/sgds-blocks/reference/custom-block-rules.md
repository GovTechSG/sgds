# Custom Block Rules

This file defines the guardrails for building custom UI blocks with SGDS. Users have full creative freedom over layout, composition, and visual hierarchy — these rules define the *implementation layer* that must stay consistent.

---

## The five non-negotiables

### 1. Use SGDS web components

When an SGDS component exists for a UI pattern, use it. Do not hand-roll equivalents.

| Pattern | Use this | Not this |
|---|---|---|
| Status label / chip | `<sgds-badge variant="success">` | `<span class="...">` |
| Dismissible notification | `<sgds-alert>` | `<div role="alert">` |
| Separator line | `<sgds-divider>` | `<hr>` |
| Navigation link | `<sgds-link>` | `<a class="...">` |
| Accessible button | `<sgds-button>` | `<button class="...">` |
| Icon | `<sgds-icon name="...">` | inline SVG or FontAwesome |
| Checkbox | `<sgds-checkbox>` | `<input type="checkbox">` |

For the full list of available components, see the [component index in the sgds-components skill](../../sgds-components/SKILL.md#available-components).

Plain HTML elements (`<div>`, `<section>`, `<article>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<img>`) are fine for layout and semantic structure where no SGDS component applies.

### 2. Style exclusively with `sgds:` Tailwind utilities

All colours, spacing, sizing, and layout must use the `sgds:` prefixed utilities. Do not write:
- Inline `style=""` attributes for values that tokens cover (colour, spacing, font size)
- Raw Tailwind classes without the `sgds:` prefix
- Custom CSS that duplicates token values

```html
<!-- Correct -->
<div class="sgds:flex sgds:gap-xl sgds:bg-surface-default sgds:p-layout-sm">

<!-- Wrong — raw Tailwind, no sgds: prefix -->
<div class="flex gap-6 bg-white p-8">

<!-- Wrong — inline style for token-covered values -->
<div style="display:flex; gap:24px; background:#ffffff; padding:32px;">
```

Inline `style=""` is acceptable only for values the token system genuinely doesn't cover, such as a specific `width` or `aspect-ratio` that has no token equivalent.

### 3. Use semantic typography role tokens

Typography must use semantic role tokens, not raw scale tokens.

**Correct tokens:**

| Role | Classes |
|---|---|
| Page/section heading | `sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight` on `<h3>` |
| Sub-heading | `sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight` on `<h4>` |
| Card/item title | `sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` on `<h5>` |
| Body copy | `sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal` on `<p>` |
| Secondary / caption | `sgds:text-body-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal` on `<p>` |
| Overline / label above heading | `sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` on `<div>` |
| UI label / button text | `sgds:text-label-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |

**Wrong — do not use:**
```html
<!-- Raw scale tokens are not in the public API -->
<p class="sgds:text-base">...</p>
<p class="sgds:text-sm">...</p>
<h2 class="sgds:text-2xl">...</h2>
```

See **[sgds-utilities typography](../../sgds-utilities/reference/typography.md)** for the complete typography reference.

### 4. Use semantic colour tokens

Always use semantic colour utilities, not primitive colour aliases.

```html
<!-- Correct — semantic tokens adapt to theme changes -->
<p class="sgds:text-body-default">...</p>
<p class="sgds:text-body-subtle">...</p>
<h2 class="sgds:text-heading-default">...</h2>
<div class="sgds:bg-surface-default">...</div>
<div class="sgds:bg-surface-raised">...</div>
<span class="sgds:text-primary-default">...</span>
```

See **[sgds-utilities text-color](../../sgds-utilities/reference/text-color.md)** and **[sgds-utilities background-color](../../sgds-utilities/reference/background-color.md)**.

### 5. Icons via `<sgds-icon>` only

```html
<!-- Correct -->
<sgds-icon name="arrow-right" size="sm"></sgds-icon>
<sgds-icon name="chevron-up" size="md"></sgds-icon>

<!-- Wrong -->
<svg>...</svg>
<i class="bi bi-arrow-right"></i>
<span class="material-icons">arrow_forward</span>
```

The `size` attribute accepts `xs`, `sm`, `md`, `lg`, `xl`. For icon names, reference the SGDS icon registry or the `<sgds-icon>` component skill.

---

## Using external design references

You're encouraged to draw inspiration from external block libraries:

- [shadcnblocks.com](https://www.shadcnblocks.com/blocks/about)
- [Tailwind UI](https://tailwindui.com)
- [HyperUI](https://www.hyperui.dev)
- Figma Community, Dribbble, etc.

**The process:**

1. Find a layout or composition you like
2. Re-implement the *structure* (flexbox/grid, spacing, hierarchy) using `sgds:` utilities
3. Replace any UI elements (badges, buttons, links, icons) with their `<sgds-*>` equivalents
4. Apply SGDS semantic colour and typography tokens — do not copy hex values or font sizes from the source

Do not copy-paste the source site's HTML or CSS directly. The only things that transfer are design decisions (layout, visual hierarchy, spacing proportions).

---

## Block checklist

Before considering a custom block complete, verify:

- [ ] No inline styles for colours, font sizes, spacing that tokens cover
- [ ] No raw Tailwind classes (without `sgds:` prefix) for design-system-owned properties
- [ ] No raw scale typography tokens (`sgds:text-base`, `sgds:text-sm`, `sgds:text-2xl`)
- [ ] No hand-rolled HTML where an SGDS component exists
- [ ] No inline SVG or third-party icon library — icons use `<sgds-icon>`
- [ ] Block has no page chrome (`<sgds-masthead>`, `<sgds-mainnav>`, `<sgds-footer>`)
- [ ] Semantic HTML elements used for structure (`<article>`, `<section>`, `<h2>`–`<h6>`, `<p>`, `<ul>`)
