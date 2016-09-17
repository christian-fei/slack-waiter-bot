'use strict'
const CommandHandler = require('./commands/CommandHandler')
const slackResponseFormatter = require('./slackResponseFormatter')

const aws = require('aws-sdk')
const lambda = new aws.Lambda()

const log = (payload) => {console.log('-- responding', payload); return payload}

module.exports = {
  handler: handler,
  intercept: intercept,
  registerDelayedInvocation: registerDelayedInvocation
}


function handler(request, apiRequest) {
  console.log('-- handling request', request)
  const response = CommandHandler.handle(request.originalRequest)
  return registerDelayedInvocation(request, apiRequest)
  .then(() => {
    return response.then(log).then(slackResponseFormatter)
  })
  .catch((err) => {
    console.log('-- failed to handle request', request, err)
    return slackResponseFormatter("I messed up, sorry.")
  })
}

function intercept(event, slackDelayedReply) {
  if (!event.delayedReply) {
    return event
  }
  console.log('-- handling event', event)

  const request = event.delayedReply
  const result = CommandHandler.handleDelayedReply(request.originalRequest)

  return result.then(response => {
    return slackDelayedReply(request, slackResponseFormatter(response))
  })
  .then(() => false)
  .catch((err) => {
    console.log('-- failed to handle event', event, err)
  })
}

function registerDelayedInvocation(request, apiRequest) {
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
