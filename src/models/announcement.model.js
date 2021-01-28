const mongoose = require('mongoose')
const Joi = require('joi')

/**
 * Schema for announcement object
 */
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isUrgent: { type: Boolean, required: true }
})

/**
 * Validates given object against announcements schema
 * 
 * @param {Object} model attempted announcements object 
 */
schema.statics.validateObject = function (model) {
  const expected = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),
    isUrgent: Joi.boolean().required()
  })
  return expected.validate(model)
}

module.exports = mongoose.model('Announcement', schema)