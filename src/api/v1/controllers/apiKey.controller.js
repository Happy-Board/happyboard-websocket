'use strict'

const { CREATED } = require('../core/success.response')
const { createApiKey } = require('../services/apiKey.service')

class ApiKeyController {
    create = async (req, res, next) => {
        new CREATED({
            message: 'Create API Key successfully! Please turn off route of api key to secure your web',
            metadata: await createApiKey()
        }).send(res)
    }
}

module.exports = new ApiKeyController()