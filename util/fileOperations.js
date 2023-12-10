const fs = require('node:fs')
const readline = require('readline')
const path = require('path')
const { getNumber, getGameRecord, resultType } = require('./dataExtraction.js')
const { DRAW_NUMBER_REGEX, ROLLOVER_NUMBER_REGEX, GAME_RECORD, PLUS_1_REGEX, PLUS_2_REGEX, PLUS_REGEX, PAGE_REGEX, SAVE_PAGE_REGEX } = require('./patterns.js')

const getFilesInFolder = (folderPath) => {
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
  let gameRecords = []
  const pages = []
  let pageObj = {}
  let drawNumber = ''

  for await (const line of rl) {
    /* When "Page: x" is read, enable creation of a new display object by toggling the flag */
    if (PAGE_REGEX.exec(line)) {
      isPageCreationRequired = true
    }

    if (SAVE_PAGE_REGEX.exec(line) && isPageCreationRequired) {
      isPageCreationRequired = !isPageCreationRequired
      pageObj = { ...pageObj, drawNumber, gameRecords }
      pages.push(pageObj)
      pageObj = {}
      gameRecords = []
    }

    if (isPageCreationRequired) {
      if (PLUS_1_REGEX.exec(line)) { /* LOTTO PLUS 1 */
        pageObj = { ...pageObj, productType: resultType(PLUS_1_REGEX, line) }
      } else if (PLUS_2_REGEX.exec(line)) { /* LOTTO PLUS 2 */
        pageObj = { ...pageObj, productType: resultType(PLUS_2_REGEX, line) }
      } else if (PLUS_REGEX.exec(line)) { /* POWERBALL PLUS */
        pageObj = { ...pageObj, productType: resultType(PLUS_REGEX, line) }
      } else if (DRAW_NUMBER_REGEX.exec(line)) {
        drawNumber = getNumber(DRAW_NUMBER_REGEX, line)
        pageObj = { ...pageObj, drawNumber: getNumber(DRAW_NUMBER_REGEX, line) }
      } else if (ROLLOVER_NUMBER_REGEX.exec(line)) {
        pageObj = { ...pageObj, rollOverNumber: getNumber(ROLLOVER_NUMBER_REGEX, line) }
      } else if (GAME_RECORD.exec(line)) {
        gameRecords = [...gameRecords, getGameRecord(GAME_RECORD, line)]
      }
    }
  }

  return pages
}

module.exports = {
  getFilesInFolder,
  readSharedCalcFileLineByLine
}
