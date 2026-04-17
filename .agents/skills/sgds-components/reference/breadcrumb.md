# SGDS Breadcrumb Component Skill

`<sgds-breadcrumb>` renders a navigational trail showing the user's location within a page hierarchy. Each step is a `<sgds-breadcrumb-item>` wrapping a standard `<a>` tag.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- On pages within a multi-level hierarchy (2 or more levels deep) to show the user's current location and provide quick navigation back to parent pages.
- For content-heavy sites (documentation, product catalogues, portals) where users frequently navigate laterally or upward through the structure.
- When users may arrive at a deep page directly (e.g. from search) and need wayfinding context.

### When NOT to use
- For flat structures with minimal hierarchy
- As a primary navigation replacement
- When the hierarchy is unclear, dynamic, or non-linear
- In small, focused flows (e.g. forms, wizards — use stepper instead)

## Behaviour

- Displays items in left-to-right sequence, starting from the root (e.g. Home)
- Each item represents a level in the hierarchy
- All items except the last are clickable links
- The last item represents the current page and is non-clickable
- Middle items collapse into an overflow menu when 5 or more items are present
- Separators visually distinguish levels and are non-interactive

## Advanced Considerations

**Responsive behaviour** — collapse middle items into an overflow (e.g. `...`) on smaller screens; this happens automatically at 5+ items

**Dynamic breadcrumbs** — generate based on routing or IA structure

**Accessibility** — use `aria-label` on the `<nav>` wrapper; mark current page with `aria-current="page"` (set automatically by the component)

**SEO support** — use structured data (e.g. `schema.org BreadcrumbList`) for search engine visibility

**Consistency** — align breadcrumb logic with global navigation patterns across your product

## Edge Cases

- **Very deep hierarchies (5+ levels)** — middle items collapse automatically into overflow
- **Long labels** — apply truncation with tooltip for full text
- **Duplicate names across levels** — ensure clarity through context or naming adjustments
- **Non-hierarchical navigation paths** — avoid showing misleading breadcrumb trails
- **Dynamic or filtered pages** — avoid including temporary states (e.g. filters) as breadcrumb items
- **Localisation** — ensure translated labels remain concise and meaningful

## Quick Decision Guide

**Always pass a single `<a>` tag** inside each `<sgds-breadcrumb-item>`.

**Last item (current page)**:
- The component **automatically** sets `aria-current="page"` and `active=true` on the last `<sgds-breadcrumb-item>`. You do not need to set `active` manually; it is managed by the parent.

**Overflow (5+ items)**:
- When 5 or more items are present, the middle items are automatically collapsed into an overflow menu using `<sgds-overflow-menu>`. No configuration is needed.

```html
<!-- Basic breadcrumb -->
<sgds-breadcrumb>
  <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/about">About</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/about/contact">Contact</a></sgds-breadcrumb-item>
</sgds-breadcrumb>

<!-- Overflow — middle items collapse automatically when 5 or more items are present -->
<sgds-breadcrumb>
  <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 1</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 2</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 3</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 4</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Current page</a></sgds-breadcrumb-item>
</sgds-breadcrumb>

<!-- Custom aria-label for the nav element -->
<sgds-breadcrumb ariaLabel="Site navigation">
  <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/docs">Docs</a></sgds-breadcrumb-item>
</sgds-breadcrumb>
```

## API Summary — `<sgds-breadcrumb>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `ariaLabel` | string | `"breadcrumb"` | `aria-label` on the wrapping `<nav>` element |

## API Summary — `<sgds-breadcrumb-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Set automatically by the parent on the last item — do not set manually |

## Slots — `<sgds-breadcrumb>`

| Slot | Purpose |
|---|---|
| *(default)* | `<sgds-breadcrumb-item>` elements |

## Slots — `<sgds-breadcrumb-item>`

| Slot | Purpose |
|---|---|
| *(default)* | A single `<a>` tag |

## Events

None on either component.

---

**For AI agents**:
1. Always use `<sgds-breadcrumb>` + `<sgds-breadcrumb-item>` for navigation trails — never suggest manual `<nav><ol><li>` patterns.
2. Each `<sgds-breadcrumb-item>` must contain a single `<a>` tag — never put raw text directly inside.
3. **`<sgds-breadcrumb-item>` has no `href` prop.** Do NOT write `<sgds-breadcrumb-item href="/about">`. The `href` belongs on the slotted `<a>` tag: `<sgds-breadcrumb-item><a href="/about">About</a></sgds-breadcrumb-item>`.
4. The last item's `active` state and `aria-current="page"` are set **automatically** — do not add these manually.
5. Overflow (collapsing middle items) triggers automatically when there are 5 or more items — no configuration is needed.
6. There are no custom events on either component.
