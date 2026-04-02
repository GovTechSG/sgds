# Text Color — Typography Role Tokens Reference

Typography role tokens assign color specifically by content role. They are more semantically precise than the base tokens (`text-default`, `text-subtle`) and should be the first choice for structured document content.

## Available Tokens

| Token | Role | When to use |
|---|---|---|
| `sgds:text-display-default` | Hero headlines | Page-level display title, above H1 scale |
| `sgds:text-heading-default` | Section headings | H1–H4 section titles |
| `sgds:text-body-default` | Primary body copy | Paragraphs, descriptions |
| `sgds:text-body-subtle` | Secondary body copy | Captions, metadata, footnotes |
| `sgds:text-label-default` | UI labels | Form labels, field names, table headers |
| `sgds:text-link-default` | Link default state | `<a>` elements at rest |
| `sgds:text-link-emphasis` | Link hover/active | `<a>` elements on hover or focus |

## Token Details

### `sgds:text-display-default`
Hero-level headline, typically displayed at the largest scale (`sgds:text-5-xl` or `sgds:text-4-xl`).

```html
<h1 class="sgds:text-display-default sgds:text-5-xl sgds:font-bold sgds:leading-tight">
  Singapore Government Design System
</h1>
```

### `sgds:text-heading-default`
Standard heading for section and sub-section titles.

```html
<h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold">
  Section Heading
</h2>

<h3 class="sgds:text-heading-default sgds:text-xl sgds:font-semibold">
  Sub-section Heading
</h3>

<h4 class="sgds:text-heading-default sgds:text-lg sgds:font-medium">
  Group Heading
</h4>
```

### `sgds:text-body-default`
Primary body copy.

```html
<p class="sgds:text-body-default sgds:leading-relaxed">
  Main article or panel text. Used wherever the reading experience is the primary goal.
</p>
```

### `sgds:text-body-subtle`
Secondary body copy. Lower visual weight than `body-default`.

```html
<p class="sgds:text-body-subtle sgds:text-sm">
  Published on 1 January 2024 — 5 min read
</p>

<figcaption class="sgds:text-body-subtle sgds:text-sm sgds:mt-2">
  Figure 1: System architecture overview.
</figcaption>
```

### `sgds:text-label-default`
UI label for form fields, table column headers, and identifiers.

```html
<label class="sgds:text-label-default sgds:block sgds:font-medium sgds:mb-2">
  Full name
</label>

<th class="sgds:text-label-default sgds:font-semibold sgds:text-sm">
  Date submitted
</th>
```

### `sgds:text-link-default` / `sgds:text-link-emphasis`
Link text colors. Use `default` at rest and `emphasis` for hover and focus states.

```html
<!-- Inline link -->
<a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis sgds:underline">
  View full report
</a>

<!-- Navigation link -->
<nav>
  <a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis">
    About
  </a>
</nav>
```

## Content Hierarchy Pattern

Combines all typography role tokens in a realistic page structure:

```html
<main>
  <!-- Page hero -->
  <section class="sgds:mb-12">
    <h1 class="sgds:text-display-default sgds:text-5-xl sgds:font-bold sgds:leading-tight sgds:mb-4">
      Digital Services for Singapore
    </h1>
    <p class="sgds:text-body-default sgds:text-xl sgds:leading-relaxed">
      A unified design language for all government digital products.
    </p>
  </section>

  <!-- Article section -->
  <article class="sgds:mb-8">
    <h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:mb-2">
      Getting Started
    </h2>
    <p class="sgds:text-body-subtle sgds:text-sm sgds:mb-4">
      Updated 15 March 2024
    </p>
    <p class="sgds:text-body-default sgds:leading-relaxed sgds:mb-4">
      Install SGDS and configure your Tailwind setup to start using components and utilities.
    </p>
    <a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis sgds:underline sgds:text-sm">
      Read the setup guide →
    </a>
  </article>
</main>
```

## Card Pattern

```html
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <h3 class="sgds:text-heading-default sgds:text-xl sgds:font-semibold sgds:mb-2">
    Card Title
  </h3>
  <p class="sgds:text-body-subtle sgds:text-sm sgds:mb-4">
    Updated 2 hours ago
  </p>
  <p class="sgds:text-body-default sgds:mb-4">
    Main card description providing the key information at a glance.
  </p>
  <a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis sgds:text-sm">
    Read more →
  </a>
</div>
```

## Form Pattern

```html
<form class="sgds:flex sgds:flex-col sgds:gap-4">
  <div>
    <label class="sgds:text-label-default sgds:block sgds:font-medium sgds:mb-2">
      Email address
    </label>
    <input type="email" class="sgds:border sgds:p-2 sgds:rounded sgds:w-full">
  </div>
  <div>
    <label class="sgds:text-label-default sgds:block sgds:font-medium sgds:mb-2">
      Password
    </label>
    <input type="password" class="sgds:border sgds:p-2 sgds:rounded sgds:w-full">
    <p class="sgds:text-body-subtle sgds:text-xs sgds:mt-1">
      Minimum 8 characters
    </p>
  </div>
  <p class="sgds:text-body-subtle sgds:text-sm">
    By signing in you agree to our
    <a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis sgds:underline">Terms of Use</a>.
  </p>
</form>
```

## Best Practices

- Use `sgds:text-heading-default` for ALL heading levels (H1–H4) — differentiate by font size and weight, not by colour.
- Prefer `sgds:text-body-subtle` over `sgds:text-muted` for secondary body copy: `subtle` is designed for readable supporting text while `muted` is for decorative / non-essential labels.
- Always pair `text-link-default` with `hover:sgds:text-link-emphasis` to provide a clear interactive state.
- SGDS components (`<sgds-*>`) apply typography role tokens internally — use these utilities only for custom HTML structures.
