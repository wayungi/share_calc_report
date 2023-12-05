const fs = require('node:fs')
const path = require('path')

const folderPath = path.join(__dirname, '..', 'share_calc_reports')

const readFolderContent = () => {
  if (!fs.existsSync(folderPath)) return
  const shareCalcReportFilesArray = fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })
  return shareCalcReportFilesArray
}

module.exports = readFolderContent

// checks to make:
// check if the files returned are actually files and not folders. if folders, skip them
