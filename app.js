const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

const Todo = require('./models/todo.js')

// connect to database MongoDB vis mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://youhuaaa:8EeNc5NyFn@cluster0.9pcddue.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// method override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.log(error))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .then((todo) => {
      res.render('detail', { todo: todo })
    })
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => { res.redirect('/') })
    .catch(error => { console.log(error) })
})

app.put('/todos/:id/edit', (req, res) => {
  const name = req.body.name
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = (req.body.isDone === 'on')
      todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.delete('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(
      Todo.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(todos => res.render('index', { todos: todos }))
        .catch(error => console.log(error))
    )
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
