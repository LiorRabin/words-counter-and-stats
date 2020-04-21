const { createReadStream } = require('fs')
const { createInterface } = require('readline')
const { once } = require('events')
const axios = require('axios')

const { logger } = require('../services')
const { incrWordCount, getWordStats } = require('../db')

const countWordsInString = async (str, caseSensitive) => {
  const words = str.replace(/[^a-zA-Z ]/g, '').split(' ').filter(w => w.length)
  await Promise.all(words.map(async word => {
    word = caseSensitive ? word : word.toLowerCase()
    await incrWordCount(word)
  }))
  logger.trace('string processed')
}

const countWordsInFile = async (path, caseSensitive) => {
  const stream = createReadStream(path)
  const rl = createInterface({ input: stream })
  rl.on('line', function (line) {
    countWordsInString(line, caseSensitive)
  })
  await once(rl, 'close')
  logger.debug('file processed')
}

const countWordsFromUrl = async (url, caseSensitive) => {
  const response = await axios({ url, responseType: 'stream' })
  const stream = response.data
  const rl = createInterface({ input: stream })
  rl.on('line', function (line) {
    countWordsInString(line, caseSensitive)
  })
  await once(rl, 'close')
  logger.debug('url processed')
}

const getWordCount = async (word) => {
  const { count } = await getWordStats(word)
  return count
}

module.exports = {
  countWordsInString,
  countWordsInFile,
  countWordsFromUrl,
  getWordCount
}
