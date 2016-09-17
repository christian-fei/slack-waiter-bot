'use strict'

module.exports = class BaseCommand {
  constructor(request) {this.request = request}
  canHandle() {return true}
  canHandleDelayedReply() {return false}
  handle() {return Promise.resolve('Didn\'t get that, sorry.')}
  handleDelayedReply() {return Promise.resolve('Oops, I am so sorry.')}
}
