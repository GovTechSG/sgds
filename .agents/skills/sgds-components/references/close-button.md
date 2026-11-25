# SGDS Close Button Component Skill

`<sgds-close-button>` renders a standardised close/dismiss button (× icon). It is used internally by `<sgds-alert>`, `<sgds-drawer>`, `<sgds-modal>`, `<sgds-toast>`, `<sgds-badge>`, and `<sgds-file-upload>`. Use it directly only when building custom dismissible UI that those components do not cover.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When building a custom dismissible UI element (e.g. a custom panel, overlay, or notification) that is not covered by existing SGDS components.
- When a standalone × button is needed as part of a custom composite component.

### When NOT to use

- Inside `<sgds-alert>` — use `dismissible` on the alert instead.
- Inside `<sgds-modal>`, `<sgds-drawer>`, or `<sgds-toast>` — those components embed their own close button automatically.
- Inside `<sgds-badge>` or `<sgds-file-upload>` — both have built-in dismiss behaviour.
- As a general-purpose action button — use `<sgds-icon-button>` or `<sgds-button>` for actions that are not strictly dismiss/close.

## Behaviour

- Renders a × icon button with no visible text label.
- `size` controls the button size: `sm` or `md` (default).
- `tone` controls the colour: `default` (adapts to the active theme), `fixed-light` (for dark backgrounds), `fixed-dark` (for light backgrounds regardless of theme).
- Fires the native `click` event — there are no custom events.
- Has no slots, no public methods, and no accessible label built in — provide an `aria-label` on the element or via surrounding context when used standalone.

## Advanced Considerations

- **Internal usage**: `<sgds-close-button>` is embedded inside `<sgds-alert dismissible>`, `<sgds-modal>`, `<sgds-drawer>`, `<sgds-toast>`, `<sgds-badge>` (dismissible), and `<sgds-file-upload>` — do not add it again inside these components.
- **No custom events**: only the native `click` event fires; use `element.addEventListener("click", handler)` rather than `sgds-close` or similar.
- **`tone` for themed surfaces**: use `default` on standard page backgrounds, `fixed-light` on dark backgrounds, and `fixed-dark` only when the background is always light regardless of day/night theme state.
- **No public methods**: show/hide of the associated UI must be managed entirely by the host application.

## Edge Cases

- **Missing `aria-label`**: the button is inaccessible to screen readers — always provide one in standalone usage.
- **Used inside a component that embeds it**: results in a duplicate dismiss control — check whether the parent component already handles dismissal before adding manually.
- **`tone` mismatch**: using `default` on a dark background may result in low contrast — always use `fixed-light` on dark surfaces.
- **Click handler not attached**: the button renders and is interactive but nothing happens — always wire up the `click` listener in the host application.

## Quick Decision Guide

**Does a built-in component already handle this?**
- Dismissible alert → use `<sgds-alert dismissible>` instead
- Dismissible drawer / modal / toast → those components have their own built-in close button
- Custom dismissible UI → use `<sgds-close-button>` directly

**Which `size`?**
- Default → `md`
- Compact contexts → `sm`

**Which `tone`?**
- Default (adapts to theme) → `default`
- On a dark surface → `fixed-light`
- On a light surface regardless of theme → `fixed-dark`

```html
<!-- Default close button -->
<sgds-close-button></sgds-close-button>

<!-- Small close button -->
<sgds-close-button size="sm"></sgds-close-button>

<!-- On a dark background -->
<div style="background-color: #333; padding: 12px;">
  <sgds-close-button tone="fixed-light"></sgds-close-button>
</div>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `size` | `sm \| md` | `md` | Button size |
| `tone` | `default \| fixed-dark \| fixed-light` | `default` | Button tone |

## Slots

None.

## Events

No custom events. Fires the native `click` event on interaction — listen with `addEventListener("click", handler)`.

---

**For AI agents**:
1. Prefer using the `dismissible` attribute on `<sgds-alert>`, `<sgds-badge>`, `<sgds-toast>` etc. rather than manually adding `<sgds-close-button>` — those components already embed it.
2. Use `<sgds-close-button>` directly only when building custom dismissible UI not covered by existing components.
3. There are no slots, no custom events, and no public methods — only native `click`.
4. `tone="fixed-light"` is for dark backgrounds; `tone="fixed-dark"` is for light backgrounds when overriding theme behaviour.
