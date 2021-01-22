const config = require('../config')
const jwt = require('jsonwebtoken')

const { User } = require('../src/models')
const APIError = require('./error')

const generateToken = async (email) => {
  const user = await User.findOne({ email: email })
  return jwt.sign({
    name: user.name,
    email: user.email,
    access: user.access,
    events: user.events
  }, config.auth.secret, {
    expiresIn: '1h'
  })
}

const decryptToken = async (token) => {
  return jwt.verify(token, config.auth.secret)
}

const validateToken = (req, res, next) => {
  if(req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.auth.secret, (err, decoded) => {
      if(err) res.status(401).json(new APIError('Invalid Token', 401))
      return next()
    })
  } else {
    res.status(401).json(new APIError('Token Not Found', 401))
  }
}

module.exports = {
  generate: generateToken,
  validate: validateToken,
  decrypt: decryptToken
}