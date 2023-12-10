const fs = require('node:fs')
const path = require('path')

const folderPath = path.join(__dirname, '..', 'share_calc_reports')

const createDir = (req, res, next) => {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  } catch (err) {
    console.log(`${err} : Could not correctly setup, please refresh the page`)
  }

  next()
}

module.exports = createDir
