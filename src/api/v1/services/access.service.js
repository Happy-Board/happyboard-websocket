'use strict'

const bcrypt = require('bcrypt')
const { BadRequestError, UnauthorizedError } = require('../core/error.response')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair, createPrAndPu } = require('../auth/auth.utils')
const { getInfoData } = require('../utils')
const { findUserByEmail, createUserShortly } = require('../models/repo/user.repo')

class AccessService {
    static signUp = async ({ name, email, password }) => {
        if(!email || !password) throw new BadRequestError('Email and password are required')
        if(!name) name = email

        const holderUser = await findUserByEmail(email)

        if(holderUser) throw new BadRequestError('Account already exists')

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await createUserShortly({
            usr_name: name,
            usr_email: email,
            usr_password: passwordHash
        })

        const userId = newUser._id

        if(newUser) {
            const { privateKey, publicKey } = await createPrAndPu()
            const keyStore = await KeyTokenService.createKeyToken({
                userId,
                publicKey,
                privateKey,
                refreshToken: null
            })

            if(!keyStore) throw new BadRequestError('Error with signup: keyStore not found')

            const tokens = await createTokenPair({
                payload: { userId, email },
                publicKey,
                privateKey
            })
            return {
                user: getInfoData({
                    fields: ['_id', 'usr_name', 'usr_email'],
                    object: newUser
                }),
                tokens: tokens
            }
        }
    }

    static login = async ({ email, password, refreshToken = null }) => {
        // 1.Check email
        if(!email || !password) throw new BadRequestError('Email and password are required')
        const foundUser = await findUserByEmail(email)
        if(!foundUser) throw new BadRequestError('Account does not exist')
        // 2.Match pw
        const isPw = await bcrypt.compare(password, foundUser.usr_password)
        if(!isPw) throw new UnauthorizedError('Password is incorrect')

        // 3.Create token pair
        const { privateKey, publicKey } = await createPrAndPu()
        const { _id: userId } = foundUser

        const keyStore = await KeyTokenService.createKeyToken({
            userId: userId,
            publicKey,
            privateKey,
            refreshToken: null
        })
        console.log(2);

        if(!keyStore) throw new BadRequestError('Error with signup: keyStore not found')

        const tokens = await createTokenPair({
            payload: { userId: userId, email },
            publicKey,
            privateKey
        })

        return {
            user: getInfoData({fields:['_id', 'name', 'email'], object:foundUser}),
            tokens
        }

    }

    static logout = async (keyToken) => {
        const delKey = await KeyTokenService.removeKeyById(keyToken._id)
        return delKey
    }
}

module.exports = AccessService