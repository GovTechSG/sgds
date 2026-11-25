# SGDS Toast Component Skill

`<sgds-toast>` is a brief, non-blocking notification. `<sgds-toast-container>` positions one or more toasts on the screen. Toasts must contain both a `title` and a message, and optionally an icon and an action link.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For brief, non-blocking status notifications that confirm a completed action or report a background event (e.g. "Changes saved", "File uploaded successfully", "Error sending message").
- When the notification is transient and does not require user action or sustained attention.
- For system-level feedback that is not tied to a specific element on the page.

### When NOT to use

- For critical messages that require immediate action — use a modal or alert instead.
- For persistent information that should be part of the page layout.
- When information is complex or requires user interaction — toasts are dismissible and transient.

## Behaviour

- `show` attribute controls whether the toast is visible; set it on page load to show a toast immediately or use `showToast()` / `hideToast()` methods for programmatic control.
- `variant` sets the visual tone: `info` (default), `success`, `danger`, `warning`, or `neutral`.
- `autohide` dismisses the toast automatically after `delay` milliseconds (default 5000); without `autohide` the toast persists until dismissed or hidden via JS.
- `dismissible` renders a close button users can click to dismiss the toast manually.
- Multiple `<sgds-toast>` elements inside one `<sgds-toast-container>` stack vertically — limit to 3–4 to avoid clutter.
- Events fire in sequence: `sgds-show` → `sgds-after-show` when showing; `sgds-hide` → `sgds-after-hide` when hiding.
- `noAnimation` disables show/hide animations for reduced-motion contexts.

## Advanced Considerations

- **Always use `<sgds-toast-container>`**: `<sgds-toast>` must be placed inside `<sgds-toast-container>` — the container handles screen positioning and stacking.
- **`title` is required for accessibility**: always set a meaningful `title` on every `<sgds-toast>` — it is the accessible heading of the notification.
- **`show` attribute vs `showToast()` method**: use the `show` attribute for toasts that should be visible on initial render; use `showToast()` / `hideToast()` for dynamically triggered notifications (e.g. after a form submit).
- **Deprecated positions**: `top-start`, `middle-start`, `middle-center`, `middle-end` are deprecated since v3.7.1 — use only `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`.
- **One container per position**: use a single `<sgds-toast-container>` per screen position — do not create multiple containers at the same position.
- **Auto-dismiss timing**: `delay` only takes effect when `autohide` is also set — setting `delay` alone has no effect.

## Edge Cases

- **Multiple rapid toasts**: implement queueing or throttling in the host application to avoid flooding the UI with simultaneous toasts.
- **Z-index conflicts**: ensure `<sgds-toast-container>` appears above modals, banners, and other overlays — check stacking context if toasts are hidden behind other elements.
- **`sgds-after-hide` for DOM cleanup**: use `sgds-after-hide` (not `sgds-hide`) to remove the toast element from the DOM or reset state — `sgds-hide` fires before the animation completes, so the element is still visible at that point.

## Quick Decision Guide

**Variant?**
- Informational → `variant="info"` (default) — `<sgds-icon slot="icon" name="info-circle-fill" size="md">`
- Confirmation → `variant="success"` — `<sgds-icon slot="icon" name="check-circle-fill" size="md">`
- Error → `variant="danger"` — `<sgds-icon slot="icon" name="exclamation-circle-fill" size="md">`
- Caution → `variant="warning"` — `<sgds-icon slot="icon" name="exclamation-triangle-fill" size="md">`
- Theme-neutral → `variant="neutral"` — `<sgds-icon slot="icon" name="info-circle-fill" size="md">`

**Auto-dismiss?** → Add `autohide` and optionally `delay` (ms, default 5000)

**User can dismiss?** → Add `dismissible`

**Position on screen?**
- Bottom right → `position="bottom-end"` on `<sgds-toast-container>` (common default)
- Use `"top-end"`, `"top-center"`, `"bottom-center"`, `"bottom-start"` etc.

**Show/hide a toast via JS?** → Use `showToast()` / `hideToast()` methods

```html
<!-- Basic toast (already shown) -->
<sgds-toast-container position="bottom-end">
  <sgds-toast show variant="info" title="Info" dismissible>
    <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
    Your changes have been saved.
    <sgds-link slot="action" size="sm"><a href="#" target="_blank">Undo</a></sgds-link>
  </sgds-toast>
</sgds-toast-container>

<!-- Auto-dismissing toast after 3 seconds -->
<sgds-toast-container position="top-end">
  <sgds-toast show variant="success" title="Success" autohide delay="3000">
    <sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>
    Item added to cart.
  </sgds-toast>
</sgds-toast-container>

<!-- Trigger toast via JS -->
<sgds-button id="trigger-toast">Show Toast</sgds-button>
<sgds-toast-container position="bottom-end">
  <sgds-toast id="my-toast" variant="danger" title="Error" dismissible>
    <sgds-icon slot="icon" name="exclamation-circle-fill" size="md"></sgds-icon>
    Something went wrong. Please try again.
  </sgds-toast>
</sgds-toast-container>

<script>
  document.getElementById("trigger-toast").addEventListener("click", () => {
    document.getElementById("my-toast").showToast();
  });
</script>

<!-- Multiple toasts stacked -->
<sgds-toast-container position="bottom-end">
  <sgds-toast show variant="success" title="Saved">
    <sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>
    Document saved.
  </sgds-toast>
  <sgds-toast show variant="warning" title="Warning">
    <sgds-icon slot="icon" name="exclamation-triangle-fill" size="md"></sgds-icon>
    Storage almost full.
  </sgds-toast>
</sgds-toast-container>
```

## API Summary

### `<sgds-toast>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `show` | boolean | `false` | Controls toast visibility |
| `title` | string | `"Title"` | Toast heading (required for accessibility) |
| `variant` | `info \| success \| danger \| warning \| neutral` | `info` | Visual style and semantic meaning |
| `dismissible` | boolean | `false` | Shows a close button for user dismissal |
| `autohide` | boolean | `false` | Auto-hides the toast after `delay` ms |
| `delay` | number | `5000` | Milliseconds before auto-hide (requires `autohide`) |
| `noAnimation` | boolean | `false` | Disables show/hide animations |

### `<sgds-toast-container>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `position` | ToastPosition | — | Screen position for the toast stack |

#### ToastPosition values (current)
`top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`

> `top-start`, `middle-start`, `middle-center`, `middle-end` are **deprecated since 3.7.1** — avoid these positions.

## Slots (`<sgds-toast>`)

| Slot | Purpose |
|---|---|
| `icon` | Icon displayed on the left (use `<sgds-icon size="md">`) |
| *(default)* | Toast message body text |
| `action` | Action link on the right (use `<sgds-link size="sm">`) |

## Events (`<sgds-toast>`)

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | No | Toast begins showing |
| `sgds-after-show` | No | Toast fully visible (animation complete) |
| `sgds-hide` | No | Toast begins hiding |
| `sgds-after-hide` | No | Toast fully hidden (animation complete) |

## Public Methods (`<sgds-toast>`)

| Method | Description |
|---|---|
| `showToast()` | Shows the toast (sets `show = true` with animation) |
| `hideToast()` | Hides the toast (sets `show = false` with animation) |

---

**For AI agents**:
1. Always set `title` on `<sgds-toast>` — it is required for accessibility.
2. `show` must be set on the toast for it to be visible on page load; `showToast()` / `hideToast()` are the programmatic API.
3. Always wrap `<sgds-toast>` inside `<sgds-toast-container>` — the container handles positioning.
4. Multiple `<sgds-toast>` elements inside one container stack vertically automatically.
5. Avoid deprecated position values (`top-start`, `middle-*`); use `bottom-end` as the default position.
6. Icon slot accepts `<sgds-icon size="md">`, action slot accepts `<sgds-link size="sm">` wrapping an `<a>` tag.
