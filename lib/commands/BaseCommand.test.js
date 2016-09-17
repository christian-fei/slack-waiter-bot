'use strict'
const CommandTest = require('./CommandTest')
const BaseCommand = require('./BaseCommand')

CommandTest('BaseCommand', () => {
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
})
