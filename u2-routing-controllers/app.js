const express = require('express')
const { urlencoded, json } = require('body-parser')
const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/userController')
const { logger } = require('./_services/logger')

const app = express()

// Middlewares
app.use(urlencoded({ extended: false }))
app.use(json()) // json() = function that creates middleware
app.use(logger) // logger = a middleware

// Routes
app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
