const express = require('express')
const { json, urlencoded } = require('body-parser')

const { readBooks, readBook, createBook } = require('./features/book-controller')

const app = express()

// Middleware
app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Routes
app.get('/books', readBooks)
app.get('/books/:isbn13', readBook)
app.post('/books', createBook)

module.exports = { app }
