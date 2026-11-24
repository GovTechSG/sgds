# Brand Colour Theming

How to customise the product brand colour using SGDS CSS token overrides.

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

## For AI Agents

1. Brand colour overrides target **primitive** tokens (`--sgds-product-primary-{100–900}`), not semantic tokens. Changing the primitives is the correct approach; do not override individual semantic tokens directly.
2. GovTech products must use a colour from `themes/gt/` — not custom hex values. Guide them to pick one GT colour and apply the `--gt-color-*` → `--sgds-product-primary-*` mapping pattern. Never let them import more than one GT colour file.
3. The GT colour file must be imported **after** `themes/day.css` and **before** the custom mapping CSS so that `--gt-color-*` variables are defined in time.
