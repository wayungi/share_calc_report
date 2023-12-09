const fs = require('node:fs')
const readline = require('readline')
const path = require('path')
const {
  getNumber,
  getGameRecord,
  resultType
} = require('./dataExtraction')

const { DRAW_NUMBER_REGEX, ROLLOVER_NUMBER_REGEX, GAME_RECORD } = require('./patterns')
const gameStatsRegex = /\d+\s+\d{1,3}(,\d{3})*(\.\d{2})\s+\d+\s+\d{1,3}(,\d{3})*(\.\d{2})/
const createNewPageRegex = /Page:\s{1}\d+/ /* create new page when this regex is matched */
const savePageRegex = /Total/ /* Save the page when this regex is matched && isPageCreationRequired === true */
const plusOneRegex = /Regular Plus 1/ /* LOTTO PLUS 1 */
const plusTwoRegex = /Regular Plus 2/ /* LOTTO PLU 2 */
const plusRegex = /Regular Plus/ /* POWERBALL PLUS */

const readFolderContent = (folderPath) => {
  if (!fs.existsSync(folderPath)) return null
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
  let drawNumber = ''

  for await (const line of rl) {
    /* When "Page: x" is read, enable creation of a new display object by toggling the flag */
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
      if (plusOneRegex.exec(line)) { /* LOTTO PLUS 1 */
        obj = { ...obj, productType: resultType(plusOneRegex.exec(line)) }
      } else if (plusTwoRegex.exec(line)) { /* LOTTO PLUS 2 */
        obj = { ...obj, productType: resultType(plusTwoRegex.exec(line)) }
      } else if (plusRegex.exec(line)) { /* POWERBALL PLUS */
        obj = { ...obj, productType: resultType(plusRegex.exec(line)) }
      }

      if (DRAW_NUMBER_REGEX.exec(line)) {
        drawNumber = getNumber(DRAW_NUMBER_REGEX, line)
      } else if (ROLLOVER_NUMBER_REGEX.exec(line)) {
        obj = { ...obj, rollOverNumber: getNumber(ROLLOVER_NUMBER_REGEX, line) }
      } else if (gameStatsRegex.exec(line)) {
        playResult = [...playResult, getGameRecord(GAME_RECORD, line)]
      }
    }
  }
  return { drawNumber, pages }
}

module.exports = {
  readFolderContent,
  readSharedCalcFileLineByLine
}
