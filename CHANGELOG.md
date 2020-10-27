# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.17] - 27-10-2020
- Added modal documentation

## [1.3.16] - 01-10-2020

- Removed left borders for `.sgds-menu-list li ul` elements so side nav is consistent with previous behaviour.

### Documentation: sgds-menu
- Accessibility fixes for sgds-menu
- Replace `div.second-level-nav-div` with `li.second-level-nav-div`
- All `li.second-level-nav-div` nav items should be children of `<ul>`

### Documentation: sgds-masthead
1. Add aria-label for masthead

## [1.3.15] - 07-09-2020
- Fixes for input hint text
- Added is-*color classes for hint text
- Removed .success & .error class for hint text
- Update input & text area documentation

## [1.3.14] - 15-07-2020
- update $size-7 paragraph font size to 1.125rem

## [1.3.13] - 04-05-2020
- Navbar fixes

### Docs
- Added tag documentation

### Fixes and updates
- Update SGDS logo and favicon
- Fixes for search page
- Style / layout fixes
- Upgraded to Jekyll 4.0

## [1.3.11] - 02-04-2020

### Components

- Added is-stateColor modifier for Card footer button
- Pagination component is now left align by default
- Added .is-centered & .is-right alignment helper for Pagination component

## [1.3.10] - 26-02-2020

### Components

- Default Toast Notification now has higher contrast border color

### Docs

- Added breadcrumb variations

### Patterns

- Added pattern groups and documentation

## [1.3.9] - 13-12-2019

### Components

- Button colours now have higher contrast when in :hover, :focus and :active.

### Docs

- Accessibility improvements made from WAVE evaluations.
- Reorganization of docs and layouts.

## [1.3.8] - 23-11-2019

### Components

- Added .has-default-header-styles modifier to .content class. This gives top and bottom margins `<h1>` to `<h6>` elements.
- `<hr>` elements now have default top and bottom margins.
- Added .hint, .success and .error classes for form input labels.

### Docs

- Docs for form elements split into separate category
- Added docs for advanced customisation using Sass
- Documentation additions and reorg

## [1.3.7] - 21-10-2019

### Changes

- #35 Added color contrast result and examples of `is-*color*` class
- Updated colors with recommended ratio >= 4.5
    - `Secondary` -> `#4370cc`
    - `Warning` -> `#a86500`
    - `Success` -> `#008649`
    - `Info` -> `#008196`
    - `Link` -> `#0070F2`

- Added instructions for releasing. See [Readme.md](https://github.com/GovTechSG/sgds/blob/master/README.md)

### Fixes
- Fixed missing gutters (left/right) for `sgds-container`

## [1.3.6] - 18-10-2019

### Changes

- Added sass to npm package

## [1.3.5] - 07-10-2019

### Changes

- #101 Masthead font-size scaling.
- Masthead link now darkens upon hover.
- sgds.js no longer initializes a sticky sidebar by default. This feature is not sgds's
  responsibility and its removal reduces the js library size greatly. Documentation for 
  this feature to follow.
- Default colours for `info` and `link` classes have been updated.
- Added more font-weight classes (e.g. `has-text-weight-extra-bold`).
- scss sources are now published on NPM. Documentation for usage to follow.
- Documentation improvements.

### Fixes

- Fixed navbar burger button functionality after new navbar class introduced.

## [1.3.4] - 04-10-2019

### Fixes

- Added js compatible with old `.navbar` elements for burger button controls

## [1.3.3] - 18-09-2019

### Changes

- Documentation re-org and improvements
- Moved sgds-example and sgds-syntax classes out of sgds package.
- #89 Added sgds prefix to navbar component
- Updated language selector example in docs to use `<select>` elements

### Fixes

- #83 Main nav language selector gets misaligned when viewport is too wide (>1800px)
- #85 Documentation for SGDS Steps
- Fixed Masthead example

## [1.3.2] - 27-08-2019

- Documentation updates
- Improved IE compatibility for sgds.js.

## [1.3.1] - 26-08-2019

- Documentation updates
- IE fix for main nav dropdowns
- Style improvements for button and navbar and pagination
- Dropdown JS now handles icon changes
- Fixed babel build to handle sticky-sidebar
- CI pipeline for dev build

## [1.2.4] - 13-08-2019

### Accordion

#### Added

- border with \$grey-light (same border color with default table)
- border \$grey-light (same border color with default table) to `sgds-accordion-body`
- `is-*color*` helper to `sgds-accordion`.
- `is-*borderless*` helper to `sgds-accordion`.
- `is-*small* , is-*medium* , is-*large*` helper to `sgds-accordion`.

#### Changed

- background color to white
- background color to white
- hover color to darken white
- padding top/bottom (same padding with default size `sgds-button`)

## [1.1.0] - 07-06-2019

- Side Navigation

  - `Deprecated` Side navigation with left border
  - `New` Added Collaspable Side Navigation

- Table

  - `New` Added Horizontal table
  - `New` Added Vertical header table

- Hero

  - `New` Added Hero with Dropdown Button
  - `New` Added Hero with Hoverable Dropdown Button
  - `New` Added Hero with Search Bar

- Button

  - `New` Added Secondary buttons

- Form

  - `New` Added example of a feedback form

- Notification

  - `New` Added Default notification (with and without icon)
  - `New` Added Default Toast notification (with and without icon)

- Tab
  - `New` Added modifiers `is-centered`, `is-small`, `is-medium` , `is-large`
