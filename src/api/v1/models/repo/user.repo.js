'use strict'

const userModel = require('../user.model')
const slugify = require('slugify')

const createUserShortly = async ({
    usr_name,
    usr_email,
    usr_password
}) => {
    const usr_slug = slugify(usr_name, { lower: true })
    return await userModel.create({
        usr_slug,
        usr_name,
        usr_password,
        usr_email
    })
}

const findUserById = async (userId) => {
    return userModel.findOne(userId).lean()
}

const findUserByEmail = async (email) => {
    return userModel.findOne({
        usr_email: email
    }).lean()
}


module.exports = {
    createUserShortly,
    findUserById,
    findUserByEmail,
}