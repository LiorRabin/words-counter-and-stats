const router = require('express').Router()

const { logger } = require('../../services')
const { countWordsInString, countWordsInFile, countWordsFromUrl, getWordCount } = require('../../handlers')
const { INPUT_TYPES, ERRORS } = require('../../utils/constants')

/**
 * @api {post} /api/words/counter Counts number of appearences for each word in the input
 * @apiName WordsCounter
 * @apiGroup Words
 * @apiDescription Counts number of appearences for each word in the input
 *
 * @apiParam {String} type "string", "file" or "url"
 * @apiParam {String} value depending on the "type" param the relevant value (note: for "file" need full path)
 *
 * @apiSuccess {String} response "ok"
 */
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

/**
 * @api {get} /api/words/stats/:word Get number of times a word appeared so far (in all previous inputs)
 * @apiName WordsStats
 * @apiGroup Words
 * @apiDescription Get number of times a word appeared so far (in all previous inputs)
 *
 * @apiSuccess {String} word the input word checked
 * @apiSuccess {Number} count the number of times the input word appeared so far
 */
router.get('/stats/:word', async (req, res) => {
  const { word } = req.params
  logger.debug(`getting stats for "${word}"`)
  const count = await getWordCount(word)
  logger.debug(`"${word}" count is ${count}`)
  res.send({ word, count })
})

module.exports = router
