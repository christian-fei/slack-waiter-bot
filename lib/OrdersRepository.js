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

  deleteAllForUserId(user_id, channel_id) {
    const self = this
    return self.findByUserId(user_id, channel_id)
    .then((items) => {
      const deleteOperations = items.map(i => self.deleteById(i.id))
      return all(deleteOperations)
    })
  }

  insertForUserId(order, user_id, channel_id) {
    return this.client.insertItem({
      id: Date.now(),
      user_id: user_id,
      channel_id: channel_id,
      order: order
    })
  }

  findByUserId(user_id, channel_id) {
    return this.client.findByKey({
      user_id: user_id,
      channel_id: channel_id,
      order: null,
      price: null
    })
    .then((result) => {
      return result.Items
    })
  }

  findByChannelId(channel_id) {
    return this.client.findByKey({
      channel_id: channel_id,
      price: null,
    })
    .then((result) => {
      return result.Items
    })
  }

  lastForUserId(user_id, channel_id) {
    return this.client.findByKey({
      user_id: user_id,
      channel_id: channel_id,
      price: null
    })
    .then((result) => {
      return result.Items.sort((a,b) => {
        return a.id < b.id
      })[0]
    })
  }

  updateById(id, item) {
    return this.client.updateItem(id, item)
  }
}
