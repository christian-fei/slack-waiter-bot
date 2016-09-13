'use strict'
const DynamoDB = require('./DynamoDB')
const all = require('bluebird').all

module.exports = class OrdersRepository {
  constructor() {
    this.client = new DynamoDB("Orders")
  }

  deleteById(id) {
    const client = this.client
    return client.deleteItem(id)
  }

  deleteAllForUserId(user_id, channel_name) {
    const self = this
    return self.findByUserId(user_id, channel_name)
    .then((items) => {
      const deleteOperations = items.map(i => self.deleteById(i.id))
      return all(deleteOperations)
    })
  }

  insertForUserId(order, user_id, channel_name) {
    return this.client.insertItem({
      id: Date.now(),
      user_id: user_id,
      channel_name: channel_name,
      order: order
    })
  }

  findByUserId(user_id, channel_name) {
    return this.client.findByKey({
      user_id: user_id,
      channel_name: channel_name,
    })
    .then((result) => {
      return result.Items
    })
  }
}
