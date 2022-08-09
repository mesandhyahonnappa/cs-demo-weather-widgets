# Building Your Own Library

If you want to build your own library, here are the steps to follow:

## Create the Infrastructure

These instructions assume you are currently in the root of your monorepo.

```bash
mkdir packages
cd packages
npm init stencil components core
cd core
```

This will create a directory with the name you specified (`core` in this case). This directory contains the component library code. Later we will change the published `name` of the package in the generated `package.json` file. The directory name and the package name do not have to match

## Update the `package.json` File

In addition to adding the Prettier config, you should also update the following:

- **name**: Make it match whatever you want to published name of this project to be (`@ionic-enterprise/cs-demo-weather-widgets`) in this case.
- **description**: Describe your project.
- **files**: Add `components/`.
- **homepage**: Use your project's home page, or at least README file.
- **repository**: Match where you host this project.
- **version**: Start with `0.0.0`

## Update the `stencil.config.ts` File

The framework wrapper projects that we will install later will default to using the `components` directory to find the ES6 modules for the components. Update the `dist-custom-elements` configuration to output to that directory:

```typescript
    {
      type: 'dist-custom-elements',
      dir: 'components',
    },
```

That is the only change required at this point. The rest of the configuration that you currently see in this file will be added as we create each of the Framework Wrapper packages.

**Note:** you _can_ change the `namespace` if you want, and we _did_ do that. If you do this, you need to update the `unpkg` setting in the `package.json` file.

## Update the `.gitignore` File

The `components` build output needs to be ignored. However, we only want to ignore the `components/` directory immediately off of the root of this project. The `dist`, `www`, and `loader` directories are also off of the root. As such, move the `/` to the front of the directory name to _only_ ignore that directory off of the root of the project.

```
/dist
/www
/loader
/components
```

## Optionally `lint`

The Stencil project is not generated with `lint` enabled by default. I like to have code that properly lints. However, the current state of the `@stencil/eslint-plugin` package is probably best described as "it has its issues."

### If you would like to lint

1. Install the package:

   ```bash
   pnpm add -D @stencil/eslint-plugin @typescript-eslint/eslint-plugin@^4.0.0 eslint-plugin-react@^7.0.0 @typescript-eslint/parser@^4.0.0 typescript@^4.0.8 eslint@^7.0.0
   ```

2. Create a `.eslintrc.json` file:

   ```json
   {
     "parserOptions": {
       "project": "./tsconfig.json"
     },
     "extends": ["plugin:@stencil/recommended"]
   }
   ```

3. Add a script in your `package.json` file

   ```json
     "scripts": {
       ...,
       "lint": "eslint src/**/*{.ts,.tsx}",
       ...
     },
   ```

## Install `prettier`

We have `prettier` installed at the root of the monorepo, but some editors do better if it is also installed in the project itself. As such, install it and update the `package.json` file to include the configuration.

```bash
pnpm add -D prettier
```

```JSON
{
  ...,
  "prettier": "@ionic/prettier-config",
}
```

## Test Build and Lint

Back in the repository root (`cd ../../`):

```bash
pnpm i
pnpm build
pnpm lint
pnpm test
```

All commands should work. There will be lint warnings. There should be no errors.

## Conclusion

We will add more to this project's configuration as we add the Framework Wrappers. For now, though, this project is complete. Feel free to start building out the components.

Happy Coding!! 🤓
