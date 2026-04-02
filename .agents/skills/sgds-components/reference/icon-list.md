# SGDS Icon List Component Skill

`<sgds-icon-list>` renders a list where each item is prefixed by an `<sgds-icon>`. Use it for feature highlights, summaries, or any list that benefits from an icon prefix.

## Quick Decision Guide

**Each list item** must be a `<div role="listitem">` containing an `<sgds-icon>` followed by the item text.

**Icon size is not managed automatically** — set the icon `size` to match the list `size`:
- List `size="sm"` → use `<sgds-icon size="md">`
- List `size="md"` (default) → use `<sgds-icon>` (default `lg`)
- List `size="lg"` → use `<sgds-icon size="xl">`

```html
<!-- Default size -->
<sgds-icon-list>
  <div role="listitem"><sgds-icon name="check-circle-fill"></sgds-icon>Feature one</div>
  <div role="listitem"><sgds-icon name="check-circle-fill"></sgds-icon>Feature two</div>
  <div role="listitem"><sgds-icon name="check-circle-fill"></sgds-icon>Feature three</div>
</sgds-icon-list>

<!-- Small size — use size="md" on icons -->
<sgds-icon-list size="sm">
  <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
  <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
</sgds-icon-list>

<!-- Large size — use size="xl" on icons -->
<sgds-icon-list size="lg">
  <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>Item one</div>
  <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>Item two</div>
</sgds-icon-list>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | Controls text size of list items (does not auto-scale icon size) |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | `<div role="listitem">` elements, each containing an `<sgds-icon>` and item text |

## Events

None.

---

**For AI agents**:
1. Each item must be a `<div role="listitem">` — never use `<li>` or raw text.
2. Icon size is **not** auto-scaled from list `size` — always set icon `size` explicitly to match: `sm→md`, `md→lg` (default), `lg→xl`.
3. Place the `<sgds-icon>` before the text content inside each `<div role="listitem">`.
4. There are no custom events or public methods on this component.
5. `<sgds-icon-list>` is commonly used inside card components (`<sgds-icon-card>`, `<sgds-image-card>`, `<sgds-thumbnail-card>`) to display metadata like dates and locations.
