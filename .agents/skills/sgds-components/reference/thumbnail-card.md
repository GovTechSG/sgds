# SGDS Thumbnail Card Component Skill

`<sgds-thumbnail-card>` is a card variant with a small thumbnail image (typically 64×64 px) rather than a full-width photo. Use it for compact list-like layouts, search results, or items where a logo or icon-sized image accompanies the content.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Which card type?**
- Small logo/thumbnail beside content → `<sgds-thumbnail-card>` (this component)
- Full-width photograph → `<sgds-image-card>`
- Large icon leads the card → `<sgds-icon-card>`
- General content card → `<sgds-card>`

**Orientation?**
- Thumbnail above content → `vertical` (default)
- Thumbnail beside content → `horizontal`

**Entire card clickable?**
- Add `stretchedLink` — href is sourced from the `<a>` inside the `footer` slot

```html
<!-- Basic thumbnail card -->
<sgds-thumbnail-card>
  <img slot="thumbnail" alt="Logo" width="64" height="64" src="logo.svg" />
  <sgds-badge variant="primary" slot="upper">New</sgds-badge>
  <span slot="subtitle">EXPLORE THE FEATURES</span>
  <span slot="title">Innovative Solutions for You</span>
  <sgds-icon-list size="sm">
    <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
    <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
  </sgds-icon-list>
  <span slot="description">Descriptive text about this item.</span>
  <div slot="lower">
    <sgds-badge variant="neutral" outlined>Design</sgds-badge>
  </div>
  <sgds-link slot="footer">
    <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-thumbnail-card>

<!-- Horizontal orientation -->
<sgds-thumbnail-card orientation="horizontal">
  <img slot="thumbnail" alt="Logo" width="64" height="64" src="logo.svg" />
  <span slot="title">Horizontal Thumbnail Card</span>
  <span slot="description">Thumbnail is placed beside the content.</span>
  <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
</sgds-thumbnail-card>

<!-- Stretched link -->
<sgds-thumbnail-card stretchedLink>
  <img slot="thumbnail" alt="Logo" width="64" height="64" src="logo.svg" />
  <span slot="title">Clickable Card</span>
  <sgds-link slot="footer"><a href="/destination">Go somewhere</a></sgds-link>
</sgds-thumbnail-card>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Thumbnail above or beside content |
| `stretchedLink` | boolean | `false` | Makes entire card a link; href sourced from `footer` slot anchor |
| `noPadding` | boolean | `false` | Removes internal card padding |
| `disabled` | boolean | `false` | Applies disabled styling |
| `hideBorder` | boolean | `false` | Removes the card border |
| `tinted` | boolean | `false` | Applies a tinted background |

## Slots

| Slot | Purpose |
|---|---|
| `thumbnail` | Small image (typically 64×64 px) |
| `upper` | Above subtitle (e.g. a badge) |
| `subtitle` | Subtitle text |
| `title` | Card title |
| *(default)* | Content below title (e.g. `<sgds-icon-list>`) |
| `description` | Descriptive paragraph text |
| `lower` | Below description; use for tags/badges |
| `footer` | Footer area — place `<sgds-link>` here for the card CTA |
| `link` | **Deprecated since 3.3.2** — use `footer` instead |

## Events

None.

---

**For AI agents**:
1. Use the `thumbnail` slot (not `image`) — this is the unique slot name for this component.
2. Always set explicit `width` and `height` on the thumbnail image (typically 64×64 px) to prevent layout shift.
3. Place the CTA in the `footer` slot using `<sgds-link>` — the `link` slot is deprecated since 3.3.2.
4. For `stretchedLink`, the href comes from the `<a>` inside the `footer` slot.
5. `<sgds-icon-list>` in the default slot (between title and description) is the standard pattern for metadata.
6. There are no custom events or public methods on this component.
