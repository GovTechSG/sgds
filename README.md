# Singapore Government Design System

[![npm](https://img.shields.io/npm/v/sgds-govtech.svg)](https://www.npmjs.com/package/sgds-govtech)

[SGDS](https://www.designsystem.gov.sg) is a frontend framework that aims to provide a beautiful common visual language and user experience for visitors of Singapore Government websites. It provides designers and developers with customisable components to help them easily implement the Singapore Government's [Digital Service Standards](https://www.tech.gov.sg/digital-service-standards/).

## Installation

### Browsers

#### CSS

```html
<head>
    ...
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sgds-govtech@1.3.0/css/sgds.css"
    />
    ...
</head>
```

#### JavaScript

[Certain components](#javascript-components) of SGDS makes use of `sgds.js`, with jQuery as an external dependency. If you only need the visual parts of SGDS, or if you are [using frontend frameworks like React](#frontend-frameworks), you do not need to import this.

```html
<body>
    ...
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sgds-govtech@1.3.0/js/sgds.js"></script>
    ...
</body>
```

##### JavaScript components

- Mandatory
    - Main Nav
    - Side Nav
- General
    - Accordions
    - Dropdowns
    - Tabs

For more information, please refer to the [documentation](https://www.designsystem.gov.sg/docs).

### NPM

```sh
$ npm i sgds-govtech
```

#### Webpack

```javascript
import "sgds-govtech/css/sgds.css";
import "sgds-govtech/js/sgds"; // Do not use with other web frameworks*
```

##### Frontend frameworks

Usage with frameworks such as React, Vue or Angular is discouraged since they manipulate the DOM in their own environments. Framework-specific implementations are in early development and can be found at [sgds-govtech-react](https://github.com/govtechsg/sgds-govtech-react) and [sgds-govtech-vue](https://github.com/govtechsg/sgds-govtech-vue).

## Usage

See [docs](https://www.designsystem.gov.sg).

## Development

### Requirements

-   Ruby, Bundler, then Jekyll
-   Nodejs, NPM

To spin up a live-reloading Jekyll + Webpack development server at localhost:4000:

```bash
$ npm install
$ npm run devserver
```

Pull requests welcome!

### Development Build  [![Build Status](https://travis-ci.org/GovTechSG/sgds.svg?branch=dev)](https://travis-ci.org/GovTechSG/sgds)

Test out the latest development build from jsdelivr:

```html
<!-- CSS in <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/govtechsg/sgds@gh-pages/css/sgds.css"/>

<!-- JS in <body> -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/govtechsg/sgds@gh-pages/js/sgds.js"></script>
```

## Patch Notes

v1.1.0

_Released since 07 June 2019_

-   Side Navigation

    -   `Deprecated` Side navigation with left border
    -   `New` Added Collaspable Side Navigation

-   Table

    -   `New` Added Horizontal table
    -   `New` Added Vertical header table

-   Hero

    -   `New` Added Hero with Dropdown Button
    -   `New` Added Hero with Hoverable Dropdown Button
    -   `New` Added Hero with Search Bar

-   Button

    -   `New` Added Secondary buttons

-   Form

    -   `New` Added example of a feedback form

-   Notification

    -   `New` Added Default notification (with and without icon)
    -   `New` Added Default Toast notification (with and without icon)

-   Tab
    -   `New` Added modifiers `is-centered`, `is-small`, `is-medium` , `is-large`
