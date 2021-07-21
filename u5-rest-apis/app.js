const express = require('express')
const { json, urlencoded } = require('body-parser')

const { readBooks } = require('./features/book-controller')

const app = express()

// Middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
app.get('/books', readBooks)

module.exports = { app }
