const express = require('express')
const { AuthService } = require('../services')
const jwt = require('../../utils/jwt')

const router = express.Router()

/**
 * POST /api/v1/auth/login
 * Returns token given credentials
 */
router.post('/login', async (req, res) => {
  try {
    let token = await AuthService.login(req.body.email, req.body.password)
    res.status(200).json(token)
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err)
  }
})

/**
 * POST /api/v1/auth/signup
 * Creates new user; returns token from credentials
 */
router.post('/signup', async (req, res) => {
  try {
    let newser = await AuthService.signup(req.body)
    let token = await AuthService.login(req.body.email, req.body.password)
    res.status(201).json(token)
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err)
  }
})

/**
 * GET /api/v1/auth/me
 * Returns information encoded in token
 */
router.get('/me', jwt.validate, async (req, res) => {
  try {
    let user = await AuthService.me(req.headers.authorization.split(' ')[1])
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err)
  }
})

module.exports = router