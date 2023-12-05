const path = require('path')
const fs = require('fs')

const createDir = (req, res, next) => {
  const folderPath = path.join(__dirname, '..', 'share_calc_reports')
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
  next()
}

module.exports = createDir
