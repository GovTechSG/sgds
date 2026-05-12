# Filter Blocks Reference

Filter interfaces for data discovery and refinement.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/filter/`

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Filter Sidebar checkboxes | `filter-checkboxes.stories.js` | [filter-checkboxes.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/filter/filter-checkboxes.stories.js) | Filter sidebar interface |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const FilterTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your filter options and logic, and it's ready to use.
