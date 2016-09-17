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

// canHandle :: Request -> (acc, Command) -> Command
const canHandle = (request) => (acc, Command) => {
  if(acc){
    return acc
  }
  const command = new Command(request)
  return command.canHandle() ? command : null
}

// canHandleDelayedResponse :: Request -> (acc, Command) -> Command
const canHandleDelayedResponse = (request) => (acc, Command) => {
  if(acc){
    return acc
  }
  const command = new Command(request)
  return command.canHandleDelayedResponse() ? command : null
}

module.exports = {
  handle: function(request) {
    return commands.reduce(canHandle(request), null).handle()
  },
  handleDelayedResponse: function(request) {
    return commands.reduce(canHandleDelayedResponse(request), null).handleDelayedResponse()
  }
}
