# SGDS Skeleton Component Skill

`<sgds-skeleton>` renders a placeholder shape to represent content that is still loading. Use it to reduce perceived loading time and prevent layout shift when data is being fetched.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- While content is loading asynchronously, to reserve space and reduce perceived loading time.
- When the shape and layout of incoming content is known — mirror the expected content structure with skeleton shapes (rectangles for text, circles for avatars).
- To prevent layout shift when data populates, keeping the page structure stable during the load phase.

### When NOT to use

- When loading time is very short (<300ms) — skeletons may flash briefly and cause more disruption than helping.
- When the shape of the incoming content is unknown or highly variable — a generic spinner is more appropriate.
- As a permanent placeholder for missing or unavailable content — use an empty state pattern instead.
- Inside components that have a built-in `loading` prop (e.g. `<sgds-button loading>`, `<sgds-input loading>`) — those render their own loading indicator.

## Behaviour

- Renders a block-level placeholder at the specified `width` and `height`.
- `borderRadius` shapes the placeholder — use `"50%"` with equal `width` and `height` for circles (avatars), or a small value (e.g. `"4px"`) for rounded rectangles.
- `rows` renders multiple stacked skeleton lines within the total `height` — useful for representing a paragraph or list of text lines.
- `sheen` adds an animated horizontal shimmer effect to suggest active loading; omit for a static placeholder.
- The component has no slots, events, or public methods — it is purely presentational.

## Advanced Considerations

- **Shape control**: `borderRadius` accepts any valid CSS border-radius value — use `"50%"` for circles, small values like `"4px"` or `"8px"` for card/button shapes, and omit for sharp rectangle placeholders.
- **Multi-row text**: `rows` splits the total `height` evenly across all rows with small gaps. Pair with a `height` calculated as `rows × line-height + gaps` to match real text block dimensions.
- **`sheen` animation**: the shimmer animation runs continuously while the skeleton is visible — remove the skeleton (rather than toggling `sheen`) when content loads to stop the animation.
- **Layout matching**: use `width="100%"` to make the skeleton fill its container, matching fluid-width content. Use explicit pixel values only when the real content has a fixed dimension.
- **No slots or events**: all show/hide logic must be managed by the host application — the skeleton has no internal state.

## Edge Cases

- **Missing units**: `width`, `height`, and `borderRadius` values without units (e.g. `"200"`) will not render correctly — always include a CSS unit.
- **`rows` without `height`**: if `rows` is set but `height` is omitted, the skeleton may render with no visible height — always set `height` when using `rows`.
- **Content loads faster than expected**: skeletons may flash briefly for very fast loads — consider a minimum display duration or omit the skeleton for sub-300ms loads.
- **Mismatched dimensions**: if skeleton dimensions do not match real content, layout shift occurs when content appears — measure the real content and align skeleton dimensions accordingly.
- **No accessible announcement**: screen readers do not inherently announce skeleton screens — pair with an `aria-live` region or `aria-busy="true"` on the container if accessible loading notifications are required.

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
