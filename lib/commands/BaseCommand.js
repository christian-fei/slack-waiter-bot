'use strict'

const OrdersRepository = require('../OrdersRepository')

module.exports = class BaseCommand {
  constructor(request, ordersRepository) {
    this.request = request
    this.ordersRepository = ordersRepository
  }
  getOrdersRepository() {
    if(this.ordersRepository) {
      return this.ordersRepository
    }
    this.ordersRepository = new OrdersRepository()
    return this.ordersRepository
  }
  canHandle() {return true}
  canHandleDelayedReply() {return false}
  handle() {return Promise.resolve('Didn\'t get that, sorry.')}
  handleDelayedReply() {return Promise.resolve('Oops, I am so sorry.')}
}
