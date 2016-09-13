'use strict'
const botBuilder = require('claudia-bot-builder')
const slackDelayedReply = botBuilder.slackDelayedReply

const aws = require('aws-sdk')
const lambda = new aws.Lambda()

const waiterBotCommandHandler = require('./lib/waiterBotCommandHandler')
const slackResponseFormatter = require('./lib/slackResponseFormatter')

const api = botBuilder((request, apiRequest) => {
  console.log('-- starting to handle', request, apiRequest)
  const response = waiterBotCommandHandler(request.originalRequest)
  return response.then(slackResponseFormatter)

  return delayReply(request, apiRequest)
  .then(() => {
    console.log('-- successfully handled command', request, response)
    return response.then(slackResponseFormatter)
  })
  .catch((err) => {
    console.log('-- failed to handle command', request, err)
    return slackResponseFormatter("I messed up, sorry.")
  })
})

api.intercept((event) => {
  if (!event.delayedReply) {
    return event
  }

  console.log('-- event', event)
  return false
  // const request = event.delayedReply
  // const seconds = parseInt(request.text, 10)

  // return slackDelayedReply(request, {
  //   text: `${seconds} seconds passed.`,
  //   response_type: 'in_channel'
  // })
  // .then(() => false) // prevent normal execution
})

function delayReply(request, apiRequest) {
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

module.exports = api
