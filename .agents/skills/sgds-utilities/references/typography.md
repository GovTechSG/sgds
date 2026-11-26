# SGDS Typography Utilities Skill

Helps developers apply consistent text weights, letter spacing, and font families using SGDS typography utilities.

## Core Concept

All SGDS typography utilities use the `sgds:` prefix. The main properties:

- **Font weight** — `sgds:font-{weight}` (light / regular / semibold / bold)
- **Letter spacing** — `sgds:tracking-{size}` (tighter / tight / normal / wide / wider)
- **Font family** — `sgds:font-{role}` (brand / display / heading / subtitle / body / label / code)

**Visual size is independent of HTML semantics.** Typography size classes are purely visual and can be applied to any HTML element. A `<span>` can use `sgds:text-display-lg` and an `<h1>` can use `sgds:text-body-sm` — the design system does not enforce a relationship between element type and font size. The default reboot maps `h1`–`h6` from large to small for convenience, but users are free to apply any size token to any element. HTML heading levels (`h1`–`h6`) should still follow sequential order for accessibility, regardless of visual size.

## Letter Spacing by Role

| Role | Tracking |
|------|----------|
| Display | `sgds:tracking-tighter` |
| Headings (H1–H4) | `sgds:tracking-tight` |
| Subtitles | `sgds:tracking-normal` |
| Overline | `sgds:tracking-wide` |
| Body, labels, captions | no class needed (normal is default) |

## Quick Decision Guide

**Styling a display heading?**

Default used on `<h1>`, but can be applied to any element.

| Variant | Classes |
|---------|---------|
| Display Large Bold | `sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter` |
| Display Large Light | `sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter` |
| Display Medium Bold *(default)* | `sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter` |
| Display Medium Light | `sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter` |
| Display Small Bold | `sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter` |
| Display Small Light | `sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter` |

**Styling a section heading (H1–H4)?**

| Variant | Element | Classes |
|---------|---------|---------|
| Heading XL Bold | `<h1>` | `sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight` |
| Heading XL Light | `<h1>` | `sgds:text-heading-xl sgds:font-light sgds:leading-xl sgds:tracking-tight` |
| Heading LG Bold | `<h2>` | `sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight` |
| Heading LG Light | `<h2>` | `sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight` |
| Heading MD Semibold *(default)* | `<h3>` | `sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight` |
| Heading MD Light | `<h3>` | `sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight` |
| Heading SM Semibold | `<h4>` | `sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight` |
| Heading SM Light | `<h4>` | `sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight` |

**Styling a subtitle (H5–H6)?**

| Variant | Element | Classes |
|---------|---------|---------|
| Subtitle LG Semibold | `<h4>` | `sgds:text-subtitle-lg sgds:font-semibold sgds:leading-sm sgds:tracking-tight` |
| Subtitle LG Light | `<h4>` | `sgds:text-subtitle-lg sgds:font-light sgds:leading-sm sgds:tracking-tight` |
| Subtitle MD Semibold *(default)* | `<h5>` | `sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| Subtitle MD Light | `<h5>` | `sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal` |
| Subtitle SM Semibold | `<h6>` | `sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| Subtitle SM Light | `<h6>` | `sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal` |

**Styling body content?**

Default used on `<p>`, but can be applied to any element.

| Variant | Classes |
|---------|---------|
| Body Large Semibold | `sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:mb-paragraph-xl` |
| Body Large Regular | `sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:mb-paragraph-xl` |
| Body Medium Semibold | `sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-paragraph-lg` |
| Body Medium Regular *(default)* | `sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:mb-paragraph-lg` |
| Body Small Semibold | `sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-lg` |
| Body Small Regular | `sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-lg` |

**Styling a list (ordered or unordered)?**

Use `<ul>` or `<ol>`. Apply tokens to both the list element and each `<li>`. Use `sgds:my-list-*` for spacing between items; last item uses `sgds:mt-list-*` only.

| Variant | Classes |
|---------|---------|
| List Large Regular | `sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg` |
| List Medium Regular *(default)* | `sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:my-list-md` |
| List Small Regular | `sgds:text-list-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:my-list-sm` |

**Styling a form label or UI label?**

In form context: prefer the component's built-in `label` attribute. Use `<label>` only if the component has no built-in label support. Outside form context: use `<div>`.

| Variant | Classes |
|---------|---------|
| Label LG Semibold | `sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal` |
| Label LG Regular | `sgds:text-label-lg sgds:leading-md sgds:tracking-normal` |
| Label MD Semibold | `sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| Label MD Regular *(default)* | `sgds:text-label-md sgds:leading-xs sgds:tracking-normal` |
| Label MD Light | `sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal` |
| Label SM Semibold | `sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| Label SM Regular | `sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal` |
| Label XS Semibold | `sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal` |
| Label XS Regular | `sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal` |

**Styling a caption or helper text?**

Use `<div>`.

| Variant | Classes |
|---------|---------|
| Caption Semibold | `sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-md` |
| Caption Regular *(default)* | `sgds:text-caption-md sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-md` |

**Styling an overline?**

Always use `<div>` with `sgds:uppercase`.

| Variant | Classes |
|---------|---------|
| Overline Semibold | `sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |
| Overline Regular *(default)* | `sgds:text-overline-md sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |

**Styling a link?**

Always use `<a href="...">`. All link patterns include underline.

| Variant | Classes |
|---------|---------|
| Link Large | `sgds:text-link-lg sgds:leading-md sgds:tracking-normal sgds:underline` |
| Link Medium *(default)* | `sgds:text-link-md sgds:leading-xs sgds:tracking-normal sgds:underline` |
| Link Small | `sgds:text-link-sm sgds:leading-2-xs sgds:tracking-normal sgds:underline` |
| Link XS | `sgds:text-link-xs sgds:leading-3-xs sgds:tracking-normal sgds:underline` |

**Styling code?**

Always apply `sgds:font-code` to `<code>` and `<pre>`.

```html
<code class="sgds:font-code sgds:text-label-md">inline code</code>
<pre class="sgds:font-code sgds:text-label-md sgds:leading-xs">block code</pre>
```

## Font Family Utilities

Each typographic role has a dedicated font-family utility class that maps to a semantic `--sgds-font-family-*` token. These allow theming by overriding the token in `:root`.

| Utility | CSS Variable | Default |
|---------|-------------|---------|
| `sgds:font-brand` | `--sgds-font-family-brand` | `var(--sgds-font-family-sans)` |
| `sgds:font-display` | `--sgds-font-family-display` | `var(--sgds-font-family-brand)` |
| `sgds:font-heading` | `--sgds-font-family-heading` | `var(--sgds-font-family-brand)` |
| `sgds:font-subtitle` | `--sgds-font-family-subtitle` | `var(--sgds-font-family-brand)` |
| `sgds:font-body` | `--sgds-font-family-body` | `var(--sgds-font-family-brand)` |
| `sgds:font-label` | `--sgds-font-family-label` | `var(--sgds-font-family-brand)` |
| `sgds:font-code` | `--sgds-font-family-code` | `var(--sgds-font-family-mono)` |

### When to use

- The reboot already assigns the correct font-family to native elements (`h1`–`h6`, `p`, `a`, `label`, `code`), so **no class is needed** when using semantic HTML.
- Use `sgds:font-{role}` when an element's font-family doesn't match its visual role — e.g. a `<div>` styled as a heading needs `sgds:font-heading`.

## Reference Documentation

| File | Covers |
|------|--------|
| [`type-properties.md`](typography/type-properties.md) | Full scale tables for all six type properties and usage rules |
| [`patterns.md`](typography/patterns.md) | HTML patterns for all content types |

---

**For AI Agents**: Typography size classes are purely visual and can be applied to any element — do not assume a fixed mapping between HTML element and font size (e.g. display classes are not restricted to `<h1>`). However, heading levels (`h1`–`h6`) must still follow sequential order for accessibility. Apply tracking by role: display → `tracking-tighter`, headings → `tracking-tight`, subtitles → `tracking-normal`, overlines → `tracking-wide`. Always apply `sgds:font-code` to `<code>` and `<pre>`. Use `sgds:font-{role}` only on non-semantic elements; semantic HTML (`h1`–`h6`, `p`, `a`, `label`, `code`) gets the correct font-family from the reboot. See reference files for full property tables.

