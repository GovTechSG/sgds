# SGDS Divider Component Skill

`<sgds-divider>` renders a separator line to visually group or divide adjacent content. Use it instead of a native `<hr>` whenever SGDS consistent styling is needed.

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
