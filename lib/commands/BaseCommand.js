'use strict'

module.exports = class BaseCommand {
  constructor(request) {this.request = request}
  canHandle() {return true}
  handle() {return Promise.resolve('Didn\'t get that, sorry.')}
}
