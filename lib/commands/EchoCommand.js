'use strict'
const BaseCommand = require('./BaseCommand')

module.exports = class EchoCommand extends BaseCommand {
  canHandle() {
    return /^echo/.test(this.commandText)
  }
  canHandleDelayedReply() {
    return /^echo/.test(this.commandText)
  }
  handle() {
    return Promise.resolve(this.commandText.substring(5))
  }
  handleDelayedReply() {
    return Promise.resolve("Delayed echo: " + this.commandText.substring(5))
  }
}
