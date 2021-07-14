const express = require('express')
const expHbs = require('express-handlebars')
const { json, urlencoded } = require('body-parser')
const { bookDetails, bookSearch } = require('./features/book-controller')

const app = express()

// Templates
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', expHbs({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: ['./views/partials', './views/layouts']
}))

// Middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
app.get('/books', bookSearch)
app.get('/books/:isbn13', bookDetails)

const PORT = 3000
app.listen(PORT,
  () => console.log(`Listening: http://localhost:${PORT}`))
