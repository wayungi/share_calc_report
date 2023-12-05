const express = require('express')
const app = express()
const createDir = require('./middleware/createFolder')
const port = 3000

app.use(createDir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
