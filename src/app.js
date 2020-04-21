require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { logger } = require('./services')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use(morgan('common'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next({ status: 404, message: 'Not Found' })
})

// error handler
app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(err.status || 500).json({ error: err })
})

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`)
})

process.on('uncaughtException', err => {
  console.log(err)
  process.exit(1)
})
process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})
