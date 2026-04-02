# SGDS Accordion Component Skill

`<sgds-accordion>` is a container for one or more `<sgds-accordion-item>` elements. Items can be opened and closed individually; setting `allowMultiple` lets multiple items stay open at once.

## Quick Decision Guide

**Multiple items open at once?** → Add `allowMultiple` on `<sgds-accordion>`

**Outlined border style?** → `variant="border"` on `<sgds-accordion>`

**Compact spacing?** → `density="compact"` on `<sgds-accordion>`

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
```

## API Summary

### `<sgds-accordion>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `allowMultiple` | boolean | `false` | Allows multiple items to be open simultaneously |
| `variant` | `default \| border` | `default` | Visual style of the accordion |
| `density` | `default \| compact` | `default` | Spacing density of accordion items |

### `<sgds-accordion-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `open` | boolean | `false` | Controls whether the item is expanded |
| `disabled` | boolean | `false` | Prevents the item from being toggled |

## Slots (`<sgds-accordion-item>`)

| Slot | Purpose |
|---|---|
| `header` | The clickable header / title of the accordion item |
| `content` | The body content shown when the item is expanded |
| `caret` | Custom caret/icon replacing the default chevron |

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
5. There are no events or public methods on the `<sgds-accordion>` parent element.
