/**
 * Dependencies
 */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const swagger = require('swagger-ui-express')
const yaml = require('yamljs')

const routes = require('../src/controllers')
const docs = yaml.load('docs/openapi.yaml')

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
  app.use('/docs', swagger.serve, swagger.setup(docs))

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    app.listen(port, () => {
      console.log('Connected at http://localhost:' + port)
    })
  }).catch( (err) => { console.log(err) })
}

module.exports = run