'use strict'

const CommandTest = require('./CommandTest')
const ShowOrdersCommand = require('./ShowOrdersCommand')

CommandTest('ShowOrdersCommand', () => {
  describe('.canHandle', () => {
    it('can handle "show orders"', () => {
      const command = new ShowOrdersCommand(requestFor('show orders'))
      return expect(command.canHandle()).to.be.true
    })
  })

  describe('.handle', () => {
    it('handles "show orders"', () => {
      const command = new ShowOrdersCommand(requestFor('show orders'))
      return expect(command.handle()).to.eventually.eql('I have no orders for your table, user_name.')
    })
  })

  describe('.canHandleDelayedReply', () => {
    it('can\'t handle delayed reply', () => {
      const command = new ShowOrdersCommand(requestFor('show orders'))
      return expect(command.canHandleDelayedReply()).to.be.false
    })
  })
})
