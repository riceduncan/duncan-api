const config = require('./config')
const app = require('./app')

app(config.port, config.db.uri)