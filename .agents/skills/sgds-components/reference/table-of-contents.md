# SGDS Table of Contents Component Skill

`<sgds-table-of-contents>` renders a list of anchor links for in-page navigation. Provide a heading via the default slot and a list of `<li>` items containing `<sgds-link>` elements via the `contents` slot.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When a page has multiple distinct sections and users benefit from knowing the page structure upfront.
- For long-form content pages (documentation, articles, guides) where users may want to jump to a specific section.
- When the page is long enough that scrolling past all sections to find one would be disorienting.

### When NOT to use

- On short pages where all content is visible without scrolling — the component adds navigation overhead without benefit.
- For site-level or multi-page navigation — use `<sgds-mainnav>` or `<sgds-sidenav>` instead.
- When sections do not have unique `id` attributes on the page — anchor links will not function.
- For dynamic or programmatically generated content trees — build a custom navigation component instead.

## Behaviour

- Renders a labelled list of anchor links for navigating within the current page.
- The default slot accepts a heading element (e.g. `<h5>`) to label the table of contents.
- The `contents` slot accepts `<li>` elements, each containing a `<sgds-link>` wrapping an `<a href="#section-id">`.
- Clicking a link scrolls the page to the matching `id` on the target section.
- The component has no attributes, events, or public methods — it is purely presentational and structural.

## Advanced Considerations

- **Heading level**: choose a heading level for the default slot that fits the surrounding document hierarchy — typically `<h4>` or `<h5>` depending on page structure.
- **Anchor accuracy**: each `<a href="#id">` must exactly match the `id` of a section on the page — a mismatch produces a broken link that scrolls to the top of the page.
- **No active state tracking**: `<sgds-table-of-contents>` does not highlight the currently visible section as the user scrolls — implement scroll-spy behaviour manually if needed.
- **Ordering**: list items appear in the order they are added to the `contents` slot — match the visual order of sections on the page for consistency.

## Edge Cases

- **No heading provided**: the default slot is empty — the table of contents renders without a label; always provide a heading for accessibility.
- **Broken anchor links**: `href="#id"` with no matching `id` attribute on the page scrolls to the top — verify all IDs match.
- **Single entry**: technically valid, but a single-item table of contents provides no navigation value; only render the component when there are two or more sections.
- **Duplicate section IDs**: the browser navigates to the first matching `id` — ensure all section IDs on the page are unique.

## Quick Decision Guide

**Standard table of contents for a content page?** → Use `<sgds-table-of-contents>` with a heading in the default slot and `<li>` items in the `contents` slot

**Each entry links to a page section?** → Use `<sgds-link>` with `<a href="#section-id">` inside each `<li>`

```html
<!-- Basic table of contents -->
<sgds-table-of-contents>
  <h5>Contents</h5>
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
| *(default)* | Heading element for the table of contents (e.g. `<h5>Contents</h5>`) |
| `contents` | `<li>` elements, each containing a `<sgds-link>` with an anchor `<a href="#">` |

## Events

None.

---

**For AI agents**:
1. The *(default)* slot takes the heading — use a semantic heading element like `<h5>`.
2. Each `contents` slot item is a `<li>` element containing `<sgds-link><a href="#section-id">Label</a></sgds-link>`.
3. Anchor `href` values should match `id` attributes on the target page sections.
4. There are no attributes, custom events, or public methods on this component.
