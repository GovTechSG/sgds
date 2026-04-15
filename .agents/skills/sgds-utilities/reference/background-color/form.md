# Form Background Colors Reference

**Level**: Component level
**Usage**: Input fields, textareas, select backgrounds

## Available Tokens

### `sgds:bg-form-surface-default`
**Default form input background.**

**When to use:**
- Text inputs
- Textareas
- Select dropdowns
- Any standard editable form field

```html
<input class="sgds:bg-form-surface-default" type="text" placeholder="Enter your name" />
```

---

### `sgds:bg-form-surface-raised`
**Elevated input background.**

**When to use:**
- Floating label inputs
- Inputs that sit above a surface
- Form fields that need visual lift

```html
<input class="sgds:bg-form-surface-raised" type="text" placeholder="Floating label input" />
```

---

### `sgds:bg-form-surface-emphasis`
**Highlighted or active input state.**

**When to use:**
- Active or focused form field
- Selected state within a form group

```html
<input class="sgds:bg-form-surface-emphasis" type="text" placeholder="Active input" />
```

---

### `sgds:bg-form-surface-subtle`
**Subtle input background.**

**When to use:**
- De-emphasised form fields
- Secondary inputs in a form group

```html
<input class="sgds:bg-form-surface-subtle" type="text" placeholder="Subtle input" />
```

---

### `sgds:bg-form-surface-muted`
**Muted background for read-only inputs.**

**When to use:**
- Read-only fields
- Pre-filled fields the user cannot edit
- Visually distinguish from editable inputs

```html
<input class="sgds:bg-form-surface-muted" type="text" value="Read-only value" readonly />
```

---

### `sgds:bg-form-surface-inverse`
**Inverted background — adapts to theme.**

**When to use:**
- Form fields placed on a dark surface in day mode
- Form fields placed on a light surface in night mode

```html
<input class="sgds:bg-form-surface-inverse" type="text" placeholder="Inverted input" />
```

---

### `sgds:bg-form-surface-fixed-light` / `sgds:bg-form-surface-fixed-dark`
**Never changes with theme mode.**

**When to use:**
- Form fields on branded or image backgrounds
- Guaranteed contrast regardless of theme

```html
<input class="sgds:bg-form-surface-fixed-light" type="text" placeholder="Always light input" />
<input class="sgds:bg-form-surface-fixed-dark" type="text" placeholder="Always dark input" />
```

---

### `sgds:bg-form-surface-primary-default` / `sgds:bg-form-surface-primary-emphasis`
**Brand-colored form input background.**

**When to use:**
- Inputs with brand-level emphasis
- Active or selected form field in a primary context
- `emphasis` for stronger brand presence

```html
<input class="sgds:bg-form-surface-primary-default" type="text" placeholder="Brand input" />
<input class="sgds:bg-form-surface-primary-emphasis" type="text" placeholder="Strong brand input" />
```

---

### `sgds:bg-form-surface-success-default`
**Success state input background.**

**When to use:**
- Valid input field after successful validation

```html
<input class="sgds:bg-form-surface-success-default" type="text" value="Valid value" />
```

---

### `sgds:bg-form-surface-danger-default`
**Error state input background.**

**When to use:**
- Invalid input field after failed validation

```html
<input class="sgds:bg-form-surface-danger-default" type="text" value="Invalid value" />
```

---

## Common Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>`, `<sgds-textarea>` when available. Form background tokens are for custom form elements when library components don't meet your needs.

### Standard Form

```html
<form>
  <div>
    <label>First Name</label>
    <input class="sgds:bg-form-surface-default" type="text" />
  </div>
  <div>
    <label>Last Name</label>
    <input class="sgds:bg-form-surface-default" type="text" />
  </div>
  <div>
    <label>Email</label>
    <input class="sgds:bg-form-surface-default" type="email" />
  </div>
</form>
```

### Read-only Field alongside Editable Field

```html
<div>
  <label>Username (locked)</label>
  <input class="sgds:bg-form-surface-muted" type="text" value="john.doe" readonly />
</div>
<div>
  <label>Display Name</label>
  <input class="sgds:bg-form-surface-default" type="text" placeholder="Enter display name" />
</div>
```

### Form on Dark Background

```html
<section class="sgds:bg-fixed-dark">
  <input class="sgds:bg-form-surface-fixed-light" type="text" placeholder="Input on dark section" />
</section>
```

## See Also

- **[base.md](base.md)** — Page-level background tokens
- **[surface.md](surface.md)** — Component surface tokens
- **[border-color](../border-color.md)** — Border colors for form validation states
