# SGDS Subnav Component Skill

`<sgds-subnav>` is a horizontal secondary navigation bar, typically placed below `<sgds-mainnav>`. It supports a header title, navigation links via `<sgds-subnav-item>`, and optional action buttons.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Need action buttons alongside the nav?** → Use the `actions` slot for `<sgds-button>` elements

**Section header text?** → Use the `header` slot

**Mark current section?** → Add `active` to the relevant `<sgds-subnav-item>`

```html
<!-- Basic subnav -->
<sgds-subnav>
  <h5 slot="header">Documentation</h5>
  <sgds-subnav-item active>
    <a href="/overview">Overview</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="/usage">Usage</a>
  </sgds-subnav-item>
  <sgds-subnav-item>
    <a href="/api">API Reference</a>
  </sgds-subnav-item>
  <sgds-subnav-item disabled>
    <a href="/changelog">Changelog</a>
  </sgds-subnav-item>
</sgds-subnav>

<!-- Subnav with action buttons -->
<sgds-subnav>
  <h5 slot="header">Events 2024</h5>
  <sgds-subnav-item active><a href="/overview">Overview</a></sgds-subnav-item>
  <sgds-subnav-item><a href="/programme">Programme</a></sgds-subnav-item>
  <sgds-subnav-item><a href="/speakers">Speakers</a></sgds-subnav-item>
  <sgds-subnav-item><a href="/faq">FAQ</a></sgds-subnav-item>
  <sgds-button slot="actions" size="sm">Register</sgds-button>
  <sgds-button slot="actions" size="sm">Exhibit</sgds-button>
</sgds-subnav>
```

## API Summary

### `<sgds-subnav>`

No attributes.

### `<sgds-subnav-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Marks the item as the current active section |
| `disabled` | boolean | `false` | Disables the nav item |

## Slots

### `<sgds-subnav>`

| Slot | Purpose |
|---|---|
| `header` | Optional section heading (e.g. `<h5>`) |
| *(default)* | `<sgds-subnav-item>` navigation items |
| `actions` | Action buttons displayed on the right (e.g. `<sgds-button>`) |

### `<sgds-subnav-item>`

| Slot | Purpose |
|---|---|
| *(default)* | Anchor `<a>` tag for navigation |

## Events

None.

---

**For AI agents**:
1. Always place `<a>` tags inside `<sgds-subnav-item>` — never place bare text or external anchors directly.
2. Only one item should have `active` at a time to indicate the current section.
3. Action buttons in the `actions` slot should use `size="sm"` to match the compact subnav height.
4. There are no custom events or public methods on this component.
