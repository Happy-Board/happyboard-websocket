'use strict'

const { HEADER } = require('../constants')
const { ProxyAuthenticationRequired, ForbiddenError } = require('../core/error.response')
const asyncHandler = require('../helpers/asyncHandle')
const { findApiKeyByKey } = require('../services/apiKey.service')

const validApiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString()
    
    if(!key) throw new ProxyAuthenticationRequired('Headers must have x-api-key')
    const objKey = await findApiKeyByKey(key)

    req.objKey = objKey

    next()
}

const validPermission = (permission) => {
    return async (req, res, next) => {
        if(!req.objKey.permissions) throw new ForbiddenError('Permission denied')
        
        const valid = req.objKey.permissions.includes(permission)

        if(!valid) throw new ForbiddenError('Permission denied')
        return next()
    }
}

module.exports = {
    validApiKey,
    validPermission,
}