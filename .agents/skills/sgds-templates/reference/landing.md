# Landing Page Template

Public-facing landing page with hero section, value proposition cards, feature showcase, stats, and CTA sections. Ideal for product launches, service introductions, and campaign pages.

## When to use

- Product or service landing pages
- Campaign and promotional pages
- Service introduction or onboarding pages
- Public-facing informational pages with CTAs
- Pages with hero imagery, feature cards, and social proof

## Block anatomy

```
Landing Page
├── Masthead + MainNav (Application Shell)
├── Hero section (overline, h1, description, buttons)
├── Feature/life moments cards grid (3-column, tinted cards)
├── Section: "Built for Every Stage of Life"
├── Stats section (4 key metrics with descriptions)
├── Mission/values section (heading + bulleted list)
├── Final CTA section (centered, accent background)
└── Footer (Application Shell)
```

---

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.


| File | GitHub Raw URL |
|------|---|
| Landing - Basic | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Landing/basic.stories.js |

---

## Complete template

```html
<style>
  .hero-row {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-layout-md);
  }
  .hero-row > * {
    width: 100%;
  }
  @media (width >= 768px) {
    .hero-row {
      flex-direction: row;
      align-items: center;
    }
    .hero-row > :first-child {
      width: 50%;
      padding-top: var(--sgds-spacing-layout-xs);
      padding-right: var(--sgds-spacing-layout-md);
    }
    .hero-row > :last-child {
      width: 50%;
    }
  }

  .stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sgds-gap-layout-md);
  }
  .stats-row > * {
    width: 100%;
  }
  @media (width >= 1024px) {
    .stats-row {
      flex-wrap: nowrap;
    }
    .stats-row > * {
      flex: 1;
      width: auto;
    }
  }
</style>

<sgds-masthead></sgds-masthead>
<sgds-mainnav>
  <strong slot="brand">Logo</strong>
</sgds-mainnav>

<section class="sgds:bg-default sgds:py-layout-md sgds:min-h-[600px]">
  <div class="sgds-container">
    <div class="hero-row">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left">
        <div class="sgds:mb-xl">
          <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
            Singapore Government Digital Services
          </div>
          <h1 class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default">
            One Platform.<br />Simpler Living.
          </h1>
          <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
            Access government services anytime, anywhere. Built for residents, designed for ease.
          </h4>
        </div>
        <div class="sgds:flex sgds:gap-component-md">
          <sgds-button variant="primary" size="md">Get Started</sgds-button>
          <sgds-button variant="outline" size="md">Learn More</sgds-button>
        </div>
      </div>

      <div>
        <img
          src="https://placehold.co/512x512/e8f0fe/1f69ff?text=Government+Services"
          alt="Government digital services"
          style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
        />
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="display: flex; flex-direction: column; gap: var(--sgds-gap-layout-md);">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="padding-bottom: var(--sgds-spacing-layout-md);">
        <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
          Life Moments
        </div>
        <h2 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default">
          Built for Every Stage of Life
        </h2>
        <h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
          Services grouped around your life moments - not government structures.
        </h5>
      </div>

      <div class="sgds-grid" style="gap: var(--sgds-gap-layout-md);">
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <sgds-card tinted hideBorder stretchedLink>
            <span slot="subtitle">FAMILY</span>
            <span slot="title">Family and Relationships</span>
            <span slot="description">
              Register births, apply for child development grants, and access parenting resources all in one place.
            </span>
            <sgds-link slot="footer">
              <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
            </sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <sgds-card tinted hideBorder stretchedLink>
            <span slot="subtitle">HOUSING</span>
            <span slot="title">Home and Housing</span>
            <span slot="description">
              Check eligibility, apply for flats, and manage your property-related transactions with HDB and other agencies.
            </span>
            <sgds-link slot="footer">
              <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
            </sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
          <sgds-card tinted hideBorder stretchedLink>
            <span slot="subtitle">EMPLOYMENT</span>
            <span slot="title">Work and Employment</span>
            <span slot="description">
              Search for jobs, upskill through SkillsFuture, and access employment support schemes tailored to your needs.
            </span>
            <sgds-link slot="footer">
              <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
            </sgds-link>
          </sgds-card>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="display: flex; flex-direction: column; gap: var(--sgds-gap-layout-md);">
      <div style="max-width: var(--sgds-text-max-width);">
        <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
          By the Numbers
        </div>
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
          Impact at a Glance
        </h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Key metrics measured over the past 12 months across all participating agencies.
        </p>
      </div>

      <div class="stats-row">
        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
            2.4M
          </div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
            Active Users
          </h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
            Residents actively using the platform to access government services each month.
          </p>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
            400+
          </div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
            Government Services
          </h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
            Integrated services from agencies across the public sector in one place.
          </p>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
            99.9%
          </div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
            Platform Uptime
          </h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
            Consistently high availability so residents can access services anytime.
          </p>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
          <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
            16
          </div>
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
            Partner Agencies
          </h5>
          <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
            Public agencies contributing services and data to the shared platform.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sgds:bg-default sgds:py-layout-md">
  <div class="sgds-container">
    <div style="max-width: var(--sgds-text-max-width);">
      <div class="sgds:mb-layout-md">
        <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
          Our Mission
        </div>
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
          Designed Around Citizens, Not Silos
        </h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
          We believe government services should feel as natural as any modern digital experience. That means no dead ends, no duplicated form-filling, and no having to know which agency is responsible before you can get help.
        </p>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Our team works across public agencies to build shared infrastructure that reduces friction for residents and lowers the cost of service delivery for government.
        </p>
      </div>

      <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
        What we stand for
      </h3>

      <ul style="padding-left: var(--sgds-spacing-lg); margin: 0;">
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          Accessibility and inclusivity for all residents, regardless of digital literacy.
        </li>
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          Open standards and reusable components that any agency can adopt.
        </li>
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          Continuous improvement driven by user research and real feedback.
        </li>
        <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          Security and privacy as foundational requirements, not afterthoughts.
        </li>
      </ul>
    </div>
  </div>
</section>

<section class="sgds:bg-alternate sgds:py-layout-md">
  <div class="sgds-container">
    <div
      class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:mx-auto"
      style="max-width: var(--sgds-text-max-width);"
    >
      <h2 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default">
        Ready to simplify your government experience?
      </h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        Join millions of residents already using LifeSG to access the services that matter most to them.
      </p>
      <sgds-button variant="primary" size="md">Get Started with Singpass</sgds-button>
    </div>
  </div>
</section>

<sgds-footer></sgds-footer>
```

## Customisation notes

- **Hero headline**: Update the main headline and subheading to match your service or product name
- **Hero CTA buttons**: Change button text and link to your primary actions (Get Started, Learn More, etc.)
- **Life moments cards**: Update the 3 cards with your own categories; modify subtitle, title, description, and link URLs
- **Stats section**: Update the 4 metrics (2.4M, 400+, 99.9%, 16) and their accompanying descriptions
- **Mission section**: Replace the mission statement and values list with your organization's purpose
- **Final CTA**: Update the centered call-to-action headline, description, and button text
- **Images**: Replace placeholder images with your own branded assets
- **Colors**: Use semantic background colors like `sgds:bg-alternate` for accent sections
