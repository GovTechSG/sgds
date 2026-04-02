# Success Background Colors Reference

**Meaning**: Positive feedback, completion, validation
**Usage**: Success messages, completed states, positive confirmations

## Design Semantics

- **Success = Positive Feedback**
- Use for successful operations, confirmations
- Indicates completion, validation, approval
- Reassuring and positive tone

## Available Tokens

### Page Level

#### `sgds:bg-success-default`
**Page-level success sections.**

```html
<section class="sgds:bg-success-default">
  <div>
    <h2>Success!</h2>
    <p>Your action completed successfully</p>
  </div>
</section>
```

#### `sgds:bg-success-muted`
**Subtle success background.**

```html
<div class="sgds:bg-success-muted">
  <p>Subtle success message</p>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-success-surface-default`
**Standard success component backgrounds.**

**When to use:**
- Success alerts
- Positive feedback messages
- Validation confirmations
- Completed state indicators

```html
<div class="sgds:bg-success-surface-default">
  <p>Success!</p>
  <p>Your changes have been saved</p>
</div>
```

#### `sgds:bg-success-surface-emphasis`
**Emphasized success component.**

```html
<div class="sgds:bg-success-surface-emphasis">
  Strongly emphasized success message
</div>
```

#### `sgds:bg-success-surface-muted`
**Subtle success component.**

```html
<span class="sgds:bg-success-surface-muted">
  Completed
</span>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Success Alert

```html
<div class="sgds:bg-success-surface-default">
  <div>
    <svg><!-- checkmark icon --></svg>
    <div>
      <p>Success!</p>
      <p>Your profile has been updated successfully</p>
    </div>
  </div>
</div>
```

### Form Success State

```html
<div>
  <label>Email</label>
  <input
    value="user@example.com"
  />
  <p>
    <svg><!-- checkmark --></svg>
    Valid email address
  </p>
</div>
```

### Success Badge

```html
<span class="sgds:bg-success-surface-default">
  <svg><!-- checkmark --></svg>
  Completed
</span>
```

### Success Banner (Full Width)

```html
<div class="sgds:bg-success-surface-default">
  <div>
    <p>
      ✓ Payment processed successfully
    </p>
    <button>View Receipt</button>
  </div>
</div>
```

## Best Practices

### ✅ DO: Use for Positive Feedback

```html
<!-- ✅ Good - confirms successful action -->
<div class="sgds:bg-success-surface-default">
  Successfully saved
</div>
```

### ✅ DO: Pair with Checkmark Icons

```html
<!-- ✅ Good - visual confirmation -->
<div class="sgds:bg-success-surface-default">
  <svg><!-- checkmark icon --></svg>
  <span>Operation completed</span>
</div>
```

### ✅ DO: Use Surface for Components

```html
<!-- ✅ Good - alert uses surface variant -->
<div class="sgds:bg-success-surface-default">
  Success message with good contrast
</div>
```

### ❌ DON'T: Use for Non-Success States

```html
<!-- ❌ Avoid - success color for error -->
<div class="sgds:bg-success-surface-default">
  Error message (wrong color)
</div>

<!-- ✅ Better - danger for errors -->
<div class="sgds:bg-danger-surface-default">
  Error message
</div>
```

### ❌ DON'T: Use Solid Success with Same Text Color

```html
<!-- ❌ Avoid - poor contrast -->
<div class="sgds:bg-success-default">
  Hard to read
</div>

<!-- ✅ Better - proper contrast -->
<div class="sgds:bg-success-default">
  Easy to read
</div>
```

## See Also

- **danger.md** - Error/negative feedback
- **warning.md** - Caution messages
- **form.md** - Form validation states
