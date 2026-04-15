# SGDS Radio Component Skill

`<sgds-radio-group>` wraps `<sgds-radio>` elements as a mutually exclusive selection group. Set a pre-selected value via the group's `value` attribute. Listen to `sgds-change` on the group to get the selected value.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When exactly one option must be selected from a small set of mutually exclusive choices (e.g. gender, payment method, delivery option).
- When all options should be visible simultaneously so users can compare before selecting.
- For 2–7 options where a dropdown would add unnecessary interaction overhead.

### When NOT to use

- When multiple selections are allowed → use `<sgds-checkbox>`.
- When there are too many options (>7) → use `<sgds-select>`.
- When options require complex descriptions or comparison tables.
- For binary choices → consider a toggle or switch if the effect is immediate.

## Behaviour

- No option is selected by default unless a sensible default is required.
- Selecting one option automatically deselects others in the same group.
- Supported states: default, hover, focus, selected, disabled, and error (validation failure).
- If `required` and no option is selected, an error state is shown when `hasFeedback` is set.
- Radios must always be grouped with a shared `name` attribute via `<sgds-radio-group>`.
- In `<sgds-radio-group>`, `hintText` is rendered in the label row above the radio options and is always visible — unlike single-field components, it is not replaced by the error message when invalid. Both `hintText` and the error message can be visible simultaneously.

## Advanced Considerations

- **Default selection**: Use a preselected value when there is a recommended or most common option; avoid when neutrality is required — leave `value` unset.
- **Layout**: Vertical alignment is the default and most accessible; horizontal layout is only appropriate for very short labels with few options.
- **Conditional reveal**: Selecting an option may reveal additional inputs — ensure clear visual relationships between the radio and revealed content.
- **Accessibility**: `<sgds-radio-group>` provides semantic grouping. If building a custom implementation, use `fieldset`/`legend` and appropriate ARIA roles.

## Edge Cases

- **No selection**: If the field is optional, allow all radios to remain unselected; do not force a default.
- **Dynamic options**: Maintain the current selection state if the option list updates programmatically.
- **Disabled options**: Clearly indicate why an option is disabled with optional helper text.
- **Long labels**: Text wraps within the label; keep labels concise since no CSS parts are exposed to customise layout.
- **Error handling**: Show a clear message via `invalidFeedback` when a required selection is missing.
- **Mobile layout**: Ensure spacing and tap targets remain usable on small screens.

## Quick Decision Guide

**Ensure only one option is selected?** → Always wrap in `<sgds-radio-group>`

**Pre-select a value?** → Set `value` on `<sgds-radio-group>` to match a radio's `value`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback` on the group

**Disable one option?** → Add `disabled` to the specific `<sgds-radio>`

```html
<!-- Basic radio group -->
<sgds-radio-group
  name="gender"
  label="Gender"
  hintText="Select one"
>
  <sgds-radio value="male">Male</sgds-radio>
  <sgds-radio value="female">Female</sgds-radio>
  <sgds-radio value="prefer-not-to-say">Prefer not to say</sgds-radio>
</sgds-radio-group>

<!-- Pre-selected value with required validation -->
<sgds-radio-group
  name="priority"
  label="Priority"
  value="medium"
  required
  hasFeedback
  invalidFeedback="Please select a priority level"
>
  <sgds-radio value="low">Low</sgds-radio>
  <sgds-radio value="medium">Medium</sgds-radio>
  <sgds-radio value="high">High</sgds-radio>
  <sgds-radio value="critical" disabled>Critical (unavailable)</sgds-radio>
</sgds-radio-group>

<!-- Listen to selection change -->
<sgds-radio-group id="my-radios" name="plan" label="Plan">
  <sgds-radio value="basic">Basic</sgds-radio>
  <sgds-radio value="pro">Pro</sgds-radio>
  <sgds-radio value="enterprise">Enterprise</sgds-radio>
</sgds-radio-group>
<script>
  document.getElementById("my-radios").addEventListener("sgds-change", e => {
    console.log("Selected:", e.detail.value);
  });
</script>
```

## API Summary

### `<sgds-radio-group>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | Form field name — shared by all child radios |
| `label` | string | `""` | Group label |
| `hintText` | string | `""` | Hint text below the label |
| `value` | string | `""` | Pre-selected radio value |
| `required` | boolean | `false` | Makes the group required |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `invalidFeedback` | string | `""` | Error message when no option is selected |
| `invalid` | boolean | `false` | Manually sets the invalid state |

### `<sgds-radio>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `value` | string | — | The value submitted when this radio is selected |
| `checked` | boolean | `false` | Pre-checks this radio on render |
| `disabled` | boolean | `false` | Disables this radio option |
| `invalid` | boolean | `false` | Marks this radio as invalid |

## Slots

| Component | Slot | Purpose |
|---|---|---|
| `<sgds-radio-group>` | *(default)* | `<sgds-radio>` elements |
| `<sgds-radio>` | *(default)* | Radio button label text |

## Events

| Component | Event | Detail | When |
|---|---|---|---|
| `<sgds-radio-group>` | `sgds-change` | `{ value: string }` | A radio in the group is selected |
| `<sgds-radio>` | `sgds-focus` | — | Radio gains focus |
| `<sgds-radio>` | `sgds-blur` | — | Radio loses focus |

---

**For AI agents**:
1. Always wrap `<sgds-radio>` elements in `<sgds-radio-group>` — standalone radios are not supported.
2. Set `name` on the **group** — it propagates to all child radios. Setting `name` on individual `<sgds-radio>` elements has no effect; only the group's `name` attribute is used for form submission.
3. Listen to `sgds-change` on the group (not on individual radios) to get the selected value via `event.detail.value`.
4. `hasFeedback` and `invalidFeedback` are set on the group, not on individual radios.
5. To pre-select an option, prefer setting `value` on `<sgds-radio-group>`. The `checked` attribute on `<sgds-radio>` also pre-checks that radio on render, but avoid using both simultaneously — `value` on the group takes precedence and may conflict with `checked` on a child.
