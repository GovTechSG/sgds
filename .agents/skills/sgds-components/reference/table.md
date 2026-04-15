# SGDS Table Component Skill

`<sgds-table>` renders structured tabular data. **Always use the slot-based sub-components** — `<sgds-table-row>`, `<sgds-table-head>`, and `<sgds-table-cell>` — for full structural control. The legacy array-based properties (`tableData`, `columnHeader`, `rowHeader`) exist but must not be used.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When presenting structured data with a clear relationship between rows and columns (e.g. records, reports, listings).
- When users need to scan, compare, or reference multiple data points across multiple items.
- For admin dashboards, data management interfaces, and any feature involving lists of records with multiple attributes per item.
- When cells need to contain rich content like action buttons, status badges, or links alongside data.

### When NOT to use

- For layout purposes — use CSS grid or flexbox utilities instead.
- When there is only one column of data — a simple list is more appropriate.
- For displaying key–value pairs of a single item — use `<sgds-description-list>` instead.
- When the data volume is very small (1–2 rows with 1–2 columns) — a plain prose format may be clearer.
- **Inside a narrow grid column, or beside other elements sharing the same row** — a table must always span the full 12-column grid width. Placing it in a split layout (e.g. 6 + 6 columns) compresses columns and harms readability.

## Behaviour

- `<sgds-table>` is a container that wraps `<sgds-table-row>`, `<sgds-table-head>`, and `<sgds-table-cell>` sub-components.
- The first `<sgds-table-row>` should contain `<sgds-table-head>` cells; all subsequent rows use `<sgds-table-cell>`.
- `headerBackground` on `<sgds-table>` applies a background shade to all `<sgds-table-head>` cells automatically.
- `tableBorder` on `<sgds-table>` renders visible borders on all cells.
- `responsive` on `<sgds-table>` enables horizontal scrolling at the specified breakpoint (`sm`, `md`, `lg`, `xl`, or `always`).
- `<sgds-table-cell>` accepts any HTML content — use for badges, buttons, links, or mixed content.
- No custom events or public methods on any sub-component.

## Advanced Considerations

- **Always use slot-based sub-components**: the legacy array-based properties (`tableData`, `columnHeader`, `rowHeader`) exist on `<sgds-table>` but must never be used — use `<sgds-table-row>`, `<sgds-table-head>`, and `<sgds-table-cell>` exclusively.
- **`headerBackground` and `tableBorder` cascade**: these attributes are set on `<sgds-table>` only and automatically affect all descendant header and cell elements — do not set them on individual sub-components.
- **`responsive` breakpoint behaviour**: a table with `responsive="md"` scrolls horizontally only on viewports narrower than the `md` breakpoint; on wider viewports it renders normally.
- **Rich cell content**: `<sgds-table-cell>` slots accept any HTML — placing interactive elements (buttons, links) inside cells is the supported pattern for action columns.
- **No sorting or pagination built in**: `<sgds-table>` is a presentational component — implement sorting, filtering, and pagination logic in your application layer.

## Edge Cases

- **Empty table**: `<sgds-table>` with no rows renders an empty container — always include at least a header row.
- **Missing header row**: without `<sgds-table-head>` cells, the table has no accessible column headers — always include a header row with `<sgds-table-head>` elements.
- **Inconsistent column counts**: rows with fewer cells than the header row leave trailing empty columns — ensure all rows have the same number of cells.
- **Very wide tables without `responsive`**: content overflows the container on narrow viewports — add `responsive` when the table has many columns.
- **Complex content in cells on narrow viewports**: buttons or badges inside cells may wrap or overflow — test rich cell layouts at target breakpoints.

## Sub-components

| Tag | Role |
|-----|---------|
| `<sgds-table>` | Container. Accepts `tableBorder` and `headerBackground` boolean attributes. |
| `<sgds-table-row>` | A row. Place inside `<sgds-table>`. First row typically contains `<sgds-table-head>` cells. |
| `<sgds-table-head>` | A header cell. Inherits `headerBackground` styling from the parent `<sgds-table>`. |
| `<sgds-table-cell>` | A data cell. Can contain any HTML — text, badges, buttons, links. |

## Basic Usage

```html
<sgds-table>
  <sgds-table-row>
    <sgds-table-head>Name</sgds-table-head>
    <sgds-table-head>Department</sgds-table-head>
    <sgds-table-head>Status</sgds-table-head>
  </sgds-table-row>
  <sgds-table-row>
    <sgds-table-cell>Alice Tan</sgds-table-cell>
    <sgds-table-cell>Engineering</sgds-table-cell>
    <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
  </sgds-table-row>
  <sgds-table-row>
    <sgds-table-cell>Bob Lee</sgds-table-cell>
    <sgds-table-cell>Design</sgds-table-cell>
    <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
  </sgds-table-row>
</sgds-table>
```

## With borders and header background

```html
<sgds-table tableBorder headerBackground>
  <sgds-table-row>
    <sgds-table-head>Reference</sgds-table-head>
    <sgds-table-head>Applicant</sgds-table-head>
    <sgds-table-head>Submitted</sgds-table-head>
    <sgds-table-head>Amount</sgds-table-head>
    <sgds-table-head>Status</sgds-table-head>
  </sgds-table-row>
  <sgds-table-row>
    <sgds-table-cell>REF-00412</sgds-table-cell>
    <sgds-table-cell>Lim Ah Kow</sgds-table-cell>
    <sgds-table-cell>01 Jan 2025</sgds-table-cell>
    <sgds-table-cell>$1,200</sgds-table-cell>
    <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
  </sgds-table-row>
</sgds-table>
```

## Rich cell content (actions, links, badges)

`<sgds-table-cell>` slots accept any HTML — use this for interactive content:

```html
<sgds-table-row>
  <sgds-table-cell>REF-00398</sgds-table-cell>
  <sgds-table-cell>Tan Bee Choo</sgds-table-cell>
  <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
  <sgds-table-cell>
    <sgds-button variant="ghost" size="sm">View</sgds-button>
    <sgds-button variant="ghost" size="sm">Edit</sgds-button>
  </sgds-table-cell>
</sgds-table-row>
```

## Responsive horizontal scroll

```html
<sgds-table responsive="md">
  <!-- rows and cells -->
</sgds-table>
```

## API Summary

### `<sgds-table>` attributes

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `headerBackground` | boolean | `false` | Applies background shade to all `<sgds-table-head>` cells |
| `tableBorder` | boolean | `false` | Renders borders on all cells |
| `responsive` | `sm \| md \| lg \| xl \| always` | — | Enables horizontal scroll below the breakpoint |

`<sgds-table-row>`, `<sgds-table-head>`, and `<sgds-table-cell>` have no attributes — all content goes in their default slot.

## Events

None.

---

**For AI agents**:
1. **Always use slots** — `<sgds-table-row>`, `<sgds-table-head>`, `<sgds-table-cell>` are the correct approach. Never use `tableData`, `columnHeader`, or `rowHeader` array properties.
2. The first `<sgds-table-row>` should contain `<sgds-table-head>` cells; subsequent rows use `<sgds-table-cell>`.
3. `<sgds-table-cell>` accepts rich HTML — badges, buttons, links are fine inside cells.
4. `headerBackground` and `tableBorder` are boolean attributes on `<sgds-table>` only — they cascade down to sub-components automatically.
5. There are no custom events or public methods on this component.
6. **`<sgds-table>` must always occupy the full 12-column grid width.** Never place it beside another element sharing the same grid row (e.g. do not put it in a 6-column half alongside a sidebar or form). Tables need the full width to display columns legibly — splitting them into a partial-width column makes them unreadable. If a filter panel or sidebar is needed, stack it above or below the table, not beside it.
