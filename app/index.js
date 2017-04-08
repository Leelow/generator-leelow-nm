const superb = require('superb')
const normalizeUrl = require('normalize-url')
const humanizeUrl = require('humanize-url')
const Generator = require('yeoman-generator')
const _s = require('underscore.string')
const utils = require('./utils')

var self
var props
const or = function (option, prop) {
  return self.options[option] === undefined ? props[prop || option] : self.options[option]
}

module.exports = class extends Generator {
  constructor (a, b) {
    super(a, b)

    self = this

    this.option('org', {
      type: 'string',
      desc: 'Publish to a GitHub organization account'
    })

    this.option('yarn', {
      type: 'boolean',
      desc: 'Use yarn instead of npm'
    })

    this.option('coverage', {
      type: 'boolean',
      desc: 'Add code coverage with istanbul'
    })

    this.option('travis', {
      type: 'boolean',
      desc: 'Add continuous integration with travis-ci.org'
    })

    this.option('appveyor', {
      type: 'boolean',
      desc: 'Add continuous integration with appveyor.com'
    })

    this.option('coveralls', {
      type: 'boolean',
      desc: 'Upload coverage to coveralls.io (implies coverage)'
    })
  }

  init () {
    return this.prompt([{
      name: 'moduleName',
      message: 'What do you want to name your module?',
      default: _s.slugify(self.appname),
      filter: utils.slugifyPackageName
    }, {
      name: 'moduleDescription',
      message: 'What is your module description?',
      default: 'My ' + superb() + ' module'
    }, {
      name: 'githubUsername',
      message: 'What is your GitHub username?',
      store: true,
      validate: function (x) {
        return x.length > 0 || 'You have to provide a username'
      },
      when: function () {
        return !self.options.org
      }
    }, {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true,
      validate: function (x) {
        return x.length > 0 || 'You have to provide a website URL'
      },
      filter: function (x) {
        return normalizeUrl(x)
      }
    }, {
      name: 'ci',
      message: 'Do you need continuous integration?',
      type: 'confirm',
      default: Boolean(self.options.travis || self.options.appveyor)
    }, {
      name: 'travis',
      message: 'Do you need continuous integration with travis?',
      type: 'confirm',
      default: true,
      when: function (x) {
        return x.ci && (self.options.travis === undefined)
      }
    }, {
      name: 'appveyor',
      message: 'Do you need continuous integration with appveyor?',
      type: 'confirm',
      default: true,
      when: function (x) {
        return x.ci && (self.options.appveyor === undefined)
      }
    }, {
      name: 'coverage',
      message: 'Do you need code coverage?',
      type: 'confirm',
      default: Boolean(self.options.coveralls || self.options.coverage),
      when: function () {
        return (self.options.coverage === undefined) && (self.options.coveralls === undefined)
      }
    }, {
      name: 'coveralls',
      message: 'Upload coverage to coveralls.io?',
      type: 'confirm',
      default: true,
      when: function (x) {
        return (x.coverage || self.options.coverage) && (self.options.coveralls === undefined)
      }
    }, {
      name: 'yarn',
      message: 'Use yarn instead of npm?',
      type: 'confirm',
      default: true,
      when: function () {
        return self.options.yarn === undefined
      }
    }]).then(function (_props) {
      props = _props

      const travis = or('travis')
      const appveyor = or('appveyor')
      const coveralls = or('coveralls')
      const coverage = coveralls || or('coverage', 'istanbul')

      const repoName = utils.repoName(props.moduleName)

      const tpl = {
        moduleName: props.moduleName,
        moduleDescription: props.moduleDescription,
        camelModuleName: _s.camelize(repoName),
        githubUsername: self.options.org || props.githubUsername,
        repoName: repoName,
        name: self.user.git.name(),
        email: self.user.git.email(),
        website: props.website,
        humanizedWebsite: humanizeUrl(props.website),
        travis: travis,
        appveyor: appveyor,
        coverage: coverage,
        coveralls: coveralls
      }

      function mv (from, to) {
        self.fs.move(self.destinationPath(from), self.destinationPath(to))
      }

      self.fs.copyTpl([
        self.templatePath() + '/**',
        (travis ? '' : '!') + self.templatePath() + '/**/travis.yml',
        (appveyor ? '' : '!') + self.templatePath() + '/**/appveyor.yml'
      ], self.destinationPath(), tpl)

      mv('gitignore', '.gitignore')
      mv('npmignore', '.npmignore')
      mv('_package.json', 'package.json')

      if (travis) mv('travis.yml', '.travis.yml')
      if (appveyor) mv('appveyor.yml', '.appveyor.yml')
    })
  }

  git () {
    self.spawnCommandSync('git', ['init'])
  }

  install () {
    var yarn = or('yarn')

    self.installDependencies({
      yarn: yarn,
      npm: !yarn,
      bower: false
    })
  }
}
