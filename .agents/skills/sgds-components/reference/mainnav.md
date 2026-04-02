# SGDS Mainnav Component Skill

`<sgds-mainnav>` is the primary horizontal navigation bar. It collapses into a hamburger menu on small screens. Navigation items use `<sgds-mainnav-item>` and dropdown menus use `<sgds-mainnav-dropdown>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**When does the navbar collapse into hamburger?** → `expand="lg"` (default) — collapses below the `lg` breakpoint

**Never collapse (always expanded)?** → `expand="always"`

**Always collapsed?** → `expand="never"`

**Full-width container?** → Add `fluid`

**Brand logo link?** → Set `brandHref` to the target URL

```html
<!-- Full mainnav example -->
<sgds-mainnav brandHref="/">
  <img slot="brand" alt="Site logo" width="130" src="/logo.svg" />

  <!-- Primary nav items -->
  <sgds-mainnav-item>
    <a href="/about">About</a>
  </sgds-mainnav-item>

  <sgds-mainnav-item active>
    <a href="/services">Services</a>
  </sgds-mainnav-item>

  <!-- Dropdown nav item -->
  <sgds-mainnav-dropdown>
    <span slot="toggler">Resources</span>
    <sgds-dropdown-item><a href="/docs">Documentation</a></sgds-dropdown-item>
    <sgds-dropdown-item><a href="/faq">FAQ</a></sgds-dropdown-item>
  </sgds-mainnav-dropdown>

  <!-- Right-aligned items (end slot) -->
  <sgds-mainnav-item slot="end">
    <a href="/contact">Contact Us</a>
  </sgds-mainnav-item>
  <sgds-button slot="end">Login</sgds-button>
</sgds-mainnav>
```

## API Summary

### `<sgds-mainnav>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `expand` | `sm \| md \| lg \| xl \| xxl \| always \| never` | `lg` | Breakpoint below which the nav collapses |
| `brandHref` | string | `""` | URL for the brand logo link |
| `fluid` | boolean | `false` | Uses a full-width container instead of a fixed-width one |

### `<sgds-mainnav-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Marks the item as the current active page |
| `disabled` | boolean | `false` | Disables the nav item |

### `<sgds-mainnav-dropdown>`

Inherits `<sgds-dropdown>` properties — see **[components-dropdown](dropdown.md)** for full API.

Key properties: `active`, `menuIsOpen`, `close`, `drop`.

## Slots

### `<sgds-mainnav>`

| Slot | Purpose |
|---|---|
| `brand` | Brand logo image |
| *(default)* | `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements |
| `end` | Items right-aligned in the navbar; also collapses into the hamburger menu |
| `non-collapsible` | Items that stay visible even when the menu is collapsed |

### `<sgds-mainnav-item>`

| Slot | Purpose |
|---|---|
| *(default)* | Anchor `<a>` tag for navigation |

### `<sgds-mainnav-dropdown>`

| Slot | Purpose |
|---|---|
| `toggler` | The element that toggles the dropdown (typically `<span>` or `<sgds-button>`) |
| *(default)* | `<sgds-dropdown-item>` elements |

## Events (`<sgds-mainnav>`)

| Event | When |
|---|---|
| `sgds-show` | Collapsed menu begins expanding (mobile only) |
| `sgds-after-show` | Collapsed menu fully expanded |
| `sgds-hide` | Collapsed menu begins collapsing |
| `sgds-after-hide` | Collapsed menu fully collapsed |

---

**For AI agents**:
1. Always place the brand logo in the `brand` slot using an `<img>` element; set `brandHref` to `"/"` for home navigation.
2. Regular nav links use `<a>` tags inside `<sgds-mainnav-item>`.
3. Right-aligned items (login button, contact link) go in the `end` slot.
4. `non-collapsible` slot stays visible on all screen sizes — use for icons that should never collapse.
5. The collapsed menu events fire only on mobile breakpoints when using the hamburger toggle.
6. Use `<sgds-masthead>` above `<sgds-mainnav>` as required for Singapore Government sites.
