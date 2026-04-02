# SGDS Drawer Component Skill

`<sgds-drawer>` is a panel that slides in from a screen edge and overlays the page content. Use it for secondary navigation, filters, or any contextual content that shouldn't interrupt the main layout.

## Quick Decision Guide

**Which edge does the drawer open from?**
- Right edge → `placement="end"` (default)
- Left edge → `placement="start"`
- Top edge → `placement="top"`
- Bottom edge → `placement="bottom"`

**Size?** → `size="sm"` (default), `size="md"`, `size="lg"`

**Scoped inside a container (not full viewport)?** → Add `contained`

**Open/close programmatically?** → Use the `show()` and `hide()` methods

```html
<!-- Basic drawer triggered by a button -->
<sgds-button id="open-btn">Open Drawer</sgds-button>
<sgds-drawer id="my-drawer" size="sm" placement="end">
  <h4 slot="title">Drawer Title</h4>
  <p slot="description">Brief drawer description</p>
  Main content goes in the default slot.
  <div slot="footer">
    <sgds-button id="close-btn">Close</sgds-button>
  </div>
</sgds-drawer>

<script>
  document.getElementById("open-btn").addEventListener("click", () => {
    document.getElementById("my-drawer").show();
  });
  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("my-drawer").hide();
  });
</script>

<!-- Start open with `open` attribute -->
<sgds-drawer open placement="start">
  <h4 slot="title">Left Drawer</h4>
  Content here.
</sgds-drawer>

<!-- Prevent closing when user clicks overlay or presses Escape -->
<sgds-drawer id="confirm-drawer">
  <h4 slot="title">Unsaved Changes</h4>
  You have unsaved changes.
  <div slot="footer">
    <sgds-button id="discard">Discard</sgds-button>
    <sgds-button variant="primary" id="save">Save</sgds-button>
  </div>
</sgds-drawer>

<script>
  document.getElementById("confirm-drawer").addEventListener("sgds-request-close", e => {
    // Prevent close from overlay/keyboard — require explicit button press
    if (e.detail.source !== "close-button") {
      e.preventDefault();
    }
  });
</script>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `open` | boolean | `false` | Controls whether the drawer is visible |
| `size` | `sm \| md \| lg` | `sm` | Width/height of the drawer panel |
| `placement` | `top \| end \| bottom \| start` | `end` | Which screen edge the drawer slides from |
| `contained` | boolean | `false` | Scopes the drawer within its positioned parent instead of the viewport |

## Slots

| Slot | Purpose |
|---|---|
| `title` | Drawer heading |
| `description` | Brief description below the title |
| *(default)* | Main body content |
| `footer` | Footer area; typically holds action buttons |

## Events

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | No | — | Drawer begins opening |
| `sgds-after-show` | No | — | Drawer fully open (animation complete) |
| `sgds-hide` | No | — | Drawer begins closing |
| `sgds-after-hide` | No | — | Drawer fully closed (animation complete) |
| `sgds-initial-focus` | Yes | — | Drawer is open and ready for focus; call `event.preventDefault()` to manage focus manually |
| `sgds-request-close` | Yes | `{ source: 'close-button' \| 'keyboard' \| 'overlay' }` | User attempts to close — call `event.preventDefault()` to keep it open |

## Public Methods

| Method | Description |
|---|---|
| `show()` | Opens the drawer |
| `hide()` | Closes the drawer |

---

**For AI agents**:
1. Use `show()` / `hide()` methods to open/close the drawer programmatically; the `open` attribute reflects the current state.
2. `sgds-request-close` is cancelable — call `event.preventDefault()` to prevent closing (e.g. to confirm unsaved changes). Check `event.detail.source` to distinguish user actions.
3. `contained` requires the parent element to have `position: relative` and explicit height for proper scoping.
4. `sgds-initial-focus` is cancelable — call `event.preventDefault()` to control which element receives focus when the drawer opens.
5. Footer slot typically holds `<sgds-button>` elements for primary and secondary actions.
