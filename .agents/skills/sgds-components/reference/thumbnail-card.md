# SGDS Thumbnail Card Component Skill

`<sgds-thumbnail-card>` is a card variant with a small thumbnail image (typically 64×64 px) rather than a full-width photo. Use it for compact list-like layouts, search results, or items where a logo or icon-sized image accompanies the content.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When a small logo or thumbnail image (typically 64×64 px) accompanies content — such as organisation listings, search results, or directory items.
- For compact list-like card layouts where a full-width image would be too visually dominant.
- When items are identified by a small branded logo or icon-sized image rather than a photograph.
- When the entire card should be a single clickable navigation target — use `stretchedLink`.

### When NOT to use

- When the primary visual is a full-width photograph — use `<sgds-image-card>` instead.
- When a large icon (not an image) leads the card — use `<sgds-icon-card>` instead.
- For general mixed-content cards without a thumbnail — use `<sgds-card>` instead.
- When no thumbnail image is available — the `thumbnail` slot renders empty; use a different card variant.

## Behaviour

- Renders a card with a small thumbnail image, followed by subtitle, title, content, description, and footer.
- `orientation` controls layout: `vertical` (thumbnail above content, default) or `horizontal` (thumbnail beside content).
- `stretchedLink` makes the entire card clickable; the link `href` is sourced from the `<a>` inside the `footer` slot.
- `noPadding` removes internal card padding.
- `disabled` applies disabled styling; `hideBorder` removes the card border; `tinted` applies a tinted background.
- No custom events or public methods.

## Component Composition

**`thumbnail` slot** — required; pass a single `<img>` at 64×64 px with explicit `width="64" height="64"` and descriptive `alt` text. Always set dimensions to prevent layout shift.

**`subtitle` slot** — short category or type label in uppercase (e.g. `<span slot="subtitle">RESOURCES</span>`).

**`title` slot** — concise card heading (1–6 words). Use plain text or `<span>`.

**Default slot** — metadata between the title and description; `<sgds-icon-list>` is the standard pattern for date, location, or type metadata.

**`description` slot** — 1–2 sentences of supporting text. Keep concise given the compact layout.

**`lower` slot** — `<sgds-badge>` elements for tags below the description.

**`footer` slot** — the card CTA; use `<sgds-link><a href="...">Label</a></sgds-link>`. The `link` slot is deprecated since v3.3.2.

**Avoid placing inside a thumbnail card:**
- Full-width or large photographs — use `<sgds-image-card>` instead
- Multiple CTAs — cards should have a single navigation target

## Advanced Considerations

- **`thumbnail` slot, not `image`**: this component uses `thumbnail` as the slot name — do not use `image` (that is the `<sgds-image-card>` slot name).
- **Explicit image dimensions**: always set `width` and `height` on the thumbnail `<img>` (typically `64` × `64`) to prevent layout shift before the image loads.
- **`stretchedLink` and `footer` slot**: the href is read from the `<a>` inside the `footer` slot — always include `<sgds-link><a href="...">` when using `stretchedLink`.
- **`<sgds-icon-list>` in default slot**: the standard pattern for rendering metadata (dates, locations) between the title and description.
- **`link` slot deprecation**: the `link` slot was deprecated in v3.3.2 — always use the `footer` slot with `<sgds-link>` for card CTAs.

## Edge Cases

- **No `thumbnail` slot content**: the thumbnail area renders empty — always provide an `<img>` in the `thumbnail` slot.
- **No `footer` slot with `stretchedLink`**: the card is clickable but has no destination — always include `<sgds-link><a href="...">` in the `footer` slot when using `stretchedLink`.
- **Missing `width`/`height` on thumbnail image**: causes layout shift while the image loads — always specify dimensions.
- **`disabled` with `stretchedLink`**: the card appears disabled but the stretched link may still be interactive — test the interaction state when combining both.
- **No content slots**: renders an empty card frame — always provide at minimum a `title` slot.

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
