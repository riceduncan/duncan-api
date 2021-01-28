const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth.controller'))
router.use('/events', require('./event.controller'))
router.use('/users', require('./user.controller'))
router.use('/announcements', require('./announcement.controller'))

module.exports = router