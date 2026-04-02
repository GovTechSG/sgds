# SGDS Skeleton Component Skill

`<sgds-skeleton>` renders a placeholder shape to represent content that is still loading. Use it to reduce perceived loading time and prevent layout shift when data is being fetched.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Size the skeleton to match the real content it replaces** — set `width` and `height` with CSS units (e.g., `"200px"`, `"100%"`, `"1.5rem"`).

**Shape?**
- Rectangle (default) → omit `borderRadius`
- Rounded rectangle (card, button) → e.g., `borderRadius="4px"`
- Circle (avatar) → `borderRadius="50%"` with equal `width` and `height`

**Multiple lines of text?**
- Use `rows` to render several skeleton lines stacked within `height`

**Animated shimmer?**
- Add `sheen` for a horizontal shimmer animation

```html
<!-- Rectangle placeholder -->
<sgds-skeleton width="200px" height="20px"></sgds-skeleton>

<!-- Rounded rectangle (card) -->
<sgds-skeleton width="128px" height="64px" borderRadius="4px"></sgds-skeleton>

<!-- Circle (avatar) -->
<sgds-skeleton width="96px" height="96px" borderRadius="50%"></sgds-skeleton>

<!-- Multiple text lines -->
<sgds-skeleton width="100%" height="80px" rows="3"></sgds-skeleton>

<!-- Animated shimmer -->
<sgds-skeleton width="200px" height="20px" sheen></sgds-skeleton>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `width` | string | — | Width with CSS unit (e.g. `"200px"`, `"100%"`) |
| `height` | string | — | Height with CSS unit |
| `borderRadius` | string | — | Border radius with CSS unit; applies to each row when `rows` is set |
| `rows` | number | — | Number of skeleton rows stacked within the given height |
| `sheen` | boolean | `false` | Adds an animated horizontal shimmer effect |

## Slots

None.

## Events

None.

---

**For AI agents**:
1. Always include CSS units in `width`, `height`, and `borderRadius` values (e.g., `"200px"` not `"200"`).
2. Use `borderRadius="50%"` with equal `width` and `height` for circular skeletons (avatars, icons).
3. Use `rows` when representing a block of text lines — pair it with a `height` that spans all rows.
4. `sheen` is optional; omit it for a static placeholder, add it for an animated loading effect.
5. There are no slots, events, or public methods on this component.
6. Match skeleton dimensions as closely as possible to the real content to prevent layout shift when content loads.
