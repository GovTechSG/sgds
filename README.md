# Singapore Government Design System

[![npm](https://img.shields.io/npm/v/sgds-govtech.svg)](https://www.npmjs.com/package/sgds-govtech)

[SGDS](https://www.designsystem.gov.sg) is a frontend framework that aims to provide a beautiful common visual language and user experience for visitors of Singapore Government websites.

SGDS provides designers and developers with customisable components to help them easily implement the Singapore Government's [Digital Service Standards](https://www.tech.gov.sg/digital-service-standards/), 

## Installation

### Browsers

#### CSS

```html
<head>
    ...
<!-- Latest version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sgds-govtech/css/sgds.css">

<!-- Or specific version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sgds-govtech@1.1.0/css/sgds.css">
    ...
</head>
```

#### JavaScript

[Certain components](https://designsystem.gov.sg/docs/) of SGDS makes use of JavaScript, with jQuery as an external dependency. If you only need the visual parts of SGDS, you do not need to import this.

```html
<body>
    ...
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sgds-govtech@1.1.0/js/sgds.js"></script>
    ...
</body>
```

### NPM
```sh
$ npm i sgds-govtech
```

#### Webpack

```javascript
import "sgds-govtech/css/sgds.css";
import "sgds-govtech/js/sgds"; // Do not use with other web frameworks*
```

*Usage with frameworks such as React, Vue or Angular is discouraged. Framework-specific implementations are in early development and can be found at [sgds-react](https://github.com/govtechsg/sgds-react) and [sgds-govtech-vue](https://github.com/govtechsg/sgds-govtech-vue). 

Pull requests welcome!

## Usage

See [docs](https://www.designsystem.gov.sg).

## Patch Notes
v1.1.0

*Released since 07 June 2019*

- Side Navigation
    * `Deprecated` Side navigation with left border
    * `New` Added Collaspable Side Navigation

-  Table
   * `New` Added Horizontal table
   * `New` Added Vertical header table

-  Hero
    * `New` Added Hero with Dropdown Button
    * `New` Added Hero with Hoverable Dropdown Button
    * `New` Added Hero with Search Bar

-  Button
    * `New` Added Secondary buttons

-  Form
    * `New` Added example of a feedback form

-  Notification
    * `New` Added Default notification (with and without icon)
    * `New` Added Default Toast notification (with and without icon)

-  Tab
    * `New` Added modifiers `is-centered`, `is-small`, `is-medium` , `is-large`
