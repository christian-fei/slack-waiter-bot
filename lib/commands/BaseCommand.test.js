'use strict'
const CommandTest = require('./CommandTest')
const BaseCommand = require('./BaseCommand')

CommandTest('BaseCommand', () => {
  describe('.canHandle', () => {
    it('handles anything', () => {
      return ['','test','anything'].map(anything => {
        const command = new BaseCommand(requestFor(anything))
        return expect(command.canHandle()).to.be.true
      })
    })
  })


  describe('.handle', () => {
    it('returns excuse', () => {
      const command = new BaseCommand(requestFor('anything'))
      return expect(command.handle()).to.eventually.eql('Didn\'t get that, sorry.')
    })
  })
})
