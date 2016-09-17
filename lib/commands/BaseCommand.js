'use strict'

const OrdersRepository = require('../OrdersRepository')

module.exports = class BaseCommand {
  constructor(request, ordersRepository) {
    this.request = request
    this.commandText = request.text
    this.ordersRepository = (ordersRepository || new OrdersRepository)
  }
  canHandle() {return true}
  canHandleDelayedReply() {return false}
  handle() {return Promise.resolve('Didn\'t get that, sorry.')}
  handleDelayedReply() {return Promise.resolve('Oops, I am so sorry.')}
}
