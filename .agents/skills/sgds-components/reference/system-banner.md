# SGDS System Banner Component Skill

`<sgds-system-banner>` displays one or more `<sgds-system-banner-item>` messages that cycle automatically every 5 seconds. Use it for site-wide announcements, planned maintenance notices, or system status updates. It sits above `<sgds-masthead>` and `<sgds-mainnav>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Show the banner?** → Add `show` to `<sgds-system-banner>`

**User can dismiss it?** → Add `dismissible`

**Full-width container?** → Add `fluid`

**Allow action text/button to not be clamped?** → Add `noClampAction`

**Single announcement vs multiple?** → Use one or more `<sgds-system-banner-item>` elements; pagination appears automatically with multiple items

```html
<!-- Single announcement -->
<sgds-system-banner show>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
    Scheduled maintenance on 12 December 2024, 10pm–12am SGT.
    <sgds-link size="sm" variant="light" slot="action">
      <a href="/maintenance">Read more <sgds-icon name="arrow-right"></sgds-icon></a>
    </sgds-link>
  </sgds-system-banner-item>
</sgds-system-banner>

<!-- Multiple items, dismissible -->
<sgds-system-banner show dismissible>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
    First announcement with details about a system update.
    <sgds-link size="sm" variant="light" slot="action">
      <a href="#">Action link <sgds-icon name="arrow-right"></sgds-icon></a>
    </sgds-link>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="exclamation-triangle-fill" size="md"></sgds-icon>
    Second announcement about a service change.
    <sgds-button href="#" slot="action" size="sm" tone="fixed-light" variant="outline">
      Learn more <sgds-icon name="arrow-right" slot="rightIcon" size="md"></sgds-icon>
    </sgds-button>
  </sgds-system-banner-item>
</sgds-system-banner>
```

## API Summary

### `<sgds-system-banner>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `show` | boolean | `false` | Controls banner visibility |
| `dismissible` | boolean | `false` | Shows a close button to dismiss the entire banner |
| `fluid` | boolean | `false` | Uses a full-width (fluid) container |
| `noClampAction` | boolean | `false` | Prevents the action slot text/button from being line-clamped |

### `<sgds-system-banner-item>`

No attributes.

## Slots

### `<sgds-system-banner>`

| Slot | Purpose |
|---|---|
| *(default)* | `<sgds-system-banner-item>` elements |

### `<sgds-system-banner-item>`

| Slot | Purpose |
|---|---|
| `icon` | Icon for the announcement (use `<sgds-icon size="md">`) |
| *(default)* | Announcement message text |
| `action` | Action link or button (`<sgds-link variant="light">` or `<sgds-button tone="fixed-light">`) |

## Events (`<sgds-system-banner>`)

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | No | Banner begins showing |
| `sgds-hide` | No | Banner begins hiding (dismissed) |

---

**For AI agents**:
1. `show` must be set on `<sgds-system-banner>` to make it visible — it defaults to hidden.
2. Pagination dots appear automatically when there are multiple `<sgds-system-banner-item>` elements.
3. Items cycle every 5 seconds automatically when multiple items are present.
4. Place the banner above `<sgds-masthead>` and `<sgds-mainnav>` in the page structure.
5. Use `<sgds-link variant="light">` or `<sgds-button tone="fixed-light" variant="outline">` in the `action` slot to match the dark banner background.
6. There are no public methods on this component.
