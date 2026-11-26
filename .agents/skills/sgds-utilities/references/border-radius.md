# SGDS Border Radius Utilities Skill

Helps developers apply rounded corners to components, containers, and form elements using SGDS design tokens.

## Core Concept

Border radius defines the curvature of UI elements and contributes to both:

- **Usability** — clarity, grouping, affordance
- **Visual tone** — structured ↔ friendly

SGDS provides two radius scales:

| Scale | Classes | Use on |
|-------|---------|--------|
| **General** | `sgds:rounded-{size}` | Containers, buttons, cards, badges, avatars |
| **Form** | `sgds:rounded-form-{size}` | Native form elements (`<input>`, `<select>`, `<textarea>`) |

Use general tokens by default. Use form tokens only for native form controls.

## General Border Radius

### All Corners

```html
<div class="sgds:rounded-none">0px — square corners</div>
<div class="sgds:rounded-xs">2px</div>
<div class="sgds:rounded-sm">4px</div>
<div class="sgds:rounded-md">8px (default)</div>
<div class="sgds:rounded-lg">12px</div>
<div class="sgds:rounded-xl">16px</div>
<div class="sgds:rounded-2-xl">24px</div>
<div class="sgds:rounded-3-xl">32px</div>
<div class="sgds:rounded-full">9999px — pill / circle</div>
```

### Specific Sides

```html
<div class="sgds:rounded-t-md">Top corners (top-left + top-right)</div>
<div class="sgds:rounded-b-md">Bottom corners</div>
<div class="sgds:rounded-l-md">Left corners</div>
<div class="sgds:rounded-r-md">Right corners</div>
```

### Individual Corners

```html
<div class="sgds:rounded-tl-md">Top-left only</div>
<div class="sgds:rounded-tr-md">Top-right only</div>
<div class="sgds:rounded-br-md">Bottom-right only</div>
<div class="sgds:rounded-bl-md">Bottom-left only</div>
```

### Size Reference

| Class | Value | Typical use |
|-------|-------|-------------|
| `sgds:rounded-none` | 0px | Sharp corners, table cells |
| `sgds:rounded-xs` | 2px | Very subtle rounding |
| `sgds:rounded-sm` | 4px | Badge, small components |
| `sgds:rounded-md` | 8px | Buttons, Cards, panels, form input, modals as default |
| `sgds:rounded-lg` | 12px | Larger cards |
| `sgds:rounded-xl` | 16px | Featured cards |
| `sgds:rounded-2-xl` | 24px | Large containers like panel |
| `sgds:rounded-3-xl` | 32px | Huge radius Hero / feature sections |
| `sgds:rounded-full` | 9999px | Full radius like circle, Avatars, Radio |

## Semantic Border Radius

Purpose-driven tokens that map a UI role to a primitive radius value. Components use these internally. Use these classes when building custom layouts that should align with component styling.

```html
<div class="sgds:rounded-structure">Structural containers (0px)</div>
<div class="sgds:rounded-indicator">Badges, status indicators (4px)</div>
<div class="sgds:rounded-interactive">Buttons, interactive elements (8px)</div>
<div class="sgds:rounded-form">Form controls (8px)</div>
<div class="sgds:rounded-form-subtle">Compact form controls (8px)</div>
<div class="sgds:rounded-surface">Cards, panels, raised surfaces (12px)</div>
<div class="sgds:rounded-overlay">Modals, drawers, tooltips (12px)</div>
```

### Semantic Reference

| Class | CSS Variable | Default |
|-------|-------------|---------|
| `sgds:rounded-structure` | `--sgds-structure-border-radius` | none (0px) |
| `sgds:rounded-indicator` | `--sgds-indicator-border-radius` | sm (4px) |
| `sgds:rounded-interactive` | `--sgds-interactive-border-radius` | md (8px) |
| `sgds:rounded-form` | `--sgds-form-border-radius` | md (8px) |
| `sgds:rounded-form-subtle` | `--sgds-form-border-radius-subtle` | md (8px) |
| `sgds:rounded-surface` | `--sgds-surface-border-radius` | lg (12px) |
| `sgds:rounded-overlay` | `--sgds-overlay-border-radius` | lg (12px) |

> **Note**: `sgds:rounded-form` (semantic, no size suffix) is the purpose-driven token for form controls. It is distinct from `sgds:rounded-form-md` (primitive form scale with explicit size).

### When to use semantic vs primitive

- **Semantic** (`sgds:rounded-surface`) — when you want the element to match the design system's intent for that UI role. If the theme changes, the element updates automatically.
- **Primitive** (`sgds:rounded-lg`) — when you need a specific pixel value regardless of the theme.

---

## Form Border Radius

Apply to native HTML form elements only: `<input>`, `<select>`, `<textarea>`, `<form>`.

```html
<input class="sgds:rounded-form-md" type="text" />
<select class="sgds:rounded-form-md"></select>
<textarea class="sgds:rounded-form-md"></textarea>
```

### Form Size Reference

| Class | Value | Typical use |
|-------|-------|-------------|
| `sgds:rounded-form-none` | 0px | Sharp corners, table cells |
| `sgds:rounded-form-xs` | 2px | Very subtle rounding for small size input |
| `sgds:rounded-form-sm` | 4px | Standard buttons, small components |
| `sgds:rounded-form-md` | 8px | Cards, panels |
| `sgds:rounded-form-full` | 9999px | Badges, avatars, pill buttons |

## Form Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>` when available. Form border radius tokens are for custom form elements when library components don't meet your needs.

### Standard Text Input

```html
<input class="sgds:rounded-form-md" type="text" placeholder="Enter text" />
```

### Pill Search Input

```html
<input class="sgds:rounded-form-full" type="search" placeholder="Search..." />
```

### Square Input

```html
<input class="sgds:rounded-form-none" type="text" placeholder="No rounding" />
```

## Usage Patterns

**Default components** — use `sgds:rounded-md` as the baseline. Increase for larger surfaces; decrease for compact UI.

---

## Design Decision Principles

**1. Size → Radius** — match visual weight:
- Small element → smaller radius
- Large element → larger radius

**2. Density → Radius** — reflect UI complexity:
- Dense / data-heavy → sharper (`none` – `sm`)
- Spacious / marketing → softer (`lg` – `xl+`)

**3. Consistency** — avoid mixing too many radius values in one view. Keep radius consistent within a component group.

---

## Brand Expression

Border radius is a branding lever, not just a utility.

| Brand tone | Recommended radius |
|------------|-------------------|
| Structured / Government / Enterprise | `none` – `md` |
| Balanced / Modern | `md` – `lg` |
| Friendly / Consumer | `lg` – `full` |

Examples:
- Government system → `sgds:rounded-md`
- Consumer product → `sgds:rounded-full` buttons

---

## Troubleshooting

**Rounded corners not appearing**: Check for `overflow: hidden` on a parent element — it clips corners. Ensure the element has a defined width/height.

**`sgds:rounded-full` on a non-square element**: Produces a pill (oval), not a circle. Set equal width and height for a true circle.

**Form element looks out of place**: If the border-radius on a form control doesn't match surrounding inputs, confirm you're using `sgds:rounded-form-*` instead of the general `sgds:rounded-*` scale.

---

**For AI Agents**: When applying border radius — default to `sgds:rounded-md`; adjust based on component size and density; use `sgds:rounded-full` only for pills, avatars, or circular UI; use form tokens (`sgds:rounded-form-*`) for native inputs only; do not introduce values outside the defined scale; align radius usage with the product's brand tone.

---

## See Also

- **[border-color](border-color.md)** — Semantic and theme-aware border colors
- **[border-width](border-width.md)** — Border thickness and sides
