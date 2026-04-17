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
<p class="sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:mb-paragraph-xl">
  Body large semibold.
</p>

<!-- sgds-body-lg-regular -->
<p class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:mb-paragraph-xl">
  Body large regular.
</p>

<!-- sgds-body-md-semibold -->
<p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-paragraph-lg">
  Body medium semibold.
</p>

<!-- sgds-body-md-regular (Default) -->
<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:mb-paragraph-lg">
  Body medium regular.
</p>

<!-- sgds-body-sm-semibold -->
<p class="sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-lg">
  Body small semibold.
</p>

<!-- sgds-body-sm-regular -->
<p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-lg">
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
<div class="sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-md">
  Caption semibold
</div>

<!-- sgds-caption-regular (Default) -->
<div class="sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-md">
  Caption regular
</div>
```

**When to use:** Helper text, field error messages, footnotes, footer copy.

---

## Links

Always use `<a>` with an `href`. All link patterns include underline.

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

**Pair font size with appropriate line height** (see [type-properties.md](type-properties.md) for full pairing table):

| Context | Size | Leading |
|---------|------|---------|
| Display LG | `sgds:text-display-lg` | `sgds:leading-3-xl` |
| Display MD | `sgds:text-display-md` | `sgds:leading-2-xl` |
| Display SM | `sgds:text-display-sm` | `sgds:leading-xl` |
| Heading XL | `sgds:text-heading-xl` | `sgds:leading-xl` |
| Heading LG | `sgds:text-heading-lg` | `sgds:leading-lg` |
| Heading MD | `sgds:text-heading-md` | `sgds:leading-md` |
| Heading SM | `sgds:text-heading-sm` | `sgds:leading-sm` |
| Subtitle MD | `sgds:text-subtitle-md` | `sgds:leading-xs` |
| Subtitle SM | `sgds:text-subtitle-sm` | `sgds:leading-2-xs` |
| Body LG | `sgds:text-body-lg` | `sgds:leading-md` |
| Body MD | `sgds:text-body-md` | `sgds:leading-xs` |
| Body SM | `sgds:text-body-sm` | `sgds:leading-2-xs` |
| Label LG | `sgds:text-label-lg` | `sgds:leading-md` |
| Label MD | `sgds:text-label-md` | `sgds:leading-xs` |
| Label SM | `sgds:text-label-sm` | `sgds:leading-2-xs` |
| Label XS | `sgds:text-label-xs` | `sgds:leading-3-xs` |
| Caption | `sgds:text-caption-md` | `sgds:leading-2-xs` |
| Link LG | `sgds:text-link-lg` | `sgds:leading-md` |
| Link MD | `sgds:text-link-md` | `sgds:leading-xs` |
| Link SM | `sgds:text-link-sm` | `sgds:leading-2-xs` |
| Link XS | `sgds:text-link-xs` | `sgds:leading-3-xs` |
| Overline | `sgds:text-overline-md` | `sgds:leading-2-xs` |

**Font weight for hierarchy:**
- Display / H1–H2 → `sgds:font-bold` or `sgds:font-light`
- H3–H4 → `sgds:font-semibold` or `sgds:font-light`
- Subtitles / Labels → `sgds:font-semibold` or `sgds:font-regular` 
- Body → no class needed (regular is the reboot default)

**Tracking by text role:**
- Display → `sgds:tracking-tighter`
- Headings (H1–H4) → `sgds:tracking-tight`
- Subtitles → `sgds:tracking-normal`
- Overline → `sgds:tracking-wide`
- Body, labels, captions → no tracking class needed (normal is the default)

## See Also

- **[type-properties.md](type-properties.md)** — Full scale tables for all token values
