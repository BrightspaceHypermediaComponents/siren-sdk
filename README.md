# siren-sdk

This contains tools written in ES6 to help develop and use siren entities.

## Quick start

Options for getting started:

* [Download the latest release](../../releases).
* Clone the repo: `git clone https://github.com/BrightspaceHypermediaComponents/siren-sdk.git`.
* Install with [npm](https://www.npmjs.com/): `npm install siren-sdk`

## Versioning & Releasing

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated and a tag and GitHub release is created.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.
