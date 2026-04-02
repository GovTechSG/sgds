---
name: "sgds-theming"
description: "Customising the visual theme of an SGDS application — product brand colours, day/night mode, and font. Use when users ask about changing the primary colour, theming their app, enabling dark mode, night mode, overriding CSS tokens, or customising the font. Apply this skill whenever theming, branding, or CSS token overrides are mentioned."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: theming
---

# SGDS Theming Skill

How to customise the product theme — brand colours, day/night mode, and font — using SGDS CSS token overrides.

---

## Prerequisites

Import `themes/day.css` before your custom CSS. See **[sgds-getting-started](../sgds-getting-started/SKILL.md)** for the full import order.

---

## Quick Decision Guide

| What you want to change | Token / mechanism |
|-------------------------|-------------------|
| Product brand colour | Override `--sgds-product-primary-{100–900}` |
| Enable dark/night mode | Import `themes/night.css` + add `.sgds-night-theme` to `<html>` |
| Font typeface | Override `--sgds-font-family-brand` |

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

## For AI Agents

1. Always tell users to import their custom CSS **after** `themes/day.css` — otherwise the override will be overwritten.
2. Brand colour overrides target **primitive** tokens (`--sgds-product-primary-{100–900}`), not semantic tokens. Changing the primitives is the correct approach; do not override individual semantic tokens directly.
3. Night mode requires **both** the `themes/night.css` import **and** the `sgds-night-theme` class on `<html>`. Either alone is not enough.
4. Night mode is **optional** — only add `themes/night.css` when the user explicitly needs dark mode support.
5. Day mode is always active by default; there is no `sgds-day-theme` class to add.
6. When overriding `--sgds-font-family-brand`, remind the user to also load the font file themselves.
7. Custom overrides apply to both day and night mode simultaneously because they target `:root`, which both theme selectors inherit from.
