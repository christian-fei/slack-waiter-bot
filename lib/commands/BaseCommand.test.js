'use strict'

require('mocha-testcheck').install()

const BaseCommand = require('./BaseCommand')

const channel_id = '1'
const user_id = '1'
const user_name = 'user_name'
describe('BaseCommand', () => {
  describe('.canHandle', () => {
    check.it('handles anything', [gen.string], (anything) => {
      const command = new BaseCommand(requestFor(anything))
      return expect(command.canHandle()).to.be.true
    })
  })


  describe('.handle', () => {
    it('returns excuse', () => {
      const command = new BaseCommand(requestFor('anything'))
      return expect(command.handle()).to.eventually.eql('Didn\'t get that, sorry.')
    })
  })

  function requestFor(text) {
    return {
      text,
      channel_id,
      user_id,
      user_name
    }
  }
})
