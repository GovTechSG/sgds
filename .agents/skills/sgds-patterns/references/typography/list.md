# List Patterns Reference

Ordered and unordered lists in three size variants, supporting nested list items. Use for displaying sequential or grouped content.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/`

## Token Composition

Lists use dedicated `text-list-*` font-size tokens (not `text-body-*`) with corresponding list spacing:

| Variant | Classes (apply to `<ul>`/`<ol>` and each `<li>`) |
|---------|---------|
| List Large Regular | `sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg` |
| List Medium Regular *(default)* | `sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:my-list-md` |
| List Small Regular | `sgds:text-list-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:my-list-sm` |

**Last item rule:** Use `sgds:mt-list-*` (no bottom margin) on the last `<li>` to avoid extra whitespace.

## Unordered Lists (UL)

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| UL List Small Regular | `ul-body-sm.stories.js` | [ul-body-sm.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ul-body-sm.stories.js) | Unordered list with small text |
| UL List Medium Regular | `ul-body-md.stories.js` | [ul-body-md.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ul-body-md.stories.js) | Unordered list with medium text |
| UL List Large Regular | `ul-body-lg.stories.js` | [ul-body-lg.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ul-body-lg.stories.js) | Unordered list with large text |

## Ordered Lists (OL)

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| OL List Small Regular | `ol-body-sm.stories.js` | [ol-body-sm.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ol-body-sm.stories.js) | Ordered list with small text |
| OL List Medium Regular | `ol-body-md.stories.js` | [ol-body-md.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ol-body-md.stories.js) | Ordered list with medium text |
| OL List Large Regular | `ol-body-lg.stories.js` | [ol-body-lg.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ol-body-lg.stories.js) | Ordered list with large text |

## How to Use

Each pattern file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const OLBodyLgTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your list content, including nested items if needed

Copy the template structure, substitute your list items, and it's ready to use.
