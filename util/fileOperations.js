const fs = require('node:fs')
const path = require('path')
const readline = require('readline')
const {
  getDrawNumber,
  getRollOverNumber,
  getGameStats
} = require('./dataExtraction')

const folderPath = path.join(__dirname, '..', 'share_calc_reports')

const drawNumberRegex = /Calculated share values for draw\s+\d+/
const rollOverNumberRegex = /Rollover number\s+\d+/
const gameStatsRegex = /\d+\s+\d{1,3}(,\d{3})*(\.\d{2})\s+\d+\s+\d{1,3}(,\d{3})*(\.\d{2})/

const readFolderContent = () => {
  if (!fs.existsSync(folderPath)) return
  const shareCalcReportFilesArray = fs.readdirSync(folderPath).map(fileName => path.join(folderPath, fileName))
  return shareCalcReportFilesArray
}

const readSharedCalcFileLineByLine = async (filePath) => {
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    if (drawNumberRegex.exec(line)) {
      getDrawNumber(drawNumberRegex.exec(line))
    } else if (rollOverNumberRegex.exec(line)) {
      getRollOverNumber(rollOverNumberRegex.exec(line))
    } else if (gameStatsRegex.exec(line)) {
      getGameStats(gameStatsRegex.exec(line))
    }

    // getNextDrawRollOver(line)
  }
}

module.exports = {
  readFolderContent,
  readSharedCalcFileLineByLine
}
