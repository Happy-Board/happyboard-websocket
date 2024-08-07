'use strict'

const dev = {
    host: process.env.DEV_MYSQL_HOST || 'localhost',
    user: process.env.DEV_MYSQL_USER || 'root',
    password: process.env.DEV_MYSQL_PW || '',
    database: process.env.DEV_MYSQL_DB || 'test',
}

const prod = {
    host: process.env.DEV_MYSQL_HOST || 'localhost',
    user: process.env.DEV_MYSQL_USER || 'root',
    password: process.env.DEV_MYSQL_PW || '',
    database: process.env.DEV_MYSQL_DB || 'test',
}

const config = {dev, prod}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]