'use strict'

const HEADER = {
    API_KEY:'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const ROLE_USER = {
    USER: 'USER',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

const USER_FAKE = {
    _id: "1",
    name: 'Test',
    email: 'test@gmail.com',
    password: 'HelloWorld',
    role: [ROLE_USER.USER]
}

module.exports = {
    HEADER,
    ROLE_USER,
    USER_FAKE,
}