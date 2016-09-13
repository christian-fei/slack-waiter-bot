'use strict'
module.exports = function(text) {
  return {
    response_type: 'in_channel',
    text: text
  }
}
