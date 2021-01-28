const mongoose = require('mongoose')
const User = require('./user.model')
const Joi = require('joi')
const APIError = require('../../utils/error')

/**
 * Schema for event object
 */
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  registered: { type: Array, default: [] }
})

/**
 * @param {String} userId database ID of desired user
 */
schema.methods.addUser = async function (userId) {
  const user = await User.findById({ _id: userId })
  if(!user) throw new APIError('User Not Found', 404)

  let userIndex = this.registered.map(function(e) { return e.id }).indexOf(userId)
  if(userIndex < 0) this.registered.push({id: userId, name: user.name})
}

/**
 * @param {String} userId database ID of desired user 
 */
schema.methods.removeUser = function (userId) {
  let userIndex = this.registered.map(function(e) { return e.id }).indexOf(userId)
  if(userIndex >= 0) this.registered.splice(userIndex, 1)
}

/**
 * Validates given object against event schema
 * 
 * @param {Object} model attempted event object
 */
schema.statics.validateObject = function (model) {
  const expected = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
  })
  return expected.validate(model)
}

module.exports = mongoose.model('Event', schema)