'use strict'

const keyTokenModel = require("../models/keyToken.model")
const { convertToObjectMongodb } = require("../utils")

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken
    }) => {
        try {
            const filter = { user: convertToObjectMongodb(userId) }
            const update = {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
                refreshToken
            }
            const options = { upsert: true, new: true }
    
            const token = await keyTokenModel.findOneAndUpdate(filter, update, options)
    
            return token ? token.publicKey : null
        } catch (err) {
            console.log(`Error with createKeyToken: ${err}`)
            return err
        }
    }

    static removeKeyById = async (id) => {
        return await keyTokenModel.deleteOne({ _id: convertToObjectMongodb(id) })
    }

    static findKeyById = async (id) => {
        return await keyTokenModel.findById({ _id: convertToObjectMongodb(id) }).lean()
    }

    static findKeyByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: userId }).lean()
    }
}

module.exports = KeyTokenService