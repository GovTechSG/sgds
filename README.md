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
        href="https://cdn.jsdelivr.net/npm/sgds-govtech@{{site.version}}/css/sgds.css"
    />
    ...
</head>
```

#### JavaScript

[Certain components](#javascript-components) of SGDS makes use of `sgds.js`, with jQuery as an external dependency. If you only need the visual parts of SGDS, or if you are [using frontend frameworks like React](#frontend-frameworks), you do not need to import this.

```html
<body>
    ...
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sgds-govtech@{{site.version}}/js/sgds.js"></script>
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

-   Ruby & Bundler. Install Jekyll and dependencies through `bundle install`
-   Nodejs & NPM. Install webpack and dependencies through `npm install`

To spin up a live-reloading Jekyll + Webpack development server it is recommended that you use **two separate terminal sessions** so that you can kill any of them easily:

```bash
# Terminal 1
$ npm run dev:static
```

``` bash
# Terminal 2
$ npm run dev:jekyll # Access from localhost:4000
```

### Development Build  [![Build Status](https://travis-ci.org/GovTechSG/sgds.svg?branch=dev)](https://travis-ci.org/GovTechSG/sgds)

Test out the latest development build:

```html
<!-- CSS in <head> -->
<link rel="stylesheet" href="https://dev.designsystem.gov.sg/css/sgds.css"/>

<!-- JS in <body> -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://dev.designsystem.gov.sg/js/sgds.js"></script>
```

### Release

#### Promotion to master

1. Use dev branch
2. Change all references in documentation from previous version to new version, e.g. inside the `_config.yml` and `readme.md` files.
3. Update and tag new version using npm.


```bash
npm version (major|minor|patch)
```

4. Push to this repo's dev branch, including tags

```bash
git push origin dev
git push origin v[new version]
```

5. PR to master

#### Publish to NPM

1. Switch to latest master branch

```bash
git checkout master
git pull
npm publish
```

## Patch Notes

See [Changelog](https://github.com/GovTechSG/sgds/blob/master/CHANGELOG.md)
