# SGDS Dropdown Component Skill

`<sgds-dropdown>` is a toggleable overlay menu. It requires a `toggler` slot element (typically `<sgds-button>`) and `<sgds-dropdown-item>` children for list items. For an icon-only three-dot menu, use `<sgds-overflow-menu>` instead.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For action menus where a button reveals a list of related actions or navigation links.
- When space is limited and multiple actions need to be grouped under a single trigger.
- For contextual menus on items where a set of options (edit, delete, view) applies to that item.
- When a three-dot overflow pattern is needed — use `<sgds-overflow-menu>` (a pre-built convenience wrapper).

### When NOT to use

- For selecting a value from a list of options — use `<sgds-select>` or `<sgds-combo-box>` instead.
- For binary on/off choices — use `<sgds-switch>` or `<sgds-checkbox>`.
- When all actions can be shown as buttons without space constraints — prefer visible buttons for primary actions.
- For navigation menus that are always visible — use `<sgds-mainnav>` or `<sgds-sidenav>`.

## Behaviour

- The menu is hidden by default; clicking the `toggler` slot element opens and closes it.
- `drop` controls the direction the menu opens: `down` (default), `up`, `left`, or `right`.
- `menuAlignRight` right-aligns the menu panel with the toggler.
- `noFlip` prevents the menu from auto-repositioning when it would overflow the viewport edge.
- `close` controls when the menu auto-closes: `default` (closes on outside click or item click), `outside` (closes only on outside click), `inside` (closes only on item click).
- `disabled` on `<sgds-dropdown>` disables the toggler and prevents the menu from opening.
- `disabled` on `<sgds-dropdown-item>` prevents selection and `sgds-select` does not fire for that item.
- `active` on `<sgds-dropdown-item>` marks it as the current selection visually.
- Fires `sgds-select` on the dropdown element with `event.detail.item` as the clicked `<sgds-dropdown-item>`.

## Component Composition

**`toggler` slot (`<sgds-dropdown>`)** — the element that opens the menu. Standard pattern: `<sgds-button slot="toggler" role="button">` with a label and `<sgds-icon name="chevron-down" slot="rightIcon">`. Always provide toggler content — without it, the dropdown has no visible trigger.

**Default slot (`<sgds-dropdown>`)** — only `<sgds-dropdown-item>` elements. Do not place raw `<a>` or `<li>` tags directly.

**`<sgds-dropdown-item>` default slot** — two patterns:
- **Navigation item**: slot a single `<a href="...">` tag inside the item.
- **Action item (no URL)**: slot plain text directly inside the item; handle `sgds-select` on the parent dropdown.

**Avoid placing inside a dropdown:**
- Form inputs, checkboxes, or complex interactive components — use a `<sgds-drawer>` for richer interactions
- More than ~8 items — long menus become hard to scan; consider grouping or a different pattern

## Advanced Considerations

- **Navigation vs action items**: for navigation, slot an `<a>` inside `<sgds-dropdown-item>`; for actions (no URL), slot plain text directly — do not mix both patterns in the same dropdown without clear visual grouping.
- **`sgds-select` event**: fires on the `<sgds-dropdown>` element, not on individual items — use `event.detail.item` to identify which item was selected.
- **`close` behaviour**: use `close="outside"` when items trigger UI changes (e.g. opening a modal) and the dropdown should stay open until the user clicks away; use `close="inside"` for immediate action items.
- **`<sgds-overflow-menu>`**: use this instead of `<sgds-dropdown>` for the standard three-dot icon button pattern — it pre-configures the toggler and styling.
- **Positioning with `drop` and `noFlip`**: by default the menu flips when near the viewport edge; set `noFlip` only when you need to enforce a fixed direction regardless of overflow.

## Edge Cases

- **Empty toggler slot**: the dropdown renders with no visible trigger — always provide an element in the `toggler` slot.
- **No items**: an empty dropdown menu opens but shows no options — always include at least one `<sgds-dropdown-item>`.
- **All items disabled**: the menu opens but nothing is selectable — ensure at least one active item exists or disable the entire dropdown instead.
- **Long item labels**: may overflow the menu container — consider truncation or constrain menu width via parent layout.
- **`menuIsOpen` on initial render**: useful for testing or controlled open states; ensure the dropdown is properly positioned before setting this.
- **`active` item without `sgds-select` tracking**: `active` is a visual attribute only and does not auto-update when an item is clicked — manage it manually in the `sgds-select` handler.

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
