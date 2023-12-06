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

const readShareCalcFile = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    // console.log(data)
  })
}

module.exports = {
  readFolderContent,
  readShareCalcFile
}

// checks to make:
// check if the files returned are actually files and not folders. if folders, skip them
