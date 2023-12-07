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

const getNextDrawRollOver = (line) => {
  console.log('Still pending')
}
const getDrawNumber = (match) => match[0].split(' ').pop()
const getRollOverNumber = (match) => match[0].split(' ').pop()
const getGameStats = (match) => match[0]

module.exports = {
  getProductName,
  getDrawNumber,
  getNextDrawRollOver,
  getRollOverNumber,
  getGameStats
}
