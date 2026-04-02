# SGDS Table Component Skill

`<sgds-table>` renders structured tabular data. **Always use the slot-based sub-components** — `<sgds-table-row>`, `<sgds-table-head>`, and `<sgds-table-cell>` — for full structural control. The legacy array-based properties (`tableData`, `columnHeader`, `rowHeader`) exist but must not be used.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
