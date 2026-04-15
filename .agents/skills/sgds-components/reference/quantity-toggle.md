# SGDS Quantity Toggle Component Skill

`<sgds-quantity-toggle>` renders a number input flanked by minus (−) and plus (+) icon buttons. Use `min`, `max`, and `step` to constrain and control the value increment.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When users need to select a whole-number quantity within a bounded range — typical use cases include cart item quantities, ticket counts, or seat selection.
- When the value range is small and browsing by increment is practical (e.g. 1–10).
- When `min`, `max`, and `step` constraints provide natural boundaries for the input.

### When NOT to use

- For large numeric ranges where clicking repeatedly would be impractical — use `<sgds-input type="number">` instead.
- For non-integer or highly precise values (e.g. currency amounts, measurements) where direct text entry is more efficient.
- For selecting from a discrete set of options — use `<sgds-select>` or `<sgds-radio>` instead.
- When quantity is purely informational and not editable — use plain text.

## Behaviour

- Clicking the plus (+) button increments the value by `step`; clicking minus (−) decrements by `step`.
- The minus button is disabled when the value reaches `min`; the plus button is disabled when the value reaches `max`.
- Users can also type directly into the input field unless `readonly` is set.
- `readonly` makes the text input non-editable; the +/− buttons remain visible.
- `disabled` disables the entire control — both buttons and the input.
- `hasFeedback` controls validation UI: `"style"` (border colour only), `"text"` (message only), `"both"` (border + message). Pair with `invalidFeedback`.
- `invalid` manually sets the invalid state without relying on browser constraint validation.
- `hintText` and the error message occupy the same space below the toggle — when the field is invalid, `hintText` is replaced by the error message. Once the error is resolved, `hintText` reappears.
- Fires `sgds-change` after a button click or committed keyboard input, and `sgds-input` on each input event.

## Advanced Considerations

- **`step` with `min`/`max`**: if `step` does not evenly divide the range between `min` and `max`, the last increment may overshoot `max` — the component clamps the value at `max`.
- **Manual invalid state**: use `invalid` to programmatically reflect server-side validation errors or cross-field validation results without triggering browser constraint validation.
- **`size`**: matches the size scale of `<sgds-input>` — use to align the toggle visually with adjacent form fields.
- **`readonly` vs `disabled`**: `readonly` preserves the value in form submission and keeps the input visible but non-editable; `disabled` excludes the field from form submission entirely.

## Edge Cases

- **Value below `min` on load**: if `value` is set below `min`, the component does not automatically correct it on render — initialise `value` within the valid range.
- **Value above `max` on load**: same as above — set `value` within `min`–`max` on initialisation.
- **Direct text input exceeding bounds**: users can type a value outside `min`/`max` directly; validate on `sgds-change` and set `invalid` if needed.
- **`step` mismatch**: if the user types a value that is not a multiple of `step` from `min`, the buttons will increment correctly from that value — validate and guide users via `invalidFeedback` if strict step alignment is required.
- **`disabled` in form submission**: a `disabled` quantity toggle's value is not included in form data — use `readonly` if the value must be submitted.

## Quick Decision Guide

**Set initial value?** → `value="0"` (default is 0)

**Minimum quantity?** → Set `min`

**Maximum quantity?** → Set `max`

**Increment by more than 1?** → `step="5"` (default step is 1)

**Prevent manual typing?** → `readonly`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

```html
<!-- Basic quantity toggle -->
<sgds-quantity-toggle
  name="quantity"
  label="Quantity"
  value="1"
  min="1"
  max="99"
></sgds-quantity-toggle>

<!-- With hint text and step -->
<sgds-quantity-toggle
  name="tickets"
  label="Number of Tickets"
  hintText="Maximum 10 tickets per order"
  value="1"
  min="1"
  max="10"
  step="1"
></sgds-quantity-toggle>

<!-- Read-only quantity display -->
<sgds-quantity-toggle
  name="items"
  label="Items in Cart"
  value="3"
  readonly
></sgds-quantity-toggle>

<!-- With validation feedback -->
<sgds-quantity-toggle
  name="count"
  label="Count"
  value="0"
  min="1"
  hasFeedback="both"
  invalidFeedback="Must be at least 1"
></sgds-quantity-toggle>

<!-- Listen to value change -->
<sgds-quantity-toggle id="qty" name="qty" label="Qty" value="1" min="1" max="10">
</sgds-quantity-toggle>
<script>
  document.getElementById("qty").addEventListener("sgds-change", e => {
    console.log("New quantity:", document.getElementById("qty").value);
  });
</script>
```

## API Summary

### `<sgds-quantity-toggle>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Hint text below the label |
| `name` | string | — | Form field name |
| `value` | number | `0` | Current quantity value |
| `step` | number | `1` | Amount to increment or decrement per click |
| `min` | number | — | Minimum allowed value |
| `max` | number | — | Maximum allowed value |
| `size` | `sm \| md \| lg` | — | Size of the toggle control (matches `<sgds-input>` size values) |
| `disabled` | boolean | `false` | Disables the control |
| `readonly` | boolean | `false` | Makes the value read-only (hides +/− buttons is false — they are still shown but the input becomes non-editable) |
| `invalid` | boolean | `false` | Manually sets the invalid state |
| `hasFeedback` | `style \| text \| both` | — | Controls validation UI feedback |
| `invalidFeedback` | string | — | Error message when value is invalid |

## Events

| Event | When |
|---|---|
| `sgds-change` | Value changes after a button click or keyboard input |
| `sgds-input` | Value changes on each input event |

---

**For AI agents**:
1. Button clicks increment/decrement by `step`; direct input allows custom values.
2. When `min` is set, the minus (−) button is disabled at the minimum value; similarly for `max` and the plus (+) button.
3. Read `element.value` (a number) after `sgds-change` to get the current count.
4. There are no public methods on this component.
