## Unreleased

## v2.1.0-beta.2 (2022-09-30)

### Feat

- **section**: add section helper class for page styling

## v2.1.0-beta.1 (2022-09-16)

### Feat

- **position**: add utilities scss for flex variations stylings
- **positions**: grouped all position related css and create an entry point for that
- **filter**: added filter search functionality for overview pages
- **filter**: added filter search functionality for overview pages

### Fix

- **card**: quantity toggle mobile responsiveness
- **customise imports**: fix customise imports and update documentation
- **masthead**: update cdn link to fetch latest
- **main nav**: allow x scrolling for expanded main nav when not in hamburger mode
- **card**: quantity toggle mobile responsiveness
- **masthead**: update cdn link to fetch latest
- **card docs**: added mobile responsiveness for card variants
- **card**: added mobile responsiveness for card variants
- **card docs**: removed wrapper from single cards,removed sgds-example card group class
- **card doc**: standardise card with in example
- **card docs**: removed width prop in .card-group
- **card docs**: updated html structure for action cards
- **card docs**: added .sgds-example-card-grid wrapper to variants
- **card doc**: add custom media query
- **card doc**: revert card width
- **card documentation**: update card group responsive
- **card documentation**: update card example responsive
- **card**: added mobile responsiveness for card variants

### BREAKING CHANGE

- Previous instructions for import paths for customise imports will break. Please
update accordingly to the new documentation

### Refactor

- *****: add ~ to import paths, fix bootstrap version to 5.1.3 strict
- **navbar**: shift overflow-x to media query down lg

## v2.0.0-beta.1 (2022-07-29)

### Refactor

- *****: remove ./node_modules import statement for bootstrap imports
- **sass**: move all files to sass root folder
- **sgds**: remove bootstrap folder
- **sgds.scss**: combine map-merge
- **custom-css**: update sgds variable path
- **components/forms/utilities**: align file structure with bootstrap
- **reboot/root/type**: import bootstrap dependencies
- **sass/mixins**: import directly from module
- **sass/forms**: import forms from module
- **sass/helper**: import helper directly from module
- merge v2dev into branch
- images into correct folder and update selectors in collections

### Fix

- merge v2dev to current br
- **embed**: added embedded react typeahead with alert notification
- **installation page**: remove square bracket
- **installation page**: update npm install command. fix #342
- **footer**: add responsive grid for lg -> sm
- **header**: remove description if undefine
- **navigation**: title with spacing not showing in offcanvas
- **color**: missing black rgb
- **pattern-overview**: rename images to lowercase
- *****: add backslash for img path
- **overview page**: remove previous img path, remove backslash for card links
- **gitignore**: untrack sgds.css, came up after fixing merge conflicts
- merge conflicts:
- *****: update build:lib folder, ignore css/sgds.css
- **navigation**: update templates has-collection true
- **about page**: remove target blank
- **patterns**: isolated date input text with numeric inputmode:
- **patterns**: handle credit card formatter backspace event
- **breadcrumb**: add current page title
- **breadcrumb**: add current page title
- merge conflicts
- **packaging**: add sgds.css.map into dist files
- **forms**: rm default webkit spin buttons when aria-describedby cvv …
- **quantity-toggle**: add sgds selector to make webkit spinner disappear
- **input-group**: revert changes in has-icon variant
- *****: merge conflict
- **patterns**: format credit card, change postal code attributes
- **docs portal widget**: update cdn link
- **docs portal widget**: update cdn link
- **forms**: rm default webkit spin buttons when aria-describedby cvv and credit card number
- **inputgroup**: has-icon variant input borders
- **packaging**: add sgds.css.map into dist files
- **selectable cards**: change html structure and update scss
- **inputgroup**: has-icon variant input borders
- **selectable cards**: change html structure and update scss
- **formcheckinput**: remove margin-top to center checks
- **formcheckinput**: remove margin-top to center checks
- **alert**: generate alert colors, add variables for theme-colors-set
- **alert**: generate alert colors, add variables for theme-colors-set
- **colors**: update color schemes and defaults of success,danger,warning,info,pri,sec

### Feat

- **page-header**: page source grid configuration
- **about page**: add about page, fix single page class name
- **component**: copy code
- **offcanvas**: set height of offcanvas sidenav
- **off-canvas**: add get started to navigation yml, fetch npm data for prev version value
- **off-canvas**: automatically expand sidenav when category is active
- **form-control-group**: add new selector form-control-group and combobox
- **combobox**: add combobox selector

## v2.0.0 (2022-02-11)

## v1.3.22 (2021-10-15)

## v1.3.21 (2021-09-09)

## 1.3.20 (2021-07-08)

## 1.3.19 (2021-07-08)

## v1.3.18 (2021-04-15)

## v1.3.16 (2020-10-02)

## v1.3.13 (2020-05-07)

## v1.3.10 (2020-03-03)

## v1.3.9 (2019-12-13)

## v1.3.8 (2019-11-23)

## v1.3.5 (2019-10-11)

## v1.3.4 (2019-10-04)

## v1.3.3 (2019-09-18)

## v1.3.2 (2019-08-27)

## v1.3.0 (2019-08-14)

### Fix

- Gemfile & Gemfile.lock to reduce vulnerabilities

## v1.2.1 (2019-07-10)

## v1.2.0 (2019-07-10)
