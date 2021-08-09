const express = require('express')
const expHbs = require('express-handlebars')
const { json, urlencoded } = require('body-parser')

const { index } = require('./features/index-controller')
const { teamList, teamDetails, teamMedals, teamCreateForm, teamCreate } = require('./features/teams-controller')
const { athleteList, athleteDetails, athleteSchedule, athleteCreateForm, athleteCreate } = require('./features/athletes-controller')
const { sportList, sportDetails, sportSchedule, sportCreateForm, sportCreate } = require('./features/sports-controller')
const { heatList, heatLineup, heatRecord, heatRecordCreateForm, heatRecordCreate } = require('./features/heats-controller')

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
app.get('/team-medals', teamMedals)

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

// [D] Heats -- not nested under /events/:slug/ for simplicity
app.get('/heats', heatList)
app.get('/heats/:slug', heatLineup)
app.post('/records', heatRecordCreate)
app.get('/records/new', heatRecordCreateForm)
app.get('/records/:slug', heatRecord)

// [E] Results -- not nested under /events/:slug/ for simplicity
app.get('/results', index)
app.post('/results', index)
app.get('/results/new', index)
app.get('/results/:slug', index)
app.get('/world-records/:slug', index)

// General
app.get('/images/:catchall', (_req, res) => res.redirect('/images/404.jpg'))

module.exports = { app }
