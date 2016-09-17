'use strict'
const all = require('bluebird').all
const CommandHandler = require('./CommandHandler')
const OrdersRepository = require('../OrdersRepository')

const user_1 = "user_1"
const channel_1 = "channel_1"
const channel_2 = "channel_2"
describe('CommandHandler', function() {
  this.timeout(10000)
  afterEach(resetOrders)

  it('/waiter help', userRequestsHelp)

  it('/waiter i want a pizza', userOrdersPizza)

  describe('/waiter show orders', () => {
    it('with no orders', expectUserToHaveNoOrders)

    it('with some orders', () => {
      return userOrdersPizzaInChannel2()
      .then(not(expectUserToHaveOrderedPizza))
      .then(expectUserToHaveOrderedPizzaInChannel2)
    })
  })

  it('/waiter cancel my order', () => {
    return userOrdersPizza()
    .then(userCancelsOrder)
    .then(expectUserToHaveNoOrders)
  })

  it('/waiter i pay 7.5', () => {
    return userOrdersPizza()
    .then(userPays75)
  })











  function handle(text, user_name, channel_id) {
    return CommandHandler.handle({text: text, user_name: user_name, user_id: user_name, channel_id: channel_id})
  }

  function userPays75() {
    return expect(
      handle('i pay 7.5', user_1, channel_1)
    ).to.eventually.eql('I am registering you order, one moment please.')
  }

  function userRequestsHelp() {
    return expect(
      handle('help', user_1, channel_1)
    ).to.eventually.match(/Hello, I am here to help!/)
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

  function expectUserToHaveNoOrders() {
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




  function resetOrders() {
    var ordersRepository = new OrdersRepository()
    return all([
      ordersRepository.deleteAllForUserId(user_1, channel_1),
      ordersRepository.deleteAllForUserId(user_1, channel_2)
    ])
  }
})
