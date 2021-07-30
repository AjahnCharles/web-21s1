const express = require('express')
const expHbs = require('express-handlebars')
const { json, urlencoded } = require('body-parser')

const { index } = require('./features/index-controller')

const app = express()

// Templates
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', expHbs({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: ['./views/partials', './views/layouts'],
  helpers: { baseUrl: process.env.BASE_URL || 'https://asia-southeast2-proj1-cinema.cloudfunctions.net/demo/' }
}))

// Middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
app.get('/', index)

// app.get('/films', filmList)
// app.get('/films/:id', filmDetails)
// app.get('/cinemas', cinemaList)
// app.get('/cinemas/:id', cinemaDetails)

// app.get('/book', bookingForm)
// app.post('/book', bookingProcess)
// app.get('/tickets/:id', ticketDetails)
// app.get('/api/v1/tickets/:id', apiTicketDetails)

// Export
module.exports = {
  app
}
