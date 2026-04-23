# SGDS Accordion Component Skill

`<sgds-accordion>` is a container for one or more `<sgds-accordion-item>` elements. Items can be opened and closed individually; setting `allowMultiple` lets multiple items stay open at once.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When content can be logically split into distinct sections and users benefit from reading only the sections relevant to them.
- When vertical space is limited and progressive disclosure helps reduce cognitive load.
- For FAQs, settings panels, or content-heavy pages with multiple independent topics.
- When showing all content simultaneously would overwhelm users — accordion hides non-essential sections by default.

### When NOT to use
- All content is critical and must be visible
- Users need to compare multiple sections simultaneously without any expand/collapse interaction
- Content is short or minimal — fewer than 2 sections
- Used as a primary navigation pattern

## Behaviour

Accordion items support two expand modes:
- **Single-expand (default)** — only one item open at a time; opening another closes the previous
- **Multi-expand** — multiple sections can be open simultaneously; set `allowMultiple` on `<sgds-accordion>`

**Default state:** All items collapsed, or optionally the first item expanded (context-dependent).

**System behaviour:**
- Preserve expanded state where possible — avoid unexpected auto-collapse after user interaction
- Clicking the header toggles visibility; expanded state is indicated via chevron rotation

## Accessibility

- Header elements use `<button>` role with `aria-expanded` indicating open/closed state
- Panel uses `aria-controls` linking to the header button
- Keyboard support: `Tab` to navigate, `Enter` / `Space` to toggle
- Ensure visible focus states on all interactive header elements

## Component Composition

**Accordion items can contain:**
- Form fields
- Lists
- Alerts (for contextual information)
- Cards (use sparingly)

**Avoid placing inside accordion items:**
- Heavy nested interactive components that compete for attention

## Advanced Considerations

- **`variant` and `density` are on `<sgds-accordion>`, not items**: these attributes are set on the parent container and cascade to all child `<sgds-accordion-item>` elements — never set them on individual items.
- **Cancelable events**: `sgds-show` and `sgds-hide` on `<sgds-accordion-item>` are cancelable — call `event.preventDefault()` to block a transition (e.g. to validate before allowing collapse).
- **Public methods**: `show()` and `hide()` on `<sgds-accordion-item>` allow programmatic control — useful for auto-expanding an item with validation errors.
- **`caret` slot**: replace the default chevron with any custom icon by placing an element in the `caret` slot on `<sgds-accordion-item>`.
- **Auto-expand on error**: when a form field inside an accordion item fails validation, call `item.show()` programmatically so the error is visible — do not leave users confused by hidden errors.
- **No nesting**: do not nest `<sgds-accordion>` inside another accordion — keep content hierarchy flat within items.
- **No events on `<sgds-accordion>`**: all events (`sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide`) fire on `<sgds-accordion-item>`, not on the parent `<sgds-accordion>`.

## Edge Cases

- **Very long content** — consider a "View more" pattern instead of a single massive accordion item
- **Dynamic content** — ensure layout stability when content loads asynchronously
- **Error states inside accordion** — auto-expand the affected item so users are not confused
- **Nested interactive elements** — avoid interaction conflicts with components inside accordion panels

## Quick Decision Guide

**Multiple items open at once?** → Add `allowMultiple` on `<sgds-accordion>`

**Outlined border style?** → `variant="border"` on `<sgds-accordion>`

**Compact spacing?** → `density="compact"` on `<sgds-accordion>`

**Spacious spacing?** → `density="spacious"` on `<sgds-accordion>`

**Icon before the header?** → Use the `icon` slot on `<sgds-accordion-item>`

**Badge after the header?** → Use the `badge` slot on `<sgds-accordion-item>`

**Start an item open?** → Add `open` on `<sgds-accordion-item>`

```html
<!-- Basic accordion -->
<sgds-accordion>
  <sgds-accordion-item>
    <div slot="header">Section 1</div>
    <div slot="content">Content for section 1.</div>
  </sgds-accordion-item>
  <sgds-accordion-item open>
    <div slot="header">Section 2 (starts open)</div>
    <div slot="content">Content for section 2.</div>
  </sgds-accordion-item>
  <sgds-accordion-item disabled>
    <div slot="header">Section 3 (disabled)</div>
    <div slot="content">This item cannot be toggled.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Border variant -->
<sgds-accordion variant="border">
  <sgds-accordion-item>
    <div slot="header">Bordered section</div>
    <div slot="content">Content here.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Allow multiple open at once, compact density -->
<sgds-accordion allowMultiple density="compact">
  <sgds-accordion-item open>
    <div slot="header">Item A</div>
    <div slot="content">Content A.</div>
  </sgds-accordion-item>
  <sgds-accordion-item open>
    <div slot="header">Item B</div>
    <div slot="content">Content B.</div>
  </sgds-accordion-item>
</sgds-accordion>

<!-- Spacious density with icon and badge slots -->
<sgds-accordion density="spacious">
  <sgds-accordion-item open>
    <sgds-icon slot="icon" name="info-circle" size="xl"></sgds-icon>
    <div slot="header">Section with icon</div>
    <sgds-badge slot="badge" variant="primary">New</sgds-badge>
    <div slot="content">Content here.</div>
  </sgds-accordion-item>
  <sgds-accordion-item>
    <sgds-icon slot="icon" name="info-circle" size="xl"></sgds-icon>
    <div slot="header">Another section</div>
    <sgds-badge slot="badge" variant="warning">Updated</sgds-badge>
    <div slot="content">More content here.</div>
  </sgds-accordion-item>
</sgds-accordion>
```

## API Summary

### `<sgds-accordion>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `allowMultiple` | boolean | `false` | Allows multiple items to be open simultaneously |
| `variant` | `default \| border` | `default` | Visual style of the accordion |
| `density` | `default \| compact \| spacious` | `default` | Spacing density of accordion items |

### `<sgds-accordion-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `open` | boolean | `false` | Controls whether the item is expanded |
| `disabled` | boolean | `false` | Prevents the item from being toggled |

## Slots (`<sgds-accordion-item>`)

| Slot | Purpose |
|---|---|
| `icon` | An icon placed before the header text |
| `header` | The clickable header / title of the accordion item |
| `badge` | A badge placed after the header text, aligned to the right |
| `caret` | Custom caret/icon replacing the default chevron |
| `content` | The body content shown when the item is expanded |

## Events (`<sgds-accordion-item>`)

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | Yes | — | Item begins expanding |
| `sgds-after-show` | No | — | Item fully expanded (animation complete) |
| `sgds-hide` | Yes | — | Item begins collapsing |
| `sgds-after-hide` | No | — | Item fully collapsed (animation complete) |

## Public Methods (`<sgds-accordion-item>`)

| Method | Description |
|---|---|
| `show()` | Expands the accordion item |
| `hide()` | Collapses the accordion item |

---

**For AI agents**:
1. `variant` and `density` are set on `<sgds-accordion>` (the parent), not on individual items.
2. `sgds-show` and `sgds-hide` are cancelable on `<sgds-accordion-item>` — call `event.preventDefault()` to stop the transition.
3. To start an item expanded on load, add the `open` attribute to `<sgds-accordion-item>`.
4. Without `allowMultiple`, opening one item automatically closes others.
5. Default to the first item open (`open` on first `<sgds-accordion-item>`) only when that section contains key information users need immediately.
6. Use `allowMultiple` when users need to compare sections; use single-expand for guided or sequential reading.
7. Never nest accordions more than one level deep.
8. If a form section inside an accordion item has validation errors, auto-expand that item so the user can see and fix the error.
9. There are no events or public methods on the `<sgds-accordion>` parent element.
