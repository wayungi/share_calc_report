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

const getNumber = (regex, line) => {
  const match = regex.exec(line)
  if (!match) return null
  return match[0].split(' ').pop()
}

const getGameRecord = (regex, line) => {
  const match = regex.exec(line)
  if (!match) return null
  return match[0].split(' ').filter((elem) => elem !== '')
}

const resultType = (match) => match[0].toUpperCase().replace('REGULAR', '')

module.exports = {
  getProductName,
  getGameRecord,
  resultType,

  getNumber
}
