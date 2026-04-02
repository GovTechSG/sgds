# List Page Template

Searchable, filterable data table with pagination. Adapted from shadcn's list/data table block pattern.

Use for: entity index pages, record management, admin lists, approval queues.

---

## Layout Structure

Uses the Simple App Layout from the [Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md).

```
┌──────────────────────────────────────────────────────┐
│  sgds-masthead                                       │
├──────────────────────────────────────────────────────┤
│  sgds-mainnav                                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Page title                    [+ New record]        │
│  Subtitle / record count                             │
│                                                      │
│  [🔍 Search…]  [Status ▾]  [Type ▾]                 │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  Name        Status    Date        Actions   │    │
│  ├──────────────────────────────────────────────┤    │
│  │  Row 1       Active    01/01/2025  ⋮         │    │
│  │  Row 2       Inactive  02/01/2025  ⋮         │    │
│  │  Row 3       Active    03/01/2025  ⋮         │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  Showing 1–10 of 42        [← 1  2  3  4  5 →]      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Complete Template

```html
<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <sgds-mainnav-item slot="start">
    <a href="/">My Application</a>
  </sgds-mainnav-item>
</sgds-mainnav>

<div class="sgds:bg-surface-default sgds:min-h-screen">
  <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">

    <!-- Page header -->
    <div class="sgds:flex sgds:items-start sgds:justify-between sgds:mb-layout-md">
      <div>
        <h1 class="sgds:text-2xl sgds:font-semibold sgds:text-default">Records</h1>
        <p class="sgds:text-sm sgds:text-muted sgds:mt-1" id="record-count">
          Showing 42 records
        </p>
      </div>
      <sgds-button variant="primary">
        <sgds-icon slot="leftIcon" name="plus"></sgds-icon>
        New record
      </sgds-button>
    </div>

    <!-- Search & filter bar -->
    <div class="sgds:flex sgds:flex-wrap sgds:gap-component-sm sgds:mb-component-md">
      <div class="sgds:flex-1 sgds:min-w-48">
        <sgds-input
          placeholder="Search by name or ID…"
          id="search-input"
        >
          <sgds-icon slot="prefix" name="search"></sgds-icon>
        </sgds-input>
      </div>

        <sgds-select id="status-filter" placeholder="All statuses">
          <sgds-select-option value="">All statuses</sgds-select-option>
          <sgds-select-option value="active">Active</sgds-select-option>
          <sgds-select-option value="inactive">Inactive</sgds-select-option>
          <sgds-select-option value="pending">Pending</sgds-select-option>
        </sgds-select>

        <sgds-select id="type-filter" placeholder="All types">
          <sgds-select-option value="">All types</sgds-select-option>
          <sgds-select-option value="typeA">Type A</sgds-select-option>
          <sgds-select-option value="typeB">Type B</sgds-select-option>
        </sgds-select>
    </div>

    <!-- Data table -->
    <div class="sgds:rounded-lg sgds:border sgds:border-muted sgds:overflow-hidden">
      <sgds-table headerBackground responsive="md">
        <sgds-table-row>
          <sgds-table-head>Name</sgds-table-head>
          <sgds-table-head>Status</sgds-table-head>
          <sgds-table-head>Date</sgds-table-head>
          <sgds-table-head></sgds-table-head>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Lim Ah Kow</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
          <sgds-table-cell>01 Jan 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Tan Bee Choo</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
          <sgds-table-cell>05 Feb 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Mohamed Razif</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="neutral">Inactive</sgds-badge></sgds-table-cell>
          <sgds-table-cell>12 Mar 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Priya Nair</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
          <sgds-table-cell>20 Mar 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Chen Wei Ling</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
          <sgds-table-cell>25 Mar 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Ravi Shankar</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="neutral">Inactive</sgds-badge></sgds-table-cell>
          <sgds-table-cell>28 Mar 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Nur Aisyah</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
          <sgds-table-cell>30 Mar 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>David Chua</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="danger">Rejected</sgds-badge></sgds-table-cell>
          <sgds-table-cell>02 Apr 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Siti Rahmah</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
          <sgds-table-cell>08 Apr 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Kevin Ong</sgds-table-cell>
          <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
          <sgds-table-cell>10 Apr 2025</sgds-table-cell>
          <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </div>

    <!-- Empty state (show instead of table when no results) -->
    <div id="empty-state" class="sgds:hidden sgds:py-layout-xl sgds:text-center">
      <sgds-icon name="in-box" size="3-xl" class="sgds:text-muted sgds:mx-auto sgds:mb-3"></sgds-icon>
      <h3 class="sgds:text-base sgds:font-semibold sgds:text-default">No records found</h3>
      <p class="sgds:text-sm sgds:text-muted sgds:mt-1 sgds:mb-layout-sm">
        Try changing your search or filter, or add a new record.
      </p>
      <sgds-button variant="outline">Clear filters</sgds-button>
    </div>

    <!-- Pagination footer -->
    <div class="sgds:flex sgds:items-center sgds:justify-between sgds:mt-component-lg">
      <p class="sgds:text-sm sgds:text-muted">Showing 1–10 of 10</p>
      <sgds-pagination dataLength="10" itemsPerPage="10" currentPage="1" limit="5"></sgds-pagination>
    </div>

  </div>
</div>

<sgds-footer></sgds-footer>
```

---

## Row actions with overflow menu

Each row's actions column should use `sgds-overflow-menu` for multiple actions, or inline icon-buttons for 1–2 actions.

```html
<!-- Multiple actions per row: overflow menu -->
<sgds-overflow-menu>
  <sgds-dropdown-item>View details</sgds-dropdown-item>
  <sgds-dropdown-item>Edit</sgds-dropdown-item>
  <sgds-dropdown-item class="sgds:text-danger-default">Delete</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- One or two actions: icon-buttons -->
<div class="sgds:flex sgds:gap-1">
  <sgds-icon-button name="pencil" variant="ghost" size="sm" aria-label="Edit"></sgds-icon-button>
  <sgds-icon-button name="trash" variant="ghost" tone="danger" size="sm" aria-label="Delete"></sgds-icon-button>
</div>
```

---

## Status badge pattern

Render status values as `sgds-badge` inside a table cell for clear visual scanning.

```html
<!-- Active -->
<sgds-badge variant="success">Active</sgds-badge>

<!-- Inactive -->
<sgds-badge variant="neutral">Inactive</sgds-badge>

<!-- Pending -->
<sgds-badge variant="warning">Pending</sgds-badge>

<!-- Rejected -->
<sgds-badge variant="danger">Rejected</sgds-badge>
```

---

## Variant: Sidebar app (admin/internal)

When using the sidebar layout (dashboards, internal tools), wrap contents in `sgds-container-sidebar`:

```html
<div class="sgds:flex sgds:flex-row">

  <!-- Sticky sidebar -->
  <div class="sgds:sticky sgds:top-0 sgds:h-screen sgds:overflow-y-auto sgds:w-68 sgds:border-r sgds:border-muted sgds:shrink-0">
    <sgds-sidenav>
      <!-- nav items -->
    </sgds-sidenav>
  </div>

  <!-- Main content area -->
  <div class="sgds:flex sgds:flex-col sgds:w-full">
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <!-- same page header, filter bar, table, pagination from above -->
    </div>
  </div>

</div>
```

---

## Wiring pagination to the table (JavaScript)

```javascript
const pagination = document.getElementById('table-pagination');
const table = document.getElementById('records-table');

pagination.addEventListener('sgds-page-change', (e) => {
  const { currentPage, itemsPerPage } = e.detail;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  table.rows = allRecords.slice(start, end);
  document.getElementById('page-range').textContent =
    `${start + 1}–${Math.min(end, allRecords.length)}`;
});
```

---

## Key visual rules

- **Table container**: wrap `sgds-table` in `sgds:rounded-lg sgds:border sgds:border-muted sgds:overflow-hidden` — prevents border-radius clipping and gives the card appearance
- **Filter bar**: `sgds:flex sgds:flex-wrap sgds:gap-component-sm` — wraps gracefully on small screens; search input uses `sgds:flex-1` to expand
- **Empty state**: centre-aligned icon + heading + supporting text + CTA; toggle visibility via `sgds:hidden` class rather than removing from DOM
- **Pagination alignment**: flex row with record count on the left and `sgds-pagination` on the right — mirrors standard table UX conventions
- **Row density**: default `sgds-table` row height is comfortable; avoid adding extra padding inside cells
- **Badge-only status**: never use plain text for status values in a list — always a badge so colour communicates state at a glance
