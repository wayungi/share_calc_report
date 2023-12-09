const ProductCode = {
  LOTTO: 'p008',
  POWERBALL: 'p012',
  DAILYLOTTO: 'p013'
}

const getProductName = (filePath) => {
  if (filePath.includes(ProductCode.LOTTO)) return 'LOTTO'
  if (filePath.includes(ProductCode.DAILYLOTTO)) return 'DAILYLOTTO'
  if (filePath.includes(ProductCode.POWERBALL)) return 'POWERBALL'
}

const getNextDrawRollOver = (line) => '1000' /* =========== figure out how to get next draw rollover === */
const getDrawNumber = (match) => match[0].split(' ').pop()
const getRollOverNumber = (match) => match[0].split(' ').pop()
const getGameStats = (match) => match[0].split(' ').filter((elem) => elem !== '')
const resultType = (match) => {
  const value = match[0].toUpperCase().replace('REGULAR', '')
  // console.log(value)
  return value
}

module.exports = {
  getProductName,
  getDrawNumber,
  getNextDrawRollOver,
  getRollOverNumber,
  getGameStats,
  resultType
}
