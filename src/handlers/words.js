const { existsSync, createReadStream } = require('fs')
const { createInterface } = require('readline')
const { once } = require('events')
const axios = require('axios')

const { logger } = require('../services')
const { ERRORS } = require('../utils/constants')
const db = require('../db')

const countWordsInString = async (str, caseSensitive) => {
  const words = str.replace(/[^a-zA-Z ]/g, '').split(' ').filter(w => w.length)
  const counter = {}
  words.map(word => {
    word = caseSensitive ? word : word.toLowerCase()
    counter[word] = counter[word] || 0
    counter[word]++
  })
  await Promise.all(Object.keys(counter).map(async word => {
    await db.incrWordCount(word, counter[word])
  }))
  logger.trace('string processed')
}

const countWordsInFile = async (path, caseSensitive) => {
  try {
    if (existsSync(path)) {
      const stream = createReadStream(path)
      const rl = createInterface({ input: stream })
      rl.on('line', function (line) {
        countWordsInString(line, caseSensitive)
      })
      await once(rl, 'close')
      logger.debug('file processed')
    } else {
      throw new Error(`${ERRORS.FILE_NOT_EXISTS} "${path}"`)
    }
  } catch (err) {
    logger.warn(err)
  }
}

const countWordsFromUrl = async (url, caseSensitive) => {
  try {
    const response = await axios({ url, responseType: 'stream' })
    if (!response || !response.data) {
      throw new Error(`${ERRORS.NO_DATA_FROM_URL} "${url}"`)
    }
    const stream = response.data
    const rl = createInterface({ input: stream })
    rl.on('line', function (line) {
      countWordsInString(line, caseSensitive)
    })
    await once(rl, 'close')
    logger.debug('url processed')
  } catch (err) {
    logger.warn(err)
  }
}

const getWordCount = async (word) => db.getWordCount(word)

module.exports = {
  countWordsInString,
  countWordsInFile,
  countWordsFromUrl,
  getWordCount
}
