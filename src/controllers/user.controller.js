const express = require('express')
const { UserService } = require('../services')
const jwt = require('../../utils/jwt')

const router = express.Router()

/**
 * POST /api/v1/users/:userId/register/:eventId
 * Registers user for event
 */
router.post('/:userId/register/:eventId', jwt.validate, async (req, res) => {
  try {
    let ret = await UserService.registerUserForEvent(req.params.userId, req.params.eventId)
    res.status(200).json(ret)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

/**
 * DELETE /api/v1/users/:userId/remove/:eventId
 * Removes user from event registration
 */
router.delete('/:userId/remove/:eventId', jwt.validate, async (req, res) => {
  try {
    let ret = await UserService.removeUserFromEvent(req.params.userId, req.params.eventId)
    res.status(200).json(ret)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

module.exports = router