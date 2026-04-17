# SGDS Overflow Menu Component Skill

`<sgds-overflow-menu>` is a pre-built three-dot (`⋯`) icon button that toggles a dropdown menu. It uses `<sgds-dropdown-item>` as its list items and is commonly used in table rows, cards, and list items for contextual actions.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For table rows, cards, or list items where multiple contextual actions (view, edit, delete) need to be grouped under a compact three-dot icon button.
- When space is too limited for visible action buttons and the actions are secondary or contextual.
- As a standard overflow pattern for per-row actions in data-heavy interfaces.

### When NOT to use

- When a visible button label is needed — use `<sgds-dropdown>` with a custom `toggler` slot instead.
- When a custom toggler icon or trigger is required — use `<sgds-dropdown>`.
- For primary actions — overflow menus hide actions; primary actions should always be visible.
- When there is only one action — show it as a direct button instead of hiding it in a menu.

## Behaviour

- Renders a pre-built three-dot (`⋯`) icon button; clicking it toggles the dropdown menu.
- `size` controls the icon button size: `md` (default) or `sm`.
- List items must be `<sgds-dropdown-item>` elements in the default slot.
- `disabled` on `<sgds-dropdown-item>` prevents selection; `sgds-select` does not fire for disabled items.
- Fires `sgds-select` with `event.detail.item` as the clicked `<sgds-dropdown-item>`.
- No public methods — the menu is toggled entirely via the built-in icon button.

## Advanced Considerations

- **vs `<sgds-dropdown>`**: `<sgds-overflow-menu>` is a convenience wrapper with a fixed three-dot toggler. Use `<sgds-dropdown>` when a custom toggler, labeled button, or different icon is needed.
- **Navigation vs action items**: for navigation, slot an `<a>` inside `<sgds-dropdown-item>`; for actions (no URL), slot plain text directly.
- **`sgds-select` event**: fires on the `<sgds-overflow-menu>` element — use `event.detail.item` to identify the selected item and `.textContent.trim()` to read its label.
- **Size in compact layouts**: use `size="sm"` inside table rows and tight card layouts to match the surrounding density.

## Edge Cases

- **No items**: an empty menu opens but shows nothing — always include at least one `<sgds-dropdown-item>`.
- **All items disabled**: the menu opens but nothing is selectable — ensure at least one enabled item exists or remove the overflow menu entirely.
- **Single action**: a one-item overflow menu adds unnecessary interaction cost — show the action as a direct button instead.
- **Long item labels**: may overflow the menu container — keep action labels concise (1–3 words).

## Quick Decision Guide

**Custom toggler or button label needed?** → Use `<sgds-dropdown>` instead

**Three-dot icon menu with no label?** → `<sgds-overflow-menu>` (this component)

**Size?** → `size="md"` (default), `size="sm"`

```html
<!-- Basic overflow menu -->
<sgds-overflow-menu>
  <sgds-dropdown-item>View</sgds-dropdown-item>
  <sgds-dropdown-item>Edit</sgds-dropdown-item>
  <sgds-dropdown-item>Delete</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- Small size for compact layouts -->
<sgds-overflow-menu size="sm">
  <sgds-dropdown-item>View</sgds-dropdown-item>
  <sgds-dropdown-item>Edit</sgds-dropdown-item>
  <sgds-dropdown-item disabled>Archive</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- React to selection -->
<sgds-overflow-menu id="row-menu">
  <sgds-dropdown-item>View details</sgds-dropdown-item>
  <sgds-dropdown-item>Edit</sgds-dropdown-item>
  <sgds-dropdown-item>Delete</sgds-dropdown-item>
</sgds-overflow-menu>

<script>
  document.getElementById("row-menu").addEventListener("sgds-select", e => {
    const action = e.detail.item.textContent.trim();
    console.log("Action selected:", action);
  });
</script>

<!-- Common usage inside a table row -->
<tr>
  <td>Item name</td>
  <td>Active</td>
  <td>
    <sgds-overflow-menu size="sm">
      <sgds-dropdown-item>Edit</sgds-dropdown-item>
      <sgds-dropdown-item>Delete</sgds-dropdown-item>
    </sgds-overflow-menu>
  </td>
</tr>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `size` | `sm \| md` | `md` | Size of the three-dot icon button |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | `<sgds-dropdown-item>` elements for the menu list |

## Events

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | No | — | Menu begins opening |
| `sgds-after-show` | No | — | Menu fully open |
| `sgds-hide` | No | — | Menu begins closing |
| `sgds-after-hide` | No | — | Menu fully closed |
| `sgds-select` | No | `{ item: SgdsDropdownItem }` | A dropdown item is clicked |

---

**For AI agents**:
1. `<sgds-overflow-menu>` is a convenience wrapper — for a custom toggler or labeled button use `<sgds-dropdown>` instead.
2. List items must be `<sgds-dropdown-item>` elements in the default slot.
3. `sgds-select` fires when any item is clicked — `event.detail.item` is the clicked `<sgds-dropdown-item>`.
4. For navigation items, slot `<a>` tags inside `<sgds-dropdown-item>`; for action items, slot plain text directly.
5. There are no public methods — the menu is toggled entirely via the built-in icon button.
