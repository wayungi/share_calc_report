const express = require('express')
const app = express()
const { getProductName } = require('./util/dataExtraction')
const createDir = require('./middleware/createFolder')

const { readFolderContent, readSharedCalcFileLineByLine } = require('./util/fileOperations')
const port = 3000

app.use(createDir)

app.get('/', async (req, res) => {
  const shareCalcReportFilesArray = readFolderContent()

  if (shareCalcReportFilesArray.length === 0) {
    res.send('Nothing to process!')
    return
  }

  const result = await (async () => {
    let extractedData = []
    for (const file of shareCalcReportFilesArray) {
      const SingleFileResult = {
        fileType: getProductName(file),
        fileData: await readSharedCalcFileLineByLine(file)
      }
      extractedData = [...extractedData, SingleFileResult]
    }
    return extractedData
  })()

  console.log(result)

  res.send('Result!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
