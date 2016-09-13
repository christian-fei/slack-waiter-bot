'use strict'
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class ShowOrdersCommand extends BaseCommand {
  canHandle(request) {
    const text = request.text
    return /^show orders/.test(text)
  }
  handle(request) {
    const repo = new OrdersRepository()
    return repo.findByUserId(request.user_id)
    .then((orders) => {
      if(orders.length === 0) {
        return `I have no orders for your table, ${request.user_name}.`
      }
      const ordersOutput = orders.map(o => ` - ${o.order}\n`).join('')
      return `Your orders, ${request.user_name}:\n${ordersOutput}`
    })
  }
}

class MemoryOrdersRepository {
  findByUserId(user_id) {
    if(user_id === 'Hermann')
      return Promise.resolve([{text: "pizza salamino"}])
    return Promise.resolve([])
  }
}

