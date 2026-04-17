# SGDS System Banner Component Skill

`<sgds-system-banner>` displays one or more `<sgds-system-banner-item>` messages that cycle automatically every 5 seconds. Use it for site-wide announcements, planned maintenance notices, or system status updates. It sits above `<sgds-masthead>` and `<sgds-mainnav>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For planned maintenance notices, service outage alerts, or critical system status updates that affect all users.
- When a persistent, page-level message must appear before the main navigation.
- For rotating announcements where multiple notices need equal visibility.

### When NOT to use

- For page- or section-specific feedback — use `<sgds-alert>` instead.
- For transient action confirmations — use `<sgds-toast>` instead.
- For promotional or marketing content that is not operationally critical.
- When the message applies only to a specific user action or form — inline alerts are more appropriate.

## Behaviour

- Hidden by default — add `show` to make it visible.
- With a single `<sgds-system-banner-item>`, displays that item statically.
- With multiple items, cycles through them automatically every 5 seconds; pagination dots appear automatically.
- `dismissible` shows a close (×) button that hides the entire banner on click; fires `sgds-hide`.
- `fluid` uses a full-width container instead of the default constrained container.
- `noClampAction` prevents the `action` slot content from being line-clamped where long action text would otherwise be truncated.
- Fires `sgds-show` when the banner begins showing and `sgds-hide` when dismissed.
- No public methods — visibility is controlled via the `show` attribute only.

## Advanced Considerations

- **Positioning**: the banner must be the first element in the page body, above `<sgds-masthead>` and `<sgds-mainnav>` — placing it elsewhere breaks the intended layout hierarchy.
- **Persistence across navigation**: the banner re-renders on each page load unless dismissed state is persisted (e.g. via `sessionStorage`); listen to `sgds-hide` and restore `show` accordingly.
- **`noClampAction`**: by default, long `action` slot content is line-clamped to prevent the banner from expanding vertically; set `noClampAction` only when the action text must be fully visible.
- **No public methods**: there is no `.show()` or `.hide()` method — toggle the `show` attribute directly from JavaScript.
- **Multiple items**: pagination dots are rendered automatically; no configuration is needed. Auto-cycling is always 5 seconds and is not configurable.

## Edge Cases

- **`show` omitted**: the banner is invisible — always set `show` explicitly to render it.
- **Single item with `dismissible`**: after the user dismisses, the banner hides entirely — ensure `sgds-hide` is handled if persistence is needed.
- **Multiple items, one item dismissed**: dismissal hides the entire banner, not just the current item.
- **Long message text**: may expand the banner height — keep messages concise to maintain a single-line layout.
- **`action` slot with long text, no `noClampAction`**: text is line-clamped and may be truncated — add `noClampAction` if the full action label is necessary.
- **No `icon` in slot**: the banner renders without an icon prefix — always provide one for visual clarity and accessibility.

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
    <sgds-link size="sm" tone="fixed-light" slot="action">
    </sgds-link>
  </sgds-system-banner-item>
</sgds-system-banner>

<!-- Multiple items, dismissible -->
<sgds-system-banner show dismissible>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
    First announcement with details about a system update.
    <sgds-link size="sm" tone="fixed-light" slot="action">
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
| `action` | Action link or button (`<sgds-link tone="fixed-light">` or `<sgds-button tone="fixed-light">`) |

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
5. Use `<sgds-link tone="fixed-light">` or `<sgds-button tone="fixed-light" variant="outline">` in the `action` slot to match the dark banner background.
6. There are no public methods on this component.
