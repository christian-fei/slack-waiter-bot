'use strict'
const BaseCommand = require('./BaseCommand')
const EchoCommand = require('./EchoCommand')
const ShowOrdersCommand = require('./ShowOrdersCommand')
const NewOrderCommand = require('./NewOrderCommand')
const CancelOrderCommand = require('./CancelOrderCommand')
const PriceCommand = require('./PriceCommand')
const HelpCommand = require('./HelpCommand')

const commands = [
  EchoCommand,
  ShowOrdersCommand,
  NewOrderCommand,
  CancelOrderCommand,
  PriceCommand,
  HelpCommand,
  BaseCommand
]

const handleable = (fn) => (request) => (acc, Command) => {
  if(acc){
    return acc
  }
  const command = new Command(request)
  return command[fn]() ? command : null
}
const canHandle = handleable('canHandle')
const canHandleDelayedReply = handleable('canHandleDelayedReply')

module.exports = {
  handle: function(request) {
    return commands.reduce(canHandle(request), null).handle()
  },
  handleDelayedReply: function(request) {
    const command = commands.reduce(canHandleDelayedReply(request), null)
    if (!command) {
      return Promise.resolve(false)
    }
    return command.handleDelayedReply()
  }
}
