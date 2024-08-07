'use strict'

const { Schema, Types, model } = require('mongoose')

const COLLECTION_NAME = 'KeyTokens'
const DOCUMENT_NAME = 'KeyToken'

const keyTokenSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshTokensUsed:{
        type:Array,
        default: []
    }, 
    refreshToken: {
        type:String,
        required:true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)