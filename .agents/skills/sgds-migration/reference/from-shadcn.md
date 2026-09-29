# Migration Mapping: shadcn/ui (Radix) to SGDS Web Components

## Overview

shadcn/ui components are built on Radix UI primitives with Tailwind CSS styling. Migration involves:
1. Replacing Radix primitives with SGDS web components
2. Moving from `cn()` + Tailwind classes to `sgds:` prefixed utilities
3. Replacing `forwardRef` composition with SGDS's built-in component structure

---

## Component Mapping

| shadcn/Radix Component | SGDS Web Component | React Import Path |
|---|---|---|
| `<Input>` | `<SgdsInput>` | `react/input/index.js` |
| `<Textarea>` | `<SgdsTextarea>` | `react/textarea/index.js` |
| `<Select>` (Radix Select) | `<SgdsSelect>` + `<SgdsSelectOption>` | `react/select/index.js` |
| `<Combobox>` / `<Command>` | `<SgdsComboBox>` + `<SgdsComboBoxOption>` | `react/combo-box/index.js` |
| `<Checkbox>` | `<SgdsCheckbox>` | `react/checkbox/index.js` |
| `<RadioGroup>` + `<RadioGroupItem>` | `<SgdsRadioGroup>` + `<SgdsRadio>` | `react/radio-group/index.js` |
| `<Switch>` | `<SgdsSwitch>` | `react/switch/index.js` |
| `<Button>` | `<SgdsButton>` | `react/button/index.js` |
| `<Dialog>` | `<sgds-modal>` | Use lowercase tag |
| `<Sheet>` | `<SgdsDrawer>` | `react/drawer/index.js` |
| `<Table>` | `<SgdsTable>` + row/head/cell | `react/table/index.js` |
| `<Tabs>` | `<SgdsTab>` | `react/tab/index.js` |
| `<Accordion>` | `<SgdsAccordion>` | `react/accordion/index.js` |
| `<Tooltip>` | `<SgdsTooltip>` | `react/tooltip/index.js` |
| `<Badge>` | `<SgdsBadge>` | `react/badge/index.js` |
| `<Alert>` | `<sgds-alert>` | Use lowercase tag |
| `<Breadcrumb>` | `<SgdsBreadcrumb>` + `<SgdsBreadcrumbItem>` | `react/breadcrumb/index.js` |
| `<Pagination>` | `<SgdsPagination>` | `react/pagination/index.js` |
| `<DropdownMenu>` | `<SgdsOverflowMenu>` | `react/overflow-menu/index.js` |
| `<Skeleton>` | `<SgdsSkeleton>` | `react/skeleton/index.js` |
| `<Spinner>` / `<Loader>` | `<SgdsSpinner>` | `react/spinner/index.js` |
| `<Progress>` | `<SgdsProgressBar>` | `react/progress-bar/index.js` |
| `<Toast>` / `<Sonner>` | `<SgdsToast>` | `react/toast/index.js` |

---

## Props Mapping

### Input (shadcn) to SgdsInput

| shadcn prop | SGDS prop | Notes |
|---|---|---|
| `value` | `value` | Same |
| `onChange` | `onSgdsInput` | Use for real-time input |
| `onBlur` | `onSgdsBlur` | Same concept |
| `disabled` | `disabled` | Same |
| `placeholder` | `placeholder` | Same |
| `type` | `type` | Same |
| `className` | `className` | Replace Tailwind classes with `sgds:` prefixed |
| N/A | `label` | Built-in - replaces separate `<Label>` component |
| N/A | `hintText` | Built-in - replaces separate description text |
| N/A | `hasFeedback` | Enables validation UI |
| N/A | `invalidFeedback` | Error message text |
| N/A | `prefix` / `suffix` | Input adornments |

### Select (shadcn/Radix) to SgdsSelect

```tsx
// BEFORE (shadcn)
<Select onValueChange={field.onChange} defaultValue={field.value}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// AFTER (SGDS)
<SgdsSelect
  label="Label"
  value={field.value}
  onSgdsChange={(e: any) => field.onChange(e.target.value)}
>
  <SgdsSelectOption value="option1">Option 1</SgdsSelectOption>
  <SgdsSelectOption value="option2">Option 2</SgdsSelectOption>
</SgdsSelect>
```

### Checkbox (shadcn/Radix) to SgdsCheckbox

```tsx
// BEFORE (shadcn)
<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={field.value}
    onCheckedChange={field.onChange}
  />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// AFTER (SGDS)
<SgdsCheckbox
  checked={!!field.value}
  onSgdsChange={(e: any) => field.onChange(e.target.checked)}
>
  Accept terms
</SgdsCheckbox>
```

### RadioGroup (shadcn/Radix) to SgdsRadioGroup

```tsx
// BEFORE (shadcn)
<RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>

// AFTER (SGDS)
<SgdsRadioGroup
  value={field.value}
  onSgdsChange={(e: any) => field.onChange(e.target.value)}
>
  <SgdsRadio value="option1">Option 1</SgdsRadio>
  <SgdsRadio value="option2">Option 2</SgdsRadio>
</SgdsRadioGroup>
```

### Dialog (shadcn/Radix) to sgds-modal

```tsx
// BEFORE (shadcn)
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {children}
    <DialogFooter>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// AFTER (SGDS)
{createPortal(
  <sgds-modal open={open} onsgds-close={() => setOpen(false)}>
    <div slot="title">Title</div>
    {children}
    <div slot="footer" className="sgds:flex sgds:gap-2">
      <sgds-button variant="outline" onClick={handleCancel}>Cancel</sgds-button>
      <sgds-button variant="primary" onClick={handleConfirm}>Confirm</sgds-button>
    </div>
  </sgds-modal>,
  document.body
)}
```

### Button Variants

| shadcn variant | SGDS equivalent |
|---|---|
| `variant="default"` | `variant="primary"` |
| `variant="secondary"` | `variant="outline"` |
| `variant="destructive"` | `variant="primary" tone="danger"` |
| `variant="outline"` | `variant="outline"` |
| `variant="ghost"` | `variant="ghost"` |
| `variant="link"` | `variant="ghost"` + text styling |
| `size="sm"` | `size="sm"` |
| `size="lg"` | `size="lg"` |

---

## Form Integration (React Hook Form)

shadcn typically uses a `<Form>` wrapper from `react-hook-form`. Replace with SGDS's `Controller` pattern:

```tsx
// BEFORE (shadcn Form abstraction)
<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="Enter username" {...field} />
      </FormControl>
      <FormDescription>Your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

// AFTER (SGDS)
<Controller
  control={control}
  name="username"
  render={({ field, fieldState }) => (
    <SgdsInput
      label="Username"
      placeholder="Enter username"
      hintText="Your public display name."
      value={field.value ?? ''}
      onSgdsInput={(e: any) => field.onChange(e.target.value)}
      onSgdsBlur={() => field.onBlur()}
      hasFeedback="both"
      noValidate
      ref={(el) => {
        if (el) {
          el.setInvalid(!!fieldState.error);
          el.invalidFeedback = fieldState.error?.message ?? '';
        }
      }}
    />
  )}
/>
```

---

## CSS Migration

| shadcn/Tailwind pattern | SGDS equivalent |
|---|---|
| `className={cn("flex gap-2", className)}` | `className="sgds:flex sgds:gap-component-xs"` |
| `text-sm text-muted-foreground` | `sgds:text-body-sm sgds:text-body-secondary` |
| `text-destructive` | `sgds:text-danger-default` |
| `border rounded-md` | `sgds:border sgds:rounded-md` |
| `p-4` | `sgds:p-component-sm` |
| `space-y-2` | `sgds:flex sgds:flex-col sgds:gap-component-xs` |
| `grid grid-cols-2` | `sgds:grid sgds:grid-cols-2` |

---

## Removed Concepts

| shadcn pattern | SGDS replacement |
|---|---|
| `<Label>` component | Built-in `label` prop |
| `<FormDescription>` | Built-in `hintText` prop |
| `<FormMessage>` | Built-in `invalidFeedback` prop |
| `cn()` utility | Direct `sgds:` class strings |
| `cva()` variants | SGDS component `variant` / `tone` props |
| Radix `asChild` | Not applicable - SGDS components render their own DOM |
| Radix Portal | Web components handle their own rendering layer |
| `forwardRef` composition | Direct component usage (web components have refs built-in) |
