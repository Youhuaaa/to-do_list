const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

// connect to database MongoDB vis mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://youhuaaa:8EeNc5NyFn@cluster0.9pcddue.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  res.send('Initialize /project')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
