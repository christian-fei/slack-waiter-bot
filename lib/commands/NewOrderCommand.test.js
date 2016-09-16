'use strict'

const NewOrderCommand = require('./NewOrderCommand')

const channel_id = '1'
const user_id = '1'
const user_name = 'user_name'
describe('NewOrderCommand', () => {
  describe('.canHandle', () => {
    it('can handle "i want a pizza"', () => {
      const command = new NewOrderCommand(requestFor('i want a pizza'))
      return expect(command.canHandle()).to.be.true
    })

    it('can handle "a coke"', () => {
      const command = new NewOrderCommand(requestFor('a coke'))
      return expect(command.canHandle()).to.be.true
    })

    it('can\'t handle "i want something"', () => {
      const command = new NewOrderCommand(requestFor('i want something'))
      return expect(command.canHandle()).to.be.true
    })
  })


  describe('.handle', () => {
    it('handles "I want something"', () => {
      const command = new NewOrderCommand(requestFor('I want something'))
      return expect(command.handle()).to.eventually.eql('I get it that you\'re hungry. What about pizza?')
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
