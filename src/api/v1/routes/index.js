'use strict'

const express = require('express')
const { validApiKey, validPermission } = require('../auth/auth.check')
const asyncHandler = require('../helpers/asyncHandle')

const router = express.Router()

// Only open when create api key
router.use('/api/v1/apiKey', require('./apiKey'))

router.use(asyncHandler(validApiKey))
router.use(asyncHandler(validPermission('0000')))

router.use('/api/v1', require('./access'))

module.exports = router