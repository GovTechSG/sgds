# About Us Page Template

Company profile page with an image grid, logo strip, and achievement statistics. Adapted from [shadcn Blocks — About3](https://www.shadcnblocks.com/block/about3).

Use for: agency homepages, product about pages, government ministry profile pages, team introduction pages.

---

## Layout Structure

Uses the Simple App Layout from the [Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md).

```
┌──────────────────────────────────────────────────────┐
│  sgds-masthead                                       │
├──────────────────────────────────────────────────────┤
│  sgds-mainnav                                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Large headline          Description paragraph       │
│  (6 cols)                (6 cols)                    │
│                                                      │
│  ┌──────────────────────┐ ┌───────────────────────┐  │
│  │                      │ │  Card: logo + text    │  │
│  │   Main image         │ │  [Learn more]         │  │
│  │   (8 cols)           │ ├───────────────────────┤  │
│  │                      │ │  Secondary image      │  │
│  └──────────────────────┘ └───────────────────────┘  │
│                  (4 cols)                            │
│                                                      │
│  ── Logo strip (partner / client logos) ──           │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Achievements heading + description            │  │
│  │                                                │  │
│  │  12,000+   98%      50+      5 years           │  │
│  │  Users     Uptime   Agencies Experience        │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
  sgds-footer
```

---

## Complete Template

```html
<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <sgds-mainnav-item slot="start">
    <a href="/">My Organisation</a>
  </sgds-mainnav-item>
</sgds-mainnav>

<div class="sgds:bg-surface-default sgds:min-h-screen">
  <div class="sgds-container sgds:py-layout-xl">

    <!-- ① Header: two-column headline + description -->
    <div class="sgds-grid sgds:mb-layout-lg">
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
        <h1 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-default">
          Building digital services that matter for Singapore
        </h1>
      </div>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:items-end">
        <p class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:text-muted">
          We are a team of designers, engineers, and product thinkers committed
          to delivering citizen-centric digital experiences across government.
        </p>
      </div>
    </div>

    <!-- ② Image grid: main image (8) + right column (4) -->
    <div class="sgds-grid sgds:mb-layout-lg" style="--sgds-grid-row-gap: var(--sgds-layout-gap-md)">

      <!-- Main image -->
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
          alt="Team collaborating on a project"
          class="sgds:w-full sgds:object-cover sgds:rounded-lg"
        />
      </div>

      <!-- Right column: card + secondary image stacked -->
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:gap-layout-md">

        <!-- Breakout card -->
        <sgds-thumbnail-card class="sgds:flex-1">
          <img slot="thumbnail" src="logo.svg" alt="Organisation logo" width="64" height="64" />
          <span slot="description">
            Trusted by agencies across the whole-of-government ecosystem to deliver
            accessible, compliant, and consistent digital interfaces.
          </span>
          <sgds-link slot="footer">
            <a href="/about">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
          </sgds-link>
        </sgds-thumbnail-card>

        <!-- Secondary image -->
        <img
          src="https://images.pexels.com/photos/4078342/pexels-photo-4078342.jpeg"
          alt="Office environment"
          class="sgds:w-full sgds:object-cover sgds:rounded-lg"
        />
      </div>

    </div>

    <!-- ③ Logo strip -->
    <div class="sgds:mb-layout-lg sgds:overflow-hidden">
      <div class="sgds:text-center sgds:mb-layout-sm">
        <p class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-muted">
          Trusted by agencies
        </p>
      </div>

      <!-- Marquee wrapper — CSS scroll animation, no JS required -->
      <div class="sgds:overflow-hidden sgds:relative" style="mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)">
        <div class="sgds-about-logo-track sgds:flex sgds:gap-layout-xl sgds:w-max">
          <!-- Duplicate the logo set for seamless loop -->
          <div class="sgds:flex sgds:gap-layout-xl sgds:items-center sgds:shrink-0">
            <img src="https://placehold.co/120x40" alt="Agency A" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="Agency B" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="Agency C" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="Agency D" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="Agency E" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
          </div>
          <!-- Duplicate for seamless loop -->
          <div class="sgds:flex sgds:gap-layout-xl sgds:items-center sgds:shrink-0" aria-hidden="true">
            <img src="https://placehold.co/120x40" alt="" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
            <img src="https://placehold.co/120x40" alt="" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
          </div>
        </div>
      </div>

      <style>
        @keyframes sgds-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .sgds-about-logo-track {
          animation: sgds-marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sgds-about-logo-track { animation: none; }
        }
      </style>
    </div>

    <!-- ④ Achievements panel -->
    <div class="sgds:bg-surface-raised sgds:rounded-lg sgds:p-layout-lg">

      <!-- Panel header -->
      <div class="sgds-grid sgds:mb-layout-md">
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-default">
            Delivering impact at scale
          </h2>
        </div>
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:text-muted">
            Our platform powers services used by millions of residents and thousands
            of officers across the Singapore government.
          </p>
        </div>
      </div>

      <!-- Stats grid: 4 columns on LG, 2 on SM/MD, 1 on XS -->
      <div class="sgds-grid">
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">12,000+</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-muted sgds:mt-1">Active users</p>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">98%</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-muted sgds:mt-1">Platform uptime</p>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">50+</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-muted sgds:mt-1">Government agencies</p>
        </div>
        <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3">
          <p class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-default">5 years</p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:text-muted sgds:mt-1">In production</p>
        </div>
      </div>

    </div>

  </div>
</div>

<sgds-footer></sgds-footer>
```

---

## Marquee — static fallback

If animation is unwanted, replace the marquee with a static centred flex row:

```html
<div class="sgds:flex sgds:flex-wrap sgds:justify-center sgds:items-center sgds:gap-layout-lg sgds:py-layout-sm">
  <img src="..." alt="Agency A" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
  <img src="..." alt="Agency B" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
  <img src="..." alt="Agency C" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
  <img src="..." alt="Agency D" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
  <img src="..." alt="Agency E" class="sgds:h-8 sgds:w-auto sgds:opacity-60" />
</div>
```

---

## Key visual rules

- **Image grid row alignment**: the right column uses `sgds:flex sgds:flex-col sgds:gap-layout-md` so the card and secondary image share the same vertical rhythm as the main image
- **Breakout card**: always `sgds:bg-surface-raised` (one step above the page background) with `sgds:border sgds:border-color-muted` — never a solid branded background unless a strong contrast is explicitly required
- **Logo opacity**: set logos to `sgds:opacity-60` so they read as supporting social proof, not primary content
- **Marquee accessibility**: duplicate logos carry `aria-hidden="true"` and `alt=""` to avoid screen readers announcing them twice; always include `prefers-reduced-motion` to disable animation for motion-sensitive users
- **Stats panel background**: use `sgds:bg-surface-raised` — one level above `sgds:bg-surface-default` — to visually lift the section without introducing a heavy coloured band
- **Stats typography**: stat value uses `sgds:text-display-sm` (large, bold, prominent); label uses `sgds:text-body-sm sgds:text-muted` (small, muted, supporting)
- **Section spacing**: separate top-level sections with `sgds:mb-layout-lg` so each zone breathes without collapsing into the next
