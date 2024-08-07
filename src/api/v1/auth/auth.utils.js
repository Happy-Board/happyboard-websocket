'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandle')
const { ErrorResponse, UnauthorizedError } = require('../core/error.response')
const crypto = require('node:crypto')
const { HEADER } = require('../constants')
const { findKeyByUserId } = require('../services/keyToken.service')

const createTokenPair = async ({ payload, publicKey, privateKey }) => {
    try {
        const accessToken = await JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2d'
        })

        const refreshToken = await JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })

        // Check token before send user
        JWT.verify( accessToken, publicKey, (err, decode) => {
            if(err) throw new ErrorResponse(`ErrorResponse: ${err}`)
            else console.log(`Decode: ${decode}`)
        })

        return { accessToken, refreshToken }
    } catch (err) {
        throw new ErrorResponse(`ErrorResponse: ${err}`)
    }
}

const createPrAndPu = async () => {
    // const privateKey = crypto.randomBytes(64).toString('hex')
    // const publicKey = crypto.randomBytes(64).toString('hex')

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    return { privateKey, publicKey }
}

const verifyJWT = async (token, publicKey) => {
    return await JWT.verify( token, publicKey )
}

const authentication = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new UnauthorizedError('Missing user ID. Please nsure the user ID is provided.'
)

    const keyToken = await findKeyByUserId(userId)
    if(!keyToken) throw new UnauthorizedError('Invalid key token. Please check your key and try again.'
)

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new UnauthorizedError('Not found access token')
    try {
        const decode = await verifyJWT(accessToken, keyToken.publicKey)
        if(userId !== decode.userId) throw new UnauthorizedError('Invalid token')
        req.keyToken = keyToken
        return next()
    } catch (err) {
        throw new UnauthorizedError(`Error: ${err}`)
    }
}

module.exports = {
    createTokenPair,
    createPrAndPu,
    verifyJWT,
    authentication,
}