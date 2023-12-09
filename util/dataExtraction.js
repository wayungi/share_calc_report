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

const getDrawNumber = (match) => match[0].split(' ').pop()
const getRollOverNumber = (match) => match[0].split(' ').pop()
const getGameStats = (match) => match[0].split(' ').filter((elem) => elem !== '')
const resultType = (match) => match[0].toUpperCase().replace('REGULAR', '')

module.exports = {
  getProductName,
  getDrawNumber,
  getRollOverNumber,
  getGameStats,
  resultType
}
