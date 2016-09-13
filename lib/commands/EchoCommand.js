'use strict'
const BaseCommand = require('./BaseCommand')

module.exports = class EchoCommand extends BaseCommand {
  canHandle(request) {
    const text = request.text
    return /^echo/.test(text)
  }
  handle(request) {
    const text = request.text
    return Promise.resolve(text.substring(5))
  }
}
