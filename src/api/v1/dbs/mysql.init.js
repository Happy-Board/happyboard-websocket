'use strict'

const mysql = require('mysql2')
const {
    host, user, password, database
} = require('../../../config/mysql.config')

const connection = mysql.createConnection({
    host, user, password
})

console.log('MySQL connetion successful')

module.exports = connection