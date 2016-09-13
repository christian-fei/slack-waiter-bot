'use strict'
const all = require('bluebird').all
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

const CommandHandler = require('./CommandHandler')
const OrdersRepository = require('../OrdersRepository')

describe('CommandHandler', function () {
  this.timeout(5000)
  afterEach(function () {
    var ordersRepository = new OrdersRepository()
    return all([
      ordersRepository.deleteAllForUserId('Maria'),
      ordersRepository.deleteAllForUserId('Hermann')
    ])
  })

  it('handles a generic echo command', function () {
    const result = CommandHandler.handle({text: 'echo hello'})
    return expect(result).to.eventually.eql('hello')
  })

  describe('shows orders for user', function () {
    it('with no orders', function () {
      const some_user_name = 'Maria'
      const result = CommandHandler.handle({text: 'show orders', user_id: some_user_name, user_name: some_user_name})
      return expect(result).to.eventually.eql(`I have no orders for your table, ${some_user_name}.`)
    })
    it('with some orders', function () {
      const some_user_name = 'Hermann'
      return CommandHandler.handle({text: 'i want a pizza salamino', user_id: some_user_name, user_name: some_user_name})
      .then((x) => {
        const result = CommandHandler.handle({text: 'show orders', user_id: some_user_name, user_name: some_user_name})
        return expect(result).to.eventually.eql(`Your orders, ${some_user_name}:\n - a pizza salamino\n`)
      })
    })
  })

  it('creates a new order for user', function () {
    const some_user_name = 'Maria'
    const result = CommandHandler.handle({text: 'i want a pizza salamino', user_id: some_user_name, user_name: some_user_name})
    return expect(result).to.eventually.eql('Got it!')
  })
})
