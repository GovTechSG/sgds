# SGDS Mainnav Component Skill

`<sgds-mainnav>` is the primary horizontal navigation bar. It collapses into a hamburger menu on small screens. Navigation items use `<sgds-mainnav-item>` and dropdown menus use `<sgds-mainnav-dropdown>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- As the primary horizontal navigation bar for any Singapore Government digital service or web application.
- When users need to navigate between top-level sections of a site from a persistent header.
- When the site has a brand logo that should link back to the homepage.
- When some nav items should expand into dropdown menus with sub-links.
- When right-aligned items (e.g. login button, language toggle) are needed in the navigation bar.

### When NOT to use

- For secondary or section-level navigation — use `<sgds-subnav>` or `<sgds-sidenav>` instead.
- For in-page navigation between sections — use `<sgds-table-of-contents>`.
- As the sole navigation in a sidebar layout — use `<sgds-sidebar>` or `<sgds-sidenav>`.
- When navigation is minimal and does not require a full header bar — consider a simpler standalone link structure.

## Behaviour

- Renders a horizontal navigation bar with a brand area, primary nav items, and optional right-aligned items.
- Collapses into a hamburger menu at the breakpoint defined by `expand` (default `lg`); use `expand="always"` to never collapse or `expand="never"` to always show the hamburger.
- `<sgds-mainnav-item>` renders a nav link; the default slot takes an `<a>` tag.
- `<sgds-mainnav-dropdown>` renders a dropdown trigger with `<sgds-dropdown-item>` children; the `toggler` slot takes the trigger element.
- Items in the `end` slot are right-aligned and also collapse into the hamburger menu on small screens.
- Items in the `non-collapsible` slot remain visible at all screen sizes regardless of the `expand` setting.
- `active` on `<sgds-mainnav-item>` highlights the current page link.
- Fires `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide` when the collapsed menu opens or closes (mobile only).

## Component Composition

**`brand` slot** — a single `<img>` with `alt`, `width`, and `src`. Set `brandHref` on `<sgds-mainnav>` to the homepage URL (`"/"`). Always provide brand content.

**Default slot** — `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements for primary navigation. Do not place other elements directly in the default slot.

**Inside `<sgds-mainnav-item>`** — a single `<a href="...">Label</a>`. Set `active` on the item matching the current route.

**Inside `<sgds-mainnav-dropdown>`** — a `toggler` slot element (typically `<span>` with the section label) and `<sgds-dropdown-item>` children with `<a>` tags for sub-navigation links.

**`end` slot** — right-aligned secondary actions: login button (`<sgds-button>`), language toggle (`<sgds-mainnav-item>`), or similar. These also collapse into the hamburger menu on small screens.

**`non-collapsible` slot** — items that stay visible at all screen sizes regardless of hamburger collapse state (e.g. a language icon, accessibility toggle).

**Avoid placing inside mainnav:**
- Form inputs or search bars in the default slot — use the `end` slot or a dedicated search component
- More than 5–7 primary nav items — consolidate into dropdowns to prevent overflow at mid-size breakpoints

## Advanced Considerations

- **`non-collapsible` slot**: use for items that must always be visible (e.g. a language toggle icon) — these are not hidden when the nav collapses.
- **`end` slot collapse behaviour**: items in `end` collapse into the hamburger menu alongside default slot items — if an item must stay visible on mobile, use `non-collapsible` instead.
- **`<sgds-mainnav-dropdown>` API**: inherits `<sgds-dropdown>` properties — see [dropdown.md](dropdown.md) for `active`, `menuIsOpen`, `close`, and `drop` options.
- **`fluid` layout**: by default the mainnav uses a fixed-width container; set `fluid` for full-width layouts (e.g. dashboards or edge-to-edge designs).
- **Singapore Government requirement**: `<sgds-masthead>` must appear above `<sgds-mainnav>` on all Singapore Government digital services.

## Edge Cases

- **No brand slot content**: the brand area renders empty — always provide an `<img>` in the `brand` slot and set `brandHref`.
- **No `active` item set**: no nav item is highlighted — set `active` on the item matching the current route; update it on route changes in SPAs.
- **`expand="never"` on desktop**: the hamburger menu is always shown even on wide screens — only use `never` for contexts where a collapsed nav is always desired.
- **Dropdown without `toggler` slot content**: the dropdown trigger renders with no label — always provide a `<span>` or button in the `toggler` slot.
- **Many nav items**: the horizontal bar may overflow on mid-size screens — test at the `expand` breakpoint and consider consolidating items into a dropdown.

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
