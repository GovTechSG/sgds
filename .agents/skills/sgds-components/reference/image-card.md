# SGDS Image Card Component Skill

`<sgds-image-card>` is a card variant where a full-width photograph or illustration is the primary visual. It uniquely supports `image-badge` and `image-action` overlay slots on top of the image.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When a full-width photograph or illustration is the primary visual and leads the card hierarchy (e.g. event listings, news articles, programme cards).
- When image overlays are needed — `image-badge` for status/category labels on the image, and `image-action` for quick actions (e.g. save, like) overlaid on the image.
- For content grids where visual imagery is the key differentiator between items.
- When the entire card should be a single clickable navigation target — use `stretchedLink`.

### When NOT to use

- When the card is icon-led rather than image-led — use `<sgds-icon-card>` instead.
- When a small thumbnail beside text is the intended layout — use `<sgds-thumbnail-card>` instead.
- For general mixed-content cards without a prominent photograph — use `<sgds-card>` instead.
- When no image is available — `<sgds-image-card>` renders an empty image area; use a different card variant.

## Behaviour

- Renders a card with a full-width image as the primary visual, followed by subtitle, title, content, description, and footer.
- `image-badge` renders a badge overlay at the top-left of the image; `image-action` renders a button overlay at the top-right.
- `orientation` controls layout: `vertical` (image above content, default) or `horizontal` (image beside content).
- `imagePosition` controls whether the image appears `before` (default) or `after` the body content.
- `imageAdjustment` controls image sizing: `default`, `padding around`, or `aspect ratio`.
- `stretchedLink` makes the entire card clickable; the link `href` is sourced from the `<a>` inside the `footer` slot.
- `noPadding`, `disabled`, `hideBorder`, and `tinted` control padding, interactivity, border, and background.
- No custom events or public methods.

## Component Composition

**`image` slot** — required; pass a single `<img>` with descriptive `alt` text and explicit `width`/`height`. This is the primary visual — always provide one.

**`image-badge` slot** — `<sgds-badge>` overlaid at the top-left of the image for status or category labels (e.g. "LIVE", "SOLD OUT"). Only use when the `image` slot is populated.

**`image-action` slot** — `<sgds-icon-button>` overlaid at the top-right of the image for quick actions (e.g. save, bookmark). Only use when the `image` slot is populated.

**`subtitle` slot** — short category or type label in uppercase.

**`title` slot** — concise card heading (1–6 words). Use plain text or `<span>`.

**Default slot** — metadata between the title and description; `<sgds-icon-list>` is the standard pattern.

**`description` slot** — 1–3 sentences of supporting text.

**`lower` slot** — `<sgds-badge>` elements for tags below the description.

**`footer` slot** — the card CTA; use `<sgds-link><a href="...">Label</a></sgds-link>`. The `link` slot is deprecated since v3.3.2.

**Avoid placing inside an image card:**
- Multiple images in the `image` slot — only a single element is supported
- Overlay slots (`image-badge`, `image-action`) without a populated `image` slot

## Advanced Considerations

- **`image-badge` and `image-action` are unique to `<sgds-image-card>`**: these overlay slots are not available on `<sgds-card>`, `<sgds-icon-card>`, or `<sgds-thumbnail-card>` — this component is the correct choice whenever image overlays are required.
- **`image` slot accepts only a single element**: never pass multiple images or wrap in a container; pass one `<img>` directly.
- **`imageAdjustment` string values**: `"padding around"` and `"aspect ratio"` contain spaces — pass the exact string including the space.
- **`stretchedLink` and `footer` slot**: the href is read from the `<a>` inside the `footer` slot — always include `<sgds-link><a href="...">` when using `stretchedLink`.
- **`link` slot deprecation**: the `link` slot was deprecated in v3.3.2 — always use the `footer` slot with `<sgds-link>` for card CTAs.

## Edge Cases

- **No `image` slot content**: the image area renders empty — always provide an `<img>` in the `image` slot.
- **No `footer` slot with `stretchedLink`**: the card is clickable but has no destination — always include `<sgds-link><a href="...">` in the `footer` slot when using `stretchedLink`.
- **`image-badge` without `image`**: the badge overlay renders but has no image to overlay onto — only use overlay slots when the `image` slot is populated.
- **Multiple elements in `image` slot**: only a single element is supported — passing multiple elements may produce unexpected layout.
- **`disabled` with `stretchedLink`**: the card appears disabled but the stretched link may still be interactive — test the interaction state when combining both.

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
