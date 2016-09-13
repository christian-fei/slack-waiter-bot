'use strict'
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

const slackResponseFormatter = require('./slackResponseFormatter')

describe('slackResponseFormatter', function () {
  it('formats response', function () {
    expect(slackResponseFormatter('foo')).to.eql({
      response_type: 'in_channel',
      text: 'foo'
    })
  })
})
