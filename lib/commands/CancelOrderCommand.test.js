'use strict'

const CommandTest = require('./CommandTest')
const CancelOrderCommand = require('./CancelOrderCommand')

CommandTest('CancelOrderCommand', () => {
  describe('.canHandle', () => {
    it('can handle "cancel order"', () => {
      const command = new CancelOrderCommand(requestFor('cancel order'))
      return expect(command.canHandle()).to.be.true
    })
  })

  describe('.handle', () => {
    it('handles "cancel order"', () => {
      const stubOrdersRepository = {deleteAllForUserId: () => {return Promise.resolve()}}

      const command = new CancelOrderCommand(requestFor('cancel order'), stubOrdersRepository)
      return expect(command.handle()).to.eventually.eql('Alrighty!')
    })
  })
})
