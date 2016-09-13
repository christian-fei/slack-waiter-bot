'use strict'
const botBuilder = require('claudia-bot-builder')
const slackDelayedReply = botBuilder.slackDelayedReply

const waiterBotCommandHandler = require('./lib/waiterBotCommandHandler')
const slackResponseFormatter = require('./lib/slackResponseFormatter')

const api = botBuilder((request) => {
  const response = waiterBotCommandHandler(request.originalRequest)
  console.log('-- responding with', response)
  return slackResponseFormatter(response)
})

api.intercept((event) => {
  if (!event.slackEvent) // if this is a normal web request, let it run
    return event

  console.log('-- event', event)
  return false
  // const message = event.slackEvent
  // const seconds = parseInt(message.text, 10)

  // return slackDelayedReply(message, {
  //   text: `${seconds} seconds passed.`,
  //   response_type: 'in_channel'
  // })
  // .then(() => false) // prevent normal execution
})

module.exports = api
