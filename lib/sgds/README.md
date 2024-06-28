# Singapore Government Design System

[![npm](https://img.shields.io/npm/v/@govtechsg/sgds.svg)](https://www.npmjs.com/package/@govtechsg/sgds)

The [Singapore Government Design System](https://www.designsystem.tech.gov.sg) was developed to empower teams in creating fast, accessible and mobile-friendly digital services.

Visit our [React storybook](https://ut.react.designsystem.tech.gov.sg)
Visit our [Web Component storybook](https://ut.webcomponent.designsystem.tech.gov.sg)

***

## Installation

### CSS

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

### Vanilla JavaScript

SGDS components makes use of [bootstrap v5.1.3 js library](https://getbootstrap.com/docs/5.1/getting-started/javascript/) as an external dependency. If you only need the visual parts of SGDS, or if you are [using frontend frameworks like React](https://ut.react.designsystem.tech.gov.sg), you do not need to import this.

> `@govtechsg/sgds` uses `bootstrap-icons` for certain components like Form but it is not ship with it. Install `bootstrap-icons` or use CDN if you need it. Please refer to [bootstrap-icons](bootstrap-icons) for usage instructions.

```html
<head>
  ...
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds/css/sgds.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
  ...
</head>

<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    crossorigin="anonymous"></script>
</body>
```

For more information, please refer to the [components documentation](https://www.designsystem.tech.gov.sg/components).

### Via NPM

```sh
$ npm i @govtechsg/sgds bootstrap-icons
```

### For Webpack

```js
//importing css
import '@govtechsg/sgds/css/sgds.css';

import '@popperjs/core';
import * as bootstrap from 'bootstrap';
```

***

## Patch Notes

See [Changelog](./CHANGELOG.md)
