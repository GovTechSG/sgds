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

## Complete block

```html
<div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">

  <!-- Breadcrumb -->
  <sgds-breadcrumb>
    <sgds-breadcrumb-item><a href="#">Link</a></sgds-breadcrumb-item>
    <sgds-breadcrumb-item><a href="#">Link</a></sgds-breadcrumb-item>
    <sgds-breadcrumb-item active><a href="#">Link</a></sgds-breadcrumb-item>
  </sgds-breadcrumb>

  <!-- Title row: left content + right action -->
  <div class="sgds:flex sgds:items-start sgds:justify-between">

    <!-- Left: icon + title + description -->
    <div class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:flex-1">

      <!-- Icon + heading -->
      <div class="sgds:flex sgds:items-center sgds:gap-text-sm">
        <div class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:w-10 sgds:h-10 sgds:shrink-0 sgds:p-2 sgds:rounded-md sgds:bg-accent-surface-muted">
          <sgds-icon name="trend-up" size="24"></sgds-icon>
        </div>
        <h1 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default sgds:mb-0">Applications</h1>
      </div>

      <!-- Description -->
      <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Placeholder texts</div>

    </div>

    <!-- Right: CTA -->
    <sgds-button variant="primary">
      <sgds-icon name="plus" slot="leftIcon"></sgds-icon>
      Create application
    </sgds-button>

  </div>
</div>
```

## Customisation notes

- Replace `name="trend-up"` with any icon from the SGDS icon registry that suits the page's subject
- Replace `sgds:bg-accent-surface-muted` with another semantic surface color (e.g. `sgds:bg-primary-surface-muted`) to match the page's brand intent
- The CTA button is optional — omit the right column and remove `sgds:justify-between` if no primary action is needed
- Breadcrumb depth: add or remove `<sgds-breadcrumb-item>` elements; always mark the current page with `active`
