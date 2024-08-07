'use strict'

const _ = require('lodash')
const { Types } = require('mongoose')

const convertToObjectMongodb = id => new Types.ObjectId(id)

const getInfoData = ({ fields = [], object = {} }) => _.pick(object, fields)

module.exports = {
    convertToObjectMongodb,
    getInfoData,
}