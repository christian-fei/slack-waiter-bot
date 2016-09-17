'use strict'
const CommandHandler = require('./commands/CommandHandler')

const aws = require('aws-sdk')
const lambda = new aws.Lambda()

const log = (payload) => {console.log('-- responding', payload); return payload}
const formatSlackResponse = (text) => ({response_type: 'in_channel',text: text})

module.exports = {
  handler: handler,
  intercept: intercept,
}


function handler(request, apiRequest) {
  console.log('-- handling request', request)
  const response = CommandHandler.handle(request.originalRequest)
  return registerDelayedInvocation(request, apiRequest)
  .then(() => {
    return response.then(log).then(formatSlackResponse)
  })
}

function intercept(event, slackDelayedReply) {
  if (!event.delayedRequest) {
    return event
  }
  console.log('-- handling event', event)

  const request = event.delayedRequest
  const result = CommandHandler.handleDelayedReply(request.originalRequest)

  return result.then(response => {
    return slackDelayedReply(request, formatSlackResponse(response))
  })
  .then(() => false)
}

function registerDelayedInvocation(request, apiRequest) {
  return new Promise((resolve, reject) => {
    lambda.invoke({
      FunctionName: apiRequest.lambdaContext.functionName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        delayedRequest: request
      }),
      Qualifier: apiRequest.lambdaContext.functionVersion
    }, (err, done) => {
      return err ? reject(err) : resolve()
    })
  })
}
