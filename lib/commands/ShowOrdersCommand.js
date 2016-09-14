'use strict'
const OrdersRepository = require('../OrdersRepository')

module.exports = {
  canHandle: function(request) {
    const text = request.text
    return /^show orders/.test(text)
  },
  handle: function(request) {
    const repo = new OrdersRepository()
    return repo.findByChannelId(request.channel_id)
    .then((orders) => {
      if(orders.length === 0) {
        return `I have no orders for your table, ${request.user_name}.`
      }
      const ordersOutput = orders.map(o => ` - ${o.order}\n`).join('')
      return `Your orders, ${request.user_name}:\n${ordersOutput}`
    })
  }
}
