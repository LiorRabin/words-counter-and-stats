const { redis } = require('../services')

const incrWordCount = async (word, incr) => {
  return redis.hincrby('words', word, incr)
}

const getWordStats = async (word) => {
  const count = await redis.hget('words', word)
  return {
    count: (count && parseInt(count)) || 0
  }
}

module.exports = {
  incrWordCount,
  getWordStats
}
