# With Sidebar Layouts

With Sidebar layouts are for dashboards, internal tools, admin portals, and transactional apps that need persistent side navigation alongside the main content.

**Content container:** `.sgds-container-sidebar` — narrower than `.sgds-container` to account for the sidebar column

| Breakpoint | `.sgds-container-sidebar` max-width |
|---|---|
| < 768px | `100%` |
| >= 768px (md) | `calc(100% - 96px)` |
| >= 1024px (lg) | `840px` |
| >= 1280px (xl) | `888px` |
| >= 1440px (2xl) | `1024px` |

## Common Structure

All With Sidebar layouts share this viewport-contained structure:

```html
<div class="sgds:h-screen sgds:flex sgds:flex-col sgds:overflow-hidden">
  <!-- Sticky top bar -->
  <div class="sgds:flex-none">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>...</sgds-mainnav>
  </div>
  <!-- Two-column body -->
  <div class="sgds:flex sgds:flex-row sgds:flex-1 sgds:overflow-hidden">
    <sgds-sidebar>...</sgds-sidebar>
    <div class="sgds:flex sgds:flex-col sgds:flex-1 sgds:overflow-y-auto">
      <div class="sgds-container-sidebar sgds:py-layout-md sgds:flex-1">
        <!-- Content goes here -->
      </div>
      <sgds-footer tone="neutral" layout="sidebar"></sgds-footer>
    </div>
  </div>
</div>
```

**Key differences from Full Width:**
- `fluid` attribute on `<sgds-masthead>` and `<sgds-mainnav>`
- Viewport containment with `sgds:h-screen` + `sgds:overflow-hidden`
- `<sgds-sidebar>` provides persistent navigation
- Footer uses `tone="neutral"` and `layout="sidebar"`
- Content scrolls independently via `sgds:overflow-y-auto`

---

## Default

Basic sidebar layout with a single content area.

```
+----------------------------------------------+
| sgds-masthead (fluid)                        |
+----------------------------------------------+
| sgds-mainnav (fluid)                         |
+----------+-----------------------------------+
|          |                                   |
| sgds-    |  .sgds-container-sidebar          |
| sidebar  |  [  main content area  ]          |
|          |                                   |
|          +-----------------------------------+
|          | sgds-footer (neutral, sidebar)    |
+----------+-----------------------------------+
```

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Default | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/Sidebar.stories.js |

---

## Aside Left

Sidebar layout with an additional left aside panel inside the content area. Uses `.sgds-grid` with a 4/8 column split.

```
+----------------------------------------------+
| sgds-masthead (fluid)                        |
+----------------------------------------------+
| sgds-mainnav (fluid)                         |
+----------+-----------------------------------+
|          |  .sgds-container-sidebar           |
| sgds-    |  +-------+------------------+     |
| sidebar  |  | aside |  main content    |     |
|          |  | col-4 |    col-8         |     |
|          |  +-------+------------------+     |
|          +-----------------------------------+
|          | sgds-footer (neutral, sidebar)    |
+----------+-----------------------------------+
```

Grid classes: `sgds-col-4 sgds-col-sm-8 sgds-col-lg-4` (aside) + `sgds-col-8 sgds-col-sm-8 sgds-col-lg-8` (main)

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Aside Left | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarAsideLeft.stories.js |

---

## Aside Right

Sidebar layout with an additional right aside panel inside the content area. Same grid ratios as Aside Left but reversed.

```
+----------------------------------------------+
| sgds-masthead (fluid)                        |
+----------------------------------------------+
| sgds-mainnav (fluid)                         |
+----------+-----------------------------------+
|          |  .sgds-container-sidebar           |
| sgds-    |  +------------------+-------+     |
| sidebar  |  |  main content    | aside |     |
|          |  |    col-8         | col-4 |     |
|          |  +------------------+-------+     |
|          +-----------------------------------+
|          | sgds-footer (neutral, sidebar)    |
+----------+-----------------------------------+
```

Grid classes: `sgds-col-8 sgds-col-sm-8 sgds-col-lg-8` (main) + `sgds-col-4 sgds-col-sm-8 sgds-col-lg-4` (aside)

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Aside Right | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarAsideRight.stories.js |

---

## Overlay

Collapsible overlay sidebar with a breadcrumb bar and toggle button. The sidebar uses `variant="overlay"` and sits above the content rather than beside it.

```
+----------------------------------------------+
| sgds-masthead (fluid)                        |
+----------------------------------------------+
| sgds-mainnav (fluid)                         |
+----------------------------------------------+
| [toggle] breadcrumb bar (border-b)           |
+----------------------------------------------+
|  (overlay)  |                                |
|  sgds-      |  .sgds-container               |
|  sidebar    |  [  main content area  ]       |
|             |                                |
|             +--------------------------------+
|             | sgds-footer (neutral)          |
+-------------+--------------------------------+
```

**Key differences from other sidebar layouts:**
- Sidebar uses `variant="overlay"` and `scrim` attribute
- Breadcrumb bar includes an `<sgds-icon-button>` toggler with `data-sidebar-toggler="true"`
- Content uses `.sgds-container` (not `.sgds-container-sidebar`) since the sidebar overlays
- Footer uses `tone="neutral"` without `layout="sidebar"`
- Root wrapper includes `sgds:relative` for overlay positioning

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Overlay | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarOverlay.stories.js |

---

## Split

Sidebar layout with two equal content panels side by side.

```
+----------------------------------------------+
| sgds-masthead (fluid)                        |
+----------------------------------------------+
| sgds-mainnav (fluid)                         |
+----------+-----------------------------------+
|          |  .sgds-container-sidebar           |
| sgds-    |  +-------------+------------+     |
| sidebar  |  |   panel 1   |  panel 2   |     |
|          |  |   flex-1    |  flex-1    |     |
|          |  +-------------+------------+     |
|          +-----------------------------------+
|          | sgds-footer (neutral, sidebar)    |
+----------+-----------------------------------+
```

Uses `sgds:flex sgds:gap-layout-md` with two `sgds:flex-1` children inside `.sgds-container-sidebar`.

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Split | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarSplit.stories.js |

---

## All Raw Content Links

| Layout | Raw URL |
|---|---|
| Default | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/Sidebar.stories.js |
| Aside Left | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarAsideLeft.stories.js |
| Aside Right | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarAsideRight.stories.js |
| Overlay | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarOverlay.stories.js |
| Split | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/WithSidebar/SidebarSplit.stories.js |
