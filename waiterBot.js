'use strict'
const botBuilder = require('claudia-bot-builder')
const BotRequestHandler = require('./lib/BotRequestHandler')

const botRequestHandler = new BotRequestHandler(botBuilder.slackDelayedReply)

const api = botBuilder(botRequestHandler.handler.bind(botRequestHandler))
api.intercept(botRequestHandler.intercept.bind(botRequestHandler))
module.exports = api
