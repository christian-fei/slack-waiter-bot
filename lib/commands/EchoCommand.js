'use strict'
const BaseCommand = require('./BaseCommand')

module.exports = class EchoCommand extends BaseCommand {
  canHandle() {
    const request = this.request
    const text = request.text
    return /^echo/.test(text)
  }
  canHandleDelayedReply() {
    const request = this.request
    const text = request.text
    return /^echo/.test(text)
  }
  handle() {
    const request = this.request
    const text = request.text
    return Promise.resolve(text.substring(5))
  }
  handleDelayedReply() {
    const request = this.request
    const text = request.text
    return Promise.resolve("Delayed echo: " + text.substring(5))
  }
}
