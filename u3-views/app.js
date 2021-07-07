const express = require('express')
const expHbs = require('express-handlebars')
const { courseDetails } = require('./features/courseController')
const { index } = require('./features/indexController')

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

// Routes
app.get('/', index)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
