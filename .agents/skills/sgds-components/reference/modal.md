# SGDS Modal Component Skill

`<sgds-modal>` renders a dialog overlay that traps focus until dismissed. Use it for confirmations, alerts, or focused tasks that require user attention before continuing.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Size?**
- Default → `size="md"` (default)
- Small → `size="sm"` / Large → `size="lg"` / Extra large → `size="xl"` / Full screen → `size="fullscreen"`

**Prevent closing on overlay/Esc?** → Listen for `sgds-close` and call `event.preventDefault()`

**Hide the close button?** → Add `noCloseButton`

**Disable open/close animation?** → Add `noAnimation`

**Open/close programmatically?** → Use the `show()` and `hide()` methods

```html
<!-- Basic modal triggered by a button -->
<sgds-button id="open-modal">Open Modal</sgds-button>
<sgds-modal id="my-modal">
  <h2 slot="title">Modal Title</h2>
  <p slot="description">Brief description of what this modal is for.</p>
  <p>Main content goes in the default slot. Forms, text, or any body content belongs here.</p>
  <sgds-button slot="footer" variant="link" id="close-modal">Cancel</sgds-button>
  <sgds-button slot="footer" variant="primary">Confirm</sgds-button>
</sgds-modal>

<script>
  document.getElementById("open-modal").addEventListener("click", () => {
    document.getElementById("my-modal").show();
  });
  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("my-modal").hide();
  });
</script>

<!-- Prevent close from overlay/keyboard — require explicit button press -->
<sgds-modal id="confirm-modal">
  <h2 slot="title">Delete Item?</h2>
  <p>This action cannot be undone.</p>
  <sgds-button slot="footer" variant="link" id="cancel-delete">Cancel</sgds-button>
  <sgds-button slot="footer" variant="danger" id="confirm-delete">Delete</sgds-button>
</sgds-modal>

<script>
  document.getElementById("confirm-modal").addEventListener("sgds-close", e => {
    if (e.detail.source !== "close-button") {
      e.preventDefault();
    }
  });
</script>

<!-- Full screen modal -->
<sgds-modal size="fullscreen">
  <h2 slot="title">Full Screen Modal</h2>
  <p>Content that benefits from maximum screen real estate.</p>
</sgds-modal>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `open` | boolean | `false` | Controls modal visibility; reflects when using `show()`/`hide()` |
| `size` | `sm \| md \| lg \| xl \| fullscreen` | `md` | Size of the modal dialog |
| `noAnimation` | boolean | `false` | Disables open/close animations |
| `noCloseButton` | boolean | `false` | Hides the close button in the modal header |

## Slots

| Slot | Purpose |
|---|---|
| `title` | Modal heading |
| `description` | Brief description below the title |
| *(default)* | Main body content |
| `footer` | Footer area; typically holds action buttons |

## Events

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | No | — | Modal begins opening |
| `sgds-after-show` | No | — | Modal fully open (animation complete) |
| `sgds-hide` | No | — | Modal begins closing |
| `sgds-after-hide` | No | — | Modal fully closed (animation complete) |
| `sgds-close` | Yes | `{ source: 'close-button' \| 'overlay' \| 'keyboard' }` | User attempts to close — call `event.preventDefault()` to keep it open |

## Public Methods

| Method | Description |
|---|---|
| `show()` | Opens the modal |
| `hide()` | Closes the modal |

---

**For AI agents**:
1. Use `show()` / `hide()` methods to open/close programmatically; the `open` attribute reflects the current state.
2. `sgds-close` is cancelable — call `event.preventDefault()` to prevent closing. Check `event.detail.source` for `'close-button'`, `'overlay'`, or `'keyboard'` to apply conditional logic.
3. Place action buttons in the `footer` slot — typically a cancel/link button and a primary action button.
4. Modal renders a built-in close button by default. Set `noCloseButton` to hide it — useful for mandatory confirmations where only footer buttons should dismiss the modal.
5. Footer buttons that close the modal must call `modal.hide()` explicitly — they do not auto-close the modal.
