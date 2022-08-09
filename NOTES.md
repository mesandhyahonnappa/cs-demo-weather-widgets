# Notes on Building Your Own Library

You may want to create your own web component library using Stencil. For this reason, I will document here how I went about creating this library. This `NOTES.md` file just covers the basic tooling of the overall project. To see how each of the individual `packages` was created, please see the `NOTES.md` file for each package individually.

## The Monorepo

When creating a Stencil based web component library that uses the Ionic Framework wrappers, it makes a lot of sense to organize the projects into a monorepo structure. For this repo I chose to use [pnpm workspaces](https://pnpm.io/workspaces) to manage the monorepo structure.

This README is not intended to be a complete document on how to use `pnpm` to create and manage monorepos. It only documents the simple structure that is used here.

To set up the monorepo:

```
mkdir cs-demo-weather-widgets
cd cs-demo-weather-widgets
pnpm init
```

This created a very basic `package.json` file. From here, we need to:

- Add a workspace file.
- Configure `git`.
- Add the [changesets](https://github.com/changesets/changesets) tool.
- Update the `package.json` file.

## Add the Workspace File

Add a file called `pnpm-workspace.yaml` with the following contents:

```yaml
packages:
  - 'packages/*'
```

Later, we will create a `packages` folder that will contain all of our libraries.

## Configure `git`

### Initialize

The first thing we need to do is initialize git:

```bash
git init
```

### Create Some Hooks

Code formatting wars and people pushing code that does not lint or has failing tests can be serious problems. [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) provide a great mechanism to avoid these kinds of issues through the enforce of standards.

Here is an example:

```bash
pnpm add -D --ignore-workspace-root-check @ionic/prettier-config husky prettier pretty-quick
```

[Husky](https://typicode.github.io/husky/#/) is used to manage the git hooks. [Prettier](https://prettier.io/) and [pretty-quick](https://www.npmjs.com/package/pretty-quick) are used to facilitate the code formatting according to [our standards](https://www.npmjs.com/package/@ionic/prettier-config).

Make the following changes to the `package.json`:

```JSON
{
  ...
  "scripts": {
    "prepare": "husky install"
  },
  ...
  "prettier": "@ionic/prettier-config"
}
```

To initially set up the git hooks, you can run the `prepare` script you just added. For other developers who clone your project, this happens automatically when they install the dependencies.

```
pnpm prepare
```

This creates a `.husky` directory for your hooks. I create two hooks: `pre-commit` and `pre-push`.

```bash
pnpm husky add .husky/pre-commit "npx pretty-quick --staged"
pnpm husky add .husky/pre-push "npm run lint"
```

Update the `pre-push` to run the tests on a push to `main`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint

branch=`git rev-parse --abbrev-ref HEAD`
if [ "main" = "$branch" ]; then
  npm run test
fi;
```

Here is the reasoning behind the git-hooks:

1. Improperly formatted code should _never_ be committed. The `pre-commit` hook will fix any bad formatting.
1. Your code should always lint. Period. If it doesn't then you can't push it, even to your own feature branch.
1. Your code may have some testing issues while in development, but those absolutely need to be fixed before that code makes it into the main branch.

There is _one_ problem, though. This repo contains a lot of generated code, and we cannot be responsible for its formatting. Create a `.prettierignore` file to ignore the generated code.

```
packages/core/src/components.d.ts
packages/core/src/components/**/readme.md
packages/angular
packages/react
packages/vue
pnpm-lock.yaml
```

### Create the `.gitignore` File

We use the following basic `.gitignore` in the root of the monorepo:

```
*~
*.sw[mnpcod]
*.log
*.lock
*.tmp
*.tmp.*
log.txt
*.sublime-project
*.sublime-workspace
.idea/
.vscode/
.sass-cache/
.versions/
node_modules/
$RECYCLE.BIN/

.DS_Store
Thumbs.db
UserInterfaceState.xcuserstate
.env
```

Other packages within the monorepo will have their own `.gitignore` files with other items that are specific to them.

## Install `changesets`

We use the [changesets](https://github.com/changesets/changesets) tool manage version bumps and CHANGELOG.md file generation. As such, we need to install it:

```bash
pnpm add -D --ignore-workspace-root-check @changesets/cli
pnpm changeset init
```

Notice that the `pnpm changeset init` command added a `.changeset` folder with a `README.md` and `config.json`. Update the `.changeset/config.json` file, setting the `fixed` value to ensure all of our packages get their versions bumped together:

```json
{
  ...
  "fixed": [["@ionic-enterprise/**"]],
  ...
}
```

All other settings can remain with their default values.

**Note:** when committing files to `git`, all files in the `.changeset` folder should be included.

## The `package.json` File

At this point a basic `package.json` file was generated. Edit the `package.json` file to contain the information that is required as well as the scripts to use while developing the library.

Update the basic information (`name`, `description`, `author`, etc). Those values do not really mean much at this level in the repo, but they provide information to future developers.

The most important part is the `scripts` section. Keep the scripts as simple as possible while also providing the functionality that is required. For example:

```json
  "scripts": {
    "build": "pnpm run -r build",
    "bump": "changeset version",
    "lint": "pnpm run -r lint",
    "prepare": "husky install",
    "release": "pnpm lint && pnpm test && pnpm build && pnpm publish -r",
    "test": "pnpm run -r test"
  },
```

- **build**: Build the packages. `pnpm` will figure out that it needs to build the `@ionic-enterprise/cs-demo-weather-widgets` (`core`) package first.
- **bump**: Based on the existing changesets, bump the versions of our packages and generate the CHANGELOG.md files. The result of this operation should be reviewed and either committed or rolled back.
- **lint**: Lint any package that has a `lint` command.
- **prepare**: Installs the git hooks (configured above)
- **release**: Lint, test, and build. If that all succeeds, publish each package to NPM.
- **test**: Test any package that has a `test` command.

Many of these commands are just for convenience, allowing you to type `pnpm build` rather than `pnpm run -r build`, for example.

**Note:** most of these commands will fail to do anything if you try them right now since we don't actually have any packages at this time.

## Packages

At this point it is time to do a baseline commit and then start creating the various packages you will need.

```bash
git add .
git commit -m "initial commit"
```

For our project, the following packages have been created. See the `NOTES.md` files for details on how they were created:

- **[core](packages/core/NOTES.md)**: the Stencil based web components, distributed on via NPM as `@ionic-enterprise/cs-demo-weather-widgets`
- **[angular](packages/angular/NOTES.md)**: Angular proxies, distributed via NPM as `@ionic-enterprise/cs-demo-weather-widgets angular`
- **[react](packages/react/NOTES.md)**: React proxies, distributed via NPM as `@ionic-enterprise/cs-demo-weather-widgets-react`
- **[vue](packages/vue/NOTES.md)**: Vue proxies, distributed via NPM as `@ionic-enterprise/cs-demo-weather-widgets-vue`

When creating your own library, start with the Stencil library (`core` in this case). With a simple library in place, create the projects for each framework wrapper. At that point, circle back to the Stencil library and continue to develop the web components.

Happy Coding!! 🤓
