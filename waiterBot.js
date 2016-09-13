'use strict'
const botBuilder = require('claudia-bot-builder')
const slackDelayedReply = botBuilder.slackDelayedReply

const aws = require('aws-sdk')
const lambda = new aws.Lambda()

const CommandHandler = require('./lib/commands/CommandHandler')
const slackResponseFormatter = require('./lib/slackResponseFormatter')

const api = botBuilder((request, apiRequest) => {
  console.log('-- starting to handle', request, apiRequest)
  const response = CommandHandler.handle(request.originalRequest)
  return response.then(slackResponseFormatter)
})

module.exports = api

  // return delayReply(request, apiRequest)
  // .then(() => {
  //   console.log('-- successfully handled command', request, response)
  //   return response.then(slackResponseFormatter)
  // })
  // .catch((err) => {
  //   console.log('-- failed to handle command', request, err)
  //   return slackResponseFormatter("I messed up, sorry.")
  // })

// api.intercept((event) => {
//   if (!event.delayedReply) {
//     return event
//   }

//   console.log('-- event', event)
//   return false
//   // const request = event.delayedReply
//   // const seconds = parseInt(request.text, 10)

//   // return slackDelayedReply(request, {
//   //   text: `${seconds} seconds passed.`,
//   //   response_type: 'in_channel'
//   // })
//   // .then(() => false) // prevent normal execution
// })

// function delayReply(request, apiRequest) {
//   return new Promise((resolve, reject) => {
//     lambda.invoke({
//       FunctionName: apiRequest.lambdaContext.functionName,
//       InvocationType: 'Event',
//       Payload: JSON.stringify({
//         delayedReply: request
//       }),
//       Qualifier: apiRequest.lambdaContext.functionVersion
//     }, (err, done) => {
//       return err ? reject(err) : resolve()
//     })
//   })
// }
