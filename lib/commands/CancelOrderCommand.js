'use strict'
const BaseCommand = require('./BaseCommand')

module.exports = class CancelOrderCommand extends BaseCommand {
  canHandle() {
    return /^cancel/.test(this.commandText)
  }
  handle() {
    const request = this.request
    return this.ordersRepository.deleteAllForUserId(request.user_id, request.channel_id)
    .then((result) => {return 'Alrighty!'})
    .catch((err) => {
      return 'I am sorry, I had some trouble cancelling your order.'
    })
  }
}
