const express = require('express')
const { json, urlencoded } = require('body-parser')

const app = express()

// Middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
// TODO later

module.exports = { app }
