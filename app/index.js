/**
 * Dependencies
 */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const run = (port, dbUri) => {
  const app = express()

  app.use(bodyParser.json())

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    app.listen(port, () => {
      console.log('Connected at http://localhost:' + port)
    })
  }).catch( (err) => { console.log(err) })
}

module.exports = run