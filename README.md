---
title: Get Started
permalink: /get-started
layout: layout-single
---


[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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

## Development

### Requirements

-   Ruby & Bundler. Install Jekyll and dependencies through `bundle install`
-   Nodejs & NPM. Install webpack and dependencies through `npm install`

To spin up a live-reloading Jekyll + Webpack development server it is recommended that you use **two separate terminal sessions** so that you can kill any of them easily:

``` bash
$ npm run dev # Access from localhost:4000
```

Test out the latest development build:

```html
<!-- CSS in <head> -->
<link rel="stylesheet" href="https://dev.designsystem.gov.sg/css/sgds.css"/>

<!-- JS in <body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```

<hr>

## Release

### Promotion to master

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

#### Publishing pre-released version to NPM 

1. When ready to publish, manually bump on local, the prerelease version with the right tag 

- For alpha tag 
```bash
   npm version prerelease  --preid=alpha 
```
2. Push to 2.0.0-dev branch. It will trigger github action to run .github/workflows/publish-alpha.yml

**NOTE** It is intended that the runner will fail to publish when version is not change. Until version-check allows check for pre-releases version changes.

<hr>

## Patch Notes

See [Changelog](https://github.com/GovTechSG/sgds/blob/master/CHANGELOG.md)
