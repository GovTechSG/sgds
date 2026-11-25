# Application Management Page Template

Admin dashboard for browsing, filtering, and managing applications with sidebar filters, search, data table with pagination. Ideal for internal tools, application registries, and management portals.

## When to use

- Admin dashboards for managing applications or records
- Internal application registries or approval queues
- Management portals with advanced filtering
- Pages with sidebar filters and data tables
- Multi-criteria search and filter interfaces

## Block anatomy

```
Application Management Page
├── Masthead + MainNav (Application Shell)
├── Page header
│   ├── Breadcrumb
│   ├── Icon + title + description
│   └── Primary CTA button (Create)
├── Two-column layout
│   ├── Left sidebar (sticky)
│   │   ├── Filter header + "Clear all" link
│   │   └── Multiple checkbox filter groups
│   └── Right content area
│       ├── Search + filter toolbar
│       ├── Results count
│       ├── Data table with links, badges, actions
│       └── Pagination
└── Footer (Application Shell)
```

---

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.


| File | GitHub Raw URL |
|------|---|
| Application Management | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/ApplicationManagement/applications-list.stories.js |

---

## Customisation notes

- **Page title**: Update "Applications" and description to match your content type
- **Primary CTA button**: Change button text and action (Create, Add, Import, etc.)
- **Breadcrumb**: Update items to match your site hierarchy
- **Sidebar filters**: Add, remove, or modify filter groups; update filter labels and counts
- **Table columns**: Customize column headers and cell content to match your data structure
- **Table data**: Replace placeholder data with actual records
- **Badges**: Use appropriate variant colors (success, warning, danger, neutral) for status indicators
- **Action buttons**: Customize button text and onclick handlers for table row actions
- **Search placeholder**: Update to reflect what users are searching for
- **Results count**: Dynamically update with actual result count from your data
