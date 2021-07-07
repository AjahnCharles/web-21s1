const express = require('express')
const expHbs = require('express-handlebars')
const { courseDetails, courseUnits, courseStudents } = require('./features/courseController')
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
app.get('/courses/:code', courseDetails)
app.get('/courses/:code/units', courseUnits)
app.get('/courses/:code/students', courseStudents)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
