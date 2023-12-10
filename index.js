const express = require('express')
const app = express()
const { getProductName } = require('./util/dataExtraction.js')
const { getFilesInFolder, readSharedCalcFileLineByLine } = require('./util/fileOperations.js')
const path = require('path')
const createDir = require('./middleware/share_calc_dir.js')

app.use(createDir)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')

const PORT = 3000
const folderPath = path.join(__dirname, 'share_calc_reports')

app.get('/', async (req, res) => {
  const shareCalcReportFilesArray = getFilesInFolder(folderPath)

  if (!shareCalcReportFilesArray.length) {
    res.status(200).render('index', { data: null })
    return
  }

  const pages = await (async () => {
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
  res.status(200).render('index', { data: pages })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
