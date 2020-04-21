const { incrWordCount, getWordCount } = require('./redis')

const db = {
  incrWordCount,
  getWordCount
}

module.exports = db
