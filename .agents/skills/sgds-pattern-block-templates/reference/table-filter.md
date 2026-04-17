# Table Filter Block

A bordered card containing a card header, search input, filter button, results count, and a data table. Use on list and admin pages where users need to search or filter tabular records.

## When to use

- List pages where content must be searched and/or filtered
- Admin or dashboard pages displaying tabular data
- Any page showing a set of records with status indicators and row actions

## Block anatomy

```
Table filter card
├── Card header (flex row)
│   ├── Icon container (accent-surface-muted, w-10 h-10)
│   └── h5 title (subtitle/md-semibold)
├── Search + filter toolbar (flex row)
│   ├── Search input (sgds-input type="search", flex-1)
│   └── Filter button (sgds-button outline tone="neutral" + sliders icon)
├── Results count (div, label/md-semibold)
└── Table (sgds-table)
    ├── Header row (sgds-table-row + sgds-table-head per column)
    └── Data rows (sgds-table-row + sgds-table-cell, repeat per record)
        └── Cells accept: sgds-link, sgds-badge, sgds-button
```

## Complete block

```html
<div class="sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-lg sgds:p-layout-xs sgds:flex sgds:flex-col sgds:gap-5">

  <!-- Card header: icon + title -->
  <div class="sgds:flex sgds:items-center sgds:gap-text-md">
    <div class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:w-10 sgds:h-10 sgds:shrink-0 sgds:p-2 sgds:rounded-md sgds:bg-accent-surface-muted">
      <sgds-icon name="trend-up" size="24"></sgds-icon>
    </div>
    <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">API subscriptions</h5>
  </div>

  <!-- Search + filter toolbar -->
  <div class="sgds:flex sgds:items-center sgds:gap-layout-sm">
    <div class="sgds:flex-1">
      <sgds-input type="search" placeholder="Search" name="search"></sgds-input>
    </div>
    <sgds-button variant="outline" tone="neutral">
      <sgds-icon name="sliders" slot="leftIcon"></sgds-icon>
      Filter
    </sgds-button>
  </div>

  <!-- Results count -->
  <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">
    Showing 6/6 result(s)
  </div>

  <!-- Table -->
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>API name</sgds-table-head>
      <sgds-table-head>Description</sgds-table-head>
      <sgds-table-head>Status</sgds-table-head>
      <sgds-table-head>Actions</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><sgds-link><a href="#">yx rotate test 8 v1.0.0</a></sgds-link></sgds-table-cell>
      <sgds-table-cell>REST API for test rotation functionality</sgds-table-cell>
      <sgds-table-cell><sgds-badge variant="success">Published</sgds-badge></sgds-table-cell>
      <sgds-table-cell>Data</sgds-table-cell>
    </sgds-table-row>
    <!-- Repeat sgds-table-row per record -->
  </sgds-table>

</div>
```

## Customisation notes

- Replace `name="trend-up"` with any icon that represents the card subject
- Replace `sgds:bg-accent-surface-muted` with another semantic surface color to match brand intent
- Replace `name="sliders"` with another icon if the filter action has a different visual metaphor
- Adapt the results count format to your data (e.g. `Showing 1–10 of 42`, `42 results`)
- `<sgds-table-cell>` accepts rich HTML — use `<sgds-link>` for clickable names, `<sgds-badge>` for status chips, `<sgds-button>` for row actions
- Add `tableBorder` or `headerBackground` to `<sgds-table>` for a more structured appearance
- Add `<sgds-pagination>` below the table when the data set spans multiple pages
- `sgds:p-layout-xs` (16px / 20px / 24px) is used for the card padding — this block is a page-level section, so layout padding applies rather than component padding
- `sgds:gap-5` (20px) is the card's internal section gap; this is a raw token as no semantic token maps to exactly 20px
