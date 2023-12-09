const fs = require('node:fs')
const readline = require('readline')
const path = require('path')
const { getNumber, getGameRecord, resultType } = require('./dataExtraction')
const { DRAW_NUMBER_REGEX, ROLLOVER_NUMBER_REGEX, GAME_RECORD, PLUS_1_REGEX, PLUS_2_REGEX, PLUS_REGEX, PAGE_REGEX, SAVE_PAGE_REGEX } = require('./patterns')

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
    if (PAGE_REGEX.exec(line)) {
      isPageCreationRequired = true
    }

    if (SAVE_PAGE_REGEX.exec(line) && isPageCreationRequired) {
      isPageCreationRequired = false
      obj = { ...obj, playResult }
      pages.push(obj)
      obj = {}
      playResult = []
    }

    if (isPageCreationRequired) {
      if (PLUS_1_REGEX.exec(line)) { /* LOTTO PLUS 1 */
        obj = { ...obj, productType: resultType(PLUS_1_REGEX, line) }
      } else if (PLUS_2_REGEX.exec(line)) { /* LOTTO PLUS 2 */
        obj = { ...obj, productType: resultType(PLUS_2_REGEX, line) }
      } else if (PLUS_REGEX.exec(line)) { /* POWERBALL PLUS */
        obj = { ...obj, productType: resultType(PLUS_REGEX, line) }
      } else if (DRAW_NUMBER_REGEX.exec(line)) {
        drawNumber = getNumber(DRAW_NUMBER_REGEX, line)
      } else if (ROLLOVER_NUMBER_REGEX.exec(line)) {
        obj = { ...obj, rollOverNumber: getNumber(ROLLOVER_NUMBER_REGEX, line) }
      } else if (GAME_RECORD.exec(line)) {
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
