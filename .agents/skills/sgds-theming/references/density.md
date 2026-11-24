# Density Theming

Customise the spacing density of components by importing a density theme file. Density controls the internal padding and gap of components, making them more compact or spacious.

## Density modes

| Mode | File | Effect |
|------|------|--------|
| Default | (none — built into `root.css`, which is included by `day.css` / `night.css`) | Base spacing values |
| Compact | `themes/density/compact.css` | Shifts all density tokens down by 1 spacer step |
| Spacious | `themes/density/spacious.css` | Shifts all density tokens up by 1 spacer step |

## How to use

Import the desired density theme file **after** the colour theme:

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/themes/density/compact.css";
```

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/density/compact.css";
```

Only import **one** density file at a time. To switch back to default density, remove the density import.

## Density tokens

Components use two sets of density tokens: padding and gap. Each token maps to a spacer step that shifts with the density mode.

### Padding tokens

| Token | Default | Compact | Spacious |
|-------|---------|---------|----------|
| `--sgds-density-padding-3-xs` | spacer-1 | spacer-0 | spacer-2 |
| `--sgds-density-padding-2-xs` | spacer-2 | spacer-1 | spacer-3 |
| `--sgds-density-padding-xs` | spacer-3 | spacer-2 | spacer-4 |
| `--sgds-density-padding-sm` | spacer-4 | spacer-3 | spacer-5 |
| `--sgds-density-padding-md` | spacer-5 | spacer-4 | spacer-6 |
| `--sgds-density-padding-lg` | spacer-6 | spacer-5 | spacer-7 |
| `--sgds-density-padding-xl` | spacer-7 | spacer-6 | spacer-8 |
| `--sgds-density-padding-2-xl` | spacer-8 | spacer-7 | spacer-9 |
| `--sgds-density-padding-3-xl` | spacer-9 | spacer-8 | spacer-10 |
| `--sgds-density-padding-4-xl` | spacer-10 | spacer-9 | spacer-11 |
| `--sgds-density-padding-5-xl` | spacer-11 | spacer-10 | spacer-12 |

### Gap tokens

| Token | Default | Compact | Spacious |
|-------|---------|---------|----------|
| `--sgds-density-gap-2-xs` | spacer-2 | spacer-1 | spacer-3 |
| `--sgds-density-gap-xs` | spacer-3 | spacer-2 | spacer-4 |
| `--sgds-density-gap-sm` | spacer-4 | spacer-3 | spacer-5 |
| `--sgds-density-gap-md` | spacer-5 | spacer-4 | spacer-6 |
| `--sgds-density-gap-lg` | spacer-6 | spacer-5 | spacer-7 |
| `--sgds-density-gap-xl` | spacer-7 | spacer-6 | spacer-8 |
| `--sgds-density-gap-2-xl` | spacer-8 | spacer-7 | spacer-9 |
| `--sgds-density-gap-3-xl` | spacer-9 | spacer-8 | spacer-10 |

## Affected components

- Accordion
- Card
- Icon Card
- Image Card
- Thumbnail Card
- Modal
- Drawer
- Description List
- Data Table
- Table
- Select
- Dropdown (items)
- Overflow Menu
- Combo Box (options)
- System Banner
- Table of Contents
- Footer

## Import order with other theme files

Density files must come **after** the colour theme and **after** any brand colour overrides:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";          /* optional */
@import "@govtechsg/sgds-web-component/themes/density/compact.css"; /* or spacious.css */
@import "./yourCustomCss.css";                                      /* brand overrides last */
```

---

**For AI agents**:
1. Density is controlled by importing a single CSS file — no class toggles or data attributes needed.
2. Only import **one** density file (compact OR spacious), never both.
3. The density import must come **after** `day.css` / `night.css`.
4. Default density requires no import — the tokens are built into `root.css`.
5. Density tokens are **not user-overridable** in the same way brand colours are — consumers choose a mode (compact/spacious) rather than setting individual token values.
6. Density affects padding and gap only — it does not change font sizes, colours, or border radii.
