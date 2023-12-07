/* Data values to extract
    product name
    draw number
    next draw rollover
    rollover number
    div, share value, number of shares, payout Amount
*/

const ProductCode = {
  LOTTO: 'p008',
  POWERBALL: 'p012',
  DAILYLOTTO: 'p013'
}

const getProductName = (filePath) => {
  let productName = ''
  if (filePath.includes(ProductCode.LOTTO)) {
    productName = 'LOTTO'
  } else if (filePath.includes(ProductCode.DAILYLOTTO)) {
    productName = 'DAILYLOTTO'
  } else if (filePath.includes(ProductCode.POWERBALL)) {
    productName = 'POWERBALL'
  }
  return productName
}

const getDrawNumber = (line) => {
  // this needs to be optimized
  const regex = /[A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z]\s[A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z]\s[A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z][A-Za-z]\s[A-Za-z][A-Za-z][A-Za-z]\s[A-Za-z][A-Za-z][A-Za-z][A-Za-z]\s\s\s\s\s\s\s\s\s\s\d\d\d\d/
  const matchResult = regex.exec(line)
  if (!matchResult) return
  const drawNumber = matchResult[0].split(' ').pop()
  console.log('Draw Number :', `${drawNumber}`)
  return drawNumber
}

const getNextDrawRollOver = (line) => {
  console.log('Still pending')
}

const getRollOverNumber = (line) => {
  const regex = /Rollover number {5}\d\d/
  const matchResult = regex.exec(line)
  if (!matchResult) return
  const rollOverNumber = matchResult[0].split(' ').pop()
  console.log('Roll Over Number', `${rollOverNumber}`)
  return rollOverNumber
}

module.exports = {
  getProductName,
  getDrawNumber,
  getNextDrawRollOver,
  getRollOverNumber
}
