const { logger, redis } = require('../services')

const incrWordCount = async (word, incr) => {
  try {
    return redis.hincrby('words', word, incr)
  } catch (err) {
    logger.warn(err)
  }
}

const getWordCount = async (word) => {
  try {
    const count = await redis.hget('words', word)
    return (count && parseInt(count)) || 0
  } catch (err) {
    logger.error(err)
    return 0
  }
}

module.exports = {
  incrWordCount,
  getWordCount
}
