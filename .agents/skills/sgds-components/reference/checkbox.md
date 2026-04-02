# SGDS Checkbox Component Skill

`<sgds-checkbox>` can be used standalone or grouped in `<sgds-checkbox-group>`. The group manages shared validation, a fieldset label, and change detection. Standalone checkboxes work for "I agree" cases.

## Quick Decision Guide

**Multiple related checkboxes with a label?** → Use `<sgds-checkbox-group>`

**Single "I agree" checkbox?** → Use `<sgds-checkbox>` standalone

**Indeterminate state (e.g. partial select)?** → Set `indeterminate` on the checkbox

**Show validation feedback on group?** → Set `hasFeedback` and `invalidFeedback` on the group

**Pre-checked?** → Add `checked` to the `<sgds-checkbox>`

```html
<!-- Checkbox group -->
<sgds-checkbox-group
  label="Dietary Requirements"
  hintText="Check all that apply"
  hasFeedback
  invalidFeedback="Please select at least one option"
  required
>
  <sgds-checkbox value="vegetarian">Vegetarian</sgds-checkbox>
  <sgds-checkbox value="halal">Halal</sgds-checkbox>
  <sgds-checkbox value="vegan">Vegan</sgds-checkbox>
  <sgds-checkbox value="gluten-free">Gluten-free</sgds-checkbox>
</sgds-checkbox-group>

<!-- Standalone checkbox for agreement -->
<sgds-checkbox name="agree" value="yes" required>
  I agree to the Terms and Conditions
</sgds-checkbox>

<!-- Indeterminate state (e.g. select all) -->
<sgds-checkbox id="select-all" indeterminate>Select All</sgds-checkbox>

<!-- Pre-checked -->
<sgds-checkbox name="newsletter" value="yes" checked>
  Subscribe to newsletter
</sgds-checkbox>

<!-- Listen to group change -->
<sgds-checkbox-group id="my-group" label="Options">
  <sgds-checkbox value="a">Option A</sgds-checkbox>
  <sgds-checkbox value="b">Option B</sgds-checkbox>
  <sgds-checkbox value="c">Option C</sgds-checkbox>
</sgds-checkbox-group>
<script>
  document.getElementById("my-group").addEventListener("sgds-change", () => {
    console.log("Group value:", document.getElementById("my-group").value);
  });
</script>
```

## API Summary

### `<sgds-checkbox-group>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Group label |
| `hintText` | string | `""` | Hint text below the label |
| `value` | string | `""` | Comma-separated values of checked checkboxes |
| `required` | boolean | `false` | Makes at least one checkbox required |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `invalidFeedback` | string | `"Please tick at least one box if you want to proceed"` | Error message when nothing is checked |

### `<sgds-checkbox>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | Form field name (for standalone use) |
| `value` | string | — | The value submitted when checked |
| `checked` | boolean | `false` | Pre-checks the checkbox |
| `indeterminate` | boolean | `false` | Shows the indeterminate (partial) state |
| `disabled` | boolean | `false` | Disables the checkbox |
| `required` | boolean | `false` | Makes the checkbox required (standalone) |
| `hasFeedback` | `style \| text \| both` | — | Validation feedback display (standalone) |
| `invalidFeedback` | string | `""` | Error message (standalone) |

## Slots

| Component | Slot | Purpose |
|---|---|---|
| `<sgds-checkbox-group>` | *(default)* | `<sgds-checkbox>` elements |
| `<sgds-checkbox>` | *(default)* | Checkbox label text |

## Events

| Component | Event | Detail | When |
|---|---|---|---|
| `<sgds-checkbox-group>` | `sgds-change` | — | Any checkbox in the group is checked or unchecked; read `element.value` for current checked values |
| `<sgds-checkbox>` | `sgds-change` | `{ checked: boolean, value: string }` | Checked state changes |
| `<sgds-checkbox>` | `sgds-check` | — | Checkbox is checked |
| `<sgds-checkbox>` | `sgds-uncheck` | — | Checkbox is unchecked |
| `<sgds-checkbox>` | `sgds-focus` | — | Gains focus |
| `<sgds-checkbox>` | `sgds-blur` | — | Loses focus |

---

**For AI agents**:
1. For multi-checkbox forms, use `<sgds-checkbox-group>` — `hasFeedback` and `invalidFeedback` belong on the group.
2. `<sgds-checkbox-group>` `value` is a comma-separated string of the values of all currently checked checkboxes.
3. On `sgds-change` from a group, read `element.value` to get the current selection — no event detail for group.
4. `indeterminate` is useful for "select all" patterns; toggling it programmatically is valid.
5. Standalone `<sgds-checkbox>` elements (outside a group) work like a plain HTML checkbox with `name` and `value`.
