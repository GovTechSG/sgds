# SGDS Radio Component Skill

`<sgds-radio-group>` wraps `<sgds-radio>` elements as a mutually exclusive selection group. Set a pre-selected value via the group's `value` attribute. Listen to `sgds-change` on the group to get the selected value.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
2. Set `name` on the group — it propagates to all child radios.
3. Listen to `sgds-change` on the group (not on individual radios) to get the selected value via `event.detail.value`.
4. `hasFeedback` and `invalidFeedback` are set on the group, not on individual radios.
