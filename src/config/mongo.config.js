'use strict'

const dev = {
    host: process.env.DEV_MONGODB_HOST || '0.0.0.0',
    port: process.env.DEV_MONGODB_PORT || 27017,
    name: process.env.DEV_MONGODB_NAME || 'dev_mongo_db'
}

const prod = {
    host: process.env.PROD_MONGODB_HOST || '0.0.0.0',
    port: process.env.PROD_MONGODB_PORT || 27017,
    name: process.env.PROD_MONGODB_NAME || 'prod_mongo_db'
}

const config = {dev, prod}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]