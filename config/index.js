require('dotenv').config()

let config = {
  auth: {},
  db: {}
}

config.port = process.env.PORT || '8080'

config.auth.secret = 'lMaO1!1'

config.db.name = process.env.DB_NAME || 'dev'
config.db.uri = process.env.DB_URI || ''

module.exports = config