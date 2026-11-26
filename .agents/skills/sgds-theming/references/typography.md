# Typography Theming

How to customise fonts using SGDS font-family token overrides.

---

## Font-Family Tokens

SGDS uses **Inter** by default. Typography is controlled by seven semantic font-family tokens that all inherit from `--sgds-font-family-brand`:

| Token | Default | Controls |
|-------|---------|----------|
| `--sgds-font-family-brand` | `var(--sgds-font-family-sans)` | Master brand font — all other tokens inherit from this unless individually overridden |
| `--sgds-font-family-display` | `var(--sgds-font-family-brand)` | Display headings |
| `--sgds-font-family-heading` | `var(--sgds-font-family-brand)` | Section headings |
| `--sgds-font-family-subtitle` | `var(--sgds-font-family-brand)` | Subtitles |
| `--sgds-font-family-body` | `var(--sgds-font-family-brand)` | Body text, paragraphs, lists |
| `--sgds-font-family-label` | `var(--sgds-font-family-brand)` | Labels, buttons, links, captions, overlines |
| `--sgds-font-family-code` | `var(--sgds-font-family-mono)` | Code blocks and inline code |

---

## Changing the Brand Font

Override `--sgds-font-family-brand` to change all typography roles at once. Load the font yourself via `<link>` or `@font-face` first.

```css
:root {
  --sgds-font-family-brand: "Noto Sans", system-ui, sans-serif;
}
```

---

## Mixing Fonts Per Role

Override individual tokens to use different fonts for different roles. For example, serif for display and headings while keeping sans for everything else:

```css
:root {
  --sgds-font-family-display: var(--sgds-font-family-serif);
  --sgds-font-family-heading: var(--sgds-font-family-serif);
}
```

You are responsible for loading the font assets — either via a `<link>` tag or `@font-face`. SGDS does not load custom fonts automatically.

---

## For AI Agents

1. To change all fonts at once, override `--sgds-font-family-brand`. To change fonts per role, override the individual semantic tokens (`--sgds-font-family-display`, `--sgds-font-family-heading`, etc.).
2. When overriding `--sgds-font-family-brand`, remind the user to also load the font file themselves (via `<link>` or `@font-face`).
3. Custom font overrides must come **after** `themes/day.css` — otherwise they will be overwritten.
