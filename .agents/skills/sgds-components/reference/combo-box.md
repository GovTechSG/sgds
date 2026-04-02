# SGDS Combo Box Component Skill

`<sgds-combo-box>` is a searchable select with client-side filtering out of the box. Add `multiSelect` to allow multiple selections (displayed as dismissible badges). Enable `async` for server-side filtering.

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
2. For async filtering, set `async=true`, listen to `sgds-input` for `event.detail.displayValue`, fetch results, then populate `<sgds-combo-box-option>` children.
3. Use `clearable` to let users reset the selection without form submission.
4. `filterFunction` must be set as a JS property (`.filterFunction = (input, item) => ...`), not as an HTML attribute.
