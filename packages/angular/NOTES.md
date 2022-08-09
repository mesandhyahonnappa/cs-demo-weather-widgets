# Framework Wrapper: Angular

Web components are well supported by Angular via the [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA). Use of this schema, however, is not ideal as it can mask various compile type errors when parsing the templates. It would also require the consumer of our library to import and call the function(s) that define our web components within the DOM. To avoid this, we will create a set of proxies that wrap our components and an `NgModule` that allows for easy consumption of them.

To do this, we use the [Stencil Angular Output Target](https://www.npmjs.com/package/@stencil/angular-output-target). The configuration we follow here is a specific implementation of the [more general documentation](https://stenciljs.com/docs/angular) found on the Stencil site.

## Create the Project

The first thing we need to do is generate the project.

```bash
cd packages
pnpm --package=@angular/cli dlx ng new angular --no-create-application
cd angular
pnpm --package=@angular/cli dlx ng generate library component-library
```

## Adjust the Configuration

The generated configuration applies to a generic Angular project. We need top modify the configuration to allow us to publish a single library.

We need to:

- Change the build output location to `dist/`
- Update the `package.json` file for publication 

### Change the Build Output Location

Open the `projects/component-library/ng-package.json` file and find the `dest` value. Change it to `../../dist`. Everything else in that file can stay the same.

### Update the `package.json` File

The existing `package.json` file is not appropriate for publishing a library to a registry. Make the following modifications.

1. Move all of the existing `dependencies` to be included in the `devDependencies`.
1. Remove the `private: true` to allow the package to be published.
1. Remove the `test` script or rename it to `test:dev` (all of this code is generated)
1. Update the `name` to match the scope and name that these wrappers will be published under (for example: `@ionic-enterprise/cs-demo-weather-widgets-angular`).
1. Add the `description`, `license`, `homepage`, `repository`, `module`, `types`, `files`, `peerDependencies`, and `publishConfig` values (see bellow for a sample).
1. Add our Stencil project as the sole dependency. Run a command such as the following (adjust for your own package names):
   `pnpm add @ionic-enterprise/cs-demo-weather-widgets`

When you are finished, your `package.json` file should look something like this:

```JSON
{
  "name": "@ionic-enterprise/cs-demo-weather-widgets-angular",
  "description": "Angular specific proxies for @ionic-enterprise/cs-demo-weather-widgets",
  "license": "MIT",
  "version": "0.0.0",
  "homepage": "https://github.com/ionic-enterprise/cs-demo-weather-widgets",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/ionic-enterprise/cs-demo-weather-widgets.git"
  },
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development"
  },
  "module": "dist/",
  "types": "dist/component-library.d.ts",
  "files": [
    "dist/"
  ],
  "dependencies": {
    "@ionic-enterprise/cs-demo-weather-widgets": "workspace:~0.0.0"
  },
  "devDependencies": {
    ...
  },
  "peerDependencies": {
    "@angular/core": ">=13.3.0",
    "@angular/forms": ">=13.3.0",
    "@angular/router": ">=13.3.0",
    "rxjs": ">=7.5.0",
    "zone.js": ">=0.11.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

## Install the Framework Wrapper

Switch back to the Stencil project and add the Angular Framework Wrapper. As always, adjust the following commands for your own directory structure.

```bash
cd ../core
pnpm add -D @stencil/angular-output-target
```

The Angular Framework Wrapper is configured in a similar manner to the other output targets. We will use a set of options that allow us to export the output of the `dist-custom-elements` build. That is, we are publishing the ES6 modules. See the [framework wrapper documentation](https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/angular-output-target/README.md) for a full set of options.

```typescript
import { Config } from '@stencil/core';
import { angularOutputTarget as angular } from '@stencil/angular-output-target';
...

export const config: Config = {
  ...
  outputTargets: [
    angular({
      componentCorePackage: '@ionic-enterprise/cs-demo-weather-widgets',
      directivesProxyFile: '../angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/component-library/src/lib/stencil-generated/index.ts',
      includeImportCustomElements: true,
    }),
    ...
  ]
}
```

Run a build from the `packages/core` directory. It should succeed, and the files in `../angular/projects/component-library/src/lib/stencil-generated` should be successfully created. It is now time to clean up the Angular library.

## Clean up the Angular Library

Switching back to the Angular library (`cd ../angular`), we need to perform the following cleanup:

- Add our own `NgModule`(s).
- Export our items from the `public-api.ts` file.
- Remove the boilerplate code that was generated by the Angular CLI.

### Create Our `NgModule`(s)

There are currently two main ways to do this: create one-module-to-rule-them-all or create Single Component Angular Modules (SCAMs). Only use ONE of these strategies. Do not try to use them both.

#### The One-Module

Going the one-module route is easy and scales well as the component library grows. However, this also means that the consumer of the library bundles every component whenever they import our library.

Create a `projects/component-library/src/lib/cs-demo-weather-widgets.module.ts` file with the following contents:

```typescript
import { NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class CsdemoWeatherWidgetsModule {}
```

#### The SCAMs

This is the strategy used by this project. The advantage with SCAMs is it makes it easier for consumers of the library to control their bundle sizes. The disadvantage is a slightly higher maintenance cost when it comes to maintaining the component library. Since this cost is _only_ incurred if a component is added, removed, or renamed, the cost should not be too high.

To create SCAMs, create one `projects/component-library/src/lib/csdemo-*.module.ts` file per component with the following format:

```typescript
import { NgModule } from '@angular/core';
import { CsdemoCondition } from './stencil-generated/components';

@NgModule({
  declarations: [CsdemoCondition],
  exports: [CsdemoCondition],
})
export class CsdemoConditionModule {}
```

You can also create a one-module (`projects/component-library/src/lib/csdemo-weather-widgets.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { CsdemoConditionModule } from './csdemo-condition.module';
import { CsdemoDailyForecastModule } from './csdemo-daily-forecast.module';
import { CsdemoTemperatureModule } from './csdemo-temperature.module';
import { CsdemoUvIndexModule } from './csdemo-uv-index.module';

@NgModule({
  imports: [CsdemoConditionModule, CsdemoDailyForecastModule, CsdemoTemperatureModule, CsdemoUvIndexModule],
  exports: [CsdemoConditionModule, CsdemoDailyForecastModule, CsdemoTemperatureModule, CsdemoUvIndexModule]
})
export class CsdemoWeatherWidgetsModule {}
```

This gives the consumer the greatest number of bundling options with minimal extra maintenance costs.

### Export Our Library Code

Open `projects/component-library/src/public-api.ts` in the editor. Remove the existing exports, and replace them with the following:

```typescript
export * from './lib/stencil-generated/components';
export * from './lib/cs-demo-weather-widgets.module';
```

### Remove the Boilerplate Code

At this point, it should be safe to remove the unused boilerplate code.

```bash
rm projects/component-library/src/lib/component-library.*
```

## Notes

1. See the [consumer usage](https://stenciljs.com/docs/angular#consumer-usage) section of the documentation for tips on how to efficiently consume the package in an Angular application.
1. In the future, it may be easier to create Single Component Angular Modules (SCAMs) from this project.
1. You may or may not want to back down the Angular version used. For example, in creating this README, I went with the versions the NG CLI applied at the time. For my actual project, I backed it down to version `13.1.0`. This is an engineering decision based on what you need to support combined with what is realistic to actually support. Generally, the last one or two major versions of Angular will be a solid choice.
1. This document was written using the naming conventions within this project. You can (and should) adjust for your own project.

Happy Coding!! 🤓

