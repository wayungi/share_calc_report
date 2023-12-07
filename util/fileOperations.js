const fs = require('node:fs')
const path = require('path')
const readline = require('readline')
const {
  getDrawNumber,
  getRollOverNumber,
  getGameStats,
  getNextDrawRollOver
} = require('./dataExtraction')

const folderPath = path.join(__dirname, '..', 'share_calc_reports')

const drawNumberRegex = /Calculated share values for draw\s+\d+/
const rollOverNumberRegex = /Rollover number\s+\d+/
const gameStatsRegex = /\d+\s+\d{1,3}(,\d{3})*(\.\d{2})\s+\d+\s+\d{1,3}(,\d{3})*(\.\d{2})/
const nextDrawRollOverRegex = /nextdrawroolover/ /** * this still needs figuring out from the results */
const createNewPageRegex = /Page:\s{1}\d+/ /* create new page when this regex is matched */
const savePageRegex = /Total/ /* Save the page when this regex is matched && isPageCreationRequired === true */

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

  let isPageCreationRequired = false
  let playResult = []
  const pages = []
  let obj = {}

  for await (const line of rl) {
    if (createNewPageRegex.exec(line)) {
      isPageCreationRequired = true
    }

    if (savePageRegex.exec(line) && isPageCreationRequired) {
      isPageCreationRequired = false
      obj = { ...obj, playResult }
      pages.push(obj)
      obj = {}
      playResult = []
    }

    if (isPageCreationRequired) {
      if (drawNumberRegex.exec(line)) {
        obj = { ...obj, drawNumber: getDrawNumber(drawNumberRegex.exec(line)) }
      } else if (rollOverNumberRegex.exec(line)) {
        obj = { ...obj, rollOverNumber: getRollOverNumber(rollOverNumberRegex.exec(line)) }
      } else if (gameStatsRegex.exec(line)) {
        const gameStatArray = getGameStats(gameStatsRegex.exec(line))
        playResult = [...playResult, gameStatArray]
      } else if (nextDrawRollOverRegex.exec(line)) {
        obj = { ...obj, nextDrawRollOver: getNextDrawRollOver(line) } /* ====== fix this please ===== */
      }
    }
  }

  return pages
}

module.exports = {
  readFolderContent,
  readSharedCalcFileLineByLine
}
