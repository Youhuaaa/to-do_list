const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

app.get('/', (req, res) => {
  res.send('Initialize /project')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
