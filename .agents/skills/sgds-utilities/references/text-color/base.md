# Base Text Colors Reference

Semantic base tokens provide a content hierarchy that adapts automatically to light/dark themes. Use these for general-purpose text when a specific role (heading, link, label) does not apply.

## Theme-Aware Tokens

### `sgds:text-default`
Primary text. Use for main body content and anything that needs to be clearly readable.

```html
<p class="sgds:text-default">
  Primary paragraph text that adapts to the active theme.
</p>
```

### `sgds:text-subtle`
Secondary/de-emphasised text. Use for captions, helper text, descriptions.

```html
<p class="sgds:text-subtle sgds:text-sm">
  Last updated 3 hours ago
</p>
```

### `sgds:text-muted`
Tertiary/low-contrast text. Use for metadata, timestamps, placeholders, and decorative labels.

```html
<span class="sgds:text-muted sgds:text-xs">
  Optional
</span>
```

### `sgds:text-inverse`
For text displayed on inverted (dark) surfaces rendered by `sgds:bg-surface-inverse`.

```html
<div class="sgds:bg-surface-inverse sgds:p-4 sgds:rounded">
  <p class="sgds:text-inverse">
    Text on an inverted background.
  </p>
</div>
```

## Fixed Tokens

Fixed tokens do not change with the theme — use them when the background color is also fixed.

### `sgds:text-fixed-light`
Always renders as a light color. Use on fixed dark backgrounds (e.g., a brand-colored hero section).

```html
<section class="sgds:bg-primary-default sgds:py-12 sgds:px-6">
  <h1 class="sgds:text-fixed-light sgds:text-4-xl sgds:font-bold">
    Welcome to SGDS
  </h1>
  <p class="sgds:text-fixed-light sgds:text-xl">
    Build better government digital services.
  </p>
</section>
```

### `sgds:text-fixed-dark`
Always renders as a dark color. Use on fixed light backgrounds (e.g., a white card or light image overlay).

```html
<div class="sgds:bg-fixed-light sgds:p-6">
  <p class="sgds:text-fixed-dark">
    Always dark text regardless of active theme.
  </p>
</div>
```

## When to Use Fixed vs Theme-Aware

| Scenario | Token |
|---|---|
| Normal body text on page background | `sgds:text-default` |
| Background is `sgds:bg-surface-inverse` | `sgds:text-inverse` |
| Background is a colored brand fill (`sgds:bg-primary-default`) | `sgds:text-fixed-light` |
| Background is always white (images, light cards) | `sgds:text-fixed-dark` |
| You need it to work in both themes | Avoid `fixed` — use `default` / `subtle` / `muted` |

## Content Hierarchy Pattern

```html
<article class="sgds:p-6">
  <h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-bold sgds:mb-2">
    Article Title
  </h2>
  <p class="sgds:text-muted sgds:text-sm sgds:mb-4">
    Published on 1 January 2024
  </p>
  <p class="sgds:text-default sgds:mb-4">
    Main article body copy rendered in the primary text color.
  </p>
  <p class="sgds:text-subtle sgds:text-sm">
    Supporting note or footnote content.
  </p>
</article>
```

## Theme Switching

Text colors using theme-aware tokens update automatically:

```html
<button id="theme-toggle">Toggle Theme</button>

<script>
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('sgds-theme-night');
  });
</script>
```

## Best Practices

- Prefer semantic base tokens over hardcoded hex values.
- Use `fixed` variants only when the background is also fixed and guaranteed.
- Do not mix `fixed-light` text with a theme-aware background — contrast is not guaranteed.
- Avoid `sgds:text-muted` for important content; it is intentionally low-contrast.

## See Also

- **[semantic.md](semantic.md)** — Semantic text colors (primary, accent, success, danger, warning, purple, cyan, neutral)
- **[typography-roles.md](typography-roles.md)** — Role-based text tokens (heading, body, label, link)
- **[color-semantics](../color-semantics.md)** — Modifier definitions
