'use strict'
const BaseCommand = require('./BaseCommand')

module.exports = class ShowOrdersCommand extends BaseCommand {
  canHandle() {
    return /^show orders/.test(this.commandText)
  }
  handle() {
    const request = this.request
    return this.ordersRepository.findByChannelId(request.channel_id)
    .then((orders) => {
      if(orders.length === 0) {
        return `I have no orders for your table, ${request.user_name}.`
      }
      const ordersOutput = orders.map(formatOrder).join('')
      return `Your orders, ${request.user_name}:\n${ordersOutput}`
    })
  }
}

function formatOrder(order) {
  const price = order.price ? ` (${order.price})` : ''
  return ` - ${order.order}${price}\n`
}
