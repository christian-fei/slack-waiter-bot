'use strict'

const NewOrderCommand = require('./NewOrderCommand')

const channel_id = '1'
const user_id = '1'
const user_name = 'user_name'
describe('NewOrderCommand', function () {
  describe('.canHandle', function () {
    it('can handle "i want a pizza"', function () {
      const command = new NewOrderCommand(requestFor('i want a pizza'))
      return expect(command.canHandle()).to.be.true
    })

    it('can handle "a coke"', function () {
      const command = new NewOrderCommand(requestFor('a coke'))
      return expect(command.canHandle()).to.be.true
    })

    it('can\'t handle "i want something"', function () {
      const command = new NewOrderCommand(requestFor('i want something'))
      return expect(command.canHandle()).to.be.true
    })
  })


  describe('what?', function () {
    it('expectation', function () {
      const command = new NewOrderCommand(requestFor('i want something'))
      return expect(command.handle()).to.eventually.eql('I get it that you\'re hungry. What about pizza?')
    });
  });

  // describe('.handle', function () {
  //   it('handles "i want something"', function () {
  //     const command = new NewOrderCommand(requestFor('i want something'))
  //     expect(command.handle()).to.eventually.eql('I get it that you\'re hungry. What about pizza?')
  //   })
  // })

  function requestFor(text) {
    return {
      text,
      channel_id,
      user_id,
      user_name
    }
  }
})
