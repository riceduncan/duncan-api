const jwt = require('../../utils/jwt')
const { User } = require('../models')
const APIError = require('../../utils/error')

/**
 * Generates token from given credentials, if valid
 * 
 * @param {String} email 
 * @param {String} password 
 */
const login = async (email, password) => {
  const user = await User.findOne({ email: email })
  if(!user) throw new APIError('Email Not Registered', 404)

  let authorized = await user.checkPassword(password)
  if(authorized) {
    let token = await jwt.generate(email)
    return { token: token }
  } else {
    throw new APIError('Incorrect Password', 401)
  }
}

/**
 * Creates new user from given data
 * 
 * @param {Object} newUser an object containing new user data 
 */
const signup = async (newUser) => {
  const { error, value } = await User.validateObject(newUser)
  if(error) throw new APIError('Invalid Model', 400)
 
  const existing = await User.findOne({ email: value.email })
  if(existing) throw new APIError('Email Already Used', 400)

  const user = new User(value)
  return user.save()
}

/**
 * Returns information encoded in token
 * 
 * @param {String} token JWT token 
 */
const me = async (token) => {
  return jwt.decrypt(token)
}

module.exports = {
  login: login,
  signup: signup,
  me: me
}