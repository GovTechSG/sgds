# SGDS Combo Box Component Skill

`<sgds-combo-box>` is a searchable select with client-side filtering out of the box. Add `multiSelect` to allow multiple selections (displayed as dismissible badges). Enable `async` for server-side filtering.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When users need to search or filter through a large list of options to find their selection.
- For multi-select scenarios where users can pick several items displayed as dismissible badges — use `multiSelect`.
- When option lists are too long to scan in a fixed dropdown — the built-in client-side filtering reduces cognitive load.
- For server-driven autocomplete where results load asynchronously based on user input — use `async` mode.

### When NOT to use

- For small, fixed lists (fewer than ~10 options) → use `<sgds-select>` or `<sgds-radio>` instead.
- For binary or simple choices → use `<sgds-checkbox>` or `<sgds-radio>`.
- When input must be fully freeform with no option list → use `<sgds-input>`.
- When autocomplete suggestions may introduce ambiguity or data entry errors.

## Behaviour

- Dropdown opens on input focus, typing, or clicking the trigger.
- Options are filtered client-side in real time based on user input (substring match by default); set a custom `filterFunction` to change the matching strategy.
- Set `async` to disable client-side filtering and handle results server-side via the `sgds-input` event.
- Selecting an option populates the input and closes the dropdown.
- In `multiSelect` mode, each selected option appears as a dismissible badge; `element.value` is a comma-separated string.
- `clearable` adds a clear button to reset the selection.
- `loading` shows a spinner while async results are being fetched.
- `required` makes the field required for form submission; an error state is shown on submit if no option is selected. Unlike `<sgds-select>`, there is no `hasFeedback` or `invalidFeedback` attribute — validation feedback relies on browser-native constraint validation.
- `disabled` makes the combo box non-interactive; `readonly` makes it visible but not selectable.
- `hintText` and the error message occupy the same space below the input — when the field is invalid, `hintText` is replaced by the error message. Once the error is resolved, `hintText` reappears.
- Keyboard: `Arrow` keys navigate options; `Enter` selects the highlighted option; `Esc` closes the dropdown.
- Supported states: default, hover, focus, disabled, loading, and empty (no results).

## Advanced Considerations

- **Custom filter**: set `filterFunction` as a JS property — not an HTML attribute — to implement prefix, fuzzy, or custom matching logic. Ignored when `async` is true.
- **Async data**: set `async`, listen to `sgds-input` for `event.detail.displayValue`, fetch results, then replace `<sgds-combo-box-option>` children. Set `loading` to indicate fetch in progress.
- **Multi-select**: add `multiSelect`; `element.value` becomes a comma-separated string of selected values. Use `badgeFullWidth` to make badges span the full input width.
- **Empty async menu**: use `emptyMenuAsync` to show an open (empty) menu immediately when in async mode before the user types.
- **Programmatic control**: `menuIsOpen` lets you open or close the dropdown from JavaScript without user interaction.
- **Positioning**: `floatingOpts` passes options directly to Floating UI for advanced dropdown placement — use only when default positioning is insufficient.

## Edge Cases

- **No results**: the component shows an empty dropdown; ensure your UX communicates this clearly with `hintText` or external messaging.
- **Async failure**: set `loading = false` and repopulate with an error option or show an adjacent error message — the component does not handle API errors automatically.
- **Long option labels**: keep labels concise; no CSS parts are exposed to truncate overflow.
- **Duplicate labels**: add secondary metadata to the option text (e.g. "Singapore (SG)") since filtering matches visible text.
- **Pre-filled values**: set `value` to a string matching an existing option's `value` attribute; mismatches will show no selection.
- **Clearing selection**: `clearable` resets `element.value` to empty — ensure downstream listeners on `sgds-change` handle an empty value gracefully.
- **Mobile**: the dropdown renders inline; for very large datasets on small screens, consider limiting the option count via async filtering rather than rendering all options.
- **IME input** (e.g. Chinese/Japanese): filtering fires via `sgds-input` which may fire during composition — use `async` mode with debouncing if IME input causes unintended filtering.
- **⚠️ DO NOT use placeholder text as an option**: Never include options like `<sgds-combo-box-option value="">Select country</sgds-combo-box-option>`. Every option in the menu is a valid selectable value that will be submitted with the form. Use the `placeholder` attribute instead to display prompt text when no option is selected — it will not be included in the option list.

## Form Layout Context

- **Single-select** (`multiSelect` omitted) is a **4-column form component** — can share a row with other 4-column components.
- **Multi-select** (`multiSelect="true"`) is a **full-width form component** — MUST NOT share a row with any other component.

For detailed form pattern guidance (when to pair fields, spacing, responsive behavior, multi-select rules), see the [sgds-blocks form layout skill](../sgds-blocks/reference/form.md).

## Quick Decision Guide

**Single-select searchable dropdown?** → Default `<sgds-combo-box>`

**Multi-select?** → Add `multiSelect`

**Custom filter function?** → Set `filterFunction` via JS property

**Server-side async filtering?** → Add `async`, then update the option list in the `sgds-input` event handler

**Show a clear button?** → Add `clearable`

**Full-width selected badges?** → Add `badgeFullWidth`

```html
<!-- Basic single-select combo box -->
<sgds-combo-box
  id="country-select"
  label="Country"
  placeholder="Search or select a country"
  name="country"
  hintText="Select your country"
>
  <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
  <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
  <sgds-combo-box-option value="au">Australia</sgds-combo-box-option>
  <sgds-combo-box-option value="uk" disabled>United Kingdom (unavailable)</sgds-combo-box-option>
</sgds-combo-box>

<!-- Multi-select with clearable -->
<sgds-combo-box
  label="Tags"
  placeholder="Select tags"
  multiSelect
  clearable
>
  <sgds-combo-box-option value="design">Design</sgds-combo-box-option>
  <sgds-combo-box-option value="engineering">Engineering</sgds-combo-box-option>
  <sgds-combo-box-option value="product">Product</sgds-combo-box-option>
</sgds-combo-box>

<!-- Async server-side filtering -->
<sgds-combo-box
  id="async-combo"
  label="Search Users"
  placeholder="Type to search"
  async
  loading
>
</sgds-combo-box>
<script>
  const combo = document.getElementById("async-combo");
  combo.addEventListener("sgds-input", async e => {
    const query = e.detail.displayValue;
    combo.loading = true;
    // Fetch options from server, then replace child options
    const results = await fetchUsers(query);
    combo.innerHTML = results.map(u =>
      `<sgds-combo-box-option value="${u.id}">${u.name}</sgds-combo-box-option>`
    ).join("");
    combo.loading = false;
  });
  combo.addEventListener("sgds-select", () => {
    console.log("Selected:", combo.value);
  });
</script>
```

## API Summary

### `<sgds-combo-box>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Field label |
| `hintText` | string | `""` | Hint text below the label |
| `name` | string | — | Form field name |
| `value` | string | — | Currently selected value(s) — comma-separated for multi-select |
| `placeholder` | string | — | Placeholder text |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the combo box |
| `readonly` | boolean | `false` | Makes the combo box read-only |
| `loading` | boolean | `false` | Shows a loading spinner in the input |
| `multiSelect` | boolean | `false` | Enables multi-selection with badge display |
| `clearable` | boolean | `false` | Shows a clear button to reset the selection |
| `badgeFullWidth` | boolean | `false` | Makes selected badges full-width in multi-select mode |
| `async` | boolean | `false` | Disables client-side filtering for server-side async filtering |
| `emptyMenuAsync` | boolean | `false` | Shows an empty menu on open when in async mode |
| `menuIsOpen` | boolean | `false` | Programmatically controls the dropdown menu open state |
| `filterFunction` | `(inputValue: string, item) => boolean` | contains filter | Custom filter function (ignored when `async` is true) |
| `floatingOpts` | object | — | Options for Floating UI positioning (advanced) |

### `<sgds-combo-box-option>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `value` | string | — | The value submitted when this option is selected |
| `disabled` | boolean | `false` | Disables the option |

## Slots

| Component | Slot | Purpose |
|---|---|---|
| `<sgds-combo-box>` | *(default)* | `<sgds-combo-box-option>` elements |
| `<sgds-combo-box-option>` | *(default)* | Option label text |

## Events (`<sgds-combo-box>`)

| Event | Detail | When |
|---|---|---|
| `sgds-select` | — | An option is selected (read `element.value`) |
| `sgds-change` | — | The combo box value changes |
| `sgds-input` | `{ displayValue: string }` | User types into the input field |
| `sgds-focus` | — | Input gains focus |
| `sgds-blur` | — | Input loses focus |

---

**For AI agents**:
1. For single-select, `element.value` is the selected option's `value`. For multi-select, it is a comma-separated string.
2. For async filtering, set `async` (boolean attribute), listen to `sgds-input` for `event.detail.displayValue`, fetch results, then populate `<sgds-combo-box-option>` children.
3. Use `clearable` to let users reset the selection without form submission.
4. `filterFunction` must be set as a JS property (`.filterFunction = (input, item) => ...`), not as an HTML attribute.
5. `<sgds-combo-box>` does **not** have `hasFeedback` or `invalidFeedback` attributes — unlike all other SGDS form components. Validation relies entirely on the browser-native `required` constraint. Do not add these attributes.
6. **Boolean attribute handling**: For single-select, omit the `multiSelect` attribute entirely. For multi-select, include `multiSelect` with no value (HTML5 boolean) or `multiSelect="true"`. Do **NOT** use `multiSelect="false"` for single-select — in HTML, any attribute presence (even with value "false") is truthy. Omit the attribute for false.
