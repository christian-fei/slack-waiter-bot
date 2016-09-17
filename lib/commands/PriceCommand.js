'use strict'

const merge = require('lodash.merge')
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class PriceCommand extends BaseCommand {
  canHandle() {
    return /^i pay /i.test(this.commandText)
  }
  canHandleDelayedReply() {return this.canHandle()}
  handle() {
    return Promise.resolve('I am registering you order, one moment please.')
  }
  handleDelayedReply() {
    const ordersRepository = this.ordersRepository
    const price = this.commandText.replace('i pay ', '')
    return ordersRepository.lastForUserId(this.request.user_id, this.request.channel_id)
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
