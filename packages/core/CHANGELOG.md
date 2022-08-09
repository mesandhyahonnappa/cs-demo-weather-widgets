# Change Log

## 3.0.0

### Major Changes

- 8826232: Modified the thunderstorm related icon keys because thunderstorm is a single word.
- 8826232: Changed the descriptions used for the conditions to more closely match Open Weather Map specifications.
- e0e2944: Modify the Forecast model to map to the Open Weather Map one-click API data. This means only passing a single Forecast object with all of the data.

## 2.3.0

### Minor Changes

- 593f6b0: Add `--csdemo-daily-forecast-description-min-width` to allow better alignment in lists

## 2.2.0

### Patch Changes

- c1b205b: Clean up the lint errors.

## 2.1.0

### Minor Changes

- 4a627cf: Default the icon paths if they are not provided.

### Patch Changes

- 2be6fef: Update the usage notes in the core README.md
- 4350461: Remove the `--csdemo-font-color` CSS variable.

  This variable was originally added to demo how to do something, and was not intended to be part of the product. Having it as part of the product has actually been shown to be harmful.

## 2.0.0

### Major Changes

- 1d08abd: Convert off of Lerna to pnpm with changesets

  This was done because Lerna has been marked as no longer being supported.

- 1973ab8: Update the README.md doc for the new pnpm based procedures. Split the notes off into a NOTES.md file.

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.2](https://github.com/ionic-enterprise/cs-demo-weather-widgets/compare/v1.2.1...v1.2.2) (2022-04-26)

### Bug Fixes

- **styling:** switch the styling for better flow in consuming apps ([e37d2a4](https://github.com/ionic-enterprise/cs-demo-weather-widgets/commit/e37d2a4ebed361247879d1c5900a093c995262c7))

# [1.2.0](https://github.com/ionic-enterprise/cs-demo-weather-widgets/compare/v1.1.1...v1.2.0) (2022-04-22)

### Features

- **angular:** add the angular framework wrapper ([7a40fe7](https://github.com/ionic-enterprise/cs-demo-weather-widgets/commit/7a40fe73b84eab1549cef2071ecdc78609b9ded1))
- **vue:** add the vue framework wrapper ([d058525](https://github.com/ionic-enterprise/cs-demo-weather-widgets/commit/d05852507be466dfb4829a183742aecc56d54992))
