# SGDS Select Component Skill

`<sgds-select>` is a searchable form select control. Options are provided as `<sgds-select-option>` child elements. It includes built-in filtering, label, hint text, loading state, and validation feedback.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
4. There are no public methods on this component.
