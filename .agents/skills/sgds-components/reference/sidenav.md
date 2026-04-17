# SGDS Sidenav Component Skill

`<sgds-sidenav>` is a vertical sidebar navigation. `<sgds-sidenav-item>` creates either a collapsible menu section (when it has children) or a direct link (when an `<a>` is placed directly inside). `<sgds-sidenav-link>` is for individual L2/L3 navigation links.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For hierarchical site or section navigation where content is organised into multiple levels (L1 → L2 → L3).
- In dashboard or internal tool layouts where persistent vertical navigation is needed alongside main content — use with the sidebar app layout (`sgds-container-sidebar`).
- When navigation has enough items that a horizontal nav bar would overflow or require a dropdown — a sidenav handles depth naturally.
- When the current page context needs to be visually communicated within a collapsible navigation tree (via `active` on both item and link).

### When NOT to use

- For top-level site navigation — use `<sgds-mainnav>` instead.
- For simple secondary navigation within a single page — use `<sgds-subnav>` or `<sgds-table-of-contents>`.
- When navigation has only one or two levels with few items — horizontal navigation or a simple link list is sufficient.
- On mobile-first layouts where vertical sidebar space is limited — consider a drawer-based navigation pattern instead.

## Behaviour

- `<sgds-sidenav-item>` operates in two modes:
  - **Menu type**: use `<span slot="title">` with `<sgds-sidenav-link>` children — renders as a collapsible section.
  - **Link type**: place `<a>` directly inside with no `title` slot — renders as a direct navigation link.
- `active` on a menu-type `<sgds-sidenav-item>` automatically opens the section on initial render.
- `active` on `<sgds-sidenav-link>` highlights the current page link.
- `disabled` on `<sgds-sidenav-item>` or `<sgds-sidenav-link>` prevents interaction.
- `sticky` on `<sgds-sidenav>` applies `position: sticky` — requires the parent to have sufficient height and `overflow: auto`.
- Nesting supported up to L3 — a `<sgds-sidenav-item>` (menu type) can contain other `<sgds-sidenav-item>` elements.
- Collapse/expand events (`sgds-toggle`, `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide`) fire on menu-type items only.

## Advanced Considerations

- **`active` propagation**: setting `active` on the parent `<sgds-sidenav-item>` opens the section, but also set `active` on the specific `<sgds-sidenav-link>` to highlight the current page — the two are independent.
- **`sticky` requirements**: for `sticky` to work, the sidenav's parent container must have a defined height and `overflow: auto` or `overflow: scroll`; stickiness silently fails if the parent collapses to fit its content.
- **Event scope**: collapse/expand events only fire on menu-type `<sgds-sidenav-item>` elements — link-type items and `<sgds-sidenav-link>` do not emit events.
- **L3 nesting**: place a `<sgds-sidenav-item>` (menu type) inside another `<sgds-sidenav-item>`'s default slot to create a nested section; avoid nesting deeper than L3.
- **Route integration**: in SPAs, update `active` attributes on the correct item and link when the route changes — the component does not track navigation automatically.

## Edge Cases

- **Menu type without `title` slot**: the collapsible trigger has no label — always provide `<span slot="title">` for menu-type items.
- **Link type with `title` slot**: placing both `<span slot="title">` and `<a>` in the default slot creates ambiguous behaviour — use one mode consistently per item.
- **No `active` set**: all sections render collapsed and no link is highlighted — set `active` on the item and link matching the current page.
- **`sticky` parent without height**: the sidenav scrolls with the page instead of sticking — ensure the layout parent has a defined height.
- **Nesting beyond L3**: deeply nested items may render but are not officially supported — limit nesting to three levels.
- **`disabled` on an `active` item**: the item appears active and disabled simultaneously — avoid combining these states.

## Quick Decision Guide

**Sticky sidebar that scrolls with content?** → Add `sticky` on `<sgds-sidenav>`

**Collapsible section (menu type)?** → Put `<span slot="title">` and `<sgds-sidenav-link>` children inside `<sgds-sidenav-item>`

**Direct link (link type)?** → Put `<a>` directly inside `<sgds-sidenav-item>` (no `title` slot and no children)

**Mark current page active (opens the section automatically)?** → Add `active` to `<sgds-sidenav-item>`

```html
<!-- Basic sidenav with menu sections and links -->
<sgds-sidenav>
  <!-- Menu type: collapsible section with child links -->
  <sgds-sidenav-item>
    <span slot="title">Getting Started</span>
    <sgds-sidenav-link active><a href="/overview">Overview</a></sgds-sidenav-link>
    <sgds-sidenav-link><a href="/installation">Installation</a></sgds-sidenav-link>
    <sgds-sidenav-link disabled><a href="/migration">Migration</a></sgds-sidenav-link>
  </sgds-sidenav-item>

  <!-- Nested menu (L3 level) -->
  <sgds-sidenav-item>
    <span slot="title">Components</span>
    <sgds-sidenav-link><a href="/components/button">Buttons</a></sgds-sidenav-link>
    <sgds-sidenav-item>
      <span slot="title">Forms</span>
      <sgds-sidenav-link><a href="/components/input">Input</a></sgds-sidenav-link>
      <sgds-sidenav-link><a href="/components/select">Select</a></sgds-sidenav-link>
    </sgds-sidenav-item>
  </sgds-sidenav-item>

  <!-- Link type: direct link item (no children) -->
  <sgds-sidenav-item>
    <a href="/changelog">Changelog</a>
  </sgds-sidenav-item>
</sgds-sidenav>

<!-- Sticky sidenav -->
<sgds-sidenav sticky>
  <sgds-sidenav-item active>
    <span slot="title">Active Section</span>
    <sgds-sidenav-link active><a href="/page">Current Page</a></sgds-sidenav-link>
  </sgds-sidenav-item>
</sgds-sidenav>
```

## API Summary

### `<sgds-sidenav>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `sticky` | boolean | `false` | Applies `position: sticky` to the sidenav |

### `<sgds-sidenav-item>` (can be menu or link type)

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Opens the section and applies active styles; for link type, marks it as current |
| `disabled` | boolean | `false` | Disables the item |

### `<sgds-sidenav-link>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Marks the link as the current active page |
| `disabled` | boolean | `false` | Disables the link |

## Slots

### `<sgds-sidenav-item>`

| Slot | Purpose |
|---|---|
| `title` | Section header label (menu type only — when using collapsible children) |
| *(default)* | `<sgds-sidenav-link>` children (menu type) or `<a>` direct link (link type) |

### `<sgds-sidenav-link>`

| Slot | Purpose |
|---|---|
| *(default)* | Anchor `<a>` tag for navigation |

## Events (`<sgds-sidenav-item>` — menu type only)

| Event | When |
|---|---|
| `sgds-toggle` | Item button is clicked |
| `sgds-show` | Section begins expanding |
| `sgds-after-show` | Section fully expanded |
| `sgds-hide` | Section begins collapsing |
| `sgds-after-hide` | Section fully collapsed |

---

**For AI agents**:
1. **Menu type** (collapsible): Use `<span slot="title">` + `<sgds-sidenav-link>` children inside `<sgds-sidenav-item>`.
2. **Link type** (direct): Place `<a>` directly inside `<sgds-sidenav-item>` with no `title` slot and no `<sgds-sidenav-link>` children.
3. Events only fire on **menu type** items — not on link type items.
4. Setting `active` on a menu-type `<sgds-sidenav-item>` opens it automatically on load.
5. Nesting is supported up to L3 (sidenav-item inside sidenav-item).
6. For `sticky`, the parent element needs sufficient height and `overflow: auto` for stickiness to work.
