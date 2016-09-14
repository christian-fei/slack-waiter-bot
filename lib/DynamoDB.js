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
    key.id = key.id || null
    key.order = key.order || null
    const client = this.client
    const params = scanParamsFrom(key, this.table)
    return new Promise((resolve, reject) => {
      client.scan(params, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }
}

function scanParamsFrom(object, table) {
  let params = {
    TableName: table,
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ProjectionExpression: "",
    FilterExpression: ""
  }

  for(var key in object) {
    const value = object[key]
    if(value === null) {
      if(key === 'id') {
        params.ProjectionExpression += `id, `
      }else {
        params.ProjectionExpression += `#${key}, `
        params.ExpressionAttributeNames[`#${key}`] = key
      }
    } else {
      params.ExpressionAttributeNames[`#${key}`] = key
      params.ExpressionAttributeValues[`:${key}`] = value
      params.ProjectionExpression += `#${key}, `
      params.FilterExpression += `#${key} = :${key} and `
    }
  }
  params.ProjectionExpression = params.ProjectionExpression.replace(/, $/,'')
  params.FilterExpression = params.FilterExpression.replace(/ and $/,'')

  return params
}
