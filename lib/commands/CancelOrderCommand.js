'use strict'
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class CancelOrderCommand extends BaseCommand {
  canHandle() {
    return /^cancel/.test(this.commandText)
  }
  handle() {
    const request = this.request
    const repo = new OrdersRepository()
    return repo.deleteAllForUserId(request.user_id, request.channel_id)
    .then((result) => {return 'Alrighty!'})
    .catch((err) => {
      return 'I am sorry, I had some trouble cancelling your order.'
    })
  }
}
