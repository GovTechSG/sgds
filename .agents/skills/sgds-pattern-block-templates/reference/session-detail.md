# Session Detail

A self-contained block that presents the full detail of a single event session: time slot, title, speaker attribution, classification badges, description, speaker profile, and a divider. Commonly used on conference and event websites where each talk or panel is listed on a schedule or programme page.

## When to use

- A page lists event sessions, talks, panels, or workshops
- Each item needs a dedicated detail view: time, title, speaker, description, and tags
- Sessions are categorised by type, track, or time of day (badges communicate this at a glance)
- A speaker profile with photo and role is required alongside the session content

## Block anatomy

```
Session detail
├── Header
│   ├── Overline — time slot (sgds:text-overline-md, primary color)
│   ├── Title row
│   │   ├── Session title (h3, sgds-heading-md-semibold)
│   │   └── Expand/collapse button (sgds-icon chevron-up/down)
│   ├── Speaker attribution (body-md, body-subtle)
│   └── Badge group (sgds-badge × N, outlined)
├── Description (p, body-md, body-default)
├── Speaker profile
│   ├── Avatar (img, 88×88px, circular)
│   └── Speaker info
│       ├── Speaker name (h5, sgds-subtitle-md-semibold)
│       ├── Speaker role (p, body-md, body-subtle)
│       └── View profile link (sgds-link)
└── Divider (sgds-divider)
```

## Complete block

```html
<div class="sgds:flex sgds:flex-col sgds:gap-xl">

  <!-- Header -->
  <div class="sgds:flex sgds:flex-col sgds:gap-4">

    <div class="sgds:flex sgds:flex-col sgds:gap-1">
      <!-- Time slot — overline/semibold -->
      <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-primary-default">
        10:45 AM - 11:15 AM
      </div>

      <!-- Title + expand/collapse -->
      <div class="sgds:flex sgds:items-start sgds:gap-6">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default sgds:m-0" style="flex: 1;">
          Singapore's Cybersecurity Strategy in An Evolving Threat Landscape
        </h3>
        <button aria-label="Collapse session"
                style="width: 32px; height: 32px; background: none; border: none; cursor: pointer; padding: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
          <sgds-icon name="chevron-up" size="md"></sgds-icon>
        </button>
      </div>

      <!-- Speaker attribution -->
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:m-0">
        Mr Tan Tony Leng, Cyber Security Agency of Singapore
      </p>
    </div>

    <!-- Badge group -->
    <div class="sgds:flex sgds:flex-wrap sgds:gap-xs sgds:items-center">
      <sgds-badge variant="success" outlined>Keynote</sgds-badge>
      <sgds-badge variant="warning" outlined>Morning</sgds-badge>
      <sgds-badge variant="neutral" outlined>Hall A</sgds-badge>
    </div>

  </div>

  <!-- Description -->
  <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:m-0">
    Session abstract or description goes here. Provide a concise summary of the talk — key themes, takeaways, and relevance to the audience.
  </p>

  <!-- Speaker profile -->
  <div class="sgds:flex sgds:gap-xl sgds:items-start">
    <img src="speaker-photo.jpg"
         alt="Speaker name"
         style="width: 88px; height: 88px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
    <div class="sgds:flex sgds:flex-col sgds:gap-xl" style="flex: 1;">
      <div class="sgds:flex sgds:flex-col sgds:gap-xs">
        <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">
          Mr Tan Tony Leng
        </h5>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:m-0">
          Deputy Commissioner of Cybersecurity &amp; Deputy Chief Executive (Development),
          Cyber Security Agency of Singapore
        </p>
      </div>
      <sgds-link>
        <a href="#">View profile <sgds-icon name="arrow-right" size="sm"></sgds-icon></a>
      </sgds-link>
    </div>
  </div>

  <sgds-divider></sgds-divider>

</div>
```

## Badge variants

Use `outlined` on all badges. Pick the variant that matches the session classification:

| Session type | Variant |
|---|---|
| Keynote, Opening Address, Featured | `success` |
| Morning, Afternoon (time of day) | `warning` |
| Hall / Venue / Track | `neutral` |
| Workshop, Hands-on | `accent` |
| Cancelled, Full | `danger` |

## Key visual rules

- **Time slot**: always use `<div>` with `sgds:text-overline-md sgds:uppercase sgds:text-primary-default` — never a heading element
- **Session title**: `sgds-heading-md-semibold` (`<h3>`) — the default heading style for content-level headings
- **Speaker name**: `sgds-subtitle-md-semibold` (`<h5>`) — subordinate to the session title in document hierarchy
- **Badges**: always `outlined` — filled badges are reserved for status chips in other contexts
- **Divider**: always present at the bottom — separates sessions when the block repeats in a list
- **Avatar**: 88×88px circular (`border-radius: 50%`) with `object-fit: cover`

## For AI agents

1. Replace time, title, speaker, description, and badge labels with the actual event data.
2. Add or remove `<sgds-badge>` elements to match the session's classification dimensions.
3. If no speaker profile is available, omit the speaker profile section entirely — the divider stays.
4. To toggle expand/collapse, wire the button in JS: toggle `hidden` on the description and speaker profile, and swap `chevron-up` ↔ `chevron-down` on the icon.
5. When rendering a list of sessions, repeat this block for each session — the `<sgds-divider>` at the bottom naturally separates them.
6. This block has no page chrome. Wrap it in a page template from **[sgds-pattern-page-templates](../../sgds-pattern-page-templates/SKILL.md)**.
