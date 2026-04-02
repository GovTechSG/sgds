# Form Border Colors & Radius Reference

**Meaning**: Form element-specific borders
**Usage**: Input validation states and border radius for form HTML elements

## Design Semantics

- **Form = HTML form elements only**
- For `<input>`, `<select>`, `<textarea>`, `<form>` elements
- Border colors convey validation state (success/danger)
- Border radius controls the roundness of form element corners

---

## Form Border Colors

### `sgds:border-form-success-default`
**Valid/success input border.**

**When to use:**
- Input field has passed validation
- Successful form field state

```html
<input
  class="sgds:border sgds:border-form-success-default"
  type="text"
  value="Valid input"
/>
```

### `sgds:border-form-danger-default`
**Invalid/error input border.**

**When to use:**
- Input field has failed validation
- Required field that is empty
- Error state on a form element

```html
<input
  class="sgds:border sgds:border-form-danger-default"
  type="text"
  placeholder="This field has an error"
/>
```

---

## Form Border Radius

Controls the corner roundness of form HTML elements. Use these instead of the general `sgds:rounded-*` utilities for form inputs to maintain design consistency.

### Available Sizes

| Token | CSS Variable | Value |
|---|---|---|
| `sgds:rounded-form-none` | `--sgds-form-border-radius-none` | 0px |
| `sgds:rounded-form-xs` | `--sgds-form-border-radius-xs` | Extra small |
| `sgds:rounded-form-sm` | `--sgds-form-border-radius-sm` | Small |
| `sgds:rounded-form-md` | `--sgds-form-border-radius-md` | Medium |
| `sgds:rounded-form-full` | `--sgds-form-border-radius-full` | Fully rounded (pill) |

```html
<input class="sgds:rounded-form-md" type="text" placeholder="Rounded input" />
<input class="sgds:rounded-form-full" type="search" placeholder="Pill search input" />
<input class="sgds:rounded-form-none" type="text" placeholder="Square input" />
```

---

## Common Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>`, `<sgds-textarea>` when available. Form border tokens are for creating custom form elements when library components don't meet your needs.

### Validated Input (Success)

```html
<input
  class="sgds:border sgds:border-form-success-default sgds:rounded-form-md"
  type="text"
  value="john@example.com"
/>
```

### Invalid Input (Error)

```html
<input
  class="sgds:border sgds:border-form-danger-default sgds:rounded-form-md"
  type="text"
  placeholder="Required field"
/>
```

### Default Input with Form Radius

```html
<input
  class="sgds:border sgds:border-default sgds:rounded-form-md"
  type="text"
  placeholder="Enter value"
/>
```

### Select Dropdown

```html
<select class="sgds:border sgds:border-default sgds:rounded-form-md">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Pill Search Input

```html
<input
  class="sgds:border sgds:border-default sgds:rounded-form-full"
  type="search"
  placeholder="Search..."
/>
```
