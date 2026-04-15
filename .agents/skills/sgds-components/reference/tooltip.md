# SGDS Tooltip Component Skill

`<sgds-tooltip>` wraps a target element and shows a small text popup on hover, focus, or click. The tooltip content must be plain text only — no HTML.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- To provide supplementary, non-critical contextual information about a UI element on hover or focus (e.g. explaining what an icon button does, providing a longer label for an abbreviated term).
- When adding visible label text would clutter the interface — the tooltip surfacees the information only when needed.
- For icon-only buttons where `<sgds-icon-button>` does not have a visible text label.

### When NOT to use

- For critical information users must see — tooltips are dismissible and not always triggered.
- To display actionable content (e.g. links, buttons) — tooltip content is plain text only.
- On touch-only experiences without a click fallback — hover is unavailable on touch devices.

## Behaviour

- Appears on hover and focus by default (`trigger="hover focus"`); also supports `click` and `focus`-only triggers.
- Auto-repositions to avoid viewport overflow — the declared `placement` is the preferred position.
- Content is plain text only — HTML is not rendered inside the tooltip.
- `aria-describedby` is set automatically on the target element when `content` is populated — do not add it manually.

## Advanced Considerations

- **Plain text only**: the `content` attribute is rendered as plain text — HTML tags are escaped and displayed as literal text. For rich content (links, formatted text), use a popover or modal instead.
- **`trigger` combinations**: `"hover focus"` (default) handles both mouse and keyboard users; `"click"` is useful for copy-to-clipboard feedback; `"focus"` alone is best for form field supplementary hints.
- **Non-focusable targets**: elements like `<svg>`, `<div>`, `<span>` are not keyboard-focusable by default — add `tabindex="0"` to make the tooltip accessible to keyboard users.
- **Disabled element workaround**: browsers do not fire pointer events on disabled elements — wrap a disabled element in a non-disabled `<span>` to allow the tooltip to trigger.
- **Automatic repositioning**: the tooltip repositions itself to stay within the viewport; `placement` is the preferred direction, not a fixed constraint.
- **Screen reader announcement**: the tooltip content is announced via `aria-describedby` — keep content concise and supplementary, not critical.
- **`content` must be set**: an empty `content` attribute renders a tooltip with no text — always provide a meaningful content string.

## Edge Cases

- **Disabled elements**: tooltips won't trigger on disabled elements — wrap the disabled element in a non-disabled `<span>` to enable triggering.
- **Non-focusable targets**: add `tabindex="0"` to SVG, div, or span targets so keyboard users can trigger the tooltip.
- **Touch devices**: `trigger="hover"` has no effect — use `trigger="click"` as a fallback or consider inline hint text instead.
- **Long content**: tooltip text should be short (1–2 lines max) — for longer content use a popover or modal instead.
- **Scrolling containers**: tooltip positioning may break in scrolling parents — test placement or use a portal strategy.
- **Screen readers**: the tooltip component handles `aria-describedby` automatically when content is set — do not add it manually.

## Quick Decision Guide

**Placement?**
- `placement="top"` (default), `bottom`, `left`, `right`

**How the tooltip is triggered?**
- `trigger="hover focus"` (default) — mouse hover + keyboard tab
- `trigger="hover"` — mouse only
- `trigger="focus"` — keyboard/programmatic focus only
- `trigger="click"` — mouse click toggles the tooltip

**Target element not keyboard-focusable (e.g. SVG, div)?** → Add `tabindex="0"` to make it focusable

```html
<!-- Basic tooltip on an icon -->
<sgds-tooltip content="More information about this field" placement="bottom">
  <sgds-icon name="info-circle" tabindex="0"></sgds-icon>
</sgds-tooltip>

<!-- Tooltip triggered only on click -->
<sgds-tooltip content="Copied to clipboard!" trigger="click" placement="top">
  <sgds-button>Copy</sgds-button>
</sgds-tooltip>

<!-- Tooltip with focus trigger only (keyboard accessible) -->
<sgds-tooltip content="Required field" trigger="focus">
  <input type="text" placeholder="Enter your name" />
</sgds-tooltip>

<!-- Tooltip on a non-focusable SVG element -->
<sgds-tooltip content="Quick reference guide" placement="right">
  <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <!-- SVG paths -->
  </svg>
</sgds-tooltip>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `content` | string | `""` | Tooltip text (plain text only, no HTML) |
| `placement` | `top \| bottom \| left \| right` | `top` | Where the tooltip appears relative to its target |
| `trigger` | `hover \| focus \| click \| hover focus` | `hover focus` | How the tooltip is shown/hidden |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | The target element that triggers the tooltip |

## Events

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | No | Tooltip begins showing |
| `sgds-after-show` | No | Tooltip fully visible (animation complete) |
| `sgds-hide` | No | Tooltip begins hiding |
| `sgds-after-hide` | No | Tooltip fully hidden (animation complete) |

## Public Methods

| Method | Description |
|---|---|
| `show()` | Programmatically shows the tooltip |
| `hide()` | Programmatically hides the tooltip |
| `toggle()` | Toggles tooltip visibility |

---

**For AI agents**:
1. `content` accepts plain text only — HTML is not rendered inside the tooltip.
2. The default `trigger="hover focus"` ensures both mouse and keyboard users can access the tooltip — prefer this over `hover` alone.
3. Add `tabindex="0"` to non-focusable elements (SVG, div, span) placed in the default slot so keyboard users can trigger the tooltip.
4. Use `trigger="click"` sparingly — it is better suited for binary states like "copied" confirmations.
5. The tooltip auto-flips placement if it would overflow the viewport.
