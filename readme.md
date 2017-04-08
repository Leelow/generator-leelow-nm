# generator-leelow-nm

[![NPM downloads][downloads-image]][downloads-url]
[![Travis build status][travis-image]][travis-url]
[![Appveyor build status][appveyor-image]][appveyor-url]
[![Coveralls coverage status][coveralls-image]][coveralss-url]
[![JavaScript Style Guide][javascript-standard-image]][javascript-standard-url]

> Scaffold out a node module

## Install

```
$ npm install --global yo generator-leelow-nm
```

## Usage

With [yo](https://github.com/yeoman/yo):

```
$ yo nm
```

There are multiple command-line options available:

```
$ yo nm --help

  Usage:
    yo nm [options]

  Options:
    --help          # Print the generator's options and usage
    --skip-cache    # Do not remember prompt answers                      Default: false
    --skip-install  # Do not automatically install dependencies           Default: false
    --org           # Publish to a GitHub organization account
    --yarn          # Use yarn instead of npm
    --travis        # Use travis-ci.org for continuous integration
    --appveyor      # Use appveyor.com for continuous integration
    --coverage      # Add code coverage with istanbul
    --coveralls     # Upload coverage to coveralls.io (implies --coverage and --travis)
```

The `--org` option takes a string value. All others are boolean flags and can be negated with the `no` prefix (i.e. `--no-coveralls`). You will be prompted for any options not passed on the command-line.

## Credit

This generator is strongly inspired by this awesome generator [generator-nm](https://github.com/sindresorhus/generator-nm).

## License

MIT © [Leelow](https://github.com/Leelow)

[npm-version-image]: https://img.shields.io/v/generator-leelow-nm.svg
[npm-version-url]: https://www.npmjs.com/package/generator-leelow-nm
[downloads-image]: https://img.shields.io/npm/dt/generator-leelow-nm.svg?maxAge=3600
[downloads-url]: https://www.npmjs.com/package/generator-leelow-nm
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/Leelow/generator-leelow-nm?svg=true&branch=master
[appveyor-url]: https://ci.appveyor.com/project/Leelow/generator-leelow-nm
[travis-image]: https://travis-ci.org/Leelow/generator-leelow-nm.svg?branch=master
[travis-url]: https://travis-ci.org/Leelow/generator-leelow-nm
[coveralls-image]: https://coveralls.io/repos/github/Leelow/generator-leelow-nm/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Leelow/generator-leelow-nm?branch=master
[javascript-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[javascript-standard-url]: http://standardjs.com/