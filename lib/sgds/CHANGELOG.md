## Unreleased

## v2.3.3 (2024-05-31)

### Refactor

- **sidenav**: top defaults to the height of masthead and navbar

## v2.3.2 (2024-05-30)

### Fix

- *****: remove Helvetica & Helvetica Neue font

## v2.3.1 (2024-05-23)

### Fix

- **variables**: mistake in enable cssgrid to true by accident (#491)

## v2.3.0 (2024-05-02)

### Feat

- **sidenav**: add sticky and small refactor to mimick 5.3 [skip-cd] (#480)

### Fix

- **portal**: rename home page grid css selector
- *****: update gem and bundle and fixing custom-style WIP
- **docs**: typo in footer (#474)
- **docs**: typo in footer

### Refactor

- **home**: make npm version dynamic in home page

## v2.2.0 (2023-01-09)

### Feat

- **layouts page**: create layouts page
- **lib**: implementation for sgds-x-react-select with vite
- **templates**: incorporate template styles to existing template
- **template**: rename selectors and apply to template examples
- **templates**: add sgds template css and apply to detail page side-nav
- **section**: added colour page
- **section**: added typography page
- **section**: added foundations section & spacing page

### Fix

- **navbar**: remove navbar overflow styling to fix dropdown visibility
- **template-img**: remove transparency
- **layout-code-snippet**: fix image overflow in layout-code-snippet
- **navigation**: update order of navigation tabs
- **datepicker**: add missing datepicker storybook link
- **copybtn**: place copy button into HTML tab panel
- **portal**: copy button bug
- **portal**: fix custom styles
- **\***: change conditional rendering of tabs from head to component-code-snippet
- **template**: shift media query into .with-sidenav selector
- **templates**: move display grid to with-sidenav selector
- **template**: rename sgds-article* to sgds-content*
- **templates**: remove quotation marks on grid-area names
- **footer**: update from url
- **section**: add thumbnail imgs
- **section**: fixed responsiveness in colour page, added thumbnails in foundation overview
- **section**: removed spacing
- **section**: added full stop
- **function.scss**: fix deprecated sass 1.56.0

### Refactor

- **tooltip**: move tooltip trigger script from lib to portal
- **template**: incorporate template css to single-page-form
- **templates**: incorporate to collapsible-page-form
- **templates**: convert content area to flexbox
- **template**: change content-header-bottom to grid
- **templates**: make footer reusable
- **templates**: make navigation reusable

## v2.1.1 (2022-11-23)

### Fix

- **function.scss**: fix deprecated sass 1.56.0

## v2.1.0 (2022-10-25)

### Fix

- **offcnvas button**: add accessbility name

### Refactor

- **alert**: add align-self-top to icon tag

## v2.1.0-beta.2 (2022-09-30)

### Feat

- **section**: add section helper classes

## v2.1.0-beta.1 (2022-09-16)

### Feat

- **position**: add utilities scss for flex variations stylings
- **positions**: grouped all position related css and create an entry point for that
- **filter**: added filter search functionality for overview pages

### Fix

- **customise imports**: fix customise imports and update documentation
- **main nav**: allow x scrolling for expanded main nav when not in hamburger mode
- **card**: quantity toggle mobile responsiveness
- **masthead**: update cdn link to fetch latest
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

### Refactor

- **\***: add ~ to import paths, fix bootstrap version to 5.1.3 strict
- **navbar**: shift overflow-x to media query down lg

## v2.0.0 (2022-07-29)

## v2.0.0-beta.1 (2022-07-29)

### Feat

- **page-header**: page source grid configuration
- **about page**: add about page, fix single page class name
- **component**: copy code
- **offcanvas**: set height of offcanvas sidenav
- **off-canvas**: add get started to navigation yml, fetch npm data for prev version value
- **off-canvas**: automatically expand sidenav when category is active
- **form-control-group**: add new selector form-control-group and combobox
- **combobox**: add combobox selector

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
- **\***: add backslash for img path
- **overview page**: remove previous img path, remove backslash for card links
- **gitignore**: untrack sgds.css, came up after fixing merge conflicts
- merge conflicts:
- **\***: update build:lib folder, ignore css/sgds.css
- **navigation**: update templates has-collection true
- **about page**: remove target blank
- **patterns**: isolated date input text with numeric inputmode:
- **patterns**: handle credit card formatter backspace event
- **breadcrumb**: add current page title
- merge conflicts
- **quantity-toggle**: add sgds selector to make webkit spinner disappear
- **input-group**: revert changes in has-icon variant
- **\***: merge conflict
- **patterns**: format credit card, change postal code attributes
- **docs portal widget**: update cdn link
- **forms**: rm default webkit spin buttons when aria-describedby cvv and credit card number
- **packaging**: add sgds.css.map into dist files
- **inputgroup**: has-icon variant input borders
- **selectable cards**: change html structure and update scss
- **formcheckinput**: remove margin-top to center checks
- **alert**: generate alert colors, add variables for theme-colors-set
- **colors**: update color schemes and defaults of success,danger,warning,info,pri,sec

### Refactor

- **\***: remove ./node_modules import statement for bootstrap imports
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
