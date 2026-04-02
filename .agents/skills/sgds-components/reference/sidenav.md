# SGDS Sidenav Component Skill

`<sgds-sidenav>` is a vertical sidebar navigation. `<sgds-sidenav-item>` creates either a collapsible menu section (when it has children) or a direct link (when an `<a>` is placed directly inside). `<sgds-sidenav-link>` is for individual L2/L3 navigation links.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
