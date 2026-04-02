# SGDS Image Card Component Skill

`<sgds-image-card>` is a card variant where a full-width photograph or illustration is the primary visual. It uniquely supports `image-badge` and `image-action` overlay slots on top of the image.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Which card type?**
- Full-width photograph leads the card with optional overlays → `<sgds-image-card>` (this component)
- Icon-led card → `<sgds-icon-card>`
- Small thumbnail beside content → `<sgds-thumbnail-card>`
- General mixed content → `<sgds-card>`

**Orientation?**
- Image above content → `vertical` (default)
- Image beside content → `horizontal`

**Image positioning?**
- Image before body content → `imagePosition="before"` (default)
- Image after body content → `imagePosition="after"`

**Entire card clickable?**
- Add `stretchedLink` — href sourced from the `<a>` inside the `footer` slot

```html
<!-- Full image card -->
<sgds-image-card>
  <img slot="image" alt="Event photo" src="photo.jpg" />
  <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
  <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
  <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
  <span slot="subtitle">EVENTS</span>
  <span slot="title">Innovative Solutions for You</span>
  <sgds-icon-list size="sm">
    <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
    <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
  </sgds-icon-list>
  <span slot="description">Descriptive text about this event.</span>
  <div slot="lower">
    <sgds-badge variant="neutral" outlined>Design</sgds-badge>
  </div>
  <sgds-link slot="footer">
    <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-image-card>

<!-- Horizontal orientation -->
<sgds-image-card orientation="horizontal">
  <img slot="image" alt="Photo" src="photo.jpg" />
  <span slot="title">Horizontal Image Card</span>
  <span slot="description">Image is placed beside the content.</span>
  <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
</sgds-image-card>

<!-- Stretched link -->
<sgds-image-card stretchedLink>
  <img slot="image" alt="Photo" src="photo.jpg" />
  <span slot="title">Clickable Card</span>
  <sgds-link slot="footer"><a href="/destination">Go somewhere</a></sgds-link>
</sgds-image-card>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Image above or beside content |
| `imagePosition` | `before \| after` | `before` | Image position relative to body content |
| `imageAdjustment` | `default \| padding around \| aspect ratio` | `default` | How the image fills its container |
| `stretchedLink` | boolean | `false` | Makes entire card a link; href sourced from `footer` slot anchor |
| `noPadding` | boolean | `false` | Removes internal card padding |
| `disabled` | boolean | `false` | Applies disabled styling |
| `hideBorder` | boolean | `false` | Removes the card border |
| `tinted` | boolean | `false` | Applies a tinted background |

## Slots

| Slot | Purpose |
|---|---|
| `image` | Image or SVG (single element only) — renders as full-width card image |
| `image-badge` | Badge overlaid at the top-left of the image |
| `image-action` | Button overlaid at the top-right of the image (e.g. `<sgds-icon-button>`) |
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
1. `image-badge` and `image-action` are unique to `<sgds-image-card>` — they overlay the image area.
2. Always place the CTA in the `footer` slot using `<sgds-link>` — the `link` slot is deprecated since 3.3.2.
3. For `stretchedLink`, the href comes from the `<a>` inside the `footer` slot.
4. `imageAdjustment` values `"padding around"` and `"aspect ratio"` contain spaces — pass them exactly.
5. The `image` slot accepts only a single element — never pass multiple images.
6. There are no custom events or public methods on this component.
