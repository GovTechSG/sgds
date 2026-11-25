# Nuxt Integration

Nuxt uses [nuxt-ssr-lit](https://github.com/nicoth-in/nuxt-ssr-lit) to SSR Lit-based web components like SGDS.

## Install

```bash
npm i @govtechsg/sgds-web-component nuxt-ssr-lit
```

## Configure `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [["nuxt-ssr-lit", { litElementPrefix: ["sgds-"] }]],

  css: ["~/assets/css/main.css"],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("sgds-"),
    },
  },

  nitro: {
    moduleSideEffects: ["@govtechsg/sgds-web-component"],
    externals: {
      inline: [
        "@lit-labs/ssr",
        "@lit-labs/ssr-client",
        "@lit-labs/ssr-dom-shim",
        "lit",
        "lit-element",
        "lit-html",
        "@lit/reactive-element",
        "parse5",
        "entities",
      ],
    },
  },

  alias: {
    tslib: "tslib/tslib.es6.js",
  },
});
```

### Why `nitro.externals.inline` is needed

Nitro externalises server dependencies by default. Lit and its SSR modules use ESM imports that break when externalised in the production server bundle. Inlining them ensures correct module resolution at runtime.

### CSS entry point

Create `assets/css/main.css`:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/css/sgds.css";
```

## Usage

Use SGDS components directly in Vue templates — no wrappers needed:

```html
<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Button/index.js";
</script>

<template>
  <sgds-button variant="primary">Click me</sgds-button>
</template>
```
