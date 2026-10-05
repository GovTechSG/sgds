# SGDS AppNav Component Skill

`<sgds-appnav>` is an application navigation bar designed for operational/internal apps. It provides a coloured navigation bar (brand or gradient tones) with a brand area, action icon-buttons, and an optional profile dropdown. Icon-buttons in the default slot collapse into text menu items on mobile.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- As the primary navigation bar for operational/internal Singapore Government applications (dashboards, admin panels, consoles).
- When the app uses a coloured (brand or gradient) navigation bar with icon-button actions.
- When navigation lives in a sidebar and the top bar only has brand, actions, and profile.
- When icon-button actions (dark mode toggle, notifications, etc.) should collapse into a text menu on mobile.

### When NOT to use

- For public-facing sites with text-based navigation links — use `<sgds-mainnav>` instead.
- When you need `<sgds-mainnav-item>` or `<sgds-mainnav-dropdown>` — those are only for `<sgds-mainnav>`.
- For secondary navigation — use `<sgds-subnav>` or `<sgds-sidenav>`.

## Behaviour

- Always renders with a coloured background — defaults to `tone="brand"`. No white/default tone.
- Always fluid (no max-width constraint) — no `fluid` prop needed.
- The `start` slot renders items before the brand (e.g. a sidebar toggle icon-button).
- The default slot accepts `<sgds-icon-button>` elements displayed inline in desktop. In mobile, these are hidden and rendered as text menu items using their `ariaLabel` text.
- A three-dots-vertical toggler appears in mobile only when the default slot has items. It opens a collapsible menu with the text items.
- Clicking a mobile text item triggers a click on the original `<sgds-icon-button>` and closes the menu.
- The `profile` slot accepts `<sgds-appnav-profile>` positioned to the right of the toggler.
- `<sgds-appnav-profile>` behaves the same as `<sgds-mainnav-profile>` — dropdown in desktop, avatar toggler + mobile panel in mobile.
- Tab from the toggler (when menu is open) focuses the first menu item, skipping the profile.
- Fires `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide` when the collapsed menu opens or closes.

## Component Composition

**`start` slot** — icon-buttons before the brand area (e.g. sidebar toggle). Always use `variant="ghost" tone="fixed-light"`.

**`brand` slot** — brand logo `<img>` or text. Set `brandHref` for the homepage link. Brand text is always white (fixed-light).

**Default slot** — `<sgds-icon-button>` elements for actions (dark mode, notifications, settings, etc.). Each **must** have `ariaLabel` set — this text is used as the mobile menu item label. Always use `variant="ghost" tone="fixed-light"`.

**`profile` slot** — `<sgds-appnav-profile>` with avatar, label, secondaryText, and dropdown items.

**Avoid placing inside appnav:**
- `<sgds-mainnav-item>` or `<sgds-mainnav-dropdown>` — these are not supported
- Elements without `ariaLabel` in the default slot — the mobile menu item will have no text

## Advanced Considerations

- **Tone**: always a coloured background. Available values: `brand`, `gradient-1`, `gradient-2`, `gradient-3`, `gradient-4`. Default is `brand`.
- **Mobile menu**: icon-buttons collapse into text items derived from `ariaLabel`. The three-dots toggler only renders when in mobile AND the default slot has items.
- **`navbar-end` visibility**: when there is no profile and the toggler is not shown (desktop or empty default slot), the `.navbar-end` area is hidden to prevent layout gaps.
- **Focus management**: pressing Tab on the toggler when the menu is open moves focus to the first menu item (skips profile avatar).
- **Singapore Government requirement**: `<sgds-masthead>` must appear above `<sgds-appnav>` on all Singapore Government digital services.

## Edge Cases

- **No default slot items**: no toggler renders, no mobile menu. Only brand and profile visible.
- **No `ariaLabel` on icon-button**: the mobile menu item renders with empty text — always set `ariaLabel`.
- **No profile slot**: `navbar-end` is hidden in desktop. In mobile, only the toggler appears.
- **`expand="never"` on desktop**: the toggler and mobile menu text items are always shown.

## Quick Decision Guide

**Coloured nav bar for internal app?** → Use `<sgds-appnav>` (not `<sgds-mainnav>`)

**Which tone?** → `tone="brand"` (default, solid primary colour) or `tone="gradient-1"` through `gradient-4`

**Sidebar toggle button?** → `<sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Open side menu">`

**Action buttons (dark mode, notifications)?** → Put `<sgds-icon-button>` in the default slot with `variant="ghost" tone="fixed-light"` and `ariaLabel`

**User profile?** → Use `<sgds-appnav-profile slot="profile">`

```html
<!-- Basic appnav -->
<sgds-appnav brandHref="/">
  <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Open side menu"></sgds-icon-button>
  <img slot="brand" alt="App logo" width="100" src="/logo-white.svg" />
  <sgds-icon-button name="moon" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Toggle dark mode"></sgds-icon-button>
  <sgds-icon-button name="bell" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Notifications"></sgds-icon-button>
</sgds-appnav>
```

```html
<!-- Appnav with profile -->
<sgds-appnav tone="gradient-3" brandHref="/">
  <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Open side menu"></sgds-icon-button>
  <img slot="brand" alt="App logo" width="100" src="/logo-white.svg" />
  <sgds-icon-button name="moon" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Toggle dark mode"></sgds-icon-button>
  <sgds-appnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu" close="inside">
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
  </sgds-appnav-profile>
</sgds-appnav>
```

## API Summary

### `<sgds-appnav>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `brand \| gradient-1 \| gradient-2 \| gradient-3 \| gradient-4` | `brand` | Visual theme — no "default" (white) option |
| `expand` | `sm \| md \| lg \| xl \| xxl \| always \| never` | `lg` | Breakpoint below which the nav collapses |
| `brandHref` | string | `""` | URL for the brand logo link |
| `hasStartSlot` | boolean | `false` | SSR hint — set to `true` when the `start` slot has content |

### `<sgds-appnav-profile>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Primary text displayed next to the avatar in desktop (e.g. user name) |
| `secondaryText` | string | `""` | Secondary text displayed below the label in desktop (e.g. agency or role) |
| `disabled` | boolean | `false` | Disables the profile dropdown |
| `ariaLabel` | string | `""` | Accessible label for the toggle button |
| `close` | `default \| outside \| inside` | `"default"` | Controls dropdown close behaviour |

## Slots

### `<sgds-appnav>`

| Slot | Purpose |
|---|---|
| `start` | Items before the brand area (e.g. sidebar toggle icon-button) |
| `brand` | Brand logo image or text |
| *(default)* | `<sgds-icon-button>` elements — shown inline in desktop, as text menu items in mobile (using `ariaLabel`) |
| `profile` | `<sgds-appnav-profile>` — positioned to the right of the toggler |

### `<sgds-appnav-profile>`

| Slot | Purpose |
|---|---|
| `avatar` | Avatar element — shown in both desktop (before label) and mobile (as toggler) |
| *(default)* | `<sgds-dropdown-item>` elements — rendered as dropdown in desktop, flat list in mobile. **When empty, the profile becomes a non-interactive read-only display** (no caret, no pointer cursor, not focusable). |

## Events (`<sgds-appnav>`)

| Event | When |
|---|---|
| `sgds-show` | Collapsed menu begins expanding (mobile only) |
| `sgds-after-show` | Collapsed menu fully expanded |
| `sgds-hide` | Collapsed menu begins collapsing |
| `sgds-after-hide` | Collapsed menu fully collapsed |

---

**For AI agents**:
1. `<sgds-appnav>` is for operational/internal apps — not public-facing sites (use `<sgds-mainnav>` for those).
2. Always use `variant="ghost" tone="fixed-light"` on all `<sgds-icon-button>` elements inside appnav (start slot and default slot).
3. Every `<sgds-icon-button>` in the default slot **must** have `ariaLabel` — this becomes the mobile menu item text.
4. The appnav does NOT accept `<sgds-mainnav-item>` or `<sgds-mainnav-dropdown>`.
5. The toggler (three-dots-vertical) only appears in mobile when the default slot has items.
6. Profile uses `<sgds-appnav-profile>` (not `<sgds-mainnav-profile>`).
7. No `fluid` prop — appnav is always fluid by default.
8. No "default" tone — the minimum is `tone="brand"`.
9. Use `<sgds-masthead>` above `<sgds-appnav>` as required for Singapore Government sites.
10. The `start` slot is typically used for a sidebar toggle (`name="menu"`).
