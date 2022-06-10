# Steps to construct a component page
1. Navigate to ```collections/_components/template.html```
2. Duplicate the file and rename to the component name in lower case. Use - for space.

# Front end matter

Must be included at the top of the page.

```
---
title: Accordion

description: A dropdown mechanism that allow users to either show or hide related content. 
category: general 
react-link: https://....
vue-link: https://....
github-link: https://....
toc: true
---
```

> title: name of the component
>
> layout: template used for the page. **WARNING**: Do not remove
>
> description: description of the component
>
> category: **general** / **standard**. Under which catergory the component falls into. 
>
> react-link: Link to the component in react storybook, if any
>
> vue-link: Link to the component in vue storybook, if any
>
> github-link: Link to the component in github repo
>
> toc: **true** / **false** enable table of contents


# Overall Page layout

```
---
See [Front end matter](#front-end-matter)
---

<!-- code snippets for components -->
{% capture default-component-name %}
...
{% endcapture %}
<!-- end code snippets -->

<div class="page-component">
    {% include page-component/component-header.html %}
    <section name="section-examples">
        <h2 class="title fw-bold" id="example">Example</h2>
        <div class="section-sub">
            ... // See [Sub Sections](#sub-section)
        </div>
    </section>
    <section name="section-anatomy">
        <h2 class="title fw-bold" id="anatomy">Anatomy</h2>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-spacing">
        <h2 class="title fw-bold" id="spacing">Spacing</h2>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-usage-guidelines">
        <h2 class="title fw-bold" id="usage-guidelines">Usage guidelines</h2>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-usability-guidelines">
        <h2 class="title fw-bold" id="usability-guidelines">Usability guidelines</h2>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-design-token">
        <h2 class="title fw-bold" id="design-tokens">{{page.title}} design tokens</h2>
        <div class="section-sub">
            ...
        </div>
    </section>
</div>
```

# Section-Example 
This section should only contain the default component and other variants

```
<section name="section-examples">
    <h2 class="title fw-bold" id="example">Example</h2>
    <div class="section-sub">
        {% 
            include page-component/component-code-snippet.html 
            compTitle="component name" 
            compName="card-with-image" 
            code=card-with-image
            compDescTop="Description below the title"
            compDescBottom=card-with-image-bottomDesc
        %}
    </div>
    <!-- Add addtional section-sub for more variants -->
    ...
</section>
```
> **compTitle**: name of the example component

> **compName**: ID for the component name 

> **code**: name of code snippet captured at the top of the page ```{% capture compName %}...{% endcapture %}```

> **compDescTop** (optional): Description below the variant name. Can be use with either quotation marks ```"description here"``` or ```{% capture captureName %}``` for rich text. 

> **compDescBottom** (optional): Description below the variant example. Can be use with either quotation marks ```"description here"``` or ```{% capture captureName %}``` for rich text. 

> **WARNING**: Do not remove ```include page-component/component-code-snippet.html ```

# Section-Anatomy 
This section contains the anatomy of all variants

```
<section name="section-anatomy">
    <h2 class="title fw-bold" id="anatomy">Anatomy</h2>
    <div class="section-sub">
        <div class="sgds-example-image-container">
            <div class="sgds-example-image-grid">
                <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/anatomy-card-1.svg" alt="">
                <div class="sgds-example-image-subgrid">
                    <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/anatomy-card-2.svg" alt="">
                    <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/anatomy-card-3.svg" alt="">
                    <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/anatomy-card-4.svg" alt="">
                </div>
            </div>
        </div>
        <ol>
            ....
        </ol>
        <p>
            ....
        </p>
    </div>
</section>
```
> ```.sgds-example-image-grid``` 
>
> This contain your main image for Anatomy
>
> ![Anatomy Master](https://github.com/GovTechSG/sgds/blob/2.0.0-dev/assets/uncompressed_images/example-template/anatomy-1.png?raw=true)
>
> If you need to add in more images, add ```div.sgds-example-image-subgrid``` inside the image grid
>
> ![Anatomy Master](https://github.com/GovTechSG/sgds/blob/2.0.0-dev/assets/uncompressed_images/example-template/anatomy-2.png?raw=true)
>
## Folder structure for anatomy images.

```
assets/img/component/(name of page title in lowercase)/anatomy-(name of page title in lowercase)-x.{svg | png | jpg}
```

# Section-Spacing 
This section contains the spacing of all variants

```
<section name="section-spacing">
    <h2 class="title fw-bold" id="spacing">Spacing</h2>
    <div class="section-sub">
        <h3 class="subtitle fw-bold" id="within-the-card">Within the card</h3>
        <p>Ensure that there is a min 24px spacing inside of the card and 16px vertical spacing between content. </p>
        <div class="sgds-example-image-container">
            <div class="sgds-example-image-grid">
                <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/spacing-within-1.svg" alt="">
                <div class="sgds-example-image-subgrid">
                    <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/spacing-within-2.svg" alt="">
                    <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/spacing-within-3.svg" alt="">
                    <img src="{{site.baseurl}}/assets/img/component/{{page.title | downcase}}/spacing-within-4.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
```
> ```.sgds-example-image-grid``` 
>
> This contain your main image for Spacing
>
> ![Anatomy Master](https://github.com/GovTechSG/sgds/blob/2.0.0-dev/assets/uncompressed_images/example-template/spacing-1.png?raw=true)
>
> If you need to add in more images, add ```div.sgds-example-image-subgrid``` inside the image grid
>
> ![Anatomy Master](https://github.com/GovTechSG/sgds/blob/2.0.0-dev/assets/uncompressed_images/example-template/spacing-2.png?raw=true)
>

## Folder structure for spacing images.

```
assets/img/component/(name of page title in lowercase)/spacing-(name of page title in lowercase)-x.{svg | png | jpg}
```

# Section usage / usability guidelines
## Usage guidelines

```
<section name="section-usage-guidelines">
    <h2 class="title fw-bold" id="usage-guidelines">Usage guidelines</h2>
    <p>Accordions increases the cognitive load for users, as decisions have to be made when clicking on the headers. Users may also ignore important information if it is hidden in an accordion.</p>
    <p class="fw-bold mb-0">When to use the accordion component:</p>
    <ol>
        <li>There is insufficient space within the page to display the necessary information.</li>
        <li>Users require an overview of specific content that's related to one another.</li>
    </ol>
    <p class="fw-bold mb-0">When not to use the accordion component:</p>
    <ol>
        <li>
            There is insufficient space within the page to display the necessary information.
            <ul>
                <li>Accordions hide content, and there may be users who may miss the content or not understand how accordions work.</li>
                <li>If users need to see all information in a single page, you can consider reducing your content, splitting them into smaller sections, or use well-formatted text (e.g. headers, contents, section)</li>
            </ul>
        </li>
    </ol>
</section>
```

## Usability guidelines
```
<section name="section-usability-guidelines">
    <h2 class="title fw-bold" id="usability-guidelines">Usability guidelines</h2>
    <p>
        <b>Do ensure that the entire heading is clickable to the user.</b><br>
        A larger target will make it easier for users to manipulate
    </p>
    <p>
        <b>Ensure enough space between content and headings</b><br>
        This is to prevent the user from accidentally closing the accordion
    </p>
</section>
```

# Section Design token
```
<section name="section-design-tokens">
    <h2 class="title fw-bold" id="design-tokens">{{page.title}} design tokens</h2>
    {%- highlight sass -%}{{card-design-tokens}}{%- endhighlight -%}
</section>
```

# Sub section
Must be child of the main section.
**You must include at least 1 sub section.**
```

<div class="section-sub">
    ...
</div>
<div class="section-sub">
    ...
</div>
```