# <%= repoName %>

[![NPM downloads][downloads-image]][downloads-url]<% if (travis) { %>
[![Travis build status][travis-image]][travis-url]<% } if (appveyor) { %>
[![Appveyor build status][appveyor-image]][appveyor-url]<% } if (coveralls) { %>
[![Coveralls coverage status][coveralls-image]][coveralls-url]<% } %>
[![JavaScript Style Guide][javascript-standard-image]][javascript-standard-url]

> <%= moduleDescription %>

## Install

```
$ npm install --save <%= moduleName %>
```

## Usage

```js
const <%= camelModuleName %> = require('<%= moduleName %>');

<%= camelModuleName %>('unicorns');
//=> 'unicorns & rainbows & sindresorhus'
```

## API

### <%= camelModuleName %>(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## License

MIT © [<%= name %>](<%= website %>)

[npm-version-image]: https://img.shields.io/v/<%= repoName %>.svg
[npm-version-url]: https://www.npmjs.com/package/<%= repoName %>
[downloads-image]: https://img.shields.io/npm/dt/<%= repoName %>.svg?maxAge=3600
[downloads-url]: https://www.npmjs.com/package/<%= repoName %><% if (appveyor) { %>
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/<%= githubUsername %>/<%= repoName %>?svg=true&branch=master
[appveyor-url]: https://ci.appveyor.com/project/<%= githubUsername %>/<%= repoName %><% } if (travis) { %>
[travis-image]: https://travis-ci.org/<%= githubUsername %>/<%= repoName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= githubUsername %>/<%= repoName %><% } if (coveralls) { %>
[coveralls-image]: https://coveralls.io/repos/github/<%= githubUsername %>/<%= repoName %>/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/<%= githubUsername %>/<%= repoName %>?branch=master<% } %>
[javascript-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[javascript-standard-url]: http://standardjs.com/