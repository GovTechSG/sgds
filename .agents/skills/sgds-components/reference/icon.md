# SGDS Icon Component Skill

`<sgds-icon>` renders SVG icons from the SGDS built-in registry. Use it instead of `<img>` tags or external icon libraries when building with SGDS components.

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
2. **Only use names from the list above.** Common mistakes: `people-fill` does not exist — use `users`; `funnel` does not exist — use `bi-funnel`; `inbox` does not exist — use `in-box`; `file-earmark-text-fill` does not exist — use `file-earmark-text`; `bar-chart-fill` does not exist — there is no fill variant, use `speedometer` or `trend-up` for chart-related icons; `plus-lg` does not exist — use `plus`; `person-badge-fill` does not exist — use `person` or `user-circle`.
3. Icons render from the internal SGDS SVG registry — they are not `<img>` tags and do not accept `src`.
4. Default size is `lg` — if a user needs a smaller inline icon, explicitly set `size="sm"` or `size="md"`.
5. Inside `<sgds-link>`, `<sgds-badge>`, and similar components, icon size is managed automatically; do not override it with `size`.
6. There are no slots, events, or public methods on this component.
