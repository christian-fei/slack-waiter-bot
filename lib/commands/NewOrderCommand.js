'use strict'
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class NewOrderCommand extends BaseCommand {
  canHandle(request) {
    const text = request.text
    return /^i want/.test(text)
  }
  handle(request) {
    const repo = new OrdersRepository()
    const order = request.text.replace('i want ', '')
    return repo.insertForUserId(order, request.user_id)
    .then((result) => {return 'Got it!'})
    .catch((err) => {
      console.log('ShowOrdersCommand error [request, order, err]', request, order, err)
      return 'I am sorry, I had some trouble writing down your order.'
    })
  }
}