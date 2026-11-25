# Catalogue / Search & Filter Page Template

Public-facing catalogue with search, sidebar multi-group filters, sort options, grid or list results with pagination, and empty state. Ideal for browsing programs, products, events, or content collections.

## When to use

- Product or service catalogues
- Event or conference program listings
- Content or article browsing pages
- Resource galleries or directories
- Pages requiring advanced search and filtering with multiple criteria

## Block anatomy

```
Catalogue Page
├── Masthead + MainNav (Application Shell)
├── Header section
│   ├── Overline + headline + description
│   └── Search input (with prefix icon)
├── Two-column layout
│   ├── Left sidebar (sticky)
│   │   ├── Filters header + "Clear all"
│   │   └── Multiple checkbox filter groups
│   └── Right content area
│       ├── Results count + sort dropdown
│       ├── Results grid (responsive columns)
│       ├── Empty state (when no results)
│       └── Pagination
└── Footer (Application Shell)
```

---

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.


| File | GitHub Raw URL |
|------|---|
| Catalogue - Search & Filter | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Catalogue/search-filter.stories.js |

---

## Customisation notes

- **Page title & description**: Update headline and description to match your catalogue type
- **Search placeholder**: Customize text to describe what users can search for (e.g., "Search by name or keyword...")
- **Sidebar filters**: Add, remove, or modify filter groups; update labels and item counts
- **Filter items**: Use checkbox-groups for multi-select filtering; include result counts
- **Sort dropdown**: Customize sort options to match your sorting requirements (date, name, relevance, etc.)
- **Results grid**: Use sgds-card or sgds-thumbnail-card components; make grid responsive (different columns at different breakpoints)
- **Results count**: Dynamically display count of matching items
- **Empty state**: Show when no results match the search or filters; include helpful CTA
- **Pagination**: Adjust items per page and total pages based on your data
- **Mobile responsive**: Sidebar moves to collapsible drawer on small screens; adjust with CSS or grid classes
