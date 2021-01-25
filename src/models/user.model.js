const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

/**
 * Schema for user object
 */
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  access: { type: Number, default: 1 },
  events: { type: Array, default: [] }
})

/**
 * Hash password on save
 */
schema.pre('save', function (next) {
  let person = this
  if(!person.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err
    bcrypt.hash(person.password, salt, (err, hash) => {
      if(err) throw err
      person.password = hash
      return next()
    })
  })
})

/**
 * Compares hashed password to attempt
 * 
 * @param {String} password 
 */
schema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

/**
 * @param {String} eventId database id of desired event 
 */
schema.methods.addEvent = function (eventId) {
  let eventIndex = this.events.indexOf(eventId)
  if(eventIndex < 0) this.events.push(eventId)
}

/**
 * @param {String} eventId database id of desired event 
 */
schema.methods.removeEvent = function (eventId) {
  let eventIndex = this.events.indexOf(eventId)
  if(eventIndex >= 0) this.events.splice(eventIndex, 1)
}

/**
 * Validates given object against user schema
 * 
 * @param {Object} model attempted user object
 */
schema.statics.validateObject = function (model) {
  const expected = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  })
  return expected.validate(model)
}

module.exports = mongoose.model('User', schema)