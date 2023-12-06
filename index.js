const express = require('express')
const app = express()
const createDir = require('./middleware/createFolder')

const { readFolderContent, readShareCalcFile } = require('./util/fileOperations')
const port = 3000

app.use(createDir)

app.get('/', (req, res) => {
  const shareCalcReportFilesArray = readFolderContent()
  if (shareCalcReportFilesArray.length === 0) {
    console.log('Nothing to process')
    res.send('Nothing to process!')
    return
  }

  shareCalcReportFilesArray.forEach((file) => {
    readShareCalcFile(file)
  })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
