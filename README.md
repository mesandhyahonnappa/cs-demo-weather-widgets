# Customer Success Demo: Weather Widgets - A Stencil Based Web Component Library

If you are looking for a library that will provide components that you can use to build the next great weather application, you are in the wrong spot.

This project was put together in order to show a simple monorepo architecture and build system. This project uses [Stencil](https://stenciljs.com/) to build a library of web components and then uses the [Stencil Framework Wrappers](https://github.com/ionic-team/stencil-ds-output-targets) to package the components for use with each of the three major application frameworks (Angular, React, and Vue).

## Building

If you would like to build this for yourself, you can follow these steps.

- `git clone https://github.com/ionic-enterprise/cs-demo-weather-widgets.git`
- `cd cs-demo-weather-widgets`
- `pnpm i`
- `pnpm build`

## Making Changes

This project uses [changesets](https://github.com/changesets/changesets) to generate change logs and to do the version bumping. Their use, however, is _not_ enforced at this time. The following flow is suggested:

- Create a feature branch (`git checkout -b feature/some-good-name` )
- Make a series of small changes with commits (`git commit -m "WIP - hook up the thing"`)
  - The first commit should follow conventional changelog standards (`(feat): add a thing`)
  - Subsequent commits should likely start with "WIP"
- Make the changeset (`pnpm changeset`)
  - Be sure to follow [semver](https://semver.org/) when asked about the bump type:
    - `major`: breaking change
    - `minor`: added feature
    - `patch`: bug fix, refactoring, etc
  - Give the change set a good description
- Commit the changeset (`git commit -m "WIP - create the changeset"`)
- Squash the commits to a single commit (`git rebase -i origin/main`)
  - The first commit may need to be reworded.
  - The other commits should almost always get a `fixup` (or `f`)
- The change is now ready for either a pull request or a direct "fast-forward" merge into `main`

## Publishing

**Note:** these packages are specifically scoped to our `@ionic-enterprise` scope. As such, you need to be a member of the Ionic Enterprise org in order to publish them. If you would like to publish your own version for any reason, please fork this project and change the package names to be scoped to your own user or organization.

**Not sure how to create a scope in npm?** You need to [create an NPM account](https://docs.npmjs.com/creating-a-new-npm-user-account), and an [organization](https://docs.npmjs.com/creating-an-organization). That new organization name will be your scope. As an example, if your organzation name is `acme`, your scope would be `@acme`.

The publishing process involves three main steps: bump the versions, tag the bump commit, publish:

- Bump the versions
  - `git checkout main` (also, make sure everything you want is there, everything is pushed, etc)
  - `pnpm bump`
  - review the changes
  - `git add .`
  - `git commit -m "chore(): update the version to x.y.z"`
- Tag the bump commit
  - `git tag -a v2.0.0 -m "release v2.0.0"`
  - `git push --tags`
- Publish: `pnpm release`

The `pnpm release` command will run the linting, run the tests, and run the build. If that all passes, the packages will then be published to NPM.

One note on the publishing. By default, NPM publishes scoped packages as private. This can only be done if you are paying money to NPM. You _can_, however, publish public scoped packages for free. If you look in the `package.json` for each individual package you will see the following configuration specifying to do exactly that:

```JSON
  "publishConfig": {
    "access": "public"
  },
```

## Building Your Own Library

If you would like to create your own library following this same pattern, please have a look at the [NOTES.md](NOTES.md) for details on how this repository was constructed.

Happy Coding!! 🤓
