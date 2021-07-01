const express = require('express')
const { urlencoded, json } = require('body-parser')
const { logger } = require('./_services/logger')
const { getUserByQuery, getUserByPath, search, getUserByForm } = require('./features/userController')

const app = express()

// Middleware
app.use(urlencoded({ extended: false }))
app.use(json()) // json () = function that cerates middleware
app.use(logger) // logger = a middleware

// Route
app.get('/users', getUserByQuery)
app.get('/users/search', search)
app.get('/users/:username', getUserByPath)
app.post('/users', getUserByForm)

const POST = 3000
app.listen(POST,
  () => console.log(`Listening: http://localhost:${POST}`))
