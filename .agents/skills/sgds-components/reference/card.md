# SGDS Card Component Skill

`<sgds-card>` is a general-purpose content card supporting images, icons, titles, descriptions, and a footer link area. For image-forward cards with overlays use `<sgds-image-card>`; for icon-led cards use `<sgds-icon-card>`; for thumbnail cards use `<sgds-thumbnail-card>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When presenting a discrete unit of content (article, service, resource) with a title, description, and a call-to-action link.
- When content can be grouped into a grid or list of equal-weight items that users browse or scan.
- When you need a flexible card that supports either an image or an icon in vertical or horizontal orientation.
- When the entire card surface should be clickable as a single navigation target — use `stretchedLink`.

### When NOT to use

- When the primary visual is a large hero image with overlaid content — use `<sgds-image-card>` instead.
- When the card is icon-led with a vertically centred layout — use `<sgds-icon-card>` instead.
- When a small thumbnail image beside text is needed — use `<sgds-thumbnail-card>` instead.
- For interactive actions beyond a single link (e.g. multiple buttons per card) — consider a custom layout.
- As a layout container for unrelated content — cards represent a single cohesive content item.

## Behaviour

- Renders a content card with an optional image or icon area, subtitle, title, description, and footer.
- `orientation` controls whether the image/icon is stacked above (`vertical`, default) or placed beside (`horizontal`) the content.
- `stretchedLink` makes the entire card clickable; the link `href` is sourced from the `<a>` inside the `footer` slot.
- `disabled` applies disabled styling and suppresses interaction.
- `tinted` applies a tinted background to the card.
- `hideBorder` removes the card border.
- `imagePosition` controls whether the image appears `before` (default) or `after` the content in horizontal orientation.
- `imageAdjustment` controls image sizing: `default`, `padding around`, or `aspect ratio`.
- No custom events or public methods.

## Component Composition

**`image` slot** — a single `<img>` with descriptive `alt` text; set explicit `width` and `height` to prevent layout shift. Mutually exclusive with `icon` — use one per card.

**`icon` slot** — a single `<sgds-icon size="3-xl">` when no image is available. Mutually exclusive with `image`.

**`subtitle` slot** — short category or type label, typically in uppercase (e.g. `<span slot="subtitle">GUIDES</span>`).

**`title` slot** — concise card heading (1–6 words). Use plain text or `<span>` — avoid heading tags; heading hierarchy is the consuming page's responsibility.

**`description` slot** — 1–3 sentences of supporting text. Avoid bullet lists or nested rich content.

**Default slot** — additional content below the title; `<sgds-icon-list>` is the standard pattern for file type, date, or location metadata.

**`lower` slot** — `<sgds-badge>` elements for category or status tags below the description.

**`footer` slot** — the card CTA; use `<sgds-link><a href="...">Label <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>`. The `link` slot is deprecated since v3.3.2 — always use `footer`.

**`menu` slot** — `<sgds-overflow-menu>` for contextual actions on the card (top-right corner).

**Avoid placing inside a card:**
- Interactive form inputs — cards are display/navigation units, not form containers
- Multiple CTA buttons — cards should have a single navigation target

## Advanced Considerations

- **Card type selection**: `<sgds-card>` is the general-purpose option — always evaluate `<sgds-image-card>`, `<sgds-icon-card>`, and `<sgds-thumbnail-card>` first to see if a specialised variant better fits the design intent.
- **`stretchedLink` and `footer` slot**: the `href` for the stretched link is read from the `<a>` inside the `footer` slot — always include an `<a>` there when using `stretchedLink`.
- **`image` vs `icon` slots**: these are mutually exclusive in layout — using both may produce unexpected results; choose one per card.
- **`imageAdjustment` string values**: `"padding around"` and `"aspect ratio"` include spaces — pass the exact string including the space.
- **`link` slot deprecation**: the `link` slot was deprecated in v3.3.2 — always use the `footer` slot with `<sgds-link>` for card CTAs.
- **`upper` slot**: overrides the entire image/icon area — use only when full custom control of the upper section is required.

## Edge Cases

- **No `footer` slot with `stretchedLink`**: the card renders as clickable but has no link destination — always include a `<sgds-link><a href="...">` in the `footer` slot when using `stretchedLink`.
- **Both `image` and `icon` slots provided**: behaviour is undefined — use only one per card.
- **No content slots**: renders an empty card container — always provide at minimum a `title` slot.
- **`disabled` with `stretchedLink`**: the card appears disabled but the stretched link may still be interactive in some browsers — test interaction state when combining both.
- **`imageAdjustment` with no image**: the attribute has no effect when no `image` slot content is provided.

## Quick Decision Guide

**Which card type?**
- General content with image or icon → `<sgds-card>` (this component)
- Image-forward with badge/action overlays → `<sgds-image-card>`
- Icon-led vertically centered layout → `<sgds-icon-card>`
- Small thumbnail image beside content → `<sgds-thumbnail-card>`

**Orientation?**
- Image/icon stacked above content → `vertical` (default)
- Image/icon beside content → `horizontal`

**Entire card clickable?**
- Add `stretchedLink` — the href is sourced automatically from the `<a>` inside the `footer` slot

**Image adjustment?**
- Default image sizing → `imageAdjustment="default"` (default)
- Padding around image → `imageAdjustment="padding around"`
- Fixed aspect ratio → `imageAdjustment="aspect ratio"`

```html
<!-- Basic image card -->
<sgds-card>
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="subtitle">SUBTITLE</span>
  <span slot="title">Card Title</span>
  <span slot="description">Some descriptive text about this card.</span>
  <sgds-link slot="footer">
    <a href="/page">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-card>

<!-- Icon card variant (icon instead of image) -->
<sgds-card>
  <sgds-icon slot="icon" name="placeholder" size="3-xl"></sgds-icon>
  <span slot="subtitle">SUBTITLE</span>
  <span slot="title">Icon Card</span>
  <span slot="description">Card with an icon instead of an image.</span>
  <sgds-link slot="footer">
    <a href="/page">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-card>

<!-- Horizontal orientation -->
<sgds-card orientation="horizontal">
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="title">Horizontal Card</span>
  <span slot="description">Image is placed beside the content.</span>
  <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
</sgds-card>

<!-- Stretched link — entire card is clickable -->
<sgds-card stretchedLink>
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="title">Clickable Card</span>
  <span slot="description">Clicking anywhere on the card navigates to the footer link.</span>
  <sgds-link slot="footer"><a href="/destination">Go somewhere</a></sgds-link>
</sgds-card>

<!-- Disabled state -->
<sgds-card disabled>
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="title">Disabled Card</span>
  <span slot="description">This card is not interactive.</span>
</sgds-card>

<!-- Tinted background -->
<sgds-card tinted>
  <span slot="title">Tinted Card</span>
  <span slot="description">Card with a tinted background.</span>
</sgds-card>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Image/icon above or beside content |
| `stretchedLink` | boolean | `false` | Makes entire card a link; href sourced from `footer` slot anchor |
| `disabled` | boolean | `false` | Applies disabled styling |
| `hideBorder` | boolean | `false` | Removes the card border |
| `tinted` | boolean | `false` | Applies a tinted background |
| `imagePosition` | `before \| after` | `before` | Image position relative to content |
| `imageAdjustment` | `default \| padding around \| aspect ratio` | `default` | How the image fills its container |

## Slots

| Slot | Purpose |
|---|---|
| `image` | Image or SVG element (single element only) |
| `icon` | Icon element (single element only; used when no image) |
| `upper` | Above subtitle; overrides the image/icon area |
| `menu` | Overflow/contextual menu (top-right corner) |
| `subtitle` | Subtitle text |
| `title` | Card title |
| *(default)* | Additional content below the title (e.g. `<sgds-icon-list>`) |
| `description` | Descriptive paragraph text |
| `lower` | Below description; use for tags/badges |
| `footer` | Footer area — place `<sgds-link>` here for the card CTA |
| `link` | **Deprecated since 3.3.2** — use `footer` instead |

## Events

None.

---

**For AI agents**:
1. Always place the card CTA in the `footer` slot using `<sgds-link>` — the `link` slot is deprecated since 3.3.2.
2. For `stretchedLink`, the href is sourced from the `<a>` tag inside the `footer` slot — no `href` on the card itself.
3. Use `image` slot for images, `icon` slot for icons — they are mutually exclusive in layout; using both may produce unexpected results.
4. `imageAdjustment="aspect ratio"` and `imageAdjustment="padding around"` are string values with spaces — pass them exactly.
5. For specific card types (image-focused, icon-focused, thumbnail), prefer `<sgds-image-card>`, `<sgds-icon-card>`, or `<sgds-thumbnail-card>` respectively.
6. There are no custom events or public methods on this component.
