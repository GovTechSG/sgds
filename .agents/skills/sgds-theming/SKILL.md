---
name: "sgds-theming"
description: "Use when users ask about changing the primary colour, theming their app, enabling dark mode, night mode, overriding CSS tokens, customising the font, compact/spacious density, or border radius. Customising the visual theme of an SGDS application — product brand colours, day/night mode, font, border radius, and spacing density."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: theming
---

# SGDS Theming Skill

How to customise the product theme — brand colours, day/night mode, font, border radius, and spacing density — using SGDS CSS token overrides.

---

## Prerequisites

Import `themes/day.css` before your custom CSS. See **[sgds-getting-started](../sgds-getting-started/SKILL.md)** for the full import order.

---

## Quick Decision Guide

| What you want to change | Token / mechanism | Reference |
|-------------------------|-------------------|-----------|
| Product brand colour (custom) | Override `--sgds-product-primary-{100–900}` | [brand-colour.md](references/brand-colour.md) |
| Product brand colour (GovTech) | Import one `themes/gt/<colour>.css` + map to `--sgds-product-primary-*` | [brand-colour.md](references/brand-colour.md) |
| Enable dark/night mode | Import `themes/night.css` + add `.sgds-night-theme` to `<html>` | See below |
| Font typeface (all roles) | Override `--sgds-font-family-brand` | [typography.md](references/typography.md) |
| Font typeface (per role) | Override individual `--sgds-font-family-{display,heading,subtitle,body,label,code}` | [typography.md](references/typography.md) |
| Border radius | Override semantic `--sgds-{purpose}-border-radius` tokens | [border-radius.md](references/border-radius.md) |
| Spacing density (compact/spacious) | Import `themes/density/compact.css` or `spacious.css` | [density.md](references/density.md) |

---

## Changing the Product Brand Colour

The default product colour is purple (`--sgds-product-primary-*`). Override the full 100–900 scale with your brand colour to retheme all primary UI elements at once.

Create a custom CSS file and override the primitive tokens in `:root`:

```css
/* yourCustomCss.css */
:root {
  --sgds-product-primary-100: #F5B6DA;
  --sgds-product-primary-200: #F186C0;
  --sgds-product-primary-300: #EE4FA6;
  --sgds-product-primary-400: #EE0290;
  --sgds-product-primary-500: #EF0078;
  --sgds-product-primary-600: #DD0074;
  --sgds-product-primary-700: #C6006E;
  --sgds-product-primary-800: #B0006A;
  --sgds-product-primary-900: #880061;
}
```

Import your custom CSS **after** the SGDS theme file so the overrides take effect:

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "./yourCustomCss.css";
```

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "./yourCustomCss.css";
```

The semantic tokens (`--sgds-primary-*`) reference the primitive scale, so changing the primitive values automatically flows through to all components that use the primary colour.

---

## GovTech Brand Colours

GovTech products should use one of the pre-approved colour palettes in `themes/gt/` rather than defining custom hex values. Each product picks **exactly one** colour — mixing multiple GT palettes is not allowed.

### Available colours

| File | Colour |
|------|--------|
| `themes/gt/blue.css` | Blue |
| `themes/gt/cyan.css` | Cyan |
| `themes/gt/magenta.css` | Magenta |
| `themes/gt/pink.css` | Pink |
| `themes/gt/purple.css` | Purple |
| `themes/gt/red.css` | Red |

### How to apply

Each GT file defines `--gt-color-100` through `--gt-color-900` in `:root`. Map those onto the SGDS product primary scale in your custom CSS file:

```css
/* yourCustomCss.css */
:root {
  --sgds-product-primary-100: var(--gt-color-100);
  --sgds-product-primary-200: var(--gt-color-200);
  --sgds-product-primary-300: var(--gt-color-300);
  --sgds-product-primary-400: var(--gt-color-400);
  --sgds-product-primary-500: var(--gt-color-500);
  --sgds-product-primary-600: var(--gt-color-600);
  --sgds-product-primary-700: var(--gt-color-700);
  --sgds-product-primary-800: var(--gt-color-800);
  --sgds-product-primary-900: var(--gt-color-900);
}
```

Import order — the GT file must come before your custom CSS so the `--gt-color-*` variables are defined when the mapping runs:

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/themes/gt/blue.css"; // pick one colour only
import "./yourCustomCss.css";
```

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/gt/blue.css"; /* pick one colour only */
@import "./yourCustomCss.css";
```

The same flow-through behaviour applies: changing `--sgds-product-primary-*` automatically updates all components that use the primary colour.

---

## Day Mode (Default)

Day mode is the default. Importing `themes/day.css` is all that is needed — no extra configuration required.

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
```

---

## Night Mode (Optional)

Night mode is opt-in. It is applied by adding the class `sgds-night-theme` to the `<html>` element, which activates the `:root.sgds-night-theme` selector defined in `themes/night.css`.

### Setup

Import both theme files:

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/themes/night.css";
```

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";
```

### Activating night mode

Add the class to the `<html>` element to switch all tokens to their dark equivalents:

```html
<html class="sgds-night-theme">
```

Toggle it at runtime via JavaScript:

```js
document.documentElement.classList.toggle("sgds-night-theme");
```

### How it works

`themes/night.css` redefines the same semantic tokens as `themes/day.css` but scoped to `:root.sgds-night-theme`. All SGDS components read from the same semantic tokens, so toggling the class switches the entire UI without changing any component markup.

---

## Changing the Font

SGDS uses **Inter** by default via `--sgds-font-family-brand`. Override this token to use a different typeface:

```css
:root {
  --sgds-font-family-brand: "Your Font", system-ui, sans-serif;
}
```

You are responsible for loading the font assets — either via a `<link>` tag or `@font-face`. SGDS does not load custom fonts automatically. See **[sgds-getting-started](../sgds-getting-started/SKILL.md)** for the optimised Inter Google Fonts URL if you are keeping the default font.

---

## Changing the Border Radius

See **[border-radius.md](references/border-radius.md)** for the full reference — semantic token table, override examples, and available primitive values.

---

## Changing the Spacing Density

See **[density.md](references/density.md)** for the full reference — density modes, token tables, affected components, and import order.

---

## For AI Agents

1. Always tell users to import their custom CSS **after** `themes/day.css` — otherwise the override will be overwritten.
2. Brand colour overrides target **primitive** tokens (`--sgds-product-primary-{100–900}`), not semantic tokens. Changing the primitives is the correct approach; do not override individual semantic tokens directly.
3. Night mode requires **both** the `themes/night.css` import **and** the `sgds-night-theme` class on `<html>`. Either alone is not enough.
4. Night mode is **optional** — only add `themes/night.css` when the user explicitly needs dark mode support.
5. Day mode is always active by default; there is no `sgds-day-theme` class to add.
6. When overriding `--sgds-font-family-brand`, remind the user to also load the font file themselves.
7. Custom overrides apply to both day and night mode simultaneously because they target `:root`, which both theme selectors inherit from.
8. For brand colour theming, read [brand-colour.md](references/brand-colour.md).
9. For typography/font theming, read [typography.md](references/typography.md).
10. For border radius theming, read [border-radius.md](references/border-radius.md). Override **semantic** tokens (`--sgds-{purpose}-border-radius`), referencing primitive values via `var(--sgds-border-radius-{size})`.
11. For density theming, read [density.md](references/density.md). Import **one** density file (`compact.css` or `spacious.css`) after the colour theme. Density affects padding and gap only — not font sizes, colours, or border radii.
