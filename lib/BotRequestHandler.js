'use strict'
const CommandHandler = require('./commands/CommandHandler')
const slackResponseFormatter = require('./slackResponseFormatter')

const aws = require('aws-sdk')
const lambda = new aws.Lambda()

const log = (payload) => {console.log('-- responding', payload); return payload}

module.exports = class BotRequestHandler {
  constructor(slackDelayedReply) {
    this.slackDelayedReply = slackDelayedReply
  }

  handler(request, apiRequest) {
    console.log('-- starting to handle', request)
    const response = CommandHandler.handle(request.originalRequest)
    return this.registerSlackDelayedReply(request, apiRequest)
    .then(() => {
      return response.then(log).then(slackResponseFormatter)
    })
    .catch((err) => {
      console.log('-- failed to handle command', request, err)
      return slackResponseFormatter("I messed up, sorry.")
    })
  }

  intercept(event) {
    const slackDelayedReply = this.slackDelayedReply
    console.log('-- event', event)
    if (!event.delayedReply) {
      return event
    }

    const request = event.delayedReply
    const result = CommandHandler.handleDelayedReply(request.originalRequest)

    return result.then(response => {
      return slackDelayedReply(request, slackResponseFormatter(response))
    })
    .then(() => false) // prevent normal execution
  }

  registerSlackDelayedReply(request, apiRequest) {
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
}
