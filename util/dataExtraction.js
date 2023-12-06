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

module.exports = {
  getProductName
}
