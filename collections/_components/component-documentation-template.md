# Steps to construct a component page
1. Navigate to ```collections/_components/template.html```
2. Duplicate the file and rename to the component name.

# Front end matter

Must be included at the top of the page.

```
---
title: Accordion
layout: layout-sidenav
description: A dropdown mechanism that allow users to either show or hide related content. 
category: general 
react-link: https://....
vue-link: https://....
github-link: https://....
toc: true
---
```

> title: name of the component

> layout: name of the template used for the page. **WARNING**: Do not remove

> description: description of the component

> category: Under which catergory the component falls into. **general** or **standard**

> react-link: Link to the component in react storybook, if any

> vue-link: Link to the component in vue storybook, if any

> github-link: Link to the component in github repo

> toc: enable table of contents


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
        <h3 class="title fw-bold" id="example">Example</h3>
        <div class="section-sub">
            ... // See [Sub Sections](#sub-section)
        </div>
    </section>
    <section name="section-anatomy">
        <h3 class="title fw-bold" id="anatomy">Anatomy</h3>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-spacing">
        <h3 class="title fw-bold" id="spacing">Spacing</h3>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-usage-guidelines">
        <h3 class="title fw-bold" id="usage-guidelines">Usage guidelines</h3>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-usability-guidelines">
        <h3 class="title fw-bold" id="usability-guidelines">Usability guidelines</h3>
        <div class="section-sub">
            ...
        </div>
    </section>
    <section name="section-design-token">
        <h3 class="title fw-bold" id="design-tokens">{{page.title}} design tokens</h3>
        <div class="section-sub">
            ...
        </div>
    </section>
</div>
```

# Sub section
Must be child of the main section
You can use 1 or more sub sections
```

<div class="section-sub">
    ...
</div>
<div class="section-sub">
    ...
</div>
```

# Section-Example 
This section should only contain the default component and other variants

```
<section name="section-examples">
    ...
    <div class="section-sub">
        {% 
            include page-component/component-code-snippet.html 
            compTitle="component name" 
            compName="card-with-image" 
            code=card-with-image
        %}
    </div>
    ...
</section>
```
> compTitle: name of the example component

> compName: ID for the component name for accordion to work

> code: name of code snippet captured at the top of the page

> **WARNING**: Do not remove ```include page-component/component-code-snippet.html ```

# Section-Anatomy 
This section contains the anatomy of all variants

```
<section name="section-anatomy">
    <h3 class="title fw-bold" id="anatomy">Anatomy</h3>
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

## Folder structure for anatomy images.

```
assets/img/component/(name of page title in lowercase)/anatomy-(name of page title in lowercase)-x.{svg | png | jpg}
```

# Section-Spacing 
This section contains the spacing of all variants

```
<section name="section-spacing">
    <h3 class="title fw-bold" id="spacing">Spacing</h3>
    <div class="section-sub">
        <h4 class="subtitle fw-bold" id="within-the-card">Within the card</h4>
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


## Folder structure for spacing images.

```
assets/img/component/(name of page title in lowercase)/spacing-(name of page title in lowercase)-x.{svg | png | jpg}
```

# Section Usage / usability guidelines
## Usage guidelines

```
<section name="section-usage-guidelines">
    <h3 class="title fw-bold" id="usage-guidelines">Usage guidelines</h3>
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
    <h3 class="title fw-bold" id="usability-guidelines">Usability guidelines</h3>
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
    <h3 class="title fw-bold" id="design-tokens">{{page.title}} design tokens</h3>
    {%- highlight sass -%}{{card-design-tokens}}{%- endhighlight -%}
</section>
```