# Framework Wrapper: Vue

Web components are very well supported by Vue. That said, it is still beneficial to use the [Stencil Vue Output Target](https://www.npmjs.com/package/@stencil/vue-output-target) to provide our users with an excellent developer experience when using our components. The configuration we follow here is a specific implementation of the [more general documentation](https://stenciljs.com/docs/vue) found on the Stencil site.

## Create the Project

### Create `projects/vue`

The first thing we need to do is create the Vue Framework Wrapper package folder in our monorepo. The commands here assume you are starting from the root of your monorepo.

```bash
cd packages
mkdir vue
cd vue
```

### Add the `package.json` File

Create a `packages.json` file in `packages/vue` with the following default content:

```json
{
  "name": "@ionic-enterprise/cs-demo-weather-widgets-vue",
  "version": "0.0.0",
  "description": "Vue specific proxies for @ionic-enterprise/cs-demo-weather-widgets",
  "author": "Ionic Customer Success Team <support@ionic.io>",
  "homepage": "https://github.com/ionic-enterprise/cs-demo-weather-widgets",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ionic-enterprise/cs-demo-weather-widgets.git"
  },
  "bugs": {
    "url": "https://github.com/ionic-enterprise/cs-demo-weather-widgets/issues"
  },
  "scripts": {
    "build": "npm run clean && npm run compile",
    "clean": "rimraf dist && rimraf dist-transpiled",
    "compile": "npm run tsc && rollup -c",
    "tsc": "tsc -p ."
  },
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/types/index.d.ts",
  "files": [
    "dist/"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

Change applicable items such as the `name`, `description`, `author`, `homepage` etc to match your project.

### Install the Vue Framework Wrappers

The Framework Wrapper needs to be installed in the Stencil component library project. The wrapper is automatically run as part of the Stencil build process. It generates the proxy code within the `packages/vue` project.

```bash
cd ../core
pnpm add -D @stencil/vue-output-target
```

The Vue Framework Wrapper is configured in a similar manner to the other output targets. We will use a set of options that allow us to export the output of the `dist-custom-elements` build. That is, we are publishing the ES6 modules. See the [framework wrapper documentation](https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/vue-output-target/README.md) for a full set of options.

```typescript
import { Config } from '@stencil/core';
...
import { vueOutputTarget as vue } from '@stencil/vue-output-target';
...

export const config: Config = {
  ...
  outputTargets: [
    ...
    vue({
      componentCorePackage: '@ionic-enterprise/cs-demo-weather-widgets',
      proxiesFile: '../vue/src/components.ts',
      includeDefineCustomElements: false,
      includeImportCustomElements: true,
    }),
    ...
  ]
}
```

Perform  build in the `packages/core` directory using `pnpm build`.

### Build the Vue Project

Go to the `packages/vue` directory. We need to create the build process for our proxies.

```bash
cd ../vue
```

The Vue Framework Wrapper generated a `src/components.ts` file in this project. Create a `src/index.ts` file that exports it:

```typescript
export * from './components';
```

We need to install some `devDependencies` and add the dependency for our Stencil web component library.

```bash
pnpm add -D vue typescript rimraf @rollup/plugin-node-resolve rollup rollup-plugin-sourcemaps
pnpm add @ionic-enterprise/cs-demo-weather-widgets
```

Create a handful of configuration files.

**tsconfig.json**

```json
{
  "compilerOptions": {
    "allowUnreachableCode": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "outDir": "./dist-transpiled",
    "declarationDir": "dist/types",
    "lib": ["dom", "es2020"],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es2017",
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"],
  "compileOnSave": false,
  "buildOnSave": false
}
```

**rollup.config.js**

```javascript
import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const external = ['vue', 'vue-router'];

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
  external: (id) => external.includes(id) || id.startsWith('stencil-library'),
  plugins: [
    resolve(),
    sourcemaps(),
  ],
};
```

**.gitignore**

```
dist/
dist-transpiled/
```

The package should now build successfully.

Happy Coding!! 🤓
