# SGDS Toast Component Skill

`<sgds-toast>` is a brief, non-blocking notification. `<sgds-toast-container>` positions one or more toasts on the screen. Toasts must contain both a `title` and a message, and optionally an icon and an action link.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Variant?**
- Informational → `variant="info"` (default)
- Confirmation → `variant="success"`
- Error → `variant="danger"`
- Caution → `variant="warning"`
- Theme-neutral → `variant="neutral"`

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
    <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
    Your changes have been saved.
    <sgds-link slot="action"><a href="#" target="_blank">Undo</a></sgds-link>
  </sgds-toast>
</sgds-toast-container>

<!-- Auto-dismissing toast after 3 seconds -->
<sgds-toast-container position="top-end">
  <sgds-toast show variant="success" title="Success" autohide delay="3000">
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Item added to cart.
  </sgds-toast>
</sgds-toast-container>

<!-- Trigger toast via JS -->
<sgds-button id="trigger-toast">Show Toast</sgds-button>
<sgds-toast-container position="bottom-end">
  <sgds-toast id="my-toast" variant="danger" title="Error" dismissible>
    <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
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
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Document saved.
  </sgds-toast>
  <sgds-toast show variant="warning" title="Warning">
    <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
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
| `icon` | Icon displayed on the left (use `<sgds-icon>`) |
| *(default)* | Toast message body text |
| `action` | Action link on the right (use `<sgds-link>`) |

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
6. Icon slot accepts `<sgds-icon>`, action slot accepts `<sgds-link>` wrapping an `<a>` tag.
