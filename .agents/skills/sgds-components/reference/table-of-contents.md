# SGDS Table of Contents Component Skill

`<sgds-table-of-contents>` renders a list of anchor links for in-page navigation. Provide a heading via the default slot and a list of `<li>` items containing `<sgds-link>` elements via the `contents` slot.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Standard table of contents for a content page?** → Use `<sgds-table-of-contents>` with a heading in the default slot and `<li>` items in the `contents` slot

**Each entry links to a page section?** → Use `<sgds-link>` with `<a href="#section-id">` inside each `<li>`

```html
<!-- Basic table of contents -->
<sgds-table-of-contents>
  <h3>Contents</h3>
  <li slot="contents">
    <sgds-link><a href="#overview">Overview</a></sgds-link>
  </li>
  <li slot="contents">
    <sgds-link><a href="#installation">Installation</a></sgds-link>
  </li>
  <li slot="contents">
    <sgds-link><a href="#usage">Usage</a></sgds-link>
  </li>
  <li slot="contents">
    <sgds-link><a href="#api">API Reference</a></sgds-link>
  </li>
  <li slot="contents">
    <sgds-link><a href="#changelog">Changelog</a></sgds-link>
  </li>
</sgds-table-of-contents>

<!-- Corresponding page sections -->
<section id="overview">
  <h2>Overview</h2>
  ...
</section>
<section id="installation">
  <h2>Installation</h2>
  ...
</section>
```

## API Summary

### `<sgds-table-of-contents>`

No attributes.

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Heading element for the table of contents (e.g. `<h3>Contents</h3>`) |
| `contents` | `<li>` elements, each containing a `<sgds-link>` with an anchor `<a href="#">` |

## Events

None.

---

**For AI agents**:
1. The *(default)* slot takes the heading — use a semantic heading element like `<h3>`.
2. Each `contents` slot item is a `<li>` element containing `<sgds-link><a href="#section-id">Label</a></sgds-link>`.
3. Anchor `href` values should match `id` attributes on the target page sections.
4. There are no attributes, custom events, or public methods on this component.
