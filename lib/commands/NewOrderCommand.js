'use strict'
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class NewOrderCommand extends BaseCommand {
  wantsSomething() {
    return /i want something/i.test(this.commandText)
  }
  canHandle() {
    if(this.wantsSomething()){
      return true
    }
    return /^(i want|a\s)/i.test(this.commandText)
  }
  handle() {
    if(this.wantsSomething()){
      return Promise.resolve('I get it that you\'re hungry. What about pizza?')
    }
    const order = this.commandText.replace('i want ', '')
    return this.ordersRepository.insertForUserId(order, this.request.user_id, this.request.channel_id)
    .then((result) => {return 'Got it!'})
    .catch((err) => {
      conle.log('ShowOrsodersCommand error [request, order, err]', request, order, err)
      return 'I am sorry, I had some trouble writing down your order.'
    })
  }
}
