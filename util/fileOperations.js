const fsPromises = require('fs').promises
const fs = require('node:fs')
const path = require('path')
const readline = require('readline')

const folderPath = path.join(__dirname, '..', 'share_calc_reports')

// write thsi with an import from fsPromises to reduce duplicate imports
const readFolderContent = () => {
  if (!fs.existsSync(folderPath)) return
  const shareCalcReportFilesArray = fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })
  return shareCalcReportFilesArray
}

const readShareCalcFile = async (filePath) => {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8')
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

const readSharedCalcFileLineByLine = async (filePath) => {
  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    console.log(`Line from file: ${line}`)
  }
}

module.exports = {
  readFolderContent,
  readShareCalcFile,
  readSharedCalcFileLineByLine
}

// checks to make:
// check if the files returned are actually files and not folders. if folders, skip them
