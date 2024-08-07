'use strict'

const apiKeyModel = require('../models/apiKey.model')
const crypto = require('node:crypto')
const { getInfoData } = require('../utils')

const findApiKeyByKey = async ( key ) => {
    return await apiKeyModel.findOne({
        key,
        status: true
    }).lean()
}

const createApiKey = async () => {
    const key = crypto.randomBytes(64).toString('hex')
    const apiKey = await apiKeyModel.create({
        key: key,
        permissions: ['0000']
    })
    return getInfoData({
        fields: ['key', 'status', 'permissions'],
        object: apiKey
    })
}

module.exports = {
    findApiKeyByKey,
    createApiKey,
}