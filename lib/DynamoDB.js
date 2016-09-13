'use strict'
const AWS = require('aws-sdk')
AWS.config.region = 'eu-central-1'
module.exports = class DynamoDB {
  constructor(table) {
    this.client = new AWS.DynamoDB.DocumentClient()
    this.table = table
  }

  deleteItem(id) {
    const client = this.client
    const params = {
      TableName: this.table,
      Key: {
        id: id
      }
    }
    return new Promise((resolve, reject) => {
      client.delete(params, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }

  insertItem(item) {
    const client = this.client
    const params = {
      TableName: this.table,
      Item:item
    }
    return new Promise((resolve, reject) => {
      client.put(params, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }

  findByKey(key) {
    const client = this.client
    const params = { TableName: this.table, Key: key}
    return new Promise((resolve, reject) => {
      client.scan(params, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }
}
