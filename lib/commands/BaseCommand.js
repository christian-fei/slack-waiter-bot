'use strict'

module.exports = {
  canHandle: function() {return true},
  handle: function() {return Promise.resolve('Didn\'t get that, sorry.')}
}
