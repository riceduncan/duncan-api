const { User, Event } = require('../models')
const APIError = require('../../utils/error')

/**
 * Adds user to event registration and event to user list
 * 
 * @param {String} userId database ID of desired user
 * @param {String} eventId database ID of desired event
 */
const registerUserForEvent = async (userId, eventId) => {
  const user = await User.findById({ _id: userId })
  if(!user) throw new APIError("User Not Found", 404)

  const event = await Event.findById({ _id: eventId })
  if(!event) throw new APIError("Event Not Found", 404)

  user.addEvent(eventId)
  user.save()
  event.addUser(userId)
  event.save()

  return [user, event]
}

/**
 * Removes user from event registration and event from user list
 * 
 * @param {String} userId database ID of desired user
 * @param {String} eventId database ID of desired event
 */
const removeUserFromEvent = async (userId, eventId) => {
  const user = await User.findById({ _id: userId })
  if(!user) throw new APIError("User Not Found", 404)

  const event = await Event.findById({ _id: eventId })
  if(!event) throw new APIError("Event Not Found", 404)

  user.removeEvent(eventId)
  user.save()
  event.removeUser(userId)
  event.save()

  return [user, event]
}

module.exports = {
  registerUserForEvent,
  removeUserFromEvent
}