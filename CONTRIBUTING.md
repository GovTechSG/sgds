# Contributing Guide

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Thank you so much for contributing to @govtechsg/sgds. Please read this guideline before starting your development works.

## Contributing workflow

To contribute, please start off at the Issue section of our github repository.

1. Checkout our Issue section to search for similar bugs/issues/feature request that you encounter. Someone else might have already raised a similar issue.
2. If your issue is not found, open an issue !
3. Follow the instructions of the issue request form and answer them
4. Describe your bug / new feature request as detailed as possible. For new feature request, let us know your motivation behind your proposal and how you intend to build the feature. For bug fixes, let us know how you intend to fix the bug.
5. A SGDS admin will pick up on the discussion and notify you if the proposal is accepted
6. Once accepted, you can fork the repository and start working away !
7. Raise a PR, tagging the issue number, and request a review from one of our admins.

## Setup for development

### General Pre-requisites

1. Install ruby version manager. Either [rvm](https://rvm.io/) or [rb-env](https://github.com/rbenv/rbenv)

2. Check that your ruby version in use is the same as `/portal/.ruby-version` file

```bash
# rbenv
(cd portal && rbenv local)

# rvm
(cd portal && rvm use)
```

3. In root, run

```bash
nvm use
npm install
```

This will install packages for root and ./lib/sgds, ./portal folders.

### Lib and Portal Setup

4. Start live-reloading Jekyll + Webpack development server. When using portal, it is likely that you will need a live reload of any code changes in `lib` folder. This is all handled by the command below

In root, run

```bash
$ npm run portal:dev # Access from localhost:4000
```

## Writing

### Lib

Stylings are written in scss only. To make changes to sgds stylings, edit files in `<rootDir>/lib/sgds/sass`.

### Portal

Portal changes goes into /portal folder

## Commit standard

This is a commitizen friendly repo. Adhere to the commit conventions of cz.

## Prepare for Release (for admin only)

##### Promotion to master

1. Use default branch
2. Change all references in documentation from previous version to new version, e.g. inside the `_config.yml` and `readme.md` files.
3. Update and tag new version using npm.

## Publishing (for admin only)

Library publication is performed in workflow by github actions. When ready for publishing, perform the following steps

##### Bump version

1. run `cd lib/sgds` to navigate to the sgds library folder
2. run `npm version <major|minor|patch>`
   or for alpha releases
   `npm version <version-name>`

   \*\*version number should observe SEMVER

   \*\*this step will auto-generate a git tag on your local

3. `git push` the changes

##### Generate Changelog

3. run `cz changelog` to update CHANGELOG.md file (ensure that you have set up [cz-cli](https://github.com/commitizen/cz-cli) globally)

   \*\*`cz changelog` updates based on your local git tags

4. Push the changes

##### Push git tag

5. run `git tag` to check the newly generated git tag on local

6. `git push origin <newly-created-tag>`

\*\* this triggers gh action workflow to publish the library to npm

##### Create a release

7. Manually create a release on github
