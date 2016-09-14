'use strict'
const slackResponseFormatter = require('./slackResponseFormatter')

describe('slackResponseFormatter', function () {
  it('formats response', function () {
    expect(slackResponseFormatter('foo')).to.eql({
      response_type: 'in_channel',
      text: 'foo'
    })
  })
})
