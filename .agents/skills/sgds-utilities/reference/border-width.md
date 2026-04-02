# SGDS Border Width Utilities Skill

Helps developers control border thickness and which sides of an element have borders.

## Core Concept

Border width utilities control thickness and which sides have borders. They are separate from border color — you always need both a width class and a color class for a visible border.

```html
<!-- Width alone: reserves space but invisible -->
<div class="sgds:border">...</div>

<!-- Width + color: visible border -->
<div class="sgds:border sgds:border-default">...</div>
```

## All Sides

```html
<div class="sgds:border">1px all sides</div>
<div class="sgds:border-0">No border</div>
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

## Class Reference

| Class | Applies |
|-------|---------|
| `sgds:border` | 1px all sides |
| `sgds:border-{n}` | n pixels all sides (n = 0, 2, 4, 8) |
| `sgds:border-{side}` | 1px one side (t, r, b, l) |
| `sgds:border-{side}-{n}` | n pixels one side |
| `sgds:border-x` | 1px left + right |
| `sgds:border-y` | 1px top + bottom |
| `sgds:border-x-{n}` | n pixels left + right |
| `sgds:border-y-{n}` | n pixels top + bottom |

## Troubleshooting

**Border not visible**: Add a color class — width alone doesn't produce a visible border. You need both `sgds:border` and `sgds:border-{color}`.

**Default `sgds:border` is 1px** — use `sgds:border-2` or `sgds:border-4` if it's too thin to see.

**Box-sizing conflicts**: If border width changes element size unexpectedly, check for conflicting `box-sizing` styles.

## See Also

- **[border-color](border-color.md)** — Semantic and theme-aware border colors
- **[border-radius](border-radius.md)** — Rounded corner utilities

---

**For AI agents**: Border width utilities are for adding borders to elements (cards, inputs, containers). They are **not** for creating separator or divider lines between sections. If you need a visual separator between content, use **`<sgds-divider>`** from the components skill — do not simulate it with `sgds:border-b`, `sgds:border-t`, or `sgds:border-y`.
