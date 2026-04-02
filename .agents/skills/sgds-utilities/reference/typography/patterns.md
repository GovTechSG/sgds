# Typography Patterns Reference

Common HTML patterns combining SGDS typography utilities for real-world content types.

> **Note**: Use library components like `<sgds-button>`, `<sgds-badge>` when available.
> These patterns are for custom components when library components don't meet your needs.

---

## Display Headings (Hero Text)

```html
<!-- sgds-display-lg-bold -->
<h1 class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter">
  Display Large Bold
</h1>

<!-- sgds-display-lg-light -->
<h1 class="sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter">
  Display Large Light
</h1>

<!-- sgds-display-md-bold (Default) -->
<h1 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter">
  Display Medium Bold
</h1>

<!-- sgds-display-md-light -->
<h1 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter">
  Display Medium Light
</h1>

<!-- sgds-display-sm-bold -->
<h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter">
  Display Small Bold
</h1>

<!-- sgds-display-sm-light -->
<h1 class="sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter">
  Display Small Light
</h1>
```

**When to use:** Page heroes, marketing banners, splash screens.

---

## Section Headings (H1–H4)

```html
<!-- sgds-heading-xl-bold -->
<h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight">
  Heading XL Bold
</h1>

<!-- sgds-heading-xl-light -->
<h1 class="sgds:text-heading-xl sgds:font-light sgds:leading-xl sgds:tracking-tight">
  Heading XL Light
</h1>

<!-- sgds-heading-lg-bold -->
<h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">
  Heading Large Bold
</h2>

<!-- sgds-heading-lg-light -->
<h2 class="sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight">
  Heading Large Light
</h2>

<!-- sgds-heading-md-semibold (Default) -->
<h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">
  Heading Medium Semibold
</h3>

<!-- sgds-heading-md-light -->
<h3 class="sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight">
  Heading Medium Light
</h3>

<!-- sgds-heading-sm-semibold -->
<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
  Heading Small Semibold
</h4>

<!-- sgds-heading-sm-light -->
<h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight">
  Heading Small Light
</h4>
```

---

## Subtitles (H5–H6)

```html
<!-- sgds-subtitle-md-semibold (Default) -->
<h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
  Subtitle Medium Semibold
</h5>

<!-- sgds-subtitle-md-light -->
<h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal">
  Subtitle Medium Light
</h5>

<!-- sgds-subtitle-sm-semibold -->
<h6 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
  Subtitle Small Semibold
</h6>

<!-- sgds-subtitle-sm-light -->
<h6 class="sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal">
  Subtitle Small Light
</h6>
```

---

## Body Text

```html
<!-- sgds-body-lg-semibold -->
<p class="sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:mb-xl">
  Body large semibold.
</p>

<!-- sgds-body-lg-regular -->
<p class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:mb-xl">
  Body large regular.
</p>

<!-- sgds-body-md-semibold -->
<p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-xl">
  Body medium semibold.
</p>

<!-- sgds-body-md-regular (Default) -->
<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:mb-xl">
  Body medium regular.
</p>

<!-- sgds-body-sm-semibold -->
<p class="sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-xl">
  Body small semibold.
</p>

<!-- sgds-body-sm-regular -->
<p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:mb-xl">
  Body small regular.
</p>
```

---

## Labels

**In form context:** use the SGDS component's built-in label attribute first. Only fall back to `<label>` if the component has no built-in label support. Outside form context: use `<div>`.

```html
<!-- Non-form context: use <div> -->

<!-- sgds-label-lg-semibold — large button, UI label -->
<div class="sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal">Label Large Semibold</div>

<!-- sgds-label-lg-regular — labels in components -->
<div class="sgds:text-label-lg sgds:leading-md sgds:tracking-normal">Label Large Regular</div>

<!-- sgds-label-md-semibold — medium button -->
<div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Label Medium Semibold</div>

<!-- sgds-label-md-regular (Default) — labels in components -->
<div class="sgds:text-label-md sgds:leading-xs sgds:tracking-normal">Label Medium Regular</div>

<!-- sgds-label-md-light — placeholder text -->
<div class="sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal">Label Medium Light</div>

<!-- sgds-label-sm-semibold — small button -->
<div class="sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">Label Small Semibold</div>

<!-- sgds-label-sm-regular — timestamp / tag label -->
<div class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Label Small Regular</div>

<!-- sgds-label-xs-semibold — timestamp / tag label -->
<div class="sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal">Label XS Semibold</div>

<!-- sgds-label-xs-regular — timestamp / tag label -->
<div class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal">Label XS Regular</div>
```

```html
<!-- Form context: prefer SGDS component built-in label -->
<sgds-input label="Field label"></sgds-input>

<!-- Form context fallback: use <label> only if component has no built-in label support -->
<label class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
  Field Label
</label>
```

---

## Captions

```html
<!-- sgds-caption-semibold -->
<div class="sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
  Caption semibold
</div>

<!-- sgds-caption-regular (Default) -->
<div class="sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
  Caption regular
</div>
```

**When to use:** Long paragraphs, helper text, field error messages, footnotes, footer copy.

---

## Links

Always use `<a>` with an `href`. All link tokens include underline.

```html
<!-- sgds-link-lg-regular -->
<a href="#" class="sgds:text-link-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:underline">
  Link large
</a>

<!-- sgds-link-md-regular (Default) -->
<a href="#" class="sgds:text-link-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:underline">
  Link medium
</a>

<!-- sgds-link-sm-regular -->
<a href="#" class="sgds:text-link-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:underline">
  Link small
</a>

<!-- sgds-link-xs-regular -->
<a href="#" class="sgds:text-link-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:underline">
  Link XS
</a>
```

---

## Overline

Always use `<div>` and `sgds:uppercase`. Use for key-value labels and data table header labels.

```html
<!-- sgds-overline-semibold -->
<div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase">
  Overline Semibold
</div>

<!-- sgds-overline-regular (Default) -->
<div class="sgds:text-overline-md sgds:font-regular sgds:leading-2-xs sgds:tracking-wide sgds:uppercase">
  Overline Regular
</div>
```

---

## Best Practices

**Pair font size with appropriate line height:**

| Context | Size | Leading |
|---------|------|---------|
| Display | 5-xl+ | tight / none |
| Headings | 2-xl – 4-xl | snug |
| Body | base – lg | relaxed |
| Labels / captions | xs – sm | normal |

**Font weight for hierarchy:**
- Display / H1 → `bold`
- H2 / H3 → `semibold`
- Body → `normal` or `medium`
- Labels → `medium`

**Tighten tracking for large text, widen for small caps:**
- `text-5-xl` and above → `tracking-tight`
- `text-xs uppercase` → `tracking-wider` or `tracking-widest`

## See Also

- **[type-properties.md](type-properties.md)** — Full scale tables for all token values
