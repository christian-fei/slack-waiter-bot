'use strict'
const BaseCommand = require('./BaseCommand')
const OrdersRepository = require('../OrdersRepository')

module.exports = class NewOrderCommand extends BaseCommand {
  wantsSomething() {
    const request = this. request
    const text = request.text
    return /i want something/i.test(text)
  }
  canHandle() {
    const request = this.request
    const text = request.text
    if(this.wantsSomething()){
      return true
    }
    return /^(i want|a\s)/i.test(text)
  }
  handle() {
    const request = this.request
    if(this.wantsSomething()){
      return Promise.resolve('I get it that you\'re hungry. What about pizza?')
    }
    const repo = new OrdersRepository()
    const order = request.text.replace('i want ', '')
    return repo.insertForUserId(order, request.user_id, request.channel_id)
    .then((result) => {return 'Got it!'})
    .catch((err) => {
      conle.log('ShowOrsodersCommand error [request, order, err]', request, order, err)
      return 'I am sorry, I had some trouble writing down your order.'
    })
  }
}
