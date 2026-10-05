# SGDS Mainnav Component Skill

`<sgds-mainnav>` is the primary horizontal navigation bar for public-facing Singapore Government digital services. It collapses into a hamburger menu on small screens. Navigation items use `<sgds-mainnav-item>` and dropdown menus use `<sgds-mainnav-dropdown>`.

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
- For operational/internal apps with coloured backgrounds (brand/gradient) — use `<sgds-appnav>` instead.
- When navigation is minimal and does not require a full header bar — consider a simpler standalone link structure.

## Behaviour

- Renders a horizontal navigation bar with a brand area, primary nav items, and optional right-aligned items.
- Collapses into a hamburger menu at the breakpoint defined by `expand` (default `lg`); use `expand="always"` to never collapse or `expand="never"` to always show the hamburger.
- `<sgds-mainnav-item>` renders a nav link; the default slot takes an `<a>` tag.
- `<sgds-mainnav-dropdown>` renders a dropdown trigger with `<sgds-dropdown-item>` children; the `toggler` slot takes the trigger element.
- Items in the `end` slot are right-aligned and also collapse into the hamburger menu on small screens.
- Items in the `non-collapsible` slot remain visible at all screen sizes regardless of the `expand` setting.
- Items in the `profile` slot are positioned at the far right in desktop. When `<sgds-mainnav-profile>` is used, it renders its avatar as a toggler for its own self-contained mobile panel (independent from mainnav's collapsed menu body). The hamburger toggler is always rendered alongside the profile.
- `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` can coexist with `<sgds-mainnav-profile>` — both the hamburger menu (for nav items) and the profile's own mobile panel work independently.
- `active` on `<sgds-mainnav-item>` highlights the current page link.
- Fires `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide` when the collapsed menu opens or closes (mobile only).

## Component Composition

**`brand` slot** — a single `<img>` with `alt`, `width`, and `src`. Set `brandHref` on `<sgds-mainnav>` to the homepage URL (`"/"`). Always provide brand content.

**Default slot** — `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements for primary navigation. Do not place other elements directly in the default slot.

**Inside `<sgds-mainnav-item>`** — a single `<a href="...">Label</a>`. Set `active` on the item matching the current route.

**Inside `<sgds-mainnav-dropdown>`** — a `toggler` slot element (typically `<span>` with the section label) and `<sgds-dropdown-item>` children with `<a>` tags for sub-navigation links.

**`end` slot** — right-aligned secondary actions: login button (`<sgds-button>`), language toggle (`<sgds-mainnav-item>`), or similar. These also collapse into the hamburger menu on small screens.

**`non-collapsible` slot** — items that stay visible at all screen sizes regardless of hamburger collapse state (e.g. a language icon, accessibility toggle).

**`profile` slot** — a `<sgds-mainnav-profile>` (preferred) or `<sgds-mainnav-dropdown>` for the user profile/account menu. It renders at the far right of the navigation bar. The profile slot stays in `navbar-end` at all times — it does NOT move into the collapsed menu body.

**`<sgds-mainnav-profile>`** — a self-contained, responsive profile component for the `profile` slot:
- In desktop: renders avatar + label + secondaryText with a dropdown chevron
- In mobile: renders the avatar as a toggler that opens its own self-contained mobile panel (independent from mainnav's hamburger menu)
- Requires an `avatar` slot, `label` prop (user name), optional `secondaryText` prop (agency/role), and default slot items (`<sgds-dropdown-item>` elements)
- Use `readonly` on `<sgds-dropdown-item>` for non-interactive display items (e.g. user info header)

**Avoid placing inside mainnav:**
- Form inputs or search bars in the default slot — use the `end` slot or a dedicated search component
- More than 5–7 primary nav items — consolidate into dropdowns to prevent overflow at mid-size breakpoints

## Advanced Considerations

- **`profile` slot**: use for user account/profile dropdowns. In mobile, `<sgds-mainnav-profile>` renders its avatar toggler alongside the mainnav's hamburger. Both menus operate independently.
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

**User profile dropdown at far right?** → Use `slot="profile"` on a `<sgds-mainnav-profile>` with `label` and `secondaryText` props (preferred).

```html
<!-- Default mainnav example -->
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
  <sgds-mainnav-dropdown ariaLabel="Resources menu">
    <span slot="toggler">Resources</span>
    <sgds-dropdown-item ariaLabel="Documentation"><a href="/docs">Documentation</a></sgds-dropdown-item>
    <sgds-dropdown-item ariaLabel="FAQ"><a href="/faq">FAQ</a></sgds-dropdown-item>
  </sgds-mainnav-dropdown>

  <!-- Right-aligned items (end slot) -->
  <sgds-mainnav-item slot="end">
    <a href="/contact">Contact Us</a>
  </sgds-mainnav-item>
  <sgds-button slot="end">Login</sgds-button>
</sgds-mainnav>
```

```html
<!-- Mainnav with profile component -->
<sgds-mainnav brandHref="/" fluid>
  <img slot="brand" alt="Site logo" width="130" src="/logo.svg" />
  <sgds-mainnav-item active><a href="#">Home</a></sgds-mainnav-item>
  <sgds-mainnav-item><a href="#">About</a></sgds-mainnav-item>
  <sgds-icon-button slot="non-collapsible" name="moon" variant="ghost" size="sm" ariaLabel="Toggle dark mode"></sgds-icon-button>
  <sgds-mainnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu" close="outside">
    <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default sgds:block"></span>
    <sgds-dropdown-item readonly>
      <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
        <span class="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
        <div class="sgds:flex sgds:flex-col sgds:justify-center">
          <span class="sgds:text-label-md sgds:font-semibold">User Name</span>
          <span class="sgds:text-label-sm sgds:text-subtle">user@agency.gov.sg</span>
        </div>
      </div>
    </sgds-dropdown-item>
    <sgds-divider thickness="thin"></sgds-divider>
    <sgds-dropdown-item ariaLabel="My profile"><span>My profile</span></sgds-dropdown-item>
    <sgds-dropdown-item ariaLabel="Settings"><span>Settings</span></sgds-dropdown-item>
    <sgds-dropdown-item ariaLabel="Log out"><span>Log out</span></sgds-dropdown-item>
  </sgds-mainnav-profile>
</sgds-mainnav>
```

## API Summary

### `<sgds-mainnav>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `expand` | `sm \| md \| lg \| xl \| xxl \| always \| never` | `lg` | Breakpoint below which the nav collapses |
| `brandHref` | string | `""` | URL for the brand logo link |
| `fluid` | boolean | `false` | Uses a full-width container instead of a fixed-width one |
| `hasNonCollapsibleSlot` | boolean | `false` | SSR hint — set to `true` when the `non-collapsible` slot has content |

### `<sgds-mainnav-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Marks the item as the current active page |
| `disabled` | boolean | `false` | Disables the nav item |

### `<sgds-mainnav-dropdown>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Applies active styles on the dropdown button |
| `disabled` | boolean | `false` | Disables the dropdown toggle |
| `ariaLabel` | string | — | Accessible label forwarded to the toggle button's `aria-label` attribute. **Required** for accessibility — screen readers cannot read slotted toggler text. |

Also inherits `<sgds-dropdown>` properties — see **[components-dropdown](dropdown.md)** for full API (`menuIsOpen`, `close`, `drop`).

### `<sgds-mainnav-profile>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Primary text displayed next to the avatar in desktop (e.g. user name) |
| `secondaryText` | string | `""` | Secondary text displayed below the label in desktop (e.g. agency or role) |
| `disabled` | boolean | `false` | Disables the profile dropdown |
| `ariaLabel` | string | `""` | Accessible label for the toggle button |
| `close` | `default \| outside \| inside` | `"default"` | Controls dropdown close behaviour (forwarded to internal `<sgds-dropdown>`) |

### `<sgds-dropdown-item>` (relevant prop)

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `readonly` | boolean | `false` | Removes interactive styles (hover, cursor, focus) — use for non-navigational display items like user info headers |

## Slots

### `<sgds-mainnav>`

| Slot | Purpose |
|---|---|
| `brand` | Brand logo image |
| *(default)* | `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements |
| `end` | Items right-aligned in the navbar; also collapses into the hamburger menu |
| `non-collapsible` | Items that stay visible even when the menu is collapsed |
| `profile` | Far right in desktop; stays in navbar-end in mobile. When `<sgds-mainnav-profile>` is used, it handles its own mobile panel independently |

### `<sgds-mainnav-item>`

| Slot | Purpose |
|---|---|
| *(default)* | Anchor `<a>` tag for navigation |

### `<sgds-mainnav-dropdown>`

| Slot | Purpose |
|---|---|
| `toggler` | The element that toggles the dropdown (typically `<span>` or `<sgds-button>`) |
| *(default)* | `<sgds-dropdown-item>` elements |

### `<sgds-mainnav-profile>`

| Slot | Purpose |
|---|---|
| `avatar` | Avatar element — shown in both desktop (before label) and mobile (as toggler) |
| *(default)* | `<sgds-dropdown-item>` elements — rendered as dropdown in desktop, flat list in mobile. **When empty, the profile becomes a non-interactive read-only display** (no caret, no pointer cursor, not focusable). |

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
4. User profile/account dropdowns go in the `profile` slot — use `<sgds-mainnav-profile>` with `label` and `secondaryText` props (preferred) or `<sgds-mainnav-dropdown>`. The hamburger toggler always renders alongside the profile.
5. `non-collapsible` slot stays visible on all screen sizes — use for icons that should never collapse.
6. Use `<sgds-masthead>` above `<sgds-mainnav>` as required for Singapore Government sites.
7. **Always set `ariaLabel` on `<sgds-mainnav-dropdown>`** — the slotted toggler text is not accessible to screen readers through the shadow DOM boundary. Use a descriptive label like `"Resources menu"`.
8. For operational/internal apps with coloured nav bars (brand/gradient tones), use `<sgds-appnav>` instead of `<sgds-mainnav>`.
