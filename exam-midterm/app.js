const express = require('express')
const expHbs = require('express-handlebars')
const { json, urlencoded } = require('body-parser')

const { index } = require('./features/index-controller')
const { teamList, teamDetails, medalTable, teamCreateForm, teamCreate } = require('./features/teams-controller')
const { athleteList, athleteDetails, athleteSchedule, athleteCreateForm, athleteCreate } = require('./features/athletes-controller')
const { sportList, sportDetails, sportSchedule, sportCreateForm, sportCreate } = require('./features/sports-controller')

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
app.get('/', index)

// TODO: เขียนเส้นทางของคุณที่นี่ // Write your routes here

// [A] Teams
app.get('/teams', teamList)
app.post('/teams', teamCreate)
app.get('/teams/new', teamCreateForm)
app.get('/teams/:slug', teamDetails)
app.get('/medals', medalTable)

// [B] Athletes
app.get('/athletes', athleteList)
app.post('/athletes', athleteCreate)
app.get('/athletes/new', athleteCreateForm)
app.get('/athletes/:slug', athleteDetails)
app.get('/athletes/:slug/schedule', athleteSchedule)

// [C] Sports
app.get('/sports', sportList)
app.post('/sports', sportCreate)
app.get('/sports/new', sportCreateForm)
app.get('/sports/:slug', sportDetails)
app.get('/sports/:slug/schedule', sportSchedule)

// [D] Heats -- not nested under /sports/:slug/ for simplicity
app.get('/heats', index)
app.post('/heats', index)
app.get('/heats/new', index)
app.get('/heats/:slug', index)
app.get('/athletes/:slug/records', index)

// [E] Results -- not nested under /sports/:slug/ for simplicity
app.get('/results', index)
app.post('/results', index)
app.get('/results/new', index)
app.get('/results/:slug', index)
app.get('/sports/:slug/records', index)

// General
app.get('/images/:catchall', (_req, res) => res.redirect('/images/404.jpg'))

module.exports = { app }
