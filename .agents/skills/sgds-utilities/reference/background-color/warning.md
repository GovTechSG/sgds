# Warning Background Colors Reference

**Meaning**: Caution, attention needed, important notices
**Usage**: Warning messages, important notices, actions requiring attention

## Design Semantics

- **Warning = Caution / Attention**
- Use for operations requiring attention, important notices
- Indicates caution, potential issues, non-critical problems
- Alerts users without causing alarm

## Available Tokens

### Page Level

#### `sgds:bg-warning-default`
**Page-level warning sections.**

```html
<section class="sgds:bg-warning-default">
  <div>
    <h2>Important Notice</h2>
    <p>Please review the following information carefully</p>
  </div>
</section>
```

#### `sgds:bg-warning-muted`
**Subtle warning background.**

```html
<div class="sgds:bg-warning-muted">
  <p>Subtle warning message</p>
</div>
```

### Component Level (`surface`)

#### `sgds:bg-warning-surface-default`
**Standard warning component backgrounds.**

**When to use:**
- Warning alerts
- Important notices
- Actions requiring review
- Potential issues or conflicts

```html
<div class="sgds:bg-warning-surface-default">
  <p>Warning</p>
  <p>Please review your input before proceeding</p>
</div>
```

#### `sgds:bg-warning-surface-emphasis`
**Emphasized warning component.**

```html
<div class="sgds:bg-warning-surface-emphasis">
  Important: Action required
</div>
```

#### `sgds:bg-warning-surface-muted`
**Subtle warning component.**

```html
<span class="sgds:bg-warning-surface-muted">
  Pending
</span>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Warning Alert

```html
<div class="sgds:bg-warning-surface-default">
  <div>
    <svg><!-- warning icon --></svg>
    <div>
      <p>Warning</p>
      <p>This action may affect existing data. Please proceed with caution</p>
    </div>
  </div>
</div>
```

### Form Warning

```html
<div>
  <label>Username</label>
  <input
    value="user123"
  />
  <p>
    <svg><!-- warning icon --></svg>
    Username is already taken
  </p>
</div>
```

### Warning Badge

```html
<span class="sgds:bg-warning-surface-default">
  <svg><!-- warning icon --></svg>
  Pending Review
</span>
```

### Confirmation Dialog with Warning

```html
<div class="sgds:bg-warning-surface-default">
  <h3>Confirm Action</h3>
  <p>
    This will modify existing records. Are you sure you want to proceed?
  </p>
  <div>
    <button>
      Cancel
    </button>
    <button class="sgds:bg-warning-default">
      Proceed
    </button>
  </div>
</div>
```

### Warning Banner (Full Width)

```html
<div class="sgds:bg-warning-surface-default">
  <div>
    <p>
      ⚠ Scheduled maintenance on Sunday. Service may be interrupted
    </p>
    <button>Learn More</button>
  </div>
</div>
```

### Deprecation Notice

```html
<div class="sgds:bg-warning-surface-muted">
  <p>Deprecated</p>
  <p>
    This API version will be deprecated on Dec 31, 2024. Please migrate to v2.
  </p>
</div>
```

## Best Practices

### ✅ DO: Use for Caution Messages

```html
<!-- ✅ Good - warns user about potential issue -->
<div class="sgds:bg-warning-surface-default">
  Please review before continuing
</div>
```

### ✅ DO: Pair with Warning Icons

```html
<!-- ✅ Good - clear warning indication -->
<div class="sgds:bg-warning-surface-default">
  <svg><!-- warning icon --></svg>
  <span>Caution required</span>
</div>
```

### ✅ DO: Use for Actions Requiring Review

```html
<!-- ✅ Good - confirms user wants to proceed -->
<button class="sgds:bg-warning-default">
  Proceed with Caution
</button>
```

### ✅ DO: Use for Non-Critical Issues

```html
<!-- ✅ Good - warns but not critical -->
<div class="sgds:bg-warning-surface-default">
  Some features may not work as expected
</div>
```

### ❌ DON'T: Use for Errors

```html
<!-- ❌ Avoid - warning for errors -->
<div class="sgds:bg-warning-surface-default">
  Critical error occurred (use danger instead)
</div>

<!-- ✅ Better - danger for errors -->
<div class="sgds:bg-danger-surface-default">
  Critical error occurred
</div>
```

### ❌ DON'T: Use for Success

```html
<!-- ❌ Avoid - warning for success -->
<div class="sgds:bg-warning-surface-default">
  Successfully completed (use success instead)
</div>

<!-- ✅ Better - success for success -->
<div class="sgds:bg-success-surface-default">
  Successfully completed
</div>
```

## See Also

- **success.md** - Positive feedback
- **danger.md** - Error/critical states
- **form.md** - Form validation states
