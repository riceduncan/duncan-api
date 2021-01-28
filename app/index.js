/**
 * Dependencies
 */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes = require('../src/controllers')

/**
 * Initializes web server and connects to DB
 * 
 * @param {Number} port the port hosting the server
 * @param {String} dbUri the MongoDB Compass URI
 */
const run = (port, dbUri) => {
  const app = express()

  app.use(bodyParser.json())
  app.use('/api/v1', routes)

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    app.listen(port, () => {
      console.log('Connected at http://localhost:' + port)
    })
  }).catch( (err) => { console.log(err) })
}

module.exports = run