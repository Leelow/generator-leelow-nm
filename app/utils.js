const _s = require('underscore.string')
const scopedRegex = require('scoped-regex')

function isScoped (packageName) {
  return scopedRegex({exact: false}).test(packageName)
}

exports.repoName = function (name) {
  return isScoped(name) ? name.split('/')[1] : name
}

exports.slugifyPackageName = function (name) {
  if (isScoped(name)) {
    var split = name.split('/')
    return split[0] + '/' + _s.slugify(split[1])
  } else return _s.slugify(name)
}
