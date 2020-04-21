require('dotenv').config()
const pino = require('pino')

const logger = pino({
  enabled: process.env.NODE_ENV !== 'test',
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: {
    translateTime: true
  }
})

module.exports = logger
