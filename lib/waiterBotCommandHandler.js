'use strict'
const BaseCommand = require('./commands/BaseCommand')
const EchoCommand = require('./commands/EchoCommand')
const ShowOrdersCommand = require('./commands/ShowOrdersCommand')
const NewOrderCommand = require('./commands/NewOrderCommand')

const commands = [
  EchoCommand,
  ShowOrdersCommand,
  NewOrderCommand,
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

module.exports = function(request){
  console.log('waiterBotCommandHandler', request)
  const suitableCommand = commands.reduce(canHandle(request), null)

  console.log('waiterBotCommandHandler handle command', suitableCommand)
  return suitableCommand.handle()
}
