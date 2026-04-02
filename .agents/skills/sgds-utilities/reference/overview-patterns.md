# Overview — Common Component Patterns Reference

These patterns show how multiple SGDS utility categories combine in realistic UI components. Each example is annotated with which utility categories are used.

## Card Component

```html
<div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-lg sgds:p-6">
  <h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:mb-4">
    Card Title
  </h3>
  <p class="sgds:text-body-default sgds:mb-4">Card description text</p>
  <button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded">
    Action
  </button>
</div>
```

**Uses:** background-color, border-color, border-radius, spacing, text-color, typography

## Alert Banner

```html
<div class="sgds:bg-warning-surface-default sgds:border-l-4 sgds:border-warning-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-warning-default sgds:font-semibold sgds:mb-1">Warning</p>
  <p class="sgds:text-warning-default sgds:text-sm">Please review your input.</p>
</div>
```

**Uses:** background-color, border-color, border-width, spacing, text-color, typography

## Form Input with Validation

```html
<!-- Success state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2 sgds:font-medium">Email</label>
  <input class="sgds:border-2 sgds:border-success-default sgds:bg-surface-default sgds:p-2 sgds:rounded sgds:w-full">
  <p class="sgds:text-success-default sgds:text-sm sgds:mt-1">Valid email address</p>
</div>

<!-- Error state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2 sgds:font-medium">Password</label>
  <input class="sgds:border-2 sgds:border-danger-default sgds:bg-surface-default sgds:p-2 sgds:rounded sgds:w-full">
  <p class="sgds:text-danger-default sgds:text-sm sgds:mt-1">Password is required</p>
</div>
```

**Uses:** text-color, border-color, border-width, background-color, spacing, typography

## Modal with Overlay

```html
<!-- Overlay -->
<div class="sgds:fixed sgds:inset-0 sgds:bg-fixed-dark sgds:opacity-50"></div>

<!-- Modal -->
<div class="sgds:fixed sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center">
  <div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-xl sgds:p-6 sgds:max-w-lg">
    <h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:mb-4">Modal Title</h2>
    <p class="sgds:text-body-default sgds:mb-6">Modal content</p>
    <div class="sgds:flex sgds:gap-2 sgds:justify-end">
      <button class="sgds:px-4 sgds:py-2 sgds:rounded sgds:border sgds:border-default">Cancel</button>
      <button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded">Confirm</button>
    </div>
  </div>
</div>
```

**Uses:** opacity, background-color, border-color, border-radius, spacing, text-color, typography
