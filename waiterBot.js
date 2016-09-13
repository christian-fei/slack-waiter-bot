'use strict'
const botBuilder = require('claudia-bot-builder')
const waiterBotCommandHandler = require('./lib/waiterBotCommandHandler')

module.exports = botBuilder((request) => {
  const response = waiterBotCommandHandler(request.originalRequest)
  console.log('-- responding with', response)
  return response
})