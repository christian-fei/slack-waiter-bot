'use strict'
const UNKNOWN_COMMAND = 'UNKNOWN_COMMAND'

module.exports = class BaseCommand {
  canHandle() {return true}
  handle() {return Promise.reject(UNKNOWN_COMMAND)}
}
