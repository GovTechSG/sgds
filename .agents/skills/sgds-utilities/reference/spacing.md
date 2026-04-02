# SGDS Spacing Utilities Skill

Helps developers use SGDS spacing utilities (margin, padding, gap) based on the 4px scale system.

## Core Concept

**Base Unit**: Every spacing value = **multiplier × 4px**

All SGDS spacing utilities use the `sgds:` prefix (Tailwind v4 @theme syntax).

**Always prefer semantic spacing utilities over raw numeric utilities.** SGDS provides purpose-named spacing tokens defined in `responsive.css` — they adapt across breakpoints and encode design intent. Only fall back to raw numeric utilities (`sgds:p-4`, `sgds:gap-6`, `sgds:mb-3`, etc.) when no semantic token fits.

## Semantic Spacing Utilities (Always Prefer These)

All semantic tokens are **responsive** — their values change at mobile, tablet (≥1024px), and desktop (≥1440px) breakpoints.

### Text Gap — spacing between text/content elements

Use for gaps between paragraphs, headings, and inline text groups.

| Class | Token | Mobile / Tablet / Desktop |
|-------|--------|--------------------------|
| `sgds:gap-text-2-xs` | `--sgds-text-gap-2-xs` | 4px / 4px / 4px |
| `sgds:gap-text-xs` | `--sgds-text-gap-xs` | 8px / 8px / 8px |
| `sgds:gap-text-sm` | `--sgds-text-gap-sm` | 8px / 12px / 12px |
| `sgds:gap-text-md` | `--sgds-text-gap-md` | 12px / 16px / 16px |
| `sgds:gap-text-lg` | `--sgds-text-gap-lg` | 16px / 20px / 20px |
| `sgds:gap-text-xl` | `--sgds-text-gap-xl` | 20px / 24px / 24px |
| `sgds:gap-text-2-xl` | `--sgds-text-gap-2-xl` | 24px / 32px / 32px |

### Layout Gap — spacing between layout sections

Use for gaps between page sections, grid columns, and layout areas.

| Class | Token | Mobile / Tablet / Desktop |
|-------|-------|--------------------------|
| `sgds:gap-layout-2-xs` | `--sgds-layout-gap-2-xs` | 4px / 12px / 16px |
| `sgds:gap-layout-xs` | `--sgds-layout-gap-xs` | 8px / 16px / 20px |
| `sgds:gap-layout-sm` | `--sgds-layout-gap-sm` | 12px / 20px / 24px |
| `sgds:gap-layout-md` | `--sgds-layout-gap-md` | 16px / 24px / 32px |
| `sgds:gap-layout-lg` | `--sgds-layout-gap-lg` | 20px / 32px / 48px |
| `sgds:gap-layout-xl` | `--sgds-layout-gap-xl` | 24px / 48px / 64px |

### Layout Padding — padding for layout/page areas

Use for section padding, page padding, and container insets. Supports `sgds:p-layout-*`, `sgds:px-layout-*`, and `sgds:py-layout-*`.

| Class | Token | Mobile / Tablet / Desktop |
|-------|-------|--------------------------|
| `sgds:p-layout-xs` | `--sgds-layout-padding-xs` | 16px / 20px / 24px |
| `sgds:p-layout-sm` | `--sgds-layout-padding-sm` | 20px / 24px / 32px |
| `sgds:p-layout-md` | `--sgds-layout-padding-md` | 24px / 32px / 48px |
| `sgds:p-layout-lg` | `--sgds-layout-padding-lg` | 32px / 48px / 64px |
| `sgds:p-layout-xl` | `--sgds-layout-padding-xl` | 48px / 64px / 96px |

### Component Gap — spacing inside custom components

Use for gaps between internal elements when building a custom component.

| Class | Token | Mobile / Tablet / Desktop |
|-------|-------|--------------------------|
| `sgds:gap-component-xs` | `--sgds-component-gap-xs` | 8px / 16px / 20px |
| `sgds:gap-component-sm` | `--sgds-component-gap-sm` | 12px / 20px / 24px |
| `sgds:gap-component-md` | `--sgds-component-gap-md` | 16px / 24px / 32px |
| `sgds:gap-component-lg` | `--sgds-component-gap-lg` | 20px / 32px / 48px |
| `sgds:gap-component-xl` | `--sgds-component-gap-xl` | 24px / 48px / 64px |

### Component Padding — padding inside custom components

Use for internal padding when building a custom component. Supports `sgds:p-component-*`, `sgds:px-component-*`, and `sgds:py-component-*`.

| Class | Token | Mobile / Tablet / Desktop |
|-------|-------|--------------------------|
| `sgds:p-component-xs` | `--sgds-component-padding-xs` | 16px / 20px / 24px |
| `sgds:p-component-sm` | `--sgds-component-padding-sm` | 20px / 24px / 32px |
| `sgds:p-component-md` | `--sgds-component-padding-md` | 24px / 32px / 48px |
| `sgds:p-component-lg` | `--sgds-component-padding-lg` | 32px / 48px / 64px |
| `sgds:p-component-xl` | `--sgds-component-padding-xl` | 48px / 64px / 96px |

### Container Width

Use `sgds:w-container` for the standard responsive container width. It maps to `--sgds-container-width` which changes from 360px (mobile) → 888px (tablet) → 1312px (desktop).

```html
<div class="sgds:mx-auto sgds:w-container">
  <!-- responsive-width page container -->
</div>
```

---

## Raw Numeric Utilities (Fallback Only)

Only use raw multiplier-based utilities when no semantic token above fits the use case. Base unit: **n × 4px**.

- `sgds:p-{n}` / `sgds:px-{n}` / `sgds:py-{n}` / `sgds:pt/pr/pb/pl-{n}` — padding
- `sgds:m-{n}` / `sgds:mx-{n}` / `sgds:my-{n}` / `sgds:mt/mr/mb/ml-{n}` — margin
- `sgds:mx-auto` — horizontal centering
- `sgds:gap-{n}` / `sgds:gap-x-{n}` / `sgds:gap-y-{n}` — flex/grid gap
- Negative: `sgds:-mt-{n}`, `sgds:-ml-{n}`, etc.

## Common Use Cases

### Page Layout (layout gap + layout padding + container width)

```html
<!-- Responsive container with layout-appropriate padding -->
<div class="sgds:mx-auto sgds:w-container sgds:px-layout-md">
  <!-- Sections separated by layout gap -->
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
    <section>
      <h2>Section Title</h2>
      <!-- Text elements separated by text gap -->
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </div>
    </section>
    <section>
      <h2>Another Section</h2>
    </section>
  </div>
</div>
```

### Custom Card Component (component gap + component padding)

```html
<div class="sgds:bg-surface-raised sgds:p-component-xs sgds:rounded-md">
  <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
    <h3>Card Title</h3>
    <p>Card description text</p>
    <button class="sgds:p-component-xs">Action</button>
  </div>
</div>
```

### Custom Form Component (component gap + component padding)

```html
<form class="sgds:flex sgds:flex-col sgds:gap-component-sm">
  <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
    <label>Name</label>
    <input class="sgds:p-component-xs">
  </div>
  <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
    <label>Email</label>
    <input class="sgds:p-component-xs">
  </div>
  <button class="sgds:px-component-sm sgds:py-component-xs">Submit</button>
</form>
```

### Grid Layout (layout gap)

```html
<div class="sgds:grid sgds:grid-cols-3 sgds:gap-layout-sm sgds:p-layout-md">
  <div class="sgds:p-component-xs">Item 1</div>
  <div class="sgds:p-component-xs">Item 2</div>
  <div class="sgds:p-component-xs">Item 3</div>
</div>
```

### Text Content Block (text gap)

```html
<article class="sgds:flex sgds:flex-col sgds:gap-text-lg">
  <h1>Article Title</h1>
  <p class="sgds:flex sgds:flex-col sgds:gap-text-sm">Lead paragraph</p>
  <p>Body paragraph 1</p>
  <p>Body paragraph 2</p>
</article>
```

---

## Spacing Defaults

When building any UI — pages, sections, or custom components — always apply whitespace between blocks, sections, and elements. Never render content without spacing.

| Context | Default class |
|---|---|
| Gap between page sections / layout areas | `sgds:gap-layout-md` |
| Padding on page / section containers | `sgds:p-layout-md` |
| Gap inside a custom component | `sgds:gap-component-sm` |
| Padding inside a custom component | `sgds:p-component-xs` |
| Gap between text / content elements | `sgds:gap-text-md` |

Scale up (`-lg`, `-xl`) for more breathing room, scale down (`-sm`, `-xs`) for denser UIs. **Never omit spacing entirely.**

---

**For AI Agents**: Always prefer semantic spacing utilities over raw numeric ones. **Always add whitespace between sections and elements — never render blocks without spacing.** **Default tokens to reach for first**: component padding → `sgds:p-component-xs` (`--sgds-component-padding-xs`); component gap → `sgds:gap-component-sm` (`--sgds-component-gap-sm`); layout gap → `sgds:gap-layout-md` (`--sgds-layout-gap-md`); layout padding → `sgds:p-layout-md` (`--sgds-layout-padding-md`). Scale up or down from these defaults only when the design explicitly requires it. Decision guide: text between text elements → `sgds:gap-text-*`; spacing between layout sections or grid areas → `sgds:gap-layout-*` (default `md`); padding on page/section areas → `sgds:p-layout-*` / `sgds:px-layout-*` / `sgds:py-layout-*`; building a custom component (gap inside) → `sgds:gap-component-*` (default `sm`); building a custom component (padding inside) → `sgds:p-component-*` / `sgds:px-component-*` / `sgds:py-component-*` (default `xs`); responsive container width → `sgds:w-container`. Only use raw numeric utilities (`sgds:p-4`, `sgds:gap-6`, `sgds:mb-3`, etc.) when no semantic token fits the context. All semantic tokens are responsive — they adapt across mobile, tablet, and desktop breakpoints.
