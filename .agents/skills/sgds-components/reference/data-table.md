# SGDS Data Table Component Skill

`<sgds-data-table>` displays structured tabular data using composed row, header, and cell elements.
It supports client-side pagination, server-driven pagination, sorting headers, row selection, expandable rows, and server loading state.

## Usage Guideline

### When to use

- When your data needs table semantics with SGDS-consistent interactions and styling.
- When you need sorting columns based on slotted cell content.
- When you need server-driven paging with loading feedback.
- When rows require selection (checkboxes) or expandable detail panels.

### When NOT to use

- For very simple key-value presentation with no tabular interactions.
- For dense data visualisation where charts are more appropriate.

## Quick Decision Guide

- Static list with local pagination and sorting: use `mode="client"` (default).
- Data from API with backend pagination: use `mode="server"` and listen to `sgds-page-change`.
- Data from API with backend sorting: set `serverSort` and listen to `sgds-sort`.
- Need loading indicator while fetching server data: set `loading` to `true`.
- Need numeric columns aligned right: set `textAlign="right"` on the corresponding `sgds-data-table-head`.
- Need only selected columns to sort: set `sorting` only on those headers.
- Need default sort indicator on first render: set `sortDirection` on a sortable header.

```html
<sgds-data-table dataLength="3" itemsPerPage="5" currentPage="1">
  <sgds-data-table-row>
    <sgds-data-table-head sorting sortKey="id">ID</sgds-data-table-head>
    <sgds-data-table-head sorting sortKey="name" sortDirection="ascending">Name</sgds-data-table-head>
    <sgds-data-table-head>Role</sgds-data-table-head>
    <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
  </sgds-data-table-row>
  <sgds-data-table-row>
    <sgds-data-table-cell>1</sgds-data-table-cell>
    <sgds-data-table-cell>Amy</sgds-data-table-cell>
    <sgds-data-table-cell>Analyst</sgds-data-table-cell>
    <sgds-data-table-cell>125.00</sgds-data-table-cell>
  </sgds-data-table-row>
</sgds-data-table>
```

## API Summary

### `<sgds-data-table>`

| Attribute | Type | Default | Purpose |
| --- | --- | --- | --- |
| `multiSelect` | boolean | `false` | Shows a checkbox column for row selection |
| `dataLength` | number | `0` | Total number of rows (especially for server mode) |
| `currentPage` | number | `1` | Current page number |
| `itemsPerPage` | number | `5` | Rows per page |
| `paginationSummary` | string | `""` | Replaces default summary text in footer |
| `paginationVariant` | `"default" \| "number" \| "button" \| "description"` | `"default"` | Variant forwarded to internal pagination |
| `mode` | `"client" \| "server"` | `"client"` | Pagination mode |
| `loading` | boolean | `false` | Shows skeleton loading rows aligned with table headers. The number of skeleton rows matches `itemsPerPage` |
| `serverSort` | boolean | `false` | Disables built-in sorting and emits `sgds-sort` for external sorting via API |
| `layout` | `"auto" \| "fixed"` | `"auto"` | CSS `table-layout` algorithm — `"fixed"` distributes column widths evenly |

### `<sgds-data-table-head>`

| Attribute | Type | Default | Purpose |
| --- | --- | --- | --- |
| `sorting` | boolean | `false` | Enables sort toggle on click |
| `sortKey` | string | `""` | Column key emitted in sort event detail, used to identify which column to sort |
| `sortDirection` | `"ascending" \| "descending" \| "none" \| "other"` | `"none"` | Initial sort direction for sortable headers |
| `textAlign` | `"left" \| "right"` | `"left"` | Alignment for header and same body column |
| `width` | string | — | Column width |

### `<sgds-data-table-row>`

| Attribute | Type | Default | Purpose |
| --- | --- | --- | --- |
| `expand` | boolean | `false` | Enables an expandable content area beneath the row |
| `open` | boolean | `false` | When true, the expandable content area is open |
| `checked` | boolean | `false` | When true, the row is checked (used with `multiSelect`) |

## Slots

### Data Table Slots

| Slot | Purpose |
| --- | --- |
| default | Accepts `sgds-data-table-row` entries for header and body rows |
| `no-data` | Custom content rendered when no body rows are available and `loading` is false |

### Data Table Row Slots

| Slot | Purpose |
| --- | --- |
| default | Accepts `sgds-data-table-head` and `sgds-data-table-cell` |
| `content` | Content displayed in expanded detail row |

## Events

| Event | When | Detail |
| --- | --- | --- |
| `sgds-page-change` | Pagination page changes | — |
| `sgds-row-select` | Selection state changes for row checkboxes | `{ selected: Record<string, string>[] }` — each object maps header text (or `sortKey` if set) to cell text |
| `sgds-sort` | A sorting header changes sort direction (emitted by `sgds-data-table` when `serverSort` is true) | `{ key: string, direction: "ascending" \| "descending" \| "none" }` |
| `sgds-show` | Expandable row starts opening | — |
| `sgds-after-show` | Expandable row finishes opening | — |
| `sgds-hide` | Expandable row starts closing | — |
| `sgds-after-hide` | Expandable row finishes closing | — |

## Sorting Behavior Notes

- In client mode, sorting affects only currently visible rows.
- When `serverSort` is enabled, built-in client-side sorting is disabled. Clicking a sort header only emits `sgds-sort` — the actual sorting must be handled by your API.
- When a sort cycles back to `none`, client-mode row order reverts to the initial slotted order.
- Sort controls are disabled when there are no body rows.

## Server Mode Example

```html
<sgds-data-table id="users-table" mode="server" serverSort dataLength="100" itemsPerPage="10" currentPage="1">
  <sgds-data-table-row>
    <sgds-data-table-head sorting sortKey="id">ID</sgds-data-table-head>
    <sgds-data-table-head sorting sortKey="name">Name</sgds-data-table-head>
  </sgds-data-table-row>
</sgds-data-table>

<script type="module">
  const table = document.getElementById("users-table");

  async function loadPage(page) {
    table.loading = true;
    try {
      const response = await fetch(`/api/users?page=${page}`);
      const { total, rows } = await response.json();
      table.dataLength = total;

      const headerRow = table.querySelector("sgds-data-table-row");
      table.innerHTML = `${headerRow.outerHTML}${rows
        .map(
          row => `
          <sgds-data-table-row>
            <sgds-data-table-cell>${row.id}</sgds-data-table-cell>
            <sgds-data-table-cell>${row.name}</sgds-data-table-cell>
          </sgds-data-table-row>`
        )
        .join("")}`;
    } finally {
      table.loading = false;
    }
  }

  table.addEventListener("sgds-page-change", () => {
    loadPage(Number(table.currentPage || 1));
  });

  table.addEventListener("sgds-sort", ({ detail }) => {
    // Use detail.key and detail.direction in your API query.
    console.log(detail);
    loadPage(Number(table.currentPage || 1));
  });

  loadPage(1);
</script>
```

---

**For AI agents**:

1. Always provide `dataLength`, `currentPage`, and `itemsPerPage` together for predictable pagination.
2. In server mode, manage `loading` around fetch calls and update row markup externally.
3. Use `textAlign` on header cells only; body alignment is inherited by column.
4. Keep non-sorting control columns (expand/checkbox) non-sorting.
5. Set `sortKey` on sortable headers for stable sorting behavior.
