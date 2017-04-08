/* eslint-env mocha */
var path = require('path')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')
const utils = require('./app/utils.js')

describe('generator', function () {
  it('should generate minimal files', function (done) {
    helpers.run(path.join(__dirname, '/app'))
      .withPrompts({
        moduleName: 'test',
        githubUsername: 'test',
        website: 'test.com',
        yarn: true
      })
      .then(function () {
        assert.file([
          '.git',
          '.gitignore',
          '.npmignore',
          'index.js',
          'license',
          'package.json',
          'readme.md',
          'test.js'
        ])

        assert.noFile(['.travis.yml', '.appveyor.yml'])

        assert.jsonFileContent('package.json', {name: 'test'})
        assert.jsonFileContent('package.json', {author: {url: 'test.com'}})
        assert.fileContent('readme.md', '(test.com)')
        assert.fileContent('.gitignore', 'yarn-error.log')
        assert.fileContent('.npmignore', 'yarn-error.log')

        done()
      })
      .catch(done)
  })

  it('should use travis without coveralls', function (done) {
    helpers.run(path.join(__dirname, '/app'))
      .withPrompts({
        moduleName: 'test',
        githubUsername: 'test',
        website: 'test.com',
        ci: true,
        travis: true,
        appveyor: false,
        yarn: true
      })
      .then(function () {
        assert.file([
          '.git',
          '.gitignore',
          '.npmignore',
          'index.js',
          'license',
          'package.json',
          'readme.md',
          'test.js',
          '.travis.yml'
        ])

        assert.noFile(['.appveyor.yml'])

        assert.fileContent('readme.md', '[![Travis build status][travis-image]][travis-url]')
        assert.fileContent('readme.md', '[travis-image]: https://travis-ci.org/test/test.svg?branch=master')
        assert.fileContent('readme.md', '[travis-url]: https://travis-ci.org/test/test')

        done()
      })
      .catch(done)
  })

  it('should use travis with coveralls', function (done) {
    helpers.run(path.join(__dirname, '/app'))
      .withPrompts({
        moduleName: 'test',
        githubUsername: 'test',
        website: 'test.com',
        ci: true,
        travis: true,
        appveyor: false,
        coverage: true,
        coveralls: true,
        yarn: true
      })
      .then(function () {
        assert.file([
          '.git',
          '.gitignore',
          '.npmignore',
          'index.js',
          'license',
          'package.json',
          'readme.md',
          'test.js',
          '.travis.yml'
        ])

        assert.noFile(['.appveyor.yml'])

        assert.jsonFileContent('package.json', {
          coverage: /^standard &&.*/,
          devDependencies: {coveralls: '^2.13.0', istanbul: '^0.4.5'}
        })

        assert.fileContent('.travis.yml', '\'cat coverage/lcov.info | ./node_modules/.bin/coveralls\'')

        assert.fileContent('readme.md', '[![Travis build status][travis-image]][travis-url]')
        assert.fileContent('readme.md', '[![Coveralls coverage status][coveralls-image]][coveralls-url]')
        assert.fileContent('readme.md', '[travis-image]: https://travis-ci.org/test/test.svg?branch=master')
        assert.fileContent('readme.md', '[travis-url]: https://travis-ci.org/test/test')
        assert.fileContent('readme.md', '[coveralls-image]: https://coveralls.io/repos/github/test/test/badge.svg?branch=master')
        assert.fileContent('readme.md', '[coveralls-url]: https://coveralls.io/github/test/test?branch=master')

        done()
      })
      .catch(done)
  })

  it('should use appveyor', function (done) {
    helpers.run(path.join(__dirname, '/app'))
      .withPrompts({
        moduleName: 'test',
        githubUsername: 'test',
        website: 'test.com',
        ci: true,
        travis: false,
        appveyor: true,
        yarn: true
      })
      .then(function () {
        assert.file([
          '.git',
          '.gitignore',
          '.npmignore',
          'index.js',
          'license',
          'package.json',
          'readme.md',
          'test.js',
          '.appveyor.yml'
        ])

        assert.noFile(['.travis.yml'])

        assert.fileContent('readme.md', '[![Appveyor build status][appveyor-image]][appveyor-url]')
        assert.fileContent('readme.md', '[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/test/test?svg=true&branch=master')
        assert.fileContent('readme.md', '[appveyor-url]: https://ci.appveyor.com/project/test/test')

        done()
      })
      .catch(done)
  })
  it('should override prompts with options', function (done) {
    helpers.run(path.join(__dirname, '/app'))
      .withPrompts({
        moduleName: 'test',
        githubUsername: 'test',
        website: 'test.com'
      })
      .then(function () {
        done()
      })
      .catch(done)
  })
})

describe('utils', function () {
  it('should return the repo name', function () {
    assert.equal(utils.repoName('repo'), 'repo')
    assert.equal(utils.repoName('@leelow/repo'), 'repo')
  })

  it('should slugify a package name', function () {
    assert.equal(utils.slugifyPackageName('Hello World !'), 'hello-world')
    assert.equal(utils.slugifyPackageName('@leelow/Hello World !'), '@leelow/hello-world')
  })
})
