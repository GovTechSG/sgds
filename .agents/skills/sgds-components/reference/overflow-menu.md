# SGDS Overflow Menu Component Skill

`<sgds-overflow-menu>` is a pre-built three-dot (`⋯`) icon button that toggles a dropdown menu. It uses `<sgds-dropdown-item>` as its list items and is commonly used in table rows, cards, and list items for contextual actions.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
