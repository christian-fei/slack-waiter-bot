'use strict'
const BaseCommand = require('./BaseCommand')
const EchoCommand = require('./EchoCommand')
const ShowOrdersCommand = require('./ShowOrdersCommand')
const NewOrderCommand = require('./NewOrderCommand')
const CancelOrderCommand = require('./CancelOrderCommand')
const HelpCommand = require('./HelpCommand')

const commands = [
  EchoCommand,
  ShowOrdersCommand,
  NewOrderCommand,
  CancelOrderCommand,
  HelpCommand,
  BaseCommand
]

module.exports = {
  handle: function(request) {
    const command = commands
    .filter(c => c.canHandle(request))[0]
    return command.handle(request)
  }
}
