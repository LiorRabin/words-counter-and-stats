const { createReadStream } = require('fs')
const { createInterface } = require('readline')
const { once } = require('events')
const axios = require('axios')

const { logger } = require('../services')
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

const getWordCount = async (word) => db.getWordCount(word)

module.exports = {
  countWordsInString,
  countWordsInFile,
  countWordsFromUrl,
  getWordCount
}
