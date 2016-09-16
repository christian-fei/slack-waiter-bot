'use strict'

const NewOrderCommand = require('./NewOrderCommand')

const channel_id = '1'
const user_id = '1'
const user_name = 'user_name'
describe('NewOrderCommand', function () {
  describe('.canHandle', function () {
    it('handles "i want a pizza"', () => {
      const command = new NewOrderCommand(requestFor('i want a pizza'))
      expect(
        command.canHandle()
      ).to.be.true
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
