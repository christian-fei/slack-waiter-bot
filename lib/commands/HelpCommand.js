'use strict'
const BaseCommand = require('./BaseCommand')

module.exports = class HelpCommand extends BaseCommand {
  canHandle() {
    const request = this.request
    const text = request.text
    return /^help/.test(text)
  }
  handle() {
    const request = this.request
    const text = request.text
    return Promise.resolve(helpOutput(request.user_name, request.channel_name))
  }
}

function helpOutput(user_name, channel_name) {
  return '\
Hello, I am here to help!\n\
Here is a list of commands I respond to:\n\
\n\
"i want #####" : takes an order (e.g.: "I want a pizza salamino")\n\
"show orders" : Shows the orders\n\
"cancel order" : Cancels your order\n\
\n\
To contribute, please check out https://github.com/christian-fei/slack-waiter-bot\n\
'
}
