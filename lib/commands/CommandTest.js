'use strict'
const channel_id = '1'
const user_id = '1'
const user_name = 'user_name'

global.requestFor = (text) => {
  return {
    text,
    channel_id,
    user_id,
    user_name
  }
}
module.exports = describe
