# Dashboard Page Template

Sidebar navigation + filters + stat cards + ECharts charts + data table. Adapted from shadcn's `dashboard-01` block.

Use for: internal tools, admin portals, operations dashboards, analytics views.

**Prerequisites:** Install [ECharts](https://echarts.apache.org/) separately — see [sgds-data-visualisation](../../sgds-data-visualisation/SKILL.md).

```bash
npm install echarts
```

---

## Layout Structure

Uses the **Sidebar App Layout** from the [Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md). The sidebar is sticky; the main content scrolls independently.

```
┌─────────────────────────────────────────────────────┐
│  sgds-masthead + sgds-mainnav (sticky top)          │
├──────────────┬──────────────────────────────────────┤
│              │  Page title     [Filters] [Apply]     │
│  sgds-sidenav│  ──────────────────────────────────── │
│  (sticky)    │  Stat cards (4-column grid)           │
│              │  ──────────────────────────────────── │
│              │  [Line chart (2/3)]  [Donut (1/3)]    │
│              │  ──────────────────────────────────── │
│              │  [Stacked bar chart (full width)]     │
│              │  ──────────────────────────────────── │
│              │  Data table                           │
│              │  sgds-footer                          │
└──────────────┴──────────────────────────────────────┘
```

---

## Complete Template

> See **[sgds-components-sidebar](../../sgds-components-sidebar/SKILL.md)** for the full API.

```html
<!-- Sticky header -->
<div class="sgds:sticky sgds:top-0 sgds:z-10">
  <sgds-masthead fluid></sgds-masthead>
  <sgds-mainnav fluid>
    <strong slot="brand">My App</strong>
    <sgds-button slot="end" variant="ghost" size="sm">John Doe</sgds-button>
  </sgds-mainnav>
</div>

<!-- Two-column body -->
<div class="sgds:flex sgds:flex-row sgds:bg-surface-default">

  <!-- Sticky sidebar -->
  <div class="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)]">
    <sgds-sidebar active="dashboard">
    <div slot="brandName">My App</div>

    <sgds-sidebar-section title="Analytics" name="analytics">
      <sgds-sidebar-item name="dashboard" title="Dashboard">
        <sgds-icon name="grid-fill" slot="icon"></sgds-icon>
        <a href="/dashboard"></a>
      </sgds-sidebar-item>
      <!-- Root-level group: clicking opens a drawer overlay with children -->
      <sgds-sidebar-group name="submissions" title="Submissions">
        <sgds-icon name="file-earmark-text" slot="icon"></sgds-icon>
        <sgds-sidebar-item name="all-submissions" title="All submissions">
          <sgds-icon name="files" slot="icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item name="pending" title="Pending review">
          <sgds-icon name="pending-circle" slot="icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item name="approved" title="Approved">
          <sgds-icon name="check-circle-fill" slot="icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-group>
      <sgds-sidebar-item name="reports" title="Reports">
        <sgds-icon name="speedometer" slot="icon"></sgds-icon>
        <a href="/reports"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-section>

    <sgds-sidebar-section title="Manage" name="manage">
      <sgds-sidebar-item name="users" title="Users">
        <sgds-icon name="users" slot="icon"></sgds-icon>
        <a href="/users"></a>
      </sgds-sidebar-item>
      <sgds-sidebar-item name="settings" title="Settings">
        <sgds-icon name="gear" slot="icon"></sgds-icon>
        <a href="/settings"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-section>
  </sgds-sidebar>
  </div>

  <!-- Main content -->
  <div class="sgds:flex sgds:flex-col sgds:w-full">
    <div class="sgds-container-sidebar sgds:py-layout-md">

      <!-- Page header -->
      <div class="sgds:flex sgds:items-center sgds:justify-between sgds:mb-layout-sm">
        <div>
          <h1 class="sgds:text-2xl sgds:font-semibold sgds:text-default">Dashboard</h1>
          <p class="sgds:text-sm sgds:text-muted sgds:mt-1">Overview of your application metrics</p>
        </div>
        <sgds-button variant="primary" size="sm">
          <sgds-icon name="download" slot="leftIcon"></sgds-icon>
          Export
        </sgds-button>
      </div>

      <!-- Single grid: stat cards + charts + table all in one -->
      <div class="sgds-grid sgds:gap-layout-md">

        <!-- Stat cards: 4 × 3/12 cols -->
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card">
          <p class="sgds:text-sm sgds:text-muted sgds:mb-1">Total Users</p>
          <p class="sgds:text-2xl sgds:font-semibold sgds:text-default">12,486</p>
          <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
            <sgds-icon name="arrow-up" class="sgds:text-success-default" size="sm"></sgds-icon>
            <span class="sgds:text-sm sgds:text-success-default">+8.2%</span>
            <span class="sgds:text-sm sgds:text-muted">vs last month</span>
          </div>
        </div>

        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card">
          <p class="sgds:text-sm sgds:text-muted sgds:mb-1">Active Sessions</p>
          <p class="sgds:text-2xl sgds:font-semibold sgds:text-default">3,241</p>
          <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
            <sgds-icon name="arrow-up" class="sgds:text-success-default" size="sm"></sgds-icon>
            <span class="sgds:text-sm sgds:text-success-default">+4.1%</span>
            <span class="sgds:text-sm sgds:text-muted">vs last month</span>
          </div>
        </div>

        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card">
          <p class="sgds:text-sm sgds:text-muted sgds:mb-1">Submissions</p>
          <p class="sgds:text-2xl sgds:font-semibold sgds:text-default">847</p>
          <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
            <sgds-icon name="arrow-down" class="sgds:text-danger-default" size="sm"></sgds-icon>
            <span class="sgds:text-sm sgds:text-danger-default">-2.4%</span>
            <span class="sgds:text-sm sgds:text-muted">vs last month</span>
          </div>
        </div>

        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card">
          <p class="sgds:text-sm sgds:text-muted sgds:mb-1">Pending Reviews</p>
          <p class="sgds:text-2xl sgds:font-semibold sgds:text-default">23</p>
          <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
            <sgds-badge variant="warning">Action needed</sgds-badge>
          </div>
        </div>

        <!-- Charts: trend 8/12, donut 4/12, bar 12/12 — CSS Grid auto-wraps into rows -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-component-xs">
          <h2 class="sgds:text-base sgds:font-semibold sgds:text-default sgds:mb-component-sm">Submission trend</h2>
          <div id="chart-trend" class="sgds:h-[260px] sgds:w-full"></div>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-component-xs">
          <h2 class="sgds:text-base sgds:font-semibold sgds:text-default sgds:mb-component-sm">Status breakdown</h2>
          <div id="chart-donut" class="sgds:h-[260px] sgds:w-full sgds:overflow-visible"></div>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-component-xs">
          <h2 class="sgds:text-base sgds:font-semibold sgds:text-default sgds:mb-component-sm">Submissions by department</h2>
          <div id="chart-bar" class="sgds:h-[240px] sgds:w-full"></div>
        </div>

        <!-- Table: full width 12/12 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12 sgds:bg-surface-raised sgds:rounded-lg sgds:shadow-card">

          <div class="sgds:flex sgds:items-center sgds:justify-between sgds:p-component-xs sgds:border-b sgds:border-muted">
            <h2 class="sgds:text-base sgds:font-semibold sgds:text-default">Recent Submissions</h2>
            <div class="sgds:flex sgds:gap-component-sm">
              <sgds-input placeholder="Search..." size="sm">
                <sgds-icon name="search" slot="prefix"></sgds-icon>
              </sgds-input>
              <sgds-button variant="outline" size="sm">
                <sgds-icon name="bi-funnel" slot="leftIcon"></sgds-icon>
                Filter
              </sgds-button>
            </div>
          </div>

          <sgds-table>
            <sgds-table-row>
              <sgds-table-head>Name</sgds-table-head>
              <sgds-table-head>Status</sgds-table-head>
              <sgds-table-head>Date</sgds-table-head>
              <sgds-table-head>Actions</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell>Alice Tan</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="success">Approved</sgds-badge></sgds-table-cell>
              <sgds-table-cell>10 Mar 2026</sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell>Bob Lim</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
              <sgds-table-cell>09 Mar 2026</sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
            <sgds-table-row>
              <sgds-table-cell>Carol Ng</sgds-table-cell>
              <sgds-table-cell><sgds-badge variant="danger">Rejected</sgds-badge></sgds-table-cell>
              <sgds-table-cell>08 Mar 2026</sgds-table-cell>
              <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>

          <div class="sgds:flex sgds:justify-end sgds:p-component-xs">
            <sgds-pagination length="10" limit="5"></sgds-pagination>
          </div>

        </div>

      </div>
    </div>
    <sgds-footer></sgds-footer>
  </div>

</div>
```

---

## Key visual rules for this template

- **Page bg**: `sgds:bg-surface-default` — the canvas behind everything
- **Card bg**: `sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted` — consistent card treatment for charts, stat cards, and table
- **Chart height**: set explicit `height` on the ECharts container div (e.g. `height:260px`) — ECharts requires a non-zero height
- **Chart bg**: `backgroundColor: "transparent"` — let the SGDS surface token control the background, not ECharts
- **Dark mode**: use a `MutationObserver` on `document.documentElement` watching the `class` attribute; call `chart.setOption()` with updated `textColor`/`gridColor` when `sgds-night-theme` is added or removed
- **Resize**: call `chart.resize()` on `window resize` so charts fill their container at every viewport width
- **Stat value**: `sgds:text-3xl sgds:font-semibold sgds:tabular-nums` — tabular nums prevent jank on live-updating counters
- **Trend up**: `sgds:text-success-default` · **Trend down**: `sgds:text-danger-default`
