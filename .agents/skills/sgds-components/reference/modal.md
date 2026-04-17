# SGDS Modal Component Skill

`<sgds-modal>` renders a dialog overlay that traps focus until dismissed. Use it for confirmations, alerts, or focused tasks that require user attention before continuing.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For blocking confirmations that require an explicit user decision before proceeding (e.g. "Delete this item?", "Confirm submission").
- For focused tasks that should not be interrupted by the surrounding page (e.g. a short form, image preview, error details).
- When the user must acknowledge important information before continuing.
- For destructive actions where accidental triggering would be costly — enforce explicit confirmation.

### When NOT to use

- For non-blocking contextual content — use `<sgds-drawer>` for side panels or `<sgds-alert>` for inline feedback.
- For transient status messages — use `<sgds-toast>`.
- For complex, multi-step workflows that require significant screen space — consider a dedicated page or `<sgds-drawer>` instead.
- For simple confirmations where a toast or inline message is sufficient.

## Behaviour

- Renders a dialog overlay that traps focus within the modal until it is closed.
- Clicking the backdrop overlay or pressing `Escape` fires `sgds-close` with the respective `source`; call `event.preventDefault()` to block closing.
- The built-in header close button fires `sgds-close` with `source: "close-button"`.
- Footer buttons do not auto-close the modal — always call `modal.hide()` explicitly from button handlers.
- `noCloseButton` hides the header close button — useful when only explicit footer button actions should dismiss the modal.
- `noAnimation` disables open/close transition animations.
- `size` controls modal width: `sm`, `md` (default), `lg`, `xl`, `fullscreen`.
- Open/close programmatically via `show()` and `hide()` methods.

## Component Composition

**`title` slot** — a single heading element (e.g. `<h2>`) with a concise label (2–6 words) that describes the task or confirmation.

**`description` slot** — one-line context below the title; omit if the title is already self-explanatory.

**Body slot (`default`)** — short forms (3–5 fields), confirmation text, detail views, or image previews. Keep body concise — the modal body scrolls, but long content is a sign that a dedicated page or `<sgds-drawer>` is a better fit.

**`footer` slot** — always include two actions: a dismiss/cancel action (`<sgds-button variant="link">`) and a primary action (`<sgds-button variant="primary">`). Both must call `modal.hide()` explicitly; footer buttons do not auto-close the modal.

**Avoid placing inside a modal:**
- Data tables with horizontal scroll — they overflow the fixed modal width
- Nested modals or drawers — not a supported pattern
- Multi-step flows requiring significant vertical space — consider a dedicated page instead

## Advanced Considerations

- **`sgds-close` guard**: inspect `event.detail.source` (`"close-button"`, `"overlay"`, `"keyboard"`) to apply different close guards — e.g. allow the close button but block overlay/keyboard when the user has unsaved input.
- **`noCloseButton` with mandatory confirmation**: combine with a `sgds-close` guard on overlay/keyboard to ensure the user can only dismiss via explicit footer action.
- **Focus trap**: the modal traps focus automatically — do not manually manage focus within the modal body unless a specific element needs programmatic focus on open.
- **`sgds-after-show` / `sgds-after-hide`**: use these for post-animation actions (e.g. loading content after open, cleanup after close) rather than `sgds-show` / `sgds-hide`.
- **Footer action pattern**: always include a cancel/secondary action and a primary action in the `footer` slot; both must call `hide()` explicitly.

## Edge Cases

- **No footer buttons with `noCloseButton`**: if both the close button and footer dismiss buttons are absent, the user has no way to close the modal — always provide at least one dismiss action.
- **Prevent-all-close guard**: if `sgds-close` is always prevented, the modal cannot be closed at all — always leave an escape path (e.g. a footer button that calls `hide()`).
- **Long body content**: the modal body scrolls internally — content does not expand the modal height beyond `size`; this is expected behaviour.
- **`open` attribute on initial render**: sets the modal visible immediately without animation — ensure page content is ready before using this pattern.
- **Nested interactive content**: forms and interactive elements inside the modal are fully accessible within the focus trap; ensure form submission does not navigate away without closing the modal first.

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
6. The close event on `<sgds-modal>` is named `sgds-close`; on `<sgds-drawer>` the equivalent is named `sgds-request-close`. Do not confuse the two event names when working with both components.
