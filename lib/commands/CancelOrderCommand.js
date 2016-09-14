'use strict'
const OrdersRepository = require('../OrdersRepository')

module.exports = {
  canHandle: function(request) {
    const text = request.text
    return /^cancel/.test(text)
  },
  handle: function(request) {
    const text = request.text
    const repo = new OrdersRepository()
    return repo.deleteAllForUserId(request.user_id, request.channel_id)
    .then((result) => {return 'Alrighty!'})
    .catch((err) => {
      return 'I am sorry, I had some trouble cancelling your order.'
    })
  }
}
