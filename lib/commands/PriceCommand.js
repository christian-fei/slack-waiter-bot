'use strict'

const merge = require('lodash.merge')
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class PriceCommand extends BaseCommand {
  constructor(request, ordersRepository) {
    super(request)
    this.ordersRepository = ordersRepository
  }
  getOrdersRepository() {
    return this.ordersRepository || new OrdersRepository()
  }
  canHandle() {
    const request = this.request
    const text = request.text
    return /^i pay /i.test(text)
  }
  canHandleDelayedResponse() {return this.canHandle()}
  handle() {
    return Promise.resolve('I am registering you order, one moment please.')
  }
  handleDelayedResponse() {
    const request = this.request
    const ordersRepository = this.getOrdersRepository()
    const price = request.text.replace('i pay ', '')
    return ordersRepository.lastForUserId(request.user_id, request.channel_id)
    .then((result) => {
      if(!result){
        return "You haven't ordered anything."
      }
      return ordersRepository.updateById(result.id, merge(result, {
        price: price
      }))
      .then(() => {return `Set your order for "${result.order}" at ${price}.`})
    })
    .catch((err) => {
      console.log('PriceCommand error [request, price, err]', request, price, err)
      return 'I am sorry, I had some trouble writing down your price.'
    })
  }
}
