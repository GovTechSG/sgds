# SGDS Icon Card Component Skill

`<sgds-icon-card>` is a card variant where a large icon is the primary visual element. Use it for feature showcases, service listings, or any content where an icon leads the hierarchy.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When a large icon is the primary visual and leads the content hierarchy (e.g. service categories, feature highlights, topic listings).
- For grids of equal-weight service or feature cards where each item is identified by an icon rather than a photograph.
- When metadata (dates, locations, tags) alongside an icon needs to be presented in a consistent card layout.
- When the entire card should be a single clickable navigation target — use `stretchedLink`.

### When NOT to use

- When the primary visual is a photograph or image — use `<sgds-image-card>` instead.
- When a small thumbnail beside text is the intended layout — use `<sgds-thumbnail-card>` instead.
- For general mixed-content cards without a prominent icon — use `<sgds-card>` instead.
- When there is no meaningful icon to lead the card — the icon slot is integral to this component's hierarchy.

## Behaviour

- Renders a card with a large icon as the primary visual, followed by subtitle, title, content, description, and footer.
- `orientation` controls layout: `vertical` (icon above content, default) or `horizontal` (icon beside content).
- `stretchedLink` makes the entire card clickable; the link `href` is sourced from the `<a>` inside the `footer` slot.
- `noPadding` removes internal card padding.
- `disabled` applies disabled styling.
- `tinted` applies a tinted background; `hideBorder` removes the card border.
- No custom events or public methods.

## Component Composition

**`icon` slot** — required; use `<sgds-icon size="3-xl">` for the standard icon card hierarchy. This is the primary visual anchor — always provide one.

**`upper` slot** — `<sgds-badge>` for a status or category label above the subtitle (e.g. "NEW", "FEATURED").

**`subtitle` slot** — short category or type label in uppercase.

**`title` slot** — concise card heading (1–6 words). Use plain text or `<span>`.

**Default slot** — metadata between the title and description; `<sgds-icon-list>` is the standard pattern for date, location, or type metadata.

**`description` slot** — 1–3 sentences of supporting text.

**`lower` slot** — `<sgds-badge>` elements for category or status tags below the description.

**`footer` slot** — the card CTA; use `<sgds-link><a href="...">Label</a></sgds-link>`. The `link` slot is deprecated since v3.3.2.

**Avoid placing inside an icon card:**
- Photographs or images in the `icon` slot — use `<sgds-image-card>` instead
- Multiple CTAs — cards should have a single navigation target

## Advanced Considerations

- **Icon sizing**: always use `size="3-xl"` on `<sgds-icon>` in the `icon` slot for the standard icon card appearance — other sizes may visually break the card hierarchy.
- **`stretchedLink` and `footer` slot**: the href is read from the `<a>` inside the `footer` slot — always include `<sgds-link><a href="...">` when using `stretchedLink`.
- **`<sgds-icon-list>` in default slot**: the standard pattern for rendering metadata (dates, venues) between the title and description — place it in the default slot (not `description`).
- **`lower` slot for tags**: use the `lower` slot for badge/tag rows below the description; do not place them in the `description` slot.
- **`link` slot deprecation**: the `link` slot was deprecated in v3.3.2 — always use the `footer` slot with `<sgds-link>` for card CTAs.

## Edge Cases

- **No `icon` slot content**: renders a card with no primary visual — always provide an `<sgds-icon>` in the `icon` slot.
- **No `footer` slot with `stretchedLink`**: the card is clickable but has no destination — always include a `<sgds-link><a href="...">` in the `footer` slot when using `stretchedLink`.
- **`disabled` with `stretchedLink`**: the card appears disabled but the stretched link may still be interactive — test the interaction state when combining both.
- **`noPadding` with rich content**: removing padding may cause content to visually collide with card edges — verify layout at target viewport sizes.
- **No content slots**: renders an empty card frame — always provide at minimum a `title` slot.

## Quick Decision Guide

**Which card type?**
- Large prominent icon leads the card → `<sgds-icon-card>` (this component)
- Photograph or image leads the card → `<sgds-image-card>`
- Small thumbnail beside content → `<sgds-thumbnail-card>`
- General mixed content → `<sgds-card>`

**Orientation?**
- Icon above content → `vertical` (default)
- Icon beside content → `horizontal`

**Entire card clickable?**
- Add `stretchedLink` — href is sourced from the `<a>` inside the `footer` slot

```html
<!-- Basic icon card -->
<sgds-icon-card>
  <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
  <sgds-badge variant="primary" slot="upper">New</sgds-badge>
  <span slot="subtitle">EXPLORE THE FEATURES</span>
  <span slot="title">Innovative Solutions for You</span>
  <sgds-icon-list size="sm">
    <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
    <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
  </sgds-icon-list>
  <span slot="description">Descriptive text about this feature.</span>
  <div slot="lower" style="display: flex; flex-wrap: wrap; gap: 8px;">
    <sgds-badge variant="neutral" outlined>Design</sgds-badge>
    <sgds-badge variant="neutral" outlined>Research</sgds-badge>
  </div>
  <sgds-link slot="footer">
    <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-icon-card>

<!-- Horizontal orientation -->
<sgds-icon-card orientation="horizontal">
  <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
  <span slot="title">Horizontal Icon Card</span>
  <span slot="description">Icon is placed beside the content.</span>
  <sgds-link slot="footer"><a href="#">Learn more</a></sgds-link>
</sgds-icon-card>

<!-- Stretched link -->
<sgds-icon-card stretchedLink>
  <sgds-icon slot="icon" name="star" size="3-xl"></sgds-icon>
  <span slot="title">Clickable Card</span>
  <sgds-link slot="footer"><a href="/destination">Go somewhere</a></sgds-link>
</sgds-icon-card>

<!-- No padding -->
<sgds-icon-card noPadding>
  <sgds-icon slot="icon" name="placeholder" size="3-xl"></sgds-icon>
  <span slot="title">No Padding Card</span>
</sgds-icon-card>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Icon above or beside content |
| `stretchedLink` | boolean | `false` | Makes entire card a link; href sourced from `footer` slot anchor |
| `noPadding` | boolean | `false` | Removes internal card padding |
| `disabled` | boolean | `false` | Applies disabled styling |
| `hideBorder` | boolean | `false` | Removes the card border |
| `tinted` | boolean | `false` | Applies a tinted background |

## Slots

| Slot | Purpose |
|---|---|
| `icon` | Icon element — use `<sgds-icon size="3-xl">` for the primary icon |
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
1. Always use `size="3-xl"` on the `<sgds-icon>` in the `icon` slot for the standard icon card appearance.
2. Place the CTA in the `footer` slot using `<sgds-link>` — the `link` slot is deprecated since 3.3.2.
3. For `stretchedLink`, the href is sourced from the `<a>` tag inside the `footer` slot.
4. `lower` slot is the correct place for tag badges below the description.
5. `<sgds-icon-list>` in the default slot (between title and description) is the standard pattern for metadata like dates and locations.
6. There are no custom events or public methods on this component.
