'use strict'

module.exports = {
  canHandle: function(request) {
    const text = request.text
    return /^echo/.test(text)
  },
  handle: function(request) {
    const text = request.text
    return Promise.resolve(text.substring(5))
  }
}
