'use strict'

const { Schema, Types, model } = require('mongoose')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema({
    // usr_id: { type: Number, required: true },
    usr_slug: { type: String, required: true },
    usr_name: { type: String, required: true },
    usr_password: { type: String, required: true },
    usr_email: { type: String, required: true },
    usr_phone: { type: String, default: '' },
    usr_sex: { type: String, default: '' },
    usr_avatar: { type: String, default: '' },
    usr_date_of_birth: { type: Date, default: null },
    usr_role: { type: String, default: 'user', enum: ['user', 'admin']}
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, userSchema)

