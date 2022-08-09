# Framework Wrapper: React

Web components are not very well supported by React. For this reason it is important that we use the [Stencil React Output Target](https://www.npmjs.com/package/@stencil/react-output-target) to provide our users with an excellent developer experience when using our components. The configuration we follow here is a specific implementation of the [more general documentation](https://stenciljs.com/docs/react) found on the Stencil site.

## Create the Project

The first thing we need to do is create the React Framework Wrapper project in our monorepo. The commands here assume you are starting from the root of your monorepo.

```bash
cd packages
git clone https://github.com/ionic-team/stencil-ds-react-template react
cd react
rm -rf .git
pnpm i
```

## Update the `package.json` File

The `package.json` file needs a few minor updates:

1. Update the `name` to match the scope and name that these wrappers will be published under (for example: `@ionic-enterprise/cs-demo-weather-widgets-react`).
1. Remove the `private: true` to allow the package to be published.
1. Update or add the `description`, `license`, `homepage`, `repository` `version`, and `publishConfig` values (see bellow for a sample).
1. `pnpm add -D @rollup/plugin-node-resolve rollup-plugin-sourcemaps rollup rimraf` (we will use this later, it is just easiest to install it now)
1. Add our Stencil project as the sole dependency. Run a command such as the following (adjust for your own package names): `pnpm add @ionic-enterprise/cs-demo-weather-widgets`

```JSON
{
  "name": "@ionic-enterprise/cs-demo-weather-widgets-react",
  "sideEffects": false,
  "description": "React specific proxies for @ionic-enterprise/cs-demo-weather-widgets",
  "license": "MIT",
  "homepage": "https://github.com/ionic-enterprise/cs-demo-weather-widgets#readme",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/ionic-enterprise/cs-demo-weather-widgets.git"
  },
  "version": "0.0.0",
  "scripts": {
    ...
  },
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist/"
  ],
  "devDependencies": {
    ...
  },
  "dependencies": {
    "@ionic-enterprise/cs-demo-weather-widgets": "workspace:~0.0.0"
  },
  "peerDependencies": {
    ...
  },
  "jest": {
    ...
  },
  "publishConfig": {
    "access": "public"
  }
}
```

## Install the React Framework Wrapper

Switch back to the Stencil project and add the React Framework Wrapper. As always, adjust the following commands for your own directory structure.

```bash
cd ../core
pnpm add -D @stencil/react-output-target
```

The React Framework Wrapper is configured in a similar manner to the other output targets. We will use a set of options that allow us to export the output of the `dist-custom-elements` build. That is, we are publishing the ES6 modules. See the [framework wrapper documentation](https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/README.md) for a full set of options.

```typescript
import { Config } from '@stencil/core';
...
import { reactOutputTarget as react } from '@stencil/react-output-target';
...

export const config: Config = {
  ...
  outputTargets: [
    ...
    react({
      componentCorePackage: '@ionic-enterprise/cs-demo-weather-widgets',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: false,
      includeImportCustomElements: true,
    }),
    ...
  ]
}
```

Run a build from the `packages/core` directory. It should succeed, and the files in `../react/src/components/stencil-generated` should be successfully created.

## Fix the Sourcemaps

If you go back to the `react` framework wrapper directory and perform a `npm run build` you will see that the `dist/index.js.map` file references the source code. We do not want to have to distribute the source. Instead, let's incorporate Rollup and use it to embed the source into the sourcemaps.  We need an intermediate build step. The TypeScript build will need to output the bundles to a temporary location. We will use `dist-transpiled/` for this. However, we would still like the types to be output to `dist/`. Update the `tsconfig.json` file. Change the `outDir` to `dist-transpiled`. Add a `declarationDir` with the value of `dist/types`.

```json
{
  "compilerOptions": {
    ...
    "outDir": "dist-transpiled",
    "declarationDir": "dist/types",
    ...
  },
  ...
}
```

We need to modify the build scripts in `package.json` accordingly.

- The `clean` will need to clean the `dist` and the `dist-transpiled` directories.
- The `build` will need to perform the `rollup` step after the TypeScript build is complete.
- The `types` declaration needs to be adjusted for the new location.

Here is an example that puts that all together:

```json
  "scripts": {
    "build": "npm run clean && npm run compile",
    "clean": "rimraf dist && rimraf dist-transpiled",
    "compile": "npm run tsc && rollup -c",
    "tsc": "tsc -p ."
  },
  ...
  "types": "./dist/types/index.d.ts",
```

A couple of final clean up tasks are required.

- Edit the `.gitignore` to ignore the `dist-transpiled` directory.
- Create the following `rollup.config.js` file:

```javascript
import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: {
    index: 'dist-transpiled/index',
  },
  onwarn: function(warning) {
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    console.warn( warning.message );
  },
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist/',
      format: 'commonjs',
      preferConst: true,
      sourcemap: true,
    },
  ],
  external: (id) => !/^(\.|\/)/.test(id),
  plugins: [
    resolve(),
    sourcemaps(),
  ],
};
```

Try a `pnpm build` and the React output target should build properly. Try a build from the root of the monorepo and everything should rebuild correctly.

Happy Coding!! 🤓
