# SGDS Close Button Component Skill

`<sgds-close-button>` renders a standardised close/dismiss button (× icon). It is used internally by `<sgds-alert>`, `<sgds-drawer>`, `<sgds-modal>`, `<sgds-toast>`, `<sgds-badge>`, and `<sgds-file-upload>`. Use it directly only when building custom dismissible UI that those components do not cover.

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
