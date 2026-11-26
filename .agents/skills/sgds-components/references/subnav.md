# SGDS Subnav Component Skill

`<sgds-subnav>` is a horizontal secondary navigation bar, typically placed below `<sgds-mainnav>`. It supports a header title, navigation links via `<sgds-subnav-item>`, and optional action buttons.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When a page section has multiple sub-sections that users navigate between, and the main navigation already provides top-level structure.
- Directly below `<sgds-mainnav>` to provide a secondary tier of navigation for a specific section (e.g. a product area, documentation site, event microsite).
- When optional call-to-action buttons (e.g. Register, Download) are contextually relevant to the current section and should appear alongside the navigation.

### When NOT to use

- As a replacement for `<sgds-mainnav>` — `<sgds-subnav>` is a secondary nav and assumes a primary nav already exists.
- For top-level site navigation — use `<sgds-mainnav>` instead.
- When navigation items are deeply nested (more than two levels) — use `<sgds-sidenav>` for complex hierarchies.
- For in-page anchor navigation on a single page — use `<sgds-table-of-contents>` instead.

## Behaviour

- Renders a horizontal secondary navigation bar intended for placement directly below `<sgds-mainnav>`.
- The `header` slot renders a section title on the left (e.g. `<h5>`).
- The default slot renders `<sgds-subnav-item>` elements as navigation links.
- The `actions` slot renders action elements (e.g. `<sgds-button>`) on the right side.
- `active` on `<sgds-subnav-item>` highlights the current section — only one item should be active at a time.
- `disabled` on `<sgds-subnav-item>` prevents interaction with that nav item.
- No custom events or public methods — active state is managed via the `active` attribute.

## Advanced Considerations

- **`active` state management**: the component does not track route changes automatically — update the `active` attribute on the correct item when the route changes (e.g. on navigation in a SPA).
- **`actions` slot sizing**: buttons in the `actions` slot should use `size="sm"` to align with the compact height of the subnav bar.
- **Header slot heading level**: choose a heading level that fits the surrounding document hierarchy — `<h5>` is typical, but use `<h4>` or `<h6>` if the surrounding context requires it.
- **Overflow on small viewports**: `<sgds-subnav>` does not natively handle overflow — on narrow screens, items may clip; consider limiting the number of nav items or providing a responsive fallback.

## Edge Cases

- **No `active` item**: the subnav renders without any highlighted item — always set `active` on the item matching the current route.
- **Multiple `active` items**: visually highlights more than one item — only one item should have `active` at a time.
- **Empty default slot**: renders a subnav with a header and/or actions but no nav items — always include at least one `<sgds-subnav-item>`.
- **Bare text in `<sgds-subnav-item>`**: the slot expects an `<a>` tag — placing raw text provides no navigation functionality.
- **`disabled` on an already-active item**: the item appears both active and disabled — avoid combining these states on the same item.

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
