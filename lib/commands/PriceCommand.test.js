'use strict'

const CommandTest = require('./CommandTest')
const PriceCommand = require('./PriceCommand')

CommandTest('PriceCommand', () => {
  describe('.canHandle', () => {
    it('can handle "i pay 7.5"', () => {
      const command = new PriceCommand(requestFor('i pay 7.5'))
      return expect(command.canHandle()).to.be.true
    })
  })

  describe('.handle', () => {
    it('handles "i pay 7.5"', () => {
      const stubOrdersRepository = {
        lastForUserId: () => {return Promise.resolve()},
        updateById: () => {return Promise.resolve()}
      }
      const command = new PriceCommand(requestFor('i pay 7.5'), stubOrdersRepository)
      return expect(command.handle()).to.eventually.equal('I am registering you order, one moment please.')
    })
  })

  describe('.canHandleDelayedReply', () => {
    it('can handle delayed "i pay 7.5"', () => {
      const command = new PriceCommand(requestFor('i pay 7.5'))
      return expect(command.canHandleDelayedReply()).to.be.true
    })
  })

  describe('.handleDelayedReply', () => {
    describe('handles delayed "i pay 7.5"', () => {
      it('when user has no orders', () => {
        const stubOrdersRepository = {
          lastForUserId: () => {return Promise.resolve()},
          updateById: () => {return Promise.resolve()}
        }
        const command = new PriceCommand(requestFor('i pay 7.5'), stubOrdersRepository)
        return expect(command.handleDelayedReply()).to.eventually.equal('You haven\'t ordered anything.')
      })
      it('when user has ordered a pizza', () => {
        const stubOrdersRepository = {
          lastForUserId: () => {return Promise.resolve({order:'pizza'})},
          updateById: () => {return Promise.resolve()}
        }
        const command = new PriceCommand(requestFor('i pay 7.5'), stubOrdersRepository)
        return expect(command.handleDelayedReply()).to.eventually.equal('Set your order for "pizza" at 7.5.')
      })
    })
  })
})
