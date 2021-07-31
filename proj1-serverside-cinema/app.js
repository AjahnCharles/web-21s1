const express = require('express')
const expHbs = require('express-handlebars')
const { json, urlencoded } = require('body-parser')

const { baseUrl } = require('./_services/base-url')

const { index } = require('./features/index-controller')
const { cinemaList, cinemaDetails } = require('./features/cinema-controller')
const { filmList, filmDetails } = require('./features/film-controller')
const { bookingForm, bookingProcess } = require('./features/booking-controller')
const { ticketList, apiTicketList } = require('./features/ticket-controller')

const app = express()

// Templates
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', expHbs({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: ['./views/partials', './views/layouts'],
  helpers: { baseUrl }
}))

// Middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
app.get('/', index)

app.get('/cinemas', cinemaList)
app.get('/cinemas/:slug', cinemaDetails)
app.get('/films', filmList)
app.get('/films/:slug', filmDetails)

app.get('/book', bookingForm)
app.post('/book', bookingProcess)
app.get('/tickets', ticketList)
app.get('/api/v1/tickets', apiTicketList)

// Export
module.exports = {
  app
}
