'use strict'

const AccessService = require('../services/access.service')

const { OK, CREATED, SuccessResponse } = require('../core/success.response')
const { BadRequestError } = require('../core/error.response')

class AccessController {
    signUp = async (req, res, next) => {
        new CREATED({
            message: 'User register success',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {
        new OK({
            message: 'Login success',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        new OK({
            message: 'User logout success',
            metadata: await AccessService.logout(req.keyToken)
        }).send(res)
    }
}

module.exports = new AccessController()