/* eslint-env mocha */
const assert = require('assert')
const fn = require('.')

describe('<%= moduleName %>', function () {
  it('should work !', function () {
    assert.ok(fn('yolo'))
  })
})
