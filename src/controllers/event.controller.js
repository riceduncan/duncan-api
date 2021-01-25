const express = require('express')
const { EventService } = require('../services')
const jwt = require('../../utils/jwt')

const router = express.Router()

/**
 * GET /api/v1/events/
 * Gets list of all events
 */
router.get('/', jwt.validate, async (req, res) => {
  try {
    const events = await EventService.getAllEvents()
    res.status(200).json(events)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

/**
 * POST /api/v1/events/
 * Creates a new event
 */
router.post('/', jwt.validate, jwt.checkAccess, async (req, res) => {
  try {
    const event = await EventService.createEvent(req.body)
    res.status(201).json(event)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

/**
 * GET /api/v1/events/:eventId
 * Gets specific event
 */
router.get('/:eventId', jwt.validate, async (req, res) => {
  try {
    const event = await EventService.getEventById(req.params.eventId)
    res.status(200).json(event)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

/**
 * DEL /api/v1/events/:eventId
 * Deletes specific event
 */
router.delete('/:eventId', jwt.validate, jwt.checkAccess, async (req, res) => {
  try {
    const event = await EventService.deleteEvent(req.params.eventId)
    res.status(200).json(event)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

/**
 * PUT /api/v1/events/:eventId
 * Updates specific event
 */
router.put('/:eventId', jwt.validate, jwt.checkAccess, async (req, res) => {
  try {
    const event = await EventService.updateEvent(req.body, req.params.eventId)
    res.status(200).json(event)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

module.exports = router