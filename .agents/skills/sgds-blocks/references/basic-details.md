# Basic Details Card

A bordered card that displays a set of key-value pairs for a single entity, with an optional edit action. Use to present read-only summary information about a record.

## When to use

- Displaying entity metadata (ID, name, description, contact info)
- Summary panels on detail/profile pages
- Anywhere a user needs to review field values before taking an action

## Block anatomy

```
Basic details card
├── Card title (h5, subtitle/md-semibold)
├── Key-value list (flex-col, gap-text-md)
│   └── Field (repeat per field)
│       ├── Label (div, label/md-semibold)
│       └── Value (div, label/md-regular) or sgds-link for URLs/emails
└── Action (sgds-button, optional)
```

## Complete block

```html
<div class="sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-lg sgds:p-component-xs sgds:flex sgds:flex-col sgds:gap-5">

  <!-- Card title -->
  <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
    Basic details
  </h5>

  <!-- Key-value pairs -->
  <div class="sgds:flex sgds:flex-col sgds:gap-text-md">

    <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
      <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Application ID</div>
      <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Fantastic-Grizzly-Bear-0f4bed5f-ea64-41a6-9b16-49d7eb84b81c</div>
    </div>

    <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
      <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Organisation</div>
      <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">[GVT] APEX</div>
    </div>

    <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
      <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Description</div>
      <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default">This application provides secure access to government services and APIs, enabling seamless integration with external systems.</div>
    </div>

    <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
      <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">Email</div>
      <sgds-link><a href="mailto:petrine@tech.gov.sg">petrine@tech.gov.sg</a></sgds-link>
    </div>

  </div>

  <!-- Action -->
  <sgds-button variant="primary">
    <sgds-icon name="pencil" slot="leftIcon"></sgds-icon>
    Edit details
  </sgds-button>

</div>
```

## Customisation notes

- Add or remove `<div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">` blocks for each field
- Use `<sgds-link><a href="...">...</a></sgds-link>` for any value that is a URL or email address
- The action button is optional — omit entirely if the card is view-only
- `sgds:gap-5` (20px) is used for the card's internal section gap; this is a raw token as no semantic token maps to 20px
