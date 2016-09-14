'use strict'
const botBuilder = require('claudia-bot-builder')
const CommandHandler = require('./lib/commands/CommandHandler')
const slackResponseFormatter = require('./lib/slackResponseFormatter')

const slackDelayedReply = botBuilder.slackDelayedReply
const aws = require('aws-sdk')
const lambda = new aws.Lambda()

const log = (payload) => {console.log('-- responding', payload); return payload}
const api = botBuilder((request, apiRequest) => {
  console.log('-- starting to handle', request)
  const response = CommandHandler.handle(request.originalRequest)
  return registerDelayedResponse(request, apiRequest)
  .then(() => {
    return response.then(log).then(slackResponseFormatter)
  })
  .catch((err) => {
    console.log('-- failed to handle command', request, err)
    return slackResponseFormatter("I messed up, sorry.")
  })
})

module.exports = api

api.intercept(event => {
  console.log('-- event', event)
  if (!event.delayedReply) {
    return event
  }

  const request = event.delayedReply
  const result = CommandHandler.handleDelayedResponse(request.originalRequest)

  return result.then(response => {
    return slackDelayedReply(request, slackResponseFormatter(response))
  })
  .then(() => false) // prevent normal execution
})

function registerDelayedResponse(request, apiRequest) {
  return new Promise((resolve, reject) => {
    lambda.invoke({
      FunctionName: apiRequest.lambdaContext.functionName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        delayedReply: request
      }),
      Qualifier: apiRequest.lambdaContext.functionVersion
    }, (err, done) => {
      return err ? reject(err) : resolve()
    })
  })
}
