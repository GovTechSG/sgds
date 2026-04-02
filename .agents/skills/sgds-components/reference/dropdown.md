# SGDS Dropdown Component Skill

`<sgds-dropdown>` is a toggleable overlay menu. It requires a `toggler` slot element (typically `<sgds-button>`) and `<sgds-dropdown-item>` children for list items. For an icon-only three-dot menu, use `<sgds-overflow-menu>` instead.

## Quick Decision Guide

**Navigation items with `<a>` tags?** → Put `<a>` inside `<sgds-dropdown-item>`

**No anchor/navigation (action items)?** → Put text directly inside `<sgds-dropdown-item>`

**Menu opens upward?** → `drop="up"`

**Right-align menu with toggler?** → Add `menuAlignRight`

**Prevent menu from flipping when near viewport edge?** → Add `noFlip`

**Three-dot overflow menu?** → Use `<sgds-overflow-menu>` instead

```html
<!-- Basic navigation dropdown -->
<sgds-dropdown>
  <sgds-button slot="toggler" role="button">
    Options
    <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
  </sgds-button>
  <sgds-dropdown-item><a href="/profile">Profile</a></sgds-dropdown-item>
  <sgds-dropdown-item><a href="/settings">Settings</a></sgds-dropdown-item>
  <sgds-dropdown-item disabled>Archived</sgds-dropdown-item>
</sgds-dropdown>

<!-- Action dropdown (no navigation) -->
<sgds-dropdown>
  <sgds-button slot="toggler" role="button">
    Actions <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
  </sgds-button>
  <sgds-dropdown-item>View</sgds-dropdown-item>
  <sgds-dropdown-item>Edit</sgds-dropdown-item>
  <sgds-dropdown-item>Delete</sgds-dropdown-item>
</sgds-dropdown>

<!-- React to selection -->
<sgds-dropdown id="my-dropdown">
  <sgds-button slot="toggler" role="button">Choose <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon></sgds-button>
  <sgds-dropdown-item>Option A</sgds-dropdown-item>
  <sgds-dropdown-item>Option B</sgds-dropdown-item>
  <sgds-dropdown-item>Option C</sgds-dropdown-item>
</sgds-dropdown>

<script>
  document.getElementById("my-dropdown").addEventListener("sgds-select", e => {
    console.log("Selected:", e.detail.item.textContent.trim());
  });
</script>

<!-- Dropdown opens upward -->
<sgds-dropdown drop="up">
  <sgds-button slot="toggler" role="button">Menu above <sgds-icon name="chevron-up" slot="rightIcon"></sgds-icon></sgds-button>
  <sgds-dropdown-item>Item 1</sgds-dropdown-item>
  <sgds-dropdown-item>Item 2</sgds-dropdown-item>
</sgds-dropdown>
```

## API Summary

### `<sgds-dropdown>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `drop` | `down \| up \| left \| right` | `down` | Direction the menu opens relative to the toggler |
| `menuAlignRight` | boolean | `false` | Right-aligns the menu with the toggler button |
| `noFlip` | boolean | `false` | Prevents auto-flip when menu would overflow viewport |
| `menuIsOpen` | boolean | `false` | Opens the menu on first render |
| `disabled` | boolean | `false` | Disables the toggler and prevents menu from opening |
| `close` | `default \| outside \| inside` | `default` | When the menu auto-closes: default (outside click or item click), outside (only outside click), inside (only item click) |

### `<sgds-dropdown-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `disabled` | boolean | `false` | Prevents the item from being selected |
| `active` | boolean | `false` | Marks the item as the current active selection |
| `target` | string | — | `target` attribute forwarded to the slotted anchor |

## Slots

### `<sgds-dropdown>`

| Slot | Purpose |
|---|---|
| `toggler` | The button or element that opens/closes the menu |
| *(default)* | `<sgds-dropdown-item>` elements |

### `<sgds-dropdown-item>`

| Slot | Purpose |
|---|---|
| *(default)* | Navigation anchor `<a>` or plain text for action items |

## Events (`<sgds-dropdown>`)

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | No | — | Menu begins opening |
| `sgds-after-show` | No | — | Menu fully open |
| `sgds-hide` | No | — | Menu begins closing |
| `sgds-after-hide` | No | — | Menu fully closed |
| `sgds-select` | No | `{ item: SgdsDropdownItem }` | A dropdown item is clicked |

---

**For AI agents**:
1. Always place the toggler element in the `toggler` slot — it can be any element but `<sgds-button>` is typical.
2. For navigation, slot an `<a>` tag inside `<sgds-dropdown-item>`. For actions (no navigation), slot plain text directly.
3. `sgds-select` fires on `<sgds-dropdown>` when any item is clicked — `event.detail.item` is the clicked `<sgds-dropdown-item>`.
4. Disabled items do not fire `sgds-select`.
5. For a three-dot overflow menu, use `<sgds-overflow-menu>` which is a pre-built convenience wrapper.
