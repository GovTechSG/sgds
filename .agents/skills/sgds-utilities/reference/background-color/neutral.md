# Neutral Background Colors Reference

**Meaning**: No semantic meaning - equal importance
**Usage**: Tags with equal importance, non-semantic categorization

## Design Semantics

- **Neutral = Equal Importance / No Meaning**
- No inherent semantic meaning
- All items tagged with neutral have equal importance
- Use when you don't want to imply priority or meaning
- Different from purple/cyan: neutral emphasizes *no differentiation*

## Available Tokens

### Component Level (`surface`)

#### `sgds:bg-neutral-surface-default`
**Standard neutral component backgrounds.**

**When to use:**
- Tags with equal importance
- Non-semantic categorization
- Items that should not stand out
- Uniform appearance across multiple items

```html
<div class="sgds:bg-neutral-surface-default">
  <p>Neutral Component</p>
</div>
```

#### `sgds:bg-neutral-surface-emphasis`
**Emphasized neutral component.**

```html
<div class="sgds:bg-neutral-surface-emphasis">
  Emphasized neutral
</div>
```

#### `sgds:bg-neutral-surface-muted`
**Subtle neutral component.**

```html
<span class="sgds:bg-neutral-surface-muted">
  Tag
</span>
```

## Common Patterns

> **Note**: Use library components like `<sgds-card>`, `<sgds-button>`, `<sgds-alert>`, `<sgds-badge>` when available. Component-level (`surface`) tokens are for creating custom components when library components don't meet your needs.

### Equal Importance Tags

```html
<!-- All tags have equal importance -->
<div>
  <span class="sgds:bg-neutral-surface-default">
    JavaScript
  </span>
  <span class="sgds:bg-neutral-surface-default">
    Python
  </span>
  <span class="sgds:bg-neutral-surface-default">
    Java
  </span>
  <span class="sgds:bg-neutral-surface-default">
    TypeScript
  </span>
</div>
```

### Attribute Badges

```html
<div>
  <span class="sgds:bg-neutral-surface-default">
    Full-time
  </span>
  <span class="sgds:bg-neutral-surface-default">
    Remote
  </span>
  <span class="sgds:bg-neutral-surface-default">
    5+ years
  </span>
</div>
```

### Metadata Tags

```html
<div>
  <span class="sgds:bg-neutral-surface-muted">
    Posted: Jan 15, 2024
  </span>
  <span class="sgds:bg-neutral-surface-muted">
    Author: John Doe
  </span>
  <span class="sgds:bg-neutral-surface-muted">
    5 min read
  </span>
</div>
```

### Filter Chips (Uniform)

```html
<div>
  <button class="sgds:bg-neutral-surface-default">
    <span>JavaScript</span>
    <svg><!-- X icon --></svg>
  </button>
  <button class="sgds:bg-neutral-surface-default">
    <span>Senior</span>
    <svg><!-- X icon --></svg>
  </button>
</div>
```

### Skill Tags

```html
<div>
  <h3>Skills</h3>
  <div>
    <span class="sgds:bg-neutral-surface-default">React</span>
    <span class="sgds:bg-neutral-surface-default">Node.js</span>
    <span class="sgds:bg-neutral-surface-default">PostgreSQL</span>
    <span class="sgds:bg-neutral-surface-default">Docker</span>
    <span class="sgds:bg-neutral-surface-default">AWS</span>
  </div>
</div>
```

### List Item Labels

```html
<ul>
  <li>
    <span class="sgds:bg-neutral-surface-muted">
      2024
    </span>
    <span>Event Name</span>
  </li>
  <li>
    <span class="sgds:bg-neutral-surface-muted">
      2023
    </span>
    <span>Previous Event</span>
  </li>
</ul>
```

## Best Practices

### ✅ DO: Use for Equal Importance

```html
<!-- ✅ Good - all items equal importance -->
<div>
  <span class="sgds:bg-neutral-surface-default">Tag 1</span>
  <span class="sgds:bg-neutral-surface-default">Tag 2</span>
  <span class="sgds:bg-neutral-surface-default">Tag 3</span>
</div>
```

### ✅ DO: Use for Non-Semantic Metadata

```html
<!-- ✅ Good - metadata with no meaning -->
<div>
  <span class="sgds:bg-neutral-surface-muted">
    Jan 15
  </span>
  <span class="sgds:bg-neutral-surface-muted">
    10 min read
  </span>
</div>
```

### ✅ DO: Use for Uniform Appearance

```html
<!-- ✅ Good - consistent appearance across all tags -->
<div>
  <span class="sgds:bg-neutral-surface-default">HTML</span>
  <span class="sgds:bg-neutral-surface-default">CSS</span>
  <span class="sgds:bg-neutral-surface-default">JS</span>
</div>
```

### ❌ DON'T: Use When Visual Variety is Needed

```html
<!-- ❌ Avoid - neutral for visual distinction -->
<span class="sgds:bg-neutral-surface-default">Design</span>
<span class="sgds:bg-neutral-surface-default">Development</span>

<!-- ✅ Better - use purple/cyan for variety -->
<span class="sgds:bg-purple-surface-default">Design</span>
<span class="sgds:bg-cyan-surface-default">Development</span>
```

### ❌ DON'T: Use for Semantic States

```html
<!-- ❌ Avoid - neutral for status -->
<span class="sgds:bg-neutral-surface-default">Completed</span>

<!-- ✅ Better - success for completed status -->
<span class="sgds:bg-success-surface-default">Completed</span>
```

### ❌ DON'T: Mix with Colored Tags for Same Purpose

```html
<!-- ❌ Avoid - mixing neutral with colored tags -->
<div>
  <span class="sgds:bg-neutral-surface-default">Tag 1</span>
  <span class="sgds:bg-purple-surface-default">Tag 2</span>
</div>

<!-- ✅ Better - consistent approach -->
<div>
  <span class="sgds:bg-neutral-surface-default">Tag 1</span>
  <span class="sgds:bg-neutral-surface-default">Tag 2</span>
</div>
```

## Neutral vs Purple/Cyan

**Use neutral when:**
- All items should have equal visual weight
- You want uniform appearance across tags
- No differentiation or variety is needed

**Use purple/cyan when:**
- You want visual variety and interest
- Items should be visually distinguished
- Adding personality to the interface

```html
<!-- Neutral: Equal importance, uniform -->
<div>
  <span class="sgds:bg-neutral-surface-default">React</span>
  <span class="sgds:bg-neutral-surface-default">Vue</span>
  <span class="sgds:bg-neutral-surface-default">Angular</span>
</div>

<!-- Purple/Cyan: Visual variety -->
<div>
  <span class="sgds:bg-purple-surface-default">Design</span>
  <span class="sgds:bg-cyan-surface-default">Development</span>
  <span class="sgds:bg-purple-surface-default">Research</span>
</div>
```

## See Also

- **purple.md** - Additional variety color
- **cyan.md** - Additional variety color
