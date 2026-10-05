# CSS Utilities Migration

All SGDS utility classes use the `sgds:` prefix (Tailwind v4 namespace). This prevents conflicts with other CSS frameworks during incremental migration.

```tsx
// Correct
className="sgds:flex sgds:gap-2 sgds:items-center"

// Wrong - no prefix
className="flex gap-2 items-center"
```

---

## SGDS Spacing Tokens

SGDS uses semantic spacing tokens instead of numeric scales:

| Token | Usage | Approx px |
|---|---|---|
| `layout-xs` | Tight layout spacing | 8px |
| `layout-sm` | Small layout gaps | 16px |
| `layout-md` | Medium layout padding | 24px |
| `layout-lg` | Large layout gaps | 32px |
| `component-xs` | Tight component spacing | 4px |
| `component-sm` | Small component padding | 8px |
| `component-md` | Medium component gaps | 12px |
| `component-lg` | Large component spacing | 16px |
| `text-md` | Text inline spacing | 8px |

### Usage

```tsx
// Padding
className="sgds:p-component-sm"     // padding: 8px
className="sgds:py-layout-md"       // padding-y: 24px
className="sgds:px-layout-xs"       // padding-x: 8px

// Margin
className="sgds:mt-layout-sm"       // margin-top: 16px
className="sgds:mb-3"               // numeric also works

// Gap
className="sgds:gap-layout-xs"      // gap: 8px (between cards)
className="sgds:gap-component-xs"   // gap: 4px (between buttons)
className="sgds:gap-component-md"   // gap: 12px
```

---

## Bootstrap to SGDS

| Bootstrap | SGDS |
|---|---|
| `mb-3` | `sgds:mb-3` |
| `p-4` | `sgds:p-component-sm` or `sgds:p-4` |
| `d-flex` | `sgds:flex` |
| `flex-column` | `sgds:flex-col` |
| `align-items-center` | `sgds:items-center` |
| `justify-content-between` | `sgds:justify-between` |
| `gap-2` | `sgds:gap-component-xs` |
| `w-100` | `sgds:w-full` |
| `h-100` | `sgds:h-full` |
| `text-danger` | `sgds:text-danger-default` |
| `fw-bold` | `sgds:font-bold` |
| `fs-6` | `sgds:text-body-sm` |
| `bg-white` | `sgds:bg-surface-default` |
| `rounded` | `sgds:rounded-md` |
| `shadow-sm` | `sgds:shadow` |

---

## Tailwind (unprefixed) to SGDS

| Tailwind | SGDS |
|---|---|
| `flex` | `sgds:flex` |
| `flex-col` | `sgds:flex-col` |
| `flex-wrap` | `sgds:flex-wrap` |
| `flex-1` | `sgds:flex-1` |
| `items-center` | `sgds:items-center` |
| `items-stretch` | `sgds:items-stretch` |
| `justify-between` | `sgds:justify-between` |
| `justify-center` | `sgds:justify-center` |
| `gap-2` | `sgds:gap-component-xs` |
| `gap-4` | `sgds:gap-layout-xs` |
| `p-4` | `sgds:p-component-sm` |
| `py-4` | `sgds:py-layout-md` |
| `mt-2` | `sgds:mt-2` |
| `w-full` | `sgds:w-full` |
| `h-full` | `sgds:h-full` |
| `min-w-0` | `sgds:min-w-0` |
| `grid grid-cols-3` | `sgds:grid sgds:grid-cols-3` |
| `grid grid-cols-12` | `sgds:grid sgds:grid-cols-12` |
| `col-span-2` | `sgds:col-span-2` |
| `text-sm` | `sgds:text-body-sm` |
| `font-bold` | `sgds:font-bold` |
| `text-red-500` | `sgds:text-danger-default` |
| `text-gray-500` | `sgds:text-body-secondary` |
| `bg-white` | `sgds:bg-surface-default` |
| `bg-gray-100` | `sgds:bg-alternate` |
| `rounded-md` | `sgds:rounded-md` |
| `shadow` | `sgds:shadow` |
| `border` | `sgds:border` |
| `border-0` | `sgds:border-0` |
| `cursor-pointer` | `sgds:cursor-pointer` |
| `sticky top-0` | `sgds:sticky sgds:top-0` |
| `z-50` | `sgds:z-100` |
| `relative` | `sgds:relative` |
| `absolute` | `sgds:absolute` |

---

## MUI sx Props to SGDS

| MUI sx prop | SGDS utility |
|---|---|
| `p: 2` | `sgds:p-component-xs` |
| `m: 2` | `sgds:m-2` |
| `display: 'flex'` | `sgds:flex` |
| `gap: 2` | `sgds:gap-component-xs` |
| `width: '100%'` | `sgds:w-full` |
| `fontWeight: 'bold'` | `sgds:font-bold` |
| `fontSize: 'sm'` | `sgds:text-body-sm` |
| `color: 'error.main'` | `sgds:text-danger-default` |
| `bgcolor: 'grey.100'` | `sgds:bg-alternate` |

---

## Chakra Style Props to SGDS

| Chakra style prop | SGDS utility |
|---|---|
| `p={4}` | `sgds:p-component-sm` |
| `px={4}` | `sgds:px-component-sm` |
| `mt={2}` | `sgds:mt-2` |
| `mb={4}` | `sgds:mb-4` |
| `gap={2}` | `sgds:gap-component-xs` |
| `w="full"` | `sgds:w-full` |
| `h="100%"` | `sgds:h-full` |
| `display="flex"` | `sgds:flex` |
| `flexDirection="column"` | `sgds:flex-col` |
| `alignItems="center"` | `sgds:items-center` |
| `justifyContent="space-between"` | `sgds:justify-between` |
| `fontSize="sm"` | `sgds:text-body-sm` |
| `fontWeight="bold"` | `sgds:font-bold` |
| `color="red.500"` | `sgds:text-danger-default` |
| `bg="gray.100"` | `sgds:bg-alternate` |
| `borderRadius="md"` | `sgds:rounded-md` |
| `shadow="md"` | `sgds:shadow` |

---

## Typography

| Purpose | SGDS class |
|---|---|
| Page title (H1) | `sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight` |
| Section heading (H2) | `sgds:text-heading-lg sgds:font-bold` |
| Sub-heading (H3) | `sgds:text-heading-md sgds:font-bold` |
| Body text | `sgds:text-body-md` (default) |
| Small text | `sgds:text-body-sm` |
| Caption/label | `sgds:text-14` |

### Text Colors

| Purpose | SGDS class |
|---|---|
| Default heading | `sgds:text-heading-default` |
| Body text | (default, no class needed) |
| Secondary/muted | `sgds:text-body-secondary` |
| Link | `sgds:text-link-default` |
| Error/danger | `sgds:text-danger-default` |
| Success | `sgds:text-success-default` |
| Warning | `sgds:text-warning-default` |

---

## Background Colors

| Purpose | SGDS class |
|---|---|
| Default surface | `sgds:bg-surface-default` |
| Alternate/grey bg | `sgds:bg-alternate` |
| Transparent | `sgds:bg-transparent` |

---

## Responsive Breakpoints

Same as Tailwind - prefix with breakpoint:

```tsx
className="sgds:col-span-12 sgds:md:col-span-4"     // full on mobile, 4/12 on medium+
className="sgds:flex-wrap sgds:xl:flex-nowrap"       // wrap on small, nowrap on xl
```
