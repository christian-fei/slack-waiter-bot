'use strict'
const BaseCommand = require('./commands/BaseCommand')
const EchoCommand = require('./commands/EchoCommand')
const ShowOrdersCommand = require('./commands/ShowOrdersCommand')
const NewOrderCommand = require('./commands/NewOrderCommand')

const commands = [
  new EchoCommand,
  new ShowOrdersCommand,
  new NewOrderCommand,
  new BaseCommand
]

// canHandle :: Request -> Command -> Boolean
const canHandle = (request) => (command) => command.canHandle(request)

module.exports = function(request){
  console.log('waiterBotCommandHandler', request)
  const command = commands.filter(canHandle(request))[0]
  console.log('waiterBotCommandHandler handle command', command)
  return command.handle(request)
}
