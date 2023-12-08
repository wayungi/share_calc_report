const express = require('express')
const app = express()
const { getProductName } = require('./util/dataExtraction')
const createDir = require('./middleware/createFolder')
const { readFolderContent, readSharedCalcFileLineByLine } = require('./util/fileOperations')

app.use(createDir)
app.set('view engine', 'ejs')
app.set('views', 'views')

const PORT = 3000

app.get('/', async (req, res) => {
  const shareCalcReportFilesArray = readFolderContent()

  if (shareCalcReportFilesArray.length === 0) {
    res.status(200).render('index', { data: null })
    return
  }

  const pages = await (async () => {
    let extractedData = []
    for (const file of shareCalcReportFilesArray) {
      const resp = await readSharedCalcFileLineByLine(file)
      const SingleFileResult = {
        fileType: getProductName(file),
        fileData: resp // await readSharedCalcFileLineByLine(file)
      }
      extractedData = [...extractedData, SingleFileResult]
      console.log(resp)
    }
    return extractedData
  })()

  console.log(pages)

  res.status(200).render('index', { data: pages })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
