# SGDS Divider Component Skill

`<sgds-divider>` renders a separator line to visually group or divide adjacent content. Use it instead of a native `<hr>` whenever SGDS consistent styling is needed.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- To visually separate distinct content sections or groups within a layout.
- Between list items, form sections, or card areas where a clear visual boundary between groups improves readability.
- As a vertical separator between inline elements in a flex row (e.g. between toolbar items or nav links).

### When NOT to use

- As a decorative element with no semantic meaning — avoid overusing dividers simply to add visual interest.
- To replace adequate whitespace or padding; prefer spacing over lines when content is already well-separated.
- Inside tightly compact layouts where the divider reduces rather than improves readability.
- Do not use a raw `<hr>` or border utility — always use `<sgds-divider>` for consistent SGDS styling.

## Behaviour

- Renders as a horizontal line by default (`orientation="horizontal"`).
- Set `orientation="vertical"` for a vertical separator — requires a flex or grid parent with an explicit `height`, otherwise the divider collapses to zero height.
- `thickness` controls the visual weight: `thin` (default), `thick`, or `thicker`.
- `role="separator"` and `aria-orientation` are set automatically — do not add them manually.
- The component has no interactive states, slots, events, or public methods.

## Advanced Considerations

- **Vertical divider height**: the divider has no intrinsic height when vertical — always ensure the parent has `display: flex` (or `display: grid`) and an explicit `height`.
- **Thickness scale**: use `thin` (default) for subtle in-context separators, `thick` for moderate section boundaries, and `thicker` for strong top-level section breaks.

## Edge Cases

- **Vertical divider collapses**: if a `vertical` divider appears invisible, the parent container likely has no explicit `height` — add `height` to the parent or set it via flex/grid sizing.
- **Nested dividers**: avoid nesting dividers or placing them inside components that already manage their own internal separation (e.g. inside table cells).
- **Responsive layouts**: a vertical divider in a responsive column that wraps to a stacked layout will remain vertical — consider switching to horizontal via a conditional attribute if the layout changes orientation.

## Quick Decision Guide

**Which `orientation`?**
- Separates stacked rows of content → `horizontal` (default)
- Separates side-by-side columns → `vertical`

> Vertical dividers require an explicit height on the parent container. Without one, a vertical divider collapses to zero height.

**Which `thickness`?**
- Subtle separator → `thin` (default)
- Moderate emphasis → `thick`
- Strong emphasis → `thicker`

```html
<!-- Default horizontal divider -->
<sgds-divider></sgds-divider>

<!-- Thicker horizontal divider -->
<sgds-divider thickness="thicker"></sgds-divider>

<!-- Vertical divider — parent must have an explicit height -->
<div style="display: flex; height: 100px;">
  <sgds-divider orientation="vertical"></sgds-divider>
</div>

<!-- Vertical with thickness -->
<div style="display: flex; height: 100px;">
  <sgds-divider orientation="vertical" thickness="thick"></sgds-divider>
</div>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `horizontal \| vertical` | `horizontal` | Direction of the separator line |
| `thickness` | `thin \| thick \| thicker` | `thin` | Visual weight of the line |

## Slots

None.

## Events

None.

---

**For AI agents**:
1. Always use `<sgds-divider>` for separator lines — do not suggest raw `<hr>` elements or border utilities.
2. Vertical dividers require a flex or grid parent with an explicit `height`; warn users when they request `orientation="vertical"` without mentioning a container height.
3. `role="separator"` and `aria-orientation` are set automatically — never add them manually.
4. There are no slots, events, or public methods on this component.
5. When dividing columns, use `orientation="vertical"`; when dividing rows, use the default `orientation="horizontal"`.
