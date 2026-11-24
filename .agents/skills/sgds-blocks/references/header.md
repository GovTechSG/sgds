# Header Blocks Reference

Page headers for introducing pages and sections.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/header/`

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Page Header | `page-header.stories.js` | [page-header.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/header/page-header.stories.js) | Simple page header |
| Page Header with Breadcrumb | `page-header-breadcrumb.stories.js` | [page-header-breadcrumb.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/header/page-header-breadcrumb.stories.js) | Page header with breadcrumb navigation |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const HeaderTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your title and breadcrumb links, and it's ready to use.
