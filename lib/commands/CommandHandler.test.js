'use strict'
const all = require('bluebird').all
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

const CommandHandler = require('./CommandHandler')
const OrdersRepository = require('../OrdersRepository')

const user_1 = "user_1"
const channel_1 = "channel_1"
const channel_2 = "channel_2"
describe('CommandHandler', function () {
  this.timeout(5000)
  afterEach(function () {
    var ordersRepository = new OrdersRepository()
    return all([
      ordersRepository.deleteAllForUserId(user_1)
    ])
  })


  it('creates a new order for user in channel', userOrdersPizza)

  describe('shows orders for user in channel', function () {
    it('with no orders', expectUserHasEmptyOrder)

    it('with some orders', function () {
      return userOrdersPizzaInChannel2()
      .then(not(expectUserToHaveOrderedPizza))
      .then(expectUserToHaveOrderedPizzaInChannel2)
    })
  })

  it('cancels an order for user', function () {
    return userOrdersPizza()
    .then(userCancelsOrder)
    .then(expectUserHasEmptyOrder)
  })











  function handle(text, user_name, channel) {
    return CommandHandler.handle({text: text, user_name: user_name, channel: channel})
  }

  function userCancelsOrder() {
    return expect(
      handle('cancel my order please', user_1, channel_1)
    ).to.eventually.eql('Alrighty!')
  }

  function userOrdersPizza() {
    return expect(
      handle('i want a pizza', user_1, channel_1)
    ).to.eventually.eql('Got it!')
  }

  function userOrdersPizzaInChannel2() {
    return expect(
      handle('i want a pizza', user_1, channel_2)
    ).to.eventually.eql('Got it!')
  }

  function expectUserHasEmptyOrder() {
    return expect(
      handle('show orders', user_1, channel_1)
    ).to.eventually.eql(`I have no orders for your table, ${user_1}.`)
  }

  function expectUserToHaveOrderedPizza() {
    return expect(
      handle('show orders', user_1, channel_1)
    ).to.eventually.eql(`Your orders, ${user_1}:\n - a pizza\n`)
  }

  function expectUserToHaveOrderedPizzaInChannel2() {
    return expect(
      handle('show orders', user_1, channel_2)
    ).to.eventually.eql(`Your orders, ${user_1}:\n - a pizza\n`)
  }

  function not(promiseFn) {
    return () => {
      return promiseFn().then(() => {throw Error}).catch(() => {})
    }
  }
})
