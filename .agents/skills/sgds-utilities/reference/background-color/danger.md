# Danger Background Colors Reference

**Meaning**: Errors, negative feedback, critical states
**Usage**: Error messages, failed states, destructive actions

## Design Semantics

- **Danger = Negative Feedback / Errors**
- Use for failed operations, errors, validation failures
- Indicates problems, critical states, destructive actions
- Urgent and attention-demanding tone

## Available Tokens

### Page Level

#### `sgds:bg-danger-default`
**Page-level error sections.**

```html
<section class="sgds:bg-danger-default">
  <div>
    <h2>Error Occurred</h2>
    <p>There was a problem processing your request</p>
  </div>
</section>
```

#### `sgds:bg-danger-muted`
**Subtle error background.**

```html
<div class="sgds:bg-danger-muted">
  <p>Subtle error indicator</p>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-danger-surface-default`
**Standard error component backgrounds.**

**When to use:**
- Error alerts
- Validation error messages
- Failed state indicators
- Destructive action confirmations

```html
<div class="sgds:bg-danger-surface-default">
  <p>Error</p>
  <p>Something went wrong. Please try again</p>
</div>
```

#### `sgds:bg-danger-surface-emphasis`
**Emphasized error component.**

```html
<div class="sgds:bg-danger-surface-emphasis">
  Critical error - immediate attention required
</div>
```

#### `sgds:bg-danger-surface-muted`
**Subtle error component.**

```html
<span class="sgds:bg-danger-surface-muted">
  Failed
</span>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Error Alert

```html
<div class="sgds:bg-danger-surface-default">
  <div>
    <svg><!-- error icon --></svg>
    <div>
      <p>Error</p>
      <p>Failed to update profile. Please check your input and try again</p>
    </div>
  </div>
</div>
```

### Form Error State

```html
<div>
  <label>Password</label>
  <input
    type="password"
  />
  <p>
    <svg><!-- error icon --></svg>
    Password is required
  </p>
</div>
```

### Error Badge

```html
<span class="sgds:bg-danger-surface-default">
  <svg><!-- X icon --></svg>
  Failed
</span>
```

### Destructive Action Confirmation

```html
<div class="sgds:bg-danger-surface-default">
  <h3>Delete Account</h3>
  <p>
    This action cannot be undone. All your data will be permanently deleted.
  </p>
  <div>
    <button>
      Cancel
    </button>
    <button class="sgds:bg-danger-default">
      Delete Account
    </button>
  </div>
</div>
```

### Error Banner (Full Width)

```html
<div class="sgds:bg-danger-surface-default">
  <div>
    <p>
      ✗ Payment failed. Please update your payment method
    </p>
    <button>Update</button>
  </div>
</div>
```

## Best Practices

### ✅ DO: Use for Error States

```html
<!-- ✅ Good - indicates error -->
<div class="sgds:bg-danger-surface-default">
  Error occurred
</div>
```

### ✅ DO: Pair with Error Icons

```html
<!-- ✅ Good - clear error indication -->
<div class="sgds:bg-danger-surface-default">
  <svg><!-- error icon --></svg>
  <span>Operation failed</span>
</div>
```

### ✅ DO: Use for Destructive Actions

```html
<!-- ✅ Good - warns users about destructive action -->
<button class="sgds:bg-danger-default">
  Delete Forever
</button>
```

### ✅ DO: Use Emphasis for Critical Errors

```html
<!-- ✅ Good - emphasizes critical error -->
<div class="sgds:bg-danger-surface-emphasis">
  Critical system error
</div>
```

### ❌ DON'T: Use for Non-Error States

```html
<!-- ❌ Avoid - danger color for success -->
<div class="sgds:bg-danger-surface-default">
  Success message (wrong color)
</div>

<!-- ✅ Better - success for success -->
<div class="sgds:bg-success-surface-default">
  Success message
</div>
```

### ❌ DON'T: Overuse Danger Colors

```html
<!-- ❌ Avoid - everything is danger (causes alarm fatigue) -->
<div class="sgds:bg-danger-surface-default">
  Regular content (not an error)
</div>

<!-- ✅ Better - save danger for actual errors -->
<div>
  Regular content
</div>
```

## See Also

- **success.md** - Positive feedback
- **warning.md** - Caution messages
- **form.md** - Form validation states
