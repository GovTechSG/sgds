# Application Shell

The application shell is the mandatory page chrome that wraps every SGDS page — regardless of content or layout type. It consists of three required components plus the appropriate content container.

> **This block is required for every page.** Never ship a page without all three shell components. The masthead is a Singapore Government digital standards requirement.

## Mandatory Page Chrome

| Component | Role | Required |
|---|---|---|
| `<sgds-masthead>` | Singapore Government identity bar | ✅ Always |
| `<sgds-mainnav>` | Application navigation header | ✅ Always |
| `<sgds-footer>` | Singapore Government footer | ✅ Always |

---

## Quick Decision Guide

**Public-facing website, informational or transactional pages?** → [Simple App Layout](#simple-app-layout)

**Internal tool, dashboard, or data-heavy app with persistent navigation?** → [Sidebar App Layout](#sidebar-app-layout)

---

## Simple App Layout

For general-purpose applications, public-facing digital services, and pages without a persistent sidebar.

**Structure:** vertical stack — masthead → mainnav → content → footer

**Content container:** `.sgds-container` — centred, responsive max-width that grows with viewport

| Breakpoint | `.sgds-container` max-width |
|------------|-----------------------------|
| < 512px | `calc(100% - 40px)` |
| ≥ 512px (sm) | `calc(100% - 48px)` |
| ≥ 768px (md) | `calc(100% - 56px)` |
| ≥ 1024px (lg) | `888px` |
| ≥ 1280px (xl) | `1168px` |
| ≥ 1440px (2xl) | `1312px` |

```html
<div>
  <sgds-masthead fluid></sgds-masthead>
  <sgds-mainnav fluid>
    <strong slot="brand">My App</strong>
    <strong slot="end">End</strong>
  </sgds-mainnav>
</div>
<div class="sgds:flex sgds:flex-col sgds:w-full">
  <div class="sgds-container sgds:py-2-xl">
    <!-- Page content goes here -->
  </div>
  <sgds-footer></sgds-footer>
</div>
```

---

## Sidebar App Layout

For internal tools, dashboards, admin portals, and transactional apps that need persistent side navigation alongside the main content.

**Structure:**
- Sticky top bar: masthead + mainnav
- Two-column body: sticky scrollable sidebar + scrollable main content area with footer

**Content container:** `.sgds-container-sidebar` — narrower than `.sgds-container` to account for the sidebar column

| Breakpoint | `.sgds-container-sidebar` max-width |
|------------|--------------------------------------|
| < 768px | `100%` |
| ≥ 768px (md) | `calc(100% - 96px)` |
| ≥ 1024px (lg) | `840px` |
| ≥ 1280px (xl) | `888px` |
| ≥ 1440px (2xl) | `1024px` |

```html
<!-- Sticky top bar -->
<div class="sgds:sticky sgds:top-0">
  <sgds-masthead fluid></sgds-masthead>
  <sgds-mainnav fluid>
    <strong slot="brand">My App</strong>
    <strong slot="end">End</strong>
  </sgds-mainnav>
</div>

<!-- Two-column body -->
<div class="sgds:flex sgds:flex-row">

  <!-- Sticky sidebar column -->
  <div class="sgds:sticky sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:top-27 sgds:w-68 sgds:border-r sgds:border-muted">
    <!-- Place <sgds-sidenav> or other sidebar content here -->
  </div>

  <!-- Main content column -->
  <div class="sgds:flex sgds:flex-col sgds:w-full">
    <div class="sgds-container-sidebar sgds:py-2-xl">
      <!-- Page content goes here -->
    </div>
    <sgds-footer></sgds-footer>
  </div>

</div>
```

### Sidebar height and offset notes

- `sgds:h-[calc(100vh-108px)]` — sidebar fills viewport height minus the sticky header (masthead ~60px + mainnav ~48px ≈ 108px). Adjust the value if your header height differs.
- `sgds:top-27` — offsets the sidebar's sticky position to sit below the header. Adjust to match your actual header height in spacing tokens.
- `sgds:overflow-y-scroll` — makes the sidebar independently scrollable when content exceeds the viewport.

---

## Containers Reference

| Class | Use case |
|-------|----------|
| `.sgds-container` | Simple app — wide centred content well |
| `.sgds-container-sidebar` | Sidebar app — narrower content well to account for the sidebar column |

Both classes are provided by `@govtechsg/sgds-web-component/css/sgds.css`.

---

## For AI agents

1. **Every page must include `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>` — these are mandatory. Never generate a page without all three.**
2. Always wrap the masthead + mainnav pair in a single `<div>` when making the header sticky — do not apply `sgds:sticky` individually to each component.
3. For simple apps, use `.sgds-container` to centre and constrain page content. Do not use `sgds:max-w-*` utilities to replicate this — `.sgds-container` has the correct responsive breakpoints built in.
4. For sidebar apps, use `.sgds-container-sidebar` (not `.sgds-container`) inside the main content column — it uses narrower max-widths appropriate for the two-column layout.
5. The sidebar column must have `sgds:sticky`, `sgds:top-27`, and `sgds:h-[calc(100vh-108px)]` together to remain fixed while the main content scrolls. Missing any of these breaks the sticky behaviour.
6. Place `<sgds-footer>` inside the main content column (not outside the two-column wrapper) so it sits below the content and does not span the sidebar.
7. Sidebar app is the recommended layout for internal tools, dashboards, and transactional apps. Simple app is the recommended layout for public-facing digital services.
