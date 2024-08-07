'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandle')
const apiKeyController = require('../../controllers/apiKey.controller')

const router = express.Router()

router.post('/create', asyncHandler(apiKeyController.create))

module.exports = router