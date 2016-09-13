'use strict'
const all = require('bluebird').all
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

const CommandHandler = require('./CommandHandler')
const OrdersRepository = require('../OrdersRepository')

const user_1 = "user_1"
describe('CommandHandler', function () {
  this.timeout(5000)
  afterEach(function () {
    var ordersRepository = new OrdersRepository()
    return all([
      ordersRepository.deleteAllForUserId(user_1)
    ])
  })

  function handle(text, user_name) {
    return CommandHandler.handle({text: text, user_name: user_name})
  }

  it('handles a generic echo command', function () {
    return expect(
      handle('echo hello')
    ).to.eventually.eql('hello')
  })

  describe('shows orders for user', function () {
    it('with no orders', function () {
      return expect(
        handle('show orders', user_1)
      ).to.eventually.eql(`I have no orders for your table, ${user_1}.`)
    })
    it('with some orders', function () {
      return handle('i want a pizza salamino', user_1)
      .then(() => {
        return expect(
          handle('show orders', user_1)
        ).to.eventually.eql(`Your orders, ${user_1}:\n - a pizza salamino\n`)
      })
    })
  })

  it('creates a new order for user', function () {
    return expect(
      handle('i want a pizza salamino', user_1)
    ).to.eventually.eql('Got it!')
  })
})
