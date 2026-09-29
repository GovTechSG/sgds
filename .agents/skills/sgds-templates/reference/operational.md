# Operational App Shell Template

Application shell for internal/operational apps using `<sgds-appnav>` with an overlay sidebar triggered by a menu icon-button. Designed for dashboards, admin portals, and internal tools that don't need the public-facing masthead.

---

## When to use

- Internal tools and admin portals
- Operational dashboards with persistent sidebar navigation
- Apps that use `<sgds-appnav>` instead of `<sgds-mainnav>`
- Pages where the sidebar overlays content rather than pushing it

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  sgds-appnav (menu toggler + brand + icons + profile)│
├─────────────────────────────────────────────────────┤
│  ┌───────────┐                                      │
│  │ sgds-     │  .sgds-container                     │
│  │ sidebar   │  (main content area)                 │
│  │ (overlay) │                                      │
│  │           │                                      │
│  │           │  sgds-footer                         │
│  └───────────┘                                      │
└─────────────────────────────────────────────────────┘
```

- **No `<sgds-masthead>`** — operational apps skip the government identity bar
- **Overlay sidebar** — opens/closes via the menu icon-button; does not push content
- **Menu icon toggles** between "menu" (closed) and "cross" (open)
- **Profile dropdown** — `<sgds-appnav-profile>` with avatar, account info, and actions

---

## Key patterns

1. **Sidebar toggle** — the `<sgds-icon-button>` in the `start` slot calls `sidebar.toggleCollapsed()` and must have `data-sidebar-toggler="true"` to prevent the sidebar's click-outside handler from interfering.
2. **Icon sync** — a `MutationObserver` watches the sidebar's `collapsed` attribute so the icon reverts to "menu" when the sidebar is closed by clicking outside.
3. **Content container** — uses `.sgds-container` (not `.sgds-container-sidebar`) because the overlay sidebar does not consume layout space.

---

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.

| File | GitHub Raw URL |
|------|---|
| Operational | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/ApplicationShell/operational.stories.js |

---

## Complete Template

```html
<script>
  function syncTogglerIcon() {
    const sidebar = document.querySelector("sgds-sidebar");
    const btn = document.querySelector("[data-sidebar-toggler]");
    if (sidebar && btn) {
      btn.name = sidebar.collapsed ? "menu" : "cross";
    }
  }

  function handleSidebarToggle() {
    const sidebar = document.querySelector("sgds-sidebar");
    sidebar.toggleCollapsed();
    syncTogglerIcon();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector("sgds-sidebar");
    if (sidebar) {
      new MutationObserver(() => syncTogglerIcon()).observe(sidebar, {
        attributes: true,
        attributeFilter: ["collapsed"]
      });
    }
  });
</script>

<div class="sgds:h-screen sgds:flex sgds:flex-col sgds:overflow-hidden">
  <!-- Appnav top bar -->
  <div class="sgds:flex-none">
    <sgds-appnav tone="brand">
      <sgds-icon-button
        name="cross"
        slot="start"
        variant="ghost"
        tone="fixed-light"
        size="sm"
        ariaLabel="Open side menu"
        data-sidebar-toggler="true"
        onclick="handleSidebarToggle()"
      ></sgds-icon-button>
      <img alt="App logo" width="130" src="/logo-white.svg" slot="brand" />
      <sgds-icon-button name="moon" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Toggle dark mode"></sgds-icon-button>
      <sgds-icon-button name="bell" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Notifications"></sgds-icon-button>
      <sgds-appnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu" close="outside">
        <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
          <span class="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"></span>
        </span>
        <sgds-dropdown-item readonly>
          <div class="sgds:flex sgds:flex-col sgds:gap-4">
            <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
            <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
              <span class="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-surface-muted"></span>
              <div class="sgds:flex sgds:flex-col sgds:justify-center">
                <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">User Name</span>
                <span class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">user@agency.gov.sg</span>
              </div>
            </div>
          </div>
        </sgds-dropdown-item>
        <sgds-divider thickness="thin"></sgds-divider>
        <sgds-dropdown-item ariaLabel="My profile">
          <span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">My profile</span>
        </sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Settings">
          <span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Settings</span>
        </sgds-dropdown-item>
        <sgds-dropdown-item ariaLabel="Log out">
          <span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default">Log out</span>
        </sgds-dropdown-item>
      </sgds-appnav-profile>
    </sgds-appnav>
  </div>

  <!-- Body with overlay sidebar + content -->
  <div class="sgds:flex sgds:flex-row sgds:flex-1 sgds:overflow-hidden sgds:relative">
    <sgds-sidebar variant="overlay" active="dashboard" scrim>
      <div slot="brandName">My App</div>
      <sgds-sidebar-section title="Workspace" name="workspace">
        <sgds-sidebar-item name="dashboard" title="Dashboard">
          <sgds-icon name="grid-fill" slot="icon" size="md"></sgds-icon>
          <a href="#"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item name="analytics" title="Analytics">
          <sgds-icon name="trend-up" slot="icon" size="md"></sgds-icon>
          <a href="#"></a>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
      <sgds-sidebar-section title="Manage" name="manage">
        <sgds-sidebar-item name="team" title="Team">
          <sgds-icon name="user-circle" slot="icon" size="md"></sgds-icon>
          <a href="#"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item name="settings" title="Settings">
          <sgds-icon name="laptop-gear" slot="icon" size="md"></sgds-icon>
          <a href="#"></a>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
    <div class="sgds:flex sgds:flex-col sgds:flex-1 sgds:overflow-y-auto">
      <div class="sgds-container sgds:py-layout-md sgds:flex sgds:flex-col sgds:flex-1">
        <!-- Your page content here -->
      </div>
      <sgds-footer tone="neutral"></sgds-footer>
    </div>
  </div>
</div>
```

## Customisation notes

- Replace `tone="brand"` on `<sgds-appnav>` with any gradient tone (`gradient-1` through `gradient-4`)
- Add or remove `<sgds-icon-button>` elements in the appnav default slot for app-level actions
- Add more `<sgds-sidebar-section>` and `<sgds-sidebar-item>` elements for additional navigation
- For a read-only profile (no actions), remove all `<sgds-dropdown-item>` elements from `<sgds-appnav-profile>`
- Use `.sgds-container` for the main content area since the overlay sidebar does not reduce available width
