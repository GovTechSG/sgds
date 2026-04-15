# SGDS Pagination Component Skill

`<sgds-pagination>` renders a paging control from `dataLength`, `itemsPerPage`, and `currentPage`. All navigation logic is managed by the component — listen to `sgds-page-change` to apply the new page to your data query.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When displaying a large dataset that needs to be split into pages (e.g. tables, search results, lists).
- When the total record count is known and can be passed as `dataLength`.
- When users need to navigate between discrete pages of content.

### When NOT to use

- For infinite scroll or "load more" patterns — those require custom implementation.
- When the total record count is unknown (e.g. cursor-based pagination) — this component requires `dataLength`.
- For very small datasets (fewer than one page) — if `dataLength ≤ itemsPerPage`, no pagination is shown.
- As a navigation component between application pages — use links or a router instead.

## Behaviour

- Calculates total pages from `dataLength ÷ itemsPerPage`.
- `currentPage` is 1-indexed; the component highlights the active page and disables Prev/Next at the boundaries.
- Fires `sgds-page-change` with `{ currentPage: number }` when the user clicks a page button or Prev/Next — the host application is responsible for fetching/filtering data for the new page.
- When `dataLength` is `0`, no page controls are rendered.
- `variant` controls the visual style: `default` (icon nav only), `number` (numbered page buttons), `button` (compact button), `description` (Prev/Next with page label).
- `navigation` controls the Prev/Next control style: `icon-button` (default) or `button`.
- `size` scales all controls: `md` (default) or `sm`.
- No public methods — all state is driven by attributes.

## Advanced Considerations

- **`currentPage` is controlled**: the component does not update `currentPage` itself — the host application must update `currentPage` in response to `sgds-page-change` to keep the UI in sync.
- **`dataLength` changes**: if the dataset shrinks (e.g. after filtering), total pages recalculate; ensure `currentPage` is reset to `1` to avoid showing an out-of-range page.
- **`variant="number"`**: shows numbered page buttons with an ellipsis for large page counts; suitable when users need to jump to a specific page.
- **`variant="description"`**: shows only Prev/Next with a "Page X of Y" label — suitable for simple sequential navigation without page jumping.
- **No public methods**: programmatic page changes must be applied by updating the `currentPage` attribute directly.

## Edge Cases

- **`dataLength` is 0**: no pagination renders — ensure the parent UI handles the empty state correctly.
- **`currentPage` out of range**: setting `currentPage` higher than total pages may cause unexpected rendering — always clamp `currentPage` within `1` to total pages when `dataLength` changes.
- **`itemsPerPage` larger than `dataLength`**: results in a single page with no Prev/Next available — no pagination control renders.
- **Not updating `currentPage` after `sgds-page-change`**: the component's active state falls out of sync with the actual page — always update `currentPage` reactively.
- **Rapid page changes**: `sgds-page-change` fires on every click — debounce or disable the control during async data loads if needed.

## Quick Decision Guide

**Basic paging control?** → Set `dataLength`, `itemsPerPage`, `currentPage`

**Show page number buttons?** → `variant="number"`

**Show only Prev/Next buttons with a description label?** → `variant="description"`

**Compact button version?** → `variant="button"`

**Default (icon previous/next only)?** → `variant="default"` (default)

**Small size?** → `size="sm"`

```html
<!-- Basic pagination (icon navigation, no page numbers) -->
<sgds-pagination
  id="my-pagination"
  dataLength="200"
  itemsPerPage="10"
  currentPage="1"
></sgds-pagination>

<!-- Number variant: shows numbered page buttons -->
<sgds-pagination
  dataLength="200"
  itemsPerPage="10"
  currentPage="1"
  variant="number"
></sgds-pagination>

<!-- Description variant: Prev/Next with current page description -->
<sgds-pagination
  dataLength="200"
  itemsPerPage="10"
  currentPage="1"
  variant="description"
></sgds-pagination>

<script>
  document.getElementById("my-pagination").addEventListener("sgds-page-change", e => {
    const { currentPage } = e.detail;
    // Reload your data for the new page
    loadData(currentPage);
  });
</script>
```

## API Summary

### `<sgds-pagination>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `dataLength` | number | `0` | Total number of items across all pages |
| `itemsPerPage` | number | `5` | Number of items shown per page |
| `currentPage` | number | `1` | Currently active page (1-indexed) |
| `variant` | `default \| number \| button \| description` | `default` | Visual style of the pager |
| `navigation` | `button \| icon-button` | `icon-button` | Style of the Prev/Next controls |
| `size` | `sm \| md` | `md` | Size of the pagination controls |

## Events

| Event | Detail | When |
|---|---|---|
| `sgds-page-change` | `{ currentPage: number }` | User clicks a page button or Prev/Next |

---

**For AI agents**:
1. `dataLength` is the total record count — if you have 200 records with `itemsPerPage="10"`, the component shows 20 pages.
2. Always listen to `sgds-page-change` and use `event.detail.currentPage` to fetch/filter data for the new page.
3. `currentPage` is 1-indexed — page 1 is the first page.
4. When `dataLength` is `0`, no pages are shown.
5. There are no public methods on this component.
