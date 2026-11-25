# Page Header

A page-level header block with a breadcrumb trail, icon + title row, description, and a primary CTA button. Use at the top of any content page to orient the user and provide a primary action.

## When to use

- Any page that benefits from a breadcrumb trail for navigation context
- Pages with a single primary action (create, add, export)
- Pages where the content area has a distinct identity (icon + title)

## Block anatomy

```
Page header
├── Breadcrumb (sgds-breadcrumb)
└── Title row
    ├── Left: flex column
    │   ├── Icon container (accent-surface-muted) + h1 heading
    │   └── Description (label/md-regular)
    └── Right: CTA button (sgds-button primary)
```

## Source files

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/header/`

| Block Name | File Path | URL |
|---|---|---|
| Page Header | `page-header.stories.js` | [page-header.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/header/page-header.stories.js) |
| Page Header with Breadcrumb | `page-header-breadcrumb.stories.js` | [page-header-breadcrumb.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/header/page-header-breadcrumb.stories.js) |

## Customisation notes

- Replace `name="trend-up"` with any icon from the SGDS icon registry that suits the page's subject
- Replace `sgds:bg-accent-surface-muted` with another semantic surface color (e.g. `sgds:bg-primary-surface-muted`) to match the page's brand intent
- The CTA button is optional — omit the right column and remove `sgds:justify-between` if no primary action is needed
- Breadcrumb depth: add or remove `<sgds-breadcrumb-item>` elements; always mark the current page with `active`
