---
name: "sgds-utilities"
description: "Use when users ask about SGDS utility classes with the sgds: prefix — setup, background-color, text-color, border-color, border-width, border-radius, typography, spacing, grid, dimension, opacity, color-semantics, or any sgds: Tailwind utility class. Complete reference also covering Tailwind v4 imports, theme switching, and framework integration for utilities."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: utilities
---

# SGDS Utilities

The **Utilities API** — a set of atomic classes powered by Tailwind v4, scoped under the `sgds:` prefix. Developers apply SGDS design decisions directly in markup using this syntax rather than writing custom CSS.

## Core Concept: sgds: Prefix

All SGDS utility classes use the `sgds:` prefix (Tailwind v4 @theme syntax):

```html
<!-- ✅ Correct -->
<div class="sgds:p-4 sgds:bg-primary-default sgds:text-white">Content</div>

<!-- ❌ Wrong - missing prefix -->
<div class="p-4 bg-primary-default text-white">Content</div>
```

## Required Setup

### Import Utility CSS

`utility.css` is a **Tailwind source file** — it contains Tailwind v4 directives (`@theme`, `@import "tailwindcss/theme.css"`) that must be processed by Tailwind's build pipeline. It cannot be imported directly in JavaScript.

**Import it inside your project's main CSS file** (the one Tailwind processes):

```css
/* e.g. globals.css, index.css, main.css */
@import "@govtechsg/sgds-web-component/css/utility.css";
```

Tailwind will resolve and process the nested imports at build time, generating all `sgds:` utility classes.

**Without this import, utility classes will not work.**

## Optional: Theme Setup

For theme-aware utilities that adapt to light/dark mode (background colors, text colors, border colors), import the theme files in your project's CSS file:

```css
/* e.g. globals.css, index.css, main.css */
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";
```

### When Theme Setup is Required

Import theme files when using:

- **Background colors**: `sgds:bg-surface-default`, `sgds:bg-primary-default`, etc.
- **Text colors**: `sgds:text-default`, `sgds:text-primary-default`, etc.
- **Border colors**: `sgds:border-default`, `sgds:border-primary-default`, etc.

### When Theme Setup is Optional

Theme files are NOT required for:

- **Spacing**: `sgds:p-4`, `sgds:m-2`, `sgds:gap-6`
- **Typography sizing**: `sgds:text-xl`, `sgds:font-bold`
- **Border radius**: `sgds:rounded-lg`
- **Opacity**: `sgds:opacity-50`
- **Layout**: `sgds:flex`, `sgds:grid`

## Theme Switching

To toggle between light and dark themes programmatically:

```html
<button id="theme-toggle">Toggle Theme</button>

<script>
  const toggleButton = document.getElementById("theme-toggle");
  toggleButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("sgds-theme-night");
  });
</script>
```

Classes with theme-aware tokens automatically update when the theme changes.

## Verification

Test that setup is complete:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- processed by your Tailwind build -->
  </head>
  <body class="sgds:bg-default sgds:p-6">
    <div class="sgds:bg-surface-raised sgds:p-4 sgds:rounded-lg">
      <h1 class="sgds:text-heading-default sgds:text-2-xl sgds:font-bold sgds:mb-4">Setup Test</h1>
      <p class="sgds:text-body-default sgds:mb-4">If this text is styled correctly, your setup is complete.</p>
      <button
        class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded"
        onclick="document.documentElement.classList.toggle('sgds-theme-night')"
      >
        Toggle Theme
      </button>
    </div>
  </body>
</html>
```

## Framework-Specific Setup

Since SGDS utilities are built on Tailwind v4, you must first set up Tailwind CSS for your framework before importing the SGDS CSS files.

**Step 1**: Follow the Tailwind CSS guide for your framework:

| Framework      | Guide                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Next.js        | https://tailwindcss.com/docs/installation/framework-guides/nextjs       |
| Nuxt (Vue)     | https://tailwindcss.com/docs/installation/framework-guides/nuxt         |
| Angular        | https://tailwindcss.com/docs/installation/framework-guides/angular      |
| SvelteKit      | https://tailwindcss.com/docs/installation/framework-guides/sveltekit    |
| Astro          | https://tailwindcss.com/docs/installation/framework-guides/astro        |
| Gatsby         | https://tailwindcss.com/docs/installation/framework-guides/gatsby       |
| React Router   | https://tailwindcss.com/docs/installation/framework-guides/react-router |
| Vite (generic) | https://tailwindcss.com/docs/installation/using-vite                    |

Not listed? See the full list at https://tailwindcss.com/docs/installation/framework-guides.

**Step 2**: After Tailwind is set up, add the SGDS `@import` to the same CSS file that Tailwind processes (usually `globals.css`, `main.css`, or `index.css`):

```css
@import "@govtechsg/sgds-web-component/css/utility.css";

/* Optional: theme-aware color tokens */
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";
```

---

## Available Utilities

| Category       | Utility                                                                          | Theme files required | Reference                                                          |
| -------------- | -------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------ |
| **Layout**     | Grid system (`.sgds-container`, `.sgds-grid`, `.sgds-col-*`)                     | No                   | [→ references/grid.md](references/grid.md)                           |
| **Layout**     | Container dimensions (`sgds:w-container`, `sgds:max-w-container-*`)              | No                   | [→ references/dimension.md](references/dimension.md)                 |
| **Spacing**    | Margin, padding, gap (`sgds:p-*`, `sgds:m-*`, `sgds:gap-*`, semantic tokens)     | No                   | [→ references/spacing.md](references/spacing.md)                     |
| **Color**      | Color token suffix semantics (default, emphasis, muted, fixed, etc.)             | —                    | [→ references/color-semantics.md](references/color-semantics.md)     |
| **Color**      | Background colors (`sgds:bg-*`)                                                  | Yes                  | [→ references/background-color.md](references/background-color.md)   |
| **Color**      | Text colors (`sgds:text-*`)                                                      | Yes                  | [→ references/text-color.md](references/text-color.md)               |
| **Color**      | Border colors (`sgds:border-*` color)                                            | Yes                  | [→ references/border-color.md](references/border-color.md)           |
| **Border**     | Border width and sides (`sgds:border`, `sgds:border-2`, `sgds:border-l-4`, etc.) | No                   | [→ references/border-width.md](references/border-width.md)           |
| **Border**     | Border radius (`sgds:rounded-*`, `sgds:rounded-form-*`)                          | No                   | [→ references/border-radius.md](references/border-radius.md)         |
| **Typography** | Font size, weight, line height, letter spacing, font family                      | No                   | [→ references/typography.md](references/typography.md)               |
| **Visual**     | Opacity (`sgds:opacity-*`)                                                       | No                   | [→ references/opacity.md](references/opacity.md)                     |
| **Visual**     | Elevation / box shadows (`sgds:shadow-*`, `sgds:shadow-edge-*`)                  | No                   | [→ references/elevation.md](references/elevation.md)                 |
| **Responsive** | Breakpoint prefixes (`sgds:xs:`, `sgds:sm:`, `sgds:md:`, `sgds:lg:`, `sgds:xl:`, `sgds:2-xl:`) | No                   | [→ references/breakpoint.md](references/breakpoint.md)               |
| **Patterns**   | Cross-category component patterns (card, alert, form, modal)                     | —                    | [→ references/overview-patterns.md](references/overview-patterns.md) |

---

## Quick Reference by Use Case

**Page layout, columns, responsive grid** → [references/grid.md](references/grid.md)
**Container width, max-width** → [references/dimension.md](references/dimension.md)
**Spacing between sections, components, text** → [references/spacing.md](references/spacing.md)
**Color token suffixes (default, emphasis, muted, etc.)** → [references/color-semantics.md](references/color-semantics.md)
**Card backgrounds, surface colors** → [references/background-color.md](references/background-color.md)
**Text content colors** → [references/text-color.md](references/text-color.md)
**Borders and rounded corners** → [references/border-color.md](references/border-color.md), [references/border-width.md](references/border-width.md), [references/border-radius.md](references/border-radius.md)
**Headings, body text, font sizes** → [references/typography.md](references/typography.md)
**Transparent overlays, disabled states** → [references/opacity.md](references/opacity.md)
**Card shadows, modal depth, sticky header/footer edges** → [references/elevation.md](references/elevation.md)
**Responsive breakpoints, show/hide at viewport sizes** → [references/breakpoint.md](references/breakpoint.md)

---

**For AI Agents**:

1. Always verify users have completed setup (utility CSS import) before suggesting utility classes.
2. Theme files (`day.css`, `night.css`) are only needed for color utilities (background, text, border colors) — not for spacing, typography, border radius, or opacity.
3. When users ask about a specific utility category, read the corresponding reference file before generating output.
4. The grid system (`.sgds-container`, `.sgds-grid`, `.sgds-col-*`) is always preferred over generic Tailwind `sgds:grid-cols-*` — see `references/grid.md`.
5. Prefer semantic spacing utilities (`sgds:gap-layout-*`, `sgds:p-component-*`) over raw numeric utilities (`sgds:p-4`, `sgds:gap-6`) — they are responsive and encode design intent.
6. Prefer semantic font-size utilities (`sgds:text-display-*`, `sgds:text-heading-*`, `sgds:text-body-*`) over raw scale utilities — they are responsive.
7. Color suffix modifiers (`default`, `emphasis`, `muted`, `surface`, `fixed-light`, `fixed-dark`, `inverse`) are shared across all color utilities — see `references/color-semantics.md`.
8. **Never use inline `style` attributes.** If a layout or visual property is needed, find the equivalent `sgds:` utility class. If no utility class exists for the exact value, prefer the closest semantic utility. Only resort to a CSS custom property override as a last option, and never via a `style` attribute.
9. **Never use raw `sgds:max-w-*` utilities for container sizing.** Raw classes like `sgds:max-w-2xl`, `sgds:max-w-lg`, `sgds:max-w-sm` map to small Tailwind numeric values and are not part of the SGDS design system. Use `sgds:max-w-container-*` (md/lg/xl/2-xl/3-xl) for inner containers, or `sgds:w-container` for the top-level page wrapper. See `references/dimension.md`.
