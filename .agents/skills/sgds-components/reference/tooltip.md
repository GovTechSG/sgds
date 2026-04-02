# SGDS Tooltip Component Skill

`<sgds-tooltip>` wraps a target element and shows a small text popup on hover, focus, or click. The tooltip content must be plain text only — no HTML.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
