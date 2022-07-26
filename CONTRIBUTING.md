# Contributing Guide
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Thank you so much for contributing to @govtechsg/sgds. Please read this guideline before starting your development works. 

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

### Writing

Stylings are written in scss only. To make changes to sgds stylings, edit files in `<rootDir>/sass/sgds-theme`. DO NOT edit files in `<rootDir>/sass/bootstrap` folder

## Commit standard 

This is a commitizen friendly repo. Adhere to the commit conventions of cz. 

## Prepare for Release

##### Promotion to master

1. Use dev branch
2. Change all references in documentation from previous version to new version, e.g. inside the `_config.yml` and `readme.md` files.
3. Update and tag new version using npm.

## Publishing (for admin only)

Library publication is performed in workflow by github actions. When ready for publishing, perform the following steps

##### Bump version 

1. run ```npm version <major|minor|path> ```
    or for alpha releases
    ``` npm version <version-name> ```
    
    **version number should observe SEMVER
    
    **this step will auto-generate a git tag on your local
2. ```git push ``` the changes

##### Generate Changelog 

3. run ```cz changelog``` to update CHANGELOG.md file (ensure that you have set up [cz-cli](https://github.com/commitizen/cz-cli) globally)

**`cz changelog` updates based on your local git tags

4. Push the changes 
    
##### Push git tag

5. run `git tag` to check the newly generated git tag on local

6. ```npm push origin <newly-created-tag> ```

** this triggers gh action workflow to publish the library to npm 

##### Create a release

7. Manually create a release on github 