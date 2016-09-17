'use strict'
const botBuilder = require('claudia-bot-builder')
const BotRequestHandler = require('./lib/BotRequestHandler')

const api = botBuilder((request, apiRequest) => {
  return BotRequestHandler.handler(request, apiRequest)
})
api.intercept((event) => {
  return BotRequestHandler.intercept(event, botBuilder.slackDelayedReply)
})
module.exports = api
