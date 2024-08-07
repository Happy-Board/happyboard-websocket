'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helpers/asyncHandle')
const { authentication } = require('../../auth/auth.utils')

const router = express.Router()

router.post('/signup', asyncHandler(accessController.signUp))
router.post('/login', asyncHandler(accessController.login))

router.use(asyncHandler(authentication))
router.post('/logout', asyncHandler(accessController.logout))


module.exports = router