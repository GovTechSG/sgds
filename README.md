---
title: Get Started
permalink: /get-started
layout: layout-single
---

## Singapore Government Design System
[![npm](https://img.shields.io/npm/v/@govtechsg/sgds.svg)](https://www.npmjs.com/package/@govtechsg/sgds)

The Singapore Government Design System was developed to empower teams in creating fast, accessible and mobile-friendly digital services.
<hr>

### Installation

#### Browsers

#### CSS

```html
<head>
    ...
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds/css/sgds.css"
    />
    ...
</head>
```

#### JavaScript

SGDS components makes use of [bootstrap v5.1.3 js library](https://getbootstrap.com/docs/5.1/getting-started/javascript/) as an external dependency. If you only need the visual parts of SGDS, or if you are [using frontend frameworks like React](https://www.designsystem.tech.gov.sg/react/), you do not need to import this.

```html
<body>
    ...
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    ...
</body>
```

For more information, please refer to the [components documentation](https://www.designsystem.tech.gov.sg/components).

#### NPM

```sh
$ npm i @govtechsg/sgds
```

#### Webpack

```css 
//importing css
import "@govtechsg/sgds/css/sgds.css";

//importing sass
import "@govtechsg/sgds/sass/sgds.scss";
```

```js
import '@popperjs/core';
import * as bootstrap from 'bootstrap';
```

#### Frontend frameworks

Usage with frameworks such as React, Vue or Angular is discouraged since they manipulate the DOM in their own environments. Framework-specific implementations are in early development and can be found at [sgds-react](https://github.com/govtechsg/sgds-react)

<hr>

## Patch Notes

See [Changelog](https://github.com/GovTechSG/sgds/blob/master/CHANGELOG.md)
