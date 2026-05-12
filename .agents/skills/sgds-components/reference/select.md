# SGDS Select Component Skill

`<sgds-select>` is a searchable form select control. Options are provided as `<sgds-select-option>` child elements. It includes built-in filtering, label, hint text, loading state, and validation feedback.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When users must choose one option from a predefined list and the list is too long to display as radio buttons.
- For 5 or more options where a dropdown is more space-efficient than a visible list of radios.
- When built-in search filtering helps users find their option in a moderately sized list.
- As a single-selection control in forms where the valid options are fixed and known upfront.

### When NOT to use

- When users need to enter free-form text not in the predefined options.
- When there are too many options that would be hard to scroll through (built-in filtering helps, but very large lists are still unwieldy — consider `<sgds-combo-box>` with async loading).
- When immediate action is needed without an extra click or tap.
- When multi-selection is required — use `<sgds-combo-box multiSelect>` instead.

## Behaviour

- Opens a dropdown when clicked or focused.
- Highlights hovered or keyboard-navigated options.
- Supports keyboard navigation: `Tab` to focus, `Enter` to select, `Arrow Up`/`Down` to navigate options.
- Closes the dropdown on outside click or pressing `Esc`.
- Updates the value immediately upon selection.
- Shows a loading spinner when `loading` is set.
- `hintText` and the error message occupy the same space below the select — when the field is invalid, `hintText` is replaced by the error message. Once the error is resolved, `hintText` reappears.

## Advanced Considerations

- For very large option lists, consider async loading via `loading` and dynamically updating children.
- For multi-select, use `<sgds-combo-box multiSelect>` — `<sgds-select>` is single-select only.
- `hasFeedback` on `<sgds-select>` is a **boolean** (`hasFeedback` or `hasFeedback="false"`) — unlike `<sgds-input>` and `<sgds-textarea>` where it is a string enum (`"style" | "text" | "both"`). Always pair with `invalidFeedback` for the error message.
- `readonly` makes the select non-interactable but the current value remains visible and is still submitted with the form — use when displaying a locked pre-selection that users cannot change.
- Disabled options (via `disabled` on `<sgds-select-option>`) are render-only — they cannot be selected but remain visible in the dropdown as unavailable choices.
- `<sgds-select>` does not support `hasFeedback="style"`, `"text"`, or `"both"` string values; passing a truthy string like `hasFeedback="both"` will be treated as boolean `true` — use simple boolean presence (`hasFeedback`) on this component.

## Edge Cases

- **Empty state**: If no `<sgds-select-option>` children are provided, the dropdown opens with no items.
- **Duplicate values**: Avoid options with identical `value` attributes; `<sgds-select>` matches by value string.
- **Long labels**: Options with very long text may overflow; keep labels concise since no CSS parts are exposed to customise overflow behaviour.
- **Dynamic option changes**: Avoid mutating the option list while the dropdown is open to prevent focus and selection inconsistencies.
- **⚠️ DO NOT use placeholder text as an option**: Never include options like `<sgds-select-option value="">Select country</sgds-select-option>`. Every option in the menu is a valid selectable value that will be submitted with the form. Use the `placeholder` attribute instead to display prompt text when no option is selected — it will not be included in the option list.

## Form Layout Context

`<sgds-select>` is a **4-column form component** — it can share a row with other 4-column components in form layouts. For detailed form pattern guidance (when to pair fields, spacing, responsive behavior), see the [sgds-blocks form layout skill](../sgds-blocks/reference/form.md).

## Quick Decision Guide

**Single selection only?** → `<sgds-select>` with `<sgds-select-option>` children

**Multi-selection?** → Use `<sgds-combo-box multiSelect>` instead

**Pre-select a value?** → Set `value` to match the option's `value` attribute

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

**Async/loading state?** → Set `loading`

```html
<!-- Basic select -->
<sgds-select
  label="Country"
  name="country"
  hintText="Select your country of residence"
  placeholder="Select a country"
  required
>
  <sgds-select-option value="sg">Singapore</sgds-select-option>
  <sgds-select-option value="my">Malaysia</sgds-select-option>
  <sgds-select-option value="au">Australia</sgds-select-option>
  <sgds-select-option value="uk">United Kingdom</sgds-select-option>
</sgds-select>

<!-- With validation feedback -->
<sgds-select
  label="Department"
  name="department"
  placeholder="Select department"
  required
  hasFeedback
  invalidFeedback="Please select a department"
>
  <sgds-select-option value="eng">Engineering</sgds-select-option>
  <sgds-select-option value="design">Design</sgds-select-option>
  <sgds-select-option value="product" disabled>Product (coming soon)</sgds-select-option>
</sgds-select>

<!-- Pre-selected value and loading state -->
<sgds-select label="Status" name="status" value="active" loading>
  <sgds-select-option value="active">Active</sgds-select-option>
  <sgds-select-option value="inactive">Inactive</sgds-select-option>
</sgds-select>

<!-- Listen to selection event -->
<sgds-select id="my-select" label="Role" name="role">
  <sgds-select-option value="admin">Admin</sgds-select-option>
  <sgds-select-option value="user">User</sgds-select-option>
</sgds-select>
<script>
  document.getElementById("my-select").addEventListener("sgds-select", e => {
    console.log("Selected:", document.getElementById("my-select").value);
  });
</script>
```

## API Summary

### `<sgds-select>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Field label |
| `hintText` | string | `""` | Hint text below the label |
| `name` | string | — | Form field name for submission |
| `value` | string | — | Currently selected option value |
| `placeholder` | string | — | Placeholder text when no option is selected |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the select |
| `loading` | boolean | `false` | Shows a loading spinner |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `invalidFeedback` | string | — | Error message shown when invalid |
| `readonly` | boolean | `false` | Makes the select read-only |

### `<sgds-select-option>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `value` | string | — | The value submitted and stored in the parent select |
| `disabled` | boolean | `false` | Disables the option |

## Slots

| Component | Slot | Purpose |
|---|---|---|
| `<sgds-select>` | *(default)* | `<sgds-select-option>` elements |
| `<sgds-select-option>` | *(default)* | Option label text |

## Events (`<sgds-select>`)

| Event | When |
|---|---|
| `sgds-select` | An option is selected |
| `sgds-change` | The select value changes |
| `sgds-focus` | Input receives focus |
| `sgds-blur` | Input loses focus |

---

**For AI agents**:
1. Each option requires a `value` attribute — the `<sgds-select>` `value` attribute reflects the selected option's `value`.
2. Use `sgds-select` event (not `sgds-change`) for detecting user selection; read `element.value` for the selected value.
3. For multi-selection, use `<sgds-combo-box multiSelect>` — `<sgds-select>` is single-select only.
4. `hasFeedback` on `<sgds-select>` is a boolean — not the string enum used by `<sgds-input>` and `<sgds-textarea>`. Use `hasFeedback` (presence) alongside `invalidFeedback` for the error message; do not pass `hasFeedback="both"`.
5. There are no public methods on this component.
