# SGDS Drawer Component Skill

`<sgds-drawer>` is a panel that slides in from a screen edge and overlays the page content. Use it for secondary navigation, filters, or any contextual content that shouldn't interrupt the main layout.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For secondary navigation panels, contextual filters, or settings that the user can open and dismiss without leaving the current page.
- When content is too detailed for a tooltip or popover but does not warrant a full modal interruption.
- For multi-step or form-heavy side flows (e.g. add/edit record) that should stay accessible alongside the main view.
- When the panel needs to be scoped within a container (not full viewport) — use `contained`.

### When NOT to use

- For critical, blocking decisions that require immediate user action before continuing — use `<sgds-modal>` instead.
- For simple confirmations or short messages — use `<sgds-modal>` or `<sgds-alert>`.
- As a replacement for a page — if the content warrants its own URL and navigation, use a separate route.
- When the interaction is passive and non-interruptive — use `<sgds-alert>` or `<sgds-toast>` instead.

## Behaviour

- Slides in from the screen edge defined by `placement`: `end` (right, default), `start` (left), `top`, or `bottom`.
- `size` controls the panel width (for `start`/`end`) or height (for `top`/`bottom`): `sm` (default), `md`, `lg`.
- Renders a backdrop overlay; clicking the overlay fires `sgds-request-close` with `source: "overlay"`.
- Pressing `Escape` fires `sgds-request-close` with `source: "keyboard"`.
- The built-in close button fires `sgds-request-close` with `source: "close-button"`.
- Call `event.preventDefault()` on `sgds-request-close` to block closing — e.g. when the user has unsaved changes.
- `contained` scopes the drawer within its nearest positioned ancestor instead of the viewport; the parent must have `position: relative` and an explicit height.
- `sgds-initial-focus` fires when the drawer opens — call `event.preventDefault()` to manually control which element receives focus.
- Open/close programmatically via `show()` and `hide()` methods.

## Component Composition

**`title` slot** — concise heading (e.g. `<h4>`) describing the drawer's purpose (e.g. "Filter Results", "Edit Record").

**`description` slot** — one-line context below the title; omit if the title is self-explanatory.

**Body slot (`default`)** — filter forms, edit-record forms, settings panels, detail views, or navigation link lists. The drawer body scrolls, so longer content is acceptable here compared to a modal.

**`footer` slot** — action buttons: a primary save/apply action (`<sgds-button variant="primary">`) and a cancel action (`<sgds-button variant="link">`). Both must call `hide()` explicitly.

**Avoid placing inside a drawer:**
- Nested drawers — not a supported pattern
- Content that users need to compare simultaneously with the page behind the overlay
- Full data tables with horizontal scroll — creates a poor double-scroll UX inside the panel

## Advanced Considerations

- **`sgds-request-close` guard**: inspect `event.detail.source` to apply different close guards per trigger — e.g. allow the close button but block overlay clicks when unsaved changes exist.
- **`contained` mode**: requires `position: relative` and an explicit `height` on the parent element — without these, the drawer will use the full viewport instead.
- **Focus management**: by default, focus moves to the first focusable element inside the drawer on open. Cancel `sgds-initial-focus` and set focus manually when the default target is not the right choice.
- **`open` attribute**: reflects the current visibility state and can be used for initial render in an open state; for programmatic control prefer `show()` / `hide()`.
- **`sgds-after-show` / `sgds-after-hide`**: use these for post-animation actions (e.g. loading content after open, cleanup after close) rather than `sgds-show` / `sgds-hide` which fire before animation completes.

## Edge Cases

- **Unsaved changes guard**: if `sgds-request-close` is always prevented, the user has no way to close the drawer — always provide an explicit action button that calls `hide()`.
- **`contained` without positioned parent**: the drawer falls back to viewport-level rendering — always verify the parent has `position: relative` and a defined height.
- **Stacked drawers**: opening multiple drawers simultaneously is not a supported pattern — close the current drawer before opening another.
- **No footer slot**: the drawer renders without a footer; ensure the body content provides a clear close mechanism if no footer buttons are used.
- **Long body content**: the drawer body is scrollable by default — content does not expand the panel height; this is expected behaviour.

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
