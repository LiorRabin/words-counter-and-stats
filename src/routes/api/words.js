const router = require('express').Router()

const { logger } = require('../../services')
const { countWordsInString, countWordsInFile, countWordsFromUrl, getWordCount } = require('../../handlers')
const { INPUT_TYPES, ERRORS } = require('../../utils/constants')

router.post('/counter', async (req, res, next) => {
  const { type, value, caseSensitive } = req.body
  switch (type) {
    case INPUT_TYPES.STRING:
      logger.debug(`processing ${INPUT_TYPES.STRING} with value "${value}"`)
      countWordsInString(value, caseSensitive)
      break
    case INPUT_TYPES.FILE:
      logger.debug(`processing ${INPUT_TYPES.FILE} with value "${value}"`)
      countWordsInFile(value, caseSensitive)
      break
    case INPUT_TYPES.URL:
      logger.debug(`processing ${INPUT_TYPES.URL} with value "${value}"`)
      countWordsFromUrl(value, caseSensitive)
      break
    default:
      return next({ status: 501, message: `${ERRORS.UNKNOWN_INPUT_TYPE} - ${type}` })
  }
  res.send({ response: 'ok' })
})

router.get('/stats', async (req, res) => {
  const { word } = req.query
  const count = await getWordCount(word)
  res.send({ word, count })
})

module.exports = router
