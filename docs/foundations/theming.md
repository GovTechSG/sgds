---
layout: docs
title: Theming
description: Customise SGDS primitive and semantic tokens at the `:root` level to theme the whole system.
---

<script setup>
const overrideCss = `:root {
  --sgds-product-primary-100: #F5B6DA;
  --sgds-product-primary-200: #F186C0;
  --sgds-product-primary-300: #EE4FA6;
  --sgds-product-primary-400: #EE0290;
  --sgds-product-primary-500: #EF0078;
  --sgds-product-primary-600: #DD0074;
  --sgds-product-primary-700: #C6006E;
  --sgds-product-primary-800: #B0006A;
  --sgds-product-primary-900: #880061;
}`;

const importOrder = `import "@govtechsg/sgds-web-component/themes/day.css";
// import your custom css after themes/day.css
import "./yourCustomCss.css";`;

const cssVar = `sgds-sidenav {
  --sidenav-theme-color: pink;
}`;

const cssPart = `sgds-footer::part(footer-bottom) {
  background-color: grey;
  font-family: "Times New Roman", Times, serif;
  border: 10px dotted red;
}`;
</script>

## Global styles and theming

Customise the styles at the `:root` level by overriding the values of CSS tokens defined in `@govtechsg/sgds-web-component/themes/day.css`. This file contains the primitive and semantic CSS tokens. For system-level UI changes, we encourage you to make primitive and semantic level style changes at the `:root` rather than component-specific changes.

<CopyCommand :command="overrideCss" />

Import your custom CSS **after** the SGDS theme so your overrides take effect:

<CopyCommand :command="importOrder" />

## Theme files

The following theme files live under `@govtechsg/sgds-web-component/themes/`. You can override any token defined in them.

### `root.css`

Primitive and semantic values. These are the tokens every component and utility ultimately resolves to.

### `day.css`

Light-mode theme. Applied by default when the SGDS theme is imported.

### `night.css`

Dark-mode theme. Applied when the `.sgds-night-theme` class is added to the `<html>` element.

## Component-specific styles

> Work in progress — this section will expand as more components expose styling hooks.

Some components expose CSS custom properties or `::part` hooks for scoped styling. Where available, the per-component docs list them.

### CSS custom properties

Some components define their own CSS custom properties for selected aspects of the shadow DOM:

<CopyCommand :command="cssVar" />

### `::part` selectors

Some components expose `::part` hooks on selected elements of the shadow DOM:

<CopyCommand :command="cssPart" />
