# About Us Page Template

Company profile page showcasing organization mission, image gallery, partner logos, and key achievements. Ideal for government agencies, ministry profiles, and organizational homepages.

## When to use

- Agency profile and about pages
- Government ministry introduction pages
- Product or service about pages
- Team and organizational overview pages

## Block anatomy

```
About Us Page
├── Masthead + MainNav (Application Shell)
├── Header section
│   ├── Headline (6 cols)
│   └── Description paragraph (6 cols)
├── Image grid
│   ├── Main image (8 cols)
│   └── Right column (4 cols)
│       ├── Thumbnail card (logo + description + link)
│       └── Secondary image
├── Logo strip (marquee animation)
│   └── Repeating agency logos with fade mask
├── Achievements panel
│   ├── Section header (headline + description)
│   └── Stats grid (4 columns, 4 metrics)
└── Footer (Application Shell)
```

---

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.


| File | GitHub Raw URL |
|------|---|
| About Us - Basic | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/AboutUs/basic.stories.js |

---

## Customisation notes

- **Headline text**: Update the h1 and section descriptions to match your organization's messaging
- **Main and secondary images**: Replace placeholder URLs with your actual images; ensure descriptive alt text
- **Thumbnail card**: Update the logo, description text, and link URL in the breakout card
- **Logo strip**: Replace placeholder logo URLs with your partner/agency logos; ensure equal-height assets
- **Stats values and labels**: Update the display numbers and supporting text (e.g., "12,000+ Active users")
- **Logo strip animation**: The marquee runs at 30s; adjust the animation duration in the `<style>` block if needed
- **Accessibility**: The duplicate logo set uses `aria-hidden="true"` and empty `alt=""` to prevent screen reader duplication; `prefers-reduced-motion` is respected to disable animation for motion-sensitive users
