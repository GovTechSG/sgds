# SGDS Icon Component Skill

`<sgds-icon>` renders SVG icons from the SGDS built-in registry. Use it instead of `<img>` tags or external icon libraries when building with SGDS components.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- To add an icon from the SGDS registry alongside text, inside buttons, links, or as standalone decorative elements.
- Inside `<sgds-button>`, `<sgds-link>`, `<sgds-icon-list>`, and other SGDS components that have dedicated icon slots.
- For feature or status icons in cards, alerts, badges, and banners.

### When NOT to use

- For icons not in the SGDS registry — source them via a custom SVG or an alternative icon library instead.
- As a substitute for text labels where context is ambiguous — always pair icons with visible labels or `aria-label` when meaning is not self-evident.
- Inside `<sgds-link>` with a manually set `size` — icon sizing is managed automatically by the link component; do not override it.
- As interactive elements — `<sgds-icon>` is non-interactive; use `<sgds-icon-button>` for clickable icons.

## Behaviour

- Renders as an inline SVG from the built-in registry matching the `name` attribute.
- `size` controls the rendered dimensions: `xs`, `sm`, `md`, `lg` (default), `xl`, `2-xl`, `3-xl`.
- If `name` is not found in the registry, a console warning is logged and nothing is rendered.
- The component has no slots, events, or public methods — it is purely presentational.
- When used inside `<sgds-link>`, icon size is managed automatically by the parent — do not set `size` manually.

## Advanced Considerations

- **Registry validation**: icon names are validated at render time against the built-in registry — typos silently render nothing; always test with the exact name from the registry list.
- **Size scale**: `xs` through `3-xl` maps to fixed pixel dimensions defined by the design system — do not attempt to override size via CSS unless the design system explicitly supports it.
- **Inside `<sgds-link>`**: `<sgds-link>` sets icon size based on its own `size` attribute — adding a `size` on the icon will be overridden; omit it entirely.
- **Inside `<sgds-icon-list>`**: icon size must be set explicitly to match the list `size` (see icon-list skill) — this is the exception where manual sizing is required.

## Edge Cases

- **Unknown `name`**: logs a console warning and renders an empty element — always verify names against the registry.
- **Missing `name`**: same as unknown — the icon is silently absent in the rendered output.
- **`size` inside `<sgds-link>`**: is overridden by the parent link — omit to avoid confusion.
- **`size` inside `<sgds-icon-list>`**: must be set manually (the list does not auto-propagate size to icons) — always align to the list size mapping.
- **Icon in a flex/grid parent**: renders inline-block by default; may need `display: block` or `align-items: center` on the parent for correct vertical alignment.

## Quick Decision Guide

**Always provide `name`** — it is required. The icon renders from the internal SVG registry. If the name is not found in the registry, a console warning is logged and nothing is rendered.

**Which `size`?**
- Inline with small text → `xs` or `sm`
- Inline with body text → `md`
- Default standalone icon → `lg` (default)
- Prominent feature icon → `xl`, `2-xl`, or `3-xl`

> When used inside `<sgds-link>`, icon sizing is managed automatically — do not set `size` manually.

```html
<!-- Basic icon -->
<sgds-icon name="announcement"></sgds-icon>

<!-- Specific size -->
<sgds-icon name="arrow-right" size="sm"></sgds-icon>

<!-- Large decorative icon -->
<sgds-icon name="star" size="xl"></sgds-icon>

<!-- Icon inside a link (size managed automatically) -->
<sgds-link>
  <a href="#">
    <sgds-icon name="arrow-right"></sgds-icon>
    Next page
  </a>
</sgds-link>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | **Required.** Icon name from the SGDS icon registry |
| `size` | `xs \| sm \| md \| lg \| xl \| 2-xl \| 3-xl` | `lg` | Rendered size of the icon |

## Slots

None. Icons are rendered entirely from the internal SVG registry.

## Events

None.

---

## Available Icon Names

Only names in this list are valid. Any other value logs a warning and renders nothing.

```
announcement, archive,
arrow-bar-down, arrow-bar-left, arrow-bar-right, arrow-bar-up,
arrow-circle-down, arrow-circle-left, arrow-circle-right, arrow-circle-up,
arrow-clockwise, arrow-down, arrow-left, arrow-repeat, arrow-right,
arrow-square-down, arrow-square-left, arrow-square-right, arrow-square-up, arrow-up,
bank-fill, bell, bell-slash, bi-funnel,
bookmark, bookmark-fill, box-arrow-up-right, box-seam,
building, bus, calculator,
calendar, calendar-check, calendar-heart, calendar-x,
camera, car, chat, chat-dots, chat-left-text,
check, check-circle, check-circle-fill,
chevron-down, chevron-left, chevron-right, chevron-selector-vertical, chevron-up,
clock, cloud, cloud-check, cloud-download, cloud-upload,
code-square, coins-hand, compass, copy, cpu-chip-ai, cross,
cursor, cursor-fill,
dash, dash-circle, dash-square, database, dataflow, download, edit,
exclamation, exclamation-circle, exclamation-circle-fill,
exclamation-triangle, exclamation-triangle-fill,
eye, eye-fill, eye-slash, eye-slash-fill,
facebook, file, file-earmark-text, file-pdf, file-plus, file-text, files,
fingerprint, flash,
folder, folder-check, folder-minus, folder-plus,
gear, geo, geo-alt, geo-fill, globe, globe-alt, google, grid-fill,
hand-thumbs-down, hand-thumbs-up, hard-drive, heart,
house, house-door, image, in-box,
info-circle, info-circle-fill, instagram,
key, laptop, laptop-gear, layers,
layout, layout-text-window, layout-text-window-reverse,
life-buoy, lightbulb, link, linkedin, list,
lock, lock-fill, login, logout, luggage,
mail, mail-open, map, meetup, menu, microphone, monitor, moon, move,
paperclip, passcode, passport, pause, pencil, pending-circle,
person, person-dash, person-plus, person-x,
phone, pin, pin-map-fill, placeholder, plane, play,
plus, plus-circle, plus-square, printer,
question-circle, rocket, save, search, send, sg-crest, share,
shield-tick, sidebar-collapse, sidebar-expand,
slash-circle, slash-divider, sliders, speedometer,
star, star-fill, stoplights, sun,
switch-horizontal, switch-vertical,
tablet, telegram, telephone,
three-dots, three-dots-vertical,
ticket, toggle-off, toggle-on, train, translate, trash,
trend-down, trend-up, truck, twitter-x,
unlock, upload,
user-check, user-circle, user-pause, user-square, users,
video-recorder, volume-max, volume-x,
window, window-dash, window-desktop, window-dock, window-fullscreen,
window-plus, window-sidebar, window-split, window-stack, window-x,
xcircle, xcircle-fill, youtube, zoom-in, zoom-out
```

---

**For AI agents**:
1. `name` is required — always include it. A missing or unrecognised name logs a warning and renders nothing.
2. **Only use names from the list above.** Before using any icon name, verify it exists in the registry. If the name the user asked for is not in the list, tell them explicitly — do not silently substitute. Instead, suggest the closest available alternative from the list and explain why. Example: *"There is no `funnel` icon in the SGDS registry. The closest available option is `bi-funnel`."*
3. `size` only accepts the enum strings `xs | sm | md | lg | xl | 2-xl | 3-xl` — pixel values (e.g. `size="16"`) and CSS lengths (e.g. `size="1.5rem"`) are silently ignored.
4. Icons render from the internal SGDS SVG registry — they are not `<img>` tags and do not accept `src`.
5. Default size is `lg` — if a user needs a smaller inline icon, explicitly set `size="sm"` or `size="md"`.
6. Inside `<sgds-link>`, `<sgds-badge>`, and similar components, icon size is managed automatically; do not override it with `size`.
7. There are no slots, events, or public methods on this component.
