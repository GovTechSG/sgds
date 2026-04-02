# SGDS Pagination Component Skill

`<sgds-pagination>` renders a paging control from `dataLength`, `itemsPerPage`, and `currentPage`. All navigation logic is managed by the component — listen to `sgds-page-change` to apply the new page to your data query.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
