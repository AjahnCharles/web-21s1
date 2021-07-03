
const express = require('express')
const { urlencoded, json } = require('body-parser')
const { getUserByQuery, getUserByPath, getUserByForm, search } = require('./features/usercontrollers')
const { logger } = require('./_services/logger')
const { index } = require('./features/indexController')
const { getProduct } = require('./features/productController')
const { getTemp } = require('./features/tempController')
const { getRgb } = require('./features/rgbController')
const { getEcho, getEchopost } = require('./features/echoController')

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
app.get('/', index)
app.get('/products/search', getProduct)
app.get('/:u1-to-:u2/:t1', getTemp)
app.get('/rgb', getRgb)
app.get('/echo', getEcho)
app.post('/echo', getEchopost)

const PORT = 3000
app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`))
