# SGDS Dimension Utilities

Helps developers constrain content area widths using SGDS container dimension tokens.

## Quick Decision Guide

| Situation | Use |
|-----------|-----|
| First-level content wrapper on a page or route | `sgds:w-container` |
| Inner section, card body, modal content, or any nested container | `sgds:max-w-container-*` |

---

## `sgds:w-container` — Responsive container

It is a responsive width token — the max-width value changes automatically across breakpoints.

| Breakpoint | Width |
|------------|-------|
| Mobile (default) | 360px |
| ≥ 1024px (lg) | 888px |
| ≥ 1440px (2xl) | 1312px |

```html
<!-- Correct: top-level page content container -->
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl">
  <!-- page content -->
</div>
```

Always pair with `sgds:mx-auto` to centre the container horizontally.

---

## `sgds:max-w-container-*` — Static max-width for nested containers

| Class | CSS Variable | Value |
|-------|-------------|-------|
| `sgds:max-w-container-md` | `--sgds-container-max-width-md` | 768px |
| `sgds:max-w-container-lg` | `--sgds-container-max-width-lg` | 888px |
| `sgds:max-w-container-xl` | `--sgds-container-max-width-xl` | 1168px |
| `sgds:max-w-container-2-xl` | `--sgds-container-max-width-2-xl` | 1312px |
| `sgds:max-w-container-3-xl` | `--sgds-container-max-width-3-xl` | 1440px |

**Default: use `sgds:max-w-container-md`** unless the design explicitly calls for a wider inner area.

```html
<!-- Correct: nested container inside a page section -->
<section class="sgds:py-2-xl">
  <div class="sgds:max-w-container-md sgds:mx-auto">
    <!-- section content -->
  </div>
</section>
```

---

## Common Patterns

### Page layout with responsive top-level container
```html
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl">
  <h1>Page title</h1>
  <p>Page content</p>
</div>
```

### Narrow form or dialog panel inside a wider layout
```html
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl">
  <div class="sgds:max-w-container-md sgds:mx-auto">
    <form>...</form>
  </div>
</div>
```

### Login / sign-in page (narrow centred card)
```html
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl sgds:flex sgds:justify-center">
  <div class="sgds:max-w-container-md sgds:w-full">
    <!-- login card -->
  </div>
</div>
```

---

## Rules

1. **`sgds:max-w-container-*` default is `md` (768px)** unless the design calls for a wider inner area.
2. Pair both with `sgds:mx-auto` if needed to centre them.
3. Do not apply both on the same element.
4. **Never use raw `sgds:max-w-*` utilities** (`sgds:max-w-sm`, `sgds:max-w-lg`, `sgds:max-w-2xl`, etc.) for container sizing. These map to small Tailwind numeric values (e.g. `max-w-2xl` = 672px) that are not part of the SGDS design system and will produce undersized containers.
