# SGDS Border Width Utilities Skill

Helps developers control border thickness and which sides of an element have borders.

## Core Concept

Border width utilities control thickness and which sides have borders. They are separate from border color — you always need both a width class and a color class for a visible border.

```html
<!-- Width alone: reserves space but invisible -->
<div class="sgds:border-1">...</div>

<!-- Width + color: visible border -->
<div class="sgds:border-1 sgds:border-default">...</div>
```

## All Sides

```html
<div class="sgds:border-0">No border</div>
<div class="sgds:border-1">1px all sides</div>
<div class="sgds:border-2">2px all sides</div>
<div class="sgds:border-4">4px all sides</div>
<div class="sgds:border-8">8px all sides</div>
```

## Individual Sides

```html
<div class="sgds:border-t">Top only (1px)</div>
<div class="sgds:border-r">Right only (1px)</div>
<div class="sgds:border-b">Bottom only (1px)</div>
<div class="sgds:border-l">Left only (1px)</div>
```

## Specific Width Per Side

```html
<div class="sgds:border-t-2">Top 2px</div>
<div class="sgds:border-r-4">Right 4px</div>
<div class="sgds:border-b-0">Bottom removed</div>
<div class="sgds:border-l-4">Left 4px</div>
```

## Axis Shortcuts

```html
<div class="sgds:border-x">Left + right (1px each)</div>
<div class="sgds:border-y">Top + bottom (1px each)</div>
<div class="sgds:border-x-2">Left + right (2px each)</div>
<div class="sgds:border-y-4">Top + bottom (4px each)</div>
```

## Border Width Scale

| Token | Class | Pixel | Use for |
|-------|-------|-------|---------|
| `border-width-0` | `sgds:border-0` | 0px | No border — when layout, background, or elevation defines structure instead |
| `border-width-1` | `sgds:border-1` | 1px | Default — most component boundaries (inputs, cards, containers) |
| `border-width-2` | `sgds:border-2` | 2px | Interactive states — hover, focus, error |
| `border-width-3` | `sgds:border-3` | 3px | Highlighted or active elements |
| `border-width-4` | `sgds:border-4` | 4px | Maximum emphasis or critical states |

---

## Class Reference

| Class | Applies |
|-------|---------|
| `sgds:border-1` | 1px all sides |
| `sgds:border-{n}` | n pixels all sides (n = 0, 2, 4, 8) |
| `sgds:border-{side}` | 1px one side (t, r, b, l) |
| `sgds:border-{side}-{n}` | n pixels one side |
| `sgds:border-x` | 1px left + right |
| `sgds:border-y` | 1px top + bottom |
| `sgds:border-x-{n}` | n pixels left + right |
| `sgds:border-y-{n}` | n pixels top + bottom |

## Usage Guidelines

**1. Default Usage**
- Use `sgds:border-1` (1px) for most UI boundaries.
- Avoid unnecessary borders if layout or background already defines structure.

**2. Interaction & State**
- Use `sgds:border-2` (2px) for hover, focus, and error states.
- Use `sgds:border-4` (4px) sparingly for strong emphasis — active, selected, or critical states.

**3. Visual Hierarchy**
- Thicker borders signal stronger emphasis.
- Keep border width consistent within a component.

---

## Do & Don't

**Do**
- Use consistent border width within a component
- Combine border width with colour for visibility
- Use thicker borders intentionally for interaction and emphasis

**Don't**
- Use a border alone as a separator between sections — use `<sgds-divider>` instead
- Mix too many border widths within the same component
- Overuse thick borders for non-critical elements

---

## Troubleshooting

**Border not visible**: Add a color class — width alone doesn't produce a visible border. You need both `sgds:border-1` and `sgds:border-{color}`.

**Default `sgds:border-1` is 1px** — use `sgds:border-2` or `sgds:border-4` if it's too thin to see.

**Box-sizing conflicts**: If border width changes element size unexpectedly, check for conflicting `box-sizing` styles.

## See Also

- **[border-color](border-color.md)** — Semantic and theme-aware border colors
- **[border-radius](border-radius.md)** — Rounded corner utilities

---

**For AI agents**: Border width utilities are for adding borders to elements (cards, inputs, containers). They are **not** for creating separator or divider lines between sections. If you need a visual separator between content, use **`<sgds-divider>`** from the components skill — do not simulate it with `sgds:border-b`, `sgds:border-t`, or `sgds:border-y`.
