require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const logger = require('./services/logger')
const routes = require('./routes')

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

const run = () => {
  const app = express()

  app.use(morgan('common'))

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(routes)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handlers
  if (!PRODUCTION) {
    app.use((err, req, res, next) => {
      logger.error(err.stack)
      res.status(err.status || 500)
      res.json({
        errors: {
          message: err.message,
          error: err
        }
      })
    })
  } else {
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.json({
        errors: {
          message: err.message,
          error: {}
        }
      })
    })
  }

  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
  })
}

run()
