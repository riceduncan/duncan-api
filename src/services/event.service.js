const { Event } = require('../models')
const APIError = require('../../utils/error')

/**
 * Gets all events
 */
const getAllEvents = async () => {
  return Event.find({})
}

/**
 * @param {String} eventId database ID of desired event
 */
const getEventById = async (eventId) => {
  const event = await Event.findById({ _id: eventId })
  if(!event) throw new APIError('Event Not Found', 404)
  return event
}

/**
 * @param {Object} newEvent object representing a new event 
 */
const createEvent = async (newEvent) => {
  const { error, value } = Event.validateObject(newEvent)
  if(error) throw new APIError('Invalid Model', 400)

  let event = new Event(value)
  return event.save()
}

/**
 * @param {Object} newEvent object representing event with updated fields 
 * @param {String} eventId database ID of event to update
 */
const updateEvent = async (newEvent, eventId) => {
  const { error, value } = Event.validateObject(newEvent)
  if(error) throw new APIError('Invalid Model', 400)

  let event = await Event.findByIdAndUpdate({ _id: eventId }, value)
  return event
}

/**
 * @param {String} eventId database ID of event to delete 
 */
const deleteEvent = async (eventId) => {
  const event = await Event.findByIdAndDelete({ _id: eventId })
  if(!event) throw new APIError('Event Not Found', 404)
  return event
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
  updateEvent
}