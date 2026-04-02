# Form Background Colors Reference

**Meaning**: Form-specific component backgrounds
**Usage**: Input fields, textareas, select backgrounds

## Design Semantics

- **Form = Input Components**
- Specific to form input backgrounds
- Provides contrast for form fields
- Adapts to theme (day/night)

## Available Tokens

### `sgds:bg-form-default`
**Default form input backgrounds.**

**When to use:**
- Text inputs
- Textareas
- Select dropdowns
- Searchboxes
- Any editable form field

```html
<input
  class="sgds:bg-form-default"
  type="text"
  placeholder="Enter your name"
/>
```

## Common Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>`, `<sgds-textarea>` when available. Form background tokens are for creating custom form elements when library components don't meet your needs.

### Text Input

```html
<div>
  <label for="email">Email</label>
  <input
    class="sgds:bg-form-default"
    type="email"
    id="email"
    placeholder="you@example.com"
  />
</div>
```

### Textarea

```html
<div>
  <label for="message">Message</label>
  <textarea
    class="sgds:bg-form-default"
    id="message"
    placeholder="Enter your message"
  ></textarea>
</div>
```

### Select Dropdown

```html
<div>
  <label for="country">Country</label>
  <select
    class="sgds:bg-form-default"
    id="country"
  >
    <option>Singapore</option>
    <option>Malaysia</option>
    <option>Indonesia</option>
  </select>
</div>
```

### Search Input

```html
<div>
  <input
    class="sgds:bg-form-default"
    type="search"
    placeholder="Search..."
  />
  <svg>
    <!-- search icon -->
  </svg>
</div>
```

### Disabled Input

```html
<input
  class="sgds:bg-form-default"
  type="text"
  placeholder="Disabled field"
  disabled
/>
```

### Input with Icon

```html
<div>
  <label>Password</label>
  <input
    class="sgds:bg-form-default"
    type="password"
    placeholder="Enter password"
  />
  <button>
    <svg><!-- eye icon --></svg>
  </button>
</div>
```

### Form with Multiple Inputs

```html
<form>
  <div>
    <label>First Name</label>
    <input
      class="sgds:bg-form-default"
      type="text"
    />
  </div>
  <div>
    <label>Last Name</label>
    <input
      class="sgds:bg-form-default"
      type="text"
    />
  </div>
  <div>
    <label>Email</label>
    <input
      class="sgds:bg-form-default"
      type="email"
    />
  </div>
  <button>
    Submit
  </button>
</form>
```

### Input with Validation States

```html
<!-- Success State -->
<div>
  <label>Email (Valid)</label>
  <input
    class="sgds:bg-form-default"
    type="email"
    value="user@example.com"
  />
  <p>✓ Valid email</p>
</div>

<!-- Error State -->
<div>
  <label>Email (Invalid)</label>
  <input
    class="sgds:bg-form-default"
    type="email"
    value="invalid-email"
  />
  <p>✗ Invalid email format</p>
</div>
```

## Best Practices

### ✅ DO: Use for All Form Inputs

```html
<!-- ✅ Good - consistent form backgrounds -->
<input class="sgds:bg-form-default" type="text" />
<textarea class="sgds:bg-form-default"></textarea>
<select class="sgds:bg-form-default"></select>
```

### ✅ DO: Combine with Border States

```html
<!-- ✅ Good - clear focus state -->
<input
  class="sgds:bg-form-default"
  type="text"
/>
```

### ✅ DO: Use with Validation Colors

```html
<!-- ✅ Good - form background + validation border -->
<input
  class="sgds:bg-form-default"
  type="text"
/>
```

### ❌ DON'T: Use for Non-Input Elements

```html
<!-- ❌ Avoid - form background for regular divs -->
<div class="sgds:bg-form-default">
  Regular content (not a form field)
</div>

<!-- ✅ Better - surface for regular content -->
<div class="sgds:bg-surface-default">
  Regular content
</div>
```

### ❌ DON'T: Mix with Other Surface Backgrounds in Forms

```html
<!-- ❌ Avoid - inconsistent input backgrounds -->
<input class="sgds:bg-surface-default" type="text" />
<input class="sgds:bg-form-default" type="email" />

<!-- ✅ Better - consistent form backgrounds -->
<input class="sgds:bg-form-default" type="text" />
<input class="sgds:bg-form-default" type="email" />
```

## Theme Adaptation

Form backgrounds automatically adapt to the active theme:

- **Day Theme**: Lighter background for contrast on light pages
- **Night Theme**: Adjusted background for contrast on dark pages

This ensures form inputs are always visible and accessible regardless of theme.

## Additional Considerations

### Focus States

Always include focus states for accessibility:

```html
<input
  class="sgds:bg-form-default"
  type="text"
/>
```

### Disabled States

Use opacity to indicate disabled fields:

```html
<input
  class="sgds:bg-form-default"
  type="text"
  disabled
/>
```

### Readonly States

Differentiate readonly from disabled:

```html
<input
  class="sgds:bg-form-default"
  type="text"
  value="Read-only value"
  readonly
/>
```

## See Also

- **success.md** - Success validation states
- **danger.md** - Error validation states
- **warning.md** - Warning validation states
