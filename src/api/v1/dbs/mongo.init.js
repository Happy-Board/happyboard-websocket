'use strict'

const mongoose = require('mongoose')
const { host, name, port } = require('../../../config/mongo.config')
const connectString = `mongodb://${host}:${port}/${name}`

class MongoDB {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })
        mongoose.connect(connectString, {
            maxPoolSize: 10
        })
        .then( _ => {
            console.log('MongoDB connection successful')
        })
        .catch(err => {
            console.error('MongoDB connection error')
        })
    }

    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB()
        }
        return MongoDB.instance
    }
}

const instanceMongodb = MongoDB.getInstance()

module.exports = instanceMongodb