const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://youhuaaa:8EeNc5NyFn@cluster0.9pcddue.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const Todo = require('../todo.js')

db.on('error', () => {
  console.log('error on MongoDB')
})

db.once('open', () => {
  console.log('db connected')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
})