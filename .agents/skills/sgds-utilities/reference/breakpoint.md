# SGDS Breakpoint Utilities

Helps developers apply responsive styles using SGDS breakpoint prefixes.

## Syntax

With the `sgds` Tailwind prefix, responsive variants go **after** the prefix:

```
sgds:<breakpoint>:<utility>
```

**Correct:** `sgds:sm:hidden`, `sgds:lg:flex-row`, `sgds:md:grid-cols-3`

**Wrong:** `sm:sgds:hidden`, `lg:sgds:flex-row` (variant before prefix does NOT work)

## Available Breakpoints

| Prefix | CSS Variable | Min-width |
|--------|-------------|-----------|
| `sgds:xs:` | `--sgds-breakpoint-xs` | 320px |
| `sgds:sm:` | `--sgds-breakpoint-sm` | 512px |
| `sgds:md:` | `--sgds-breakpoint-md` | 768px |
| `sgds:lg:` | `--sgds-breakpoint-lg` | 1024px |
| `sgds:xl:` | `--sgds-breakpoint-xl` | 1280px |
| `sgds:2-xl:` | `--sgds-breakpoint-2-xl` | 1440px |

## How It Works

Breakpoints are mobile-first (`min-width`). A class like `sgds:md:hidden` applies `display: none` at 768px and above.

Stack breakpoints from smallest to largest — each overrides the previous:

```html
<div class="sgds:grid sgds:grid-cols-1 sgds:sm:grid-cols-2 sgds:lg:grid-cols-4">
```

## Common Patterns

| Pattern | Example |
|---------|---------|
| Responsive columns | `sgds:grid sgds:grid-cols-1 sgds:sm:grid-cols-2 sgds:lg:grid-cols-4` |
| Stack to row | `sgds:flex sgds:flex-col sgds:md:flex-row` |
| Show at breakpoint | `sgds:hidden sgds:md:inline-flex` |
| Hide at breakpoint | `sgds:block sgds:lg:hidden` |
| Responsive padding | `sgds:p-sm sgds:md:p-lg sgds:xl:p-2-xl` |
| Responsive gap | `sgds:gap-xs sgds:md:gap-md sgds:xl:gap-xl` |

---

**For AI Agents**: Always place the breakpoint variant after the `sgds:` prefix (`sgds:md:flex-row`), never before it. This is a Tailwind v4 prefix requirement. All standard Tailwind utilities support responsive variants with this syntax.
