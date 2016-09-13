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

module.exports = function(originalRequest){
  console.log('waiterBotCommandHandler', originalRequest)
  const command = commands
    .filter(c => c.canHandle(originalRequest))[0]
  console.log('waiterBotCommandHandler handle command', command)
  return command.handle(originalRequest)
}
